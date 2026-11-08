import { readFile } from 'fs/promises';
import path from 'path';
import { LiveDigits } from '../components/live-digits';
import { normalizeAppConfig } from '../lib/app-config';

export default async function DigitsPage() {
  let appConfig;
  try {
    const raw = await readFile(path.join(process.cwd(), 'public', 'app-config.json'), 'utf8');
    appConfig = normalizeAppConfig(JSON.parse(raw));
  } catch {
    appConfig = undefined;
  }
  return <LiveDigits appConfig={appConfig} />;
}
