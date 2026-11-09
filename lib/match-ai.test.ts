import assert from 'node:assert/strict';
import test from 'node:test';
import {
  analyzeLiveDigitStrategies,
  analyzeMatchDigits,
  evaluateLiveMatchValidation,
  getSignalStrength,
  parseLastDigit,
  toMarketActivityIndex,
  toLivePatternScore,
} from './match-ai.ts';

function makeVolatilityPrices(pointsPerWindow: number, pipSize = 0): number[] {
  const steps = Array.from({ length: 30 }, () => 2);
  for (let index = 0; index < pointsPerWindow - 60; index += 1) {
    steps[index] = 3;
  }
  steps.push(...steps.slice(0, 4));
  return steps.reduce<number[]>((prices, step) => {
    prices.push(prices.at(-1)! + (step * (10 ** -pipSize)));
    return prices;
  }, [0]);
}

test('getSignalStrength only returns moderate or strong tiers', () => {
  assert.equal(getSignalStrength(0), 'MODERATE SIGNAL');
  assert.equal(getSignalStrength(80), 'MODERATE SIGNAL');
  assert.equal(getSignalStrength(89), 'MODERATE SIGNAL');
  assert.equal(getSignalStrength(90), 'STRONG SIGNAL');
  assert.equal(getSignalStrength(95), 'STRONG SIGNAL');
  assert.equal(getSignalStrength(100), 'STRONG SIGNAL');
});

test('toLivePatternScore maps observed live sample balance to the 80-100 score range', () => {
  assert.equal(toLivePatternScore(0), 80);
  assert.equal(toLivePatternScore(50), 90);
  assert.equal(toLivePatternScore(75), 95);
  assert.equal(toLivePatternScore(100), 100);
  assert.equal(toLivePatternScore(-10), 80);
  assert.equal(toLivePatternScore(110), 100);
});

test('toMarketActivityIndex stays in 69-100 and increases with market activity quality', () => {
  assert.equal(toMarketActivityIndex(0, 0, 0), 69);
  assert.equal(toMarketActivityIndex(1, 1, 1), 100);
  assert.ok(toMarketActivityIndex(0.8, 0.8, 0.8) > toMarketActivityIndex(0.4, 0.4, 0.4));
  assert.equal(toMarketActivityIndex(2, 2, 2), 100);
  assert.equal(toMarketActivityIndex(-1, -1, -1), 69);
});

test('parseLastDigit extracts the final digit from live prices', () => {
  assert.equal(parseLastDigit(123.4567), 7);
  assert.equal(parseLastDigit('987.650'), 0);
  assert.equal(parseLastDigit(987.6, 2), 0);
  assert.equal(parseLastDigit(987.64, 2), 4);
  assert.equal(parseLastDigit('not-a-price'), null);
});

test('match candidate ranking can select every digit from 0 through 9', () => {
  for (let candidate = 0; candidate <= 9; candidate += 1) {
    const orderedDigits = [
      candidate,
      ...Array.from({ length: 9 }, (_, index) => (candidate + index + 1) % 10),
    ];
    const ticks = Array.from({ length: 3 }, () => orderedDigits).flat();
    assert.equal(analyzeMatchDigits(ticks, 100).best?.digit, candidate);
  }
});

test('equal-score absent digits do not always resolve to digit zero', () => {
  const patterns = Array.from({ length: 10 }, (_, offset) =>
    Array.from({ length: 25 }, (_, index) => ((index + offset) % 8) + 1)
  );
  const targets = patterns.map((digits) => analyzeMatchDigits(digits, 100).best?.digit);

  assert.ok(targets.some((digit) => digit !== 0));
  assert.ok(new Set(targets).size > 1);
});

test('analyzeMatchDigits ranks cold digits by the MATCHS score formula', () => {
  const digits = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 0,
    1, 2, 3, 4, 5, 6, 7, 8, 9, 0,
    1, 1, 1, 1, 1,
  ];
  const result = analyzeMatchDigits(digits, 25);

  assert.equal(result.ranked.length, 10);
  assert.ok(result.best);
  assert.equal(result.ranked[0].digit, result.best.digit);
  assert.ok(result.ranked.every((item, index) =>
    index === 0 || result.ranked[index - 1].score >= item.score
  ));
});

test('analyzeMatchDigits waits when no digit has a gap of 15 ticks', () => {
  const digits = Array.from({ length: 25 }, (_, index) => index % 10);
  digits.push(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0);
  const result = analyzeMatchDigits(digits, 25);

  assert.equal(result.waiting, true);
  assert.equal(result.risk, 'WAIT - NO SETUP');
});

test('live strategy analysis primes and confirms exhaustion with a stable 64-65 point baseline', () => {
  const digits = [
    ...Array.from({ length: 161 }, (_, index) => index % 10),
    0,
    ...Array.from({ length: 38 }, (_, index) => (index % 9) + 1),
  ];
  const result = analyzeLiveDigitStrategies(digits, makeVolatilityPrices(64, 2), 2);

  assert.equal(result.volatilityPoints, 64);
  assert.equal(result.stableVolatilityBaseline, true);
  assert.equal(result.exhaustion.digit, 0);
  assert.equal(result.exhaustion.gap, 38);
  assert.equal(result.exhaustion.primed, true);
  assert.equal(result.exhaustion.ready, true);
});

test('micro-cluster strategy flags a digit appearing at least three times in the last eight ticks', () => {
  const result = analyzeLiveDigitStrategies(
    [1, 2, 3, 7, 4, 7, 5, 7],
    makeVolatilityPrices(64, 2),
    2
  );

  assert.deepEqual(result.momentum, { digit: 7, count: 3, ready: true });
});

test('gap-divergence requires a 200-tick long share, zero short hits, and volatility below 65', () => {
  const digits = Array.from({ length: 200 }, (_, index) => index < 36 ? 7 : index % 6);
  const belowThreshold = analyzeLiveDigitStrategies(digits, makeVolatilityPrices(64, 2), 2);
  const atThreshold = analyzeLiveDigitStrategies(digits, makeVolatilityPrices(65, 2), 2);

  assert.deepEqual(belowThreshold.divergence, {
    digit: 7,
    longShare: 0.18,
    shortCount: 0,
    ready: true,
  });
  assert.equal(atThreshold.volatilityPoints, 65);
  assert.equal(atThreshold.divergence.ready, false);
});

test('evaluateLiveMatchValidation reports only completed predictions with prior tick history', () => {
  const digits = Array.from({ length: 50 }, (_, index) => index % 10);
  const validation = evaluateLiveMatchValidation(digits, 10, 20, 5);

  assert.equal(validation.sampleCount, 20);
  assert.ok(validation.correctPredictions >= 0);
  assert.ok(validation.correctPredictions <= validation.sampleCount);
  assert.equal(validation.accuracy, (validation.correctPredictions / validation.sampleCount) * 100);
  assert.ok(validation.confidenceInterval);
  assert.ok(validation.confidenceInterval.lower <= validation.accuracy);
  assert.ok(validation.confidenceInterval.upper >= validation.accuracy);
  assert.ok(validation.confidenceInterval.lower >= 0);
  assert.ok(validation.confidenceInterval.upper <= 100);
  assert.equal(validation.randomBaseline, 10);
  assert.equal(
    validation.edgeVsBaseline,
    validation.accuracy === null ? null : validation.accuracy - validation.randomBaseline
  );
});

test('evaluateLiveMatchValidation waits for the minimum historical sample', () => {
  const validation = evaluateLiveMatchValidation(Array.from({ length: 24 }, (_, index) => index % 10));

  assert.deepEqual(validation, {
    correctPredictions: 0,
    sampleCount: 0,
    accuracy: null,
    confidenceInterval: null,
    randomBaseline: 10,
    edgeVsBaseline: null,
  });
});
