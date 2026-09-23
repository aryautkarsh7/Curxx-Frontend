'use client';
import { useEffect, useState } from 'react';
import { TOKEN_KEY, api, type SessionUser } from './api';

const USER_KEY = 'curxx_user';
const EVENT = 'curxx:session';

/** Storage can throw in private mode; a blocked read just means "signed out". */
function read(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function getToken(): string | null {
  return read(TOKEN_KEY);
}

export function getUser(): SessionUser | null {
  const raw = read(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as SessionUser;
  } catch {
    return null;
  }
}

export function isSignedIn(): boolean {
  return getToken() !== null;
}

export function setSession(token: string, user: SessionUser) {
  try {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch {
    // Storage blocked — the session lives for this page only.
  }
  window.dispatchEvent(new Event(EVENT));
}

export function signOut() {
  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  } catch {
    // nothing to clear
  }
  window.dispatchEvent(new Event(EVENT));
}

if (typeof window !== 'undefined') {
  window.addEventListener('curxx:unauthorized', () => {
    if (getToken()) signOut();
  });
}

/** Reactive view of the session: re-renders on sign-in, sign-out and other tabs. */
export function useSession() {
  const [state, setState] = useState<{ ready: boolean; user: SessionUser | null }>({ ready: false, user: null });

  useEffect(() => {
    const sync = () => setState({ ready: true, user: getUser() });
    sync();
    window.addEventListener(EVENT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  return { ...state, signedIn: state.user !== null };
}

/** Drops a session the API no longer accepts (expired or revoked token). */
export async function refreshUser(): Promise<SessionUser | null> {
  const token = getToken();
  if (!token) return null;
  try {
    const { user } = await api.me(token);
    setSession(token, user);
    return user;
  } catch {
    signOut();
    return null;
  }
}
