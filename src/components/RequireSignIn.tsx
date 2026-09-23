'use client';
import { useState, type ReactNode } from 'react';
import LoginModal from '@/components/LoginModal';
import { useSession } from '@/lib/session';

/** Renders children for signed-in users; otherwise a sign-in prompt in the same spot. */
export default function RequireSignIn({ children, title = 'Sign in to continue', body, icon = 'lock' }: { children: ReactNode; title?: string; body?: string; icon?: string }) {
  const session = useSession();
  const [open, setOpen] = useState(false);

  if (!session.ready) return <div className="h-40 rounded-xl bg-surface-container-low animate-pulse" aria-busy="true" />;
  if (session.signedIn) return <>{children}</>;

  return (
    <>
      <div className="p-6 sm:p-8 rounded-2xl border border-surface-variant bg-surface-container-lowest text-center space-y-3">
        <span className="w-12 h-12 mx-auto rounded-full bg-surface-container flex items-center justify-center text-primary-container">
          <span className="material-symbols-outlined text-[24px]">{icon}</span>
        </span>
        <h2 className="text-headline-h3 font-headline-h3 text-on-surface">{title}</h2>
        {body && <p className="text-body-default font-body-default text-on-surface-variant max-w-md mx-auto">{body}</p>}
        <button type="button" onClick={() => setOpen(true)} className="h-11 px-6 inline-flex items-center rounded-lg bg-primary-container hover:bg-[#8E0E17] text-white font-body-strong text-body-strong transition">
          Sign in with mobile number
        </button>
      </div>
      <LoginModal open={open} onClose={() => setOpen(false)} onSignedIn={() => setOpen(false)} />
    </>
  );
}
