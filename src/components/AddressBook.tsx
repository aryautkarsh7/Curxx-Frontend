'use client';
import { useEffect, useState } from 'react';
import { ApiError, api, errorMessage, type Address } from '@/lib/api';
import { getToken, getUser } from '@/lib/session';

const FIELD = 'w-full h-11 px-3 bg-white border border-[#E7E5E4] rounded-lg font-body-default text-body-default text-[#1C1917] placeholder-[#A8A29E] outline-none focus:border-primary-container focus:ring-2 focus:ring-[rgba(193,18,31,0.15)]';
const LABEL = 'font-caption-strong text-caption-strong text-[#1C1917]';

type Props = {
  /** When set, addresses are selectable (checkout); otherwise the list is for managing (account). */
  selectedId?: string | null;
  onSelect?: (address: Address) => void;
};

/** Saved addresses with add / make-default / delete, shared by checkout, lab booking and account. */
export default function AddressBook({ selectedId, onSelect }: Props) {
  const [addresses, setAddresses] = useState<Address[] | null>(null);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = getToken();
    if (!token) return;
    api.addresses(token).then(({ addresses: list }) => {
      setAddresses(list);
      setAdding(list.length === 0);
      const preferred = list.find((a) => a.isDefault) ?? list[0];
      if (onSelect && preferred && !selectedId) onSelect(preferred);
    }).catch((e) => setError(errorMessage(e)));
    // Load once; selection is controlled by the parent.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function run(action: (token: string) => Promise<{ addresses: Address[] }>, pick?: (list: Address[]) => Address | undefined) {
    const token = getToken();
    if (!token) return;
    setError(null);
    try {
      const { addresses: list } = await action(token);
      setAddresses(list);
      const chosen = pick?.(list);
      if (chosen && onSelect) onSelect(chosen);
    } catch (e) {
      setError(errorMessage(e));
    }
  }

  if (addresses === null && !error) return <div className="h-24 rounded-xl bg-surface-container-low animate-pulse" aria-busy="true" />;

  return (
    <div className="space-y-3">
      {error && <p role="alert" className="px-3 py-2 rounded-lg bg-[#FFF1F2] border border-[#F9C6C9] font-caption text-caption text-[#8E0E17]">{error}</p>}
      {(addresses ?? []).length > 0 && (
        <ul className="space-y-2">
          {addresses!.map((a) => {
            const selected = onSelect && selectedId === a.id;
            return (
              <li key={a.id}>
                <div className={`flex items-start gap-3 p-3.5 rounded-xl border bg-white transition ${selected ? 'border-2 border-primary-container bg-[#FFF1F2]' : 'border-[#E7E5E4]'}`}>
                  {onSelect && (
                    <input type="radio" name="address" checked={Boolean(selected)} onChange={() => onSelect(a)} aria-label={`Use ${a.label} address, ${a.pincode}`} className="mt-1 w-[18px] h-[18px] text-[#C1121F] focus:ring-[#C1121F]" />
                  )}
                  <button type="button" onClick={() => onSelect?.(a)} className="flex-1 min-w-0 text-left" disabled={!onSelect}>
                    <span className="flex items-center gap-2 flex-wrap">
                      <span className="font-body-strong text-body-strong text-[#1C1917]">{a.label}</span>
                      {a.isDefault && <span className="px-1.5 py-0.5 rounded bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857] text-micro font-micro">Default</span>}
                    </span>
                    <span className="block font-caption text-caption text-[#78716C] mt-0.5">
                      {[a.line1, a.line2, a.area, a.city].filter(Boolean).join(', ')} – {a.pincode}
                    </span>
                    <span className="block font-caption text-caption text-[#78716C]">+91 {a.phone}</span>
                  </button>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    {!a.isDefault && (
                      <button type="button" onClick={() => run((t) => api.setDefaultAddress(a.id!, t))} className="font-caption-strong text-caption text-[#1C1917] hover:underline">Make default</button>
                    )}
                    <button type="button" onClick={() => run((t) => api.deleteAddress(a.id!, t), (list) => (selectedId === a.id ? list[0] : undefined))} className="font-caption-strong text-caption text-[#8E0E17] hover:underline">Delete</button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {adding ? (
        <AddressForm
          onCancel={(addresses ?? []).length > 0 ? () => setAdding(false) : undefined}
          onSave={async (body) => {
            await run((t) => api.addAddress(body, t), (list) => list[list.length - 1]);
            setAdding(false);
          }}
        />
      ) : (
        <button type="button" onClick={() => setAdding(true)} className="w-full h-11 rounded-xl border border-dashed border-[#E7E5E4] hover:border-primary-container text-primary-container font-caption-strong text-caption-strong flex items-center justify-center gap-1.5">
          <span className="material-symbols-outlined text-[18px]">add</span>Add a new address
        </button>
      )}
    </div>
  );
}

function AddressForm({ onSave, onCancel }: { onSave: (body: Omit<Address, 'id'>) => Promise<void>; onCancel?: () => void }) {
  const user = getUser();
  const [form, setForm] = useState({ label: 'Home', name: user?.name ?? '', line1: '', line2: '', area: '', city: 'Bengaluru', pincode: '', phone: user?.phone ?? '' });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<{ field?: string; message: string } | null>(null);
  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => setForm((f) => ({ ...f, [key]: key === 'pincode' || key === 'phone' ? e.target.value.replace(/\D/g, '') : e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (form.line1.trim().length < 3) return setError({ field: 'line1', message: 'Enter house / flat and street' });
    if (!/^[1-9]\d{5}$/.test(form.pincode)) return setError({ field: 'pincode', message: 'Enter a valid 6-digit pincode' });
    if (!/^[6-9]\d{9}$/.test(form.phone)) return setError({ field: 'phone', message: 'Enter a valid 10-digit mobile number' });
    setBusy(true);
    setError(null);
    try {
      await onSave({ ...form, isDefault: false });
    } catch (err) {
      setError({ field: err instanceof ApiError ? err.field : undefined, message: errorMessage(err) });
    } finally {
      setBusy(false);
    }
  }

  const errorFor = (field: string) => error?.field === field && <span className="font-caption text-caption text-[#8E0E17]">{error.message}</span>;

  return (
    <form onSubmit={submit} noValidate className="p-4 rounded-xl border border-[#E7E5E4] bg-[#FAFAF9] space-y-3">
      <div className="flex gap-2">
        {['Home', 'Work', 'Other'].map((label) => (
          <button key={label} type="button" onClick={() => setForm((f) => ({ ...f, label }))} className={form.label === label ? 'h-9 px-4 rounded-full bg-[#FFF1F2] border border-primary-container text-primary-container font-caption-strong text-caption' : 'h-9 px-4 rounded-full border border-[#E7E5E4] bg-white text-[#1C1917] font-caption text-caption'}>
            {label}
          </button>
        ))}
      </div>
      <label className="block space-y-1">
        <span className={LABEL}>House / flat, street</span>
        <input value={form.line1} onChange={set('line1')} autoComplete="address-line1" placeholder="e.g. Flat 402, 12th Main" className={FIELD} />
        {errorFor('line1')}
      </label>
      <label className="block space-y-1">
        <span className={LABEL}>Landmark <span className="font-caption text-[#78716C]">(optional)</span></span>
        <input value={form.line2} onChange={set('line2')} autoComplete="address-line2" placeholder="Near Indiranagar Metro" className={FIELD} />
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <label className="block space-y-1">
          <span className={LABEL}>Area</span>
          <input value={form.area} onChange={set('area')} placeholder="Indiranagar" className={FIELD} />
        </label>
        <label className="block space-y-1">
          <span className={LABEL}>Pincode</span>
          <input value={form.pincode} onChange={set('pincode')} inputMode="numeric" maxLength={6} autoComplete="postal-code" placeholder="560038" className={`${FIELD} tabular-nums`} />
          {errorFor('pincode')}
        </label>
        <label className="block space-y-1">
          <span className={LABEL}>Phone</span>
          <input value={form.phone} onChange={set('phone')} inputMode="numeric" maxLength={10} autoComplete="tel-national" placeholder="98765 43210" className={`${FIELD} tabular-nums`} />
          {errorFor('phone')}
        </label>
      </div>
      {error && !error.field && <p role="alert" className="font-caption text-caption text-[#8E0E17]">{error.message}</p>}
      <div className="flex gap-2 pt-1">
        <button type="submit" disabled={busy} className="h-11 px-5 rounded-lg bg-primary-container hover:bg-[#8E0E17] disabled:bg-[#A8A29E] text-white font-caption-strong text-caption-strong">{busy ? 'Saving…' : 'Save address'}</button>
        {onCancel && <button type="button" onClick={onCancel} className="h-11 px-5 rounded-lg border border-[#E7E5E4] bg-white text-[#1C1917] font-caption-strong text-caption-strong">Cancel</button>}
      </div>
    </form>
  );
}
