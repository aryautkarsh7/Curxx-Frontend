'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ApiError, api, type ProfileType } from '@/lib/api';
import { getToken, getUser } from '@/lib/session';

const ISSUES: Record<ProfileType, string[]> = {
  doctor: ['Phone number', 'Clinic address', 'Consulting timings', 'Fees', 'Qualifications or experience', 'Photo', 'No longer practises here'],
  facility: ['Phone number', 'Address or map location', 'Opening hours', 'Departments or services', 'Doctors listed', 'Photos', 'Permanently closed'],
  lab: ['Phone number', 'Address or map location', 'Timings', 'Test prices', 'Home collection', 'Accreditation', 'Permanently closed'],
  'lab-test': ['Price', 'Preparation / fasting', 'Tests included', 'Report time', 'Description'],
  medicine: ['Price', 'Composition', 'Manufacturer', 'Prescription requirement', 'Description'],
  site: ['Wrong information', 'Broken link'],
};

type Props = { targetType: ProfileType; slug: string; name: string; className?: string };

/** "Report wrong information" link + dialog. Reports reach the admin panel's Wrong-info reports list. */
export default function ReportIssue({ targetType, slug, name, className = '' }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={`inline-flex items-center gap-1 font-caption text-caption text-[#78716C] hover:text-[#C1121F] ${className}`}>
        <span className="material-symbols-outlined text-[16px]">flag</span>Report wrong information
      </button>
      <AnimatePresence>{open && <ReportDialog targetType={targetType} slug={slug} name={name} onClose={() => setOpen(false)} />}</AnimatePresence>
    </>
  );
}

function ReportDialog({ targetType, slug, name, onClose }: Omit<Props, 'className'> & { onClose: () => void }) {
  const [issues, setIssues] = useState<string[]>([]);
  const [details, setDetails] = useState('');
  const [contact, setContact] = useState(() => {
    const user = getUser();
    return user?.phone ?? '';
  });
  const [state, setState] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [error, setError] = useState('');

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const toggle = (issue: string) => setIssues((all) => (all.includes(issue) ? all.filter((i) => i !== issue) : [...all, issue]));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!issues.length && details.trim().length < 5) {
      setError('Pick what’s wrong, or describe it in a few words.');
      return;
    }
    setState('sending');
    setError('');
    try {
      await api.report({ targetType, targetSlug: slug, issues, details: details.trim(), contact: contact.trim(), page: window.location.pathname }, getToken());
      setState('sent');
    } catch (err) {
      setError(err instanceof ApiError && err.status === 429 ? 'Too many reports from this device — please try again in a few minutes.' : 'Couldn’t send your report. Please try again.');
      setState('idle');
    }
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center sm:p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-[rgba(28,25,23,0.45)]" onClick={onClose} aria-hidden="true" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="report-title"
        className="relative w-full sm:max-w-md max-h-[92vh] overflow-y-auto bg-white border-t border-[#E7E5E4] rounded-t-2xl sm:rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.12)] p-6 space-y-4"
      >
        <button type="button" onClick={onClose} aria-label="Close" className="absolute top-4 right-4 p-1 rounded-lg text-[#78716C] hover:bg-[#FAFAF9]">
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>
        {state === 'sent' ? (
          <div className="text-center space-y-3 py-4">
            <span className="material-symbols-outlined text-[40px] text-[#047857]">task_alt</span>
            <h2 id="report-title" className="font-headline-h3 text-headline-h3 text-[#1C1917]">Thanks — we’ll check it</h2>
            <p className="font-body-default text-body-default text-[#78716C]">Our team verifies every report and corrects {name}’s details, usually within 2 working days.</p>
            <button type="button" onClick={onClose} className="h-11 px-5 rounded-lg bg-[#C1121F] hover:bg-[#8E0E17] text-white font-body-strong text-body-strong">Done</button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4" noValidate>
            <div className="pr-8">
              <h2 id="report-title" className="font-headline-h3 text-headline-h3 text-[#1C1917]">Report wrong information</h2>
              <p className="font-caption text-caption text-[#78716C]">about {name}</p>
            </div>
            <fieldset>
              <legend className="font-caption-strong text-caption-strong text-[#1C1917] mb-2">What’s wrong?</legend>
              <div className="flex flex-wrap gap-2">
                {ISSUES[targetType].concat('Something else').map((issue) => {
                  const on = issues.includes(issue);
                  return (
                    <label key={issue} className={`cursor-pointer px-3 py-1.5 rounded-full border font-caption text-caption ${on ? 'bg-[#FFF1F2] border-[#F9C6C9] text-[#8E0E17]' : 'bg-white border-[#E7E5E4] text-[#1C1917] hover:border-[#A8A29E]'}`}>
                      <input type="checkbox" className="sr-only" checked={on} onChange={() => toggle(issue)} />
                      {issue}
                    </label>
                  );
                })}
              </div>
            </fieldset>
            <label className="block space-y-1.5">
              <span className="font-caption-strong text-caption-strong text-[#1C1917]">Correct details (optional)</span>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                rows={3}
                maxLength={1000}
                placeholder="e.g. The clinic moved to 2nd floor, Sunshine Complex. Timings are now 5–9 PM."
                className="w-full rounded-lg border border-[#E7E5E4] px-3 py-2 font-body-default text-body-default focus:outline-none focus:border-[#C1121F]"
              />
            </label>
            <label className="block space-y-1.5">
              <span className="font-caption-strong text-caption-strong text-[#1C1917]">Your phone or email (optional)</span>
              <input
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                maxLength={100}
                placeholder="So we can ask a follow-up question"
                className="w-full h-11 rounded-lg border border-[#E7E5E4] px-3 font-body-default text-body-default focus:outline-none focus:border-[#C1121F]"
              />
            </label>
            {error && <p role="alert" className="font-caption text-caption text-[#8E0E17]">{error}</p>}
            <button type="submit" disabled={state === 'sending'} className="w-full h-12 rounded-lg bg-[#C1121F] hover:bg-[#8E0E17] disabled:bg-[#A8A29E] text-white font-body-strong text-body-strong">
              {state === 'sending' ? 'Sending…' : 'Send report'}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}
