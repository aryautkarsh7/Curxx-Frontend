/**
 * Diksha's dynamic SEO templates (docs/content-templates), filled from live figures (GET /seo/…).
 * Each builder returns words only; heading levels live in components/seo/SeoContent.tsx.
 *
 * Rules applied everywhere (see docs/content-templates/CHANGES-FOR-DIKSHA.md for every wording change):
 * - A sentence, row, column or section whose data is missing or zero is left out; nothing prints
 *   "undefined", "NaN", an empty value or a meaningless 0.
 * - No "verified" claims (imported profiles aren't checked by Curxx), no invented praise, no "instant SMS".
 * - A fee range set by an unconfirmed fee reads "approx."; surgery costs read as estimates.
 * - "Book" only where someone can actually be booked online; otherwise "find".
 */
import { localityHref } from './locality';
import type { DoctorStats, Faq, FeeRange, SurgeryStats } from './api';

// ---------------------------------------------------------------- Formatting

export const inr = (n: number) => `₹${Math.round(n).toLocaleString('en-IN')}`;
export const num = (n: number) => n.toLocaleString('en-IN');
/** ["a"] → "a"; ["a","b","c"] → "a, b and c". */
export const list = (items: string[]) =>
  items.length <= 1 ? items.join('') : `${items.slice(0, -1).join(', ')} and ${items.at(-1)}`;
const approx = (r: FeeRange) => (r.approx ? 'approx. ' : '');
/** "₹300 – ₹1,500" (tables and chips). */
export const feeCell = (r: FeeRange | null | undefined, empty = '–') =>
  !r ? empty : `${approx(r)}${r.min === r.max ? inr(r.min) : `${inr(r.min)} – ${inr(r.max)}`}`;
/** "₹300 to ₹1,500" (sentences). */
const feeSpan = (r: FeeRange) =>
  `${approx(r)}${r.min === r.max ? inr(r.min) : `${inr(r.min)} to ${inr(r.max)}`}`;
const feeFrom = (r: FeeRange) => `${approx(r)}${inr(r.min)}`;
/** "General Physicians" → "general physicians"; acronyms keep their capitals ("ENT specialists"). */
export const lower = (s: string) =>
  s
    .split(' ')
    .map((w) => (/^[A-Z]{2,}/.test(w) ? w : w.toLowerCase()))
    .join(' ');
/** "a dermatologist", "an ENT Specialist", "an orthopedist", "a urologist". */
export const an = (phrase: string) =>
  `${/^(uni|uro|use|usu|eu|one)/i.test(phrase) ? 'a' : /^[aeiou]/i.test(phrase) || /^[AEFHILMNORSX][A-Z]/.test(phrase) ? 'an' : 'a'} ${phrase}`;
/** "1 of them offers" / "3 of them offer". */
const verbFor = (n: number, one: string, many: string) => (n === 1 ? one : many);

/** Rows sharing the top count, and the rest: "A and B have the most (2 each)" instead of a false "A has the most". */
function leaders<T extends { name: string; count: number }>(rows: T[]) {
  const tied = rows.filter((r) => r.count === rows[0]?.count);
  return { tied, rest: rows.slice(tied.length) };
}
/** "Jadavpur has the most (4)" or "Jadavpur and Salt Lake have the most (2 each)". */
function mostSentence(rows: { name: string; count: number }[], what = '') {
  const { tied } = leaders(rows);
  return tied.length > 1
    ? `${list(tied.map((r) => r.name))} have the most${what} (${num(tied[0]!.count)} each)`
    : `${rows[0]!.name} has the most${what} (${num(rows[0]!.count)})`;
}
/** FAQ answer: "Jadavpur, with 4." or "Jadavpur and Salt Lake, with 2 each." */
function mostAnswer(rows: { name: string; count: number }[], noun = '') {
  const { tied } = leaders(rows);
  return tied.length > 1
    ? `${list(tied.map((r) => r.name))}, with ${num(tied[0]!.count)}${noun} each.`
    : `${rows[0]!.name}, with ${num(rows[0]!.count)}${noun}.`;
}

/** A slot time in IST: "Today, 10:30 AM", "Tomorrow, 9:00 AM" or "Wed, 2 Oct, 9:00 AM". */
export function slotText(iso: string | null | undefined, now = new Date()) {
  if (!iso) return null;
  const d = new Date(iso);
  const day = (x: Date) => x.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' });
  const time = d
    .toLocaleTimeString('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
    .toUpperCase();
  if (day(d) === day(now)) return `Today, ${time}`;
  if (day(d) === day(new Date(now.getTime() + 86_400_000))) return `Tomorrow, ${time}`;
  return `${d.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', weekday: 'short', day: 'numeric', month: 'short' })}, ${time}`;
}

/** Titles over 60 characters use the template's shorter fallback. */
const fit = (title: string, fallback: string) => (title.length <= 60 ? title : fallback);
/** Descriptions over 155 characters drop whole trailing sentences. */
function clip(text: string, max = 155) {
  let out = text.trim();
  while (out.length > max && out.includes('. ')) out = out.slice(0, out.lastIndexOf('. ') + 1);
  return out;
}
const sentences = (...parts: (string | false | null | undefined)[]) =>
  parts.filter(Boolean).join(' ');

// ---------------------------------------------------------------- Page structure

export type Cell = string | { text: string; href: string };
export type SeoTable = {
  id: string;
  heading: string;
  columns: string[];
  rows: Cell[][];
  note?: { text: string; href: string };
};
export type SeoSection = {
  heading: string;
  paragraphs?: string[];
  list?: string[];
  links?: { text: string; href: string }[];
};
export type SeoPage = {
  title: string;
  description: string;
  h1: string;
  subline: string;
  h2: string;
  stats: string[];
  upper: string;
  readMore: SeoSection[];
  tables: SeoTable[];
  faqs: Faq[];
  faqHeading: string;
  canonical: string;
  /** False = keep the page out of the index (template index rules). */
  index?: boolean;
};

const EMERGENCY =
  'Chest pain, trouble breathing, heavy bleeding or a severe allergic reaction need emergency care. Call 108 immediately.';
const BEST_FOR_CLINIC = 'a physical examination, procedures or tests';
const BEST_FOR_VIDEO = 'a first opinion, a report review or a follow-up';
const FOLLOW_UP = 'Free 7-day chat';
const PROFILE_DETAILS =
  'Each profile shows the qualifications, experience, clinic location, consultation fee and timings shared with Curxx. Fees marked “approx.” are estimates, so confirm them with the clinic before you visit.';

const top = <T>(items: T[], n: number) => items.slice(0, n);
const areaWord = (count: number) => `${num(count)} ${count === 1 ? 'doctor' : 'doctors'}`;

/** "Clinic ₹300 – ₹1,500" and "Video ₹200 – ₹800" chips, when there are such doctors. */
function feeChips(s: DoctorStats) {
  return [
    s.clinicCount > 0 && s.clinicFee ? `Clinic ${feeCell(s.clinicFee)}` : '',
    s.videoCount > 0 && s.videoFee ? `Video ${feeCell(s.videoFee)}` : '',
  ].filter(Boolean);
}

function clinicVsVideoTable(
  s: DoctorStats,
  opts: { id: string; heading: string; bestFor: boolean; cities?: boolean },
): SeoTable | null {
  if (!s.clinicCount && !s.videoCount) return null;
  const video = s.videoCount > 0;
  const row = (label: string, clinic: string, vid: string): Cell[] =>
    video ? [label, clinic, vid] : [label, clinic];
  const rows: Cell[][] = [
    row('Fee', feeCell(s.clinicFee), feeCell(s.videoFee)),
    row(
      'Doctors offering',
      `${num(s.clinicCount)} of ${num(s.total)}`,
      `${num(s.videoCount)} of ${num(s.total)}`,
    ),
    row('Available today', num(s.clinicTodayCount), num(s.videoTodayCount)),
  ];
  if (opts.cities) rows.push(row('Cities', num(s.clinicCityCount), 'All India'));
  if (s.freeVideoCount > 0 && video)
    rows.push(row('Free first consult', '–', `${num(s.freeVideoCount)} doctors`));
  if (opts.bestFor)
    rows.push(
      row('Best for', BEST_FOR_CLINIC.replace(/^a /, ''), BEST_FOR_VIDEO.replace(/^a /, '')),
    );
  rows.push(row('Follow-up', FOLLOW_UP, FOLLOW_UP));
  return {
    id: opts.id,
    heading: opts.heading,
    columns: video ? ['', 'In-Clinic Visit', 'Video Consultation'] : ['', 'In-Clinic Visit'],
    rows,
  };
}

function costFaq(subject: string, place: string, s: DoctorStats, tail = ''): Faq | null {
  const parts = [
    s.clinicCount > 0 && s.clinicFee ? `Clinic consultations cost ${feeSpan(s.clinicFee)}.` : '',
    s.videoCount > 0 && s.videoFee ? `Video consultations cost ${feeSpan(s.videoFee)}.` : '',
  ].filter(Boolean);
  return parts.length
    ? { question: `How much does ${subject} cost in ${place}?`, answer: sentences(...parts, tail) }
    : null;
}

function todayFaq(question: string, s: DoctorStats): Faq | null {
  if (s.todayCount > 0)
    return {
      question,
      answer: `Yes, ${num(s.todayCount)} of ${num(s.total)} ${verbFor(s.todayCount, 'has', 'have')} open slots today.`,
    };
  const earliest = slotText(s.earliest);
  return earliest
    ? { question, answer: `No slots are open today. The earliest slot is ${earliest}.` }
    : null;
}

function onlineFaq(question: string, s: DoctorStats, nounPluralLc: string, place: string): Faq {
  if (s.videoCount > 0 && s.videoCount === s.total && s.videoFee)
    return {
      question,
      answer: `Yes, all ${num(s.total)} offer video consultations at ${feeSpan(s.videoFee)}.`,
    };
  if (s.videoCount > 0 && s.videoFee)
    return {
      question,
      answer: `Yes, ${num(s.videoCount)} of ${num(s.total)} offer video consultations at ${feeSpan(s.videoFee)}. The others are clinic-only.`,
    };
  return {
    question,
    answer: `Video consultations are not available for ${nounPluralLc} in ${place} right now. You can book a clinic visit.`,
  };
}

const howToBook = (s: DoctorStats): Faq => ({
  question: 'How do I book?',
  answer:
    s.bookableCount > 0
      ? `Pick a doctor, choose a date and time, and confirm with your mobile number (you sign in with a one-time code). The booking shows in My Appointments straight away.${s.bookableCount < s.total ? ' Some doctors can only be booked by calling their clinic; their profile shows a Call button.' : ''}`
      : 'Open a doctor’s profile and call the clinic to book. Online booking for these doctors is coming soon.',
});

function topRatedText(s: DoctorStats, withCity: boolean) {
  const rated = s.topDoctors.filter((d) => d.rating !== null && d.reviewCount >= 5).slice(0, 3);
  return rated.length
    ? list(
        rated.map(
          (d) =>
            `${d.name} (${withCity ? `${d.cityName}, ` : ''}${d.experienceYears} yrs, ${d.rating!.toFixed(1)}★)`,
        ),
      )
    : null;
}

function compareTable(
  s: DoctorStats,
  id: string,
  heading: string,
  withCity: boolean,
): SeoTable | null {
  if (!s.topDoctors.length) return null;
  const columns = [
    'Doctor',
    ...(withCity ? ['City'] : []),
    'Experience',
    'Rating',
    ...(withCity ? [] : ['Locality']),
    'Clinic Fee',
    'Video Fee',
    'Next Slot (IST)',
  ];
  const rows = s.topDoctors.map((d): Cell[] => [
    { text: d.name, href: `/doctor/${d.slug}` },
    ...(withCity ? [d.cityName] : []),
    d.experienceYears > 0 ? `${d.experienceYears} yrs` : '–',
    d.rating !== null ? `${d.rating.toFixed(1)}★ (${num(d.reviewCount)})` : 'New',
    ...(withCity ? [] : [d.area || '–']),
    d.fee !== null ? `${d.feeApprox ? 'approx. ' : ''}${inr(d.fee)}` : '–',
    d.videoFee !== null ? inr(d.videoFee) : 'Not offered',
    slotText(d.next) ?? '–',
  ]);
  return { id, heading, columns, rows };
}

function videoSentence(s: DoctorStats, nounPluralLc: string, national: boolean) {
  if (!s.videoCount || !s.videoFee) return '';
  const where = national
    ? s.videoCount === s.total
      ? ', so you can consult from any city'
      : ', so you can consult from anywhere in India'
    : '';
  if (s.videoCount === s.total)
    return national && nounPluralLc === 'doctors'
      ? `Every doctor offers video consultations at ${feeSpan(s.videoFee)}${where}.`
      : `All ${num(s.total)} offer video consultations at ${feeSpan(s.videoFee)}${where}.`;
  return national
    ? `${num(s.videoCount)} of ${num(s.total)} ${nounPluralLc} offer video consultations at ${feeSpan(s.videoFee)}${where}.`
    : `${num(s.videoCount)} of ${num(s.total)} offer video consultations at ${feeSpan(s.videoFee)}; the other ${num(s.clinicOnlyCount)} are clinic-only.`;
}

const ratingSentence = (s: DoctorStats) =>
  s.avgExperience !== null
    ? s.reviewCount > 0 && s.avgRating !== null
      ? `They average ${s.avgExperience} years of experience and a ${s.avgRating.toFixed(1)}★ rating from ${num(s.reviewCount)} patient reviews.`
      : `They average ${s.avgExperience} years of experience.`
    : '';

const statsChips = (s: DoctorStats) =>
  [
    s.avgExperience !== null ? `Avg ${s.avgExperience} yrs experience` : '',
    s.reviewCount > 0 && s.avgRating !== null
      ? `${s.avgRating.toFixed(1)}★ from ${num(s.reviewCount)} reviews`
      : '',
  ].filter(Boolean);

const verb = (s: DoctorStats) => (s.bookableCount > 0 ? 'Book' : 'Find');

// ---------------------------------------------------------------- /{city}/doctors

export function cityDoctorsPage(s: DoctorStats): SeoPage | null {
  const city = s.scope.city;
  if (!city || !s.total) return null;
  const c = city.name;
  const areas = s.areas;
  const areaLine = areas.length
    ? sentences(
        areas.length === 1
          ? `All ${areaWord(s.total)} are in ${areas[0]!.name}.`
          : `${mostSentence(areas, ' doctors')}${leaders(areas).rest.length ? `, followed by ${list(top(leaders(areas).rest, 4).map((a) => `${a.name} (${num(a.count)})`))}` : ''}.`,
        areas.length > 5
          ? `You can also find doctors in ${list(areas.slice(5, 8).map((a) => a.name))}.`
          : '',
        'Use the locality filter to see clinics closest to you.',
      )
    : '';
  const langs = top(s.languages, 6).map((l) => l.name);
  const readMore: SeoSection[] = [
    areaLine ? { heading: `Where are doctors available in ${c}?`, paragraphs: [areaLine] } : null,
    { heading: 'What does each doctor profile show?', paragraphs: [PROFILE_DETAILS] },
    s.clinicCount > 0 && s.videoCount > 0
      ? {
          heading: 'Clinic visit or video consultation?',
          paragraphs: [
            sentences(
              'Choose a clinic visit if you need a physical examination or a procedure. Choose a video consultation for a first opinion, report review or follow-up.',
              s.videoFee && s.clinicFee && s.videoFee.min < s.clinicFee.min
                ? 'Video is usually cheaper.'
                : '',
              'Bookings made on Curxx include a free 7-day chat follow-up, so you can share reports or ask about medicines at no extra cost.',
            ),
          ],
        }
      : null,
    {
      heading: 'Not sure which specialist to see?',
      paragraphs: [
        `Describe your symptoms in our Triage tool and it will suggest the right specialty in ${c} in about a minute. For chest pain, breathing trouble or heavy bleeding, call 108 immediately instead of booking.`,
      ],
    },
    langs.length
      ? { heading: 'Languages', paragraphs: [`Doctors in ${c} consult in ${list(langs)}.`] }
      : null,
  ].filter(Boolean) as SeoSection[];

  const tables: SeoTable[] = [];
  if (s.specialties.length) {
    tables.push({
      id: 'popular-specialties',
      heading: `Popular Specialties in ${c}`,
      columns: ['Specialty', 'Doctors Available', 'Clinic Fee', 'Video Fee', 'Earliest Slot'],
      rows: top(s.specialties, 10).map((sp) => [
        { text: sp.plural, href: `/${city.slug}/${sp.slug}` },
        num(sp.count),
        feeCell(sp.clinicFee),
        feeCell(sp.videoFee),
        slotText(sp.earliest) ?? '–',
      ]),
      note: {
        text: `View all ${s.specialtyCount} specialties in ${c} →`,
        href: `/${city.slug}/specialties`,
      },
    });
  }
  if (areas.length) {
    tables.push({
      id: 'doctors-by-locality',
      heading: `Doctors by Locality in ${c}`,
      columns: ['Locality', 'Doctors', 'Clinic Fee Range', 'Link'],
      rows: top(areas, 12).map((a) => [
        a.name,
        num(a.count),
        feeCell(a.clinicFee),
        // Every row links: the locality page, else the city listing filtered to that area.
        {
          text: `View doctors in ${a.name}`,
          href: localityHref(city.slug, 'doctors', a),
        },
      ]),
    });
  }
  const versus = clinicVsVideoTable(s, {
    id: 'clinic-vs-video',
    heading: `Clinic Visit vs Video Consultation in ${c}`,
    bestFor: true,
  });
  if (versus) tables.push(versus);

  const faqs = [
    costFaq(
      'a doctor consultation',
      c,
      s,
      'The fee depends on the specialty and the doctor’s experience.',
    ),
    s.todayCount > 0
      ? {
          question: `Can I see a doctor in ${c} today?`,
          answer: `Yes. ${num(s.todayCount)} ${verbFor(s.todayCount, 'doctor in ' + c + ' has', 'doctors in ' + c + ' have')} open slots today. Use the “Today” filter to see them.`,
        }
      : todayFaq(`Can I see a doctor in ${c} today?`, s),
    s.freeVideoCount > 0
      ? {
          question: `Which doctors in ${c} offer a free video consult?`,
          answer: `${num(s.freeVideoCount)} ${verbFor(s.freeVideoCount, 'doctor offers', 'doctors offer')} a free first video consultation. Use the “Free video consult” filter.`,
        }
      : null,
    areas.length
      ? {
          question: `Which area of ${c} has the most doctors?`,
          answer: mostAnswer(areas, ' doctors'),
        }
      : null,
    {
      question: 'Is a follow-up included?',
      answer: 'Bookings made on Curxx include a free 7-day chat follow-up with the doctor.',
    },
  ].filter(Boolean) as Faq[];

  const cost = [
    s.clinicCount > 0 && s.clinicFee ? `Clinic visits from ${feeFrom(s.clinicFee)}` : '',
    s.videoCount > 0 && s.videoFee ? `video consults from ${feeFrom(s.videoFee)}` : '',
  ].filter(Boolean);
  const title = `${num(s.total)} Doctors in ${c} – Book Online | Curxx`;
  return {
    title: fit(title, `Doctors in ${c} – Book Online | Curxx`),
    description: clip(
      sentences(
        `Compare ${num(s.total)} doctors in ${c}.`,
        cost.length ? `${cost.join(', ')}.` : '',
        `${verb(s)} online on Curxx.`,
      ),
    ),
    h1: `Doctors in ${c}`,
    subline: `${num(s.total)} doctors available in ${c} · Updated today`,
    h2: `${verb(s)} Doctors in ${c}: Compare Fees, Experience & Availability`,
    stats: [
      `${num(s.total)} Doctors`,
      `${s.specialtyCount} ${s.specialtyCount === 1 ? 'Specialty' : 'Specialties'}`,
      ...feeChips(s),
    ],
    upper: sentences(
      `Curxx lists ${num(s.total)} doctors in ${c} across ${s.specialtyCount} ${s.specialtyCount === 1 ? 'specialty' : 'specialties'}.`,
      s.clinicCount > 0 && s.clinicFee
        ? `Clinic visit fees in ${c} range from ${feeSpan(s.clinicFee)}${s.videoCount > 0 && s.videoFee ? `, and video consultations cost ${feeSpan(s.videoFee)}` : ''}.`
        : s.videoCount > 0 && s.videoFee
          ? `Video consultations cost ${feeSpan(s.videoFee)}.`
          : '',
      s.freeVideoCount > 0
        ? `${num(s.freeVideoCount)} ${verbFor(s.freeVideoCount, 'doctor offers', 'doctors offer')} a free first video consult.`
        : '',
      `Compare experience, patient ratings and earliest available slots, then ${s.bookableCount > 0 ? 'book online' : 'contact the clinic'}.`,
    ),
    readMore,
    tables,
    faqs,
    faqHeading: `Frequently Asked Questions About Doctors in ${c}`,
    canonical: `/${city.slug}/doctors`,
  };
}

// ---------------------------------------------------------------- /{city}/{specialty} and /india/{specialty}

function specialtyPage(s: DoctorStats, national: boolean): SeoPage | null {
  const sp = s.scope.specialty;
  const city = s.scope.city;
  if (!sp || !s.total || (!national && !city)) return null;
  const place = national ? 'India' : city!.name;
  const singular = sp.name;
  const plural = sp.plural;
  const pluralLc = lower(plural);
  const path = national ? `/india/${sp.slug}` : `/${city!.slug}/${sp.slug}`;

  const from =
    s.clinicCount > 0 && s.clinicFee
      ? ` – From ${feeFrom(s.clinicFee)}`
      : s.videoCount > 0 && s.videoFee
        ? ` – From ${feeFrom(s.videoFee)} (Video)`
        : '';
  const title = fit(
    `${num(s.total)} ${plural} in ${place}${from} | Curxx`,
    `${plural} in ${place} | Curxx`,
  );
  const cost = [
    s.clinicCount > 0 && s.clinicFee ? `Clinic visits from ${feeFrom(s.clinicFee)}` : '',
    s.videoCount > 0 && s.videoFee ? `video consults from ${feeFrom(s.videoFee)}` : '',
  ].filter(Boolean);
  const description = clip(
    sentences(
      `${verb(s)} ${num(s.total)} ${pluralLc}${national ? ` across ${s.cityCount} ${s.cityCount === 1 ? 'city' : 'cities'} in India` : ` in ${place}`}.`,
      cost.length ? `${cost.join(', ')}.` : '',
      national ? 'Compare on Curxx.' : 'Compare experience and ratings on Curxx.',
    ),
  );

  const topCities = s.cities;
  const areas = s.areas;
  const upper = sentences(
    national
      ? `Curxx lists ${num(s.total)} ${pluralLc} across ${s.cityCount} ${s.cityCount === 1 ? 'city' : 'cities'} in India.`
      : `Curxx lists ${num(s.total)} ${pluralLc} in ${place}.`,
    s.clinicCount > 0 && s.clinicFee ? `Clinic consultations cost ${feeSpan(s.clinicFee)}.` : '',
    videoSentence(s, pluralLc, national),
    s.freeVideoCount > 0
      ? `${num(s.freeVideoCount)} of them ${verbFor(s.freeVideoCount, 'offers', 'offer')} a free first video consult.`
      : '',
    s.todayCount > 0
      ? `${num(s.todayCount)} of them ${verbFor(s.todayCount, 'has', 'have')} a slot open today.`
      : '',
    ratingSentence(s),
    national && topCities.length >= 2
      ? `${topCities[0]!.name} has the most (${num(topCities[0]!.count)}), followed by ${topCities[1]!.name} (${num(topCities[1]!.count)}).`
      : '',
    s.bookableCount > 0
      ? 'Compare them below and book online.'
      : 'Compare them below and contact the clinic to book.',
  );

  const readMore: SeoSection[] = [];
  if (national) {
    if (topCities.length === 1)
      readMore.push({
        heading: `Where can you find ${an(singular)} in India?`,
        paragraphs: [
          sentences(
            `All ${num(s.total)} are in ${topCities[0]!.name}.`,
            s.videoCount > 0
              ? 'Video consultations let you consult from home, wherever you live.'
              : '',
          ),
        ],
      });
    else if (topCities.length > 1)
      readMore.push({
        heading: `Where can you find ${an(singular)} in India?`,
        paragraphs: [
          sentences(
            `${plural} are available in ${s.cityCount} cities. ${list(top(topCities, 3).map((c) => `${c.name} has ${num(c.count)}`))}.`,
            s.videoCount > 0
              ? 'If your city is not listed, choose video and consult from home.'
              : '',
          ),
        ],
      });
    const withFee = topCities.filter((c) => c.clinicFee);
    const lowest = [...withFee].sort((a, b) => a.clinicFee!.min - b.clinicFee!.min)[0];
    const highest = [...withFee].sort((a, b) => b.clinicFee!.min - a.clinicFee!.min)[0];
    if (s.clinicFee || s.videoFee)
      readMore.push({
        heading: `How much does ${an(singular)} cost in India?`,
        paragraphs: [
          sentences(
            s.clinicCount > 0 && s.clinicFee
              ? `Clinic fees range from ${feeSpan(s.clinicFee)}.`
              : '',
            lowest &&
              highest &&
              lowest.slug !== highest.slug &&
              highest.clinicFee!.min > lowest.clinicFee!.min
              ? `They are lowest in ${lowest.name} (from ${feeFrom(lowest.clinicFee!)}) and highest in ${highest.name} (from ${feeFrom(highest.clinicFee!)}).`
              : '',
            s.videoCount > 0 && s.videoFee
              ? `Video consultations cost ${feeSpan(s.videoFee)}.`
              : '',
          ),
        ],
      });
  } else {
    if (s.clinicFee && s.clinicFee.max / Math.max(1, s.clinicFee.min) > 2)
      readMore.push({
        heading: `Why do ${singular} fees in ${place} range from ${inr(s.clinicFee.min)} to ${inr(s.clinicFee.max)}?`,
        paragraphs: [
          sentences(
            'Fees depend on the doctor’s experience and where they practise.',
            s.videoCount > 0 && s.videoFee
              ? `Video consultations cost ${feeSpan(s.videoFee)}.`
              : '',
          ),
        ],
      });
    if (areas.length)
      readMore.push({
        heading: `Where can you find ${an(singular)} in ${place}?`,
        paragraphs: [
          areas.length === 1
            ? `All ${num(s.total)} are in ${areas[0]!.name}.`
            : sentences(
                `${mostSentence(areas)}${leaders(areas).rest.length ? `, followed by ${list(top(leaders(areas).rest, 2).map((a) => `${a.name} (${num(a.count)})`))}` : ''}.`,
                `Use the locality filter to find the clinic closest to you${s.videoCount > 0 ? ', or choose video if none is nearby' : ''}.`,
              ),
        ],
      });
  }
  if (sp.conditions.length)
    readMore.push({ heading: `What does ${an(singular)} treat?`, list: sp.conditions });
  if (sp.whenToSee.length)
    readMore.push({ heading: `When should you see ${an(singular)}?`, list: sp.whenToSee });
  readMore.push({
    heading: 'When should you not wait for an appointment?',
    paragraphs: [EMERGENCY],
  });
  if (s.clinicCount > 0 && s.videoCount > 0)
    readMore.push({
      heading: 'Clinic visit or video?',
      paragraphs: [
        sentences(
          `Choose a clinic visit for ${BEST_FOR_CLINIC}. Choose video for ${BEST_FOR_VIDEO}.`,
          s.clinicOnlyCount > 0
            ? `Note: ${num(s.clinicOnlyCount)} of the ${num(s.total)} doctors do not offer video.`
            : '',
          'Bookings made on Curxx include a free 7-day chat follow-up.',
        ),
      ],
    });

  const tables: SeoTable[] = [];
  if (national) {
    if (topCities.length)
      tables.push({
        id: 'by-city',
        heading: `${plural} by City`,
        columns: ['City', 'Doctors', 'Clinic Fee', 'Video Fee', 'Earliest Slot (IST)', 'Link'],
        rows: topCities.map((c) => [
          c.name,
          num(c.count),
          feeCell(c.clinicFee),
          feeCell(c.videoFee),
          slotText(c.earliest) ?? '–',
          { text: `${plural} in ${c.name}`, href: `/${c.slug}/${sp.slug}` },
        ]),
      });
    const t = compareTable(s, 'top-rated', `Top-rated ${plural} in India`, true);
    if (t) tables.push(t);
  } else {
    const t = compareTable(s, 'compare-doctors', `Compare ${plural} in ${place}`, false);
    if (t) {
      if (s.total > s.topDoctors.length)
        t.note = {
          text: `View all ${num(s.total)} ${plural} in ${place} →`,
          href: '#results-heading',
        };
      tables.push(t);
    }
    if (s.feeBands.length) {
      const settings = s.feeBands.some((b) => b.setting);
      tables.push({
        id: 'fee-guide',
        heading: `${singular} Fee Guide in ${place}`,
        columns: settings ? ['Fee band', 'Doctors', 'Typical setting'] : ['Fee band', 'Doctors'],
        rows: s.feeBands.map((b) =>
          settings ? [b.label, num(b.count), b.setting ?? '–'] : [b.label, num(b.count)],
        ),
      });
    }
    if (areas.length)
      tables.push({
        id: 'by-locality',
        heading: `${plural} by Locality in ${place}`,
        columns: ['Locality', 'Doctors', 'Clinic Fee', 'Link'],
        rows: top(areas, 12).map((a) => [
          a.name,
          num(a.count),
          feeCell(a.clinicFee),
          {
            text: `${plural} in ${a.name}`,
            href: localityHref(city!.slug, sp.slug, a),
          },
        ]),
      });
  }
  const versus = clinicVsVideoTable(s, {
    id: 'clinic-vs-video',
    heading: `Clinic Visit vs Video Consultation${national ? ' in India' : ` in ${place}`}`,
    bestFor: true,
    cities: national,
  });
  if (versus) tables.push(versus);

  const topRated = topRatedText(s, national);
  const faqs = [
    costFaq(`${an(singular)}`, place, s),
    national && topCities.length
      ? { question: `Which city has the most ${plural} on Curxx?`, answer: mostAnswer(topCities) }
      : null,
    !national ? todayFaq(`Can I see ${an(singular)} in ${place} today?`, s) : null,
    topRated
      ? {
          question: `Who are the top-rated ${plural} in ${place}?`,
          answer: `${topRated}. Ratings count only doctors with at least 5 patient reviews.`,
        }
      : null,
    onlineFaq(
      `Can I consult ${an(singular)} online${national ? '' : ` in ${place}`}?`,
      s,
      pluralLc,
      place,
    ),
    !national && areas.length
      ? { question: `Which area of ${place} has the most ${plural}?`, answer: mostAnswer(areas) }
      : null,
    national ? todayFaq(`Can I see ${an(singular)} today?`, s) : null,
    howToBook(s),
  ].filter(Boolean) as Faq[];

  return {
    title,
    description,
    h1: `${plural} in ${place}`,
    subline: [
      national
        ? `${num(s.total)} ${pluralLc} · ${s.cityCount} ${s.cityCount === 1 ? 'city' : 'cities'}`
        : `${num(s.total)} ${pluralLc}`,
      s.todayCount > 0 ? `${num(s.todayCount)} available today` : '',
      'Updated today',
    ]
      .filter(Boolean)
      .join(' · '),
    h2: `${verb(s)} ${an(singular)} in ${place}: Compare Fees, ${national ? 'Cities' : 'Experience'} & Availability`,
    stats: [
      national ? `${num(s.total)} ${plural}` : `${num(s.total)} Doctors`,
      ...(national ? [`${s.cityCount} ${s.cityCount === 1 ? 'City' : 'Cities'}`] : []),
      ...feeChips(s),
      ...statsChips(s),
    ],
    upper,
    readMore,
    tables,
    faqs,
    faqHeading: `Frequently Asked Questions About ${plural} in ${place}`,
    canonical: path,
  };
}

export const citySpecialtyPage = (s: DoctorStats) => specialtyPage(s, false);
export const indiaSpecialtyPage = (s: DoctorStats) => specialtyPage(s, true);

// ---------------------------------------------------------------- /india/doctors

export function indiaDoctorsPage(s: DoctorStats): SeoPage | null {
  if (!s.total) return null;
  const cities = s.cities;
  const top3 = top(cities, 3);
  const cost = [
    s.clinicCount > 0 && s.clinicFee ? `Clinic visits from ${feeFrom(s.clinicFee)}` : '',
    s.videoCount > 0 && s.videoFee ? `video consults from ${feeFrom(s.videoFee)}` : '',
  ].filter(Boolean);
  const withFee = cities.filter((c) => c.clinicFee);
  const lowest = [...withFee].sort((a, b) => a.clinicFee!.min - b.clinicFee!.min)[0];
  const highest = [...withFee].sort((a, b) => b.clinicFee!.min - a.clinicFee!.min)[0];

  const readMore: SeoSection[] = [
    cities.length
      ? {
          heading: 'Which cities have doctors on Curxx?',
          paragraphs: [
            sentences(
              `Curxx has doctors in ${s.cityCount} ${s.cityCount === 1 ? 'city' : 'cities'}.`,
              top3.length > 1
                ? `${top3[0]!.name} has the most (${num(top3[0]!.count)}), followed by ${list(top3.slice(1).map((c) => `${c.name} (${num(c.count)})`))}.`
                : '',
              s.smallCityCount > 0
                ? `${s.smallCityCount} more ${s.smallCityCount === 1 ? 'city has' : 'cities have'} fewer than 5 doctors each, and ${s.smallCityCount === 1 ? 'is' : 'are'} growing.`
                : '',
            ),
          ],
        }
      : null,
    s.videoCount > 0 && s.videoFee
      ? {
          heading: 'Can I consult a doctor online from any city?',
          paragraphs: [
            `${num(s.videoCount)} doctors offer video consultations, so your city does not limit your choice. Video fees range from ${feeSpan(s.videoFee)}. Bookings made on Curxx include a free 7-day chat follow-up.`,
          ],
        }
      : null,
    lowest && highest && highest.clinicFee!.min / Math.max(1, lowest.clinicFee!.min) > 1.5
      ? {
          heading: 'Why do fees differ between cities?',
          paragraphs: [
            `Fees depend on the specialty, the doctor’s experience and the city. Clinic visits start from ${feeFrom(lowest.clinicFee!)} in ${lowest.name} and from ${feeFrom(highest.clinicFee!)} in ${highest.name}.`,
          ],
        }
      : null,
    { heading: 'What does each doctor profile show?', paragraphs: [PROFILE_DETAILS] },
    {
      heading: 'Not sure which specialist to see?',
      paragraphs: [
        'Describe your symptoms in our Triage tool and it will suggest the right specialty. For chest pain, breathing trouble or heavy bleeding, call 108 immediately.',
      ],
    },
  ].filter(Boolean) as SeoSection[];

  const listed = cities.filter((c) => c.count >= 3);
  const tables: SeoTable[] = [];
  if (listed.length)
    tables.push({
      id: 'by-city',
      heading: 'Doctors by City',
      columns: ['City', 'Doctors', 'Clinic Fee', 'Video Fee', 'Link'],
      rows: top(listed, 15).map((c) => [
        c.name,
        num(c.count),
        feeCell(c.clinicFee),
        feeCell(c.videoFee),
        { text: `Doctors in ${c.name}`, href: `/${c.slug}/doctors` },
      ]),
    });
  if (s.specialties.length)
    tables.push({
      id: 'popular-specialties',
      heading: 'Popular Specialties in India',
      columns: ['Specialty', 'Doctors', 'Cities', 'Clinic Fee', 'Video Fee'],
      rows: top(s.specialties, 10).map((sp) => [
        { text: sp.plural, href: `/india/${sp.slug}` },
        num(sp.count),
        num(sp.cityCount),
        feeCell(sp.clinicFee),
        feeCell(sp.videoFee),
      ]),
    });
  const versus = clinicVsVideoTable(s, {
    id: 'clinic-vs-video',
    heading: 'Clinic Visit vs Video Consultation in India',
    bestFor: false,
    cities: true,
  });
  if (versus) tables.push(versus);

  const faqs = [
    {
      question: 'How many doctors are available on Curxx in India?',
      answer: `${num(s.total)} doctors across ${s.cityCount} ${s.cityCount === 1 ? 'city' : 'cities'} and ${s.specialtyCount} specialties.`,
    },
    costFaq(
      'a doctor consultation',
      'India',
      s,
      'The exact fee is shown on each profile before you book.',
    ),
    top3.length
      ? { question: 'Which city has the most doctors on Curxx?', answer: mostAnswer(cities) }
      : null,
    s.videoCount === 0
      ? {
          question: 'Can I consult a doctor online in India?',
          answer: 'Video is not available right now. You can book a clinic visit.',
        }
      : s.videoCount === s.total
        ? {
            question: 'Can I consult a doctor online in India?',
            answer: 'Yes, all doctors offer video consultations, from any city.',
          }
        : {
            question: 'Can I consult a doctor online in India?',
            answer: `Yes, ${num(s.videoCount)} of ${num(s.total)} offer video. The rest are clinic-only.`,
          },
    {
      question: 'Is a follow-up included?',
      answer: 'Bookings made on Curxx include a free 7-day chat follow-up.',
    },
  ].filter(Boolean) as Faq[];

  return {
    title: fit(
      `${num(s.total)} Doctors in India – Book Online | Curxx`,
      'Doctors in India – Book Online | Curxx',
    ),
    description: clip(
      sentences(
        `Compare ${num(s.total)} doctors across ${s.cityCount} cities in India.`,
        cost.length ? `${cost.join(', ')}.` : '',
        `${verb(s)} on Curxx.`,
      ),
    ),
    h1: 'Doctors in India',
    subline: `${num(s.total)} doctors · ${s.cityCount} ${s.cityCount === 1 ? 'city' : 'cities'} · ${s.specialtyCount} specialties · Updated today`,
    h2: `${verb(s)} Doctors in India: Compare Fees, Cities & Availability`,
    stats: [
      `${num(s.total)} Doctors`,
      `${s.cityCount} ${s.cityCount === 1 ? 'City' : 'Cities'}`,
      `${s.specialtyCount} Specialties`,
      ...feeChips(s),
    ],
    upper: sentences(
      `Curxx lists ${num(s.total)} doctors across ${s.cityCount} ${s.cityCount === 1 ? 'city' : 'cities'} in India, covering ${s.specialtyCount} specialties.`,
      s.clinicCount > 0 && s.clinicFee
        ? `Clinic consultations cost ${feeSpan(s.clinicFee)}, depending on the city and specialty.`
        : '',
      videoSentence(s, 'doctors', true),
      s.todayCount > 0 ? `${num(s.todayCount)} doctors have a slot open today.` : '',
      top3.length >= 2
        ? `Most doctors are in ${list(top3.map((c) => `${c.name} (${num(c.count)})`))}.`
        : '',
      `Choose a city, compare fees and ratings, and ${s.bookableCount > 0 ? 'book online' : 'contact the clinic'}.`,
    ),
    readMore,
    tables,
    faqs,
    faqHeading: 'Frequently Asked Questions About Doctors in India',
    canonical: '/india/doctors',
  };
}

// ---------------------------------------------------------------- /{city}/surgeries and /india/surgeries

const SURGEON_LABEL: Record<string, string> = {
  'general-surgeon': 'General Surgeons',
  orthopedist: 'Orthopedists',
  urologist: 'Urologists',
  gynecologist: 'Gynecologists',
  'ent-specialist': 'ENT Specialists',
  ophthalmologist: 'Ophthalmologists',
};

const INSURANCE =
  'Most medically necessary procedures, such as piles, hernia, gallbladder, cataract and joint replacement, are usually covered by health insurance, subject to your policy’s waiting periods and limits. Cosmetic procedures usually are not.';

export function surgeriesPage(s: SurgeryStats): SeoPage | null {
  if (!s.procedureCount || s.minCost === null || s.maxCost === null) return null;
  const national = !s.city;
  const place = national ? 'India' : s.city!.name;
  const hospitals = s.hospitals;
  const h3 = top(hospitals, 3);
  const areas = s.areas;

  const title = national
    ? fit(
        `Surgery in India: ${num(s.hospitalCount)} Hospitals, Est. Cost from ${inr(s.minCost)} | Curxx`,
        'Surgery in India: Hospitals & Cost | Curxx',
      )
    : s.hospitalCount > 0
      ? fit(
          `Surgery in ${place}: ${num(s.hospitalCount)} Hospitals, Est. Cost from ${inr(s.minCost)} | Curxx`,
          `Surgery in ${place}: Hospitals & Cost | Curxx`,
        )
      : fit(
          `Surgery in ${place}: Est. Cost from ${inr(s.minCost)} & Free Consult | Curxx`,
          `Surgery in ${place}: Hospitals & Cost | Curxx`,
        );
  const description = clip(
    national
      ? sentences(
          `Compare ${s.procedureCount} surgeries across ${num(s.hospitalCount)} hospitals in ${s.cityCount} cities.`,
          `Estimated costs from ${inr(s.minCost)}.`,
          'Book a free surgeon consultation.',
        )
      : sentences(
          `Compare ${s.procedureCount} surgeries in ${place}${s.hospitalCount ? ` at ${num(s.hospitalCount)} hospitals` : ''}.`,
          `Estimated costs from ${inr(s.minCost)}.`,
          'Book a free surgeon consultation.',
        ),
  );

  // "(Area)" only when the name doesn't already say it ("…Hospital, Karol Bagh (Karol Bagh)").
  const hospitalNames = h3.map((h) =>
    h.area && !national && !h.name.toLowerCase().includes(h.area.toLowerCase())
      ? `${h.name} (${h.area})`
      : h.name,
  );
  const upper = sentences(
    national
      ? `Curxx lists ${num(s.hospitalCount)} hospitals and ${num(s.surgeonCount)} surgeons across ${s.cityCount} cities in India.`
      : s.hospitalCount > 0
        ? `Curxx lists ${s.hospitalCount === 1 ? '1 hospital' : `${num(s.hospitalCount)} hospitals`}${s.surgeonCount > 0 ? ` and ${num(s.surgeonCount)} surgeons` : ''} in ${place}, including ${list(hospitalNames)}.`
        : '',
    `Compare ${s.procedureCount} common procedures across ${s.categoryCount} specialities, with estimated package costs from ${inr(s.minCost)} to ${inr(s.maxCost)}.`,
    s.shortStayCount > 0
      ? `${num(s.shortStayCount)} procedures need a hospital stay of one day or less${s.daycareCount > 0 ? `, including ${num(s.daycareCount)} day-care procedures` : ''}.`
      : '',
    'Book a free consultation with an experienced surgeon and get an itemised cost estimate.',
  );

  const readMore: SeoSection[] = [];
  if (!national && s.hospitalCount > 0)
    readMore.push({
      heading: `Which hospitals in ${place} are listed on Curxx?`,
      paragraphs: [
        sentences(
          `Curxx lists ${s.hospitalCount === 1 ? '1 hospital' : `${num(s.hospitalCount)} hospitals`} in ${place}.`,
          areas.length > 1
            ? `${mostSentence(areas)}${leaders(areas).rest.length ? `, followed by ${list(top(leaders(areas).rest, 2).map((a) => `${a.name} (${num(a.count)})`))}` : ''}.`
            : '',
        ),
      ],
    });
  readMore.push({
    heading: 'How much does surgery cost?',
    paragraphs: [
      sentences(
        `Estimated package costs on Curxx range from ${inr(s.minCost)}${s.cheapest ? ` for ${s.cheapest}` : ''} to ${inr(s.maxCost)}${s.priciest ? ` for ${s.priciest}` : ''}.`,
        s.costBands.length
          ? `${list(s.costBands.map((b, i) => `${num(b.count)} ${i === 0 ? 'procedures start ' : ''}${b.label}`))}.`
          : '',
        'Your final estimate depends on the hospital, technique, implant or lens, room category and length of stay.',
      ),
    ],
  });
  if (s.daycareCount > 0)
    readMore.push({
      heading: 'Which surgeries can be done as day care?',
      paragraphs: [
        `${num(s.daycareCount)} procedures are day care: ${list(s.daycare.map((d) => d.name))}.`,
      ],
    });
  readMore.push({ heading: 'Is surgery covered by health insurance?', paragraphs: [INSURANCE] });
  readMore.push({
    heading: 'How does Curxx help?',
    list: [
      'Choose your procedure and leave your mobile number.',
      'A Curxx care coordinator calls to understand what you need.',
      'We book a consultation with an experienced surgeon.',
      'You get an itemised cost estimate before you decide.',
      'We help with insurance paperwork and admission.',
    ],
  });
  readMore.push({
    heading: 'Is this an emergency?',
    paragraphs: [
      'For an accident, severe pain, heavy bleeding or trouble breathing, call 108 or go to the nearest emergency department. Don’t wait for a planned-surgery consultation.',
    ],
  });

  const tables: SeoTable[] = [];
  if (national) {
    if (s.cities.length)
      tables.push({
        id: 'by-city',
        heading: 'Surgery by City',
        columns: ['City', 'Hospitals', 'Surgeons', 'Link'],
        rows: s.cities.map((c) => [
          c.name,
          num(c.hospitals),
          num(c.surgeons),
          { text: `Surgery in ${c.name}`, href: `/${c.slug}/surgeries` },
        ]),
      });
  } else if (hospitals.length) {
    const surgeons = hospitals.some((h) => h.surgeons > 0);
    const departments = hospitals.some((h) => h.departments.length);
    tables.push({
      id: 'hospitals',
      heading: `Hospitals in ${place}`,
      columns: [
        'Hospital',
        'Locality',
        ...(surgeons ? ['Surgeons'] : []),
        ...(departments ? ['Specialities'] : []),
        'Link',
      ],
      rows: hospitals.map((h) => [
        `${h.name}${h.nabh ? ' · NABH' : ''}${h.beds ? ` · ${num(h.beds)} beds` : ''}`,
        h.area || '–',
        ...(surgeons ? [h.surgeons ? num(h.surgeons) : '–'] : []),
        ...(departments ? [h.departments.join(', ') || '–'] : []),
        { text: 'View hospital', href: `/clinic/${h.slug}` },
      ]),
      note:
        s.hospitalCount > hospitals.length
          ? {
              text: `View all ${num(s.hospitalCount)} hospitals in ${place} →`,
              href: `/${s.city!.slug}/hospitals`,
            }
          : undefined,
    });
  }
  if (!national && s.surgeonTable.length)
    tables.push({
      id: 'surgeons',
      heading: `Surgeons in ${place}`,
      columns: ['Speciality', 'Surgeons', 'Experience (avg)', 'Link'],
      rows: s.surgeonTable.map((r) => [
        SURGEON_LABEL[r.slug] ?? r.slug,
        num(r.count),
        r.avgExperience ? `${r.avgExperience} yrs` : '–',
        { text: `See ${SURGEON_LABEL[r.slug] ?? r.slug}`, href: `/${s.city!.slug}/${r.slug}` },
      ]),
    });

  const faqs = [
    !national && s.hospitalCount > 0
      ? {
          question: `Which hospitals in ${place} are listed on Curxx for surgery?`,
          answer: `${s.hospitalCount === 1 ? '1 hospital' : `${num(s.hospitalCount)} hospitals`}, including ${list(h3.map((h) => h.name))}.`,
        }
      : null,
    {
      question: `How much does surgery cost in ${place}?`,
      answer: `Estimated package costs start from ${inr(s.minCost)} and go up to ${inr(s.maxCost)}, depending on the procedure. The final bill depends on the hospital, technique, implant and room category.`,
    },
    !national && areas.length
      ? { question: `Which area of ${place} has the most hospitals?`, answer: mostAnswer(areas) }
      : null,
    s.daycareCount > 0
      ? {
          question: 'Which surgeries are day care?',
          answer: `${num(s.daycareCount)} procedures: ${list(s.daycare.map((d) => d.name))}.`,
        }
      : null,
    { question: 'Is surgery covered by health insurance?', answer: INSURANCE },
    {
      question: `How do I book a free consultation${national ? '' : ` in ${place}`}?`,
      answer:
        'Choose your procedure, leave your mobile number in the form, and a Curxx care coordinator will call you.',
    },
    s.surgeonCount > 0
      ? {
          question: 'Which doctor should I see first?',
          answer: `Start with a surgeon of the matching speciality, for example a general surgeon for hernia or piles, an orthopedist for joint problems or an ophthalmologist for cataract. You can compare ${num(s.surgeonCount)} surgeons${national ? '' : ` in ${place}`} on Curxx.`,
        }
      : null,
    {
      question: 'What if it is an emergency?',
      answer: 'Call 108 or go to the nearest emergency department straight away.',
    },
  ].filter(Boolean) as Faq[];

  return {
    title,
    description,
    h1: `Surgery in ${place}: Hospitals, Costs & Free Consultation`,
    subline: [
      s.hospitalCount
        ? `${num(s.hospitalCount)} ${s.hospitalCount === 1 ? 'hospital' : 'hospitals'}`
        : '',
      s.surgeonCount ? `${num(s.surgeonCount)} surgeons` : '',
      `${s.procedureCount} procedures`,
    ]
      .filter(Boolean)
      .join(' · '),
    h2:
      s.hospitalCount > 0
        ? `Planned Surgery in ${place}: Compare Hospitals, Costs & Book a Free Consultation`
        : `Planned Surgery in ${place}: Compare Costs & Book a Free Consultation`,
    stats: [
      s.hospitalCount ? `${num(s.hospitalCount)} Hospitals` : '',
      s.surgeonCount ? `${num(s.surgeonCount)} Surgeons` : '',
      `${s.procedureCount} Procedures`,
      `Est. from ${inr(s.minCost)}`,
      s.daycareCount ? `${num(s.daycareCount)} Day-care Procedures` : '',
    ].filter(Boolean),
    upper,
    readMore,
    tables,
    faqs,
    faqHeading: `Surgery in ${place}: Frequently Asked Questions`,
    canonical: national ? '/india/surgeries' : `/${s.city!.slug}/surgeries`,
    // Template index rule: thin city pages point at the India page instead.
    index: s.indexable,
  };
}
