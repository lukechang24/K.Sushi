import { randomInt } from 'crypto';

// No 0/O/1/I/L — these get read aloud and typed by tired people.
const ALPHABET = '23456789ABCDEFGHJKMNPQRSTUVWXYZ';

export function newCode(): string {
  let s = '';
  for (let i = 0; i < 6; i++) s += ALPHABET[randomInt(ALPHABET.length)];
  return `KS-${s}`;
}

export function newDeviceId(): string {
  let s = '';
  for (let i = 0; i < 24; i++) s += ALPHABET[randomInt(ALPHABET.length)];
  return s;
}
