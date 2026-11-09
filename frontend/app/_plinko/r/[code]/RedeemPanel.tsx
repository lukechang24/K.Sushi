'use client';

import { useEffect, useState } from 'react';
import { BRAND } from '@/lib/plinko/config';

type Props = { code: string; alreadyRedeemed: boolean; redeemedAt: string };

export default function RedeemPanel({ code, alreadyRedeemed, redeemedAt }: Props) {
  const [done, setDone] = useState(alreadyRedeemed);
  const [when, setWhen] = useState(redeemedAt);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const [clock, setClock] = useState('');

  // A ticking clock is how staff can tell a live page from a screenshot.
  useEffect(() => {
    const tick = () => setClock(new Date().toLocaleTimeString());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const redeem = async () => {
    if (busy || done) return;
    if (!confirm('Staff only — mark this reward as used?')) return;
    setBusy(true);
    setErr('');
    try {
      const res = await fetch('/api/plinko', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'redeem', code }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'could not redeem');
      setDone(true);
      setWhen(data.redeemedAt);
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Could not redeem. Just honour it.');
    } finally {
      setBusy(false);
    }
  };

  if (done) {
    return (
      <div style={{ textAlign: 'center' }}>
        <p style={{ margin: 0, color: BRAND.dim, font: '600 1rem/1.4 system-ui, sans-serif' }}>
          ✓ Redeemed
          {when && ` on ${new Date(when).toLocaleDateString(undefined, { month: 'long', day: 'numeric' })}`}
        </p>
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center', display: 'grid', gap: '0.75rem', justifyItems: 'center' }}>
      <p style={{ margin: 0, color: BRAND.dim, font: '400 0.8rem/1 ui-monospace, monospace' }}>
        {clock}
      </p>
      <button
        onClick={redeem}
        disabled={busy}
        style={{
          appearance: 'none', border: `1px solid ${BRAND.orange}`, cursor: 'pointer',
          background: 'transparent', color: BRAND.orange,
          font: '600 0.95rem/1 system-ui, sans-serif',
          padding: '0.8rem 1.6rem', borderRadius: 999, opacity: busy ? 0.5 : 1,
        }}
      >
        {busy ? 'Marking…' : 'Staff: mark as used'}
      </button>
      {err && <p style={{ margin: 0, color: BRAND.dim, font: '400 0.8rem/1.4 system-ui, sans-serif' }}>{err}</p>}
    </div>
  );
}
