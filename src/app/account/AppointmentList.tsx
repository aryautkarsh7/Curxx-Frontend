'use client';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import RescheduleModal from '@/components/account/RescheduleModal';
import LoginModal from '@/components/LoginModal';
import { TableSkeleton } from '@/components/skeletons';
import { api, rupees, type Appointment } from '@/lib/api';
import { formatSlot } from '@/lib/booking';
import { getToken, useSession } from '@/lib/session';

type State = 'loading' | 'signed-out' | 'ready' | 'error';

export default function AppointmentList() {
  const session = useSession();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [state, setState] = useState<State>('loading');
  const [loginOpen, setLoginOpen] = useState(false);
  const [cancelling, setCancelling] = useState<string | null>(null);
  const [moving, setMoving] = useState<Appointment | null>(null);

  const load = useCallback(async () => {
    const token = getToken();
    if (!token) {
      setState('signed-out');
      return;
    }
    try {
      const { appointments: list } = await api.appointments(token);
      setAppointments(list);
      setState('ready');
    } catch {
      setState('error');
    }
  }, []);

  useEffect(() => {
    if (session.ready) void load();
  }, [session.ready, session.signedIn, load]);

  async function cancel(id: string) {
    const token = getToken();
    if (!token || !window.confirm('Cancel this appointment? The slot is released and any payment is refunded within 5–7 working days.')) return;
    setCancelling(id);
    try {
      await api.cancel(id, token);
      await load();
    } catch {
      setState('error');
    } finally {
      setCancelling(null);
    }
  }

  if (state === 'loading') return <TableSkeleton rows={3} />;

  if (state === 'signed-out') {
    return (
      <>
        <div className="p-6 rounded-xl border border-[#E7E5E4] bg-white text-center space-y-3">
          <span className="material-symbols-outlined text-[32px] text-[#78716C]">account_circle</span>
          <p className="font-body-default text-body-default text-on-surface-variant">Sign in to see your appointments, prescriptions and health records.</p>
          <button type="button" onClick={() => setLoginOpen(true)} className="h-11 px-6 inline-flex items-center rounded-lg bg-primary-container hover:bg-[#8E0E17] text-white font-caption-strong text-caption-strong">
            Sign in
          </button>
        </div>
        <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} onSignedIn={load} />
      </>
    );
  }

  if (state === 'error') {
    return (
      <div className="p-6 rounded-xl border border-[#F9C6C9] bg-[#FFF1F2] space-y-3">
        <p className="font-body-default text-body-default text-[#8E0E17]">We couldn&apos;t load your appointments just now.</p>
        <button type="button" onClick={() => { setState('loading'); void load(); }} className="h-10 px-4 inline-flex items-center rounded-lg bg-primary-container hover:bg-[#8E0E17] text-white font-caption-strong text-caption-strong">
          Try again
        </button>
      </div>
    );
  }

  if (appointments.length === 0) {
    return (
      <div className="p-6 rounded-xl border border-[#E7E5E4] bg-white text-center space-y-3">
        <span className="material-symbols-outlined text-[32px] text-[#78716C]">event_available</span>
        <p className="font-body-default text-body-default text-on-surface-variant">You have no appointments yet.</p>
        <Link href="/bangalore/doctors" className="h-11 px-6 inline-flex items-center rounded-lg bg-primary-container hover:bg-[#8E0E17] text-white font-caption-strong text-caption-strong">
          Find a doctor
        </Link>
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {appointments.map((a) => {
        const upcoming = a.status === 'confirmed' && new Date(a.startsAt) > new Date();
        const label = a.status === 'cancelled' ? 'Cancelled' : upcoming ? 'Upcoming' : 'Completed';
        return (
          <li key={a.id} className="p-5 rounded-xl border border-[#E7E5E4] bg-white space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
              <div className="space-y-1">
                <span className={`inline-block px-2 py-0.5 rounded-full text-micro font-micro ${upcoming ? 'bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857]' : 'bg-[#FAFAF9] border border-[#E7E5E4] text-[#78716C]'}`}>
                  {label}
                </span>
                <h2 className="text-headline-h3 font-headline-h3 text-on-surface">{a.doctor?.name ?? a.doctorSlug}</h2>
                <p className="text-caption font-caption text-on-surface-variant">
                  {a.mode === 'video' ? 'Video consult' : `Clinic visit · ${a.doctor?.clinicName ?? ''}${a.doctor?.area ? `, ${a.doctor.area}` : ''}`}
                  {' · '}
                  {rupees(a.amount)} · Ref {a.reference}
                </p>
              </div>
              <p className="text-body-strong font-body-strong text-on-surface whitespace-nowrap">{formatSlot(a.startsAt)}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {upcoming && a.mode === 'video' && (
                <Link href={`/consult/lobby/${a.id}`} className="h-10 px-4 inline-flex items-center rounded-lg bg-primary-container hover:bg-[#8E0E17] text-white font-caption-strong text-caption-strong">
                  Join Video Lobby
                </Link>
              )}
              {upcoming ? (
                <button type="button" onClick={() => setMoving(a)} className="h-10 px-4 inline-flex items-center rounded-lg border border-[#E7E5E4] hover:bg-[#FAFAF9] text-[#1C1917] font-caption-strong text-caption-strong">
                  Reschedule
                </button>
              ) : (
                <Link href={`/doctor/${a.doctorSlug}`} className="h-10 px-4 inline-flex items-center rounded-lg border border-[#E7E5E4] hover:bg-[#FAFAF9] text-[#1C1917] font-caption-strong text-caption-strong">
                  Book follow-up
                </Link>
              )}
              {a.status !== 'cancelled' && (
                <Link href={`/consult/room/${a.id}?panel=chat`} className="h-10 px-4 inline-flex items-center gap-1 rounded-lg border border-[#E7E5E4] hover:bg-[#FAFAF9] text-[#1C1917] font-caption-strong text-caption-strong">
                  <span className="material-symbols-outlined text-[18px]">chat</span>Message
                </Link>
              )}
              {upcoming && (
                <button
                  type="button"
                  onClick={() => cancel(a.id)}
                  disabled={cancelling === a.id}
                  className="h-10 px-4 inline-flex items-center rounded-lg border border-[#E7E5E4] hover:bg-[#FAFAF9] text-[#8E0E17] font-caption-strong text-caption-strong disabled:opacity-50"
                >
                  {cancelling === a.id ? 'Cancelling…' : 'Cancel'}
                </button>
              )}
            </div>
          </li>
        );
      })}
      <RescheduleModal
        appointment={moving}
        onClose={() => setMoving(null)}
        onDone={(updated) => { setMoving(null); setAppointments((prev) => prev.map((x) => (x.id === updated.id ? updated : x))); }}
      />
    </ul>
  );
}
