// Mock catalogue for the lab tests store until a diagnostics API exists.

export type LabParameterGroup = {
  name: string;
  icon: string;
  count: number;
  parameters: string[];
};

export type LabPackage = {
  slug: string;
  name: string;
  testsIncluded: number;
  /** e.g. "10 to 12"; null when no fasting is needed. */
  fastingHours: string | null;
  fastingLabel: string;
  covers: string;
  highlights: string[];
  price: number;
  mrp: number;
  discount: number;
  /** Footnote under the price on listing cards. */
  turnaround: string;
  reportTime: string;
  categories: string[];
  parameterGroups: LabParameterGroup[];
};

export type LabCategory = { slug: string; name: string; icon: string; countLabel: string };

export const LAB_CATEGORIES: LabCategory[] = [
  { slug: 'full-body', name: 'Full Body', icon: 'health_metrics', countLabel: '24 Packages' },
  { slug: 'diabetes', name: 'Diabetes', icon: 'bloodtype', countLabel: '18 Tests' },
  { slug: 'thyroid', name: 'Thyroid', icon: 'vital_signs', countLabel: '12 Tests' },
  { slug: 'vitamin-d-b12', name: 'Vitamin D & B12', icon: 'pill', countLabel: '9 Tests' },
  { slug: 'heart-health', name: 'Heart Health', icon: 'cardiology', countLabel: '15 Tests' },
  { slug: 'liver-function', name: 'Liver Function', icon: 'labs', countLabel: '14 Tests' },
  { slug: 'kidney-care', name: 'Kidney Care', icon: 'nephrology', countLabel: '11 Tests' },
  { slug: 'womens-health', name: "Women's Health", icon: 'female', countLabel: '22 Tests' },
  { slug: 'mens-health', name: "Men's Health", icon: 'male', countLabel: '16 Tests' },
  { slug: 'allergy-screen', name: 'Allergy Screen', icon: 'coronavirus', countLabel: '8 Panels' },
  { slug: 'fever-infections', name: 'Fever & Infections', icon: 'thermometer', countLabel: '19 Tests' },
  { slug: 'covid-respiratory', name: 'Covid & Respiratory', icon: 'pulmonology', countLabel: '7 Tests' },
];

const CBC: LabParameterGroup = { name: 'Complete Hemogram / CBC', icon: 'bloodtype', count: 24, parameters: ['Hemoglobin (Hb)', 'RBC Total Count', 'Total Leukocytes (WBC)', 'Platelet Count', 'Packed Cell Volume (PCV)', 'MCV, MCH, MCHC', 'Neutrophils & Lymphocytes', 'Monocytes & Eosinophils', 'Erythrocyte Sedimentation Rate'] };
const LFT: LabParameterGroup = { name: 'Liver Function Profile (LFT)', icon: 'vital_signs', count: 12, parameters: ['Bilirubin Total', 'Bilirubin Direct & Indirect', 'SGOT / AST', 'SGPT / ALT', 'Alkaline Phosphatase (ALP)', 'Serum Total Protein', 'Albumin & Globulin', 'A/G Ratio', 'Gamma Glutamyl Transferase'] };
const KFT: LabParameterGroup = { name: 'Kidney Function Test (KFT / RFT)', icon: 'water_drop', count: 8, parameters: ['Serum Urea', 'Blood Urea Nitrogen (BUN)', 'Serum Creatinine', 'BUN / Creatinine Ratio', 'Serum Uric Acid', 'Serum Calcium', 'Serum Phosphorus', 'eGFR Estimated'] };
const LIPID: LabParameterGroup = { name: 'Lipid Profile (Cardiovascular Risk)', icon: 'favorite', count: 8, parameters: ['Total Cholesterol', "HDL Cholesterol ('Good')", "LDL Cholesterol ('Bad')", 'VLDL Cholesterol', 'Serum Triglycerides', 'TC / HDL Ratio', 'LDL / HDL Ratio', 'Non-HDL Cholesterol'] };
const THYROID: LabParameterGroup = { name: 'Thyroid Profile (Total T3, T4, TSH)', icon: 'ecg', count: 3, parameters: ['Total Triiodothyronine (T3)', 'Total Thyroxine (T4)', 'Thyroid Stimulating Hormone (TSH)'] };
const HBA1C: LabParameterGroup = { name: 'Diabetic Screen (3-Month Sugar Average)', icon: 'colorize', count: 2, parameters: ['Glycated Hemoglobin (HbA1c)', 'Estimated Average Glucose (eAG)'] };
const VITAMINS: LabParameterGroup = { name: 'Vitamin Profile (Deficiency Scan)', icon: 'medication', count: 2, parameters: ['Vitamin D 25-Hydroxy (Total)', 'Vitamin B12 (Cyanocobalamin)'] };
const FASTING_GLUCOSE: LabParameterGroup = { name: 'Fasting Blood Sugar', icon: 'colorize', count: 1, parameters: ['Fasting Plasma Glucose (FBS)'] };
const MICROALBUMIN: LabParameterGroup = { name: 'Urine Microalbumin', icon: 'water_drop', count: 2, parameters: ['Urine Microalbumin', 'Albumin / Creatinine Ratio (ACR)'] };
const CARDIAC: LabParameterGroup = { name: 'Cardiac Risk Markers', icon: 'cardiology', count: 6, parameters: ['hs-CRP (High Sensitivity)', 'Apolipoprotein A1', 'Apolipoprotein B', 'Apo B / Apo A1 Ratio', 'Lipoprotein (a)', 'Homocysteine'] };
const ELECTROLYTES: LabParameterGroup = { name: 'Serum Electrolytes', icon: 'bolt', count: 3, parameters: ['Sodium (Na+)', 'Potassium (K+)', 'Chloride (Cl-)'] };
const BONE: LabParameterGroup = { name: 'Bone Health (Calcium & Vitamin D)', icon: 'accessibility_new', count: 5, parameters: ['Serum Calcium', 'Serum Phosphorus', 'Vitamin D 25-Hydroxy', 'Vitamin B12', 'Alkaline Phosphatase'] };
const ARTHRITIS: LabParameterGroup = { name: 'Arthritis Markers', icon: 'accessibility_new', count: 3, parameters: ['Serum Uric Acid', 'Rheumatoid Factor (RA)', 'Anti-CCP Antibodies'] };
const IRON: LabParameterGroup = { name: 'Iron Deficiency Profile', icon: 'bloodtype', count: 4, parameters: ['Serum Iron', 'Total Iron Binding Capacity (TIBC)', 'Transferrin Saturation', 'Serum Ferritin'] };
const WOMEN_VITAMINS: LabParameterGroup = { name: 'Folate, B12 & Vitamin D', icon: 'medication', count: 3, parameters: ['Serum Folate', 'Vitamin B12', 'Vitamin D 25-Hydroxy'] };
const MINERALS: LabParameterGroup = { name: 'Calcium & Phosphorus', icon: 'labs', count: 2, parameters: ['Serum Calcium', 'Serum Phosphorus'] };
const HORMONES: LabParameterGroup = { name: 'Hormonal Panel', icon: 'female', count: 5, parameters: ['FSH', 'LH', 'Prolactin', 'Estradiol (E2)', 'Testosterone (Total)'] };
const FREE_THYROID: LabParameterGroup = { name: 'Free Thyroid Hormones', icon: 'ecg', count: 2, parameters: ['Free T3 (FT3)', 'Free T4 (FT4)'] };
const THYROID_ANTIBODIES: LabParameterGroup = { name: 'Thyroid Antibodies', icon: 'biotech', count: 2, parameters: ['Anti-TPO Antibodies', 'Anti-Thyroglobulin (Anti-Tg)'] };

export const LAB_PACKAGES: LabPackage[] = [
  {
    slug: 'comprehensive-full-body-checkup',
    name: 'Comprehensive Full Body Checkup',
    testsIncluded: 82,
    fastingHours: '10 to 12',
    fastingLabel: 'Fasting: 10-12 hrs',
    covers: 'Liver, Kidney, Lipid & Thyroid function alongside complete hemogram panel.',
    highlights: ['CBC & ESR (24)', 'Lipid Profile (8)', 'Liver Panel (11)', 'Kidney Profile (6)'],
    price: 1499,
    mrp: 2999,
    discount: 50,
    turnaround: 'Reports within 24h',
    reportTime: '24h Digital Report',
    categories: ['full-body', 'liver-function', 'kidney-care', 'thyroid', 'diabetes', 'vitamin-d-b12', 'heart-health', 'mens-health'],
    parameterGroups: [CBC, LFT, KFT, LIPID, THYROID, HBA1C, VITAMINS],
  },
  {
    slug: 'advanced-diabetic-profile',
    name: 'Advanced Diabetic Profile',
    testsIncluded: 48,
    fastingHours: '8 to 10',
    fastingLabel: 'Fasting Required',
    covers: 'HbA1c (Glycosylated Hemoglobin), Fasting Glucose, Lipid Profile, Urine Microalbumin.',
    highlights: ['HbA1c & Avg Glucose', 'Fasting Blood Sugar', 'Urine Microalbumin', 'Serum Creatinine'],
    price: 899,
    mrp: 1599,
    discount: 44,
    turnaround: 'Reports within 18h',
    reportTime: '18h Digital Report',
    categories: ['diabetes', 'kidney-care'],
    parameterGroups: [HBA1C, FASTING_GLUCOSE, MICROALBUMIN, LIPID, KFT],
  },
  {
    slug: 'senior-citizen-active-health',
    name: 'Senior Citizen Active Health',
    testsIncluded: 75,
    fastingHours: '10 to 12',
    fastingLabel: 'Fasting Required',
    covers: 'Cardiac Risk, Bone Health (Calcium & Vit D), Kidney Function, Complete Arthritis markers.',
    highlights: ['Cardiac Enzymes', 'Vitamin D & B12', 'Serum Electrolytes', 'Uric Acid / Gout'],
    price: 1999,
    mrp: 3800,
    discount: 47,
    turnaround: 'Special Geriatric Care',
    reportTime: '24h Digital Report',
    categories: ['full-body', 'heart-health', 'vitamin-d-b12', 'kidney-care'],
    parameterGroups: [CBC, CARDIAC, LIPID, KFT, ELECTROLYTES, BONE, ARTHRITIS],
  },
  {
    slug: 'womens-wellness-comprehensive',
    name: "Women's Wellness Comprehensive",
    testsIncluded: 64,
    fastingHours: '10 to 12',
    fastingLabel: 'Fasting Required',
    covers: 'Hormonal Panel, Iron Deficiency Profile, Complete Blood Count, Folate, and Thyroid Screen.',
    highlights: ['Total Iron Panel', 'Thyroid Profile (T3/T4)', 'Folate & Vit B12', 'Calcium & Phosphorus'],
    price: 1699,
    mrp: 3200,
    discount: 47,
    turnaround: 'Reports within 24h',
    reportTime: '24h Digital Report',
    categories: ['womens-health', 'thyroid', 'vitamin-d-b12', 'full-body'],
    parameterGroups: [CBC, IRON, THYROID, WOMEN_VITAMINS, MINERALS, HORMONES],
  },
  {
    slug: 'thyroid-hormone-care',
    name: 'Thyroid & Hormone Care',
    testsIncluded: 12,
    fastingHours: null,
    fastingLabel: 'No Fasting Required',
    covers: 'Total T3, Total T4, TSH Ultra-sensitive 3rd Generation with automated dilution checking.',
    highlights: ['Triiodothyronine (T3)', 'Thyroxine (T4)', 'Ultra-sensitive TSH', 'Endocrine Risk Score'],
    price: 499,
    mrp: 900,
    discount: 45,
    turnaround: 'Same-Day Reports',
    reportTime: 'Same-Day Digital Report',
    categories: ['thyroid'],
    parameterGroups: [THYROID, FREE_THYROID, THYROID_ANTIBODIES],
  },
  {
    slug: 'heart-health-lipid-screen',
    name: 'Heart Health & Lipid Screen',
    testsIncluded: 32,
    fastingHours: '10 to 12',
    fastingLabel: 'Fasting Required',
    covers: 'Lipid Profile, hs-CRP (High Sensitivity Cardiac Marker), Apolipoprotein A1 & B ratio.',
    highlights: ['Total Cholesterol', 'HDL, LDL & VLDL', 'hs-CRP Cardiac risk', 'Apo A1 / Apo B Ratio'],
    price: 1199,
    mrp: 2200,
    discount: 45,
    turnaround: 'Cardiologist reviewed',
    reportTime: '24h Digital Report',
    categories: ['heart-health'],
    parameterGroups: [LIPID, CARDIAC, HBA1C, ELECTROLYTES],
  },
];

export function getLabPackage(slug: string) {
  return LAB_PACKAGES.find((p) => p.slug === slug);
}

/** Packages matching a category slug and/or free-text query (name, coverage or any parameter). */
export function filterLabPackages({ category, query }: { category?: string; query?: string }) {
  const q = query?.trim().toLowerCase();
  return LAB_PACKAGES.filter((p) => {
    if (category && !p.categories.includes(category)) return false;
    if (!q) return true;
    const haystack = [p.name, p.covers, ...p.highlights, ...p.parameterGroups.flatMap((g) => [g.name, ...g.parameters])];
    return haystack.some((text) => text.toLowerCase().includes(q));
  });
}

export const formatINR = (amount: number) => `₹${amount.toLocaleString('en-IN')}`;
