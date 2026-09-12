// Mock medicine catalogue backing the store's category filter and search.
export type Product = {
  slug: string;
  name: string;
  subtitle: string;
  price: number;
  mrp: number;
  icon: string;
  categories: string[];
  /** True when the product has its own Stitch detail page at /medicines/{slug}. */
  detail?: boolean;
};

export const MEDICINE_CATEGORIES: { slug: string; name: string }[] = [
  { slug: 'diabetes-care', name: 'Diabetes Care' },
  { slug: 'vitamins', name: 'Vitamins & Supplements' },
  { slug: 'skin-care', name: 'Skin Care' },
  { slug: 'baby-care', name: 'Baby Care' },
  { slug: 'pain-relief', name: 'Pain Relief' },
  { slug: 'ayurveda', name: 'Ayurveda & Herbs' },
  { slug: 'devices', name: 'Devices & Equipment' },
  { slug: 'sexual-wellness', name: 'Sexual Wellness' },
  { slug: 'diabetes', name: 'Diabetes' },
  { slug: 'hypertension', name: 'Hypertension / BP' },
  { slug: 'skin-acne-eczema', name: 'Skin Acne & Eczema' },
  { slug: 'hair-loss', name: 'Hair Loss & Regrowth' },
  { slug: 'bone-joint', name: 'Bone & Joint Care' },
  { slug: 'digestion', name: 'Digestion & Gut Health' },
  { slug: 'respiratory', name: 'Respiratory & Asthma' },
  { slug: 'anxiety-sleep', name: 'Anxiety & Sleep' },
  { slug: 'immunity', name: 'Immunity Boosters' },
  { slug: 'kidney-care', name: 'Kidney Care' },
  { slug: 'antibiotics', name: 'Antibiotics & Infectious Disease' },
  { slug: 'thyroid-care', name: 'Thyroid Care' },
  { slug: 'deals', name: 'Deals of the Day' },
];

export const PRODUCTS: Product[] = [
  { slug: 'glycomet-gp-1', name: 'Glycomet GP 1 Tablet', subtitle: 'Metformin 500mg + Glimepiride 1mg · Pack of 15', price: 116, mrp: 145, icon: 'pill', categories: ['diabetes-care', 'diabetes'] },
  { slug: 'shelcal-500', name: 'Shelcal 500 Tablet', subtitle: 'Calcium 500mg + Vitamin D3 250 IU · Pack of 15', price: 105, mrp: 131, icon: 'medication', categories: ['vitamins', 'bone-joint'] },
  { slug: 'telma-40', name: 'Telma 40 Tablet', subtitle: 'Telmisartan 40mg · Pack of 15', price: 228, mrp: 285, icon: 'cardiology', categories: ['hypertension'] },
  { slug: 'thyronorm-50mcg', name: 'Thyronorm 50mcg Tablet', subtitle: 'Thyroxine Sodium 50mcg · Pack of 120', price: 165, mrp: 195, icon: 'vital_signs', categories: ['thyroid-care'] },
  { slug: 'accu-chek-active-monitor-kit', name: 'Accu-Chek Active Monitor Kit', subtitle: 'Includes 10 test strips + lancing pen', price: 999, mrp: 1599, icon: 'speed', categories: ['devices', 'diabetes-care', 'diabetes', 'deals'] },
  { slug: 'cetaphil-gentle-skin-cleanser', name: 'Cetaphil Gentle Skin Cleanser', subtitle: '250ml · Dermatologist recommended', price: 468, mrp: 625, icon: 'soap', categories: ['skin-care', 'skin-acne-eczema', 'deals'] },
  { slug: 'revital-h', name: 'Revital H Daily Health Supplement', subtitle: '60 capsules · Energy & immunity', price: 385, mrp: 550, icon: 'medication', categories: ['vitamins', 'immunity', 'deals'] },
  { slug: 'omron-hem-7120', name: 'Omron HEM 7120 Digital BP Monitor', subtitle: 'Fully automatic with Intellisense', price: 1708, mrp: 2440, icon: 'monitor_heart', categories: ['devices', 'hypertension', 'deals'] },
  { slug: 'accuderm-20mg', name: 'AccuDerm 20mg Soft Gelatin Capsule', subtitle: 'Isotretinoin IP 20mg · USP grade', price: 342, mrp: 450, icon: 'dermatology', categories: ['skin-care', 'skin-acne-eczema'], detail: true },
  { slug: 'augmentin-625', name: 'Augmentin 625 Duo Tablet', subtitle: 'Amoxicillin 500mg + Clavulanic Acid 125mg', price: 201, mrp: 224, icon: 'vaccines', categories: ['antibiotics', 'respiratory'], detail: true },
];

export const categoryName = (slug: string) => MEDICINE_CATEGORIES.find((c) => c.slug === slug)?.name;

export function filterProducts({ category, query }: { category?: string; query?: string }) {
  const q = query?.trim().toLowerCase();
  return PRODUCTS.filter((p) => {
    if (category && !p.categories.includes(category)) return false;
    if (!q) return true;
    const haystack = [p.name, p.subtitle, ...p.categories.map((c) => categoryName(c) ?? c)];
    return haystack.some((text) => text.toLowerCase().includes(q));
  });
}

export const formatINR = (amount: number) => `₹${amount.toLocaleString('en-IN')}`;
