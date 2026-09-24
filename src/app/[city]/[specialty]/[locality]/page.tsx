import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { canonicalCity, getLocality } from '@/lib/cities';
import { ALL_DOCTORS, getSpecialty, specialtyAlias } from '@/lib/specialties';
import { listingMetadata, renderListing, type SearchParams } from '../listing';

type Props = {
  params: Promise<{ city: string; specialty: string; locality: string }>;
  searchParams: Promise<SearchParams>;
};

const known = (slug: string) => slug === ALL_DOCTORS.slug || Boolean(getSpecialty(slug));

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { city, specialty, locality } = await params;
  const canonical = canonicalCity(city);
  if (!canonical || !known(specialty) || !getLocality(canonical, locality)) return {};
  return listingMetadata({ city: canonical, specialty, locality: locality.toLowerCase() }, await searchParams);
}

/** /bangalore/dermatologist/indiranagar — a specialty in one locality. */
export default async function LocalityListingPage({ params, searchParams }: Props) {
  const { city, specialty, locality } = await params;
  const canonical = canonicalCity(city);
  if (!canonical) notFound();
  const alias = specialtyAlias(specialty);
  if (alias) permanentRedirect(`/${canonical}/${alias}/${locality}`);
  if (!known(specialty)) notFound();
  const area = getLocality(canonical, locality);
  if (!area) notFound();
  if (canonical !== city || area.slug !== locality) permanentRedirect(`/${canonical}/${specialty}/${area.slug}`);

  return renderListing({ city: canonical, specialty, locality: area.slug }, await searchParams);
}
