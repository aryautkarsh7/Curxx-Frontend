'use client';
import Link from 'next/link';
import { useState } from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { startSlotHold } from '@/components/SlotCountdown';
import { LAB_CATEGORIES, formatINR, type LabPackage } from '@/lib/lab-tests';

const PATIENTS = [
  { id: 'self', label: 'Self (Rahul S., 34)' },
  { id: 'mother', label: 'Mother (Sunita S., 62)' },
];

const DATES = [
  { day: 'Today', date: '24', full: true },
  { day: 'Tomorrow', date: '25' },
  { day: 'Sun', date: '26' },
  { day: 'Mon', date: '27' },
  { day: 'Tue', date: '28' },
];

const SLOTS = ['06:30 - 07:00 AM', '07:00 - 07:30 AM', '07:30 - 08:00 AM', '08:00 - 08:30 AM', '08:30 - 09:00 AM'];

function parameterGridClass(count: number) {
  if (count <= 2) return 'grid grid-cols-2 gap-2';
  if (count === 3) return 'grid grid-cols-3 gap-2';
  return 'grid grid-cols-2 sm:grid-cols-3 gap-2';
}

export default function LabTestDetail({ pkg }: { pkg: LabPackage }) {
  const [mode, setMode] = useState<'home' | 'lab'>('home');
  const [patient, setPatient] = useState(PATIENTS[0].id);
  const [dateIndex, setDateIndex] = useState(1);
  const [slot, setSlot] = useState(SLOTS[0]);
  const [openGroups, setOpenGroups] = useState<string[]>(() => pkg.parameterGroups.slice(0, 1).map((g) => g.name));

  const allOpen = openGroups.length === pkg.parameterGroups.length;
  const category = LAB_CATEGORIES.find((c) => c.slug === pkg.categories[0]);
  const bookingHref = `/book?${new URLSearchParams({
    type: 'lab',
    test: pkg.slug,
    mode,
    patient,
    date: `${DATES[dateIndex].day} ${DATES[dateIndex].date}`,
    slot,
  })}`;

  function setGroupOpen(name: string, open: boolean) {
    setOpenGroups((prev) => (open ? (prev.includes(name) ? prev : [...prev, name]) : prev.filter((n) => n !== name)));
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
<Link className="hover:text-primary transition-colors" href={`/lab-tests?category=${category.slug}#packages`}>{category.name} Packages</Link>
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
              NABL &amp; CAP Certified Lab
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
<span className="font-caption-strong text-on-surface">Conducted by:</span>
<span>Curxx Central Pathology Reference Labs, Sector 62 Hub</span>
<span className="w-1 h-1 rounded-full bg-outline"></span>
<span className="text-tertiary font-semibold">100% Barcode Traced</span>
</div>
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
              You can eat and drink normally before sample collection. Book any slot that suits you.
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
{/* RIGHT COLUMN: Sticky Booking Card (~35% / 400px width) */}
<aside className="lg:col-span-4 sticky top-20">
<div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-space-base shadow-sm space-y-space-base">
{/* Pricing Block with Discount Flag */}
<div className="flex items-baseline justify-between border-b border-surface-variant pb-space-sm">
<div>
<div className="flex items-center gap-2">
<span className="font-display text-display text-on-surface">{formatINR(pkg.price)}</span>
<span className="text-caption font-caption text-outline line-through">{formatINR(pkg.mrp)}</span>
<span className="inline-block bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857] text-micro font-micro font-bold px-1.5 py-0.5 rounded">
                  {pkg.discount}% OFF
                </span>
</div>
<span className="text-micro font-micro text-outline">Inclusive of all sample logistics &amp; taxes</span>
</div>
<div className="text-right">
<span className="text-micro font-micro font-semibold text-tertiary flex items-center justify-end gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span> Free Home Pickup
              </span>
</div>
</div>
{/* Sample Collection Mode Toggle */}
<div>
<label className="block text-caption-strong font-caption-strong text-on-surface mb-2">Sample Collection Mode</label>
<div className="grid grid-cols-2 p-1 bg-surface-container-low rounded-lg border border-surface-variant text-caption font-caption">
<button aria-pressed={mode === 'home'} onClick={() => setMode('home')} className={mode === 'home' ? 'py-2 px-3 rounded-md bg-surface-container-lowest font-caption-strong text-primary shadow-sm text-center transition' : 'py-2 px-3 rounded-md text-on-surface-variant hover:text-on-surface text-center transition'} type="button">
                Home Collection (Free)
              </button>
<button aria-pressed={mode === 'lab'} onClick={() => setMode('lab')} className={mode === 'lab' ? 'py-2 px-3 rounded-md bg-surface-container-lowest font-caption-strong text-primary shadow-sm text-center transition' : 'py-2 px-3 rounded-md text-on-surface-variant hover:text-on-surface text-center transition'} type="button">
                Visit Partner Lab
              </button>
</div>
</div>
{/* Patient Profile Selector */}
<div>
<div className="flex justify-between items-center mb-2">
<label className="text-caption-strong font-caption-strong text-on-surface">Selected Patient</label>
<span className="text-micro font-micro text-outline">Manage profiles</span>
</div>
<div className="flex gap-2 overflow-x-auto custom-scroll pb-1">
{PATIENTS.map((p) => (
p.id === patient ? (
<button key={p.id} type="button" aria-pressed="true" className="flex-shrink-0 px-3 py-1.5 rounded-full text-caption font-caption bg-[#FFF1F2] border border-[#F9C6C9] text-primary font-semibold flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">check</span>
                {p.label}
              </button>
) : (
<button key={p.id} type="button" aria-pressed="false" onClick={() => setPatient(p.id)} className="flex-shrink-0 px-3 py-1.5 rounded-full text-caption font-caption bg-surface-container-low border border-surface-variant text-on-surface-variant hover:border-outline">
                {p.label}
              </button>
)
))}
<button type="button" className="flex-shrink-0 px-3 py-1.5 rounded-full text-caption font-caption border border-dashed border-outline text-on-surface-variant hover:text-primary flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">add</span> Add Member
              </button>
</div>
</div>
{/* 7-Day Date Strip */}
<div>
<div className="flex justify-between items-center mb-2">
<label className="text-caption-strong font-caption-strong text-on-surface">Select Collection Date</label>
<span className="text-micro font-micro text-tertiary font-semibold flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span> {pkg.fastingHours ? 'Fasting slots available' : 'Slots available'}
              </span>
</div>
<div className="grid grid-cols-5 gap-1.5">
{DATES.map((d, i) => (
d.full ? (
<button key={d.day} type="button" disabled className="flex flex-col items-center py-2 px-1 rounded-lg border border-surface-variant bg-surface-container opacity-60 cursor-not-allowed">
<span className="text-micro font-micro text-outline">{d.day}</span>
<span className="font-body-strong text-caption text-outline">{d.date}</span>
<span className="text-micro font-micro text-outline">Full</span>
</button>
) : i === dateIndex ? (
<button key={d.day} type="button" aria-pressed="true" className="flex flex-col items-center py-2 px-1 rounded-lg border border-primary-container bg-[#FFF1F2] text-primary font-semibold shadow-sm">
<span className="text-micro font-micro">{d.day}</span>
<span className="font-body-strong text-caption">{d.date}</span>
<span className="w-1 h-1 rounded-full bg-tertiary mt-0.5"></span>
</button>
) : (
<button key={d.day} type="button" aria-pressed="false" onClick={() => setDateIndex(i)} className="flex flex-col items-center py-2 px-1 rounded-lg border border-surface-variant bg-surface-container-low hover:bg-surface-container transition">
<span className="text-micro font-micro text-on-surface-variant">{d.day}</span>
<span className="font-body-strong text-caption text-on-surface">{d.date}</span>
<span className="w-1 h-1 rounded-full bg-tertiary mt-0.5"></span>
</button>
)
))}
</div>
</div>
{/* Time Slot Selection (Fasting Morning Focus) */}
<div>
<div className="flex items-center justify-between mb-2">
<label className="text-caption-strong font-caption-strong text-on-surface flex items-center gap-1">
<span className="material-symbols-outlined text-[16px] text-primary">wb_twilight</span>
                {pkg.fastingHours ? 'Morning Fasting Slots' : 'Morning Slots'}
              </label>
<span className="text-micro font-micro text-outline">30-min precision window</span>
</div>
<div className="grid grid-cols-2 gap-2 text-caption font-caption">
{SLOTS.map((s, i) => (
s === slot ? (
<button key={s} type="button" aria-pressed="true" className={`py-2 px-2.5 rounded-lg border border-primary-container bg-[#FFF1F2] text-primary font-semibold text-left flex items-center justify-between${i === SLOTS.length - 1 ? ' col-span-2' : ''}`}>
<span>{s}</span>
<span className="material-symbols-outlined text-[16px]">check_circle</span>
</button>
) : (
<button key={s} type="button" aria-pressed="false" onClick={() => setSlot(s)} className={`py-2 px-2.5 rounded-lg border border-surface-variant bg-surface-container-low hover:bg-surface-container text-on-surface text-left${i === SLOTS.length - 1 ? ' col-span-2' : ''}`}>
                {s}
              </button>
)
))}
</div>
</div>
{/* Primary CTA Action (Single primary red button rule) */}
<div className="pt-2">
<Link href={bookingHref} onClick={startSlotHold} className="w-full h-12 bg-primary-container hover:bg-primary text-on-primary font-body-strong text-body-strong rounded-lg flex items-center justify-center gap-2 shadow-sm transition duration-150 ease-in-out active:scale-95">
<span>{mode === 'home' ? 'Book Home Collection' : 'Book Lab Visit'} • {formatINR(pkg.price)}</span>
<span className="material-symbols-outlined text-[18px]">arrow_forward</span>
</Link>
<div className="text-right mt-2">
<button type="button" onClick={() => setMode(mode === 'home' ? 'lab' : 'home')} className="text-caption font-caption text-primary hover:underline inline-flex items-center gap-1">
                {mode === 'home' ? 'Visit NABL lab center instead →' : 'Switch to free home collection →'}
              </button>
</div>
</div>
{/* Clinical Trust Safeguards */}
<div className="pt-3 border-t border-surface-variant space-y-2">
<div className="flex items-center gap-2 text-micro font-micro text-on-surface-variant">
<span className="material-symbols-outlined text-tertiary text-[16px]">sanitizer</span>
<span>Sterile single-use sealed vacutainers</span>
</div>
<div className="flex items-center gap-2 text-micro font-micro text-on-surface-variant">
<span className="material-symbols-outlined text-tertiary text-[16px]">verified</span>
<span>100% ICMR &amp; NABL recognized pathology network</span>
</div>
<div className="flex items-center gap-2 text-micro font-micro text-on-surface-variant">
<span className="material-symbols-outlined text-tertiary text-[16px]">support_agent</span>
<span>Complimentary teleconsultation post report delivery</span>
</div>
</div>
</div>
</aside>
</div>
</main>
{/* Mobile sticky action bar */}
<div className="lg:hidden fixed bottom-16 inset-x-0 z-30 bg-white/95 backdrop-blur border-t border-[#E7E5E4] px-margin py-3 flex items-center gap-3">
<div className="min-w-0">
<p className="font-micro text-micro text-[#78716C]">{pkg.testsIncluded} tests</p>
<p className="font-headline-h3 text-headline-h3 text-[#1C1917] leading-none">{formatINR(pkg.price)}</p>
</div>
<Link href={bookingHref} onClick={startSlotHold} className="flex-1 h-12 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-body-strong text-body-strong flex items-center justify-center gap-1.5">
<span>Book {mode === 'home' ? 'Home Collection' : 'Lab Visit'}</span>
</Link>
</div>
<div className="h-20 lg:hidden" aria-hidden="true"></div>
<Footer />
    </>
  );
}
