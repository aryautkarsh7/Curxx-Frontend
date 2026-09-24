'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import AuthForm, { type AuthMode } from '@/components/AuthForm';

type Props = {
  open: boolean;
  onClose: () => void;
  onSignedIn: () => void;
  /** Which tab to open on: an existing patient logging in, or someone new registering. */
  initialMode?: AuthMode;
};

export default function LoginModal({ open, onClose, onSignedIn, initialMode = 'login' }: Props) {
  // Callers pass inline handlers; a ref keeps re-renders from re-binding the Escape listener.
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onCloseRef.current();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center sm:p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="absolute inset-0 bg-[rgba(28,25,23,0.45)]" onClick={onClose} aria-hidden="true" />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="login-title"
            className="relative w-full sm:max-w-md max-h-[92vh] overflow-y-auto bg-surface-container-lowest border-t border-[#E7E5E4] rounded-t-2xl sm:rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.12)] p-6 space-y-4"
          >
            <button type="button" onClick={onClose} aria-label="Close" className="absolute top-4 right-4 p-1 rounded-lg text-[#78716C] hover:bg-[#FAFAF9]">
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
            <ModalBody key={initialMode} initialMode={initialMode} onSignedIn={() => { onClose(); onSignedIn(); }} />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

/** Mounted fresh each time the dialog opens, so it starts on the requested tab. */
function ModalBody({ initialMode, onSignedIn }: { initialMode: AuthMode; onSignedIn: () => void }) {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  return (
    <>
      <p id="login-title" className="font-headline-h2 text-headline-h2 text-[#1C1917] pr-8">{mode === 'login' ? 'Log in to Curxx' : 'Create your Curxx account'}</p>
      <AuthForm initialMode={initialMode} onModeChange={setMode} onSignedIn={onSignedIn} />
    </>
  );
}
