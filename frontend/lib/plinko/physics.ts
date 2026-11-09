import { randomInt } from 'crypto';
import { BIN_COUNT, PHYS, ROWS, SIM_BOTTOM, pegRows } from './config';

export type Frame = [number, number];
export type Drop = { frames: Frame[]; bin: number };

const rnd = () => randomInt(0, 1 << 30) / (1 << 30);   // [0, 1)

/**
 * The real thing: gravity, circle-vs-circle collisions with every peg, walls,
 * restitution, and a small random kick on each hit so two identical drops don't
 * trace the same line.
 *
 * It runs HERE, on the server, and the browser is handed the recorded frames to
 * replay. That's what lets the player release the coin anywhere they like while
 * the outcome still can't be tampered with from devtools.
 */
export function simulateDrop(startX: number): Drop {
  const rows = pegRows();
  const RR = PHYS.coinR + PHYS.pegR;

  let x = Math.min(BIN_COUNT - PHYS.coinR, Math.max(PHYS.coinR, startX));
  let y = 0;
  let vx = 0;
  let vy = 0;

  const frames: Frame[] = [];

  for (let step = 0; step < PHYS.maxSteps; step++) {
    vy += PHYS.g * PHYS.dt;
    x += vx * PHYS.dt;
    y += vy * PHYS.dt;

    if (step % PHYS.frameEvery === 0) {
      frames.push([Math.round(x * 1000) / 1000, Math.round(y * 1000) / 1000]);
    }
    if (y > SIM_BOTTOM) break;

    // walls
    if (x < PHYS.coinR) { x = PHYS.coinR; vx = Math.abs(vx) * PHYS.rest; }
    if (x > BIN_COUNT - PHYS.coinR) { x = BIN_COUNT - PHYS.coinR; vx = -Math.abs(vx) * PHYS.rest; }

    // only the peg rows we could possibly be touching
    const near = Math.round((y - PHYS.rowY0) / PHYS.rowH);
    for (let r = near - 1; r <= near + 1; r++) {
      if (r < 0 || r >= ROWS) continue;
      const row = rows[r];
      if (Math.abs(y - row.y) >= RR) continue;

      for (const px of row.xs) {
        const dx = x - px;
        if (Math.abs(dx) >= RR) continue;
        const dy = y - row.y;
        const d2 = dx * dx + dy * dy;
        if (d2 >= RR * RR || d2 <= 1e-9) continue;

        const d = Math.sqrt(d2);
        const nx = dx / d;
        const ny = dy / d;
        x = px + nx * RR;            // push out of the peg
        y = row.y + ny * RR;

        const vn = vx * nx + vy * ny;
        vx -= (1 + PHYS.rest) * vn * nx;
        vy -= (1 + PHYS.rest) * vn * ny;

        const kick = (rnd() * 2 - 1) * PHYS.jitter;   // tangential
        vx += -ny * kick;
        vy += nx * kick;
        break;
      }
    }
  }

  const bin = Math.min(BIN_COUNT - 1, Math.max(0, Math.floor(x)));
  return { frames, bin };
}
