'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { CITIES, POPULAR_CITIES, canonicalCity, getCity, nearestCity } from '@/lib/cities';
import { saveCity, useCity } from '@/lib/city-store';

type Props = { open: boolean; onClose: () => void };

/** Pages whose URL carries the city and should move to the new city when it changes. */
function cityPath(pathname: string, city: string, locality?: string) {
  const parts = pathname.split('/').filter(Boolean);
  if (!parts.length || !canonicalCity(parts[0]!)) return null;
  // /{city}/{specialty}/{locality}: a new city drops the old locality.
  const [, section, third] = parts;
  if (!section) return `/${city}`;
  const base = `/${city}/${section}`;
  const listing = !['specialties', 'hospitals', 'clinics', 'labs', 'surgeries', 'surgery'].includes(section);
  if (listing && locality) return `${base}/${locality}`;
  if (section === 'surgery' && third) return `${base}/${third}`;
  return base;
}

export default function CityPicker({ open, onClose }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const current = useCity();
  const [city, setCity] = useState(current.city);
  const [query, setQuery] = useState('');
  const [locating, setLocating] = useState(false);
  const [locateError, setLocateError] = useState('');

  useEffect(() => {
    if (!open) return;
    setCity(current.city);
    setQuery('');
    setLocateError('');
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, current.city, onClose]);

  const needle = query.trim().toLowerCase();
  const cities = useMemo(() => {
    const ordered = [...POPULAR_CITIES.map((s) => getCity(s)!), ...CITIES.filter((c) => !POPULAR_CITIES.includes(c.slug)).sort((a, b) => a.name.localeCompare(b.name))];
    return needle ? ordered.filter((c) => c.name.toLowerCase().includes(needle) || c.state.toLowerCase().includes(needle) || c.aliases.some((a) => a.includes(needle)) || c.localities.some((l) => l.name.toLowerCase().includes(needle) || l.pincode.startsWith(needle))) : ordered;
  }, [needle]);
  const selected = getCity(city)!;
  const localities = needle && !selected.name.toLowerCase().includes(needle) ? selected.localities.filter((l) => l.name.toLowerCase().includes(needle) || l.pincode.startsWith(needle)) : selected.localities;

  function choose(citySlug: string, locality?: string) {
    saveCity({ city: citySlug, area: locality });
    const next = cityPath(pathname, citySlug, locality);
    onClose();
    if (next && next !== pathname) router.push(next);
  }

  function locate() {
    if (!('geolocation' in navigator)) {
      setLocateError('Location isn’t available in this browser. Pick your city below.');
      return;
    }
    setLocating(true);
    setLocateError('');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocating(false);
        choose(nearestCity(pos.coords.latitude, pos.coords.longitude).slug);
      },
      () => {
        setLocating(false);
        setLocateError('We couldn’t get your location. Pick your city below.');
      },
      { timeout: 8000, maximumAge: 600_000 },
    );
  }

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[75] flex items-end sm:items-center justify-center sm:p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="absolute inset-0 bg-[rgba(28,25,23,0.45)]" onClick={onClose} aria-hidden="true" />
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="city-picker-title"
            className="relative w-full sm:max-w-2xl max-h-[88vh] flex flex-col bg-surface-container-lowest rounded-t-2xl sm:rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.12)] overflow-hidden"
          >
            <div className="p-5 pb-3 border-b border-surface-variant space-y-3">
              <div className="flex items-center justify-between">
                <p id="city-picker-title" className="font-headline-h3 text-headline-h3 text-on-surface">Choose your location</p>
                <button type="button" onClick={onClose} aria-label="Close" className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container-low">
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <label className="flex-1 flex items-center gap-2 h-11 px-3 rounded-lg border border-surface-variant bg-white focus-within:border-primary-container">
                  <span className="material-symbols-outlined text-[18px] text-on-surface-variant">search</span>
                  <input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search city, area or pincode" aria-label="Search city, area or pincode" className="flex-1 min-w-0 bg-transparent outline-none font-body-default text-body-default text-on-surface placeholder-[#78716C]" />
                </label>
                <button type="button" onClick={locate} disabled={locating} className="h-11 px-4 rounded-lg border border-primary-container text-primary-container font-caption-strong text-caption-strong flex items-center justify-center gap-1.5 hover:bg-[#FFF1F2] disabled:opacity-60">
                  <span className="material-symbols-outlined text-[18px]">my_location</span>
                  {locating ? 'Locating…' : 'Use my location'}
                </button>
              </div>
              {locateError && <p role="alert" className="font-caption text-caption text-[#8E0E17]">{locateError}</p>}
            </div>
            <div className="grid sm:grid-cols-[220px_1fr] min-h-0 flex-1 overflow-hidden">
              <ul className="overflow-y-auto border-b sm:border-b-0 sm:border-r border-surface-variant max-h-[32vh] sm:max-h-none py-1" aria-label="Cities">
                {cities.map((c) => (
                  <li key={c.slug}>
                    <button
                      type="button"
                      onClick={() => setCity(c.slug)}
                      onDoubleClick={() => choose(c.slug)}
                      aria-pressed={c.slug === city}
                      className={`w-full text-left px-4 py-2.5 flex items-center justify-between gap-2 font-body-default text-body-default ${c.slug === city ? 'bg-[#FFF1F2] text-primary-container font-body-strong' : 'text-on-surface hover:bg-surface-container-low'}`}
                    >
                      <span>
                        {c.name}
                        <span className="block font-micro text-micro text-on-surface-variant">{c.state}</span>
                      </span>
                      {c.slug === current.city && <span className="material-symbols-outlined text-[16px] text-primary-container">check</span>}
                    </button>
                  </li>
                ))}
                {!cities.length && <li className="px-4 py-6 font-caption text-caption text-on-surface-variant">We don’t serve “{query}” yet.</li>}
              </ul>
              <div className="overflow-y-auto p-4 space-y-3">
                <button type="button" onClick={() => choose(selected.slug)} className="w-full h-11 rounded-lg bg-primary-container hover:bg-[#8E0E17] text-white font-body-strong text-body-strong flex items-center justify-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px]">location_on</span>
                  All of {selected.name}
                </button>
                <p className="font-caption-strong text-caption-strong text-on-surface-variant uppercase tracking-wider">Popular areas in {selected.name}</p>
                <div className="grid grid-cols-2 gap-2">
                  {localities.map((l) => (
                    <button key={l.slug} type="button" onClick={() => choose(selected.slug, l.slug)} className={`text-left px-3 py-2 rounded-lg border font-caption text-caption hover:border-primary-container ${current.locality?.slug === l.slug && current.city === selected.slug ? 'border-primary-container bg-[#FFF1F2] text-primary-container' : 'border-surface-variant text-on-surface'}`}>
                      <span className="font-caption-strong text-caption-strong block">{l.name}</span>
                      <span className="text-micro font-micro text-on-surface-variant tabular-nums">{l.pincode}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
