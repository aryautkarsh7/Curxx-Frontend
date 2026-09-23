'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { ApiError, api } from '@/lib/api';
import { setSession } from '@/lib/session';

type Props = {
  open: boolean;
  onClose: () => void;
  onSignedIn: () => void;
};

export default function LoginModal({ open, onClose, onSignedIn }: Props) {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [devCode, setDevCode] = useState('');

  const phoneValid = /^[6-9]\d{9}$/.test(phone);
  const otpValid = /^\d{6}$/.test(otp);

  function close() {
    setStep('phone');
    setOtp('');
    setError('');
    setDevCode('');
    onClose();
  }

  const message = (e: unknown) => (e instanceof ApiError ? e.message : 'Network error — is the API running?');

  async function sendOtp(e: React.FormEvent) {
    e.preventDefault();
    if (!phoneValid || busy) return;
    setBusy(true);
    setError('');
    try {
      const { devCode: code } = await api.requestOtp(phone);
      setDevCode(code ?? '');
      setStep('otp');
    } catch (err) {
      setError(message(err));
    } finally {
      setBusy(false);
    }
  }

  async function verify(e: React.FormEvent) {
    e.preventDefault();
    if (!otpValid || busy) return;
    setBusy(true);
    setError('');
    try {
      const { token, user } = await api.verifyOtp(phone, otp);
      setSession(token, user);
      close();
      onSignedIn();
    } catch (err) {
      setError(message(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="absolute inset-0 bg-[rgba(28,25,23,0.45)]" onClick={close} aria-hidden="true" />
      <motion.div initial={{ opacity: 0, scale: 0.96, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ type: 'spring', stiffness: 380, damping: 32 }} role="dialog" aria-modal="true" aria-labelledby="login-title" className="relative w-full max-w-sm bg-surface-container-lowest border-t border-[#E7E5E4] rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.12)] p-6 space-y-5">
        <button type="button" onClick={close} aria-label="Close" className="absolute top-4 right-4 p-1 rounded-lg text-[#78716C] hover:bg-[#FAFAF9]">
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>
        <div className="space-y-1">
          <h2 id="login-title" className="font-headline-h2 text-headline-h2 text-[#1C1917]">Sign in to Curxx</h2>
          <p className="font-caption text-caption text-[#78716C]">
            {step === 'phone' ? 'Access appointments, prescriptions and your ABHA locker.' : `Enter the 6-digit code sent to +91 ${phone}`}
          </p>
        </div>

        {error && (
          <p role="alert" className="px-3 py-2 rounded-lg bg-[#FFF1F2] border border-[#F9C6C9] font-caption text-caption text-[#8E0E17]">{error}</p>
        )}

        {step === 'phone' ? (
          <form className="space-y-4" onSubmit={sendOtp}>
            <label className="block space-y-1.5">
              <span className="font-caption-strong text-caption-strong text-[#1C1917]">Mobile number</span>
              <div className="flex items-center h-11 bg-white border border-[#E7E5E4] rounded-lg focus-within:border-primary-container focus-within:ring-2 focus-within:ring-[rgba(193,18,31,0.15)]">
                <span className="px-3 font-body-strong text-body-strong text-[#1C1917] border-r border-[#E7E5E4]">+91</span>
                <input
                  autoFocus
                  inputMode="numeric"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  placeholder="XXXXX XXXXX"
                  className="flex-1 min-w-0 px-3 bg-transparent font-body-default text-body-default text-[#1C1917] placeholder-[#78716C] outline-none tabular-nums"
                />
              </div>
            </label>
            <button type="submit" disabled={!phoneValid || busy} className="w-full h-12 rounded-lg bg-primary-container hover:bg-[#8E0E17] disabled:bg-[#A8A29E] text-white font-body-strong text-body-strong transition">
              {busy ? 'Sending…' : 'Send OTP'}
            </button>
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
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
              placeholder="••••••"
              aria-label="One-time password"
              className="w-full h-11 px-3 bg-white border border-[#E7E5E4] rounded-lg text-center tracking-[0.5em] font-body-strong text-body-strong text-[#1C1917] outline-none focus:border-primary-container focus:ring-2 focus:ring-[rgba(193,18,31,0.15)] tabular-nums"
            />
            <button type="submit" disabled={!otpValid || busy} className="w-full h-12 rounded-lg bg-primary-container hover:bg-[#8E0E17] disabled:bg-[#A8A29E] text-white font-body-strong text-body-strong transition">
              {busy ? 'Verifying…' : 'Verify & Continue'}
            </button>
            <button type="button" onClick={() => { setStep('phone'); setOtp(''); setError(''); }} className="w-full font-caption-strong text-caption-strong text-[#D92D3A]">
              Change number
            </button>
          </form>
        )}
      </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
