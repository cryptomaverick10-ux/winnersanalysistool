'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { analyzeMatchDigits, parseLastDigit, type MatchAiResult } from '@/lib/match-ai';

const DERIV_WS_URL = 'wss://ws.derivws.com/websockets/v3?app_id=1089';
const MAX_DIGITS = 300;
const TARGET_DIGIT = 8;
const ACCENT_COLORS = [
  ['Blue', '#2563eb'],
  ['Purple', '#7c3aed'],
  ['Green', '#059669'],
  ['Orange', '#ea580c'],
  ['Pink', '#db2777'],
  ['Cyan', '#0891b2'],
] as const;

const MARKETS = [
  ['Volatility 10 Index', 'R_10'],
  ['Volatility 10 (1s)', '1HZ10V'],
  ['Volatility 25 Index', 'R_25'],
  ['Volatility 25 (1s)', '1HZ25V'],
  ['Volatility 50 Index', 'R_50'],
  ['Volatility 50 (1s)', '1HZ50V'],
  ['Volatility 75 Index', 'R_75'],
  ['Volatility 75 (1s)', '1HZ75V'],
  ['Volatility 100 Index', 'R_100'],
  ['Volatility 100 (1s)', '1HZ100V'],
] as const;

const STRATEGIES = [
  'Over/Under',
  'Even/Odd',
  'Rise/Fall',
  'Matches',
  'Differs',
  'High/Low',
  'Touch/No Touch',
  'Asian',
  'Barrier',
] as const;

type Strategy = (typeof STRATEGIES)[number];

interface ManualSignal {
  label: string;
  confidence: number;
}

interface ScanResult {
  name: string;
  symbol: string;
  score: number;
  movement: number;
  uniqueDigits: number;
  price: number | null;
}

export function MatchAiApp() {
  const [symbol, setSymbol] = useState('R_10');
  const [strategy, setStrategy] = useState<Strategy>('Matches');
  const [accentColor, setAccentColor] = useState('#2563eb');
  const [livePrice, setLivePrice] = useState<number | null>(null);
  const [prices, setPrices] = useState<number[]>([]);
  const [digits, setDigits] = useState<number[]>([]);
  const [connected, setConnected] = useState(false);
  const [reconnecting, setReconnecting] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [dataFeedRequested, setDataFeedRequested] = useState(false);
  const [durationTicks, setDurationTicks] = useState(1);
  const [threshold, setThreshold] = useState(5);
  const [manualSignal, setManualSignal] = useState<ManualSignal | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResults, setScanResults] = useState<ScanResult[]>([]);
  const [bestMarket, setBestMarket] = useState<ScanResult | null>(null);
  const [generatingSignal, setGeneratingSignal] = useState(false);
  const [countdownSeconds, setCountdownSeconds] = useState(0);
  const [themeMode, setThemeMode] = useState<'dark' | 'light'>('dark');
  const [language, setLanguage] = useState('English');
  const socketRef = useRef<WebSocket | null>(null);
  const reconnectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scannerSocketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const savedColor = localStorage.getItem('ceo-hub-accent-color');
    if (savedColor && /^#[0-9a-f]{6}$/i.test(savedColor)) setAccentColor(savedColor);
    const savedTheme = localStorage.getItem('ceo-hub-theme-mode');
    if (savedTheme === 'light' || savedTheme === 'dark') setThemeMode(savedTheme);
    const savedLanguage = localStorage.getItem('ceo-hub-language');
    if (savedLanguage) setLanguage(savedLanguage);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', themeMode === 'dark');
    document.documentElement.lang = language === 'French' ? 'fr' : language === 'Spanish' ? 'es' : language === 'Portuguese' ? 'pt' : 'en';
  }, [themeMode, language]);

  useEffect(() => () => scannerSocketRef.current?.close(), []);

  useEffect(() => {
    if (countdownSeconds <= 0) return;
    const timer = window.setTimeout(() => {
      setCountdownSeconds((current) => Math.max(0, current - 1));
    }, 1000);
    return () => window.clearTimeout(timer);
  }, [countdownSeconds]);

  const chooseAccentColor = (color: string) => {
    setAccentColor(color);
    localStorage.setItem('ceo-hub-accent-color', color);
  };

  const chooseTheme = (mode: 'dark' | 'light') => {
    setThemeMode(mode);
    localStorage.setItem('ceo-hub-theme-mode', mode);
    document.documentElement.classList.toggle('dark', mode === 'dark');
  };

  const chooseLanguage = (value: string) => {
    setLanguage(value);
    localStorage.setItem('ceo-hub-language', value);
    document.documentElement.lang = value === 'French' ? 'fr' : value === 'Spanish' ? 'es' : 'en';
  };

  const refreshApplication = () => {
    window.location.reload();
  };

  useEffect(() => {
    let disposed = false;

    const connect = () => {
      if (disposed || !dataFeedRequested) return;
      setConnected(false);
      setReconnecting(true);
      setConnecting(true);

      const socket = new WebSocket(DERIV_WS_URL);
      socketRef.current = socket;

      socket.onopen = () => {
        setConnected(true);
        setReconnecting(false);
        setConnecting(false);
        socket.send(JSON.stringify({ ticks_history: symbol, count: MAX_DIGITS, end: 'latest', style: 'ticks' }));
      };

      socket.onmessage = (event) => {
        const message = JSON.parse(event.data) as {
          error?: unknown;
          history?: { prices?: number[] };
          tick?: { quote: number | string; subscription_id?: string | number };
        };
        if (message.error) {
          setConnected(false);
          setReconnecting(true);
          setConnecting(false);
          return;
        }

        if (message.history?.prices) {
          const historyPrices = message.history.prices.filter((price) => Number.isFinite(price));
          setPrices(historyPrices.slice(-MAX_DIGITS));
          const historyDigits = historyPrices.map((price) => parseLastDigit(price)).filter(
            (digit): digit is number => digit !== null
          );
          setDigits(historyDigits.slice(-MAX_DIGITS));
          if (historyPrices.length) setLivePrice(historyPrices.at(-1)!);
          socket.send(JSON.stringify({ ticks: symbol, subscribe: 1 }));
        }

        if (message.tick) {
          const price = Number(message.tick.quote);
          if (!Number.isFinite(price)) return;
          const digit = parseLastDigit(price);
          setLivePrice(price);
          setPrices((current) => [...current, price].slice(-MAX_DIGITS));
          if (digit !== null) {
            setDigits((current) => [...current, digit].slice(-MAX_DIGITS));
          }
        }
      };

      socket.onerror = () => {
        setConnected(false);
        setReconnecting(true);
        setConnecting(false);
      };
      socket.onclose = () => {
        setConnected(false);
        setConnecting(false);
        setReconnecting(dataFeedRequested);
        if (!disposed) reconnectTimerRef.current = setTimeout(connect, 1500);
      };
    };

    if (!dataFeedRequested) {
      setConnected(false);
      setReconnecting(false);
      setConnecting(false);
      socketRef.current?.close();
      socketRef.current = null;
      return;
    }
    connect();
    return () => {
      disposed = true;
      if (reconnectTimerRef.current) clearTimeout(reconnectTimerRef.current);
      socketRef.current?.close();
      socketRef.current = null;
    };
  }, [symbol, dataFeedRequested]);

  useEffect(() => {
    setManualSignal(null);
  }, [strategy]);

  useEffect(() => {
    setDigits([]);
    setPrices([]);
    setLivePrice(null);
    setManualSignal(null);
  }, [symbol]);

  const matchResult: MatchAiResult = useMemo(
    () => analyzeMatchDigits(digits, 100),
    [digits]
  );

  const analysis = useMemo(() => {
    const window = digits.slice(-100);
    const even = window.filter((digit) => digit % 2 === 0).length;
    const over = window.filter((digit) => digit >= threshold).length;
    const rises = prices.slice(-100).filter((price, index, values) => index > 0 && price > values[index - 1]).length;

    const evenProbability = window.length ? (even / window.length) * 100 : 0;
    const overProbability = window.length ? (over / window.length) * 100 : 0;
    const riseProbability = prices.length > 1 ? (rises / Math.min(99, prices.slice(-100).length - 1)) * 100 : 0;
    const matchesProbability = matchResult.best?.percentage ?? 0;

    const differsProbability = window.length
      ? 100 - (window.filter((digit) => digit === TARGET_DIGIT).length / window.length) * 100
      : 0;

    return { evenProbability, overProbability, riseProbability, matchesProbability, differsProbability };
  }, [digits, matchResult.best, prices, threshold]);

  const digitDistribution = useMemo(() => {
    const window = digits.slice(-100);
    return Array.from({ length: 10 }, (_, digit) => ({
      digit,
      count: window.filter((value) => value === digit).length,
      percentage: window.length ? (window.filter((value) => value === digit).length / window.length) * 100 : 0,
    }));
  }, [digits]);

  const tickSequenceAnalysis = useMemo(() => {
    const window = digits.slice(-100);
    const sequence = window.slice(-3);
    const sequenceLength = Math.min(3, Math.max(1, window.length >= 3 ? 3 : window.length));
    const pattern = window.slice(-sequenceLength);
    const follows = new Array<number>(10).fill(0);

    if (window.length > sequenceLength) {
      for (let index = sequenceLength; index < window.length; index += 1) {
        const matchesPattern = window.slice(index - sequenceLength, index).every(
          (digit, offset) => digit === pattern[offset]
        );
        if (matchesPattern) follows[window[index]] += 1;
      }
    }

    const followTotal = follows.reduce((sum, count) => sum + count, 0);
    let evenProbability: number;
    let oddProbability: number;

    if (followTotal > 0) {
      const evenFollows = follows.reduce((sum, count, digit) => sum + (digit % 2 === 0 ? count : 0), 0);
      evenProbability = (evenFollows / followTotal) * 100;
      oddProbability = 100 - evenProbability;
    } else {
      const evenCount = window.filter((digit) => digit % 2 === 0).length;
      evenProbability = window.length ? (evenCount / window.length) * 100 : 0;
      oddProbability = 100 - evenProbability;
    }

    const gaps = digitDistribution.map((item) => {
      let gap = window.length;
      for (let index = window.length - 1; index >= 0; index -= 1) {
        if (window[index] === item.digit) {
          gap = window.length - 1 - index;
          break;
        }
      }
      return { digit: item.digit, gap };
    });
    const overdueDigit = [...gaps].sort((a, b) => b.gap - a.gap)[0]?.digit ?? null;
    const nextEven = evenProbability >= oddProbability;

    return {
      sequence,
      pattern,
      patternSamples: followTotal,
      evenProbability,
      oddProbability,
      nextEven,
      overdueDigit,
      overrepresentedDigit: digitDistribution.reduce((best, item) => item.count > best.count ? item : best, digitDistribution[0]),
    };
  }, [digits, digitDistribution]);

  const marketName = MARKETS.find(([, value]) => value === symbol)?.[0] ?? symbol;
  const lastDigit = digits.at(-1) ?? null;
  const predictedMatch = manualSignal?.label.match(/^MATCH (\d)$/);
  const predictedOutcomeDigit = strategy === 'Matches' && predictedMatch ? Number(predictedMatch[1]) : null;

  const calculateScanResult = (name: string, marketSymbol: string, prices: number[], price: number | null): ScanResult => {
    const recentPrices = prices.slice(-100);
    const changes = recentPrices.slice(1).map((current, index) => Math.abs(current - recentPrices[index]));
    const averagePrice = recentPrices.reduce((sum, current) => sum + current, 0) / Math.max(recentPrices.length, 1);
    const averageChange = changes.reduce((sum, current) => sum + current, 0) / Math.max(changes.length, 1);
    const movement = averagePrice > 0 ? (averageChange / averagePrice) * 10000 : 0;

    const counts = Array.from({ length: 10 }, () => 0);
    recentPrices.forEach((current) => {
      const digit = parseLastDigit(current);
      if (digit !== null) counts[digit] += 1;
    });
    const uniqueDigits = counts.filter((count) => count > 0).length;
    const total = recentPrices.length;
    const entropy = counts.reduce((sum, count) => {
      if (!count || !total) return sum;
      const probability = count / total;
      return sum - probability * Math.log(probability);
    }, 0);
    const entropyScore = entropy / Math.log(10);
    const score = Math.min(99, Math.max(1, Math.round(entropyScore * 45 + movement * 5 + uniqueDigits * 1.5)));

    return { name, symbol: marketSymbol, score, movement, uniqueDigits, price };
  };

  const stopScanner = () => {
    scannerSocketRef.current?.close();
    scannerSocketRef.current = null;
    setIsScanning(false);
  };

  const startScanner = () => {
    stopScanner();
    setIsScanning(true);
    setBestMarket(null);
    setScanResults(MARKETS.map(([name, marketSymbol]) => ({
      name,
      symbol: marketSymbol,
      score: 0,
      movement: 0,
      uniqueDigits: 0,
      price: null,
    })));

    const scanner = new WebSocket(DERIV_WS_URL);
    scannerSocketRef.current = scanner;
    const scanPrices = new Map<string, number[]>();

    scanner.onopen = () => {
      MARKETS.forEach(([, marketSymbol]) => {
        scanPrices.set(marketSymbol, []);
        scanner.send(JSON.stringify({
          ticks_history: marketSymbol,
          count: 100,
          end: 'latest',
          style: 'ticks',
          req_id: marketSymbol,
        }));
        scanner.send(JSON.stringify({ ticks: marketSymbol, subscribe: 1 }));
      });
    };

    scanner.onmessage = (event) => {
      const message = JSON.parse(event.data) as {
        error?: unknown;
        req_id?: string;
        echo_req?: { req_id?: string };
        history?: { prices?: number[] };
        tick?: { symbol: string; quote: number | string };
      };
      if (message.error) return;

      const historyMarketSymbol = message.history?.prices ? (message.req_id ?? message.echo_req?.req_id) : undefined;
      if (message.history?.prices && historyMarketSymbol) {
        const marketSymbol = historyMarketSymbol;
        const market = MARKETS.find(([, value]) => value === marketSymbol);
        const historyPrices = message.history.prices.filter((price) => Number.isFinite(price));
        scanPrices.set(marketSymbol, historyPrices.slice(-100));
        if (market) {
          const result = calculateScanResult(market[0], marketSymbol, historyPrices, historyPrices.at(-1) ?? null);
          setScanResults((current) => {
            const next = current.map((item) => item.symbol === marketSymbol ? result : item);
            const ranked = [...next].filter((item) => item.score > 0).sort((a, b) => b.score - a.score);
            setBestMarket(ranked[0] ?? null);
            return next;
          });
        }
      }

      if (message.tick?.symbol) {
        const marketSymbol = message.tick.symbol;
        const market = MARKETS.find(([, value]) => value === marketSymbol);
        const price = Number(message.tick.quote);
        if (!market || !Number.isFinite(price)) return;
        const nextPrices = [...(scanPrices.get(marketSymbol) ?? []), price].slice(-100);
        scanPrices.set(marketSymbol, nextPrices);
        const result = calculateScanResult(market[0], marketSymbol, nextPrices, price);
        setScanResults((current) => {
          const next = current.map((item) => item.symbol === marketSymbol ? result : item);
          const ranked = [...next].filter((item) => item.score > 0).sort((a, b) => b.score - a.score);
          setBestMarket(ranked[0] ?? null);
          return next;
        });
      }
    };

    scanner.onerror = () => setIsScanning(false);
    scanner.onclose = () => {
      if (scannerSocketRef.current === scanner) scannerSocketRef.current = null;
      setIsScanning(false);
    };
  };

  const selectScannedMarket = () => {
    if (!bestMarket) return;
    setSymbol(bestMarket.symbol);
    stopScanner();
  };

  const toggleDataFeed = () => {
    if (dataFeedRequested) {
      setDataFeedRequested(false);
      setConnected(false);
      setConnecting(false);
      setReconnecting(false);
      socketRef.current?.close();
      socketRef.current = null;
      return;
    }
    setDataFeedRequested(true);
    setConnecting(true);
  };

  const generateSignal = () => {
    if (!connected || digits.length < 25 || generatingSignal || countdownSeconds > 0) return;
    setGeneratingSignal(true);
    window.setTimeout(() => {
      let label = 'WAIT';
      let confidence = 0;

      const durationWindow = digits.slice(-Math.max(25, durationTicks * 25));
      const durationEven = durationWindow.filter((digit) => digit % 2 === 0).length;
      const durationEvenProbability = durationWindow.length ? (durationEven / durationWindow.length) * 100 : 0;

      if (strategy === 'Matches') {
        if (matchResult.best && !matchResult.waiting) {
          label = `MATCH ${matchResult.best.digit}`;
          confidence = matchResult.confidence;
        }
      } else if (strategy === 'Differs') {
        label = `DIFFER FROM ${TARGET_DIGIT}`;
        confidence = Math.round(analysis.differsProbability);
      } else if (strategy === 'Over/Under') {
        const over = durationWindow.filter((digit) => digit >= threshold).length / Math.max(durationWindow.length, 1) * 100;
        label = over >= 50 ? `OVER ${threshold - 1}` : `UNDER ${threshold}`;
        confidence = Math.round(Math.max(over, 100 - over));
      } else if (strategy === 'Even/Odd') {
        label = durationEvenProbability >= 50 ? 'EVEN' : 'ODD';
        confidence = Math.round(Math.max(durationEvenProbability, 100 - durationEvenProbability));
      } else if (strategy === 'Rise/Fall') {
        label = analysis.riseProbability >= 50 ? 'RISE' : 'FALL';
        confidence = Math.round(Math.max(analysis.riseProbability, 100 - analysis.riseProbability));
      } else {
        label = strategy === 'High/Low' ? `HIGH - ABOVE ${threshold}` :
          strategy === 'Touch/No Touch' ? 'TOUCH' :
          strategy === 'Asian' ? (durationWindow.reduce((sum, digit) => sum + digit, 0) / Math.max(durationWindow.length, 1) >= 4.5 ? 'ASIAN HIGH' : 'ASIAN LOW') :
          `BARRIER ${threshold}`;
        confidence = Math.round(Math.max(durationEvenProbability, 100 - durationEvenProbability));
      }

      const durationConfidenceAdjustment = durationTicks === 1 ? 0 : (durationTicks - 1) * -1;
      setManualSignal({ label, confidence: Math.min(95, Math.max(0, confidence + durationConfidenceAdjustment)) });
      setGeneratingSignal(false);
      setCountdownSeconds(10);
    }, 450);
  };

  return (
    <main
      className={`ceo-hub-page min-h-screen overflow-y-auto text-slate-100 ${themeMode === 'light' ? 'ceo-hub-light bg-[#edf2f8]' : 'bg-[#07101f]'}`}
      style={{ '--accent': accentColor } as React.CSSProperties}
    >
      <div className="mx-auto w-full max-w-5xl px-3 py-4 sm:px-6 sm:py-6">
        <style jsx global>{`
          .ceo-hub-light [class*="bg-[#0d192b]"],
          .ceo-hub-light [class*="bg-[#111f33]"] {
            background-color: #ffffff !important;
          }
          .ceo-hub-light [class*="border-white"] {
            border-color: #dbe3ef !important;
          }
          .ceo-hub-light [class*="text-white"] {
            color: #0f172a !important;
          }
          .ceo-hub-light [class*="text-slate-300"],
          .ceo-hub-light [class*="text-slate-400"],
          .ceo-hub-light [class*="text-slate-500"] {
            color: #64748b !important;
          }
        `}</style>
        <header className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/[0.08] bg-[#0d192b] px-4 py-3 shadow-[0_16px_40px_rgba(0,0,0,0.18)]">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.18em]" style={{ color: accentColor }}>CEO HUB Analysis</p>
            <h1 className="mt-1 text-lg font-black tracking-tight text-white sm:text-xl">Live Market Analysis</h1>
          </div>
          <div className="flex flex-wrap items-center justify-end gap-2">
            <div className="flex items-center gap-1" aria-label="Choose preferred colour">
              {ACCENT_COLORS.map(([name, color]) => (
                <button
                  key={color}
                  type="button"
                  title={name}
                  aria-label={`Use ${name}`}
                  onClick={() => chooseAccentColor(color)}
                  className="h-6 w-6 rounded-full border-2 border-white shadow-sm ring-1 ring-slate-200"
                  style={{ backgroundColor: color, outline: accentColor === color ? `2px solid ${color}` : undefined, outlineOffset: 1 }}
                />
              ))}
              <label className="relative ml-1 flex h-7 w-7 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-white/[0.15] bg-[#111f33] shadow-sm" title="Custom colour">
                <span className="text-sm font-black text-slate-300">+</span>
                <input
                  type="color"
                  value={accentColor}
                  onChange={(event) => chooseAccentColor(event.target.value)}
                  className="absolute inset-0 cursor-pointer opacity-0"
                  aria-label="Choose custom colour"
                />
              </label>
            </div>
            <div className="flex items-center rounded-lg border border-white/[0.08] bg-[#111f33] p-1">
              <button
                type="button"
                onClick={() => chooseTheme('dark')}
                className={`rounded-md px-2 py-1 text-[10px] font-black ${themeMode === 'dark' ? 'text-white' : 'text-slate-400'}`}
                style={themeMode === 'dark' ? { backgroundColor: accentColor } : undefined}
              >
                Dark
              </button>
              <button
                type="button"
                onClick={() => chooseTheme('light')}
                className={`rounded-md px-2 py-1 text-[10px] font-black ${themeMode === 'light' ? 'text-white' : 'text-slate-400'}`}
                style={themeMode === 'light' ? { backgroundColor: accentColor } : undefined}
              >
                Light
              </button>
            </div>
            <select
              value={language}
              onChange={(event) => chooseLanguage(event.target.value)}
              aria-label="Language"
              className="rounded-lg border border-white/[0.08] bg-[#111f33] px-2 py-2 text-xs font-bold text-white outline-none"
            >
              <option>English</option>
              <option>French</option>
              <option>Spanish</option>
              <option>Portuguese</option>
            </select>
            <button
              type="button"
              onClick={refreshApplication}
              className="rounded-lg border border-white/[0.08] bg-[#111f33] px-3 py-2 text-xs font-black text-slate-300 transition hover:border-white/[0.18]"
            >
              Login / Refresh
            </button>
            <label className="text-xs font-bold text-slate-400" htmlFor="market">Market</label>
            <select
              id="market"
              value={symbol}
              onChange={(event) => setSymbol(event.target.value)}
              className="rounded-lg border border-white/[0.08] bg-[#111f33] px-3 py-2 text-sm font-bold text-white outline-none"
            >
              {MARKETS.map(([name, value]) => <option key={value} value={value}>{name}</option>)}
            </select>
          </div>
        </header>

        <section className="mt-4 flex flex-col gap-3 rounded-2xl border border-white/[0.08] bg-[#0d192b] px-4 py-4 shadow-[0_16px_40px_rgba(0,0,0,0.16)] sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-black text-white">Data Feed Connection</p>
            <p className="mt-1 text-xs text-slate-400">
              {connecting
                ? 'Establishing connection to the live market...'
                : connected
                  ? 'Live market connection established'
                  : reconnecting
                    ? 'Connection lost. Attempting to reconnect...'
                    : 'Establish Connections to enable live analysis'}
            </p>
          </div>
          <button
            type="button"
            onClick={toggleDataFeed}
            disabled={connecting}
            className="h-11 min-w-40 rounded-lg px-4 text-xs font-black text-white shadow-sm transition disabled:cursor-wait"
            style={{ backgroundColor: connecting ? '#64748b' : accentColor }}
          >
            {connecting ? 'Connecting...' : connected ? 'Disconnect Feed' : dataFeedRequested ? 'Reconnect Feed' : 'Connect to Feed'}
          </button>
        </section>

        <section className="mt-4 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0d192b] shadow-[0_16px_40px_rgba(0,0,0,0.16)]">
          <div className="flex items-center justify-between border-b border-white/[0.08] px-4 py-4">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.18em]" style={{ color: accentColor }}>Recency Intelligence</p>
              <h2 className="mt-1 text-sm font-black uppercase tracking-[0.12em] text-white">AI Tick Sequence &amp; Pattern Recency Detector</h2>
            </div>
            <span className={`rounded-full px-3 py-1 text-[10px] font-black ${
              connected && digits.length >= 25 ? 'text-white' : 'bg-slate-700 text-slate-300'
            }`} style={connected && digits.length >= 25 ? { backgroundColor: accentColor } : undefined}>
              {connected && digits.length >= 25 ? `${tickSequenceAnalysis.patternSamples} SAMPLES` : 'WAIT - 0%'}
            </span>
          </div>
          <div className="grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-white/[0.08] bg-[#111f33] p-3">
              <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500">Current Sequence</p>
              <p className="mt-2 text-lg font-black tracking-[0.25em] text-white">
                {connected && tickSequenceAnalysis.sequence.length > 0 ? tickSequenceAnalysis.sequence.join('  >  ') : 'WAIT'}
              </p>
            </div>
            <div className="rounded-xl border border-white/[0.08] bg-[#111f33] p-3">
              <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500">Detected Pattern</p>
              <p className="mt-2 text-sm font-black text-white">
                {connected && digits.length >= 25 ? `${tickSequenceAnalysis.pattern.join(' -> ')} Recency` : 'Collecting Sequence'}
              </p>
            </div>
            <div className="rounded-xl border border-white/[0.08] bg-[#111f33] p-3">
              <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500">Predicted Side</p>
              <p className="mt-2 text-sm font-black" style={{ color: connected && digits.length >= 25 ? accentColor : undefined }}>
                {connected && digits.length >= 25
                  ? `${tickSequenceAnalysis.nextEven ? 'EVEN' : 'ODD'} - ${Math.round(Math.max(tickSequenceAnalysis.evenProbability, tickSequenceAnalysis.oddProbability))}%`
                  : 'WAIT - 0%'}
              </p>
            </div>
            <div className="rounded-xl border border-white/[0.08] bg-[#111f33] p-3">
              <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500">Recency Status</p>
              <p className="mt-2 text-sm font-black text-white">
                {connected && digits.length >= 25
                  ? `Overdue ${tickSequenceAnalysis.overdueDigit} / Hot ${tickSequenceAnalysis.overrepresentedDigit.digit}`
                  : 'STANDBY'}
              </p>
            </div>
          </div>
        </section>

        <section className="mt-4 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0d192b] shadow-[0_16px_40px_rgba(0,0,0,0.16)]">
          <div className="flex items-center gap-3 border-b border-white/[0.08] px-4 py-3">
            <span className="relative flex h-2.5 w-2.5">
              {connected && <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ backgroundColor: accentColor }} />}
              <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${connected ? '' : 'bg-slate-500'}`} style={connected ? { backgroundColor: accentColor } : undefined} />
            </span>
            <h2 className="text-xs font-black uppercase tracking-[0.18em] text-white">LIVE SPOT TICKER</h2>
          </div>
          <div className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">Volatility in Use</p>
              <p className="mt-1 truncate text-sm font-black text-white">{marketName}</p>
            </div>
            <div className="sm:text-right">
              <p className="font-mono text-2xl font-black tabular-nums text-white sm:text-3xl">
                {livePrice === null ? '--' : livePrice.toFixed(4)}
              </p>
              <div className="mt-2 flex gap-1.5 overflow-x-auto sm:justify-end">
                {digits.slice(-12).map((digit, index, recentDigits) => (
                  <span
                    key={`${digit}-${index}`}
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-xs font-black ${
                      index === recentDigits.length - 1 ? 'text-white' : 'bg-[#111f33] text-slate-300'
                    }`}
                    style={index === recentDigits.length - 1 ? { backgroundColor: accentColor } : undefined}
                  >
                    {digit}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-4 rounded-2xl border border-white/[0.08] bg-[#0d192b] p-4 shadow-[0_16px_40px_rgba(0,0,0,0.16)]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">Live Volatility Scanner</p>
              <h2 className="mt-1 text-sm font-black text-white">
                {isScanning ? 'Scanning volatility markets...' : bestMarket ? 'Best volatility market found' : 'Scan all volatility markets'}
              </h2>
            </div>
            <button
              type="button"
              onClick={isScanning ? stopScanner : startScanner}
              className="h-10 rounded-lg px-4 text-xs font-black text-white shadow-sm transition disabled:cursor-not-allowed disabled:bg-slate-600"
              style={{ backgroundColor: isScanning ? '#64748b' : accentColor }}
            >
              {isScanning ? 'Stop Scan' : 'Scan Best Volatility'}
            </button>
          </div>

          {bestMarket && (
            <button
              type="button"
              onClick={selectScannedMarket}
              className="mt-4 flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left transition"
              style={{ borderColor: `${accentColor}55`, backgroundColor: `${accentColor}12` }}
            >
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.14em]" style={{ color: accentColor }}>Recommended Market</p>
                <p className="mt-1 text-sm font-black text-white">{bestMarket.name}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-black text-white">{bestMarket.score}%</p>
                <p className="text-[10px] font-bold text-slate-400">Scanner Score - Click to use</p>
              </div>
            </button>
          )}

          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-5">
            {scanResults.map((result) => (
              <button
                key={result.symbol}
                type="button"
                onClick={() => {
                  setSymbol(result.symbol);
                  stopScanner();
                }}
                disabled={result.score === 0}
                className="rounded-lg border border-white/[0.08] bg-[#111f33] px-2 py-2 text-center disabled:opacity-50"
              >
                <p className="truncate text-[9px] font-bold text-slate-400">{result.name}</p>
                <p className="mt-1 text-sm font-black text-white">{result.score ? `${result.score}%` : '--'}</p>
              </button>
            ))}
          </div>
        </section>

        <section className="mt-3 flex items-center justify-between rounded-xl border border-white/[0.08] bg-[#0d192b] px-4 py-3 shadow-[0_12px_32px_rgba(0,0,0,0.14)]">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">Live Market</p>
            <p className="mt-1 font-mono text-xl font-black tabular-nums text-white sm:text-2xl">
              {livePrice === null ? '--' : livePrice.toFixed(5)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold text-slate-400">{marketName}</p>
            <p className="mt-1 text-xs font-black text-slate-300">Digit {lastDigit ?? '-'}</p>
          </div>
        </section>

        <div className={`mt-3 rounded-lg px-4 py-2.5 text-center text-sm font-black text-white ${
          connected ? '' : 'bg-slate-500'
        }`} style={connected ? { backgroundColor: accentColor } : undefined}>
          {connected ? 'Connected' : reconnecting ? 'Disconnected / Reconnecting' : 'Disconnected'}
        </div>

        <section className="mt-4 rounded-2xl border border-white/[0.08] bg-[#0d192b] p-3 shadow-[0_16px_40px_rgba(0,0,0,0.16)] sm:p-4">
          <h2 className="text-sm font-black text-white">Auto AI Patterns</h2>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {[
              ['Even / Odd', connected && digits.length >= 25 ? (tickSequenceAnalysis.nextEven ? 'EVEN' : 'ODD') : 'WAIT', connected && digits.length >= 25 ? Math.round(Math.max(tickSequenceAnalysis.evenProbability, tickSequenceAnalysis.oddProbability)) : 0, 'Even/Odd'],
              ['Over / Under', connected && digits.length >= 25 ? (analysis.overProbability >= 50 ? 'OVER' : 'UNDER') : 'WAIT', connected && digits.length >= 25 ? Math.round(Math.max(analysis.overProbability, 100 - analysis.overProbability)) : 0, 'Over/Under'],
              ['Rise / Fall', connected && digits.length >= 25 ? (analysis.riseProbability >= 50 ? 'RISE' : 'FALL') : 'WAIT', connected && digits.length >= 25 ? Math.round(Math.max(analysis.riseProbability, 100 - analysis.riseProbability)) : 0, 'Rise/Fall'],
              ['Matches', connected && digits.length >= 25 && matchResult.best && !matchResult.waiting ? `DIGIT ${matchResult.best.digit}` : 'WAIT', connected && digits.length >= 25 ? Math.round(matchResult.confidence) : 0, 'Matches'],
            ].map(([title, signal, probability, value]) => (
              <button
                key={title}
                type="button"
                onClick={() => setStrategy(value as Strategy)}
                className={`rounded-xl border px-3 py-3 text-left transition ${
                  strategy === value ? 'ring-2' : 'border-white/[0.08] bg-[#111f33]'
                }`}
                style={strategy === value ? { borderColor: accentColor, backgroundColor: `${accentColor}18`, boxShadow: `0 0 0 2px ${accentColor}24` } : undefined}
              >
                <span className="block text-[10px] font-bold uppercase tracking-wide text-slate-400">{title}</span>
                <span className="mt-1 block text-sm font-black text-white">{String(signal)} - {String(probability)}%</span>
              </button>
            ))}
          </div>
        </section>

        <section className="mt-4 rounded-2xl border border-white/[0.08] bg-[#0d192b] p-3 shadow-[0_16px_40px_rgba(0,0,0,0.16)] sm:p-4">
          <h2 className="text-sm font-black text-white">Strategy</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {STRATEGIES.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setStrategy(item)}
                className={`rounded-lg px-3 py-2 text-xs font-black ${
                  strategy === item ? 'text-white' : 'border border-white/[0.08] bg-[#111f33] text-slate-300'
                }`}
                style={strategy === item ? { backgroundColor: accentColor } : undefined}
              >
                {item}
              </button>
            ))}
          </div>

          {(strategy === 'Over/Under' || strategy === 'High/Low' || strategy === 'Barrier') && (
            <div className="mt-4 flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400">Threshold</span>
              <select
                value={threshold}
                onChange={(event) => setThreshold(Number(event.target.value))}
                className="rounded-lg border border-white/[0.08] bg-[#111f33] px-2 py-1.5 text-sm font-black text-white"
              >
                {Array.from({ length: 9 }, (_, index) => index + 1).map((value) => <option key={value} value={value}>{value}</option>)}
              </select>
            </div>
          )}
        </section>

        <section className="mt-4 rounded-2xl border border-white/[0.08] bg-[#0d192b] p-3 shadow-[0_16px_40px_rgba(0,0,0,0.16)] sm:p-4">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <h2 className="text-sm font-black text-white">Duration (1 To 5 Ticks)</h2>
            <span className="rounded-md px-2 py-1 text-xs font-black" style={{ backgroundColor: `${accentColor}20`, color: accentColor }}>
              {durationTicks} {durationTicks === 1 ? 'Tick' : 'Ticks'}
            </span>
          </div>
          <div className="mt-3 grid grid-cols-5 gap-2">
            {[1, 2, 3, 4, 5].map((ticks) => (
              <button
                key={ticks}
                type="button"
                onClick={() => {
                  setDurationTicks(ticks);
                  setManualSignal(null);
                }}
                className={`rounded-xl border px-2 py-3 text-center transition ${
                  durationTicks === ticks ? 'text-white' : 'border-white/[0.08] bg-[#111f33] text-slate-300'
                }`}
                style={durationTicks === ticks ? { borderColor: accentColor, backgroundColor: accentColor } : undefined}
                aria-pressed={durationTicks === ticks}
              >
                <span className="block text-lg font-black">{ticks}</span>
                <span className="mt-1 block text-[10px] font-bold">{ticks === 1 ? '1 Tick' : `${ticks} Ticks`}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="mt-4 rounded-2xl border border-white/[0.08] bg-[#0d192b] p-3 shadow-[0_16px_40px_rgba(0,0,0,0.16)] sm:p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-black text-white">Live Digits</h2>
            <span className="text-xs font-bold text-slate-400">{digits.length} ticks</span>
          </div>
          <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
            {digits.slice(-30).map((digit, index) => (
              <span key={`${digit}-${index}`} className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-black ${
                index === digits.slice(-30).length - 1 ? 'text-white' : 'bg-[#111f33] text-slate-200'
              }`} style={index === digits.slice(-30).length - 1 ? { backgroundColor: accentColor } : undefined}>
                {digit}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-4 rounded-2xl border border-white/[0.08] bg-[#0d192b] p-3 shadow-[0_16px_40px_rgba(0,0,0,0.16)] sm:p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">Signal Generator</p>
              <p className="mt-1 text-xs font-bold text-slate-300">
                {connected ? `${strategy} analysis for ${durationTicks} ${durationTicks === 1 ? 'tick' : 'ticks'}` : 'Connect the data feed to generate a signal'}
              </p>
            </div>
          <button
            type="button"
            onClick={generateSignal}
            disabled={!connected || digits.length < 25 || generatingSignal || countdownSeconds > 0}
            className="h-12 w-full shrink-0 rounded-xl text-sm font-black text-white shadow-sm transition disabled:cursor-not-allowed disabled:bg-slate-300 sm:w-52"
            style={!connected || digits.length < 25 || generatingSignal || countdownSeconds > 0 ? undefined : { backgroundColor: accentColor }}
          >
            {generatingSignal ? 'Generating Signal...' : countdownSeconds > 0 ? `Cooldown - ${countdownSeconds}s` : 'Generate Signal'}
          </button>
          </div>
        </section>

        <section className="mt-4 rounded-2xl border border-white/[0.08] bg-[#0d192b] p-5 text-center shadow-[0_16px_40px_rgba(0,0,0,0.16)]">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">Signal Result</p>
          <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Recommended Signal</p>
          <h2 className="mt-2 text-3xl font-black" style={{ color: accentColor }}>
            {manualSignal?.label ?? `${strategy.toUpperCase()} - WAIT`}
          </h2>
          <p className="mt-2 text-sm font-black text-slate-200">
            Confidence: {manualSignal ? `${manualSignal.confidence}%` : '--'}
          </p>
          {manualSignal && (
            <div className="mt-3 inline-flex min-w-32 items-center justify-center rounded-lg border px-4 py-2" style={{ borderColor: `${accentColor}55`, backgroundColor: countdownSeconds > 0 ? `${accentColor}18` : undefined }}>
              <span className="text-xs font-black uppercase tracking-[0.12em]" style={{ color: countdownSeconds > 0 ? accentColor : undefined }}>
                {countdownSeconds > 0 ? `Next Signal: ${countdownSeconds}s` : 'Analysis Ready'}
              </span>
            </div>
          )}
        </section>

        <section className="mt-4 grid gap-4 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="rounded-2xl border border-white/[0.08] bg-[#0d192b] p-4 shadow-[0_16px_40px_rgba(0,0,0,0.16)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">Digits Graph</p>
                <h2 className="mt-1 text-sm font-black text-white">Last 100 Digits</h2>
              </div>
              <span className="text-xs font-bold text-slate-400">{digits.length} samples</span>
            </div>
            <div className="mt-5 flex h-44 items-end gap-2 border-b border-white/[0.08] px-1">
              {digitDistribution.map((item) => (
                <div key={item.digit} className="flex h-full min-w-0 flex-1 flex-col justify-end text-center">
                  <span className="mb-1 text-[9px] font-bold text-slate-400">{item.percentage.toFixed(0)}%</span>
                  <div
                    className="mx-auto w-full max-w-7 rounded-t-md transition-all duration-300"
                    style={{
                      height: `${Math.max(4, item.percentage * 3.2)}%`,
                      backgroundColor: matchResult.best?.digit === item.digit ? accentColor : `${accentColor}55`,
                    }}
                    title={`Digit ${item.digit}: ${item.count} occurrences`}
                  />
                  <span className="mt-2 text-xs font-black text-slate-300">{item.digit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-[#0d192b] p-4 shadow-[0_16px_40px_rgba(0,0,0,0.16)]">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">AI Machine</p>
              <span className={`h-2 w-2 rounded-full ${connected ? 'animate-pulse' : 'bg-slate-500'}`} style={connected ? { backgroundColor: accentColor } : undefined} />
            </div>
            <div className="mt-4 rounded-xl border border-white/[0.08] bg-[#111f33] p-4 text-center">
              <div
                className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-4 border-white/[0.08]"
                style={{ boxShadow: `0 0 28px ${accentColor}40`, borderColor: `${accentColor}55` }}
              >
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-full text-lg font-black text-white"
                  style={{ backgroundColor: accentColor }}
                >
                  AI
                </div>
              </div>
              <p className="mt-3 text-sm font-black text-white">{connected ? 'ENGINE ACTIVE' : 'ENGINE STANDBY'}</p>
              <p className="mt-1 text-xs text-slate-400">{digits.length >= 25 ? 'Pattern analysis ready' : 'Collecting market data'}</p>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <div className="rounded-lg bg-[#111f33] px-3 py-2 text-center">
                <p className="text-[9px] font-bold uppercase text-slate-500">Samples</p>
                <p className="mt-1 text-sm font-black text-white">{digits.length}</p>
              </div>
              <div className="rounded-lg bg-[#111f33] px-3 py-2 text-center">
                <p className="text-[9px] font-bold uppercase text-slate-500">Confidence</p>
                <p className="mt-1 text-sm font-black text-white">{manualSignal?.confidence ?? '--'}%</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-4 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0d192b] shadow-[0_16px_40px_rgba(0,0,0,0.16)]">
          <div className="flex items-center justify-between border-b border-white/[0.08] px-4 py-4">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.18em]" style={{ color: accentColor }}>Final Processing Layer</p>
              <h2 className="mt-1 text-sm font-black uppercase tracking-[0.12em] text-white">Neural Analysis Engine</h2>
            </div>
            <span className={`rounded-full px-3 py-1 text-[10px] font-black ${
              connected && digits.length >= 25 ? 'text-white' : 'bg-slate-700 text-slate-300'
            }`} style={connected && digits.length >= 25 ? { backgroundColor: accentColor } : undefined}>
              {connected && digits.length >= 25 ? 'ANALYZING' : 'STANDBY'}
            </span>
          </div>
          <div className="grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-white/[0.08] bg-[#111f33] p-3">
              <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500">Active Market</p>
              <p className="mt-2 truncate text-sm font-black text-white">{marketName}</p>
            </div>
            <div className="rounded-xl border border-white/[0.08] bg-[#111f33] p-3">
              <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500">Selected Strategy</p>
              <p className="mt-2 text-sm font-black text-white">{strategy}</p>
            </div>
            <div className="rounded-xl border border-white/[0.08] bg-[#111f33] p-3">
              <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500">Signal Duration</p>
              <p className="mt-2 text-sm font-black text-white">{durationTicks} {durationTicks === 1 ? 'Tick' : 'Ticks'}</p>
            </div>
            <div className="rounded-xl border border-white/[0.08] bg-[#111f33] p-3">
              <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500">Neural Confidence</p>
              <p className="mt-2 text-sm font-black" style={{ color: accentColor }}>
                {manualSignal ? `${manualSignal.confidence}%` : 'Awaiting Signal'}
              </p>
            </div>
          </div>
          {predictedOutcomeDigit !== null && (
            <div className="mx-4 mb-4 rounded-xl border border-white/[0.08] bg-[#111f33] p-3">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg text-xl font-black text-white shadow-lg"
                  style={{ backgroundColor: accentColor, boxShadow: `0 8px 24px ${accentColor}35` }}
                >
                  {predictedOutcomeDigit}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full text-xs font-black text-white" style={{ backgroundColor: accentColor }}>
                      ✓
                    </span>
                    <p className="text-[9px] font-black uppercase tracking-[0.14em] text-slate-400">Predicted Outcome</p>
                  </div>
                  <p className="mt-1 text-sm font-black text-white">
                    Digit {predictedOutcomeDigit} is predicted to match the last tick
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>

      </div>
    </main>
  );
}
