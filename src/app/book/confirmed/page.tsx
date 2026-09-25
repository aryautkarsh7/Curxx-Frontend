'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import BookingProgress from '@/components/BookingProgress';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { api, rupees, type Appointment } from '@/lib/api';
import { formatSlot, modeLabel } from '@/lib/booking';
import { getToken } from '@/lib/session';

function Confirmation() {
  const reference = useSearchParams().get('ref');
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [state, setState] = useState<'loading' | 'ready' | 'missing'>('loading');

  useEffect(() => {
    const token = getToken();
    if (!token || !reference) {
      setState('missing');
      return;
    }
    let live = true;
    api
      .appointments(token)
      .then(({ appointments }) => {
        if (!live) return;
        const match = appointments.find((a) => a.reference === reference) ?? null;
        setAppointment(match);
        setState(match ? 'ready' : 'missing');
      })
      .catch(() => live && setState('missing'));
    return () => {
      live = false;
    };
  }, [reference]);

  if (state === 'loading') return <main className="w-full max-w-[680px] mx-auto px-4 py-16" aria-busy="true" />;

  if (state === 'missing' || !appointment) {
    return (
      <main className="w-full max-w-[680px] mx-auto px-4 py-16 text-center space-y-4">
        <h1 className="font-headline-h1 text-headline-h1 text-[#1C1917]">We couldn&apos;t find that booking</h1>
        <p className="font-body-default text-body-default text-[#78716C]">Sign in with the number you booked with to see your appointments.</p>
        <Link href="/account" className="inline-flex items-center gap-1.5 h-12 px-6 rounded-lg bg-[#C1121F] hover:bg-[#8E0E17] text-white font-body-strong text-body-strong transition">
          Go to my appointments
        </Link>
      </main>
    );
  }

  const isVideo = appointment.mode === 'video';
  const isPhone = appointment.mode === 'audio';

  return (
    <main className="w-full max-w-[680px] mx-auto px-4 py-8 space-y-5 pb-24">
      <section className="bg-white border border-[#E7E5E4] rounded-2xl p-6 text-center space-y-3 shadow-sm">
        <div className="w-14 h-14 mx-auto rounded-full bg-[#ECFDF5] border border-[#A7F3D0] flex items-center justify-center text-[#047857]">
          <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
        </div>
        <h1 className="font-headline-h1 text-headline-h1 text-[#1C1917]">Appointment confirmed</h1>
        <p className="font-body-default text-body-default text-[#78716C]">
          A confirmation has been sent to +91 {appointment.patient.phone}. Your booking reference is{' '}
          <span className="font-body-strong text-[#1C1917] tabular-nums">{appointment.reference}</span>.
        </p>
      </section>

      <section className="bg-white border border-[#E7E5E4] rounded-2xl p-5 space-y-3 shadow-sm">
        <h2 className="font-headline-h3 text-headline-h3 text-[#1C1917]">Visit details</h2>
        <dl className="space-y-2.5 font-body-default text-body-default">
          {[
            ['Doctor', appointment.doctor?.name ?? appointment.doctorSlug],
            ['When', formatSlot(appointment.startsAt)],
            ['Type', modeLabel(appointment.mode)],
            ['Where', isPhone ? `The doctor calls you on +91 ${appointment.patient.phone}` : isVideo ? 'Curxx video room (link opens 10 minutes before)' : `${appointment.doctor?.clinicName ?? ''}${appointment.doctor?.area ? `, ${appointment.doctor.area}` : ''}`],
            ['Patient', `${appointment.patient.name}${appointment.patient.age ? `, ${appointment.patient.age}` : ''}`],
            ['Paid', appointment.amount === 0 ? 'Free consultation' : rupees(appointment.amount)],
          ].map(([label, value]) => (
            <div key={label} className="flex items-start justify-between gap-4">
              <dt className="text-[#78716C]">{label}</dt>
              <dd className="text-[#1C1917] font-body-strong text-right">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <div className="flex flex-col sm:flex-row gap-3">
        {isPhone ? (
          <Link href={`/consult/room/${appointment.id}?panel=chat`} className="flex-1 h-12 rounded-lg bg-[#C1121F] hover:bg-[#8E0E17] text-white font-body-strong text-body-strong flex items-center justify-center gap-2 transition">
            <span className="material-symbols-outlined text-[18px]">chat</span>
            Message the doctor
          </Link>
        ) : isVideo ? (
          <Link href={`/consult/lobby/${appointment.id}`} className="flex-1 h-12 rounded-lg bg-[#C1121F] hover:bg-[#8E0E17] text-white font-body-strong text-body-strong flex items-center justify-center gap-2 transition">
            <span className="material-symbols-outlined text-[18px]">videocam</span>
            Open video lobby
          </Link>
        ) : (
          <Link href={`/doctor/${appointment.doctorSlug}`} className="flex-1 h-12 rounded-lg bg-[#C1121F] hover:bg-[#8E0E17] text-white font-body-strong text-body-strong flex items-center justify-center gap-2 transition">
            <span className="material-symbols-outlined text-[18px]">directions</span>
            Clinic details
          </Link>
        )}
        <Link href="/account" className="flex-1 h-12 rounded-lg border border-[#E7E5E4] bg-white hover:bg-[#FAFAF9] text-[#1C1917] font-body-strong text-body-strong flex items-center justify-center gap-2 transition">
          My appointments
        </Link>
      </div>
    </main>
  );
}

export default function ConfirmedPage() {
  return (
    <>
      <Header />
      <BookingProgress currentStep={4} />
      <Suspense fallback={<main className="w-full max-w-[680px] mx-auto px-4 py-16" aria-busy="true" />}>
        <Confirmation />
      </Suspense>
      <Footer />
    </>
  );
}
