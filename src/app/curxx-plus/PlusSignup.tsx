'use client';
import { useState } from 'react';
import { api, errorMessage } from '@/lib/api';

export default function PlusSignup({ plans }: { plans: { id: string; name: string }[] }) {
  const [plan, setPlan] = useState(plans[1]?.id ?? plans[0]!.id);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);
  const valid = name.trim().length >= 2 && /^[6-9]\d{9}$/.test(phone);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid || busy) return;
    setBusy(true);
    setError('');
    try {
      await api.lead({ kind: 'plus', name: name.trim(), phone, message: `Curxx Plus: ${plans.find((p) => p.id === plan)?.name}`, source: 'curxx-plus' });
      setDone(true);
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <p role="status" className="p-5 rounded-2xl border border-[#A7F3D0] bg-[#ECFDF5] font-body-default text-body-default text-on-surface">
        <strong className="text-[#047857]">You’re on the list.</strong> Our team will call +91 {phone} to activate your {plans.find((p) => p.id === plan)?.name} plan.
      </p>
    );
  }
  return (
    <form id="join" onSubmit={submit} className="p-5 rounded-2xl border border-surface-variant bg-surface-container-lowest shadow-sm space-y-3 scroll-mt-24">
      <p className="font-headline-h3 text-headline-h3 text-on-surface">Get Curxx Plus</p>
      {error && <p role="alert" className="px-3 py-2 rounded-lg bg-[#FFF1F2] border border-[#F9C6C9] font-caption text-caption text-[#8E0E17]">{error}</p>}
      <label className="block space-y-1">
        <span className="font-caption-strong text-caption-strong text-on-surface">Plan</span>
        <select value={plan} onChange={(e) => setPlan(e.target.value)} className="w-full h-11 px-3 rounded-lg border border-surface-variant bg-white outline-none focus:border-primary-container">
          {plans.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
      </label>
      <label className="block space-y-1">
        <span className="font-caption-strong text-caption-strong text-on-surface">Your name</span>
        <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" className="w-full h-11 px-3 rounded-lg border border-surface-variant bg-white outline-none focus:border-primary-container" />
      </label>
      <label className="block space-y-1">
        <span className="font-caption-strong text-caption-strong text-on-surface">Mobile number</span>
        <span className="flex items-center h-11 rounded-lg border border-surface-variant bg-white focus-within:border-primary-container">
          <span className="px-3 border-r border-surface-variant font-body-strong text-body-strong">+91</span>
          <input inputMode="numeric" maxLength={10} value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))} autoComplete="tel-national" className="flex-1 min-w-0 px-3 bg-transparent outline-none tabular-nums" />
        </span>
      </label>
      <button type="submit" disabled={!valid || busy} className="w-full h-12 rounded-lg bg-primary-container hover:bg-[#8E0E17] disabled:bg-[#A8A29E] text-white font-body-strong text-body-strong">{busy ? 'Sending…' : 'Request activation'}</button>
      <p className="font-micro text-micro text-on-surface-variant">No payment now — we confirm the plan with you on a call first.</p>
    </form>
  );
}
