'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import {
  BIN_COUNT, BIN_PRIZES, BRAND, MS_PER_FRAME, PHYS, ROWS, pegRows,
} from '@/lib/plinko/config';

const DEVICE_KEY = 'ks_plinko_device';
const PEGS = pegRows();

type Won = { code: string; prizeLabel: string; expiresAt: string };
type Phase = 'aiming' | 'dropping' | 'won' | 'cooldown' | 'error';

export default function PlinkoBoard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const dragRef = useRef(false);
  const dropXRef = useRef(BIN_COUNT / 2);      // bin units, continuous

  const [phase, setPhase] = useState<Phase>('aiming');
  const [won, setWon] = useState<Won | null>(null);
  const [message, setMessage] = useState('');

  // ── geometry: pixels derived from the simulation's own units ───────────────
  const geom = useCallback((w: number, h: number) => {
    const padX = w * 0.05;
    const binW = (w - padX * 2) / BIN_COUNT;
    const coinY = h * 0.055;
    const binTop = h * 0.79;
    // the sim's last peg row should land just above the bins
    const yScale = (binTop - coinY) / (PHYS.rowY0 + ROWS * PHYS.rowH);
    return {
      padX, binW, coinY, binTop, yScale,
      uToPx: (u: number) => padX + u * binW,
      yToPx: (y: number) => coinY + y * yScale,
      coinR: PHYS.coinR * binW,
      pegR: Math.max(2, PHYS.pegR * binW),
    };
  }, []);

  const draw = useCallback((ball?: { x: number; y: number }, litBin?: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.width / dpr;
    const h = canvas.height / dpr;
    const g = geom(w, h);

    ctx.clearRect(0, 0, w, h);

    // aim guide
    if (!ball) {
      ctx.strokeStyle = 'rgba(238,143,58,0.28)';
      ctx.setLineDash([3, 5]);
      ctx.beginPath();
      ctx.moveTo(g.uToPx(dropXRef.current), g.coinY + g.coinR);
      ctx.lineTo(g.uToPx(dropXRef.current), g.binTop);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // pegs — the same lattice the physics collides against
    ctx.fillStyle = '#3A3A3A';
    for (const row of PEGS) {
      for (const u of row.xs) {
        ctx.beginPath();
        ctx.arc(g.uToPx(u), g.yToPx(row.y), g.pegR, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // bins
    for (let i = 0; i < BIN_COUNT; i++) {
      const x = g.uToPx(i);
      const lit = litBin === i;
      const jackpot = BIN_PRIZES[i].id === 'icecream';
      ctx.fillStyle = lit ? BRAND.orange : jackpot ? '#241A10' : '#161616';
      ctx.strokeStyle = lit ? BRAND.orange : jackpot ? '#4A3620' : '#2A2A2A';
      ctx.lineWidth = 1;
      roundRect(ctx, x + 2, g.binTop, g.binW - 4, h - g.binTop - 4, 6);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = lit ? '#111' : jackpot ? BRAND.orange : BRAND.dim;
      ctx.font = `600 ${Math.max(8, g.binW * 0.185)}px system-ui, sans-serif`;
      ctx.textAlign = 'center';
      BIN_PRIZES[i].bin.split('\n').forEach((line, k) => {
        ctx.fillText(line, x + g.binW / 2, g.binTop + (h - g.binTop) * 0.4 + k * g.binW * 0.23);
      });
    }

    // coin
    const cx = ball ? g.uToPx(ball.x) : g.uToPx(dropXRef.current);
    const cy = ball ? g.yToPx(ball.y) : g.coinY;
    ctx.beginPath();
    ctx.fillStyle = BRAND.red;
    ctx.arc(cx, cy, g.coinR, 0, Math.PI * 2);
    ctx.fill();
    if (!ball) {
      ctx.strokeStyle = 'rgba(255,255,255,0.35)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, g.coinR + 4, 0, Math.PI * 2);
      ctx.stroke();
    }
  }, [geom]);

  // ── sizing ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = window.devicePixelRatio || 1;
      const w = parent.clientWidth;
      const h = Math.min(Math.round(w * 1.3), 560);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      canvas.getContext('2d')?.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };
    resize();
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [draw]);

  // ── aiming ─────────────────────────────────────────────────────────────────
  const setDropFromPx = (px: number) => {
    const canvas = canvasRef.current!;
    const dpr = window.devicePixelRatio || 1;
    const g = geom(canvas.width / dpr, canvas.height / dpr);
    const u = (px - g.padX) / g.binW;
    // continuous — clamped only so the coin can't start inside a wall
    dropXRef.current = Math.min(BIN_COUNT - PHYS.coinR, Math.max(PHYS.coinR, u));
    draw();
  };

  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (phase !== 'aiming') return;
    const canvas = canvasRef.current!;
    const dpr = window.devicePixelRatio || 1;
    const g = geom(canvas.width / dpr, canvas.height / dpr);
    const r = e.currentTarget.getBoundingClientRect();
    if (e.clientY - r.top > g.coinY + g.coinR * 3) return;   // must grab the coin
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = true;
    setDropFromPx(e.clientX - r.left);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!dragRef.current) return;
    setDropFromPx(e.clientX - e.currentTarget.getBoundingClientRect().left);
  };
  const onPointerUp = () => {
    if (!dragRef.current) return;
    dragRef.current = false;
    void play();
  };

  // ── replay the server's recorded bounce ────────────────────────────────────
  const animate = useCallback((frames: [number, number][], bin: number) =>
    new Promise<void>(resolve => {
      let start: number | null = null;
      const tick = (now: number) => {
        if (start === null) start = now;
        const i = Math.floor((now - start) / MS_PER_FRAME);
        if (i >= frames.length - 1) {
          const [fx, fy] = frames[frames.length - 1];
          draw({ x: fx, y: fy }, bin);
          return resolve();
        }
        const [fx, fy] = frames[i];
        draw({ x: fx, y: fy });
        rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    }), [draw]);

  // ── play ───────────────────────────────────────────────────────────────────
  const play = async () => {
    if (phase !== 'aiming') return;
    setPhase('dropping');
    setMessage('');
    try {
      const res = await fetch('/api/plinko', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'play',
          dropX: dropXRef.current,
          deviceId: localStorage.getItem(DEVICE_KEY) ?? undefined,
        }),
      });
      const data = await res.json();

      if (res.status === 429) {
        setPhase('cooldown');
        const when = new Date(data.nextPlayAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric' });
        setMessage(`You've already played this week. Come back on ${when}.`);
        return;
      }
      if (!res.ok) throw new Error(data.error ?? 'something went wrong');

      try { localStorage.setItem(DEVICE_KEY, data.deviceId); } catch { /* private mode */ }

      await animate(data.frames, data.bin);
      setWon({ code: data.code, prizeLabel: data.prizeLabel, expiresAt: data.expiresAt });
      setPhase('won');
    } catch (e) {
      setPhase('error');
      setMessage(e instanceof Error ? e.message : 'Something went wrong. Try again.');
    }
  };

  return (
    <Wrap>
      <BoardSlot>
        <canvas
          ref={canvasRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          style={{ display: 'block', touchAction: 'none', cursor: phase === 'aiming' ? 'grab' : 'default' }}
        />
      </BoardSlot>

      {phase === 'aiming' && <Hint>Drag the coin, let go to drop</Hint>}
      {phase === 'dropping' && <Hint>…</Hint>}

      {phase === 'won' && won && (
        <Result>
          <Kicker>You won</Kicker>
          <PrizeName>{won.prizeLabel}</PrizeName>
          <Code>{won.code}</Code>
          <Fine>
            Show this on your next visit. Expires{' '}
            {new Date(won.expiresAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric' })}.
          </Fine>
          <Keep href={`/plinko/r/${won.code}`}>Open my reward →</Keep>
          <Fine>Screenshot it or keep the link — you&apos;ll need it to claim.</Fine>
        </Result>
      )}

      {(phase === 'cooldown' || phase === 'error') && (
        <Result>
          <Fine>{message}</Fine>
          {phase === 'error' && <Retry onClick={() => setPhase('aiming')}>Try again</Retry>}
        </Result>
      )}
    </Wrap>
  );
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

const Wrap = styled.div`width:100%;max-width:420px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:1rem;`;
const BoardSlot = styled.div`width:100%;`;
const Hint = styled.p`margin:0;color:${BRAND.dim};font:500 0.9rem/1 system-ui,sans-serif;`;
const Result = styled.div`text-align:center;display:flex;flex-direction:column;align-items:center;gap:0.6rem;`;
const Kicker = styled.p`margin:0;color:${BRAND.dim};font:500 0.8rem/1 system-ui,sans-serif;text-transform:uppercase;letter-spacing:0.12em;`;
const PrizeName = styled.h2`margin:0;color:${BRAND.orange};font:700 1.45rem/1.2 system-ui,sans-serif;`;
const Code = styled.p`margin:0;color:${BRAND.text};font:700 1.5rem/1 ui-monospace,monospace;letter-spacing:0.08em;`;
const Fine = styled.p`margin:0;color:${BRAND.dim};font:400 0.85rem/1.5 system-ui,sans-serif;max-width:30ch;`;
const Keep = styled.a`color:${BRAND.text};text-decoration:underline;text-underline-offset:3px;font:600 0.95rem/1 system-ui,sans-serif;padding:0.4rem 0;`;
const Retry = styled.button`appearance:none;border:0;cursor:pointer;background:${BRAND.red};color:#fff;font:600 0.95rem/1 system-ui,sans-serif;padding:0.8rem 1.8rem;border-radius:999px;`;
