import { describe, expect, it } from 'vitest';
import type { HospitalStats } from '../src/lib/api';
import { hospitalsPage } from '../src/lib/hospitals-content';

const stats = (over: Partial<HospitalStats> = {}): HospitalStats => ({
  city: { slug: 'mumbai', name: 'Mumbai', tier: 1 },
  total: 731,
  types: [
    { name: 'Private Hospital', count: 363, share: 49.7 },
    { name: 'Multispecialty Hospital', count: 108, share: 14.8 },
    { name: 'Eye Hospital', count: 64, share: 8.8 },
    { name: 'Government Hospital', count: 19, share: 2.6 },
  ],
  areas: [
    { name: 'Andheri West', count: 42, share: 5.7 },
    { name: 'Chembur', count: 41, share: 5.6 },
    { name: 'Malad West', count: 40, share: 5.5 },
    { name: 'Borivali West', count: 32, share: 4.4 },
    { name: 'Dadar', count: 29, share: 4 },
  ],
  areaCount: 5,
  specialities: Array.from({ length: 12 }, (_, i) => ({
    name: `Speciality ${i + 1}`,
    count: 100 - i,
  })),
  specialityCount: 12,
  governmentCount: 19,
  privateCount: 363,
  eyeCount: 64,
  maternityCount: 0,
  teachingCount: 3,
  refreshedAt: '2026-10-06T03:48:50Z',
  ...over,
});
const strings = (v: unknown): string[] =>
  typeof v === 'string'
    ? [v]
    : Array.isArray(v)
      ? v.flatMap(strings)
      : v && typeof v === 'object'
        ? Object.values(v).flatMap(strings)
        : [];

describe('city hospitals copy', () => {
  it('fills the spec sample for a big city', () => {
    const page = hospitalsPage(stats())!;
    expect(page.upper).toContain('Curxx lists 731 hospitals in Mumbai.');
    expect(page.upper).toContain('Private hospitals make up the biggest share at 49.7%.');
    expect(page.upper).toContain('19 are government-run.');
    expect(page.upper).toContain('Andheri West, Chembur and Malad West have the most hospitals.');
    expect(page.tables.map((t) => t.id)).toEqual([
      'hospital-types',
      'hospital-areas',
      'hospital-specialities',
    ]);
    expect(page.title.length).toBeLessThanOrEqual(60);
    expect(page.description.length).toBeLessThanOrEqual(155);
    expect(page.sections!.map((s) => s.heading)).toContain('Government hospitals in Mumbai');
    expect(page.faqs.length).toBe(5);
  });

  it('leaves out every section whose data is missing', () => {
    const page = hospitalsPage(
      stats({
        total: 1,
        types: [{ name: 'Private Hospital', count: 1, share: 100 }],
        areas: [],
        areaCount: 0,
        specialities: [],
        specialityCount: 0,
        governmentCount: 0,
        privateCount: 1,
        eyeCount: 0,
        teachingCount: 0,
        refreshedAt: null,
      }),
    )!;
    const all = strings(page).join(' | ');
    expect(page.tables).toHaveLength(0);
    expect(page.upper).toBe('Curxx lists 1 hospital in Mumbai.');
    expect(all).not.toMatch(
      /undefined|NaN|\{|—|\b0 hospitals?\b|government|Listings last refreshed/i,
    );
    expect(page.faqs.map((f) => f.question)).toEqual([
      'How many hospitals are there in Mumbai?',
      'How are hospitals ordered on this page?',
    ]);
    // Only the "how to choose" text remains below the tables.
    expect(page.sections!.map((s) => s.heading)).toEqual(['How to choose a hospital in Mumbai']);
  });

  it('a city with no hospitals has no page; a tier-2 city gets the referral wording', () => {
    expect(hospitalsPage(stats({ total: 0 }))).toBeNull();
    const t2 = hospitalsPage(stats({ city: { slug: 'indore', name: 'Indore', tier: 2 } }))!;
    expect(strings(t2.sections).join(' ')).toContain('Indore often serves nearby districts');
  });

  it('no unbacked claims', () => {
    const all = strings(hospitalsPage(stats())).join(' | ');
    expect(all).not.toMatch(/partner|cashless|7-day|verified|24x7|free consult|coordinator/i);
  });
});
