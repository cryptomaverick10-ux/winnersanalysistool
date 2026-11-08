'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, LockKeyhole } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        const body = await response.json().catch(() => null) as { error?: string } | null;
        setError(body?.error ?? 'Login failed');
        return;
      }
      router.replace('/');
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-dvh items-center justify-center bg-[#07111f] px-4">
      <form onSubmit={submit} className="w-full max-w-md rounded-3xl border border-cyan-400/20 bg-slate-950/80 p-6 shadow-[0_30px_80px_rgba(0,0,0,.45)] sm:p-8">
        <div className="mb-7 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
            <LockKeyhole className="h-7 w-7" />
          </div>
          <h1 className="text-2xl font-black tracking-[0.08em] text-white">PRIVATE OWNER ACCESS</h1>
          <p className="mt-2 text-sm text-slate-400">Deriv Matches AI Engine</p>
        </div>
        <label className="mb-2 block text-xs font-bold text-slate-400">USERNAME</label>
        <Input
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          autoComplete="username"
          required
          className="mb-4 h-12 border-white/10 bg-slate-900 text-white"
        />
        <label className="mb-2 block text-xs font-bold text-slate-400">PASSWORD</label>
        <div className="relative">
          <Input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type={visible ? 'text' : 'password'}
            autoComplete="current-password"
            required
            className="h-12 border-white/10 bg-slate-900 pr-12 text-white"
          />
          <button type="button" onClick={() => setVisible((value) => !value)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" aria-label={visible ? 'Hide password' : 'Show password'}>
            {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {error && <p role="alert" className="mt-4 rounded-lg border border-red-400/20 bg-red-400/10 px-3 py-2 text-sm text-red-300">{error}</p>}
        <Button type="submit" disabled={loading} className="mt-5 h-12 w-full bg-gradient-to-r from-cyan-500 to-blue-600 font-black">
          {loading ? 'VERIFYING...' : 'SECURE LOGIN'}
        </Button>
      </form>
    </main>
  );
}
