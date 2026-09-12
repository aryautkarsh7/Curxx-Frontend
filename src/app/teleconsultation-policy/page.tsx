import type { Metadata } from 'next';
import StaticPage from '@/components/StaticPage';

export const metadata: Metadata = { title: 'Teleconsultation Policy | Curxx' };

const SECTIONS = [
  ['Who you consult', 'Every doctor on Curxx is registered with the National Medical Commission or a State Medical Council, and their registration is verified before they can consult.'],
  ['What teleconsultation can and cannot do', 'Video and chat consultations follow the Telemedicine Practice Guidelines. Your doctor may ask you to visit a clinic in person if a physical examination is needed.'],
  ['Prescriptions', 'Doctors issue digitally signed e-prescriptions where clinically appropriate. Certain medicines cannot be prescribed over teleconsultation under the guidelines.'],
  ['Consent and records', 'Starting a consultation means you consent to it. Consultation notes and prescriptions are saved to your Health Records and can be pushed to your ABHA locker.'],
  ['Emergencies', 'Teleconsultation is not suitable for emergencies. For chest pain, breathing difficulty, severe bleeding or loss of consciousness, call 108 immediately.'],
];

export default function TeleconsultationPolicyPage() {
  return (
    <StaticPage title="Teleconsultation Policy" intro="How online consultations on Curxx work. Placeholder text for the prototype.">
      {SECTIONS.map(([heading, body]) => (
        <section key={heading} className="space-y-1.5">
          <h2 className="text-headline-h3 font-headline-h3 text-on-surface">{heading}</h2>
          <p className="text-body-default font-body-default text-on-surface-variant">{body}</p>
        </section>
      ))}
    </StaticPage>
  );
}
