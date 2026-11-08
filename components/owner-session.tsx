'use client';

import { useEffect } from 'react';

export function OwnerSession() {
  useEffect(() => {
    let timer: number | undefined;
    let inactivityTimer: number | undefined;
    const heartbeat = () => {
      fetch('/api/auth/activity', { method: 'POST', credentials: 'same-origin' })
        .catch(() => undefined);
    };
    const resetInactivity = () => {
      if (inactivityTimer) window.clearTimeout(inactivityTimer);
      inactivityTimer = window.setTimeout(() => {
        sessionStorage.clear();
        localStorage.removeItem('deriv-matches-analysis-history-v1');
        fetch('/api/auth/logout', { method: 'POST', credentials: 'same-origin' })
          .finally(() => {
            window.location.replace('/login');
          });
      }, 60 * 60 * 1000);
      heartbeat();
    };
    const events: Array<keyof WindowEventMap> = ['pointerdown', 'keydown', 'mousemove', 'touchstart'];
    events.forEach((event) => window.addEventListener(event, resetInactivity, { passive: true }));
    timer = window.setInterval(heartbeat, 5 * 60 * 1000);
    resetInactivity();
    return () => {
      if (timer) window.clearInterval(timer);
      if (inactivityTimer) window.clearTimeout(inactivityTimer);
      events.forEach((event) => window.removeEventListener(event, resetInactivity));
    };
  }, []);
  return null;
}
