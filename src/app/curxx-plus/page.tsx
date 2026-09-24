import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import FaqAccordion from '@/components/seo/FaqAccordion';
import { api, type Faq } from '@/lib/api';
import type { Feature } from '@/lib/content-types';
import { countLabel, fill, items, loadSite } from '@/lib/site';
import PlusSignup from './PlusSignup';

export const metadata: Metadata = {
  title: { absolute: 'Curxx Plus — Unlimited Doctor Consultations for Your Whole Family | Curxx' },
  description: 'One family plan with unlimited online doctor consultations, priority clinic booking, discounted lab tests and medicines, and a free annual health checkup.',
  alternates: { canonical: '/curxx-plus' },
};

const PLUS_FAQ_HEADING = 'Curxx Plus: Frequently Asked Questions';

export default async function CurxxPlusPage() {
  // Plans (introductory prices; the team confirms the plan on a call before any payment), benefits
  // and FAQs are edited in the admin panel.
  const [{ sections, stats }, PLANS] = await Promise.all([loadSite('curxx-plus'), api.plans('plus').then((r) => r.plans).catch(() => [])]);
  const BENEFITS = items<Feature>(sections, 'curxx-plus/benefits');
  const FAQS = items<Faq>(sections, 'curxx-plus/faqs');
  const values = { labTests: countLabel(stats?.labTests), cities: stats?.cities };
  return (
    <>
      <Header />
      <main className="flex-1 bg-surface-container-lowest">
        <section className="border-b border-surface-variant">
          <div className="w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop py-12 sm:py-16 grid lg:grid-cols-[minmax(0,1fr)_380px] gap-10 items-start">
            <div className="space-y-5">
              <span className="text-micro font-micro font-semibold uppercase tracking-wider text-on-surface-variant">Curxx Plus (Subscription)</span>
              <h1 className="text-display font-display text-on-surface">Curxx Plus: Unlimited Consultations for Your Whole Family</h1>
              <p className="text-body-default font-body-default text-on-surface-variant max-w-2xl">
                One family plan, unlimited online consultations for every member, plus priority booking on in-clinic appointments and discounted lab tests.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#plans" className="inline-flex items-center gap-1.5 h-12 px-6 rounded-lg bg-primary-container hover:bg-[#8E0E17] text-white font-body-strong text-body-strong">See plans<span className="material-symbols-outlined text-[18px]">arrow_downward</span></a>
                <Link href="/consult/video" className="inline-flex items-center gap-1.5 h-12 px-6 rounded-lg border border-surface-variant hover:bg-surface-container-low text-on-surface font-body-strong text-body-strong">Try a video consult</Link>
              </div>
            </div>
            {PLANS.length > 0 && <PlusSignup plans={PLANS.map((p) => ({ id: p.slug, name: `${p.name} — ₹${p.price.toLocaleString('en-IN')}/${p.period}` }))} />}
          </div>
        </section>
        <section id="plans" className="w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop py-space-2xl space-y-6 scroll-mt-20">
          <h2 className="text-headline-h1 font-headline-h1 text-on-surface">Choose Your Plan</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {PLANS.map((p) => (
              <article key={p.slug} className={`p-6 rounded-2xl border flex flex-col gap-4 ${p.highlight ? 'border-2 border-primary-container bg-[#FFF1F2]' : 'border-surface-variant bg-surface-container-lowest'}`}>
                {p.highlight && p.badge && <span className="self-start px-2 py-0.5 rounded-full bg-primary-container text-white text-micro font-micro font-semibold">{p.badge}</span>}
                <div>
                  <h3 className="text-headline-h2 font-headline-h2 text-on-surface">{p.name}</h3>
                  <p className="text-caption font-caption text-on-surface-variant">{p.members}</p>
                </div>
                <p><span className="text-display font-display text-on-surface">₹{p.price.toLocaleString('en-IN')}</span><span className="text-caption font-caption text-on-surface-variant"> / {p.period}</span></p>
                <ul className="space-y-2">
                  {p.perks.map((perk) => <li key={perk} className="flex items-start gap-2 text-caption font-caption text-on-surface"><span className="material-symbols-outlined text-[18px] text-[#047857]">check_circle</span>{perk}</li>)}
                </ul>
                <a href="#join" className={`mt-auto h-11 rounded-lg flex items-center justify-center font-caption-strong text-caption-strong ${p.highlight ? 'bg-primary-container text-white hover:bg-[#8E0E17]' : 'border border-primary-container text-primary-container hover:bg-[#FFF1F2]'}`}>{p.ctaLabel || `Choose ${p.name}`}</a>
              </article>
            ))}
          </div>
          <p className="text-micro font-micro text-on-surface-variant">Introductory prices, inclusive of GST. Plans renew yearly; you can cancel any time.</p>
        </section>
        <section className="bg-surface-container-low border-y border-surface-variant">
          <div className="w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop py-space-2xl space-y-6">
            <h2 className="text-headline-h1 font-headline-h1 text-on-surface">What You Get with Curxx Plus</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {BENEFITS.map(({ icon, title, body }) => (
                <div key={title} className="p-5 rounded-xl border border-surface-variant bg-surface-container-lowest space-y-2">
                  <span className="w-10 h-10 rounded-lg bg-[#FFF1F2] text-primary-container flex items-center justify-center"><span className="material-symbols-outlined text-[22px]">{icon}</span></span>
                  <h3 className="text-headline-h3 font-headline-h3 text-on-surface">{title}</h3>
                  <p className="text-caption font-caption text-on-surface-variant">{fill(body, values)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full max-w-[900px] mx-auto px-margin sm:px-margin-desktop py-space-2xl">
          <FaqAccordion faqs={FAQS.map((f) => ({ ...f, answer: fill(f.answer, values) }))} heading={sections['curxx-plus/faqs']?.title || PLUS_FAQ_HEADING} />
        </section>
      </main>
      <Footer />
    </>
  );
}
