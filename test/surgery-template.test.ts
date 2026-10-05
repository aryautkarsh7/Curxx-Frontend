import { describe, expect, it } from 'vitest';
import {
  TITLE_LIMIT,
  fill,
  pageHash,
  surgeryPageCopy,
  type SurgeryTemplateFacts,
} from '../src/lib/surgery-template';

const surgery = {
  slug: 'hernia-surgery',
  name: 'Hernia Surgery',
  specialty: 'general-surgeon',
  cost: [45000, 120000] as [number, number],
  stay: '1–2 days',
  recovery: '1–2 weeks',
  durationMinutes: [45, 90] as [number, number],
  techniques: ['Laparoscopic repair', 'Open repair'],
};
const mumbai = { slug: 'mumbai', name: 'Mumbai' };
const facts: SurgeryTemplateFacts = {
  state: 'Maharashtra',
  surgeons: {
    count: 12,
    top: [
      {
        slug: 'dr-a',
        name: 'Dr. Kamran Khan',
        experienceYears: 35,
        hospital: 'SSO Cancer Hospital',
        area: 'Ghatkopar West',
      },
      {
        slug: 'dr-b',
        name: 'Dr. Asha Rao',
        experienceYears: 20,
        hospital: 'Testcare Hospital',
        area: 'Andheri West',
      },
      {
        slug: 'dr-c',
        name: 'Dr. Ravi Shah',
        experienceYears: 12,
        hospital: 'City Clinic',
        area: '',
      },
    ],
    minExperience: 5,
    maxExperience: 35,
    avgExperience: 17.5,
  },
  hospitals: {
    count: 5,
    top: [
      {
        slug: 'h1',
        name: 'Testcare Hospital',
        category: 'Multispecialty Hospital',
        area: 'Andheri West',
        beds: 120,
      },
      {
        slug: 'h2',
        name: 'SSO Cancer Hospital',
        category: 'Specialty Hospital',
        area: 'Ghatkopar West',
        beds: null,
      },
      { slug: 'h3', name: 'Lifeline Hospital', category: 'Private Hospital', area: '', beds: null },
    ],
    categories: ['Multispecialty Hospital', 'Specialty Hospital'],
  },
  localities: [
    {
      name: 'Andheri West',
      slug: 'andheri-west',
      surgeons: 3,
      hospitals: 2,
      surgeonNames: ['Dr. Asha Rao'],
      hospitalNames: ['Testcare Hospital'],
      total: 5,
    },
    {
      name: 'Ghatkopar West',
      slug: null,
      surgeons: 1,
      hospitals: 1,
      surgeonNames: ['Dr. Kamran Khan'],
      hospitalNames: ['SSO Cancer Hospital'],
      total: 2,
    },
  ],
  cities: [
    {
      slug: 'mumbai',
      name: 'Mumbai',
      cost: [45000, 120000],
      surgeons: 12,
      hospitals: 5,
      avgExperience: 17.5,
    },
    {
      slug: 'pune',
      name: 'Pune',
      cost: [38500, 102000],
      surgeons: 8,
      hospitals: 3,
      avgExperience: 14,
    },
    {
      slug: 'nagpur',
      name: 'Nagpur',
      cost: [38500, 102000],
      surgeons: 2,
      hospitals: 0,
      avgExperience: null,
    },
  ],
  nearby: [{ slug: 'pune', name: 'Pune' }],
  related: [{ slug: 'appendix-surgery', name: 'Appendix Surgery' }],
};
const now = new Date('2026-10-01T06:00:00Z');
/** Every string anywhere in the copy. */
const strings = (v: unknown): string[] =>
  typeof v === 'string'
    ? [v]
    : Array.isArray(v)
      ? v.flatMap(strings)
      : v && typeof v === 'object'
        ? Object.values(v).flatMap(strings)
        : [];

describe('single surgery template', () => {
  it('fills a placeholder only when its value exists', () => {
    expect(fill('{a} and {b}', { a: 'x', b: 2 })).toBe('x and 2');
    expect(fill('{a} and {b}', { a: 'x' })).toBeNull();
    expect(fill('{a}', { a: '' })).toBeNull();
  });

  it('never shows a raw placeholder, with full or empty data', () => {
    const full = surgeryPageCopy(surgery, mumbai, 'General Surgeons', facts, now);
    const empty = surgeryPageCopy(
      { ...surgery, cost: [0, 0], stay: '', recovery: '', durationMinutes: [0, 0], techniques: [] },
      mumbai,
      'General Surgeons',
      {
        ...facts,
        surgeons: {
          count: 0,
          top: [],
          minExperience: null,
          maxExperience: null,
          avgExperience: null,
        },
        hospitals: { count: 0, top: [], categories: [] },
        localities: [],
        cities: [facts.cities[0]!],
        nearby: [],
        related: [],
      },
      now,
    );
    for (const s of [...strings(full), ...strings(empty)]) expect(s).not.toMatch(/\{[a-z_0-9]+\}/);
    expect(empty.tables.surgeons).toBeNull();
    expect(empty.tables.hospitals).toBeNull();
    expect(empty.cost).toBeNull();
    expect(empty.intro).toBeNull();
    expect(empty.h1).toBe('Hernia Surgery in Mumbai: Surgeons, Hospitals & Cost');
  });

  it('keeps the title within about 60 characters (else variant C)', () => {
    for (const city of ['mumbai', 'pune', 'delhi', 'kolkata', 'chennai', 'jaipur']) {
      const copy = surgeryPageCopy(
        surgery,
        { slug: city, name: city },
        'General Surgeons',
        facts,
        now,
      );
      const isC = copy.title.startsWith('Hernia Surgery Cost in');
      expect(copy.title.length <= TITLE_LIMIT || isC).toBe(true);
    }
    const long = surgeryPageCopy(
      { ...surgery, name: 'Laparoscopic Inguinal Hernia Repair Surgery' },
      mumbai,
      'General Surgeons',
      facts,
      now,
    );
    expect(long.title).toBe(
      'Laparoscopic Inguinal Hernia Repair Surgery Cost in Mumbai (2026) – Hospitals & Surgeons | Curxx',
    );
  });

  it('five FAQs, order rotated by hash % 5, the same on every visit', () => {
    const a = surgeryPageCopy(surgery, mumbai, 'General Surgeons', facts, now);
    expect(a.faqs).toHaveLength(5);
    const first = [
      'Who are the experienced surgeons',
      'What is the cost',
      'Which hospitals',
      'Which area',
      'How long',
    ][pageHash('mumbai', 'hernia-surgery') % 5]!;
    expect(a.faqs[0]!.question.startsWith(first)).toBe(true);
    expect(surgeryPageCopy(surgery, mumbai, 'General Surgeons', facts, now)).toEqual(a);
    expect(a.faqs.find((f) => f.question.startsWith('Which hospitals'))!.answer).toBe(
      'Listed hospitals include Testcare Hospital, SSO Cancer Hospital, Lifeline Hospital and 2 more.',
    );
  });

  it('tables: beds "Not listed" when unknown, this city in bold, every area row links', () => {
    const copy = surgeryPageCopy(surgery, mumbai, 'General Surgeons', facts, now);
    expect(copy.tables.hospitals!.rows[1]!.cells[3]).toEqual({ muted: 'Not listed' });
    expect(copy.tables.cities!.rows.find((r) => r.current)!.cells[0]).toBe('Mumbai');
    expect(copy.tables.cities!.note).toBe(
      'Among listed cities, Nagpur has the lowest estimated cost (₹38,500) and Mumbai the highest (₹1,20,000). Mumbai sits at 3 of 3 on cost.',
    );
    expect(copy.tables.areas!.rows.map((r) => (r.cells[0] as { href: string }).href)).toEqual([
      '/mumbai/general-surgeon/andheri-west',
      '/mumbai/general-surgeon?area=Ghatkopar%20West',
    ]);
    expect(copy.cost!.bullets[1]).toBe('Technique (Laparoscopic repair or Open repair)');
  });

  it('counts agree with their noun (1 surgeon, 2 surgeons) and no area shows a dash', () => {
    const one: SurgeryTemplateFacts = {
      ...facts,
      surgeons: { ...facts.surgeons, count: 1 },
      hospitals: { ...facts.hospitals, count: 1 },
      localities: [
        {
          name: 'Andheri West',
          slug: 'andheri-west',
          surgeons: 1,
          hospitals: 11,
          surgeonNames: ['Dr. Asha Rao'],
          hospitalNames: ['Testcare Hospital'],
          total: 12,
        },
        {
          name: 'Malad West',
          slug: null,
          surgeons: 0,
          hospitals: 1,
          surgeonNames: [],
          hospitalNames: ['Orchid Hospital'],
          total: 1,
        },
      ],
    };
    const copy = surgeryPageCopy(surgery, mumbai, 'General Surgeons', one, now);
    const all = strings(copy).join(' | ');
    expect(copy.tables.areas!.note).toBe(
      'Andheri West has the most listings in Mumbai (1 surgeon, 11 hospitals).',
    );
    expect(all).not.toMatch(/\b1 (surgeons|hospitals|more surgeons)\b/);
    expect(copy.tables.surgeons!.note).toContain('Showing 3 of 1 surgeon in Mumbai.');
    expect(copy.tables.areas!.rows[1]!.cells[1]).toEqual({ muted: 'Hospitals only' });
    for (const t of Object.values(copy.tables))
      for (const row of t?.rows ?? []) expect(row.cells).not.toContain('—');
    const many = surgeryPageCopy(surgery, mumbai, 'General Surgeons', facts, now);
    expect(strings(many).join(' | ')).toMatch(/12 (Surgeons|surgeons)/);
  });
});
