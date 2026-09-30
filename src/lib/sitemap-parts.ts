/**
 * The sitemap comes in files of at most 45,000 URLs (Google's limit is 50,000): /sitemap.xml is an index
 * that lists the files with something in them, served from app/sitemaps/sitemap.ts.
 */
import type { SitemapIndex } from '@/lib/api';

/** Files set aside for each list (6 × 45,000 = 270,000 doctors). Raise these if the counts ever pass them. */
export const MAX_PARTS = { doctors: 6, facilities: 2 } as const;

export type PartId = 'pages' | `doctors-${number}` | `facilities-${number}`;

export const ALL_PART_IDS: PartId[] = [
  'pages',
  ...Array.from({ length: MAX_PARTS.doctors }, (_, i) => `doctors-${i}` as const),
  ...Array.from({ length: MAX_PARTS.facilities }, (_, i) => `facilities-${i}` as const),
];

/** The files that have URLs in them right now. */
export function usedPartIds(index: SitemapIndex | null): PartId[] {
  if (!index) return ['pages'];
  const parts = (kind: 'doctors' | 'facilities') =>
    Math.min(MAX_PARTS[kind], Math.ceil(index.counts[kind] / index.partSize));
  return [
    'pages',
    ...Array.from({ length: parts('doctors') }, (_, i) => `doctors-${i}` as const),
    ...Array.from({ length: parts('facilities') }, (_, i) => `facilities-${i}` as const),
  ];
}

export const partUrl = (siteUrl: string, id: PartId) => `${siteUrl}/sitemaps/sitemap/${id}.xml`;
