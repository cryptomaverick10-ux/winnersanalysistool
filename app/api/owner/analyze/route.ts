import { NextRequest, NextResponse } from 'next/server';
import { analyzeDigits, type MatchStrategy } from '@/lib/match-analysis';

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null) as {
    prices?: unknown;
    pipSize?: unknown;
    strategy?: unknown;
    targetDigit?: unknown;
    windowSize?: unknown;
  } | null;
  const prices = Array.isArray(body?.prices)
    ? body.prices.filter((value): value is number => typeof value === 'number' && Number.isFinite(value))
    : [];
  const pipSize = typeof body?.pipSize === 'number' ? Math.max(0, Math.min(body.pipSize, 6)) : 2;
  const strategy: MatchStrategy = body?.strategy === 'DIFFERS' ? 'DIFFERS' : 'MATCHES';
  const targetDigit = typeof body?.targetDigit === 'number'
    ? Math.max(0, Math.min(9, Math.floor(body.targetDigit)))
    : 5;
  const windowSize = typeof body?.windowSize === 'number'
    ? Math.max(25, Math.min(5000, Math.floor(body.windowSize)))
    : 100;
  if (prices.length === 0) {
    return NextResponse.json({ error: 'Live tick history is required' }, { status: 400 });
  }
  const response = NextResponse.json(analyzeDigits(prices, pipSize, strategy, targetDigit, windowSize));
  response.headers.set('Cache-Control', 'no-store');
  response.headers.set('Pragma', 'no-cache');
  return response;
}
