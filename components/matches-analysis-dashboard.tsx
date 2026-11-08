'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Activity, BarChart3, RefreshCw, Square, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ThemeToggle } from '@/components/custom/theme-toggle';
import { analyzeDigits, extractDigits, type MatchAnalysis, type MatchStrategy } from '@/lib/match-analysis';
import type { ActiveSymbol, Tick } from '@deriv/core';

interface HistoryRecord {
  number: number;
  time: string;
  market: string;
  strategy: MatchStrategy;
  predictedDigit: number;
  targetDigit?: number;
  probability: number;
  confidence: MatchAnalysis['confidence'];
  actualDigit?: number;
  result: 'PENDING' | 'WIN' | 'LOSS';
}

interface Props {
  symbols: ActiveSymbol[];
  activeSymbol: ActiveSymbol | null;
  selectSymbol: (symbol: string) => void;
  prices: number[];
  currentTick: Tick | null;
  pipSize: number;
  isConnected: boolean;
}

const WINDOW_OPTIONS = [25, 50, 100, 250, 500];

export function MatchesAnalysisDashboard({
  symbols,
  activeSymbol,
  selectSymbol,
  prices,
  currentTick,
  pipSize,
  isConnected,
}: Props) {
  const [strategy, setStrategy] = useState<MatchStrategy>('MATCHES');
  const [targetDigit, setTargetDigit] = useState(5);
  const [windowSize, setWindowSize] = useState(100);
  const [customWindow, setCustomWindow] = useState('');
  const [countdown, setCountdown] = useState(10);
  const [analysisRunning, setAnalysisRunning] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [history, setHistory] = useState<HistoryRecord[]>([]);
  const lastResolvedPrice = useRef<number | null>(null);
  const analysisLock = useRef(false);
  const runAnalysisRef = useRef<(resetCountdown?: boolean) => void>(() => {});

  const effectiveWindow = customWindow
    ? Math.max(25, Number.parseInt(customWindow, 10) || windowSize)
    : windowSize;

  const [analysis, setAnalysis] = useState<MatchAnalysis>(() =>
    analyzeDigits(prices, pipSize, strategy, targetDigit, effectiveWindow)
  );

  useEffect(() => {
    fetch('/api/owner/history', { credentials: 'same-origin' })
      .then((response) => response.ok ? response.json() : { history: [] })
      .then((body: { history?: HistoryRecord[] }) => setHistory(Array.isArray(body.history) ? body.history : []))
      .catch(() => setHistory([]));
  }, []);

  const persistHistory = useCallback((next: HistoryRecord[]) => {
    setHistory(next);
    fetch('/api/owner/history', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ replace: true, history: next.slice(0, 500) }),
    }).catch(() => undefined);
  }, []);

  const runAnalysis = useCallback((resetCountdown = true) => {
    if (analysisLock.current || !isConnected || !currentTick || !activeSymbol) {
      if (resetCountdown && analysisRunning) setCountdown(10);
      return;
    }
    const staleSeconds = Math.abs(Date.now() / 1000 - currentTick.epoch);
    if (staleSeconds > 15) {
      if (resetCountdown && analysisRunning) setCountdown(10);
      return;
    }
    analysisLock.current = true;
    setAnalyzing(true);
    window.setTimeout(async () => {
      try {
        const response = await fetch('/api/owner/analyze', {
          method: 'POST',
          credentials: 'same-origin',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prices,
            pipSize,
            strategy,
            targetDigit,
            windowSize: effectiveWindow,
          }),
        });
        if (!response.ok) return;
        const next = await response.json() as MatchAnalysis;
        setAnalysis(next);
        if (next.dataQuality !== 'INSUFFICIENT') {
          const record: HistoryRecord = {
            number: history.length + 1,
            time: new Date().toISOString(),
            market: activeSymbol.underlying_symbol_name,
            strategy,
            predictedDigit: strategy === 'MATCHES' ? next.predictedDigit : targetDigit,
            targetDigit: strategy === 'DIFFERS' ? targetDigit : undefined,
            probability: Math.round(next.probability * 10) / 10,
            confidence: next.confidence,
            result: 'PENDING',
          };
          persistHistory([record, ...history].slice(0, 500));
        }
        if (resetCountdown && analysisRunning) setCountdown(10);
      } catch {
        if (resetCountdown && analysisRunning) setCountdown(10);
      } finally {
        setAnalyzing(false);
        analysisLock.current = false;
      }
    }, 350);
  }, [activeSymbol, analysisRunning, currentTick, effectiveWindow, history, isConnected, persistHistory, pipSize, prices, strategy, targetDigit]);

  runAnalysisRef.current = runAnalysis;

  useEffect(() => {
    if (!analysisRunning || !isConnected) return;
    const timer = window.setTimeout(() => runAnalysisRef.current(true), 500);
    return () => window.clearTimeout(timer);
  }, [analysisRunning, isConnected]);

  useEffect(() => {
    if (!analysisRunning || !isConnected) return;
    const timer = window.setInterval(() => {
      setCountdown((value) => Math.max(0, value - 1));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [analysisRunning, isConnected]);

  useEffect(() => {
    if (!analysisRunning || !isConnected || countdown !== 0) return;
    runAnalysisRef.current(true);
  }, [analysisRunning, isConnected, countdown]);

  useEffect(() => {
    if (!currentTick || lastResolvedPrice.current === currentTick.quote) return;
    lastResolvedPrice.current = currentTick.quote;
    if (history.length === 0) return;
    const actualDigit = extractDigits([currentTick.quote], pipSize)[0];
    let changed = false;
    const pendingIndex = history.findIndex((item) => item.result === 'PENDING');
    const nextHistory = history.map((item, index) => {
      if (item.result !== 'PENDING' || index !== pendingIndex) return item;
      changed = true;
      const win = item.strategy === 'MATCHES'
        ? actualDigit === item.predictedDigit
        : actualDigit !== (item.targetDigit ?? 5);
      return { ...item, actualDigit, result: win ? 'WIN' : 'LOSS' } as HistoryRecord;
    });
    if (changed) persistHistory(nextHistory);
  }, [currentTick, history, persistHistory, pipSize]);

  const digits = useMemo(() => extractDigits(prices, pipSize), [prices, pipSize]);
  const windowDigits = digits.slice(-effectiveWindow);
  const displayDigit = analysis.dataQuality === 'INSUFFICIENT'
    ? (digits.at(-1) ?? null)
    : strategy === 'MATCHES'
      ? analysis.predictedDigit
      : targetDigit;
  const currentDigit = digits.at(-1) ?? null;
  const totalDigits = windowDigits.length;

  const selectedMatches = windowDigits.filter((digit) => digit === (strategy === 'MATCHES' ? displayDigit : targetDigit)).length;
  const selectedDiffers = Math.max(0, totalDigits - selectedMatches);
  const evenCount = windowDigits.filter((digit) => digit % 2 === 0).length;
  const underEightCount = windowDigits.filter((digit) => digit < 8).length;
  const evenPercentage = totalDigits ? (evenCount / totalDigits) * 100 : 0;
  const underEightPercentage = totalDigits ? (underEightCount / totalDigits) * 100 : 0;

  const recentTrendPrices = prices.slice(-20);
  const trend = recentTrendPrices.length < 2
    ? 'Waiting for data'
    : recentTrendPrices.at(-1)! > recentTrendPrices[0]
      ? 'Uptrend ↑'
      : recentTrendPrices.at(-1)! < recentTrendPrices[0]
        ? 'Downtrend ↓'
        : 'Sideways →';

  const frequency = useMemo(() => {
    const counts = Array.from({ length: 10 }, () => 0);
    windowDigits.forEach((digit) => { counts[digit] += 1; });
    return counts;
  }, [windowDigits]);

  const liveTicks = digits.slice(-12);
  const confidence = analysis.dataQuality === 'INSUFFICIENT' ? 'Insufficient data' : `${analysis.probability.toFixed(1)}%`;

  const stopAnalysis = () => setAnalysisRunning(false);
  const startAnalysis = () => {
    setAnalysisRunning(true);
    setCountdown(10);
    window.setTimeout(() => runAnalysisRef.current(true), 0);
  };
  const refreshAnalysis = () => runAnalysisRef.current(true);

  return (
    <main className="min-h-dvh bg-[#070b12] text-slate-100">
      <div className="mx-auto max-w-[1500px] px-3 py-3 sm:px-5 lg:px-6">
        <header className="mb-3 flex flex-col gap-3 rounded-2xl border border-white/[0.07] bg-[#0c111b]/95 px-4 py-3 shadow-2xl backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <Activity className={`h-4 w-4 ${analysisRunning && isConnected ? 'text-emerald-400' : 'text-slate-500'}`} />
              <h1 className="truncate text-base font-black tracking-[0.08em] text-white sm:text-xl">
                AL MARKET ANALYZER <span className="text-cyan-400">/ DERIV MATCHES</span>
              </h1>
            </div>
            <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-slate-500">Real-time intelligence terminal</p>
          </div>
          <div className="flex items-center justify-between gap-2 sm:justify-end">
            <div className={`flex items-center gap-2 rounded-full border px-3 py-2 text-[11px] font-black tracking-wide ${analysisRunning ? 'border-emerald-400/25 bg-emerald-400/[0.08] text-emerald-300' : 'border-slate-500/25 bg-slate-500/[0.08] text-slate-400'}`}>
              <span className={`h-2 w-2 rounded-full ${analysisRunning ? 'bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,.8)]' : 'bg-slate-500'}`} />
              {analysisRunning ? '● ANALYZING MARKET' : '○ ANALYZER STOPPED'}
            </div>
            <ThemeToggle />
          </div>
        </header>

        <section className="mb-3 flex flex-col gap-2 rounded-2xl border border-white/[0.06] bg-[#0d131e]/90 p-3 sm:flex-row sm:items-end">
          <div className="min-w-0 flex-1">
            <label className="mb-1.5 block text-[10px] font-bold tracking-[0.16em] text-slate-500">MARKET</label>
            <Select value={activeSymbol?.underlying_symbol} onValueChange={selectSymbol}>
              <SelectTrigger className="h-11 border-white/[0.08] bg-[#080d16] text-white"><SelectValue placeholder="Select market" /></SelectTrigger>
              <SelectContent>{symbols.map((symbol) => <SelectItem key={symbol.underlying_symbol} value={symbol.underlying_symbol}>{symbol.underlying_symbol_name}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="sm:w-[180px]">
            <label className="mb-1.5 block text-[10px] font-bold tracking-[0.16em] text-slate-500">ANALYSIS WINDOW</label>
            <Select value={String(windowSize)} onValueChange={(value) => { setWindowSize(Number(value)); setCustomWindow(''); }}>
              <SelectTrigger className="h-11 border-white/[0.08] bg-[#080d16] text-white"><SelectValue /></SelectTrigger>
              <SelectContent>{WINDOW_OPTIONS.map((size) => <SelectItem key={size} value={String(size)}>Last {size} ticks</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-[1fr_1fr] gap-2 sm:flex">
            {analysisRunning ? (
              <Button onClick={stopAnalysis} className="h-11 min-w-[112px] border border-red-400/20 bg-red-500/[0.12] px-4 text-xs font-black text-red-300 hover:bg-red-500/[0.18]">
                <Square className="mr-2 h-4 w-4 fill-current" />STOP
              </Button>
            ) : (
              <Button onClick={startAnalysis} className="h-11 min-w-[170px] border border-emerald-400/20 bg-emerald-500/[0.12] px-4 text-xs font-black text-emerald-300 hover:bg-emerald-500/[0.18]">
                <Play className="mr-2 h-4 w-4 fill-current" />START ANALYSIS
              </Button>
            )}
            <Button onClick={refreshAnalysis} disabled={analyzing || !isConnected} variant="outline" className="h-11 min-w-[112px] border-white/[0.08] bg-[#080d16] text-xs font-black text-slate-200">
              <RefreshCw className={`mr-2 h-4 w-4 ${analyzing ? 'animate-spin' : ''}`} />REFRESH
            </Button>
          </div>
        </section>

        <section className="relative overflow-hidden rounded-3xl border border-cyan-400/[0.12] bg-[radial-gradient(circle_at_center,rgba(14,116,144,.14),transparent_34%),linear-gradient(145deg,#0d1522,#090e18)] p-3 sm:p-5">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black tracking-[0.22em] text-cyan-400">LIVE PREDICTION</p>
              <p className="mt-1 text-xs text-slate-500">{activeSymbol?.underlying_symbol_name ?? 'No market selected'}</p>
            </div>
            <div className="rounded-full border border-white/[0.07] bg-black/20 px-3 py-1.5 text-[10px] font-bold text-slate-400">
              {isConnected ? 'LIVE MARKET FEED' : 'CONNECTION REQUIRED'}
            </div>
          </div>

          <div className="grid grid-cols-[72px_minmax(180px,280px)_72px] items-center justify-center gap-2 sm:grid-cols-[110px_minmax(220px,320px)_110px] sm:gap-5">
            <button onClick={() => setStrategy('MATCHES')} className={`h-12 rounded-xl border text-xs font-black tracking-[0.12em] transition sm:h-14 sm:text-sm ${strategy === 'MATCHES' ? 'border-cyan-400/40 bg-cyan-400/10 text-cyan-300 shadow-[0_0_24px_rgba(34,211,238,.12)]' : 'border-white/[0.06] bg-[#080d16] text-slate-500'}`}>
              MATCHES
            </button>
            <div className="relative flex flex-col items-center">
              <div className={`prediction-ring relative flex h-[190px] w-[190px] items-center justify-center rounded-full sm:h-[250px] sm:w-[250px] ${analysisRunning ? 'is-running' : 'is-stopped'}`}>
                <div className="absolute inset-[8px] rounded-full border border-cyan-300/[0.18] bg-[#070c14] shadow-[inset_0_0_45px_rgba(34,211,238,.07),0_0_45px_rgba(34,211,238,.08)]">
                  <div className="flex h-full flex-col items-center justify-center">
                    <span className="text-[9px] font-bold tracking-[0.18em] text-slate-500">{strategy === 'MATCHES' ? 'PREDICTED DIGIT' : 'TARGET DIGIT'}</span>
                    <span key={displayDigit ?? 'empty'} className="prediction-digit mt-1 text-[105px] font-black leading-none text-white sm:text-[140px]">{displayDigit ?? '—'}</span>
                    <span className="text-[9px] font-black tracking-[0.15em] text-cyan-400">◉ {strategy} ◉</span>
                  </div>
                </div>
              </div>
              <div className={`mt-2 font-mono text-3xl font-black tabular-nums sm:text-4xl ${analysisRunning ? 'text-white' : 'text-slate-500'}`}>
                00:{String(countdown).padStart(2, '0')}
              </div>
            </div>
            <button onClick={() => setStrategy('DIFFERS')} className={`h-12 rounded-xl border text-xs font-black tracking-[0.12em] transition sm:h-14 sm:text-sm ${strategy === 'DIFFERS' ? 'border-violet-400/40 bg-violet-400/10 text-violet-300 shadow-[0_0_24px_rgba(167,139,250,.12)]' : 'border-white/[0.06] bg-[#080d16] text-slate-500'}`}>
              DIFFERS
            </button>
          </div>

          <div className="mx-auto mt-3 flex max-w-md flex-col items-center">
            <p className="mb-2 text-[9px] font-black tracking-[0.18em] text-slate-500">PREDICTION TYPE</p>
            <div className="grid w-full grid-cols-2 rounded-xl border border-white/[0.07] bg-[#080d16] p-1">
              {(['MATCHES', 'DIFFERS'] as MatchStrategy[]).map((mode) => (
                <button key={mode} onClick={() => setStrategy(mode)} className={`h-10 rounded-lg text-xs font-black tracking-[0.12em] transition ${strategy === mode ? (mode === 'MATCHES' ? 'bg-cyan-400 text-[#07111f] shadow-[0_0_18px_rgba(34,211,238,.2)]' : 'bg-violet-400 text-[#07111f] shadow-[0_0_18px_rgba(167,139,250,.2)]') : 'text-slate-500'}`}>{mode}</button>
              ))}
            </div>
            {strategy === 'DIFFERS' && (
              <div className="mt-2 flex max-w-full gap-1 overflow-x-auto rounded-lg">
                {Array.from({ length: 10 }, (_, digit) => (
                  <button key={digit} onClick={() => setTargetDigit(digit)} className={`h-9 w-9 shrink-0 rounded-md text-xs font-bold ${targetDigit === digit ? 'bg-violet-400 text-[#07111f]' : 'bg-white/[0.05] text-slate-400'}`}>{digit}</button>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-[repeat(5,minmax(0,1fr))]">
          {[
            ['MATCHES', String(selectedMatches), 'cyan'],
            ['DIFFERS', String(selectedDiffers), 'violet'],
            ['TOTAL', String(totalDigits), 'slate'],
            ['CURRENT DIGIT', currentDigit === null ? '-' : String(currentDigit), 'cyan'],
            ['COUNTDOWN', `00:${String(countdown).padStart(2, '0')}`, 'slate'],
          ].map(([label, value, color]) => (
            <div key={label} className="rounded-xl border border-white/[0.06] bg-[#0d131e]/90 p-3">
              <p className="text-[9px] font-black tracking-[0.14em] text-slate-500">{label}</p>
              <p className={`mt-1 text-2xl font-black tabular-nums ${color === 'cyan' ? 'text-cyan-300' : color === 'violet' ? 'text-violet-300' : 'text-white'}`}>{value}</p>
            </div>
          ))}
        </section>

        <section className="mt-3 grid gap-3 xl:grid-cols-[1.35fr_.65fr]">
          <div className="rounded-2xl border border-white/[0.06] bg-[#0d131e]/90 p-4">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xs font-black tracking-[0.14em] text-white">NUMBER DISTRIBUTION</h2>
                <p className="mt-1 text-[10px] text-slate-500">Current analysis window · percentages</p>
              </div>
              <BarChart3 className="h-4 w-4 text-cyan-400" />
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
              {analysis.probabilities.map((item) => {
                const itemFrequency = frequency[item.digit] ?? 0;
                const itemPercentage = totalDigits ? (itemFrequency / totalDigits) * 100 : 0;
                const isSelected = item.digit === displayDigit;
                return (
                  <div key={item.digit} className={`rounded-xl border p-3 ${isSelected ? 'border-cyan-400/45 bg-cyan-400/[0.08]' : 'border-white/[0.05] bg-[#080d16]'}`}>
                    <div className="flex items-baseline justify-between">
                      <span className="text-xl font-black text-white">{item.digit}</span>
                      <span className="text-[10px] font-bold text-cyan-300">{itemPercentage.toFixed(1)}%</span>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-800">
                      <div className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-violet-400" style={{ width: `${Math.max(0, itemPercentage)}%` }} />
                    </div>
                    <p className="mt-2 text-[9px] font-bold uppercase tracking-wide text-slate-500">Frequency {itemFrequency}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-white/[0.06] bg-[#0d131e]/90 p-4">
            <h2 className="mb-3 text-xs font-black tracking-[0.14em] text-white">CURRENT ANALYSIS</h2>
            <div className="space-y-2">
              <div className="rounded-xl border border-white/[0.05] bg-[#080d16] p-3">
                <p className="text-[9px] font-black tracking-[0.14em] text-slate-500">CURRENT TREND</p>
                <p className="mt-1 text-sm font-black text-white">{trend}</p>
              </div>
              <div className="rounded-xl border border-white/[0.05] bg-[#080d16] p-3">
                <p className="text-[9px] font-black tracking-[0.14em] text-slate-500">CONFIDENCE LEVEL</p>
                <div className="mt-1 flex items-center justify-between"><p className="text-lg font-black text-cyan-300">{confidence}</p><span className="rounded-full bg-emerald-400/10 px-2 py-1 text-[9px] font-bold text-emerald-300">{analysis.confidence}</span></div>
              </div>
              <div className="rounded-xl border border-white/[0.05] bg-[#080d16] p-3">
                <p className="text-[9px] font-black tracking-[0.14em] text-slate-500">PATTERN DETECTED</p>
                <p className="mt-1 text-xs font-bold text-slate-200">{analysis.reasons[1] ?? 'Waiting for a stable pattern'}</p>
              </div>
              <div className="rounded-xl border border-white/[0.05] bg-[#080d16] p-3">
                <p className="mb-2 text-[9px] font-black tracking-[0.14em] text-slate-500">RECOMMENDED STRATEGIES</p>
                <div className="flex items-center justify-between text-xs"><span className="font-bold text-white">EVEN</span><span className="font-black text-cyan-300">{evenPercentage.toFixed(1)}% Strong</span></div>
                <div className="mt-2 flex items-center justify-between text-xs"><span className="font-bold text-white">UNDER 8</span><span className="font-black text-violet-300">{underEightPercentage.toFixed(1)}% High Confidence</span></div>
              </div>
            </div>
            <p className="mt-3 text-[9px] leading-relaxed text-slate-500">Percentages are analysis/model estimates and are not guaranteed outcomes.</p>
          </div>
        </section>

        <section className="mt-3 rounded-2xl border border-white/[0.06] bg-[#0d131e]/90 p-4">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h2 className="text-xs font-black tracking-[0.14em] text-white">LIVE TICKS</h2>
              <p className="mt-1 text-[10px] text-slate-500">Most recent result on the right</p>
            </div>
            <span className={`h-2 w-2 rounded-full ${isConnected && analysisRunning ? 'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,.7)]' : 'bg-slate-600'}`} />
          </div>
          <div className="overflow-x-auto">
            <div className="flex min-w-max items-center gap-2">
              {liveTicks.length ? liveTicks.map((digit, index) => (
                <div key={`${digit}-${index}`} className={`flex h-11 items-center gap-2 px-1 ${index === liveTicks.length - 1 ? '' : 'after:h-px after:w-3 after:bg-slate-700'}`}>
                  <span className={`flex h-10 w-10 items-center justify-center rounded-lg text-lg font-black ${index === liveTicks.length - 1 ? 'bg-cyan-400 text-[#07111f] shadow-[0_0_18px_rgba(34,211,238,.25)]' : 'border border-white/[0.06] bg-[#080d16] text-slate-300'}`}>{digit}</span>
                </div>
              )) : <p className="text-xs text-slate-500">Waiting for live ticks...</p>}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
