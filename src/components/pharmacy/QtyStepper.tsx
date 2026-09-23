'use client';
import { setQty, useCart, type CartKind } from '@/lib/cart';

/** −/+ control bound to the cart; removing the last unit removes the line. */
export default function QtyStepper({ slug, kind = 'pharmacy', compact = false }: { slug: string; kind?: CartKind; compact?: boolean }) {
  const cart = useCart(kind);
  const qty = cart.qtyOf(slug);
  const size = compact ? 'px-2 py-0.5' : 'px-2.5 py-1';
  return (
    <div className="flex items-center border border-primary-container rounded-lg bg-surface-container-lowest text-primary-container font-body-strong text-caption overflow-hidden">
      <button type="button" aria-label="Decrease quantity" onClick={() => setQty(slug, qty - 1, kind)} className={`${size} hover:bg-surface-container transition-colors`}>
        −
      </button>
      <span className="px-2 font-bold tabular-nums" aria-live="polite">{qty}</span>
      <button type="button" aria-label="Increase quantity" disabled={qty >= 10} onClick={() => setQty(slug, qty + 1, kind)} className={`${size} hover:bg-surface-container transition-colors disabled:opacity-40`}>
        +
      </button>
    </div>
  );
}
