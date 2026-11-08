import { NextRequest, NextResponse } from 'next/server';
import {
  createSessionToken,
  requireOwner,
  setOwnerCookie,
} from '@/lib/owner-auth';

export async function POST(request: NextRequest) {
  const unauthorized = requireOwner(request);
  if (unauthorized) return unauthorized;
  const response = NextResponse.json({ active: true });
  return setOwnerCookie(response, createSessionToken(process.env.OWNER_USERNAME ?? 'owner'));
}
