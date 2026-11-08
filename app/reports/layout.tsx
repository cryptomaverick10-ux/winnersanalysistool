import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { OWNER_COOKIE, verifySessionToken } from '@/lib/owner-auth';

export default async function ReportsLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  if (!verifySessionToken(cookieStore.get(OWNER_COOKIE)?.value)) redirect('/login');
  return children;
}
