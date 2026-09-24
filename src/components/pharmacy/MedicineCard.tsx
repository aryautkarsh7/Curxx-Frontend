'use client';
import Link from 'next/link';
import { discountPct, rupees, type Medicine, photo } from '@/lib/api';
import { addToCart, useCart } from '@/lib/cart';
import QtyStepper from './QtyStepper';

type Props = {
  medicine: Pick<Medicine, 'slug' | 'name' | 'subtitle' | 'price' | 'mrp' | 'icon' | 'imageUrl' | 'rxRequired'> & { stock?: number };
  variant?: 'grid' | 'deal';
  onAdded?: (name: string) => void;
};

export default function MedicineCard({ medicine: m, variant = 'grid', onAdded }: Props) {
  const cart = useCart();
  const off = discountPct(m.price, m.mrp);
  const outOfStock = m.stock !== undefined && m.stock <= 0;

  function add() {
    addToCart({ slug: m.slug, name: m.name, price: m.price, mrp: m.mrp, rxRequired: m.rxRequired, subtitle: m.subtitle });
    onAdded?.(m.name);
  }

  return (
    <div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-space-base flex flex-col justify-between shadow-sm relative overflow-hidden hover:border-outline-variant transition-colors">
      {variant === 'deal' && (
        <div className="absolute top-0 left-0 bg-primary-container text-on-primary text-micro font-micro font-bold px-2.5 py-0.5 rounded-br-lg">Deal of the Day</div>
      )}
      {off > 0 && (
        <span className={`absolute ${variant === 'deal' ? 'top-2' : 'top-3'} right-3 text-micro font-micro text-tertiary-container font-bold bg-tertiary-container/10 px-2 py-0.5 rounded`}>{off}% OFF</span>
      )}
      <Link href={`/medicines/${m.slug}`} className={`space-y-3 ${variant === 'deal' ? 'pt-4' : ''}`}>
        <div className={`${variant === 'deal' ? 'w-full h-32' : 'w-full h-24'} rounded-lg bg-surface-container-low flex items-center justify-center text-outline overflow-hidden`}>
          {m.imageUrl ? (
            <img src={photo(m.imageUrl, 320)} alt={m.name} loading="lazy" decoding="async" className="w-full h-full object-cover" />
          ) : (
            <span className="material-symbols-outlined text-4xl text-primary-container">{m.icon}</span>
          )}
        </div>
        <div>
          <h3 className="text-body-strong font-body-strong text-on-surface leading-tight hover:text-primary-container transition-colors">{m.name}</h3>
          <p className="text-caption font-caption text-on-surface-variant mt-1 line-clamp-2">{m.subtitle}</p>
          {m.rxRequired && (
            <span className="inline-flex items-center gap-1 mt-1.5 px-1.5 py-0.5 rounded bg-[#FFF7ED] border border-[#FED7AA] text-[#B45309] text-micro font-micro font-semibold">
              <span className="material-symbols-outlined text-[12px]">prescriptions</span>Rx required
            </span>
          )}
        </div>
      </Link>
      <div className="pt-4 mt-3 border-t border-surface-variant flex items-center justify-between gap-2">
        <div>
          {m.mrp > m.price && <span className="text-micro font-micro text-outline line-through">MRP {rupees(m.mrp)}</span>}
          <p className="text-headline-h3 font-headline-h3 text-on-surface font-bold">{rupees(m.price)}</p>
        </div>
        {outOfStock ? (
          <span className="text-caption-strong font-caption-strong text-outline">Out of stock</span>
        ) : cart.has(m.slug) ? (
          <QtyStepper slug={m.slug} />
        ) : (
          <button
            type="button"
            onClick={add}
            className={variant === 'deal'
              ? 'h-9 px-3.5 bg-primary-container hover:bg-primary text-on-primary font-caption-strong text-caption rounded-lg transition duration-150 active:scale-95'
              : 'px-4 py-1.5 border border-surface-variant rounded-lg text-caption-strong font-caption-strong text-primary-container hover:bg-surface-container-low transition-colors'}
          >
            {variant === 'deal' ? 'Add to Cart' : '+ Add'}
          </button>
        )}
      </div>
    </div>
  );
}
