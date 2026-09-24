import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { api, type DoctorQuery, type Specialty, type SubSpecialty } from '@/lib/api';
import VideoDoctorPicker from './VideoDoctorPicker';

type Props = {
  params: Promise<{ specialty: string; focus: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const one = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value);
const num = (value: string | string[] | undefined) => {
  const n = Number(one(value));
  return Number.isFinite(n) && n > 0 ? n : undefined;
};

async function loadSpecialty(slug: string): Promise<Specialty | null> {
  try {
    const { specialties } = await api.specialties('video', 'all');
    return specialties.find((s) => s.slug === slug) ?? null;
  } catch {
    return null;
  }
}

/** An API outage should show the empty state rather than a 500 mid-flow. */
async function loadDoctors(query: DoctorQuery) {
  try {
    return await api.doctors(query);
  } catch {
    return { doctors: [], page: 1, limit: 10, total: 0, pages: 1 };
  }
}

function resolveFocus(specialty: Specialty, slug: string): SubSpecialty | null | undefined {
  if (slug === 'all') return null;
  return specialty.subSpecialties.find((s) => s.slug === slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { specialty: specialtySlug, focus: focusSlug } = await params;
  const specialty = await loadSpecialty(specialtySlug);
  if (!specialty) return {};
  const focus = resolveFocus(specialty, focusSlug);
  if (focus === undefined) return {};
  const subject = focus ? `${focus.name.toLowerCase()}` : specialty.plural.toLowerCase();
  return {
    title: `${focus ? focus.name : specialty.plural} — Video Consult a Doctor Now | Curxx`,
    description: `Compare verified ${specialty.plural.toLowerCase()} available on video for ${subject}, filter by fee, experience and language, then join the call.`,
    alternates: { canonical: `/consult/video/${specialtySlug}/${focusSlug}` },
  };
}

export default async function ConsultDoctorPickerPage({ params, searchParams }: Props) {
  const { specialty: specialtySlug, focus: focusSlug } = await params;
  const specialty = await loadSpecialty(specialtySlug);
  if (!specialty) notFound();

  const focus = resolveFocus(specialty, focusSlug);
  if (focus === undefined) notFound();

  const query = await searchParams;
  // "Consult now" (default): a video slot starting within the hour. "Free": doctors offering a free
  // first consult. "Book a time": any video slot this week. Video works from anywhere, so every city counts.
  const requested = one(query.when);
  const when = requested === 'later' ? 'later' : requested === 'free' ? 'free' : 'now';

  const listing = await loadDoctors({
    city: 'all',
    specialty: specialtySlug,
    focus: focus?.slug,
    mode: 'video',
    free: when === 'free' || undefined,
    availability: when === 'now' ? 'now' : (one(query.availability) as DoctorQuery['availability']) ?? 'next-7-days',
    area: one(query.area),
    language: one(query.language),
    maxFee: num(query.maxFee),
    minExperience: num(query.minExperience),
    sort: (one(query.sort) as DoctorQuery['sort']) ?? (when === 'later' ? 'relevance' : 'soonest'),
    page: num(query.page) ?? 1,
    limit: 10,
  });

  return <VideoDoctorPicker {...listing} specialty={specialty} focus={focus} when={when} />;
}
