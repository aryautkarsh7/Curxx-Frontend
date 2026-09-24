'use client';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useCallback, useEffect, useState } from 'react';
import BookingProgress from '@/components/BookingProgress';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import LoginModal from '@/components/LoginModal';
import { formatHold, startSlotHold, useSlotHold } from '@/components/SlotCountdown';
import { ApiError, api, photo, rupees, type Doctor, type Slot } from '@/lib/api';
import { formatSlot, saveDraft } from '@/lib/booking';
import { getToken, isSignedIn } from '@/lib/session';
import BookingSkeleton from './BookingSkeleton';

function SelectSlot() {
  const router = useRouter();
  const params = useSearchParams();
  const slotId = params.get('slot');
  const doctorSlug = params.get('doctor');
  // "Consult now" arrives with a mode instead of a slot: take that doctor's earliest one.
  const wantedMode = params.get('mode') === 'video' ? 'video' : params.get('mode') === 'clinic' ? 'clinic' : null;
  const focus = params.get('focus') ?? '';

  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(slotId);
  const remaining = useSlotHold();

  useEffect(() => {
    if (!doctorSlug) {
      setLoading(false);
      return;
    }
    let live = true;
    (async () => {
      try {
        const [{ doctor: d }, { slots: s }] = await Promise.all([api.doctor(doctorSlug), api.slots(doctorSlug)]);
        if (!live) return;
        setDoctor(d);
        setSlots(s);
        if (!slotId && wantedMode) setSelectedId(s.find((x) => x.mode === wantedMode)?.id ?? null);
      } catch {
        if (live) setError('We could not load this doctor. Please try again.');
      } finally {
        if (live) setLoading(false);
      }
    })();
    return () => {
      live = false;
    };
  }, [doctorSlug]);

  const selected = slots.find((s) => s.id === selectedId) ?? null;

  const proceed = useCallback(async () => {
    if (!selected || !doctor) return;
    const token = getToken();
    if (!token) {
      setLoginOpen(true);
      return;
    }
    setBusy(true);
    setError('');
    try {
      const hold = await api.holdSlot(selected.id, token);
      startSlotHold(hold.expiresAt);
      saveDraft({
        slotId: selected.id,
        doctorSlug: doctor.slug,
        doctorName: doctor.name,
        startsAt: selected.startsAt,
        mode: selected.mode,
        fee: selected.fee,
        focus,
      });
      router.push(`/book/patient-details?slot=${selected.id}`);
    } catch (err) {
      setError(
        err instanceof ApiError && err.code === 'slot_unavailable'
          ? 'Someone just took that slot. Please pick another time.'
          : 'We could not hold that slot. Please try again.',
      );
      if (err instanceof ApiError && err.code === 'slot_unavailable') {
        const { slots: fresh } = await api.slots(doctor.slug);
        setSlots(fresh);
        setSelectedId(null);
      }
    } finally {
      setBusy(false);
    }
  }, [doctor, router, selected]);

  if (loading) return <BookingSkeleton />;

  if (!doctorSlug || !doctor) {
    return (
      <main className="w-full max-w-[900px] mx-auto px-4 py-16 text-center space-y-4">
        <h1 className="font-headline-h1 text-headline-h1 text-[#1C1917]">Pick a doctor first</h1>
        <p className="font-body-default text-body-default text-[#78716C]">Choose a doctor and a time slot, then come back here to confirm.</p>
        <Link href="/doctors" className="inline-flex items-center gap-1.5 h-12 px-6 rounded-lg bg-[#C1121F] hover:bg-[#8E0E17] text-white font-body-strong text-body-strong transition">
          Browse verified doctors
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </Link>
      </main>
    );
  }

  const byDay = slots
    .filter((s) => (selected ? s.mode === selected.mode : true))
    .reduce<Record<string, Slot[]>>((acc, slot) => {
      const key = new Date(slot.startsAt).toDateString();
      (acc[key] ??= []).push(slot);
      return acc;
    }, {});

  return (
    <>
      <main className="w-full max-w-[900px] mx-auto px-4 py-8 space-y-6 pb-36">
        {/* DOCTOR SUMMARY CARD */}
        <div className="bg-white rounded-2xl border border-[#E7E5E4] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="relative flex-shrink-0">
              <img loading="lazy" decoding="async" alt={doctor.name} className="w-16 h-16 rounded-full object-cover border border-[#E7E5E4]" src={photo(doctor.photoUrl, 128)} />
              <div className="absolute -bottom-1 -right-1 bg-white p-0.5 rounded-full shadow-xs">
                <span className="material-symbols-outlined text-[#047857] text-[18px] block" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-headline-h3 font-headline-h3 text-[#1C1917]">{doctor.name}</h1>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857] text-micro font-micro font-semibold">
                  <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  NMC Verified
                </span>
              </div>
              <p className="text-caption-strong font-caption-strong text-[#5c403d] mt-0.5">{doctor.title} · {doctor.experienceYears} Yrs Exp</p>
              <div className="flex items-center gap-2 mt-1 text-caption font-caption text-[#78716C] flex-wrap">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px] text-[#78716C]">apartment</span>
                  {doctor.clinicName.includes(doctor.area) ? doctor.clinicName : `${doctor.clinicName}, ${doctor.area}`}
                </span>
                <span className="text-[#E7E5E4]">•</span>
                <span className="inline-flex items-center gap-1 font-caption-strong text-caption-strong text-[#047857]">
                  <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  {doctor.recommendPercent}% ({doctor.reviewCount.toLocaleString('en-IN')} consults)
                </span>
              </div>
            </div>
          </div>
          <div className="sm:text-right border-t sm:border-t-0 pt-3 sm:pt-0 border-[#E7E5E4] flex sm:flex-col justify-between sm:justify-center items-end">
            <span className="font-caption text-caption text-[#78716C]">{selected?.mode === 'video' ? 'Video consult' : 'Clinic visit'}</span>
            <span className="font-display text-display text-[#1C1917]">{selected?.fee === 0 ? 'Free' : rupees(selected?.fee ?? doctor.fee)}</span>
          </div>
        </div>

        {error && (
          <p role="alert" className="px-4 py-3 rounded-lg bg-[#FFF1F2] border border-[#F9C6C9] font-caption text-caption text-[#8E0E17]">{error}</p>
        )}

        {/* SLOT PICKER */}
        <div className="bg-white rounded-2xl border border-[#E7E5E4] p-5 space-y-5 shadow-sm">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <h2 className="font-headline-h3 text-headline-h3 text-[#1C1917]">Confirm your time slot</h2>
            {remaining !== null && remaining > 0 && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FFF1F2] border border-[#F9C6C9] font-caption-strong text-caption-strong text-[#C1121F]">
                <span className="material-symbols-outlined text-[16px]">timer</span>
                Held {formatHold(remaining)}
              </span>
            )}
          </div>

          {Object.entries(byDay).slice(0, 3).map(([day, daySlots]) => (
            <div key={day} className="space-y-2">
              <div className="font-caption-strong text-caption-strong text-[#78716C]">
                {new Date(day).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' })}
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {daySlots.map((slot) => (
                  <button
                    key={slot.id}
                    type="button"
                    onClick={() => setSelectedId(slot.id)}
                    className={
                      selectedId === slot.id
                        ? 'bg-[#FFF1F2] border-2 border-primary-container text-primary-container font-headline-h3 font-bold py-3 rounded-lg text-center shadow-xs flex items-center justify-center gap-1.5 transition ring-1 ring-primary-container'
                        : 'border border-[#E7E5E4] bg-white hover:border-[#1C1917] py-3 rounded-lg text-center font-body-strong text-body-strong text-[#1C1917] transition shadow-xs'
                    }
                  >
                    {new Date(slot.startsAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true }).toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          ))}

          {slots.length === 0 && (
            <p className="font-body-default text-body-default text-[#78716C]">
              This doctor has no open slots in the next 7 days.{' '}
              <Link href={`/${doctor.city ?? 'bangalore'}/${doctor.specialty}`} className="text-[#C1121F] hover:underline">See other {doctor.specialty.replace('-', ' ')}s</Link>.
            </p>
          )}
        </div>
      </main>

      {/* STICKY CONFIRM BAR */}
      <div className="fixed bottom-16 lg:bottom-0 inset-x-0 bg-white border-t border-[#E7E5E4] shadow-[0_-4px_16px_rgba(0,0,0,0.06)] z-40">
        <div className="w-full max-w-[900px] mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="font-caption text-caption text-[#78716C]">{selected ? 'Selected slot' : 'Pick a time to continue'}</div>
            <div className="font-body-strong text-body-strong text-[#1C1917] truncate">
              {selected ? formatSlot(selected.startsAt) : `${doctor.name}, ${doctor.area}`}
            </div>
          </div>
          <button
            type="button"
            onClick={proceed}
            disabled={!selected || busy}
            className="h-12 px-6 rounded-lg bg-[#C1121F] hover:bg-[#8E0E17] disabled:bg-[#A8A29E] text-white font-body-strong text-body-strong flex items-center gap-2 transition whitespace-nowrap"
          >
            {busy ? 'Holding…' : isSignedIn() ? 'Continue' : 'Sign in to continue'}
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </div>

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} onSignedIn={proceed} />
    </>
  );
}

export default function BookingStepOne() {
  return (
    <>
      <Header />
      <BookingProgress currentStep={1} />
      <Suspense fallback={<BookingSkeleton />}>
        <SelectSlot />
      </Suspense>
      <Footer />
    </>
  );
}
