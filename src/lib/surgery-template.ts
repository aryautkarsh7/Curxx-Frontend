/**
 * The single surgery page template (docs/content-templates/single-surgery-dynamic-template.docx), filled from
 * the API's facts (GET /surgeries/:slug → template) and the surgery catalogue.
 * - Variants are picked by a hash of city + surgery, so a page reads the same on every visit while cities
 *   read differently from each other.
 * - Every sentence is filled whole or left out: a missing figure drops its sentence (or its table, FAQ or
 *   bullet), and a raw {placeholder} can never reach the page.
 */
import { localityHref } from './locality';
import { count, nounFor, singular } from './plural';

export type SurgeryTemplateFacts = {
  state: string;
  surgeons: {
    count: number;
    top: { slug: string; name: string; experienceYears: number; hospital: string; area: string }[];
    minExperience: number | null;
    maxExperience: number | null;
    avgExperience: number | null;
  };
  hospitals: {
    count: number;
    top: { slug: string; name: string; category: string; area: string; beds: number | null }[];
    categories: string[];
  };
  localities: {
    name: string;
    slug: string | null;
    surgeons: number;
    hospitals: number;
    surgeonNames: string[];
    hospitalNames: string[];
    total: number;
  }[];
  cities: {
    slug: string;
    name: string;
    cost: [number, number] | null;
    surgeons: number;
    hospitals: number;
    avgExperience: number | null;
  }[];
  nearby: { slug: string; name: string }[];
  related: { slug: string; name: string }[];
};

type Surgery = {
  slug: string;
  name: string;
  specialty: string;
  cost: [number, number];
  stay: string;
  recovery: string;
  durationMinutes: [number, number];
  techniques: string[];
};

type Link = { text: string; href: string };
/** Muted text: a cell with nothing to list (never an empty dash). */
type Muted = { muted: string };
export type Cell = string | Link | Muted;
const NOT_LISTED: Muted = { muted: 'Not listed' };
export type CopyTable = {
  id: string;
  heading: string;
  columns: string[];
  rows: { cells: Cell[]; current?: boolean }[];
  note: string | null;
};

/** FNV-1a: a small, stable hash of city + surgery. */
export function pageHash(city: string, surgery: string) {
  let h = 0x811c9dc5;
  for (const ch of `${city}:${surgery}`) {
    h ^= ch.charCodeAt(0);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h;
}

type Vars = Record<string, string | number | null | undefined>;
/** The template with every {name} filled, or null when any value is missing (never a raw placeholder). */
export function fill(template: string, vars: Vars): string | null {
  let missing = false;
  const out = template.replace(/\{([a-z0-9_]+)\}/g, (_, key: string) => {
    const v = vars[key];
    if (v === null || v === undefined || v === '' || (typeof v === 'number' && !Number.isFinite(v)))
      missing = true;
    return String(v ?? '');
  });
  return missing ? null : out;
}
/** The filled sentences that have all their values, joined; null when none does. */
const sentences = (vars: Vars, ...templates: string[]) => {
  const out = templates.map((t) => fill(t, vars)).filter(Boolean);
  return out.length ? out.join(' ') : null;
};

const inr = (n: number) => `₹${n.toLocaleString('en-IN')}`;
const num = (n: number) => n.toLocaleString('en-IN');

export const TITLE_LIMIT = 60;

export function surgeryPageCopy(
  surgery: Surgery,
  city: { slug: string; name: string },
  specialtyPlural: string,
  facts: SurgeryTemplateFacts,
  now = new Date(),
) {
  const hash = pageHash(city.slug, surgery.slug);
  const costKnown = surgery.cost[1] > 0;
  const s = facts.surgeons;
  const h = facts.hospitals;
  const top = s.top[0];
  const loc = facts.localities[0];
  const vars: Vars = {
    surgery_name: surgery.name,
    surgery_name_lc: surgery.name.toLowerCase(),
    city: city.name,
    state: facts.state,
    year: now.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', year: 'numeric' }),
    specialty_plural: specialtyPlural,
    surgeon_count: s.count > 0 ? num(s.count) : null,
    surgeon_count_minus1: s.count > 1 ? num(s.count - 1) : null,
    hospital_count: h.count > 0 ? num(h.count) : null,
    // Counts with their noun, so "1 surgeon" / "2 surgeons" always agree.
    surgeons_label: s.count > 0 ? count(s.count, 'surgeon') : null,
    surgeons_label_title: s.count > 0 ? count(s.count, 'Surgeon') : null,
    surgeons_more_label: s.count > 1 ? count(s.count - 1, 'more surgeon') : null,
    hospitals_label: h.count > 0 ? count(h.count, 'hospital') : null,
    surgeon_noun: nounFor(s.count, 'surgeon'),
    specialist_label:
      s.count > 0
        ? `${num(s.count)} ${s.count === 1 ? singular(specialtyPlural) : specialtyPlural}`
        : null,
    min_cost: costKnown ? inr(surgery.cost[0]) : null,
    max_cost: costKnown ? inr(surgery.cost[1]) : null,
    stay: surgery.stay,
    recovery: surgery.recovery,
    proc_time:
      surgery.durationMinutes[1] > 0
        ? `${surgery.durationMinutes[0]}–${surgery.durationMinutes[1]} minutes`
        : null,
    top_surgeon: top?.name,
    top_surgeon_exp: top && top.experienceYears > 0 ? top.experienceYears : null,
    top_surgeon_hospital: top?.hospital,
    top_surgeon_locality: top?.area,
    avg_exp: s.avgExperience,
    // The area with the most listings (surgeons + hospitals), as in the area-wise table.
    top_locality: loc?.name,
    top_locality_surgeons_label: loc ? count(loc.surgeons, 'surgeon') : null,
    top_locality_hospitals_label: loc ? count(loc.hospitals, 'hospital') : null,
    hospital_1: h.top[0]?.name,
    hospital_2: h.top[1]?.name,
    hospital_3: h.top[2]?.name,
    surgeon_1: s.top[0]?.name,
    surgeon_2: s.top[1]?.name,
    surgeon_3: s.top[2]?.name,
    locality_1: facts.localities[0]?.name,
    locality_2: facts.localities[1]?.name,
    locality_3: facts.localities[2]?.name,
  };

  // ---- Meta title: A / B / C by hash; over ~60 characters falls back to C (the template's rule).
  const titles = [
    '{surgery_name} in {city} – {surgeons_label_title}, Cost {min_cost}–{max_cost} | Curxx',
    'Best {surgery_name} Surgeons in {city}: {top_surgeon} & More | Curxx',
    '{surgery_name} Cost in {city} ({year}) – Hospitals & Surgeons | Curxx',
  ];
  const c = fill(titles[2]!, vars)!;
  const picked = fill(titles[hash % 3]!, vars);
  const title = picked && picked.length <= TITLE_LIMIT ? picked : c;

  // ---- Meta description: by hash, else the next variant that has every value.
  const descriptions = [
    'Compare {surgeons_label} and {hospitals_label} for {surgery_name_lc} in {city}, {state}. Estimated cost {min_cost}–{max_cost}. Book a free consultation.',
    '{top_surgeon} ({top_surgeon_exp} yrs, {top_surgeon_hospital}) and {surgeons_more_label} for {surgery_name_lc} in {city}. Stay: {stay}. Recovery: {recovery}.',
    'Planning {surgery_name_lc} in {city}? See area-wise surgeons in {top_locality}, hospital list, cost range {min_cost}–{max_cost} and a free callback.',
  ];
  const d0 = (hash >>> 3) % 3;
  const description =
    [0, 1, 2].map((i) => fill(descriptions[(d0 + i) % 3]!, vars)).find(Boolean) ?? null;

  // ---- H1 + intro (3 variants by hash).
  const h1 = fill('{surgery_name} in {city}: Surgeons, Hospitals & Cost', vars)!;
  const intros = [
    () =>
      sentences(
        vars,
        '{surgery_name} in {city} is offered by {specialist_label} and {hospitals_label} listed on Curxx.',
        'The most experienced surgeon is {top_surgeon} ({top_surgeon_exp} years, {top_surgeon_hospital}, {top_surgeon_locality}).',
        'Estimated cost in {city} is {min_cost} to {max_cost}, with a hospital stay of {stay} and recovery of {recovery}.',
      ),
    () =>
      sentences(
        vars,
        'Looking for {surgery_name_lc} in {city}, {state}? Surgeons here have an average experience of {avg_exp} years, and most listings are in {top_locality} ({top_locality_surgeons_label}).',
        'Hospitals such as {hospital_1}, {hospital_2} and {hospital_3} offer this procedure.',
        'Typical cost: {min_cost}–{max_cost}.',
      ),
    () =>
      sentences(
        vars,
        'In {city}, {surgery_name_lc} costs about {min_cost}–{max_cost} depending on hospital, room type and technique.',
        'Surgeons like {surgeon_1}, {surgeon_2} and {surgeon_3} take consultations across {locality_1}, {locality_2} and {locality_3}.',
        'Procedure time is {proc_time}.',
      ),
  ];
  const i0 = (hash >>> 6) % 3;
  const intro = [0, 1, 2].map((i) => intros[(i0 + i) % 3]!()).find(Boolean) ?? null;

  // ---- Table 1: surgeons (top 10 by experience).
  const surgeonTable: CopyTable | null = s.top.length
    ? {
        id: 'top-surgeons',
        heading: fill('Top {surgery_name} Surgeons in {city}', vars)!,
        columns: ['Surgeon', 'Experience', 'Hospital', 'Area'],
        rows: s.top.map((d) => ({
          cells: [
            { text: d.name, href: `/doctor/${d.slug}` },
            d.experienceYears > 0 ? `${d.experienceYears} yrs` : NOT_LISTED,
            d.hospital || NOT_LISTED,
            d.area || NOT_LISTED,
          ],
        })),
        note: sentences(
          {
            ...vars,
            shown_count: s.top.length,
            min_exp: s.minExperience,
            max_exp: s.maxExperience,
          },
          'Showing {shown_count} of {surgeon_count} {surgeon_noun} in {city}.',
          'Experience ranges from {min_exp} to {max_exp} years.',
        ),
      }
    : null;

  // ---- Table 2: area-wise.
  const areaTable: CopyTable | null = facts.localities.length
    ? {
        id: 'area-wise',
        heading: fill('{surgery_name} in {city}: Area-wise Surgeons & Hospitals', vars)!,
        columns: ['Area', 'Surgeons', 'Hospitals', 'Total listings'],
        rows: facts.localities.map((l) => ({
          cells: [
            { text: l.name, href: localityHref(city.slug, surgery.specialty, l) },
            l.surgeonNames.length ? l.surgeonNames.join(', ') : { muted: 'Hospitals only' },
            l.hospitalNames.length ? l.hospitalNames.join(', ') : { muted: 'Surgeons only' },
            num(l.total),
          ],
        })),
        note: loc
          ? fill(
              '{top_area} has the most listings in {city} ({top_area_surgeons}, {top_area_hospitals}).',
              {
                ...vars,
                top_area: loc.name,
                top_area_surgeons: count(loc.surgeons, 'surgeon'),
                top_area_hospitals: count(loc.hospitals, 'hospital'),
              },
            )
          : null,
      }
    : null;

  // ---- Table 3: hospitals (beds "—" when unknown).
  const hospitalTable: CopyTable | null = h.top.length
    ? {
        id: 'hospitals',
        heading: fill('Hospitals for {surgery_name} in {city}', vars)!,
        columns: ['Hospital', 'Type', 'Area', 'Beds'],
        rows: h.top.map((x) => ({
          cells: [
            { text: x.name, href: `/clinic/${x.slug}` },
            x.category || NOT_LISTED,
            x.area || NOT_LISTED,
            x.beds ? num(x.beds) : NOT_LISTED,
          ],
        })),
        note: null,
      }
    : null;

  // ---- Table 4: India-wise city comparison (this city's row in bold).
  const priced = facts.cities.filter((x) => x.cost);
  const byLow = [...priced].sort((a, b) => a.cost![0] - b.cost![0] || a.name.localeCompare(b.name));
  const byHigh = [...priced].sort(
    (a, b) => b.cost![1] - a.cost![1] || a.name.localeCompare(b.name),
  );
  const here = priced.find((x) => x.slug === city.slug);
  const cityTable: CopyTable | null =
    facts.cities.length > 1
      ? {
          id: 'india-wise',
          heading: fill('{surgery_name} Cost in Indian Cities', vars)!,
          columns: [
            'City',
            'Estimated cost',
            'Surgeons listed',
            'Hospitals listed',
            'Avg. experience',
          ],
          rows: facts.cities.map((x) => ({
            current: x.slug === city.slug,
            cells: [
              x.slug === city.slug
                ? x.name
                : { text: x.name, href: `/${x.slug}/surgery/${surgery.slug}` },
              x.cost ? `${inr(x.cost[0])}–${inr(x.cost[1])}` : NOT_LISTED,
              num(x.surgeons),
              num(x.hospitals),
              x.avgExperience ? `${x.avgExperience} yrs` : NOT_LISTED,
            ],
          })),
          note:
            priced.length > 1 && here
              ? fill(
                  'Among listed cities, {cheapest_city} has the lowest estimated cost ({cheapest_min}) and {costliest_city} the highest ({costliest_max}). {city} sits at {city_rank} of {total_cities} on cost.',
                  {
                    ...vars,
                    cheapest_city: byLow[0]!.name,
                    cheapest_min: inr(byLow[0]!.cost![0]),
                    costliest_city: byHigh[0]!.name,
                    costliest_max: inr(byHigh[0]!.cost![1]),
                    city_rank: 1 + priced.filter((x) => x.cost![0] < here.cost![0]).length,
                    total_cities: priced.length,
                  },
                )
              : null,
        }
      : null;

  // ---- Cost section.
  const types = h.categories.slice(0, 2);
  const techniques = surgery.techniques.slice(0, 2);
  const cost = costKnown
    ? {
        heading: fill('{surgery_name} Cost in {city}', vars)!,
        intro: fill(
          'The estimated cost of {surgery_name_lc} in {city} is {min_cost} to {max_cost}. The final bill depends on:',
          vars,
        )!,
        bullets: [
          types.length ? `Hospital category (${types.join(', ')})` : null,
          techniques.length ? `Technique (${techniques.join(' or ')})` : null,
          surgery.stay
            ? `Room type and length of stay (${surgery.stay})`
            : 'Room type and length of stay',
          'Insurance and policy waiting periods',
        ].filter((b): b is string => Boolean(b)),
        closing: 'A Curxx care coordinator shares an itemised estimate before you decide.',
      }
    : null;

  // ---- FAQs: five, order rotated by hash % 5; one without its figures is left out.
  const t = s.top;
  const faqVars: Vars = {
    ...vars,
    surgeon_1_exp: t[0] && t[0].experienceYears > 0 ? t[0].experienceYears : null,
    surgeon_1_hospital: t[0]?.hospital,
    surgeon_2_exp: t[1] && t[1].experienceYears > 0 ? t[1].experienceYears : null,
    surgeon_2_hospital: t[1]?.hospital,
    surgeon_3_exp: t[2] && t[2].experienceYears > 0 ? t[2].experienceYears : null,
    surgeon_3_hospital: t[2]?.hospital,
  };
  const faq = (q: string, a: string | null) => {
    const question = fill(q, faqVars);
    return question && a ? { question, answer: a } : null;
  };
  const moreHospitals = h.count > 3 ? ` and ${num(h.count - 3)} more` : '';
  const faqs = [
    faq(
      'Who are the experienced surgeons for {surgery_name_lc} in {city}?',
      fill(
        'Curxx lists {surgeons_label} in {city}. The most experienced are {surgeon_1} ({surgeon_1_exp} yrs, {surgeon_1_hospital}), {surgeon_2} ({surgeon_2_exp} yrs, {surgeon_2_hospital}) and {surgeon_3} ({surgeon_3_exp} yrs, {surgeon_3_hospital}).',
        faqVars,
      ),
    ),
    faq(
      'What is the cost of {surgery_name_lc} in {city}?',
      fill(
        'Estimated {min_cost}–{max_cost} in {city}. Final cost depends on hospital, room type and technique.',
        faqVars,
      ),
    ),
    faq(
      'Which hospitals in {city} perform {surgery_name_lc}?',
      fill(
        `Listed hospitals include {hospital_1}, {hospital_2}, {hospital_3}${moreHospitals}.`,
        faqVars,
      ),
    ),
    faq(
      'Which area of {city} has the most surgeons?',
      fill(
        '{top_locality} has the most listings, with {top_locality_surgeons_label} and {top_locality_hospitals_label}.',
        faqVars,
      ),
    ),
    faq(
      'How long are the hospital stay and recovery?',
      sentences(
        faqVars,
        'Hospital stay is {stay}, recovery is {recovery}.',
        'The procedure takes about {proc_time}.',
      ),
    ),
  ];
  const r = hash % 5;
  const rotated = [...faqs.slice(r), ...faqs.slice(0, r)].filter(
    (f): f is { question: string; answer: string } => Boolean(f),
  );

  // ---- Internal links.
  const links = {
    nearbyHeading: fill('{surgery_name} in nearby cities', vars)!,
    nearby: facts.nearby.slice(0, 5).map((n) => ({
      text: `${surgery.name} in ${n.name}`,
      href: `/${n.slug}/surgery/${surgery.slug}`,
    })),
    relatedHeading: fill('Related procedures in {city}', vars)!,
    related: facts.related.slice(0, 6).map((x) => ({
      text: x.name,
      href: `/${city.slug}/surgery/${x.slug}`,
    })),
  };

  return {
    title,
    description,
    h1,
    intro,
    tables: {
      surgeons: surgeonTable,
      areas: areaTable,
      hospitals: hospitalTable,
      cities: cityTable,
    },
    cost,
    faqs: rotated,
    links,
  };
}

export type SurgeryPageCopy = ReturnType<typeof surgeryPageCopy>;
