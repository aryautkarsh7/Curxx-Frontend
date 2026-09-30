import { api } from '@/lib/api';
import { SITE_URL } from '@/lib/site-env';
import { partUrl, usedPartIds } from '@/lib/sitemap-parts';

/** Rebuilt hourly from the API. */
export const revalidate = 3600;

/** The sitemap index: one entry per sitemap file that has URLs in it (see lib/sitemap-parts.ts). */
export async function GET() {
  const index = await api.sitemapIndex().catch(() => null);
  const files = usedPartIds(index).map((id) => `  <sitemap><loc>${partUrl(SITE_URL, id)}</loc></sitemap>`);
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${files.join('\n')}\n</sitemapindex>\n`;
  return new Response(xml, { headers: { 'content-type': 'application/xml; charset=utf-8' } });
}
