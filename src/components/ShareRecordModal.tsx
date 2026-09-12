'use client';
import { useEffect, useState } from 'react';

const DURATION_ON = 'h-9 rounded-lg border-2 border-primary bg-[#FFF1F2] text-caption-strong font-caption-strong text-primary shadow-xs';
const DURATION_OFF = 'h-9 rounded-lg border border-surface-variant bg-surface-container-low text-caption font-caption text-on-surface-variant hover:bg-surface-variant transition-colors';
const EXPIRY: Record<string, string> = {
  '1 Hour': 'Today, in 1 hour',
  '24 Hours': 'Tomorrow, 11:30 AM IST',
  '7 Days': 'in 7 days',
  'Custom Date': 'the date you choose',
};

type Props = { open: boolean; recordName: string; onClose: () => void; onShared: () => void };

/** Stitch "Share Medical Record" modal, rendered over the Health Records page. */
export default function ShareRecordModal({ open, recordName, onClose, onShared }: Props) {
  const [duration, setDuration] = useState('24 Hours');

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
<div className="fixed inset-0 bg-[#1C1917]/40 z-[74] backdrop-blur-[2px] transition-opacity"></div>
<div onClick={(e) => { if (!(e.target as HTMLElement).closest('[data-panel]')) onClose(); }} className="fixed inset-0 z-[75] flex items-center justify-center p-4 overflow-y-auto">
<div data-panel role="dialog" aria-modal="true" aria-labelledby="share-record-title" className="relative w-full max-w-[560px] bg-surface-container-lowest rounded-2xl border border-surface-variant shadow-[0_8px_30px_rgb(0,0,0,0.12)] my-auto transition-all transform animate-in fade-in zoom-in duration-200">
{/* Modal Header */}
<div className="px-6 pt-6 pb-4 border-b border-surface-variant flex items-start justify-between">
<div>
<div className="flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-primary"></span>
<h2 id="share-record-title" className="text-headline-h2 font-headline-h2 font-bold text-on-surface">Share Medical Record</h2>
</div>
<p className="text-caption font-caption text-on-surface-variant mt-1">
            Sharing: <span className="font-medium text-on-surface">{recordName}</span>
          </p>
</div>
<button type="button" onClick={onClose} aria-label="Close modal" className="text-on-surface-variant hover:text-on-surface p-1 rounded-lg hover:bg-surface-container transition-colors">
<span className="material-symbols-outlined text-[20px]">close</span>
</button>
</div>
{/* Security & Consent Banner */}
<div className="px-6 pt-4">
<div className="bg-[#FFF1F2] border border-[#F9C6C9] rounded-xl p-3 flex items-start gap-2.5">
<span className="material-symbols-outlined text-primary text-[18px] mt-0.5 shrink-0">lock</span>
<p className="text-caption font-caption text-on-surface leading-tight">
<strong className="font-semibold text-primary">Digital Personal Data Protection (DPDP) Act Compliant.</strong> You can revoke access at any second from your Access Log.
          </p>
</div>
</div>
{/* Share Method Tabs */}
<div className="px-6 pt-4">
<div className="flex border-b border-surface-variant text-caption-strong font-caption-strong">
<button type="button" className="pb-2.5 px-2 border-b-2 border-primary text-primary flex items-center gap-1.5 focus:outline-none">
<span className="material-symbols-outlined text-[18px]">stethoscope</span>
<span>Share with Doctor / Clinic</span>
</button>
<button className="pb-2.5 px-3 text-on-surface-variant hover:text-on-surface flex items-center gap-1.5 focus:outline-none transition-colors">
<span className="material-symbols-outlined text-[18px]">link</span>
<span>Generate Secure Link</span>
</button>
</div>
</div>
{/* Modal Body Content */}
<div className="px-6 py-4 space-y-5">
{/* 1. Doctor Search Field & Candidates */}
<div>
<label className="block text-caption-strong font-caption-strong text-on-surface mb-1.5">
            Search verified doctor by name, registration number or clinic
          </label>
<div className="relative">
<span className="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant text-[20px]">search</span>
<input className="w-full h-11 pl-10 pr-10 text-body-default font-body-default bg-surface-container-lowest border border-primary rounded-lg focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all" placeholder="e.g. Dr. Priya Sharma, Manipal Hospital" type="text" defaultValue="Dr. Priya Sharma"/>
<span className="material-symbols-outlined absolute right-3 top-2.5 text-[#047857] text-[20px]" title="ABDM Verified">verified</span>
</div>
{/* Selectable recipient doctor cards */}
<div className="mt-2.5 space-y-2">
{/* Doctor 1 (Selected State) */}
<div className="p-3 bg-[#FFF1F2] border-2 border-primary rounded-xl flex items-center justify-between cursor-pointer transition-all">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-lg bg-surface-container-low border border-outline-variant overflow-hidden flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-primary text-[24px]">person</span>
</div>
<div>
<div className="flex items-center gap-2">
<span className="text-body-strong font-body-strong text-on-surface">Dr. Priya Sharma, MD</span>
<span className="inline-flex items-center px-1.5 py-0.2 text-[11px] font-semibold bg-[#ECFDF5] text-[#047857] border border-[#A7F3D0] rounded">
<span className="material-symbols-outlined text-[12px] mr-0.5">check</span> Curxx Verified
                    </span>
</div>
<p className="text-caption font-caption text-on-surface-variant">Dermatologist · Reg #KA-48192</p>
<p className="text-micro font-micro text-on-surface-variant flex items-center gap-1 mt-0.5">
<span className="material-symbols-outlined text-[13px] text-on-surface-variant">location_on</span> Manipal Clinic, Indiranagar
                  </p>
</div>
</div>
<div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-on-primary">
<span className="material-symbols-outlined text-[16px]">check</span>
</div>
</div>
{/* Doctor 2 (Unselected State) */}
<div className="p-3 bg-surface-container-lowest border border-surface-variant hover:border-outline rounded-xl flex items-center justify-between cursor-pointer transition-all">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-on-surface-variant shrink-0">
<span className="material-symbols-outlined text-[24px]">person</span>
</div>
<div>
<div className="flex items-center gap-2">
<span className="text-body-strong font-body-strong text-on-surface">Dr. Anand Joshi, MBBS, MD</span>
<span className="text-micro font-micro text-on-surface-variant">Reg #KA-19382</span>
</div>
<p className="text-caption font-caption text-on-surface-variant">General Physician</p>
<p className="text-micro font-micro text-on-surface-variant flex items-center gap-1 mt-0.5">
<span className="material-symbols-outlined text-[13px] text-on-surface-variant">location_on</span> Apollo Clinic, Koramangala
                  </p>
</div>
</div>
<div className="w-5 h-5 rounded-full border-2 border-outline-variant"></div>
</div>
</div>
</div>
{/* 2. Access Expiry Selector */}
<div>
<div className="flex justify-between items-center mb-1.5">
<label className="text-caption-strong font-caption-strong text-on-surface">
              Access Duration (Auto-revokes after expiry)
            </label>
<span className="text-micro font-micro text-primary font-medium">Standard 24h Clinical Cycle</span>
</div>
{/* Segmented selector buttons */}
<div className="grid grid-cols-4 gap-2">
<button type="button" onClick={() => setDuration('1 Hour')} className={duration === '1 Hour' ? DURATION_ON : DURATION_OFF}>
              1 Hour
            </button>
<button type="button" onClick={() => setDuration('24 Hours')} className={duration === '24 Hours' ? DURATION_ON : DURATION_OFF}>
              24 Hours
            </button>
<button type="button" onClick={() => setDuration('7 Days')} className={duration === '7 Days' ? DURATION_ON : DURATION_OFF}>
              7 Days
            </button>
<button type="button" onClick={() => setDuration('Custom Date')} className={duration === 'Custom Date' ? DURATION_ON : DURATION_OFF}>
              Custom Date
            </button>
</div>
<div className="flex items-center gap-1.5 mt-2 text-micro font-micro text-on-surface-variant">
<span className="material-symbols-outlined text-[15px] text-on-surface-variant">schedule</span>
<span>Access will automatically terminate on <strong className="text-on-surface">{EXPIRY[duration]}</strong>.</span>
</div>
</div>
{/* 3. Permission Level */}
<div>
<label className="block text-caption-strong font-caption-strong text-on-surface mb-1.5">
            Permission Level
          </label>
<div className="grid grid-cols-2 gap-2.5">
{/* Option 1: View Only (Selected) */}
<label className="p-3 rounded-xl border-2 border-primary bg-[#FFF1F2] flex items-start gap-2.5 cursor-pointer">
<div className="mt-0.5">
<input defaultChecked className="text-primary focus:ring-primary h-4 w-4" name="perm_level" type="radio"/>
</div>
<div>
<span className="text-caption-strong font-caption-strong text-on-surface block leading-tight">View Only (Recommended)</span>
<span className="text-micro font-micro text-on-surface-variant block mt-1 leading-snug">Doctor can inspect report in secure in-browser viewer. Download &amp; screenshot disabled.</span>
</div>
</label>
{/* Option 2: View & Download */}
<label className="p-3 rounded-xl border border-surface-variant bg-surface-container-lowest hover:border-outline-variant flex items-start gap-2.5 cursor-pointer">
<div className="mt-0.5">
<input className="text-primary focus:ring-primary h-4 w-4" name="perm_level" type="radio"/>
</div>
<div>
<span className="text-caption-strong font-caption-strong text-on-surface block leading-tight">View &amp; Download</span>
<span className="text-micro font-micro text-on-surface-variant block mt-1 leading-snug">Allows doctor to save a clinical copy to hospital EHR repository.</span>
</div>
</label>
</div>
</div>
{/* 4. Consent Confirmation Checkbox */}
<div className="pt-1">
<label className="flex items-start gap-2.5 cursor-pointer select-none">
<input defaultChecked className="rounded border-outline text-primary focus:ring-primary mt-1 h-4 w-4" type="checkbox"/>
<span className="text-caption font-caption text-on-surface leading-snug">
              I authorize Curxx to grant temporary, time-bound access of this health record to <strong className="font-medium text-on-surface">Dr. Priya Sharma</strong> in accordance with ABDM and Curxx Clinical Data Privacy guidelines.
            </span>
</label>
</div>
</div>
{/* Modal Footer */}
<div className="px-6 py-4 bg-surface-container-low rounded-b-2xl border-t border-surface-variant flex items-center justify-between">
<button type="button" onClick={onClose} className="h-11 px-5 rounded-lg border border-surface-variant bg-surface-container-lowest text-body-strong font-body-strong text-on-surface hover:bg-surface-variant transition-colors">
          Cancel
        </button>
<button type="button" onClick={onShared} className="h-11 px-6 rounded-lg bg-primary-container hover:bg-[#8E0E17] text-on-primary text-body-strong font-body-strong flex items-center gap-2 shadow-sm transition-all active:scale-[0.98]">
<span className="material-symbols-outlined text-[18px]">lock</span>
<span>Share Securely →</span>
</button>
</div>
</div>
</div>
    </>
  );
}
