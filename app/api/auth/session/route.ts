import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken, OWNER_COOKIE } from '@/lib/owner-auth';

export async function GET(request: NextRequest) {
  const token = request.cookies.get(OWNER_COOKIE)?.value;
  return NextResponse.json({ authenticated: verifySessionToken(token) });
}
