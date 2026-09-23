'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, type MouseEvent } from 'react';
import { useEmergency } from '@/components/EmergencyModal';
import LoginModal from '@/components/LoginModal';
import NotificationDrawer from '@/components/NotificationDrawer';
import { isSignedIn, signOut, useSession } from '@/lib/session';

type NavLink = {
  label: string;
  href: string;
  /** Hidden on narrower desktops so the bar never overflows. */
  wide?: boolean;
  /** Other path prefixes that belong to this section. */
  also?: string[];
};

const NAV_LINKS: NavLink[] = [
  { label: 'Specialties', href: '/bangalore/dermatologist' },
  { label: 'Doctors', href: '/bangalore/doctors' },
  { label: 'ABHA ID', href: '/records' },
  { label: 'Medicines', href: '/medicines' },
  { label: 'Lab Tests', href: '/lab-tests' },
  { label: 'Labs', href: '/bangalore/labs', also: ['/lab/'] },
  { label: 'Partner With Us', href: '/partner-with-us', wide: true },
];

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

  const isActive = (href: string, also: string[] = []) => pathname === href || pathname.startsWith(`${href}/`) || also.some((p) => pathname.startsWith(p));

  // Phones dial 108 straight away; larger screens (no dialer) get the emergency modal.
  function handleEmergency(e: MouseEvent) {
    if (window.matchMedia('(min-width: 768px)').matches) {
      e.preventDefault();
      emergency.open();
    }
  }

  function handleAvatar() {
    if (isSignedIn()) router.push('/account');
    else setLoginOpen(true);
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
          <div className="flex items-center space-x-6">
            <Link className="flex flex-col group whitespace-nowrap" href="/">
              <div className="flex items-baseline tracking-tight">
                <span className="text-headline-h2 font-headline-h2 font-bold text-on-surface">cur</span>
                <span className="text-headline-h2 font-headline-h2 font-bold text-primary-container -ml-[1px]">xx</span>
              </div>
              <span className="text-micro font-micro text-on-surface-variant tracking-normal -mt-1">Care, confirmed.</span>
            </Link>
            {/* Location Selector Pill */}
            <div className="hidden xl:flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-surface-variant bg-surface-container-low hover:border-outline transition-colors cursor-pointer text-caption font-caption">
              <span className="material-symbols-outlined text-[16px] text-on-surface-variant">location_on</span>
              <span className="text-on-surface font-body-strong text-caption">Bengaluru, KA</span>
              <span className="material-symbols-outlined text-[16px] text-on-surface-variant">expand_more</span>
            </div>
          </div>
          {/* Center: Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6 whitespace-nowrap">
            {NAV_LINKS.map(navLink)}
          </nav>
          {/* Right: SOS Action & Profiles */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* 24/7 HELPLINE 108 Chip */}
            <a className="pulse-emergency flex items-center whitespace-nowrap space-x-1.5 px-3 py-1.5 rounded-lg bg-primary-container text-on-primary font-caption-strong text-caption hover:opacity-95 transition-opacity" href="tel:108" onClick={handleEmergency}>
              <span className="w-2 h-2 rounded-full bg-surface-container-lowest animate-pulse"></span>
              <span><span className="hidden sm:inline">24/7 HELPLINE: </span>108</span>
            </a>
            {/* Notification Bell */}
            <button type="button" aria-label="Notifications" aria-expanded={notificationsOpen} onClick={() => setNotificationsOpen((o) => !o)} className="hidden sm:block p-2 rounded-lg border border-surface-variant text-on-surface-variant hover:bg-surface-container-low transition-colors duration-150">
              <span className="material-symbols-outlined text-[20px]">notifications</span>
            </button>
            {/* User Profile Avatar */}
            <button type="button" aria-label="Account" onClick={handleAvatar} className="flex items-center space-x-2 sm:pl-2 cursor-pointer">
              <div className="w-9 h-9 rounded-lg border border-surface-variant bg-surface-container flex items-center justify-center text-caption-strong text-on-surface overflow-hidden">
                {session.user?.name ? (
                  <span className="font-caption-strong text-caption-strong text-primary-container uppercase">{session.user.name.trim().charAt(0)}</span>
                ) : (
                  <span className={`material-symbols-outlined text-[22px] ${session.signedIn ? 'text-primary-container' : 'text-on-surface-variant'}`}>account_circle</span>
                )}
              </div>
              <span className="material-symbols-outlined text-[16px] text-on-surface-variant hidden sm:block">expand_more</span>
            </button>
            {/* Mobile menu toggle */}
            <button type="button" aria-label="Menu" aria-expanded={mobileOpen} onClick={() => setMobileOpen((o) => !o)} className="lg:hidden p-2 rounded-lg border border-surface-variant text-on-surface-variant hover:bg-surface-container-low transition-colors duration-150">
              <span className="material-symbols-outlined text-[20px]">{mobileOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
        </div>
        {mobileOpen && (
          <nav className="lg:hidden border-t border-surface-variant bg-surface-container-lowest px-margin py-3 flex flex-col gap-3" onClick={() => setMobileOpen(false)}>
            {NAV_LINKS.map((item) => (
              <Link key={item.href} href={item.href} className={isActive(item.href, item.also) ? 'text-primary-container font-body-strong text-body-strong' : 'text-on-surface-variant font-body-default text-body-default'}>
                {item.label}
              </Link>
            ))}
            <button type="button" onClick={() => setNotificationsOpen(true)} className="sm:hidden text-left text-on-surface-variant font-body-default text-body-default">
              Notifications
            </button>
            {session.signedIn && (
              <button type="button" onClick={signOut} className="text-left text-on-surface-variant font-body-default text-body-default">
                Sign out
              </button>
            )}
          </nav>
        )}
      </header>
      <NotificationDrawer open={notificationsOpen} onClose={() => setNotificationsOpen(false)} />
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} onSignedIn={() => router.push('/account')} />
    </>
  );
}
