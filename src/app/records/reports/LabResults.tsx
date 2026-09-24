'use client';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import RequireSignIn from '@/components/RequireSignIn';
import ShareRecordModal from '@/components/ShareRecordModal';
import Toast, { useToast } from '@/components/Toast';
import { DetailSkeleton } from '@/components/skeletons';
import { api, errorMessage, type HealthRecord } from '@/lib/api';
import { downloadRecordSummary, formatDate } from '@/lib/records';
import { getToken, getUser, useSession } from '@/lib/session';

export default function LabResults() {
  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-caption font-caption text-[#78716C] mb-1">
            <Link href="/records" className="hover:text-[#1C1917]">Health Records</Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-[#1C1917] font-caption-strong">Lab results</span>
          </nav>
          <h1 className="text-headline-h1 font-headline-h1 text-[#1C1917]">Lab results</h1>
          <p className="text-caption font-caption text-[#78716C]">Values outside the reference range are listed first.</p>
        </div>
        <Link href="/lab-tests" className="h-10 px-4 inline-flex items-center gap-1.5 rounded-lg bg-primary-container hover:bg-[#8E0E17] text-white font-caption-strong text-caption-strong self-start sm:self-auto">
          <span className="material-symbols-outlined text-[18px]">science</span>Book a test
        </Link>
      </div>
      <RequireSignIn title="Sign in to see your lab results" icon="lab_profile">
        <Results />
      </RequireSignIn>
    </>
  );
}

function Results() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const session = useSession();
  const [reports, setReports] = useState<HealthRecord[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sharing, setSharing] = useState(false);
  const [toast, showToast] = useToast();

  useEffect(() => {
    const token = getToken();
    if (!token) return;
    api.records(token, { kind: 'lab_report' }).then((r) => setReports(r.records)).catch((e) => setError(errorMessage(e)));
  }, [session.signedIn]);

  const activeId = params.get('report') ?? reports?.[0]?.id;
  const active = reports?.find((r) => r.id === activeId) ?? reports?.[0] ?? null;

  // Previous value of each parameter from the most recent older report that measured it.
  const previous = useMemo(() => {
    const map = new Map<string, { value: string; date: string }>();
    if (!active || !reports) return map;
    const older = reports.filter((r) => r.id !== active.id && new Date(r.date) < new Date(active.date));
    for (const f of active.findings) {
      const hit = older.find((r) => r.findings.some((x) => x.name === f.name || (f.name.startsWith('TSH') && x.name === 'TSH')));
      const match = hit?.findings.find((x) => x.name === f.name || (f.name.startsWith('TSH') && x.name === 'TSH'));
      if (hit && match) map.set(f.name, { value: match.value, date: hit.date });
    }
    return map;
  }, [active, reports]);

  if (error) return <p role="alert" className="p-3 rounded-lg bg-[#FFF1F2] border border-[#F9C6C9] text-[#8E0E17] font-caption text-caption">{error}</p>;
  if (!reports) return <DetailSkeleton />;
  if (!active) {
    return (
      <div className="p-8 rounded-2xl border border-[#E7E5E4] bg-white text-center space-y-3">
        <span className="material-symbols-outlined text-[36px] text-[#78716C]">lab_profile</span>
        <p className="font-body-default text-body-default text-on-surface-variant">No lab reports yet. Reports from Curxx lab bookings appear here automatically.</p>
      </div>
    );
  }

  const flagged = active.findings.filter((f) => f.flag !== 'normal');
  const ordered = [...flagged, ...active.findings.filter((f) => f.flag === 'normal')];
  const user = getUser();

  return (
    <div className="space-y-5">
      {/* Report switcher */}
      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1" role="tablist" aria-label="Reports">
        {reports.map((r) => {
          const selected = r.id === active.id;
          const n = r.findings.filter((f) => f.flag !== 'normal').length;
          return (
            <button
              key={r.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => router.replace(`${pathname}?report=${r.id}`, { scroll: false })}
              className={`shrink-0 w-64 text-left p-4 rounded-xl border transition ${selected ? 'border-2 border-primary-container bg-[#FFF1F2]' : 'border-[#E7E5E4] bg-white hover:border-[#A8A29E]'}`}
            >
              <p className="font-body-strong text-body-strong text-[#1C1917] line-clamp-2">{r.title}</p>
              <p className="font-caption text-caption text-[#78716C] mt-1">{formatDate(r.date)} · {r.facility || r.doctorName}</p>
              <p className={`font-micro text-micro mt-2 ${n ? 'text-[#8E0E17]' : 'text-[#047857]'}`}>{n ? `${n} flagged` : 'All within range'}</p>
            </button>
          );
        })}
      </div>

      <section className="rounded-2xl border border-[#E7E5E4] bg-white overflow-hidden">
        <div className="p-5 border-b border-[#E7E5E4] flex flex-col sm:flex-row sm:items-start justify-between gap-3 bg-[#FAFAF9]">
          <div className="min-w-0">
            <h2 className="font-headline-h2 text-headline-h2 text-[#1C1917]">{active.title}</h2>
            <p className="font-caption text-caption text-[#78716C]">{formatDate(active.date)} · {active.facility}{user?.name ? ` · ${user.name}` : ''}{user?.abhaId ? ` · ABHA ${user.abhaId}` : ''}</p>
            {active.summary && <p className="font-body-default text-body-default text-[#1C1917] mt-2">{active.summary}</p>}
          </div>
          <div className="flex gap-2 shrink-0">
            <button type="button" onClick={() => downloadRecordSummary(active, user ?? undefined)} className="h-10 px-4 inline-flex items-center gap-1.5 rounded-lg border border-[#E7E5E4] bg-white font-caption-strong text-caption-strong"><span className="material-symbols-outlined text-[18px]">download</span>Download</button>
            <button type="button" onClick={() => setSharing(true)} className="h-10 px-4 inline-flex items-center gap-1.5 rounded-lg bg-primary-container hover:bg-[#8E0E17] text-white font-caption-strong text-caption-strong"><span className="material-symbols-outlined text-[18px]">share</span>Share</button>
          </div>
        </div>

        {flagged.length > 0 && (
          <div className="p-5 border-b border-[#E7E5E4] space-y-3">
            <h3 className="font-body-strong text-body-strong text-[#8E0E17] flex items-center gap-1.5"><span className="material-symbols-outlined text-[20px]">priority_high</span>Needs attention</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {flagged.map((f) => (
                <div key={f.name} className="p-3 rounded-xl border border-[#F9C6C9] bg-[#FFF1F2]">
                  <p className="font-caption-strong text-caption-strong text-[#1C1917]">{f.name}</p>
                  <p className="font-headline-h3 text-headline-h3 text-[#B91C1C]">{f.value} <span className="font-caption text-caption text-[#78716C]">{f.unit}</span></p>
                  <p className="font-micro text-micro text-[#78716C]">{f.flag === 'high' ? 'Above' : 'Below'} range {f.range}</p>
                </div>
              ))}
            </div>
            <p className="font-caption text-caption text-[#78716C]">
              A flagged value isn&apos;t a diagnosis. <Link href="/doctors" className="text-primary-container underline">Review it with a doctor</Link> — Curxx physicians can see this report once you share it.
            </p>
          </div>
        )}

        {ordered.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-micro uppercase tracking-wider text-[#78716C] border-b border-[#E7E5E4] bg-surface-container-low">
                  <th className="py-3 px-5">Parameter</th><th className="py-3 px-3">Result</th><th className="py-3 px-3">Reference</th><th className="py-3 px-5">Previous</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E7E5E4]">
                {ordered.map((f) => {
                  const prev = previous.get(f.name);
                  const delta = prev ? Number(f.value) - Number(prev.value) : null;
                  return (
                    <tr key={f.name}>
                      <td className="py-3 px-5 font-caption text-caption text-[#1C1917]">{f.name}</td>
                      <td className={`py-3 px-3 font-caption-strong text-caption-strong whitespace-nowrap ${f.flag === 'normal' ? 'text-[#1C1917]' : 'text-[#B91C1C]'}`}>{f.value} <span className="font-caption text-[#78716C]">{f.unit}</span></td>
                      <td className="py-3 px-3 font-caption text-caption text-[#78716C] whitespace-nowrap">{f.range}</td>
                      <td className="py-3 px-5 font-caption text-caption text-[#78716C] whitespace-nowrap">
                        {prev ? (
                          <span>{prev.value}{delta !== null && !Number.isNaN(delta) && delta !== 0 && <span className="material-symbols-outlined text-[14px] align-middle ml-0.5">{delta > 0 ? 'trending_up' : 'trending_down'}</span>} <span className="text-outline">({new Date(prev.date).toLocaleDateString('en-IN', { month: 'short', year: '2-digit' })})</span></span>
                        ) : '—'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="p-5 font-body-default text-body-default text-[#78716C]">This report has no itemised values — download it to see the full document.</p>
        )}
      </section>

      <ShareRecordModal
        open={sharing}
        records={[{ id: active.id, title: active.title }]}
        onClose={() => setSharing(false)}
        onShared={(g) => { setSharing(false); showToast(`Shared with ${g.grantee.name}`); }}
      />
      <Toast message={toast} />
    </div>
  );
}
