/**
 * Is this the public, indexable production site? Controls crawling (robots.txt, noindex).
 * Only an explicit APP_ENV=production opens the site to search engines; anything else (unset, staging,
 * development, and every Vercel preview) stays noindex. NODE_ENV can't tell: Vercel builds every
 * deployment with NODE_ENV=production. Set APP_ENV=production on the Production environment at launch.
 */
export function isProductionSite() {
  return process.env.APP_ENV?.trim().toLowerCase() === 'production';
}

/** Canonical origin: SITE_URL, then NEXT_PUBLIC_SITE_URL, then the Vercel production domain. */
export const SITE_URL = (process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || 'https://curxx-frontend.vercel.app').replace(/\/$/, '');
