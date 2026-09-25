'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { AccreditationBadges, LabMap, LabMiniCard, directionsUrl, labTypeLabel } from '@/components/labs/LabCard';
import LabTestCard from '@/components/labs/LabTestCard';
import ContactButtons from '@/components/profile/ContactButtons';
import ReportIssue from '@/components/profile/ReportIssue';
import Toast, { useToast } from '@/components/Toast';
import { api, errorMessage, rupees, type Lab, type LabSummary, type LabTest } from '@/lib/api';
import { useCart } from '@/lib/cart';
import { saveLabChoice } from '@/lib/lab-booking';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const AMENITY_ICON: Record<string, string> = {
  'Separate women’s collection room': 'woman', 'Paediatric phlebotomy': 'child_care', 'Wheelchair accessible': 'accessible', 'Digital reports on WhatsApp & Curxx': 'description',
  'Air-conditioned waiting': 'ac_unit', 'Car parking': 'local_parking', 'Ground-floor collection, no steps': 'elevator', 'Near MG Road Metro': 'subway',
};

/** "6:30 AM – 10:00 PM" → minutes since midnight, or null for "Closed". */
function parseHours(hours: string): [number, number] | null {
  const m = hours.match(/(\d{1,2}):(\d{2})\s*(AM|PM)\s*[–-]\s*(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!m) return null;
  const toMin = (h: string, min: string, ap: string) => ((Number(h) % 12) + (ap.toUpperCase() === 'PM' ? 12 : 0)) * 60 + Number(min);
  return [toMin(m[1]!, m[2]!, m[3]!), toMin(m[4]!, m[5]!, m[6]!)];
}

function openNow(lab: Pick<Lab, 'openHours' | 'sundayHours'>) {
  const now = new Date();
  const range = parseHours(now.getDay() === 0 ? lab.sundayHours : lab.openHours);
  if (!range) return false;
  const minutes = now.getHours() * 60 + now.getMinutes();
  return minutes >= range[0] && minutes < range[1];
}

export default function LabProfile({ lab, tests, nearby, contact }: { lab: Lab; tests: LabTest[]; nearby: LabSummary[]; contact?: { phone: string; whatsapp: string } }) {
  const router = useRouter();
  const cart = useCart('lab');
  const [toast, showToast] = useToast();
  const [tab, setTab] = useState<'package' | 'test'>(tests.some((t) => t.kind === 'package') ? 'package' : 'test');
  const [mode, setMode] = useState<'home' | 'lab'>(lab.homeCollection ? 'home' : 'lab');
  const [pincode, setPincode] = useState('');
  const [coverage, setCoverage] = useState<{ ok: boolean; text: string } | null>(null);
  const [checking, setChecking] = useState(false);

  const today = DAYS[(new Date().getDay() + 6) % 7];
  const isOpen = openNow(lab);
  const shown = tests.filter((t) => t.kind === tab);
  const notHere = cart.items.filter((i) => !lab.tests.includes(i.slug));

  async function checkPincode(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[1-9]\d{5}$/.test(pincode)) return setCoverage({ ok: false, text: 'Enter a valid 6-digit pincode' });
    setChecking(true);
    try {
      const match = await api.labMatch({ pincode, tests: [], mode: 'home' });
      const here = match.labs.find((l) => l.slug === lab.slug);
      if (!match.place) setCoverage({ ok: false, text: match.reason ?? 'Home collection isn’t available at this pincode yet.' });
      else if (here?.canCollect) setCoverage({ ok: true, text: `Yes — ${lab.shortName} collects at ${match.place.area} (${here.distanceKm} km away).` });
      else {
        const other = match.labs.find((l) => l.canCollect);
        setCoverage({ ok: false, text: `${lab.shortName} doesn’t reach ${match.place.area}${here ? ` (${here.distanceKm} km)` : ''}.${other ? ` ${other.name} (${other.distanceKm} km) does.` : ''}` });
      }
    } catch (err) {
      setCoverage({ ok: false, text: errorMessage(err) });
    } finally {
      setChecking(false);
    }
  }

  function continueHere() {
    if (cart.count === 0) {
      document.getElementById('tests')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      showToast('Add a test to book at this lab');
      return;
    }
    saveLabChoice({ slug: lab.slug, name: lab.name, mode });
    router.push('/lab-tests/book');
  }

  async function share() {
    const url = window.location.href;
    try {
      if (navigator.share) await navigator.share({ title: lab.name, text: `${lab.name}, ${lab.area}`, url });
      else {
        await navigator.clipboard.writeText(url);
        showToast('Link copied');
      }
    } catch {
      // Share sheet dismissed.
    }
  }

  const bookingCard = (
    <div className="bg-surface-container-lowest border border-[#E7E5E4] rounded-2xl p-5 shadow-sm space-y-4">
      <h2 className="font-headline-h3 text-headline-h3 text-on-surface">Book at {lab.shortName}</h2>
      <div className="grid grid-cols-2 gap-2">
        {([
          { id: 'home', label: 'Home collection', icon: 'home_health', ok: lab.homeCollection, note: lab.homeCollection ? `Within ${lab.collectionRadiusKm} km` : 'Not offered' },
          { id: 'lab', label: 'Visit the lab', icon: 'directions_walk', ok: lab.walkIn, note: lab.walkIn ? 'Skip the queue' : 'Not offered' },
        ] as const).map((o) => (
          <button key={o.id} type="button" disabled={!o.ok} aria-pressed={mode === o.id} onClick={() => setMode(o.id)} className={`p-3 rounded-xl border text-left transition disabled:opacity-50 disabled:cursor-not-allowed ${mode === o.id ? 'border-2 border-primary-container bg-[#FFF1F2]' : 'border-[#E7E5E4] bg-white hover:border-outline'}`}>
            <span className="material-symbols-outlined text-[20px] text-primary-container">{o.icon}</span>
            <span className="block font-caption-strong text-caption-strong text-on-surface mt-1">{o.label}</span>
            <span className="block font-micro text-micro text-outline">{o.note}</span>
          </button>
        ))}
      </div>
      {cart.hydrated && cart.count > 0 ? (
        <div className="space-y-2">
          <p className="font-caption-strong text-caption-strong text-on-surface">Your booking · {cart.count} {cart.count === 1 ? 'test' : 'tests'} · {rupees(cart.total)}</p>
          <ul className="space-y-1">
            {cart.items.map((i) => (
              <li key={i.slug} className="flex items-center gap-1.5 font-caption text-caption text-on-surface-variant">
                <span className={`material-symbols-outlined text-[16px] ${lab.tests.includes(i.slug) ? 'text-[#047857]' : 'text-[#B45309]'}`}>{lab.tests.includes(i.slug) ? 'check_circle' : 'error'}</span>
                <span className="truncate">{i.name}</span>
              </li>
            ))}
          </ul>
          {notHere.length > 0 && (
            <p role="alert" className="px-3 py-2 rounded-lg bg-[#FFFBEB] border border-[#FDE68A] font-caption text-caption text-[#92400E]">
              {lab.shortName} doesn&apos;t run {notHere.map((i) => i.name).join(', ')}. Remove {notHere.length > 1 ? 'them' : 'it'} at checkout or pick a <Link href={`/${lab.city ?? 'bangalore'}/labs?test=${notHere[0]!.slug}`} className="underline">lab that does</Link>.
            </p>
          )}
        </div>
      ) : (
        <p className="font-caption text-caption text-on-surface-variant">Add tests from the list below — same price at every Curxx partner lab.</p>
      )}
      <button type="button" onClick={continueHere} className="w-full h-12 rounded-lg bg-primary-container hover:bg-[#8E0E17] text-white font-body-strong text-body-strong flex items-center justify-center gap-1.5 transition">
        {cart.count > 0 ? (mode === 'home' ? 'Book home collection' : 'Book a lab visit') : 'Choose tests'}
        <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
      </button>
    </div>
  );

  return (
    <>
      <Header />
      <main className="w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop py-space-md pb-40 lg:pb-space-md">
        <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-2 text-caption font-caption text-outline mb-space-base">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <Link href={`/${lab.city ?? 'bangalore'}/labs`} className="hover:text-primary">Labs</Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-on-surface font-caption-strong text-caption-strong truncate">{lab.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-start">
          <div className="lg:col-span-8 space-y-6 min-w-0">
            {/* Identity */}
            <section className="bg-surface-container-lowest border border-[#E7E5E4] rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container border border-surface-variant text-micro font-micro text-on-surface-variant">
                  <span className="material-symbols-outlined text-[14px]">{lab.type === 'reference' ? 'biotech' : 'science'}</span>{labTypeLabel(lab)}
                </span>
                <AccreditationBadges items={lab.accreditations} size="md" />
              </div>
              <div>
                <h1 className="font-display text-display text-on-surface tracking-tight">{lab.name}</h1>
                <p className="font-body-default text-body-default text-on-surface-variant mt-1">{lab.tagline}</p>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-caption font-caption text-on-surface-variant">
                <span className="inline-flex items-center gap-1 font-caption-strong text-on-surface">
                  <span className="material-symbols-outlined text-amber-500 text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>{lab.rating}
                  <span className="font-caption text-outline">({lab.reviewCount.toLocaleString('en-IN')} reviews)</span>
                </span>
                <span className={`inline-flex items-center gap-1 font-caption-strong ${isOpen ? 'text-[#047857]' : 'text-[#8E0E17]'}`}>
                  <span className={`w-2 h-2 rounded-full ${isOpen ? 'bg-[#047857]' : 'bg-[#C1121F]'}`}></span>{isOpen ? 'Open now' : 'Closed now'}
                </span>
                <span className="inline-flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-outline">description</span>Reports in {lab.reportTat}</span>
                {lab.established && <span className="inline-flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-outline">history</span>Since {lab.established}</span>}
              </div>
              <p className="flex items-start gap-1.5 font-body-default text-body-default text-on-surface">
                <span className="material-symbols-outlined text-[20px] text-primary-container shrink-0">pin_drop</span>{lab.address}
              </p>
              <div className="flex flex-wrap gap-2">
                <a href={directionsUrl(lab)} target="_blank" rel="noopener noreferrer" className="h-10 px-4 rounded-lg bg-primary-container hover:bg-[#8E0E17] text-white font-caption-strong text-caption-strong inline-flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px]">directions</span>Directions
                </a>
                <ContactButtons size="sm" showNumber={Boolean(lab.phone)} targetType="lab" slug={lab.slug} name={lab.name} phones={[lab.phone, contact?.phone]} whatsapps={[lab.whatsapp, contact?.whatsapp]} message={`Hi, I'd like to book a test at ${lab.name} (found on Curxx).`} />
                <button type="button" onClick={share} className="h-10 px-4 rounded-lg border border-[#E7E5E4] bg-white text-on-surface font-caption-strong text-caption-strong inline-flex items-center gap-1.5 hover:border-outline">
                  <span className="material-symbols-outlined text-[18px]">share</span>Share
                </button>
                <ReportIssue targetType="lab" slug={lab.slug} name={lab.name} className="px-1" />
              </div>
            </section>

            {/* Location & timings */}
            <section className="grid grid-cols-1 md:grid-cols-5 gap-4" aria-labelledby="location">
              <div className="md:col-span-3 bg-surface-container-lowest border border-[#E7E5E4] rounded-2xl p-4 shadow-sm space-y-3">
                <h2 id="location" className="font-headline-h3 text-headline-h3 text-on-surface flex items-center gap-2"><span className="material-symbols-outlined text-primary-container">map</span>Lab location</h2>
                <LabMap lat={lab.geo.lat} lng={lab.geo.lng} title={lab.name} />
                <p className="font-caption text-caption text-on-surface-variant">{lab.area} · {lab.distanceKm} km from you</p>
              </div>
              <div className="md:col-span-2 bg-surface-container-lowest border border-[#E7E5E4] rounded-2xl p-4 shadow-sm space-y-3">
                <h2 className="font-headline-h3 text-headline-h3 text-on-surface flex items-center gap-2"><span className="material-symbols-outlined text-primary-container">schedule</span>Timings</h2>
                <ul className="divide-y divide-[#E7E5E4]">
                  {DAYS.map((d) => (
                    <li key={d} className={`flex justify-between gap-2 py-1.5 font-caption text-caption ${d === today ? 'font-caption-strong text-on-surface' : 'text-on-surface-variant'}`}>
                      <span>{d}{d === today ? ' (today)' : ''}</span>
                      <span className={d === 'Sunday' && lab.sundayHours === 'Closed' ? 'text-[#8E0E17]' : ''}>{d === 'Sunday' ? lab.sundayHours : lab.openHours}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Home collection coverage */}
            <section className="bg-surface-container-lowest border border-[#E7E5E4] rounded-2xl p-5 shadow-sm space-y-3">
              <h2 className="font-headline-h3 text-headline-h3 text-on-surface flex items-center gap-2"><span className="material-symbols-outlined text-primary-container">home_health</span>Home sample collection</h2>
              {lab.homeCollection ? (
                <>
                  <p className="font-caption text-caption text-on-surface-variant">{lab.phlebotomists} trained phlebotomists per time slot, within {lab.collectionRadiusKm} km of {lab.area}. Samples travel in temperature-logged cold boxes and are processed the same day.</p>
                  <form onSubmit={checkPincode} className="flex flex-wrap items-start gap-2">
                    <label className="relative">
                      <span className="sr-only">Your pincode</span>
                      <input value={pincode} onChange={(e) => { setPincode(e.target.value.replace(/\D/g, '').slice(0, 6)); setCoverage(null); }} inputMode="numeric" placeholder="Enter your pincode" className="w-48 h-10 px-3 rounded-lg border border-[#E7E5E4] bg-white text-caption font-caption tabular-nums outline-none focus:border-primary-container" />
                    </label>
                    <button type="submit" disabled={checking} className="h-10 px-4 rounded-lg border border-[#E7E5E4] bg-white text-caption-strong font-caption-strong text-on-surface hover:border-outline disabled:opacity-60">{checking ? 'Checking…' : 'Check'}</button>
                  </form>
                  {coverage && <p role="status" className={`font-caption text-caption ${coverage.ok ? 'text-[#047857]' : 'text-[#92400E]'}`}>{coverage.text}</p>}
                </>
              ) : (
                <p className="font-caption text-caption text-on-surface-variant">This is a walk-in collection point — book a visit and skip the queue. For a home visit, <Link href={`/${lab.city ?? 'bangalore'}/labs?homeCollection=true`} className="text-primary-container hover:underline">see labs that collect at home</Link>.</p>
              )}
            </section>

            {/* Tests */}
            <section id="tests" className="space-y-4 scroll-mt-24">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h2 className="font-headline-h2 text-headline-h2 text-on-surface">Tests at {lab.shortName}</h2>
                  <p className="font-caption text-caption text-on-surface-variant">{lab.testCount} tests · same price at every Curxx partner lab</p>
                </div>
                <div className="inline-flex p-1 rounded-lg bg-surface-container border border-surface-variant" role="tablist">
                  {(['package', 'test'] as const).filter((k) => tests.some((t) => t.kind === k)).map((k) => (
                    <button key={k} type="button" role="tab" aria-selected={tab === k} onClick={() => setTab(k)} className={`h-9 px-4 rounded-md font-caption-strong text-caption-strong ${tab === k ? 'bg-white shadow-sm text-on-surface' : 'text-on-surface-variant'}`}>
                      {k === 'package' ? 'Packages' : 'Individual tests'} ({tests.filter((t) => t.kind === k).length})
                    </button>
                  ))}
                </div>
              </div>
              {shown.length === 0 ? (
                <p className="p-6 rounded-xl border border-dashed border-[#E7E5E4] text-center font-caption text-caption text-on-surface-variant">No {tab === 'package' ? 'packages' : 'individual tests'} at this lab.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{shown.map((t) => <LabTestCard key={t.slug} test={t} atLab={{ slug: lab.slug, name: lab.name, mode }} />)}</div>
              )}
            </section>

            {/* Quality */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-surface-container-lowest border border-[#E7E5E4] rounded-2xl p-5 shadow-sm space-y-3">
                <h2 className="font-headline-h3 text-headline-h3 text-on-surface flex items-center gap-2"><span className="material-symbols-outlined text-tertiary">workspace_premium</span>Quality &amp; sign-off</h2>
                <dl className="space-y-2 font-caption text-caption">
                  {lab.pathologist?.name && (
                    <div className="flex justify-between gap-3"><dt className="text-on-surface-variant">Pathologist</dt><dd className="text-right font-caption-strong text-on-surface">{lab.pathologist.name}, {lab.pathologist.qualification}<span className="block font-micro text-micro text-outline">{lab.pathologist.registration}</span></dd></div>
                  )}
                  {lab.nablCertificate && <div className="flex justify-between gap-3"><dt className="text-on-surface-variant">NABL certificate</dt><dd className="font-caption-strong text-on-surface">{lab.nablCertificate}</dd></div>}
                  <div className="flex justify-between gap-3"><dt className="text-on-surface-variant">Report turnaround</dt><dd className="font-caption-strong text-on-surface">{lab.reportTat}</dd></div>
                </dl>
                <ul className="pt-2 border-t border-[#E7E5E4] space-y-1.5">
                  {lab.equipment.map((e) => (
                    <li key={e} className="flex items-start gap-1.5 font-caption text-caption text-on-surface-variant"><span className="material-symbols-outlined text-[16px] text-outline">precision_manufacturing</span>{e}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-surface-container-lowest border border-[#E7E5E4] rounded-2xl p-5 shadow-sm space-y-3">
                <h2 className="font-headline-h3 text-headline-h3 text-on-surface flex items-center gap-2"><span className="material-symbols-outlined text-primary-container">info</span>About this lab</h2>
                <p className="font-caption text-caption text-on-surface-variant leading-relaxed">{lab.about}</p>
                <ul className="flex flex-wrap gap-2 pt-2 border-t border-[#E7E5E4]">
                  {lab.amenities.map((a) => (
                    <li key={a} className="inline-flex items-center gap-1 bg-[#FAFAF9] border border-[#E7E5E4] text-on-surface-variant text-micro font-micro px-2 py-1 rounded-md">
                      <span className="material-symbols-outlined text-[14px]">{AMENITY_ICON[a] ?? 'check'}</span>{a}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {nearby.length > 0 && (
              <section className="space-y-3">
                <div className="flex items-end justify-between gap-3">
                  <h2 className="font-headline-h2 text-headline-h2 text-on-surface">Other labs nearby</h2>
                  <Link href={`/${lab.city ?? 'bangalore'}/labs`} className="font-caption-strong text-caption-strong text-primary-container hover:underline">All labs</Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">{nearby.map((l) => <LabMiniCard key={l.slug} lab={l} />)}</div>
              </section>
            )}
          </div>

          <aside className="hidden lg:block lg:col-span-4 lg:sticky lg:top-20">{bookingCard}</aside>
        </div>

        <div className="lg:hidden mt-6">{bookingCard}</div>
      </main>

      <div className="lg:hidden fixed bottom-16 inset-x-0 z-40 bg-surface-container-lowest border-t border-surface-variant px-4 py-3 flex items-center justify-between gap-3 shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
        <div className="min-w-0">
          <p className="font-caption-strong text-caption-strong text-on-surface truncate">{lab.shortName}, {lab.area}</p>
          <p className="font-micro text-micro text-on-surface-variant">{cart.count > 0 ? `${cart.count} ${cart.count === 1 ? 'test' : 'tests'} · ${rupees(cart.total)}` : 'Add tests to book'}</p>
        </div>
        <button type="button" onClick={continueHere} className="h-11 px-5 rounded-lg bg-primary-container text-white font-caption-strong text-caption-strong shrink-0">{cart.count > 0 ? 'Book here' : 'Choose tests'}</button>
      </div>
      <Toast message={toast} />
      <Footer />
    </>
  );
}
