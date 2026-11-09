import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BRAND } from '@/lib/plinko/config';
import { findByCode } from '@/lib/plinko/sheet';
import RedeemPanel from './RedeemPanel';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Your reward | K. Sushi',
  robots: { index: false },
};

export default async function RewardPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const row = await findByCode(code);
  if (!row) notFound();

  const expired = Date.parse(row.expiresAt) < Date.now();

  return (
    <main
      style={{
        minHeight: '100dvh', background: BRAND.bg, color: BRAND.text,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', gap: '1.25rem', padding: '2rem 1.25rem', textAlign: 'center',
      }}
    >
      <p style={{ margin: 0, color: BRAND.dim, font: '500 0.8rem/1 system-ui, sans-serif', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
        K. Sushi · your reward
      </p>

      <h1 style={{ margin: 0, color: expired ? BRAND.dim : BRAND.orange, font: '700 1.75rem/1.2 system-ui, sans-serif', maxWidth: '18ch' }}>
        {row.prizeLabel}
      </h1>

      <p style={{ margin: 0, font: '700 1.5rem/1 ui-monospace, monospace', letterSpacing: '0.08em' }}>
        {row.code}
      </p>

      {expired ? (
        <p style={{ margin: 0, color: BRAND.dim, font: '400 0.9rem/1.5 system-ui, sans-serif' }}>
          This one expired on{' '}
          {new Date(row.expiresAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric' })}.
          Drop another coin on your next visit.
        </p>
      ) : (
        <>
          <p style={{ margin: 0, color: BRAND.dim, font: '400 0.9rem/1.5 system-ui, sans-serif', maxWidth: '32ch' }}>
            Show this screen to us on your next visit. Valid until{' '}
            {new Date(row.expiresAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric' })}.
          </p>
          <RedeemPanel code={row.code} alreadyRedeemed={row.redeemed} redeemedAt={row.redeemedAt} />
        </>
      )}

      <a href="/" style={{ color: BRAND.dim, font: '400 0.85rem/1 system-ui, sans-serif', textDecoration: 'underline', textUnderlineOffset: 3, marginTop: '0.5rem' }}>
        ksushi.menu
      </a>
    </main>
  );
}
