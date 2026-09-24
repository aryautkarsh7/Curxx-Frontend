'use client';
import Link from 'next/link';
import { useState } from 'react';
import { slotLabel } from '@/components/DoctorCard';
import { api, errorMessage, photo, rupees, type TriageResult } from '@/lib/api';
import { useCity } from '@/lib/city-store';

type ForWhom = 'self' | 'child' | 'parent' | 'other';
type Severity = 'mild' | 'moderate' | 'severe';

const WHO: { value: ForWhom; label: string; icon: string }[] = [
  { value: 'self', label: 'Myself', icon: 'person' },
  { value: 'child', label: 'My child', icon: 'child_care' },
  { value: 'parent', label: 'My parent', icon: 'elderly' },
  { value: 'other', label: 'Someone else', icon: 'group' },
];

/** Common complaints as tappable options; the phrase is what triage reads. */
const SYMPTOMS: { label: string; phrase: string; icon: string }[] = [
  { label: 'Fever', phrase: 'fever', icon: 'thermostat' },
  { label: 'Cough & cold', phrase: 'cough and cold, sore throat', icon: 'pulmonology' },
  { label: 'Skin rash / itching', phrase: 'itchy rash on skin', icon: 'dermatology' },
  { label: 'Acne / pimples', phrase: 'acne pimples', icon: 'face' },
  { label: 'Hair fall', phrase: 'hair fall and dandruff', icon: 'psychology_alt' },
  { label: 'Stomach pain', phrase: 'stomach pain', icon: 'gastroenterology' },
  { label: 'Acidity / gas', phrase: 'acidity, gas and bloating', icon: 'gastroenterology' },
  { label: 'Loose motions / vomiting', phrase: 'loose motions and vomiting', icon: 'water_drop' },
  { label: 'Headache / migraine', phrase: 'headache migraine', icon: 'neurology' },
  { label: 'Back / neck pain', phrase: 'back pain and neck pain', icon: 'accessibility_new' },
  { label: 'Knee / joint pain', phrase: 'knee and joint pain', icon: 'orthopedics' },
  { label: 'Anxiety / low mood', phrase: 'anxiety, stress and low mood', icon: 'psychiatry' },
  { label: 'Sleep problems', phrase: 'insomnia, can’t sleep', icon: 'bedtime' },
  { label: 'Period problems', phrase: 'irregular periods, cramps', icon: 'female' },
  { label: 'Pregnancy', phrase: 'pregnancy, missed period', icon: 'pregnant_woman' },
  { label: 'Toothache', phrase: 'toothache, tooth pain', icon: 'dentistry' },
  { label: 'Eye redness / vision', phrase: 'red eyes, eye pain, blurry vision', icon: 'visibility' },
  { label: 'Ear / throat pain', phrase: 'ear pain, tonsils, throat pain', icon: 'hearing' },
  { label: 'Burning urine', phrase: 'burning urination, urine infection', icon: 'water_drop' },
  { label: 'Sugar / BP check', phrase: 'diabetes sugar and blood pressure', icon: 'glucose' },
  { label: 'Thyroid / weight', phrase: 'thyroid and weight gain', icon: 'monitor_weight' },
  { label: 'Tiredness / weakness', phrase: 'tiredness and weakness', icon: 'battery_low' },
];

const DURATIONS = [
  { label: 'Started today', days: 0 },
  { label: '2–3 days', days: 3 },
  { label: 'About a week', days: 7 },
  { label: '2+ weeks', days: 15 },
  { label: 'Months', days: 60 },
];

const SEVERITIES: { value: Severity; label: string; hint: string }[] = [
  { value: 'mild', label: 'Mild', hint: 'Noticeable, but I can go about my day' },
  { value: 'moderate', label: 'Moderate', hint: 'It’s affecting work, sleep or eating' },
  { value: 'severe', label: 'Severe', hint: 'Very hard to manage right now' },
];

const RED_FLAGS = [
  'Chest pain or pressure, especially spreading to the arm or jaw',
  'Severe difficulty breathing or blue lips',
  'Face drooping, slurred speech or sudden weakness on one side',
  'Fainting, a seizure or confusion',
  'Heavy bleeding that won’t stop, or vomiting blood',
  'Thoughts of harming yourself',
];

const STEPS = ['Who is it for', 'Symptoms', 'Duration & severity', 'Warning signs'];

const option = (active: boolean) =>
  active
    ? 'bg-surface border-2 border-primary rounded-xl p-4 flex items-start gap-3 text-left transition shadow-xs'
    : 'bg-surface-container-lowest border border-surface-variant rounded-xl p-4 flex items-start gap-3 text-left hover:border-outline transition';

export default function TriageFlow() {
  const { city, cityName } = useCity();
  const [step, setStep] = useState(0);
  const [forWhom, setForWhom] = useState<ForWhom>('self');
  const [age, setAge] = useState('');
  const [picked, setPicked] = useState<string[]>([]);
  const [details, setDetails] = useState('');
  const [duration, setDuration] = useState<number | null>(null);
  const [severity, setSeverity] = useState<Severity>('moderate');
  const [flags, setFlags] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<TriageResult | null>(null);

  const toggle = (list: string[], value: string) => (list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  const symptomText = [...picked.map((l) => SYMPTOMS.find((s) => s.label === l)!.phrase), details.trim()].filter(Boolean).join(', ');
  const canNext = step === 0 ? true : step === 1 ? symptomText.length >= 3 : step === 2 ? duration !== null : true;

  async function submit() {
    setBusy(true);
    setError('');
    try {
      const text = flags.length ? `${symptomText}. ${flags.join('. ')}` : symptomText;
      const r = await api.triage({ symptoms: text, forWhom, age: age ? Number(age) : undefined, durationDays: duration ?? undefined, severity, city });
      setResult(r);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setBusy(false);
    }
  }

  function restart() {
    setResult(null);
    setStep(0);
    setPicked([]);
    setDetails('');
    setDuration(null);
    setSeverity('moderate');
    setFlags([]);
  }

  if (result) return <TriageOutcome result={result} city={city} cityName={cityName} onRestart={restart} />;

  return (
    <div className="w-full max-w-[800px] bg-surface-container-lowest border border-surface-variant rounded-2xl shadow-sm flex flex-col overflow-hidden">
      <div className="p-6 pb-4 border-b border-surface-container-high">
        <div className="flex items-center justify-between mb-2.5 gap-3">
          <span className="font-caption-strong text-caption-strong text-on-surface-variant uppercase tracking-wider">
            Step {step + 1} of {STEPS.length} · {STEPS[step]}
          </span>
          <Link href={`/${city}/doctors`} className="font-caption-strong text-caption-strong text-primary hover:underline flex items-center gap-1 whitespace-nowrap">
            Skip to doctor list<span className="material-symbols-outlined text-[15px]">arrow_forward</span>
          </Link>
        </div>
        <div className="w-full h-1.5 bg-surface-variant rounded-full overflow-hidden" role="progressbar" aria-valuemin={1} aria-valuemax={STEPS.length} aria-valuenow={step + 1}>
          <div className="h-full bg-primary rounded-full transition-all duration-300" style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}></div>
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-6">
        {step === 0 && (
          <fieldset className="space-y-4">
            <legend className="font-headline-h2 text-headline-h2 text-on-surface">Who needs care today?</legend>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {WHO.map((w) => (
                <button key={w.value} type="button" aria-pressed={forWhom === w.value} onClick={() => setForWhom(w.value)} className={`${option(forWhom === w.value)} flex-col items-center text-center`}>
                  <span className="material-symbols-outlined text-[26px] text-primary">{w.icon}</span>
                  <span className="font-body-strong text-body-strong text-on-surface">{w.label}</span>
                </button>
              ))}
            </div>
            <label className="flex items-center gap-3 max-w-xs">
              <span className="font-caption-strong text-caption-strong text-on-surface whitespace-nowrap">Age (years)</span>
              <input inputMode="numeric" maxLength={3} value={age} onChange={(e) => setAge(e.target.value.replace(/\D/g, ''))} placeholder="e.g. 34" className="w-24 h-11 px-3 rounded-lg border border-surface-variant bg-white outline-none focus:border-primary" />
            </label>
          </fieldset>
        )}

        {step === 1 && (
          <fieldset className="space-y-4">
            <legend className="font-headline-h2 text-headline-h2 text-on-surface">What are you experiencing?</legend>
            <p className="font-caption text-caption text-on-surface-variant -mt-2">Select everything that applies, or describe it in your own words.</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
              {SYMPTOMS.map((s) => {
                const active = picked.includes(s.label);
                return (
                  <button key={s.label} type="button" aria-pressed={active} onClick={() => setPicked(toggle(picked, s.label))} className={`${option(active)} !p-3 items-center`}>
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${active ? 'bg-primary text-on-primary' : 'border-2 border-outline'}`}>
                      {active && <span className="material-symbols-outlined text-[14px] font-bold">check</span>}
                    </span>
                    <span className="font-caption-strong text-caption-strong text-on-surface leading-tight">{s.label}</span>
                  </button>
                );
              })}
            </div>
            <label className="block space-y-1.5">
              <span className="font-caption-strong text-caption-strong text-on-surface">Anything else? (optional)</span>
              <textarea value={details} onChange={(e) => setDetails(e.target.value)} rows={2} maxLength={500} placeholder="e.g. dry cough at night, worse after cold drinks" className="w-full px-3.5 py-2.5 rounded-lg border border-surface-variant bg-white outline-none focus:border-primary font-body-default text-body-default" />
            </label>
          </fieldset>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <fieldset className="space-y-3">
              <legend className="font-headline-h2 text-headline-h2 text-on-surface">How long has this been going on?</legend>
              <div className="flex flex-wrap gap-2">
                {DURATIONS.map((d) => (
                  <button key={d.label} type="button" aria-pressed={duration === d.days} onClick={() => setDuration(d.days)} className={duration === d.days ? 'px-4 py-2 rounded-full border-2 border-primary bg-[#FFF1F2] font-caption-strong text-caption-strong text-primary' : 'px-4 py-2 rounded-full border border-surface-variant font-caption text-caption text-on-surface hover:border-outline'}>
                    {d.label}
                  </button>
                ))}
              </div>
            </fieldset>
            <fieldset className="space-y-3">
              <legend className="font-headline-h3 text-headline-h3 text-on-surface">How bad is it?</legend>
              <div className="grid sm:grid-cols-3 gap-3">
                {SEVERITIES.map((s) => (
                  <button key={s.value} type="button" aria-pressed={severity === s.value} onClick={() => setSeverity(s.value)} className={`${option(severity === s.value)} flex-col`}>
                    <span className="font-body-strong text-body-strong text-on-surface">{s.label}</span>
                    <span className="font-caption text-caption text-on-surface-variant">{s.hint}</span>
                  </button>
                ))}
              </div>
            </fieldset>
          </div>
        )}

        {step === 3 && (
          <fieldset className="space-y-3">
            <legend className="font-headline-h2 text-headline-h2 text-on-surface">Is any of this happening right now?</legend>
            <p className="font-caption text-caption text-on-surface-variant -mt-1">These need emergency care. Tick any that apply — or continue if none do.</p>
            <div className="grid sm:grid-cols-2 gap-2.5">
              {RED_FLAGS.map((f) => {
                const active = flags.includes(f);
                return (
                  <button key={f} type="button" aria-pressed={active} onClick={() => setFlags(toggle(flags, f))} className={active ? 'rounded-xl p-3.5 border-2 border-[#EE1C25] bg-[#FFF1F2] text-left flex gap-2.5' : 'rounded-xl p-3.5 border border-surface-variant text-left flex gap-2.5 hover:border-outline'}>
                    <span className={`material-symbols-outlined text-[20px] ${active ? 'text-[#EE1C25]' : 'text-outline'}`}>{active ? 'check_box' : 'check_box_outline_blank'}</span>
                    <span className="font-caption text-caption text-on-surface">{f}</span>
                  </button>
                );
              })}
            </div>
          </fieldset>
        )}

        {error && <p role="alert" className="px-3 py-2 rounded-lg bg-[#FFF1F2] border border-[#F9C6C9] font-caption text-caption text-[#8E0E17]">{error}</p>}

        <div className="flex items-center justify-between gap-3 pt-2">
          <button type="button" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0} className="h-12 px-5 rounded-lg border border-surface-variant font-body-strong text-body-strong text-on-surface disabled:opacity-40 flex items-center gap-1">
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>Back
          </button>
          {step < STEPS.length - 1 ? (
            <button type="button" disabled={!canNext} onClick={() => setStep((s) => s + 1)} className="h-12 px-6 rounded-lg bg-primary hover:bg-secondary disabled:bg-[#A8A29E] text-on-primary font-body-strong text-body-strong flex items-center gap-1.5">
              Continue<span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          ) : (
            <button type="button" disabled={busy} onClick={submit} className="h-12 px-6 rounded-lg bg-primary hover:bg-secondary disabled:bg-[#A8A29E] text-on-primary font-body-strong text-body-strong flex items-center gap-1.5">
              {busy ? 'Checking…' : flags.length ? 'Get emergency guidance' : 'See my recommendation'}
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          )}
        </div>
      </div>

      <div className="bg-surface border-t border-outline-variant px-5 py-3.5 flex items-center gap-3">
        <span className="material-symbols-outlined text-primary text-[18px] shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>info</span>
        <p className="font-caption text-caption text-on-surface-variant leading-snug">This is guidance to help you choose the right doctor, not a diagnosis. Suggestions for {cityName} come from verified doctors on Curxx.</p>
      </div>
    </div>
  );
}

const URGENCY = {
  emergency: { label: 'Emergency', tone: 'bg-[#FFF1F2] border-[#EE1C25] text-[#8E0E17]', icon: 'emergency' },
  urgent: { label: 'See a doctor today', tone: 'bg-[#FFF7ED] border-[#FDBA74] text-[#9A3412]', icon: 'priority_high' },
  soon: { label: 'Within 24–48 hours', tone: 'bg-[#FEFCE8] border-[#FDE68A] text-[#854D0E]', icon: 'schedule' },
  routine: { label: 'Routine consultation', tone: 'bg-[#ECFDF5] border-[#A7F3D0] text-[#047857]', icon: 'check_circle' },
} as const;

function TriageOutcome({ result, city, cityName, onRestart }: { result: TriageResult; city: string; cityName: string; onRestart: () => void }) {
  const u = URGENCY[result.urgency];
  const specialty = result.specialty;
  return (
    <div className="w-full max-w-[880px] space-y-6">
      <section className="bg-surface-container-lowest rounded-xl border border-surface-variant p-6 sm:p-8 shadow-sm space-y-4">
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border ${u.tone} text-micro font-micro font-bold uppercase tracking-wider`}>
          <span className="material-symbols-outlined text-[16px]">{u.icon}</span>
          {u.label}
        </span>
        <h1 className="text-display font-display text-on-surface tracking-tight">{result.headline}</h1>
        {result.urgency === 'emergency' ? (
          <div className="space-y-3">
            <ul className="space-y-1.5">{result.redFlags.map((f) => <li key={f} className="flex gap-2 text-body-default font-body-default text-[#8E0E17]"><span className="material-symbols-outlined text-[18px]">warning</span>{f}</li>)}</ul>
            <ul className="space-y-1.5">{result.advice.map((a) => <li key={a} className="text-body-default font-body-default text-on-surface">{a}</li>)}</ul>
            <a href="tel:108" className="inline-flex h-12 px-6 rounded-lg bg-[#EE1C25] hover:bg-[#C1121F] text-white font-body-strong text-body-strong items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">call</span>Call 108 now
            </a>
          </div>
        ) : (
          <>
            {specialty && (
              <p className="text-body-default font-body-default text-on-surface-variant">
                Based on what you told us{result.matched.length ? ` (${result.matched.join(', ')})` : ''}, a <strong className="text-on-surface">{specialty.name}</strong> is the right doctor{result.focus ? `, ideally one who focuses on ${result.focus.name.toLowerCase()}` : ''}.
              </p>
            )}
            {(result.reasons?.length ?? 0) > 0 && (
              <ul className="space-y-1">{result.reasons!.map((r) => <li key={r} className="flex gap-2 text-caption font-caption text-on-surface-variant"><span className="material-symbols-outlined text-[16px]">info</span>{r}</li>)}</ul>
            )}
            <div className="bg-surface-container-low border border-surface-variant rounded-xl p-4 space-y-2">
              <p className="text-caption-strong font-caption-strong text-on-surface uppercase tracking-wider">What you can do now</p>
              <ul className="space-y-1.5">{result.advice.map((a) => <li key={a} className="flex gap-2 text-caption font-caption text-on-surface"><span className="material-symbols-outlined text-[16px] text-[#047857]">check</span>{a}</li>)}</ul>
            </div>
            {specialty && (
              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <Link href={`/${city}/${specialty.slug}`} className="h-12 px-6 rounded-lg bg-primary hover:bg-secondary text-on-primary font-body-strong text-body-strong flex items-center justify-center gap-1.5">
                  See {specialty.plural.toLowerCase()} in {cityName}<span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </Link>
                <Link href={`/consult/video/${specialty.slug}/${result.focus?.slug ?? 'all'}`} className="h-12 px-6 rounded-lg border border-primary text-primary hover:bg-[#FFF1F2] font-body-strong text-body-strong flex items-center justify-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px]">videocam</span>Video consult now
                </Link>
              </div>
            )}
          </>
        )}
      </section>

      {result.doctors.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-headline-h2 font-headline-h2 text-on-surface">{specialty ? `${specialty.plural} available on video` : 'Doctors available'}</h2>
          <div className="grid gap-3">
            {result.doctors.map((d) => (
              <article key={d.slug} className="p-4 rounded-xl border border-surface-variant bg-surface-container-lowest flex flex-col sm:flex-row sm:items-center gap-4">
                <img src={photo(d.photoUrl, 128)} alt="" loading="lazy" className="w-16 h-16 rounded-full object-cover" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-body-strong text-body-strong text-on-surface">{d.name}</h3>
                  <p className="font-caption text-caption text-on-surface-variant">{d.title} · {d.experienceYears} yrs · {d.area}</p>
                  <p className="font-caption text-caption text-on-surface-variant">Video {rupees(d.videoFee)}{d.nextSlotAt ? ` · next ${slotLabel(d.nextSlotAt)}` : ''}</p>
                </div>
                <Link href={`/doctor/${d.slug}?mode=video`} className="h-10 px-4 rounded-lg bg-primary-container hover:bg-[#8E0E17] text-white font-caption-strong text-caption-strong flex items-center justify-center">Book video consult</Link>
              </article>
            ))}
          </div>
        </section>
      )}
      <div className="flex flex-wrap gap-3">
        <button type="button" onClick={onRestart} className="h-11 px-5 rounded-lg border border-surface-variant font-caption-strong text-caption-strong text-on-surface flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[18px]">restart_alt</span>Check other symptoms
        </button>
      </div>
    </div>
  );
}
