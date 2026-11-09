import type { Metadata } from 'next';
import PlinkoBoard from './PlinkoBoard';

export const metadata: Metadata = {
  title: 'Drop a Coin | K. Sushi',
  description: 'Play once a week and win something for your next visit at K. Sushi, Cerritos.',
  robots: { index: false },   // a game for people in the restaurant, not a landing page
};

export default function PlinkoPage() {
  return (
    <main
      style={{
        minHeight: '100dvh',
        background: '#0B0B0B',
        color: '#F5F5F5',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.5rem',
        padding: '2rem 1rem 3rem',
      }}
    >
      <header style={{ textAlign: 'center' }}>
        <h1 style={{ margin: 0, font: '700 1.6rem/1.2 system-ui, sans-serif' }}>
          Drop a coin
        </h1>
        <p style={{ margin: '0.5rem 0 0', color: '#9A9A9A', font: '400 0.95rem/1.5 system-ui, sans-serif' }}>
          Aim for the middle. One drop per week.
        </p>
      </header>

      <PlinkoBoard />
    </main>
  );
}
