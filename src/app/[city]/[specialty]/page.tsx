import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { resolveCity, resolveCondition, resolveSpecialty, resolveSpecialtyAlias } from '@/lib/catalogue-live';
import { ALL_DOCTORS } from '@/lib/specialties';
import ConditionPage, { conditionMetadata } from './ConditionPage';
import { listingMetadata, renderListing, type SearchParams } from './listing';

type Props = {
  params: Promise<{ city: string; specialty: string }>;
  searchParams: Promise<SearchParams>;
};

const known = async (slug: string) => slug === ALL_DOCTORS.slug || Boolean(await resolveSpecialty(slug));

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { city, specialty: segment } = await params;
  const canonical = (await resolveCity(city))?.slug;
  if (!canonical) return {};
  const condition = await resolveCondition(segment);
  if (condition) return conditionMetadata(canonical, condition.slug);
  if (!(await known(segment))) return {};
  return listingMetadata({ city: canonical, specialty: segment }, await searchParams);
}

export default async function SpecialtyListingPage({ params, searchParams }: Props) {
  const { city, specialty: segment } = await params;
  const canonical = (await resolveCity(city))?.slug;
  if (!canonical) notFound();

  const alias = await resolveSpecialtyAlias(segment);
  if (alias) permanentRedirect(`/${canonical}/${alias}`);
  if (canonical !== city) permanentRedirect(`/${canonical}/${segment}`);

  const condition = await resolveCondition(segment);
  if (condition) return <ConditionPage city={canonical} slug={condition.slug} searchParams={await searchParams} />;
  if (!(await known(segment))) notFound();

  return renderListing({ city: canonical, specialty: segment }, await searchParams);
}
