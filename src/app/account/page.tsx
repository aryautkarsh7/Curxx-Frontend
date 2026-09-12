import type { Metadata } from 'next';
import Link from 'next/link';
import StaticPage from '@/components/StaticPage';

export const metadata: Metadata = { title: 'My Appointments | Curxx' };

const APPOINTMENTS = [
  { status: 'Upcoming', title: 'Dr. Priya Sharma', detail: 'Dermatology · Clinic visit · Manipal Hospital, HAL Airport Road', when: 'Today, 05:45 PM', primary: { label: 'Join Video Lobby', href: '/consult/lobby/cx-88421' }, secondary: { label: 'Reschedule', href: '/book' } },
  { status: 'Upcoming', title: 'Comprehensive Full Body Checkup', detail: 'Home sample collection · Fasting 10–12 hrs', when: 'Tomorrow, 06:30 AM', primary: { label: 'View Test Details', href: '/lab-tests/comprehensive-full-body-checkup' }, secondary: null },
  { status: 'Completed', title: 'Dr. Ananya Sen', detail: 'Cosmetic Dermatology · Video consult', when: '28 Aug 2026', primary: { label: 'View Prescription', href: '/records' }, secondary: { label: 'Book Follow-up', href: '/doctor/dr-ananya-sen' } },
];

export default function AccountPage() {
  return (
    <StaticPage title="My Appointments" intro="Your upcoming and recent consultations, lab tests and follow-ups.">
      <ul className="space-y-4">
        {APPOINTMENTS.map((a) => (
          <li key={a.title} className="p-5 rounded-xl border border-[#E7E5E4] bg-white space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
              <div className="space-y-1">
                <span className={`inline-block px-2 py-0.5 rounded-full text-micro font-micro ${a.status === 'Upcoming' ? 'bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857]' : 'bg-[#FAFAF9] border border-[#E7E5E4] text-[#78716C]'}`}>{a.status}</span>
                <h2 className="text-headline-h3 font-headline-h3 text-on-surface">{a.title}</h2>
                <p className="text-caption font-caption text-on-surface-variant">{a.detail}</p>
              </div>
              <p className="text-body-strong font-body-strong text-on-surface whitespace-nowrap">{a.when}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href={a.primary.href} className="h-10 px-4 inline-flex items-center rounded-lg bg-primary-container hover:bg-[#8E0E17] text-white font-caption-strong text-caption-strong">{a.primary.label}</Link>
              {a.secondary && <Link href={a.secondary.href} className="h-10 px-4 inline-flex items-center rounded-lg border border-[#E7E5E4] hover:bg-[#FAFAF9] text-[#1C1917] font-caption-strong text-caption-strong">{a.secondary.label}</Link>}
            </div>
          </li>
        ))}
      </ul>
      <Link href="/records" className="inline-flex items-center gap-1 text-caption-strong font-caption-strong text-[#D92D3A] hover:underline">
        View all health records <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
      </Link>
    </StaticPage>
  );
}
