'use client';
import { useState } from 'react';
import { ApiError, api, type Registration } from '@/lib/api';
import { setSession } from '@/lib/session';

export type AuthMode = 'login' | 'register';

const INPUT = 'w-full h-11 px-3 bg-white border border-[#E7E5E4] rounded-lg font-body-default text-body-default text-[#1C1917] placeholder-[#78716C] outline-none focus:border-primary-container focus:ring-2 focus:ring-[rgba(193,18,31,0.15)]';

type Props = { initialMode?: AuthMode; onSignedIn: () => void; onModeChange?: (mode: AuthMode) => void };

/** Login and Register as two clear paths, both finished with a mobile OTP. */
export default function AuthForm({ initialMode = 'login', onSignedIn, onModeChange }: Props) {
  const [mode, setModeState] = useState<AuthMode>(initialMode);
  const [step, setStep] = useState<'details' | 'otp'>('details');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [profile, setProfile] = useState<Registration>({ name: '', email: '', gender: '', dob: '' });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<{ text: string; switchTo?: AuthMode } | null>(null);
  const [devCode, setDevCode] = useState('');

  const phoneValid = /^[6-9]\d{9}$/.test(phone);
  const emailValid = !profile.email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email);
  const detailsValid = phoneValid && (mode === 'login' || (profile.name.trim().length >= 2 && emailValid));
  const otpValid = /^\d{6}$/.test(otp);

  function setMode(next: AuthMode) {
    setModeState(next);
    setStep('details');
    setOtp('');
    setError(null);
    onModeChange?.(next);
  }

  async function sendOtp(e: React.FormEvent) {
    e.preventDefault();
    if (!detailsValid || busy) return;
    setBusy(true);
    setError(null);
    try {
      const { devCode: code } = await api.requestOtp(phone, mode);
      setDevCode(code ?? '');
      setStep('otp');
    } catch (err) {
      if (err instanceof ApiError && err.code === 'not_registered') setError({ text: err.message, switchTo: 'register' });
      else if (err instanceof ApiError && err.code === 'already_registered') setError({ text: err.message, switchTo: 'login' });
      else setError({ text: err instanceof ApiError ? err.message : 'Can’t reach Curxx right now. Check your connection and try again.' });
    } finally {
      setBusy(false);
    }
  }

  async function verify(e: React.FormEvent) {
    e.preventDefault();
    if (!otpValid || busy) return;
    setBusy(true);
    setError(null);
    try {
      const registration =
        mode === 'register'
          ? { name: profile.name.trim(), email: profile.email?.trim() || undefined, gender: profile.gender || undefined, dob: profile.dob || undefined }
          : undefined;
      const { token, user } = await api.verifyOtp(phone, otp, registration);
      setSession(token, user);
      onSignedIn();
    } catch (err) {
      setError({ text: err instanceof ApiError ? err.message : 'Can’t reach Curxx right now. Check your connection and try again.' });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-5">
      <div className="bg-[#FAFAF9] p-1 border border-[#E7E5E4] rounded-xl grid grid-cols-2 gap-1 text-center font-caption-strong text-caption-strong" role="tablist" aria-label="Account">
        {(['login', 'register'] as const).map((m) => (
          <button key={m} type="button" role="tab" aria-selected={mode === m} onClick={() => setMode(m)} className={mode === m ? 'py-2 rounded-lg bg-white border border-[#E7E5E4] text-[#1C1917] shadow-xs' : 'py-2 rounded-lg text-[#78716C] hover:text-[#1C1917]'}>
            {m === 'login' ? 'Log in' : 'Create account'}
          </button>
        ))}
      </div>

      <p className="font-caption text-caption text-[#78716C]">
        {step === 'otp'
          ? `Enter the 6-digit code sent to +91 ${phone}`
          : mode === 'login'
            ? 'Welcome back. Log in with your mobile number to see appointments, prescriptions and your ABHA locker.'
            : 'New to Curxx? Create your account in 30 seconds — we’ll verify your mobile number with an OTP.'}
      </p>

      {error && (
        <div role="alert" className="px-3 py-2 rounded-lg bg-[#FFF1F2] border border-[#F9C6C9] font-caption text-caption text-[#8E0E17] space-y-1">
          <p>{error.text}</p>
          {error.switchTo && (
            <button type="button" onClick={() => setMode(error.switchTo!)} className="font-caption-strong text-caption-strong text-primary-container underline">
              {error.switchTo === 'register' ? 'Create an account' : 'Log in instead'}
            </button>
          )}
        </div>
      )}

      {step === 'details' ? (
        <form className="space-y-3.5" onSubmit={sendOtp} noValidate>
          {mode === 'register' && (
            <label className="block space-y-1.5">
              <span className="font-caption-strong text-caption-strong text-[#1C1917]">Full name *</span>
              <input autoFocus autoComplete="name" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} placeholder="As on your ID" className={INPUT} />
            </label>
          )}
          <label className="block space-y-1.5">
            <span className="font-caption-strong text-caption-strong text-[#1C1917]">Mobile number *</span>
            <div className="flex items-center h-11 bg-white border border-[#E7E5E4] rounded-lg focus-within:border-primary-container focus-within:ring-2 focus-within:ring-[rgba(193,18,31,0.15)]">
              <span className="px-3 font-body-strong text-body-strong text-[#1C1917] border-r border-[#E7E5E4]">+91</span>
              <input
                autoFocus={mode === 'login'}
                inputMode="numeric"
                autoComplete="tel-national"
                maxLength={10}
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                placeholder="XXXXX XXXXX"
                className="flex-1 min-w-0 px-3 bg-transparent font-body-default text-body-default text-[#1C1917] placeholder-[#78716C] outline-none tabular-nums"
              />
            </div>
            {phone.length === 10 && !phoneValid && <span className="font-micro text-micro text-[#8E0E17]">Enter a valid 10-digit Indian mobile number</span>}
          </label>
          {mode === 'register' && (
            <>
              <label className="block space-y-1.5">
                <span className="font-caption-strong text-caption-strong text-[#1C1917]">Email <span className="font-caption text-caption text-[#78716C]">(for receipts & reports)</span></span>
                <input type="email" autoComplete="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} placeholder="you@example.com" className={INPUT} />
                {!emailValid && <span className="font-micro text-micro text-[#8E0E17]">Enter a valid email</span>}
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="block space-y-1.5">
                  <span className="font-caption-strong text-caption-strong text-[#1C1917]">Gender</span>
                  <select value={profile.gender} onChange={(e) => setProfile({ ...profile, gender: e.target.value as Registration['gender'] })} className={INPUT}>
                    <option value="">Select</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="other">Other</option>
                  </select>
                </label>
                <label className="block space-y-1.5">
                  <span className="font-caption-strong text-caption-strong text-[#1C1917]">Date of birth</span>
                  <input type="date" max={new Date().toISOString().slice(0, 10)} value={profile.dob} onChange={(e) => setProfile({ ...profile, dob: e.target.value })} className={INPUT} />
                </label>
              </div>
            </>
          )}
          <button type="submit" disabled={!detailsValid || busy} className="w-full h-12 rounded-lg bg-primary-container hover:bg-[#8E0E17] disabled:bg-[#A8A29E] text-white font-body-strong text-body-strong transition">
            {busy ? 'Sending…' : 'Send OTP'}
          </button>
          <p className="font-micro text-micro text-[#78716C] text-center">
            {mode === 'login' ? (
              <>New here? <button type="button" onClick={() => setMode('register')} className="font-caption-strong text-primary-container">Create an account</button></>
            ) : (
              <>Already have an account? <button type="button" onClick={() => setMode('login')} className="font-caption-strong text-primary-container">Log in</button></>
            )}
          </p>
          {mode === 'register' && <p className="font-micro text-micro text-[#78716C] text-center">By continuing you agree to the Terms of Service and Privacy Policy.</p>}
        </form>
      ) : (
        <form className="space-y-4" onSubmit={verify}>
          {devCode && (
            <p className="px-3 py-2 rounded-lg bg-[#ECFDF5] border border-[#A7F3D0] font-caption text-caption text-[#047857]">
              Test code: <span className="font-caption-strong tabular-nums">{devCode}</span>
            </p>
          )}
          <input
            autoFocus
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
            placeholder="••••••"
            aria-label="One-time password"
            className="w-full h-11 px-3 bg-white border border-[#E7E5E4] rounded-lg text-center tracking-[0.5em] font-body-strong text-body-strong text-[#1C1917] outline-none focus:border-primary-container focus:ring-2 focus:ring-[rgba(193,18,31,0.15)] tabular-nums"
          />
          <button type="submit" disabled={!otpValid || busy} className="w-full h-12 rounded-lg bg-primary-container hover:bg-[#8E0E17] disabled:bg-[#A8A29E] text-white font-body-strong text-body-strong transition">
            {busy ? 'Verifying…' : mode === 'login' ? 'Verify & Log in' : 'Verify & Create account'}
          </button>
          <button type="button" onClick={() => { setStep('details'); setOtp(''); setError(null); }} className="w-full font-caption-strong text-caption-strong text-[#D92D3A]">
            Change number
          </button>
        </form>
      )}
    </div>
  );
}
