'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import RequireSignIn from '@/components/RequireSignIn';
import { DetailSkeleton } from '@/components/skeletons';
import { ApiError, api, errorMessage, rupees, type Order } from '@/lib/api';
import { LabMap, directionsUrl } from '@/components/labs/LabCard';
import { cancellable, orderSteps, statusLabel, statusTone } from '@/lib/orders';
import { getToken } from '@/lib/session';

export default function OrderTracking({ reference }: { reference: string }) {
  return (
    <>
      <Header />
      <main className="flex-1 w-full max-w-[760px] mx-auto px-margin sm:px-margin-desktop py-8 pb-24">
        <Link href="/orders" className="inline-flex items-center gap-1 font-caption-strong text-caption text-on-surface-variant hover:text-on-surface">
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>All orders
        </Link>
        <div className="mt-3">
          <RequireSignIn title="Sign in to track this order" icon="local_shipping">
            <Tracking reference={reference} />
          </RequireSignIn>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Tracking({ reference }: { reference: string }) {
  const justPlaced = useSearchParams().get('placed') === '1';
  const [order, setOrder] = useState<Order | null>(null);
  const [state, setState] = useState<'loading' | 'ready' | 'missing' | 'error'>('loading');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    const token = getToken();
    if (!token) return;
    try {
      const { order: o } = await api.order(reference, token);
      setOrder(o);
      setState('ready');
    } catch (e) {
      setState(e instanceof ApiError && e.status === 404 ? 'missing' : 'error');
    }
  }, [reference]);

  // Status advances on the server's clock, so poll while the order is in flight.
  useEffect(() => {
    void load();
    const id = setInterval(load, 30_000);
    return () => clearInterval(id);
  }, [load]);

  async function cancel() {
    const token = getToken();
    if (!token || !order) return;
    if (!window.confirm('Cancel this order? Any payment is refunded to the original method within 5–7 working days.')) return;
    setBusy(true);
    setError(null);
    try {
      const { order: o } = await api.cancelOrder(order.reference, token);
      setOrder(o);
    } catch (e) {
      setError(errorMessage(e));
    } finally {
      setBusy(false);
    }
  }

  if (state === 'loading') return <DetailSkeleton />;
  if (state === 'missing') return <p className="p-6 rounded-xl border border-[#E7E5E4] bg-white text-center font-body-default text-body-default">We couldn&apos;t find order {reference} on this account.</p>;
  if (state === 'error' || !order) return <p role="alert" className="p-4 rounded-xl bg-[#FFF1F2] border border-[#F9C6C9] text-[#8E0E17] font-caption text-caption">Couldn&apos;t load this order. <button type="button" onClick={load} className="underline">Try again</button></p>;

  const steps = orderSteps(order);
  const currentIndex = steps.findIndex((s) => s.status === order.status);
  const isLab = order.kind === 'lab';
  const isVisit = isLab && order.collectionMode === 'lab';
  const when = order.pickup ? `${new Date(order.pickup.date).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}, ${order.pickup.window}` : null;

  return (
    <div className="space-y-5">
      {justPlaced && order.status !== 'cancelled' && (
        <div className="p-4 rounded-2xl border border-[#A7F3D0] bg-[#ECFDF5] flex items-start gap-3">
          <span className="material-symbols-outlined text-[24px] text-[#047857]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
          <div>
            <p className="font-body-strong text-body-strong text-[#047857]">{isVisit ? 'Lab visit booked' : isLab ? 'Home collection booked' : 'Order placed'}</p>
            <p className="font-caption text-caption text-on-surface-variant">
              {isVisit
                ? `See you at ${order.lab?.name ?? 'the lab'} ${when ? `on ${when}` : 'at your chosen time'}. Show reference ${order.reference} at the counter.`
                : isLab
                  ? `A phlebotomist from ${order.lab?.name ?? 'our partner lab'} will arrive ${when ? `on ${when}` : 'at your chosen time'}.`
                  : 'A pharmacist is verifying your order. Updates will appear here.'}
            </p>
          </div>
        </div>
      )}

      <section className="rounded-2xl border border-surface-variant bg-surface-container-lowest p-5">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <h1 className="font-headline-h2 text-headline-h2 text-on-surface">{isLab ? 'Lab booking' : 'Medicine order'} {order.reference}</h1>
            <p className="font-caption text-caption text-on-surface-variant">Placed {new Date(order.createdAt).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit', hour12: true })}</p>
          </div>
          <span className={`px-2.5 py-1 rounded-full border text-caption-strong font-caption-strong ${statusTone(order.status)}`}>{statusLabel(order)}</span>
        </div>

        {order.status !== 'cancelled' && (
          <ol className="mt-5 space-y-0">
            {steps.map((step, i) => {
              const done = i <= currentIndex;
              return (
                <li key={step.status} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center ${done ? 'bg-primary-container text-white' : 'bg-surface-container text-outline'}`}>
                      <span className="material-symbols-outlined text-[18px]">{step.icon}</span>
                    </span>
                    {i < steps.length - 1 && <span className={`w-0.5 flex-1 min-h-6 ${i < currentIndex ? 'bg-primary-container' : 'bg-surface-variant'}`} />}
                  </div>
                  <div className="pb-5">
                    <p className={`font-body-strong text-body-strong ${done ? 'text-on-surface' : 'text-outline'}`}>{step.label}</p>
                    {i === currentIndex && !isLab && order.status !== 'delivered' && order.etaAt && (
                      <p className="font-caption text-caption text-on-surface-variant">Arriving by {new Date(order.etaAt).toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true })}</p>
                    )}
                    {step.status === 'report_ready' && order.status === 'report_ready' && (
                      <Link href="/records?kind=lab_report" className="font-caption-strong text-caption text-primary-container hover:underline">View reports in your health locker</Link>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        )}
      </section>

      <section className="rounded-2xl border border-surface-variant bg-surface-container-lowest p-5 space-y-3">
        <h2 className="font-headline-h3 text-headline-h3 text-on-surface">{isLab ? 'Tests' : 'Items'}</h2>
        <ul className="divide-y divide-surface-variant">
          {order.items.map((i) => (
            <li key={i.slug} className="flex justify-between gap-3 py-2 font-body-default text-body-default">
              <Link href={isLab ? `/lab-tests/${i.slug}` : `/medicines/${i.slug}`} className="text-on-surface hover:text-primary-container min-w-0 truncate">{!isLab && `${i.qty} × `}{i.name}</Link>
              <span className="shrink-0">{rupees(i.price * i.qty)}</span>
            </li>
          ))}
        </ul>
        <dl className="space-y-1.5 pt-2 border-t border-surface-variant font-body-default text-body-default">
          {order.discount > 0 && <div className="flex justify-between"><dt className="text-on-surface-variant">Discount</dt><dd className="text-[#047857]">− {rupees(order.discount)}</dd></div>}
          {!isLab && <div className="flex justify-between"><dt className="text-on-surface-variant">Delivery</dt><dd>{order.deliveryFee ? rupees(order.deliveryFee) : 'Free'}</dd></div>}
          <div className="flex justify-between font-body-strong text-body-strong"><dt>Total</dt><dd>{rupees(order.total)}</dd></div>
          <div className="flex justify-between font-caption text-caption text-on-surface-variant"><dt>Payment</dt><dd>{order.payment.method.toUpperCase()} · {order.payment.status === 'paid' ? 'Paid' : 'Pay on delivery'}</dd></div>
        </dl>
      </section>

      {isLab && order.lab && (
        <section className="rounded-2xl border border-surface-variant bg-surface-container-lowest p-5 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 className="font-headline-h3 text-headline-h3 text-on-surface">{isVisit ? 'Where to go' : 'Processing lab'}</h2>
              <p className="font-body-strong text-body-strong text-on-surface mt-1"><Link href={`/lab/${order.lab.slug}`} className="hover:text-primary-container">{order.lab.name}</Link></p>
              <p className="font-caption text-caption text-on-surface-variant">{order.lab.address}</p>
              {order.lab.pathologist && <p className="font-caption text-caption text-outline mt-0.5">Reports signed by {order.lab.pathologist}</p>}
            </div>
            <span className="material-symbols-outlined text-[28px] text-primary-container shrink-0">biotech</span>
          </div>
          {order.lab.lat && order.lab.lng ? <LabMap lat={order.lab.lat} lng={order.lab.lng} title={order.lab.name} className="h-44" /> : null}
          <div className="flex flex-wrap gap-2">
            <a href={directionsUrl(order.lab)} target="_blank" rel="noopener noreferrer" className="h-10 px-4 inline-flex items-center gap-1.5 rounded-lg border border-[#E7E5E4] bg-white text-on-surface font-caption-strong text-caption-strong hover:border-outline">
              <span className="material-symbols-outlined text-[18px]">directions</span>Directions
            </a>
            {order.lab.phone && (
              <a href={`tel:${order.lab.phone.replace(/\s/g, '')}`} className="h-10 px-4 inline-flex items-center gap-1.5 rounded-lg border border-[#E7E5E4] bg-white text-on-surface font-caption-strong text-caption-strong hover:border-outline">
                <span className="material-symbols-outlined text-[18px]">call</span>Call lab
              </a>
            )}
          </div>
        </section>
      )}

      <section className="rounded-2xl border border-surface-variant bg-surface-container-lowest p-5 space-y-2">
        <h2 className="font-headline-h3 text-headline-h3 text-on-surface">{isVisit ? 'Visit details' : isLab ? 'Collection address' : 'Delivery address'}</h2>
        {order.address && <p className="font-body-default text-body-default text-on-surface-variant">{[order.address.line1, order.address.line2, order.address.area, order.address.city].filter(Boolean).join(', ')} – {order.address.pincode}</p>}
        {isLab && order.patient && <p className="font-caption text-caption text-on-surface-variant">Patient: {order.patient.name}{order.patient.age ? `, ${order.patient.age}` : ''} · +91 {order.patient.phone}</p>}
        {isLab && order.pickup && <p className="font-caption text-caption text-on-surface-variant">{isVisit ? 'Arrive' : 'Collection'}: {new Date(order.pickup.date).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' })}, {order.pickup.window}</p>}
      </section>

      {error && <p role="alert" className="px-3 py-2 rounded-lg bg-[#FFF1F2] border border-[#F9C6C9] font-caption text-caption text-[#8E0E17]">{error}</p>}
      <div className="flex flex-wrap gap-3">
        {cancellable(order) && (
          <button type="button" onClick={cancel} disabled={busy} className="h-11 px-5 rounded-lg border border-[#E7E5E4] bg-white text-[#8E0E17] font-caption-strong text-caption-strong disabled:opacity-50">{busy ? 'Cancelling…' : 'Cancel order'}</button>
        )}
        <a href="tel:18002879963" className="h-11 px-5 inline-flex items-center gap-1.5 rounded-lg border border-[#E7E5E4] bg-white text-[#1C1917] font-caption-strong text-caption-strong">
          <span className="material-symbols-outlined text-[18px]">support_agent</span>Help with this order
        </a>
      </div>
    </div>
  );
}
