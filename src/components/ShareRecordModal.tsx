'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { api, errorMessage, photo, type AccessGrant, type Doctor } from '@/lib/api';
import { getToken } from '@/lib/session';

const DURATION_ON = 'h-9 rounded-lg border-2 border-primary bg-[#FFF1F2] text-caption-strong font-caption-strong text-primary shadow-xs';
const DURATION_OFF = 'h-9 rounded-lg border border-surface-variant bg-surface-container-low text-caption font-caption text-on-surface-variant hover:bg-surface-variant transition-colors';
const DURATIONS = [
  { label: '1 Hour', hours: 1 },
  { label: '24 Hours', hours: 24 },
  { label: '7 Days', hours: 24 * 7 },
  { label: '30 Days', hours: 24 * 30 },
];
const KINDS: { kind: AccessGrant['grantee']['kind']; label: string; icon: string; placeholder: string }[] = [
  { kind: 'doctor', label: 'Doctor', icon: 'stethoscope', placeholder: 'Search doctor by name, clinic or area' },
  { kind: 'hospital', label: 'Hospital', icon: 'local_hospital', placeholder: 'Hospital or clinic name' },
  { kind: 'family', label: 'Family', icon: 'family_restroom', placeholder: 'Name of family member' },
  { kind: 'insurer', label: 'Insurer', icon: 'shield', placeholder: 'Insurance company / claim number' },
];

type Recipient = Pick<Doctor, 'slug' | 'name' | 'title' | 'clinicName' | 'area' | 'photoUrl'>;

type Props = {
  open: boolean;
  /** Records being shared; empty means the whole locker. */
  records: { id: string; title: string }[];
  /** Doctor to pre-select, e.g. the one you're in a consultation with. */
  recipient?: Recipient | null;
  onClose: () => void;
  onShared: (grant: AccessGrant) => void;
};

/** Grants time-bound, revocable access to records (ABDM-style consent). */
export default function ShareRecordModal({ open, records, recipient = null, onClose, onShared }: Props) {
  const [kind, setKind] = useState<AccessGrant['grantee']['kind']>('doctor');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Recipient[]>([]);
  const [doctor, setDoctor] = useState<Recipient | null>(recipient);
  const [hours, setHours] = useState(24);
  const [permission, setPermission] = useState<'view' | 'download'>('view');
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Callers often pass an inline onClose; keep the latest one without re-running the reset below.
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  // Start fresh each time the modal opens — only then, so parent re-renders (e.g. a call timer) don't wipe the form.
  useEffect(() => {
    if (!open) return;
    setKind('doctor'); setQuery(''); setDoctor(recipient); setHours(24); setPermission('view'); setConsent(false); setError(null);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onCloseRef.current();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Debounced doctor search from the live directory.
  useEffect(() => {
    if (kind !== 'doctor' || doctor || query.trim().length < 2) return setResults([]);
    const id = setTimeout(() => {
      api.doctors({ q: query.trim(), limit: 4 }).then((r) => setResults(r.doctors)).catch(() => setResults([]));
    }, 250);
    return () => clearTimeout(id);
  }, [query, kind, doctor]);

  const granteeName = kind === 'doctor' ? doctor?.name ?? '' : query.trim();
  const valid = granteeName.length >= 2 && consent;
  const expiresAt = new Date(Date.now() + hours * 3_600_000);
  const what = records.length === 0 ? 'your entire health locker' : records.length === 1 ? records[0]!.title : `${records.length} records`;

  async function share() {
    const token = getToken();
    if (!token || !valid) return;
    setBusy(true);
    setError(null);
    try {
      const { grant } = await api.grantAccess({
        granteeName,
        granteeKind: kind,
        granteeDetail: doctor ? `${doctor.title} · ${doctor.clinicName}` : '',
        scope: records.length ? 'selected' : 'all',
        recordIds: records.map((r) => r.id),
        hours,
        permission,
      }, token);
      onShared(grant);
    } catch (e) {
      setError(errorMessage(e));
    } finally {
      setBusy(false);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="fixed inset-0 bg-[#1C1917]/40 z-[74] backdrop-blur-[2px]" />
          <div onClick={(e) => { if (!(e.target as HTMLElement).closest('[data-panel]')) onClose(); }} className="fixed inset-0 z-[75] flex items-end sm:items-center justify-center sm:p-4 overflow-y-auto">
            <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ type: 'spring', stiffness: 380, damping: 32 }} data-panel role="dialog" aria-modal="true" aria-labelledby="share-record-title" className="relative w-full sm:max-w-[560px] bg-surface-container-lowest rounded-t-2xl sm:rounded-2xl border border-surface-variant shadow-[0_8px_30px_rgb(0,0,0,0.12)] sm:my-auto max-h-[92vh] overflow-y-auto">
              <div className="px-6 pt-6 pb-4 border-b border-surface-variant flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                    <h2 id="share-record-title" className="text-headline-h2 font-headline-h2 text-on-surface">Share health records</h2>
                  </div>
                  <p className="text-caption font-caption text-on-surface-variant mt-1 truncate">Sharing: <span className="font-medium text-on-surface">{what}</span></p>
                </div>
                <button type="button" onClick={onClose} aria-label="Close" className="text-on-surface-variant hover:text-on-surface p-1 rounded-lg hover:bg-surface-container"><span className="material-symbols-outlined text-[20px]">close</span></button>
              </div>

              <div className="px-6 pt-4">
                <div className="bg-[#FFF1F2] border border-[#F9C6C9] rounded-xl p-3 flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-primary text-[18px] mt-0.5 shrink-0">lock</span>
                  <p className="text-caption font-caption text-on-surface leading-tight"><strong className="font-semibold text-primary">DPDP Act compliant.</strong> Access ends automatically, and you can revoke it any time from Manage Access.</p>
                </div>
              </div>

              <div className="px-6 py-4 space-y-5">
                <div>
                  <span className="block text-caption-strong font-caption-strong text-on-surface mb-1.5">Share with</span>
                  <div className="grid grid-cols-4 gap-1.5 mb-3">
                    {KINDS.map((k) => (
                      <button key={k.kind} type="button" onClick={() => { setKind(k.kind); setDoctor(null); setQuery(''); }} className={`h-14 rounded-lg border flex flex-col items-center justify-center gap-0.5 text-micro font-micro ${kind === k.kind ? 'border-2 border-primary bg-[#FFF1F2] text-primary font-semibold' : 'border-surface-variant text-on-surface-variant hover:border-outline'}`}>
                        <span className="material-symbols-outlined text-[18px]">{k.icon}</span>{k.label}
                      </button>
                    ))}
                  </div>
                  {kind === 'doctor' && doctor ? (
                    <div className="p-3 bg-[#FFF1F2] border-2 border-primary rounded-xl flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <img src={photo(doctor.photoUrl, 80)} alt="" className="w-10 h-10 rounded-lg object-cover shrink-0" />
                        <div className="min-w-0">
                          <p className="text-body-strong font-body-strong text-on-surface truncate">{doctor.name}</p>
                          <p className="text-caption font-caption text-on-surface-variant truncate">{doctor.title} · {doctor.clinicName}</p>
                        </div>
                      </div>
                      <button type="button" onClick={() => setDoctor(null)} className="text-caption-strong font-caption-strong text-primary shrink-0">Change</button>
                    </div>
                  ) : (
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant text-[20px]">{kind === 'doctor' ? 'search' : KINDS.find((k) => k.kind === kind)!.icon}</span>
                      <input value={query} onChange={(e) => setQuery(e.target.value)} maxLength={80} autoFocus className="w-full h-11 pl-10 pr-3 text-body-default font-body-default bg-surface-container-lowest border border-surface-variant focus:border-primary rounded-lg focus:ring-2 focus:ring-primary/20 focus:outline-none" placeholder={KINDS.find((k) => k.kind === kind)!.placeholder} />
                      {results.length > 0 && (
                        <ul className="mt-2 space-y-1.5">
                          {results.map((d) => (
                            <li key={d.slug}>
                              <button type="button" onClick={() => setDoctor(d)} className="w-full p-2.5 bg-surface-container-lowest border border-surface-variant hover:border-outline rounded-xl flex items-center gap-3 text-left">
                                <img src={photo(d.photoUrl, 80)} alt="" className="w-9 h-9 rounded-lg object-cover shrink-0" />
                                <span className="min-w-0">
                                  <span className="block text-body-strong font-body-strong text-on-surface truncate">{d.name}</span>
                                  <span className="block text-micro font-micro text-on-surface-variant truncate">{d.title} · {d.clinicName}, {d.area}</span>
                                </span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>

                <div>
                  <span className="block text-caption-strong font-caption-strong text-on-surface mb-1.5">Access duration</span>
                  <div className="grid grid-cols-4 gap-2">
                    {DURATIONS.map((d) => (
                      <button key={d.label} type="button" onClick={() => setHours(d.hours)} className={hours === d.hours ? DURATION_ON : DURATION_OFF}>{d.label}</button>
                    ))}
                  </div>
                  <p className="flex items-center gap-1.5 mt-2 text-micro font-micro text-on-surface-variant">
                    <span className="material-symbols-outlined text-[15px]">schedule</span>
                    Access ends <strong className="text-on-surface">{expiresAt.toLocaleString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit', hour12: true })}</strong>.
                  </p>
                </div>

                <div>
                  <span className="block text-caption-strong font-caption-strong text-on-surface mb-1.5">Permission</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {([['view', 'View only (recommended)', 'Can read the record in the Curxx viewer. No downloads.'], ['download', 'View & download', 'Can save a copy to their own records system.']] as const).map(([value, title, body]) => (
                      <label key={value} className={`p-3 rounded-xl flex items-start gap-2.5 cursor-pointer ${permission === value ? 'border-2 border-primary bg-[#FFF1F2]' : 'border border-surface-variant bg-surface-container-lowest hover:border-outline-variant'}`}>
                        <input type="radio" name="perm_level" checked={permission === value} onChange={() => setPermission(value)} className="mt-0.5 text-primary focus:ring-primary h-4 w-4" />
                        <span>
                          <span className="text-caption-strong font-caption-strong text-on-surface block leading-tight">{title}</span>
                          <span className="text-micro font-micro text-on-surface-variant block mt-1 leading-snug">{body}</span>
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="rounded border-outline text-primary focus:ring-primary mt-1 h-4 w-4" />
                  <span className="text-caption font-caption text-on-surface leading-snug">
                    I authorise Curxx to give <strong className="font-medium">{granteeName || 'this recipient'}</strong> time-bound access to {what}, under ABDM and Curxx privacy guidelines.
                  </span>
                </label>
                {error && <p role="alert" className="px-3 py-2 rounded-lg bg-[#FFF1F2] border border-[#F9C6C9] font-caption text-caption text-[#8E0E17]">{error}</p>}
              </div>

              <div className="px-6 py-4 bg-surface-container-low rounded-b-2xl border-t border-surface-variant flex items-center justify-between gap-3">
                <button type="button" onClick={onClose} className="h-11 px-5 rounded-lg border border-surface-variant bg-surface-container-lowest text-body-strong font-body-strong text-on-surface hover:bg-surface-variant">Cancel</button>
                <button type="button" onClick={share} disabled={!valid || busy} className="h-11 px-6 rounded-lg bg-primary-container hover:bg-[#8E0E17] disabled:bg-[#A8A29E] text-on-primary text-body-strong font-body-strong flex items-center gap-2 shadow-sm">
                  <span className="material-symbols-outlined text-[18px]">lock</span>{busy ? 'Sharing…' : 'Share securely'}
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
