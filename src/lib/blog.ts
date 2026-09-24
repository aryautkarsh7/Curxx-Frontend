/** "skin-hair" → "Skin Hair", "heart-and-lungs" → "Heart & Lungs". */
export const categoryLabel = (c: string) =>
  c
    .split('-')
    .map((w) => (w === 'and' ? '&' : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(' ');
