# 05 — Architecture

Plan only. No code exists yet (`CLAUDE.md` §2).

## 1. Principles

- **The plainest thing that works.** This is a photo diary with maybe 60–200
  images, updated rarely, by one person. It needs no database, CMS, auth, or API.
- **Static by default.** Every page is prerendered at build time.
- **Photos never touch a third-party processor we don't control.** They go from
  her files to the repo's ingest step, then to Vercel's image optimiser, and
  nowhere else.

## 2. Stack

| Layer | Choice | Why |
| --- | --- | --- |
| Framework | Next.js App Router, same major as ART'hur (16.x) | Known ground. Static generation, `next/image`, `next/font` |
| Language | TypeScript, strict | |
| Styling | Tailwind CSS v4 with the token layer from `03-DESIGN-SYSTEM.md` | |
| Components | USVA + shadcn/ui (Base UI) via the shadcn CLI | Same workflow as ART'hur |
| Motion | `motion` | The throw and the Reversal. The flash is CSS |
| Package manager | pnpm | |
| Hosting | Vercel | Image optimisation, preview protection |
| Content | Typed files in the repo | See §3 |
| Analytics | None | It's a gift, not a funnel |

Not in v1: Payload, a database, Vercel Blob, i18n routing, TanStack Query (there
is no client-side server state), or Zustand (the Pile's state is one index,
held in a `useState` inside the Pile).

## 3. Content model

```ts
// content/photos.ts (future)
export type Photo = {
  slug: string;              // "2023-12-31-reveillon"
  image: StaticImageData;    // static import → width, height, blurDataURL for free
  alt: string;               // written by us, approved by her
  caption?: string;          // hers, verbatim
  captionLang?: 'pt-BR' | 'en' | 'es';
  date: string;              // ISO date, from EXIF DateTimeOriginal or the post date
  light: 'night' | 'day';    // drives the surface
  series?: string;           // slug into content/series.ts
  author: 'mariana' | { name: string; handle?: string }; // who pressed the shutter
  people?: { consent: true }[]; // one entry per identifiable friend, only when they said yes
};
```

The array order is the Pile's order. `author` and `people` exist because the
reference shows at least one photo by someone else (033) and many friends.
A build-time check fails if a photo has identifiable people without consent
entries. A human records this, the check only enforces it.

```ts
// content/series.ts (future)
export type Series = { slug: string; title: string }; // title in her words
```

### Why not Payload now

Payload with Postgres and Blob is right for ART'hur, where Arthur edits often.
Here, Benito adds photos when Mariana sends them. A CMS would be a running bill
and an admin to maintain for a gift. **Revisit when** she says she wants to add
photos herself. Then Payload + Blob, following ART'hur's setup, is the known
path, and the `Photo` type above maps onto a collection one-to-one.

## 4. Image pipeline

```
her originals ──► scripts/ingest.ts ──► content/photos/*.jpg ──► next/image ──► visitor
                   │
                   ├─ read EXIF DateTimeOriginal → date
                   ├─ strip ALL EXIF/XMP/IPTC (GPS, device, serials)
                   ├─ auto-orient, then keep orientation as posted
                   ├─ resize longest edge to 2560 px, JPEG q88, sRGB
                   └─ print a manifest stub for content/photos.ts
```

- Uses `sharp` locally, the same library Next already depends on.
- Originals are never committed. Only the stripped 2560 px masters are.
- `next/image` serves AVIF/WebP at the sizes the layout needs.
- The repo can be private. The masters are public on the site anyway once
  launched, but not before (§6).

## 5. Rendering

| Route | Rendering | Client islands |
| --- | --- | --- |
| `/` | Static | `Pile` (includes FlashCut), `Wordmark` |
| `/tudo` | Static | `ToggleGroup` filter |
| `/foto/[slug]` | Static (`generateStaticParams`) | prev/next FlashCut, `Wordmark` |
| `/sobre` | Static | `Wordmark` |

- The server renders the Pile's top print and the next two as real `<img>`s.
  The island hydrates on top, so the first view is complete without JS.
- The first print is the LCP element: `priority`, a correct `sizes`, and a blur
  placeholder.
- The Pile holds only an index and a direction. No global store.

### Planned layout

```
app/
  layout.tsx          fonts, header, footer, data-surface root
  page.tsx            the Pile (server: data → <Pile photos={…} />)
  tudo/page.tsx
  foto/[slug]/page.tsx
  sobre/page.tsx
  not-found.tsx
components/
  brand/   Wordmark, DateStamp, FrameCounter
  pile/    Pile, Print, FlashCut, hooks.ts (usePileNavigation, useFlashGate)
  ui/      USVA / shadcn output
content/   photos.ts, series.ts, photos/*.jpg
scripts/   ingest.ts
```

Per the global conventions, every hook sits behind a named custom hook in a
feature-local `hooks.ts`. Components stay thin.

## 6. Privacy and launch

| Stage | Visibility |
| --- | --- |
| Building | Local only |
| Showing Mariana | Vercel preview with Deployment Protection (password or Vercel auth), `robots: noindex, nofollow` |
| After her yes | Public domain, indexing on only if she wants it |

- No analytics, pixels, or third-party embeds. Fonts are self-hosted through `next/font`.
- One `localStorage` key (`anairam:flash`) for the flash toggle. It's not a
  cookie, and no banner is needed.
- Takedown: any photo is removed with a single array edit and redeploy, which
  is part of the promise to her friends.

## 7. Performance budgets

| Metric | Budget (mobile, 4G) |
| --- | --- |
| LCP | ≤ 2.0 s |
| CLS | ≤ 0.02 (every print has intrinsic dimensions) |
| INP | ≤ 150 ms (a flick must feel instant) |
| JS on `/` | ≤ 90 kB gzip including React (motion is the largest island) |
| Fonts | 3 families, subsetted, ≤ 120 kB total |
| Images eager on `/` | 3 (current + next two). Everything else lazy |

## 8. Delivery phases

| Phase | Output | Gate |
| --- | --- | --- |
| **0: Docs** (now) | This folder | Benito agrees the direction |
| **1: Feel prototype** | A single static HTML page with the Pile, the flash cut, and the Reversal on 8 reference photos, to judge the feel. Never published, since the reference photos include her friends | Benito signs off on the feel |
| **2: Content** | Her photographs, her selection, alt text, authorship, consent | Mariana says yes to the idea |
| **3: Foundation** | Next.js app, tokens, fonts, ingest script, `/tudo`, `/foto/[slug]` | typecheck, lint, build, a11y pass |
| **4: Signature** | The Pile, the flash cut, the Reversal, first exposure | Keyboard, reduced motion, photosensitivity checks |
| **5: Launch** | Protected preview for her, then public | Her yes |
