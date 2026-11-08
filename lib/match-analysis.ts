export type MatchStrategy = 'MATCHES' | 'DIFFERS';
export type ConfidenceLevel = 'HIGH CONFIDENCE' | 'MODERATE CONFIDENCE' | 'LOW CONFIDENCE' | 'WAIT / NO STRONG SIGNAL';

export interface DigitAnalysis {
  digit: number;
  probability: number;
  count: number;
  recentCount: number;
  gap: number;
}

export interface MatchAnalysis {
  probabilities: DigitAnalysis[];
  predictedDigit: number;
  probability: number;
  confidence: ConfidenceLevel;
  differsProbability: number;
  mostFrequentDigit: number;
  leastFrequentDigit: number;
  recentPattern: number[];
  dataQuality: 'RELIABLE' | 'LIMITED' | 'INSUFFICIENT';
  reasons: string[];
  validatedAccuracy: number;
  validationSamples: number;
  validationEligible: boolean;
}

export function extractDigits(prices: number[], pipSize: number): number[] {
  return prices.map((price) => {
    const text = price.toFixed(pipSize);
    const parsed = Number.parseInt(text[text.length - 1], 10);
    return Number.isNaN(parsed) ? 0 : parsed;
  });
}

function countsFor(digits: number[]): number[] {
  const counts = Array(10).fill(0) as number[];
  digits.forEach((digit) => counts[digit]++);
  return counts;
}

export function analyzeDigits(
  prices: number[],
  pipSize: number,
  strategy: MatchStrategy,
  targetDigit: number,
  windowSize: number
): MatchAnalysis {
  const allDigits = extractDigits(prices, pipSize);
  const window = allDigits.slice(-Math.max(10, windowSize));
  const recent = window.slice(-25);
  const short = window.slice(-50);
  const counts = countsFor(window);
  const shortCounts = countsFor(short);
  const recentCounts = countsFor(recent);
  const total = window.length;

  const probabilities = Array.from({ length: 10 }, (_, digit) => {
    const windows: Array<[number, number]> = [
      [counts[digit], Math.max(total, 1)],
      [shortCounts[digit], Math.max(short.length, 1)],
      [recentCounts[digit], Math.max(recent.length, 1)],
    ];
    const posteriorEstimates = windows.map(([count, size]) =>
      (count + 1) / (size + 10)
    );
    const probability = posteriorEstimates.reduce((sum, value, index) =>
      sum + value * [0.2, 0.3, 0.5][index], 0
    );
    const lastIndex = window.lastIndexOf(digit);
    return {
      digit,
      probability: probability * 100,
      count: counts[digit],
      recentCount: recentCounts[digit],
      gap: lastIndex === -1 ? window.length : window.length - 1 - lastIndex,
    };
  });

  const totalProbability = probabilities.reduce((sum, item) => sum + item.probability, 0);
  if (totalProbability > 0) {
    probabilities.forEach((item) => {
      item.probability = (item.probability / totalProbability) * 100;
    });
  }

  probabilities.sort((a, b) => b.probability - a.probability || a.digit - b.digit);
  const predictedDigit = probabilities[0].digit;
  const predictedItem = probabilities[0];
  const targetProbability = probabilities.find((item) => item.digit === targetDigit)?.probability ?? 10;
  const differsProbability = Math.max(0, Math.min(100, 100 - targetProbability));
  const probability = strategy === 'MATCHES' ? predictedItem.probability : differsProbability;

  let confidence: ConfidenceLevel;
  if (total < 25 || probabilities.length === 0) confidence = 'WAIT / NO STRONG SIGNAL';
  else if (probability >= 80 && total >= 250) confidence = 'HIGH CONFIDENCE';
  else if (probability >= 65 && total >= 100) confidence = 'MODERATE CONFIDENCE';
  else confidence = 'LOW CONFIDENCE';

  const maxCount = Math.max(...counts);
  const minCount = Math.min(...counts);
  const mostFrequentDigit = counts.indexOf(maxCount);
  const leastFrequentDigit = counts.indexOf(minCount);
  const recentPattern = recent.slice(-10);

  const backtestStart = Math.max(25, window.length - 250);
  let validationWins = 0;
  let validationSamples = 0;
  if (total >= 100) {
    for (let index = backtestStart; index < window.length; index += 1) {
      const training = window.slice(0, index);
      if (training.length < 25) continue;
      const actual = window[index];
      const trainCounts = countsFor(training);
      const trainTotal = training.length;
      const ranked = Array.from({ length: 10 }, (_, digit) => digit).sort((a, b) =>
        (trainCounts[b] + 1) / (trainTotal + 10) - (trainCounts[a] + 1) / (trainTotal + 10)
      );
      const predicted = ranked[0];
      const targetMatch = trainCounts[targetDigit] / Math.max(trainTotal, 1);
      const differsEstimatedAccuracy = 1 - targetMatch;
      validationSamples += 1;
      if (strategy === 'MATCHES') {
        if (actual === predicted) validationWins += 1;
      } else if (differsEstimatedAccuracy >= 0.8 && actual !== targetDigit) {
        validationWins += 1;
      }
    }
  }
  const validatedAccuracy = validationSamples > 0 ? (validationWins / validationSamples) * 100 : 0;
  const validationEligible = validationSamples >= 25 && validatedAccuracy >= 80 && probability >= 80 && total >= 250;
  if (!validationEligible) {
    if (total < 25 || probability < 65) confidence = 'WAIT / NO STRONG SIGNAL';
    else if (probability >= 65 && total >= 100) confidence = 'MODERATE CONFIDENCE';
    else confidence = 'LOW CONFIDENCE';
  }

  const reasons = [
    `${total} ticks analyzed across the configured ${window.length}-tick window.`,
    `Digit ${predictedDigit} is currently ranked first in weighted 25/50/long-window estimates.`,
    strategy === 'DIFFERS'
      ? `Target digit ${targetDigit} has an estimated ${targetProbability.toFixed(1)}% match probability; differs is ${differsProbability.toFixed(1)}%.`
      : `Its recent occurrence count is ${predictedItem.recentCount}, with a gap of ${predictedItem.gap} ticks.`,
  ];

  let dataQuality: MatchAnalysis['dataQuality'] = 'RELIABLE';
  if (total < 25) dataQuality = 'INSUFFICIENT';
  else if (total < 100) dataQuality = 'LIMITED';

  return {
    probabilities,
    predictedDigit,
    probability,
    confidence,
    differsProbability,
    mostFrequentDigit,
    leastFrequentDigit,
    recentPattern,
    dataQuality,
    reasons,
    validatedAccuracy,
    validationSamples,
    validationEligible,
  };
}
