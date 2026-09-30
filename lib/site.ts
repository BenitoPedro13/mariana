import type { Metadata } from "next";

/*
 * What search engines and link previews see (docs/tasks/TASK-og-and-seo.md).
 *
 * Indexing is off until Mariana says yes (ANAIRAM_PUBLIC=1) *and* she wants to
 * be found (ANAIRAM_INDEX=1): docs/05-ARCHITECTURE.md §6. Either one missing
 * keeps `noindex` on every page, every image and robots.txt.
 */

export const SITE_NAME = "anairam";

/** The site's voice: short, dry, lowercase (docs/01-BRAND-BOOK.md §8). */
export const SITE_DESCRIPTION = "fotos da Mariana. um diário com flash.";

export const indexable =
  process.env.ANAIRAM_PUBLIC === "1" && process.env.ANAIRAM_INDEX === "1";

/** ANAIRAM_URL once there is a domain; Vercel's own address until then. */
function siteUrl() {
  const set = process.env.ANAIRAM_URL;
  if (set) return new URL(set);
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
  if (vercel) return new URL(`https://${vercel}`);
  return new URL(`http://localhost:${process.env.PORT ?? 3000}`);
}

export const SITE_URL = siteUrl();

export const CARD_ALT = "anairam, o nome da Mariana ao contrário, em letras brancas sobre fundo preto";

/** app/opengraph-image.tsx. Restated because a page's `openGraph` drops the root's file image. */
const CARD = { url: "/opengraph-image", width: 1200, height: 630, alt: CARD_ALT };

/**
 * One page's title, description, canonical and Open Graph fields. `openGraph`
 * is merged shallowly by Next, so each page sets all of it. A page's own
 * `opengraph-image.tsx` (the photo pages) needs `ownCard`, or this card wins.
 */
export function pageMetadata({
  title,
  description = SITE_DESCRIPTION,
  path,
  ownCard = false,
}: {
  title?: string;
  description?: string;
  path: string;
  ownCard?: boolean;
}): Metadata {
  const full = title ? `${SITE_NAME} — ${title}` : SITE_NAME;
  // Even `images: undefined` would hide the segment's own file.
  const images = ownCard ? {} : { images: [CARD] };
  return {
    ...(title && { title }),
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "pt_BR",
      title: full,
      description,
      url: path,
      ...images,
    },
    twitter: { card: "summary_large_image", title: full, description, ...images },
  };
}
