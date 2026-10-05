/** "1 surgeon" / "2 surgeons": the noun agrees with the count (thousands grouped the Indian way). */
export function count(n: number, noun: string, plural = `${noun}s`) {
  return `${n.toLocaleString('en-IN')} ${n === 1 ? noun : plural}`;
}

/** The noun alone, agreeing with the count: "surgeon" for 1, "surgeons" otherwise. */
export function nounFor(n: number, noun: string, plural = `${noun}s`) {
  return n === 1 ? noun : plural;
}

/** "General Surgeons" → "General Surgeon" for a count of one (plural names end in "s"). */
export function singular(plural: string) {
  return plural.endsWith('s') ? plural.slice(0, -1) : plural;
}
