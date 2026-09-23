'use client';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import RequireSignIn from '@/components/RequireSignIn';
import ShareRecordModal from '@/components/ShareRecordModal';
import Toast, { useToast } from '@/components/Toast';
import { TableSkeleton } from '@/components/skeletons';
import { api, errorMessage, type AccessGrant } from '@/lib/api';
import { getToken, useSession } from '@/lib/session';

const KIND_ICON: Record<AccessGrant['grantee']['kind'], string> = { doctor: 'stethoscope', hospital: 'local_hospital', family: 'family_restroom', insurer: 'shield' };
const SCOPE: Record<AccessGrant['scope'], string> = { all: 'All records', prescriptions: 'Prescriptions', lab_reports: 'Lab reports', selected: 'Selected records' };
const when = (iso: string) => new Date(iso).toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true });

export default function AccessManager() {
  return (
    <RequireSignIn title="Sign in to manage record access" icon="shield_person">
      <Grants />
    </RequireSignIn>
  );
}

function Grants() {
  const session = useSession();
  const [grants, setGrants] = useState<AccessGrant[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [sharing, setSharing] = useState(false);
  const [toast, showToast] = useToast();

  const load = useCallback(() => {
    const token = getToken();
    if (!token) return;
    api.grants(token).then((r) => setGrants(r.grants)).catch((e) => setError(errorMessage(e)));
  }, []);
  useEffect(load, [load, session.signedIn]);

  async function revoke(g: AccessGrant) {
    const token = getToken();
    if (!token || !window.confirm(`Revoke ${g.grantee.name}’s access now?`)) return;
    setBusy(g.id);
    try {
      const { grant } = await api.revokeAccess(g.id, token);
      setGrants((prev) => prev?.map((x) => (x.id === grant.id ? grant : x)) ?? null);
      showToast(`${g.grantee.name} can no longer see your records`);
    } catch (e) {
      showToast(errorMessage(e));
    } finally {
      setBusy(null);
    }
  }

  if (error) return <p role="alert" className="p-3 rounded-lg bg-[#FFF1F2] border border-[#F9C6C9] text-[#8E0E17] font-caption text-caption">{error}</p>;
  if (!grants) return <TableSkeleton rows={3} />;

  const active = grants.filter((g) => g.status === 'active');
  const past = grants.filter((g) => g.status !== 'active');

  const row = (g: AccessGrant) => (
    <li key={g.id} className="flex flex-col sm:flex-row sm:items-center gap-3 p-4">
      <span className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-on-surface-variant shrink-0"><span className="material-symbols-outlined text-[20px]">{KIND_ICON[g.grantee.kind]}</span></span>
      <div className="flex-1 min-w-0">
        <p className="font-body-strong text-body-strong text-[#1C1917]">{g.grantee.name}</p>
        <p className="font-caption text-caption text-[#78716C]">
          {[g.grantee.detail, g.scope === 'selected' ? `${g.records.length} selected ${g.records.length === 1 ? 'record' : 'records'}` : SCOPE[g.scope], g.permission === 'download' ? 'View & download' : 'View only'].filter(Boolean).join(' · ')}
        </p>
        <p className={`font-micro text-micro mt-0.5 ${g.status === 'active' ? 'text-[#B45309]' : 'text-[#78716C]'}`}>
          {g.status === 'active' ? `Expires ${when(g.expiresAt)}` : g.status === 'revoked' ? 'Revoked' : `Expired ${when(g.expiresAt)}`}
          {g.lastAccessedAt ? ` · Last opened ${when(g.lastAccessedAt)}` : ''}
        </p>
      </div>
      {g.status === 'active' && (
        <button type="button" onClick={() => revoke(g)} disabled={busy === g.id} className="h-9 px-4 rounded-lg border border-[#F9C6C9] bg-[#FFF1F2] text-[#8E0E17] font-caption-strong text-caption-strong hover:bg-[#FEE2E2] disabled:opacity-50 shrink-0">
          {busy === g.id ? 'Revoking…' : 'Revoke'}
        </button>
      )}
    </li>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-body-strong text-body-strong text-[#1C1917]">{active.length} active {active.length === 1 ? 'grant' : 'grants'}</p>
        <button type="button" onClick={() => setSharing(true)} className="h-10 px-4 inline-flex items-center gap-1.5 rounded-lg bg-primary-container hover:bg-[#8E0E17] text-white font-caption-strong text-caption-strong">
          <span className="material-symbols-outlined text-[18px]">add</span>Grant access
        </button>
      </div>
      {active.length === 0 ? (
        <p className="p-4 rounded-xl border border-[#E7E5E4] bg-white text-body-default font-body-default text-on-surface-variant">No one has access to your records right now.</p>
      ) : (
        <ul className="divide-y divide-[#E7E5E4] rounded-xl border border-[#E7E5E4] bg-white">{active.map(row)}</ul>
      )}
      {past.length > 0 && (
        <section className="space-y-2">
          <h2 className="font-body-strong text-body-strong text-[#78716C]">Past access</h2>
          <ul className="divide-y divide-[#E7E5E4] rounded-xl border border-[#E7E5E4] bg-white opacity-80">{past.map(row)}</ul>
        </section>
      )}
      <Link href="/records" className="inline-flex items-center gap-1 text-caption-strong font-caption-strong text-[#D92D3A] hover:underline">
        <span className="material-symbols-outlined text-[16px]">arrow_back</span> Back to Health Records
      </Link>
      <ShareRecordModal
        open={sharing}
        records={[]}
        onClose={() => setSharing(false)}
        onShared={(grant) => {
          setSharing(false);
          setGrants((prev) => [grant, ...(prev ?? [])]);
          showToast(`Access granted to ${grant.grantee.name}`);
        }}
      />
      <Toast message={toast} />
    </div>
  );
}
