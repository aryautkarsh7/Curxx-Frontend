
'use client';
import Link from 'next/link';
import FadeIn from '@/components/FadeIn';
import HomeDoctorCard from '@/components/HomeDoctorCard';
import FaqSection from '@/components/FaqSection';
import FeatureBand from '@/components/FeatureBand';
import PartnerCta from '@/components/PartnerCta';
import PartnerSections from '@/components/PartnerSections';
import TrustStrip from '@/components/TrustStrip';
import { LabMiniCard } from '@/components/labs/LabCard';
import type { Doctor, Facility, LabSummary, Near, Testimonial } from '@/lib/api';
import type { Band, Faq, PartnerSection, ServiceCard, Step } from '@/lib/content-types';
import { countLabel, fill, image, items, type SiteData } from '@/lib/site';

type Labs = { items: LabSummary[]; total: number; near: Near } | null;
type Tile = { slug: string; name: string; icon: string; fromPrice: number };
type HomeProps = {
  doctors: Doctor[];
  facilities: Facility[];
  labs: Labs;
  /** Editable copy, claims and counts (admin panel → Website). */
  site: SiteData;
  testimonials: Testimonial[];
  /** An online-now GP for the hero card. */
  gp: Doctor | null;
  /** The homepage specialty tiles and consultation chips, in admin order. */
  tiles: Tile[];
  chips: { label: string; condition: string }[];
  specialtyCount: number;
};
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState, type MouseEvent } from 'react';
import CityPicker from '@/components/CityPicker';
import { useEmergency } from '@/components/EmergencyModal';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import SearchSuggest, { searchHref } from '@/components/SearchSuggest';
import { api, photo } from '@/lib/api';
import { DEFAULT_CITY } from '@/lib/cities';
import { useCity } from '@/lib/city-store';
import { conditionHref, specialtyCountLabel } from '@/lib/specialties';

/** "Dr. Meera Nambiar, MD" from "MBBS, MD - General Medicine". */
const shortDegree = (qualification: string) => qualification.split(',').map((q) => q.trim()).filter(Boolean).pop()?.split(' - ')[0] ?? '';

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex text-primary-container space-x-1">
      {Array.from({ length: Math.max(1, Math.min(5, Math.round(rating))) }, (_, i) => (
        <span key={i} className="material-symbols-outlined text-[18px]" data-icon="star" data-weight="fill" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
      ))}
    </div>
  );
}

export default function HomePage({ doctors: initialDoctors, facilities: initialFacilities, labs: initialLabs, site, testimonials, gp: initialGp, tiles, chips, specialtyCount }: HomeProps) {
  const router = useRouter();
  const emergency = useEmergency();
  const { city, cityName, locality } = useCity();
  const [careQuery, setCareQuery] = useState('');
  const [cityOpen, setCityOpen] = useState(false);
  const [nearby, setNearby] = useState({ city: DEFAULT_CITY, doctors: initialDoctors, facilities: initialFacilities, labs: initialLabs, gp: initialGp });
  const onQueryChange = useCallback((q: string) => setCareQuery(q), []);

  // The page is rendered for Bengaluru; another chosen city refreshes the nearby sections.
  useEffect(() => {
    if (city === nearby.city) return;
    let cancelled = false;
    Promise.all([
      api.doctors({ city, sort: 'rating', limit: 3 }).then((r) => r.doctors).catch(() => []),
      api.facilities({ city, sort: 'rating', limit: 4 }).then((r) => r.items).catch(() => []),
      api.labs({ city, limit: 4 }).then((r) => ({ items: r.items, total: r.total, near: r.near })).catch(() => null),
      api.doctors({ city, specialty: 'general-physician', availability: 'now', limit: 1 }).then((r) => r.doctors[0] ?? null).catch(() => null),
    ]).then(([doctors, facilities, labs, gp]) => !cancelled && setNearby({ city, doctors, facilities, labs, gp }));
    return () => {
      cancelled = true;
    };
  }, [city, nearby.city]);
  const { doctors, facilities, labs, gp } = nearby;
  const place = locality ? `${locality.name}, ${cityName}` : cityName;
  const SPECIALTY_COUNT_LABEL = specialtyCountLabel(specialtyCount);

  // Editable copy and claims, and counts from the database.
  const { settings, stats, sections } = site;
  const claim = (key: string) => settings[key] ?? '';
  const doctorsPlus = countLabel(stats?.verifiedDoctors);
  const accredited = countLabel(stats?.accreditedFacilities);
  const bands = items<Band>(sections, 'home/bands');
  const services = items<ServiceCard>(sections, 'home/services');
  const steps = items<Step>(sections, 'home/how-it-works');
  const faqSection = sections['home/faqs'];
  const faqs = items<Faq>(sections, 'home/faqs');

  function findCare() {
    router.push(searchHref(careQuery, city, locality?.slug));
  }

  // Whole-card click opens the doctor, but not when the click was on the card's own buttons/links.
  const openCard = (href: string) => (e: MouseEvent<HTMLElement>) => {
    if (!(e.target as HTMLElement).closest('a, button')) router.push(href);
  };

  return (
    <>
      
<Header />
<main>
{/* HERO SECTION */}
<section className="relative bg-surface-container-lowest overflow-hidden border-b border-surface-variant">
{/* Subtle radial accent in background */}
<div className="absolute -top-32 right-0 w-[550px] h-[550px] rounded-full bg-error-container/20 blur-3xl pointer-events-none"></div>
<div className="w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
{/* Left Column (approx 55%) */}
<div className="lg:col-span-7 flex flex-col space-y-6">
{/* Eyebrow Pill */}
<div className="inline-flex items-center space-x-2.5 px-3 py-1 rounded-full bg-surface-container-low border border-surface-variant w-max max-w-full">
<span className="w-2 h-2 shrink-0 rounded-full bg-tertiary"></span>
<span className="text-micro font-micro uppercase tracking-wide sm:tracking-wider text-on-surface-variant font-semibold truncate">
              TELEHEALTH NETWORK{stats ? ` · ${stats.verifiedDoctors.toLocaleString('en-IN')} DOCTORS ACTIVE NOW` : ''}
            </span>
</div>
{/* Headline */}
<div className="space-y-1">
<h1 className="text-display font-display text-on-surface">Book India&apos;s Top Doctors, Online or At a Clinic Near You</h1>
<p className="text-display font-display text-primary-container">Online, in 60 Seconds</p>
</div>
{/* Subcopy */}
<p className="text-body-default font-body-default text-on-surface-variant max-w-xl">
            Connect with verified specialists across {SPECIALTY_COUNT_LABEL} clinical disciplines. Instant video consultations, seamless electronic prescriptions, and doorstep lab diagnostics.
          </p>
{/* Dual-Field Search Bar Card */}
<div className="p-2 bg-surface-container-lowest rounded-xl border border-surface-variant shadow-sm flex flex-col sm:flex-row gap-2">
{/* Left Field: Location */}
<button type="button" onClick={() => setCityOpen(true)} aria-label={`Location: ${place}. Change location`} className="flex-1 min-w-0 flex items-center px-3 py-2 rounded-lg border border-surface-variant bg-surface-container-low/40 hover:border-outline transition text-left">
<span className="material-symbols-outlined text-outline text-[20px] mr-2" data-icon="my_location">my_location</span>
<span className="flex flex-col w-full min-w-0 text-left">
<span className="text-micro font-micro text-on-surface-variant uppercase font-semibold">Location</span>
<span className="text-caption-strong font-caption-strong text-on-surface truncate">{place}</span>
</span>
<span className="material-symbols-outlined text-[18px] text-on-surface-variant">expand_more</span>
</button>
{/* Right Field: Specialty/Symptom */}
<div className="flex-[1.5] flex items-center px-3 py-2 rounded-lg border border-surface-variant bg-surface-container-low/40">
<span className="material-symbols-outlined text-outline text-[20px] mr-2" data-icon="search">search</span>
<div className="flex flex-col w-full text-left">
<span className="text-micro font-micro text-on-surface-variant uppercase font-semibold">Specialty / Symptom</span>
<SearchSuggest city={city} locality={locality?.slug} onQueryChange={onQueryChange} inputClassName="bg-transparent border-none p-0 text-caption font-caption text-on-surface focus:ring-0 focus:outline-none w-full placeholder-on-surface-variant" />
</div>
</div>
{/* CTA Button */}
<button type="button" onClick={findCare} className="flex items-center justify-center space-x-2 px-6 py-3 rounded-lg bg-primary-container text-on-primary font-body-strong text-body-strong hover:bg-primary transition duration-150 active:scale-95 shadow-sm">
<span className="material-symbols-outlined text-[18px]" data-icon="search">search</span>
<span>Find Care</span>
</button>
</div>
{/* Popular Consultations Chips */}
<div className="flex flex-col space-y-2 pt-1">
<h3 className="text-micro font-micro text-on-surface-variant font-semibold tracking-wider uppercase">Popular Consultations:</h3>
<div className="flex flex-wrap gap-2">
{chips.map((chip) => (
<Link key={chip.condition} href={conditionHref(city, chip.condition)} className="px-3 py-1 rounded-full border border-surface-variant bg-surface-container-low text-caption font-caption text-on-surface-variant hover:border-outline cursor-pointer transition">{chip.label}</Link>
))}
<button type="button" onClick={() => emergency.open({ continueTo: { href: conditionHref(city, 'chest-pain'), label: 'Not an emergency? See cardiologists' } })} className="px-3 py-1 rounded-full border border-surface-variant bg-surface-container-low text-caption font-caption text-on-surface-variant hover:border-outline cursor-pointer transition">Chest Pain</button>
</div>
</div>
{/* Trust Stats Row */}
<div className="pt-4 border-t border-surface-variant grid grid-cols-3 gap-4">
<div className="flex items-center space-x-2">
<span className="material-symbols-outlined text-outline text-[20px]" data-icon="verified_user">verified_user</span>
<div>
<div className="text-caption-strong font-caption-strong text-on-surface">{doctorsPlus ? `${doctorsPlus} Verified` : 'Verified'}</div>
<div className="text-micro font-micro text-on-surface-variant">Active Indian MDs</div>
</div>
</div>
<div className="flex items-center space-x-2">
<span className="material-symbols-outlined text-outline text-[20px]" data-icon="star">star</span>
<div>
<div className="text-caption-strong font-caption-strong text-on-surface">{stats?.averageRating ? `${stats.averageRating}/5 Rating` : 'Patient Rated'}</div>
<div className="text-micro font-micro text-on-surface-variant">{claim('claim-consultations') ? `${claim('claim-consultations')} Consultations` : 'Verified Reviews'}</div>
</div>
</div>
<div className="flex items-center space-x-2">
<span className="material-symbols-outlined text-outline text-[20px]" data-icon="health_and_safety">health_and_safety</span>
<div>
<div className="text-caption-strong font-caption-strong text-on-surface">{claim('claim-certification-title')}</div>
<div className="text-micro font-micro text-on-surface-variant">{claim('claim-certification-subtitle')}</div>
</div>
</div>
</div>
</div>
{/* Right Column: Interactive Doctor Card (approx 45%) */}
<div className="lg:col-span-5 relative">
<div className="relative bg-surface-container-lowest rounded-2xl border border-surface-variant p-4 shadow-sm overflow-hidden">
{/* Doctor Portrait Image */}
<div className="relative w-full h-[400px] rounded-xl overflow-hidden bg-surface-container">
<img loading="eager" fetchPriority="high" decoding="async" className="w-full h-full object-cover" data-alt="Professional clinical headshot of an Indian female medical doctor wearing a white lab coat with a clean stethoscope around her neck, smiling warmly against a bright, modern clinic consultation room background with soft neutral lighting and high medical precision." src={photo(image(settings, 'image-home-hero'), 800)}/>
{/* Triage Badge in Top-Right */}
<div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm border border-surface-variant shadow-sm flex items-center space-x-1.5">
<span className="w-2 h-2 rounded-full bg-tertiary"></span>
<span className="text-micro font-micro font-semibold text-on-surface">120s Triage Active</span>
</div>
</div>
{/* Floating Video Queue Card at Bottom */}
<div className="mt-3 p-3.5 bg-surface-container-low rounded-xl border border-surface-variant flex items-center justify-between">
<div className="flex items-center space-x-3">
<div className="w-10 h-10 rounded-lg bg-surface-container-lowest border border-outline-variant flex items-center justify-center text-primary-container">
<span className="material-symbols-outlined text-[20px]" data-icon="videocam">videocam</span>
</div>
<div>
<div className="text-micro font-micro uppercase font-semibold text-on-surface-variant">Next Available GP</div>
<div className="text-body-strong font-body-strong text-on-surface">{gp ? [gp.name, shortDegree(gp.qualification)].filter(Boolean).join(', ') : 'Online GPs, 24x7'}</div>
</div>
</div>
<Link href="/consult/video/general-physician/all" className="px-4 py-2 rounded-lg bg-primary-container text-on-primary font-caption-strong text-caption hover:bg-primary transition duration-150 active:scale-95 shadow-sm">
                Join Queue
              </Link>
</div>
</div>
</div>
</div>
</section>
{/* INTRO STRIP */}
<FadeIn>
<section className="bg-surface-container-lowest border-b border-surface-variant">
<div className="w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop py-10 sm:py-12">
<h2 className="text-headline-h1 font-headline-h1 text-on-surface">One Website for Every Way You See a Doctor</h2>
<p className="text-body-default font-body-default text-on-surface-variant mt-2 max-w-3xl">Video call a doctor in 60 seconds, or walk into a partner clinic with a confirmed slot — Curxx gives you both, with the same verified doctors, the same digital prescription, and the same health record either way.</p>
</div>
</section>
</FadeIn>
{/* ECOSYSTEM SECTION */}
<FadeIn>
<section className="bg-surface-container-low py-16 border-b border-surface-variant">
<div className="w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop space-y-10">
{/* Section Header */}
<div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
<div>
<span className="text-micro font-micro font-semibold uppercase tracking-wider text-on-surface-variant">Complete Care Ecosystem</span>
<h2 className="text-headline-h1 font-headline-h1 text-on-surface mt-1">Find &amp; Book Any Doctor — Online or In-Clinic</h2>
</div>
<p className="text-body-default font-body-default text-on-surface-variant max-w-md md:text-right">
            Browse {doctorsPlus ? `${doctorsPlus} ` : ''}verified medical professionals across {SPECIALTY_COUNT_LABEL} specialties on curxx.in. Filter by location, consultation fee, real-time availability, and patient ratings. Every doctor profile has two buttons: <strong className="text-on-surface">Video Consult</strong> for an instant online session, or <strong className="text-on-surface">Clinic Visit</strong> to book a fixed, zero-wait-time slot at their in-person practice.
          </p>
</div>
{/* 4 Grid Cards */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
{services.map((card) => (
<Link key={card.title} href={fill(card.href, { city })} id={card.anchor || undefined} className="p-6 bg-surface-container-lowest rounded-xl border border-surface-variant flex flex-col justify-between hover:border-outline transition duration-150 group">
<div className="space-y-4">
<div className="w-12 h-12 rounded-lg bg-surface-container-low border border-surface-variant flex items-center justify-center text-primary-container">
<span className="material-symbols-outlined text-[24px]" data-icon={card.icon}>{card.icon}</span>
</div>
<span className="text-micro font-micro uppercase font-semibold text-on-surface-variant">{card.eyebrow}</span>
<h3 className="text-headline-h3 font-headline-h3 text-on-surface">{card.title}</h3>
<p className="text-caption font-caption text-on-surface-variant">{fill(card.body, { accreditedFacilities: accredited, city: cityName })}</p>
</div>
<span className="mt-6 inline-flex items-center space-x-1 text-caption-strong font-caption-strong text-primary-container group-hover:underline">
<span>{card.cta}</span>
<span className="material-symbols-outlined text-[16px]" data-icon="arrow_forward">arrow_forward</span>
</span>
</Link>
))}
</div>
</div>
</section>
</FadeIn>
{bands[0] && <FadeIn><FeatureBand band={bands[0]} /></FadeIn>}
{/* NEARBY CARE SECTION */}
<FadeIn>
<section className="bg-surface-container-lowest py-space-2xl border-b border-surface-variant" id="nearby-care">
<div className="w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop space-y-8">
<div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
<div>
<span className="text-micro font-micro font-semibold uppercase tracking-wider text-on-surface-variant">Near {place}</span>
<h2 className="text-headline-h1 font-headline-h1 text-on-surface mt-1">Prefer to See a Doctor In Person? Book a Clinic Visit Instantly</h2>
<p className="text-caption font-caption text-on-surface-variant mt-1">Not every consultation needs to be virtual. Book a confirmed, zero-wait-time appointment at any of our {accredited ? `${accredited} ` : ''}NABH-accredited clinics and hospitals — the same verified doctors, the same digital prescription and follow-up, just in person.</p>
</div>
<Link href={`/${city}/hospitals`} className="hidden sm:inline-flex items-center space-x-1 text-caption-strong font-caption-strong text-primary-container hover:underline">
<span>View all hospitals &amp; clinics</span>
<span className="material-symbols-outlined text-[16px]" data-icon="arrow_forward">arrow_forward</span>
</Link>
</div>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
{facilities.map((facility) => (
<div key={facility.slug} className="p-5 rounded-xl border border-surface-variant bg-surface-container-lowest hover:border-outline transition flex flex-col justify-between gap-4">
<div className="space-y-3">
<div className="flex items-start justify-between">
<span className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary-container">
<span className="material-symbols-outlined text-[22px]">local_hospital</span>
</span>
<span className="px-2 py-0.5 rounded-full border border-surface-variant bg-surface-container-low text-micro font-micro text-on-surface-variant">{facility.category ?? (facility.type === 'hospital' ? 'Hospital' : 'Clinic')}</span>
</div>
<div>
<h3 className="text-headline-h3 font-headline-h3 text-on-surface leading-tight">
<Link className="hover:text-primary-container transition-colors" href={`/clinic/${facility.slug}`}>{facility.shortName}</Link>
</h3>
<p className="text-caption font-caption text-on-surface-variant mt-1">{facility.tagline}</p>
</div>
<div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-micro font-micro text-on-surface-variant">
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">location_on</span>{facility.area}</span>
<span className="flex items-center gap-1 text-tertiary"><span className="material-symbols-outlined text-[14px]">star</span>{facility.rating}</span>
</div>
{facility.emergency24x7 && (
<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#FFF1F2] border border-[#F9C6C9] text-micro font-micro text-primary-container">
<span className="material-symbols-outlined text-[12px]">emergency</span>
                24x7 Emergency
              </span>
)}
</div>
<div className="flex items-center gap-2">
<Link href={`/clinic/${facility.slug}`} className="flex-1 text-center px-3 py-2 rounded-lg bg-surface-container-low border border-surface-variant text-caption-strong font-caption-strong text-on-surface hover:border-outline transition">View centre</Link>
<a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${facility.name} ${facility.address}`)}`} target="_blank" rel="noopener noreferrer" aria-label={`Directions to ${facility.shortName}`} className="px-3 py-2 rounded-lg border border-surface-variant text-on-surface-variant hover:text-primary-container hover:border-outline transition">
<span className="material-symbols-outlined text-[18px]">directions</span>
</a>
</div>
</div>
))}
</div>
</div>
</section>
</FadeIn>
{/* DIAGNOSTIC LABS SECTION */}
{labs && labs.items.length > 0 && (
<FadeIn>
<section className="bg-surface-container-low py-space-2xl border-b border-surface-variant" id="labs">
<div className="w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop space-y-8">
<div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
<div>
<span className="text-micro font-micro font-semibold uppercase tracking-wider text-on-surface-variant">Diagnostic labs near {labs.near.area}</span>
<h2 className="text-headline-h1 font-headline-h1 text-on-surface mt-1">Lab Tests at Home or a Walk-in Lab Near You</h2>
<p className="text-caption font-caption text-on-surface-variant mt-1">Every partner lab is NABL accredited, with a pathologist signing each report. Book a phlebotomist to your door, or walk in at a booked slot and skip the queue — same price either way.</p>
</div>
<Link href={`/${city}/labs`} className="hidden sm:inline-flex items-center space-x-1 text-caption-strong font-caption-strong text-primary-container hover:underline shrink-0">
<span>View all {labs.total} labs</span>
<span className="material-symbols-outlined text-[16px]">arrow_forward</span>
</Link>
</div>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
{labs.items.map((lab) => <LabMiniCard key={lab.slug} lab={lab} />)}
</div>
<div className="flex flex-col sm:flex-row gap-3">
<Link href="/lab-tests" className="h-11 px-5 inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary-container hover:bg-[#8E0E17] text-white font-caption-strong text-caption-strong transition">
<span className="material-symbols-outlined text-[18px]">science</span>Book a lab test
</Link>
<Link href={`/${city}/labs`} className="h-11 px-5 inline-flex items-center justify-center gap-1.5 rounded-lg border border-surface-variant bg-surface-container-lowest text-on-surface font-caption-strong text-caption-strong hover:border-outline transition">
<span className="material-symbols-outlined text-[18px]">location_on</span>Find a lab near you
</Link>
</div>
</div>
</section>
</FadeIn>
)}
{/* CLINICAL SPECIALTIES SECTION */}
<FadeIn>
<section className="bg-surface-container-lowest py-16 border-b border-surface-variant" id="specialties">
<div className="w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop space-y-10">
{/* Section Header */}
<div className="flex items-end justify-between">
<div>
<span className="text-micro font-micro font-semibold uppercase tracking-wider text-on-surface-variant">Clinical Specialties</span>
<h2 className="text-headline-h1 font-headline-h1 text-on-surface mt-1">Consult Top Doctors Across {SPECIALTY_COUNT_LABEL} Specialties</h2>
</div>
<Link href={`/${city}/specialties`} className="hidden sm:inline-flex items-center space-x-1 text-caption-strong font-caption-strong text-primary-container hover:underline">
<span>View All {SPECIALTY_COUNT_LABEL} Specialties</span>
<span className="material-symbols-outlined text-[16px]" data-icon="arrow_forward">arrow_forward</span>
</Link>
</div>
{/* 6x2 Specialties Grid */}
<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
{tiles.map((specialty) => (
<Link key={specialty.slug} href={`/${city}/${specialty.slug}`} className="p-4 rounded-xl border border-surface-variant bg-surface-container-lowest hover:border-outline text-center flex flex-col items-center justify-center transition cursor-pointer">
<span className="material-symbols-outlined text-outline text-[28px] mb-2">{specialty.icon}</span>
<h3 className="text-caption-strong font-caption-strong text-on-surface">{specialty.name}</h3>
<div className="text-micro font-micro text-on-surface-variant mt-1">From ₹{specialty.fromPrice}</div>
</Link>
))}
</div>
<Link href={`/${city}/specialties`} className="sm:hidden flex items-center justify-center gap-1 h-11 rounded-lg border border-surface-variant text-caption-strong font-caption-strong text-primary-container">
View All {SPECIALTY_COUNT_LABEL} Specialties<span className="material-symbols-outlined text-[16px]">arrow_forward</span>
</Link>
</div>
</section>
</FadeIn>
{/* VERIFIED DOCTORS SECTION */}
<FadeIn>
<section className="bg-surface-container-lowest py-16 border-b border-surface-variant" id="doctors">
<div className="w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop space-y-10">
{/* Section Header */}
<div className="flex items-end justify-between">
<div>
<span className="text-micro font-micro font-semibold uppercase tracking-wider text-on-surface-variant">Strict 4-Tier Verification</span>
<h2 className="text-headline-h1 font-headline-h1 text-on-surface mt-1">Top Verified Doctors for You</h2>
</div>
<Link className="hidden sm:inline-flex items-center space-x-1 text-caption-strong font-caption-strong text-primary-container hover:underline" href={`/${city}/doctors`}>
<span>View all verified doctors</span>
<span className="material-symbols-outlined text-[16px]" data-icon="arrow_forward">arrow_forward</span>
</Link>
</div>
{/* Doctor Cards Grid */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
{doctors.map((doctor) => (
<HomeDoctorCard key={doctor.id} doctor={doctor} onOpen={openCard(`/doctor/${doctor.slug}`)} />
))}
</div>
{/* AI TRIAGE BAND */}
<div className="p-6 md:p-8 bg-surface-container-low rounded-2xl border border-outline-variant/70 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
<div className="flex items-center space-x-5">
<div className="w-14 h-14 rounded-xl bg-surface-container-lowest border border-surface-variant flex items-center justify-center text-primary-container flex-shrink-0 shadow-sm">
<span className="material-symbols-outlined text-[30px]" data-icon="smart_toy">smart_toy</span>
</div>
<div className="space-y-1">
<h2 className="text-headline-h2 font-headline-h2 text-on-surface">Unsure which doctor to visit? Check symptoms in 60s</h2>
<p className="text-caption font-caption text-on-surface-variant max-w-xl">
                Our clinical AI assistant follows ICMR guidelines to map your symptoms to the exact medical department, saving you unnecessary consultations.
              </p>
</div>
</div>
<Link href="/triage" className="whitespace-nowrap px-6 py-3 rounded-lg bg-primary-container text-on-primary font-body-strong text-body-strong hover:bg-primary transition active:scale-95 shadow-sm">
            Start Free AI Triage
          </Link>
</div>
</div>
</section>
</FadeIn>
{/* ABHA / HEALTH ID INTEGRATION */}
<FadeIn>
<section className="bg-surface-container-lowest py-16 border-b border-surface-variant" id="abha">
<div className="w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
{/* Left Column: Copy & Actions */}
<div className="lg:col-span-7 space-y-6">
<div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-surface-container-low border border-surface-variant">
<span className="material-symbols-outlined text-outline text-[16px]" data-icon="shield">shield</span>
<span className="text-micro font-micro font-semibold uppercase tracking-wider text-on-surface-variant">
              Ayushman Bharat Digital Mission (ABDM)
            </span>
</div>
<h2 className="text-headline-h1 font-headline-h1 text-on-surface">
            Your Complete Medical History in One Secure Place
          </h2>
<p className="text-body-default font-body-default text-on-surface-variant">
            Every prescription and report — from a video consult or an in-person clinic visit — is stored under your 14-digit ABHA Health ID. Share your history with any doctor, at any clinic, with one tap of consent.
          </p>
<div className="space-y-3 pt-2">
<div className="flex items-center space-x-3">
<div className="w-6 h-6 rounded-full bg-surface-container-low border border-surface-variant flex items-center justify-center text-tertiary">
<span className="material-symbols-outlined text-[16px]" data-icon="lock">lock</span>
</div>
<span className="text-caption-strong font-caption-strong text-on-surface">256-Bit HIPAA Compliant Consent-Based Architecture</span>
</div>
<div className="flex items-center space-x-3">
<div className="w-6 h-6 rounded-full bg-surface-container-low border border-surface-variant flex items-center justify-center text-tertiary">
<span className="material-symbols-outlined text-[16px]" data-icon="sync">sync</span>
</div>
<span className="text-caption-strong font-caption-strong text-on-surface">Instant Lab Sync with Apollo, Max, Manipal &amp; SRL Diagnostics</span>
</div>
</div>
<div className="flex flex-wrap items-center gap-4 pt-4">
<Link href="/records" className="px-6 py-3 rounded-lg bg-primary-container text-on-primary font-body-strong text-body-strong hover:bg-primary transition active:scale-95 shadow-sm">
              Create ABHA ID →
            </Link>
<Link href="/records" className="px-6 py-3 rounded-lg border border-surface-variant bg-surface-container-lowest text-on-surface font-body-strong text-body-strong hover:bg-surface-container-low transition">
              Link Existing ABHA
            </Link>
</div>
</div>
{/* Right Column: NHA Certified ABHA Card Mock */}
<div className="lg:col-span-5">
<div className="p-6 rounded-2xl border border-surface-variant bg-surface-container-low space-y-6 shadow-sm">
<div className="flex items-center justify-between pb-4 border-b border-surface-variant">
<div className="flex items-center space-x-2">
<span className="material-symbols-outlined text-outline text-[24px]" data-icon="badge">badge</span>
<span className="text-caption-strong font-caption-strong text-on-surface uppercase tracking-wide">National Health Authority</span>
</div>
<span className="px-2 py-0.5 rounded bg-tertiary-fixed/30 border border-tertiary-fixed text-tertiary text-micro font-micro font-semibold">
                GOVT CERTIFIED
              </span>
</div>
<div className="space-y-2">
<span className="text-micro font-micro uppercase text-on-surface-variant font-semibold">14-Digit ABHA Number</span>
<div className="font-mono text-headline-h2 font-headline-h2 tracking-wider text-on-surface bg-surface-container-lowest p-3 rounded-lg border border-surface-variant">
                91-4829-1029-XXXX
              </div>
</div>
<div className="p-3 bg-surface-container-lowest rounded-lg border border-surface-variant space-y-2">
<div className="text-caption-strong font-caption-strong text-on-surface">Linked Health Records (PHR)</div>
<div className="flex justify-between text-micro font-micro text-on-surface-variant">
<span>Prescriptions Linked: <strong>14</strong></span>
<span>Diagnostics Linked: <strong>8</strong></span>
</div>
</div>
<div className="text-micro font-micro text-on-surface-variant flex items-center space-x-1.5">
<span className="material-symbols-outlined text-[16px] text-tertiary" data-icon="verified">verified</span>
<span>Fully synchronized with Ayushman Bharat ecosystem</span>
</div>
</div>
</div>
</div>
</section>
</FadeIn>
{bands.slice(1).map((band, i) => <FadeIn key={band.id}><FeatureBand band={band} flip={i % 2 === 0} /></FadeIn>)}
<FadeIn><PartnerSections sections={items<PartnerSection>(sections, 'shared/partner-sections')} sectionHeadings /></FadeIn>
<FadeIn><PartnerCta /></FadeIn>
{/* HOW IT WORKS SECTION */}
<FadeIn>
<section className="bg-surface-container-low py-16 border-b border-surface-variant">
<div className="w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop space-y-12 text-center">
<div className="max-w-xl mx-auto space-y-2">
<span className="text-micro font-micro font-semibold uppercase tracking-wider text-on-surface-variant">Transparent Process</span>
<h2 className="text-headline-h1 font-headline-h1 text-on-surface">How Curxx Works</h2>
<p className="text-body-default font-body-default text-on-surface-variant">
            Three simple steps to verified medical attention without queueing at hospitals.
          </p>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
{steps.map((step, index) => (
<div key={step.title} className="p-6 bg-surface-container-lowest rounded-xl border border-surface-variant space-y-4 shadow-sm">
<div className="w-10 h-10 rounded-lg bg-primary-container text-on-primary flex items-center justify-center font-bold text-headline-h3">
              {index + 1}
            </div>
<h3 className="text-headline-h3 font-headline-h3 text-on-surface">{step.title}</h3>
<p className="text-caption font-caption text-on-surface-variant">
              {step.body}
            </p>
{step.footnote && (
<div className="pt-2 text-micro font-micro text-on-surface-variant border-t border-surface-variant">
              {step.footnote}
            </div>
)}
</div>
))}
</div>
</div>
</section>
</FadeIn>
<FadeIn><TrustStrip badges={items<string>(sections, 'shared/trust-badges')} /></FadeIn>
{/* PATIENT STORIES SECTION */}
{testimonials.length > 0 && (
<FadeIn>
<section className="bg-surface-container-lowest py-16 border-b border-surface-variant">
<div className="w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop space-y-12">
<div className="text-center max-w-xl mx-auto space-y-2">
<span className="text-micro font-micro font-semibold uppercase tracking-wider text-on-surface-variant">Patient Stories</span>
<h2 className="text-headline-h1 font-headline-h1 text-on-surface">{claim('claim-patients') ? `Trusted by ${claim('claim-patients')} Happy Patients Across India` : 'Trusted by Patients Across India'}</h2>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
{testimonials.map((t) => (
<div key={t.slug} className="p-6 rounded-xl border border-surface-variant bg-surface-container-lowest space-y-4 shadow-sm flex flex-col justify-between">
<div className="space-y-3">
<Stars rating={t.rating} />
<p className="text-caption font-caption text-on-surface leading-relaxed">
                &quot;{t.text}&quot;
              </p>
</div>
<div className="flex items-center space-x-3 pt-3 border-t border-surface-variant">
<div className="w-9 h-9 rounded-full bg-surface-container-low border border-surface-variant flex items-center justify-center text-caption-strong text-primary-container">
                {t.initials}
              </div>
<div>
<div className="text-caption-strong font-caption-strong text-on-surface">{t.name}</div>
<div className="text-micro font-micro text-on-surface-variant">{t.location}</div>
</div>
</div>
</div>
))}
</div>
</div>
</section>
</FadeIn>
)}
{faqs.length > 0 && <FadeIn><FaqSection faqs={faqs} heading={faqSection?.title || undefined} intro={faqSection?.intro || undefined} /></FadeIn>}
{/* APP DOWNLOAD BAND */}
<FadeIn>
<section className="bg-primary text-on-primary py-12">
<div className="w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
<div className="md:col-span-8 space-y-4">
<span className="text-micro font-micro uppercase tracking-widest text-on-primary/80 font-semibold">Always In Your Pocket</span>
<h2 className="text-display font-display text-on-primary">Healthcare that moves at your pace</h2>
<p className="text-body-default font-body-default text-on-primary/90 max-w-xl">
            Download the Curxx app for 1-click video consultations, real-time medicine tracking, and SOS medical dispatch wherever you are in India.
          </p>
<div className="flex flex-wrap gap-3 pt-2">
<a href={claim('url-app-store') || 'https://apps.apple.com'} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 rounded-lg bg-surface-container-lowest text-on-surface font-caption-strong text-caption flex items-center space-x-2 hover:bg-surface-container-low transition">
<span className="material-symbols-outlined text-[20px]" data-icon="phone_iphone">phone_iphone</span>
<span>App Store</span>
</a>
<a href={claim('url-play-store') || 'https://play.google.com'} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 rounded-lg bg-surface-container-lowest text-on-surface font-caption-strong text-caption flex items-center space-x-2 hover:bg-surface-container-low transition">
<span className="material-symbols-outlined text-[20px]" data-icon="android">android</span>
<span>Google Play</span>
</a>
</div>
</div>
<div className="md:col-span-4 flex justify-start md:justify-end">
<div className="bg-surface-container-lowest text-on-surface p-4 rounded-xl shadow-md flex items-center space-x-4 border border-surface-variant">
<div className="w-20 h-20 bg-surface-container flex items-center justify-center rounded-lg border border-surface-variant text-on-surface-variant">
<span className="material-symbols-outlined text-[48px]" data-icon="qr_code_2">qr_code_2</span>
</div>
<div>
<div className="text-caption-strong font-caption-strong text-on-surface">Scan to Download</div>
<div className="text-micro font-micro text-on-surface-variant mt-0.5">Available on iOS &amp; Android</div>
{(claim('claim-app-rating') || claim('claim-app-downloads')) && <div className="text-micro font-micro text-tertiary font-semibold mt-2">{[claim('claim-app-rating') && `⭐ ${claim('claim-app-rating')}`, claim('claim-app-downloads') && `${claim('claim-app-downloads')} Downloads`].filter(Boolean).join(' · ')}</div>}
</div>
</div>
</div>
</div>
</section>
</FadeIn>
{/* INSTITUTIONAL TRUST BAR & SOS 108 */}
<FadeIn>
<section className="bg-surface-container-lowest py-8" id="emergency">
<div className="w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop">
<div className="bg-inverse-surface text-inverse-on-surface p-4 sm:p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
<div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-caption font-caption text-inverse-on-surface/90">
<div className="flex items-center space-x-2">
<span className="material-symbols-outlined text-[20px] text-tertiary-fixed" data-icon="verified">verified</span>
<span>{doctorsPlus ? `${doctorsPlus} Verified Indian Doctors` : 'Verified Indian Doctors'}</span>
</div>
<div className="flex items-center space-x-2">
<span className="material-symbols-outlined text-[20px] text-tertiary-fixed" data-icon="encrypted">encrypted</span>
<span>100% Encrypted Video Consult</span>
</div>
<div className="flex items-center space-x-2">
<span className="material-symbols-outlined text-[20px] text-tertiary-fixed" data-icon="replay">replay</span>
<span>Free 7-Day Follow-Up Included</span>
</div>
</div>
<Link className="pulse-emergency flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-primary-container text-on-primary font-caption-strong text-caption hover:opacity-95 whitespace-nowrap transition" href="tel:108">
<span className="material-symbols-outlined text-[18px]" data-icon="emergency">emergency</span>
<span>Emergency SOS: 108</span>
</Link>
</div>
</div>
</section>
</FadeIn>
</main>
<Footer />
<CityPicker open={cityOpen} onClose={() => setCityOpen(false)} />

    </>
  );
}
