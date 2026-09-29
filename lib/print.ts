/** Frame number as the counter shows it: 7 → "07". */
export function pad2(n: number) {
  return String(n).padStart(2, "0");
}

/** Disposable-camera date stamp: "2023-12-31" → "’23 12 31". */
export function formatStamp(isoDate: string) {
  const [y, m, d] = isoDate.split("-");
  return `’${y.slice(2)} ${m} ${d}`;
}

/**
 * Resting angle of a print, −3° to +3°, seeded by its slug so the pile looks
 * the same every visit (docs/04-UX-AND-MOTION.md §6).
 */
export function restingAngle(slug: string) {
  let h = 2166136261;
  for (let i = 0; i < slug.length; i++) {
    h ^= slug.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  const unit = (h >>> 0) / 0xffffffff;
  return Math.round((unit * 6 - 3) * 10) / 10;
}

/** `?f=07` → 6. Out of range or missing → 0. */
export function frameFromSearch(search: string, total: number) {
  const f = Number(new URLSearchParams(search).get("f"));
  return Number.isInteger(f) && f >= 1 && f <= total ? f - 1 : 0;
}
