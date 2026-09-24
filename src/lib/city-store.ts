'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { DEFAULT_CITY, canonicalCity, getCity, getLocality } from './cities';

const KEY = 'curxx_city';
const EVENT = 'curxx:city';

export type CityChoice = { city: string; area?: string };

function read(): CityChoice | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CityChoice;
    return canonicalCity(parsed.city) ? parsed : null;
  } catch {
    return null;
  }
}

/** Remembers the patient's city (and optionally locality) for links, search and listings. */
export function saveCity(choice: CityChoice) {
  try {
    localStorage.setItem(KEY, JSON.stringify(choice));
    // A cookie too, so server-rendered pages could honour it later.
    document.cookie = `${KEY}=${choice.city}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
  } catch {
    // Storage blocked — the choice lasts for this page only.
  }
  window.dispatchEvent(new CustomEvent(EVENT, { detail: choice }));
}

/**
 * The city in effect: the one in the URL on city pages (/mumbai/cardiologist), otherwise the
 * one the patient picked, otherwise Bengaluru.
 */
export function useCity() {
  const pathname = usePathname();
  const fromPath = canonicalCity(pathname.split('/')[1] ?? '');
  const [stored, setStored] = useState<CityChoice | null>(null);

  useEffect(() => {
    const sync = () => setStored(read());
    sync();
    window.addEventListener(EVENT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  const city = fromPath ?? stored?.city ?? DEFAULT_CITY;
  const areaSlug = fromPath && fromPath !== stored?.city ? undefined : stored?.area;
  const locality = areaSlug ? getLocality(city, areaSlug) : undefined;
  const info = getCity(city)!;
  return { city, cityName: info.name, state: info.state, locality, info };
}
