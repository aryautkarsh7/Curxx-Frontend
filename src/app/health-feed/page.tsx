
'use client';
import Link from 'next/link';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function CurxxHealthFeedEditorialArticlesPage() {
  return (
    <>
      
<Header />
{/* Topic Chip Bar (Horizontally scrollable/wrapping) */}
<section className="bg-surface-container-lowest border-b border-surface-variant py-2.5">
<div className="w-full max-w-[1200px] mx-auto px-margin-desktop flex items-center justify-between gap-3 overflow-x-auto no-scrollbar">
<div className="flex items-center gap-2 flex-nowrap shrink-0">
{/* Active Chip */}
<button className="h-8 px-4 rounded-full bg-[#FFF1F2] border border-[#F9C6C9] text-primary-container text-caption-strong font-caption-strong flex items-center justify-center transition duration-150">
          All
        </button>
{/* Inactive Chips */}
<button className="h-8 px-3.5 rounded-full bg-surface-container-low border border-surface-variant text-on-surface-variant hover:text-primary hover:border-outline-variant text-caption font-caption flex items-center justify-center transition duration-150">
          Skin &amp; Hair
        </button>
<button className="h-8 px-3.5 rounded-full bg-surface-container-low border border-surface-variant text-on-surface-variant hover:text-primary hover:border-outline-variant text-caption font-caption flex items-center justify-center transition duration-150">
          Women&apos;s Health
        </button>
<button className="h-8 px-3.5 rounded-full bg-surface-container-low border border-surface-variant text-on-surface-variant hover:text-primary hover:border-outline-variant text-caption font-caption flex items-center justify-center transition duration-150">
          Mental Health
        </button>
<button className="h-8 px-3.5 rounded-full bg-surface-container-low border border-surface-variant text-on-surface-variant hover:text-primary hover:border-outline-variant text-caption font-caption flex items-center justify-center transition duration-150">
          Diabetes
        </button>
<button className="h-8 px-3.5 rounded-full bg-surface-container-low border border-surface-variant text-on-surface-variant hover:text-primary hover:border-outline-variant text-caption font-caption flex items-center justify-center transition duration-150">
          Heart
        </button>
<button className="h-8 px-3.5 rounded-full bg-surface-container-low border border-surface-variant text-on-surface-variant hover:text-primary hover:border-outline-variant text-caption font-caption flex items-center justify-center transition duration-150">
          Nutrition
        </button>
<button className="h-8 px-3.5 rounded-full bg-surface-container-low border border-surface-variant text-on-surface-variant hover:text-primary hover:border-outline-variant text-caption font-caption flex items-center justify-center transition duration-150">
          Child Care
        </button>
<button className="h-8 px-3.5 rounded-full bg-surface-container-low border border-surface-variant text-on-surface-variant hover:text-primary hover:border-outline-variant text-caption font-caption flex items-center justify-center transition duration-150">
          Fitness
        </button>
</div>
{/* Quick Search / Filter helper */}
<div className="hidden sm:flex items-center gap-1.5 shrink-0 text-caption font-caption text-outline pl-4 border-l border-surface-variant">
<span className="material-symbols-outlined text-base" data-icon="verified_user">verified_user</span>
<span>Peer-Reviewed Clinical Sources</span>
</div>
</div>
</section>
{/* Main Content Canvas */}
<main className="w-full max-w-[1200px] mx-auto px-margin-desktop py-space-xl flex-grow flex flex-col gap-space-xl">
{/* Featured Hero Article (Wide 16:9 Banner) */}
<article className="relative w-full aspect-[21/9] min-h-[360px] rounded-xl overflow-hidden border border-surface-variant group cursor-pointer shadow-sm">
<img className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" data-alt="A focused young Indian corporate professional undergoing an advanced digital cardiovascular screening with a stethoscope and electrocardiogram monitor visible in a high-tech modern clinic in Bengaluru. Natural diffused window lighting illuminating clean white and clinical sterile surfaces, conveying dignity, clinical accuracy, and contemporary healthcare." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBumkoJsuUedOqRokLITRgoKl26h1ZeKRqWERGAKXvH9dIxQbPwcmJ4FfcehDfz-MGkTp_w1vUb0JxOL9cMW2s94x6fqsdu_Mw7hvS37VyplfBAoPwat75j1Wh01XL60FYNoKppKIbl1f-KoBmvPfJ8zLHWCphG91K5vroBEgBNIM7XfbK4lhin-yFRU7cNc8d_STPDQUIqGYOnHDHtJ0v97LmbwA1xCpwjiIpJdTMf-ZDuB0ifim21"/>
{/* Dark gradient scrim over bottom 65% */}
<div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/95 via-[#1C1917]/70 to-transparent"></div>
{/* Overlaid Details on Image */}
<div className="absolute inset-0 p-space-xl flex flex-col justify-end text-white">
<div className="max-w-3xl flex flex-col gap-space-sm">
{/* Category Chip */}
<div className="flex items-center gap-2">
<span className="bg-black/40 backdrop-blur-md border border-white/20 text-white px-3 py-1 rounded-full text-micro font-caption-strong uppercase tracking-wider">
              Cardiology &amp; Preventive Care
            </span>
<span className="bg-primary-container text-white px-2 py-0.5 rounded text-micro font-micro font-semibold uppercase">
              Featured Analysis
            </span>
</div>
{/* Headline in Display Font */}
<h1 className="text-display font-display text-white tracking-tight leading-tight group-hover:text-primary-fixed-dim transition-colors duration-200">
            The 30-Year-Old&apos;s Guide to Preventing Early Cardiovascular Disease in Urban India
          </h1>
{/* Author Byline & Verification Credentials */}
<div className="flex flex-wrap items-center gap-3 pt-2 text-surface-variant">
<div className="flex items-center gap-2.5">
<img className="w-9 h-9 rounded-full object-cover border border-white/40" data-alt="Close up clinical portrait of Dr. Ananya Sen, an Indian female cardiologist wearing professional physician attire and stethoscope around her neck. Pristine hospital setting, warm empathetic clinical gaze, crisp studio lighting on neutral background." src="https://lh3.googleusercontent.com/aida-public/AB6AXuB28kewszuaiE9KAc3b6YwM_egExIodIukMWw5TMAGjqskY-n1xZGX-7EF6ZiTJu5S9kjW24m8VyV6KBVg4gDK5VYkBSFGdHDBOP0B0GopsoZXCdI2OFC-sXP49eSzy4Yew6QnQBN4RrUE-o6B_0a8lJnA5dTVeyaQirRYJAnt4dCzIt1ifAXPIiBiyr90hpdPTO_Qizhl4UA96rYWb3DC5NNgzykbezAtDitWOOmPXNXUgWsAgae0n"/>
<div className="flex flex-col">
<span className="text-caption-strong font-caption-strong text-white leading-tight">Dr. Ananya Sen, MD</span>
<span className="text-micro font-micro text-surface-container-high leading-tight">Consultant Cardiologist</span>
</div>
</div>
<span className="text-white/40">•</span>
{/* Medically Reviewed Verified Badge */}
<div className="inline-flex items-center gap-1 bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857] px-2 py-0.5 rounded text-micro font-caption-strong">
<span className="material-symbols-outlined text-sm text-[#047857]" data-icon="verified" data-weight="fill" style={{"fontVariationSettings":"'FILL' 1"}}>verified</span>
<span>Medically reviewed</span>
</div>
<span className="text-white/40">•</span>
<span className="text-caption font-caption text-surface-container">
              6 min read · Updated 14 Oct 2025
            </span>
</div>
</div>
</div>
</article>
{/* Split Layout: Main Section (70%) and Sticky Sidebar (30%) with 32px (space-xl) gap */}
<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
{/* Main Section (8 cols / approx 70%) */}
<section className="lg:col-span-8 flex flex-col gap-space-lg">
<div className="flex items-center justify-between border-b border-surface-variant pb-3">
<div>
<h2 className="text-headline-h2 font-headline-h2 text-on-surface font-semibold">Latest Clinical Reviews</h2>
<p className="text-caption font-caption text-outline">Authored exclusively by registered MBBS, MD &amp; DM medical specialists</p>
</div>
<div className="flex items-center gap-2">
<span className="text-caption font-caption text-outline">Sort:</span>
<button className="text-caption-strong font-caption-strong text-primary flex items-center gap-0.5">
              Recent <span className="material-symbols-outlined text-sm" data-icon="keyboard_arrow_down">keyboard_arrow_down</span>
</button>
</div>
</div>
{/* 2-Column Responsive Bento-Style Article Grid beside sidebar */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
{/* Card 1: Adult Acne */}
<article className="bg-surface-container-lowest border border-surface-variant rounded-xl overflow-hidden flex flex-col hover:border-outline-variant transition duration-200 shadow-sm group">
<div className="relative aspect-[16/9] w-full overflow-hidden bg-surface-container">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="A clinical dermatological setup showing gentle pH-balanced formulations, hyaluronic acid, and SPF sunscreen bottles arranged on a clean white granite medical counter in Mumbai under soft natural day light." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCghcyHiV8fBEcC22AQOIrbnlt0bEw_g45yXbWsMJoJSeKkZ56_hgKwnGXiWLmI6AMa_Twz7qQzFMw3B7hMucUkFteSKlUM2mgPOUShgJOzXYN2N-SRqqUBp4tmFaTCd0Cgm4KIqfcRwC97GQeMu8EP9P5OLgBPtEbxRaPJwcPcY39eCbbKWw7jr0gPph3sRAbXhGBAlsBNJQLIdkIeW5Ek4uzPdElxNEP1HGYtIbVzszyrwMlF_YXT"/>
<span className="absolute top-3 left-3 bg-surface-container-lowest/90 backdrop-blur-sm border border-surface-variant text-on-surface px-2.5 py-0.5 rounded-full text-micro font-caption-strong">
                Skin &amp; Hair
              </span>
</div>
<div className="p-space-base flex flex-col flex-grow justify-between gap-space-md">
<div className="flex flex-col gap-1.5">
<h3 className="text-headline-h3 font-headline-h3 text-on-surface group-hover:text-primary transition-colors duration-150 line-clamp-2">
                  Adult Acne in Humid Climates: Dermatologist-Approved Routine
                </h3>
<p className="text-caption font-caption text-outline line-clamp-2">
                  High humidity triggers excess sebum synthesis and barrier breakdown. Here is the step-by-step evidence-backed regimen.
                </p>
</div>
<div className="flex items-center justify-between pt-2 border-t border-surface-variant">
<div className="flex items-center gap-2">
<img className="w-7 h-7 rounded-full object-cover border border-surface-variant" data-alt="Clinical avatar of female Indian dermatologist Dr. Priya Sharma in professional medical white coat in clinic room." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6ZcNy5oW3JdsnyVwx-BysXKc6XCHNnxigtCCMOZASusZFRlI12NFh6v0VbGyje9_lS0OaZowhY6MSPYOsYaNJReMMjO7EGye-NExL5aPGE9jNCZ70gQ-aG3Oml0U_bFMNs-sdNkHhiSUlqsQ8YI-cPpeGrFsyEgwqn64HEFGD6_Oq0UXf1TFijJQz25dLOAeBDdfp1tXZAxD5FZGVaofFLXWE35nWcFC7ijpGLhOxp0J3zQajz0MM"/>
<div className="flex flex-col">
<span className="text-micro font-caption-strong text-on-surface leading-tight">Dr. Priya Sharma, MD</span>
<span className="text-micro font-micro text-outline leading-tight">4 min read</span>
</div>
</div>
<button aria-label="Bookmark article" className="text-outline hover:text-primary p-1 rounded transition-colors">
<span className="material-symbols-outlined" data-icon="bookmark_border">bookmark_border</span>
</button>
</div>
</div>
</article>
{/* Card 2: Prediabetes */}
<article className="bg-surface-container-lowest border border-surface-variant rounded-xl overflow-hidden flex flex-col hover:border-outline-variant transition duration-200 shadow-sm group">
<div className="relative aspect-[16/9] w-full overflow-hidden bg-surface-container">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="A balanced Indian diabetic plate with whole grains, sprouted lentils, colorful low-glycemic vegetables and a continuous glucose monitor display screen in a modern bright kitchen." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnremQJBDSKtIK2CFkzhwxlpMNNhlvEICwAwjK59qA3sKRELJ9JuKWUTh0Sm5F7YSV5Uhjk-JKVpGaOggvKNgYg_VWFBFZn1TFXLNBSIS-JiF9iXPFbpyUDA9xmBKe-zx8JuhiawNxyx4l0bP6RYk9An2uJKNZp40QLobAGq6nDxrnCKWHYYM_wU72fTT9LhZlbouXsIglLhxKH0uwAHr58kiR9Y2PUzXNq9swEQBFNSM71Gpqix7E"/>
<span className="absolute top-3 left-3 bg-surface-container-lowest/90 backdrop-blur-sm border border-surface-variant text-on-surface px-2.5 py-0.5 rounded-full text-micro font-caption-strong">
                Diabetes
              </span>
</div>
<div className="p-space-base flex flex-col flex-grow justify-between gap-space-md">
<div className="flex flex-col gap-1.5">
<h3 className="text-headline-h3 font-headline-h3 text-on-surface group-hover:text-primary transition-colors duration-150 line-clamp-2">
                  Reversing Prediabetes: A Clinically Backed 90-Day Nutrition Plan
                </h3>
<p className="text-caption font-caption text-outline line-clamp-2">
                  Glycemic spikes from refined carbohydrates are manageable with strategic macronutrient sequencing and timed walking.
                </p>
</div>
<div className="flex items-center justify-between pt-2 border-t border-surface-variant">
<div className="flex items-center gap-2">
<img className="w-7 h-7 rounded-full object-cover border border-surface-variant" data-alt="Doctor portrait of Dr. Arvind Kumar, an experienced Indian endocrinologist with stethoscope against a minimalist clinical hospital backdrop." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1xgZRG4T8sLO2k8pDZ1I3O-MuozechO148UsiYq1-c2V44k3jDdF19GnXnW56IxIWypEd-pRWrxb9e63WlKvPbwONmwXnNxFfOM1JR-B6SJ8M338g_cQonQt4BlQ57dC1c29kJPvnUc4lA36CYXLOsfVszGH5PcG31_NrdQu0fNDospFaH1tyy81u_yq9sagNPDsQmH5YdmQOLSjngVg1YkGRmwZGzCThbA9osqgo06Ciad7zAA55"/>
<div className="flex flex-col">
<span className="text-micro font-caption-strong text-on-surface leading-tight">Dr. Arvind Kumar, MBBS, MD</span>
<span className="text-micro font-micro text-outline leading-tight">6 min read</span>
</div>
</div>
<button aria-label="Bookmark article" className="text-outline hover:text-primary p-1 rounded transition-colors">
<span className="material-symbols-outlined" data-icon="bookmark_border">bookmark_border</span>
</button>
</div>
</div>
</article>
{/* Card 3: Anxiety vs Panic */}
<article className="bg-surface-container-lowest border border-surface-variant rounded-xl overflow-hidden flex flex-col hover:border-outline-variant transition duration-200 shadow-sm group">
<div className="relative aspect-[16/9] w-full overflow-hidden bg-surface-container">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="A peaceful therapeutic mental health counseling room with soft natural daylight, minimalist modern wooden interior, a comfortable armchair, and tranquil potted plants." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIH3YM7oUDOZGWAzJiZQGP8ElXWm9OzkHEcQcvLY4onMnKQZt_adJDs0q9HFWFBGLEAUiu4QWmEaSBsC7vR3oUrbAhwqWrt8Lv-CKtamyXuJgtQSuP2_1XtwyWhygWBaCpKQPgyZqt0IgWHzBo9A0wOQG7TAQs8FueNOwg2W5Telgpz_lVeet6nChiS5cwNREDdov4DDDqKXiSk2LDQWNI6GWvfsoVLKZPhi_ocTlK3hnrMEymnoNd"/>
<span className="absolute top-3 left-3 bg-surface-container-lowest/90 backdrop-blur-sm border border-surface-variant text-on-surface px-2.5 py-0.5 rounded-full text-micro font-caption-strong">
                Mental Health
              </span>
</div>
<div className="p-space-base flex flex-col flex-grow justify-between gap-space-md">
<div className="flex flex-col gap-1.5">
<h3 className="text-headline-h3 font-headline-h3 text-on-surface group-hover:text-primary transition-colors duration-150 line-clamp-2">
                  Understanding Anxiety vs Panic Attacks: When to Seek Psychiatric Care
                </h3>
<p className="text-caption font-caption text-outline line-clamp-2">
                  Somatic symptoms like tachycardia and air hunger mimic acute coronary syndromes. Learn critical differentiators.
                </p>
</div>
<div className="flex items-center justify-between pt-2 border-t border-surface-variant">
<div className="flex items-center gap-2">
<img className="w-7 h-7 rounded-full object-cover border border-surface-variant" data-alt="Professional doctor avatar of Dr. Neha Rao, an Indian psychiatrist with gentle confident demeanor in a bright office environment." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsNKtHV9PkiZHzgkGPhobc-iOS-bui8OURa8aqn15p2cC-TzbwBiGvbxPPkB30pEMIFWOeUvIu9gGwsuvDIG3RZg2_oZJT1go7LMMRLrM2M0NlMyyoVjk1J3OCh2wIMuCuYeV_o947wvdzdqqmDHdV434Lb1WL751TwA_czVTt8Ntk2vyRYu2_lrVcpDUJcebQjBvhWOJlfaZ5L-hdmHPG8Hj7xgj_Caj1FMTk7LgRhYOZc2rt3nFi"/>
<div className="flex flex-col">
<span className="text-micro font-caption-strong text-on-surface leading-tight">Dr. Neha Rao, MD</span>
<span className="text-micro font-micro text-outline leading-tight">5 min read</span>
</div>
</div>
<button aria-label="Bookmark article" className="text-outline hover:text-primary p-1 rounded transition-colors">
<span className="material-symbols-outlined" data-icon="bookmark_border">bookmark_border</span>
</button>
</div>
</div>
</article>
{/* Card 4: Anemia in Indian Women */}
<article className="bg-surface-container-lowest border border-surface-variant rounded-xl overflow-hidden flex flex-col hover:border-outline-variant transition duration-200 shadow-sm group">
<div className="relative aspect-[16/9] w-full overflow-hidden bg-surface-container">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="A clinical lab hematology testing device with blood sample vials and digital hemoglobin results on an immaculate glass desk in an accredited pathology lab." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCJwkVD2IRVK_sLY0Blv0KvKFwsL97BHIZKyIUBAdf2LWCqZuKLUtL1AhzUId7_C3zC56l53kOmWGBfVHma_TJDBXN_KSb2sdkEZvPxxDlJ4GDH14jSVrGvQMqSdzTII_FEyy2pVpPsqiztOgiTEci1VFlF0fTx7W_2T-Tp930mjhwiYY7TtODpCO287HrDCjiFDU8XzHHFKGNX0Guiisd9yXXZnT5BNYHSCgoDUFjq_Q2FBzMk6dY"/>
<span className="absolute top-3 left-3 bg-surface-container-lowest/90 backdrop-blur-sm border border-surface-variant text-on-surface px-2.5 py-0.5 rounded-full text-micro font-caption-strong">
                Women&apos;s Health
              </span>
</div>
<div className="p-space-base flex flex-col flex-grow justify-between gap-space-md">
<div className="flex flex-col gap-1.5">
<h3 className="text-headline-h3 font-headline-h3 text-on-surface group-hover:text-primary transition-colors duration-150 line-clamp-2">
                  Iron Deficiency Anemia in Indian Women: Symptoms You Shouldn&apos;t Ignore
                </h3>
<p className="text-caption font-caption text-outline line-clamp-2">
                  Subtle cognitive fog, cold extremities, and brittle nails frequently precede critical drops in ferritin levels.
                </p>
</div>
<div className="flex items-center justify-between pt-2 border-t border-surface-variant">
<div className="flex items-center gap-2">
<img className="w-7 h-7 rounded-full object-cover border border-surface-variant" data-alt="Portrait of Dr. Sunita Patel, an Indian gynecologist and obstetrician in white consultation coat inside an advanced clinical facility." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhijmVXy-HfdaxhSXk9hJ6S7PT1aftWLg9A0rOaGnyV529gmlFuU89mn-7BpTpug27VEkgFIUMShvMl73KKqXQxSY5Oz0en1YjMiwcSANvOsbYjP7aNzlM32k4u6fFnrf10NsuH1LuX-dBT2oN1MhOMtYt7O2YF8nWKsqmX6CwmiC5lQZiTHRhK6UTTVkNhNI3skSjGzPdMg2FwxWwQZzEmIqJzF3xEYm44Jo1Qlmy0CFvJjW56rai"/>
<div className="flex flex-col">
<span className="text-micro font-caption-strong text-on-surface leading-tight">Dr. Sunita Patel, MD</span>
<span className="text-micro font-micro text-outline leading-tight">7 min read</span>
</div>
</div>
<button aria-label="Bookmark article" className="text-outline hover:text-primary p-1 rounded transition-colors">
<span className="material-symbols-outlined" data-icon="bookmark_border">bookmark_border</span>
</button>
</div>
</div>
</article>
{/* Card 5: Intermittent Fasting */}
<article className="bg-surface-container-lowest border border-surface-variant rounded-xl overflow-hidden flex flex-col hover:border-outline-variant transition duration-200 shadow-sm group">
<div className="relative aspect-[16/9] w-full overflow-hidden bg-surface-container">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="A clean clinical laboratory timer beside an anatomical cellular metabolism infographic with warm morning light streaming onto a physician research table." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGAttkIjwiLHTz7bKjTAvRV_pGKsUlcb1UTJRJYDxXhbXZQuNPVFdGt_nKc-8G4-O0ydFcsEaNKb0zmuhTjM2_KHkt-XtbL6MoljFoUuoT_E3duo631fJbv8iU73iOm6i9Rbdjsfms2s5N_MZNBpNxd3oB6dZpGxhGBDOYGnAH4jRYTDfrkiNiFq1-e8iu3qNhjaBHEvHjv6-4Z9M-h_KQ2tmRO30z4iBzuVt9rMSLAX0lp6uTI47y"/>
<span className="absolute top-3 left-3 bg-surface-container-lowest/90 backdrop-blur-sm border border-surface-variant text-on-surface px-2.5 py-0.5 rounded-full text-micro font-caption-strong">
                Nutrition
              </span>
</div>
<div className="p-space-base flex flex-col flex-grow justify-between gap-space-md">
<div className="flex flex-col gap-1.5">
<h3 className="text-headline-h3 font-headline-h3 text-on-surface group-hover:text-primary transition-colors duration-150 line-clamp-2">
                  Intermittent Fasting &amp; Insulin Sensitivity: What the Latest Trials Say
                </h3>
<p className="text-caption font-caption text-outline line-clamp-2">
                  Reviewing 2024 meta-analyses comparing 16:8 protocols with continuous caloric restriction across metabolic cohorts.
                </p>
</div>
<div className="flex items-center justify-between pt-2 border-t border-surface-variant">
<div className="flex items-center gap-2">
<img className="w-7 h-7 rounded-full object-cover border border-surface-variant" data-alt="Headshot of Dr. K. S. Murthy, senior physician researcher in internal medicine, clean lit background in an Indian university medical institute." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1Wola4YBOUoBUFyXW6KGEvGvCAuczhgfnDknC25gKlfO7aKjUuDszEJ34q2mdBnn3-oN6vE0-cszNVRSVGvVUlQWhxfHcg1aOioiHV08_-NmEH79qpIhguBjUIFSntH3RJ9RberTriCST21kKJbBZo2UeSfQdrOk-uUTesNa3rpf0-8aU5cmmIyA5-Jv8vK5ul5FQCPeoujjKn1J5-o2dacQbKltEv9eQ9VVULxsmUonGeilzZec5"/>
<div className="flex flex-col">
<span className="text-micro font-caption-strong text-on-surface leading-tight">Dr. K. S. Murthy, MD</span>
<span className="text-micro font-micro text-outline leading-tight">5 min read</span>
</div>
</div>
<button aria-label="Bookmark article" className="text-outline hover:text-primary p-1 rounded transition-colors">
<span className="material-symbols-outlined" data-icon="bookmark_border">bookmark_border</span>
</button>
</div>
</div>
</article>
{/* Card 6: Post-Viral Fatigue */}
<article className="bg-surface-container-lowest border border-surface-variant rounded-xl overflow-hidden flex flex-col hover:border-outline-variant transition duration-200 shadow-sm group">
<div className="relative aspect-[16/9] w-full overflow-hidden bg-surface-container">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="A modern sleep study and circadian vitals monitoring setup with pulse oximeter and resting heart rate telemetry in a quiet contemporary bedroom." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzPFep5MJ-SSNTSOguY7om4obiZSqwp8YE8pGJEorq77DfqAooiTQ_AcjgVCxq4PJMxVCfI698RxXjJinmRwgbQOTHGw4c9HBayXkdaY2rZXtYma-_3_Txwzg8F4PpNaPf4h2NOCs-LU9EGkUO7_Y6yP3j81J2NjcBn-LCns2aamYDINDe6g8GSUDUGtpPcw2_kDP63G0jG3UM-VYOLXkQx6iZnJbejdbF70TzSAiatTkSm9iFrfoC"/>
<span className="absolute top-3 left-3 bg-surface-container-lowest/90 backdrop-blur-sm border border-surface-variant text-on-surface px-2.5 py-0.5 rounded-full text-micro font-caption-strong">
                General Medicine
              </span>
</div>
<div className="p-space-base flex flex-col flex-grow justify-between gap-space-md">
<div className="flex flex-col gap-1.5">
<h3 className="text-headline-h3 font-headline-h3 text-on-surface group-hover:text-primary transition-colors duration-150 line-clamp-2">
                  Post-Viral Fatigue: How Long Does Recovery Really Take?
                </h3>
<p className="text-caption font-caption text-outline line-clamp-2">
                  Differentiating normal post-infection convalescence from myalgic encephalopathy and mitochondrial sluggishness.
                </p>
</div>
<div className="flex items-center justify-between pt-2 border-t border-surface-variant">
<div className="flex items-center gap-2">
<img className="w-7 h-7 rounded-full object-cover border border-surface-variant" data-alt="Avatar portrait of Dr. Rajesh Gupta, physician in infectious diseases wearing navy scrub jacket in sterile hospital hallway." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDaNREo0Fk2b3Z9eASVPkYaLZamoPl6Jmov2LmXRXs_jvznbL1HYYgfW56PzjcyrtNpJjDrmBo4gK2lpSG6-4kummsnbwJgv6vYeOlTlTfgs5Kst4hjO7m-v-q07_MfRzWrVmDGQSxaKHpVeQxWfBP9zri4XyHEHALwMzku3WkO4TTePkks-5yVjiswj0kT-I778B0YP_0hK_LN2irEgxPCdkL2T-ClcTHazys7wbMNh6NsdsFfqR5_"/>
<div className="flex flex-col">
<span className="text-micro font-caption-strong text-on-surface leading-tight">Dr. Rajesh Gupta, MD</span>
<span className="text-micro font-micro text-outline leading-tight">4 min read</span>
</div>
</div>
<button aria-label="Bookmark article" className="text-outline hover:text-primary p-1 rounded transition-colors">
<span className="material-symbols-outlined" data-icon="bookmark_border">bookmark_border</span>
</button>
</div>
</div>
</article>
</div>
{/* Pagination / Load More Button */}
<div className="flex justify-center pt-4">
<Link href="/health-feed" className="inline-flex items-center gap-2 bg-surface-container-lowest border border-surface-variant text-on-surface px-6 py-2.5 rounded-lg text-body-strong font-body-strong hover:bg-surface-container-low transition duration-150 shadow-sm">
<span>Load More Verified Articles</span>
<span className="material-symbols-outlined text-base" data-icon="arrow_downward">arrow_downward</span>
</Link>
</div>
</section>
{/* Right Sidebar (4 cols / approx 30%) - Sticky */}
<aside className="lg:col-span-4 flex flex-col gap-space-lg sticky top-24">
{/* 1. Trending Reads List */}
<div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-space-lg shadow-sm">
<div className="flex items-center justify-between pb-3 border-b border-surface-variant">
<h3 className="text-headline-h3 font-headline-h3 text-on-surface flex items-center gap-2">
<span className="material-symbols-outlined text-primary-container" data-icon="trending_up">trending_up</span>
<span>Trending Reads</span>
</h3>
<span className="text-micro font-micro bg-surface-container px-2 py-0.5 rounded text-outline uppercase font-semibold">Today</span>
</div>
<ol className="divide-y divide-surface-variant flex flex-col">
{/* Item 1 */}
<li className="py-3 flex items-start gap-3 group cursor-pointer">
<span className="text-headline-h2 font-display text-primary-container font-bold w-5 shrink-0">1</span>
<div className="flex flex-col gap-0.5">
<h4 className="text-caption-strong font-caption-strong text-on-surface group-hover:text-primary transition-colors line-clamp-2">
                  Dengue Warning Signs: Platelet Counts vs Plasma Leakage
                </h4>
<div className="flex items-center gap-2 text-micro font-micro text-outline">
<span>3 min read</span>
<span>•</span>
<span>14.2k views</span>
</div>
</div>
</li>
{/* Item 2 */}
<li className="py-3 flex items-start gap-3 group cursor-pointer">
<span className="text-headline-h2 font-display text-outline-variant font-bold w-5 shrink-0">2</span>
<div className="flex flex-col gap-0.5">
<h4 className="text-caption-strong font-caption-strong text-on-surface group-hover:text-primary transition-colors line-clamp-2">
                  Why Vitamin B12 Deficiency is Rampant in Vegetarian Diets
                </h4>
<div className="flex items-center gap-2 text-micro font-micro text-outline">
<span>5 min read</span>
<span>•</span>
<span>11.8k views</span>
</div>
</div>
</li>
{/* Item 3 */}
<li className="py-3 flex items-start gap-3 group cursor-pointer">
<span className="text-headline-h2 font-display text-outline-variant font-bold w-5 shrink-0">3</span>
<div className="flex flex-col gap-0.5">
<h4 className="text-caption-strong font-caption-strong text-on-surface group-hover:text-primary transition-colors line-clamp-2">
                  Interpreting Your Lipid Profile: Beyond Total Cholesterol
                </h4>
<div className="flex items-center gap-2 text-micro font-micro text-outline">
<span>6 min read</span>
<span>•</span>
<span>9.4k views</span>
</div>
</div>
</li>
{/* Item 4 */}
<li className="py-3 flex items-start gap-3 group cursor-pointer">
<span className="text-headline-h2 font-display text-outline-variant font-bold w-5 shrink-0">4</span>
<div className="flex flex-col gap-0.5">
<h4 className="text-caption-strong font-caption-strong text-on-surface group-hover:text-primary transition-colors line-clamp-2">
                  Air Quality Index (AQI) 300+: Pulmonologist&apos;s Home Defense Checklist
                </h4>
<div className="flex items-center gap-2 text-micro font-micro text-outline">
<span>4 min read</span>
<span>•</span>
<span>8.7k views</span>
</div>
</div>
</li>
{/* Item 5 */}
<li className="py-3 flex items-start gap-3 group cursor-pointer">
<span className="text-headline-h2 font-display text-outline-variant font-bold w-5 shrink-0">5</span>
<div className="flex flex-col gap-0.5">
<h4 className="text-caption-strong font-caption-strong text-on-surface group-hover:text-primary transition-colors line-clamp-2">
                  Thyroid Nodules: When is an FNAC Biopsy Truly Warranted?
                </h4>
<div className="flex items-center gap-2 text-micro font-micro text-outline">
<span>7 min read</span>
<span>•</span>
<span>6.9k views</span>
</div>
</div>
</li>
</ol>
</div>
{/* 2. "Ask a Free Medical Question" CTA Card */}
<div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-space-lg shadow-sm flex flex-col gap-3">
<div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-2xl" data-icon="medical_services">medical_services</span>
</div>
<div>
<h3 className="text-headline-h3 font-headline-h3 text-on-surface">Ask a Free Medical Question</h3>
<p className="text-caption font-caption text-outline mt-1">
              Have a symptom or question? Get an answer from verified clinicians within 24h.
            </p>
</div>
<Link href="/consult/lobby/cx-88421" className="w-full h-11 rounded-lg border border-[#C1121F] text-primary font-body-strong text-body-strong hover:bg-surface-container-low transition duration-150 flex items-center justify-center gap-2 mt-1">
<span className="material-symbols-outlined text-lg" data-icon="chat">chat</span>
<span>Ask a Doctor</span>
</Link>
<div className="flex items-center justify-center gap-1 text-micro font-micro text-outline">
<span className="material-symbols-outlined text-xs text-[#047857]" data-icon="lock">lock</span>
<span>100% Private &amp; Anonymized</span>
</div>
</div>
{/* 3. "Consult a Doctor" Promotion Card (quick video consult tag) */}
<div className="bg-[#FFF1F2] border border-[#F9C6C9] rounded-xl p-space-lg shadow-sm flex flex-col gap-3">
<div className="flex items-center justify-between">
<span className="bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857] px-2.5 py-0.5 rounded-full text-micro font-caption-strong flex items-center gap-1">
<span className="w-2 h-2 rounded-full bg-[#047857] animate-ping"></span>
<span>Available in 10 mins</span>
</span>
<span className="text-caption-strong font-caption-strong text-primary">₹399 onwards</span>
</div>
<div>
<h3 className="text-headline-h3 font-headline-h3 text-on-surface">Consult a Doctor Online</h3>
<p className="text-caption font-caption text-outline mt-1">
              Instant video consult with verified specialists across 25+ medical disciplines. Valid digital e-prescription included.
            </p>
</div>
<Link href="/bangalore/doctors" className="w-full h-11 rounded-lg bg-[#C1121F] text-white font-body-strong text-body-strong hover:bg-[#8E0E17] transition duration-150 flex items-center justify-center gap-2 shadow-sm">
<span className="material-symbols-outlined text-lg" data-icon="video_call">video_call</span>
<span>Find a Doctor</span>
</Link>
</div>
</aside>
</div>
{/* Newsletter Signup Band (Full container width) */}
<section className="w-full bg-[#FFF1F2] border border-[#F9C6C9] rounded-xl p-space-xl my-space-base shadow-sm">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
{/* Left details */}
<div className="lg:col-span-7 flex flex-col gap-2">
<div className="flex items-center gap-2">
<span className="bg-primary-container text-white px-2 py-0.5 rounded text-micro font-caption-strong uppercase tracking-wider">
              CURXX MEDICAL BRIEFING
            </span>
<span className="text-micro font-micro text-outline font-semibold">Every Sunday</span>
</div>
<h2 className="text-headline-h2 font-headline-h2 text-on-surface font-bold tracking-tight">
            Evidence-based health insights, reviewed by doctors, in your inbox every Sunday
          </h2>
<p className="text-body-default font-body-default text-outline">
            No spam, no pseudo-science. Only peer-reviewed clinical guidance tailored for Indian lifestyle conditions.
          </p>
</div>
{/* Right subscription input */}
<div className="lg:col-span-5 flex flex-col gap-2">
<form className="flex flex-col sm:flex-row gap-2" onSubmit={(e) => e.preventDefault()}>
<div className="relative flex-grow">
<span className="absolute inset-y-0 left-3 flex items-center text-outline">
<span className="material-symbols-outlined text-lg" data-icon="mail">mail</span>
</span>
<input className="w-full h-12 pl-10 pr-3 rounded-lg bg-white border border-[#E7E5E4] text-on-surface placeholder-[#78716C] text-body-default focus:border-[#C1121F] focus:ring-1 focus:ring-[#C1121F] outline-none" placeholder="Enter your email address" type="email"/>
</div>
<button className="h-12 px-6 rounded-lg bg-[#C1121F] hover:bg-[#8E0E17] text-white font-body-strong text-body-strong transition duration-150 shrink-0 flex items-center justify-center gap-1" type="submit">
<span>Subscribe Free</span>
</button>
</form>
<p className="text-micro font-micro text-outline">
            Join 140,000+ informed readers. Unsubscribe at any moment in one click.
          </p>
</div>
</div>
</section>
</main>
<Footer />

    </>
  );
}
