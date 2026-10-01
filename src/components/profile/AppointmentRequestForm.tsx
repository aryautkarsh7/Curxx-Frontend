'use client';
import { useMemo, useState } from 'react';
import { ApiError, api, type Practice } from '@/lib/api';

type Time = 'any' | 'morning' | 'afternoon' | 'evening';
const TIMES: { value: Time; label: string }[] = [
  { value: 'any', label: 'Any time' },
  { value: 'morning', label: 'Morning' },
  { value: 'afternoon', label: 'Afternoon' },
  { value: 'evening', label: 'Evening' },
];

/** The next 14 days as YYYY-MM-DD (Indian time) with a short label, e.g. "Thu, 2 Oct". */
export function nextDays(from = new Date(), count = 14) {
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(from.getTime() + i * 24 * 60 * 60 * 1000);
    const value = d.toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
    const label = d.toLocaleDateString('en-IN', {
      timeZone: 'Asia/Kolkata',
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    });
    return { value, label: i === 0 ? `Today, ${label}` : i === 1 ? `Tomorrow, ${label}` : label };
  });
}

const field =
  'w-full h-10 px-3 rounded-lg border border-[#E7E5E4] bg-white font-caption text-caption outline-none focus:border-[#C1121F]';

/**
 * For doctors who can't be booked online: a request (name, phone, preferred day and time) that the Curxx
 * team confirms by phone. It is not an appointment until then, and the copy says so.
 */
export default function AppointmentRequestForm({
  slug,
  doctorName,
  practices,
}: {
  slug: string;
  doctorName: string;
  practices: Practice[];
}) {
  const days = useMemo(() => nextDays(), []);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    preferredDay: '',
    preferredTime: 'any' as Time,
    facilitySlug: practices[0]?.facilitySlug ?? '',
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState<{ reference: string } | null>(null);
  const phoneOk = /^[6-9]\d{9}$/.test(form.phone);
  const ready = form.name.trim().length >= 2 && phoneOk;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!ready || busy) return;
    setBusy(true);
    setError('');
    try {
      const { request } = await api.requestAppointment(slug, {
        ...form,
        name: form.name.trim(),
      });
      setDone({ reference: request.reference });
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : 'Can’t reach Curxx right now. Check your connection and try again.',
      );
    } finally {
      setBusy(false);
    }
  }

  if (done)
    return (
      <div
        role="status"
        className="p-4 rounded-xl bg-[#ECFDF5] border border-[#A7F3D0] space-y-1 font-caption text-caption text-[#1C1917]"
      >
        <p className="font-caption-strong text-caption-strong text-[#047857] flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[18px]">task_alt</span>
          Request sent · {done.reference}
        </p>
        <p>
          This is not a confirmed appointment yet. Curxx will call you on {form.phone} to confirm a
          time with {doctorName}.
        </p>
      </div>
    );

  if (!open)
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-full h-11 rounded-lg bg-[#C1121F] hover:bg-[#8E0E17] text-white font-body-strong text-body-strong inline-flex items-center justify-center gap-1.5"
      >
        <span className="material-symbols-outlined text-[18px]">event_available</span>
        Request an appointment
      </button>
    );

  return (
    <form onSubmit={submit} className="space-y-3 p-4 rounded-xl border border-[#E7E5E4]">
      <p className="font-body-strong text-body-strong text-[#1C1917]">Request an appointment</p>
      <label className="block space-y-1">
        <span className="font-caption-strong text-caption-strong text-[#1C1917]">Your name</span>
        <input
          required
          maxLength={80}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className={field}
        />
      </label>
      <label className="block space-y-1">
        <span className="font-caption-strong text-caption-strong text-[#1C1917]">
          Mobile number
        </span>
        <input
          required
          inputMode="numeric"
          maxLength={10}
          placeholder="10-digit mobile"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, '') })}
          className={field}
        />
      </label>
      {practices.length > 1 && (
        <label className="block space-y-1">
          <span className="font-caption-strong text-caption-strong text-[#1C1917]">Where</span>
          <select
            value={form.facilitySlug}
            onChange={(e) => setForm({ ...form, facilitySlug: e.target.value })}
            className={field}
          >
            {practices.map((p) => (
              <option key={p.facilitySlug} value={p.facilitySlug}>
                {p.name}
              </option>
            ))}
          </select>
        </label>
      )}
      <div className="grid grid-cols-2 gap-2">
        <label className="block space-y-1">
          <span className="font-caption-strong text-caption-strong text-[#1C1917]">
            Preferred day
          </span>
          <select
            value={form.preferredDay}
            onChange={(e) => setForm({ ...form, preferredDay: e.target.value })}
            className={field}
          >
            <option value="">Any day</option>
            {days.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </select>
        </label>
        <label className="block space-y-1">
          <span className="font-caption-strong text-caption-strong text-[#1C1917]">Time</span>
          <select
            value={form.preferredTime}
            onChange={(e) => setForm({ ...form, preferredTime: e.target.value as Time })}
            className={field}
          >
            {TIMES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      {error && (
        <p className="p-2.5 rounded-lg bg-[#FFF1F2] border border-[#F9C6C9] text-[#8E0E17] font-caption text-caption">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={!ready || busy}
        className="w-full h-11 rounded-lg bg-[#C1121F] hover:bg-[#8E0E17] disabled:opacity-50 text-white font-body-strong text-body-strong"
      >
        {busy ? 'Sending…' : 'Send request'}
      </button>
      <p className="font-micro text-micro text-[#78716C]">
        Not a confirmed booking: Curxx calls you to confirm the time.
      </p>
    </form>
  );
}
