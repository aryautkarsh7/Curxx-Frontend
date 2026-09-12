'use client';
import Link from 'next/link';
import { useRef, useState } from 'react';

const ACCEPT = 'image/jpeg,image/png,application/pdf';
const MAX_BYTES = 15 * 1024 * 1024;

export default function PrescriptionUploader() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  function addFiles(list: FileList | null) {
    if (!list) return;
    const picked = [...list];
    const tooBig = picked.find((f) => f.size > MAX_BYTES);
    setError(tooBig ? `${tooBig.name} is larger than 15 MB.` : null);
    setFiles((prev) => [...prev, ...picked.filter((f) => f.size <= MAX_BYTES)]);
  }

  if (submitted) {
    return (
      <div className="p-6 rounded-xl border border-[#A7F3D0] bg-[#ECFDF5] space-y-2">
        <h2 className="text-headline-h3 font-headline-h3 text-[#047857]">Prescription received</h2>
        <p className="text-body-default font-body-default text-on-surface-variant">Our pharmacist will call you within 10 minutes to confirm your order.</p>
        <Link href="/medicines" className="inline-block pt-2 font-caption-strong text-caption-strong text-[#D92D3A] hover:underline">Continue shopping →</Link>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); addFiles(e.dataTransfer.files); }}
        className="w-full p-10 rounded-xl border-2 border-dashed border-[#E7E5E4] bg-[#FAFAF9] hover:border-primary-container flex flex-col items-center gap-2 text-center transition"
      >
        <span className="material-symbols-outlined text-[36px] text-[#78716C]">upload_file</span>
        <span className="font-body-strong text-body-strong text-[#1C1917]">Click to choose files or drag them here</span>
        <span className="font-caption text-caption text-[#78716C]">JPG, PNG or PDF, up to 15 MB each · 100% confidential</span>
      </button>
      <input ref={inputRef} type="file" accept={ACCEPT} multiple hidden onChange={(e) => { addFiles(e.target.files); e.target.value = ''; }} />
      {error && <p className="font-caption text-caption text-[#8E0E17]">{error}</p>}
      {files.length > 0 && (
        <ul className="divide-y divide-[#E7E5E4] rounded-xl border border-[#E7E5E4]">
          {files.map((f, i) => (
            <li key={`${f.name}-${i}`} className="flex items-center gap-3 px-4 py-3">
              <span className="material-symbols-outlined text-[20px] text-[#78716C]">description</span>
              <span className="flex-1 min-w-0 truncate font-caption-strong text-caption-strong text-[#1C1917]">{f.name}</span>
              <span className="font-micro text-micro text-[#78716C]">{(f.size / 1024 / 1024).toFixed(1)} MB</span>
              <button type="button" aria-label={`Remove ${f.name}`} onClick={() => setFiles((prev) => prev.filter((_, j) => j !== i))} className="p-1 text-[#78716C] hover:text-[#1C1917]">
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </li>
          ))}
        </ul>
      )}
      <button type="button" disabled={files.length === 0} onClick={() => setSubmitted(true)} className="h-12 px-6 rounded-lg bg-primary-container hover:bg-[#8E0E17] disabled:bg-[#A8A29E] text-white font-body-strong text-body-strong transition">
        Send to Pharmacist
      </button>
    </div>
  );
}
