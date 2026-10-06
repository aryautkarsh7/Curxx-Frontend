/**
 * Copy for /{city}/hospitals (content-spec/07-city-hospitals-page.md), built from live figures
 * (GET /seo/hospitals). All of the page's words are here.
 * Missing-data rule: a sentence, table, callout or FAQ whose figure is missing or below its threshold is
 * left out, so nothing prints an empty value, a zero count or a half sentence.
 * Held back (nothing in our data backs them): the 24x7 emergency block, "nearby metro" text for small
 * cities (cities only have a metro / tier-2 tier), "report an error", rankings by completeness.
 */
import type { HospitalStats } from './api';
import {
  clipDescription,
  count,
  fitTitle,
  istDate,
  list,
  lower,
  num,
  sentences,
} from './content-helpers';
import type { SeoPage, SeoSection, SeoTable } from './seo-content';

/** A hospital type as a plural noun: "Private Hospital" → "Private hospitals". */
const typePlural = (name: string) => {
  const plural = lower(name).replace(/(?<!s)$/, 's');
  return plural.charAt(0).toUpperCase() + plural.slice(1);
};
const pct = (n: number) => `${n.toLocaleString('en-IN', { maximumFractionDigits: 1 })}%`;
export function hospitalsPage(s: HospitalStats): SeoPage | null {
  if (!s.total) return null;
  const c = s.city.name;
  const places = s.areas;
  const hasAreas = s.areaCount >= 5;
  const hasSpecs = s.specialityCount >= 10;
  const hasTypes = s.types.length >= 3;
  const biggest = s.types[0];

  const title = fitTitle(
    `${num(s.total)} Hospitals in ${c}: Types, Areas & Specialities | Curxx`,
    `Hospitals in ${c}: Types & Areas | Curxx`,
  );
  const by = list(
    [hasTypes ? 'type' : '', hasAreas ? 'area' : '', hasSpecs ? 'speciality' : ''].filter(Boolean),
  );
  const description = clipDescription(
    sentences(
      `Browse ${count(s.total, 'hospital')} in ${c}${by ? ` by ${by}` : ''}.`,
      'Get directions and contact details for each hospital.',
    ),
  );

  const upper = sentences(
    `Curxx lists ${count(s.total, 'hospital')} in ${c}.`,
    hasTypes && biggest
      ? `${typePlural(biggest.name)} make up the biggest share at ${pct(biggest.share)}.`
      : '',
    s.governmentCount >= 3 ? `${num(s.governmentCount)} are government-run.` : '',
    hasAreas ? `${list(places.slice(0, 3).map((a) => a.name))} have the most hospitals.` : '',
    hasSpecs
      ? `The most widely available specialities are ${list(s.specialities.slice(0, 3).map((x) => x.name))}.`
      : '',
    hasTypes || hasAreas || hasSpecs
      ? `Use the tables and filters below to compare options by ${list([hasTypes ? 'type' : '', hasAreas ? 'location' : '', hasSpecs ? 'speciality' : ''].filter(Boolean))}.`
      : '',
  );

  const tables: SeoTable[] = [];
  if (hasTypes)
    tables.push({
      id: 'hospital-types',
      heading: `Hospitals in ${c} by Type`,
      lead: `Here is how the ${num(s.total)} hospitals in ${c} break down by type.`,
      columns: ['Hospital type', 'Listings', 'Share'],
      rows: s.types.map((t) => [t.name, num(t.count), pct(t.share)]),
    });
  if (hasAreas)
    tables.push({
      id: 'hospital-areas',
      heading: `Hospitals in ${c} by Area`,
      lead: sentences(
        `These areas of ${c} have the most hospitals listed.`,
        `${places[0]!.name} leads with ${num(places[0]!.count)} (${pct(places[0]!.share)} of the city’s listings).`,
      ),
      columns: ['Area', 'Hospitals'],
      rows: places.slice(0, 8).map((a) => [a.name, num(a.count)]),
    });
  if (hasSpecs)
    tables.push({
      id: 'hospital-specialities',
      heading: `Specialities Available at Hospitals in ${c}`,
      lead: `These specialities are available at the most hospitals in ${c}.`,
      columns: ['Speciality', 'Hospitals offering it'],
      rows: s.specialities.slice(0, 8).map((x) => [x.name, num(x.count)]),
    });

  const sections: SeoSection[] = [];
  if (s.governmentCount >= 3)
    sections.push({
      heading: `Government hospitals in ${c}`,
      paragraphs: [
        `${c} has ${count(s.governmentCount, 'government hospital')}. They generally have lower treatment costs and may accept public health schemes, though waiting times can be longer. Check scheme eligibility with the hospital before admission.`,
      ],
    });
  if (s.eyeCount >= 10)
    sections.push({
      heading: `Eye hospitals in ${c}`,
      paragraphs: [
        `${count(s.eyeCount, 'eye hospital')} ${s.eyeCount === 1 ? 'is' : 'are'} listed in ${c}, covering services such as cataract surgery, LASIK and retina care.`,
      ],
    });
  if (s.maternityCount >= 10)
    sections.push({
      heading: `Maternity homes in ${c}`,
      paragraphs: [
        `${count(s.maternityCount, 'maternity home')} ${s.maternityCount === 1 ? 'is' : 'are'} listed in ${c}. If you may need newborn intensive care (NICU), confirm it before booking.`,
      ],
    });
  if (s.teachingCount >= 1)
    sections.push({
      heading: `Teaching hospitals in ${c}`,
      paragraphs: [
        `${c} has ${count(s.teachingCount, 'teaching hospital')} attached to medical colleges, which often run a wide range of speciality departments.`,
      ],
    });
  sections.push({
    heading: `How to choose a hospital in ${c}`,
    paragraphs: [
      s.city.tier === 1
        ? 'In a large city, traffic affects how fast you reach care. For emergencies, pick a hospital close to home or work, and confirm the exact department you need, not just a general listing.'
        : `${c} often serves nearby districts as a referral centre. For super-speciality care, confirm that the department and specialist are available before you visit.`,
    ],
  });

  // The largest type other than the biggest one, when it is big enough to be worth a question.
  const strongest = s.types.slice(1).find((t) => t.count >= 10);
  const faqs = [
    {
      question: `How many hospitals are there in ${c}?`,
      answer: `Curxx lists ${count(s.total, 'hospital')} in ${c}.`,
    },
    {
      question: 'How are hospitals ordered on this page?',
      answer:
        'You choose the order with the Sort menu. The order is not a ranking of medical quality.',
    },
    hasAreas
      ? {
          question: `Which area in ${c} has the most hospitals?`,
          answer: `${places[0]!.name} has the most, with ${num(places[0]!.count)} listings.`,
        }
      : null,
    s.governmentCount >= 3
      ? {
          question: `How many government and private hospitals are in ${c}?`,
          answer: `${num(s.governmentCount)} government${s.privateCount > 0 ? ` and ${num(s.privateCount)} private` : ''}.`,
        }
      : null,
    strongest
      ? {
          question: `Where can I find ${lower(typePlural(strongest.name))} in ${c}?`,
          answer: `${c} has ${num(strongest.count)} listed. Use the type filter to see them.`,
        }
      : null,
  ].filter(Boolean) as { question: string; answer: string }[];

  return {
    title,
    description,
    h1: `Hospitals in ${c}`,
    subline: '',
    h2: '',
    stats: [],
    upper,
    readMore: [],
    tables,
    sections,
    faqs,
    faqHeading: `Hospitals in ${c}: Frequently Asked Questions`,
    footnote: sentences(
      'Hospital details come from the directory data Curxx has received and may be out of date. This page does not rank hospitals by medical quality.',
      s.refreshedAt ? `Listings last refreshed ${istDate(new Date(s.refreshedAt))}.` : '',
    ),
    canonical: `/${s.city.slug}/hospitals`,
  };
}
