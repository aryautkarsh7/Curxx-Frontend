'use client';
import { useEffect, useState } from 'react';
import { ApiError, api, errorMessage, type SessionUser } from '@/lib/api';
import { getToken, getUser, setSession } from '@/lib/session';

const FIELD = 'w-full h-11 px-3 bg-white border border-[#E7E5E4] rounded-lg font-body-default text-body-default text-[#1C1917] placeholder-[#A8A29E] outline-none focus:border-primary-container focus:ring-2 focus:ring-[rgba(193,18,31,0.15)]';
const LABEL = 'font-caption-strong text-caption-strong text-[#1C1917]';

export default function ProfileForm() {
  const [form, setForm] = useState({ name: '', email: '', gender: '' as SessionUser['gender'], dob: '', bloodGroup: '', abhaId: '' });
  const [phone, setPhone] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ ok: boolean; text: string; field?: string } | null>(null);

  useEffect(() => {
    const token = getToken();
    const fill = (u: SessionUser) => {
      setPhone(u.phone);
      setForm({ name: u.name ?? '', email: u.email ?? '', gender: u.gender ?? '', dob: u.dob ? u.dob.slice(0, 10) : '', bloodGroup: u.bloodGroup ?? '', abhaId: u.abhaId ?? '' });
    };
    const cached = getUser();
    if (cached) fill(cached);
    if (token) api.me(token).then(({ user }) => { fill(user); setSession(token, user); }).catch(() => {});
  }, []);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    const token = getToken();
    if (!token) return;
    setBusy(true);
    setMessage(null);
    try {
      const { user } = await api.updateProfile({
        ...(form.name.trim() ? { name: form.name.trim() } : {}),
        email: form.email.trim(),
        gender: form.gender,
        bloodGroup: form.bloodGroup,
        abhaId: form.abhaId.trim(),
        ...(form.dob ? { dob: form.dob } : {}),
      }, token);
      setSession(token, user);
      setMessage({ ok: true, text: 'Profile saved' });
    } catch (err) {
      setMessage({ ok: false, text: errorMessage(err), field: err instanceof ApiError ? err.field : undefined });
    } finally {
      setBusy(false);
    }
  }

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setForm((f) => ({ ...f, [key]: e.target.value }));
  const fieldError = (f: string) => message && !message.ok && message.field === f && <span className="font-caption text-caption text-[#8E0E17]">{message.text}</span>;

  return (
    <form onSubmit={save} noValidate className="space-y-4 max-w-xl">
      <label className="block space-y-1">
        <span className={LABEL}>Mobile number</span>
        <input value={phone ? `+91 ${phone}` : ''} disabled className={`${FIELD} bg-[#FAFAF9] text-[#78716C]`} />
        <span className="font-micro text-micro text-[#78716C]">Your sign-in number. Contact support to change it.</span>
      </label>
      <label className="block space-y-1">
        <span className={LABEL}>Full name</span>
        <input value={form.name} onChange={set('name')} maxLength={80} autoComplete="name" className={FIELD} />
        {fieldError('name')}
      </label>
      <label className="block space-y-1">
        <span className={LABEL}>Email</span>
        <input type="email" value={form.email} onChange={set('email')} autoComplete="email" placeholder="For receipts and reports" className={FIELD} />
        {fieldError('email')}
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <label className="block space-y-1">
          <span className={LABEL}>Gender</span>
          <select value={form.gender} onChange={set('gender')} className={FIELD}>
            <option value="">Prefer not to say</option><option value="female">Female</option><option value="male">Male</option><option value="other">Other</option>
          </select>
        </label>
        <label className="block space-y-1">
          <span className={LABEL}>Date of birth</span>
          <input type="date" value={form.dob} max={new Date().toISOString().slice(0, 10)} onChange={set('dob')} className={FIELD} />
          {fieldError('dob')}
        </label>
        <label className="block space-y-1">
          <span className={LABEL}>Blood group</span>
          <select value={form.bloodGroup} onChange={set('bloodGroup')} className={FIELD}>
            <option value="">—</option>{['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((g) => <option key={g} value={g}>{g}</option>)}
          </select>
        </label>
      </div>
      <label className="block space-y-1">
        <span className={LABEL}>ABHA number</span>
        <input value={form.abhaId} onChange={set('abhaId')} placeholder="91-1234-5678-9012" maxLength={17} className={`${FIELD} font-mono tracking-wider`} />
        {fieldError('abhaId')}
        <span className="font-micro text-micro text-[#78716C]">Your 14-digit Ayushman Bharat Health Account number, used to carry records across hospitals.</span>
      </label>
      {message && (message.ok || !message.field) && (
        <p role="status" className={`px-3 py-2 rounded-lg font-caption text-caption ${message.ok ? 'bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857]' : 'bg-[#FFF1F2] border border-[#F9C6C9] text-[#8E0E17]'}`}>{message.text}</p>
      )}
      <button type="submit" disabled={busy} className="h-11 px-6 rounded-lg bg-primary-container hover:bg-[#8E0E17] disabled:bg-[#A8A29E] text-white font-body-strong text-body-strong">{busy ? 'Saving…' : 'Save profile'}</button>
    </form>
  );
}
