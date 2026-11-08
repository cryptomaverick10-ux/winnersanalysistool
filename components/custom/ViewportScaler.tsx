'use client';

export default function ViewportScaler({ children }: { children: React.ReactNode }) {
  return <div className="min-h-dvh w-full">{children}</div>;
}
