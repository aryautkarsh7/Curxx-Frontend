import { describe, expect, it } from 'vitest';
import type { DoctorStats, SurgeryStats } from '../src/lib/api';
import {
  cityDoctorsPage,
  citySpecialtyPage,
  indiaDoctorsPage,
  surgeriesPage,
  type SeoPage,
} from '../src/lib/seo-content';

const fee = (min: number, max: number) => ({ min, max, approx: false });
const doctors = (over: Partial<DoctorStats> = {}): DoctorStats => ({
  scope: {
    city: { slug: 'mumbai', name: 'Mumbai' },
    specialty: null,
  },
  total: 12,
  bookableCount: 0,
  clinicCount: 12,
  videoCount: 0,
  clinicOnlyCount: 12,
  freeVideoCount: 0,
  todayCount: 0,
  clinicTodayCount: 0,
  videoTodayCount: 0,
  clinicFee: fee(300, 1200),
  videoFee: null,
  earliest: null,
  avgExperience: 20,
  reviewCount: 0,
  avgRating: null,
  specialtyCount: 2,
  cityCount: 1,
  clinicCityCount: 1,
  smallCityCount: 0,
  specialties: [
    {
      slug: 'general-physician',
      name: 'General Physician',
      plural: 'General Physicians',
      count: 8,
      cityCount: 1,
      clinicFee: fee(300, 600),
      videoFee: null,
      earliest: null,
    },
    {
      slug: 'dentist',
      name: 'Dentist',
      plural: 'Dentists',
      count: 4,
      cityCount: 1,
      clinicFee: fee(500, 500),
      videoFee: null,
      earliest: null,
    },
  ],
  cities: [
    {
      slug: 'mumbai',
      name: 'Mumbai',
      count: 12,
      clinicFee: fee(300, 1200),
      videoFee: null,
      earliest: null,
    },
  ],
  areas: [{ name: 'Andheri West', slug: 'andheri-west', count: 12, clinicFee: fee(300, 1200) }],
  languages: [{ name: 'Hindi', count: 12 }],
  feeBands: [],
  topDoctors: [
    {
      slug: 'dr-a',
      name: 'Dr. A',
      city: 'mumbai',
      cityName: 'Mumbai',
      area: 'Andheri West',
      experienceYears: 20,
      rating: null,
      reviewCount: 0,
      fee: 500,
      videoFee: null,
      feeApprox: false,
      next: null,
    },
  ],
  ...over,
});

/** Every string anywhere in a page. */
const strings = (v: unknown): string[] =>
  typeof v === 'string'
    ? [v]
    : Array.isArray(v)
      ? v.flatMap(strings)
      : v && typeof v === 'object'
        ? Object.values(v).flatMap(strings)
        : [];
const text = (p: SeoPage) => strings(p).join(' | ');

/** What a patient must never read: placeholders, zero counts, empty values, claims we cannot back. */
const FORBIDDEN =
  /undefined|NaN|\{[a-z_0-9]+\}|\b0 doctors?\b|\b0 surgeons?\b|₹0\b|—|7-day|Triage|State Medical Council|Updated today|free consult|coordinator|instant SMS|partner hospital/i;

describe('missing data is left out, never printed', () => {
  it('a city with 0 video doctors has no video sentence, column or FAQ claim', () => {
    const page = cityDoctorsPage(doctors())!;
    expect(text(page)).not.toMatch(FORBIDDEN);
    expect(text(page)).not.toMatch(/video consultations cost|Video Fee|Video ₹|free first video/i);
    for (const t of page.tables) expect(t.columns.join()).not.toMatch(/Video|Earliest/);
    expect(page.stats.some((c) => /^Video/.test(c))).toBe(false);
    expect(page.readMore.some((s) => /Clinic visit or video/.test(s.heading))).toBe(false);
  });

  it('a single area reads "All N are in X" and a one-row table', () => {
    const page = citySpecialtyPage(
      doctors({
        scope: {
          city: { slug: 'mumbai', name: 'Mumbai' },
          specialty: {
            slug: 'general-physician',
            name: 'General Physician',
            plural: 'General Physicians',
            conditions: [],
            whenToSee: [],
          },
        },
      }),
    )!;
    expect(text(page)).toContain('All 12 are in Andheri West.');
    expect(text(page)).not.toMatch(FORBIDDEN);
  });

  it('prints one value when the minimum fee equals the maximum', () => {
    const page = cityDoctorsPage(doctors({ clinicFee: fee(500, 500) }))!;
    expect(text(page)).toContain('₹500');
    expect(text(page)).not.toMatch(/₹500 (–|to) ₹500/);
  });

  it('"verified" appears only when every listed doctor is verified', () => {
    expect(text(cityDoctorsPage(doctors())!)).not.toMatch(/verified/i);
    expect(text(cityDoctorsPage(doctors({ verifiedOnly: true }))!)).toMatch(/Verified Doctors/);
    expect(cityDoctorsPage(doctors({ verifiedOnly: true }))!.title.length).toBeLessThanOrEqual(60);
  });

  it('an empty city produces no page, and the India page drops cities under 3 doctors', () => {
    expect(cityDoctorsPage(doctors({ total: 0 }))).toBeNull();
    const india = indiaDoctorsPage(
      doctors({
        scope: { city: null, specialty: null },
        cityCount: 2,
        cities: [
          {
            slug: 'mumbai',
            name: 'Mumbai',
            count: 12,
            clinicFee: fee(300, 1200),
            videoFee: null,
            earliest: null,
          },
          {
            slug: 'kochi',
            name: 'Kochi',
            count: 2,
            clinicFee: fee(400, 400),
            videoFee: null,
            earliest: null,
          },
        ],
      }),
    )!;
    const byCity = india.tables.find((t) => t.id === 'by-city')!;
    expect(byCity.rows).toHaveLength(1);
    expect(text(india)).not.toMatch(FORBIDDEN);
  });
});

const surgeries = (over: Partial<SurgeryStats> = {}): SurgeryStats => ({
  city: { slug: 'mumbai', name: 'Mumbai' },
  hospitalCount: 1,
  surgeonCount: 0,
  procedureCount: 100,
  categoryCount: 10,
  minCost: 5000,
  maxCost: 500000,
  cheapest: 'Skin Tag Removal',
  priciest: 'Lung Transplant',
  costBands: [{ label: 'under ₹50,000', count: 30 }],
  shortStayCount: 20,
  daycareCount: 0,
  daycare: [],
  hospitals: [
    {
      slug: 'h1',
      name: 'City Hospital',
      area: '',
      city: 'mumbai',
      surgeons: 0,
      departments: [],
      nabh: false,
      beds: null,
    },
  ],
  areas: [],
  surgeonTable: [],
  cities: [],
  cityCount: 0,
  directory: [],
  indexable: false,
  ...over,
});

describe('surgery listing with thin data', () => {
  it('one hospital and no surgeons: singular wording, no surgeon table, no empty columns', () => {
    const page = surgeriesPage(surgeries())!;
    expect(text(page)).toContain('1 hospital');
    expect(text(page)).not.toMatch(/1 hospitals/);
    expect(text(page)).not.toMatch(FORBIDDEN);
    expect(text(page)).not.toMatch(/surgeons? and/i);
    expect(page.tables.some((t) => t.id === 'surgeons')).toBe(false);
    const hospitals = page.tables.find((t) => t.id === 'hospitals')!;
    expect(hospitals.columns).toEqual(['Hospital', 'Link']);
    expect(page.index).toBe(false);
    expect(page.title.length).toBeLessThanOrEqual(60);
    expect(page.description.length).toBeLessThanOrEqual(155);
  });
});
