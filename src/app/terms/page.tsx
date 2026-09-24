import type { Metadata } from 'next';
import StaticPage from '@/components/StaticPage';
import type { LegalSection } from '@/lib/content-types';
import { items, loadSite } from '@/lib/site';

export const metadata: Metadata = { title: 'Terms of Service | Curxx' };

/** Legal copy is edited in the admin panel (Page content → terms). */
export default async function TermsPage() {
  const { sections } = await loadSite('terms');
  const policy = sections['terms/policy'];
  return (
    <StaticPage title={policy?.title || 'Terms of Service'} intro={policy?.intro || undefined}>
      {items<LegalSection>(sections, 'terms/policy').map(({ heading, body }) => (
        <section key={heading} className="space-y-1.5">
          <h2 className="text-headline-h3 font-headline-h3 text-on-surface">{heading}</h2>
          <p className="text-body-default font-body-default text-on-surface-variant">{body}</p>
        </section>
      ))}
    </StaticPage>
  );
}
