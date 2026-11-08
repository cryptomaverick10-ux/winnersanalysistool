import { NextRequest, NextResponse } from 'next/server';
import {
  createSessionToken,
  setOwnerCookie,
  verifyPassword,
} from '@/lib/owner-auth';

const attempts = new Map<string, { count: number; resetAt: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;

function clientKey(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  return forwarded || request.headers.get('x-real-ip') || 'unknown';
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get('origin');
  if (origin) {
    try {
      if (origin !== new URL(request.url).origin) {
        return NextResponse.json({ error: 'Invalid origin' }, { status: 403 });
      }
    } catch {
      return NextResponse.json({ error: 'Invalid origin' }, { status: 403 });
    }
  }

  const key = clientKey(request);
  const now = Date.now();
  const current = attempts.get(key);
  if (current && current.resetAt > now && current.count >= MAX_ATTEMPTS) {
    return NextResponse.json({ error: 'Too many login attempts. Try again later.' }, { status: 429 });
  }
  if (!current || current.resetAt <= now) attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
  else current.count += 1;

  const body = await request.json().catch(() => null) as { username?: string; password?: string } | null;
  const username = body?.username?.trim();
  const password = body?.password ?? '';
  if (!username || !password) {
    return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
  }
  if (username !== process.env.OWNER_USERNAME || !verifyPassword(password)) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  attempts.delete(key);
  const response = NextResponse.json({ authenticated: true });
  return setOwnerCookie(response, createSessionToken(username));
}
