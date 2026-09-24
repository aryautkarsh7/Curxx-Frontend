'use client';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { api, type Notification } from '@/lib/api';
import { getToken, useSession } from '@/lib/session';

/** "2h ago", "Yesterday", "3 days ago", or "in 2h" for upcoming items. */
function when(at: string) {
  const minutes = Math.round((Date.now() - new Date(at).getTime()) / 60_000);
  const abs = Math.abs(minutes);
  const [n, unit] = abs < 60 ? [abs, 'm'] : abs < 1440 ? [Math.round(abs / 60), 'h'] : [Math.round(abs / 1440), 'd'];
  if (unit === 'd' && n === 1) return minutes > 0 ? 'Yesterday' : 'Tomorrow';
  const label = unit === 'd' ? `${n} days` : `${Math.max(1, n)}${unit}`;
  return minutes >= 0 ? `${label} ago` : `in ${label}`;
}

export default function NotificationDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const session = useSession();
  // The signed-in patient's own notifications: appointments, reports, orders.
  const [notifications, setNotifications] = useState<Notification[] | null>(null);
  useEffect(() => {
    const token = getToken();
    if (!open || !session.signedIn || !token) return;
    let cancelled = false;
    api.notifications(token).then((r) => !cancelled && setNotifications(r.notifications)).catch(() => !cancelled && setNotifications([]));
    return () => {
      cancelled = true;
    };
  }, [open, session.signedIn]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
    <div className="fixed inset-0 z-[60]">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="absolute inset-0 bg-[rgba(28,25,23,0.45)]" onClick={onClose} aria-hidden="true" />
      <motion.aside initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', stiffness: 380, damping: 32 }} role="dialog" aria-modal="true" aria-label="Notifications" className="absolute right-0 top-0 h-full w-full max-w-sm bg-surface-container-lowest border-l border-[#E7E5E4] shadow-[0_8px_24px_rgba(0,0,0,0.12)] flex flex-col">
        <div className="flex items-center justify-between px-5 h-16 border-b border-[#E7E5E4]">
          <h2 className="font-headline-h3 text-headline-h3 text-[#1C1917]">Notifications</h2>
          <button type="button" onClick={onClose} aria-label="Close notifications" className="p-1 rounded-lg text-[#78716C] hover:bg-[#FAFAF9]">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>
        {!session.signedIn ? (
          <div className="flex-1 px-5 py-8 text-center space-y-3">
            <p className="font-caption text-caption text-[#78716C]">Sign in to see updates on your appointments, reports and orders.</p>
            <Link href="/login" onClick={onClose} className="inline-flex h-10 px-4 items-center rounded-lg bg-primary-container text-white font-caption-strong text-caption-strong">Sign in</Link>
          </div>
        ) : notifications === null ? (
          <ul className="flex-1 px-5 py-4 space-y-3" aria-busy="true">
            {[0, 1, 2].map((i) => <li key={i} className="h-14 rounded-lg bg-[#FAFAF9] animate-pulse" />)}
          </ul>
        ) : notifications.length === 0 ? (
          <p className="flex-1 px-5 py-8 text-center font-caption text-caption text-[#78716C]">You&apos;re all caught up.</p>
        ) : (
        <ul className="flex-1 overflow-y-auto divide-y divide-[#E7E5E4]">
          {notifications.map((n) => (
            <li key={n.id}>
              <Link href={n.href} onClick={onClose} className="flex gap-3 px-5 py-4 hover:bg-[#FAFAF9] transition">
                <span className="w-9 h-9 shrink-0 rounded-lg bg-[#FAFAF9] border border-[#E7E5E4] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px] text-[#78716C]">{n.icon}</span>
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block font-caption-strong text-caption-strong text-[#1C1917]">{n.title}</span>
                  <span className="block font-caption text-caption text-[#78716C]">{n.body}</span>
                  <span className="block font-micro text-micro text-[#A8A29E] mt-1">{when(n.at)}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        )}
      </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
