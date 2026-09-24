import type { Metadata } from 'next';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import TriageFlow from './TriageFlow';

export const metadata: Metadata = {
  title: { absolute: 'Symptom Checker — Find the Right Doctor in 60 Seconds | Curxx' },
  description: 'Answer a few quick questions about your symptoms and Curxx suggests the right specialist, how soon to see them, and doctors available on video now.',
  alternates: { canonical: '/triage' },
};

export default function TriagePage() {
  return (
    <>
      <Header />
      <main className="flex-1 w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop py-space-xl flex flex-col items-center justify-start gap-4">
        <TriageFlow />
        <div className="w-full max-w-[800px] bg-surface-container-lowest border border-outline-variant border-l-4 border-l-[#EE1C25] rounded-xl p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
          <div className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-error-container text-error flex items-center justify-center shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-[16px] emergency-pulse" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
            </span>
            <div>
              <span className="inline-block font-caption-strong text-caption-strong text-[#EE1C25] uppercase tracking-wider mb-0.5">Immediate red flag warning</span>
              <p className="font-caption text-caption text-on-surface-variant">Having chest pain, difficulty breathing, sudden facial drooping, or severe bleeding? Do not wait for triage.</p>
            </div>
          </div>
          <a className="h-10 px-5 rounded-lg bg-[#EE1C25] hover:bg-[#C1121F] text-white font-body-strong text-body-strong flex items-center justify-center gap-2 shadow-xs shrink-0 self-start sm:self-center" href="tel:108">
            <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>call</span>
            <span>Call 108 Now</span>
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
