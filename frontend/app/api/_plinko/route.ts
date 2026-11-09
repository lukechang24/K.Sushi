import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { BIN_COUNT, BIN_PRIZES, COOLDOWN_DAYS, EXPIRY_DAYS } from '@/lib/plinko/config';
import { newCode, newDeviceId } from '@/lib/plinko/code';
import { simulateDrop } from '@/lib/plinko/physics';
import { allRows, appendRow, findByCode, markRedeemed } from '@/lib/plinko/sheet';

export const dynamic = 'force-dynamic';

const COOKIE = 'ks_plinko_device';
const DAY = 86_400_000;

export async function POST(req: NextRequest) {
  let body: { action?: string; code?: string; deviceId?: string; dropX?: number };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'bad request' }, { status: 400 });
  }

  if (body.action === 'play') return play(body.deviceId, body.dropX);
  if (body.action === 'redeem') return redeem(body.code);
  return NextResponse.json({ error: 'unknown action' }, { status: 400 });
}

async function play(clientDeviceId?: string, dropX?: number) {
  const jar = await cookies();

  // Cookie first, then the id the browser kept in localStorage, then a new one.
  // Neither is tamper-proof; both together stop casual replay, which is the
  // only kind worth stopping over a free miso soup.
  let deviceId = jar.get(COOKIE)?.value || clientDeviceId || '';
  let setCookie = false;
  if (!deviceId) { deviceId = newDeviceId(); setCookie = true; }

  const rows = await allRows();
  const cutoff = Date.now() - COOLDOWN_DAYS * DAY;
  const recent = rows.find(
    r => r.deviceId === deviceId && Date.parse(r.issuedAt) > cutoff,
  );

  if (recent) {
    const nextAt = new Date(Date.parse(recent.issuedAt) + COOLDOWN_DAYS * DAY);
    return NextResponse.json(
      { error: 'cooldown', nextPlayAt: nextAt.toISOString(), lastCode: recent.code },
      { status: 429 },
    );
  }

  // Where the player let go of the coin, in bin units (0 … BIN_COUNT).
  // Clamped server-side — the browser can ask for anything.
  const release = Number.isFinite(dropX)
    ? Math.min(BIN_COUNT, Math.max(0, dropX as number))
    : BIN_COUNT / 2;

  const { frames, bin } = simulateDrop(release);
  const prize = BIN_PRIZES[bin];
  const now = new Date();
  const expires = new Date(now.getTime() + EXPIRY_DAYS * DAY);
  const code = newCode();

  await appendRow({
    code,
    prizeId: prize.id,
    prizeLabel: prize.label,
    bin,
    issuedAt: now.toISOString(),
    expiresAt: expires.toISOString(),
    redeemed: false,
    redeemedAt: '',
    deviceId,
    email: '',
  });

  const res = NextResponse.json({
    frames,                   // the browser replays exactly this bounce
    bin,
    code,
    prizeLabel: prize.label,
    expiresAt: expires.toISOString(),
    deviceId,
  });

  if (setCookie) {
    res.cookies.set(COOKIE, deviceId, {
      httpOnly: true, sameSite: 'lax', secure: true, maxAge: 60 * 60 * 24 * 365, path: '/',
    });
  }
  return res;
}

async function redeem(code?: string) {
  if (!code) return NextResponse.json({ error: 'no code' }, { status: 400 });

  const row = await findByCode(code);
  if (!row) return NextResponse.json({ error: 'not found' }, { status: 404 });
  if (row.redeemed) return NextResponse.json({ error: 'already redeemed', redeemedAt: row.redeemedAt }, { status: 409 });
  if (Date.parse(row.expiresAt) < Date.now()) return NextResponse.json({ error: 'expired' }, { status: 410 });

  await markRedeemed(row.rowNumber);
  return NextResponse.json({ ok: true, redeemedAt: new Date().toISOString() });
}
