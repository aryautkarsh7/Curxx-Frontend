
'use client';
import Link from 'next/link';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function CurxxMedicalArticleDetailHeartHealthPage() {
  return (
    <>
      
{/* Fixed Reading Progress Bar (45% scroll progress) */}
<div className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-surface-container-high">
<div className="h-full bg-primary-container w-[45%]"></div>
</div>
<Header />
{/* Breadcrumb Container */}
<div className="w-full border-b border-surface-variant bg-surface-container-lowest">
<div className="max-w-[1200px] mx-auto px-margin sm:px-margin-desktop py-3">
<nav aria-label="Breadcrumb" className="flex items-center gap-2 font-caption text-caption text-outline flex-wrap">
<Link href="/" className="hover:text-primary transition-colors">Home</Link>
<span className="material-symbols-outlined" style={{"fontSize":"14px"}}>chevron_right</span>
<Link className="hover:text-primary transition-colors" href="/health-feed">Health Feed</Link>
<span className="material-symbols-outlined" style={{"fontSize":"14px"}}>chevron_right</span>
<Link href="/health-feed" className="hover:text-primary transition-colors">Heart</Link>
<span className="material-symbols-outlined" style={{"fontSize":"14px"}}>chevron_right</span>
<span className="text-on-surface font-caption-strong text-caption-strong truncate max-w-xs md:max-w-md">The 30-Year-Old&apos;s Guide to Preventing Early Cardiovascular Disease in Urban India</span>
</nav>
</div>
</div>
{/* Primary Article Layout (Centered 1200px container) */}
<main className="max-w-[1200px] mx-auto px-margin sm:px-margin-desktop py-space-xl">
<div className="flex flex-col lg:flex-row gap-12 items-start justify-between">
{/* Main Reading Column (720px width) */}
<article className="w-full lg:w-[720px] max-w-[720px] flex-shrink-0">
{/* Category Pill */}
<div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF1F2] border border-[#F9C6C9] text-primary font-caption-strong text-caption-strong mb-4">
<span className="material-symbols-outlined text-primary" style={{"fontSize":"14px"}}>cardiology</span>
<span>Heart Health &amp; Preventive Cardiology</span>
</div>
{/* Article Headline */}
<h1 className="font-display text-display text-on-surface mb-3 tracking-tight">
          The 30-Year-Old&apos;s Guide to Preventing Early Cardiovascular Disease in Urban India
        </h1>
{/* Dek / Subtitle */}
<p className="font-headline-h3 text-headline-h3 text-on-surface-variant font-normal leading-relaxed mb-6">
          Why young urban professionals in India are experiencing earlier arterial aging, and the exact clinical biomarkers you need to test before age 35.
        </p>
{/* Author & Verification Block */}
<div className="p-4 rounded-xl border border-surface-variant bg-surface-container-lowest mb-8">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
<div className="flex items-center gap-3.5">
<img loading="lazy" decoding="async" alt="Dr. Ananya Sen, MD Cardiology" className="w-12 h-12 rounded-full object-cover border border-surface-variant shadow-sm" data-alt="A distinguished female Indian cardiologist in her late thirties wearing a crisp white medical coat and clinical stethoscope, looking warm and authoritative, photographed under clean balanced hospital studio lighting against a minimal warm beige backdrop." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD685dpETTDmDyVejhTZreabsYGiLlqhJEkwg0esbuFldbU4K3p354SZvk3jlLC39pLTLaFZlH_vU01TR5IoX_9v0lGFDyxYCzwAOMAvU_q_q1Y1vUkFrazgLfQsH3RjGBAAzKK5lF1ZSSM04y1r8IRbp6Z-7282kT2jefg3bk2z3AW5StqwdmWgHeo7QMRCuY-61hZ7f2c1UozbKB_4P_0MlCocRXocLVVWVL8PuNWe61PLk2YYFiL=w96"/>
<div>
<div className="flex items-center gap-2">
<a className="font-body-strong text-body-strong text-on-surface hover:text-primary transition-colors" href="#author-bio">Dr. Ananya Sen, MD</a>
<span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857] text-micro font-micro">
<span className="material-symbols-outlined" style={{"fontSize":"12px","fontVariationSettings":"'FILL' 1"}}>verified</span>
<span>Fortis Hospital</span>
</span>
</div>
<div className="flex items-center gap-2 mt-0.5 font-caption text-caption text-outline">
<span>Medically reviewed on 14 Oct 2025</span>
<span>•</span>
<span>7 min read</span>
</div>
</div>
</div>
{/* Social Action Bar */}
<div className="flex items-center gap-1 self-start sm:self-center border-t sm:border-t-0 pt-2 sm:pt-0 border-surface-variant">
<button aria-label="Share WhatsApp" className="p-2 text-outline hover:text-primary transition-colors rounded-lg hover:bg-surface-container-low" title="Share on WhatsApp">
<span className="material-symbols-outlined" style={{"fontSize":"18px"}}>chat</span>
</button>
<Link href="/records?share=1" aria-label="Share Twitter" className="p-2 text-outline hover:text-primary transition-colors rounded-lg hover:bg-surface-container-low" title="Share on Twitter">
<span className="material-symbols-outlined" style={{"fontSize":"18px"}}>share</span>
</Link>
<button aria-label="Share LinkedIn" className="p-2 text-outline hover:text-primary transition-colors rounded-lg hover:bg-surface-container-low" title="Share on LinkedIn">
<span className="material-symbols-outlined" style={{"fontSize":"18px"}}>work</span>
</button>
<button aria-label="Copy Article Link" className="p-2 text-outline hover:text-primary transition-colors rounded-lg hover:bg-surface-container-low" title="Copy Link">
<span className="material-symbols-outlined" style={{"fontSize":"18px"}}>content_copy</span>
</button>
<button aria-label="Bookmark" className="p-2 text-outline hover:text-primary transition-colors rounded-lg hover:bg-surface-container-low" title="Bookmark Article">
<span className="material-symbols-outlined" style={{"fontSize":"18px"}}>bookmark_border</span>
</button>
</div>
</div>
</div>
{/* Hero Media Element */}
<figure className="mb-8">
<div className="aspect-video w-full rounded-xl overflow-hidden border border-surface-variant bg-surface-container-high relative">
<img loading="lazy" decoding="async" alt="Cardiology diagnostic equipment and arterial monitoring station" className="w-full h-full object-cover" data-alt="A modern cardiovascular diagnostic workstation in a premier cardiology lab in Bangalore, showing a high-precision stethoscope resting adjacent to an advanced digital electrocardiogram monitor displaying real-time rhythm strips, illuminated by soft clinical overhead lights with clean minimalist aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-jM-L7ZPNZAgiiAG5hJXo1L6LQxirV6J6SGxGx0AFOUHDj8Qp9L1qO9Mf7HL-gIfJ4pRz6lkcx0HQY1h0HDLtszxqVKwrbBNCcyl2OOhSx7XsRoxxbJDgOX5hEA-rM5sTcfhcYQdBKFUuZnMApJ7cHGu6Kuf0DI8yoiHk-XW6lF8KyvE0yAx2YHISM7K0ntmVGMI3tQ51yF9SLF8bRIsmnNKcZlgMh0knpLAUG-uD9NXKQn1Hhz8r=w800"/>
</div>
<figcaption className="mt-2 font-caption text-caption text-outline flex items-center justify-between">
<span>Early subclinical atherosclerosis can begin up to a decade before symptoms manifest.</span>
<span className="font-micro text-micro text-outline">Photo: Curxx Clinical Archive</span>
</figcaption>
</figure>
{/* Body Editorial Section */}
<div className="prose max-w-none text-on-surface space-y-6">
{/* Intro with Drop Cap styling */}
<p className="font-body-default text-body-default text-on-surface leading-relaxed first-letter:text-5xl first-letter:font-bold first-letter:text-primary first-letter:mr-3 first-letter:float-left first-letter:leading-none">
            In metropolitan centers across India—from Bengaluru’s technology corridors to Mumbai’s financial districts—the clinical definition of a typical cardiac patient has drastically pivoted. Where coronary events were once predominantly documented in individuals aged fifty-five and above, contemporary clinical registries now exhibit a troubling demographic downward migration. Individuals in their late twenties and early thirties are presenting with mature atheromatous plaques, acute coronary syndromes, and refractory hypertension.
          </p>
<p className="font-body-default text-body-default text-on-surface leading-relaxed">
            Data compiled by the Indian Council of Medical Research (ICMR) indicates that coronary artery disease rates among young urban Indians are twice as high as comparable Western populations, driven largely by intrinsic genetic susceptibility combined with modern urban metabolic stressors: prolonged sedentary desk postures, chronic cortisol elevation, disrupted circadian sleep rhythms, and high-glycemic diets.
          </p>
{/* Pull Quote with #C1121F Rule */}
<div className="my-8 pl-5 border-l-4 border-primary-container py-2 bg-surface-container-low rounded-r-lg">
<blockquote className="font-headline-h3 text-headline-h3 italic text-on-surface leading-snug">
              “South Asians experience cardiovascular events on average a decade earlier than Western cohorts—making proactive biomarker tracking non-negotiable by age 30.”
            </blockquote>
</div>
{/* Section H2 */}
<h2 className="font-headline-h2 text-headline-h2 text-on-surface font-bold pt-4 tracking-tight border-t border-surface-variant" id="urban-indian-heart-risk">
            The Shift in Atherosclerotic Onset in Urban India
          </h2>
<p className="font-body-default text-body-default text-on-surface leading-relaxed">
            Atherogenesis—the gradual formation of fibrofatty lesions inside arterial walls—is neither sudden nor asymptomatic in its laboratory footprint. In young South Asian bodies, this process is frequently accelerated by the ‘Asian Indian Phenotype’: characterized by higher visceral adiposity despite normal Body Mass Index (BMI), higher baseline insulin resistance, and elevated triglycerides coupled with lowered HDL levels.
          </p>
{/* Section H2: Critical Biomarkers */}
<h2 className="font-headline-h2 text-headline-h2 text-on-surface font-bold pt-4 tracking-tight border-t border-surface-variant" id="biomarkers-to-track">
            Key Biomarkers Beyond Basic Lipid Panels
          </h2>
<p className="font-body-default text-body-default text-on-surface leading-relaxed">
            Relying solely on a routine standard lipid profile (Total Cholesterol and LDL-C) produces a hazardous false sense of security. Advanced preventive cardiology requires measuring the particle density and chronic inflammatory load directly:
          </p>
<ul className="space-y-3 font-body-default text-body-default">
<li className="flex items-start gap-2.5">
<span className="w-1.5 h-1.5 rounded-full bg-primary-container mt-2 flex-shrink-0"></span>
<span><strong className="font-body-strong text-body-strong text-on-surface">Apolipoprotein B (ApoB) vs. LDL-C:</strong> While LDL-C measures the volume of cholesterol carried, ApoB quantifies the exact count of atherogenic particles capable of infiltrating endothelial walls. A patient may have normal LDL-C but high ApoB, conferring high vascular risk.</span>
</li>
<li className="flex items-start gap-2.5">
<span className="w-1.5 h-1.5 rounded-full bg-primary-container mt-2 flex-shrink-0"></span>
<span><strong className="font-body-strong text-body-strong text-on-surface">High-Sensitivity C-Reactive Protein (hs-CRP):</strong> A clinical marker of low-grade systemic inflammation. Readings above 2.0 mg/L in asymptomatic 30-year-olds signal active vascular micro-inflammation that destabilizes arterial linings.</span>
</li>
<li className="flex items-start gap-2.5">
<span className="w-1.5 h-1.5 rounded-full bg-primary-container mt-2 flex-shrink-0"></span>
<span><strong className="font-body-strong text-body-strong text-on-surface">Lipoprotein(a) [Lp(a)]:</strong> A heavily genetically determined independent risk factor present in elevated concentrations across 25% of the Indian population. It is non-responsive to conventional exercise and must be mapped once in early adulthood.</span>
</li>
<li className="flex items-start gap-2.5">
<span className="w-1.5 h-1.5 rounded-full bg-primary-container mt-2 flex-shrink-0"></span>
<span><strong className="font-body-strong text-body-strong text-on-surface">Fasting Insulin &amp; HbA1c:</strong> Insulin resistance directly damages vascular nitric oxide production, prompting arterial stiffness years prior to frank diabetic thresholds.</span>
</li>
</ul>
{/* Inline "Key Takeaway" Card */}
<div className="my-8 p-5 bg-[#FFF1F2] border border-[#F9C6C9] rounded-xl" id="key-takeaways">
<div className="flex items-center gap-2 mb-3">
<span className="material-symbols-outlined text-primary-container" style={{"fontSize":"22px","fontVariationSettings":"'FILL' 1"}}>shield</span>
<h3 className="font-headline-h3 text-headline-h3 text-on-secondary-container font-bold">Clinical Key Takeaways</h3>
</div>
<ul className="space-y-2.5 font-body-default text-body-default text-on-surface">
<li className="flex items-start gap-2">
<span className="material-symbols-outlined text-primary-container text-base flex-shrink-0 mt-0.5">check_circle</span>
<span><strong>Baseline Screen by Age 28–30:</strong> Schedule a baseline ApoB, Lp(a), and hs-CRP panel even in the absence of familial cardiac history or overt symptoms.</span>
</li>
<li className="flex items-start gap-2">
<span className="material-symbols-outlined text-primary-container text-base flex-shrink-0 mt-0.5">check_circle</span>
<span><strong>Insulin Sensitivity is Cardiovascular Health:</strong> Maintain waist-to-hip ratios below 0.90 for men and 0.85 for women to avert microvascular stiffness.</span>
</li>
<li className="flex items-start gap-2">
<span className="material-symbols-outlined text-primary-container text-base flex-shrink-0 mt-0.5">check_circle</span>
<span><strong>Genetics Dictate Intervention Urgency:</strong> If a first-degree relative suffered early onset myocardial infarction (&lt;55 yrs), formal risk staging must occur annually.</span>
</li>
</ul>
</div>
{/* Section H3: Actionable Protocol */}
<h3 className="font-headline-h2 text-headline-h2 text-on-surface font-bold pt-4 tracking-tight border-t border-surface-variant" id="clinical-protocol">
            Actionable Clinical Protocol
          </h3>
<p className="font-body-default text-body-default text-on-surface leading-relaxed">
            Cardiometabolic stabilization requires replacing vague fitness recommendations with precise physiological prescriptions. First, prioritize zone-2 cardiovascular training (150 minutes weekly at 60–70% maximum heart rate) to enhance mitochondrial density and myocardial capillary perfusion. Second, implement strict sleep hygiene targeting 7.5 hours nightly to reduce autonomic sympathetic overdrive and nighttime hypertensive spikes.
          </p>
{/* References Section */}
<div className="mt-10 pt-6 border-t border-surface-variant" id="references">
<h4 className="font-caption-strong text-caption-strong text-outline uppercase tracking-wider mb-3">Clinical References &amp; Authoritative Sources</h4>
<ol className="space-y-1.5 font-caption text-caption text-outline list-decimal list-inside">
<li>Enas, E. A., et al. (2020). <em>Coronary artery disease in young Asian Indians: recent insights and management strategies.</em> Indian Heart Journal, 72(4), 211-224.</li>
<li>Prabhakaran, D., et al. (2021). <em>Cardiovascular disease epidemiology in India: a review of the national burden and systemic barriers.</em> The Lancet Diabetes &amp; Endocrinology, 9(3), 167-178.</li>
<li>Grundy, S. M., et al. (2019). <em>AHA/ACC Multisociety Guideline on the Management of Blood Cholesterol: ApoB Clinical Concordance.</em> Circulation, 139(25), e1082-e1143.</li>
<li>Indian Council of Medical Research (ICMR). (2023). <em>National Clinical Protocol for Early Atherosclerotic Screening in Sub-40 Demographics.</em> New Delhi: ICMR Press.</li>
</ol>
</div>
{/* Author Bio Card */}
<div className="mt-10 p-6 rounded-xl border border-surface-variant bg-surface-container-lowest" id="author-bio">
<div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
<img loading="lazy" decoding="async" alt="Dr. Ananya Sen" className="w-16 h-16 rounded-full object-cover border border-surface-variant" data-alt="Close-up professional portrait of Dr. Ananya Sen, MD, DM Cardiology, Fortis Hospital Bangalore, dressed in clinical medical attire, standing against a neutral warm grey backdrop in a hospital setting with natural soft key lighting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAswnRrVaonf4H40reXJmYX0Z-hFGlQ93DbAbEQhQXaxLN9cg2b-MGYU6099JYM9aimLImu6uSpipoCBjJg5rrQ7THHTVxy3r0Vb60vBPDIyZ95EV8dm_2kQyaCNONsUDZDXpfc8D7r0cbE0RIXwK8MtkzxZdQhFMjgMyHmHNbYoFxMFwlyOni2hnjmefYGnd6y2q9v8Mvj8o1ZJGxMMLCiIiDk_yXayyjwtg8V4B1bxF2BA3_T95hg=w128"/>
<div className="flex-1">
<div className="flex items-center gap-2 flex-wrap">
<h3 className="font-headline-h3 text-headline-h3 text-on-surface">Dr. Ananya Sen</h3>
<span className="font-caption text-caption text-outline">MD, DM Cardiology (15 yrs exp)</span>
</div>
<p className="font-caption text-caption text-on-surface-variant mt-1 leading-relaxed">
                  Senior Consultant Interventional Cardiologist at Fortis Hospital, Bangalore. Specialist in preventive cardiology, coronary physiology, and premature atherosclerotic mitigation in young adults. Member of the Cardiological Society of India (CSI).
                </p>
<div className="mt-4 flex items-center gap-3">
<Link href="/doctor/dr-ananya-sen" className="inline-flex items-center gap-2 px-4 py-2 bg-primary-container text-white rounded-lg font-body-strong text-body-strong hover:bg-primary transition duration-150 active:scale-95 shadow-sm">
<span className="material-symbols-outlined" style={{"fontSize":"16px"}}>calendar_month</span>
<span>Consult Dr. Ananya Sen (₹1,200)</span>
</Link>
<Link href="/doctor/dr-ananya-sen" className="font-caption-strong text-caption-strong text-primary hover:underline">View Full Profile</Link>
</div>
</div>
</div>
</div>
</div>
</article>
{/* Sticky Right Rail (300px width) */}
<aside className="w-full lg:w-[300px] max-w-[300px] sticky top-20 flex-shrink-0 space-y-6">
{/* Table of Contents Module */}
<div className="p-4 rounded-xl border border-surface-variant bg-surface-container-lowest">
<div className="flex items-center gap-2 pb-3 mb-3 border-b border-surface-variant">
<span className="material-symbols-outlined text-outline" style={{"fontSize":"18px"}}>format_list_bulleted</span>
<span className="font-caption-strong text-caption-strong text-on-surface uppercase tracking-wider">On This Page</span>
</div>
<nav className="space-y-1">
<a className="block py-1 px-2.5 text-caption font-caption text-on-surface-variant hover:text-primary transition-colors rounded" href="#urban-indian-heart-risk">
              The Urban Indian Heart Risk
            </a>
{/* Active Anchor Link */}
<a className="block py-1 px-2.5 text-caption-strong font-caption-strong text-primary-container border-l-2 border-primary-container bg-surface-container-low rounded-r" href="#biomarkers-to-track">
              Critical Biomarkers to Track
            </a>
<a className="block py-1 px-2.5 text-caption font-caption text-on-surface-variant hover:text-primary transition-colors rounded" href="#key-takeaways">
              Key Clinical Takeaways
            </a>
<a className="block py-1 px-2.5 text-caption font-caption text-on-surface-variant hover:text-primary transition-colors rounded" href="#clinical-protocol">
              Recommended Screening Schedule
            </a>
<a className="block py-1 px-2.5 text-caption font-caption text-on-surface-variant hover:text-primary transition-colors rounded" href="#references">
              Author &amp; References
            </a>
</nav>
</div>
{/* Compact Teleconsult CTA Card */}
<div className="p-4 rounded-xl border border-[#F9C6C9] bg-[#FFF1F2]">
<div className="flex items-center gap-3 mb-3">
<img loading="lazy" decoding="async" alt="Dr. Sen" className="w-10 h-10 rounded-full object-cover border border-surface-variant" data-alt="Small thumbnail avatar of Dr. Ananya Sen in a white clinical doctor coat against clean white medical backdrop, crisp clarity and warm demeanor." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyJZa3Zj3PaDCgISpD9rcJJj2tUtd7HzmJriMQRQNASJh_IrlYfrEuyJ2_0X9Os8n8888HuDE-J9VAiRuH4HqDIozXHGZHMubnH05k_F7PLawv1cwLUxZjMi1BfpRD4W805b1AqbCsbgNNf7UxrBC0KfpVMaMlRVEaqj5ghPqm22pd34fVAymxKZDn6XXXzG7QRm3Wzy_YarYzy_n_dry2K_0sYTPqXcngXPbz0MtgktxuZlzHNS7K=w80"/>
<div>
<p className="font-caption-strong text-caption-strong text-on-surface">Have heart concerns?</p>
<p className="font-micro text-micro text-outline">Verified Fortis Cardiologist</p>
</div>
</div>
<p className="font-caption text-caption text-on-surface-variant mb-3 leading-tight">
            Review your lipid &amp; inflammatory lab reports with an experienced physician in under 15 minutes.
          </p>
<Link href="/consult/video/cardiologist" className="w-full py-2.5 px-3 bg-primary-container text-white rounded-lg font-caption-strong text-caption-strong hover:bg-primary transition duration-150 active:scale-95 flex items-center justify-center gap-1.5 shadow-sm">
<span className="material-symbols-outlined" style={{"fontSize":"16px"}}>videocam</span>
<span>Book ₹399 Teleconsult</span>
</Link>
</div>
{/* Related Diagnostics & Tests List */}
<div className="p-4 rounded-xl border border-surface-variant bg-surface-container-lowest">
<h4 className="font-caption-strong text-caption-strong text-on-surface uppercase tracking-wider mb-3">
            Recommended Diagnostics
          </h4>
<div className="space-y-3">
<div className="p-2.5 rounded-lg border border-surface-variant hover:bg-surface-container-low transition-colors">
<div className="flex items-center justify-between">
<span className="font-caption-strong text-caption-strong text-on-surface">Lipid Profile Panel</span>
<span className="font-body-strong text-body-strong text-primary-container">₹499</span>
</div>
<p className="font-micro text-micro text-outline mt-0.5">Curxx Labs · Home Sample Pickup</p>
<Link className="inline-flex items-center gap-1 text-micro font-micro text-primary mt-2 hover:underline" href="/lab-tests/comprehensive-full-body-checkup">
<span>Book Test</span>
<span className="material-symbols-outlined" style={{"fontSize":"12px"}}>arrow_forward</span>
</Link>
</div>
<div className="p-2.5 rounded-lg border border-surface-variant hover:bg-surface-container-low transition-colors">
<div className="flex items-center justify-between">
<span className="font-caption-strong text-caption-strong text-on-surface">Hypertension Screening</span>
<span className="font-body-strong text-body-strong text-primary-container">₹299</span>
</div>
<p className="font-micro text-micro text-outline mt-0.5">Includes Ambulatory BP Review</p>
<Link className="inline-flex items-center gap-1 text-micro font-micro text-primary mt-2 hover:underline" href="/lab-tests/comprehensive-full-body-checkup">
<span>Book Test</span>
<span className="material-symbols-outlined" style={{"fontSize":"12px"}}>arrow_forward</span>
</Link>
</div>
<div className="p-2.5 rounded-lg border border-surface-variant hover:bg-surface-container-low transition-colors">
<div className="flex items-center justify-between">
<span className="font-caption-strong text-caption-strong text-on-surface">Coronary Calcium (CAC)</span>
<span className="font-body-strong text-body-strong text-primary-container">₹2,499</span>
</div>
<p className="font-micro text-micro text-outline mt-0.5">Non-contrast CT · Tier 1 Centers</p>
<Link href="/lab-tests/heart-health-lipid-screen" className="inline-flex items-center gap-1 text-micro font-micro text-primary mt-2 hover:underline">
<span>Book Scan</span>
<span className="material-symbols-outlined" style={{"fontSize":"12px"}}>arrow_forward</span>
</Link>
</div>
</div>
</div>
</aside>
</div>
</main>
{/* Below The Article Section (Full Width 1200px) */}
<section className="border-t border-surface-variant bg-surface-container-low py-space-2xl">
<div className="max-w-[1200px] mx-auto px-margin sm:px-margin-desktop space-y-12">
{/* Related Clinical Articles */}
<div>
<div className="flex items-center justify-between mb-6">
<div>
<h2 className="font-headline-h2 text-headline-h2 text-on-surface font-bold">Related Clinical Articles</h2>
<p className="font-caption text-caption text-outline">Peer-reviewed cardiometabolic guides curated by Curxx physicians</p>
</div>
<Link href="/health-feed" className="font-caption-strong text-caption-strong text-primary hover:underline flex items-center gap-1">
<span>View All Cardiology Feeds</span>
<span className="material-symbols-outlined" style={{"fontSize":"16px"}}>chevron_right</span>
</Link>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
{/* Article Card 1 */}
<div className="bg-surface-container-lowest border border-surface-variant rounded-xl overflow-hidden flex flex-col hover:border-outline-variant transition duration-150">
<div className="h-40 bg-surface-container overflow-hidden">
<img loading="lazy" decoding="async" alt="Diabetes and Heart Health" className="w-full h-full object-cover" data-alt="A clinical photograph showing a digital blood glucose monitor alongside a heart rate smartwatch and clinical notes on a spotless white wooden table, illuminated in bright crisp morning light." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIqYnZen3G-UNzadGLERsba8BhWDaX2kJHPvIKdX0vpzZ4LvZpSATcFWCagz4UkOZgxGw_8tIpmLInd4WHooVcMFkvNwwA4cCvOlHwS4ogKmWKGUXDpR1Tl9W5OijbHlKplhoAQRnyIdCQL1v8tw5uuiNeznl4blhylaa8LOP62X6bZRGDMjqMsCjLmP8TCnXqXyT8Tou2YWehTQHe2uo7U8-chrtxDCddFrUdOilD-bTbutyOHdtw=w800"/>
</div>
<div className="p-4 flex-1 flex flex-col justify-between">
<div>
<span className="font-micro text-micro text-primary uppercase font-bold tracking-wider">Endocrinology &amp; Heart</span>
<h3 className="font-headline-h3 text-headline-h3 text-on-surface mt-1 leading-snug">
                  The Silent Nexus: How UndefaultChecked Pre-Diabetes Accelerates Coronary Plaque
                </h3>
<p className="font-caption text-caption text-on-surface-variant mt-2 line-clamp-2">
                  Understanding how subtle glucose spikes corrode the glycocalyx lining of coronary arteries years before type 2 diabetes diagnosis.
                </p>
</div>
<div className="mt-4 pt-3 border-t border-surface-variant flex items-center justify-between font-caption text-caption text-outline">
<span>Dr. Rohit Bhatia</span>
<span>5 min read</span>
</div>
</div>
</div>
{/* Article Card 2 */}
<div className="bg-surface-container-lowest border border-surface-variant rounded-xl overflow-hidden flex flex-col hover:border-outline-variant transition duration-150">
<div className="h-40 bg-surface-container overflow-hidden">
<img loading="lazy" decoding="async" alt="Hypertension Management" className="w-full h-full object-cover" data-alt="A modern medical blood pressure monitor cuff resting on a wooden clinic table next to a water bottle and lifestyle journal, bathed in soft, natural daylight with warm neutral tones." src="https://lh3.googleusercontent.com/aida-public/AB6AXuArrdKZdj3Q3Xg-L6uHgmVnn3rmf8-CS_6_ast0X9e0q863YUmcGNvTTzYXa2jx4KtULalwp74q6afHWRji4mDRyG1akYaTizYqHXLX1Y6KFOOa9A0LQIVf-8Kcan74nFQGpBFz43-Z3keWR6dYz-iliPt8NBqih3wxHyReRf8o2XYez-0V2rw73fhxCwylpkZUGcifYp4lRj9wfvgjEtkwzhLV31qoEcWbZHNU_Y6NLFeRaG2CE_54=w800"/>
</div>
<div className="p-4 flex-1 flex flex-col justify-between">
<div>
<span className="font-micro text-micro text-primary uppercase font-bold tracking-wider">Preventive Protocol</span>
<h3 className="font-headline-h3 text-headline-h3 text-on-surface mt-1 leading-snug">
                  Precision Hypertension: Managing White-Coat vs. Masked Nocturnal Spikes
                </h3>
<p className="font-caption text-caption text-on-surface-variant mt-2 line-clamp-2">
                  Why single clinic BP readings are insufficient for tech professionals experiencing isolated nocturnal hypertension.
                </p>
</div>
<div className="mt-4 pt-3 border-t border-surface-variant flex items-center justify-between font-caption text-caption text-outline">
<span>Dr. Meera Nambiar</span>
<span>6 min read</span>
</div>
</div>
</div>
{/* Article Card 3 */}
<div className="bg-surface-container-lowest border border-surface-variant rounded-xl overflow-hidden flex flex-col hover:border-outline-variant transition duration-150">
<div className="h-40 bg-surface-container overflow-hidden">
<img loading="lazy" decoding="async" alt="Decoding Cholesterol" className="w-full h-full object-cover" data-alt="Laboratory technician in blue nitrile gloves holding a medical vacuum vial containing blood plasma for advanced lipid particle analysis in a state-of-the-art diagnostics facility." src="https://lh3.googleusercontent.com/aida-public/AB6AXuB27J5DMDFEEZkXadTrO2XgjjnZo0_fT_ezSsl-7RqcrC0kEmrbLZlcWq75q5pJO_BMTXsqbrQukMNB9W7xFQS-3sKXVD06nJuE4MJTTENDM2KZTghNrkgUsRrhPacPXMOG0UKnc9lclUG_yyE-jIoJYtVevvQPsOr3USdiYkjWF34L3744fV8bNq_Anzs6ALcBVTYNYtsLP9f7saDQe2FZA3HuZ7x5aqI7dhMUB7g0uxjhUWA9euSC=w800"/>
</div>
<div className="p-4 flex-1 flex flex-col justify-between">
<div>
<span className="font-micro text-micro text-primary uppercase font-bold tracking-wider">Diagnostics Deep-Dive</span>
<h3 className="font-headline-h3 text-headline-h3 text-on-surface mt-1 leading-snug">
                  Decoding Cholesterol: Why Total Numbers Mean Almost Nothing in 2025
                </h3>
<p className="font-caption text-caption text-on-surface-variant mt-2 line-clamp-2">
                  A clinician’s guide to interpreting small dense LDL particles, triglyceride-to-HDL ratios, and oxidized phospholipids.
                </p>
</div>
<div className="mt-4 pt-3 border-t border-surface-variant flex items-center justify-between font-caption text-caption text-outline">
<span>Dr. Ananya Sen</span>
<span>8 min read</span>
</div>
</div>
</div>
</div>
</div>
{/* Comment / Medical Community Section */}
<div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-6">
<div className="flex items-center justify-between pb-4 border-b border-surface-variant mb-6">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary-container" style={{"fontSize":"20px"}}>forum</span>
<h3 className="font-headline-h2 text-headline-h2 text-on-surface font-bold">
              Questions &amp; Medical Community Discussion (18)
            </h3>
</div>
<span className="font-caption text-caption text-outline">Moderated by Curxx Clinical Board</span>
</div>
{/* Input Box */}
<div className="mb-8">
<div className="flex items-start gap-3">
<div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-outline font-caption-strong flex-shrink-0">
              U
            </div>
<div className="flex-1">
<textarea className="w-full p-3 rounded-lg border border-surface-variant bg-surface font-body-default text-body-default text-on-surface placeholder-outline focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition" placeholder="Ask Dr. Sen a question or share your experience with cardiac screening..." rows={3}></textarea>
<div className="flex items-center justify-between mt-2">
<span className="font-micro text-micro text-outline">Medical inquiries are addressed by certified specialists within 24 hours.</span>
<button className="px-4 py-2 bg-primary-container text-white rounded-lg font-body-strong text-body-strong hover:bg-primary transition duration-150 shadow-sm">
                  Post Question
                </button>
</div>
</div>
</div>
</div>
{/* Verified Threads */}
<div className="space-y-6">
{/* Thread 1 */}
<div className="p-4 rounded-lg bg-surface border border-surface-variant">
<div className="flex items-center justify-between mb-2">
<div className="flex items-center gap-2">
<span className="font-body-strong text-body-strong text-on-surface">Karthik R.</span>
<span className="font-micro text-micro px-2 py-0.5 rounded bg-surface-container-high text-outline">Verified Patient</span>
<span className="font-caption text-caption text-outline">• 2 days ago</span>
</div>
</div>
<p className="font-body-default text-body-default text-on-surface">
              I am 32 with a total cholesterol of 195, but my father had a stent placed at 48. My GP said I am fine because LDL is under 120. Should I specifically push for the ApoB and Lp(a) tests mentioned here?
            </p>
<div className="flex items-center gap-4 mt-3 pt-2 border-t border-surface-variant font-caption text-caption text-outline">
<button className="flex items-center gap-1 hover:text-primary transition-colors">
<span className="material-symbols-outlined" style={{"fontSize":"16px"}}>thumb_up</span>
<span>Helpful (14)</span>
</button>
<button className="hover:text-primary transition-colors">Reply</button>
</div>
{/* Doctor Reply */}
<div className="mt-3 pl-4 border-l-2 border-[#A7F3D0] pt-2">
<div className="flex items-center gap-2 mb-1">
<span className="font-body-strong text-body-strong text-on-surface">Dr. Ananya Sen</span>
<span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded bg-[#ECFDF5] text-[#047857] text-micro font-micro font-semibold">
<span className="material-symbols-outlined" style={{"fontSize":"10px","fontVariationSettings":"'FILL' 1"}}>verified</span>
                  Author
                </span>
<span className="font-caption text-caption text-outline">• 1 day ago</span>
</div>
<p className="font-body-default text-body-default text-on-surface-variant">
                Yes, absolutely Karthik. Given your positive first-degree paternal family history, relying exclusively on LDL-C is clinically inadequate. A one-time Lp(a) along with ApoB will establish if your particle count or genetic risk outpaces standard lipid metrics.
              </p>
</div>
</div>
{/* Thread 2 */}
<div className="p-4 rounded-lg bg-surface border border-surface-variant">
<div className="flex items-center justify-between mb-2">
<div className="flex items-center gap-2">
<span className="font-body-strong text-body-strong text-on-surface">Sneha Venkatesh</span>
<span className="font-micro text-micro px-2 py-0.5 rounded bg-surface-container-high text-outline">Verified Patient</span>
<span className="font-caption text-caption text-outline">• 4 days ago</span>
</div>
</div>
<p className="font-body-default text-body-default text-on-surface">
              Is fasting strictly mandated before an hs-CRP test, or can it be drawn concurrently with a random metabolic panel?
            </p>
<div className="flex items-center gap-4 mt-3 pt-2 border-t border-surface-variant font-caption text-caption text-outline">
<button className="flex items-center gap-1 hover:text-primary transition-colors">
<span className="material-symbols-outlined" style={{"fontSize":"16px"}}>thumb_up</span>
<span>Helpful (8)</span>
</button>
<button className="hover:text-primary transition-colors">Reply</button>
</div>
</div>
</div>
</div>
</div>
</section>
<Footer />

    </>
  );
}
