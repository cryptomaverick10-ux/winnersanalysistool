'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { analyzeMatchDigits, parseLastDigit, type MatchAiResult } from '@/lib/match-ai';

const DERIV_WS_URL = 'wss://ws.derivws.com/websockets/v3?app_id=1089';
const MAX_DIGITS = 200;

const MARKETS = [
  ['Volatility 100 Index', 'R_100'],
  ['Volatility 75 Index', 'R_75'],
  ['Volatility 50 Index', 'R_50'],
  ['Volatility 25 Index', 'R_25'],
  ['Volatility 10 Index', 'R_10'],
  ['Volatility 100 (1s)', 'RDB100'],
  ['Volatility 75 (1s)', 'RDB75'],
  ['Volatility 50 (1s)', 'RDB50'],
  ['Volatility 25 (1s)', 'RDB25'],
  ['Volatility 10 (1s)', 'RDB10'],
  ['Boom 300', 'BOOM300N'],
  ['Boom 500', 'BOOM500'],
  ['Boom 1000', 'BOOM1000'],
  ['Crash 300', 'CRASH300N'],
  ['Crash 500', 'CRASH500'],
  ['Crash 1000', 'CRASH1000'],
  ['Jump 10', 'JD10'],
  ['Jump 25', 'JD25'],
  ['Jump 50', 'JD50'],
  ['Jump 75', 'JD75'],
  ['Jump 100', 'JD100'],
] as const;

const LOOKBACKS = [25, 50, 100, 200] as const;

interface Settings {
  lookback: (typeof LOOKBACKS)[number];
  stake: string;
  sound: boolean;
  threshold: number;
}

export function MatchAiApp() {
  const [symbol, setSymbol] = useState('R_100');
  const [livePrice, setLivePrice] = useState<number | null>(null);
  const [digits, setDigits] = useState<number[]>([]);
  const [connected, setConnected] = useState(false);
  const [settings, setSettings] = useState<Settings>({
    lookback: 100,
    stake: '10',
    sound: true,
    threshold: 75,
  });
  const [flash, setFlash] = useState(false);
  const socketRef = useRef<WebSocket | null>(null);
  const subscriptionIdRef = useRef<string | number | null>(null);
  const reconnectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastSignalRef = useRef('');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('match-ai-settings');
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<Settings>;
        setSettings((current) => ({
          lookback: LOOKBACKS.includes(parsed.lookback as Settings['lookback'])
            ? parsed.lookback as Settings['lookback']
            : current.lookback,
          stake: typeof parsed.stake === 'string' ? parsed.stake : current.stake,
          sound: typeof parsed.sound === 'boolean' ? parsed.sound : current.sound,
          threshold: typeof parsed.threshold === 'number' ? parsed.threshold : current.threshold,
        }));
      }
    } catch {
      // Keep defaults if stored settings are invalid.
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('match-ai-settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    let disposed = false;

    const connect = () => {
      if (disposed) return;
      setConnected(false);
      const socket = new WebSocket(DERIV_WS_URL);
      socketRef.current = socket;
      subscriptionIdRef.current = null;

      socket.onopen = () => {
        setConnected(true);
        socket.send(JSON.stringify({
          ticks_history: symbol,
          count: 200,
          end: 'latest',
          style: 'ticks',
        }));
      };

      socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        if (message.error) {
          setConnected(false);
          return;
        }

        if (message.history?.prices) {
          const backfilled = message.history.prices.map((price: number) => parseLastDigit(price)).filter(
            (digit: number | null): digit is number => digit !== null
          );
          setDigits(backfilled.slice(-MAX_DIGITS));
          const latest = message.history.prices.at(-1);
          if (typeof latest === 'number') setLivePrice(latest);

          socket.send(JSON.stringify({ ticks: symbol, subscribe: 1 }));
        }

        if (message.tick) {
          subscriptionIdRef.current = message.tick.subscription_id ?? subscriptionIdRef.current;
          const price = Number(message.tick.quote);
          const digit = parseLastDigit(price);
          if (digit !== null) {
            setLivePrice(price);
            setDigits((current) => [...current, digit].slice(-MAX_DIGITS));
          }
        }
      };

      socket.onerror = () => setConnected(false);
      socket.onclose = () => {
        setConnected(false);
        subscriptionIdRef.current = null;
        if (!disposed) {
          reconnectTimerRef.current = setTimeout(connect, 1500);
        }
      };
    };

    connect();
    return () => {
      disposed = true;
      if (reconnectTimerRef.current) clearTimeout(reconnectTimerRef.current);
      const socket = socketRef.current;
      if (socket?.readyState === WebSocket.OPEN && subscriptionIdRef.current !== null) {
        socket.send(JSON.stringify({ forget: subscriptionIdRef.current }));
      }
      socket?.close();
      socketRef.current = null;
    };
  }, [symbol]);

  const result: MatchAiResult = useMemo(
    () => analyzeMatchDigits(digits, settings.lookback),
    [digits, settings.lookback]
  );

  useEffect(() => {
    if (!result.best || result.waiting || result.confidence <= settings.threshold) return;
    const signalKey = `${symbol}:${result.best.digit}:${result.confidence}`;
    if (lastSignalRef.current === signalKey) return;
    lastSignalRef.current = signalKey;

    setFlash(true);
    window.setTimeout(() => setFlash(false), 900);

    if (settings.sound) {
      const AudioContextClass = window.AudioContext
        || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        const audio = new AudioContextClass();
        const oscillator = audio.createOscillator();
        const gain = audio.createGain();
        oscillator.frequency.value = 880;
        gain.gain.setValueAtTime(0.08, audio.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + 0.18);
        oscillator.connect(gain);
        gain.connect(audio.destination);
        oscillator.start();
        oscillator.stop(audio.currentTime + 0.18);
        oscillator.onended = () => void audio.close();
      }
    }
  }, [result, settings.sound, settings.threshold, symbol]);

  const marketName = MARKETS.find(([, value]) => value === symbol)?.[0] ?? symbol;

  const updateSetting = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    setSettings((current) => ({ ...current, [key]: value }));
  };

  return (
    <main className={`min-h-screen bg-white text-slate-900 transition-colors ${flash ? 'ring-4 ring-inset ring-blue-400' : ''}`}>
      <div className="mx-auto w-full max-w-3xl px-4 py-5 sm:px-6">
        <header className="flex items-center justify-between gap-3 rounded-2xl bg-gray-100 p-4 shadow-sm">
          <div>
            <h1 className="text-xl font-bold sm:text-2xl">Match AI</h1>
            <p className="text-xs text-gray-500 sm:text-sm">Matches only</p>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={symbol}
              onChange={(event) => setSymbol(event.target.value)}
              aria-label="Market"
              className="max-w-36 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold outline-none focus:border-blue-500 sm:max-w-none"
            >
              {MARKETS.map(([name, value]) => (
                <option key={value} value={value}>{name}</option>
              ))}
            </select>
          </div>
        </header>

        <section className="mt-4 flex items-center justify-between rounded-2xl border border-gray-100 px-4 py-3 shadow-sm">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">{marketName}</p>
            <p className="mt-1 text-lg font-bold tabular-nums">
              {livePrice === null ? '--' : livePrice}
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-600">
            <span className={`h-2.5 w-2.5 rounded-full bg-green-500 ${connected ? 'animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]' : 'bg-gray-400'}`} />
            {connected ? 'LIVE' : 'RECONNECTING'}
          </div>
        </section>

        <section className="mt-4 rounded-2xl bg-gray-100 p-5 text-center shadow-sm">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-gray-500">AI Signal</p>
          {result.waiting || !result.best ? (
            <>
              <h2 className="mt-3 text-3xl font-black text-gray-700">WAIT</h2>
              <div className="mx-auto mt-4 h-3 max-w-md overflow-hidden rounded-full bg-white">
                <div className="h-full w-0 rounded-full bg-blue-500" />
              </div>
              <div className="mt-3 inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700">
                WAIT - NO SETUP
              </div>
              <p className="mt-3 text-sm text-gray-500">No strong setup at the current tick gap.</p>
            </>
          ) : (
            <>
              <h2 className="mt-2 text-5xl font-black text-blue-600">MATCH {result.best.digit}</h2>
              <p className="mt-2 text-lg font-bold text-slate-800">{result.confidence}% Confidence</p>
              <div className="mx-auto mt-4 h-3 max-w-md overflow-hidden rounded-full bg-white">
                <div className="h-full rounded-full bg-blue-500 transition-all duration-300" style={{ width: `${result.confidence}%` }} />
              </div>
              <div className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                result.risk === 'LOW RISK'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-amber-100 text-amber-700'
              }`}>
                {result.risk}
              </div>
              <p className="mt-3 text-sm text-gray-600">
                Gap: {result.best.gap} ticks | Hit rate: {result.best.percentage.toFixed(1)}% in last {settings.lookback}
              </p>
            </>
          )}
        </section>

        <section className="mt-4 rounded-2xl bg-gray-100 p-4 shadow-sm">
          <div className="grid grid-cols-5 gap-2 sm:grid-cols-10">
            {result.ranked.map((item) => {
              const isBest = result.best?.digit === item.digit && !result.waiting;
              return (
                <div
                  key={item.digit}
                  className={`rounded-xl px-1 py-3 text-center shadow-sm ${
                    isBest ? 'bg-blue-600 text-white ring-2 ring-blue-300' : 'bg-white text-slate-900'
                  }`}
                >
                  <div className="text-lg font-black">{item.digit}</div>
                  <div className="mt-1 text-xs font-bold">{item.percentage.toFixed(1)}%</div>
                  <div className={`text-[11px] ${isBest ? 'text-blue-100' : 'text-gray-500'}`}>Gap {item.gap}</div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-100">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-bold">Last 20 digits</h3>
            <p className="text-xs text-gray-500">Live</p>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {digits.slice(-20).map((digit, index) => (
              <span key={`${digit}-${index}`} className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-sm font-bold">
                {digit}
              </span>
            ))}
          </div>
        </section>

        {result.ranked.length > 0 && (
          <section className="mt-4 grid grid-cols-3 gap-2">
            {result.ranked.slice(0, 3).map((item, index) => (
              <div key={item.digit} className="rounded-xl bg-gray-100 px-3 py-2 text-center">
                <p className="text-xs font-bold text-gray-500">#{index + 1}</p>
                <p className="text-lg font-black text-blue-600">MATCH {item.digit}</p>
              </div>
            ))}
          </section>
        )}

        <section className="mt-4 rounded-2xl bg-gray-100 p-4 shadow-sm">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-500">Lookback</label>
              <div className="grid grid-cols-4 gap-2">
                {LOOKBACKS.map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => updateSetting('lookback', value)}
                    className={`rounded-xl px-2 py-2 text-sm font-bold ${settings.lookback === value ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <label className="text-xs font-bold text-gray-500">
                Stake
                <input
                  type="number"
                  min="0"
                  value={settings.stake}
                  onChange={(event) => updateSetting('stake', event.target.value)}
                  className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-slate-900"
                />
              </label>
              <label className="text-xs font-bold text-gray-500">
                Confidence %
                <input
                  type="number"
                  min="0"
                  max="95"
                  value={settings.threshold}
                  onChange={(event) => updateSetting('threshold', Math.max(0, Math.min(95, Number(event.target.value) || 0)))}
                  className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-slate-900"
                />
              </label>
            </div>
            <label className="flex items-center justify-between rounded-xl bg-white px-3 py-2 text-sm font-bold sm:col-span-2">
              Sound alert
              <button
                type="button"
                role="switch"
                aria-checked={settings.sound}
                onClick={() => updateSetting('sound', !settings.sound)}
                className={`relative h-6 w-11 rounded-full transition-colors ${settings.sound ? 'bg-blue-600' : 'bg-gray-300'}`}
              >
                <span className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${settings.sound ? 'left-6' : 'left-1'}`} />
              </button>
            </label>
          </div>
        </section>

        <footer className="py-6 text-center text-xs text-gray-400">
          Analysis only. Not financial advice.
        </footer>
      </div>
    </main>
  );
}
