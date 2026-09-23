'use client';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect } from 'react';
import type { HealthRecord } from '@/lib/api';
import { fileType, formatBytes, formatDate, kindMeta, sourceLabel } from '@/lib/records';

type Props = {
  record: HealthRecord | null;
  onClose: () => void;
  onDownload: (r: HealthRecord) => void;
  onShare: (r: HealthRecord) => void;
  onDelete: (r: HealthRecord) => void;
};

/** Full detail of one record: summary, prescribed medicines or measured findings. */
export default function RecordDrawer({ record, onClose, onDownload, onShare, onDelete }: Props) {
  useEffect(() => {
    if (!record) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [record, onClose]);

  const flagged = record?.findings.filter((f) => f.flag !== 'normal') ?? [];

  return (
    <AnimatePresence>
      {record && (
        <div className="fixed inset-0 z-[72]">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-[rgba(28,25,23,0.45)]" onClick={onClose} aria-hidden="true" />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 380, damping: 34 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="record-title"
            className="absolute right-0 top-0 h-full w-full max-w-lg bg-surface-container-lowest border-l border-surface-variant shadow-[0_8px_24px_rgba(0,0,0,0.12)] flex flex-col"
          >
            <div className="flex items-start justify-between gap-3 px-5 py-4 border-b border-surface-variant">
              <div className="min-w-0">
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-micro font-micro ${kindMeta(record.kind).tone}`}>
                  <span className="material-symbols-outlined text-[13px]">{kindMeta(record.kind).icon}</span>{kindMeta(record.kind).label}
                </span>
                <h2 id="record-title" className="font-headline-h3 text-headline-h3 text-on-surface mt-1.5">{record.title}</h2>
                <p className="font-caption text-caption text-on-surface-variant">{formatDate(record.date)}{record.doctorName ? ` · ${record.doctorName}` : ''}</p>
              </div>
              <button type="button" onClick={onClose} aria-label="Close" className="p-1 rounded-lg text-on-surface-variant hover:bg-surface-container"><span className="material-symbols-outlined text-[20px]">close</span></button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
              {record.summary && <p className="font-body-default text-body-default text-on-surface">{record.summary}</p>}

              {record.findings.length > 0 && (
                <section className="space-y-2">
                  {flagged.length > 0 && (
                    <div className="p-3 rounded-lg bg-[#FFF1F2] border border-[#F9C6C9]">
                      <p className="font-caption-strong text-caption-strong text-[#8E0E17]">{flagged.length} {flagged.length === 1 ? 'value needs' : 'values need'} attention</p>
                      <p className="font-caption text-caption text-on-surface-variant">{flagged.map((f) => `${f.name} (${f.flag})`).join(', ')}</p>
                    </div>
                  )}
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-micro font-micro uppercase tracking-wider text-outline border-b border-surface-variant">
                        <th className="py-2">Parameter</th><th className="py-2">Result</th><th className="py-2 hidden sm:table-cell">Range</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-variant">
                      {record.findings.map((f) => (
                        <tr key={f.name}>
                          <td className="py-2 pr-2 font-caption text-caption text-on-surface">{f.name}</td>
                          <td className={`py-2 pr-2 font-caption-strong text-caption-strong whitespace-nowrap ${f.flag === 'normal' ? 'text-on-surface' : 'text-[#B91C1C]'}`}>
                            {f.value} <span className="font-caption text-outline">{f.unit}</span>{f.flag !== 'normal' && <span className="ml-1 material-symbols-outlined text-[14px] align-middle">{f.flag === 'high' ? 'arrow_upward' : 'arrow_downward'}</span>}
                          </td>
                          <td className="py-2 font-caption text-caption text-outline hidden sm:table-cell">{f.range}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="font-micro text-micro text-outline">Values outside the reference range are not a diagnosis. Discuss them with your doctor.</p>
                </section>
              )}

              {record.medicines.length > 0 && (
                <section className="space-y-2">
                  <h3 className="font-body-strong text-body-strong text-on-surface">Prescribed medicines</h3>
                  <ul className="divide-y divide-surface-variant rounded-xl border border-surface-variant">
                    {record.medicines.map((m) => (
                      <li key={m.name} className="p-3">
                        <p className="font-body-strong text-body-strong text-on-surface">{m.name}</p>
                        <p className="font-caption text-caption text-on-surface-variant">{m.dosage} · {m.duration}</p>
                      </li>
                    ))}
                  </ul>
                  <Link href={`/medicines?q=${encodeURIComponent(record.medicines[0]!.name.split(' ')[0]!)}#results`} className="inline-flex items-center gap-1 font-caption-strong text-caption text-primary-container hover:underline">
                    <span className="material-symbols-outlined text-[16px]">local_pharmacy</span>Order these medicines
                  </Link>
                </section>
              )}

              <dl className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-surface-container-low border border-surface-variant font-caption text-caption">
                <div><dt className="text-outline">Facility</dt><dd className="text-on-surface">{record.facility || '—'}</dd></div>
                <div><dt className="text-outline">Source</dt><dd className="text-on-surface">{sourceLabel(record)}</dd></div>
                <div><dt className="text-outline">File</dt><dd className="text-on-surface truncate">{record.fileName}</dd></div>
                <div><dt className="text-outline">Format</dt><dd className="text-on-surface">{fileType(record)} · {formatBytes(record.fileSize)}</dd></div>
              </dl>
            </div>

            <div className="px-5 py-3 border-t border-surface-variant flex flex-wrap gap-2">
              <button type="button" onClick={() => onDownload(record)} className="flex-1 h-11 rounded-lg border border-surface-variant bg-white text-on-surface font-caption-strong text-caption-strong flex items-center justify-center gap-1.5"><span className="material-symbols-outlined text-[18px]">download</span>Download</button>
              <button type="button" onClick={() => onShare(record)} className="flex-1 h-11 rounded-lg bg-primary-container hover:bg-[#8E0E17] text-white font-caption-strong text-caption-strong flex items-center justify-center gap-1.5"><span className="material-symbols-outlined text-[18px]">share</span>Share</button>
              {record.source === 'upload' && (
                <button type="button" onClick={() => onDelete(record)} aria-label="Delete record" className="h-11 w-11 rounded-lg border border-[#F9C6C9] bg-[#FFF1F2] text-[#8E0E17] flex items-center justify-center"><span className="material-symbols-outlined text-[18px]">delete</span></button>
              )}
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
