import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { canonicalCity } from '@/lib/cities';
import { ALL_DOCTORS, LISTED_SPECIALTIES, getSpecialty } from '@/lib/specialties';
import DoctorListing from './DoctorListing';
import DoctorListingEmpty from './DoctorListingEmpty';
import DoctorListingFiltered from './DoctorListingFiltered';

type Props = {
  params: Promise<{ city: string; specialty: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

// Query params that narrow results (pagination alone doesn't count as filtering).
const FILTER_PARAMS = ['filter', 'availability', 'q', 'condition'];

function resolveSpecialty(slug: string) {
  return slug === ALL_DOCTORS.slug ? ALL_DOCTORS : getSpecialty(slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const specialty = resolveSpecialty((await params).specialty);
  return specialty ? { title: `${specialty.plural} in Bangalore — Book Verified Doctors | Curxx` } : {};
}

export default async function SpecialtyListingPage({ params, searchParams }: Props) {
  const { city, specialty: slug } = await params;
  const canonical = canonicalCity(city);
  const specialty = resolveSpecialty(slug);
  if (!canonical || !specialty) notFound();
  if (canonical !== city) permanentRedirect(`/${canonical}/${slug}`);

  if (!LISTED_SPECIALTIES.has(specialty.slug)) return <DoctorListingEmpty plural={specialty.plural} />;
  const query = await searchParams;
  const filtered = FILTER_PARAMS.some((key) => query[key] !== undefined);
  return filtered ? <DoctorListingFiltered plural={specialty.plural} /> : <DoctorListing plural={specialty.plural} />;
}
