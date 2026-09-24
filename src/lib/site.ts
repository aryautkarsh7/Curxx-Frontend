/**
 * Editable website data from the admin panel: settings (claims, links, images), live counts and page
 * sections. Every loader falls back to empty data, so an API outage hides a section or a number
 * rather than breaking the page.
 */
import { api, type ContentSection, type SiteSettings, type SiteStats } from './api';

export type SiteData = { settings: SiteSettings; stats: SiteStats | null; sections: Record<string, ContentSection> };

/** Settings, counts and the sections of the given pages (e.g. 'home', 'shared'). */
export async function loadSite(...pages: string[]): Promise<SiteData> {
  const [settings, stats, sections] = await Promise.all([
    api.siteSettings().then((r) => r.settings).catch(() => ({})),
    api.siteStats().then((r) => r.stats).catch(() => null),
    pages.length ? api.content(...pages).then((r) => r.sections).catch(() => ({})) : Promise.resolve({}),
  ]);
  return { settings, stats, sections };
}

/** A section's entries, or [] when it is missing, unpublished or the API is down. */
export const items = <T>(sections: Record<string, ContentSection>, key: string): T[] => (sections[key]?.items as T[] | undefined) ?? [];

/** Images editors haven't set (or an outage) fall back to our own copies in /public/images. */
export const IMAGE_FALLBACKS = {
  'image-home-hero': '/images/home-hero.jpg',
  'image-lab-tests-hero': '/images/lab-tests-hero.jpg',
  'image-clinic-interior': '/images/clinic-interior.jpg',
} as const;
export const image = (settings: SiteSettings, key: keyof typeof IMAGE_FALLBACKS) => settings[key] || IMAGE_FALLBACKS[key];

/**
 * A count rounded down for "N+" copy, so it stays true as numbers move: 3,241 → "3,200+", 205 → "200+".
 * Null when the count is unknown, so callers can leave the number out.
 */
export function countLabel(n: number | null | undefined): string | null {
  if (n == null || n <= 0) return null;
  const step = n >= 1000 ? 100 : n >= 100 ? 10 : 1;
  const floor = Math.floor(n / step) * step;
  return `${floor.toLocaleString('en-IN')}${n >= 10 ? '+' : ''}`;
}

/**
 * Fills `{name}` placeholders in editable copy. A placeholder without a value is dropped together
 * with the space after it: "at {n} accredited" → "at accredited" would read badly, so write copy
 * that still reads well without the number.
 */
export function fill(template: string, values: Record<string, string | number | null | undefined>) {
  return template.replace(/\{(\w+)\}( ?)/g, (_match, key: string, space: string) => {
    const value = values[key];
    return value == null || value === '' ? '' : `${value}${space}`;
  });
}

/** Text with `**bold**` spans, split for rendering. */
export const boldParts = (text: string) => text.split(/\*\*(.+?)\*\*/g).map((part, i) => ({ text: part, bold: i % 2 === 1 })).filter((p) => p.text);
