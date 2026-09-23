'use client';
import Link from 'next/link';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import QtyStepper from '@/components/pharmacy/QtyStepper';
import { rupees } from '@/lib/api';
import { DELIVERY_FEE, FREE_DELIVERY_OVER, removeFromCart, useCart } from '@/lib/cart';

export default function CartView() {
  const cart = useCart();
  const delivery = cart.total >= FREE_DELIVERY_OVER || cart.count === 0 ? 0 : DELIVERY_FEE;
  const toFree = FREE_DELIVERY_OVER - cart.total;

  return (
    <>
      <Header />
      <main className="flex-1 w-full max-w-[1000px] mx-auto px-margin sm:px-margin-desktop py-8 pb-40 lg:pb-12">
        <h1 className="font-headline-h1 text-headline-h1 text-on-surface">Your cart</h1>
        <p className="font-caption text-caption text-on-surface-variant mt-1">{cart.count} {cart.count === 1 ? 'item' : 'items'}</p>

        {cart.count === 0 ? (
          <div className="mt-6 p-8 rounded-2xl border border-surface-variant bg-surface-container-lowest text-center space-y-3">
            <span className="material-symbols-outlined text-[40px] text-outline">shopping_bag</span>
            <p className="font-body-strong text-body-strong text-on-surface">Your cart is empty</p>
            <p className="font-caption text-caption text-on-surface-variant">Add medicines from the store, or upload a prescription and a pharmacist will do it for you.</p>
            <div className="flex flex-wrap justify-center gap-3 pt-1">
              <Link href="/medicines" className="h-11 px-5 inline-flex items-center rounded-lg bg-primary-container hover:bg-[#8E0E17] text-white font-caption-strong text-caption-strong">Shop medicines</Link>
              <Link href="/medicines/upload" className="h-11 px-5 inline-flex items-center rounded-lg border border-surface-variant bg-white text-on-surface font-caption-strong text-caption-strong">Upload prescription</Link>
            </div>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <section className="lg:col-span-7 space-y-3">
              {cart.needsPrescription && (
                <div className="p-3.5 rounded-xl bg-[#FFF7ED] border border-[#FED7AA] flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[20px] text-[#B45309]">prescriptions</span>
                  <p className="font-caption text-caption text-[#7C2D12]">Some items need a valid prescription. You&apos;ll choose one from your health locker or upload it at checkout.</p>
                </div>
              )}
              <ul className="divide-y divide-surface-variant rounded-2xl border border-surface-variant bg-surface-container-lowest">
                {cart.items.map((item) => (
                  <li key={item.slug} className="flex gap-3 p-4">
                    <div className="flex-1 min-w-0">
                      <Link href={`/medicines/${item.slug}`} className="font-body-strong text-body-strong text-on-surface hover:text-primary-container">{item.name}</Link>
                      {item.subtitle && <p className="font-caption text-caption text-on-surface-variant truncate">{item.subtitle}</p>}
                      {item.rxRequired && <span className="inline-block mt-1 px-1.5 py-0.5 rounded bg-[#FFF7ED] border border-[#FED7AA] text-[#B45309] text-micro font-micro font-semibold">Rx</span>}
                      <div className="flex items-baseline gap-2 mt-1.5">
                        <span className="font-body-strong text-body-strong text-on-surface">{rupees(item.price * item.qty)}</span>
                        {item.mrp > item.price && <span className="font-micro text-micro text-outline line-through">{rupees(item.mrp * item.qty)}</span>}
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-between gap-2 shrink-0">
                      <QtyStepper slug={item.slug} />
                      <button type="button" onClick={() => removeFromCart(item.slug)} className="font-caption-strong text-caption text-outline hover:text-[#8E0E17]">Remove</button>
                    </div>
                  </li>
                ))}
              </ul>
              <Link href="/medicines" className="inline-flex items-center gap-1 font-caption-strong text-caption text-primary-container hover:underline">
                <span className="material-symbols-outlined text-[16px]">add</span>Add more items
              </Link>
            </section>

            <aside className="lg:col-span-5 lg:sticky lg:top-24 rounded-2xl border border-surface-variant bg-surface-container-lowest p-5 space-y-3">
              <h2 className="font-headline-h3 text-headline-h3 text-on-surface">Bill summary</h2>
              <dl className="space-y-2 font-body-default text-body-default">
                <div className="flex justify-between"><dt className="text-on-surface-variant">Item total (MRP)</dt><dd>{rupees(cart.total + cart.savings)}</dd></div>
                {cart.savings > 0 && <div className="flex justify-between"><dt className="text-on-surface-variant">Discount</dt><dd className="text-[#047857]">− {rupees(cart.savings)}</dd></div>}
                <div className="flex justify-between"><dt className="text-on-surface-variant">Delivery</dt><dd>{delivery === 0 ? <span className="text-[#047857]">Free</span> : rupees(delivery)}</dd></div>
                <div className="flex justify-between pt-2 border-t border-surface-variant font-body-strong text-body-strong"><dt>To pay</dt><dd>{rupees(cart.total + delivery)}</dd></div>
              </dl>
              {toFree > 0 && <p className="font-caption text-caption text-on-surface-variant">Add {rupees(toFree)} more for free delivery.</p>}
              <Link href="/checkout" className="hidden lg:flex w-full h-12 rounded-lg bg-primary-container hover:bg-[#8E0E17] text-white font-body-strong text-body-strong items-center justify-center gap-2">
                Proceed to checkout<span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
              <p className="font-micro text-micro text-outline text-center">Prices are confirmed by the pharmacy at checkout.</p>
            </aside>
          </div>
        )}
      </main>
      {cart.count > 0 && (
        <div className="lg:hidden fixed bottom-16 inset-x-0 z-40 bg-surface-container-lowest border-t border-surface-variant px-4 py-3 flex items-center justify-between gap-3 shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
          <div>
            <p className="font-headline-h3 text-headline-h3 text-on-surface">{rupees(cart.total + delivery)}</p>
            {cart.savings > 0 && <p className="font-micro text-micro text-[#047857]">You save {rupees(cart.savings)}</p>}
          </div>
          <Link href="/checkout" className="h-12 px-6 rounded-lg bg-primary-container text-white font-body-strong text-body-strong flex items-center gap-1.5">Checkout<span className="material-symbols-outlined text-[18px]">arrow_forward</span></Link>
        </div>
      )}
      <Footer />
    </>
  );
}
