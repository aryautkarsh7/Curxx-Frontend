'use client';
import { useState } from 'react';
import LoginModal from '@/components/LoginModal';
import { useSaved } from '@/lib/saved';

export default function SaveButton({ kind, slug, label, className = '' }: { kind: 'doctors' | 'articles'; slug: string; label: string; className?: string }) {
  const { saved, busy, toggle, signedIn } = useSaved(kind, slug);
  const [loginOpen, setLoginOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        disabled={busy}
        aria-pressed={saved}
        aria-label={saved ? `Remove ${label} from saved` : `Save ${label}`}
        title={saved ? 'Saved' : 'Save'}
        onClick={() => (signedIn ? void toggle() : setLoginOpen(true))}
        className={`p-2 rounded-lg border transition duration-150 ${saved ? 'border-[#F9C6C9] bg-[#FFF1F2] text-[#C1121F]' : 'border-[#E7E5E4] text-[#78716C] hover:text-[#1C1917] hover:bg-[#FAFAF9]'} ${className}`}
      >
        <span className="material-symbols-outlined text-[20px]" style={saved ? { fontVariationSettings: "'FILL' 1" } : undefined}>bookmark</span>
      </button>
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} onSignedIn={() => { setLoginOpen(false); void toggle(); }} />
    </>
  );
}
