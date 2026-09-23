import { TRUST_BADGES } from '@/lib/home-content';

/** Trust & compliance row (spec section 11). */
export default function TrustStrip() {
  return (
    <section className="bg-surface-container-low border-y border-surface-variant">
      <div className="w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop py-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
        {TRUST_BADGES.map((badge) => (
          <span key={badge} className="inline-flex items-center gap-1.5 text-caption-strong font-caption-strong text-on-surface">
            <span className="material-symbols-outlined text-[18px] text-tertiary">verified_user</span>
            {badge}
          </span>
        ))}
      </div>
    </section>
  );
}
