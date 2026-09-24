/**
 * Shapes of the editable page sections (admin panel → Website → Page content). The copy itself lives
 * in the database; homepage and Partner copy follow the SEO content spec word for word, and heading
 * levels are fixed by the components that render these, not by the data.
 */

export type { Faq } from './api';

/** A content band: eyebrow, H2, body, proof points and a CTA (homepage spec sections 2, 5, 6, 7). */
export type Band = {
  id: string;
  eyebrow: string;
  heading: string;
  body: string;
  icon: string;
  cta: { label: string; href: string };
  points?: string[];
};

/** A B2B programme (spec sections 8–10), shown on the homepage and Partner With Us. */
export type PartnerSection = Band & { points: string[] };

/** A homepage care-ecosystem card. `{city}` in href and `{accreditedFacilities}` in body are filled in. */
export type ServiceCard = { eyebrow: string; title: string; body: string; icon: string; cta: string; href: string; anchor?: string };

/** A "How Curxx Works" step. */
export type Step = { title: string; body: string; footnote?: string };

/** Icon + title + body, e.g. Curxx Plus benefits and the pharmacy trust strip. */
export type Feature = { icon: string; title: string; body: string; tone?: 'tertiary' | 'primary' | 'neutral' };

/** One section of a legal page. */
export type LegalSection = { heading: string; body: string };
