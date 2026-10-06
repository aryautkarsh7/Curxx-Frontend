/**
 * Shared helpers for every generated-copy page (surgeries, doctor listings, India pages, hospitals,
 * doctor profiles): singular/plural, Indian ₹ formatting, ranges, lists, stable variant picks and IST
 * dates. No page keeps its own copy of these.
 */
export { count, nounFor, singular } from './plural';

/** 12345 → "12,345"; 1234567 → "12,34,567" (Indian digit grouping). */
export const num = (n: number) => n.toLocaleString('en-IN');
/** 1500 → "₹1,500". */
export const inr = (n: number) => `₹${Math.round(n).toLocaleString('en-IN')}`;

/** "₹300 – ₹1,500" for tables and chips; one value when min and max are the same. */
export function rangeCell(min: number, max: number, sep = ' – ') {
  return min === max ? inr(min) : `${inr(min)}${sep}${inr(max)}`;
}
/** "₹300 to ₹1,500" for sentences; one value when min and max are the same. */
export const rangeText = (min: number, max: number) => rangeCell(min, max, ' to ');

/** ["a"] → "a"; ["a","b"] → "a and b"; ["a","b","c"] → "a, b and c". */
export const list = (items: string[]) =>
  items.length <= 1 ? items.join('') : `${items.slice(0, -1).join(', ')} and ${items.at(-1)}`;

/** "General Physicians" → "general physicians"; acronyms keep their capitals ("ENT specialists"). */
export const lower = (s: string) =>
  s
    .split(' ')
    .map((w) => (/^[A-Z]{2,}/.test(w) ? w : w.toLowerCase()))
    .join(' ');

/** "a dermatologist", "an ENT Specialist", "an orthopedist", "a urologist". */
export const an = (phrase: string) =>
  `${/^(uni|uro|use|usu|eu|one)/i.test(phrase) ? 'a' : /^[aeiou]/i.test(phrase) || /^[AEFHILMNORSX][A-Z]/.test(phrase) ? 'an' : 'a'} ${phrase}`;

/** FNV-1a: a small, stable hash (same input, same number, on every visit and every server). */
export function stableHash(...parts: string[]) {
  let h = 0x811c9dc5;
  for (const ch of parts.join(':')) {
    h ^= ch.charCodeAt(0);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h;
}
/** Which of `n` variants a page uses: a stable pick by city + page, so cities read differently. */
export const pickVariant = (n: number, ...parts: string[]) => stableHash(...parts) % n;

/** "Today, 10:30 AM", "Tomorrow, 9:00 AM" or "Wed, 2 Oct, 9:00 AM", always in IST. */
export function istSlot(iso: string | null | undefined, now = new Date()) {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  const day = (x: Date) => x.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' });
  const time = d
    .toLocaleTimeString('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
    .toUpperCase();
  if (day(d) === day(now)) return `Today, ${time}`;
  if (day(d) === day(new Date(now.getTime() + 86_400_000))) return `Tomorrow, ${time}`;
  return `${d.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', weekday: 'short', day: 'numeric', month: 'short' })}, ${time}`;
}
/** "6 October 2026" in IST. */
export const istDate = (d = new Date()) =>
  d.toLocaleDateString('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
/** The year in IST ("2026"), for titles. */
export const istYear = (d = new Date()) =>
  d.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', year: 'numeric' });

/** Titles over `max` characters use the page's shorter fallback. */
export const fitTitle = (title: string, fallback: string, max = 60) =>
  title.length <= max ? title : fallback;
/** Descriptions over `max` characters drop whole trailing sentences. */
export function clipDescription(text: string, max = 155) {
  let out = text.trim();
  while (out.length > max && out.includes('. ')) out = out.slice(0, out.lastIndexOf('. ') + 1);
  return out.length > max ? `${out.slice(0, max - 1).trimEnd()}…` : out;
}

/** The sentences that exist, joined; empty string when none does. */
export const sentences = (...parts: (string | false | null | undefined)[]) =>
  parts.filter(Boolean).join(' ');

/** Rows sharing the top count, and the rest: "A and B have the most (2 each)", never a false "A has the most". */
export function leaders<T extends { name: string; count: number }>(rows: T[]) {
  const tied = rows.filter((r) => r.count === rows[0]?.count);
  return { tied, rest: rows.slice(tied.length) };
}
