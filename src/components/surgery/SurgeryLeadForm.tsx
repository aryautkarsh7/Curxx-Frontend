'use client';
import { useState } from 'react';
import { api, errorMessage } from '@/lib/api';

type Props = { surgery?: { slug: string; name: string }; city: string; cityName: string; options?: { slug: string; name: string }[] };

/** "Book a free consultation": a care coordinator calls back with a surgeon, estimate and insurance help. */
export default function SurgeryLeadForm({ surgery, city, cityName, options = [] }: Props) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [choice, setChoice] = useState(surgery?.slug ?? '');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);
  const valid = name.trim().length >= 2 && /^[6-9]\d{9}$/.test(phone) && Boolean(choice);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid || busy) return;
    setBusy(true);
    setError('');
    try {
      const picked = surgery ?? options.find((o) => o.slug === choice);
      await api.lead({ kind: 'surgery', surgery: choice, name: name.trim(), phone, city, source: 'surgery-page', message: picked ? `Free consultation for ${picked.name}` : '' });
      setDone(true);
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <div role="status" className="p-5 rounded-2xl border border-[#A7F3D0] bg-[#ECFDF5] space-y-1">
        <p className="font-headline-h3 text-headline-h3 text-[#047857] flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[22px]">check_circle</span>Request received
        </p>
        <p className="font-caption text-caption text-on-surface">A Curxx care coordinator will call +91 {phone} within 30 minutes (9 AM – 9 PM) to book your free surgeon consultation in {cityName}.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="p-5 rounded-2xl border border-surface-variant bg-surface-container-lowest shadow-sm space-y-3" aria-labelledby="lead-title">
      <p id="lead-title" className="font-headline-h3 text-headline-h3 text-on-surface">Book a free consultation</p>
      <p className="font-caption text-caption text-on-surface-variant">Talk to an experienced surgeon in {cityName}. Get a cost estimate and help with insurance — no charge.</p>
      {error && <p role="alert" className="px-3 py-2 rounded-lg bg-[#FFF1F2] border border-[#F9C6C9] font-caption text-caption text-[#8E0E17]">{error}</p>}
      <label className="block space-y-1">
        <span className="font-caption-strong text-caption-strong text-on-surface">Patient name</span>
        <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" className="w-full h-11 px-3 rounded-lg border border-surface-variant bg-white outline-none focus:border-primary-container" />
      </label>
      <label className="block space-y-1">
        <span className="font-caption-strong text-caption-strong text-on-surface">Mobile number</span>
        <span className="flex items-center h-11 rounded-lg border border-surface-variant bg-white focus-within:border-primary-container">
          <span className="px-3 border-r border-surface-variant font-body-strong text-body-strong">+91</span>
          <input inputMode="numeric" maxLength={10} value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))} autoComplete="tel-national" className="flex-1 min-w-0 px-3 bg-transparent outline-none tabular-nums" />
        </span>
      </label>
      {!surgery && (
        <label className="block space-y-1">
          <span className="font-caption-strong text-caption-strong text-on-surface">Surgery</span>
          <select value={choice} onChange={(e) => setChoice(e.target.value)} className="w-full h-11 px-3 rounded-lg border border-surface-variant bg-white outline-none focus:border-primary-container">
            <option value="">Choose a procedure</option>
            {options.map((o) => <option key={o.slug} value={o.slug}>{o.name}</option>)}
          </select>
        </label>
      )}
      <button type="submit" disabled={!valid || busy} className="w-full h-12 rounded-lg bg-primary-container hover:bg-[#8E0E17] disabled:bg-[#A8A29E] text-white font-body-strong text-body-strong">
        {busy ? 'Sending…' : 'Get a free call back'}
      </button>
      <ul className="grid grid-cols-2 gap-2 pt-1 text-micro font-micro text-on-surface-variant">
        {['Free surgeon consultation', 'Cashless insurance help', 'No-cost EMI options', 'Free pick-up & drop'].map((t) => (
          <li key={t} className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px] text-[#047857]">check</span>{t}</li>
        ))}
      </ul>
    </form>
  );
}
