
'use client';
import Link from 'next/link';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function CurxxAiSymptomTriageStep3Of6Page() {
  return (
    <>
      
<Header />
{/* MAIN CANVAS */}
<main className="flex-1 w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop py-space-xl flex flex-col items-center justify-start">
{/* 800px CENTERED TRIAGE CONTAINER */}
<div className="w-full max-w-[800px] bg-surface-container-lowest border border-surface-variant rounded-2xl shadow-sm flex flex-col overflow-hidden">
{/* TOP OF CARD: Progress & Skip Bar */}
<div className="p-6 pb-4 border-b border-surface-container-high bg-surface-container-lowest">
<div className="flex items-center justify-between mb-2.5">
<span className="font-caption-strong text-caption-strong text-on-surface-variant uppercase tracking-wider">
            Step 3 of 6 · Associated Symptoms
          </span>
<Link href="/bangalore/dermatologist" className="font-caption-strong text-caption-strong text-primary hover:text-secondary hover:underline flex items-center gap-1 transition-colors">
            Skip to doctor list
            <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
</Link>
</div>
{/* Progress Track (50% for Step 3 of 6) */}
<div className="w-full h-1.5 bg-surface-variant rounded-full overflow-hidden">
<div className="h-full bg-primary rounded-full transition-all duration-300" style={{"width":"50%"}}></div>
</div>
</div>
{/* CONVERSATION AREA: Medical Dialog History */}
<div className="p-6 space-y-4 bg-surface-container-low/40">
{/* Exchange 1: AI Prompt */}
<div className="flex items-start gap-3 max-w-[85%]">
<div className="w-8 h-8 rounded-lg bg-surface border border-outline-variant/60 flex items-center justify-center shrink-0 mt-0.5">
<span className="material-symbols-outlined text-primary text-[18px]" style={{"fontVariationSettings":"'FILL' 1"}}>medical_services</span>
</div>
<div className="bg-surface-container-lowest border border-surface-variant rounded-2xl rounded-tl-none p-4 text-on-surface shadow-xs">
<p className="font-body-default text-body-default">Hello! I&apos;m Curxx Clinical AI. What primary symptom are you experiencing today?</p>
</div>
</div>
{/* Exchange 1: User Response */}
<div className="flex justify-end">
<div className="bg-primary text-on-primary rounded-2xl rounded-tr-none px-5 py-3 max-w-[80%] shadow-xs">
<p className="font-body-strong text-body-strong text-white leading-snug">Persistent skin rash with severe redness and itching on cheeks and forehead.</p>
</div>
</div>
{/* Exchange 2: AI Prompt */}
<div className="flex items-start gap-3 max-w-[85%]">
<div className="w-8 h-8 rounded-lg bg-surface border border-outline-variant/60 flex items-center justify-center shrink-0 mt-0.5">
<span className="material-symbols-outlined text-primary text-[18px]" style={{"fontVariationSettings":"'FILL' 1"}}>medical_services</span>
</div>
<div className="bg-surface-container-lowest border border-surface-variant rounded-2xl rounded-tl-none p-4 text-on-surface shadow-xs">
<p className="font-body-default text-body-default">Got it. How long have you noticed this redness and itching flare-up?</p>
</div>
</div>
{/* Exchange 2: User Response */}
<div className="flex justify-end">
<div className="bg-primary text-on-primary rounded-2xl rounded-tr-none px-5 py-3 max-w-[80%] shadow-xs">
<p className="font-body-strong text-body-strong text-white leading-snug">About 2 to 3 weeks. It seems to get worse after sun exposure or spicy foods.</p>
</div>
</div>
{/* Exchange 3: AI Prompt */}
<div className="flex items-start gap-3 max-w-[85%]">
<div className="w-8 h-8 rounded-lg bg-surface border border-outline-variant/60 flex items-center justify-center shrink-0 mt-0.5">
<span className="material-symbols-outlined text-primary text-[18px]" style={{"fontVariationSettings":"'FILL' 1"}}>medical_services</span>
</div>
<div className="bg-surface-container-lowest border border-surface-variant rounded-2xl rounded-tl-none p-4 text-on-surface shadow-xs">
<p className="font-body-default text-body-default">Understood. Has it caused burning, peeling, or visible pus-filled bumps?</p>
</div>
</div>
{/* Exchange 3: User Response */}
<div className="flex justify-end">
<div className="bg-primary text-on-primary rounded-2xl rounded-tr-none px-5 py-3 max-w-[80%] shadow-xs">
<p className="font-body-strong text-body-strong text-white leading-snug">Moderate burning sensation with tiny raised bumps, no major peeling.</p>
</div>
</div>
</div>
{/* CURRENT QUESTION: Active Focus Node */}
<div className="p-6 sm:p-8 bg-surface-container-lowest">
<div className="mb-5">
<h2 className="font-headline-h2 text-headline-h2 text-on-surface tracking-tight">
            Which of these additional symptoms or triggers apply to you?
          </h2>
<p className="font-caption text-caption text-on-surface-variant mt-1">
            Select all that apply to help our clinical algorithm pinpoint the right sub-specialist.
          </p>
</div>
{/* 2-Column Grid: Symptom Options Matrix */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mb-6">
{/* Card 1: SELECTED STATE */}
<div className="bg-surface border-2 border-primary rounded-xl p-4 flex items-start space-x-3 cursor-pointer transition-all duration-150 shadow-xs relative">
<div className="w-5 h-5 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0 mt-0.5">
<span className="material-symbols-outlined text-[14px] font-bold">check</span>
</div>
<div className="flex-1 min-w-0">
<h3 className="font-body-strong text-body-strong text-on-surface leading-tight">Facial flushing / sensitivity</h3>
<p className="font-caption text-caption text-on-surface-variant mt-0.5 leading-normal">Stinging sensation when applying water or gentle skincare products</p>
</div>
</div>
{/* Card 2: Unselected */}
<div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-4 flex items-start space-x-3 cursor-pointer hover:border-outline transition-all duration-150">
<div className="w-5 h-5 rounded-full border-2 border-outline flex items-center justify-center shrink-0 mt-0.5"></div>
<div className="flex-1 min-w-0">
<h3 className="font-body-strong text-body-strong text-on-surface leading-tight">Dry flaky patches</h3>
<p className="font-caption text-caption text-on-surface-variant mt-0.5 leading-normal">Rough textured skin or noticeable flakiness on nose or eyebrows</p>
</div>
</div>
{/* Card 3: Unselected */}
<div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-4 flex items-start space-x-3 cursor-pointer hover:border-outline transition-all duration-150">
<div className="w-5 h-5 rounded-full border-2 border-outline flex items-center justify-center shrink-0 mt-0.5"></div>
<div className="flex-1 min-w-0">
<h3 className="font-body-strong text-body-strong text-on-surface leading-tight">Joint pain or fatigue</h3>
<p className="font-caption text-caption text-on-surface-variant mt-0.5 leading-normal">Accompanying bodily stiffness, joint aches, or unusual tired spells</p>
</div>
</div>
{/* Card 4: Unselected */}
<div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-4 flex items-start space-x-3 cursor-pointer hover:border-outline transition-all duration-150">
<div className="w-5 h-5 rounded-full border-2 border-outline flex items-center justify-center shrink-0 mt-0.5"></div>
<div className="flex-1 min-w-0">
<h3 className="font-body-strong text-body-strong text-on-surface leading-tight">None of the above</h3>
<p className="font-caption text-caption text-on-surface-variant mt-0.5 leading-normal">No other bodily symptoms or triggers noticed</p>
</div>
</div>
</div>
{/* INPUT ROW: Free-text + Input Controls + Next CTA */}
<div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
<div className="flex-1 relative flex items-center bg-surface-container-lowest border border-surface-variant rounded-lg focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/20 transition-all">
<input className="w-full h-12 bg-transparent pl-3.5 pr-20 text-on-surface font-body-default text-body-default placeholder:text-outline border-none focus:ring-0 focus:outline-none" placeholder="Type additional details or describe triggers (optional)..." type="text"/>
<div className="absolute right-2 flex items-center gap-1 text-outline">
<button className="p-1.5 hover:text-on-surface rounded hover:bg-surface-container transition-colors" title="Attach image or medical report" type="button">
<span className="material-symbols-outlined text-[20px]">attach_file</span>
</button>
<button className="p-1.5 hover:text-on-surface rounded hover:bg-surface-container transition-colors" title="Voice input in English or Hindi" type="button">
<span className="material-symbols-outlined text-[20px]">mic</span>
</button>
</div>
</div>
<Link href="/triage/result" className="h-12 px-6 rounded-lg bg-primary hover:bg-secondary text-on-primary font-body-strong text-body-strong flex items-center justify-center gap-1.5 shadow-xs transition-colors duration-150 shrink-0">
<span>Continue</span>
<span className="material-symbols-outlined text-[18px]">arrow_forward</span>
</Link>
</div>
</div>
{/* PERSISTENT CARD DISCLAIMER STRIP */}
<div className="bg-surface border-t border-outline-variant px-5 py-3.5 flex items-center gap-3">
<span className="material-symbols-outlined text-primary text-[18px] shrink-0" style={{"fontVariationSettings":"'FILL' 1"}}>info</span>
<p className="font-caption text-caption text-on-surface-variant leading-snug">
          This is clinical AI guidance, not a definitive diagnosis. Every triage result is protocol-defaultChecked by licensed Indian doctors before consultation.
        </p>
</div>
</div>
{/* SEPARATE RED FLAG EMERGENCY STRIP (Underneath 800px Card) */}
<div className="w-full max-w-[800px] mt-4 bg-surface-container-lowest border border-outline-variant border-l-4 border-l-[#EE1C25] rounded-xl p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
<div className="flex items-start gap-3">
<div className="w-6 h-6 rounded-full bg-error-container text-error flex items-center justify-center shrink-0 mt-0.5">
<span className="material-symbols-outlined text-[16px] emergency-pulse" style={{"fontVariationSettings":"'FILL' 1"}}>warning</span>
</div>
<div>
<span className="inline-block font-caption-strong text-caption-strong text-[#EE1C25] uppercase tracking-wider mb-0.5">Immediate Red Flag Warning</span>
<p className="font-caption text-caption text-on-surface-variant">
            Having chest pain, difficulty breathing, sudden facial drooping, or severe bleeding? Do not wait for triage.
          </p>
</div>
</div>
<a className="h-10 px-5 rounded-lg bg-[#EE1C25] hover:bg-[#C1121F] text-white font-body-strong text-body-strong flex items-center justify-center gap-2 shadow-xs transition-colors duration-150 shrink-0 self-start sm:self-center" href="tel:108">
<span className="material-symbols-outlined text-[18px]" style={{"fontVariationSettings":"'FILL' 1"}}>call</span>
<span>Call 108 Now</span>
</a>
</div>
</main>
<Footer />

    </>
  );
}
