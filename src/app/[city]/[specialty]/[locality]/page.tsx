import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { resolveCity, resolveLocality, resolveSpecialty, resolveSpecialtyAlias } from '@/lib/catalogue-live';
import { ALL_DOCTORS } from '@/lib/specialties';
import { listingMetadata, renderListing, type SearchParams } from '../listing';

type Props = {
  params: Promise<{ city: string; specialty: string; locality: string }>;
  searchParams: Promise<SearchParams>;
};

const known = async (slug: string) => slug === ALL_DOCTORS.slug || Boolean(await resolveSpecialty(slug));

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { city, specialty, locality } = await params;
  const info = await resolveCity(city);
  if (!info || !(await known(specialty)) || !(await resolveLocality(info, locality))) return {};
  return listingMetadata({ city: info.slug, specialty, locality: locality.toLowerCase() }, await searchParams);
}

/** /bangalore/dermatologist/indiranagar — a specialty in one locality. */
export default async function LocalityListingPage({ params, searchParams }: Props) {
  const { city, specialty, locality } = await params;
  const info = await resolveCity(city);
  if (!info) notFound();
  const canonical = info.slug;
  const alias = await resolveSpecialtyAlias(specialty);
  if (alias) permanentRedirect(`/${canonical}/${alias}/${locality}`);
  if (!(await known(specialty))) notFound();
  const area = await resolveLocality(info, locality);
  if (!area) notFound();
  if (canonical !== city || area.slug !== locality) permanentRedirect(`/${canonical}/${specialty}/${area.slug}`);

  return renderListing({ city: canonical, specialty, locality: area.slug }, await searchParams);
}
