import assert from 'node:assert/strict';
import test from 'node:test';
import { analyzeMatchDigits, parseLastDigit } from './match-ai.ts';

test('parseLastDigit extracts the final digit from live prices', () => {
  assert.equal(parseLastDigit(123.4567), 7);
  assert.equal(parseLastDigit('987.650'), 0);
  assert.equal(parseLastDigit('not-a-price'), null);
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
