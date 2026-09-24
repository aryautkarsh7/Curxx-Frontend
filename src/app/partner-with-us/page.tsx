import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import PartnerSections from '@/components/PartnerSections';
import TrustStrip from '@/components/TrustStrip';

const TITLE = 'Partner With Curxx — For Doctors, Clinics, Hospitals & Corporates';
const DESCRIPTION =
  'Grow your practice with Curxx Pro, run your hospital OPD on Curxx Insta, or roll out cashless OPD benefits for your employees. List your clinic and get patients booking online and in person.';

export const metadata: Metadata = {
  title: `${TITLE} | Curxx`,
  description: DESCRIPTION,
  alternates: { canonical: '/partner-with-us' },
  openGraph: { title: TITLE, description: DESCRIPTION, url: '/partner-with-us', type: 'website' },
};

const JUMP_LINKS = [
  { href: '#doctors-clinics', label: 'Doctors & clinics' },
  { href: '#hospitals', label: 'Hospitals' },
  { href: '#corporates', label: 'Corporates' },
];

const STEPS = [
  ['Share your details', 'Tell us about your practice, clinic or hospital — registration number, specialties and locations.'],
  ['Get verified', 'Our clinical compliance cell validates your registration against the relevant State Medical Council register.'],
  ['Go live', 'Your profile, OPD slots and teleconsultation availability go live for patients across India.'],
];

export default function PartnerWithUsPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-surface-container-low">
      <section className="bg-surface-container-lowest border-b border-surface-variant">
        <div className="w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop py-12 sm:py-16 space-y-5">
          <span className="text-micro font-micro font-semibold uppercase tracking-wider text-on-surface-variant">Partner With Us</span>
          <h1 className="text-display font-display text-on-surface max-w-3xl">Doctor ya clinic owner ho? Apni practice grow karo Curxx ke saath</h1>
          <p className="text-body-default font-body-default text-on-surface-variant max-w-2xl">
            Curxx brings you patients who want both ways of seeing a doctor — a 60-second video consult or a confirmed in-clinic slot. You keep one dashboard for
            scheduling, digital billing, e-prescriptions and reminders, whether the patient walks in or dials in.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <a
              href="mailto:partners@curxx.example?subject=Partner%20with%20Curxx"
              className="inline-flex items-center gap-1.5 h-12 px-6 rounded-lg bg-primary-container hover:bg-[#8E0E17] text-white font-body-strong text-body-strong transition"
            >
              Request a callback
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </a>
            <Link
              href="/doctors"
              className="inline-flex items-center gap-1.5 h-12 px-6 rounded-lg border border-surface-variant bg-surface-container-lowest hover:bg-surface-container text-on-surface font-body-strong text-body-strong transition"
            >
              See how profiles look
            </Link>
          </div>
          <nav aria-label="Jump to a section" className="flex flex-wrap gap-2 pt-2">
            {JUMP_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 rounded-full border border-surface-variant bg-surface-container-low text-caption-strong font-caption-strong text-on-surface-variant hover:text-on-surface transition"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <PartnerSections eyebrow="Partner programmes" title="Choose the programme built for you" />

      <TrustStrip />

      <section className="w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop py-space-2xl space-y-8">
        <h2 className="text-headline-h1 font-headline-h1 text-on-surface">How Onboarding Works</h2>
        <ol className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS.map(([heading, body], index) => (
            <li key={heading} className="p-6 rounded-2xl border border-surface-variant bg-surface-container-lowest space-y-2">
              <span className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-caption-strong font-caption-strong text-primary-container tabular-nums">
                {index + 1}
              </span>
              <h3 className="text-headline-h3 font-headline-h3 text-on-surface">{heading}</h3>
              <p className="text-caption font-caption text-on-surface-variant">{body}</p>
            </li>
          ))}
        </ol>
        <div className="p-6 sm:p-7 rounded-2xl border border-[#F9C6C9] bg-[#FFF1F2] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="text-headline-h3 font-headline-h3 text-on-surface">Ready to list your practice?</p>
            <p className="text-body-default font-body-default text-on-surface-variant">Write to partners@curxx.example and our onboarding team will call you back within one working day.</p>
          </div>
          <a
            href="mailto:partners@curxx.example?subject=Partner%20with%20Curxx"
            className="inline-flex items-center justify-center gap-1.5 h-12 px-6 rounded-lg bg-primary-container hover:bg-[#8E0E17] text-white font-body-strong text-body-strong transition whitespace-nowrap"
          >
            Contact the team
            <span className="material-symbols-outlined text-[18px]">mail</span>
          </a>
        </div>
      </section>
      </main>
      <Footer />
    </>
  );
}
