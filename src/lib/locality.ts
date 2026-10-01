/** Locality pages need this many doctors to be indexed (fewer: noindex, follow). The API's sitemap uses the same rule. */
export const MIN_LOCALITY_DOCTORS = 3;
export const thinLocality = (doctors: number) => doctors < MIN_LOCALITY_DOCTORS;

/**
 * Where a "… by Locality" table row links: the locality page when Curxx has one, else the listing filtered
 * to that area (Doctar names some areas Curxx has no page for). `specialty` is "doctors" for all doctors.
 */
export const localityHref = (
  city: string,
  specialty: string,
  area: { name: string; slug?: string | null },
) =>
  area.slug
    ? `/${city}/${specialty}/${area.slug}`
    : `/${city}/${specialty}?area=${encodeURIComponent(area.name)}`;
