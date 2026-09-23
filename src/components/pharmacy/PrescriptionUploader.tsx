'use client';
import { useRef, useState } from 'react';
import { api, errorMessage, type HealthRecord } from '@/lib/api';
import { getToken } from '@/lib/session';

const ACCEPT = 'image/jpeg,image/png,image/webp,image/heic,application/pdf';
const ALLOWED = ACCEPT.split(',');
const MAX_BYTES = 10 * 1024 * 1024;

/**
 * Files prescriptions into the patient's health locker. The file itself goes to object
 * storage once that is connected; the locker entry is what checkout attaches to an order.
 */
export default function PrescriptionUploader({ onUploaded, cta = 'Send to Pharmacist' }: { onUploaded: (records: HealthRecord[]) => void; cta?: string }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [doctorName, setDoctorName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  function addFiles(list: FileList | null) {
    if (!list) return;
    const picked = [...list];
    const bad = picked.find((f) => !ALLOWED.includes(f.type) && !/\.(pdf|jpe?g|png|webp|heic)$/i.test(f.name));
    const big = picked.find((f) => f.size > MAX_BYTES);
    setError(bad ? `${bad.name} isn’t a supported file. Use PDF, JPG, PNG or HEIC.` : big ? `${big.name} is larger than 10 MB.` : null);
    setFiles((prev) => [...prev, ...picked.filter((f) => f !== bad && f.size <= MAX_BYTES)].slice(0, 5));
  }

  async function submit() {
    const token = getToken();
    if (!token || files.length === 0) return;
    setBusy(true);
    setError(null);
    try {
      const today = new Date().toISOString().slice(0, 10);
      const records = await Promise.all(
        files.map((f, i) =>
          api.uploadRecord({
            kind: 'prescription',
            title: files.length > 1 ? `Uploaded prescription (${i + 1} of ${files.length})` : 'Uploaded prescription',
            doctorName: doctorName.trim(),
            date: today,
            fileName: f.name,
            fileSize: f.size,
            mimeType: f.type || (f.name.toLowerCase().endsWith('.pdf') ? 'application/pdf' : 'image/jpeg'),
          }, token).then((r) => r.record),
        ),
      );
      setFiles([]);
      onUploaded(records);
    } catch (e) {
      setError(errorMessage(e));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); addFiles(e.dataTransfer.files); }}
        className="w-full p-8 sm:p-10 rounded-xl border-2 border-dashed border-[#E7E5E4] bg-[#FAFAF9] hover:border-primary-container flex flex-col items-center gap-2 text-center transition"
      >
        <span className="material-symbols-outlined text-[36px] text-[#78716C]">upload_file</span>
        <span className="font-body-strong text-body-strong text-[#1C1917]">Tap to choose files or drag them here</span>
        <span className="font-caption text-caption text-[#78716C]">PDF, JPG, PNG or HEIC · up to 10 MB each · max 5 files</span>
      </button>
      <input ref={inputRef} type="file" accept={ACCEPT} multiple hidden onChange={(e) => { addFiles(e.target.files); e.target.value = ''; }} />
      {error && <p role="alert" className="font-caption text-caption text-[#8E0E17]">{error}</p>}
      {files.length > 0 && (
        <>
          <ul className="divide-y divide-[#E7E5E4] rounded-xl border border-[#E7E5E4] bg-white">
            {files.map((f, i) => (
              <li key={`${f.name}-${i}`} className="flex items-center gap-3 px-4 py-3">
                <span className="material-symbols-outlined text-[20px] text-[#78716C]">{f.type.startsWith('image/') ? 'image' : 'description'}</span>
                <span className="flex-1 min-w-0 truncate font-caption-strong text-caption-strong text-[#1C1917]">{f.name}</span>
                <span className="font-micro text-micro text-[#78716C] tabular-nums">{(f.size / 1024 / 1024).toFixed(1)} MB</span>
                <button type="button" aria-label={`Remove ${f.name}`} onClick={() => setFiles((prev) => prev.filter((_, j) => j !== i))} className="p-1 text-[#78716C] hover:text-[#1C1917]">
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </li>
            ))}
          </ul>
          <label className="block space-y-1.5">
            <span className="font-caption-strong text-caption-strong text-[#1C1917]">Prescribing doctor <span className="text-[#78716C] font-caption">(optional)</span></span>
            <input value={doctorName} onChange={(e) => setDoctorName(e.target.value)} maxLength={80} placeholder="e.g. Dr. Meera Nambiar" className="w-full h-11 px-3 bg-white border border-[#E7E5E4] rounded-lg font-body-default text-body-default outline-none focus:border-primary-container focus:ring-2 focus:ring-[rgba(193,18,31,0.15)]" />
          </label>
        </>
      )}
      <button type="button" disabled={files.length === 0 || busy} onClick={submit} className="h-12 px-6 rounded-lg bg-primary-container hover:bg-[#8E0E17] disabled:bg-[#A8A29E] text-white font-body-strong text-body-strong transition">
        {busy ? 'Uploading…' : cta}
      </button>
    </div>
  );
}
