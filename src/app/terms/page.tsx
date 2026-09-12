import type { Metadata } from 'next';
import StaticPage from '@/components/StaticPage';

export const metadata: Metadata = { title: 'Terms of Service | Curxx' };

const SECTIONS = [
  ['Using Curxx', 'Curxx connects patients with independently practising, verified doctors, pharmacies and diagnostic labs. Curxx does not itself provide medical advice.'],
  ['Not for emergencies', 'Do not use Curxx for medical emergencies. Call 108 or go to the nearest emergency department immediately.'],
  ['Bookings, payments and refunds', 'Appointments can be cancelled free of charge up to 2 hours before the scheduled time, with a full refund to the original payment method.'],
  ['Prescriptions and medicines', 'Prescription-only medicines are dispensed only against a valid prescription verified by a registered pharmacist.'],
  ['Changes to these terms', 'We may update these terms; continued use after an update means you accept the revised terms.'],
];

export default function TermsPage() {
  return (
    <StaticPage title="Terms of Service" intro="Last updated 1 September 2026. This is placeholder text for the Curxx prototype.">
      {SECTIONS.map(([heading, body]) => (
        <section key={heading} className="space-y-1.5">
          <h2 className="text-headline-h3 font-headline-h3 text-on-surface">{heading}</h2>
          <p className="text-body-default font-body-default text-on-surface-variant">{body}</p>
        </section>
      ))}
    </StaticPage>
  );
}
