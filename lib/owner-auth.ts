import { createHmac, pbkdf2Sync, timingSafeEqual } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';

export const OWNER_COOKIE = 'owner_session';

export function verifyPassword(password: string): boolean {
  const configured = process.env.OWNER_PASSWORD_HASH;
  if (!configured) return false;
  const parts = configured.split('$');
  if (parts.length !== 4 || parts[0] !== 'pbkdf2') return false;
  const iterations = Number.parseInt(parts[1], 10);
  const salt = Buffer.from(parts[2], 'base64');
  const expected = Buffer.from(parts[3], 'base64');
  if (!Number.isFinite(iterations) || salt.length === 0 || expected.length === 0) return false;
  const actual = pbkdf2Sync(password, salt, iterations, expected.length, 'sha256');
  return timingSafeEqual(actual, expected);
}

function getSessionSecret(): string {
  const secret = process.env.OWNER_SESSION_SECRET;
  if (!secret) throw new Error('OWNER_SESSION_SECRET is not configured');
  return secret;
}

export function inactivityMinutes(): number {
  const value = Number.parseInt(process.env.OWNER_INACTIVITY_MINUTES ?? '30', 10);
  return Number.isFinite(value) ? Math.max(5, Math.min(value, 720)) : 30;
}

export function createSessionToken(username: string): string {
  const now = Date.now();
  const payload = Buffer.from(JSON.stringify({
    username,
    lastActivity: now,
  })).toString('base64url');
  const signature = createHmac('sha256', getSessionSecret()).update(payload).digest('base64url');
  return `${payload}.${signature}`;
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const [payload, signature, extra] = token.split('.');
  if (!payload || !signature || extra) return false;
  const expected = createHmac('sha256', getSessionSecret()).update(payload).digest('base64url');
  const actualBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);
  if (actualBuffer.length !== expectedBuffer.length) return false;
  if (!timingSafeEqual(actualBuffer, expectedBuffer)) return false;
  try {
    const session = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as {
      username?: string;
      lastActivity?: number;
    };
    if (session.username !== process.env.OWNER_USERNAME) return false;
    if (!session.lastActivity || Date.now() - session.lastActivity > inactivityMinutes() * 60 * 1000) return false;
    return true;
  } catch {
    return false;
  }
}

export function setOwnerCookie(response: NextResponse, token: string): NextResponse {
  response.cookies.set(OWNER_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: inactivityMinutes() * 60,
  });
  return response;
}

export function clearOwnerCookie(response: NextResponse): NextResponse {
  response.cookies.set(OWNER_COOKIE, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 0,
  });
  return response;
}

export function requireOwner(request: NextRequest): NextResponse | null {
  const session = request.cookies.get(OWNER_COOKIE)?.value;
  if (!verifySessionToken(session)) {
    const response = NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    response.headers.set('Cache-Control', 'no-store');
    return response;
  }
  if (!isSafeOrigin(request)) {
    return NextResponse.json({ error: 'Invalid origin' }, { status: 403 });
  }
  return null;
}

export function isSafeOrigin(request: NextRequest): boolean {
  const origin = request.headers.get('origin');
  if (!origin) return true;
  try {
    const allowed = new URL(request.url).origin;
    return origin === allowed;
  } catch {
    return false;
  }
}
