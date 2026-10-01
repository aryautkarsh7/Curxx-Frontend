'use client';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { ApiError, PARTNER_ROLES, api, partnerRole, type PartnerRole } from '@/lib/api';

const input =
  'w-full h-11 px-3 rounded-lg border border-[#E7E5E4] bg-white text-body-default font-body-default outline-none focus:border-primary-container';

/**
 * Partner sign-up (doctor, hospital owner, healthcare professional, diagnostic centre): saved as a lead for the
 * partner team. The profile type comes preselected from ?role= (Create account sends people here with it).
 */
export default function PartnerEnquiryForm() {
  const params = useSearchParams();
  const [role, setRole] = useState<PartnerRole | ''>(partnerRole(params.get('role')));
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    organisation: '',
    city: '',
    message: '',
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);
  const set = (key: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));
  const phoneOk = /^[6-9]\d{9}$/.test(form.phone);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (busy || !form.name.trim() || !phoneOk) return;
    setBusy(true);
    setError('');
    try {
      await api.lead({
        kind: role === 'hospital' ? 'hospital' : 'provider',
        ...(role ? { role } : {}),
        ...form,
        source: 'partner-with-us',
      });
      setSent(true);
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

  if (sent)
    return (
      <div className="p-6 rounded-2xl border border-[#A7F3D0] bg-[#ECFDF5] space-y-1" role="status">
        <p className="text-headline-h3 font-headline-h3 text-on-surface">
          Thanks, we have your details
        </p>
        <p className="text-body-default font-body-default text-on-surface-variant">
          Our partner team will call you back on {form.phone}.
        </p>
      </div>
    );

  return (
    <form
      onSubmit={submit}
      className="p-6 rounded-2xl border border-surface-variant bg-surface-container-lowest shadow-sm grid grid-cols-1 sm:grid-cols-2 gap-4"
    >
      <label className="space-y-1.5 sm:col-span-2">
        <span className="text-caption-strong font-caption-strong text-on-surface">I am a</span>
        <select
          value={role}
          onChange={(e) => setRole(partnerRole(e.target.value))}
          className={input}
        >
          <option value="">Choose your profile type (optional)</option>
          {PARTNER_ROLES.map((r) => (
            <option key={r.value} value={r.value}>
              {r.label}
            </option>
          ))}
        </select>
      </label>
      <label className="space-y-1.5">
        <span className="text-caption-strong font-caption-strong text-on-surface">Full name</span>
        <input required value={form.name} onChange={set('name')} className={input} maxLength={80} />
      </label>
      <label className="space-y-1.5">
        <span className="text-caption-strong font-caption-strong text-on-surface">
          Mobile number
        </span>
        <input
          required
          inputMode="numeric"
          pattern="[6-9][0-9]{9}"
          maxLength={10}
          value={form.phone}
          onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value.replace(/\D/g, '') }))}
          placeholder="10-digit mobile"
          className={input}
        />
      </label>
      <label className="space-y-1.5">
        <span className="text-caption-strong font-caption-strong text-on-surface">
          Clinic, hospital or lab name (optional)
        </span>
        <input
          value={form.organisation}
          onChange={set('organisation')}
          className={input}
          maxLength={120}
        />
      </label>
      <label className="space-y-1.5">
        <span className="text-caption-strong font-caption-strong text-on-surface">
          City (optional)
        </span>
        <input value={form.city} onChange={set('city')} className={input} maxLength={60} />
      </label>
      <label className="space-y-1.5 sm:col-span-2">
        <span className="text-caption-strong font-caption-strong text-on-surface">
          Email (optional)
        </span>
        <input type="email" value={form.email} onChange={set('email')} className={input} />
      </label>
      <label className="space-y-1.5 sm:col-span-2">
        <span className="text-caption-strong font-caption-strong text-on-surface">
          Anything we should know (optional)
        </span>
        <textarea
          value={form.message}
          onChange={set('message')}
          maxLength={1000}
          rows={3}
          className="w-full px-3 py-2 rounded-lg border border-[#E7E5E4] bg-white text-body-default font-body-default outline-none focus:border-primary-container"
        />
      </label>
      {error && (
        <p className="sm:col-span-2 p-3 rounded-lg bg-[#FFF1F2] border border-[#F9C6C9] text-[#8E0E17] text-caption font-caption">
          {error}
        </p>
      )}
      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={busy || !form.name.trim() || !phoneOk}
          className="inline-flex items-center gap-1.5 h-12 px-6 rounded-lg bg-primary-container hover:bg-[#8E0E17] disabled:opacity-50 text-white font-body-strong text-body-strong transition"
        >
          {busy ? 'Sending…' : 'Request a callback'}
        </button>
      </div>
    </form>
  );
}
