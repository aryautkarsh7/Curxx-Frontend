'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import AddressBook from '@/components/AddressBook';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import PrescriptionUploader from '@/components/pharmacy/PrescriptionUploader';
import RequireSignIn from '@/components/RequireSignIn';
import { ApiError, api, errorMessage, rupees, type Address, type HealthRecord } from '@/lib/api';
import { DELIVERY_FEE, FREE_DELIVERY_OVER, clearCart, useCart } from '@/lib/cart';
import { getToken, useSession } from '@/lib/session';

const PAYMENT = [
  { id: 'upi', label: 'UPI', detail: 'GPay, PhonePe, Paytm, BHIM', icon: 'qr_code_2' },
  { id: 'card', label: 'Credit / debit card', detail: 'Visa, Mastercard, RuPay', icon: 'credit_card' },
  { id: 'cod', label: 'Cash on delivery', detail: 'Pay when your order arrives', icon: 'payments' },
] as const;

function Step({ n, title, done, children }: { n: number; title: string; done?: boolean; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-surface-variant bg-surface-container-lowest p-5 space-y-4">
      <h2 className="flex items-center gap-2.5 font-headline-h3 text-headline-h3 text-on-surface">
        <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${done ? 'bg-primary-container text-white' : 'ring-2 ring-primary-container text-primary-container'}`}>
          {done ? <span className="material-symbols-outlined text-[16px]">check</span> : n}
        </span>
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function Checkout() {
  const router = useRouter();
  const cart = useCart();
  const session = useSession();
  const [address, setAddress] = useState<Address | null>(null);
  const [prescriptions, setPrescriptions] = useState<HealthRecord[]>([]);
  const [prescriptionId, setPrescriptionId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [payment, setPayment] = useState<'upi' | 'card' | 'cod'>('upi');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [placed, setPlaced] = useState(false);

  const delivery = cart.total >= FREE_DELIVERY_OVER ? 0 : DELIVERY_FEE;

  // Prescriptions already in the locker, newest first.
  useEffect(() => {
    const token = getToken();
    if (!session.signedIn || !token || !cart.needsPrescription) return;
    api.records(token, { kind: 'prescription' }).then(({ records }) => {
      setPrescriptions(records);
      setPrescriptionId((current) => current ?? records[0]?.id ?? null);
    }).catch(() => {});
  }, [session.signedIn, cart.needsPrescription]);

  // An empty cart (e.g. after placing the order in another tab) has nothing to check out.
  useEffect(() => {
    if (cart.hydrated && !placed && cart.count === 0) router.replace('/cart');
  }, [cart.hydrated, cart.count, placed, router]);

  const ready = Boolean(address) && (!cart.needsPrescription || Boolean(prescriptionId));

  async function placeOrder() {
    const token = getToken();
    if (!token || !address || !ready) return;
    setBusy(true);
    setError(null);
    try {
      const { order } = await api.placeOrder({
        kind: 'pharmacy',
        items: cart.items.map((i) => ({ slug: i.slug, qty: i.qty })),
        address: { label: address.label, line1: address.line1, line2: address.line2 ?? '', area: address.area ?? '', city: address.city ?? 'Bengaluru', pincode: address.pincode, phone: address.phone },
        prescriptionId: cart.needsPrescription ? prescriptionId ?? undefined : undefined,
        paymentMethod: payment,
      }, token);
      setPlaced(true);
      clearCart();
      router.push(`/orders/${order.reference}?placed=1`);
    } catch (e) {
      setError(e instanceof ApiError && e.code === 'out_of_stock' ? `${e.message}. Remove it from your cart to continue.` : errorMessage(e));
      setBusy(false);
    }
  }

  return (
    <>
      <Header />
      <main className="flex-1 w-full max-w-[1000px] mx-auto px-margin sm:px-margin-desktop py-8 pb-40 lg:pb-12">
        <Link href="/cart" className="inline-flex items-center gap-1 font-caption-strong text-caption text-on-surface-variant hover:text-on-surface">
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>Back to cart
        </Link>
        <h1 className="font-headline-h1 text-headline-h1 text-on-surface mt-2">Checkout</h1>

        <div className="mt-6">
          <RequireSignIn title="Sign in to place your order" body="We’ll send order updates to your mobile number and keep the receipt in your account." icon="shopping_bag">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-7 space-y-4">
                <Step n={1} title="Delivery address" done={Boolean(address)}>
                  <AddressBook selectedId={address?.id ?? null} onSelect={setAddress} />
                </Step>

                {cart.needsPrescription && (
                  <Step n={2} title="Prescription" done={Boolean(prescriptionId)}>
                    <p className="font-caption text-caption text-on-surface-variant">
                      {cart.items.filter((i) => i.rxRequired).map((i) => i.name).join(', ')} {cart.items.filter((i) => i.rxRequired).length === 1 ? 'needs' : 'need'} a valid prescription.
                    </p>
                    {prescriptions.length > 0 && (
                      <ul className="space-y-2">
                        {prescriptions.slice(0, 5).map((p) => (
                          <li key={p.id}>
                            <label className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer ${prescriptionId === p.id ? 'border-2 border-primary-container bg-[#FFF1F2]' : 'border-[#E7E5E4] bg-white'}`}>
                              <input type="radio" name="rx" checked={prescriptionId === p.id} onChange={() => setPrescriptionId(p.id)} className="mt-1 w-[18px] h-[18px] text-[#C1121F]" />
                              <span className="min-w-0">
                                <span className="block font-body-strong text-body-strong text-on-surface">{p.title}</span>
                                <span className="block font-caption text-caption text-on-surface-variant">
                                  {[p.doctorName, new Date(p.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })].filter(Boolean).join(' · ')}
                                </span>
                              </span>
                            </label>
                          </li>
                        ))}
                      </ul>
                    )}
                    {uploading || prescriptions.length === 0 ? (
                      <PrescriptionUploader
                        cta="Upload & use this prescription"
                        onUploaded={(records) => {
                          setPrescriptions((prev) => [...records, ...prev]);
                          setPrescriptionId(records[0]!.id);
                          setUploading(false);
                        }}
                      />
                    ) : (
                      <button type="button" onClick={() => setUploading(true)} className="font-caption-strong text-caption text-primary-container hover:underline">+ Upload a new prescription</button>
                    )}
                  </Step>
                )}

                <Step n={cart.needsPrescription ? 3 : 2} title="Payment" done>
                  <div className="space-y-2">
                    {PAYMENT.map((p) => (
                      <label key={p.id} className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer ${payment === p.id ? 'border-2 border-primary-container bg-[#FFF1F2]' : 'border-[#E7E5E4] bg-white'}`}>
                        <input type="radio" name="payment" checked={payment === p.id} onChange={() => setPayment(p.id)} className="w-[18px] h-[18px] text-[#C1121F]" />
                        <span className="w-9 h-9 rounded-lg bg-[#FAFAF9] border border-[#E7E5E4] flex items-center justify-center text-[#78716C]"><span className="material-symbols-outlined text-[20px]">{p.icon}</span></span>
                        <span className="min-w-0">
                          <span className="block font-body-strong text-body-strong text-on-surface">{p.label}</span>
                          <span className="block font-caption text-caption text-on-surface-variant">{p.detail}</span>
                        </span>
                      </label>
                    ))}
                  </div>
                  <p className="font-micro text-micro text-outline">Prototype checkout: no card or UPI details are collected and no money moves. The order is created immediately.</p>
                </Step>
              </div>

              <aside className="lg:col-span-5 lg:sticky lg:top-24 rounded-2xl border border-surface-variant bg-surface-container-lowest p-5 space-y-3">
                <h2 className="font-headline-h3 text-headline-h3 text-on-surface">Order summary</h2>
                <ul className="space-y-1.5 max-h-56 overflow-y-auto">
                  {cart.items.map((i) => (
                    <li key={i.slug} className="flex justify-between gap-3 font-caption text-caption">
                      <span className="text-on-surface-variant truncate">{i.qty} × {i.name}</span>
                      <span className="text-on-surface shrink-0">{rupees(i.qty * i.price)}</span>
                    </li>
                  ))}
                </ul>
                <dl className="space-y-2 pt-2 border-t border-surface-variant font-body-default text-body-default">
                  {cart.savings > 0 && <div className="flex justify-between"><dt className="text-on-surface-variant">You save</dt><dd className="text-[#047857]">{rupees(cart.savings)}</dd></div>}
                  <div className="flex justify-between"><dt className="text-on-surface-variant">Delivery</dt><dd>{delivery === 0 ? <span className="text-[#047857]">Free</span> : rupees(delivery)}</dd></div>
                  <div className="flex justify-between font-body-strong text-body-strong"><dt>Total</dt><dd>{rupees(cart.total + delivery)}</dd></div>
                </dl>
                {error && <p role="alert" className="px-3 py-2 rounded-lg bg-[#FFF1F2] border border-[#F9C6C9] font-caption text-caption text-[#8E0E17]">{error}</p>}
                <button type="button" onClick={placeOrder} disabled={!ready || busy || !session.signedIn} className="hidden lg:flex w-full h-12 rounded-lg bg-primary-container hover:bg-[#8E0E17] disabled:bg-[#A8A29E] text-white font-body-strong text-body-strong items-center justify-center gap-2">
                  {busy ? 'Placing order…' : `Place order · ${rupees(cart.total + delivery)}`}
                </button>
                {!ready && session.signedIn && <p className="font-caption text-caption text-on-surface-variant text-center">{!address ? 'Add a delivery address to continue.' : 'Choose or upload a prescription to continue.'}</p>}
              </aside>
            </div>
          </RequireSignIn>
        </div>
      </main>
      {session.signedIn && cart.count > 0 && (
        <div className="lg:hidden fixed bottom-16 inset-x-0 z-40 bg-surface-container-lowest border-t border-surface-variant px-4 py-3 flex items-center justify-between gap-3 shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
          <p className="font-headline-h3 text-headline-h3 text-on-surface">{rupees(cart.total + delivery)}</p>
          <button type="button" onClick={placeOrder} disabled={!ready || busy} className="h-12 px-6 rounded-lg bg-primary-container disabled:bg-[#A8A29E] text-white font-body-strong text-body-strong">{busy ? 'Placing…' : 'Place order'}</button>
        </div>
      )}
      <Footer />
    </>
  );
}
