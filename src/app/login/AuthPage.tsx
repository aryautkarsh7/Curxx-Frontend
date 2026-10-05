'use client';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import AuthForm, { type AuthMode } from '@/components/AuthForm';
import ProfileTypePicker from '@/components/ProfileTypePicker';

/** Full-page Login / Register, for links and for phones where a modal feels cramped. */
export default function AuthPage({ initialMode }: { initialMode: AuthMode }) {
  const router = useRouter();
  const params = useSearchParams();
  const [mode, setMode] = useState(initialMode);
  // Create account starts with the profile type; Patient continues to the phone + OTP sign-up here.
  const [patient, setPatient] = useState(params.get('as') === 'patient');
  // Only same-site paths are accepted as the return destination.
  const next = params.get('next');
  const destination = next && next.startsWith('/') && !next.startsWith('//') ? next : '/account';
  const showUrl = (m: AuthMode, as = '') => {
    const query = new URLSearchParams();
    if (as) query.set('as', as);
    if (next) query.set('next', next);
    const qs = query.toString();
    window.history.replaceState(null, '', `/${m}${qs ? `?${qs}` : ''}`);
  };

  if (mode === 'register' && !patient)
    return (
      <main className="flex-1 bg-surface-container-low">
        <div className="w-full max-w-lg mx-auto px-margin py-12">
          <div className="p-6 rounded-2xl border border-surface-variant bg-surface-container-lowest shadow-sm">
            <ProfileTypePicker
              onPatient={() => {
                setPatient(true);
                showUrl('register', 'patient');
              }}
              onLogin={() => {
                setMode('login');
                showUrl('login');
              }}
            />
          </div>
        </div>
      </main>
    );

  return (
    <main className="flex-1 bg-surface-container-low">
      <div className="w-full max-w-md mx-auto px-margin py-12 space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-headline-h1 font-headline-h1 text-on-surface">
            {mode === 'login' ? 'Log in to Curxx' : 'Create your Curxx account'}
          </h1>
          <p className="text-caption font-caption text-on-surface-variant">
            Book doctors, read about medicines and keep every report in one place.
          </p>
        </div>
        <div className="p-6 rounded-2xl border border-surface-variant bg-surface-container-lowest shadow-sm">
          <AuthForm
            initialMode={mode}
            onModeChange={(m) => {
              setMode(m);
              showUrl(m, m === 'register' && patient ? 'patient' : '');
            }}
            onSignedIn={() => router.push(destination)}
          />
        </div>
        <p className="text-center text-micro font-micro text-on-surface-variant">
          Need help?{' '}
          <Link href="/teleconsultation-policy" className="text-primary-container">
            How Curxx protects your data
          </Link>
        </p>
      </div>
    </main>
  );
}
