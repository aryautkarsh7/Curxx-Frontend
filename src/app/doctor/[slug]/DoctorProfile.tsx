'use client';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import FaqAccordion from '@/components/seo/FaqAccordion';
import { JsonLd } from '@/lib/seo';
import BookingWidget from '@/components/BookingWidget';
import DoctorReviews from '@/components/DoctorReviews';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import SaveButton from '@/components/SaveButton';
import Toast, { useToast } from '@/components/Toast';
import ContactButtons from '@/components/profile/ContactButtons';
import ReportIssue from '@/components/profile/ReportIssue';
import VideoGallery from '@/components/profile/VideoGallery';
import { photo, rupees, type ConsultMode, type Doctor, type DoctorDetail, type Facility, type Slot, type Video } from '@/lib/api';
import { slotLabel } from '@/components/DoctorCard';

type Service = { slug: string; name: string; description: string; icon: string; focus: boolean };
type Props = {
  doctor: DoctorDetail & { services?: Service[] };
  facility: Facility | null;
  similar: Doctor[];
  slots: Slot[];
  mode?: ConsultMode;
  /** Slot chosen on a listing card, preselected in the widget. */
  slotId?: string;
  /** Reels and videos linked to this doctor in the admin panel. */
  videos?: Video[];
  /** Curxx's own numbers, used when neither the doctor nor the clinic has one. */
  contact?: { phone: string; whatsapp: string };
};

const mapsUrl = (q: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

export default function DoctorProfile({ doctor, facility, similar, slots, mode = 'clinic', slotId, videos = [], contact }: Props) {
  const router = useRouter();
  const [toast, showToast] = useToast();
  const preselected = slotId ? slots.find((s) => s.id === slotId) : undefined;
  const [widgetMode, setWidgetMode] = useState<ConsultMode>(preselected?.mode === 'video' && mode === 'audio' ? 'audio' : preselected?.mode ?? mode);
  const [initialSlot, setInitialSlot] = useState(slotId);
  const [picked, setPicked] = useState<Slot | null>(preselected ?? null);
  const [pickedMode, setPickedMode] = useState<ConsultMode>(widgetMode);
  const onSelect = useCallback((slot: Slot | null, m: ConsultMode) => {
    setPicked(slot);
    setPickedMode(m);
  }, []);
  // One number everywhere: the count of reviews actually on the profile.
  const reviewTotal = doctor.reviewSummary.total;
  const nextVideo = slots.find((s) => s.mode === 'video');
  const city = doctor.city;
  const cityName = doctor.cityName ?? 'Bengaluru';
  const specialtyPlural = doctor.specialtyPlural ?? 'Doctors';
  const firstName = doctor.name.replace(/^Dr\.\s*/, '').split(' ')[0];

  async function share() {
    const url = window.location.href;
    try {
      if (navigator.share) await navigator.share({ title: doctor.name, text: `${doctor.name}, ${doctor.title}`, url });
      else {
        await navigator.clipboard.writeText(url);
        showToast('Profile link copied');
      }
    } catch {
      // Share sheet dismissed.
    }
  }

  const goToBooking = (m?: ConsultMode) => {
    if (m && m !== widgetMode) {
      setWidgetMode(m);
      setInitialSlot(undefined);
    }
    document.getElementById('book')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const time = (startsAt: string) => slotLabel(startsAt);

  const faqs = [
    { question: `What is ${doctor.name}’s consultation fee?`, answer: `${rupees(doctor.fee)} for an in-clinic visit at ${doctor.clinicName}${doctor.offersVideo !== false ? `, and ${rupees(doctor.videoFee)} for a video consultation${doctor.freeVideo ? ' (the first video consult is free on selected slots)' : ''}` : ''}. Every booking includes a 7-day chat follow-up.` },
    doctor.offersVideo !== false
      ? { question: `Does ${doctor.name} offer online consultations?`, answer: nextVideo ? `Yes. The next video slot is ${slotLabel(nextVideo.startsAt).toLowerCase()}. You get a digitally signed e-prescription after the call.` : `Video consultations are offered, but there are no open video slots this week. Book a clinic visit or check back tomorrow.` }
      : { question: `Does ${doctor.name} offer online consultations?`, answer: `${doctor.name} sees patients in person at ${doctor.clinicName}. Book a clinic visit at a time that suits you.` },
    { question: `When is ${doctor.name} available?`, answer: `${doctor.consultHours ? `${doctor.name} consults ${doctor.consultHours}.` : ''} Open slots for the next seven days are shown in the booking panel${facility?.openHours ? `; ${facility.name} is open ${facility.openHours}` : ''}.` },
    { question: `Where does ${doctor.name} practise?`, answer: `${doctor.clinicName}, ${doctor.area}, ${cityName}.${facility?.address ? ` ${facility.address}.` : ''}` },
    { question: `Which languages does ${doctor.name} speak?`, answer: `${doctor.languages.join(', ')}.` },
    { question: 'Can I cancel or reschedule?', answer: 'Yes — from My Appointments, free of charge up to 2 hours before the slot. Any payment is refunded to the original method within 5–7 working days.' },
  ];

  const physician = {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    name: doctor.name,
    medicalSpecialty: doctor.specialtyName,
    image: doctor.photoUrl ? photo(doctor.photoUrl, 400) : undefined,
    address: { '@type': 'PostalAddress', streetAddress: facility?.address ?? doctor.area, addressLocality: cityName, addressCountry: 'IN' },
    priceRange: `₹${Math.min(doctor.fee, doctor.videoFee)}–₹${Math.max(doctor.fee, doctor.videoFee)}`,
    ...(reviewTotal > 0 ? { aggregateRating: { '@type': 'AggregateRating', ratingValue: doctor.reviewSummary.average, reviewCount: reviewTotal, bestRating: 5 } } : {}),
  };

  return (
    <>
      <Header />
      <JsonLd data={physician} />
      <div className="w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop pt-4 pb-2">
        <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-1.5 font-caption text-caption text-[#78716C]">
          <Link href="/" className="hover:text-[#1C1917]">Home</Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <Link href={`/${city}/specialties`} className="hover:text-[#1C1917]">{cityName}</Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <Link href={`/${city}/${doctor.specialty}`} className="hover:text-[#1C1917]">{specialtyPlural}</Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-[#C1121F] font-caption-strong text-caption-strong">{doctor.name}</span>
        </nav>
      </div>

      <main className="w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop py-4 pb-28 lg:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-6 lg:gap-x-8 items-start">
          <div className="min-w-0 w-full lg:col-start-1 lg:row-start-1">
            {/* HERO */}
            <article className="bg-white border border-[#E7E5E4] rounded-2xl p-5 sm:p-8 relative">
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-2">
                <button type="button" onClick={share} className="p-2 rounded-lg border border-[#E7E5E4] text-[#78716C] hover:text-[#1C1917] hover:bg-[#FAFAF9]" title="Share profile" aria-label="Share profile">
                  <span className="material-symbols-outlined text-[20px]">share</span>
                </button>
                <SaveButton kind="doctors" slug={doctor.slug} label={doctor.name} />
              </div>
              <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 items-start">
                <div className="relative shrink-0">
                  <img alt={doctor.name} className="w-24 h-24 sm:w-[120px] sm:h-[120px] rounded-full object-cover border-2 border-white shadow-sm ring-1 ring-[#E7E5E4]" src={photo(doctor.photoUrl, 240)} />
                  {doctor.verified && (
                    <span className="absolute bottom-1 right-1 bg-[#047857] text-white p-1 rounded-full flex items-center justify-center border-2 border-white" title="Credentials verified">
                      <span className="material-symbols-outlined text-[16px] font-bold">check</span>
                    </span>
                  )}
                </div>
                <div className="space-y-1.5 flex-1 sm:pr-20">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="font-display text-display text-[#1C1917] tracking-tight">{doctor.name}</h1>
                    {doctor.verified && (
                      <span className="inline-flex items-center gap-1 bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857] px-2 py-0.5 rounded-full font-micro text-micro">
                        <span className="material-symbols-outlined text-[12px]">verified</span>Verified
                      </span>
                    )}
                  </div>
                  <p className="font-body-default text-body-default text-[#78716C]">{doctor.qualification}</p>
                  <p className="font-body-strong text-body-strong text-[#1C1917]">{doctor.title}{doctor.title !== doctor.specialtyName ? ` · ${doctor.specialtyName}` : ''}</p>
                  {doctor.registration && (
                    <p className="flex items-center gap-1.5 pt-1 text-[#78716C] font-caption text-caption">
                      <span className="material-symbols-outlined text-[16px] text-[#047857]">shield</span>Reg. No: {doctor.registration} · credentials verified by Curxx
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-6 bg-[#FAFAF9] border border-[#E7E5E4] rounded-xl p-4 grid grid-cols-3 divide-x divide-[#E7E5E4]">
                <div className="px-2 sm:px-3 text-center">
                  <div className="font-headline-h2 text-headline-h2 text-[#047857] font-bold">{doctor.recommendPercent}%</div>
                  <div className="font-caption-strong text-caption-strong text-[#1C1917]">Recommend</div>
                </div>
                <div className="px-2 sm:px-3 text-center">
                  <div className="font-headline-h2 text-headline-h2 text-[#1C1917] font-bold">{doctor.reviewSummary.average || doctor.rating}</div>
                  <div className="font-caption-strong text-caption-strong text-[#1C1917]">{reviewTotal.toLocaleString('en-IN')} reviews</div>
                </div>
                <div className="px-2 sm:px-3 text-center">
                  <div className="font-headline-h2 text-headline-h2 text-[#1C1917] font-bold">{doctor.experienceYears} yrs</div>
                  <div className="font-caption-strong text-caption-strong text-[#1C1917]">Experience</div>
                </div>
              </div>
              <div className="mt-5 flex items-center gap-2 flex-wrap">
                <span className="font-caption-strong text-caption-strong text-[#78716C] mr-1">Speaks:</span>
                {doctor.languages.map((l) => <span key={l} className="px-3 py-1 bg-[#F5F5F4] border border-[#E7E5E4] rounded-full font-caption text-caption text-[#1C1917]">{l}</span>)}
              </div>
              {(doctor.freeVideo || doctor.instant || doctor.consultHours) && (
                <div className="mt-4 flex items-center gap-2 flex-wrap font-caption text-caption">
                  {doctor.instant && <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857]"><span className="w-1.5 h-1.5 rounded-full bg-[#047857]"></span>Online 24x7</span>}
                  {doctor.freeVideo && <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857]"><span className="material-symbols-outlined text-[14px]">redeem</span>Free first video consult</span>}
                  {doctor.consultHours && <span className="inline-flex items-center gap-1 text-[#78716C]"><span className="material-symbols-outlined text-[16px]">schedule</span>{doctor.consultHours}</span>}
                </div>
              )}
              <div className="mt-5 pt-4 border-t border-[#E7E5E4] flex items-center justify-between gap-3 flex-wrap">
                <ContactButtons
                  targetType="doctor"
                  slug={doctor.slug}
                  name={doctor.name}
                  phones={[doctor.phone, facility?.phone, contact?.phone]}
                  whatsapps={[doctor.whatsapp, facility?.whatsapp, contact?.whatsapp]}
                  message={`Hi, I'd like to book a consultation with ${doctor.name} (found on Curxx).`}
                />
                <ReportIssue targetType="doctor" slug={doctor.slug} name={doctor.name} />
              </div>
            </article>
          </div>

          <aside id="book" aria-label="Book an appointment" className="w-full lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto no-scrollbar space-y-3 scroll-mt-20 rounded-2xl">
            <BookingWidget key={widgetMode} doctor={doctor} slots={slots} initialMode={widgetMode} initialSlotId={initialSlot} onSelect={onSelect} />
            {nextVideo && widgetMode === 'clinic' && doctor.offersVideo !== false && (
              <div className="bg-[#FFF1F2] border border-[#F9C6C9] rounded-xl p-3 flex items-center justify-between gap-2 text-caption font-caption text-[#8E0E17]">
                <span>Next video slot: <strong>{slotLabel(nextVideo.startsAt)}</strong>{nextVideo.free ? ' · Free' : ''}</span>
                <button type="button" onClick={() => { setWidgetMode('video'); setInitialSlot(undefined); }} className="font-caption-strong text-caption-strong text-[#C1121F] hover:underline shrink-0">Switch to video</button>
              </div>
            )}
          </aside>

          <section className="min-w-0 space-y-6 w-full lg:col-start-1 lg:row-start-2">

            <nav aria-label="Profile sections" className="overflow-x-auto no-scrollbar sticky top-16 z-30 bg-white border-b border-[#E7E5E4] px-2 flex items-center gap-6 sm:gap-8">
              {[['overview', 'Overview'], ['services', 'Services'], ...(videos.length ? [['videos', 'Videos']] : []), ['reviews', `Reviews (${reviewTotal})`], ['clinic', 'Clinic'], ['faqs', 'FAQs']].map(([id, label]) => (
                <a key={id} href={`#${id}`} className="py-3 font-body-default text-body-default text-[#78716C] hover:text-[#1C1917] whitespace-nowrap">{label}</a>
              ))}
            </nav>

            <section id="overview" className="bg-white border border-[#E7E5E4] rounded-2xl p-5 sm:p-8 space-y-6 scroll-mt-32">
              <div>
                <h2 className="font-headline-h2 text-headline-h2 text-[#1C1917] mb-3">About {doctor.name}</h2>
                <p className="font-body-default text-body-default text-[#1C1917] leading-relaxed">{doctor.about}</p>
              </div>
              {doctor.focusAreaNames.length > 0 && (
                <div>
                  <h3 className="font-headline-h3 text-headline-h3 text-[#1C1917] mb-3">Special interests</h3>
                  <div className="flex flex-wrap gap-2">
                    {doctor.focusAreaNames.map((f) => <span key={f} className="px-3 py-1 bg-[#FFF1F2] border border-[#F9C6C9] text-[#8E0E17] font-caption-strong text-caption-strong rounded-full">{f}</span>)}
                  </div>
                </div>
              )}
              {(doctor.education?.length ?? 0) > 0 && (
                <div>
                  <h3 className="font-headline-h3 text-headline-h3 text-[#1C1917] mb-4">Education &amp; training</h3>
                  <ol className="relative pl-6 space-y-5 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[1.5px] before:bg-[#E7E5E4]">
                    {[...doctor.education!].reverse().map((e) => (
                      <li key={`${e.degree}-${e.year}`} className="relative">
                        <span className="absolute -left-[22px] top-1.5 w-3 h-3 rounded-full bg-white border-2 border-[#C1121F]" />
                        <p className="font-body-strong text-body-strong text-[#1C1917]">{e.degree}</p>
                        <p className="font-caption text-caption text-[#78716C]">{e.institute} · {e.year}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </section>

            {(doctor.services?.length ?? 0) > 0 && (
              <section id="services" className="bg-white border border-[#E7E5E4] rounded-2xl p-5 sm:p-8 space-y-4 scroll-mt-32">
                <h2 className="font-headline-h2 text-headline-h2 text-[#1C1917]">Conditions &amp; services</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {doctor.services!.map((s) => (
                    <div key={s.slug} className="p-4 rounded-xl border border-[#E7E5E4] flex items-start gap-3">
                      <span className="w-10 h-10 rounded-lg bg-[#FFF1F2] text-[#C1121F] flex items-center justify-center shrink-0"><span className="material-symbols-outlined text-[22px]">{s.icon}</span></span>
                      <div className="min-w-0">
                        <p className="font-body-strong text-body-strong text-[#1C1917] flex items-center gap-1.5 flex-wrap">{s.name}{s.focus && <span className="px-1.5 py-0.5 rounded bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857] text-micro font-micro">Special interest</span>}</p>
                        <p className="font-caption text-caption text-[#78716C]">{s.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {videos.length > 0 && (
              <div className="bg-white border border-[#E7E5E4] rounded-2xl p-5 sm:p-8">
                <VideoGallery id="videos" videos={videos} heading={`Videos from ${doctor.name}`} subheading="Health tips and answers to common questions" />
              </div>
            )}

            <section id="reviews" className="bg-white border border-[#E7E5E4] rounded-2xl p-5 sm:p-8 space-y-4 scroll-mt-32">
              <h2 className="font-headline-h2 text-headline-h2 text-[#1C1917]">Patient stories</h2>
              <DoctorReviews slug={doctor.slug} doctorName={doctor.name} />
            </section>

            <section id="clinic" className="bg-white border border-[#E7E5E4] rounded-2xl p-5 sm:p-8 space-y-4 scroll-mt-32">
              <h2 className="font-headline-h2 text-headline-h2 text-[#1C1917]">Where {firstName} practises</h2>
              <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl border border-[#E7E5E4]">
                {facility?.photoUrl && <img src={photo(facility.photoUrl, 400)} alt={facility.name} loading="lazy" className="w-full sm:w-40 h-32 rounded-lg object-cover" />}
                <div className="flex-1 min-w-0 space-y-1">
                  <h3 className="font-body-strong text-body-strong text-[#1C1917]">
                    {facility ? <Link href={`/clinic/${facility.slug}`} className="hover:text-[#C1121F]">{facility.name}</Link> : doctor.clinicName}
                  </h3>
                  <p className="font-caption text-caption text-[#78716C]">{facility?.address ?? `${doctor.area}, ${cityName}`}</p>
                  {facility && <p className="font-caption text-caption text-[#78716C]">{facility.category ? `${facility.category} · ` : ''}Open {facility.openHours}{facility.emergency24x7 ? ' · 24x7 emergency' : ''}</p>}
                  {doctor.consultHours && <p className="font-caption text-caption text-[#78716C]">{firstName} consults here {doctor.consultHours}</p>}
                  <p className="font-caption text-caption text-[#1C1917]">Consultation fee: <strong className="font-body-strong">{rupees(doctor.fee)}</strong>{doctor.offersVideo !== false ? ` · Video ${rupees(doctor.videoFee)}` : ''}</p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <a href={mapsUrl(`${doctor.clinicName} ${facility?.address ?? doctor.area}`)} target="_blank" rel="noopener noreferrer" className="h-9 px-3 rounded-lg border border-[#E7E5E4] font-caption-strong text-caption inline-flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">directions</span>Directions</a>
                    {facility && (
                      <ContactButtons size="sm" targetType="facility" slug={facility.slug} name={facility.name} phones={[facility.phone]} whatsapps={[facility.whatsapp]} />
                    )}
                    <button type="button" onClick={() => goToBooking('clinic')} className="h-9 px-3 rounded-lg bg-[#C1121F] text-white font-caption-strong text-caption">Book clinic visit</button>
                  </div>
                </div>
              </div>
            </section>
          </section>
        </div>

        {similar.length > 0 && (
          <section className="mt-16 pt-8 border-t border-[#E7E5E4] space-y-6">
            <div className="flex items-end justify-between gap-3 flex-wrap">
              <div>
                <h2 className="font-headline-h2 text-headline-h2 text-[#1C1917]">Similar {specialtyPlural.toLowerCase()} in {cityName}</h2>
                <p className="font-caption text-caption text-[#78716C]">Verified specialists you can book today</p>
              </div>
              <Link className="font-body-strong text-body-strong text-[#C1121F] hover:underline flex items-center gap-1" href={`/${city}/${doctor.specialty}`}>View all<span className="material-symbols-outlined text-[18px]">arrow_forward</span></Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {similar.map((d) => (
                <Link key={d.slug} href={`/doctor/${d.slug}`} className="p-4 rounded-xl border border-[#E7E5E4] bg-white hover:border-[#A8A29E] flex items-center gap-3">
                  <img src={photo(d.photoUrl, 112)} alt={d.name} loading="lazy" className="w-14 h-14 rounded-full object-cover" />
                  <span className="min-w-0">
                    <h3 className="block font-body-strong text-body-strong text-[#1C1917] truncate">{d.name}</h3>
                    <span className="block font-caption text-caption text-[#78716C] truncate">{d.title} · {d.experienceYears} yrs</span>
                    <span className="block font-caption-strong text-caption text-[#1C1917]">{rupees(d.fee)} · {d.area}</span>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section id="faqs" className="mt-12 scroll-mt-24">
          <FaqAccordion faqs={faqs} heading={`Frequently Asked Questions About ${doctor.name}`} />
        </section>
      </main>

      {/* Phones: the bar follows the widget — once a time is picked it books it directly. */}
      <div className="lg:hidden fixed bottom-16 inset-x-0 z-30 bg-white/95 backdrop-blur border-t border-[#E7E5E4] px-margin py-3 flex items-center gap-3">
        <div className="min-w-0">
          <p className="font-micro text-micro text-[#78716C] truncate">{picked ? `${pickedMode === 'audio' ? 'Phone' : picked.mode === 'video' ? 'Video' : 'Clinic'} · ${time(picked.startsAt)}` : widgetMode === 'audio' ? 'Phone consult' : widgetMode === 'video' ? 'Video consult' : 'Clinic visit'}</p>
          <p className="font-headline-h3 text-headline-h3 text-[#1C1917] leading-none">{picked ? (picked.fee === 0 ? 'Free' : rupees(picked.fee)) : rupees(widgetMode === 'clinic' ? doctor.fee : doctor.videoFee)}</p>
        </div>
        {picked ? (
          <button type="button" onClick={() => router.push(`/book?slot=${picked.id}&doctor=${doctor.slug}${pickedMode === 'audio' ? '&mode=audio' : ''}`)} className="flex-1 h-12 rounded-lg bg-[#C1121F] hover:bg-[#8E0E17] text-white font-body-strong text-body-strong flex items-center justify-center gap-1.5">
            Book this slot<span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        ) : (
          <button type="button" onClick={() => goToBooking()} className="flex-1 h-12 rounded-lg bg-[#C1121F] hover:bg-[#8E0E17] text-white font-body-strong text-body-strong flex items-center justify-center gap-1.5">
            <span className="material-symbols-outlined text-[18px]">event_available</span>Choose a time
          </button>
        )}
      </div>
      <Toast message={toast} />
      <Footer />
    </>
  );
}
