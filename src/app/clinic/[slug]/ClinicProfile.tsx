'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { slotLabel } from '@/components/DoctorCard';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Toast, { useToast } from '@/components/Toast';
import { api, photo, rupees, type Doctor, type Facility, type Slot } from '@/lib/api';

/** Interior shots shown alongside each facility's own exterior photo. */
const GALLERY = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuB-yeCH51N12rpPo_7G6QMICKO9iJHLhO5ZRVk0lmOrt1YeQupaCNjnwLZcuapTVpibWhJUa2w4qzgz6nsS7bzPCsi-cJCsHMuJgn9za5FoR6BkS-4VlmUuxK-VN5DV6S06-RIgtkMLdirPtkfQ0XvkDLMgcO9dTyD2be344CRi2mUpU4g4k90PyNQfxT88gJEi81dBS6rG2cEYX0ev9u64qiJf1_g_v1DONcbk2fXWlpPRfU0Co2WA',
];
const AMENITY_ICON: Record<string, string> = {
  '24x7 Pharmacy': 'medication', 'Cashless Insurance Desk': 'credit_card', 'Ambulance Service': 'ambulance', 'Digital Reports': 'description',
  'Wheelchair Accessible': 'accessible', 'Car Parking': 'local_parking', Cafeteria: 'restaurant', 'Online Payments': 'payments', 'Air-conditioned Waiting': 'ac_unit',
};
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const mapsUrl = (q: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
const specialtyLabel = (slug: string) => slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

export default function ClinicProfile({ facility: f, doctors }: { facility: Facility; doctors: Doctor[] }) {
  const router = useRouter();
  const [toast, showToast] = useToast();
  const [dept, setDept] = useState<string | null>(null);
  const [doctorSlug, setDoctorSlug] = useState(doctors[0]?.slug ?? '');
  const [slots, setSlots] = useState<Slot[] | null>(null);
  const [slotId, setSlotId] = useState<string | null>(null);

  const specialties = useMemo(() => [...new Set(doctors.map((d) => d.specialty))], [doctors]);
  const shownDoctors = dept ? doctors.filter((d) => d.specialty === dept) : doctors;
  const doctor = doctors.find((d) => d.slug === doctorSlug) ?? null;
  const open24 = f.openHours.toLowerCase().includes('24');
  const today = new Date().toLocaleDateString('en-IN', { weekday: 'long' });

  // In-clinic slots for the chosen doctor, next few days.
  useEffect(() => {
    if (!doctorSlug) return;
    setSlots(null);
    setSlotId(null);
    api.slots(doctorSlug, 'clinic').then((r) => setSlots(r.slots)).catch(() => setSlots([]));
  }, [doctorSlug]);

  const slotsByDay = useMemo(() => {
    const map = new Map<string, Slot[]>();
    for (const s of slots ?? []) {
      const key = new Date(s.startsAt).toDateString();
      map.set(key, [...(map.get(key) ?? []), s]);
    }
    return [...map.entries()].slice(0, 5);
  }, [slots]);
  const [dayKey, setDayKey] = useState<string | null>(null);
  const activeDay = slotsByDay.find(([k]) => k === dayKey) ?? slotsByDay[0];

  async function share() {
    const url = window.location.href;
    try {
      if (navigator.share) await navigator.share({ title: f.name, text: `${f.name}, ${f.area}`, url });
      else {
        await navigator.clipboard.writeText(url);
        showToast('Link copied');
      }
    } catch {
      // Share sheet dismissed.
    }
  }

  return (
    <>
      <Header />
      <main className="w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop py-space-md pb-28 lg:pb-space-md">
        <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-2 text-caption font-caption text-outline mb-space-base">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <Link href={f.type === 'hospital' ? '/bangalore/hospitals' : '/bangalore/clinics'} className="hover:text-primary">{f.type === 'hospital' ? 'Hospitals' : 'Clinics'}</Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-on-surface font-caption-strong text-caption-strong truncate">{f.name}</span>
        </nav>

        {/* GALLERY */}
        <section className="grid grid-cols-12 gap-3 h-[220px] sm:h-[340px] rounded-2xl overflow-hidden bg-surface-container-lowest border border-[#E7E5E4] shadow-sm mb-space-base">
          <div className="col-span-12 sm:col-span-8 relative overflow-hidden h-full">
            {f.photoUrl && <img className="w-full h-full object-cover" alt={`${f.name} exterior`} src={`${f.photoUrl}=w1200`} />}
            <div className="absolute bottom-4 left-4 bg-surface-container-lowest/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#E7E5E4] flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
              <span className="font-caption-strong text-caption-strong text-on-surface">{f.tagline}</span>
            </div>
          </div>
          <div className="hidden sm:block col-span-4 h-full overflow-hidden rounded-lg">
            <img loading="lazy" className="w-full h-full object-cover" alt={`${f.shortName} interior`} src={`${GALLERY[0]}=w600`} />
          </div>
        </section>

        {/* HERO */}
        <section className="bg-surface-container-lowest border border-[#E7E5E4] rounded-2xl p-5 sm:p-6 shadow-sm mb-space-lg flex flex-col lg:flex-row lg:items-start justify-between gap-5">
          <div className="space-y-2 min-w-0">
            <div className="flex flex-wrap gap-2">
              {f.nabh && <span className="inline-flex items-center gap-1 bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857] text-micro font-micro px-2 py-0.5 rounded-full"><span className="material-symbols-outlined text-[13px]">shield</span>NABH accredited</span>}
              {f.emergency24x7 && <span className="inline-flex items-center gap-1 bg-[#EE1C25] text-white text-micro font-micro px-2 py-0.5 rounded-full"><span className="material-symbols-outlined text-[13px]">emergency</span>24x7 emergency</span>}
              <span className="inline-flex items-center gap-1 bg-surface-container border border-[#E7E5E4] text-on-surface-variant text-micro font-micro px-2 py-0.5 rounded-full capitalize">{f.type}</span>
            </div>
            <h1 className="text-display font-display text-on-surface tracking-tight">{f.name}</h1>
            <p className="text-body-default font-body-default text-on-surface-variant">
              {[f.established && `Since ${f.established}`, f.beds > 0 && `${f.beds} beds`, `${f.departments.length} departments`, `${doctors.length} doctors on Curxx`].filter(Boolean).join(' · ')}
            </p>
            <p className="text-caption font-caption text-on-surface-variant flex items-start gap-1"><span className="material-symbols-outlined text-[16px] text-outline">pin_drop</span>{f.address}</p>
            <div className="flex items-center gap-1 text-caption-strong font-caption-strong text-on-surface">
              <span className="material-symbols-outlined text-amber-500 text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>{f.rating}
              <span className="text-outline font-caption">({f.reviewCount.toLocaleString('en-IN')} Google reviews)</span>
            </div>
          </div>
          <div className="flex flex-wrap lg:flex-col gap-2 shrink-0">
            {f.phone && <a href={`tel:${f.phone.replace(/\s/g, '')}`} className="h-11 px-4 rounded-lg border border-[#E7E5E4] bg-white text-on-surface font-caption-strong text-caption-strong flex items-center gap-1.5 hover:bg-[#FAFAF9]"><span className="material-symbols-outlined text-[18px]">call</span>{f.phone}</a>}
            <a href={mapsUrl(`${f.name} ${f.address}`)} target="_blank" rel="noopener noreferrer" className="h-11 px-4 rounded-lg border border-[#E7E5E4] bg-white text-on-surface font-caption-strong text-caption-strong flex items-center gap-1.5 hover:bg-[#FAFAF9]"><span className="material-symbols-outlined text-[18px]">directions</span>Directions</a>
            <button type="button" onClick={share} className="h-11 px-4 rounded-lg border border-[#E7E5E4] bg-white text-on-surface font-caption-strong text-caption-strong flex items-center gap-1.5 hover:bg-[#FAFAF9]"><span className="material-symbols-outlined text-[18px]">share</span>Share</button>
          </div>
        </section>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="flex-1 min-w-0 space-y-space-lg w-full">
            <nav aria-label="Sections" className="sticky top-16 z-20 bg-surface border-b border-[#E7E5E4] flex gap-6 overflow-x-auto no-scrollbar py-2">
              {[['overview', 'Overview'], ['doctors', `Doctors (${doctors.length})`], ['timings', 'Timings'], ['departments', 'Departments']].map(([id, label]) => (
                <a key={id} href={`#${id}`} className="text-on-surface-variant hover:text-primary font-body-default text-body-default whitespace-nowrap pb-1">{label}</a>
              ))}
            </nav>

            <section id="overview" className="scroll-mt-32 space-y-4">
              <h2 className="text-headline-h2 font-headline-h2 text-on-surface">About</h2>
              <p className="text-body-default font-body-default text-on-surface-variant leading-relaxed">{f.about}</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {f.amenities.map((a) => (
                  <div key={a} className="p-3 rounded-xl border border-[#E7E5E4] bg-surface-container-lowest flex flex-col gap-2">
                    <span className="w-9 h-9 rounded-lg bg-[#FFF1F2] text-primary-container flex items-center justify-center"><span className="material-symbols-outlined text-[20px]">{AMENITY_ICON[a] ?? 'check'}</span></span>
                    <span className="text-caption-strong font-caption-strong text-on-surface">{a}</span>
                  </div>
                ))}
              </div>
              {f.insurers.length > 0 && (
                <div className="p-4 rounded-xl border border-[#E7E5E4] bg-surface-container-lowest">
                  <h3 className="font-body-strong text-body-strong text-on-surface mb-2">Cashless insurance partners</h3>
                  <div className="flex flex-wrap gap-2">
                    {f.insurers.map((i) => <span key={i} className="px-2.5 py-1 rounded-full bg-surface-container border border-[#E7E5E4] text-caption font-caption text-on-surface">{i}</span>)}
                  </div>
                </div>
              )}
              {f.emergency24x7 && (
                <div className="p-4 rounded-xl border-2 border-[#EE1C25] bg-[#FFF1F2] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <p className="font-body-strong text-body-strong text-[#1C1917] flex items-center gap-1.5"><span className="material-symbols-outlined text-[#EE1C25]">e911_emergency</span>24x7 emergency department</p>
                    <p className="font-caption text-caption text-on-surface-variant">Walk in any time. For an ambulance, call 108.</p>
                  </div>
                  <a href="tel:108" className="h-11 px-5 rounded-lg bg-[#EE1C25] text-white font-caption-strong text-caption-strong flex items-center justify-center gap-1.5"><span className="material-symbols-outlined text-[18px]">call</span>Call 108</a>
                </div>
              )}
            </section>

            <section id="doctors" className="scroll-mt-32 space-y-4">
              <h2 className="text-headline-h2 font-headline-h2 text-on-surface">Doctors at {f.shortName}</h2>
              {specialties.length > 1 && (
                <div className="flex flex-wrap gap-2">
                  <button type="button" onClick={() => setDept(null)} className={!dept ? 'h-9 px-4 rounded-full bg-[#FFF1F2] border border-primary-container text-primary-container font-caption-strong text-caption' : 'h-9 px-4 rounded-full border border-[#E7E5E4] bg-white text-on-surface font-caption text-caption'}>All</button>
                  {specialties.map((s) => (
                    <button key={s} type="button" onClick={() => setDept(s)} className={dept === s ? 'h-9 px-4 rounded-full bg-[#FFF1F2] border border-primary-container text-primary-container font-caption-strong text-caption' : 'h-9 px-4 rounded-full border border-[#E7E5E4] bg-white text-on-surface font-caption text-caption'}>{specialtyLabel(s)}</button>
                  ))}
                </div>
              )}
              {shownDoctors.length === 0 ? (
                <p className="text-body-default font-body-default text-on-surface-variant">No doctors from this centre are bookable on Curxx yet.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {shownDoctors.map((d) => (
                    <div key={d.slug} className="p-4 rounded-xl border border-[#E7E5E4] bg-surface-container-lowest flex flex-col gap-3">
                      <div className="flex items-center gap-3">
                        <img src={photo(d.photoUrl, 112)} alt={d.name} loading="lazy" className="w-14 h-14 rounded-full object-cover border border-[#E7E5E4]" />
                        <div className="min-w-0">
                          <Link href={`/doctor/${d.slug}`} className="block font-body-strong text-body-strong text-on-surface hover:text-primary truncate">{d.name}</Link>
                          <p className="font-caption text-caption text-on-surface-variant truncate">{d.title}</p>
                          <p className="font-micro text-micro text-outline">{d.experienceYears} yrs · {d.recommendPercent}% recommend</p>
                        </div>
                      </div>
                      {d.nextSlotAt && <p className="font-micro text-micro text-[#8E0E17] bg-[#FFF1F2] border border-[#F9C6C9] rounded px-2 py-1 text-center">Next: {slotLabel(d.nextSlotAt)}</p>}
                      <div className="flex items-center justify-between gap-2 mt-auto">
                        <span className="font-body-strong text-body-strong text-on-surface">{rupees(d.fee)}</span>
                        <button type="button" onClick={() => { setDoctorSlug(d.slug); document.getElementById('book-opd')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }} className="h-9 px-3.5 rounded-lg bg-primary-container hover:bg-primary text-white font-caption-strong text-caption-strong">Book visit</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section id="timings" className="scroll-mt-32 space-y-3">
              <h2 className="text-headline-h2 font-headline-h2 text-on-surface">Timings</h2>
              <ul className="rounded-xl border border-[#E7E5E4] bg-surface-container-lowest divide-y divide-[#E7E5E4]">
                {DAYS.map((d) => (
                  <li key={d} className={`flex justify-between px-4 py-2.5 font-caption text-caption ${d === today ? 'bg-[#FFF1F2] font-caption-strong text-primary-container' : 'text-on-surface'}`}>
                    <span>{d}{d === today ? ' (today)' : ''}</span><span>{f.openHours}</span>
                  </li>
                ))}
              </ul>
              {!open24 && f.emergency24x7 === false && <p className="font-caption text-caption text-on-surface-variant">Outpatient centre — no overnight emergency care. <Link href="/bangalore/hospitals?emergency=true" className="text-primary-container underline">Find a 24x7 hospital</Link>.</p>}
            </section>

            <section id="departments" className="scroll-mt-32 space-y-3">
              <h2 className="text-headline-h2 font-headline-h2 text-on-surface">Departments &amp; services</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ul className="p-4 rounded-xl border border-[#E7E5E4] bg-surface-container-lowest space-y-2">
                  {f.departments.map((d) => <li key={d} className="flex items-center gap-2 font-caption text-caption text-on-surface"><span className="material-symbols-outlined text-[16px] text-tertiary">check_circle</span>{d}</li>)}
                </ul>
                <ul className="p-4 rounded-xl border border-[#E7E5E4] bg-surface-container-lowest space-y-2">
                  {f.services.map((s) => <li key={s} className="flex items-center gap-2 font-caption text-caption text-on-surface"><span className="material-symbols-outlined text-[16px] text-primary-container">medical_services</span>{s}</li>)}
                </ul>
              </div>
            </section>
          </div>

          {/* OPD BOOKING */}
          <aside id="book-opd" className="w-full lg:w-[360px] lg:shrink-0 lg:sticky lg:top-24 space-y-4 scroll-mt-24">
            <div className="bg-surface-container-lowest border border-[#E7E5E4] rounded-2xl p-5 shadow-sm space-y-4">
              <h2 className="font-headline-h3 text-headline-h3 text-on-surface">Book an OPD visit</h2>
              {doctors.length === 0 ? (
                <p className="font-caption text-caption text-on-surface-variant">Online booking isn&apos;t available for this centre yet. Call the front desk to book.</p>
              ) : (
                <>
                  <label className="block space-y-1">
                    <span className="font-caption-strong text-caption-strong text-on-surface">Doctor</span>
                    <select value={doctorSlug} onChange={(e) => setDoctorSlug(e.target.value)} className="w-full h-11 px-3 rounded-lg border border-[#E7E5E4] bg-white font-body-default text-body-default">
                      {doctors.map((d) => <option key={d.slug} value={d.slug}>{d.name} · {specialtyLabel(d.specialty)}</option>)}
                    </select>
                  </label>
                  {doctor && (
                    <div className="flex items-center justify-between p-3 rounded-lg bg-surface-container-low border border-[#E7E5E4]">
                      <span className="font-caption text-caption text-on-surface-variant">Consultation fee</span>
                      <span className="font-body-strong text-body-strong text-on-surface">{rupees(doctor.fee)}</span>
                    </div>
                  )}
                  {slots === null ? (
                    <div className="h-28 rounded-lg bg-surface-container-low animate-pulse" aria-busy="true" />
                  ) : slotsByDay.length === 0 ? (
                    <p className="font-caption text-caption text-on-surface-variant">No clinic slots in the next few days. <Link href={`/doctor/${doctorSlug}?mode=video`} className="text-primary-container underline">Try a video consult</Link>.</p>
                  ) : (
                    <>
                      <div className="grid grid-cols-5 gap-1.5">
                        {slotsByDay.map(([key]) => {
                          const d = new Date(key);
                          const selected = activeDay?.[0] === key;
                          return (
                            <button key={key} type="button" onClick={() => { setDayKey(key); setSlotId(null); }} aria-pressed={selected} className={`flex flex-col items-center py-2 rounded-lg border ${selected ? 'border-primary-container bg-[#FFF1F2] text-primary font-semibold' : 'border-[#E7E5E4] bg-surface-container-low'}`}>
                              <span className="text-micro font-micro">{d.toLocaleDateString('en-IN', { weekday: 'short' })}</span>
                              <span className="font-body-strong text-caption">{d.getDate()}</span>
                            </button>
                          );
                        })}
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {(activeDay?.[1] ?? []).map((s) => (
                          <button key={s.id} type="button" onClick={() => setSlotId(s.id)} aria-pressed={slotId === s.id} className={slotId === s.id ? 'py-2 rounded-lg border-2 border-primary-container bg-[#FFF1F2] text-primary-container font-caption-strong text-caption' : 'py-2 rounded-lg border border-[#E7E5E4] bg-white text-on-surface font-caption text-caption hover:border-[#1C1917]'}>
                            {new Date(s.startsAt).toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true }).toUpperCase()}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                  <button type="button" disabled={!slotId} onClick={() => router.push(`/book?slot=${slotId}&doctor=${doctorSlug}`)} className="w-full h-12 rounded-lg bg-primary-container hover:bg-[#8E0E17] disabled:bg-[#A8A29E] text-white font-body-strong text-body-strong">
                    {slotId ? 'Continue to book' : 'Pick a time'}
                  </button>
                  <p className="font-micro text-micro text-outline text-center">Free cancellation up to 2 hours before your visit</p>
                </>
              )}
            </div>
          </aside>
        </div>
      </main>
      <Toast message={toast} />
      <Footer />
    </>
  );
}
