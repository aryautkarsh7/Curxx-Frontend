import Link from 'next/link';
import { rupees, type Medicine, photo } from '@/lib/api';

type Props = {
  medicine: Pick<
    Medicine,
    'slug' | 'name' | 'subtitle' | 'price' | 'mrp' | 'icon' | 'imageUrl' | 'rxRequired'
  >;
};

/** A medicine to read about: name, short description, MRP, and a link to its page. No buying. */
export default function MedicineCard({ medicine: m }: Props) {
  return (
    <div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-space-base flex flex-col justify-between shadow-sm relative overflow-hidden hover:border-outline-variant transition-colors">
      <Link href={`/medicines/${m.slug}`} className="space-y-3">
        <div className="w-full h-24 rounded-lg bg-surface-container-low flex items-center justify-center text-outline overflow-hidden">
          {m.imageUrl ? (
            <img
              src={photo(m.imageUrl, 320)}
              alt={m.name}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="material-symbols-outlined text-4xl text-primary-container">
              {m.icon}
            </span>
          )}
        </div>
        <div>
          <h3 className="text-body-strong font-body-strong text-on-surface leading-tight hover:text-primary-container transition-colors">
            {m.name}
          </h3>
          <p className="text-caption font-caption text-on-surface-variant mt-1 line-clamp-2">
            {m.subtitle}
          </p>
          {m.rxRequired && (
            <span className="inline-flex items-center gap-1 mt-1.5 px-1.5 py-0.5 rounded bg-[#FFF7ED] border border-[#FED7AA] text-[#B45309] text-micro font-micro font-semibold">
              <span className="material-symbols-outlined text-[12px]">prescriptions</span>Rx
              required
            </span>
          )}
        </div>
      </Link>
      <div className="pt-4 mt-3 border-t border-surface-variant flex items-center justify-between gap-2">
        <div>
          {m.mrp > m.price && (
            <span className="text-micro font-micro text-outline line-through">
              MRP {rupees(m.mrp)}
            </span>
          )}
          <p className="text-headline-h3 font-headline-h3 text-on-surface font-bold">
            {rupees(m.price)}
          </p>
        </div>
        <Link
          href={`/medicines/${m.slug}`}
          className="px-4 py-1.5 border border-surface-variant rounded-lg text-caption-strong font-caption-strong text-primary-container hover:bg-surface-container-low transition-colors"
        >
          View details
        </Link>
      </div>
    </div>
  );
}
