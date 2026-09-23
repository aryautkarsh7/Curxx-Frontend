import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { api, type DoctorQuery } from '@/lib/api';
import { canonicalCity } from '@/lib/cities';
import { LISTING_FAQS } from '@/lib/listing-content';
import { JsonLd, faqSchema } from '@/lib/seo';
import { ALL_DOCTORS, getSpecialty } from '@/lib/specialties';
import DoctorListing from './DoctorListing';

type Props = {
  params: Promise<{ city: string; specialty: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const one = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value);
const num = (value: string | string[] | undefined) => {
  const n = Number(one(value));
  return Number.isFinite(n) && n > 0 ? n : undefined;
};

/** An API outage should show the empty state, not a 500 on an indexable page. */
async function loadDoctors(query: DoctorQuery) {
  try {
    return await api.doctors(query);
  } catch {
    return { doctors: [], page: 1, limit: 10, total: 0, pages: 1 };
  }
}

function resolveSpecialty(slug: string) {
  return slug === ALL_DOCTORS.slug ? ALL_DOCTORS : getSpecialty(slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city, specialty: slug } = await params;
  const specialty = resolveSpecialty(slug);
  if (!specialty) return {};
  const title = `${specialty.plural} in Bangalore — Book Verified Doctors Online or In-Clinic | Curxx`;
  const description = `Book ${specialty.plural.toLowerCase()} in Bangalore for a video consult in 60 seconds or a zero-wait clinic visit. Compare fees, experience and patient ratings, then confirm your slot on Curxx.`;
  return {
    title,
    description,
    alternates: { canonical: `/${canonicalCity(city) ?? city}/${slug}` },
    openGraph: { title, description, type: 'website' },
  };
}

export default async function SpecialtyListingPage({ params, searchParams }: Props) {
  const { city, specialty: slug } = await params;
  const canonical = canonicalCity(city);
  const specialty = resolveSpecialty(slug);
  if (!canonical || !specialty) notFound();
  if (canonical !== city) permanentRedirect(`/${canonical}/${slug}`);

  const query = await searchParams;
  const listing = await loadDoctors({
    city: canonical,
    specialty: slug,
    q: one(query.q),
    mode: one(query.mode) as DoctorQuery['mode'],
    area: one(query.area),
    language: one(query.language),
    availability: one(query.availability) as DoctorQuery['availability'],
    maxFee: num(query.maxFee),
    minExperience: num(query.minExperience),
    sort: (one(query.sort) as DoctorQuery['sort']) ?? 'relevance',
    page: num(query.page) ?? 1,
    limit: 10,
  });

  return (
    <>
      <JsonLd data={faqSchema(LISTING_FAQS)} />
      <DoctorListing {...listing} plural={specialty.plural} specialty={slug} />
    </>
  );
}
