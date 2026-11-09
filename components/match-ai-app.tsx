'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  analyzeLiveDigitStrategies,
  analyzeMatchDigits,
  evaluateLiveMatchValidation,
  getSignalStrength,
  parseLastDigit,
  toMarketActivityIndex,
  toLivePatternScore,
  type LiveDigitStrategyAnalysis,
  type MatchAiResult,
} from '@/lib/match-ai';
import { getPublicWsUrl } from '@deriv/core';
import { useDerivWSContext } from '@/components/custom/deriv-ws-provider';

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
  observedRate: number;
  targetDigit: number | null;
  sampleCount: number;
}

interface ScanResult {
  name: string;
  symbol: string;
  score: number;
  movement: number;
  uniqueDigits: number;
  price: number | null;
  sampleCount: number;
}

interface MatchTrackerAttempt {
  attempt: number;
  predictedDigit: number;
  actualDigit: number;
  result: 'WIN' | 'MISS';
  epoch: number | null;
}

interface MatchTrackerState {
  active: boolean;
  attempts: MatchTrackerAttempt[];
  pendingDigit: number | null;
  currentStreak: number;
  bestStreak: number;
}

type LiveStrategyName = 'Exhaustion Reversal' | 'Micro-Cluster Momentum' | 'Dominant Gap-Divergence';

interface LiveStrategyCandidate {
  key: string;
  name: LiveStrategyName;
  digit: number;
  validationTicks: number;
}

interface StrategyCountdown {
  candidate: LiveStrategyCandidate;
  endsAt: number;
}

interface StrategyAlert extends LiveStrategyCandidate {
  remainingTicks: number;
  matchedTicks: number;
}

interface StrategyOutcome {
  name: LiveStrategyName;
  digit: number;
  matchedTicks: number;
  totalTicks: number;
}

const EMPTY_MATCH_TRACKER: MatchTrackerState = {
  active: false,
  attempts: [],
  pendingDigit: null,
  currentStreak: 0,
  bestStreak: 0,
};

export function MatchAiApp() {
  const [symbol, setSymbol] = useState('R_10');
  const [strategy, setStrategy] = useState<Strategy>('Matches');
  const [accentColor, setAccentColor] = useState('#2563eb');
  const [livePrice, setLivePrice] = useState<number | null>(null);
  const [prices, setPrices] = useState<number[]>([]);
  const [digits, setDigits] = useState<number[]>([]);
  const [connected, setConnected] = useState(false);
  const [clockNow, setClockNow] = useState<number | null>(null);
  const [derivTimeOffset, setDerivTimeOffset] = useState<number | null>(null);
  const [feedError, setFeedError] = useState<string | null>(null);
  const [durationTicks, setDurationTicks] = useState(1);
  const [threshold, setThreshold] = useState(5);
  const [manualSignal, setManualSignal] = useState<ManualSignal | null>(null);
  const [isGeneratingSignal, setIsGeneratingSignal] = useState(false);
  const [signalAnalysisProgress, setSignalAnalysisProgress] = useState({
    completed: 0,
    total: 0,
    candidateDigit: null as number | null,
  });
  const [strategyCountdown, setStrategyCountdown] = useState<StrategyCountdown | null>(null);
  const [strategyAlert, setStrategyAlert] = useState<StrategyAlert | null>(null);
  const [lastStrategyOutcome, setLastStrategyOutcome] = useState<StrategyOutcome | null>(null);
  const [matchTracker, setMatchTracker] = useState<MatchTrackerState>(EMPTY_MATCH_TRACKER);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResults, setScanResults] = useState<ScanResult[]>([]);
  const [scanRunNumber, setScanRunNumber] = useState(0);
  const [scannerError, setScannerError] = useState<string | null>(null);
  const [themeMode, setThemeMode] = useState<'dark' | 'light'>('dark');
  const [language, setLanguage] = useState('English');
  const scannerSocketRef = useRef<WebSocket | null>(null);
  const signalAnalysisIdRef = useRef(0);
  const matchTrackerRef = useRef<MatchTrackerState>(EMPTY_MATCH_TRACKER);
  const strategyAlertRef = useRef<StrategyAlert | null>(null);
  const strategyCandidateRef = useRef<LiveStrategyCandidate | null>(null);
  const triggeredStrategyKeyRef = useRef<string | null>(null);
  const historyPricesRef = useRef<number[]>([]);
  const liveDigitsRef = useRef<number[]>([]);
  const tickPipSizeRef = useRef<number | null>(null);
  const { ws, isConnected: socketConnected } = useDerivWSContext();

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
    if (!connected) {
      setClockNow(null);
      setDerivTimeOffset(null);
      return;
    }

    setClockNow(Date.now());
    const timer = window.setInterval(() => setClockNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, [connected]);

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

  useEffect(() => {
    let disposed = false;
    let unsubscribe: (() => Promise<void>) | null = null;
    historyPricesRef.current = [];
    tickPipSizeRef.current = null;
    setConnected(false);

    if (!ws || !socketConnected) {
      return () => {
        disposed = true;
      };
    }

    const handleTick = (message: Record<string, unknown>) => {
      const tick = message.tick as {
        quote?: number | string;
        epoch?: number;
        pip_size?: number;
      } | undefined;
      if (!tick) return;
      const price = Number(tick.quote);
      if (!Number.isFinite(price)) return;
      if (typeof tick.pip_size === 'number' && Number.isInteger(tick.pip_size)) {
        tickPipSizeRef.current = tick.pip_size;
      }
      const nextPrices = [...historyPricesRef.current, price].slice(-MAX_DIGITS);
      historyPricesRef.current = nextPrices;
      setConnected(true);
      setFeedError(null);
      if (typeof tick.epoch === 'number' && Number.isFinite(tick.epoch)) {
        setDerivTimeOffset(tick.epoch * 1000 - Date.now());
      }
      setLivePrice(price);
      setPrices(nextPrices);
      const pipSize = tickPipSizeRef.current;
      let nextDigits: number[];
      if (pipSize !== null) {
        nextDigits = nextPrices
          .map((item) => parseLastDigit(item, pipSize))
          .filter((digit): digit is number => digit !== null);
      } else {
        const digit = parseLastDigit(price);
        nextDigits = digit === null ? liveDigitsRef.current : [...liveDigitsRef.current, digit].slice(-MAX_DIGITS);
      }
      liveDigitsRef.current = nextDigits;
      setDigits(nextDigits);

      const tracker = matchTrackerRef.current;
      const observedDigit = nextDigits.at(-1);
      const currentAlert = strategyAlertRef.current;
      if (currentAlert && observedDigit !== undefined) {
        const matchedTicks = currentAlert.matchedTicks + Number(observedDigit === currentAlert.digit);
        const remainingTicks = currentAlert.remainingTicks - 1;
        if (remainingTicks <= 0) {
          strategyAlertRef.current = null;
          setStrategyAlert(null);
          setLastStrategyOutcome({
            name: currentAlert.name,
            digit: currentAlert.digit,
            matchedTicks,
            totalTicks: currentAlert.validationTicks,
          });
        } else {
          const nextAlert = { ...currentAlert, matchedTicks, remainingTicks };
          strategyAlertRef.current = nextAlert;
          setStrategyAlert(nextAlert);
        }
      }
      if (tracker.active && tracker.pendingDigit !== null && observedDigit !== undefined) {
        const isWin = tracker.pendingDigit === observedDigit;
        const attempts = [
          ...tracker.attempts,
          {
            attempt: tracker.attempts.length + 1,
            predictedDigit: tracker.pendingDigit,
            actualDigit: observedDigit,
            result: isWin ? 'WIN' as const : 'MISS' as const,
            epoch: typeof tick.epoch === 'number' && Number.isFinite(tick.epoch) ? tick.epoch : null,
          },
        ];
        const currentStreak = isWin ? tracker.currentStreak + 1 : 0;
        const isComplete = attempts.length >= 20;
        const nextCandidate = isComplete
          ? null
          : analyzeMatchDigits(nextDigits, 100).best?.digit ?? null;
        const nextTracker: MatchTrackerState = {
          active: !isComplete,
          attempts,
          pendingDigit: nextCandidate,
          currentStreak,
          bestStreak: Math.max(tracker.bestStreak, currentStreak),
        };
        matchTrackerRef.current = nextTracker;
        setMatchTracker(nextTracker);
      }
    };

    const subscribeToTicks = async () => {
      try {
        const history = await ws.send<{
          history?: { prices?: number[] };
          pip_size?: number;
        }>({
          ticks_history: symbol,
          count: MAX_DIGITS,
          end: 'latest',
          style: 'ticks',
        });
        if (disposed) return;

        const historyPrices = (history.history?.prices ?? []).filter((price) => Number.isFinite(price));
        if (typeof history.pip_size === 'number' && Number.isInteger(history.pip_size)) {
          tickPipSizeRef.current = history.pip_size;
        }
        historyPricesRef.current = historyPrices.slice(-MAX_DIGITS);
        setPrices(historyPrices.slice(-MAX_DIGITS));
        const pipSize = tickPipSizeRef.current;
        const historyDigits = pipSize === null
          ? []
          : historyPrices
            .map((price) => parseLastDigit(price, pipSize))
            .filter((digit): digit is number => digit !== null)
            .slice(-MAX_DIGITS);
        liveDigitsRef.current = historyDigits;
        setDigits(historyDigits);
        if (historyPrices.length) setLivePrice(historyPrices.at(-1)!);

        const subscription = await ws.subscribe({ ticks: symbol }, handleTick);
        if (disposed) {
          void subscription.unsubscribe();
          return;
        }
        unsubscribe = subscription.unsubscribe;
      } catch (error) {
        if (disposed) return;
        setConnected(false);
        setFeedError(error instanceof Error ? error.message : 'Unable to load Deriv ticks.');
      }
    };

    void subscribeToTicks();

    return () => {
      disposed = true;
      if (unsubscribe) void unsubscribe();
    };
  }, [socketConnected, symbol, ws]);

  useEffect(() => {
    setIsGeneratingSignal(false);
    signalAnalysisIdRef.current += 1;
  }, [strategy]);

  useEffect(() => {
    signalAnalysisIdRef.current += 1;
    setIsGeneratingSignal(false);
    matchTrackerRef.current = EMPTY_MATCH_TRACKER;
    setMatchTracker(EMPTY_MATCH_TRACKER);
    strategyAlertRef.current = null;
    strategyCandidateRef.current = null;
    triggeredStrategyKeyRef.current = null;
    setStrategyAlert(null);
    setStrategyCountdown(null);
    setLastStrategyOutcome(null);
    liveDigitsRef.current = [];
    setDigits([]);
    setPrices([]);
    setLivePrice(null);
  }, [symbol]);

  const matchResult: MatchAiResult = useMemo(
    () => analyzeMatchDigits(digits, 100),
    [digits]
  );
  const liveMatchValidation = useMemo(
    () => evaluateLiveMatchValidation(digits),
    [digits]
  );
  const validationEvidence = liveMatchValidation.sampleCount < 100
    ? 'Need at least 100 test outcomes'
    : liveMatchValidation.confidenceInterval &&
        liveMatchValidation.confidenceInterval.lower > liveMatchValidation.randomBaseline
      ? 'Potential edge above baseline'
      : 'No clear edge above baseline';

  const analysis = useMemo(() => {
    const window = digits.slice(-100);
    const even = window.filter((digit) => digit % 2 === 0).length;
    const over = window.filter((digit) => digit >= threshold).length;
    const priceWindow = prices.slice(-100);
    const changes = priceWindow.slice(1).map((price, index) => price - priceWindow[index]);
    const risingChanges = changes.filter((change) => change > 0).length;
    const fallingChanges = changes.filter((change) => change < 0).length;
    const directionalChanges = risingChanges + fallingChanges;

    const evenProbability = window.length ? (even / window.length) * 100 : 0;
    const overProbability = window.length ? (over / window.length) * 100 : 0;
    const riseProbability = directionalChanges ? (risingChanges / directionalChanges) * 100 : 0;
    const fallProbability = directionalChanges ? (fallingChanges / directionalChanges) * 100 : 0;

    const bestMatchDigit = matchResult.best?.digit;
    const matchesCount = bestMatchDigit !== undefined
      ? window.filter((digit) => digit === bestMatchDigit).length
      : 0;
    const matchesProbability = window.length ? (matchesCount / window.length) * 100 : 0;
    const differsProbability = window.length ? 100 - matchesProbability : 0;

    return {
      evenProbability,
      overProbability,
      riseProbability,
      fallProbability,
      directionalChanges,
      matchSampleCount: window.length,
      matchesCount,
      differsCount: window.length - matchesCount,
      matchesProbability,
      differsProbability,
    };
  }, [digits, matchResult.best, prices, threshold]);
  const liveStrategyAnalysis: LiveDigitStrategyAnalysis = useMemo(
    () => analyzeLiveDigitStrategies(digits, prices, tickPipSizeRef.current),
    [digits, prices]
  );
  const activeStrategyCandidate = useMemo<LiveStrategyCandidate | null>(() => {
    if (!connected) return null;
    if (liveStrategyAnalysis.exhaustion.ready && liveStrategyAnalysis.exhaustion.digit !== null) {
      return {
        key: `exhaustion-${liveStrategyAnalysis.exhaustion.digit}`,
        name: 'Exhaustion Reversal',
        digit: liveStrategyAnalysis.exhaustion.digit,
        validationTicks: 1,
      };
    }
    if (liveStrategyAnalysis.momentum.ready && liveStrategyAnalysis.momentum.digit !== null) {
      return {
        key: `momentum-${liveStrategyAnalysis.momentum.digit}`,
        name: 'Micro-Cluster Momentum',
        digit: liveStrategyAnalysis.momentum.digit,
        validationTicks: 2,
      };
    }
    if (liveStrategyAnalysis.divergence.ready && liveStrategyAnalysis.divergence.digit !== null) {
      return {
        key: `divergence-${liveStrategyAnalysis.divergence.digit}`,
        name: 'Dominant Gap-Divergence',
        digit: liveStrategyAnalysis.divergence.digit,
        validationTicks: 1,
      };
    }
    return null;
  }, [
    connected,
    liveStrategyAnalysis.exhaustion.ready,
    liveStrategyAnalysis.exhaustion.digit,
    liveStrategyAnalysis.momentum.ready,
    liveStrategyAnalysis.momentum.digit,
    liveStrategyAnalysis.divergence.ready,
    liveStrategyAnalysis.divergence.digit,
  ]);
  strategyCandidateRef.current = activeStrategyCandidate;

  useEffect(() => {
    if (!connected || !activeStrategyCandidate) {
      setStrategyCountdown(null);
      if (!strategyAlertRef.current) triggeredStrategyKeyRef.current = null;
      return;
    }

    if (strategyAlertRef.current || triggeredStrategyKeyRef.current === activeStrategyCandidate.key) {
      setStrategyCountdown(null);
      return;
    }

    const candidate = activeStrategyCandidate;
    const countdown = { candidate, endsAt: Date.now() + 10_000 };
    setStrategyCountdown(countdown);
    const timeout = window.setTimeout(() => {
      if (strategyCandidateRef.current?.key !== candidate.key) return;
      const nextAlert: StrategyAlert = {
        ...candidate,
        remainingTicks: candidate.validationTicks,
        matchedTicks: 0,
      };
      triggeredStrategyKeyRef.current = candidate.key;
      strategyAlertRef.current = nextAlert;
      setStrategyAlert(nextAlert);
      setStrategyCountdown(null);
      setLastStrategyOutcome(null);
    }, 10_000);

    return () => window.clearTimeout(timeout);
  }, [activeStrategyCandidate, connected]);

  const digitDistribution = useMemo(() => {
    const window = digits.slice(-100);
    return Array.from({ length: 10 }, (_, digit) => ({
      digit,
      count: window.filter((value) => value === digit).length,
      percentage: window.length ? (window.filter((value) => value === digit).length / window.length) * 100 : 0,
    }));
  }, [digits]);
  const distributionSampleCount = Math.min(digits.length, 100);
  const recentTicks = useMemo(() => {
    const pipSize = tickPipSizeRef.current;
    if (pipSize === null) return [];

    return prices
      .slice(-10)
      .reverse()
      .map((price, index) => ({
        tick: index + 1,
        quote: price.toFixed(pipSize),
        digit: parseLastDigit(price, pipSize),
      }));
  }, [prices]);

  const tickSequenceAnalysis = useMemo(() => {
    const window = digits.slice(-100);
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

    const nextEven = evenProbability >= oddProbability;

    return {
      patternSamples: followTotal,
      evenProbability,
      oddProbability,
      nextEven,
    };
  }, [digits]);

  const marketName = MARKETS.find(([, value]) => value === symbol)?.[0] ?? symbol;
  const lastDigit = digits.at(-1) ?? null;
  const predictedMatch = manualSignal?.label.match(/^MATCH (\d)$/);
  const predictedOutcomeDigit = strategy === 'Matches' && predictedMatch ? Number(predictedMatch[1]) : null;
  const hasPatternData = connected && digits.length >= 25;
  const autoPatterns = [
    {
      title: 'Even / Odd',
      signal: hasPatternData ? (tickSequenceAnalysis.nextEven ? 'EVEN' : 'ODD') : 'WAIT',
      score: hasPatternData ? toLivePatternScore(tickSequenceAnalysis.nextEven
        ? tickSequenceAnalysis.evenProbability
        : tickSequenceAnalysis.oddProbability) : null,
      detail: hasPatternData ? `${tickSequenceAnalysis.patternSamples} sequence samples` : 'Waiting for 25 live ticks',
      strategy: 'Even/Odd' as Strategy,
    },
    {
      title: 'Over / Under',
      signal: hasPatternData ? (analysis.overProbability >= 50 ? `OVER ${threshold}` : `UNDER ${threshold}`) : 'WAIT',
      score: hasPatternData
        ? toLivePatternScore(analysis.overProbability >= 50 ? analysis.overProbability : 100 - analysis.overProbability)
        : null,
      detail: hasPatternData ? `${digits.slice(-100).length} recent digit samples` : 'Waiting for 25 live ticks',
      strategy: 'Over/Under' as Strategy,
    },
    {
      title: 'Rise / Fall',
      signal: hasPatternData && analysis.directionalChanges
        ? (analysis.riseProbability >= 50 ? 'RISE' : 'FALL')
        : 'WAIT',
      score: hasPatternData && analysis.directionalChanges
        ? toLivePatternScore(analysis.riseProbability >= 50 ? analysis.riseProbability : analysis.fallProbability)
        : null,
      detail: hasPatternData && analysis.directionalChanges
        ? `${analysis.directionalChanges} directional price changes`
        : 'Waiting for directional price changes',
      strategy: 'Rise/Fall' as Strategy,
    },
  ];

  const calculateScanResult = (
    name: string,
    marketSymbol: string,
    prices: number[],
    price: number | null,
    pipSize?: number
  ): ScanResult => {
    const recentPrices = prices.slice(-100);
    const changes = recentPrices.slice(1).map((current, index) => Math.abs(current - recentPrices[index]));
    const averagePrice = recentPrices.reduce((sum, current) => sum + current, 0) / Math.max(recentPrices.length, 1);
    const averageChange = changes.reduce((sum, current) => sum + current, 0) / Math.max(changes.length, 1);
    const movement = averagePrice > 0 ? (averageChange / averagePrice) * 10000 : 0;

    const counts = Array.from({ length: 10 }, () => 0);
    recentPrices.forEach((current) => {
      const digit = parseLastDigit(current, pipSize);
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
    const score = total < 10
      ? 0
      : toMarketActivityIndex(
        entropyScore,
        uniqueDigits / 10,
        movement / (movement + 1)
      );

    return { name, symbol: marketSymbol, score, movement, uniqueDigits, price, sampleCount: total };
  };

  const stopScanner = () => {
    const scanner = scannerSocketRef.current;
    scannerSocketRef.current = null;
    if (scanner && scanner.readyState < WebSocket.CLOSING) scanner.close();
    setIsScanning(false);
  };

  const startScanner = () => {
    stopScanner();
    setScannerError(null);
    setIsScanning(true);
    setScanRunNumber((run) => run + 1);
    setScanResults(MARKETS.map(([name, marketSymbol]) => ({
      name,
      symbol: marketSymbol,
      score: 0,
      movement: 0,
      uniqueDigits: 0,
      price: null,
      sampleCount: 0,
    })));

    let scanner: WebSocket;
    try {
      scanner = new WebSocket(getPublicWsUrl());
    } catch (error) {
      setIsScanning(false);
      setScannerError(error instanceof Error ? error.message : 'Unable to open the Deriv scanner connection.');
      return;
    }
    scannerSocketRef.current = scanner;
    const scanPrices = new Map<string, number[]>();
    const scanPipSizes = new Map<string, number>();
    const requestMarkets = new Map<number, string>();

    scanner.onopen = () => {
      if (scannerSocketRef.current !== scanner) return;
      try {
        MARKETS.forEach(([, marketSymbol], index) => {
          const reqId = index + 1;
          requestMarkets.set(reqId, marketSymbol);
          scanPrices.set(marketSymbol, []);
          scanner.send(JSON.stringify({
            ticks_history: marketSymbol,
            count: 100,
            end: 'latest',
            style: 'ticks',
            req_id: reqId,
          }));
          scanner.send(JSON.stringify({ ticks: marketSymbol, subscribe: 1 }));
        });
      } catch (error) {
        setScannerError(error instanceof Error ? error.message : 'Unable to request volatility market data.');
        stopScanner();
      }
    };

    scanner.onmessage = (event) => {
      if (scannerSocketRef.current !== scanner) return;
      let message: {
        error?: { message?: string; code?: string };
        req_id?: number;
        echo_req?: { req_id?: number; ticks_history?: string };
        history?: { prices?: Array<number | string> };
        pip_size?: number;
        tick?: { symbol?: string; quote?: number | string; pip_size?: number };
      };
      try {
        message = JSON.parse(event.data as string);
      } catch {
        setScannerError('Received an unreadable response from the Deriv market feed.');
        return;
      }
      if (message.error) {
        const failedMarket = typeof message.req_id === 'number'
          ? requestMarkets.get(message.req_id)
          : message.echo_req?.ticks_history;
        setScannerError(
          `${failedMarket ? `${failedMarket}: ` : ''}${message.error.message ?? message.error.code ?? 'Deriv rejected a scanner request.'}`
        );
        return;
      }

      const historyMarketSymbol = message.history?.prices
        ? (typeof message.req_id === 'number'
          ? requestMarkets.get(message.req_id)
          : message.echo_req?.ticks_history)
        : undefined;
      if (message.history?.prices && historyMarketSymbol) {
        const marketSymbol = historyMarketSymbol;
        const market = MARKETS.find(([, value]) => value === marketSymbol);
        const historyPrices = message.history.prices
          .map(Number)
          .filter((price) => Number.isFinite(price));
        if (typeof message.pip_size === 'number' && Number.isInteger(message.pip_size)) {
          scanPipSizes.set(marketSymbol, message.pip_size);
        }
        scanPrices.set(marketSymbol, historyPrices.slice(-100));
        if (market) {
          const result = calculateScanResult(
            market[0],
            marketSymbol,
            historyPrices,
            historyPrices.at(-1) ?? null,
            scanPipSizes.get(marketSymbol)
          );
          setScanResults((current) => {
            return current.map((item) => item.symbol === marketSymbol ? result : item);
          });
        }
      }

      if (message.tick?.symbol) {
        const marketSymbol = message.tick.symbol;
        const market = MARKETS.find(([, value]) => value === marketSymbol);
        const price = Number(message.tick.quote);
        if (!market || !Number.isFinite(price)) return;
        if (typeof message.tick.pip_size === 'number' && Number.isInteger(message.tick.pip_size)) {
          scanPipSizes.set(marketSymbol, message.tick.pip_size);
        }
        const nextPrices = [...(scanPrices.get(marketSymbol) ?? []), price].slice(-100);
        scanPrices.set(marketSymbol, nextPrices);
        const result = calculateScanResult(
          market[0],
          marketSymbol,
          nextPrices,
          price,
          scanPipSizes.get(marketSymbol)
        );
        setScanResults((current) => {
          return current.map((item) => item.symbol === marketSymbol ? result : item);
        });
      }
    };

    scanner.onerror = () => {
      if (scannerSocketRef.current !== scanner) return;
      setScannerError('The Deriv scanner connection encountered a network error. Check the connection and try again.');
      scanner.close();
    };
    scanner.onclose = () => {
      if (scannerSocketRef.current === scanner) {
        scannerSocketRef.current = null;
        setIsScanning(false);
        setScannerError((current) => current ?? 'The Deriv scanner connection closed. Start a new scan to reconnect.');
      }
    };
  };

  const selectScannedMarket = (market: ScanResult) => {
    setSymbol(market.symbol);
    stopScanner();
  };

  const startMatchTracker = () => {
    const history = liveDigitsRef.current.slice(-100);
    if (!connected || history.length < 25) return;
    const pendingDigit = analyzeMatchDigits(history, 100).best?.digit ?? null;
    if (pendingDigit === null) return;

    const nextTracker: MatchTrackerState = {
      ...EMPTY_MATCH_TRACKER,
      active: true,
      pendingDigit,
    };
    matchTrackerRef.current = nextTracker;
    setMatchTracker(nextTracker);
  };

  const stopMatchTracker = () => {
    const nextTracker = { ...matchTrackerRef.current, active: false, pendingDigit: null };
    matchTrackerRef.current = nextTracker;
    setMatchTracker(nextTracker);
  };

  const generateSignal = async () => {
    if (!connected || digits.length < 25 || isGeneratingSignal) return;
    const latestDigits = liveDigitsRef.current.slice(-100);
    if (latestDigits.length < 25) return;

    const analysisId = ++signalAnalysisIdRef.current;
    const firstWindowSize = 25;
    const totalWindows = latestDigits.length - firstWindowSize + 1;
    setSignalAnalysisProgress({
      completed: 0,
      total: totalWindows,
      candidateDigit: null,
    });
    setIsGeneratingSignal(true);

    for (let sampleSize = firstWindowSize; sampleSize <= latestDigits.length; sampleSize += 1) {
      if (analysisId !== signalAnalysisIdRef.current) return;
      const partialResult = analyzeMatchDigits(latestDigits.slice(0, sampleSize), 100);
      setSignalAnalysisProgress({
        completed: sampleSize - firstWindowSize + 1,
        total: totalWindows,
        candidateDigit: partialResult.best?.digit ?? null,
      });
      await new Promise<void>((resolve) => window.setTimeout(resolve, 25));
    }

    if (analysisId !== signalAnalysisIdRef.current) return;

    let label = 'WAIT';
    let observedRate = 0;
    let sampleCount = latestDigits.length;
    const durationWindow = latestDigits.slice(-Math.max(25, durationTicks * 25));
    const scanResult = analyzeMatchDigits(latestDigits, 100);
    if (strategy === 'Matches') {
      if (!scanResult.best) {
        setIsGeneratingSignal(false);
        return;
      }
      label = `MATCH ${scanResult.best.digit}`;
      observedRate = (scanResult.best.count / latestDigits.length) * 100;
    } else if (strategy === 'Differs') {
      const target = scanResult.best?.digit ?? TARGET_DIGIT;
      const matchesCount = latestDigits.filter((digit) => digit === target).length;
      label = `DIFFER FROM ${target}`;
      observedRate = ((latestDigits.length - matchesCount) / latestDigits.length) * 100;
    } else if (strategy === 'Over/Under') {
      sampleCount = durationWindow.length;
      const overCount = durationWindow.filter((digit) => digit >= threshold).length;
      const overRate = (overCount / durationWindow.length) * 100;
      observedRate = Math.max(overRate, 100 - overRate);
      label = overRate >= 50 ? `OVER ${threshold - 1}` : `UNDER ${threshold}`;
    } else if (strategy === 'Even/Odd') {
      sampleCount = durationWindow.length;
      const evenCount = durationWindow.filter((digit) => digit % 2 === 0).length;
      const evenRate = (evenCount / durationWindow.length) * 100;
      label = evenRate >= 50 ? 'EVEN' : 'ODD';
      observedRate = Math.max(evenRate, 100 - evenRate);
    } else if (strategy === 'Rise/Fall') {
      const scanPrices = historyPricesRef.current.slice(-100);
      const changes = scanPrices.slice(1).map((price, index) => price - scanPrices[index]);
      const risingChanges = changes.filter((change) => change > 0).length;
      const fallingChanges = changes.filter((change) => change < 0).length;
      const directionalChanges = risingChanges + fallingChanges;
      sampleCount = directionalChanges;
      const riseRate = directionalChanges ? (risingChanges / directionalChanges) * 100 : 0;
      label = riseRate >= 50 ? 'RISE' : 'FALL';
      observedRate = directionalChanges ? Math.max(riseRate, 100 - riseRate) : 0;
    } else if (strategy === 'High/Low' || strategy === 'Barrier') {
      sampleCount = durationWindow.length;
      const highCount = durationWindow.filter((digit) => digit >= threshold).length;
      const highRate = (highCount / durationWindow.length) * 100;
      label = highRate >= 50 ? `HIGH - ABOVE ${threshold - 1}` : `LOW - BELOW ${threshold}`;
      observedRate = Math.max(highRate, 100 - highRate);
    } else if (strategy === 'Asian') {
      sampleCount = durationWindow.length;
      const average = durationWindow.reduce((sum, digit) => sum + digit, 0) / durationWindow.length;
      const highCount = durationWindow.filter((digit) => digit >= 5).length;
      const highRate = (highCount / durationWindow.length) * 100;
      label = average >= 4.5 ? 'ASIAN HIGH' : 'ASIAN LOW';
      observedRate = average >= 4.5 ? highRate : 100 - highRate;
    } else {
      sampleCount = 0;
      label = 'WAIT - LIVE BARRIER DATA REQUIRED';
    }

    setManualSignal({
      label,
      observedRate: Math.round(observedRate),
      targetDigit: strategy === 'Matches' || strategy === 'Differs'
        ? scanResult.best?.digit ?? TARGET_DIGIT
        : strategy === 'Touch/No Touch'
          ? null
          : latestDigits.at(-1) ?? null,
      sampleCount,
    });
    setIsGeneratingSignal(false);
  };

  const refreshSignalOutput = () => {
    if (isGeneratingSignal) return;
    setManualSignal(null);
  };

  const signalScore = manualSignal
    ? Math.min(99, toLivePatternScore(manualSignal.observedRate))
    : 0;
  const signalStrength = getSignalStrength(signalScore);
  const signalTier = !manualSignal
    ? {
      label: 'Awaiting Signal',
      cardClassName: 'border-slate-700 bg-[#0b1426]',
      badgeClassName: 'border-slate-700/60 bg-slate-800/40 text-slate-400',
      heroClassName: 'border-slate-800/60 bg-[#121b2d]',
      textClassName: 'text-white',
    }
    : signalStrength === 'STRONG SIGNAL'
      ? {
        label: signalStrength,
        cardClassName: 'border-emerald-500/40 bg-emerald-950/5',
        badgeClassName: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.15)]',
        heroClassName: 'border-emerald-500/30 bg-[#0d2224]',
        textClassName: 'scale-105 text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.65)]',
      }
      : {
        label: signalStrength,
        cardClassName: 'border-amber-500/30 bg-amber-950/5',
        badgeClassName: 'border-amber-500/20 bg-amber-500/10 text-amber-400',
        heroClassName: 'border-amber-500/30 bg-[#191c25]',
        textClassName: 'text-amber-400 drop-shadow-[0_0_10px_rgba(245,158,11,0.4)]',
      };
  const readyMarketCount = scanResults.filter((result) => result.sampleCount >= 10).length;
  const rankedScanResults = useMemo(
    () => scanResults
      .filter((result) => result.score > 0)
      .sort((a, b) => b.score - a.score || b.sampleCount - a.sampleCount),
    [scanResults]
  );
  const recommendedMarkets = rankedScanResults.slice(0, 3);
  const featuredMarket = recommendedMarkets.length
    ? recommendedMarkets[(Math.max(1, scanRunNumber) - 1) % recommendedMarkets.length]
    : null;

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

        <section className="mt-4 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0d192b] shadow-[0_16px_40px_rgba(0,0,0,0.16)]">
          <div className="flex items-center justify-between border-b border-white/[0.08] px-4 py-4">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.18em]" style={{ color: accentColor }}>Live Signal Validation</p>
              <h2 className="mt-1 text-sm font-black uppercase tracking-[0.12em] text-white">Rolling Out-of-Sample Results</h2>
            </div>
            <span className={`rounded-full px-3 py-1 text-[10px] font-black ${
              liveMatchValidation.sampleCount > 0 ? 'text-white' : 'bg-slate-700 text-slate-300'
            }`} style={liveMatchValidation.sampleCount > 0 ? { backgroundColor: accentColor } : undefined}>
              {liveMatchValidation.sampleCount > 0
                ? `${liveMatchValidation.sampleCount} TESTS`
                : 'COLLECTING TICKS'}
            </span>
          </div>
          <div className="grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-white/[0.08] bg-[#111f33] p-3">
              <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500">Observed Hit Rate</p>
              <p className="mt-2 text-lg font-black text-white">
                {liveMatchValidation.accuracy === null
                  ? '--'
                  : `${liveMatchValidation.accuracy.toFixed(1)}%`}
              </p>
            </div>
            <div className="rounded-xl border border-white/[0.08] bg-[#111f33] p-3">
              <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500">Correct Predictions</p>
              <p className="mt-2 text-lg font-black text-white">
                {liveMatchValidation.correctPredictions} / {liveMatchValidation.sampleCount}
              </p>
            </div>
            <div className="rounded-xl border border-white/[0.08] bg-[#111f33] p-3">
              <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500">Approx. 95% Wilson Interval</p>
              <p className="mt-2 text-lg font-black text-white">
                {liveMatchValidation.confidenceInterval
                  ? `${liveMatchValidation.confidenceInterval.lower.toFixed(1)}-${liveMatchValidation.confidenceInterval.upper.toFixed(1)}%`
                  : '--'}
              </p>
            </div>
            <div className="rounded-xl border border-white/[0.08] bg-[#111f33] p-3">
              <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500">Random-Choice Baseline</p>
              <p className="mt-2 text-lg font-black text-white">{liveMatchValidation.randomBaseline}%</p>
              {liveMatchValidation.edgeVsBaseline !== null && (
                <p className="mt-1 text-xs font-semibold text-slate-400">
                  {liveMatchValidation.edgeVsBaseline >= 0 ? '+' : ''}
                  {liveMatchValidation.edgeVsBaseline.toFixed(1)} pts vs baseline
                </p>
              )}
            </div>
          </div>
          <p className="px-4 pb-2 text-xs font-bold text-slate-300">
            Evidence check: {validationEvidence}
          </p>
          <p className="px-4 pb-4 text-xs leading-relaxed text-slate-400">
            Each historical pick uses only earlier live ticks and is checked against the next tick.
            The interval is approximate and assumes independent outcomes; consecutive ticks may be dependent.
            Results do not guarantee future outcomes or 100% accuracy.
          </p>
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
                {isScanning ? 'Scanning volatility markets...' : rankedScanResults.length ? 'Recommended markets to analyze' : 'Scan all volatility markets'}
              </h2>
              <p className="mt-1 text-xs text-slate-400">
                {isScanning
                  ? `${readyMarketCount}/${MARKETS.length} markets have enough live samples · ${scanResults.reduce((sum, result) => sum + result.sampleCount, 0)} samples received`
                  : 'Compares live tick activity across synthetic indices; this score is not a win probability.'}
              </p>
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

          {recommendedMarkets.length > 0 && (
            <div className="mt-4">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                Top 3 live options · focus changes on each scan
              </p>
              <div className="grid gap-2 sm:grid-cols-3">
                {recommendedMarkets.map((market) => {
                  const isFeatured = market.symbol === featuredMarket?.symbol;
                  return (
                    <button
                      key={market.symbol}
                      type="button"
                      onClick={() => selectScannedMarket(market)}
                      className="rounded-xl border p-3 text-left transition hover:brightness-110"
                      style={{
                        borderColor: isFeatured ? `${accentColor}aa` : 'rgba(255,255,255,0.08)',
                        backgroundColor: isFeatured ? `${accentColor}18` : '#111f33',
                      }}
                      title={`Use ${market.name} for live analysis`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-[9px] font-black uppercase tracking-[0.12em] text-slate-400">
                            {isFeatured ? `Scan ${scanRunNumber} focus` : 'Alternative'}
                          </p>
                          <p className="mt-1 text-sm font-black text-white">{market.name}</p>
                          <p className="mt-1 text-[10px] font-semibold text-slate-400">
                            {market.sampleCount} ticks · {market.uniqueDigits}/10 digits · movement {market.movement.toFixed(2)} bps
                          </p>
                        </div>
                        <span className="shrink-0 text-lg font-black" style={{ color: accentColor }}>
                          {market.score}%
                        </span>
                      </div>
                      <p className="mt-2 text-[9px] font-bold uppercase tracking-wide text-slate-500">
                        Normalized activity rating · select market
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {scannerError && (
            <p role="alert" className="mt-3 rounded-lg border border-rose-400/20 bg-rose-400/10 px-3 py-2 text-xs font-semibold text-rose-300">
              {scannerError}
            </p>
          )}

          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-5">
            {rankedScanResults.map((result) => (
              <button
                key={result.symbol}
                type="button"
                onClick={() => {
                  setSymbol(result.symbol);
                  stopScanner();
                }}
                className="rounded-lg border border-white/[0.08] bg-[#111f33] px-2 py-2 text-center disabled:opacity-50"
                title={`${result.name}: ${result.sampleCount} live ticks sampled${result.price === null ? '' : `, latest price ${result.price}`}`}
              >
                <p className="truncate text-[9px] font-bold text-slate-400">{result.name}</p>
                <p className="mt-1 text-sm font-black text-white">{result.score}%</p>
                <p className="mt-1 text-[9px] text-slate-500">{result.sampleCount} ticks</p>
              </button>
            ))}
          </div>
        </section>

        <section className="mt-4 rounded-2xl border border-cyan-400/20 bg-[#0d192b] p-4 shadow-[0_16px_40px_rgba(0,0,0,0.16)]">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-cyan-300">Live Strategy Advisor</p>
              <h2 className="mt-1 text-sm font-black text-white">Analytical Signals · Manual Review Only</h2>
              <p className="mt-1 text-xs text-slate-400">Safe mode: no orders are placed. A signal is not a promise of a winning outcome.</p>
            </div>
            <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[9px] font-black uppercase tracking-wide text-emerald-300">
              No Action Needed
            </span>
          </div>

          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            {[
              {
                name: 'Exhaustion Reversal',
                ready: liveStrategyAnalysis.exhaustion.ready,
                primed: liveStrategyAnalysis.exhaustion.primed,
                detail: liveStrategyAnalysis.exhaustion.digit === null
                  ? 'Collecting live digit history'
                  : `Digit ${liveStrategyAnalysis.exhaustion.digit} absent for ${liveStrategyAnalysis.exhaustion.gap} ticks · primes at 35, qualifies at 38`,
              },
              {
                name: 'Micro-Cluster Momentum',
                ready: liveStrategyAnalysis.momentum.ready,
                primed: false,
                detail: liveStrategyAnalysis.momentum.digit === null
                  ? 'Waiting for an 8-tick window'
                  : `Digit ${liveStrategyAnalysis.momentum.digit}: ${liveStrategyAnalysis.momentum.count}/8 recent ticks · checks next 2 ticks`,
              },
              {
                name: 'Dominant Gap-Divergence',
                ready: liveStrategyAnalysis.divergence.ready,
                primed: liveStrategyAnalysis.divergence.digit !== null,
                detail: liveStrategyAnalysis.divergence.digit === null
                  ? 'Needs 18%+ in 200 ticks and 0 appearances in the latest 30'
                  : `Digit ${liveStrategyAnalysis.divergence.digit}: ${(liveStrategyAnalysis.divergence.longShare * 100).toFixed(1)}% long share, absent in 30 · volatility must be <65 points`,
              },
            ].map(({ name, ready, primed, detail }) => (
              <div key={name} className="rounded-xl border border-white/[0.08] bg-[#111f33] p-3">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-[10px] font-black uppercase tracking-wide text-slate-300">{name}</p>
                  <span className={`shrink-0 text-[8px] font-black uppercase ${ready ? 'text-emerald-300' : primed ? 'text-amber-300' : 'text-slate-500'}`}>
                    {ready ? 'Ready' : primed ? 'Primed' : 'Waiting'}
                  </span>
                </div>
                <p className="mt-2 text-[10px] leading-relaxed text-slate-400">{detail}</p>
              </div>
            ))}
          </div>

          <div className="mt-3 rounded-xl border border-white/[0.08] bg-[#111f33] p-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500">Pip-size volatility indicator</p>
                <p className="mt-1 text-sm font-black text-white">
                  {liveStrategyAnalysis.volatilityPoints === null
                    ? 'Collecting 35 ticks'
                    : `${liveStrategyAnalysis.volatilityPoints} points`}
                  <span className="ml-2 text-[9px] font-bold text-slate-400">
                    {liveStrategyAnalysis.stableVolatilityBaseline ? '64–65 baseline stable' : 'baseline not stable'}
                  </span>
                </p>
              </div>
              {strategyCountdown && (
                <p className="text-sm font-black tabular-nums text-amber-300">
                  {Math.max(0, Math.ceil((strategyCountdown.endsAt - (clockNow ?? Date.now())) / 1000))}s
                </p>
              )}
            </div>
            <p className="mt-2 text-[9px] leading-relaxed text-slate-500">
              Defined indicator: sum of absolute quote changes over the latest 30 tick intervals, divided by the displayed pip step and rounded. Exhaustion needs five consecutive rolling readings at 64–65 points; divergence uses a labeled safety filter below 65. This is a local calculation, not a Deriv-published volatility value.
            </p>
          </div>

          {strategyCountdown ? (
            <div className="mt-3 rounded-xl border border-amber-400/30 bg-amber-400/10 p-3" role="status" aria-live="polite">
              <p className="text-xs font-black text-amber-200">
                Confirming {strategyCountdown.candidate.name} · Matches on digit {strategyCountdown.candidate.digit}
                {' '}· trigger check in {Math.max(0, Math.ceil((strategyCountdown.endsAt - (clockNow ?? Date.now())) / 1000))} seconds
              </p>
              <p className="mt-1 text-[10px] text-slate-300">The live conditions are rechecked before the signal appears; no trade will be submitted.</p>
            </div>
          ) : strategyAlert ? (
            <div className="mt-3 animate-pulse rounded-xl border border-cyan-300/40 bg-cyan-300/10 p-3" role="alert" aria-live="assertive">
              <p className="text-sm font-black text-cyan-200">
                TRIGGER: {strategyAlert.name} · Matches on digit {strategyAlert.digit}
              </p>
              <p className="mt-1 text-[10px] text-slate-300">
                Analytical signal only · observe the next {strategyAlert.remainingTicks} {strategyAlert.remainingTicks === 1 ? 'tick' : 'ticks'} for validation · no order placed
              </p>
            </div>
          ) : lastStrategyOutcome ? (
            <p className="mt-3 rounded-xl border border-white/[0.08] bg-[#111f33] p-3 text-xs font-bold text-slate-300" role="status">
              {lastStrategyOutcome.name} · digit {lastStrategyOutcome.digit} matched {lastStrategyOutcome.matchedTicks} of {lastStrategyOutcome.totalTicks} validation {lastStrategyOutcome.totalTicks === 1 ? 'tick' : 'ticks'}.
            </p>
          ) : (
            <p className="mt-3 rounded-xl border border-white/[0.08] bg-[#111f33] p-3 text-[10px] text-slate-400" role="status">
              {connected ? 'Waiting for strategy conditions to align with live tick data.' : 'Connect to the live Deriv feed to evaluate strategies.'}
            </p>
          )}
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

        <div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className={`mt-3 flex items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-black ${
            connected
              ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
              : 'border-slate-500/30 bg-slate-500/10 text-slate-400'
          }`}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className={`h-5 w-5 shrink-0 ${connected ? 'animate-pulse' : ''}`}
            fill="currentColor"
          >
            <rect x="3" y="16" width="3" height="5" rx="1" />
            <rect x="8" y="13" width="3" height="8" rx="1" />
            <rect x="13" y="9" width="3" height="12" rx="1" />
            <rect x="18" y="5" width="3" height="16" rx="1" />
            {!connected && (
              <path d="M4 4 20 20" fill="none" stroke="currentColor" strokeWidth="2" />
            )}
          </svg>
          <span>{connected ? 'Connected' : 'Not connected / Offline'}</span>
        </div>

        {feedError && (
          <p role="alert" className="mt-2 text-center text-xs font-semibold text-rose-400">
            {feedError}
          </p>
        )}

        {connected && clockNow !== null && derivTimeOffset !== null && (
          <div className="mt-2 grid grid-cols-2 gap-2" aria-label="Live clocks">
            <div className="rounded-lg border border-white/[0.08] bg-[#0d192b] px-3 py-2 text-center">
              <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-400">Deriv Time (UTC)</p>
              <time className="mt-1 block font-mono text-sm font-black tabular-nums text-white">
                {new Date(clockNow + derivTimeOffset).toLocaleTimeString('en-GB', {
                  timeZone: 'UTC',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                })}
              </time>
            </div>
            <div className="rounded-lg border border-white/[0.08] bg-[#0d192b] px-3 py-2 text-center">
              <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-400">Local Time</p>
              <time className="mt-1 block font-mono text-sm font-black tabular-nums text-white">
                {new Date(clockNow).toLocaleTimeString(undefined, {
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                })}
              </time>
            </div>
          </div>
        )}

        <section className="mt-4 rounded-2xl border border-white/[0.08] bg-[#0d192b] p-3 shadow-[0_16px_40px_rgba(0,0,0,0.16)] sm:p-4">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="text-sm font-black text-white">Auto AI Patterns</h2>
            <p className="text-[10px] font-semibold text-slate-400">Live pattern score, not a win probability</p>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {autoPatterns.map(({ title, signal, score, detail, strategy: patternStrategy }) => (
              <button
                key={title}
                type="button"
                onClick={() => setStrategy(patternStrategy)}
                title="Pattern score is normalized from recent live-tick frequency; it is not the probability of a future outcome."
                className={`rounded-xl border px-3 py-3 text-left transition ${
                  strategy === patternStrategy ? 'ring-2' : 'border-white/[0.08] bg-[#111f33]'
                }`}
                style={strategy === patternStrategy ? { borderColor: accentColor, backgroundColor: `${accentColor}18`, boxShadow: `0 0 0 2px ${accentColor}24` } : undefined}
              >
                <span className="block text-[10px] font-bold uppercase tracking-wide text-slate-400">{title}</span>
                <span className="mt-1 block text-sm font-black text-white">{signal}</span>
                <span className="mt-1 block text-xs font-bold text-cyan-300">
                  {score === null ? 'WAIT' : `Pattern score ${score}%`}
                </span>
                <span className="mt-1 block text-[9px] leading-relaxed text-slate-500">{detail}</span>
              </button>
            ))}
            <div className="rounded-xl border border-white/[0.08] bg-[#111f33] px-3 py-3">
              <span className="block text-[10px] font-bold uppercase tracking-wide text-slate-400">
                Matches / Differs
              </span>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {([
                  {
                    label: 'Matches',
                    strategy: 'Matches' as Strategy,
                    observed: analysis.matchesProbability,
                    count: analysis.matchesCount,
                  },
                  {
                    label: 'Differs',
                    strategy: 'Differs' as Strategy,
                    observed: analysis.differsProbability,
                    count: analysis.differsCount,
                  },
                ]).map(({ label, strategy: outcomeStrategy, observed, count }) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setStrategy(outcomeStrategy)}
                    disabled={!hasPatternData}
                    aria-pressed={strategy === outcomeStrategy}
                    title="Score is derived from the observed frequency for this outcome in recent live ticks; it is not a win probability."
                    className={`rounded-lg border px-2 py-2 text-left transition disabled:cursor-not-allowed disabled:opacity-50 ${
                      strategy === outcomeStrategy
                        ? 'ring-2'
                        : 'border-white/[0.08] bg-[#0d192b]'
                    }`}
                    style={strategy === outcomeStrategy
                      ? { borderColor: accentColor, boxShadow: `0 0 0 2px ${accentColor}24` }
                      : undefined}
                  >
                    <span className="block text-[10px] font-black uppercase text-white">{label}</span>
                    <span className="mt-1 block text-xs font-bold text-cyan-300">
                      {hasPatternData ? `Score ${toLivePatternScore(observed)}%` : 'WAIT'}
                    </span>
                    <span className="mt-1 block text-[9px] text-slate-500">
                      {hasPatternData
                        ? `${Math.round(observed)}% · ${count}/${analysis.matchSampleCount} ticks`
                        : 'Need 25 ticks'}
                    </span>
                  </button>
                ))}
              </div>
            </div>
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
          {manualSignal?.targetDigit !== null && manualSignal?.targetDigit !== undefined && (
            <p className="mt-2 text-[10px] font-bold text-emerald-300">
              Highlighted: signal digit {manualSignal.targetDigit}
            </p>
          )}
          <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
            {digits.slice(-30).map((digit, index, visibleDigits) => {
              const isSignalDigit = manualSignal?.targetDigit === digit;
              const isLatest = index === visibleDigits.length - 1;
              return (
                <span
                  key={`${digit}-${index}`}
                  aria-label={isSignalDigit ? `Digit ${digit}, matches current signal` : `Digit ${digit}`}
                  title={isSignalDigit ? `Signal digit ${digit}` : `Live digit ${digit}`}
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-black ${
                    isSignalDigit
                      ? 'border border-emerald-300 bg-emerald-500/25 text-emerald-200 ring-2 ring-emerald-400/70'
                      : isLatest
                        ? 'text-white'
                        : 'bg-[#111f33] text-slate-200'
                  }`}
                  style={!isSignalDigit && isLatest ? { backgroundColor: accentColor } : undefined}
                >
                  {digit}
                </span>
              );
            })}
          </div>
        </section>

        <section className="mt-4 overflow-hidden rounded-2xl border border-cyan-400/20 bg-[#0d192b] shadow-[0_16px_40px_rgba(0,0,0,0.18)]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] px-4 py-4">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-cyan-300">
                20-Tick Matches Tracker
              </p>
              <h2 className="mt-1 text-sm font-black text-white">Live prediction result ledger</h2>
            </div>
            <div className="flex gap-2">
              {matchTracker.active ? (
                <button
                  type="button"
                  onClick={stopMatchTracker}
                  className="rounded-lg border border-white/[0.12] px-3 py-2 text-xs font-black text-slate-300 transition hover:text-white"
                >
                  Stop Tracker
                </button>
              ) : (
                <button
                  type="button"
                  onClick={startMatchTracker}
                  disabled={!connected || digits.length < 25}
                  className="rounded-lg px-4 py-2 text-xs font-black text-white transition disabled:cursor-not-allowed disabled:opacity-50"
                  style={{ backgroundColor: accentColor }}
                >
                  {matchTracker.attempts.length ? 'Start New 20' : 'Start 20-Tick Tracker'}
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 p-4 sm:grid-cols-4">
            {[
              { label: 'Completed', value: `${matchTracker.attempts.length}/20` },
              { label: 'Actual Hits', value: matchTracker.attempts.filter((attempt) => attempt.result === 'WIN').length },
              { label: 'Current Hit Streak', value: matchTracker.currentStreak },
              { label: 'Best Hit Streak', value: matchTracker.bestStreak },
            ].map(({ label, value }) => (
              <div key={label} className="rounded-xl border border-white/[0.08] bg-[#111f33] p-3">
                <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500">{label}</p>
                <p className="mt-1 text-lg font-black text-white">{value}</p>
              </div>
            ))}
          </div>

          <div className="px-4 pb-4">
            <div className="grid grid-cols-5 gap-2 sm:grid-cols-10">
              {Array.from({ length: 20 }, (_, index) => {
                const attempt = matchTracker.attempts[index];
                const isPending = matchTracker.active && index === matchTracker.attempts.length;
                const className = attempt?.result === 'WIN'
                  ? 'border-emerald-400/40 bg-emerald-500/15 text-emerald-300'
                  : attempt?.result === 'MISS'
                    ? 'border-rose-400/40 bg-rose-500/15 text-rose-300'
                    : isPending
                      ? 'border-cyan-400/50 bg-cyan-400/10 text-cyan-300 animate-pulse'
                      : 'border-white/[0.08] bg-[#111f33] text-slate-500';

                return (
                  <div
                    key={index}
                    className={`min-w-0 rounded-lg border p-2 text-center ${className}`}
                    title={attempt
                      ? `Attempt ${attempt.attempt}: predicted ${attempt.predictedDigit}, actual ${attempt.actualDigit} (${attempt.result})`
                      : isPending
                        ? `Next live tick: checking digit ${matchTracker.pendingDigit}`
                        : `Attempt ${index + 1}: waiting`}
                  >
                    <p className="text-[9px] font-bold">#{index + 1}</p>
                    <p className="mt-1 text-sm font-black">
                      {attempt ? (attempt.result === 'WIN' ? 'HIT' : 'MISS') : isPending ? matchTracker.pendingDigit : '—'}
                    </p>
                    {attempt && (
                      <p className="mt-1 truncate text-[8px] font-semibold opacity-80">
                        {attempt.predictedDigit}→{attempt.actualDigit}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="border-t border-white/[0.08] px-4 py-3 text-xs leading-relaxed text-slate-400">
            {matchTracker.active
              ? `Next live tick settles digit ${matchTracker.pendingDigit}. After each result, the tracker evaluates a fresh candidate and continues until 20 actual outcomes are recorded.`
              : matchTracker.attempts.length === 20
                ? '20 live outcomes recorded. Start a new tracker to begin another series.'
                : 'Predictions are checked only against future live ticks. Misses are recorded and the next candidate is generated from updated live history; this does not guarantee wins.'}
            {' '}One tick per attempt; hit/miss history resets when you switch markets.
          </div>
        </section>

        <section className="mt-4 rounded-2xl border border-white/[0.08] bg-[#0d192b] p-3 shadow-[0_16px_40px_rgba(0,0,0,0.16)] sm:p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">Signal Generator</p>
              <p className="mt-1 text-xs font-bold text-slate-300">
                {connected
                  ? `${strategy} analysis from ${Math.min(digits.length, 100)} live ticks`
                  : 'Waiting for live market ticks...'}
              </p>
            </div>
            <button
              type="button"
              onClick={generateSignal}
              disabled={!connected || digits.length < 25 || isGeneratingSignal}
              className="h-12 w-full shrink-0 rounded-xl text-sm font-black text-white shadow-sm transition disabled:cursor-not-allowed disabled:bg-slate-300 sm:w-52"
              style={!connected || digits.length < 25 || isGeneratingSignal
                ? undefined
                : { backgroundColor: accentColor }}
            >
              {isGeneratingSignal ? 'Analyzing Live Ticks...' : 'Generate Signal'}
            </button>
          </div>
        </section>

        {isGeneratingSignal && (
          <section
            className="mt-4 overflow-hidden rounded-2xl border border-cyan-400/20 bg-[#0b1426] p-5 shadow-[0_16px_40px_rgba(0,0,0,0.2)]"
            role="status"
            aria-live="polite"
          >
            <div className="flex items-center gap-3">
              <span className="h-5 w-5 shrink-0 animate-spin rounded-full border-2 border-cyan-400/25 border-t-cyan-300" />
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-cyan-300">
                  Live Tick Analysis In Progress
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Evaluating candidate matches across the captured Deriv tick history
                </p>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between gap-4 rounded-xl border border-white/[0.08] bg-[#111f33] p-4">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-slate-500">
                  Current Matches Candidate
                </p>
                <p className="mt-1 text-xs font-semibold text-slate-300">
                  {signalAnalysisProgress.completed} of {signalAnalysisProgress.total} history windows evaluated
                </p>
              </div>
              <span
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-400/10 text-2xl font-black text-cyan-300"
                aria-label={signalAnalysisProgress.candidateDigit === null
                  ? 'Candidate not selected yet'
                  : `Current candidate digit ${signalAnalysisProgress.candidateDigit}`}
              >
                {signalAnalysisProgress.candidateDigit ?? '…'}
              </span>
            </div>

            <div
              className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800"
              role="progressbar"
              aria-label="Live tick analysis windows evaluated"
              aria-valuemin={0}
              aria-valuemax={signalAnalysisProgress.total}
              aria-valuenow={signalAnalysisProgress.completed}
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-blue-400 to-emerald-400 transition-[width] duration-150 ease-out"
                style={{
                  width: `${signalAnalysisProgress.total
                    ? (signalAnalysisProgress.completed / signalAnalysisProgress.total) * 100
                    : 0}%`,
                }}
              />
            </div>
          </section>
        )}

        <section className={`mx-auto mt-4 w-full max-w-sm rounded-3xl border p-6 font-sans text-white shadow-2xl transition-all duration-500 ${signalTier.cardClassName}`}>
          <div className="mb-6 flex items-center justify-between gap-3">
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500">Signal Output</p>
            <span className={`rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-wider transition-all duration-300 ${signalTier.badgeClassName}`}>
              {signalTier.label}
            </span>
          </div>

          <div className="mb-6 flex justify-center">
            <div className={`relative flex h-32 w-32 items-center justify-center rounded-2xl border shadow-inner transition-all duration-500 ${signalTier.heroClassName}`}>
              <span
                className={`absolute -right-1.5 -top-1.5 h-4 w-4 rounded-full border-2 border-[#0b1426] transition-all duration-500 ${
                  connected
                    ? signalStrength === 'STRONG SIGNAL'
                      ? 'animate-ping bg-emerald-400 shadow-[0_0_14px_rgba(52,211,153,1)]'
                      : 'animate-pulse bg-emerald-500 shadow-[0_0_12px_rgba(52,211,153,0.6)]'
                    : 'bg-slate-600 opacity-60'
                }`}
                aria-label={connected ? 'Live data connected' : 'Live data disconnected'}
                title={connected ? 'Live data connected' : 'Live data disconnected'}
              />
              {connected && signalStrength === 'STRONG SIGNAL' && (
                <span className="absolute -right-1.5 -top-1.5 h-4 w-4 rounded-full border-2 border-[#0b1426] bg-emerald-400" />
              )}
              <span className={`text-6xl font-black tracking-tighter transition-all duration-500 ${signalTier.textClassName}`}>
                {manualSignal?.targetDigit ?? '—'}
              </span>
            </div>
          </div>
          <p className="mb-6 text-center text-[11px] font-bold uppercase tracking-widest text-slate-400">
            {manualSignal?.label ?? `${strategy} · Waiting for signal`}
          </p>

          <div className="mb-6 text-center">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-slate-500">Signal Digit Range</p>
            <div className="mt-2 flex justify-center gap-2">
              {digits.slice(-4).map((digit, index) => (
                <span
                  key={`signal-range-${index}`}
                  className="flex h-10 w-11 items-center justify-center rounded-xl border border-slate-800/40 bg-[#121b2d] text-sm font-bold text-slate-300 shadow-sm"
                >
                  {digit}
                </span>
              ))}
              {digits.length === 0 && <span className="text-xs text-slate-500">Waiting for live ticks</span>}
            </div>
          </div>

          <div className="space-y-2.5 text-center">
            <div className="flex items-end justify-between gap-3">
              <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500">Normalized Pattern Score</p>
              <p className={`font-mono text-3xl font-black tracking-tight tabular-nums transition-all duration-300 ${signalTier.textClassName}`}>
                {manualSignal ? `${signalScore}%` : '--'}
              </p>
            </div>
            <div
              className="mx-auto h-1.5 w-44 overflow-hidden rounded-full border border-slate-800/50 bg-slate-900"
              role="progressbar"
              aria-label="Normalized pattern score based on observed Deriv tick data, not prediction accuracy"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={signalScore}
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500"
                style={{ width: `${signalScore}%` }}
              />
            </div>
            <p className="pt-1 text-center text-[10px] text-slate-500">
              {manualSignal
                ? `Live sample rate ${manualSignal.observedRate}% across ${manualSignal.sampleCount} feed samples`
                : 'Awaiting live tick analysis'}
            </p>
          </div>

        </section>

        <section className="mx-auto mt-4 w-full max-w-sm overflow-hidden rounded-2xl border border-cyan-400/20 bg-[#0d192b] shadow-[0_16px_40px_rgba(0,0,0,0.18)]">
          <div className="flex items-start justify-between gap-3 border-b border-white/[0.08] px-4 py-4">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-cyan-300">
                AI Analysis Pipeline
              </p>
              <p className="mt-1 text-xs text-slate-400">Live-tick evidence summary</p>
            </div>
            <div className="text-right">
              <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500">
                Confidence Level*
              </p>
              <p className={`mt-1 font-mono text-2xl font-black tabular-nums ${signalTier.textClassName}`}>
                {manualSignal ? `${signalScore}%` : '--'}
              </p>
            </div>
          </div>

          <div className="px-4 py-4">
            <div
              className="h-2 overflow-hidden rounded-full bg-slate-800"
              role="progressbar"
              aria-label="Normalized signal pattern index, not prediction probability"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={signalScore}
            >
              <div
                className={`h-full rounded-full transition-[width] duration-500 ${
                  signalStrength === 'STRONG SIGNAL'
                    ? 'bg-gradient-to-r from-emerald-500 to-emerald-300'
                    : 'bg-gradient-to-r from-amber-500 to-yellow-300'
                }`}
                style={{ width: `${signalScore}%` }}
              />
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              {[
                {
                  title: 'Live feed',
                  value: manualSignal ? `${manualSignal.sampleCount} ticks` : connected ? `${digits.length} ticks` : 'Waiting',
                  complete: connected && digits.length > 0,
                },
                {
                  title: 'Pattern scan',
                  value: manualSignal ? `${strategy} ranked` : 'Not run',
                  complete: Boolean(manualSignal),
                },
                {
                  title: 'Candidate',
                  value: manualSignal?.targetDigit === null || manualSignal?.targetDigit === undefined
                    ? manualSignal ? manualSignal.label : 'Waiting'
                    : `Digit ${manualSignal.targetDigit}`,
                  complete: Boolean(manualSignal),
                },
              ].map(({ title, value, complete }) => (
                <div key={title} className="rounded-lg border border-white/[0.08] bg-[#111f33] p-2">
                  <p className="text-[8px] font-bold uppercase tracking-[0.1em] text-slate-500">{title}</p>
                  <p className={`mt-1 truncate text-[10px] font-black ${complete ? 'text-cyan-300' : 'text-slate-400'}`}>
                    {value}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-3 text-[10px] leading-relaxed text-slate-400">
              Outcomes are derived from live Deriv tick quotes: the feed’s pip size preserves each market’s displayed precision, and the final displayed decimal digit is analyzed. For Matches, the system ranks digits from the latest 100 ticks by observed frequency and time since last appearance; other strategies use their corresponding historical tick rates. The 80–99% value is a normalized pattern score, not a calibrated chance of winning or a guarantee.
            </p>
          </div>
        </section>

        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={refreshSignalOutput}
            disabled={!manualSignal || isGeneratingSignal}
            className="rounded-lg border border-white/[0.12] bg-[#0d192b] px-4 py-2 text-xs font-bold text-slate-300 transition hover:border-white/25 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            Refresh Signal Output
          </button>
        </div>

        <section className="mt-2 grid gap-4 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="rounded-2xl border border-white/[0.08] bg-[#0d192b] p-4 shadow-[0_16px_40px_rgba(0,0,0,0.16)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">
                  Deriv Digit Distribution · {symbol}
                </p>
                <h2 className="mt-1 text-sm font-black text-white">Last {distributionSampleCount} Ticks</h2>
              </div>
              <span className="text-xs font-bold text-slate-400">
                {connected ? 'LIVE' : 'CONNECTING'} · {distributionSampleCount} samples
              </span>
            </div>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[320px] text-left text-xs">
                <thead className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500">
                  <tr className="border-b border-white/[0.08]">
                    <th scope="col" className="px-3 py-2">Last digit</th>
                    <th scope="col" className="px-3 py-2 text-right">Ticks</th>
                    <th scope="col" className="px-3 py-2 text-right">Distribution</th>
                    <th scope="col" className="px-3 py-2 text-right">Signal</th>
                  </tr>
                </thead>
                <tbody>
                  {digitDistribution.map((item) => (
                    <tr key={item.digit} className="border-b border-white/[0.05] last:border-0">
                      <th scope="row" className="px-3 py-2 font-black text-white">{item.digit}</th>
                      <td className="px-3 py-2 text-right font-bold text-slate-300">{item.count}</td>
                      <td className="px-3 py-2 text-right tabular-nums text-slate-300">
                        {item.percentage.toFixed(1)}%
                      </td>
                      <td className="px-3 py-2 text-right font-bold">
                        {matchResult.best?.digit === item.digit
                          ? <span style={{ color: accentColor }}>Selected</span>
                          : <span className="text-slate-600">—</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 border-t border-white/[0.08] pt-3">
              <h3 className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500">
                Latest Deriv ticks · quote precision from pip size
              </h3>
              {recentTicks.length > 0 ? (
                <div className="mt-2 overflow-x-auto">
                  <table className="w-full min-w-[240px] text-left text-xs">
                    <thead className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500">
                      <tr className="border-b border-white/[0.08]">
                        <th scope="col" className="px-3 py-2">Tick</th>
                        <th scope="col" className="px-3 py-2 text-right">Quote</th>
                        <th scope="col" className="px-3 py-2 text-right">Last digit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentTicks.map((tick) => (
                        <tr key={tick.tick} className="border-b border-white/[0.05] last:border-0">
                          <th scope="row" className="px-3 py-2 font-medium text-slate-400">{tick.tick}</th>
                          <td className="px-3 py-2 text-right font-mono tabular-nums text-slate-300">{tick.quote}</td>
                          <td className="px-3 py-2 text-right font-black text-white">{tick.digit ?? '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="mt-2 text-[10px] text-slate-500">Waiting for Deriv tick precision data.</p>
              )}
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
                <p className="text-[9px] font-bold uppercase text-slate-500">Observed Rate</p>
                <p className="mt-1 text-sm font-black text-white">{manualSignal?.observedRate ?? '--'}%</p>
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
              <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500">Observed Tick Rate</p>
              <p className="mt-2 text-sm font-black" style={{ color: accentColor }}>
                {manualSignal
                  ? `${manualSignal.observedRate}%`
                  : 'Awaiting Signal'}
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
