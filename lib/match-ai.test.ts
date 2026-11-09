import assert from 'node:assert/strict';
import test from 'node:test';
import { analyzeMatchDigits, parseLastDigit, toLivePatternScore } from './match-ai.ts';

test('toLivePatternScore maps live sample balance to the 68-100 score range', () => {
  assert.equal(toLivePatternScore(0), 68);
  assert.equal(toLivePatternScore(50), 84);
  assert.equal(toLivePatternScore(75), 92);
  assert.equal(toLivePatternScore(100), 100);
  assert.equal(toLivePatternScore(-10), 68);
  assert.equal(toLivePatternScore(110), 100);
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
