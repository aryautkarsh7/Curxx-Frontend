'use client';
import { useCallback, useEffect, useState } from 'react';

/** Transient confirmation message: `const [toast, showToast] = useToast()` then render `<Toast message={toast} />`. */
export function useToast(durationMs = 3000) {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!message) return;
    const id = setTimeout(() => setMessage(null), durationMs);
    return () => clearTimeout(id);
  }, [message, durationMs]);

  return [message, useCallback((m: string) => setMessage(m), [])] as const;
}

/** `placement` overrides the vertical position, e.g. on screens with their own bottom controls. */
export default function Toast({ message, placement = 'bottom-36 lg:bottom-6' }: { message: string | null; placement?: string }) {
  if (!message) return null;
  return (
    <div role="status" className={`fixed ${placement} left-1/2 -translate-x-1/2 z-[90] max-w-[calc(100vw-32px)] flex items-center gap-2 px-4 py-3 rounded-xl bg-[#1C1917] text-white shadow-[0_8px_24px_rgba(0,0,0,0.12)] font-caption-strong text-caption-strong`}>
      <span className="material-symbols-outlined text-[18px] text-[#34D399]">check_circle</span>
      {message}
    </div>
  );
}
