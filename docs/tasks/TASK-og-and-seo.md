# TASK: link-preview card and search metadata

## Scenario

Benito asked for an Open Graph image built on the design system, and better SEO.

What was there: one root `metadata` with a title template, "fotos da Mariana.",
and `noindex, nofollow`. No `metadataBase`, no preview image, no robots.txt, no
sitemap, no canonicals, and no `h1` on `/pilha` or `/foto/[slug]`.

Two rules decide the shape of this (`CLAUDE.md` §4):

- **Nothing is indexed until Mariana says yes**, and after her yes only if she
  wants to be found (`05-ARCHITECTURE.md` §6). So "better SEO" means the metadata
  is right and ready, while indexing stays off behind a switch.
- **Reference photos never ship**, and her friends were promised a takedown is
  one array edit. A preview image is a copy in someone else's cache (WhatsApp,
  Slack, X) that no redeploy reaches. So the card carries no photo.

## Planned changes

1. **The card** (`components/og/card.tsx`, `app/opengraph-image.tsx`), 1200 × 630,
   rendered at build time with `next/og`. Set like the diary's chrome, on Noite:
   the header's two DM Mono columns ("fotografia / diário com flash", "diário /
   years") and its two squares; `anairam` in Bodoni Moda 500 at opsz 96 with the
   `i`'s tittle in Magenta VDV (its one use); the footer's line `anairam ———
   mariana ■`; the photo count in Asfalto and the newest date stamp in Amarelo
   Táxi. Years, count and stamp come from `content/photos.ts`.
2. **One card per photo page** (`app/(site)/foto/[slug]/opengraph-image.tsx`),
   prerendered: the same card with that photo's counter (`03 / 18`) and date
   stamp. Its caption goes in the text description instead (verbatim), since
   drawing emoji would need a fetch from an emoji CDN at build.
3. **Fonts for the card** (`assets/fonts/`): static TTFs of Bodoni Moda (opsz
   96, 500) and DM Mono 400 from Google Fonts, 45 kB each, OFL. Satori can't
   read the variable woff2 files `next/font` serves.
4. **`lib/site.ts`**: the site name, description, URL (`ANAIRAM_URL`, else
   Vercel's production or deployment URL, else localhost) and `indexable`,
   which needs **both** `ANAIRAM_PUBLIC=1` (her yes) and `ANAIRAM_INDEX=1` (she
   wants to be found). `pageMetadata()` gives each page its title, description,
   canonical, Open Graph and Twitter fields.
5. **Root layout**: `metadataBase`, `robots` from `indexable` (adds
   `noimageindex` while closed), and `format-detection` off so iOS doesn't turn
   date stamps and counters into phone links.
6. **Pages**: descriptions in the site's voice (short, dry, lowercase).
   `/foto/[slug]` uses her caption verbatim, or the counter and stamp when
   there's none. `/f/NN` points its canonical at `/pilha`. `/lab` is never
   indexed. Screen-reader `h1`s on `/pilha`, `/f/NN` and `/foto/[slug]`.
7. **`app/robots.ts`**: closed, it disallows everything except link-preview
   fetchers (X draws no card when robots.txt shuts it out). Open, it allows all
   but `/lab` and `/f/`, and lists the sitemap.
8. **`app/sitemap.ts`**: `/`, `/tudo`, `/pilha`, `/sobre` and each photo page.
   No image entries.
9. **`next.config.ts`**: while closed, `X-Robots-Tag: noindex, nofollow,
   noimageindex` on every response, so the photo files, optimised images and
   cards are covered too, not just the HTML.
10. **Home JSON-LD**: one `WebSite` (name, "fotos da Mariana", URL, pt-BR,
    description), so a search result names the site `anairam`. No `Person`: no
    job title, no bio, no surname.
11. **`app/apple-icon.tsx`**: the `i.` monogram from `app/icon.svg` as a 180 px
    PNG, for iOS and the previews that ask for a touch icon.

## Why

The card is typographic because the photograph is the only thing allowed to be
the light, and until she picks one the name carries it. When she picks the
photo for the card (`02-VISUAL-IDENTITY.md` §7), it goes in `ogCard()`; only a
`source: "mariana"` photo can.

## Content assumptions

- The descriptions are ours, in the site's voice, and provisional like all copy
  until Mariana reads them.
- The date stamp on the home card is the newest photo's date. For reference
  photos that's a post date, not a capture date (`TASK-feel-prototype.md` §4).
- A preview deployment behind Vercel Deployment Protection can't serve the card
  to WhatsApp or X either. That's the protection working.

## Affected files

`lib/site.ts`, `components/og/card.tsx`, `assets/fonts/*`, `app/layout.tsx`,
`app/opengraph-image.tsx`, `app/apple-icon.tsx`, `app/robots.ts`,
`app/sitemap.ts`, `next.config.ts`, `app/(diario)/page.tsx`,
`app/(site)/{tudo,sobre,pilha}/page.tsx`, `app/(site)/f/[frame]/page.tsx`,
`app/(site)/foto/[slug]/{page,opengraph-image}.tsx`, `app/lab/layout.tsx`,
`docs/02-VISUAL-IDENTITY.md` §7, `docs/05-ARCHITECTURE.md` §5–6, `CLAUDE.md` §4.

## Checks

- `pnpm typecheck`, `pnpm lint`, `pnpm build`: clean. The 18 photo cards are
  prerendered (●), not rendered on request.
- Every page's head has title, description, canonical, `og:*` and
  `twitter:*` with the right image: the root card everywhere, the photo's own
  card on `/foto/[slug]`. An unknown slug's card is a 404.
- `robots.txt`, the `robots` meta and `X-Robots-Tag` all say closed.
