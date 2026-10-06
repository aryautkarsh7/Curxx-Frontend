import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { HELPLINE, HELPLINE_HREF } from '../src/lib/helpline';

const files = (dir: string): string[] =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? files(p) : /\.(tsx?|json)$/.test(f) ? [p] : [];
  });

describe('helpline', () => {
  it('shows +91 85850 84840 and dials the same number', () => {
    expect(HELPLINE.display).toBe('+91 85850 84840');
    expect(HELPLINE_HREF).toBe('tel:+918585084840');
    expect(HELPLINE.display.replace(/\D/g, '')).toBe(HELPLINE.tel.replace(/\D/g, ''));
    expect(HELPLINE.tel).toBe('+918585084840');
  });

  it('is the only customer-care number in the source (108 is the ambulance)', () => {
    const numbers = new Map<string, string[]>();
    for (const file of files(join(__dirname, '../src'))) {
      const text = readFileSync(file, 'utf8');
      for (const m of text.matchAll(
        /(?:\+?91[\s-]?)?\b[6-9]\d{4}[\s-]?\d{5}\b|\b1800[\s-]?\d[\d\s-]{5,}/g,
      )) {
        const digits = m[0].replace(/\D/g, '').slice(-10);
        numbers.set(digits, [...(numbers.get(digits) ?? []), file]);
      }
    }
    // Only the helpline, and the placeholder shown in phone fields.
    const allowed = new Set(['8585084840', '9876543210']);
    const stray = [...numbers].filter(([n]) => !allowed.has(n));
    expect(stray).toEqual([]);
  });
});
