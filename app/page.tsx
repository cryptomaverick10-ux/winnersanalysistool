import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { readFile } from 'fs/promises';
import path from 'path';
import { LiveDigits } from '../components/live-digits';
import { normalizeAppConfig } from '../lib/app-config';
import { OWNER_COOKIE, verifySessionToken } from '@/lib/owner-auth';

export default async function DigitsPage() {
  const cookieStore = await cookies();
  if (!verifySessionToken(cookieStore.get(OWNER_COOKIE)?.value)) redirect('/login');

  let appConfig;
  try {
    const raw = await readFile(path.join(process.cwd(), 'public', 'app-config.json'), 'utf8');
    appConfig = normalizeAppConfig(JSON.parse(raw));
  } catch {
    appConfig = undefined;
  }
  return <LiveDigits appConfig={appConfig} />;
}
