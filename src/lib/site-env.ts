/**
 * Is this the public production site? Controls crawling (robots.txt, noindex) and canonical URLs.
 * NODE_ENV can't tell: Vercel builds every deployment, previews included, with NODE_ENV=production.
 * - APP_ENV (production | staging | development) wins when set.
 * - Otherwise Vercel's own VERCEL_ENV decides: only its "production" deployment is production.
 * - Anywhere else (local dev, a plain `next start`) counts as not production.
 */
export function isProductionSite() {
  const app = process.env.APP_ENV?.trim().toLowerCase();
  if (app) return app === 'production';
  return process.env.VERCEL_ENV === 'production';
}

/** Canonical origin: SITE_URL, then NEXT_PUBLIC_SITE_URL, then the Vercel production domain. */
export const SITE_URL = (process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || 'https://curxx-frontend.vercel.app').replace(/\/$/, '');
