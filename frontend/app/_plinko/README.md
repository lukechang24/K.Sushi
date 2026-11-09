# K. Sushi Plinko — drop-in for the existing Next.js app

Nine files. Copy them into the Next app, add one env var, make one Google Sheet.

```
lib/plinko/config.ts              prizes, odds, expiry, cooldown  ← the only file you'll edit often
lib/plinko/odds.ts                server-side bin picker
lib/plinko/code.ts                reward codes + device ids
lib/plinko/sheet.ts               Google Sheets read/write
app/api/plinko/route.ts           POST { action: 'play' | 'redeem' }
app/plinko/page.tsx               the game page
app/plinko/PlinkoBoard.tsx        canvas board + animation
app/plinko/r/[code]/page.tsx      the reward page people keep
app/plinko/r/[code]/RedeemPanel.tsx   live clock + "mark as used"
```

## Setup

**1. Dependency**

```bash
npm i googleapis
```

**2. Path alias** — these files import `@/lib/plinko/...`. If your `tsconfig.json`
doesn't already have it:

```json
{ "compilerOptions": { "paths": { "@/*": ["./*"] } } }
```

**3. The sheet**

New Google Sheet, one tab named exactly `Plinko`, row 1 headers in A1:J1:

```
code | prize_id | prize_label | bin | issued_at | expires_at | redeemed | redeemed_at | device_id | email
```

Share it with your service account's `client_email` as **Editor** (it writes, not
just reads — this is different from the menu sheet).

**4. Env**

```
PLINKO_SHEET_ID=<the id from the sheet's URL>
```

Add it to `.env.local` and to Vercel. `GOOGLE_CREDENTIALS` is already there.

**5. Run**

```bash
npm run dev
# http://localhost:3000/plinko
```

To test more than once a week, delete your row from the sheet, or lower
`COOLDOWN_DAYS` in config.ts while you're developing.

## How it hangs together

- The player drags the coin and lets go. The browser sends `dropX` — where they
  released it, in bin units.
- `POST /api/plinko { action: 'play', dropX }` → checks the cooldown, **simulates
  the whole bounce server-side** from that release point (walls reflect), writes
  a row, returns `{ path, bin, code, prizeLabel, expiresAt }`.
- The browser draws the path it was given. Aiming genuinely changes the odds;
  the browser never decides where the coin lands.
- `POST /api/plinko { action: 'redeem', code }` → flips `redeemed` to TRUE.
  Rejects if already used, not found, or expired.

Rate limiting is an httpOnly cookie plus a localStorage id, checked together.
Neither is tamper-proof. Over a free miso soup, that's the right amount of effort.

## Changing prizes

Only `lib/plinko/config.ts`. `BIN_PRIZES` is indexed left-to-right. Because the
walls bounce the coin inward, the EDGES are the easiest bins to hit on purpose
(~55%) and the CENTRE is the hardest (~31%) — so the jackpot belongs at index 3
with the cheapest prizes flanking it. The comment in that file has the numbers.

## Deliberately not built

- **Email capture.** The sheet has an `email` column and the API ignores it.
  Add the field to the win screen when you're ready to wire Brevo.
- **An admin page.** The sheet is the admin page.
- **The QR code.** Generate one pointing at `https://ksushi.menu/plinko`, same
  as the review card.
