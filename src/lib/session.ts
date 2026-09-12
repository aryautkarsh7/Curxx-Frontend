// Mock auth: a signed-in session is just a flag in localStorage until a real backend exists.
const SESSION_KEY = 'curxx_session';

export function isSignedIn(): boolean {
  try {
    return localStorage.getItem(SESSION_KEY) !== null;
  } catch {
    return false;
  }
}

export function signIn(phone: string) {
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify({ phone, signedInAt: Date.now() }));
  } catch {
    // Storage blocked (private mode) — the session simply won't persist.
  }
}
