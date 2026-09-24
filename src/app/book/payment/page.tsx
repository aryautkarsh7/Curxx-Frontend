'use client';
import { useRouter } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import BookingProgress from '@/components/BookingProgress';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import SlotCountdown, { clearSlotHold } from '@/components/SlotCountdown';
import { ApiError, api, rupees } from '@/lib/api';
import { clearDraft, formatSlot, getDraft, type BookingDraft } from '@/lib/booking';
import { getToken } from '@/lib/session';

const METHODS = [
  { id: 'upi', label: 'UPI', detail: 'GPay, PhonePe, Paytm', icon: 'qr_code_2' },
  { id: 'card', label: 'Card', detail: 'Visa, Mastercard, RuPay', icon: 'credit_card' },
  { id: 'clinic', label: 'Pay at clinic', detail: 'Settle at the reception desk', icon: 'payments' },
] as const;

function Payment() {
  const router = useRouter();
  const [draft, setDraft] = useState<BookingDraft | null>(null);
  const [method, setMethod] = useState<string>('upi');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const current = getDraft();
    if (!current?.patient) {
      router.replace('/doctors');
      return;
    }
    setDraft(current);
    if (current.mode === 'video') setMethod('upi');
  }, [router]);

  if (!draft?.patient) return <main className="w-full max-w-[760px] mx-auto px-4 py-16" aria-busy="true" />;

  const platformFee = 0;
  const total = draft.fee + platformFee;

  async function pay() {
    const token = getToken();
    if (!draft?.patient || !token) {
      router.replace('/doctors');
      return;
    }
    setBusy(true);
    setError('');
    try {
      const { appointment } = await api.book({ slotId: draft.slotId, patient: draft.patient, focus: draft.focus }, token);
      clearSlotHold();
      clearDraft();
      router.push(`/book/confirmed?ref=${appointment.reference}`);
    } catch (err) {
      setError(
        err instanceof ApiError && err.code === 'slot_unavailable'
          ? 'That slot was booked by someone else while you were paying. Nothing was charged — please pick another time.'
          : err instanceof ApiError && err.status === 401
            ? 'Your session expired. Please sign in again.'
            : 'Payment could not be completed. Please try again.',
      );
      setBusy(false);
    }
  }

  return (
    <main className="w-full max-w-[760px] mx-auto px-4 py-8 space-y-5 pb-24">
      <SlotCountdown />

      {/* ORDER SUMMARY */}
      <section className="bg-white border border-[#E7E5E4] rounded-2xl p-5 space-y-4 shadow-sm">
        <h1 className="font-headline-h2 text-headline-h2 text-[#1C1917]">Review and pay</h1>
        <dl className="space-y-2.5 font-body-default text-body-default">
          {[
            ['Doctor', draft.doctorName],
            ['When', formatSlot(draft.startsAt)],
            ['Type', draft.mode === 'video' ? 'Video consultation' : 'In-clinic visit'],
            ['Patient', `${draft.patient.name}${draft.patient.age ? `, ${draft.patient.age}` : ''}`],
          ].map(([label, value]) => (
            <div key={label} className="flex items-start justify-between gap-4">
              <dt className="text-[#78716C]">{label}</dt>
              <dd className="text-[#1C1917] font-body-strong text-right">{value}</dd>
            </div>
          ))}
        </dl>
        <div className="border-t border-[#E7E5E4] pt-3 space-y-2">
          <div className="flex items-center justify-between font-body-default text-body-default text-[#78716C]">
            <span>Consultation fee</span>
            <span>{rupees(draft.fee)}</span>
          </div>
          <div className="flex items-center justify-between font-body-default text-body-default text-[#78716C]">
            <span>Platform fee</span>
            <span className="text-[#047857]">Free</span>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-[#E7E5E4]">
            <span className="font-body-strong text-body-strong text-[#1C1917]">Total payable</span>
            <span className="font-display text-display text-[#1C1917]">{rupees(total)}</span>
          </div>
        </div>
      </section>

      {/* PAYMENT METHOD */}
      <section className="bg-white border border-[#E7E5E4] rounded-2xl p-5 space-y-3 shadow-sm">
        <h2 className="font-headline-h3 text-headline-h3 text-[#1C1917]">Payment method</h2>
        {METHODS.filter((m) => m.id !== 'clinic' || draft.mode === 'clinic').map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => setMethod(option.id)}
            className={`w-full flex items-center gap-3 p-3.5 rounded-xl border text-left transition ${
              method === option.id ? 'border-2 border-primary-container bg-[#FFF1F2]' : 'border-[#E7E5E4] bg-white hover:border-[#1C1917]'
            }`}
          >
            <span className="w-10 h-10 rounded-lg bg-[#FAFAF9] border border-[#E7E5E4] flex items-center justify-center text-[#78716C]">
              <span className="material-symbols-outlined text-[20px]">{option.icon}</span>
            </span>
            <span className="flex-1 min-w-0">
              <span className="block font-body-strong text-body-strong text-[#1C1917]">{option.label}</span>
              <span className="block font-caption text-caption text-[#78716C]">{option.detail}</span>
            </span>
            {method === option.id && <span className="material-symbols-outlined text-[20px] text-primary-container">check_circle</span>}
          </button>
        ))}
        <p className="font-micro text-micro text-[#78716C]">
          This is a prototype checkout — no card details are collected and no money moves. The appointment is created on Curxx immediately.
        </p>
      </section>

      {error && (
        <p role="alert" className="px-4 py-3 rounded-lg bg-[#FFF1F2] border border-[#F9C6C9] font-caption text-caption text-[#8E0E17]">{error}</p>
      )}

      <button
        type="button"
        onClick={pay}
        disabled={busy}
        className="w-full h-12 rounded-lg bg-[#C1121F] hover:bg-[#8E0E17] disabled:bg-[#A8A29E] text-white font-body-strong text-body-strong flex items-center justify-center gap-2 transition"
      >
        {busy ? 'Confirming…' : `Confirm and pay ${rupees(total)}`}
        <span className="material-symbols-outlined text-[18px]">lock</span>
      </button>
    </main>
  );
}

export default function PaymentPage() {
  return (
    <>
      <Header />
      <BookingProgress currentStep={3} />
      <Suspense fallback={<main className="w-full max-w-[760px] mx-auto px-4 py-16" aria-busy="true" />}>
        <Payment />
      </Suspense>
      <Footer />
    </>
  );
}
