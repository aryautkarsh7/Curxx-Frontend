'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { api, type Suggestions } from '@/lib/api';
import { CONDITION_LIST, SPECIALTY_LIST } from '@/lib/catalogue-data';
import { conditionHref } from '@/lib/specialties';

type Option = { key: string; group: string; label: string; hint?: string; icon: string; href: string };

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

/** Where a typed query should go when the patient presses Enter without picking a suggestion. */
export function searchHref(raw: string, city: string, locality?: string) {
  const q = raw.trim();
  if (!q) return `/${city}/doctors${locality ? `/${locality}` : ''}`;
  const n = norm(q);
  const specialty = SPECIALTY_LIST.find((s) => norm(s.name) === n || norm(s.plural) === n || s.slug === n.replace(/ /g, '-'));
  if (specialty) return `/${city}/${specialty.slug}${locality ? `/${locality}` : ''}`;
  const condition = CONDITION_LIST.find((c) => norm(c.name) === n || c.slug === n.replace(/ /g, '-') || (c.popular && norm(c.popular) === n));
  if (condition) return conditionHref(city, condition.slug);
  return `/${city}/doctors?q=${encodeURIComponent(q)}`;
}

function toOptions(s: Suggestions, city: string, locality?: string): Option[] {
  const loc = locality ? `/${locality}` : '';
  return [
    ...s.specialties.map((x) => ({ key: `s-${x.slug}`, group: 'Specialties', label: x.plural, icon: x.icon, href: `/${city}/${x.slug}${loc}` })),
    ...s.conditions.map((x) => ({ key: `c-${x.slug}`, group: 'Symptoms & conditions', label: `${x.name} treatment`, hint: SPECIALTY_LIST.find((sp) => sp.slug === x.specialty)?.name, icon: 'symptoms', href: conditionHref(city, x.slug) })),
    ...s.doctors.map((x) => ({ key: `d-${x.slug}`, group: 'Doctors', label: x.name, hint: `${x.specialty} · ${x.area}`, icon: 'person', href: `/doctor/${x.slug}` })),
    ...s.facilities.map((x) => ({ key: `f-${x.slug}`, group: 'Hospitals & clinics', label: x.name, hint: `${x.category} · ${x.area}`, icon: 'local_hospital', href: `/clinic/${x.slug}` })),
    ...s.surgeries.map((x) => ({ key: `u-${x.slug}`, group: 'Surgeries', label: x.name, hint: x.category, icon: 'healing', href: `/${city}/surgery/${x.slug}` })),
    ...s.tests.map((x) => ({ key: `t-${x.slug}`, group: 'Lab tests & scans', label: x.name, hint: `₹${x.price.toLocaleString('en-IN')}`, icon: 'science', href: `/lab-tests/${x.slug}` })),
  ];
}

type Props = {
  city: string;
  locality?: string;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  /** Called with the href the search resolves to, so a parent "Find" button can reuse it. */
  onQueryChange?: (q: string) => void;
  label?: string;
};

export default function SearchSuggest({ city, locality, placeholder = 'Fever, Dermatologist, Cough', className = '', inputClassName = '', onQueryChange, label = 'Specialty or symptom' }: Props) {
  const router = useRouter();
  const listId = useId();
  const [q, setQ] = useState('');
  const [data, setData] = useState<Suggestions | null>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onQueryChange?.(q);
    const needle = q.trim();
    if (needle.length < 2) {
      setData(null);
      return;
    }
    let cancelled = false;
    const t = window.setTimeout(() => {
      api
        .suggest(needle, city)
        .then((r) => !cancelled && setData(r))
        .catch(() => !cancelled && setData(null));
    }, 180);
    return () => {
      cancelled = true;
      window.clearTimeout(t);
    };
  }, [q, city, onQueryChange]);

  useEffect(() => {
    const close = (e: MouseEvent) => !box.current?.contains(e.target as Node) && setOpen(false);
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  // Before typing: popular searches, so the box is useful on focus.
  const popular = useMemo<Option[]>(
    () => [
      ...CONDITION_LIST.filter((c) => c.popular).slice(0, 5).map((c) => ({ key: `p-${c.slug}`, group: 'Popular searches', label: c.popular!, icon: 'trending_up', href: conditionHref(city, c.slug) })),
      ...SPECIALTY_LIST.filter((s) => s.popular).slice(0, 4).map((s) => ({ key: `ps-${s.slug}`, group: 'Popular specialties', label: s.plural, icon: s.icon, href: `/${city}/${s.slug}${locality ? `/${locality}` : ''}` })),
    ],
    [city, locality],
  );
  const options = q.trim().length >= 2 ? (data ? toOptions(data, city, locality) : []) : popular;

  function go(href: string) {
    setOpen(false);
    router.push(href);
  }

  function onKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setOpen(true);
      setActive((i) => Math.min(options.length - 1, i + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => Math.max(-1, i - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      go(active >= 0 && options[active] ? options[active]!.href : searchHref(q, city, locality));
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  }

  let lastGroup = '';
  return (
    <div ref={box} className={`relative ${className}`}>
      <input
        role="combobox"
        aria-expanded={open && options.length > 0}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={active >= 0 ? `${listId}-${active}` : undefined}
        aria-label={label}
        value={q}
        onChange={(e) => {
          setQ(e.target.value);
          setOpen(true);
          setActive(-1);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKey}
        placeholder={placeholder}
        autoComplete="off"
        type="text"
        className={inputClassName}
      />
      {open && options.length > 0 && (
        <ul id={listId} role="listbox" className="absolute left-0 right-0 top-full mt-3 z-40 max-h-[60vh] overflow-y-auto rounded-xl border border-surface-variant bg-surface-container-lowest shadow-[0_8px_24px_rgba(0,0,0,0.12)] py-2 text-left min-w-[280px]">
          {options.map((o, i) => {
            const header = o.group !== lastGroup ? o.group : null;
            lastGroup = o.group;
            return (
              <li key={o.key} role="presentation">
                {header && <p className="px-4 pt-2 pb-1 text-micro font-micro uppercase tracking-wider text-on-surface-variant">{header}</p>}
                <button
                  id={`${listId}-${i}`}
                  role="option"
                  aria-selected={i === active}
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onClick={() => go(o.href)}
                  className={`w-full px-4 py-2 flex items-center gap-3 text-left ${i === active ? 'bg-surface-container-low' : ''}`}
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">{o.icon}</span>
                  <span className="min-w-0">
                    <span className="block font-caption-strong text-caption-strong text-on-surface truncate">{o.label}</span>
                    {o.hint && <span className="block font-micro text-micro text-on-surface-variant truncate">{o.hint}</span>}
                  </span>
                </button>
              </li>
            );
          })}
          {q.trim().length >= 2 && (
            <li role="presentation" className="border-t border-surface-variant mt-1 pt-1">
              <button type="button" onClick={() => go(searchHref(q, city, locality))} className="w-full px-4 py-2 flex items-center gap-3 text-left hover:bg-surface-container-low">
                <span className="material-symbols-outlined text-[18px] text-primary-container">search</span>
                <span className="font-caption-strong text-caption-strong text-primary-container">Search doctors for “{q.trim()}”</span>
              </button>
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
