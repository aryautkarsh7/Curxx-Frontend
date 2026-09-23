'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { api, errorMessage, type HealthRecord, type RecordKind } from '@/lib/api';
import { RECORD_KINDS } from '@/lib/records';
import { getToken } from '@/lib/session';

const FIELD = 'w-full h-11 px-3 bg-white border border-[#E7E5E4] rounded-lg font-body-default text-body-default text-[#1C1917] placeholder-[#A8A29E] outline-none focus:border-primary-container focus:ring-2 focus:ring-[rgba(193,18,31,0.15)]';
const ALLOWED = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp', 'image/heic'];
const MAX = 10 * 1024 * 1024;

/** Adds an existing report, prescription or scan to the locker. */
export default function UploadRecordModal({ open, onClose, onUploaded }: { open: boolean; onClose: () => void; onUploaded: (r: HealthRecord) => void }) {
  const input = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [kind, setKind] = useState<RecordKind>('lab_report');
  const [title, setTitle] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [facility, setFacility] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setFile(null); setTitle(''); setDoctorName(''); setFacility(''); setError(null); setDate(new Date().toISOString().slice(0, 10));
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  function pick(f: File | undefined) {
    if (!f) return;
    const type = f.type || (f.name.toLowerCase().endsWith('.pdf') ? 'application/pdf' : '');
    if (!ALLOWED.includes(type)) return setError('Upload a PDF, JPG, PNG or HEIC file.');
    if (f.size > MAX) return setError('Files must be under 10 MB.');
    setError(null);
    setFile(f);
    if (!title) setTitle(f.name.replace(/\.[a-z0-9]+$/i, '').replace(/[_-]+/g, ' '));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const token = getToken();
    if (!token || !file) return;
    setBusy(true);
    setError(null);
    try {
      const { record } = await api.uploadRecord({
        kind, title: title.trim(), doctorName: doctorName.trim(), facility: facility.trim(), date,
        fileName: file.name, fileSize: file.size, mimeType: file.type || 'application/pdf',
      }, token);
      onUploaded(record);
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[74] flex items-end sm:items-center justify-center sm:p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-[rgba(28,25,23,0.45)]" onClick={onClose} aria-hidden="true" />
          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="upload-title"
            className="relative w-full sm:max-w-lg bg-surface-container-lowest rounded-t-2xl sm:rounded-2xl border border-surface-variant shadow-[0_8px_30px_rgb(0,0,0,0.12)] max-h-[92vh] overflow-y-auto"
          >
            <div className="px-5 py-4 border-b border-surface-variant flex items-center justify-between">
              <h2 id="upload-title" className="font-headline-h3 text-headline-h3 text-on-surface">Upload a health record</h2>
              <button type="button" onClick={onClose} aria-label="Close" className="p-1 rounded-lg text-on-surface-variant hover:bg-surface-container"><span className="material-symbols-outlined text-[20px]">close</span></button>
            </div>
            <div className="px-5 py-4 space-y-4">
              <button type="button" onClick={() => input.current?.click()} onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); pick(e.dataTransfer.files[0]); }} className="w-full p-6 rounded-xl border-2 border-dashed border-[#E7E5E4] bg-[#FAFAF9] hover:border-primary-container flex flex-col items-center gap-1.5 text-center">
                <span className="material-symbols-outlined text-[32px] text-[#78716C]">{file ? 'task' : 'upload_file'}</span>
                <span className="font-body-strong text-body-strong text-[#1C1917]">{file ? file.name : 'Choose a file'}</span>
                <span className="font-caption text-caption text-[#78716C]">{file ? `${(file.size / 1024 / 1024).toFixed(1)} MB · tap to replace` : 'PDF, JPG, PNG or HEIC, up to 10 MB'}</span>
              </button>
              <input ref={input} type="file" accept={ALLOWED.join(',')} hidden onChange={(e) => { pick(e.target.files?.[0]); e.target.value = ''; }} />
              <label className="block space-y-1">
                <span className="font-caption-strong text-caption-strong text-[#1C1917]">Record type</span>
                <select value={kind} onChange={(e) => setKind(e.target.value as RecordKind)} className={FIELD}>
                  {RECORD_KINDS.map((k) => <option key={k.kind} value={k.kind}>{k.label}</option>)}
                </select>
              </label>
              <label className="block space-y-1">
                <span className="font-caption-strong text-caption-strong text-[#1C1917]">Title</span>
                <input value={title} onChange={(e) => setTitle(e.target.value)} maxLength={120} required minLength={2} placeholder="e.g. CBC report, March" className={FIELD} />
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="block space-y-1">
                  <span className="font-caption-strong text-caption-strong text-[#1C1917]">Doctor / lab <span className="font-caption text-[#78716C]">(optional)</span></span>
                  <input value={doctorName} onChange={(e) => setDoctorName(e.target.value)} maxLength={80} className={FIELD} />
                </label>
                <label className="block space-y-1">
                  <span className="font-caption-strong text-caption-strong text-[#1C1917]">Date of record</span>
                  <input type="date" value={date} max={new Date().toISOString().slice(0, 10)} onChange={(e) => setDate(e.target.value)} className={FIELD} />
                </label>
              </div>
              <label className="block space-y-1">
                <span className="font-caption-strong text-caption-strong text-[#1C1917]">Hospital / clinic <span className="font-caption text-[#78716C]">(optional)</span></span>
                <input value={facility} onChange={(e) => setFacility(e.target.value)} maxLength={120} className={FIELD} />
              </label>
              {error && <p role="alert" className="px-3 py-2 rounded-lg bg-[#FFF1F2] border border-[#F9C6C9] font-caption text-caption text-[#8E0E17]">{error}</p>}
            </div>
            <div className="px-5 py-3 border-t border-surface-variant flex justify-end gap-2">
              <button type="button" onClick={onClose} className="h-11 px-5 rounded-lg border border-surface-variant bg-white font-caption-strong text-caption-strong">Cancel</button>
              <button type="submit" disabled={!file || title.trim().length < 2 || busy} className="h-11 px-5 rounded-lg bg-primary-container hover:bg-[#8E0E17] disabled:bg-[#A8A29E] text-white font-caption-strong text-caption-strong">{busy ? 'Uploading…' : 'Add to locker'}</button>
            </div>
          </motion.form>
        </div>
      )}
    </AnimatePresence>
  );
}
