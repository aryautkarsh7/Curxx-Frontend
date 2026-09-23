'use client';
import { useRouter } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import BookingProgress from '@/components/BookingProgress';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import SlotCountdown from '@/components/SlotCountdown';
import { api, rupees } from '@/lib/api';
import { formatSlot, getDraft, saveDraft, type BookingDraft } from '@/lib/booking';
import { getToken, getUser, setSession } from '@/lib/session';

async function refreshProfile(token: string, name: string) {
  try {
    const { user } = await api.updateProfile({ name }, token);
    setSession(token, user);
  } catch {
    // Cosmetic only — the booking carries the patient name regardless.
  }
}

const FIELD = 'w-full h-11 px-3 bg-white border border-[#E7E5E4] rounded-lg font-body-default text-body-default text-[#1C1917] placeholder-[#A8A29E] outline-none focus:border-primary-container focus:ring-2 focus:ring-[rgba(193,18,31,0.15)]';
const LABEL = 'font-caption-strong text-caption-strong text-[#1C1917]';

function PatientDetails() {
  const router = useRouter();
  const [draft, setDraft] = useState<BookingDraft | null>(null);
  const [ready, setReady] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'female' | 'male' | 'other'>('female');
  const [forSelf, setForSelf] = useState(true);

  useEffect(() => {
    const current = getDraft();
    if (!current) {
      router.replace('/bangalore/doctors');
      return;
    }
    const user = getUser();
    setDraft(current);
    setName(current.patient?.name ?? user?.name ?? '');
    setPhone(current.patient?.phone ?? user?.phone ?? '');
    setAge(current.patient?.age ? String(current.patient.age) : '');
    setGender((current.patient?.gender as 'female' | 'male' | 'other') ?? 'female');
    setReady(true);
  }, [router]);

  if (!ready || !draft) return <main className="w-full max-w-[760px] mx-auto px-4 py-16" aria-busy="true" />;

  const valid = name.trim().length >= 2 && /^[6-9]\d{9}$/.test(phone.replace(/\D/g, ''));

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid || !draft) return;
    saveDraft({
      ...draft,
      patient: {
        name: name.trim(),
        phone: phone.replace(/\D/g, ''),
        ...(age ? { age: Number(age) } : {}),
        gender,
      },
    });
    // First booking for yourself also names the account, so the header and future
    // forms are prefilled. Failure here must not block checkout.
    const token = getToken();
    if (forSelf && token && !getUser()?.name) void refreshProfile(token, name.trim());
    router.push(`/book/payment?slot=${draft.slotId}`);
  }

  return (
    <main className="w-full max-w-[760px] mx-auto px-4 py-8 space-y-5 pb-24">
      <div className="bg-white border border-[#E7E5E4] rounded-2xl p-5 flex items-center justify-between gap-4 shadow-sm flex-wrap">
        <div>
          <div className="font-caption text-caption text-[#78716C]">{draft.mode === 'video' ? 'Video consultation' : 'Clinic visit'} with</div>
          <div className="font-headline-h3 text-headline-h3 text-[#1C1917]">{draft.doctorName}</div>
          <div className="font-caption text-caption text-[#78716C] mt-0.5">{formatSlot(draft.startsAt)}</div>
        </div>
        <div className="font-display text-display text-[#1C1917]">{rupees(draft.fee)}</div>
      </div>

      <SlotCountdown />

      <form onSubmit={submit} className="bg-white border border-[#E7E5E4] rounded-2xl p-5 space-y-5 shadow-sm">
        <div className="space-y-1">
          <h1 className="font-headline-h2 text-headline-h2 text-[#1C1917]">Who is this appointment for?</h1>
          <p className="font-caption text-caption text-[#78716C]">These details go on the prescription, so use the patient&apos;s legal name.</p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {[
            { value: true, label: 'Myself' },
            { value: false, label: 'Someone else' },
          ].map((option) => (
            <button
              key={option.label}
              type="button"
              onClick={() => {
                setForSelf(option.value);
                const user = getUser();
                if (option.value && user) {
                  setName(user.name || name);
                  setPhone(user.phone);
                } else {
                  setName('');
                }
              }}
              className={
                forSelf === option.value
                  ? 'h-11 rounded-lg bg-[#FFF1F2] border-2 border-primary-container text-primary-container font-caption-strong text-caption-strong'
                  : 'h-11 rounded-lg border border-[#E7E5E4] bg-white hover:border-[#1C1917] text-[#1C1917] font-caption text-caption'
              }
            >
              {option.label}
            </button>
          ))}
        </div>

        <label className="block space-y-1.5">
          <span className={LABEL}>Full name</span>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Patient's full name" className={FIELD} autoFocus={!forSelf} />
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="block space-y-1.5">
            <span className={LABEL}>Mobile number</span>
            <div className="flex items-center h-11 bg-white border border-[#E7E5E4] rounded-lg focus-within:border-primary-container focus-within:ring-2 focus-within:ring-[rgba(193,18,31,0.15)]">
              <span className="px-3 font-body-strong text-body-strong text-[#1C1917] border-r border-[#E7E5E4]">+91</span>
              <input
                inputMode="numeric"
                maxLength={10}
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                placeholder="XXXXX XXXXX"
                className="flex-1 min-w-0 px-3 bg-transparent font-body-default text-body-default text-[#1C1917] placeholder-[#A8A29E] outline-none tabular-nums"
              />
            </div>
          </label>
          <label className="block space-y-1.5">
            <span className={LABEL}>Age</span>
            <input inputMode="numeric" maxLength={3} value={age} onChange={(e) => setAge(e.target.value.replace(/\D/g, ''))} placeholder="Years" className={FIELD} />
          </label>
        </div>

        <fieldset className="space-y-2">
          <legend className={LABEL}>Gender</legend>
          <div className="flex flex-wrap gap-2">
            {(['female', 'male', 'other'] as const).map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setGender(value)}
                className={
                  gender === value
                    ? 'h-10 px-5 rounded-lg bg-[#FFF1F2] border-2 border-primary-container text-primary-container font-caption-strong text-caption-strong capitalize'
                    : 'h-10 px-5 rounded-lg border border-[#E7E5E4] bg-white hover:border-[#1C1917] text-[#1C1917] font-caption text-caption capitalize'
                }
              >
                {value}
              </button>
            ))}
          </div>
        </fieldset>

        <button
          type="submit"
          disabled={!valid}
          className="w-full h-12 rounded-lg bg-[#C1121F] hover:bg-[#8E0E17] disabled:bg-[#A8A29E] text-white font-body-strong text-body-strong flex items-center justify-center gap-2 transition"
        >
          Continue to payment
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>
      </form>
    </main>
  );
}

export default function PatientDetailsPage() {
  return (
    <>
      <Header />
      <BookingProgress currentStep={2} />
      <Suspense fallback={<main className="w-full max-w-[760px] mx-auto px-4 py-16" aria-busy="true" />}>
        <PatientDetails />
      </Suspense>
      <Footer />
    </>
  );
}
