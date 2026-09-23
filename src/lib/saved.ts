'use client';
import { useEffect, useState, useSyncExternalStore } from 'react';
import { api } from './api';
import { getToken, useSession } from './session';

type Slugs = { doctors: string[]; articles: string[] };
let cache: Slugs | null = null;
let pending: Promise<void> | null = null;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

function load() {
  const token = getToken();
  if (!token) return;
  pending ??= api.saved(token).then((r) => { cache = r.slugs; emit(); }).catch(() => {}).finally(() => { pending = null; });
}

if (typeof window !== 'undefined') {
  // A different account means a different saved list.
  window.addEventListener('curxx:session', () => { cache = null; emit(); });
}

/** Saved state for one doctor or article, shared across every button on the page. */
export function useSaved(kind: 'doctors' | 'articles', slug: string) {
  const session = useSession();
  const slugs = useSyncExternalStore((cb) => { listeners.add(cb); return () => listeners.delete(cb); }, () => cache, () => null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (session.signedIn && !cache) load();
  }, [session.signedIn]);

  const saved = Boolean(slugs?.[kind].includes(slug));

  async function toggle() {
    const token = getToken();
    if (!token) return false;
    setBusy(true);
    try {
      const r = saved ? await api.unsave(kind, slug, token) : await api.save(kind, slug, token);
      cache = r.slugs;
      emit();
    } finally {
      setBusy(false);
    }
    return true;
  }

  return { saved, busy, toggle, signedIn: session.signedIn };
}
