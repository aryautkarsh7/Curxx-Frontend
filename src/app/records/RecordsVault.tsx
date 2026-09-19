'use client';
import Link from 'next/link';
import { useCallback, useRef, useState, type ChangeEvent } from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import ShareRecordModal from '@/components/ShareRecordModal';
import Toast, { useToast } from '@/components/Toast';

const RECORD_NAMES = ["Comprehensive Lipid Profile & HbA1c", "Dr. Priya Sharma - Dermatology Prescription", "Chest X-Ray PA View (Digital DICOM)", "Annual Family Health Policy 2025-26", "Discharge Summary - Fortis Hospital"];
const BUNDLE = `Record bundle · ${RECORD_NAMES.length} documents`;

const toSlug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

function saveFile(filename: string, contents: string, type: string) {
  const url = URL.createObjectURL(new Blob([contents], { type }));
  const link = Object.assign(document.createElement('a'), { href: url, download: filename });
  link.click();
  URL.revokeObjectURL(url);
}

export default function RecordsVault({ initialShare }: { initialShare: boolean }) {
  const [shareTarget, setShareTarget] = useState<string | null>(initialShare ? BUNDLE : null);
  const [preview, setPreview] = useState<string | null>(null);
  const [removed, setRemoved] = useState<string[]>([]);
  const [syncing, setSyncing] = useState(false);
  const [lastSynced, setLastSynced] = useState('Today, 10:45 AM');
  const [toast, showToast] = useToast();
  const fileInput = useRef<HTMLInputElement>(null);

  const closeShare = useCallback(() => setShareTarget(null), []);
  const openPicker = () => fileInput.current?.click();

  function onShared() {
    setShareTarget(null);
    showToast('Record shared securely with Dr. Priya Sharma');
  }

  function onUpload(e: ChangeEvent<HTMLInputElement>) {
    const count = e.target.files?.length ?? 0;
    if (count) showToast(`${count} document${count > 1 ? 's' : ''} uploaded to your vault`);
    e.target.value = '';
  }

  // Mock ABHA sync until the ABDM gateway is integrated.
  function syncNow() {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      setLastSynced('Just now');
      showToast('ABHA health locker synced');
    }, 1500);
  }

  function removeRecord(name: string) {
    setRemoved((prev) => [...prev, name]);
    showToast(`${name} deleted`);
  }

  function downloadRecord(name: string) {
    saveFile(`${toSlug(name)}.txt`, `Curxx Clinical Health Vault\n${name}\n(placeholder document for the prototype)\n`, 'text/plain');
  }

  function exportAll() {
    const rows = RECORD_NAMES.filter((n) => !removed.includes(n)).map((n) => `"${n.replace(/"/g, '""')}"`);
    saveFile('curxx-health-records.csv', ['Document', ...rows].join('\n'), 'text/csv');
    showToast('Export downloaded');
  }

  return (
    <>

{/* Top Sticky Header */}
<Header />
{/* Security Banner */}
<div className="w-full bg-[#FFF1F2] border-b border-[#F9C6C9]">
<div className="w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop py-2.5 flex items-center justify-between flex-wrap gap-2">
<div className="flex items-center gap-2.5">
<span className="material-symbols-outlined text-[#C1121F] text-[18px]" data-icon="lock" data-weight="fill" style={{"fontVariationSettings":"'FILL' 1"}}>lock</span>
<p className="text-caption font-caption text-[#1C1917]">
<span className="font-semibold text-primary-container">End-to-end encrypted.</span> Only you decide who sees your records. Protected under Indian DPDP Act 2023.
        </p>
</div>
<Link href="/records/access" className="text-caption-strong font-caption-strong text-primary-container underline hover:text-[#8E0E17] transition-colors">
        Manage access
      </Link>
</div>
</div>
{/* Breadcrumb & Workspace Header */}
<main className="w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop py-space-base pb-space-2xl space-y-space-lg">
{/* Top Breadcrumb */}
<nav className="flex items-center gap-2 text-caption text-[#78716C]">
<Link href="/" className="hover:text-primary transition-colors">Home</Link>
<span className="material-symbols-outlined text-[14px]" data-icon="chevron_right">chevron_right</span>
<span className="text-[#1C1917] font-semibold">Health Records</span>
<span className="text-micro bg-surface-container px-2 py-0.5 rounded text-[#78716C] ml-2">/records</span>
</nav>
{/* Page Title & Micro Summary */}
<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
<div>
<h1 className="text-headline-h1 font-headline-h1 text-[#1C1917] tracking-tight">Clinical Health Vault</h1>
<p className="text-body-default font-body-default text-[#78716C] mt-0.5">Centralized, ABDM-federated repository of diagnostic tests, prescriptions, and discharge summaries.</p>
</div>
<div className="flex flex-wrap items-center gap-3">
<button type="button" onClick={() => setShareTarget(BUNDLE)} className="inline-flex items-center gap-2 bg-surface-container-lowest border border-[#E7E5E4] px-3.5 py-2 rounded-lg text-body-strong font-body-strong text-[#1C1917] hover:bg-[#FAFAF9] transition shadow-sm active:scale-95">
<span className="material-symbols-outlined text-[18px] text-[#78716C]" data-icon="share">share</span>
<span>Share Record Bundle</span>
</button>
<button type="button" onClick={exportAll} className="inline-flex items-center gap-2 bg-surface-container-lowest border border-[#E7E5E4] px-3.5 py-2 rounded-lg text-body-strong font-body-strong text-[#1C1917] hover:bg-[#FAFAF9] transition shadow-sm active:scale-95">
<span className="material-symbols-outlined text-[18px]">download</span>
<span>Export All Records</span>
</button>
<button type="button" onClick={openPicker} className="inline-flex items-center gap-2 bg-primary-container text-white px-4 py-2 rounded-lg text-body-strong font-body-strong hover:bg-[#8E0E17] transition shadow-sm active:scale-95">
<span className="material-symbols-outlined text-[20px]" data-icon="upload_file">upload_file</span>
<span>Upload Document</span>
</button>
</div>
</div>
{/* Family Member Selector */}
<section className="bg-surface-container-lowest border border-[#E7E5E4] rounded-xl p-4">
<div className="flex items-center justify-between mb-3">
<span className="text-caption-strong font-caption-strong text-[#78716C] uppercase tracking-wider text-micro">Viewing records for:</span>
<span className="text-micro font-micro text-[#78716C]">4 registered family profiles</span>
</div>
<div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-none">
{/* Active Member (Rahul) */}
<button className="flex items-center gap-3 px-3.5 py-2 rounded-xl bg-[#FFF1F2] border-2 border-primary-container text-left transition shrink-0 relative">
<div className="relative">
<div className="h-9 w-9 rounded-lg bg-primary-container text-white flex items-center justify-center font-bold text-caption-strong">
              RV
            </div>
<span className="absolute -bottom-1 -right-1 h-4 w-4 bg-[#047857] text-white rounded-full flex items-center justify-center text-[10px] ring-2 ring-white">
<span className="material-symbols-outlined text-[10px]" data-icon="check">check</span>
</span>
</div>
<div>
<p className="text-caption-strong font-caption-strong text-[#1C1917]">Rahul Verma (Self)</p>
<p className="text-micro font-micro text-primary-container font-semibold">Primary • 34 yrs</p>
</div>
</button>
{/* Pooja Verma */}
<button className="flex items-center gap-3 px-3.5 py-2 rounded-xl bg-surface-container-lowest border border-[#E7E5E4] hover:border-[#906f6c] hover:bg-[#FAFAF9] text-left transition shrink-0">
<div className="h-9 w-9 rounded-lg bg-surface-container text-[#1C1917] flex items-center justify-center font-semibold text-caption-strong">
            PV
          </div>
<div>
<p className="text-caption font-caption font-medium text-[#1C1917]">Pooja Verma (Spouse)</p>
<p className="text-micro font-micro text-[#78716C]">31 yrs • 18 records</p>
</div>
</button>
{/* Aarav Verma */}
<button className="flex items-center gap-3 px-3.5 py-2 rounded-xl bg-surface-container-lowest border border-[#E7E5E4] hover:border-[#906f6c] hover:bg-[#FAFAF9] text-left transition shrink-0">
<div className="h-9 w-9 rounded-lg bg-surface-container text-[#1C1917] flex items-center justify-center font-semibold text-caption-strong">
            AV
          </div>
<div>
<p className="text-caption font-caption font-medium text-[#1C1917]">Aarav Verma (Son)</p>
<p className="text-micro font-micro text-[#78716C]">6 yrs • Pediatric</p>
</div>
</button>
{/* Sunita Verma */}
<button className="flex items-center gap-3 px-3.5 py-2 rounded-xl bg-surface-container-lowest border border-[#E7E5E4] hover:border-[#906f6c] hover:bg-[#FAFAF9] text-left transition shrink-0">
<div className="h-9 w-9 rounded-lg bg-surface-container text-[#1C1917] flex items-center justify-center font-semibold text-caption-strong">
            SV
          </div>
<div>
<p className="text-caption font-caption font-medium text-[#1C1917]">Sunita Verma (Mother)</p>
<p className="text-micro font-micro text-[#78716C]">64 yrs • Senior Care</p>
</div>
</button>
{/* Add Family Member */}
<button className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-dashed border-[#906f6c] text-[#1C1917] hover:bg-surface-container hover:border-primary-container transition shrink-0 text-caption-strong font-caption-strong">
<span className="material-symbols-outlined text-[18px] text-primary-container" data-icon="add">add</span>
<span>Add family member</span>
</button>
</div>
</section>
{/* ABHA (Ayushman Bharat Health Account) Status Card */}
<section className="bg-surface-container-lowest border border-[#E7E5E4] rounded-xl p-5 shadow-sm">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
{/* Left details */}
<div className="lg:col-span-8 flex items-start gap-4">
<div className="h-12 w-12 rounded-lg bg-[#ECFDF5] border border-[#A7F3D0] flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[#047857] text-[28px]" data-icon="verified_user" data-weight="fill" style={{"fontVariationSettings":"'FILL' 1"}}>verified_user</span>
</div>
<div className="space-y-1">
<div className="flex items-center flex-wrap gap-2">
<span className="text-headline-h3 font-headline-h3 text-[#1C1917]">ABHA ID Linked &amp; Active</span>
<span className="inline-flex items-center gap-1 bg-[#ECFDF5] text-[#047857] border border-[#A7F3D0] px-2.5 py-0.5 rounded-full text-micro font-semibold">
<span className="h-1.5 w-1.5 rounded-full bg-[#047857]"></span>
                Linked &amp; Verified
              </span>
<span className="text-micro px-2 py-0.5 bg-surface-container rounded font-medium text-[#78716C]">NHA Accredited</span>
</div>
<div className="flex items-center gap-2 pt-0.5">
<span className="font-mono text-body-strong font-body-strong text-[#1C1917] tracking-wider">91-4829-1029-4820</span>
<button className="p-1 text-[#78716C] hover:text-primary-container transition" title="Copy ABHA Number">
<span className="material-symbols-outlined text-[16px]" data-icon="content_copy">content_copy</span>
</button>
<span className="text-[#78716C] text-micro">(@abdm / curxx.pmjay)</span>
</div>
<p className="text-caption font-caption text-[#78716C] pt-1">
              Integrated with Ayushman Bharat Digital Mission. 8 clinical partner networks connected (Fortis, Manipal, Curxx Labs, AIIMS federated).
            </p>
</div>
</div>
{/* Right actions */}
<div className="lg:col-span-4 lg:border-l lg:border-[#E7E5E4] lg:pl-6 flex flex-col items-start lg:items-end justify-center gap-2.5">
<div className="flex items-center gap-1.5 text-micro font-micro text-[#78716C]">
<span className="material-symbols-outlined text-[14px]" data-icon="schedule">schedule</span>
<span>Last synced: {lastSynced}</span>
</div>
<div className="flex items-center gap-3 w-full lg:w-auto">
<button type="button" onClick={syncNow} disabled={syncing} className="inline-flex items-center justify-center gap-1.5 border border-[#E7E5E4] bg-white hover:bg-surface-container px-3.5 py-1.5 rounded-lg text-caption-strong font-caption-strong text-[#1C1917] transition shadow-sm w-full lg:w-auto active:scale-95">
<span className={`material-symbols-outlined text-[16px] text-primary-container${syncing ? ' animate-spin' : ''}`}>sync</span>
<span>{syncing ? 'Syncing…' : 'Sync Now'}</span>
</button>
<Link href="/records/access" className="text-caption-strong font-caption-strong text-primary-container underline hover:text-[#8E0E17] whitespace-nowrap">
              Manage ABHA Consent
            </Link>
</div>
<details className="text-micro font-micro text-[#78716C] cursor-pointer group mt-1">
<summary className="hover:text-[#1C1917] list-none flex items-center gap-1">
<span>Switch or link other ABDM Health Locker</span>
<span className="material-symbols-outlined text-[14px] group-open:rotate-180 transition-transform" data-icon="expand_more">expand_more</span>
</summary>
<div className="pt-2 text-caption text-[#1C1917] space-y-1">
<p>Need to switch ABHA or link Ayushman card? <a className="text-primary-container font-semibold underline" href="#create-abha">Create ABHA ID</a> or <a className="text-primary-container font-semibold underline" href="#link">Link Existing</a>.</p>
</div>
</details>
</div>
</div>
</section>
{/* Clinical Category Grid (4 Columns x 2 Rows) */}
<section className="space-y-3">
<div className="flex items-center justify-between">
<h2 className="text-headline-h2 font-headline-h2 text-[#1C1917]">Browse by Record Type</h2>
<span className="text-caption text-[#78716C]">69 Total clinical records indexed</span>
</div>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
{/* 1. Prescriptions */}
<div className="bg-surface-container-lowest border border-[#E7E5E4] hover:border-primary-container/60 hover:shadow-sm rounded-xl p-4 transition duration-150 cursor-pointer group">
<div className="flex items-start justify-between">
<div className="h-10 w-10 rounded-lg bg-[#FFF1F2] border border-[#F9C6C9] flex items-center justify-center text-primary-container group-hover:scale-105 transition-transform">
<span className="material-symbols-outlined text-[22px]" data-icon="prescriptions">prescriptions</span>
</div>
<span className="text-micro font-semibold px-2 py-0.5 rounded-full bg-surface-container text-[#1C1917]">14 records</span>
</div>
<h3 className="text-body-strong font-body-strong text-[#1C1917] mt-3 group-hover:text-primary-container transition-colors">Prescriptions</h3>
<p className="text-micro font-micro text-[#78716C] mt-1">Last updated: 14 Oct 2025</p>
</div>
{/* 2. Lab Reports */}
<div className="bg-surface-container-lowest border border-[#E7E5E4] hover:border-primary-container/60 hover:shadow-sm rounded-xl p-4 transition duration-150 cursor-pointer group">
<div className="flex items-start justify-between">
<div className="h-10 w-10 rounded-lg bg-[#FFF1F2] border border-[#F9C6C9] flex items-center justify-center text-primary-container group-hover:scale-105 transition-transform">
<span className="material-symbols-outlined text-[22px]" data-icon="biotechnology">chips</span>
</div>
<span className="text-micro font-semibold px-2 py-0.5 rounded-full bg-surface-container text-[#1C1917]">28 records</span>
</div>
<h3 className="text-body-strong font-body-strong text-[#1C1917] mt-3 group-hover:text-primary-container transition-colors">Lab Reports</h3>
<p className="text-micro font-micro text-[#78716C] mt-1">Last updated: 02 Nov 2025</p>
</div>
{/* 3. Scans & X-Rays */}
<div className="bg-surface-container-lowest border border-[#E7E5E4] hover:border-primary-container/60 hover:shadow-sm rounded-xl p-4 transition duration-150 cursor-pointer group">
<div className="flex items-start justify-between">
<div className="h-10 w-10 rounded-lg bg-[#FFF1F2] border border-[#F9C6C9] flex items-center justify-center text-primary-container group-hover:scale-105 transition-transform">
<span className="material-symbols-outlined text-[22px]" data-icon="radiology">radiology</span>
</div>
<span className="text-micro font-semibold px-2 py-0.5 rounded-full bg-surface-container text-[#1C1917]">6 records</span>
</div>
<h3 className="text-body-strong font-body-strong text-[#1C1917] mt-3 group-hover:text-primary-container transition-colors">Scans &amp; X-Rays</h3>
<p className="text-micro font-micro text-[#78716C] mt-1">Last updated: 18 Aug 2025</p>
</div>
{/* 4. Vaccination */}
<div className="bg-surface-container-lowest border border-[#E7E5E4] hover:border-primary-container/60 hover:shadow-sm rounded-xl p-4 transition duration-150 cursor-pointer group">
<div className="flex items-start justify-between">
<div className="h-10 w-10 rounded-lg bg-[#FFF1F2] border border-[#F9C6C9] flex items-center justify-center text-primary-container group-hover:scale-105 transition-transform">
<span className="material-symbols-outlined text-[22px]" data-icon="vaccines">vaccines</span>
</div>
<span className="text-micro font-semibold px-2 py-0.5 rounded-full bg-surface-container text-[#1C1917]">8 records</span>
</div>
<h3 className="text-body-strong font-body-strong text-[#1C1917] mt-3 group-hover:text-primary-container transition-colors">Vaccination</h3>
<p className="text-micro font-micro text-[#78716C] mt-1">Last updated: 12 Jan 2025</p>
</div>
{/* 5. Insurance & Claims */}
<div className="bg-surface-container-lowest border border-[#E7E5E4] hover:border-primary-container/60 hover:shadow-sm rounded-xl p-4 transition duration-150 cursor-pointer group">
<div className="flex items-start justify-between">
<div className="h-10 w-10 rounded-lg bg-[#FFF1F2] border border-[#F9C6C9] flex items-center justify-center text-primary-container group-hover:scale-105 transition-transform">
<span className="material-symbols-outlined text-[22px]" data-icon="policy">policy</span>
</div>
<span className="text-micro font-semibold px-2 py-0.5 rounded-full bg-surface-container text-[#1C1917]">4 records</span>
</div>
<h3 className="text-body-strong font-body-strong text-[#1C1917] mt-3 group-hover:text-primary-container transition-colors">Insurance &amp; Claims</h3>
<p className="text-micro font-micro text-[#78716C] mt-1">Last updated: 01 Jul 2025</p>
</div>
{/* 6. Hospital Bills & Receipts */}
<div className="bg-surface-container-lowest border border-[#E7E5E4] hover:border-primary-container/60 hover:shadow-sm rounded-xl p-4 transition duration-150 cursor-pointer group">
<div className="flex items-start justify-between">
<div className="h-10 w-10 rounded-lg bg-[#FFF1F2] border border-[#F9C6C9] flex items-center justify-center text-primary-container group-hover:scale-105 transition-transform">
<span className="material-symbols-outlined text-[22px]" data-icon="receipt_long">receipt_long</span>
</div>
<span className="text-micro font-semibold px-2 py-0.5 rounded-full bg-surface-container text-[#1C1917]">12 records</span>
</div>
<h3 className="text-body-strong font-body-strong text-[#1C1917] mt-3 group-hover:text-primary-container transition-colors">Hospital Bills &amp; Receipts</h3>
<p className="text-micro font-micro text-[#78716C] mt-1">Last updated: 14 Oct 2025</p>
</div>
{/* 7. Discharge Summaries */}
<div className="bg-surface-container-lowest border border-[#E7E5E4] hover:border-primary-container/60 hover:shadow-sm rounded-xl p-4 transition duration-150 cursor-pointer group">
<div className="flex items-start justify-between">
<div className="h-10 w-10 rounded-lg bg-[#FFF1F2] border border-[#F9C6C9] flex items-center justify-center text-primary-container group-hover:scale-105 transition-transform">
<span className="material-symbols-outlined text-[22px]" data-icon="local_hospital">local_hospital</span>
</div>
<span className="text-micro font-semibold px-2 py-0.5 rounded-full bg-surface-container text-[#1C1917]">2 records</span>
</div>
<h3 className="text-body-strong font-body-strong text-[#1C1917] mt-3 group-hover:text-primary-container transition-colors">Discharge Summaries</h3>
<p className="text-micro font-micro text-[#78716C] mt-1">Last updated: Mar 2024</p>
</div>
{/* 8. Other Documents */}
<div className="bg-surface-container-lowest border border-[#E7E5E4] hover:border-primary-container/60 hover:shadow-sm rounded-xl p-4 transition duration-150 cursor-pointer group">
<div className="flex items-start justify-between">
<div className="h-10 w-10 rounded-lg bg-[#FFF1F2] border border-[#F9C6C9] flex items-center justify-center text-primary-container group-hover:scale-105 transition-transform">
<span className="material-symbols-outlined text-[22px]" data-icon="folder_open">folder_open</span>
</div>
<span className="text-micro font-semibold px-2 py-0.5 rounded-full bg-surface-container text-[#1C1917]">3 records</span>
</div>
<h3 className="text-body-strong font-body-strong text-[#1C1917] mt-3 group-hover:text-primary-container transition-colors">Other Documents</h3>
<p className="text-micro font-micro text-[#78716C] mt-1">Last updated: Sep 2024</p>
</div>
</div>
</section>
{/* Filter & Search Bar */}
<section className="bg-surface-container-lowest border border-[#E7E5E4] rounded-xl p-3.5 shadow-sm space-y-3">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-center">
{/* Search Input */}
<div className="lg:col-span-5 relative">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#78716C] text-[18px]" data-icon="search">search</span>
<input className="w-full h-11 pl-9 pr-3 rounded-lg border border-[#E7E5E4] bg-white text-body-default font-body-default text-[#1C1917] placeholder-[#78716C] focus:border-primary-container focus:ring-2 focus:ring-[#C1121F]/15 outline-none transition" placeholder="Search by doctor, hospital, diagnosis or test name..." type="text"/>
</div>
{/* Category Dropdown */}
<div className="lg:col-span-2">
<div className="relative">
<select className="w-full h-11 px-3 pr-8 rounded-lg border border-[#E7E5E4] bg-white text-caption-strong font-caption-strong text-[#1C1917] appearance-none focus:border-primary-container outline-none">
<option>All Categories</option>
<option>Prescriptions</option>
<option>Lab Reports</option>
<option>Scans &amp; X-Rays</option>
<option>Vaccination</option>
<option>Insurance</option>
</select>
<span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-[#78716C] text-[18px] pointer-events-none" data-icon="expand_more">expand_more</span>
</div>
</div>
{/* Source Dropdown */}
<div className="lg:col-span-2">
<div className="relative">
<select className="w-full h-11 px-3 pr-8 rounded-lg border border-[#E7E5E4] bg-white text-caption-strong font-caption-strong text-[#1C1917] appearance-none focus:border-primary-container outline-none">
<option>All Sources</option>
<option>Curxx Auto-Sync</option>
<option>Uploaded by You</option>
<option>Shared by Doctor</option>
<option>ABDM Health Locker</option>
</select>
<span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-[#78716C] text-[18px] pointer-events-none" data-icon="expand_more">expand_more</span>
</div>
</div>
{/* Date Range Picker */}
<div className="lg:col-span-2">
<div className="relative">
<select className="w-full h-11 px-3 pr-8 rounded-lg border border-[#E7E5E4] bg-white text-caption-strong font-caption-strong text-[#1C1917] appearance-none focus:border-primary-container outline-none">
<option>Last 6 Months</option>
<option>Last 30 Days</option>
<option>Year 2025</option>
<option>Year 2024</option>
<option>Custom Range</option>
</select>
<span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-[#78716C] text-[18px] pointer-events-none" data-icon="calendar_month">calendar_month</span>
</div>
</div>
{/* Share Selected Action */}
<div className="lg:col-span-1 flex justify-end">
<button type="button" onClick={() => setShareTarget('Selected records')} className="h-11 w-full flex items-center justify-center gap-1 bg-surface-container hover:bg-surface-variant text-[#1C1917] rounded-lg px-2.5 text-caption-strong font-caption-strong border border-[#E7E5E4] transition" title="Share selected records">
<span className="material-symbols-outlined text-[18px]" data-icon="share">share</span>
<span className="lg:hidden text-caption-strong">Share Selected</span>
</button>
</div>
</div>
</section>
{/* Recent Clinical Files Table */}
<section className="bg-surface-container-lowest border border-[#E7E5E4] rounded-xl overflow-hidden shadow-sm">
<div className="p-4 border-b border-[#E7E5E4] flex items-center justify-between bg-surface-container-low/50">
<div>
<h2 className="text-headline-h3 font-headline-h3 text-[#1C1917]">Recent Health Documents</h2>
<p className="text-caption font-caption text-[#78716C]">Showing 5 of 69 synchronized medical records</p>
</div>
<div className="flex items-center gap-2">
<button className="text-caption font-caption text-primary-container font-semibold hover:underline flex items-center gap-1">
<span className="material-symbols-outlined text-[16px]" data-icon="tune">tune</span>
            Customize Columns
          </button>
</div>
</div>
{/* Table responsive wrapper */}
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="border-b border-[#E7E5E4] bg-surface-container-low text-caption-strong font-caption-strong text-[#78716C] text-micro uppercase tracking-wider">
<th className="py-3 px-4 w-8">
<input className="rounded border-[#78716C] text-primary-container focus:ring-primary-container h-4 w-4" type="checkbox"/>
</th>
<th className="py-3 px-4">Document Name &amp; Details</th>
<th className="py-3 px-4">Category</th>
<th className="py-3 px-4">Source</th>
<th className="py-3 px-4">Date Added</th>
<th className="py-3 px-4">Format / Size</th>
<th className="py-3 px-4 text-right">Actions</th>
</tr>
</thead>
<tbody className="divide-y divide-[#E7E5E4] text-body-default font-body-default text-[#1C1917]">
{/* Row 1: Lab Reports */}
{!removed.includes("Comprehensive Lipid Profile & HbA1c") && (
<tr className="hover:bg-[#FAFAF9] transition-colors">
<td className="py-3.5 px-4">
<input className="rounded border-[#78716C] text-primary-container focus:ring-primary-container h-4 w-4" type="checkbox"/>
</td>
<td className="py-3.5 px-4">
<div className="flex items-center gap-3">
<div className="h-9 w-9 rounded-lg bg-[#FFF1F2] border border-[#F9C6C9] flex items-center justify-center text-primary-container shrink-0">
<span className="material-symbols-outlined text-[20px]" data-icon="description">description</span>
</div>
<div>
<button type="button" onClick={() => setPreview("Comprehensive Lipid Profile & HbA1c")} className="text-body-strong font-body-strong text-[#1C1917] hover:text-primary-container transition-colors">
                      Comprehensive Lipid Profile &amp; HbA1c
                    </button>
<p className="text-micro font-micro text-[#78716C]">Dr. K. S. Murthy • Curxx Diagnostic Labs Indiranagar</p>
</div>
</div>
</td>
<td className="py-3.5 px-4">
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-micro font-medium bg-surface-container text-[#1C1917]">
                  Lab Reports
                </span>
</td>
<td className="py-3.5 px-4">
<div className="inline-flex items-center gap-1.5 text-caption font-caption text-[#047857]">
<span className="material-symbols-outlined text-[16px]" data-icon="sync_saved_locally">sync_saved_locally</span>
<span>Auto-synced from Curxx Labs (NABL)</span>
</div>
</td>
<td className="py-3.5 px-4 text-caption text-[#78716C] whitespace-nowrap">
                02 Nov 2025
              </td>
<td className="py-3.5 px-4 text-caption text-[#78716C] whitespace-nowrap">
<span className="font-mono font-medium text-[#1C1917]">PDF</span> • 1.8 MB
              </td>
<td className="py-3.5 px-4 text-right whitespace-nowrap">
<div className="inline-flex items-center gap-1 text-[#78716C]">
<button type="button" onClick={() => setPreview("Comprehensive Lipid Profile & HbA1c")} className="p-1.5 hover:text-primary-container hover:bg-surface-container rounded-lg transition" title="View Document">
<span className="material-symbols-outlined text-[18px]" data-icon="visibility">visibility</span>
</button>
<button type="button" onClick={() => downloadRecord("Comprehensive Lipid Profile & HbA1c")} className="p-1.5 hover:text-primary-container hover:bg-surface-container rounded-lg transition" title="Download">
<span className="material-symbols-outlined text-[18px]" data-icon="download">download</span>
</button>
<button type="button" onClick={() => setShareTarget("Comprehensive Lipid Profile & HbA1c")} className="p-1.5 hover:text-primary-container hover:bg-surface-container rounded-lg transition" title="Share with Doctor">
<span className="material-symbols-outlined text-[18px]" data-icon="share">share</span>
</button>
<button type="button" onClick={() => removeRecord("Comprehensive Lipid Profile & HbA1c")} className="p-1.5 hover:text-[#EE1C25] hover:bg-[#FFF1F2] rounded-lg transition" title="Delete record">
<span className="material-symbols-outlined text-[18px]" data-icon="delete">delete</span>
</button>
</div>
</td>
</tr>
)}
{/* Row 2: Prescriptions */}
{!removed.includes("Dr. Priya Sharma - Dermatology Prescription") && (
<tr className="hover:bg-[#FAFAF9] transition-colors">
<td className="py-3.5 px-4">
<input className="rounded border-[#78716C] text-primary-container focus:ring-primary-container h-4 w-4" type="checkbox"/>
</td>
<td className="py-3.5 px-4">
<div className="flex items-center gap-3">
<div className="h-9 w-9 rounded-lg bg-[#FFF1F2] border border-[#F9C6C9] flex items-center justify-center text-primary-container shrink-0">
<span className="material-symbols-outlined text-[20px]" data-icon="prescriptions">prescriptions</span>
</div>
<div>
<button type="button" onClick={() => setPreview("Dr. Priya Sharma - Dermatology Prescription")} className="text-body-strong font-body-strong text-[#1C1917] hover:text-primary-container transition-colors">
                      Dr. Priya Sharma - Dermatology Prescription
                    </button>
<p className="text-micro font-micro text-[#78716C]">Rx: Isotretinoin regimen &amp; topical clindamycin • 30 days</p>
</div>
</div>
</td>
<td className="py-3.5 px-4">
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-micro font-medium bg-surface-container text-[#1C1917]">
                  Prescriptions
                </span>
</td>
<td className="py-3.5 px-4">
<div className="inline-flex items-center gap-1 text-caption font-caption text-[#1C1917]">
<span>Shared by Dr. Priya Sharma</span>
<span className="inline-flex items-center bg-[#ECFDF5] text-[#047857] text-[10px] font-bold px-1.5 rounded" title="NMC Verified">
                    ✓ Curxx Consult
                  </span>
</div>
</td>
<td className="py-3.5 px-4 text-caption text-[#78716C] whitespace-nowrap">
                14 Oct 2025
              </td>
<td className="py-3.5 px-4 text-caption text-[#78716C] whitespace-nowrap">
<span className="font-mono font-medium text-[#1C1917]">PDF</span> • 640 KB
              </td>
<td className="py-3.5 px-4 text-right whitespace-nowrap">
<div className="inline-flex items-center gap-1 text-[#78716C]">
<button type="button" onClick={() => setPreview("Dr. Priya Sharma - Dermatology Prescription")} className="p-1.5 hover:text-primary-container hover:bg-surface-container rounded-lg transition" title="View Document">
<span className="material-symbols-outlined text-[18px]" data-icon="visibility">visibility</span>
</button>
<button type="button" onClick={() => downloadRecord("Dr. Priya Sharma - Dermatology Prescription")} className="p-1.5 hover:text-primary-container hover:bg-surface-container rounded-lg transition" title="Download">
<span className="material-symbols-outlined text-[18px]" data-icon="download">download</span>
</button>
<button type="button" onClick={() => setShareTarget("Dr. Priya Sharma - Dermatology Prescription")} className="p-1.5 hover:text-primary-container hover:bg-surface-container rounded-lg transition" title="Share with Doctor">
<span className="material-symbols-outlined text-[18px]" data-icon="share">share</span>
</button>
<button type="button" onClick={() => removeRecord("Dr. Priya Sharma - Dermatology Prescription")} className="p-1.5 hover:text-[#EE1C25] hover:bg-[#FFF1F2] rounded-lg transition" title="Delete record">
<span className="material-symbols-outlined text-[18px]" data-icon="delete">delete</span>
</button>
</div>
</td>
</tr>
)}
{/* Row 3: Scans & X-Rays */}
{!removed.includes("Chest X-Ray PA View (Digital DICOM)") && (
<tr className="hover:bg-[#FAFAF9] transition-colors">
<td className="py-3.5 px-4">
<input className="rounded border-[#78716C] text-primary-container focus:ring-primary-container h-4 w-4" type="checkbox"/>
</td>
<td className="py-3.5 px-4">
<div className="flex items-center gap-3">
<div className="h-9 w-9 rounded-lg bg-[#FFF1F2] border border-[#F9C6C9] flex items-center justify-center text-primary-container shrink-0">
<span className="material-symbols-outlined text-[20px]" data-icon="radiology">radiology</span>
</div>
<div>
<button type="button" onClick={() => setPreview("Chest X-Ray PA View (Digital DICOM)")} className="text-body-strong font-body-strong text-[#1C1917] hover:text-primary-container transition-colors">
                      Chest X-Ray PA View (Digital DICOM)
                    </button>
<p className="text-micro font-micro text-[#78716C]">Manipal Hospital Radiology Dept • Clear lungs field</p>
</div>
</div>
</td>
<td className="py-3.5 px-4">
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-micro font-medium bg-surface-container text-[#1C1917]">
                  Scans &amp; X-Rays
                </span>
</td>
<td className="py-3.5 px-4">
<div className="inline-flex items-center gap-1.5 text-caption font-caption text-[#78716C]">
<span className="material-symbols-outlined text-[16px]" data-icon="account_circle">account_circle</span>
<span>Uploaded by you</span>
</div>
</td>
<td className="py-3.5 px-4 text-caption text-[#78716C] whitespace-nowrap">
                18 Aug 2025
              </td>
<td className="py-3.5 px-4 text-caption text-[#78716C] whitespace-nowrap">
<span className="font-mono font-medium text-[#1C1917]">DICOM/PDF</span> • 8.4 MB
              </td>
<td className="py-3.5 px-4 text-right whitespace-nowrap">
<div className="inline-flex items-center gap-1 text-[#78716C]">
<button type="button" onClick={() => setPreview("Chest X-Ray PA View (Digital DICOM)")} className="p-1.5 hover:text-primary-container hover:bg-surface-container rounded-lg transition" title="View Document">
<span className="material-symbols-outlined text-[18px]" data-icon="visibility">visibility</span>
</button>
<button type="button" onClick={() => downloadRecord("Chest X-Ray PA View (Digital DICOM)")} className="p-1.5 hover:text-primary-container hover:bg-surface-container rounded-lg transition" title="Download">
<span className="material-symbols-outlined text-[18px]" data-icon="download">download</span>
</button>
<button type="button" onClick={() => setShareTarget("Chest X-Ray PA View (Digital DICOM)")} className="p-1.5 hover:text-primary-container hover:bg-surface-container rounded-lg transition" title="Share with Doctor">
<span className="material-symbols-outlined text-[18px]" data-icon="share">share</span>
</button>
<button type="button" onClick={() => removeRecord("Chest X-Ray PA View (Digital DICOM)")} className="p-1.5 hover:text-[#EE1C25] hover:bg-[#FFF1F2] rounded-lg transition" title="Delete record">
<span className="material-symbols-outlined text-[18px]" data-icon="delete">delete</span>
</button>
</div>
</td>
</tr>
)}
{/* Row 4: Insurance */}
{!removed.includes("Annual Family Health Policy 2025-26") && (
<tr className="hover:bg-[#FAFAF9] transition-colors">
<td className="py-3.5 px-4">
<input className="rounded border-[#78716C] text-primary-container focus:ring-primary-container h-4 w-4" type="checkbox"/>
</td>
<td className="py-3.5 px-4">
<div className="flex items-center gap-3">
<div className="h-9 w-9 rounded-lg bg-[#FFF1F2] border border-[#F9C6C9] flex items-center justify-center text-primary-container shrink-0">
<span className="material-symbols-outlined text-[20px]" data-icon="policy">policy</span>
</div>
<div>
<button type="button" onClick={() => setPreview("Annual Family Health Policy 2025-26")} className="text-body-strong font-body-strong text-[#1C1917] hover:text-primary-container transition-colors">
                      Annual Family Health Policy 2025-26
                    </button>
<p className="text-micro font-micro text-[#78716C]">Star Health Family Optima • Sum Insured: ₹15,00,000</p>
</div>
</div>
</td>
<td className="py-3.5 px-4">
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-micro font-medium bg-surface-container text-[#1C1917]">
                  Insurance &amp; Claims
                </span>
</td>
<td className="py-3.5 px-4">
<div className="inline-flex items-center gap-1.5 text-caption font-caption text-[#78716C]">
<span className="material-symbols-outlined text-[16px]" data-icon="account_circle">account_circle</span>
<span>Uploaded by you (Star Health)</span>
</div>
</td>
<td className="py-3.5 px-4 text-caption text-[#78716C] whitespace-nowrap">
                01 Jul 2025
              </td>
<td className="py-3.5 px-4 text-caption text-[#78716C] whitespace-nowrap">
<span className="font-mono font-medium text-[#1C1917]">PDF</span> • 2.1 MB
              </td>
<td className="py-3.5 px-4 text-right whitespace-nowrap">
<div className="inline-flex items-center gap-1 text-[#78716C]">
<button type="button" onClick={() => setPreview("Annual Family Health Policy 2025-26")} className="p-1.5 hover:text-primary-container hover:bg-surface-container rounded-lg transition" title="View Document">
<span className="material-symbols-outlined text-[18px]" data-icon="visibility">visibility</span>
</button>
<button type="button" onClick={() => downloadRecord("Annual Family Health Policy 2025-26")} className="p-1.5 hover:text-primary-container hover:bg-surface-container rounded-lg transition" title="Download">
<span className="material-symbols-outlined text-[18px]" data-icon="download">download</span>
</button>
<button type="button" onClick={() => setShareTarget("Annual Family Health Policy 2025-26")} className="p-1.5 hover:text-primary-container hover:bg-surface-container rounded-lg transition" title="Share with Doctor">
<span className="material-symbols-outlined text-[18px]" data-icon="share">share</span>
</button>
<button type="button" onClick={() => removeRecord("Annual Family Health Policy 2025-26")} className="p-1.5 hover:text-[#EE1C25] hover:bg-[#FFF1F2] rounded-lg transition" title="Delete record">
<span className="material-symbols-outlined text-[18px]" data-icon="delete">delete</span>
</button>
</div>
</td>
</tr>
)}
{/* Row 5: Discharge Summary */}
{!removed.includes("Discharge Summary - Fortis Hospital") && (
<tr className="hover:bg-[#FAFAF9] transition-colors">
<td className="py-3.5 px-4">
<input className="rounded border-[#78716C] text-primary-container focus:ring-primary-container h-4 w-4" type="checkbox"/>
</td>
<td className="py-3.5 px-4">
<div className="flex items-center gap-3">
<div className="h-9 w-9 rounded-lg bg-[#FFF1F2] border border-[#F9C6C9] flex items-center justify-center text-primary-container shrink-0">
<span className="material-symbols-outlined text-[20px]" data-icon="local_hospital">local_hospital</span>
</div>
<div>
<button type="button" onClick={() => setPreview("Discharge Summary - Fortis Hospital")} className="text-body-strong font-body-strong text-[#1C1917] hover:text-primary-container transition-colors">
                      Discharge Summary - Fortis Hospital
                    </button>
<p className="text-micro font-micro text-[#78716C]">Inpatient Admission: Acute Gastroenteritis • IP No: 948201</p>
</div>
</div>
</td>
<td className="py-3.5 px-4">
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-micro font-medium bg-surface-container text-[#1C1917]">
                  Discharge Summaries
                </span>
</td>
<td className="py-3.5 px-4">
<div className="inline-flex items-center gap-1 text-caption font-caption text-[#047857]">
<span className="material-symbols-outlined text-[16px]" data-icon="verified_user">verified_user</span>
<span>ABDM Health Locker Sync</span>
</div>
</td>
<td className="py-3.5 px-4 text-caption text-[#78716C] whitespace-nowrap">
                12 Mar 2024
              </td>
<td className="py-3.5 px-4 text-caption text-[#78716C] whitespace-nowrap">
<span className="font-mono font-medium text-[#1C1917]">PDF</span> • 3.2 MB
              </td>
<td className="py-3.5 px-4 text-right whitespace-nowrap">
<div className="inline-flex items-center gap-1 text-[#78716C]">
<button type="button" onClick={() => setPreview("Discharge Summary - Fortis Hospital")} className="p-1.5 hover:text-primary-container hover:bg-surface-container rounded-lg transition" title="View Document">
<span className="material-symbols-outlined text-[18px]" data-icon="visibility">visibility</span>
</button>
<button type="button" onClick={() => downloadRecord("Discharge Summary - Fortis Hospital")} className="p-1.5 hover:text-primary-container hover:bg-surface-container rounded-lg transition" title="Download">
<span className="material-symbols-outlined text-[18px]" data-icon="download">download</span>
</button>
<button type="button" onClick={() => setShareTarget("Discharge Summary - Fortis Hospital")} className="p-1.5 hover:text-primary-container hover:bg-surface-container rounded-lg transition" title="Share with Doctor">
<span className="material-symbols-outlined text-[18px]" data-icon="share">share</span>
</button>
<button type="button" onClick={() => removeRecord("Discharge Summary - Fortis Hospital")} className="p-1.5 hover:text-[#EE1C25] hover:bg-[#FFF1F2] rounded-lg transition" title="Delete record">
<span className="material-symbols-outlined text-[18px]" data-icon="delete">delete</span>
</button>
</div>
</td>
</tr>
)}
</tbody>
</table>
</div>
{/* Pagination footer */}
<div className="px-4 py-3 border-t border-[#E7E5E4] flex items-center justify-between text-caption text-[#78716C] bg-white">
<div className="flex items-center gap-2">
<span>Rows per page:</span>
<select className="border border-[#E7E5E4] rounded px-2 py-0.5 text-caption font-semibold bg-white">
<option>10</option>
<option>25</option>
<option>50</option>
</select>
</div>
<div className="flex items-center gap-3">
<span>1 - 5 of 69 records</span>
<div className="flex items-center gap-1">
<button className="p-1 rounded border border-[#E7E5E4] hover:bg-surface-container disabled:opacity-40" disabled>
<span className="material-symbols-outlined text-[16px]" data-icon="chevron_left">chevron_left</span>
</button>
<button className="p-1 rounded border border-[#E7E5E4] hover:bg-surface-container">
<span className="material-symbols-outlined text-[16px]" data-icon="chevron_right">chevron_right</span>
</button>
</div>
</div>
</div>
</section>
{/* Clinical Consent & Storage Security Footer Callout */}
<section className="bg-surface-container border border-[#E7E5E4] rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-[#78716C] text-[24px]" data-icon="shield">shield</span>
<div>
<h4 className="text-caption-strong font-caption-strong text-[#1C1917]">Granular Clinical Revocation Guarantee</h4>
<p className="text-micro font-micro text-[#78716C]">You can revoke doctor, diagnostic center, or hospital viewer access at any moment via ABDM Consent Manager.</p>
</div>
</div>
<Link href="/records/access" className="text-caption-strong font-caption-strong text-primary-container whitespace-nowrap underline hover:text-[#8E0E17]">
        View Access Audit Log
      </Link>
</section>
</main>
{/* Floating Action Button (+ Upload record) */}
<aside className="fixed bottom-6 right-8 z-40">
<button type="button" onClick={openPicker} className="inline-flex items-center gap-2.5 bg-primary-container hover:bg-[#8E0E17] text-white px-5 py-3.5 rounded-full shadow-[0_8px_24px_rgba(193,18,31,0.25)] text-body-strong font-body-strong transition-all duration-150 active:scale-95 group">
<span className="material-symbols-outlined text-[22px] group-hover:rotate-90 transition-transform duration-200" data-icon="add">add</span>
<span>Upload record</span>
</button>
</aside>
{/* Curxx Accredited Footer */}
<input ref={fileInput} type="file" multiple accept="image/*,application/pdf" hidden onChange={onUpload} />
<ShareRecordModal open={shareTarget !== null} recordName={shareTarget ?? ''} onClose={closeShare} onShared={onShared} />
{preview && (
<div className="fixed inset-0 z-[75] flex items-center justify-center p-4" onClick={(e) => { if (!(e.target as HTMLElement).closest('[data-panel]')) setPreview(null); }}>
<div className="absolute inset-0 bg-[rgba(28,25,23,0.45)]" aria-hidden="true"></div>
<div data-panel role="dialog" aria-modal="true" aria-label={preview} className="relative w-full max-w-2xl bg-white rounded-xl border-t border-[#E7E5E4] shadow-[0_8px_24px_rgba(0,0,0,0.12)] overflow-hidden">
<div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-[#E7E5E4]">
<h2 className="font-headline-h3 text-headline-h3 text-[#1C1917] truncate">{preview}</h2>
<button type="button" onClick={() => setPreview(null)} aria-label="Close preview" className="p-1 rounded-lg text-[#78716C] hover:bg-[#FAFAF9]"><span className="material-symbols-outlined text-[20px]">close</span></button>
</div>
<div className="h-[380px] bg-[#FAFAF9] flex flex-col items-center justify-center gap-2 text-center px-6">
<span className="material-symbols-outlined text-[48px] text-[#78716C]">description</span>
<p className="font-body-strong text-body-strong text-[#1C1917]">Secure in-browser preview</p>
<p className="font-caption text-caption text-[#78716C]">End-to-end encrypted · Download and screenshot are logged in your access audit.</p>
</div>
<div className="flex justify-end gap-3 px-5 py-4 border-t border-[#E7E5E4]">
<button type="button" onClick={() => downloadRecord(preview)} className="h-10 px-4 rounded-lg border border-[#E7E5E4] hover:bg-[#FAFAF9] font-caption-strong text-caption-strong text-[#1C1917]">Download</button>
<button type="button" onClick={() => { setShareTarget(preview); setPreview(null); }} className="h-10 px-4 rounded-lg bg-primary-container hover:bg-[#8E0E17] text-white font-caption-strong text-caption-strong">Share with Doctor</button>
</div>
</div>
</div>
)}
<Toast message={toast} />
<Footer />

    </>
  );
}
