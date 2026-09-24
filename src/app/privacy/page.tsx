import type { Metadata } from 'next';
import StaticPage from '@/components/StaticPage';
import type { LegalSection } from '@/lib/content-types';
import { items, loadSite } from '@/lib/site';

export const metadata: Metadata = { title: 'Privacy Policy | Curxx' };

/** Legal copy is edited in the admin panel (Page content → privacy). */
export default async function PrivacyPage() {
  const { sections } = await loadSite('privacy');
  const policy = sections['privacy/policy'];
  return (
    <StaticPage title={policy?.title || 'Privacy Policy'} intro={policy?.intro || undefined}>
      {items<LegalSection>(sections, 'privacy/policy').map(({ heading, body }) => (
        <section key={heading} className="space-y-1.5">
          <h2 className="text-headline-h3 font-headline-h3 text-on-surface">{heading}</h2>
          <p className="text-body-default font-body-default text-on-surface-variant">{body}</p>
        </section>
      ))}
    </StaticPage>
  );
}
