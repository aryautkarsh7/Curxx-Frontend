/**
 * Is this the public, indexable production site? Controls crawling (robots.txt, noindex).
 * APP_ENV decides when set: only APP_ENV=production opens the site to search engines. When APP_ENV is
 * unset, VERCEL_ENV decides (only the Vercel Production deployment is indexable; previews are not).
 * NODE_ENV can't tell: Vercel builds every deployment with NODE_ENV=production.
 * Keep APP_ENV=staging on the Vercel Production environment until launch.
 */
export function isProductionSite() {
  const appEnv = process.env.APP_ENV?.trim().toLowerCase();
  if (appEnv) return appEnv === 'production';
  return process.env.VERCEL_ENV?.trim().toLowerCase() === 'production';
}

/** Canonical origin: SITE_URL, then NEXT_PUBLIC_SITE_URL, then the Vercel production domain. */
export const SITE_URL = (
  process.env.SITE_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  'https://curxx-frontend.vercel.app'
).replace(/\/$/, '');
