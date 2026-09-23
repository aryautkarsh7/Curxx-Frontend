'use client';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import AddressBook from '@/components/AddressBook';
import ProfileForm from '@/components/account/ProfileForm';
import SavedItems from '@/components/account/SavedItems';
import RequireSignIn from '@/components/RequireSignIn';
import OrderList from '@/app/orders/OrderList';
import { api } from '@/lib/api';
import { getToken, signOut, useSession } from '@/lib/session';
import AppointmentList from './AppointmentList';

const TABS = [
  { id: 'appointments', label: 'Appointments', icon: 'event_available' },
  { id: 'orders', label: 'Orders', icon: 'receipt_long' },
  { id: 'profile', label: 'Profile', icon: 'person' },
  { id: 'addresses', label: 'Addresses', icon: 'home_pin' },
  { id: 'saved', label: 'Saved', icon: 'bookmark' },
] as const;
type Tab = (typeof TABS)[number]['id'];

export default function AccountTabs() {
  return (
    <RequireSignIn title="Sign in to your account" body="See appointments, orders, saved doctors and your health profile." icon="account_circle">
      <Account />
    </RequireSignIn>
  );
}

function Account() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const session = useSession();
  const requested = params.get('tab') as Tab | null;
  const tab: Tab = TABS.some((t) => t.id === requested) ? requested! : 'appointments';
  const [summary, setSummary] = useState<{ upcomingAppointments: number; orders: number; records: number; activeGrants: number } | null>(null);

  useEffect(() => {
    const token = getToken();
    if (token) api.summary(token).then(setSummary).catch(() => {});
  }, [session.signedIn]);

  const go = (id: Tab) => router.replace(id === 'appointments' ? pathname : `${pathname}?tab=${id}`, { scroll: false });
  const user = session.user;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border border-[#E7E5E4] bg-white">
        <div className="flex items-center gap-4 min-w-0">
          <span className="w-14 h-14 rounded-full bg-[#FFF1F2] text-primary-container flex items-center justify-center font-headline-h2 text-headline-h2 uppercase shrink-0">
            {user?.name ? user.name.charAt(0) : <span className="material-symbols-outlined text-[28px]">person</span>}
          </span>
          <div className="min-w-0">
            <p className="font-headline-h3 text-headline-h3 text-[#1C1917] truncate">{user?.name || 'Add your name'}</p>
            <p className="font-caption text-caption text-[#78716C]">+91 {user?.phone}{user?.abhaId ? ` · ABHA ${user.abhaId}` : ''}</p>
          </div>
        </div>
        <button type="button" onClick={() => { signOut(); router.push('/'); }} className="h-10 px-4 rounded-lg border border-[#E7E5E4] text-[#1C1917] font-caption-strong text-caption-strong self-start sm:self-auto">Sign out</button>
      </div>

      {summary && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Upcoming visits', value: summary.upcomingAppointments, href: `${pathname}` },
            { label: 'Orders', value: summary.orders, href: `${pathname}?tab=orders` },
            { label: 'Health records', value: summary.records, href: '/records' },
            { label: 'Active shares', value: summary.activeGrants, href: '/records/access' },
          ].map((s) => (
            <Link key={s.label} href={s.href} className="p-4 rounded-xl border border-[#E7E5E4] bg-white hover:border-[#A8A29E]">
              <p className="font-headline-h2 text-headline-h2 text-[#1C1917] tabular-nums">{s.value}</p>
              <p className="font-caption text-caption text-[#78716C]">{s.label}</p>
            </Link>
          ))}
        </div>
      )}

      <div role="tablist" aria-label="Account sections" className="flex gap-2 overflow-x-auto no-scrollbar border-b border-[#E7E5E4]">
        {TABS.map((t) => (
          <button key={t.id} type="button" role="tab" aria-selected={tab === t.id} onClick={() => go(t.id)} className={`flex items-center gap-1.5 px-3 py-2.5 whitespace-nowrap border-b-2 -mb-px font-body-default text-body-default ${tab === t.id ? 'border-primary-container text-primary-container font-body-strong' : 'border-transparent text-[#78716C] hover:text-[#1C1917]'}`}>
            <span className="material-symbols-outlined text-[18px]">{t.icon}</span>{t.label}
          </button>
        ))}
      </div>

      <div role="tabpanel">
        {tab === 'appointments' && <AppointmentList />}
        {tab === 'orders' && <OrderList />}
        {tab === 'profile' && <ProfileForm />}
        {tab === 'addresses' && <div className="max-w-2xl"><AddressBook /></div>}
        {tab === 'saved' && <SavedItems />}
      </div>
    </div>
  );
}
