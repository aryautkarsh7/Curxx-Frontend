'use client';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import RecordDrawer from '@/components/records/RecordDrawer';
import UploadRecordModal from '@/components/records/UploadRecordModal';
import RequireSignIn from '@/components/RequireSignIn';
import ShareRecordModal from '@/components/ShareRecordModal';
import Toast, { useToast } from '@/components/Toast';
import { TableSkeleton } from '@/components/skeletons';
import { api, errorMessage, type HealthRecord, type RecordKind } from '@/lib/api';
import { RECORD_KINDS, downloadRecordSummary, fileType, formatBytes, formatDate, kindMeta, sourceLabel } from '@/lib/records';
import { getToken, getUser, refreshUser, useSession } from '@/lib/session';

export default function RecordsVault() {
  return (
    <>
      <Header />
      <main className="w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop py-6 pb-28 lg:pb-10 space-y-6">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-caption font-caption text-[#78716C]">
          <Link href="/" className="hover:text-[#1C1917]">Home</Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-[#1C1917] font-caption-strong">Health Records</span>
        </nav>
        <RequireSignIn title="Sign in to open your health locker" body="Prescriptions, lab reports and scans from every Curxx visit are stored here, linked to your ABHA ID." icon="folder_shared">
          <Vault />
        </RequireSignIn>
      </main>
      <Footer />
    </>
  );
}

function Vault() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const session = useSession();
  const [toast, showToast] = useToast();
  const [records, setRecords] = useState<HealthRecord[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [syncedAt, setSyncedAt] = useState<Date | null>(null);
  const [syncing, setSyncing] = useState(false);
  const [query, setQuery] = useState('');
  const [source, setSource] = useState<'' | HealthRecord['source']>('');
  const [selected, setSelected] = useState<string[]>([]);
  const [shareFor, setShareFor] = useState<{ id: string; title: string }[] | null>(null);
  const [uploadOpen, setUploadOpen] = useState(false);

  const kind = (params.get('kind') as RecordKind | null) ?? null;
  const openId = params.get('record');
  const user = session.user ?? getUser();

  const load = useCallback(async () => {
    const token = getToken();
    if (!token) return;
    setSyncing(true);
    try {
      const [{ records: list }] = await Promise.all([api.records(token), refreshUser()]);
      setRecords(list);
      setSyncedAt(new Date());
      setError(null);
    } catch (e) {
      setError(errorMessage(e));
    } finally {
      setSyncing(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load, session.signedIn]);

  // ?share=1 opens the share dialog for the whole locker (used from the booking confirmation).
  useEffect(() => {
    if (params.get('share') === '1' && records) setShareFor([]);
  }, [params, records]);

  function setParam(key: string, value: string | null) {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    next.delete('share');
    const qs = next.toString();
    router.replace(`${pathname}${qs ? `?${qs}` : ''}`, { scroll: false });
  }

  const counts = useMemo(() => {
    const c: Partial<Record<RecordKind, number>> = {};
    for (const r of records ?? []) c[r.kind] = (c[r.kind] ?? 0) + 1;
    return c;
  }, [records]);

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (records ?? []).filter((r) =>
      (!kind || r.kind === kind) &&
      (!source || r.source === source) &&
      (!q || [r.title, r.doctorName, r.facility, ...r.tags].some((t) => t.toLowerCase().includes(q))),
    );
  }, [records, kind, source, query]);

  const open = records?.find((r) => r.id === openId) ?? null;

  async function remove(r: HealthRecord) {
    const token = getToken();
    if (!token || !window.confirm(`Delete “${r.title}” from your locker? This can’t be undone.`)) return;
    try {
      await api.deleteRecord(r.id, token);
      setRecords((prev) => prev?.filter((x) => x.id !== r.id) ?? null);
      setSelected((prev) => prev.filter((id) => id !== r.id));
      setParam('record', null);
      showToast('Record deleted');
    } catch (e) {
      showToast(errorMessage(e));
    }
  }

  function copyAbha() {
    if (!user?.abhaId) return;
    navigator.clipboard?.writeText(user.abhaId.replace(/-/g, '')).then(() => showToast('ABHA number copied')).catch(() => showToast(user.abhaId));
  }

  const toggle = (id: string) => setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  const allShownSelected = shown.length > 0 && shown.every((r) => selected.includes(r.id));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <h1 className="text-headline-h1 font-headline-h1 text-[#1C1917]">Health Records</h1>
          <p className="text-caption font-caption text-[#78716C] mt-0.5">
            {records ? `${records.length} ${records.length === 1 ? 'record' : 'records'} in your locker` : 'Loading your locker…'} · encrypted and shared only with your consent
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/records/reports" className="h-10 px-4 inline-flex items-center gap-1.5 rounded-lg border border-[#E7E5E4] bg-white text-[#1C1917] font-caption-strong text-caption-strong hover:bg-[#FAFAF9]">
            <span className="material-symbols-outlined text-[18px]">monitoring</span>Lab results
          </Link>
          <button type="button" onClick={() => setUploadOpen(true)} className="h-10 px-4 inline-flex items-center gap-1.5 rounded-lg bg-primary-container hover:bg-[#8E0E17] text-white font-caption-strong text-caption-strong">
            <span className="material-symbols-outlined text-[18px]">upload_file</span>Upload record
          </button>
        </div>
      </div>

      {/* ABHA status */}
      <section className="bg-surface-container-lowest border border-[#E7E5E4] rounded-xl p-5 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
          <div className="lg:col-span-8 flex items-start gap-4">
            <div className="h-12 w-12 rounded-lg bg-[#ECFDF5] border border-[#A7F3D0] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[#047857] text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
            </div>
            <div className="space-y-1 min-w-0">
              <div className="flex items-center flex-wrap gap-2">
                <span className="text-headline-h3 font-headline-h3 text-[#1C1917]">{user?.abhaId ? 'ABHA ID linked' : 'Link your ABHA ID'}</span>
                {user?.abhaId && (
                  <span className="inline-flex items-center gap-1 bg-[#ECFDF5] text-[#047857] border border-[#A7F3D0] px-2.5 py-0.5 rounded-full text-micro font-semibold">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#047857]"></span>Active
                  </span>
                )}
              </div>
              {user?.abhaId ? (
                <div className="flex items-center gap-2 pt-0.5">
                  <span className="font-mono text-body-strong font-body-strong text-[#1C1917] tracking-wider">{user.abhaId}</span>
                  <button type="button" onClick={copyAbha} className="p-1 text-[#78716C] hover:text-primary-container" title="Copy ABHA number" aria-label="Copy ABHA number">
                    <span className="material-symbols-outlined text-[16px]">content_copy</span>
                  </button>
                </div>
              ) : (
                <p className="text-caption font-caption text-[#78716C]">Add your 14-digit ABHA number in your profile to carry records across hospitals.</p>
              )}
              <p className="text-caption font-caption text-[#78716C]">Records from your Curxx consultations, lab tests and uploads are stored here and can be shared with any doctor with your consent.</p>
            </div>
          </div>
          <div className="lg:col-span-4 lg:border-l lg:border-[#E7E5E4] lg:pl-6 flex flex-col items-start lg:items-end gap-2.5">
            <span className="flex items-center gap-1.5 text-micro font-micro text-[#78716C]">
              <span className="material-symbols-outlined text-[14px]">schedule</span>
              {syncedAt ? `Last refreshed ${syncedAt.toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true })}` : 'Refreshing…'}
            </span>
            <div className="flex items-center gap-3 w-full lg:w-auto flex-wrap">
              <button type="button" onClick={load} disabled={syncing} className="inline-flex items-center justify-center gap-1.5 border border-[#E7E5E4] bg-white hover:bg-surface-container px-3.5 py-1.5 rounded-lg text-caption-strong font-caption-strong text-[#1C1917] shadow-sm active:scale-95">
                <span className={`material-symbols-outlined text-[16px] text-primary-container${syncing ? ' animate-spin' : ''}`}>sync</span>
                <span>{syncing ? 'Refreshing…' : 'Refresh'}</span>
              </button>
              <Link href="/records/access" className="text-caption-strong font-caption-strong text-primary-container underline hover:text-[#8E0E17] whitespace-nowrap">Manage access</Link>
              {!user?.abhaId && <Link href="/account?tab=profile" className="text-caption-strong font-caption-strong text-primary-container underline">Add ABHA</Link>}
            </div>
            <a href="https://abha.abdm.gov.in/abha/v3/register" target="_blank" rel="noopener noreferrer" className="text-micro font-micro text-[#78716C] hover:text-[#1C1917] underline">Don&apos;t have an ABHA? Create one on the ABDM site</a>
          </div>
        </div>
      </section>

      {/* Record types */}
      <section className="space-y-3">
        <h2 className="text-headline-h2 font-headline-h2 text-[#1C1917]">Browse by record type</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {RECORD_KINDS.map((k) => {
            const active = kind === k.kind;
            return (
              <button key={k.kind} type="button" onClick={() => setParam('kind', active ? null : k.kind)} aria-pressed={active} className={`text-left bg-surface-container-lowest border rounded-xl p-4 transition duration-150 group ${active ? 'border-primary-container ring-1 ring-primary-container' : 'border-[#E7E5E4] hover:border-primary-container/60 hover:shadow-sm'}`}>
                <div className={`h-10 w-10 rounded-lg border flex items-center justify-center ${k.tone}`}>
                  <span className="material-symbols-outlined text-[22px]">{k.icon}</span>
                </div>
                <p className="text-body-strong font-body-strong text-[#1C1917] mt-3">{k.plural}</p>
                <p className="text-caption font-caption text-[#78716C]">{counts[k.kind] ?? 0} {(counts[k.kind] ?? 0) === 1 ? 'file' : 'files'}</p>
              </button>
            );
          })}
        </div>
      </section>

      {/* Filters */}
      <section className="bg-surface-container-lowest border border-[#E7E5E4] rounded-xl p-3 flex flex-col md:flex-row gap-3 md:items-center">
        <label className="relative flex-1">
          <span className="sr-only">Search records</span>
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#78716C] text-[20px]">search</span>
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by title, doctor, hospital…" className="w-full h-10 pl-10 pr-3 rounded-lg border border-[#E7E5E4] bg-white font-body-default text-body-default outline-none focus:border-primary-container" />
        </label>
        <div className="flex gap-2 flex-wrap">
          <select value={kind ?? ''} onChange={(e) => setParam('kind', e.target.value || null)} aria-label="Record type" className="h-10 px-3 rounded-lg border border-[#E7E5E4] bg-white font-caption-strong text-caption-strong">
            <option value="">All types</option>
            {RECORD_KINDS.map((k) => <option key={k.kind} value={k.kind}>{k.plural}</option>)}
          </select>
          <select value={source} onChange={(e) => setSource(e.target.value as typeof source)} aria-label="Source" className="h-10 px-3 rounded-lg border border-[#E7E5E4] bg-white font-caption-strong text-caption-strong">
            <option value="">All sources</option>
            <option value="curxx">Issued via Curxx</option>
            <option value="upload">Uploaded by me</option>
            <option value="abha">Synced from ABHA</option>
          </select>
          <button type="button" onClick={() => setShareFor(selected.length ? (records ?? []).filter((r) => selected.includes(r.id)).map((r) => ({ id: r.id, title: r.title })) : [])} className="h-10 px-4 rounded-lg border border-[#E7E5E4] bg-white text-[#1C1917] font-caption-strong text-caption-strong inline-flex items-center gap-1.5 hover:bg-[#FAFAF9]">
            <span className="material-symbols-outlined text-[18px]">share</span>{selected.length ? `Share selected (${selected.length})` : 'Share all'}
          </button>
        </div>
      </section>

      {/* Records */}
      <section className="bg-surface-container-lowest border border-[#E7E5E4] rounded-xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-[#E7E5E4] flex items-center justify-between gap-3">
          <div>
            <h2 className="text-headline-h3 font-headline-h3 text-[#1C1917]">{kind ? kindMeta(kind).plural : 'All documents'}</h2>
            <p className="text-caption font-caption text-[#78716C]">{records ? `Showing ${shown.length} of ${records.length}` : ''}</p>
          </div>
          {(kind || source || query) && (
            <button type="button" onClick={() => { setQuery(''); setSource(''); setParam('kind', null); }} className="text-caption-strong font-caption-strong text-primary-container hover:underline">Clear filters</button>
          )}
        </div>

        {error ? (
          <p role="alert" className="m-4 p-3 rounded-lg bg-[#FFF1F2] border border-[#F9C6C9] text-[#8E0E17] font-caption text-caption">{error} <button type="button" onClick={load} className="underline">Try again</button></p>
        ) : !records ? (
          <div className="p-4"><TableSkeleton rows={4} /></div>
        ) : shown.length === 0 ? (
          <div className="p-8 text-center space-y-2">
            <span className="material-symbols-outlined text-[32px] text-[#78716C]">folder_open</span>
            <p className="font-body-default text-body-default text-[#78716C]">{records.length === 0 ? 'Your locker is empty.' : 'No records match these filters.'}</p>
            <button type="button" onClick={() => setUploadOpen(true)} className="font-caption-strong text-caption-strong text-primary-container hover:underline">Upload a record</button>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#E7E5E4] bg-surface-container-low text-micro uppercase tracking-wider text-[#78716C]">
                    <th className="py-3 px-4 w-8">
                      <input type="checkbox" aria-label="Select all shown" checked={allShownSelected} onChange={() => setSelected(allShownSelected ? selected.filter((id) => !shown.some((r) => r.id === id)) : [...new Set([...selected, ...shown.map((r) => r.id)])])} className="rounded border-[#78716C] text-primary-container h-4 w-4" />
                    </th>
                    <th className="py-3 px-4">Document</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4">Source</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">File</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E7E5E4] text-body-default font-body-default text-[#1C1917]">
                  {shown.map((r) => (
                    <tr key={r.id} className="hover:bg-[#FAFAF9] transition-colors">
                      <td className="py-3.5 px-4"><input type="checkbox" aria-label={`Select ${r.title}`} checked={selected.includes(r.id)} onChange={() => toggle(r.id)} className="rounded border-[#78716C] text-primary-container h-4 w-4" /></td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className={`h-9 w-9 rounded-lg border flex items-center justify-center shrink-0 ${kindMeta(r.kind).tone}`}><span className="material-symbols-outlined text-[20px]">{kindMeta(r.kind).icon}</span></div>
                          <div className="min-w-0">
                            <button type="button" onClick={() => setParam('record', r.id)} className="text-body-strong font-body-strong text-[#1C1917] hover:text-primary-container text-left">{r.title}</button>
                            <p className="text-micro font-micro text-[#78716C] truncate max-w-[280px]">{[r.doctorName, r.facility].filter(Boolean).join(' • ') || '—'}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4"><span className="inline-flex px-2.5 py-0.5 rounded-full text-micro font-medium bg-surface-container text-[#1C1917] whitespace-nowrap">{kindMeta(r.kind).label}</span></td>
                      <td className="py-3.5 px-4 text-caption text-[#78716C] max-w-[180px] truncate">{sourceLabel(r)}</td>
                      <td className="py-3.5 px-4 text-caption text-[#78716C] whitespace-nowrap">{formatDate(r.date)}</td>
                      <td className="py-3.5 px-4 text-caption text-[#78716C] whitespace-nowrap"><span className="font-mono font-medium text-[#1C1917]">{fileType(r)}</span> • {formatBytes(r.fileSize)}</td>
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1 text-[#78716C]">
                          <button type="button" onClick={() => setParam('record', r.id)} className="p-1.5 hover:text-primary-container hover:bg-surface-container rounded-lg" title="View" aria-label={`View ${r.title}`}><span className="material-symbols-outlined text-[18px]">visibility</span></button>
                          <button type="button" onClick={() => downloadRecordSummary(r, user ?? undefined)} className="p-1.5 hover:text-primary-container hover:bg-surface-container rounded-lg" title="Download" aria-label={`Download ${r.title}`}><span className="material-symbols-outlined text-[18px]">download</span></button>
                          <button type="button" onClick={() => setShareFor([{ id: r.id, title: r.title }])} className="p-1.5 hover:text-primary-container hover:bg-surface-container rounded-lg" title="Share" aria-label={`Share ${r.title}`}><span className="material-symbols-outlined text-[18px]">share</span></button>
                          {r.source === 'upload' && (
                            <button type="button" onClick={() => remove(r)} className="p-1.5 hover:text-[#EE1C25] hover:bg-[#FFF1F2] rounded-lg" title="Delete" aria-label={`Delete ${r.title}`}><span className="material-symbols-outlined text-[18px]">delete</span></button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Phone cards */}
            <ul className="md:hidden divide-y divide-[#E7E5E4]">
              {shown.map((r) => (
                <li key={r.id} className="flex items-start gap-3 p-4">
                  <input type="checkbox" aria-label={`Select ${r.title}`} checked={selected.includes(r.id)} onChange={() => toggle(r.id)} className="mt-2.5 rounded border-[#78716C] text-primary-container h-4 w-4 shrink-0" />
                  <button type="button" onClick={() => setParam('record', r.id)} className="flex items-start gap-3 min-w-0 flex-1 text-left">
                    <span className={`h-10 w-10 rounded-lg border flex items-center justify-center shrink-0 ${kindMeta(r.kind).tone}`}><span className="material-symbols-outlined text-[20px]">{kindMeta(r.kind).icon}</span></span>
                    <span className="min-w-0">
                      <span className="block text-body-strong font-body-strong text-[#1C1917]">{r.title}</span>
                      <span className="block text-micro font-micro text-[#78716C] truncate">{kindMeta(r.kind).label} · {formatDate(r.date)}{r.doctorName ? ` · ${r.doctorName}` : ''}</span>
                      {r.findings.some((f) => f.flag !== 'normal') && <span className="inline-block mt-1 px-1.5 py-0.5 rounded bg-[#FFF1F2] border border-[#F9C6C9] text-[#8E0E17] text-micro font-micro">{r.findings.filter((f) => f.flag !== 'normal').length} flagged</span>}
                    </span>
                  </button>
                  <button type="button" onClick={() => setShareFor([{ id: r.id, title: r.title }])} className="p-2 text-[#78716C] shrink-0" aria-label={`Share ${r.title}`}><span className="material-symbols-outlined text-[20px]">share</span></button>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>

      <section className="rounded-xl border border-[#E7E5E4] bg-[#FAFAF9] p-4 flex items-start gap-3">
        <span className="material-symbols-outlined text-[22px] text-[#047857]">encrypted</span>
        <p className="text-caption font-caption text-[#78716C]">Records are encrypted at rest and in transit. Nobody — including Curxx doctors — can open them without a consent you grant, and every grant expires automatically. <Link href="/records/access" className="text-primary-container underline">Review who has access</Link>.</p>
      </section>

      <button type="button" onClick={() => setUploadOpen(true)} className="md:hidden fixed bottom-20 right-4 z-40 h-14 w-14 rounded-full bg-primary-container text-white shadow-[0_6px_20px_rgba(28,25,23,0.28)] flex items-center justify-center" aria-label="Upload record">
        <span className="material-symbols-outlined text-[26px]">add</span>
      </button>

      <RecordDrawer
        record={open}
        onClose={() => setParam('record', null)}
        onDownload={(r) => downloadRecordSummary(r, user ?? undefined)}
        onShare={(r) => setShareFor([{ id: r.id, title: r.title }])}
        onDelete={remove}
      />
      <ShareRecordModal
        open={shareFor !== null}
        records={shareFor ?? []}
        onClose={() => { setShareFor(null); if (params.get('share')) setParam('share', null); }}
        onShared={(grant) => {
          setShareFor(null);
          setSelected([]);
          showToast(`Shared with ${grant.grantee.name} until ${new Date(grant.expiresAt).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit', hour12: true })}`);
        }}
      />
      <UploadRecordModal
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
        onUploaded={(record) => {
          setUploadOpen(false);
          setRecords((prev) => [record, ...(prev ?? [])].sort((a, b) => +new Date(b.date) - +new Date(a.date)));
          showToast(`${record.title} added to your locker`);
        }}
      />
      <Toast message={toast} />
    </div>
  );
}
