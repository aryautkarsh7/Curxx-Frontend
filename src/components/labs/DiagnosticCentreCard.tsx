'use client';
import Link from 'next/link';
import ContactButtons from '@/components/profile/ContactButtons';
import type { Facility } from '@/lib/api';

const mapsUrl = (q: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

/**
 * A diagnostic centre from the Doctar directory: where it is, Call and Directions. No tests, prices or
 * booking: Curxx has no real data for those yet.
 */
export default function DiagnosticCentreCard({ centre }: { centre: Facility }) {
  return (
    <article className="bg-surface-container-lowest border border-[#E7E5E4] rounded-2xl p-5 hover:shadow-md transition duration-150">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <div className="min-w-0 space-y-1">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#FFF1F2] border border-[#F9C6C9] text-[#8E0E17] text-micro font-micro">
            <span className="material-symbols-outlined text-[13px]">biotech</span>
            {centre.category || 'Diagnostic Center'}
          </span>
          <h3 className="text-headline-h3 font-headline-h3 text-on-surface">
            <Link href={`/clinic/${centre.slug}`} className="hover:text-primary transition-colors">
              {centre.name}
            </Link>
          </h3>
          <p className="text-caption font-caption text-on-surface-variant flex items-start gap-1">
            <span className="material-symbols-outlined text-[16px] text-outline shrink-0">
              pin_drop
            </span>
            {centre.address || centre.area}
          </p>
          {centre.openHours && (
            <p className="text-micro font-micro text-on-surface-variant">
              {/^open\b/i.test(centre.openHours) ? centre.openHours : `Open ${centre.openHours}`}
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-[#E7E5E4]">
        <ContactButtons
          targetType="facility"
          slug={centre.slug}
          name={centre.name}
          phones={[centre.phone]}
          whatsapps={[centre.whatsapp]}
          size="sm"
        />
        <a
          href={mapsUrl(`${centre.name} ${centre.address}`)}
          target="_blank"
          rel="noopener noreferrer"
          className="h-9 px-3 rounded-lg border border-[#E7E5E4] text-caption-strong font-caption-strong text-on-surface hover:bg-[#FAFAF9] inline-flex items-center gap-1.5"
        >
          <span className="material-symbols-outlined text-[16px] text-outline">directions</span>
          Directions
        </a>
        <Link
          href={`/clinic/${centre.slug}`}
          className="h-9 px-3 rounded-lg text-caption-strong font-caption-strong text-primary-container hover:underline inline-flex items-center"
        >
          View centre
        </Link>
      </div>
    </article>
  );
}
