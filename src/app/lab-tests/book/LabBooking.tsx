'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import AddressBook from '@/components/AddressBook';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import CollectionSlotPicker, { type CollectionChoice } from '@/components/labs/CollectionSlotPicker';
import { AccreditationBadges, LabMap, directionsUrl } from '@/components/labs/LabCard';
import RequireSignIn from '@/components/RequireSignIn';
import { ApiError, api, errorMessage, rupees, type Address, type CollectionMode, type LabMatch } from '@/lib/api';
import { clearCart, removeFromCart, useCart } from '@/lib/cart';
import { clearLabChoice, clearLabSlot, readLabChoice, readLabSlot, type LabChoice } from '@/lib/lab-booking';
import { useCity } from '@/lib/city-store';
import { getToken, getUser, setSession, useSession } from '@/lib/session';

const FIELD = 'w-full h-11 px-3 bg-white border border-[#E7E5E4] rounded-lg font-body-default text-body-default text-[#1C1917] placeholder-[#A8A29E] outline-none focus:border-primary-container focus:ring-2 focus:ring-[rgba(193,18,31,0.15)]';
const PAYMENT = [
  { id: 'upi', label: 'UPI', icon: 'qr_code_2' },
  { id: 'card', label: 'Card', icon: 'credit_card' },
  { id: 'cod', label: 'Pay at collection', icon: 'payments' },
] as const;
type MatchedLab = LabMatch['labs'][number];

function Step({ n, title, done, children }: { n: number; title: string; done: boolean; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-surface-variant bg-surface-container-lowest p-5 space-y-4">
      <h2 className="flex items-center gap-2.5 font-headline-h3 text-headline-h3 text-on-surface">
        <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${done ? 'bg-primary-container text-white' : 'ring-2 ring-primary-container text-primary-container'}`}>
          {done ? <span className="material-symbols-outlined text-[16px]">check</span> : n}
        </span>
        {title}
      </h2>
      {children}
    </section>
  );
}

/** Why a lab can't take this booking, for the disabled rows of the picker. */
function ineligibleReason(lab: MatchedLab, mode: CollectionMode, testName: (slug: string) => string) {
  if (!lab.offersAll) return `Doesn’t run ${lab.missingTests.map(testName).join(', ')}`;
  if (mode === 'lab' && !lab.canVisit) return 'No walk-ins';
  if (mode === 'home' && !lab.homeCollection) return 'Walk-in only';
  if (mode === 'home' && !lab.canCollect) return `Collects within ${lab.collectionRadiusKm} km only`;
  return '';
}

export default function LabBooking() {
  const router = useRouter();
  const cart = useCart('lab');
  const session = useSession();
  const [slot, setSlot] = useState<CollectionChoice | null>(null);
  const [slotKey, setSlotKey] = useState(0);
  const [mode, setMode] = useState<CollectionMode>('home');
  const [address, setAddress] = useState<Address | null>(null);
  /** For lab visits: the saved default address, so distances are measured from home. */
  const [homePincode, setHomePincode] = useState<string | undefined>(undefined);
  const [preferred, setPreferred] = useState<LabChoice | null>(null);
  const [match, setMatch] = useState<LabMatch | null>(null);
  const [matchError, setMatchError] = useState<string | null>(null);
  const [labSlug, setLabSlug] = useState<string | null>(null);
  const [labNotice, setLabNotice] = useState<string | null>(null);
  const [changingLab, setChangingLab] = useState(false);
  const [forSelf, setForSelf] = useState(true);
  const [patient, setPatient] = useState({ name: '', age: '', gender: '' as '' | 'female' | 'male' | 'other', phone: '' });
  const [payment, setPayment] = useState<'upi' | 'card' | 'cod'>('upi');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fastingTests, setFastingTests] = useState<string[]>([]);
  /** Scans and procedures in the cart — they need a visit to the centre. */
  const [visitOnly, setVisitOnly] = useState<string[]>([]);
  const { city } = useCity();

  const testSlugs = cart.items.map((i) => i.slug).join(',');
  const testName = (slug: string) => cart.items.find((i) => i.slug === slug)?.name ?? slug;

  useEffect(() => {
    setSlot(readLabSlot());
    const choice = readLabChoice();
    if (choice) {
      setPreferred(choice);
      setMode(choice.mode);
    }
  }, []);

  // Prefill the patient from the account when booking for yourself.
  useEffect(() => {
    if (!session.signedIn) return;
    const user = getUser();
    if (forSelf && user) setPatient((p) => ({ ...p, name: user.name || p.name, phone: user.phone, gender: (user.gender as typeof p.gender) || p.gender }));
  }, [session.signedIn, forSelf]);

  useEffect(() => {
    const token = getToken();
    if (!session.signedIn || !token) return;
    api.addresses(token).then(({ addresses }) => setHomePincode((addresses.find((a) => a.isDefault) ?? addresses[0])?.pincode)).catch(() => {});
  }, [session.signedIn]);

  // Fasting advice depends on which tests are booked.
  useEffect(() => {
    let live = true;
    Promise.all(cart.items.map((i) => api.labTest(i.slug).then((r) => r.test).catch(() => null))).then((tests) => {
      if (!live) return;
      setFastingTests(tests.flatMap((t) => (t?.fastingHours ? [`${t.name} (${t.fastingHours} hrs)`] : [])));
      const atCentre = tests.flatMap((t) => (t && t.homeCollection === false ? [t.name] : []));
      setVisitOnly(atCentre);
      // A scan can't be done at home: switch the booking to a lab visit.
      if (atCentre.length) setMode('lab');
    });
    return () => {
      live = false;
    };
  }, [testSlugs]); // eslint-disable-line react-hooks/exhaustive-deps

  // Which labs can take this booking from this address (or, for a visit, which are nearest).
  useEffect(() => {
    if (!cart.hydrated || !cart.count) return;
    if (mode === 'home' && !address) {
      setMatch(null);
      setLabSlug(null);
      return;
    }
    let live = true;
    setMatchError(null);
    api.labMatch({ pincode: mode === 'home' ? address?.pincode : homePincode, city, tests: testSlugs.split(','), mode })
      .then((m) => {
        if (!live) return;
        setMatch(m);
        const eligible = (slug?: string | null) => Boolean(slug && m.labs.some((l) => l.slug === slug && l.eligible));
        setLabSlug((current) => {
          if (eligible(current)) return current;
          if (preferred && eligible(preferred.slug)) return preferred.slug;
          return m.recommended;
        });
        if (preferred && !eligible(preferred.slug)) {
          const lab = m.labs.find((l) => l.slug === preferred.slug);
          const why = lab ? ineligibleReason(lab, mode, (s) => cart.items.find((i) => i.slug === s)?.name ?? s) : '';
          setLabNotice(m.recommended ? `${preferred.name} can’t take this booking${why ? ` (${why.toLowerCase()})` : ''}, so we’ve picked the nearest lab that can.` : null);
        } else setLabNotice(null);
      })
      .catch((e) => live && setMatchError(errorMessage(e)));
    return () => {
      live = false;
    };
  }, [cart.hydrated, cart.count, mode, address?.pincode, homePincode, testSlugs, city]); // eslint-disable-line react-hooks/exhaustive-deps

  const lab = match?.labs.find((l) => l.slug === labSlug && l.eligible) ?? null;
  const eligibleLabs = match?.labs.filter((l) => l.eligible) ?? [];
  const patientValid = patient.name.trim().length >= 2 && /^[6-9]\d{9}$/.test(patient.phone) && (patient.age === '' || (Number(patient.age) >= 0 && Number(patient.age) <= 120));
  const whereDone = Boolean(lab) && (mode === 'lab' || Boolean(address));
  const ready = cart.count > 0 && Boolean(slot) && whereDone && patientValid;

  function switchMode(next: CollectionMode) {
    if (next === mode) return;
    setMode(next);
    setChangingLab(false);
    setError(null);
  }

  async function confirm() {
    const token = getToken();
    if (!token || !ready || !slot || !lab) return;
    setBusy(true);
    setError(null);
    try {
      const { order } = await api.placeOrder({
        kind: 'lab',
        items: cart.items.map((i) => ({ slug: i.slug })),
        collectionMode: mode,
        labSlug: lab.slug,
        ...(mode === 'home' && address
          ? { address: { label: address.label, line1: address.line1, line2: address.line2 ?? '', area: address.area ?? '', city: address.city ?? 'Bengaluru', pincode: address.pincode, phone: address.phone } }
          : {}),
        patient: { name: patient.name.trim(), phone: patient.phone, ...(patient.age ? { age: Number(patient.age) } : {}), ...(patient.gender ? { gender: patient.gender } : {}) },
        pickup: slot,
        paymentMethod: payment,
      }, token);
      // Booking for yourself also names the account if it has no name yet.
      if (forSelf && !getUser()?.name) {
        api.updateProfile({ name: patient.name.trim() }, token).then(({ user }) => setSession(token, user)).catch(() => {});
      }
      clearCart('lab');
      clearLabSlot();
      clearLabChoice();
      router.push(`/orders/${order.reference}?placed=1`);
    } catch (e) {
      if (e instanceof ApiError && e.code === 'slot_unavailable') {
        setSlot(null);
        setSlotKey((k) => k + 1); // reload live availability
      }
      setError(errorMessage(e));
      setBusy(false);
    }
  }

  const missing = !patientValid
    ? 'Complete the patient details'
    : mode === 'home' && !address
      ? 'Add a collection address'
      : !lab
        ? 'Choose a lab'
        : !slot
          ? `Pick a ${mode === 'home' ? 'collection' : 'visit'} slot`
          : null;

  const labRow = (l: MatchedLab) => {
    const why = ineligibleReason(l, mode, testName);
    const selected = l.slug === labSlug && l.eligible;
    return (
      <li key={l.slug}>
        <label className={`flex items-start gap-3 p-3.5 rounded-xl border transition ${!l.eligible ? 'border-[#E7E5E4] bg-[#FAFAF9] opacity-70 cursor-not-allowed' : selected ? 'border-2 border-primary-container bg-[#FFF1F2] cursor-pointer' : 'border-[#E7E5E4] bg-white hover:border-outline cursor-pointer'}`}>
          <input type="radio" name="lab" disabled={!l.eligible} checked={selected} onChange={() => { setLabSlug(l.slug); setLabNotice(null); setChangingLab(false); }} className="mt-1 w-[18px] h-[18px] text-[#C1121F] focus:ring-[#C1121F]" />
          <span className="flex-1 min-w-0">
            <span className="flex items-center gap-2 flex-wrap">
              <span className="font-body-strong text-body-strong text-on-surface">{l.name}</span>
              <AccreditationBadges items={l.accreditations} />
            </span>
            <span className="block font-caption text-caption text-on-surface-variant mt-0.5">{l.area} · {l.distanceKm} km · ★ {l.rating} · Reports in {l.reportTat}</span>
            {mode === 'lab' && <span className="block font-caption text-caption text-outline">{l.address} · {l.openHours}</span>}
            {why && <span className="block font-caption-strong text-micro text-[#B45309] mt-0.5">{why}</span>}
          </span>
        </label>
      </li>
    );
  };

  return (
    <>
      <Header />
      <main className="flex-1 w-full max-w-[1000px] mx-auto px-margin sm:px-margin-desktop py-8 pb-40 lg:pb-12">
        <Link href="/lab-tests" className="inline-flex items-center gap-1 font-caption-strong text-caption text-on-surface-variant hover:text-on-surface">
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>Lab tests
        </Link>
        <h1 className="font-headline-h1 text-headline-h1 text-on-surface mt-2">{mode === 'home' ? 'Book home sample collection' : 'Book a lab visit'}</h1>
        <p className="font-caption text-caption text-on-surface-variant mt-1">
          {mode === 'home' ? 'One visit collects samples for every test in your booking.' : 'Walk in at your slot — your tests are pre-registered, so there’s no queue at the counter.'}
        </p>

        {cart.hydrated && cart.count === 0 ? (
          <div className="mt-6 p-8 rounded-2xl border border-surface-variant bg-surface-container-lowest text-center space-y-3">
            <span className="material-symbols-outlined text-[40px] text-outline">science</span>
            <p className="font-body-strong text-body-strong text-on-surface">No tests in your booking yet</p>
            <div className="flex flex-wrap justify-center gap-2">
              <Link href="/lab-tests" className="h-11 px-5 inline-flex items-center rounded-lg bg-primary-container text-white font-caption-strong text-caption-strong">Browse lab tests</Link>
              <Link href="/labs" className="h-11 px-5 inline-flex items-center rounded-lg border border-[#E7E5E4] bg-white text-on-surface font-caption-strong text-caption-strong">Find a lab near you</Link>
            </div>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7 space-y-4">
              <Step n={1} title="Tests" done={cart.count > 0}>
                <ul className="divide-y divide-surface-variant">
                  {cart.items.map((i) => (
                    <li key={i.slug} className="flex items-center justify-between gap-3 py-2.5">
                      <div className="min-w-0">
                        <Link href={`/lab-tests/${i.slug}`} className="font-body-strong text-body-strong text-on-surface hover:text-primary-container">{i.name}</Link>
                        {i.subtitle && <p className="font-caption text-caption text-on-surface-variant">{i.subtitle}</p>}
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="font-body-strong text-body-strong">{rupees(i.price)}</span>
                        <button type="button" onClick={() => removeFromCart(i.slug, 'lab')} aria-label={`Remove ${i.name}`} className="p-1 text-outline hover:text-[#8E0E17]"><span className="material-symbols-outlined text-[18px]">close</span></button>
                      </div>
                    </li>
                  ))}
                </ul>
                <Link href="/lab-tests" className="inline-flex items-center gap-1 font-caption-strong text-caption text-primary-container hover:underline"><span className="material-symbols-outlined text-[16px]">add</span>Add another test</Link>
                {fastingTests.length > 0 && (
                  <div className="p-3 rounded-lg bg-[#FFF1F2] border border-[#F9C6C9] flex items-start gap-2">
                    <span className="material-symbols-outlined text-[18px] text-primary">alarm</span>
                    <p className="font-caption text-caption text-on-surface-variant"><span className="font-caption-strong text-[#8E0E17]">Fasting needed:</span> {fastingTests.join(', ')}. Water is fine. Pick a morning slot.</p>
                  </div>
                )}
              </Step>

              <RequireSignIn title="Sign in to book your collection" body="We’ll send the phlebotomist’s details and your report to your mobile number." icon="science">
                <div className="space-y-4">
                  <Step n={2} title="Patient" done={patientValid}>
                    <div className="grid grid-cols-2 gap-2">
                      {[{ v: true, l: 'Myself' }, { v: false, l: 'Family member' }].map((o) => (
                        <button key={o.l} type="button" onClick={() => { setForSelf(o.v); if (!o.v) setPatient({ name: '', age: '', gender: '', phone: getUser()?.phone ?? '' }); }} className={forSelf === o.v ? 'h-11 rounded-lg bg-[#FFF1F2] border-2 border-primary-container text-primary-container font-caption-strong text-caption-strong' : 'h-11 rounded-lg border border-[#E7E5E4] bg-white text-[#1C1917] font-caption text-caption'}>{o.l}</button>
                      ))}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <label className="block space-y-1 sm:col-span-2">
                        <span className="font-caption-strong text-caption-strong text-[#1C1917]">Full name</span>
                        <input value={patient.name} onChange={(e) => setPatient((p) => ({ ...p, name: e.target.value }))} maxLength={80} placeholder="As on ID" className={FIELD} />
                      </label>
                      <label className="block space-y-1">
                        <span className="font-caption-strong text-caption-strong text-[#1C1917]">Age</span>
                        <input value={patient.age} onChange={(e) => setPatient((p) => ({ ...p, age: e.target.value.replace(/\D/g, '').slice(0, 3) }))} inputMode="numeric" placeholder="Years" className={FIELD} />
                      </label>
                      <label className="block space-y-1">
                        <span className="font-caption-strong text-caption-strong text-[#1C1917]">Mobile</span>
                        <input value={patient.phone} onChange={(e) => setPatient((p) => ({ ...p, phone: e.target.value.replace(/\D/g, '').slice(0, 10) }))} inputMode="numeric" placeholder="10-digit number" className={`${FIELD} tabular-nums`} />
                      </label>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {(['female', 'male', 'other'] as const).map((g) => (
                        <button key={g} type="button" onClick={() => setPatient((p) => ({ ...p, gender: g }))} className={patient.gender === g ? 'h-9 px-4 rounded-full bg-[#FFF1F2] border border-primary-container text-primary-container font-caption-strong text-caption capitalize' : 'h-9 px-4 rounded-full border border-[#E7E5E4] bg-white text-[#1C1917] font-caption text-caption capitalize'}>{g}</button>
                      ))}
                    </div>
                  </Step>

                  <Step n={3} title={mode === 'home' ? 'Collection address & lab' : 'Choose a lab'} done={whereDone}>
                    <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="How should we collect your sample?">
                      {([
                        { id: 'home', label: 'Home collection', note: 'Free · phlebotomist visits you', icon: 'home_health' },
                        { id: 'lab', label: 'Visit a lab', note: 'Walk in at your slot', icon: 'directions_walk' },
                      ] as const).map((o) => (
                        <button key={o.id} type="button" role="radio" aria-checked={mode === o.id} disabled={o.id === 'home' && visitOnly.length > 0} onClick={() => switchMode(o.id)} className={`p-3 rounded-xl border text-left transition disabled:opacity-50 disabled:cursor-not-allowed ${mode === o.id ? 'border-2 border-primary-container bg-[#FFF1F2]' : 'border-[#E7E5E4] bg-white hover:border-outline'}`}>
                          <span className="material-symbols-outlined text-[20px] text-primary-container">{o.icon}</span>
                          <span className="block font-caption-strong text-caption-strong text-on-surface mt-1">{o.label}</span>
                          <span className="block font-micro text-micro text-outline">{o.id === 'home' && visitOnly.length > 0 ? 'Not available for scans' : o.note}</span>
                        </button>
                      ))}
                    </div>
                    {visitOnly.length > 0 && (
                      <p role="status" className="px-3 py-2 rounded-lg bg-[#FFF7ED] border border-[#FED7AA] font-caption text-caption text-[#9A3412]">
                        {visitOnly.join(', ')} {visitOnly.length > 1 ? 'need' : 'needs'} a visit to the centre, so this booking is a lab visit. Blood tests in the same booking are collected there too.
                      </p>
                    )}

                    {mode === 'home' && (
                      <div className="space-y-2">
                        <span className="block font-caption-strong text-caption-strong text-on-surface">Where should we collect?</span>
                        <AddressBook selectedId={address?.id ?? null} onSelect={setAddress} />
                      </div>
                    )}

                    {matchError && <p role="alert" className="px-3 py-2 rounded-lg bg-[#FFF1F2] border border-[#F9C6C9] font-caption text-caption text-[#8E0E17]">{matchError}</p>}
                    {labNotice && <p role="status" className="px-3 py-2 rounded-lg bg-[#FFFBEB] border border-[#FDE68A] font-caption text-caption text-[#92400E]">{labNotice}</p>}

                    {mode === 'home' && match && !match.serviceable && (
                      <div role="alert" className="p-4 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] space-y-2">
                        <p className="font-caption text-caption text-[#92400E]">{match.reason ?? 'We can’t collect at this address yet.'}</p>
                        <button type="button" onClick={() => switchMode('lab')} className="h-10 px-4 rounded-lg bg-white border border-[#FDE68A] font-caption-strong text-caption-strong text-[#92400E]">Visit a lab instead</button>
                      </div>
                    )}

                    {mode === 'home' && lab && (
                      <div className="p-4 rounded-xl border border-[#A7F3D0] bg-[#F0FDF4] space-y-2">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="font-micro text-micro uppercase tracking-wide text-[#047857] font-semibold">Your sample goes to</p>
                            <p className="font-body-strong text-body-strong text-on-surface mt-0.5"><Link href={`/lab/${lab.slug}`} target="_blank" className="hover:text-primary-container">{lab.name}</Link></p>
                            <p className="font-caption text-caption text-on-surface-variant">{lab.area} · {lab.distanceKm} km from {match?.place?.area ?? 'you'} · Reports in {lab.reportTat}</p>
                            <div className="mt-1"><AccreditationBadges items={lab.accreditations} /></div>
                          </div>
                          {eligibleLabs.length > 1 && (
                            <button type="button" onClick={() => setChangingLab((v) => !v)} aria-expanded={changingLab} className="font-caption-strong text-caption-strong text-primary-container hover:underline shrink-0">{changingLab ? 'Done' : 'Change lab'}</button>
                          )}
                        </div>
                        {changingLab && <ul className="space-y-2 pt-2">{eligibleLabs.map(labRow)}</ul>}
                      </div>
                    )}

                    {mode === 'lab' && match && (
                      <div className="space-y-3">
                        <p className="font-caption text-caption text-on-surface-variant">Nearest first{match.place ? ` from ${match.place.area} (${match.place.pincode})` : ''}. Labs that can’t run every test in your booking are greyed out.</p>
                        <ul className="space-y-2">{[...eligibleLabs, ...match.labs.filter((l) => !l.eligible)].map(labRow)}</ul>
                        {lab && (
                          <div className="space-y-2">
                            <LabMap lat={lab.geo.lat} lng={lab.geo.lng} title={lab.name} className="h-48" />
                            <a href={directionsUrl(lab)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-caption-strong text-caption-strong text-primary-container hover:underline">
                              <span className="material-symbols-outlined text-[16px]">directions</span>Directions to {lab.shortName}
                            </a>
                          </div>
                        )}
                      </div>
                    )}
                    {!match && !matchError && (mode === 'lab' || address) && <div className="h-20 rounded-xl bg-surface-container-low animate-pulse" aria-busy="true" />}
                  </Step>

                  <Step n={4} title={mode === 'home' ? 'Collection slot' : 'Visit slot'} done={Boolean(slot)}>
                    {lab ? (
                      <CollectionSlotPicker key={`${slotKey}-${lab.slug}-${mode}`} value={slot} onChange={setSlot} fasting={fastingTests.length > 0} lab={lab.slug} mode={mode} />
                    ) : (
                      <p className="font-caption text-caption text-on-surface-variant">
                        {mode === 'lab'
                          ? 'Choose a lab to see its open slots.'
                          : !address
                            ? 'Add your address first — slots depend on the lab that collects there.'
                            : match && !match.serviceable
                              ? 'Home collection isn’t available at this address. Pick another address or visit a lab.'
                              : 'Finding the lab that collects at your address…'}
                      </p>
                    )}
                  </Step>

                  <Step n={5} title="Payment" done>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {PAYMENT.map((p) => (
                        <label key={p.id} className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer ${payment === p.id ? 'border-2 border-primary-container bg-[#FFF1F2]' : 'border-[#E7E5E4] bg-white'}`}>
                          <input type="radio" name="payment" checked={payment === p.id} onChange={() => setPayment(p.id)} className="w-4 h-4 text-[#C1121F]" />
                          <span className="material-symbols-outlined text-[18px] text-[#78716C]">{p.icon}</span>
                          <span className="font-caption-strong text-caption-strong">{p.id === 'cod' && mode === 'lab' ? 'Pay at the lab' : p.label}</span>
                        </label>
                      ))}
                    </div>
                    <p className="font-micro text-micro text-outline">Prototype checkout: no payment details are collected.</p>
                  </Step>
                </div>
              </RequireSignIn>
            </div>

            <aside className="lg:col-span-5 lg:sticky lg:top-24 rounded-2xl border border-surface-variant bg-surface-container-lowest p-5 space-y-3">
              <h2 className="font-headline-h3 text-headline-h3 text-on-surface">Booking summary</h2>
              <dl className="space-y-2 font-body-default text-body-default">
                <div className="flex justify-between"><dt className="text-on-surface-variant">{cart.count} {cart.count === 1 ? 'test' : 'tests'} (MRP)</dt><dd>{rupees(cart.total + cart.savings)}</dd></div>
                {cart.savings > 0 && <div className="flex justify-between"><dt className="text-on-surface-variant">Discount</dt><dd className="text-[#047857]">− {rupees(cart.savings)}</dd></div>}
                <div className="flex justify-between"><dt className="text-on-surface-variant">{mode === 'home' ? 'Home collection' : 'Lab visit'}</dt><dd className="text-[#047857]">Free</dd></div>
                <div className="flex justify-between pt-2 border-t border-surface-variant font-body-strong text-body-strong"><dt>To pay</dt><dd>{rupees(cart.total)}</dd></div>
              </dl>
              {lab && (
                <div className="flex items-start gap-2 p-3 rounded-lg bg-surface-container-low border border-surface-variant">
                  <span className="material-symbols-outlined text-[18px] text-primary-container">biotech</span>
                  <p className="font-caption text-caption text-on-surface-variant min-w-0"><span className="block font-caption-strong text-on-surface">{lab.name}</span>{mode === 'lab' ? lab.address : `${lab.area} · processes your sample`}</p>
                </div>
              )}
              {slot && <p className="font-caption text-caption text-on-surface-variant">{mode === 'home' ? 'Collection' : 'Visit'}: {new Date(`${slot.date}T00:00:00`).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}, {slot.window}</p>}
              {error && <p role="alert" className="px-3 py-2 rounded-lg bg-[#FFF1F2] border border-[#F9C6C9] font-caption text-caption text-[#8E0E17]">{error}</p>}
              <button type="button" onClick={confirm} disabled={!ready || busy || !session.signedIn} className="hidden lg:flex w-full h-12 rounded-lg bg-primary-container hover:bg-[#8E0E17] disabled:bg-[#A8A29E] text-white font-body-strong text-body-strong items-center justify-center">
                {busy ? 'Booking…' : `Confirm booking · ${rupees(cart.total)}`}
              </button>
              {session.signedIn && missing && <p className="font-caption text-caption text-on-surface-variant text-center">{missing} to continue.</p>}
            </aside>
          </div>
        )}
      </main>
      {session.signedIn && cart.count > 0 && (
        <div className="lg:hidden fixed bottom-16 inset-x-0 z-40 bg-surface-container-lowest border-t border-surface-variant px-4 py-3 flex items-center justify-between gap-3 shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
          <div className="min-w-0">
            <p className="font-headline-h3 text-headline-h3 text-on-surface">{rupees(cart.total)}</p>
            {missing && <p className="font-micro text-micro text-on-surface-variant truncate">{missing}</p>}
          </div>
          <button type="button" onClick={confirm} disabled={!ready || busy} className="h-12 px-6 rounded-lg bg-primary-container disabled:bg-[#A8A29E] text-white font-body-strong text-body-strong shrink-0">{busy ? 'Booking…' : 'Confirm'}</button>
        </div>
      )}
      <Footer />
    </>
  );
}
