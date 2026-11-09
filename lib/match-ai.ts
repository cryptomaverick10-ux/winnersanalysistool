export interface DigitMatchStat {
  digit: number;
  count: number;
  percentage: number;
  gap: number;
  score: number;
}

export interface MatchAiResult {
  ranked: DigitMatchStat[];
  best: DigitMatchStat | null;
  confidence: number;
  risk: 'LOW RISK' | 'MEDIUM RISK' | 'WAIT - NO SETUP';
  waiting: boolean;
}

export interface LiveMatchValidation {
  correctPredictions: number;
  sampleCount: number;
  accuracy: number | null;
  confidenceInterval: { lower: number; upper: number } | null;
  randomBaseline: number;
  edgeVsBaseline: number | null;
}

export interface LiveDigitStrategyAnalysis {
  volatilityPoints: number | null;
  stableVolatilityBaseline: boolean;
  exhaustion: {
    digit: number | null;
    gap: number;
    primed: boolean;
    ready: boolean;
  };
  momentum: {
    digit: number | null;
    count: number;
    ready: boolean;
  };
  divergence: {
    digit: number | null;
    longShare: number;
    shortCount: number;
    ready: boolean;
  };
}

export type SignalStrength = 'MODERATE SIGNAL' | 'STRONG SIGNAL';

const VOLATILITY_WINDOW_TICKS = 30;
const VOLATILITY_STABILITY_READINGS = 5;
const EXHAUSTION_PRIMED_GAP = 35;
const EXHAUSTION_TRIGGER_GAP = 38;
const VOLATILITY_BASELINE_MIN = 64;
const VOLATILITY_BASELINE_MAX = 65;
const DIVERGENCE_SAFETY_THRESHOLD = 65;

export function getSignalStrength(observedRate: number): SignalStrength {
  if (observedRate >= 90) return 'STRONG SIGNAL';
  return 'MODERATE SIGNAL';
}

export function toLivePatternScore(observedShare: number): number {
  const boundedShare = Math.min(100, Math.max(0, observedShare));
  return Math.round(80 + (boundedShare / 100) * 20);
}

export function toMarketActivityIndex(
  entropyRatio: number,
  digitCoverage: number,
  movementRatio: number
): number {
  const boundedEntropy = Math.min(1, Math.max(0, entropyRatio));
  const boundedCoverage = Math.min(1, Math.max(0, digitCoverage));
  const boundedMovement = Math.min(1, Math.max(0, movementRatio));
  const marketQuality =
    (boundedEntropy * 0.5) +
    (boundedCoverage * 0.25) +
    (boundedMovement * 0.25);
  return Math.round(69 + (marketQuality * 31));
}

export function analyzeLiveDigitStrategies(
  digits: number[],
  prices: number[],
  pipSize: number | null
): LiveDigitStrategyAnalysis {
  const pipStep = pipSize !== null && Number.isInteger(pipSize) && pipSize >= 0 && pipSize <= 20
    ? 10 ** -pipSize
    : null;
  const volatilityReadings: number[] = [];

  if (pipStep !== null && prices.length >= VOLATILITY_WINDOW_TICKS + VOLATILITY_STABILITY_READINGS) {
    for (
      let end = prices.length - VOLATILITY_STABILITY_READINGS;
      end < prices.length;
      end += 1
    ) {
      const start = end - VOLATILITY_WINDOW_TICKS;
      let movementPoints = 0;
      for (let index = start + 1; index <= end; index += 1) {
        movementPoints += Math.abs(prices[index] - prices[index - 1]) / pipStep;
      }
      volatilityReadings.push(Math.round(movementPoints));
    }
  }

  const volatilityPoints = volatilityReadings.at(-1) ?? null;
  const stableVolatilityBaseline =
    volatilityReadings.length === VOLATILITY_STABILITY_READINGS &&
    volatilityReadings.every((points) => points >= VOLATILITY_BASELINE_MIN && points <= VOLATILITY_BASELINE_MAX);

  const longWindow = digits.slice(-200);
  const shortWindow = digits.slice(-30);
  const gaps = Array.from({ length: 10 }, (_, digit) => {
    let gap = 0;
    for (let index = longWindow.length - 1; index >= 0 && longWindow[index] !== digit; index -= 1) {
      gap += 1;
    }
    return { digit, gap };
  }).sort((a, b) => b.gap - a.gap || a.digit - b.digit);
  const mostExhausted = gaps[0];
  const exhaustion = {
    digit: longWindow.length ? mostExhausted.digit : null,
    gap: longWindow.length ? mostExhausted.gap : 0,
    primed: longWindow.length >= EXHAUSTION_PRIMED_GAP && mostExhausted.gap >= EXHAUSTION_PRIMED_GAP,
    ready: longWindow.length >= EXHAUSTION_TRIGGER_GAP &&
      mostExhausted.gap >= EXHAUSTION_TRIGGER_GAP &&
      stableVolatilityBaseline,
  };

  const recentCluster = shortWindow.slice(-8);
  const clusterCounts = Array.from({ length: 10 }, (_, digit) => ({
    digit,
    count: recentCluster.filter((value) => value === digit).length,
    lastIndex: recentCluster.lastIndexOf(digit),
  })).sort((a, b) => b.count - a.count || b.lastIndex - a.lastIndex);
  const hottestCluster = clusterCounts[0];
  const momentum = {
    digit: recentCluster.length ? hottestCluster.digit : null,
    count: recentCluster.length ? hottestCluster.count : 0,
    ready: recentCluster.length === 8 && hottestCluster.count >= 3,
  };

  const divergenceCandidates = Array.from({ length: 10 }, (_, digit) => {
    const longCount = longWindow.filter((value) => value === digit).length;
    return {
      digit,
      longShare: longWindow.length ? longCount / longWindow.length : 0,
      shortCount: shortWindow.filter((value) => value === digit).length,
    };
  }).filter((candidate) =>
    candidate.longShare >= 0.18 &&
    candidate.shortCount === 0 &&
    longWindow.length === 200 &&
    shortWindow.length === 30
  ).sort((a, b) => b.longShare - a.longShare || a.digit - b.digit);
  const dominantGap = divergenceCandidates[0];
  const divergence = {
    digit: dominantGap?.digit ?? null,
    longShare: dominantGap?.longShare ?? 0,
    shortCount: dominantGap?.shortCount ?? 0,
    ready: Boolean(
      dominantGap &&
      volatilityPoints !== null &&
      volatilityPoints < DIVERGENCE_SAFETY_THRESHOLD
    ),
  };

  return {
    volatilityPoints,
    stableVolatilityBaseline,
    exhaustion,
    momentum,
    divergence,
  };
}

export function parseLastDigit(price: number | string, pipSize?: number): number | null {
  if (typeof pipSize === 'number' && Number.isInteger(pipSize) && pipSize >= 0 && pipSize <= 20) {
    const formattedPrice = Number(price).toFixed(pipSize);
    const digit = Number.parseInt(formattedPrice.at(-1) ?? '', 10);
    return Number.isNaN(digit) ? null : digit;
  }

  const text = String(price);
  const digit = Number.parseInt(text.slice(-1), 10);
  return Number.isNaN(digit) ? null : digit;
}

export function analyzeMatchDigits(digits: number[], lookback: number): MatchAiResult {
  const window = digits.slice(-lookback);
  const total = window.length;
  const sequenceHash = window.reduce(
    (hash, digit) => Math.imul(hash ^ digit, 16777619) >>> 0,
    2166136261
  );
  const tieBreakOffset = sequenceHash % 10;

  const ranked: DigitMatchStat[] = Array.from({ length: 10 }, (_, digit) => {
    let count = 0;
    for (let index = 0; index < window.length; index += 1) {
      if (window[index] === digit) count += 1;
    }

    let gap = window.length;
    for (let index = window.length - 1; index >= 0; index -= 1) {
      if (window[index] === digit) {
        gap = window.length - 1 - index;
        break;
      }
    }

    const percentage = total > 0 ? (count / total) * 100 : 0;
    const score = (10 - percentage) + (gap * 0.5);
    return { digit, count, percentage, gap, score };
  }).sort((a, b) => {
    const scoreDifference = b.score - a.score;
    if (scoreDifference !== 0) return scoreDifference;
    return ((a.digit - tieBreakOffset + 10) % 10) - ((b.digit - tieBreakOffset + 10) % 10);
  });

  const best = ranked[0] ?? null;
  if (!best || total === 0) {
    return { ranked, best: null, confidence: 0, risk: 'WAIT - NO SETUP', waiting: true };
  }

  const confidence = Math.min(
    95,
    50 + (best.gap * 1.2) + ((10 - best.percentage) * 2)
  );
  const stabilityBase = window.length >= 10 ? Math.floor(window.length / 2) : window.length;
  const firstHalf = window.slice(0, stabilityBase);
  const secondHalf = window.slice(stabilityBase);
  const firstCount = firstHalf.filter((digit) => digit === best.digit).length;
  const secondCount = secondHalf.filter((digit) => digit === best.digit).length;
  const stabilityBonus = Math.max(0, 8 - (Math.abs(firstCount - secondCount) * 2));
  const roundedConfidence = Math.round(Math.min(95, confidence + stabilityBonus));
  const noDigitIsOverdue = ranked.every((item) => item.gap < 15);

  let risk: MatchAiResult['risk'];
  if (noDigitIsOverdue) {
    risk = 'WAIT - NO SETUP';
  } else if (best.gap > 30 && best.percentage < 7) {
    risk = 'LOW RISK';
  } else if (best.gap >= 15 && best.gap <= 30) {
    risk = 'MEDIUM RISK';
  } else {
    risk = 'MEDIUM RISK';
  }

  return {
    ranked,
    best,
    confidence: roundedConfidence,
    risk,
    waiting: risk === 'WAIT - NO SETUP',
  };
}

export function evaluateLiveMatchValidation(
  digits: number[],
  lookback = 100,
  maxSamples = 100,
  minimumHistory = 25
): LiveMatchValidation {
  const validationWindow = digits.slice(-(lookback + maxSamples));
  const firstOutcomeIndex = Math.max(minimumHistory, validationWindow.length - maxSamples);
  let correctPredictions = 0;
  let sampleCount = 0;

  for (let outcomeIndex = firstOutcomeIndex; outcomeIndex < validationWindow.length; outcomeIndex += 1) {
    const history = validationWindow.slice(Math.max(0, outcomeIndex - lookback), outcomeIndex);
    if (history.length < minimumHistory) continue;

    const predictedDigit = analyzeMatchDigits(history, lookback).best?.digit;
    if (predictedDigit === undefined) continue;
    if (predictedDigit === validationWindow[outcomeIndex]) correctPredictions += 1;
    sampleCount += 1;
  }

  const accuracy = sampleCount ? (correctPredictions / sampleCount) * 100 : null;
  const randomBaseline = 10;
  let confidenceInterval: LiveMatchValidation['confidenceInterval'] = null;
  if (sampleCount > 0) {
    const zScore = 1.96;
    const proportion = correctPredictions / sampleCount;
    const zSquared = zScore * zScore;
    const denominator = 1 + zSquared / sampleCount;
    const center = (proportion + zSquared / (2 * sampleCount)) / denominator;
    const margin = (zScore * Math.sqrt(
      (proportion * (1 - proportion) / sampleCount) +
      (zSquared / (4 * sampleCount * sampleCount))
    )) / denominator;
    confidenceInterval = {
      lower: Math.max(0, (center - margin) * 100),
      upper: Math.min(100, (center + margin) * 100),
    };
  }

  return {
    correctPredictions,
    sampleCount,
    accuracy,
    confidenceInterval,
    randomBaseline,
    edgeVsBaseline: accuracy === null ? null : accuracy - randomBaseline,
  };
}
