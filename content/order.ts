import type { Photo, Series } from "@/content/types";

/**
 * The Pile's order (docs/04-UX-AND-MOTION.md §2): newest first, as the diary
 * reads today. A series stays together at the place of its newest photo and
 * runs chronologically inside, as the night happened.
 */
export function diaryOrder(photos: Photo[], series: Series[]): Photo[] {
  const known = new Set(series.map((s) => s.slug));
  const newestFirst = [...photos].sort((a, b) => b.date.localeCompare(a.date));
  const placed = new Set<string>();
  const out: Photo[] = [];

  for (const photo of newestFirst) {
    if (placed.has(photo.slug)) continue;
    if (!photo.series || !known.has(photo.series)) {
      out.push(photo);
      placed.add(photo.slug);
      continue;
    }
    const night = newestFirst
      .filter((p) => p.series === photo.series)
      .sort((a, b) => a.date.localeCompare(b.date));
    for (const p of night) {
      out.push(p);
      placed.add(p.slug);
    }
  }
  return out;
}
