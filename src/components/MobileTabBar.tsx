'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const TABS = [
  { href: '/', label: 'Home', icon: 'home' },
  { href: '/bangalore/doctors', label: 'Doctors', icon: 'stethoscope' },
  { href: '/triage', label: 'Triage', icon: 'smart_toy' },
  { href: '/medicines', label: 'Medicines', icon: 'local_pharmacy' },
  { href: '/records', label: 'Records', icon: 'folder_open' },
];

/** Thumb-reachable navigation for phones; desktop keeps the header nav. */
export default function MobileTabBar() {
  const pathname = usePathname();
  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <nav
      aria-label="Primary"
      className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-surface-container-lowest/95 backdrop-blur border-t border-surface-variant pb-[env(safe-area-inset-bottom)]"
    >
      <ul className="grid grid-cols-5">
        {TABS.map((tab) => {
          const active = isActive(tab.href);
          return (
            <li key={tab.href}>
              <Link
                href={tab.href}
                aria-current={active ? 'page' : undefined}
                className="relative flex flex-col items-center justify-center gap-0.5 h-16 px-1 text-on-surface-variant"
              >
                {active && (
                  <motion.span
                    layoutId="tabbar-active"
                    transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    className="absolute inset-x-3 top-1.5 h-8 rounded-full bg-[#FFF1F2]"
                  />
                )}
                <span className={`material-symbols-outlined relative text-[22px] leading-none ${active ? 'text-primary-container' : ''}`}>{tab.icon}</span>
                <span className={`relative text-micro font-micro ${active ? 'text-primary-container font-semibold' : ''}`}>{tab.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
