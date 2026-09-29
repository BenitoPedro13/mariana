import type { Photo, Series } from "@/content/types";

/*
 * Consent and content rules the build enforces (CLAUDE.md §4). A human records
 * the facts (`others`, `people`, `author`, `source`); this only refuses to
 * build when they don't add up. It runs when content/photos.ts is evaluated,
 * so `next build` and `next dev` both stop on a failure.
 *
 * ANAIRAM_PUBLIC=1 marks a public build (after Mariana's yes). It also refuses
 * reference photos and unconfirmed authorship.
 */

export function contentProblems(
  photos: Photo[],
  series: Series[],
  { isPublic }: { isPublic: boolean },
): string[] {
  const problems: string[] = [];
  const seen = new Set<string>();
  const seriesSlugs = new Set(series.map((s) => s.slug));

  for (const p of photos) {
    const at = `photo "${p.slug}"`;
    if (seen.has(p.slug)) problems.push(`${at}: duplicate slug`);
    seen.add(p.slug);

    if (!p.alt.trim()) problems.push(`${at}: missing alt text`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(p.date)) problems.push(`${at}: date must be YYYY-MM-DD`);
    if (p.series && !seriesSlugs.has(p.series)) {
      problems.push(`${at}: unknown series "${p.series}"`);
    }
    if (!Number.isInteger(p.others) || p.others < 0) {
      problems.push(`${at}: "others" must be a whole number`);
    }

    const consented = p.people?.length ?? 0;
    if (consented > p.others) {
      problems.push(`${at}: ${consented} consent entries but only ${p.others} people counted`);
    }

    if (p.source === "mariana") {
      if (consented < p.others) {
        problems.push(
          `${at}: ${p.others} identifiable people, ${consented} said yes. Ask the rest, or leave the photo out`,
        );
      }
      if (p.author === "unconfirmed") problems.push(`${at}: authorship unconfirmed`);
    }

    if (isPublic && p.source === "reference") {
      problems.push(`${at}: reference photo in a public build. Reference photos are mood material only`);
    }
    if (isPublic && p.author === "unconfirmed") {
      problems.push(`${at}: authorship unconfirmed in a public build`);
    }
  }
  return problems;
}

export function assertContent(photos: Photo[], series: Series[]): Photo[] {
  const problems = contentProblems(photos, series, {
    isPublic: process.env.ANAIRAM_PUBLIC === "1",
  });
  if (problems.length > 0) {
    throw new Error(`content check failed:\n- ${problems.join("\n- ")}`);
  }
  return photos;
}
