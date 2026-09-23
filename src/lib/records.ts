import type { HealthRecord, RecordKind } from './api';

export const RECORD_KINDS: { kind: RecordKind; label: string; plural: string; icon: string; tone: string }[] = [
  { kind: 'prescription', label: 'Prescription', plural: 'Prescriptions', icon: 'prescriptions', tone: 'bg-[#FFF1F2] border-[#F9C6C9] text-primary-container' },
  { kind: 'lab_report', label: 'Lab report', plural: 'Lab Reports', icon: 'lab_profile', tone: 'bg-[#EFF6FF] border-[#BFDBFE] text-[#1D4ED8]' },
  { kind: 'imaging', label: 'Scan / X-ray', plural: 'Scans & X-Rays', icon: 'radiology', tone: 'bg-[#F5F3FF] border-[#DDD6FE] text-[#6D28D9]' },
  { kind: 'vaccination', label: 'Vaccination', plural: 'Vaccinations', icon: 'vaccines', tone: 'bg-[#ECFDF5] border-[#A7F3D0] text-[#047857]' },
  { kind: 'discharge', label: 'Discharge summary', plural: 'Discharge Summaries', icon: 'local_hospital', tone: 'bg-[#FFF7ED] border-[#FED7AA] text-[#B45309]' },
  { kind: 'invoice', label: 'Bill / receipt', plural: 'Bills & Receipts', icon: 'receipt_long', tone: 'bg-surface-container border-surface-variant text-on-surface-variant' },
];

export const kindMeta = (kind: RecordKind) => RECORD_KINDS.find((k) => k.kind === kind) ?? RECORD_KINDS[0]!;

export const formatBytes = (n: number) => (n >= 1024 * 1024 ? `${(n / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(n / 1024))} KB`);

export const formatDate = (iso: string) => new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

export const fileType = (r: Pick<HealthRecord, 'mimeType' | 'fileName'>) =>
  r.mimeType === 'application/pdf' || r.fileName.toLowerCase().endsWith('.pdf') ? 'PDF' : r.mimeType.startsWith('image/') ? r.mimeType.split('/')[1]!.toUpperCase() : 'FILE';

export const sourceLabel = (r: Pick<HealthRecord, 'source' | 'facility'>) =>
  r.source === 'upload' ? 'Uploaded by you' : r.source === 'abha' ? 'Synced from ABHA' : `Issued via Curxx${r.facility ? ` · ${r.facility}` : ''}`;

/** A printable, self-contained summary of a record — what "Download" gives until files live in object storage. */
export function downloadRecordSummary(r: HealthRecord, patient?: { name?: string; abhaId?: string }) {
  const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]!));
  const rows = (r.findings ?? []).map((f) => `<tr><td>${esc(f.name)}</td><td class="${f.flag}">${esc(f.value)} ${esc(f.unit)}</td><td>${esc(f.range)}</td><td class="${f.flag}">${f.flag === 'normal' ? 'Normal' : f.flag === 'high' ? 'High' : 'Low'}</td></tr>`).join('');
  const meds = (r.medicines ?? []).map((m) => `<tr><td>${esc(m.name)}</td><td>${esc(m.dosage)}</td><td>${esc(m.duration)}</td></tr>`).join('');
  const html = `<!doctype html><html><head><meta charset="utf-8"><title>${esc(r.title)}</title>
<style>body{font:14px/1.5 -apple-system,Segoe UI,Roboto,sans-serif;color:#1C1917;max-width:760px;margin:32px auto;padding:0 16px}h1{font-size:22px;margin:0 0 4px}.muted{color:#78716C}table{width:100%;border-collapse:collapse;margin:16px 0}td,th{border-bottom:1px solid #E7E5E4;padding:8px;text-align:left}.high,.low{color:#B91C1C;font-weight:600}.brand{color:#C1121F;font-weight:700}</style></head>
<body><p class="brand">Curxx · Health Record</p><h1>${esc(r.title)}</h1>
<p class="muted">${esc(kindMeta(r.kind).label)} · ${formatDate(r.date)}${r.doctorName ? ` · ${esc(r.doctorName)}` : ''}${r.facility ? ` · ${esc(r.facility)}` : ''}</p>
${patient?.name || patient?.abhaId ? `<p>Patient: ${esc(patient.name ?? '')}${patient.abhaId ? ` · ABHA ${esc(patient.abhaId)}` : ''}</p>` : ''}
${r.summary ? `<p>${esc(r.summary)}</p>` : ''}
${rows ? `<table><thead><tr><th>Parameter</th><th>Result</th><th>Reference range</th><th>Flag</th></tr></thead><tbody>${rows}</tbody></table>` : ''}
${meds ? `<table><thead><tr><th>Medicine</th><th>Dosage</th><th>Duration</th></tr></thead><tbody>${meds}</tbody></table>` : ''}
<p class="muted">Original file: ${esc(r.fileName)}. Generated ${new Date().toLocaleString('en-IN')} from your Curxx health locker.</p></body></html>`;
  const url = URL.createObjectURL(new Blob([html], { type: 'text/html' }));
  const link = Object.assign(document.createElement('a'), { href: url, download: `${r.title.replace(/[^a-z0-9]+/gi, '-').replace(/(^-|-$)/g, '')}.html` });
  link.click();
  URL.revokeObjectURL(url);
}
