import type { Metadata } from 'next';
import ListingSeoContent, { InternalLinks, allDoctorsFaqs } from '@/components/listing/ListingSeoContent';
import FaqAccordion from '@/components/seo/FaqAccordion';
import { SeoBody, SeoIntro } from '@/components/seo/SeoContent';
import { api, hasReviews, type DoctorList, type DoctorQuery, type DoctorStats, type SpecialtyContent } from '@/lib/api';
import { cityDoctorsPage, citySpecialtyPage, lower, type SeoPage } from '@/lib/seo-content';
import { liveCatalogue, resolveCity, resolveSpecialty } from '@/lib/catalogue-live';
import type { CityInfo, SpecialtyInfo } from '@/lib/catalogue-data';
import { JsonLd } from '@/lib/seo';
import { ALL_DOCTORS } from '@/lib/specialties';
import DoctorListing, { type Crumb } from './DoctorListing';
import Link from 'next/link';

export type SearchParams = Record<string, string | string[] | undefined>;

export const one = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value);
const num = (value: string | string[] | undefined) => {
  const n = Number(one(value));
  return Number.isFinite(n) && n > 0 ? n : undefined;
};

/** An API outage should show the empty state, not a 500 on an indexable page. */
export async function loadDoctors(query: DoctorQuery): Promise<DoctorList> {
  try {
    return await api.doctors(query);
  } catch {
    return { doctors: [], page: 1, limit: 10, total: 0, pages: 1 };
  }
}

async function loadContent(specialty: string, city: string, area?: string) {
  try {
    return await api.specialtyContent(specialty, city, area);
  } catch {
    return null;
  }
}

/** Figures for the city / city + specialty template copy; null on an API hiccup (the page falls back). */
async function loadStats(city: string, specialty: string): Promise<DoctorStats | null> {
  try {
    return await api.seoDoctors(city, specialty === ALL_DOCTORS.slug ? undefined : specialty);
  } catch {
    return null;
  }
}

/**
 * Diksha's template copy for /{city}/doctors and /{city}/{specialty} (not locality pages), and whether
 * nobody is listed there yet (a clean empty page, kept out of the index).
 */
async function templatePage(city: string, specialty: string): Promise<{ page: SeoPage | null; empty: boolean }> {
  const stats = await loadStats(city, specialty);
  if (!stats) return { page: null, empty: false };
  return { page: specialty === ALL_DOCTORS.slug ? cityDoctorsPage(stats) : citySpecialtyPage(stats), empty: stats.total === 0 };
}

/** Filters and paging from the URL, applied on top of the page's own scope. */
export function queryFrom(params: SearchParams): Omit<DoctorQuery, 'city' | 'specialty'> {
  return {
    q: one(params.q)?.trim() || undefined,
    mode: one(params.mode) as DoctorQuery['mode'],
    area: one(params.area),
    language: one(params.language),
    availability: one(params.availability) as DoctorQuery['availability'],
    free: one(params.free) === 'true' || undefined,
    maxFee: num(params.maxFee),
    minExperience: num(params.minExperience),
    sort: (one(params.sort) as DoctorQuery['sort']) ?? 'relevance',
    page: num(params.page) ?? 1,
    limit: 10,
  };
}

/** Any filter or search makes a page a variant of its canonical listing. */
const isVariant = (params: SearchParams) => Object.keys(params).some((k) => params[k] !== undefined && k !== 'utm_source');

type Scope = { city: string; specialty: string; locality?: string };

export async function listingMetadata({ city, specialty: slug, locality }: Scope, params: SearchParams): Promise<Metadata> {
  const cityInfo = await resolveCity(city);
  const specialty = slug === ALL_DOCTORS.slug ? ALL_DOCTORS : await resolveSpecialty(slug);
  if (!specialty || !cityInfo) return {};
  const area = locality ? cityInfo.localities.find((l) => l.slug === locality) : undefined;
  const place = area ? `${area.name}, ${cityInfo.name}` : cityInfo.name;
  const q = one(params.q)?.trim();
  const path = `/${city}/${slug}${area ? `/${area.slug}` : ''}`;
  const template = !area && !q ? await templatePage(city, slug) : null;
  if (template?.page) {
    const page = template.page;
    return {
      title: { absolute: page.title },
      description: page.description,
      alternates: { canonical: page.canonical },
      ...(isVariant(params) ? { robots: { index: false, follow: true } } : {}),
      openGraph: { title: page.title, description: page.description, type: 'website', url: page.canonical },
    };
  }
  if (template?.empty) {
    const title = `${specialty.plural} in ${place} | Curxx`;
    const description = `No ${lower(specialty.plural)} in ${place} are listed on Curxx yet.`;
    return { title: { absolute: title }, description, alternates: { canonical: path }, robots: { index: false, follow: true }, openGraph: { title, description, type: 'website', url: path } };
  }
  const title = q
    ? `Doctors for ${q} in ${place} — Book Online or In-Clinic | Curxx`
    : `${specialty.plural} in ${place} — Book Online or In-Clinic | Curxx`;
  const description = q
    ? `Find doctors for ${q} in ${place}. Compare fees, experience and patient ratings, then book a video consult or a clinic visit on Curxx.`
    : `Book ${lower(specialty.plural)} in ${place} for a video consult or a clinic visit. Compare fees, experience and patient ratings, then confirm your slot on Curxx.`;
  // A locality with no doctors of this specialty yet is thin content: keep it out of the index.
  const empty = area && slug !== ALL_DOCTORS.slug ? (await loadContent(slug, city, area.slug))?.stats.doctors === 0 : false;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    // Filtered and searched views point to the clean listing rather than competing with it.
    ...(isVariant(params) || empty ? { robots: { index: false, follow: true } } : {}),
    openGraph: { title, description, type: 'website', url: path },
  };
}

export async function renderListing({ city, specialty: slug, locality }: Scope, params: SearchParams) {
  const cityInfo = (await resolveCity(city))!;
  const { specialties } = await liveCatalogue();
  const all = slug === ALL_DOCTORS.slug;
  const specialty = all ? ALL_DOCTORS : specialties.find((s) => s.slug === slug)!;
  const area = locality ? cityInfo.localities.find((l) => l.slug === locality) : undefined;
  const place = area ? `${area.name}, ${cityInfo.name}` : cityInfo.name;
  const filters = queryFrom(params);
  const q = filters.q;
  const basePath = `/${city}/${slug}`;

  const [local, content, templated] = await Promise.all([
    loadDoctors({ ...filters, city, specialty: slug, area: area?.name ?? filters.area }),
    all ? Promise.resolve(null) : loadContent(slug, city, area?.slug),
    area ? Promise.resolve(null) : templatePage(city, slug),
  ]);
  const template = templated?.page ?? null;
  // Nobody in this locality yet: show the nearest alternative — the same specialty across the city.
  const widened = Boolean(area) && local.total === 0 && !isVariant(params);
  const listing = widened ? await loadDoctors({ ...filters, city, specialty: slug }) : local;
  // Nobody listed at all (not just filtered out): a clean empty state that points somewhere that has doctors.
  const nobody = listing.total === 0 && !isVariant(params);
  const cityHasDoctors = nobody && !all ? ((await loadStats(city, ALL_DOCTORS.slug))?.total ?? 0) > 0 : false;
  const emptyAction = nobody
    ? cityHasDoctors
      ? { href: `/${city}/doctors`, label: `See all doctors in ${cityInfo.name}` }
      : { href: '/india/doctors', label: 'See doctors in other cities' }
    : area
      ? { href: basePath, label: `See all ${lower(specialty.plural)} in ${cityInfo.name}` }
      : undefined;

  const breadcrumbs: Crumb[] = [
    { label: 'Home', href: '/' },
    { label: cityInfo.name, href: `/${city}/specialties` },
    ...(area ? [{ label: specialty.plural, href: basePath }, { label: area.name }] : [{ label: specialty.plural }]),
  ];
  const heading = q ? `Doctors for “${q}” in ${place}` : `${specialty.plural} in ${place}`;
  const matched = listing.matchedSpecialties?.map((s) => specialties.find((sp) => sp.slug === s)?.plural).filter(Boolean).slice(0, 3) as string[] | undefined;
  const subheading = q
    ? `${listing.total.toLocaleString('en-IN')} doctors${matched?.length ? ` — ${matched.join(', ')}` : ''} · ${place}`
    : nobody
      ? `No ${lower(specialty.plural)} listed yet`
      : widened
        ? `No ${lower(specialty.plural)} listed in ${area!.name} yet — showing ${listing.total} across ${cityInfo.name}`
        : template?.subline;
  // Template copy describes the whole page, so filtered and paged views leave the intro out.
  const intro = template && !isVariant(params) ? <SeoIntro page={template} className="mt-5 pt-5 border-t border-[#E7E5E4]" /> : undefined;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.label, ...(c.href ? { item: c.href } : {}) })),
  };

  return (
    <>
      <JsonLd data={schema} />
      <DoctorListing
        {...listing}
        city={city}
        cityName={cityInfo.name}
        place={place}
        plural={q ? 'Doctors' : specialty.plural}
        heading={heading}
        subheading={subheading}
        resultsHeading={
          q ? `Best matches for “${q}”`
          : nobody ? `${specialty.plural} in ${place}`
          : widened ? `${specialty.plural} near ${area!.name}, ${cityInfo.name}`
          // "Top-rated" only when someone here has been rated.
          : listing.doctors.some(hasReviews) ? `Top-rated ${lower(specialty.plural)} available in ${place}`
          : `${specialty.plural} available in ${place}`
        }
        breadcrumbs={breadcrumbs}
        lockedArea={Boolean(area) && !widened}
        emptyAction={emptyAction}
        intro={intro}
      >
        {nobody ? null : template ? (
          <>
            <section className="bg-[#FAFAF9] border-y border-[#E7E5E4] py-12">
              <SeoBody page={template} className="w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop" />
            </section>
            {content ? (
              <InternalLinks content={content as SpecialtyContent} basePath={basePath} localities={(content as SpecialtyContent).localities} cityName={cityInfo.name} />
            ) : all ? (
              <BrowseLinks city={cityInfo} specialties={specialties} />
            ) : null}
          </>
        ) : content ? (
          <ListingSeoContent content={content as SpecialtyContent} basePath={basePath} />
        ) : all ? (
          <AllDoctorsContent city={cityInfo} specialties={specialties} total={listing.total} locality={area?.slug} />
        ) : null}
      </DoctorListing>
    </>
  );
}

/** Specialty and locality link grids under the /{city}/doctors template copy. */
function BrowseLinks({ city: cityInfo, specialties, locality }: { city: CityInfo; specialties: SpecialtyInfo[]; locality?: string }) {
  const { slug: city, name: cityName } = cityInfo;
  return (
    <section className="bg-[#FFFFFF] py-10">
      <div className="w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop space-y-8">
        <h2 className="font-headline-h2 text-headline-h2 text-[#1C1917]">Browse Doctors by Specialty</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-y-2 gap-x-4 text-caption font-caption">
          {specialties.map((s) => (
            <Link key={s.slug} href={`/${city}/${s.slug}${locality ? `/${locality}` : ''}`} className="text-[#78716C] hover:text-[#C1121F] transition-colors">
              {s.plural} in {cityName}
            </Link>
          ))}
          <Link href="/india/doctors" className="text-[#78716C] hover:text-[#C1121F] transition-colors">Doctors across India</Link>
        </div>
        <h3 className="font-headline-h3 text-headline-h3 text-[#1C1917]">Doctors by Locality in {cityName}</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-y-2 gap-x-4 text-caption font-caption">
          {cityInfo.localities.map((l) => (
            <Link key={l.slug} href={`/${city}/doctors/${l.slug}`} className="text-[#78716C] hover:text-[#C1121F] transition-colors">
              Doctors in {l.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/** /{city}/doctors: every specialty, with links into each. */
function AllDoctorsContent({ city: cityInfo, specialties, total, locality }: { city: CityInfo; specialties: SpecialtyInfo[]; total: number; locality?: string }) {
  const { slug: city, name: cityName } = cityInfo;
  return (
    <>
      <section className="bg-[#FAFAF9] border-y border-[#E7E5E4] py-12">
        <div className="w-full max-w-[900px] mx-auto px-6 space-y-4">
          <h2 className="font-headline-h2 text-headline-h2 text-[#1C1917]">Book Doctors in {cityName}</h2>
          <p className="text-body-default font-body-default text-[#5c403d] leading-relaxed">
            Curxx lists {total.toLocaleString('en-IN')} doctors in {cityName} across {specialties.length - 1} specialties. Compare consultation fees, years of experience and patient reviews, then book a clinic visit or a video consultation online.
          </p>
          <FaqAccordion faqs={allDoctorsFaqs(cityName, total)} heading={`Frequently Asked Questions About Doctors in ${cityName}`} className="pt-6" />
        </div>
      </section>
      <section className="bg-[#FFFFFF] py-10">
        <div className="w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop space-y-8">
          <h2 className="font-headline-h2 text-headline-h2 text-[#1C1917]">Browse Doctors by Specialty</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-y-2 gap-x-4 text-caption font-caption">
            {specialties.map((s) => (
              <Link key={s.slug} href={`/${city}/${s.slug}${locality ? `/${locality}` : ''}`} className="text-[#78716C] hover:text-[#C1121F] transition-colors">
                {s.plural} in {cityName}
              </Link>
            ))}
          </div>
          <h3 className="font-headline-h3 text-headline-h3 text-[#1C1917]">Doctors by Locality in {cityName}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-y-2 gap-x-4 text-caption font-caption">
            {cityInfo.localities.map((l) => (
              <Link key={l.slug} href={`/${city}/doctors/${l.slug}`} className="text-[#78716C] hover:text-[#C1121F] transition-colors">
                Doctors in {l.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
