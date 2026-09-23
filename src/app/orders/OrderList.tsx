'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import RequireSignIn from '@/components/RequireSignIn';
import { TableSkeleton } from '@/components/skeletons';
import { api, errorMessage, rupees, type Order } from '@/lib/api';
import { labPlace } from '@/components/labs/LabCard';
import { statusLabel, statusTone } from '@/lib/orders';
import { getToken, useSession } from '@/lib/session';

export default function OrderList() {
  return (
    <RequireSignIn title="Sign in to see your orders" icon="receipt_long">
      <Orders />
    </RequireSignIn>
  );
}

function Orders() {
  const session = useSession();
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [kind, setKind] = useState<'all' | 'pharmacy' | 'lab'>('all');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = getToken();
    if (!token) return;
    api.orders(token).then((r) => setOrders(r.orders)).catch((e) => setError(errorMessage(e)));
  }, [session.signedIn]);

  if (error) return <p role="alert" className="p-4 rounded-xl bg-[#FFF1F2] border border-[#F9C6C9] text-[#8E0E17] font-caption text-caption">{error}</p>;
  if (!orders) return <TableSkeleton rows={3} />;

  const shown = orders.filter((o) => kind === 'all' || o.kind === kind);
  return (
    <div className="space-y-4">
      <div className="flex gap-2" role="tablist">
        {(['all', 'pharmacy', 'lab'] as const).map((k) => (
          <button key={k} type="button" role="tab" aria-selected={kind === k} onClick={() => setKind(k)} className={kind === k ? 'h-9 px-4 rounded-full bg-[#FFF1F2] border border-primary-container text-primary-container font-caption-strong text-caption' : 'h-9 px-4 rounded-full border border-[#E7E5E4] bg-white text-[#1C1917] font-caption text-caption'}>
            {k === 'all' ? 'All' : k === 'pharmacy' ? 'Medicines' : 'Lab tests'}
          </button>
        ))}
      </div>
      {shown.length === 0 ? (
        <div className="p-6 rounded-xl border border-[#E7E5E4] bg-white text-center space-y-3">
          <span className="material-symbols-outlined text-[32px] text-[#78716C]">receipt_long</span>
          <p className="font-body-default text-body-default text-on-surface-variant">No orders yet.</p>
          <div className="flex justify-center gap-3">
            <Link href="/medicines" className="h-10 px-4 inline-flex items-center rounded-lg bg-primary-container text-white font-caption-strong text-caption-strong">Shop medicines</Link>
            <Link href="/lab-tests" className="h-10 px-4 inline-flex items-center rounded-lg border border-[#E7E5E4] text-[#1C1917] font-caption-strong text-caption-strong">Book a lab test</Link>
          </div>
        </div>
      ) : (
        <ul className="space-y-3">
          {shown.map((o) => (
            <li key={o.id}>
              <Link href={`/orders/${o.reference}`} className="block p-4 rounded-xl border border-[#E7E5E4] bg-white hover:border-[#A8A29E] transition">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <span className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px] text-[#78716C]">{o.kind === 'pharmacy' ? 'medication' : 'science'}</span>
                      <span className="font-body-strong text-body-strong text-[#1C1917]">{o.kind === 'pharmacy' ? 'Medicine order' : 'Lab booking'} · {o.reference}</span>
                    </span>
                    <p className="font-caption text-caption text-[#78716C] mt-1 truncate">{o.items.map((i) => (o.kind === 'pharmacy' ? `${i.qty}× ${i.name}` : i.name)).join(', ')}</p>
                    {o.kind === 'lab' && o.lab && (
                      <p className="font-caption text-caption text-[#78716C] truncate">{o.collectionMode === 'lab' ? 'Visit' : 'Processed at'} {labPlace(o.lab)}</p>
                    )}
                    <p className="font-caption text-caption text-[#78716C]">{new Date(o.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} · {rupees(o.total)}</p>
                  </div>
                  <span className={`shrink-0 px-2 py-0.5 rounded-full border text-micro font-micro ${statusTone(o.status)}`}>{statusLabel(o)}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
