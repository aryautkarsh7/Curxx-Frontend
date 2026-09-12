import type { Metadata } from 'next';
import StaticPage from '@/components/StaticPage';

export const metadata: Metadata = { title: 'Privacy Policy | Curxx' };

const SECTIONS = [
  ['Information we collect', 'Account details you provide (name, mobile number, date of birth), consultation and booking history, prescriptions and reports you upload or sync from your ABHA health locker, and device information needed to run video consultations securely.'],
  ['How we use your information', 'To book and run consultations, deliver medicines and lab services, share records with doctors you explicitly authorise, send appointment reminders, and meet our obligations under Indian medical and data-protection law.'],
  ['Consent and sharing', 'Health records are shared only with the doctors, labs or hospitals you choose, for the duration you choose. You can revoke access at any time from Health Records → Manage Access.'],
  ['Security', 'Records are encrypted in transit and at rest. Access is logged and auditable, in line with the Digital Personal Data Protection (DPDP) Act, 2023 and ABDM guidelines.'],
  ['Your rights', 'You can view, correct, export or request deletion of your personal data by writing to our Grievance Officer at privacy@curxx.example.'],
];

export default function PrivacyPage() {
  return (
    <StaticPage title="Privacy Policy" intro="Last updated 1 September 2026. This is placeholder policy text for the Curxx prototype.">
      {SECTIONS.map(([heading, body]) => (
        <section key={heading} className="space-y-1.5">
          <h2 className="text-headline-h3 font-headline-h3 text-on-surface">{heading}</h2>
          <p className="text-body-default font-body-default text-on-surface-variant">{body}</p>
        </section>
      ))}
    </StaticPage>
  );
}
