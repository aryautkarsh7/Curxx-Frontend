'use client';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useListingControls } from '@/app/[city]/[specialty]/useListingControls';
import ConsultSteps from '@/components/ConsultSteps';
import { slotLabel } from '@/components/DoctorCard';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import ListingFilterGroups, { toChips } from '@/components/ListingFilterGroups';
import MobileFilterSheet from '@/components/MobileFilterSheet';
import { photo, rupees, type Doctor, type DoctorList, type Specialty, type SubSpecialty } from '@/lib/api';
import { getCity } from '@/lib/cities';

type When = 'now' | 'free' | 'later';
type Props = DoctorList & { specialty: Specialty; focus: SubSpecialty | null; when: When };

const WHEN_OPTIONS = [
  { value: 'now', label: 'Consult now', hint: 'Online in the next hour — opens with the slot ready', icon: 'bolt' },
  { value: 'free', label: 'Free consult', hint: 'Doctors offering a free first video consult', icon: 'redeem' },
  { value: 'later', label: 'Book a time', hint: 'Pick any video slot in the next 7 days', icon: 'calendar_month' },
] as const;

export default function VideoDoctorPicker({ specialty, focus, when, doctors, total, pages, facets }: Props) {
  const { page, sort, filters, setParam, setAvailability, goToPage } = useListingControls();
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const instant = when !== 'later';
  const activeChips = toChips({ ...filters, mode: undefined, free: undefined, availability: instant ? undefined : filters.availability });
  const pageNumbers = Array.from({ length: Math.min(pages, 5) }, (_, i) => i + 1).filter((n) => n <= pages);

  function replaceParams(mutate: (p: URLSearchParams) => void) {
    const next = new URLSearchParams(params.toString());
    mutate(next);
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  /** The consultation option itself, kept out of the filter rail because it drives the CTA too. */
  const chooseWhen = (value: When) =>
    replaceParams((p) => {
      if (value === 'now') p.delete('when');
      else p.set('when', value);
      p.delete('availability');
      p.delete('sort');
      p.delete('page');
    });

  const clearFilters = () => replaceParams((p) => {
    for (const key of ['area', 'language', 'availability', 'maxFee', 'minExperience', 'page']) p.delete(key);
  });

  return (
    <>
      <Header />
      <ConsultSteps current={3} backTo={{ 1: '/consult/video', 2: `/consult/video/${specialty.slug}` }} />

      <section className="bg-surface-container-low border-b border-surface-variant py-5">
        <div className="w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop space-y-3">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-caption font-caption text-on-surface-variant">
            <Link className="hover:text-primary-container" href="/consult/video">Video consult</Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <Link className="hover:text-primary-container" href={`/consult/video/${specialty.slug}`}>{specialty.name}</Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-on-surface font-caption-strong">{focus ? focus.name : 'All concerns'}</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-3">
            <div>
              <h1 className="text-headline-h1 font-headline-h1 text-on-surface">
                {focus ? focus.name : specialty.plural} on video
              </h1>
              <p className="text-caption font-caption text-on-surface-variant mt-1">
                {total.toLocaleString('en-IN')} verified {total === 1 ? specialty.name.toLowerCase() : specialty.plural.toLowerCase()}
                {focus ? ` treating ${focus.name.toLowerCase()}` : ''} · {when === 'now' ? 'online in the next hour' : when === 'free' ? 'with a free first consult' : 'bookable this week'}
              </p>
            </div>
            <Link href={`/consult/video/${specialty.slug}`} className="inline-flex items-center gap-1.5 text-caption-strong font-caption-strong text-primary-container hover:underline">
              <span className="material-symbols-outlined text-[16px]">tune</span>
              Change focus area
            </Link>
          </div>

          {/* Consultation option */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 max-w-3xl" role="group" aria-label="Consultation option">
            {WHEN_OPTIONS.map((option) => {
              const active = when === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  aria-pressed={active}
                  onClick={() => chooseWhen(option.value)}
                  className={
                    active
                      ? 'text-left px-4 py-3 rounded-xl border-2 border-primary-container bg-[#FFF1F2] transition'
                      : 'text-left px-4 py-3 rounded-xl border border-surface-variant bg-surface-container-lowest hover:border-outline transition'
                  }
                >
                  <span className={active ? 'flex items-center gap-1.5 text-caption-strong font-caption-strong text-primary-container' : 'flex items-center gap-1.5 text-caption-strong font-caption-strong text-on-surface'}>
                    <span className="material-symbols-outlined text-[18px]">{option.icon}</span>
                    {option.label}
                  </span>
                  <span className="block text-micro font-micro text-on-surface-variant mt-0.5">{option.hint}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <main className="w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop py-8 pb-28 lg:pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)] gap-gutter-desktop items-start">
          <aside className="hidden lg:block bg-surface-container-lowest border border-surface-variant rounded-xl p-4 lg:sticky lg:top-24 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-surface-variant">
              <div className="font-headline-h3 text-headline-h3 text-on-surface flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] text-on-surface-variant">tune</span>
                Filters
              </div>
              <button type="button" onClick={clearFilters} className="font-caption-strong text-caption-strong text-primary-container hover:text-[#8E0E17] transition-colors">Clear all</button>
            </div>
            <div className="px-3 py-2 rounded-lg bg-surface-container-low border border-surface-variant text-caption font-caption text-on-surface-variant flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-primary-container">videocam</span>
              Video consultation only
            </div>
            <ListingFilterGroups
              filters={filters}
              activeChips={activeChips}
              setParam={setParam}
              setAvailability={setAvailability}
              hide={instant ? ['mode', 'availability', 'free'] : ['mode', 'free']}
              areas={facets?.areas}
              languages={facets?.languages}
            />
          </aside>

          <section className="space-y-4" aria-labelledby="results-heading">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <h2 id="results-heading" className="font-headline-h3 text-headline-h3 text-on-surface">
                {when === 'now' ? 'Online now — join within the hour' : when === 'free' ? 'Free first video consultation' : 'Video slots in the next 7 days'}
              </h2>
              <div className="flex items-center gap-2">
                <span className="font-caption text-caption text-on-surface-variant">Sort by:</span>
                <select
                  value={sort}
                  onChange={(e) => setParam('sort', e.target.value === 'relevance' ? undefined : e.target.value)}
                  aria-label="Sort doctors"
                  className="appearance-none bg-surface-container-lowest border border-surface-variant rounded-lg pl-3 pr-8 py-1.5 font-caption-strong text-caption-strong text-on-surface focus:outline-none focus:border-primary-container cursor-pointer"
                >
                  <option value="relevance">Relevance</option>
                  <option value="soonest">Earliest available</option>
                  <option value="fee_asc">Fee: Low to High</option>
                  <option value="fee_desc">Fee: High to Low</option>
                  <option value="experience">Experience</option>
                  <option value="rating">Rating</option>
                </select>
              </div>
            </div>

            {doctors.length === 0 ? (
              <div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-8 text-center flex flex-col items-center gap-3">
                <span className="w-14 h-14 rounded-full bg-[#FFF1F2] border border-[#F9C6C9] flex items-center justify-center text-primary-container">
                  <span className="material-symbols-outlined text-[28px]">search_off</span>
                </span>
                <p className="font-headline-h3 text-headline-h3 text-on-surface">
                  No {specialty.plural.toLowerCase()} {when === 'now' ? 'are online in the next hour' : when === 'free' ? 'offer a free consult right now' : 'match these filters'}
                </p>
                <p className="font-body-default text-body-default text-on-surface-variant max-w-md">
                  {instant
                    ? 'Switch to “Book a time” to reserve a video slot later this week, or widen your filters.'
                    : 'Try clearing a filter, or look at every doctor in this specialty.'}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 pt-2 w-full max-w-md">
                  {instant ? (
                    <button type="button" onClick={() => chooseWhen('later')} className="flex-1 h-11 rounded-lg bg-primary-container hover:bg-[#8E0E17] text-white font-caption-strong text-caption-strong transition">
                      Book a time instead
                    </button>
                  ) : (
                    <button type="button" onClick={clearFilters} className="flex-1 h-11 rounded-lg bg-primary-container hover:bg-[#8E0E17] text-white font-caption-strong text-caption-strong transition">
                      Clear all filters
                    </button>
                  )}
                  {focus && (
                    <Link href={`/consult/video/${specialty.slug}/all${instant ? '' : '?when=later'}`} className="flex-1 h-11 rounded-lg border border-primary-container text-primary-container hover:bg-[#FFF1F2] font-caption-strong text-caption-strong flex items-center justify-center transition">
                      Show all {specialty.plural.toLowerCase()}
                    </Link>
                  )}
                </div>
              </div>
            ) : (
              doctors.map((doctor) => (
                <ConsultDoctorCard key={doctor.id} doctor={doctor} focus={focus} when={when} />
              ))
            )}

            {pages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-6 flex-wrap">
                <button type="button" disabled={page <= 1} onClick={() => goToPage(page - 1)} className="px-3.5 py-2 border border-surface-variant rounded-lg font-caption-strong text-caption text-on-surface-variant hover:bg-surface-container transition disabled:opacity-40">
                  Previous
                </button>
                {pageNumbers.map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => goToPage(n)}
                    aria-current={page === n ? 'page' : undefined}
                    className={page === n ? 'w-9 h-9 bg-primary-container text-white font-caption-strong text-caption rounded-lg' : 'w-9 h-9 border border-surface-variant text-on-surface font-caption-strong text-caption rounded-lg hover:bg-surface-container'}
                  >
                    {n}
                  </button>
                ))}
                <button type="button" disabled={page >= pages} onClick={() => goToPage(page + 1)} className="px-3.5 py-2 border border-surface-variant rounded-lg font-caption-strong text-caption text-on-surface hover:bg-surface-container transition disabled:opacity-40">
                  Next
                </button>
              </div>
            )}
          </section>
        </div>
      </main>

      <MobileFilterSheet
        filters={filters}
        activeChips={activeChips}
        total={total}
        noun={specialty.plural.toLowerCase()}
        setParam={setParam}
        setAvailability={setAvailability}
        clearFilters={clearFilters}
        hide={instant ? ['mode', 'availability', 'free'] : ['mode', 'free']}
        areas={facets?.areas}
        languages={facets?.languages}
      />
      <Footer />
    </>
  );
}

function ConsultDoctorCard({ doctor, focus, when }: { doctor: Doctor; focus: SubSpecialty | null; when: When }) {
  const slot = doctor.nextSlot;
  // Consult now / free: open the profile with that exact slot already selected.
  const joinHref = slot ? `/doctor/${doctor.slug}?slot=${slot.id}&mode=video` : `/doctor/${doctor.slug}?mode=video`;
  const instant = when !== 'later';
  const treats = (doctor.focusAreas ?? []).slice(0, 4);

  return (
    <article className="bg-surface-container-lowest border border-surface-variant rounded-xl p-5 hover:border-outline transition">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-shrink-0">
          <img
            loading="lazy"
            decoding="async"
            alt={`${doctor.name}, ${doctor.title}`}
            className="w-[88px] h-[88px] rounded-full object-cover border border-surface-variant"
            src={photo(doctor.photoUrl, 176)}
          />
          {doctor.verified && (
            <span className="absolute bottom-0 right-0 bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857] rounded-full p-0.5 flex items-center justify-center">
              <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
            </span>
          )}
        </div>

        <div className="flex-1 min-w-0 space-y-1.5">
          <Link href={`/doctor/${doctor.slug}`} className="font-headline-h2 text-headline-h2 text-on-surface hover:text-primary-container transition-colors">
            {doctor.name}
          </Link>
          <p className="font-caption text-caption text-on-surface-variant">{doctor.qualification}</p>
          <p className="font-caption-strong text-caption-strong text-on-surface">{doctor.title} · {doctor.experienceYears} years experience</p>
          <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
            {treats.map((area) => (
              <span
                key={area}
                className={
                  focus?.slug === area
                    ? 'px-2 py-0.5 rounded bg-[#FFF1F2] border border-[#F9C6C9] text-micro font-micro text-[#8E0E17]'
                    : 'px-2 py-0.5 rounded bg-surface-container-low border border-surface-variant text-micro font-micro text-on-surface-variant'
                }
              >
                {area.replace(/-/g, ' ')}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-3 pt-1 text-caption font-caption text-on-surface-variant">
            <span className="flex items-center gap-1 text-[#047857] font-caption-strong text-caption-strong">
              <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>thumb_up</span>
              {doctor.recommendPercent}%
            </span>
            <span>({doctor.reviewCount.toLocaleString('en-IN')} reviews)</span>
            {doctor.city && <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">location_on</span>{doctor.area}, {getCity(doctor.city)?.name ?? doctor.city}</span>}
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">translate</span>
              {doctor.languages.slice(0, 3).join(', ')}
            </span>
          </div>
        </div>

        <div className="w-full sm:w-44 flex flex-row sm:flex-col justify-between items-end sm:border-l border-surface-variant sm:pl-4 pt-3 sm:pt-0 border-t sm:border-t-0 gap-3">
          <div className="text-left sm:text-right">
            <span className="font-caption text-caption text-on-surface-variant block">Video consult</span>
            <div className="font-headline-h2 text-headline-h2 text-on-surface font-bold">{slot?.free ? 'Free' : rupees(slot?.fee ?? doctor.videoFee)}</div>
            {slot?.free && <div className="font-micro text-micro text-on-surface-variant line-through">{rupees(doctor.videoFee)}</div>}
          </div>
          <div className="w-full max-w-[200px] sm:max-w-none space-y-2">
            {slot && (
              <div className="bg-[#ECFDF5] border border-[#A7F3D0] rounded px-2 py-1 flex items-center justify-center gap-1 text-micro font-micro text-[#047857]">
                <span className="material-symbols-outlined text-[14px]">schedule</span>
                <span>{when === 'now' ? 'Starts' : 'Next'}: {slotLabel(slot.startsAt)}</span>
              </div>
            )}
            <Link
              href={instant ? joinHref : `/doctor/${doctor.slug}?mode=video`}
              className="w-full h-10 bg-primary-container hover:bg-[#8E0E17] text-white font-caption-strong text-caption-strong rounded-lg flex items-center justify-center gap-1.5 transition active:scale-95"
            >
              <span className="material-symbols-outlined text-[18px]">{instant ? 'videocam' : 'calendar_month'}</span>
              {when === 'now' ? 'Consult now' : when === 'free' ? 'Book free consult' : 'See video slots'}
            </Link>
            <Link href={`/doctor/${doctor.slug}`} className="w-full h-9 bg-surface-container-lowest hover:bg-surface-container-low border border-surface-variant text-on-surface font-caption-strong text-caption-strong rounded-lg flex items-center justify-center transition">
              View profile
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
