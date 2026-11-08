'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Activity, RefreshCw, Square, Play } from 'lucide-react';
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

  const confidence = analysis.dataQuality === 'INSUFFICIENT' ? 'Insufficient data' : `${analysis.probability.toFixed(1)}%`;
  const recentResult = history.find((item) => item.result !== 'PENDING');

  const stopAnalysis = () => setAnalysisRunning(false);
  const startAnalysis = () => {
    setAnalysisRunning(true);
    setCountdown(10);
    window.setTimeout(() => runAnalysisRef.current(true), 0);
  };
  const refreshAnalysis = () => runAnalysisRef.current(true);

  return (
    <main className="min-h-dvh bg-[#070b12] text-slate-100">
      <div className="mx-auto w-full max-w-5xl px-4 py-4 sm:px-6 sm:py-6">
        <header className="mb-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">AL Market Analyzer</p>
            <h1 className="mt-1 text-xl font-black tracking-tight text-white sm:text-2xl">MATCHES ANALYSIS</h1>
          </div>
          <div className="flex items-center gap-2">
            <div className={`flex items-center gap-2 text-xs font-semibold ${analysisRunning && isConnected ? 'text-emerald-400' : 'text-slate-500'}`}>
              <Activity className="h-4 w-4" />
              <span className="hidden sm:inline">{isConnected ? (analysisRunning ? 'LIVE' : 'STOPPED') : 'OFFLINE'}</span>
            </div>
            <ThemeToggle />
          </div>
        </header>

        <section className="rounded-2xl border border-white/[0.08] bg-[#0d131e] px-5 py-8 text-center sm:px-8 sm:py-10">
          <div className="flex items-center justify-center gap-2 text-xs font-black tracking-[0.18em] text-cyan-400">
            <span className="h-2 w-2 rounded-full bg-cyan-400" />
            MATCHES
          </div>

          <p className="mt-5 text-sm font-semibold text-slate-400">Predicted digit</p>
          <div key={displayDigit ?? 'empty'} className="mt-1 text-[120px] font-black leading-none text-white sm:text-[150px]">
            {displayDigit ?? '—'}
          </div>

          <div className="mt-5 flex items-center justify-center gap-3 text-sm">
            <span className="text-slate-500">Confidence</span>
            <span className="font-black text-cyan-300">{confidence}</span>
          </div>
          <div className="mt-3 font-mono text-sm font-bold tabular-nums text-slate-400">
            00:{String(countdown).padStart(2, '0')}
          </div>
        </section>

        <section className="mt-4 flex flex-col gap-2 sm:flex-row">
          <Button
            onClick={analysisRunning ? stopAnalysis : startAnalysis}
            className={`h-12 flex-1 text-xs font-black ${analysisRunning ? 'border border-red-400/20 bg-red-500/10 text-red-300 hover:bg-red-500/15' : 'bg-cyan-400 text-[#07111f] hover:bg-cyan-300'}`}
          >
            {analysisRunning ? <Square className="mr-2 h-4 w-4 fill-current" /> : <Play className="mr-2 h-4 w-4 fill-current" />}
            {analysisRunning ? 'STOP' : 'ANALYZE MATCHES'}
          </Button>
          <Button
            onClick={refreshAnalysis}
            disabled={analyzing || !isConnected}
            variant="outline"
            className="h-12 border-white/[0.08] bg-[#0d131e] px-6 text-xs font-black text-slate-200 sm:w-36"
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${analyzing ? 'animate-spin' : ''}`} />
            REFRESH
          </Button>
        </section>

        <section className="mt-4 grid grid-cols-1 gap-2 rounded-xl border border-white/[0.07] bg-[#0d131e] p-3 sm:grid-cols-[1.15fr_1fr_1fr]">
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.14em] text-slate-500">Market</p>
            <Select value={activeSymbol?.underlying_symbol} onValueChange={selectSymbol}>
              <SelectTrigger className="mt-1 h-9 border-0 bg-transparent px-0 text-sm font-bold text-white shadow-none">
                <SelectValue placeholder="Select market" />
              </SelectTrigger>
              <SelectContent>{symbols.map((symbol) => <SelectItem key={symbol.underlying_symbol} value={symbol.underlying_symbol}>{symbol.underlying_symbol_name}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="border-t border-white/[0.06] pt-3 sm:border-l sm:border-t-0 sm:px-4 sm:pt-0">
            <p className="text-[9px] font-black uppercase tracking-[0.14em] text-slate-500">Current digit</p>
            <p className="mt-1 text-xl font-black text-white">{currentDigit ?? '-'}</p>
          </div>
          <div className="border-t border-white/[0.06] pt-3 sm:border-l sm:border-t-0 sm:px-4 sm:pt-0">
            <p className="text-[9px] font-black uppercase tracking-[0.14em] text-slate-500">Trend</p>
            <p className="mt-1 text-sm font-bold text-white">{trend}</p>
          </div>
        </section>

        <section className="mt-4 grid gap-4 sm:grid-cols-[1fr_180px]">
          <div className="rounded-xl border border-white/[0.07] bg-[#0d131e] p-4">
            <h2 className="text-xs font-black uppercase tracking-[0.14em] text-white">Prediction history</h2>
            {history.length === 0 ? (
              <p className="mt-4 text-xs text-slate-500">No predictions yet.</p>
            ) : (
              <div className="mt-3 divide-y divide-white/[0.06]">
                {history.slice(0, 5).map((item) => (
                  <div key={item.number} className="flex items-center justify-between py-2.5 text-xs">
                    <div>
                      <span className="font-black text-white">{item.predictedDigit}</span>
                      <span className="ml-2 text-slate-500">{new Date(item.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <span className={`font-black ${item.result === 'WIN' ? 'text-emerald-400' : item.result === 'LOSS' ? 'text-red-400' : 'text-slate-500'}`}>
                      {item.result}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="rounded-xl border border-white/[0.07] bg-[#0d131e] p-4">
            <p className="text-[9px] font-black uppercase tracking-[0.14em] text-slate-500">Recent result</p>
            {recentResult ? (
              <div className="mt-3">
                <p className={`text-2xl font-black ${recentResult.result === 'WIN' ? 'text-emerald-400' : recentResult.result === 'LOSS' ? 'text-red-400' : 'text-slate-300'}`}>
                  {recentResult.result}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Predicted {recentResult.predictedDigit}
                  {recentResult.actualDigit !== undefined ? ` · Actual ${recentResult.actualDigit}` : ''}
                </p>
              </div>
            ) : (
              <p className="mt-3 text-sm text-slate-500">Pending</p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
