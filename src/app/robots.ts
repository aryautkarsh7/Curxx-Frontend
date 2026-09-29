import type { MetadataRoute } from 'next';
import { isProductionSite } from '@/lib/site-env';

/** Production: crawl everything except private pages. Staging, previews and local: crawl nothing. */
export default function robots(): MetadataRoute.Robots {
  if (!isProductionSite()) return { rules: [{ userAgent: '*', disallow: '/' }] };
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/account', '/book', '/orders', '/records', '/login', '/register', '/cart', '/checkout', '/consult/lobby', '/consult/room'] }],
  };
}
