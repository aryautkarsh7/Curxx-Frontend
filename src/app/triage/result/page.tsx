
'use client';
import Link from 'next/link';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function CurxxAiSymptomTriageResultPage() {
  return (
    <>
      
<Header />
{/* MAIN CANVAS (Centered 880px container layout) */}
<main className="flex-1 py-space-xl px-margin-desktop">
<div className="max-w-[880px] mx-auto space-y-6">
{/* TOP RESULT HERO CARD */}
<section className="bg-surface-container-lowest rounded-xl border border-surface-variant p-8 shadow-sm">
{/* Clinical Confidence Trust Badge */}
<div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] mb-4">
<span className="material-symbols-outlined text-[#047857] text-[16px]" style={{"fontVariationSettings":"'FILL' 1"}}>verified</span>
<span className="text-micro font-micro font-bold tracking-wider text-[#047857] uppercase">TRIAGE COMPLETE · 94% CLINICAL CONFIDENCE</span>
</div>
{/* Recommendation Headline */}
<h1 className="text-display font-display text-on-surface tracking-tight">
          You should see a <span className="bg-primary-fixed/40 text-on-surface px-2 py-0.5 rounded-lg font-bold border border-outline-variant/60">Dermatologist</span>
</h1>
{/* Explanatory Caption */}
<p className="text-body-default font-body-default text-on-surface-variant mt-2 max-w-2xl leading-relaxed">
          Based on your reported facial redness, persistent itching for 2-3 weeks, and sensitivity flare-ups, a board-certified Dermatologist is your recommended specialist.
        </p>
{/* Summary Inset Box */}
<div className="bg-surface-container-low border border-surface-variant rounded-xl p-4 mt-6 space-y-3">
<div className="flex items-center justify-between">
<span className="text-caption-strong font-caption-strong text-outline uppercase tracking-wider text-[11px]">
              SYMPTOMS &amp; TRIGGERS RECORDED
            </span>
<span className="text-micro font-micro text-outline flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">lock</span>
              Encrypted Clinical Record
            </span>
</div>
{/* Symptom Chips Grid */}
<div className="flex flex-wrap gap-2">
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-lowest border border-surface-variant text-caption-strong font-caption-strong text-on-surface">
<span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
              Persistent Facial Rash
            </span>
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-lowest border border-surface-variant text-caption-strong font-caption-strong text-on-surface">
<span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
              Severe Itching (2-3 wks)
            </span>
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-lowest border border-surface-variant text-caption-strong font-caption-strong text-on-surface">
<span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
              Sensitivity Flare-ups
            </span>
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-lowest border border-surface-variant text-caption-strong font-caption-strong text-on-surface">
<span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
              Aggravated by Heat/Sun
            </span>
</div>
{/* Clinical Impression Note */}
<div className="pt-2 border-t border-surface-variant/80 flex items-start gap-2">
<span className="material-symbols-outlined text-outline text-[18px] shrink-0 mt-0.5">info</span>
<p className="text-caption font-caption text-on-surface-variant">
<span className="font-caption-strong text-on-surface">Likely indications:</span> Aligns with Rosacea, Contact Dermatitis, or Adult Acne vulgaris. Differential physical examination required.
            </p>
</div>
</div>
{/* Expandable Clinical Protocol Accordion */}
<details className="group mt-5 border border-surface-variant rounded-xl bg-surface-container-lowest open:bg-surface-container-low transition-colors duration-150">
<summary className="flex items-center justify-between p-3.5 cursor-pointer list-none select-none text-body-strong font-body-strong text-on-surface">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-[20px]">medical_services</span>
<span>Why this specialty? (Clinical protocol rationale)</span>
</div>
<span className="material-symbols-outlined text-outline transition-transform duration-200 group-open:rotate-180">expand_more</span>
</summary>
<div className="px-4 pb-4 pt-1 text-caption font-caption text-on-surface-variant leading-relaxed border-t border-surface-variant/60">
            Dermatologists specialize in differential diagnosis of facial dermatoses. Over-the-counter topical steroids could worsen vascular sensitivity or mask underlying pathogen involvement. Prompt physical dermoscopy eliminates misdiagnosis risks.
          </div>
</details>
</section>
{/* MATCHED DOCTORS SECTION */}
<section className="space-y-4">
{/* Header */}
<div className="flex items-end justify-between">
<div>
<h2 className="text-headline-h2 font-headline-h2 text-on-surface">Top Available Dermatologists for Your Symptoms</h2>
<p className="text-caption font-caption text-on-surface-variant mt-0.5">
              Specialists in facial erythema, sensitive skin, and acneiform conditions with slots today in Bangalore.
            </p>
</div>
<span className="text-micro font-micro text-outline bg-surface-container px-2 py-1 rounded">Bangalore Central &amp; East</span>
</div>
{/* Vertical Doctor Cards Stack */}
<div className="space-y-3.5">
{/* CARD 1: Dr. Priya Sharma */}
<div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-5 hover:border-primary-container/40 transition duration-150 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-5">
<div className="flex items-start gap-4">
{/* Doctor Avatar */}
<div className="relative shrink-0">
<img className="w-[72px] h-[72px] rounded-full object-cover border border-surface-variant shadow-xs" data-alt="A dignified close-up portrait of Dr. Priya Sharma, an Indian senior female dermatologist wearing clinical attire and a stethoscope. The setting is a clean, bright medical clinic with soft ambient lighting and modern architectural lines. The image adheres to a restrained corporate clinical aesthetic with neutral tones and clean contrasts." src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0Cw7B78BN5UtmgVbPjbGnkX-SqPNduDKiWfQYtEgXXbU_ShBuXtJCv1RHweR9IGGetcSCa9Efni2l_cjjAq8sKGKnptdneRq7FJu459fMD7aMLiixgb-aOuGSQc-IaW3tGEQA81TJaGzauZGHA5UAJcSA9LYS4780_LH-nC_rH-zEaXW_nimiIs_F9aa1gG0J_Dac6hPGJlAjv9_4ZFprhX1VKMb4Pesn9AUrx2ysiwyO5ApsChNo"/>
<span className="absolute -bottom-1 -right-1 bg-[#ECFDF5] text-[#047857] border border-[#A7F3D0] rounded-full p-0.5 flex items-center justify-center shadow-xs" title="Curxx Verified Specialist">
<span className="material-symbols-outlined text-[14px]" style={{"fontVariationSettings":"'FILL' 1"}}>check_circle</span>
</span>
</div>
{/* Doctor Details */}
<div className="space-y-1">
<div className="flex items-center gap-2">
<h3 className="text-headline-h3 font-headline-h3 text-on-surface font-bold">Dr. Priya Sharma</h3>
<span className="text-micro font-micro font-semibold bg-[#ECFDF5] text-[#047857] border border-[#A7F3D0] px-2 py-0.5 rounded-full">AIIMS Verified</span>
</div>
<p className="text-caption font-caption text-on-surface-variant">
                  Senior Dermatologist &amp; Dermatosurgeon · <span className="font-caption-strong text-on-surface">14 Yrs Exp</span> · MBBS, MD (AIIMS)
                </p>
<div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-micro font-micro text-outline">
<span className="flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">location_on</span>
                    SkinCare Super Specialty, Indiranagar
                  </span>
<span>•</span>
<span>English, Hindi, Kannada</span>
</div>
{/* Rating & Urgent Slot Pill */}
<div className="flex items-center gap-3 pt-1">
<span className="text-caption-strong font-caption-strong text-[#047857] flex items-center gap-1 bg-[#ECFDF5] px-2 py-0.5 rounded">
                    ★ 4.9 <span className="text-on-surface-variant font-caption text-[11px]">(1,240 reviews · 98% Recommended)</span>
</span>
<span className="bg-primary-fixed/50 text-primary-container border border-outline-variant/60 font-caption-strong text-micro rounded-md px-2 py-0.5 flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-ping"></span>
                    Next Slot: Today, 05:45 PM (In 20 mins)
                  </span>
</div>
</div>
</div>
{/* Booking Section */}
<div className="md:text-right shrink-0 border-t md:border-t-0 pt-3 md:pt-0 border-surface-variant flex md:flex-col justify-between items-end gap-3">
<div>
<div className="text-caption font-caption text-outline">Consultation Fee</div>
<div className="text-body-strong font-body-strong text-on-surface">
                  ₹650 <span className="text-caption font-caption text-outline">Clinic</span> · ₹349 <span className="text-caption font-caption text-outline">Video</span>
</div>
</div>
<Link href="/book" className="w-full md:w-auto h-10 px-5 bg-primary-container hover:bg-primary text-on-primary font-body-strong rounded-lg flex items-center justify-center gap-2 transition duration-150 active:scale-95 shadow-sm">
<span>Book Consultation</span>
<span className="material-symbols-outlined text-[18px]">arrow_forward</span>
</Link>
</div>
</div>
{/* CARD 2: Dr. Rajeshwari Iyer */}
<div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-5 hover:border-primary-container/40 transition duration-150 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-5">
<div className="flex items-start gap-4">
{/* Doctor Avatar */}
<div className="relative shrink-0">
<img className="w-[72px] h-[72px] rounded-full object-cover border border-surface-variant shadow-xs" data-alt="A professional studio portrait of Dr. Rajeshwari Iyer, an experienced South Indian female dermatologist with silver-streaked hair, smiling warmly in a white lab coat. The background is a clean, modern medical consultation office with soft lighting and architectural symmetry. Minimalist, high-credibility clinical setting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2vPBatCHCh2pYVE-13HXJlE0N1t8oxiOzMEN88WolNTglLJQpOey3xm4ggGCGF0vLaxKoB-K847VbVE8uFfQHX1C59CLyWLlq6rHRN68zLWMXAmH1yxXLi0GCT2Lb95LHInyO7A0cNk8oAd7qjgaZXCTaYw6cNjxdaR9uWyLP2cmIO6kkU22Qwi8-OA7bia8xPZbB74gAWZ3lm_EZYKKTrhAFKXVPbz9iwFKnXAMF-nkXl0RI4U73"/>
<span className="absolute -bottom-1 -right-1 bg-[#ECFDF5] text-[#047857] border border-[#A7F3D0] rounded-full p-0.5 flex items-center justify-center shadow-xs" title="Curxx Verified Specialist">
<span className="material-symbols-outlined text-[14px]" style={{"fontVariationSettings":"'FILL' 1"}}>check_circle</span>
</span>
</div>
{/* Doctor Details */}
<div className="space-y-1">
<div className="flex items-center gap-2">
<h3 className="text-headline-h3 font-headline-h3 text-on-surface font-bold">Dr. Rajeshwari Iyer</h3>
<span className="text-micro font-micro font-semibold bg-[#ECFDF5] text-[#047857] border border-[#A7F3D0] px-2 py-0.5 rounded-full">DNB Verified</span>
</div>
<p className="text-caption font-caption text-on-surface-variant">
                  MBBS, MD - Dermatology, DNB · <span className="font-caption-strong text-on-surface">16 Yrs Exp</span>
</p>
<div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-micro font-micro text-outline">
<span className="flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">location_on</span>
                    DermaCare Clinic, Indiranagar
                  </span>
<span>•</span>
<span>English, Tamil, Hindi</span>
</div>
{/* Rating & Urgent Slot Pill */}
<div className="flex items-center gap-3 pt-1">
<span className="text-caption-strong font-caption-strong text-[#047857] flex items-center gap-1 bg-[#ECFDF5] px-2 py-0.5 rounded">
                    ★ 4.8 <span className="text-on-surface-variant font-caption text-[11px]">(840 stories · 98% Recommended)</span>
</span>
<span className="bg-primary-fixed/50 text-primary-container border border-outline-variant/60 font-caption-strong text-micro rounded-md px-2 py-0.5 flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
                    Next Video Slot: Today, 06:15 PM
                  </span>
</div>
</div>
</div>
{/* Booking Section */}
<div className="md:text-right shrink-0 border-t md:border-t-0 pt-3 md:pt-0 border-surface-variant flex md:flex-col justify-between items-end gap-3">
<div>
<div className="text-caption font-caption text-outline">Consultation Fee</div>
<div className="text-body-strong font-body-strong text-on-surface">
                  ₹700 <span className="text-caption font-caption text-outline">Clinic</span> · ₹399 <span className="text-caption font-caption text-outline">Video</span>
</div>
</div>
<Link href="/book" className="w-full md:w-auto h-10 px-5 bg-primary-container hover:bg-primary text-on-primary font-body-strong rounded-lg flex items-center justify-center gap-2 transition duration-150 active:scale-95 shadow-sm">
<span>Book Consultation</span>
<span className="material-symbols-outlined text-[18px]">arrow_forward</span>
</Link>
</div>
</div>
{/* CARD 3: Dr. Arvind Swaminathan */}
<div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-5 hover:border-primary-container/40 transition duration-150 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-5">
<div className="flex items-start gap-4">
{/* Doctor Avatar */}
<div className="relative shrink-0">
<img className="w-[72px] h-[72px] rounded-full object-cover border border-surface-variant shadow-xs" data-alt="A portrait of Dr. Arvind Swaminathan, a senior Indian male physician and dermatologist in a clean grey necktie and professional hospital coat. Neutral hospital institute background with soft daylight illumination and sharp focus conveying authority and calm reassurance." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCliEJmss8SROw0lBubfBAWxTUecbMidqpfr3ha_zbHDcDTmhW2TFcWRi6ya9OnmDnZgD8UUEtNfOv9ksq_sQERkFUS_a6lSu2-2tF3lTcflDHMY8Q7OEzqDiw39xpfyQNTLoptlo4WhDxlInvBxCi_6NgG70x3MuC96r4qjADlXiUpkqqK3SzVjPwA7irwKUupSWu3sEN8XTukky1Mndm7XiDHWKh19-XEmGrkg3U-tUKk7paPXD6H"/>
<span className="absolute -bottom-1 -right-1 bg-[#ECFDF5] text-[#047857] border border-[#A7F3D0] rounded-full p-0.5 flex items-center justify-center shadow-xs" title="Curxx Verified Specialist">
<span className="material-symbols-outlined text-[14px]" style={{"fontVariationSettings":"'FILL' 1"}}>check_circle</span>
</span>
</div>
{/* Doctor Details */}
<div className="space-y-1">
<div className="flex items-center gap-2">
<h3 className="text-headline-h3 font-headline-h3 text-on-surface font-bold">Dr. Arvind Swaminathan</h3>
<span className="text-micro font-micro font-semibold bg-[#ECFDF5] text-[#047857] border border-[#A7F3D0] px-2 py-0.5 rounded-full">Manipal Verified</span>
</div>
<p className="text-caption font-caption text-on-surface-variant">
                  Senior Dermatologist · <span className="font-caption-strong text-on-surface">21 Yrs Exp</span>
</p>
<div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-micro font-micro text-outline">
<span className="flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">location_on</span>
                    Manipal Skin Institute, HAL Road
                  </span>
<span>•</span>
<span>English, Kannada</span>
</div>
{/* Rating & Urgent Slot Pill */}
<div className="flex items-center gap-3 pt-1">
<span className="text-caption-strong font-caption-strong text-[#047857] flex items-center gap-1 bg-[#ECFDF5] px-2 py-0.5 rounded">
                    ★ 4.9 <span className="text-on-surface-variant font-caption text-[11px]">(950 stories · 97% Recommended)</span>
</span>
<span className="bg-surface-container text-outline font-caption-strong text-micro rounded-md px-2 py-0.5 flex items-center gap-1">
<span className="material-symbols-outlined text-[13px]">calendar_today</span>
                    Next Video Slot: Tomorrow, 10:00 AM
                  </span>
</div>
</div>
</div>
{/* Booking Section */}
<div className="md:text-right shrink-0 border-t md:border-t-0 pt-3 md:pt-0 border-surface-variant flex md:flex-col justify-between items-end gap-3">
<div>
<div className="text-caption font-caption text-outline">Consultation Fee</div>
<div className="text-body-strong font-body-strong text-on-surface">
                  ₹900 <span className="text-caption font-caption text-outline">Clinic</span> · ₹499 <span className="text-caption font-caption text-outline">Video</span>
</div>
</div>
<Link href="/book" className="w-full md:w-auto h-10 px-5 bg-primary-container hover:bg-primary text-on-primary font-body-strong rounded-lg flex items-center justify-center gap-2 transition duration-150 active:scale-95 shadow-sm">
<span>Book Consultation</span>
<span className="material-symbols-outlined text-[18px]">arrow_forward</span>
</Link>
</div>
</div>
</div>
</section>
{/* SECONDARY ACTIONS & ALTERNATIVE PATHWAYS */}
<section className="pt-2 border-t border-surface-variant/70 space-y-4">
<div className="flex flex-col sm:flex-row items-center justify-between gap-3">
{/* Option A: Outlined Bangalore Directory Link */}
<Link href="/bangalore/dermatologist" className="w-full sm:w-auto px-4 py-2.5 rounded-lg border border-primary-container text-primary hover:bg-surface-container font-body-strong text-caption-strong flex items-center justify-center gap-2 transition duration-150">
<span>See all 410 Dermatologists in Bangalore</span>
<span className="material-symbols-outlined text-[16px]">arrow_forward</span>
</Link>
{/* Option B: General Physician Pathway */}
<Link href="/bangalore/general-physician" className="w-full sm:w-auto px-4 py-2.5 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container transition-colors duration-150 text-caption-strong font-caption-strong flex items-center justify-center gap-2">
<span className="material-symbols-outlined text-[18px]">stethoscope</span>
<span>Talk to a General Physician instead (Avg wait 4 mins)</span>
</Link>
</div>
{/* ABHA Health Locker Integration Link */}
<div className="flex items-center justify-center pt-2">
<Link className="text-caption font-caption text-on-surface-variant hover:text-primary transition-colors duration-150 flex items-center gap-1.5 group" href="/records">
<span className="material-symbols-outlined text-outline group-hover:text-primary text-[17px]">download</span>
<span className="underline decoration-surface-variant underline-offset-4">Save Triage Summary to ABHA Health Locker</span>
<span className="bg-[#ECFDF5] text-[#047857] text-micro px-1.5 py-0.2 rounded font-mono font-bold">ABDM ID LINKED</span>
</Link>
</div>
</section>
{/* SEPARATE RED FLAG EMERGENCY STRIP (Safety Banner) */}
<aside className="mt-8 bg-surface-container-lowest border-l-4 border-l-[#EE1C25] border border-surface-variant rounded-xl p-4 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
<div className="flex items-start gap-3">
<div className="w-8 h-8 rounded-full bg-[#FFF1F2] border border-[#F9C6C9] flex items-center justify-center shrink-0 mt-0.5">
<span className="material-symbols-outlined text-[#EE1C25] text-[20px]">warning</span>
</div>
<div>
<div className="text-body-strong font-body-strong text-on-surface flex items-center gap-2">
<span>Emergency Clinical Escalation Protocol</span>
<span className="text-micro font-micro px-1.5 py-0.5 rounded bg-error-container text-on-error-container font-bold">RED FLAG RULE</span>
</div>
<p className="text-caption font-caption text-on-surface-variant mt-0.5">
              If your rash is accompanied by high fever, sudden facial swelling, breathing distress, or blistering skin, do not wait for a clinic slot.
            </p>
</div>
</div>
<a className="shrink-0 bg-[#EE1C25] hover:bg-[#C1121F] text-white text-caption-strong font-caption-strong px-4 py-2.5 rounded-lg flex items-center gap-2 transition duration-150 shadow-sm active:scale-95" href="tel:108">
<span className="material-symbols-outlined text-[18px]">emergency</span>
<span>Call 108 Dispatch</span>
</a>
</aside>
</div>
</main>
<Footer />

    </>
  );
}
