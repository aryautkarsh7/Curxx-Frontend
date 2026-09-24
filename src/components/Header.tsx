'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState, type MouseEvent } from 'react';
import CityPicker from '@/components/CityPicker';
import { useEmergency } from '@/components/EmergencyModal';
import LoginModal from '@/components/LoginModal';
import NotificationDrawer from '@/components/NotificationDrawer';
import { useCity } from '@/lib/city-store';
import { isSignedIn, signOut, useSession } from '@/lib/session';

type NavLink = {
  label: string;
  href: string;
  /** Hidden on narrower desktops so the bar never overflows. */
  wide?: boolean;
  /** Other path prefixes that belong to this section. */
  also?: string[];
  /** Only in the phone menu; desktop reaches it from the sub-nav and footer. */
  mobileOnly?: boolean;
};

/** Section links follow the chosen city. */
const navLinks = (city: string): NavLink[] => [
  { label: 'Specialties', href: `/${city}/specialties` },
  { label: 'Doctors', href: `/${city}/doctors`, also: ['/doctor/'] },
  { label: 'Surgeries', href: `/${city}/surgeries`, also: [`/${city}/surgery/`], wide: true },
  { label: 'ABHA ID', href: '/records', mobileOnly: true },
  { label: 'Medicines', href: '/medicines' },
  { label: 'Lab Tests', href: '/lab-tests' },
  { label: 'Labs', href: `/${city}/labs`, also: ['/lab/'], wide: true },
];

/** Partner With Us opens a menu of the four programmes. */
export const PARTNER_MENU = [
  { label: 'Curxx Plus', href: '/curxx-plus', icon: 'family_restroom', hint: 'Unlimited consults for your family' },
  { label: 'For Doctors & Clinics', href: '/partner-with-us#doctors-clinics', icon: 'stethoscope', hint: 'Curxx Pro & Curxx Desk' },
  { label: 'For Hospitals', href: '/partner-with-us#hospitals', icon: 'local_hospital', hint: 'Curxx Insta HIMS' },
  { label: 'For Corporates', href: '/partner-with-us#corporates', icon: 'work', hint: 'Employee health plans' },
];

function PartnerMenu({ active }: { active: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (e: globalThis.MouseEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', esc);
    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('keydown', esc);
    };
  }, [open]);
  return (
    <div ref={ref} className="relative hidden xl:block" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button type="button" aria-expanded={open} aria-haspopup="menu" onClick={() => setOpen((o) => !o)} className={`${active ? ACTIVE_LINK : INACTIVE_LINK} inline-flex items-center gap-0.5`}>
        Partner With Us
        <span className={`material-symbols-outlined text-[16px] transition-transform ${open ? 'rotate-180' : ''}`}>expand_more</span>
      </button>
      {open && (
        <div role="menu" className="absolute right-0 top-full pt-2 z-50">
          <div className="w-72 rounded-xl border border-surface-variant bg-surface-container-lowest shadow-[0_8px_24px_rgba(0,0,0,0.12)] p-2">
            {PARTNER_MENU.map((item) => (
              <Link key={item.href} role="menuitem" href={item.href} onClick={() => setOpen(false)} className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-surface-container-low">
                <span className="w-9 h-9 rounded-lg bg-[#FFF1F2] text-primary-container flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                </span>
                <span>
                  <span className="block font-caption-strong text-caption-strong text-on-surface">{item.label}</span>
                  <span className="block font-micro text-micro text-on-surface-variant">{item.hint}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/** "Karnataka" → "KA" for the compact location pill. */
const STATE_CODES: Record<string, string> = { Karnataka: 'KA', Maharashtra: 'MH', Delhi: 'DL', Telangana: 'TS', 'Tamil Nadu': 'TN', 'West Bengal': 'WB', Gujarat: 'GJ', Rajasthan: 'RJ', Jharkhand: 'JH', 'Uttar Pradesh': 'UP', Chandigarh: 'CH', Kerala: 'KL', 'Madhya Pradesh': 'MP', Bihar: 'BR', Haryana: 'HR', 'Andhra Pradesh': 'AP', Odisha: 'OD', Assam: 'AS' };
const stateCode = (state: string) => STATE_CODES[state] ?? state;

const ACTIVE_LINK = 'text-primary-container border-b-2 border-primary-container font-body-strong text-body-strong pb-1';
const INACTIVE_LINK = 'text-on-surface-variant hover:text-primary-container transition-colors duration-150 font-body-default text-body-default pb-1';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const emergency = useEmergency();
  const [mobileOpen, setMobileOpen] = useState(false);
  const session = useSession();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!accountOpen) return;
    const close = (e: globalThis.MouseEvent) => !accountRef.current?.contains(e.target as Node) && setAccountOpen(false);
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [accountOpen]);
  const openAuth = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setAccountOpen(false);
    setLoginOpen(true);
  };
  const [cityOpen, setCityOpen] = useState(false);
  const { city, cityName, locality, state } = useCity();
  const NAV_LINKS = navLinks(city);
  const partnerActive = pathname.startsWith('/partner-with-us') || pathname.startsWith('/curxx-plus') || pathname.startsWith('/for-providers');

  const isActive = (href: string, also: string[] = []) => pathname === href || pathname.startsWith(`${href}/`) || also.some((p) => pathname.startsWith(p));

  // Phones dial 108 straight away; larger screens (no dialer) get the emergency modal.
  function handleEmergency(e: MouseEvent) {
    if (window.matchMedia('(min-width: 768px)').matches) {
      e.preventDefault();
      emergency.open();
    }
  }

  // Signed out, the avatar opens a small menu: Log in or Create account.
  function handleAvatar() {
    if (isSignedIn()) router.push('/account');
    else setAccountOpen((o) => !o);
  }

  const navLink = (item: NavLink) => (
    <Link key={item.href} className={`${isActive(item.href, item.also) ? ACTIVE_LINK : INACTIVE_LINK}${item.wide ? ' hidden xl:inline-block' : ''}`} href={item.href}>
      {item.label}
    </Link>
  );

  return (
    <>
      <header className="docked full-width top-0 sticky z-50 bg-surface-container-lowest border-b border-surface-variant shadow-sm">
        <div className="w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop flex items-center justify-between gap-3 h-16">
          {/* Left: Logo & Location */}
          <div className="flex items-center space-x-4 xl:space-x-6 shrink-0">
            <Link className="flex flex-col group whitespace-nowrap" href="/">
              <div className="flex items-baseline tracking-tight">
                <span className="text-headline-h2 font-headline-h2 font-bold text-on-surface">cur</span>
                <span className="text-headline-h2 font-headline-h2 font-bold text-primary-container -ml-[1px]">xx</span>
              </div>
              <span className="text-micro font-micro text-on-surface-variant tracking-normal -mt-1">Care, confirmed.</span>
            </Link>
            {/* Location Selector Pill */}
            <button type="button" onClick={() => setCityOpen(true)} aria-label={`Location: ${locality ? `${locality.name}, ` : ''}${cityName}. Change location`} className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-surface-variant bg-surface-container-low hover:border-outline transition-colors cursor-pointer text-caption font-caption max-w-[150px] xl:max-w-[210px]">
              <span className="material-symbols-outlined text-[16px] text-on-surface-variant">location_on</span>
              <span className="text-on-surface font-body-strong text-caption truncate">{locality ? `${locality.name}, ${cityName}` : cityName}<span className="hidden xl:inline">{locality ? '' : `, ${stateCode(state)}`}</span></span>
              <span className="material-symbols-outlined text-[16px] text-on-surface-variant">expand_more</span>
            </button>
          </div>
          {/* Center: Navigation Links */}
          <nav aria-label="Main" className="hidden lg:flex items-center space-x-5 whitespace-nowrap">
            {NAV_LINKS.filter((l) => !l.mobileOnly).map(navLink)}
            <PartnerMenu active={partnerActive} />
          </nav>
          {/* Right: SOS Action & Profiles */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* 24/7 HELPLINE 108 Chip */}
            <a className="pulse-emergency flex items-center whitespace-nowrap space-x-1.5 px-3 py-1.5 rounded-lg bg-primary-container text-on-primary font-caption-strong text-caption hover:opacity-95 transition-opacity" href="tel:108" onClick={handleEmergency}>
              <span className="w-2 h-2 rounded-full bg-surface-container-lowest animate-pulse"></span>
              <span><span className="hidden sm:inline lg:hidden">24/7 HELPLINE: </span>108</span>
            </a>
            {/* Notification Bell */}
            <button type="button" aria-label="Notifications" aria-expanded={notificationsOpen} onClick={() => setNotificationsOpen((o) => !o)} className="hidden sm:block p-2 rounded-lg border border-surface-variant text-on-surface-variant hover:bg-surface-container-low transition-colors duration-150">
              <span className="material-symbols-outlined text-[20px]">notifications</span>
            </button>
            {/* User Profile Avatar */}
            <div ref={accountRef} className="relative">
            <button type="button" aria-label="Account" onClick={handleAvatar} aria-haspopup={session.signedIn ? undefined : 'menu'} aria-expanded={session.signedIn ? undefined : accountOpen} className="flex items-center space-x-2 sm:pl-2 cursor-pointer">
              <div className="w-9 h-9 rounded-lg border border-surface-variant bg-surface-container flex items-center justify-center text-caption-strong text-on-surface overflow-hidden">
                {session.user?.name ? (
                  <span className="font-caption-strong text-caption-strong text-primary-container uppercase">{session.user.name.trim().charAt(0)}</span>
                ) : (
                  <span className={`material-symbols-outlined text-[22px] ${session.signedIn ? 'text-primary-container' : 'text-on-surface-variant'}`}>account_circle</span>
                )}
              </div>
              <span className="material-symbols-outlined text-[16px] text-on-surface-variant hidden sm:block">expand_more</span>
            </button>
            {accountOpen && !session.signedIn && (
              <div role="menu" className="absolute right-0 top-full mt-2 w-60 rounded-xl border border-surface-variant bg-surface-container-lowest shadow-[0_8px_24px_rgba(0,0,0,0.12)] p-2 z-50">
                <p className="px-2.5 pt-1 pb-2 font-micro text-micro text-on-surface-variant">Appointments, prescriptions and your ABHA locker</p>
                <button type="button" role="menuitem" onClick={() => openAuth('login')} className="w-full flex items-center gap-2.5 p-2.5 rounded-lg hover:bg-surface-container-low text-left">
                  <span className="material-symbols-outlined text-[20px] text-primary-container">login</span>
                  <span className="font-caption-strong text-caption-strong text-on-surface">Log in</span>
                </button>
                <button type="button" role="menuitem" onClick={() => openAuth('register')} className="w-full flex items-center gap-2.5 p-2.5 rounded-lg hover:bg-surface-container-low text-left">
                  <span className="material-symbols-outlined text-[20px] text-primary-container">person_add</span>
                  <span className="font-caption-strong text-caption-strong text-on-surface">Create account</span>
                </button>
              </div>
            )}
            </div>
            {/* Mobile menu toggle */}
            <button type="button" aria-label="Menu" aria-expanded={mobileOpen} onClick={() => setMobileOpen((o) => !o)} className="lg:hidden p-2 rounded-lg border border-surface-variant text-on-surface-variant hover:bg-surface-container-low transition-colors duration-150">
              <span className="material-symbols-outlined text-[20px]">{mobileOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
        </div>
        {mobileOpen && (
          <nav aria-label="Main" className="lg:hidden border-t border-surface-variant bg-surface-container-lowest px-margin py-3 flex flex-col gap-3" onClick={() => setMobileOpen(false)}>
            <button type="button" onClick={() => setCityOpen(true)} className="flex items-center gap-1.5 text-left text-on-surface font-body-strong text-body-strong">
              <span className="material-symbols-outlined text-[18px] text-primary-container">location_on</span>
              {locality ? `${locality.name}, ${cityName}` : cityName}
              <span className="text-caption font-caption text-primary-container ml-1">Change</span>
            </button>
            {NAV_LINKS.map((item) => (
              <Link key={item.href} href={item.href} className={isActive(item.href, item.also) ? 'text-primary-container font-body-strong text-body-strong' : 'text-on-surface-variant font-body-default text-body-default'}>
                {item.label}
              </Link>
            ))}
            <p className="pt-2 border-t border-surface-variant text-micro font-micro uppercase tracking-wider text-on-surface-variant">Partner With Us</p>
            {PARTNER_MENU.map((item) => (
              <Link key={item.href} href={item.href} className="text-on-surface-variant font-body-default text-body-default pl-2">
                {item.label}
              </Link>
            ))}
            <button type="button" onClick={() => setNotificationsOpen(true)} className="sm:hidden text-left text-on-surface-variant font-body-default text-body-default">
              Notifications
            </button>
            {session.signedIn ? (
              <button type="button" onClick={signOut} className="text-left text-on-surface-variant font-body-default text-body-default">
                Sign out
              </button>
            ) : (
              <div className="flex gap-2 pt-1">
                <button type="button" onClick={() => openAuth('login')} className="flex-1 h-10 rounded-lg border border-surface-variant font-caption-strong text-caption-strong text-on-surface">Log in</button>
                <button type="button" onClick={() => openAuth('register')} className="flex-1 h-10 rounded-lg bg-primary-container text-white font-caption-strong text-caption-strong">Register</button>
              </div>
            )}
          </nav>
        )}
      </header>
      <CityPicker open={cityOpen} onClose={() => setCityOpen(false)} />
      <NotificationDrawer open={notificationsOpen} onClose={() => setNotificationsOpen(false)} />
      <LoginModal open={loginOpen} initialMode={authMode} onClose={() => setLoginOpen(false)} onSignedIn={() => router.push('/account')} />
    </>
  );
}
