
'use client';
import Link from 'next/link';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function CurxxDigitalDiagnosticReportsParameterFindingsPage() {
  return (
    <>
      
<Header />
{/* MAIN CANVAS */}
<main className="flex-1 w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop py-space-xl">
{/* PAGE HEAD */}
<div className="flex flex-col md:flex-row md:items-end justify-between pb-space-lg mb-space-base border-b border-surface-variant gap-4">
<div>
<div className="flex items-center gap-2 mb-1">
<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857] text-[11px] font-semibold">
<span className="material-symbols-outlined text-xs" data-icon="verified" data-weight="fill" style={{"fontVariationSettings":"'FILL' 1"}}>verified</span>
            NABL Accredited Laboratory Network
          </span>
<span className="text-caption font-caption text-on-surface-variant">ABHA Health Locker Connected</span>
</div>
<h1 className="text-headline-h1 font-headline-h1 text-on-surface tracking-tight">Diagnostic Reports &amp; Health Records</h1>
<p className="text-body-default font-body-default text-on-surface-variant mt-1">
          Access verified NABL lab test results, longitudinal trend tracking, and pathologist interpretations.
        </p>
</div>
{/* Quick Utility Actions */}
<div className="flex items-center gap-2">
<button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface-container-lowest border border-surface-variant text-on-surface text-caption-strong font-caption-strong hover:bg-surface-container transition-colors">
<span className="material-symbols-outlined text-base" data-icon="filter_list">filter_list</span>
          Filter by Date
        </button>
<Link href="/records" className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface-container-lowest border border-surface-variant text-on-surface text-caption-strong font-caption-strong hover:bg-surface-container transition-colors">
<span className="material-symbols-outlined text-base" data-icon="file_upload">file_upload</span>
          Upload External Report
        </Link>
</div>
</div>
{/* RECENT REPORTS SWITCHER ROW */}
<div className="mb-space-xl">
<div className="flex items-center justify-between mb-space-sm">
<h2 className="text-headline-h3 font-headline-h3 text-on-surface">Recent Diagnostic Reports (3)</h2>
<span className="text-caption font-caption text-on-surface-variant">Tap to inspect findings</span>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
{/* Report 1: Active Selection */}
<div className="bg-[#FFF1F2] border-2 border-secondary-container rounded-xl p-4 relative shadow-sm transition duration-150">
<div className="flex items-start justify-between mb-2">
<span className="px-2 py-0.5 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857] text-[11px] font-semibold flex items-center gap-1">
<span className="material-symbols-outlined text-xs" data-icon="check_circle">check_circle</span>
              Ready (Verified)
            </span>
<span className="text-micro font-micro text-[#8E0E17] font-semibold px-2 py-0.5 bg-white rounded border border-[#F9C6C9]">Active Selection</span>
</div>
<h3 className="text-headline-h3 font-headline-h3 text-on-surface font-semibold mb-1">Comprehensive Full Body Checkup</h3>
<p className="text-caption font-caption text-on-surface-variant mb-3">Rahul Sharma • Collected: 14 Oct 2025</p>
<div className="flex items-center justify-between pt-2 border-t border-[#F9C6C9]/60">
<button className="text-caption-strong font-caption-strong text-primary flex items-center gap-1">
<span>View Full Report</span>
<span className="material-symbols-outlined text-sm" data-icon="arrow_forward">arrow_forward</span>
</button>
<div className="flex items-center space-x-1">
<button className="p-1.5 rounded text-on-surface-variant hover:text-primary transition-colors" title="Download PDF">
<span className="material-symbols-outlined text-base" data-icon="download">download</span>
</button>
<Link href="/records?share=1" className="p-1.5 rounded text-on-surface-variant hover:text-primary transition-colors" title="Share">
<span className="material-symbols-outlined text-base" data-icon="share">share</span>
</Link>
</div>
</div>
</div>
{/* Report 2: Secondary Report Card */}
<div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-4 hover:border-outline transition duration-150 cursor-pointer">
<div className="flex items-start justify-between mb-2">
<span className="px-2 py-0.5 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857] text-[11px] font-semibold flex items-center gap-1">
<span className="material-symbols-outlined text-xs" data-icon="check_circle">check_circle</span>
              Ready
            </span>
<span className="text-caption font-caption text-outline">Lab ID: #CRX-72109</span>
</div>
<h3 className="text-headline-h3 font-headline-h3 text-on-surface font-semibold mb-1">HbA1c &amp; Fasting Glucose Monitor</h3>
<p className="text-caption font-caption text-on-surface-variant mb-3">Rahul Sharma • Collected: 02 Sep 2025</p>
<div className="flex items-center justify-between pt-2 border-t border-surface-variant">
<span className="text-caption font-caption text-on-surface-variant">Normal (HbA1c: 5.4%)</span>
<div className="flex items-center space-x-1">
<button className="p-1.5 rounded text-on-surface-variant hover:text-primary transition-colors" title="Download PDF">
<span className="material-symbols-outlined text-base" data-icon="download">download</span>
</button>
<Link href="/records?share=1" className="p-1.5 rounded text-on-surface-variant hover:text-primary transition-colors" title="Share">
<span className="material-symbols-outlined text-base" data-icon="share">share</span>
</Link>
</div>
</div>
</div>
{/* Report 3: Secondary Report Card */}
<div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-4 hover:border-outline transition duration-150 cursor-pointer">
<div className="flex items-start justify-between mb-2">
<span className="px-2 py-0.5 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857] text-[11px] font-semibold flex items-center gap-1">
<span className="material-symbols-outlined text-xs" data-icon="check_circle">check_circle</span>
              Ready
            </span>
<span className="text-caption font-caption text-outline">Lab ID: #CRX-60912</span>
</div>
<h3 className="text-headline-h3 font-headline-h3 text-on-surface font-semibold mb-1">Lipid &amp; Cardiac Risk Profile</h3>
<p className="text-caption font-caption text-on-surface-variant mb-3">Rahul Sharma • Collected: 15 Jun 2025</p>
<div className="flex items-center justify-between pt-2 border-t border-surface-variant">
<span className="text-caption font-caption text-on-surface-variant">Triglycerides elevated</span>
<div className="flex items-center space-x-1">
<button className="p-1.5 rounded text-on-surface-variant hover:text-primary transition-colors" title="Download PDF">
<span className="material-symbols-outlined text-base" data-icon="download">download</span>
</button>
<Link href="/records?share=1" className="p-1.5 rounded text-on-surface-variant hover:text-primary transition-colors" title="Share">
<span className="material-symbols-outlined text-base" data-icon="share">share</span>
</Link>
</div>
</div>
</div>
</div>
</div>
{/* ACTIVE REPORT DETAIL CONTAINER */}
<section className="bg-surface-container-lowest border border-surface-variant rounded-xl overflow-hidden shadow-sm mb-space-2xl">
{/* Patient & Clinical Verification Header Bar */}
<div className="bg-surface-container-low border-b border-surface-variant p-space-base">
<div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
<div className="flex flex-wrap items-center gap-y-2 gap-x-6">
<div>
<span className="text-micro font-micro uppercase tracking-wider text-outline block">Patient Details</span>
<span className="text-body-strong font-body-strong text-on-surface">Rahul Sharma</span>
<span className="text-caption font-caption text-on-surface-variant ml-1">(Male, 34 Yrs)</span>
</div>
<div className="border-l border-surface-variant pl-4">
<span className="text-micro font-micro uppercase tracking-wider text-outline block">Home Collection</span>
<span className="text-caption-strong font-caption-strong text-on-surface">Nurse Anand K.</span>
</div>
<div className="border-l border-surface-variant pl-4">
<span className="text-micro font-micro uppercase tracking-wider text-outline block">Consultant Pathologist</span>
<span className="text-caption-strong font-caption-strong text-on-surface">Dr. Shalini Verma, MD</span>
<span className="text-caption font-caption text-on-surface-variant block">NABL Lab ID: NABL-BLR-092</span>
</div>
<div className="border-l border-surface-variant pl-4">
<span className="text-micro font-micro uppercase tracking-wider text-outline block">Timeline</span>
<span className="text-caption font-caption text-on-surface">Sample: <strong>14 Oct 2025</strong> | Verified: <strong>15 Oct 2025</strong></span>
</div>
</div>
<div className="flex items-center gap-3">
<span className="text-caption font-caption text-outline font-mono">Barcode #CRX-882194</span>
<span className="px-2.5 py-1 rounded bg-white border border-surface-variant text-caption-strong font-caption-strong text-primary flex items-center gap-1">
<span className="material-symbols-outlined text-sm" data-icon="lock">lock</span>
              Digitally Signed
            </span>
</div>
</div>
</div>
{/* Detail Body Canvas */}
<div className="p-space-base md:p-space-lg space-y-space-lg">
{/* CLINICAL SUMMARY: ABNORMAL FINDINGS FIRST CARD */}
<div className="bg-[#FFF1F2] border border-[#F9C6C9] rounded-xl p-space-base">
<div className="flex items-start gap-3">
<div className="w-8 h-8 rounded-lg bg-[#c1121f] text-white flex items-center justify-center shrink-0 mt-0.5">
<span className="material-symbols-outlined text-lg" data-icon="warning">warning</span>
</div>
<div className="flex-1">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
<h3 className="text-headline-h3 font-headline-h3 text-[#8E0E17] font-semibold">
                  3 Parameters Require Clinical Attention
                </h3>
<span className="text-micro font-micro text-[#8E0E17] bg-white px-2 py-0.5 rounded border border-[#F9C6C9]">
                  Pathologist Review Completed
                </span>
</div>
<p className="text-caption font-caption text-on-surface-variant mb-4">
                Clinical note: <strong className="text-on-surface">Mild hypertriglyceridemia and Vitamin D deficiency detected. Correlate clinically.</strong> Consultation advised within 7 days.
              </p>
{/* Abnormal Parameters Micro Grid */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-3">
{/* Abnormal 1 */}
<div className="bg-white rounded-lg p-3 border border-[#F9C6C9] flex flex-col justify-between">
<div>
<div className="flex items-center justify-between mb-1">
<span className="text-caption-strong font-caption-strong text-on-surface">Vitamin D (25-OH)</span>
<span className="inline-flex items-center gap-0.5 text-micro font-micro text-[#8E0E17] bg-[#FFF1F2] px-1.5 py-0.5 rounded font-semibold">
<span className="material-symbols-outlined text-xs" data-icon="arrow_downward">arrow_downward</span> Deficient
                      </span>
</div>
<div className="text-headline-h2 font-headline-h2 font-bold text-[#8E0E17]">
                      14.2 <span className="text-caption font-caption text-on-surface-variant font-normal">ng/mL</span>
</div>
</div>
<div className="mt-2 pt-2 border-t border-surface-variant text-micro font-micro text-on-surface-variant">
                    Normal Ref: <span className="font-medium text-on-surface">30.0 - 100.0 ng/mL</span>
</div>
</div>
{/* Abnormal 2 */}
<div className="bg-white rounded-lg p-3 border border-[#F9C6C9] flex flex-col justify-between">
<div>
<div className="flex items-center justify-between mb-1">
<span className="text-caption-strong font-caption-strong text-on-surface">Serum Triglycerides</span>
<span className="inline-flex items-center gap-0.5 text-micro font-micro text-[#8E0E17] bg-[#FFF1F2] px-1.5 py-0.5 rounded font-semibold">
<span className="material-symbols-outlined text-xs" data-icon="arrow_upward">arrow_upward</span> Borderline High
                      </span>
</div>
<div className="text-headline-h2 font-headline-h2 font-bold text-[#8E0E17]">
                      198 <span className="text-caption font-caption text-on-surface-variant font-normal">mg/dL</span>
</div>
</div>
<div className="mt-2 pt-2 border-t border-surface-variant text-micro font-micro text-on-surface-variant">
                    Desirable Ref: <span className="font-medium text-on-surface">&lt; 150 mg/dL</span>
</div>
</div>
{/* Abnormal 3 */}
<div className="bg-white rounded-lg p-3 border border-[#F9C6C9] flex flex-col justify-between">
<div>
<div className="flex items-center justify-between mb-1">
<span className="text-caption-strong font-caption-strong text-on-surface">SGPT / ALT (Liver)</span>
<span className="inline-flex items-center gap-0.5 text-micro font-micro text-[#8E0E17] bg-[#FFF1F2] px-1.5 py-0.5 rounded font-semibold">
<span className="material-symbols-outlined text-xs" data-icon="arrow_upward">arrow_upward</span> Mild Elevation
                      </span>
</div>
<div className="text-headline-h2 font-headline-h2 font-bold text-[#8E0E17]">
                      58 <span className="text-caption font-caption text-on-surface-variant font-normal">U/L</span>
</div>
</div>
<div className="mt-2 pt-2 border-t border-surface-variant text-micro font-micro text-on-surface-variant">
                    Normal Ref: <span className="font-medium text-on-surface">&lt; 45 U/L</span>
</div>
</div>
</div>
</div>
</div>
</div>
{/* PRIMARY ACTION BAR ABOVE RESULTS */}
<div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 bg-surface-container-low rounded-lg border border-surface-variant">
<div className="flex items-center gap-2 w-full sm:w-auto">
<Link href="/bangalore/doctors" className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-primary-container text-white font-caption-strong text-caption-strong hover:bg-[#8E0E17] transition-colors flex items-center justify-center gap-1.5 shadow-sm">
<span className="material-symbols-outlined text-base" data-icon="stethoscope">stethoscope</span>
              Consult a Doctor About This Report (Free Follow-up)
            </Link>
</div>
<div className="flex items-center gap-2 w-full sm:w-auto justify-end">
<button className="flex-1 sm:flex-initial px-3.5 py-2 rounded-lg bg-surface-container-lowest border border-surface-variant text-on-surface font-caption-strong text-caption-strong hover:bg-surface-container transition-colors flex items-center justify-center gap-1">
<span className="material-symbols-outlined text-base" data-icon="picture_as_pdf">picture_as_pdf</span>
              Download Smart PDF
            </button>
<Link href="/records?share=1" className="flex-1 sm:flex-initial px-3.5 py-2 rounded-lg bg-surface-container-lowest border border-surface-variant text-on-surface font-caption-strong text-caption-strong hover:bg-surface-container transition-colors flex items-center justify-center gap-1">
<span className="material-symbols-outlined text-base" data-icon="share">share</span>
              Share with Doctor
            </Link>
</div>
</div>
{/* DIAGNOSTIC RESULTS TABLE GROUPED BY SECTION */}
<div className="space-y-space-base">
<div className="flex items-center justify-between">
<h3 className="text-headline-h3 font-headline-h3 text-on-surface">Parameter Findings (14 Tests Analyzed)</h3>
<span className="text-micro font-micro text-outline">Verified under ISO 15189 / NABL standards</span>
</div>
{/* Section 1: Lipid Profile */}
<div className="border border-surface-variant rounded-xl overflow-hidden">
<div className="bg-surface-container px-4 py-2.5 flex items-center justify-between border-b border-surface-variant">
<span className="text-caption-strong font-caption-strong text-on-surface flex items-center gap-2">
<span className="material-symbols-outlined text-base text-primary" data-icon="monitor_heart">monitor_heart</span>
                Section 1: Lipid Profile
              </span>
<span className="text-micro font-micro text-on-surface-variant">Fasting Blood Serum</span>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="text-micro font-micro uppercase tracking-wider text-outline bg-surface-container-lowest border-b border-surface-variant">
<th className="py-2.5 px-4 font-semibold">Parameter</th>
<th className="py-2.5 px-4 font-semibold">Observed Result</th>
<th className="py-2.5 px-4 font-semibold">Reference Range</th>
<th className="py-2.5 px-4 font-semibold">Clinical Status</th>
</tr>
</thead>
<tbody className="divide-y divide-surface-variant text-caption font-caption">
{/* Row 1 */}
<tr className="hover:bg-surface-container-low transition-colors">
<td className="py-3 px-4 font-medium text-on-surface">Total Cholesterol</td>
<td className="py-3 px-4 text-on-surface font-body-strong">184 <span className="text-outline font-normal">mg/dL</span></td>
<td className="py-3 px-4 text-on-surface-variant">&lt; 200 mg/dL</td>
<td className="py-3 px-4">
<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857] text-micro font-micro font-semibold">
<span className="material-symbols-outlined text-xs" data-icon="check">check</span> Normal
                      </span>
</td>
</tr>
{/* Row 2 */}
<tr className="hover:bg-surface-container-low transition-colors">
<td className="py-3 px-4 font-medium text-on-surface">HDL Cholesterol (Good)</td>
<td className="py-3 px-4 text-on-surface font-body-strong">46 <span className="text-outline font-normal">mg/dL</span></td>
<td className="py-3 px-4 text-on-surface-variant">&gt; 40 mg/dL</td>
<td className="py-3 px-4">
<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857] text-micro font-micro font-semibold">
<span className="material-symbols-outlined text-xs" data-icon="check">check</span> Normal
                      </span>
</td>
</tr>
{/* Row 3: High */}
<tr className="bg-[#FFF1F2]/40 hover:bg-[#FFF1F2] transition-colors">
<td className="py-3 px-4 font-medium text-on-surface flex items-center gap-1.5">
                      Triglycerides
                      <span className="material-symbols-outlined text-xs text-[#8E0E17]" data-icon="info">info</span>
</td>
<td className="py-3 px-4 text-[#8E0E17] font-body-strong">198 <span className="text-outline font-normal">mg/dL</span></td>
<td className="py-3 px-4 text-on-surface-variant">&lt; 150 mg/dL</td>
<td className="py-3 px-4">
<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#FFF1F2] border border-[#F9C6C9] text-[#8E0E17] text-micro font-micro font-semibold">
<span className="material-symbols-outlined text-xs" data-icon="arrow_upward">arrow_upward</span> High
                      </span>
</td>
</tr>
{/* Row 4 */}
<tr className="hover:bg-surface-container-low transition-colors">
<td className="py-3 px-4 font-medium text-on-surface">LDL Cholesterol (Calculated)</td>
<td className="py-3 px-4 text-on-surface font-body-strong">112 <span className="text-outline font-normal">mg/dL</span></td>
<td className="py-3 px-4 text-on-surface-variant">&lt; 130 mg/dL</td>
<td className="py-3 px-4">
<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857] text-micro font-micro font-semibold">
<span className="material-symbols-outlined text-xs" data-icon="check">check</span> Optimal
                      </span>
</td>
</tr>
</tbody>
</table>
</div>
</div>
{/* Section 2: Vitamins & Minerals */}
<div className="border border-surface-variant rounded-xl overflow-hidden">
<div className="bg-surface-container px-4 py-2.5 flex items-center justify-between border-b border-surface-variant">
<span className="text-caption-strong font-caption-strong text-on-surface flex items-center gap-2">
<span className="material-symbols-outlined text-base text-primary" data-icon="science">science</span>
                Section 2: Vitamins &amp; Minerals
              </span>
<span className="text-micro font-micro text-on-surface-variant">Chemiluminescence Immunoassay (CLIA)</span>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="text-micro font-micro uppercase tracking-wider text-outline bg-surface-container-lowest border-b border-surface-variant">
<th className="py-2.5 px-4 font-semibold">Parameter</th>
<th className="py-2.5 px-4 font-semibold">Observed Result</th>
<th className="py-2.5 px-4 font-semibold">Reference Range</th>
<th className="py-2.5 px-4 font-semibold">Clinical Status</th>
</tr>
</thead>
<tbody className="divide-y divide-surface-variant text-caption font-caption">
{/* Row 1: Low */}
<tr className="bg-[#FFF1F2]/40 hover:bg-[#FFF1F2] transition-colors">
<td className="py-3 px-4 font-medium text-on-surface flex items-center gap-1.5">
                      Vitamin D (25-OH)
                      <span className="material-symbols-outlined text-xs text-[#8E0E17]" data-icon="info">info</span>
</td>
<td className="py-3 px-4 text-[#8E0E17] font-body-strong">14.2 <span className="text-outline font-normal">ng/mL</span></td>
<td className="py-3 px-4 text-on-surface-variant">30.0 - 100.0 ng/mL</td>
<td className="py-3 px-4">
<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#FFF1F2] border border-[#F9C6C9] text-[#8E0E17] text-micro font-micro font-semibold">
<span className="material-symbols-outlined text-xs" data-icon="arrow_downward">arrow_downward</span> Low
                      </span>
</td>
</tr>
{/* Row 2 */}
<tr className="hover:bg-surface-container-low transition-colors">
<td className="py-3 px-4 font-medium text-on-surface">Vitamin B12</td>
<td className="py-3 px-4 text-on-surface font-body-strong">420 <span className="text-outline font-normal">pg/mL</span></td>
<td className="py-3 px-4 text-on-surface-variant">211 - 911 pg/mL</td>
<td className="py-3 px-4">
<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857] text-micro font-micro font-semibold">
<span className="material-symbols-outlined text-xs" data-icon="check">check</span> Normal
                      </span>
</td>
</tr>
{/* Row 3 */}
<tr className="hover:bg-surface-container-low transition-colors">
<td className="py-3 px-4 font-medium text-on-surface">Serum Calcium</td>
<td className="py-3 px-4 text-on-surface font-body-strong">9.4 <span className="text-outline font-normal">mg/dL</span></td>
<td className="py-3 px-4 text-on-surface-variant">8.8 - 10.2 mg/dL</td>
<td className="py-3 px-4">
<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857] text-micro font-micro font-semibold">
<span className="material-symbols-outlined text-xs" data-icon="check">check</span> Normal
                      </span>
</td>
</tr>
</tbody>
</table>
</div>
</div>
{/* Section 3: Liver Function Tests */}
<div className="border border-surface-variant rounded-xl overflow-hidden">
<div className="bg-surface-container px-4 py-2.5 flex items-center justify-between border-b border-surface-variant">
<span className="text-caption-strong font-caption-strong text-on-surface flex items-center gap-2">
<span className="material-symbols-outlined text-base text-primary" data-icon="bloodtype">bloodtype</span>
                Section 3: Liver Function Tests (LFT)
              </span>
<span className="text-micro font-micro text-on-surface-variant">Spectrophotometry</span>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="text-micro font-micro uppercase tracking-wider text-outline bg-surface-container-lowest border-b border-surface-variant">
<th className="py-2.5 px-4 font-semibold">Parameter</th>
<th className="py-2.5 px-4 font-semibold">Observed Result</th>
<th className="py-2.5 px-4 font-semibold">Reference Range</th>
<th className="py-2.5 px-4 font-semibold">Clinical Status</th>
</tr>
</thead>
<tbody className="divide-y divide-surface-variant text-caption font-caption">
{/* Row 1 */}
<tr className="hover:bg-surface-container-low transition-colors">
<td className="py-3 px-4 font-medium text-on-surface">Bilirubin Total</td>
<td className="py-3 px-4 text-on-surface font-body-strong">0.8 <span className="text-outline font-normal">mg/dL</span></td>
<td className="py-3 px-4 text-on-surface-variant">0.2 - 1.2 mg/dL</td>
<td className="py-3 px-4">
<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857] text-micro font-micro font-semibold">
<span className="material-symbols-outlined text-xs" data-icon="check">check</span> Normal
                      </span>
</td>
</tr>
{/* Row 2 */}
<tr className="hover:bg-surface-container-low transition-colors">
<td className="py-3 px-4 font-medium text-on-surface">SGOT / AST</td>
<td className="py-3 px-4 text-on-surface font-body-strong">34 <span className="text-outline font-normal">U/L</span></td>
<td className="py-3 px-4 text-on-surface-variant">&lt; 40 U/L</td>
<td className="py-3 px-4">
<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857] text-micro font-micro font-semibold">
<span className="material-symbols-outlined text-xs" data-icon="check">check</span> Normal
                      </span>
</td>
</tr>
{/* Row 3: High */}
<tr className="bg-[#FFF1F2]/40 hover:bg-[#FFF1F2] transition-colors">
<td className="py-3 px-4 font-medium text-on-surface flex items-center gap-1.5">
                      SGPT / ALT (Alanine Aminotransferase)
                      <span className="material-symbols-outlined text-xs text-[#8E0E17]" data-icon="info">info</span>
</td>
<td className="py-3 px-4 text-[#8E0E17] font-body-strong">58 <span className="text-outline font-normal">U/L</span></td>
<td className="py-3 px-4 text-on-surface-variant">&lt; 45 U/L</td>
<td className="py-3 px-4">
<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#FFF1F2] border border-[#F9C6C9] text-[#8E0E17] text-micro font-micro font-semibold">
<span className="material-symbols-outlined text-xs" data-icon="arrow_upward">arrow_upward</span> High
                      </span>
</td>
</tr>
{/* Row 4 */}
<tr className="hover:bg-surface-container-low transition-colors">
<td className="py-3 px-4 font-medium text-on-surface">Serum Albumin</td>
<td className="py-3 px-4 text-on-surface font-body-strong">4.5 <span className="text-outline font-normal">g/dL</span></td>
<td className="py-3 px-4 text-on-surface-variant">3.5 - 5.0 g/dL</td>
<td className="py-3 px-4">
<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857] text-micro font-micro font-semibold">
<span className="material-symbols-outlined text-xs" data-icon="check">check</span> Normal
                      </span>
</td>
</tr>
</tbody>
</table>
</div>
</div>
{/* Section 4: Complete Blood Count */}
<div className="border border-surface-variant rounded-xl overflow-hidden">
<div className="bg-surface-container px-4 py-2.5 flex items-center justify-between border-b border-surface-variant">
<span className="text-caption-strong font-caption-strong text-on-surface flex items-center gap-2">
<span className="material-symbols-outlined text-base text-primary" data-icon="hematology">hematology</span>
                Section 4: Complete Blood Count (CBC)
              </span>
<span className="text-micro font-micro text-on-surface-variant">Automated Cell Counter (EDTA Whole Blood)</span>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="text-micro font-micro uppercase tracking-wider text-outline bg-surface-container-lowest border-b border-surface-variant">
<th className="py-2.5 px-4 font-semibold">Parameter</th>
<th className="py-2.5 px-4 font-semibold">Observed Result</th>
<th className="py-2.5 px-4 font-semibold">Reference Range</th>
<th className="py-2.5 px-4 font-semibold">Clinical Status</th>
</tr>
</thead>
<tbody className="divide-y divide-surface-variant text-caption font-caption">
{/* Row 1 */}
<tr className="hover:bg-surface-container-low transition-colors">
<td className="py-3 px-4 font-medium text-on-surface">Hemoglobin</td>
<td className="py-3 px-4 text-on-surface font-body-strong">14.8 <span className="text-outline font-normal">g/dL</span></td>
<td className="py-3 px-4 text-on-surface-variant">13.0 - 17.0 g/dL</td>
<td className="py-3 px-4">
<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857] text-micro font-micro font-semibold">
<span className="material-symbols-outlined text-xs" data-icon="check">check</span> Normal
                      </span>
</td>
</tr>
{/* Row 2 */}
<tr className="hover:bg-surface-container-low transition-colors">
<td className="py-3 px-4 font-medium text-on-surface">Total WBC Count</td>
<td className="py-3 px-4 text-on-surface font-body-strong">7,200 <span className="text-outline font-normal">/mcL</span></td>
<td className="py-3 px-4 text-on-surface-variant">4,000 - 11,000 /mcL</td>
<td className="py-3 px-4">
<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857] text-micro font-micro font-semibold">
<span className="material-symbols-outlined text-xs" data-icon="check">check</span> Normal
                      </span>
</td>
</tr>
{/* Row 3 */}
<tr className="hover:bg-surface-container-low transition-colors">
<td className="py-3 px-4 font-medium text-on-surface">Platelet Count</td>
<td className="py-3 px-4 text-on-surface font-body-strong">2.4 <span className="text-outline font-normal">Lakhs/cumm</span></td>
<td className="py-3 px-4 text-on-surface-variant">1.5 - 4.5 Lakhs</td>
<td className="py-3 px-4">
<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857] text-micro font-micro font-semibold">
<span className="material-symbols-outlined text-xs" data-icon="check">check</span> Normal
                      </span>
</td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
{/* LONGITUDINAL TREND CHART FOR REPEAT PARAMETERS */}
<div className="border border-surface-variant rounded-xl p-space-base bg-surface-container-low">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
<div>
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-base" data-icon="trending_down">trending_down</span>
<h4 className="text-headline-h3 font-headline-h3 text-on-surface">Longitudinal Trend: Serum Triglycerides</h4>
</div>
<p className="text-caption font-caption text-on-surface-variant">Historical monitoring across 3 consecutive laboratory checks (Past 16 Months)</p>
</div>
<span className="px-2.5 py-1 rounded bg-white border border-[#F9C6C9] text-caption font-caption text-[#8E0E17] font-semibold">
              Trending Downward (-10% over 16 mos)
            </span>
</div>
{/* Trend Visual Matrix */}
<div className="bg-white border border-surface-variant rounded-lg p-4">
<div className="grid grid-cols-3 gap-2 text-center pb-3 border-b border-surface-variant mb-4">
{/* Point 1 */}
<div className="space-y-1">
<span className="text-micro font-micro text-outline block">15 Jun 2024</span>
<span className="text-headline-h3 font-headline-h3 text-[#8E0E17] font-bold">220 <span className="text-caption font-caption font-normal">mg/dL</span></span>
<span className="text-micro font-micro text-[#8E0E17] bg-[#FFF1F2] px-1.5 py-0.5 rounded inline-block">High</span>
</div>
{/* Point 2 */}
<div className="space-y-1 border-x border-surface-variant">
<span className="text-micro font-micro text-outline block">18 Jan 2025</span>
<span className="text-headline-h3 font-headline-h3 text-[#8E0E17] font-bold">205 <span className="text-caption font-caption font-normal">mg/dL</span></span>
<span className="text-micro font-micro text-[#8E0E17] bg-[#FFF1F2] px-1.5 py-0.5 rounded inline-block">High</span>
</div>
{/* Point 3 */}
<div className="space-y-1">
<span className="text-micro font-micro text-outline block">14 Oct 2025 (Current)</span>
<span className="text-headline-h3 font-headline-h3 text-[#8E0E17] font-bold">198 <span className="text-caption font-caption font-normal">mg/dL</span></span>
<span className="text-micro font-micro text-[#8E0E17] bg-[#FFF1F2] px-1.5 py-0.5 rounded inline-block">Borderline High</span>
</div>
</div>
{/* SVG Visual Curve Container */}
<div className="relative h-28 w-full flex items-end">
<svg className="w-full h-24 overflow-visible" preserveAspectRatio="none" viewBox="0 0 600 90">
{/* Desirable reference zone */}
<rect fill="#ECFDF5" height="30" opacity="0.6" width="600" x="0" y="60" />
<line stroke="#047857" stroke-dasharray="4 4" strokeWidth="1" x1="0" x2="600" y1="60" y2="60" />
<text fill="#047857" font-family="Inter" font-size="10" font-weight="600" x="10" y="55">Desirable Threshold: &lt; 150 mg/dL</text>
{/* Trend Line */}
<path d="M 50 15 L 300 35 L 550 45" fill="none" stroke="#C1121F" strokeLinecap="round" strokeWidth="2.5" />
{/* Data Nodes */}
<circle cx="50" cy="15" fill="#FFFFFF" r="4.5" stroke="#C1121F" strokeWidth="2.5" />
<circle cx="300" cy="35" fill="#FFFFFF" r="4.5" stroke="#C1121F" strokeWidth="2.5" />
<circle cx="550" cy="45" fill="#C1121F" r="5" stroke="#FFFFFF" strokeWidth="2" />
</svg>
</div>
<div className="flex items-center justify-between text-micro font-micro text-outline pt-2">
<span>Jun 2024 (Baseline)</span>
<span>Jan 2025 (Review)</span>
<span className="font-semibold text-primary">Oct 2025 (Latest)</span>
</div>
</div>
</div>
{/* DOCTOR CONSULTATION CTA BAND */}
<div className="bg-surface-container-low border border-surface-variant rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
<div className="flex items-center space-x-3.5 w-full md:w-auto">
<img loading="lazy" decoding="async" className="w-12 h-12 rounded-lg border border-surface-variant object-cover shrink-0" data-alt="A warm and professional medical portrait of Dr. Priya Sharma, an Indian female general physician wearing a white lab coat with a stethoscope around her neck, smiling confidently in a modern bright consultation clinic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGen1BTpUlOkTBO8c3YfM9jkLFx4tw_GfkFZCXKzO15djsTdGLtKWfFKc2o5FdeGd_zr3Ng10zetm87tjTKA3obE9PI209OM5bNwNdj94vFTGL3KbmQfZESC37gwfOitXOXQ_wET3bco2pGNdnodxxsBWsV1EvxW7nka0qubNxPvihXQajQfueVIQDXvb8PEtC125nd94oxxOaW-23FjiTk-xkC6GljlPs4RBc_94EQ6mP1CMcJO6B=w96"/>
<div>
<div className="flex items-center gap-1.5">
<h4 className="text-body-strong font-body-strong text-on-surface">Dr. Priya Sharma, MD</h4>
<span className="px-1.5 py-0.2 rounded bg-[#ECFDF5] text-[#047857] text-[10px] font-semibold border border-[#A7F3D0]">Available Now</span>
</div>
<p className="text-caption font-caption text-on-surface-variant">General Physician &amp; Internal Medicine Specialist • 11 Yrs Exp</p>
<p className="text-micro font-micro text-outline">Discuss these results with a certified specialist today. 100% confidential &amp; covered under Curxx Care.</p>
</div>
</div>
<div className="flex items-center gap-3 w-full md:w-auto justify-end">
<div className="text-right hidden sm:block">
<span className="text-caption-strong font-caption-strong text-on-surface block">₹0 Consultation Fee</span>
<span className="text-micro font-micro text-[#047857]">Included in Lab Package</span>
</div>
<Link href="/consult/lobby/cx-88421" className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-primary-container text-white font-caption-strong text-caption-strong hover:bg-[#8E0E17] transition-colors shadow-sm flex items-center justify-center gap-1.5">
<span className="material-symbols-outlined text-base" data-icon="video_call">video_call</span>
              Book Instant Consult
            </Link>
</div>
</div>
</div>
</section>
</main>
<Footer />

    </>
  );
}
