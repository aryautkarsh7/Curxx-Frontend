'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Footer from '@/components/Footer';
import ReportIssue from '@/components/profile/ReportIssue';
import Header from '@/components/Header';
import CollectionSlotPicker, { type CollectionChoice } from '@/components/labs/CollectionSlotPicker';
import LabTestCard, { labCartItem } from '@/components/labs/LabTestCard';
import { AccreditationBadges } from '@/components/labs/LabCard';
import { rupees, type LabCategory, type LabSummary, type LabTest, type Near } from '@/lib/api';
import { addToCart, removeFromCart, useCart } from '@/lib/cart';
import { saveLabSlot } from '@/lib/lab-booking';

function parameterGridClass(count: number) {
  if (count <= 2) return 'grid grid-cols-2 gap-2';
  if (count === 3) return 'grid grid-cols-3 gap-2';
  return 'grid grid-cols-2 sm:grid-cols-3 gap-2';
}

type Availability = { labCount: number; near: Near; nearest: (LabSummary & { canCollect: boolean }) | null };
type Props = { pkg: LabTest; related: LabTest[]; category: LabCategory | null; availability?: Availability };

export default function LabTestDetail({ pkg, related, category, availability }: Props) {
  const nearest = availability?.nearest ?? null;
  const router = useRouter();
  const labCart = useCart('lab');
  const inBooking = labCart.has(pkg.slug);
  const [slot, setSlot] = useState<CollectionChoice | null>(null);
  const [openGroups, setOpenGroups] = useState<string[]>(() => pkg.parameterGroups.slice(0, 1).map((g) => g.name));
  const allOpen = openGroups.length === pkg.parameterGroups.length;

  function setGroupOpen(name: string, open: boolean) {
    setOpenGroups((prev) => (open ? (prev.includes(name) ? prev : [...prev, name]) : prev.filter((n) => n !== name)));
  }

  /** Adds this test to the booking (keeping any others) and carries the chosen slot across. */
  function book() {
    if (!inBooking) addToCart(labCartItem(pkg), 1, 'lab');
    if (slot) saveLabSlot(slot);
    router.push('/lab-tests/book');
  }

  return (
    <>
<Header />
{/* MAIN CANVAS CONTAINER */}
<main className="w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop py-space-lg flex-1">
{/* Breadcrumb Trail */}
<nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-caption font-caption text-outline mb-space-lg">
<Link className="hover:text-primary transition-colors" href="/">Home</Link>
<span className="material-symbols-outlined text-[14px]">chevron_right</span>
<Link className="hover:text-primary transition-colors" href="/lab-tests">Lab Tests</Link>
{category && (
<>
<span className="material-symbols-outlined text-[14px]">chevron_right</span>
<Link className="hover:text-primary transition-colors" href={`/lab-tests?category=${category.slug}#packages`}>{category.name}</Link>
</>
)}
<span className="material-symbols-outlined text-[14px]">chevron_right</span>
<span className="font-caption-strong text-primary">{pkg.name}</span>
</nav>
{/* Asymmetric 2-Column Desktop Grid (~65% / ~35%) */}
<div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-start">
{/* LEFT COLUMN: Clinical Package Dossier (~65% -> 8 of 12 cols) */}
<section className="lg:col-span-8 flex flex-col gap-space-lg">
{/* Package Title Hero Card */}
<div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-space-lg shadow-sm">
<div className="flex flex-wrap items-center gap-2 mb-space-sm">
<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-micro font-micro bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857]">
<span className="material-symbols-outlined text-[13px]" style={{"fontVariationSettings":"'FILL' 1"}}>verified</span>
              NABL-accredited labs
            </span>
<span className="inline-flex items-center px-2.5 py-1 rounded-full text-micro font-micro bg-surface-container border border-surface-variant text-on-surface-variant">
              {pkg.testsIncluded} parameters covered across {pkg.parameterGroups.length} profiles
            </span>
<span className="inline-flex items-center gap-1 text-micro font-micro text-tertiary font-semibold ml-auto">
<span className="material-symbols-outlined text-[14px]">schedule</span> {pkg.reportTime}
            </span>
</div>
<h1 className="font-display text-display text-on-surface mb-2 tracking-tight">
            {pkg.name}
          </h1>
<div className="flex items-center gap-2 text-caption font-caption text-on-surface-variant">
<span className="font-caption-strong text-on-surface">Available at:</span>
<Link href={`/labs?test=${pkg.slug}`} className="text-primary-container hover:underline">{availability?.labCount ? `${availability.labCount} partner ${availability.labCount === 1 ? 'lab' : 'labs'} near you` : 'NABL-accredited partner labs'}</Link>
<span className="w-1 h-1 rounded-full bg-outline"></span>
<span className="text-tertiary font-semibold">100% Barcode Traced</span>
</div>
<ReportIssue targetType="lab-test" slug={pkg.slug} name={pkg.name} className="mt-2" />
</div>
{/* Fasting Requirement Callout Card (Design System strict tinted palette) */}
{pkg.fastingHours ? (
<div className="bg-[#FFF1F2] border border-[#F9C6C9] rounded-xl p-space-base flex items-start gap-space-base shadow-sm">
<div className="w-10 h-10 rounded-lg bg-[#FEE2E2] flex items-center justify-center flex-shrink-0 text-primary">
<span className="material-symbols-outlined text-[24px]">alarm</span>
</div>
<div className="flex-1">
<div className="flex items-center justify-between">
<h2 className="text-headline-h3 font-headline-h3 text-on-surface">Fasting Required: {pkg.fastingHours} Hours</h2>
<span className="text-micro font-micro uppercase tracking-wider px-2 py-0.5 rounded bg-[#FEE2E2] text-primary font-semibold">Mandatory</span>
</div>
<p className="text-caption font-caption text-on-surface-variant mt-1">
              Water is strictly permitted and encouraged. Avoid heavy dinners, dairy, and alcohol 24 hours prior to blood sample collection. If you take regular morning medication, consult your phlebotomist.
            </p>
</div>
</div>
) : (
<div className="bg-[#ECFDF5] border border-[#A7F3D0] rounded-xl p-space-base flex items-start gap-space-base shadow-sm">
<div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center flex-shrink-0 text-[#047857]">
<span className="material-symbols-outlined text-[24px]">check_circle</span>
</div>
<div className="flex-1">
<h2 className="text-headline-h3 font-headline-h3 text-on-surface">No Fasting Required</h2>
<p className="text-caption font-caption text-on-surface-variant mt-1">
              {pkg.homeCollection === false ? 'This is done at the diagnostic centre — book a visit slot and walk in without queuing.' : 'You can eat and drink normally before sample collection. Book any slot that suits you.'}
            </p>
</div>
</div>
)}
{/* Test Parameters Accordion Breakdown */}
<div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-space-lg shadow-sm">
<div className="flex items-center justify-between mb-space-base pb-space-sm border-b border-surface-variant">
<div>
<h2 className="text-headline-h2 font-headline-h2 text-on-surface">Included Laboratory Parameters ({pkg.testsIncluded})</h2>
<p className="text-caption font-caption text-on-surface-variant mt-0.5">Automated robotic analysis with peer-reviewed pathologist sign-off</p>
</div>
<button type="button" className="text-caption-strong font-caption-strong text-primary hover:underline" onClick={() => setOpenGroups(allOpen ? [] : pkg.parameterGroups.map((g) => g.name))}>
              {allOpen ? 'Collapse All Profiles' : 'Expand All Profiles'}
            </button>
</div>
<div className="space-y-3">
{pkg.parameterGroups.map((g) => (
<details key={g.name} className="group border border-surface-variant rounded-lg overflow-hidden transition-all duration-150" open={openGroups.includes(g.name)} onToggle={(e) => setGroupOpen(g.name, e.currentTarget.open)}>
<summary className="flex items-center justify-between p-space-base cursor-pointer bg-surface-container-low hover:bg-surface-container transition-colors list-none select-none">
<div className="flex items-center gap-3">
<span className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[18px]">{g.icon}</span>
</span>
<div>
<span className="font-headline-h3 text-headline-h3 text-on-surface">{g.name}</span>
<span className="text-caption font-caption text-outline ml-2">({g.count} {g.count === 1 ? 'Parameter' : 'Parameters'})</span>
</div>
</div>
<span className="material-symbols-outlined text-outline group-open:rotate-180 transition-transform text-[20px]">keyboard_arrow_down</span>
</summary>
<div className="p-space-base bg-surface-container-lowest text-caption font-caption text-on-surface-variant border-t border-surface-variant">
<div className={parameterGridClass(g.parameters.length)}>
{g.parameters.map((p) => <span key={p} className="p-1.5 bg-surface-container-low rounded">{p}</span>)}
</div>
</div>
</details>
))}
</div>
</div>
{/* Clinical Rationale & Target Cohort Cards (Bento Style Split) */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
{/* Why Take This Checkup */}
<div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-space-base shadow-sm">
<div className="flex items-center gap-2 mb-space-sm text-primary">
<span className="material-symbols-outlined text-[20px]">shield</span>
<h2 className="text-headline-h3 font-headline-h3 text-on-surface">Why Take This Checkup</h2>
</div>
<p className="text-caption font-caption text-on-surface-variant leading-relaxed">
              Lifestyle conditions such as early diabetes, subclinical liver inflammation, vitamin deficiencies, and dyslipidemia typically remain asymptomatic for years. This {pkg.testsIncluded}-parameter panel establishes a clinical baseline, identifying physiological anomalies well before they manifest as chronic diseases.
            </p>
<div className="mt-4 pt-3 border-t border-surface-variant flex items-center gap-2 text-micro font-micro text-tertiary font-semibold">
<span className="material-symbols-outlined text-[16px]">verified_user</span>
              Includes Free Post-Report Physician Consultation
            </div>
</div>
{/* Who Should Take This Test */}
<div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-space-base shadow-sm">
<div className="flex items-center gap-2 mb-space-sm text-primary">
<span className="material-symbols-outlined text-[20px]">group</span>
<h2 className="text-headline-h3 font-headline-h3 text-on-surface">Who Should Take This</h2>
</div>
<ul className="space-y-2 text-caption font-caption text-on-surface-variant">
<li className="flex items-start gap-2">
<span className="material-symbols-outlined text-tertiary text-[18px] flex-shrink-0 mt-0.5">check_circle</span>
<span>Adults aged 25+ seeking routine proactive preventive screening.</span>
</li>
<li className="flex items-start gap-2">
<span className="material-symbols-outlined text-tertiary text-[18px] flex-shrink-0 mt-0.5">check_circle</span>
<span>Individuals with sedentary routines, high stress, or irregular sleep.</span>
</li>
<li className="flex items-start gap-2">
<span className="material-symbols-outlined text-tertiary text-[18px] flex-shrink-0 mt-0.5">check_circle</span>
<span>Family history of hypertension, cardiovascular disease, or type 2 diabetes.</span>
</li>
</ul>
</div>
</div>
{/* Sample Processing & Report Delivery Timeline Strip */}
<div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-space-lg shadow-sm">
<h2 className="text-headline-h3 font-headline-h3 text-on-surface mb-space-md">End-to-End Diagnostic Pipeline</h2>
<div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
<div className="flex flex-col gap-1 p-3 bg-surface-container-low rounded-lg border border-surface-variant">
<div className="flex items-center gap-1.5 text-primary text-micro font-micro font-bold">
<span className="material-symbols-outlined text-[16px]">home_pin</span> STEP 01
              </div>
<span className="font-body-strong text-caption-strong text-on-surface">Home Phlebotomy</span>
<span className="text-micro font-micro text-on-surface-variant">Trained phlebotomist visit in 30–45 mins.</span>
</div>
<div className="flex flex-col gap-1 p-3 bg-surface-container-low rounded-lg border border-surface-variant">
<div className="flex items-center gap-1.5 text-outline text-micro font-micro font-bold">
<span className="material-symbols-outlined text-[16px]">qr_code_2</span> STEP 02
              </div>
<span className="font-body-strong text-caption-strong text-on-surface">Barcoded Cold-Chain</span>
<span className="text-micro font-micro text-on-surface-variant">Gel packs at 2°C–8°C logged into central lab.</span>
</div>
<div className="flex flex-col gap-1 p-3 bg-surface-container-low rounded-lg border border-surface-variant">
<div className="flex items-center gap-1.5 text-outline text-micro font-micro font-bold">
<span className="material-symbols-outlined text-[16px]">biotech</span> STEP 03
              </div>
<span className="font-body-strong text-caption-strong text-on-surface">Robotic Processing</span>
<span className="text-micro font-micro text-on-surface-variant">Analyzed on Roche &amp; Abbott automated platforms.</span>
</div>
<div className="flex flex-col gap-1 p-3 bg-surface-container-low rounded-lg border border-surface-variant">
<div className="flex items-center gap-1.5 text-tertiary text-micro font-micro font-bold">
<span className="material-symbols-outlined text-[16px]">task_alt</span> STEP 04
              </div>
<span className="font-body-strong text-caption-strong text-on-surface">MD Validation in 24h</span>
<span className="text-micro font-micro text-on-surface-variant">Smart PDF to Curxx App, WhatsApp &amp; ABHA.</span>
</div>
</div>
</div>
{/* Frequently Asked Questions */}
<div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-space-lg shadow-sm">
<h2 className="text-headline-h2 font-headline-h2 text-on-surface mb-space-base">Frequently Asked Questions</h2>
<div className="space-y-3">
<details className="group border-b border-surface-variant pb-3 list-none">
<summary className="flex justify-between items-center cursor-pointer font-headline-h3 text-headline-h3 text-on-surface group-open:text-primary transition-colors">
<span>How should I prepare for sample collection?</span>
<span className="material-symbols-outlined text-outline group-open:rotate-180 transition-transform">expand_more</span>
</summary>
<p className="mt-2 text-caption font-caption text-on-surface-variant leading-relaxed">
                {pkg.fastingHours
                  ? `Fast strictly for ${pkg.fastingHours} hours prior to your scheduled slot. Only pure plain water is allowed. Avoid caffeinated beverages, cigarettes, dietary supplements, and strenuous workouts before collection.`
                  : 'No fasting is needed for this package. Stay well hydrated and keep your ID and any previous reports handy for the phlebotomist.'}
              </p>
</details>
<details className="group border-b border-surface-variant pb-3 list-none">
<summary className="flex justify-between items-center cursor-pointer font-headline-h3 text-headline-h3 text-on-surface group-open:text-primary transition-colors">
<span>Are Curxx phlebotomists certified and vaccinated?</span>
<span className="material-symbols-outlined text-outline group-open:rotate-180 transition-transform">expand_more</span>
</summary>
<p className="mt-2 text-caption font-caption text-on-surface-variant leading-relaxed">
                Yes, 100% of our clinical technicians are DMLT certified, background checked, and undergo monthly protocol evaluations. They utilize single-use sterile BD Vacutainer® needles unsealed strictly in front of you.
              </p>
</details>
<details className="group border-b border-surface-variant pb-3 list-none">
<summary className="flex justify-between items-center cursor-pointer font-headline-h3 text-headline-h3 text-on-surface group-open:text-primary transition-colors">
<span>How do I claim my complimentary doctor consultation?</span>
<span className="material-symbols-outlined text-outline group-open:rotate-180 transition-transform">expand_more</span>
</summary>
<p className="mt-2 text-caption font-caption text-on-surface-variant leading-relaxed">
                Once your MD pathologist-verified report is ready, a 1-click &lsquo;Book Free Report Review&rsquo; button unlocks inside your Curxx dashboard and WhatsApp notification, connecting you with an MBBS physician.
              </p>
</details>
<details className="group list-none">
<summary className="flex justify-between items-center cursor-pointer font-headline-h3 text-headline-h3 text-on-surface group-open:text-primary transition-colors">
<span>Will these lab results automatically link to my ABHA Card?</span>
<span className="material-symbols-outlined text-outline group-open:rotate-180 transition-transform">expand_more</span>
</summary>
<p className="mt-2 text-caption font-caption text-on-surface-variant leading-relaxed">
                Yes. Curxx is fully certified under the Ayushman Bharat Digital Mission (ABDM). Provide your 14-digit ABHA address at booking to digitally push health records to your government health locker.
              </p>
</details>
</div>
</div>
</section>
{/* RIGHT COLUMN: Sticky Booking Card */}
<aside className="lg:col-span-4 lg:sticky lg:top-20" id="book">
<div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-space-base shadow-sm space-y-space-base">
<div className="flex items-start justify-between gap-2 border-b border-surface-variant pb-space-sm">
<div>
<div className="flex items-center gap-2 flex-wrap">
<span className="font-display text-display text-on-surface">{rupees(pkg.price)}</span>
<span className="text-caption font-caption text-outline line-through">{rupees(pkg.mrp)}</span>
{pkg.discount > 0 && <span className="inline-block bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857] text-micro font-micro font-bold px-1.5 py-0.5 rounded">{pkg.discount}% OFF</span>}
</div>
<span className="text-micro font-micro text-outline">Inclusive of sample logistics &amp; taxes</span>
</div>
<span className="text-micro font-micro font-semibold text-tertiary flex items-center gap-1 shrink-0 mt-2"><span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span> Free home pickup</span>
</div>
<div className="flex items-center gap-2 p-2.5 rounded-lg bg-surface-container-low border border-surface-variant">
<span className="material-symbols-outlined text-[20px] text-primary">home_health</span>
<p className="text-caption font-caption text-on-surface-variant"><span className="font-caption-strong text-on-surface">Home sample collection</span> by a certified phlebotomist. {pkg.sampleType} sample.</p>
</div>
{nearest && (
<div className="p-3 rounded-lg border border-surface-variant bg-surface-container-lowest space-y-1">
<div className="flex items-center justify-between gap-2">
<span className="text-micro font-micro uppercase tracking-wide text-outline font-semibold">Nearest lab to {availability!.near.area}</span>
<AccreditationBadges items={nearest.accreditations.slice(0, 2)} />
</div>
<Link href={`/lab/${nearest.slug}`} className="block font-caption-strong text-caption-strong text-on-surface hover:text-primary-container">{nearest.name}</Link>
<p className="text-micro font-micro text-on-surface-variant flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">location_on</span>{nearest.area} · {nearest.distanceKm} km · Reports in {nearest.reportTat}</p>
<p className="text-micro font-micro text-outline">We confirm the lab for your exact address at checkout. <Link href={`/labs?test=${pkg.slug}`} className="text-primary-container hover:underline">All labs</Link></p>
</div>
)}
<CollectionSlotPicker value={slot} onChange={setSlot} fasting={Boolean(pkg.fastingHours)} lab={nearest?.slug} />
<div className="pt-1 space-y-2">
<button type="button" onClick={book} className="w-full h-12 bg-primary-container hover:bg-primary text-on-primary font-body-strong text-body-strong rounded-lg flex items-center justify-center gap-2 shadow-sm transition duration-150 active:scale-95">
<span>{slot ? 'Continue to book' : pkg.homeCollection === false ? 'Book a centre visit' : 'Book home collection'} • {rupees(pkg.price)}</span>
<span className="material-symbols-outlined text-[18px]">arrow_forward</span>
</button>
<button type="button" onClick={() => (inBooking ? removeFromCart(pkg.slug, 'lab') : addToCart(labCartItem(pkg), 1, 'lab'))} className="w-full h-10 rounded-lg border border-surface-variant text-caption-strong font-caption-strong text-on-surface hover:bg-surface-container-low">
{inBooking ? '✓ Added to booking · Remove' : '+ Add to booking and keep browsing'}
</button>
{labCart.count > 0 && (
<p className="text-center text-micro font-micro text-on-surface-variant">{labCart.count} {labCart.count === 1 ? 'test' : 'tests'} in your booking · one visit collects all samples</p>
)}
</div>
<div className="pt-3 border-t border-surface-variant space-y-2">
<div className="flex items-center gap-2 text-micro font-micro text-on-surface-variant"><span className="material-symbols-outlined text-tertiary text-[16px]">sanitizer</span><span>Sterile single-use sealed vacutainers</span></div>
<div className="flex items-center gap-2 text-micro font-micro text-on-surface-variant"><span className="material-symbols-outlined text-tertiary text-[16px]">verified</span><span>NABL-accredited partner labs</span></div>
<div className="flex items-center gap-2 text-micro font-micro text-on-surface-variant"><span className="material-symbols-outlined text-tertiary text-[16px]">support_agent</span><span>Free doctor review of abnormal results</span></div>
</div>
</div>
</aside>
</div>
{related.length > 0 && (
<section className="mt-space-2xl space-y-space-base">
<h2 className="text-headline-h2 font-headline-h2 text-on-surface">Often booked together</h2>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
{related.map((t) => <LabTestCard key={t.slug} test={t} />)}
</div>
</section>
)}
</main>
{/* Mobile sticky action bar */}
<div className="lg:hidden fixed bottom-16 inset-x-0 z-30 bg-white/95 backdrop-blur border-t border-[#E7E5E4] px-margin py-3 flex items-center gap-3">
<div className="min-w-0">
<p className="font-micro text-micro text-[#78716C]">{pkg.kind === 'package' ? `${pkg.testsIncluded} tests` : pkg.fastingLabel}</p>
<p className="font-headline-h3 text-headline-h3 text-[#1C1917] leading-none">{rupees(pkg.price)}</p>
</div>
<button type="button" onClick={book} className="flex-1 h-12 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-body-strong text-body-strong flex items-center justify-center gap-1.5">
<span>{slot ? 'Continue to book' : pkg.homeCollection === false ? 'Book a centre visit' : 'Book home collection'}</span>
</button>
</div>
<div className="h-20 lg:hidden" aria-hidden="true"></div>
<Footer />
    </>
  );
}
