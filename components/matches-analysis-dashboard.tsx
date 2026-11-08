'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Activity, BarChart3, Download, LogOut, Pause, Play, RefreshCw, Square, Volume2, VolumeX } from 'lucide-react';
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
  const [paused, setPaused] = useState(false);
  const [analysisRunning, setAnalysisRunning] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [minimumProbability, setMinimumProbability] = useState(60);
  const [history, setHistory] = useState<HistoryRecord[]>([]);
  const [lastTickEpoch, setLastTickEpoch] = useState(0);
  const lastResolvedPrice = useRef<number | null>(null);
  const analysisLock = useRef(false);
  const runAnalysisRef = useRef<(resetCountdown?: boolean) => void>(() => {});

  const effectiveWindow = customWindow ? Math.max(25, Number.parseInt(customWindow, 10) || windowSize) : windowSize;
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
      setCountdown(10);
      return;
    }
    const staleSeconds = Math.abs(Date.now() / 1000 - currentTick.epoch);
    if (staleSeconds > 15) {
      setCountdown(10);
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
        if (!response.ok) {
          setCountdown(10);
          return;
        }
        const next = await response.json() as MatchAnalysis;
        setAnalysis(next);
        if (next.dataQuality === 'INSUFFICIENT') {
          setCountdown(resetCountdown ? 10 : countdown);
          return;
        }
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
        if (resetCountdown) setCountdown(10);
        if (soundEnabled && next.confidence === 'HIGH CONFIDENCE') {
          try {
            const context = new AudioContext();
            const oscillator = context.createOscillator();
            oscillator.connect(context.destination);
            oscillator.frequency.value = 880;
            oscillator.start();
            oscillator.stop(context.currentTime + 0.12);
          } catch {}
        }
      } catch {
        setCountdown(10);
      } finally {
        setAnalyzing(false);
        analysisLock.current = false;
      }
    }, 350);
  }, [activeSymbol, currentTick, effectiveWindow, history, isConnected, persistHistory, pipSize, prices, soundEnabled, strategy, targetDigit]);

  runAnalysisRef.current = runAnalysis;

  useEffect(() => {
    if (!analysisRunning || paused || !isConnected) return;
    const timer = window.setInterval(() => {
      setCountdown((value) => Math.max(0, value - 1));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [analysisRunning, paused, isConnected]);

  useEffect(() => {
    if (!analysisRunning || paused || !isConnected || countdown !== 0) return;
    runAnalysisRef.current(true);
  }, [analysisRunning, paused, isConnected, countdown]);

  useEffect(() => {
    if (!currentTick || lastResolvedPrice.current === currentTick.quote) return;
    lastResolvedPrice.current = currentTick.quote;
    setLastTickEpoch(currentTick.epoch);
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

  const digits = useMemo(
    () => extractDigits(prices, pipSize),
    [prices, pipSize]
  );
  const tickFrequency = useMemo(() => {
    if (lastTickEpoch === 0) return 0;
    if (digits.length < 2) return 0;
    return digits.length / Math.max(1, lastTickEpoch);
  }, [digits.length, lastTickEpoch]);

  const sorted = useMemo(() => {
    if (strategy === 'DIFFERS') {
      return analysis.probabilities.map((item) => ({
        ...item,
        probability: item.digit === targetDigit ? 100 - analysis.probabilities.find((x) => x.digit === targetDigit)!.probability : item.probability,
      })).sort((a, b) => b.probability - a.probability);
    }
    return [...analysis.probabilities].sort((a, b) => b.probability - a.probability);
  }, [analysis, strategy, targetDigit]);

  const totalPredictions = history.length;
  const wins = history.filter((item) => item.result === 'WIN').length;
  const losses = history.filter((item) => item.result === 'LOSS').length;
  const accuracy = wins + losses > 0 ? (wins / (wins + losses)) * 100 : 0;

  const exportCsv = () => {
    const headers = ['Number', 'Date', 'Market', 'Strategy', 'Predicted Digit', 'Target Digit', 'Probability', 'Confidence', 'Actual Digit', 'Result'];
    const rows = history.map((item) => [
      item.number, item.time, item.market, item.strategy, item.predictedDigit,
      item.targetDigit ?? '', item.probability, item.confidence, item.actualDigit ?? '', item.result,
    ]);
    const csv = [headers, ...rows].map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'matches-analysis-history.csv';
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const mostRecent = digits.slice(-10);
  const predictionPassesFilter = analysis.probability >= minimumProbability;
  const statusText = !isConnected ? 'DISCONNECTED' : analysis.dataQuality === 'INSUFFICIENT' ? 'WAIT / NO STRONG SIGNAL' : predictionPassesFilter ? analysis.confidence : 'WAIT / NO STRONG SIGNAL';

  return (
    <main className="min-h-dvh bg-[#07111f] text-slate-100">
      <div className="mx-auto max-w-[1500px] px-3 py-4 sm:px-5 lg:px-7">
        <header className="mb-5 flex items-center justify-between rounded-2xl border border-cyan-400/10 bg-slate-950/50 px-4 py-3 backdrop-blur-xl">
          <div>
            <h1 className="text-xl font-black tracking-[0.08em] text-white sm:text-2xl">
              DERIV <span className="text-cyan-400">MATCHES AI ENGINE</span>
            </h1>
            <p className="mt-1 text-[10px] text-slate-400 sm:text-xs">Live Tick Intelligence | AI Probability Analysis | Real-Time Digit Predictions</p>
          </div>
          <div className="flex items-center gap-2">
            <div className={`hidden items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold sm:flex ${isConnected ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300' : 'border-red-400/30 bg-red-400/10 text-red-300'}`}>
              <span className={`h-2 w-2 rounded-full ${isConnected ? 'animate-pulse bg-emerald-400' : 'bg-red-400'}`} />
              {isConnected ? 'LIVE CONNECTION' : 'DISCONNECTED'}
            </div>
            <ThemeToggle />
            <Button
              variant="outline"
              size="icon"
              title="Secure logout"
              onClick={() => {
                sessionStorage.clear();
                localStorage.removeItem('deriv-matches-analysis-history-v1');
                fetch('/api/auth/logout', { method: 'POST', credentials: 'same-origin' })
                  .finally(() => window.location.replace('/login'));
              }}
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </header>

        <section className="mb-4 grid gap-3 rounded-2xl border border-white/5 bg-slate-900/70 p-3 lg:grid-cols-[1.4fr_1fr_1fr_1fr_auto] lg:items-end">
          <div>
            <label className="mb-1.5 block text-[10px] font-bold tracking-widest text-slate-400">MARKET</label>
            <Select value={activeSymbol?.underlying_symbol} onValueChange={selectSymbol}>
              <SelectTrigger className="border-cyan-400/10 bg-slate-950/70 text-white"><SelectValue placeholder="Select market" /></SelectTrigger>
              <SelectContent>{symbols.map((symbol) => <SelectItem key={symbol.underlying_symbol} value={symbol.underlying_symbol}>{symbol.underlying_symbol_name}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div>
            <label className="mb-1.5 block text-[10px] font-bold tracking-widest text-slate-400">STRATEGY</label>
            <div className="grid grid-cols-2 gap-1 rounded-lg bg-slate-950 p-1">
              {(['MATCHES', 'DIFFERS'] as MatchStrategy[]).map((mode) => (
                <button key={mode} onClick={() => setStrategy(mode)} className={`rounded-md px-3 py-2 text-xs font-black transition ${strategy === mode ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_20px_rgba(34,211,238,.25)]' : 'text-slate-400 hover:text-white'}`}>{mode}</button>
              ))}
            </div>
          </div>
          {strategy === 'DIFFERS' && (
            <div>
              <label className="mb-1.5 block text-[10px] font-bold tracking-widest text-slate-400">TARGET DIGIT</label>
              <div className="grid grid-cols-5 gap-1">
                {Array.from({ length: 10 }, (_, digit) => <button key={digit} onClick={() => setTargetDigit(digit)} className={`rounded-md py-1.5 text-xs font-bold ${targetDigit === digit ? 'bg-purple-500 text-white' : 'bg-slate-950 text-slate-400'}`}>{digit}</button>)}
              </div>
            </div>
          )}
          <div>
            <label className="mb-1.5 block text-[10px] font-bold tracking-widest text-slate-400">ANALYSIS WINDOW</label>
            <Select value={String(windowSize)} onValueChange={(value) => { setWindowSize(Number(value)); setCustomWindow(''); }}>
              <SelectTrigger className="border-cyan-400/10 bg-slate-950/70 text-white"><SelectValue /></SelectTrigger>
              <SelectContent>{WINDOW_OPTIONS.map((size) => <SelectItem key={size} value={String(size)}>Last {size} ticks</SelectItem>)}</SelectContent>
            </Select>
            <input
              value={customWindow}
              onChange={(event) => setCustomWindow(event.target.value.replace(/\D/g, '').slice(0, 4))}
              placeholder="Custom ticks"
              inputMode="numeric"
              className="mt-2 h-9 w-full rounded-md border border-cyan-400/10 bg-slate-950/70 px-3 text-xs text-white outline-none placeholder:text-slate-600"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="default" size="sm" onClick={() => { setAnalysisRunning(true); setPaused(false); setCountdown(10); window.setTimeout(() => runAnalysisRef.current(true), 0); }} disabled={analysisRunning && !paused && !analyzing}>
              <Play className="mr-2 h-4 w-4" />START
            </Button>
            <Button variant="outline" size="sm" onClick={() => { setAnalysisRunning(false); setPaused(false); setCountdown(10); }}>
              <Square className="mr-2 h-4 w-4" />STOP
            </Button>
            <Button variant="outline" size="sm" onClick={() => setPaused((value) => !value)} title={paused ? 'Resume auto prediction' : 'Pause auto prediction'}>
              {paused ? <><Play className="mr-2 h-4 w-4" />RESUME</> : <><Pause className="mr-2 h-4 w-4" />PAUSE</>}
            </Button>
            <Button variant="outline" size="icon" onClick={() => setSoundEnabled((value) => !value)} title="Toggle sound">{soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}</Button>
          </div>
        </section>

        <div className="grid gap-4 xl:grid-cols-[minmax(0,1.55fr)_minmax(280px,.45fr)]">
          <section className="relative overflow-hidden rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-slate-900 to-[#101a38] p-4 shadow-[0_20px_60px_rgba(0,0,0,.35)] sm:p-6">
            <div className="absolute right-[-80px] top-[-100px] h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />
            <div className="relative mb-3 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold tracking-[0.22em] text-cyan-400">PREDICTION</p>
                <p className="mt-1 text-xs text-slate-400">{activeSymbol?.underlying_symbol_name ?? 'No market selected'}</p>
              </div>
              <div className={`rounded-full border px-3 py-1 text-[10px] font-bold ${isConnected ? 'border-emerald-400/30 text-emerald-300' : 'border-red-400/30 text-red-300'}`}>{statusText}</div>
            </div>
            <div className="relative grid min-h-[260px] items-center rounded-2xl border border-white/5 bg-slate-950/40 px-4 sm:grid-cols-[1fr_auto] sm:px-8">
              <div className="text-center sm:text-left">
                <p className="text-xs font-bold tracking-widest text-slate-400">{strategy === 'MATCHES' ? 'PREDICTED DIGIT' : 'TARGET DIGIT'}</p>
                <div className="my-3 text-[110px] font-black leading-none text-white drop-shadow-[0_0_24px_rgba(34,211,238,.45)]">
                  {analysis.dataQuality === 'INSUFFICIENT'
                    ? '—'
                    : strategy === 'MATCHES'
                      ? analysis.predictedDigit
                      : targetDigit}
                </div>
                <div className="inline-flex items-center rounded-full border border-purple-400/20 bg-purple-400/10 px-3 py-1 text-xs font-black text-purple-300">
                  {strategy}
                </div>
              </div>
              <div className="space-y-3 sm:min-w-[220px]">
                <div className="rounded-xl border border-cyan-400/10 bg-slate-900/80 p-4">
                  <p className="text-[10px] font-bold text-slate-400">AI ESTIMATED PROBABILITY</p>
                  <p className="mt-1 text-3xl font-black text-cyan-300">{analysis.dataQuality === 'INSUFFICIENT' ? 'INSUFFICIENT DATA' : `${analysis.probability.toFixed(1)}%`}</p>
                </div>
                <div className="rounded-xl border border-white/5 bg-slate-900/80 p-4 text-center">
                  <p className="text-[10px] font-bold text-slate-400">NEXT UPDATE IN</p>
                  <p className="mt-1 text-3xl font-black text-white">{paused ? 'PAUSED' : countdown}</p>
                </div>
                <Button className="h-12 w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-sm font-black shadow-[0_0_30px_rgba(14,165,233,.25)]" onClick={() => runAnalysis(true)} disabled={analyzing || !isConnected}>
                  <RefreshCw className={`mr-2 h-4 w-4 ${analyzing ? 'animate-spin' : ''}`} />
                  {analyzing ? 'ANALYZING...' : 'REFRESH PREDICTION'}
                </Button>
              </div>
            </div>
          </section>

          <aside className="rounded-2xl border border-white/5 bg-slate-900/70 p-4">
            <div className="mb-4 flex items-center justify-between"><h2 className="text-xs font-black tracking-widest text-white">LIVE TICK MONITOR</h2><Activity className={`h-4 w-4 ${isConnected ? 'text-emerald-400' : 'text-red-400'}`} /></div>
            <div className="rounded-xl bg-slate-950/70 p-4 text-center">
              <p className="text-[10px] font-bold text-slate-500">LATEST LIVE TICK</p>
              <p className="mt-2 font-mono text-2xl font-bold text-white">{currentTick ? currentTick.quote.toFixed(pipSize) : '---'}</p>
              <span className="mt-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500 text-2xl font-black text-slate-950">{digits.at(-1) ?? '-'}</span>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-lg bg-slate-950/60 p-3"><p className="text-slate-500">Total ticks</p><p className="mt-1 text-lg font-bold text-white">{prices.length}</p></div>
              <div className="rounded-lg bg-slate-950/60 p-3"><p className="text-slate-500">Last update</p><p className="mt-1 font-bold text-white">{currentTick ? new Date(currentTick.epoch * 1000).toLocaleTimeString() : '--:--'}</p></div>
            </div>
            <div className="mt-3">
              <p className="mb-2 text-[10px] font-bold text-slate-500">PREVIOUS 10 DIGITS</p>
              <div className="flex flex-wrap gap-1.5">{mostRecent.length ? mostRecent.map((digit, index) => <span key={`${digit}-${index}`} className={`flex h-7 w-7 items-center justify-center rounded-md text-xs font-bold ${index === mostRecent.length - 1 ? 'bg-cyan-400 text-slate-950' : 'bg-slate-950 text-slate-300'}`}>{digit}</span>) : <span className="text-xs text-slate-500">Waiting for live ticks...</span>}</div>
            </div>
          </aside>
        </div>

        <section className="mt-4 grid gap-4 xl:grid-cols-[1.25fr_.75fr]">
          <div className="rounded-2xl border border-white/5 bg-slate-900/70 p-4">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xs font-black tracking-widest text-white">LIVE DIGIT PROBABILITY DISTRIBUTION</h2>
              <BarChart3 className="h-4 w-4 text-cyan-400" />
            </div>
            <div className="grid grid-cols-5 gap-2 sm:grid-cols-10">
              {analysis.probabilities.map((item) => (
                <div key={item.digit} className={`rounded-xl border p-2 text-center transition ${((strategy === 'MATCHES' && item.digit === analysis.predictedDigit) || (strategy === 'DIFFERS' && item.digit === targetDigit)) ? 'border-cyan-400 bg-cyan-400/10 shadow-[0_0_18px_rgba(34,211,238,.18)]' : 'border-white/5 bg-slate-950/50'}`}>
                  <div className="text-lg font-black text-white">{item.digit}</div>
                  <div className="mt-1 text-xs font-bold text-cyan-300">{item.probability.toFixed(1)}%</div>
                  <div className="mt-2 h-1 overflow-hidden rounded-full bg-slate-800"><div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-purple-500" style={{ width: `${Math.max(2, item.probability)}%` }} /></div>
                  <div className="mt-2 text-[9px] text-slate-500">{item.recentCount} recent</div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-white/5 bg-slate-900/70 p-4">
            <h2 className="mb-3 text-xs font-black tracking-widest text-white">AI ANALYSIS REPORT</h2>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between border-b border-white/5 pb-2"><span className="text-slate-500">{strategy === 'MATCHES' ? 'Predicted Digit' : 'Target Digit'}</span><span className="font-bold text-white">{strategy === 'MATCHES' ? analysis.predictedDigit : targetDigit}</span></div>
              <div className="flex justify-between border-b border-white/5 pb-2"><span className="text-slate-500">Estimated Probability</span><span className="font-bold text-cyan-300">{analysis.probability.toFixed(1)}%</span></div>
              <div className="flex justify-between border-b border-white/5 pb-2"><span className="text-slate-500">Classification</span><span className="font-bold text-purple-300">{analysis.confidence}</span></div>
              <div className="flex justify-between border-b border-white/5 pb-2"><span className="text-slate-500">Most / Least Frequent</span><span className="font-bold text-white">{analysis.mostFrequentDigit} / {analysis.leastFrequentDigit}</span></div>
              <div className="mt-3 space-y-1 text-slate-400">{analysis.reasons.map((reason) => <p key={reason}>• {reason}</p>)}</div>
            </div>
          </div>
        </section>

        <section className="mt-4 grid gap-4 lg:grid-cols-[.8fr_1.2fr]">
          <div className="rounded-2xl border border-white/5 bg-slate-900/70 p-4">
            <div className="mb-3 flex items-center justify-between"><h2 className="text-xs font-black tracking-widest text-white">AI BEST DIGIT RANKING</h2><Select value={String(minimumProbability)} onValueChange={(value) => setMinimumProbability(Number(value))}><SelectTrigger className="h-8 w-24 border-white/10 bg-slate-950 text-xs"><SelectValue /></SelectTrigger><SelectContent>{[60,70,80,85,90,95].map((value) => <SelectItem key={value} value={String(value)}>Min {value}%</SelectItem>)}</SelectContent></Select></div>
            <div className="space-y-2">{sorted.slice(0, 10).map((item, index) => <div key={item.digit} className="grid grid-cols-[24px_28px_1fr_48px] items-center gap-2 text-xs"><span className="text-slate-500">#{index + 1}</span><span className="font-bold text-white">{item.digit}</span><div className="h-2 rounded-full bg-slate-950"><div className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-purple-500" style={{ width: `${Math.min(100, item.probability)}%` }} /></div><span className="text-right font-bold text-cyan-300">{item.probability.toFixed(1)}%</span></div>)}</div>
          </div>
          <div className="rounded-2xl border border-white/5 bg-slate-900/70 p-4">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2"><h2 className="text-xs font-black tracking-widest text-white">PREDICTION HISTORY</h2><Button variant="outline" size="sm" onClick={exportCsv}><Download className="mr-2 h-3.5 w-3.5" />Export CSV</Button></div>
            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              <div className="rounded-lg bg-slate-950/60 p-2"><p className="text-slate-500">Total</p><p className="mt-1 text-lg font-black text-white">{totalPredictions}</p></div>
              <div className="rounded-lg bg-slate-950/60 p-2"><p className="text-slate-500">Wins</p><p className="mt-1 text-lg font-black text-emerald-400">{wins}</p></div>
              <div className="rounded-lg bg-slate-950/60 p-2"><p className="text-slate-500">Losses</p><p className="mt-1 text-lg font-black text-red-400">{losses}</p></div>
              <div className="rounded-lg bg-slate-950/60 p-2"><p className="text-slate-500">Accuracy</p><p className="mt-1 text-lg font-black text-cyan-300">{accuracy.toFixed(1)}%</p></div>
            </div>
            <div className="mt-3 max-h-52 overflow-auto">
              <table className="w-full text-left text-xs">
                <thead className="sticky top-0 bg-slate-900 text-slate-500"><tr><th className="p-2">#</th><th className="p-2">Time</th><th className="p-2">Market</th><th className="p-2">Mode</th><th className="p-2">Digit</th><th className="p-2">Probability</th><th className="p-2">Result</th></tr></thead>
                <tbody>{history.slice(0, 20).map((item) => <tr key={`${item.number}-${item.time}`} className="border-t border-white/5"><td className="p-2">{item.number}</td><td className="p-2 text-slate-400">{new Date(item.time).toLocaleTimeString()}</td><td className="max-w-24 truncate p-2">{item.market}</td><td className="p-2">{item.strategy}</td><td className="p-2 font-bold">{item.predictedDigit}{item.actualDigit !== undefined ? ` / ${item.actualDigit}` : ''}</td><td className="p-2">{item.probability.toFixed(1)}%</td><td className={`p-2 font-bold ${item.result === 'WIN' ? 'text-emerald-400' : item.result === 'LOSS' ? 'text-red-400' : 'text-amber-300'}`}>{item.result}</td></tr>)}</tbody>
              </table>
            </div>
          </div>
        </section>

        <footer className="mt-4 rounded-xl border border-white/5 bg-slate-950/40 px-4 py-2 text-center text-[10px] text-slate-500">Data quality: {analysis.dataQuality} · {prices.length} ticks analyzed · Pattern: {analysis.recentPattern.join(' ') || 'Waiting for data'}</footer>
      </div>
    </main>
  );
}
