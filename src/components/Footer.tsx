import Link from 'next/link';

const SPECIALTY_LINKS = [
  { label: 'General Medicine', href: '/bangalore/general-physician' },
  { label: 'Dermatology & Cosmetology', href: '/bangalore/dermatologist' },
  { label: 'Pediatrics & Neonatology', href: '/bangalore/pediatrician' },
  { label: 'Obstetrics & Gynecology', href: '/bangalore/gynecologist' },
  { label: 'Orthopedics & Joint Care', href: '/bangalore/orthopedist' },
  { label: 'Cardiology & Vascular', href: '/bangalore/cardiologist' },
];

const NETWORK_LINKS = [
  { label: 'Emergency Care (108)', href: 'tel:108' },
  { label: 'Clinical Specialties', href: '/bangalore/dermatologist' },
  { label: 'Verified Doctors', href: '/bangalore/doctors' },
  { label: 'ABHA Integration', href: '/records' },
  { label: 'Teleconsultation Policy', href: '/teleconsultation-policy' },
  { label: 'Hospital Network', href: '/bangalore/hospitals' },
  { label: 'Clinics Near You', href: '/bangalore/clinics' },
];

const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Medical Council Regulations', href: '/teleconsultation-policy' },
];

const LINK_CLASS = 'hover:text-primary-container transition-colors duration-150';

function FooterLink({ label, href }: { label: string; href: string }) {
  return href.startsWith('tel:') ? (
    <a className={LINK_CLASS} href={href}>{label}</a>
  ) : (
    <Link className={LINK_CLASS} href={href}>{label}</Link>
  );
}

export default function Footer() {
  return (
    <footer className="w-full bg-surface-container-highest border-t border-surface-variant">
      <div className="w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop py-space-2xl space-y-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left Brand Column */}
          <div className="md:col-span-4 space-y-4">
            <Link className="flex flex-col" href="/">
              <div className="flex items-baseline tracking-tight">
                <span className="text-headline-h2 font-headline-h2 font-bold text-on-surface">cur</span>
                <span className="text-headline-h2 font-headline-h2 font-bold text-primary-container -ml-[1px]">xx</span>
              </div>
              <span className="text-caption font-caption text-on-surface-variant">Care, confirmed.</span>
            </Link>
            <p className="text-caption font-caption text-on-surface-variant max-w-sm">
              India&apos;s unified clinical telehealth network connecting patients with accredited practitioners, diagnostic labs, and 24/7 medical response.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-2.5 py-1 rounded bg-surface-container-lowest border border-surface-variant text-micro font-micro text-on-surface-variant">NABH Partner Network</span>
              <span className="px-2.5 py-1 rounded bg-surface-container-lowest border border-surface-variant text-micro font-micro text-on-surface-variant">ISO 27001 Certified</span>
              <span className="px-2.5 py-1 rounded bg-surface-container-lowest border border-surface-variant text-micro font-micro text-on-surface-variant">HIPAA Compliant</span>
            </div>
          </div>
          {/* Links Column 1: Clinical Specialties */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-caption-strong font-caption-strong text-on-surface uppercase tracking-wider">Clinical Specialties</div>
            <ul className="space-y-2 text-caption font-caption text-on-surface-variant">
              {SPECIALTY_LINKS.map((l) => <li key={l.label}><FooterLink {...l} /></li>)}
            </ul>
          </div>
          {/* Links Column 2: Patients & Doctors */}
          <div className="md:col-span-2 space-y-3">
            <div className="text-caption-strong font-caption-strong text-on-surface uppercase tracking-wider">Network Links</div>
            <ul className="space-y-2 text-caption font-caption text-on-surface-variant">
              {NETWORK_LINKS.map((l) => <li key={l.label}><FooterLink {...l} /></li>)}
            </ul>
          </div>
          {/* Emergency Support Contact Box */}
          <div className="md:col-span-3">
            <div className="p-5 rounded-xl border border-surface-variant bg-surface-container-lowest space-y-3">
              <div className="text-micro font-micro font-semibold text-primary-container uppercase tracking-wider">Medical Dispatch</div>
              <a className="block text-headline-h3 font-headline-h3 text-on-surface font-mono font-bold" href="tel:+918047190108">+91 80 4719 0108</a>
              <p className="text-micro font-micro text-on-surface-variant">
                Trained emergency medical coordinators standing by 24x7 across all major Indian metros.
              </p>
            </div>
          </div>
        </div>
        {/* Bottom Bar: Exact Copyright & Legal */}
        <div className="pt-8 border-t border-surface-variant flex flex-col sm:flex-row items-center justify-between text-caption font-caption text-on-surface-variant gap-4">
          <div>© 2025 Curxx Healthcare Technologies Pvt. Ltd. NHA &amp; ABHA Certified. 24x7 Medical Dispatch Active.</div>
          <div className="flex space-x-6">
            {LEGAL_LINKS.map((l) => <FooterLink key={l.label} {...l} />)}
          </div>
        </div>
      </div>
    </footer>
  );
}
