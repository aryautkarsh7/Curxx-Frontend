import { describe, expect, it } from 'vitest';
import {
  an,
  clipDescription,
  count,
  fitTitle,
  inr,
  istDate,
  istSlot,
  istYear,
  list,
  lower,
  num,
  pickVariant,
  rangeCell,
  rangeText,
  sentences,
  singular,
  stableHash,
} from '../src/lib/content-helpers';

describe('content helpers', () => {
  it('plural and singular agree with the count', () => {
    expect(count(1, 'surgeon')).toBe('1 surgeon');
    expect(count(2, 'surgeon')).toBe('2 surgeons');
    expect(count(1, 'city', 'cities')).toBe('1 city');
    expect(count(1234, 'doctor')).toBe('1,234 doctors');
    expect(singular('General Surgeons')).toBe('General Surgeon');
  });

  it('formats rupees the Indian way', () => {
    expect(inr(1500)).toBe('₹1,500');
    expect(inr(150000)).toBe('₹1,50,000');
    expect(inr(3500000)).toBe('₹35,00,000');
    expect(num(10482)).toBe('10,482');
  });

  it('shows one value when min equals max', () => {
    expect(rangeCell(500, 500)).toBe('₹500');
    expect(rangeText(500, 500)).toBe('₹500');
    expect(rangeCell(300, 1500)).toBe('₹300 – ₹1,500');
    expect(rangeCell(300, 1500, '–')).toBe('₹300–₹1,500');
    expect(rangeText(300, 1500)).toBe('₹300 to ₹1,500');
  });

  it('joins lists as "A, B and C"', () => {
    expect(list([])).toBe('');
    expect(list(['A'])).toBe('A');
    expect(list(['A', 'B'])).toBe('A and B');
    expect(list(['A', 'B', 'C'])).toBe('A, B and C');
  });

  it('picks a stable variant by city and page', () => {
    expect(stableHash('mumbai', 'hernia')).toBe(stableHash('mumbai', 'hernia'));
    expect(pickVariant(3, 'mumbai', 'hernia')).toBe(pickVariant(3, 'mumbai', 'hernia'));
    const picks = new Set(
      ['mumbai', 'pune', 'delhi', 'kolkata', 'chennai', 'jaipur'].map((c) =>
        pickVariant(3, c, 'hernia'),
      ),
    );
    expect(picks.size).toBeGreaterThan(1);
    for (const p of picks) expect(p).toBeGreaterThanOrEqual(0);
    for (const p of picks) expect(p).toBeLessThan(3);
  });

  it('writes dates and slots in IST', () => {
    // 21:00 UTC on 5 Oct is 02:30 on 6 Oct in India.
    const now = new Date('2026-10-05T21:00:00Z');
    expect(istDate(now)).toBe('6 October 2026');
    expect(istYear(now)).toBe('2026');
    expect(istSlot('2026-10-06T04:30:00Z', now)).toBe('Today, 10:00 AM');
    expect(istSlot('2026-10-07T04:30:00Z', now)).toBe('Tomorrow, 10:00 AM');
    expect(istSlot(null, now)).toBeNull();
    expect(istSlot('not a date', now)).toBeNull();
  });

  it('keeps titles and descriptions inside their limits', () => {
    expect(fitTitle('short', 'fallback')).toBe('short');
    expect(fitTitle('x'.repeat(61), 'fallback')).toBe('fallback');
    const long = `${'One sentence here. '.repeat(12)}`;
    expect(clipDescription(long).length).toBeLessThanOrEqual(155);
    expect(clipDescription(long).endsWith('.')).toBe(true);
    expect(clipDescription('y'.repeat(300)).length).toBeLessThanOrEqual(155);
  });

  it('drops empty sentences and writes a/an and lower-case names', () => {
    expect(sentences('One.', '', null, undefined, false, 'Two.')).toBe('One. Two.');
    expect(sentences('', null)).toBe('');
    expect(an('orthopedist')).toBe('an orthopedist');
    expect(an('urologist')).toBe('a urologist');
    expect(an('ENT Specialist')).toBe('an ENT Specialist');
    expect(lower('ENT Specialists')).toBe('ENT specialists');
    expect(lower('General Physicians')).toBe('general physicians');
  });
});
