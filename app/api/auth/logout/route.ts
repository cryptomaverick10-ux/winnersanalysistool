import { NextRequest, NextResponse } from 'next/server';
import { clearOwnerCookie } from '@/lib/owner-auth';

export async function POST(_request: NextRequest) {
  return clearOwnerCookie(NextResponse.json({ authenticated: false }));
}
