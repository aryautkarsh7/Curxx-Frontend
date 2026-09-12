'use client';
import Link from 'next/link';
import { useEffect } from 'react';

const NOTIFICATIONS = [
  {
    icon: 'event_available',
    title: 'Appointment today at 05:45 PM',
    body: 'Dr. Priya Sharma · Clinic visit, Manipal Hospital, HAL Airport Road',
    time: '2h ago',
    href: '/account',
  },
  {
    icon: 'science',
    title: 'Lab report ready',
    body: 'Comprehensive Health Checkup results were added to your ABHA locker',
    time: 'Yesterday',
    href: '/records/reports',
  },
  {
    icon: 'medication',
    title: 'Refill reminder',
    body: 'AccuDerm 20mg — about 3 days of supply left',
    time: '2 days ago',
    href: '/medicines/accuderm-20mg',
  },
];

export default function NotificationDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0 bg-[rgba(28,25,23,0.45)]" onClick={onClose} aria-hidden="true" />
      <aside role="dialog" aria-modal="true" aria-label="Notifications" className="absolute right-0 top-0 h-full w-full max-w-sm bg-surface-container-lowest border-l border-[#E7E5E4] shadow-[0_8px_24px_rgba(0,0,0,0.12)] flex flex-col">
        <div className="flex items-center justify-between px-5 h-16 border-b border-[#E7E5E4]">
          <h2 className="font-headline-h3 text-headline-h3 text-[#1C1917]">Notifications</h2>
          <button type="button" onClick={onClose} aria-label="Close notifications" className="p-1 rounded-lg text-[#78716C] hover:bg-[#FAFAF9]">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>
        <ul className="flex-1 overflow-y-auto divide-y divide-[#E7E5E4]">
          {NOTIFICATIONS.map((n) => (
            <li key={n.title}>
              <Link href={n.href} onClick={onClose} className="flex gap-3 px-5 py-4 hover:bg-[#FAFAF9] transition">
                <span className="w-9 h-9 shrink-0 rounded-lg bg-[#FAFAF9] border border-[#E7E5E4] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px] text-[#78716C]">{n.icon}</span>
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block font-caption-strong text-caption-strong text-[#1C1917]">{n.title}</span>
                  <span className="block font-caption text-caption text-[#78716C]">{n.body}</span>
                  <span className="block font-micro text-micro text-[#A8A29E] mt-1">{n.time}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
