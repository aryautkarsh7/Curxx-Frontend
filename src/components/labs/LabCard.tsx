import Link from 'next/link';
import type { LabSummary } from '@/lib/api';

export const directionsUrl = (lab: { name: string; address: string }) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${lab.name}, ${lab.address}`)}`;

/** "Name, Area" unless the name already says where it is. */
export const labPlace = (lab: { name: string; area: string }) => (lab.name.includes(lab.area) ? lab.name : `${lab.name}, ${lab.area}`);

export const labTypeLabel = (lab: Pick<LabSummary, 'type' | 'homeCollection'>) =>
  lab.type === 'reference' ? 'Reference lab' : lab.homeCollection ? 'Diagnostic centre' : 'Walk-in collection point';

const labIcon = (lab: Pick<LabSummary, 'type' | 'homeCollection'>) => (lab.type === 'reference' ? 'biotech' : lab.homeCollection ? 'science' : 'vaccines');

export function AccreditationBadges({ items, size = 'sm' }: { items: string[]; size?: 'sm' | 'md' }) {
  return (
    <span className="inline-flex flex-wrap gap-1">
      {items.map((a) => (
        <span key={a} className={`inline-flex items-center gap-0.5 rounded border font-micro ${size === 'md' ? 'px-2 py-1 text-caption' : 'px-1.5 py-0.5 text-micro'} ${a === 'CAP' ? 'bg-[#EFF6FF] border-[#BFDBFE] text-[#1D4ED8]' : 'bg-[#ECFDF5] border-[#A7F3D0] text-[#047857]'}`}>
          <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
          {a}
        </span>
      ))}
    </span>
  );
}

/** OpenStreetMap embed centred on the lab, with a pin. No API key needed. */
export function LabMap({ lat, lng, title, className = 'h-56' }: { lat: number; lng: number; title: string; className?: string }) {
  const d = 0.008;
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - d * 1.6},${lat - d},${lng + d * 1.6},${lat + d}&layer=mapnik&marker=${lat},${lng}`;
  return <iframe title={`Map showing ${title}`} src={src} loading="lazy" className={`w-full border-0 rounded-xl bg-surface-container ${className}`} referrerPolicy="no-referrer" />;
}

/** Listing card for the labs directory. */
export default function LabCard({ lab, testName }: { lab: LabSummary; testName?: string }) {
  return (
    <article className="bg-surface-container-lowest border border-[#E7E5E4] rounded-2xl p-5 hover:shadow-md transition duration-150">
      <div className="flex flex-col md:flex-row gap-5">
        <Link href={`/lab/${lab.slug}`} className="w-full md:w-36 md:h-36 shrink-0 rounded-xl bg-[#FAFAF9] border border-[#E7E5E4] flex md:flex-col items-center justify-center gap-2 md:gap-1 py-2.5 md:py-0 text-primary-container">
          <span className="material-symbols-outlined text-[28px] md:text-[40px]">{labIcon(lab)}</span>
          <span className="font-headline-h3 text-headline-h3 text-on-surface">{lab.distanceKm} km</span>
          <span className="font-micro text-micro text-outline">from you</span>
        </Link>
        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-headline-h2 font-headline-h2 text-on-surface"><Link href={`/lab/${lab.slug}`} className="hover:text-primary transition-colors">{lab.name}</Link></h2>
                  <AccreditationBadges items={lab.accreditations} />
                </div>
                <p className="text-caption-strong font-caption-strong text-outline mt-0.5">{labTypeLabel(lab)} · {lab.area} ({lab.distanceKm} km)</p>
              </div>
              <div className="flex items-center gap-1 text-caption-strong font-caption-strong text-on-surface shrink-0">
                <span className="material-symbols-outlined text-amber-500 text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span>{lab.rating}</span>
                <span className="text-outline font-caption">({lab.reviewCount.toLocaleString('en-IN')} reviews)</span>
              </div>
            </div>
            <p className="text-caption font-caption text-on-surface-variant flex items-start gap-1 mt-2">
              <span className="material-symbols-outlined text-[16px] text-outline shrink-0">pin_drop</span>{lab.address}
            </p>
            <div className="flex flex-wrap items-center gap-2 mt-3">
              <span className="inline-flex items-center gap-1 bg-[#FAFAF9] border border-[#E7E5E4] text-on-surface font-caption-strong text-micro px-2 py-1 rounded-md">
                <span className="material-symbols-outlined text-[14px] text-outline">schedule</span>{lab.openHours}
              </span>
              {lab.homeCollection ? (
                <span className={`inline-flex items-center gap-1 text-micro font-micro px-2 py-1 rounded-md border ${lab.canCollect ? 'bg-[#ECFDF5] border-[#A7F3D0] text-[#047857]' : 'bg-[#FAFAF9] border-[#E7E5E4] text-outline'}`}>
                  <span className="material-symbols-outlined text-[14px]">home_health</span>
                  {lab.canCollect ? 'Home collection at your address' : `Home collection within ${lab.collectionRadiusKm} km`}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 bg-[#FFFBEB] border border-[#FDE68A] text-[#B45309] text-micro font-micro px-2 py-1 rounded-md">
                  <span className="material-symbols-outlined text-[14px]">directions_walk</span>Walk-in only
                </span>
              )}
              <span className="inline-flex items-center gap-1 bg-[#FAFAF9] border border-[#E7E5E4] text-outline text-micro font-micro px-2 py-1 rounded-md">
                <span className="material-symbols-outlined text-[14px]">description</span>Reports in {lab.reportTat}
              </span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4 pt-4 border-t border-[#E7E5E4]">
            <p className="text-caption font-caption text-on-surface-variant">
              {testName ? (
                <><span className="text-caption-strong font-caption-strong text-[#047857]">Runs {testName}</span> · {lab.testCount} tests on Curxx</>
              ) : (
                <><span className="text-caption-strong font-caption-strong text-primary">{lab.testCount} tests</span> bookable · {lab.tagline}</>
              )}
            </p>
            <div className="flex items-center gap-2 shrink-0">
              <a href={directionsUrl(lab)} target="_blank" rel="noopener noreferrer" className="px-3.5 py-2 border border-[#E7E5E4] rounded-lg text-caption-strong font-caption-strong text-on-surface hover:bg-[#FAFAF9] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-outline">directions</span>Directions
              </a>
              <Link href={`/lab/${lab.slug}`} className="px-4 py-2 bg-primary-container text-white rounded-lg text-caption-strong font-caption-strong hover:bg-primary shadow-xs">
                View lab
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

/** Compact card for the homepage and "nearby labs" strips. */
export function LabMiniCard({ lab }: { lab: LabSummary }) {
  return (
    <div className="p-5 rounded-xl border border-surface-variant bg-surface-container-lowest hover:border-outline transition flex flex-col justify-between gap-4">
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <span className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary-container">
            <span className="material-symbols-outlined text-[22px]">{labIcon(lab)}</span>
          </span>
          <AccreditationBadges items={lab.accreditations.slice(0, 2)} />
        </div>
        <div>
          <h3 className="text-headline-h3 font-headline-h3 text-on-surface leading-tight">
            <Link className="hover:text-primary-container transition-colors" href={`/lab/${lab.slug}`}>{lab.name}</Link>
          </h3>
          <p className="text-caption font-caption text-on-surface-variant mt-1">{labTypeLabel(lab)}</p>
        </div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-micro font-micro text-on-surface-variant">
          <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">location_on</span>{lab.area} · {lab.distanceKm} km</span>
          <span className="flex items-center gap-1 text-tertiary"><span className="material-symbols-outlined text-[14px]">star</span>{lab.rating}</span>
        </div>
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-micro font-micro border ${lab.homeCollection ? 'bg-[#ECFDF5] border-[#A7F3D0] text-[#047857]' : 'bg-[#FFFBEB] border-[#FDE68A] text-[#B45309]'}`}>
          <span className="material-symbols-outlined text-[12px]">{lab.homeCollection ? 'home_health' : 'directions_walk'}</span>
          {lab.homeCollection ? 'Home collection' : 'Walk-in only'}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Link href={`/lab/${lab.slug}`} className="flex-1 text-center px-3 py-2 rounded-lg bg-surface-container-low border border-surface-variant text-caption-strong font-caption-strong text-on-surface hover:border-outline transition">View lab</Link>
        <a href={directionsUrl(lab)} target="_blank" rel="noopener noreferrer" aria-label={`Directions to ${lab.name}`} className="px-3 py-2 rounded-lg border border-surface-variant text-on-surface-variant hover:text-primary-container hover:border-outline transition">
          <span className="material-symbols-outlined text-[18px]">directions</span>
        </a>
      </div>
    </div>
  );
}
