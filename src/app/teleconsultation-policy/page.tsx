import type { Metadata } from 'next';
import StaticPage from '@/components/StaticPage';
import type { LegalSection } from '@/lib/content-types';
import { items, loadSite } from '@/lib/site';

export const metadata: Metadata = { title: 'Teleconsultation Policy | Curxx' };

/** Legal copy is edited in the admin panel (Page content → teleconsultation-policy). */
export default async function TeleconsultationPolicyPage() {
  const { sections } = await loadSite('teleconsultation-policy');
  const policy = sections['teleconsultation-policy/policy'];
  return (
    <StaticPage title={policy?.title || 'Teleconsultation Policy'} intro={policy?.intro || undefined}>
      {items<LegalSection>(sections, 'teleconsultation-policy/policy').map(({ heading, body }) => (
        <section key={heading} className="space-y-1.5">
          <h2 className="text-headline-h3 font-headline-h3 text-on-surface">{heading}</h2>
          <p className="text-body-default font-body-default text-on-surface-variant">{body}</p>
        </section>
      ))}
    </StaticPage>
  );
}
