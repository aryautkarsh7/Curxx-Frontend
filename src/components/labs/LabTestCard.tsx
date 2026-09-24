'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { rupees, type LabTest } from '@/lib/api';
import { addToCart, removeFromCart, useCart } from '@/lib/cart';
import { saveLabChoice, type LabChoice } from '@/lib/lab-booking';

export const labCartItem = (t: Pick<LabTest, 'slug' | 'name' | 'price' | 'mrp' | 'testsIncluded' | 'kind'>) => ({
  slug: t.slug,
  name: t.name,
  price: t.price,
  mrp: t.mrp,
  subtitle: t.kind === 'package' ? `Package · ${t.testsIncluded} tests` : `${t.testsIncluded} ${t.testsIncluded === 1 ? 'parameter' : 'parameters'}`,
});

/** `atLab` (on a lab's profile) carries that lab into the booking. */
export default function LabTestCard({ test, atLab }: { test: LabTest; atLab?: LabChoice }) {
  const router = useRouter();
  const cart = useCart('lab');
  const inCart = cart.has(test.slug);

  function book() {
    if (!inCart) addToCart(labCartItem(test), 1, 'lab');
    if (atLab) saveLabChoice(atLab);
    router.push('/lab-tests/book');
  }

  return (
    <div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-5 flex flex-col justify-between hover:border-outline-variant transition-colors shadow-sm">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
          <span className="text-micro font-micro bg-surface-container px-2 py-0.5 rounded text-on-surface-variant border border-surface-variant">
            {test.kind === 'package' ? `${test.testsIncluded} tests included` : test.homeCollection === false ? `${test.sampleType} · visit the centre` : `${test.testsIncluded} ${test.testsIncluded === 1 ? 'parameter' : 'parameters'} · ${test.sampleType}`}
          </span>
          <span className={`text-micro font-micro px-2 py-0.5 rounded-full flex items-center gap-1 border ${test.fastingHours ? 'bg-[#FFF1F2] text-[#C1121F] border-[#F9C6C9]' : 'bg-surface-container text-on-surface-variant border-surface-variant'}`}>
            <span className="material-symbols-outlined text-[12px]">{test.fastingHours ? 'schedule' : 'check_circle'}</span>
            <span>{test.fastingLabel}</span>
          </span>
        </div>
        <h3 className="text-headline-h3 font-headline-h3 text-on-surface">
          <Link className="hover:text-primary transition-colors" href={`/lab-tests/${test.slug}`}>{test.name}</Link>
        </h3>
        <p className="text-caption font-caption text-on-surface-variant mt-2 line-clamp-2">
          <span className="font-caption-strong text-on-surface">Covers:</span> {test.covers}
        </p>
        {test.highlights.length > 0 && (
          <div className="mt-4 pt-4 border-t border-surface-variant grid grid-cols-2 gap-2 text-micro font-micro text-on-surface-variant">
            {test.highlights.slice(0, 4).map((h) => (
              <div key={h} className="flex items-center gap-1 min-w-0">
                <span className="material-symbols-outlined text-[14px] text-[#047857] shrink-0">check</span>
                <span className="truncate">{h}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="mt-6 pt-4 border-t border-surface-variant flex items-end justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-headline-h2 font-headline-h2 text-on-surface">{rupees(test.price)}</span>
            <span className="text-caption font-caption text-on-surface-variant line-through">{rupees(test.mrp)}</span>
            {test.discount > 0 && <span className="text-micro font-micro text-[#047857] bg-[#ECFDF5] border border-[#A7F3D0] px-1.5 rounded font-semibold">{test.discount}% OFF</span>}
          </div>
          <span className="text-micro font-micro text-on-surface-variant">{test.turnaround}</span>
        </div>
        <div className="flex flex-col items-end gap-1.5 shrink-0">
          <button type="button" onClick={book} className="bg-[#C1121F] hover:bg-[#8E0E17] text-white px-4 py-2 rounded-lg text-body-strong font-body-strong transition-colors duration-150">Book Now</button>
          <button type="button" onClick={() => (inCart ? removeFromCart(test.slug, 'lab') : addToCart(labCartItem(test), 1, 'lab'))} className="text-caption-strong font-caption-strong text-primary-container hover:underline">
            {inCart ? '✓ Added · Remove' : '+ Add to booking'}
          </button>
        </div>
      </div>
    </div>
  );
}
