// ─── Game + prize configuration ──────────────────────────────────────────────

export const ROWS = 6;
export const BIN_COUNT = 7;

export const EXPIRY_DAYS = 30;
export const COOLDOWN_DAYS = 7;

// ─── Physics ─────────────────────────────────────────────────────────────────
// All distances are in "bin units": the board is BIN_COUNT wide. The whole
// simulation runs on the SERVER; the browser replays the recorded frames.
// Tuned so a drop takes about 2.2s: releasing at an edge lands there ~50% of
// the time, releasing at the centre hits the jackpot bin ~26%.
export const PHYS = {
  coinR: 0.17,
  pegR: 0.07,
  rowY0: 1.2,      // y of the first peg row
  rowH: 0.95,      // vertical gap between peg rows
  pegDx: 0.5,      // horizontal gap between pegs; odd rows offset by half this
  g: 70,           // gravity
  rest: 0.45,      // restitution — how bouncy a peg is
  jitter: 1.0,     // random tangential kick on each hit; 0 makes it deterministic
  dt: 1 / 120,     // simulation step
  frameEvery: 2,   // record every Nth step → 60 fps playback
  maxSteps: 3000,  // safety valve
};

/**
 * Playback speed, ms per recorded frame. Frames are 1/60s apart in the
 * simulation, so 16.7 is real time. Raise it to watch the same drop in slow
 * motion without changing the physics or the odds.
 */
export const MS_PER_FRAME = 35;

/** Bottom of the simulation — where the bins start. */
export const SIM_BOTTOM = PHYS.rowY0 + ROWS * PHYS.rowH + 0.5;

/** Peg lattice, shared by the simulation and the drawing code. */
export function pegRows(): { y: number; xs: number[] }[] {
  const rows: { y: number; xs: number[] }[] = [];
  for (let r = 0; r < ROWS; r++) {
    const offset = r % 2 === 0 ? 0 : PHYS.pegDx / 2;
    const xs: number[] = [];
    for (let u = offset; u <= BIN_COUNT; u += PHYS.pegDx) xs.push(u);
    rows.push({ y: PHYS.rowY0 + r * PHYS.rowH, xs });
  }
  return rows;
}

// ─── Prizes ──────────────────────────────────────────────────────────────────
// Edges are the easiest bins to hit on purpose (~50%), the centre the hardest
// (~26%). So the jackpot goes in the middle, with the cheapest prizes flanking
// it — that makes aiming a real gamble instead of a free win.

export type Prize = { id: string; label: string; bin: string };

export const BIN_PRIZES: Prize[] = [
  { id: 'mushroom', label: 'Free Mushroom Bomb',             bin: 'Mushroom\nBomb' },
  { id: 'nigiri',   label: 'Free sushi order, $4.99 or less', bin: 'Sushi\n$4.99' },
  { id: 'miso',     label: 'Free Miso Soup',                  bin: 'Miso\nSoup' },
  { id: 'icecream', label: 'Free Tempura Ice Cream',          bin: 'Tempura\nIce Cream' },
  { id: 'miso',     label: 'Free Miso Soup',                  bin: 'Miso\nSoup' },
  { id: 'nigiri',   label: 'Free sushi order, $4.99 or less', bin: 'Sushi\n$4.99' },
  { id: 'mushroom', label: 'Free Mushroom Bomb',             bin: 'Mushroom\nBomb' },
];

// Food cost: ice cream $1.50 · mushroom $1.00 · sushi $0.60 · miso $0.25
// Worst-case expected cost per play is about $0.80, before redemption rate.

export const BRAND = {
  red:    '#C8120A',
  orange: '#EE8F3A',
  bg:     '#0B0B0B',
  text:   '#F5F5F5',
  dim:    '#9A9A9A',
};
