import { google } from 'googleapis';

// Reuses the same GOOGLE_CREDENTIALS service account as your menu route.
// Add PLINKO_SHEET_ID to .env.local and share the sheet with the service
// account's client_email (Editor access — it needs to write).
const SHEET_ID = process.env.PLINKO_SHEET_ID;
const TAB = 'Plinko';

export type PrizeRow = {
  rowNumber: number;      // 1-based sheet row, used to write the redemption back
  code: string;
  prizeId: string;
  prizeLabel: string;
  bin: number;
  issuedAt: string;       // ISO
  expiresAt: string;      // ISO
  redeemed: boolean;
  redeemedAt: string;
  deviceId: string;
  email: string;
};

export const HEADERS = [
  'code', 'prize_id', 'prize_label', 'bin',
  'issued_at', 'expires_at', 'redeemed', 'redeemed_at',
  'device_id', 'email',
];

async function client() {
  if (!SHEET_ID) throw new Error('PLINKO_SHEET_ID is not set');
  if (!process.env.GOOGLE_CREDENTIALS) throw new Error('GOOGLE_CREDENTIALS is not set');
  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  return google.sheets({ version: 'v4', auth: await auth.getClient() as never });
}

function toRow(values: string[], rowNumber: number): PrizeRow {
  const [code, prizeId, prizeLabel, bin, issuedAt, expiresAt, redeemed, redeemedAt, deviceId, email] = values;
  return {
    rowNumber,
    code: code ?? '',
    prizeId: prizeId ?? '',
    prizeLabel: prizeLabel ?? '',
    bin: Number(bin ?? 0),
    issuedAt: issuedAt ?? '',
    expiresAt: expiresAt ?? '',
    redeemed: (redeemed ?? '').toUpperCase() === 'TRUE',
    redeemedAt: redeemedAt ?? '',
    deviceId: deviceId ?? '',
    email: email ?? '',
  };
}

/** Every prize ever issued. Fine at this volume — a dozen plays a day. */
export async function allRows(): Promise<PrizeRow[]> {
  const sheets = await client();
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: `${TAB}!A2:J`,
  });
  const values = res.data.values ?? [];
  return values.map((v, i) => toRow(v as string[], i + 2));
}

export async function findByCode(code: string): Promise<PrizeRow | null> {
  const rows = await allRows();
  return rows.find(r => r.code.toUpperCase() === code.toUpperCase()) ?? null;
}

export async function appendRow(row: Omit<PrizeRow, 'rowNumber'>): Promise<void> {
  const sheets = await client();
  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: `${TAB}!A:J`,
    valueInputOption: 'RAW',
    requestBody: {
      values: [[
        row.code, row.prizeId, row.prizeLabel, String(row.bin),
        row.issuedAt, row.expiresAt, row.redeemed ? 'TRUE' : 'FALSE', row.redeemedAt,
        row.deviceId, row.email,
      ]],
    },
  });
}

export async function markRedeemed(rowNumber: number): Promise<void> {
  const sheets = await client();
  await sheets.spreadsheets.values.update({
    spreadsheetId: SHEET_ID,
    range: `${TAB}!G${rowNumber}:H${rowNumber}`,
    valueInputOption: 'RAW',
    requestBody: { values: [['TRUE', new Date().toISOString()]] },
  });
}
