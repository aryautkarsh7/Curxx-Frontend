import Link from 'next/link';
import type { PartnerRole } from '@/lib/api';

type Card = {
  role: 'patient' | PartnerRole;
  title: string;
  text: string;
  icon: string;
};

export const PROFILE_TYPES: Card[] = [
  {
    role: 'patient',
    title: 'Patient',
    text: 'Book appointments, consult online, and manage your healthcare needs',
    icon: 'person',
  },
  {
    role: 'doctor',
    title: 'Doctor',
    text: 'Provide consultations, manage your digital practice, and treat patients',
    icon: 'stethoscope',
  },
  {
    role: 'hospital',
    title: 'Hospital Owner',
    text: 'Create a full hospital profile, list departments, and manage care services',
    icon: 'local_hospital',
  },
  {
    role: 'professional',
    title: 'Healthcare Professional',
    text: 'Join as a nurse, compounder, or specialist to connect with local patients',
    icon: 'medical_services',
  },
  {
    role: 'diagnostic',
    title: 'Diagnostic Center',
    text: 'List your pathology lab, tests, and home collection services efficiently',
    icon: 'biotech',
  },
];

const cardClass =
  'group flex items-start gap-4 w-full text-left p-4 rounded-xl border border-[#E7E5E4] bg-white hover:border-[#F9C6C9] hover:bg-[#FFF1F2] focus-visible:outline-2 focus-visible:outline-primary-container transition';

/**
 * Create account, step one: what kind of profile. Patients continue to the phone + OTP sign-up; the others
 * are partners and go to the partner page with their type picked.
 */
export default function ProfileTypePicker({
  onPatient,
  onLogin,
}: {
  onPatient: () => void;
  onLogin: () => void;
}) {
  return (
    <div className="space-y-5">
      <div className="text-center space-y-1">
        <h1 className="text-headline-h1 font-headline-h1 text-on-surface">Create your account</h1>
        <p className="text-caption font-caption text-on-surface-variant">
          Select the profile type that best describes you
        </p>
      </div>
      <ul className="space-y-3">
        {PROFILE_TYPES.map((card) => {
          const body = (
            <>
              <span className="w-11 h-11 shrink-0 rounded-lg bg-[#FFF1F2] border border-[#F9C6C9] flex items-center justify-center text-[#C1121F] group-hover:bg-white">
                <span className="material-symbols-outlined text-[24px]" aria-hidden="true">
                  {card.icon}
                </span>
              </span>
              <span className="flex-1 min-w-0">
                <span className="block font-body-strong text-body-strong text-on-surface">
                  {card.title}
                </span>
                <span className="block text-caption font-caption text-on-surface-variant mt-0.5">
                  {card.text}
                </span>
              </span>
              <span
                className="material-symbols-outlined text-[20px] text-outline self-center group-hover:text-[#C1121F]"
                aria-hidden="true"
              >
                chevron_right
              </span>
            </>
          );
          return (
            <li key={card.role}>
              {card.role === 'patient' ? (
                <button type="button" onClick={onPatient} className={cardClass}>
                  {body}
                </button>
              ) : (
                <Link href={`/partner-with-us?role=${card.role}#enquiry`} className={cardClass}>
                  {body}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
      <p className="text-center text-caption font-caption text-on-surface-variant">
        Already have an account?{' '}
        <button
          type="button"
          onClick={onLogin}
          className="font-caption-strong text-caption-strong text-primary-container hover:underline"
        >
          Log in
        </button>
      </p>
    </div>
  );
}
