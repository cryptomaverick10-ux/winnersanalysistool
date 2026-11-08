import { getStore } from '@netlify/blobs';
import { NextRequest, NextResponse } from 'next/server';
import { requireOwner } from '@/lib/owner-auth';

const STORE_NAME = 'matches-analysis-private';
const HISTORY_KEY = 'prediction-history-v1';

async function readHistory(): Promise<unknown[]> {
  try {
    const store = getStore(STORE_NAME);
    const value = await store.get(HISTORY_KEY, { type: 'json' });
    return Array.isArray(value) ? value.slice(0, 500) : [];
  } catch (error) {
    console.error('Unable to read private prediction history', error);
    return [];
  }
}

export async function GET(request: NextRequest) {
  const unauthorized = requireOwner(request);
  if (unauthorized) return unauthorized;
  return NextResponse.json({ history: await readHistory() });
}

export async function POST(request: NextRequest) {
  const unauthorized = requireOwner(request);
  if (unauthorized) return unauthorized;
  const body = await request.json().catch(() => null) as { record?: unknown; replace?: boolean; history?: unknown[] } | null;
  if (body?.replace === true && Array.isArray(body.history)) {
    try {
      await getStore(STORE_NAME).setJSON(HISTORY_KEY, body.history.slice(0, 500));
      return NextResponse.json({ history: body.history.slice(0, 500) });
    } catch (error) {
      console.error('Unable to replace private prediction history', error);
      return NextResponse.json({ error: 'History storage unavailable' }, { status: 503 });
    }
  }
  if (!body?.record || typeof body.record !== 'object') {
    return NextResponse.json({ error: 'Invalid history record' }, { status: 400 });
  }
  const record = body.record as Record<string, unknown>;
  const history = await readHistory();
  const next = [{ ...record, serverTimestamp: new Date().toISOString() }, ...history].slice(0, 500);
  try {
    await getStore(STORE_NAME).setJSON(HISTORY_KEY, next);
    return NextResponse.json({ history: next });
  } catch (error) {
    console.error('Unable to persist private prediction history', error);
    return NextResponse.json({ error: 'History storage unavailable' }, { status: 503 });
  }
}
