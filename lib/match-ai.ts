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

export function toLivePatternScore(observedShare: number): number {
  const boundedShare = Math.min(100, Math.max(0, observedShare));
  return Math.round(68 + (boundedShare / 100) * 32);
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
  }).sort((a, b) => b.score - a.score || a.digit - b.digit);

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
