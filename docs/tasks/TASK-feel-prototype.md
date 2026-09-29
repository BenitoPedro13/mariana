# TASK: Feel prototype in Next.js

## 0. Status (2026-09-29): built, gaps closed, not yet reviewed

## 1. Current scenario

- The brand docs are written (`TASK-brand-foundation.md`).
- Benito asked to build the feel on the real stack (Next.js, React, the
  component libraries in `CLAUDE.md` §10) rather than a throwaway HTML page. That
  merges phase 1 (feel) and the start of phase 3 (foundation) from
  `05-ARCHITECTURE.md` §8.
- The 33 reference photos are committed to `docs/reference/instagram/`
  (Benito's commit `2b6cdaf`). **The GitHub repo is public.** Benito will change
  that himself.
- The cloud session's network policy blocks `ui.shadcn.com` and `reactbits.dev`,
  so the shadcn CLI can't fetch registry items. See §5.

## 2. Planned changes

1. Next.js 16.3 App Router, TypeScript, Tailwind v4, pnpm (`create-next-app`).
2. `app/globals.css`: the token layer from `03-DESIGN-SYSTEM.md` §1, the surface
   switch, focus rings, and the grain.
3. `app/layout.tsx`: the three fonts via `next/font`, `lang="pt-BR"`,
   `noindex, nofollow`, the header, the footer, and the flash layer.
4. Routes: `/` (the Pile), `/tudo`, `/foto/[slug]`, `/sobre`, and the 404.
5. Custom components (§10 step 6): `Wordmark` (the Reversal), `Pile`, `Print`,
   `FlashLayer`, `DateStamp`, `FrameCounter`, `Caption`.
6. Library components: `components/ui/button.tsx` and `toggle-group.tsx`
   (shadcn/ui on Base UI), retokened. They're used for prev/next and the `/tudo`
   filter.
7. `content/photos.ts`: 8 reference photos typed as `Photo`.

## 3. Why

The flash cut and the Reversal are the riskiest ideas in the docs. Building them
on the real stack means the feel review also reviews the real code.

## 4. Content assumptions (explicit)

- **Photos:** reference 003, 005, 007, 016, 021, 023, 025, 030. That's 4 night and 4 day,
  newest first, each mostly one person. 033 is excluded because it's credited to
  another photographer.
- **Who is in them:** not confirmed. The alt text says "uma mulher" and doesn't name anyone.
- **Authorship:** unconfirmed for all 8 (`author: 'unconfirmed'`).
- **Dates** are post dates, decoded from the Instagram media ID in each image
  URL (`id >> 23` plus Instagram's epoch). They aren't capture dates. As a check,
  012 decodes to 2024-01-05 and its caption says `31.12.2023`.
- **`light`** is our call per photo. 007 (an indoor selfie) is the closest call and
  is marked as day.
- **Alt text** is ours, and provisional until Mariana reviews it.
- The images are imported straight from `docs/reference/instagram/`, with no
  copy, resize, or edit. Instagram already strips their EXIF.
- The footer says `protótipo. não publicar.` until launch.

## 5. Component sourcing (this session)

| Component | Source | How |
| --- | --- | --- |
| Button, ToggleGroup | shadcn/ui (Base UI) | Written by hand in shadcn's file layout, on `@base-ui/react` from npm, because the registry is blocked here. Re-run `pnpm dlx shadcn@latest add button toggle-group` where the registry is reachable, then retoken. |
| Chip | USVA | Written by hand as a Base UI Toggle in the same skin, because the USVA registry is blocked here. Swap for USVA's Chip when it can be fetched |
| React Bits Stack | React Bits | Not evaluated: blocked here. The Pile is built on `motion` directly, which `03-DESIGN-SYSTEM.md` §6 already names as the fallback |
| Magic UI | Not in `CLAUDE.md` §10 | Not used. Add it to the list first if we want it |

## 6. Gaps

Closed in the second pass:

- **Series:** `content/series.ts` (empty until she names one), diary order in
  `content/order.ts`, the label on `/foto/[slug]` linking to `/tudo?serie=…`,
  and a Chip filter on `/tudo`. Checked with a temporary series, which was then removed.
- **Consent check:** `content/check.ts`. Photos gained `source` and `others`.
  `ANAIRAM_PUBLIC=1 pnpm build` fails on the 8 reference photos, as intended.
- **`/foto/[slug]` prev/next:** `FlashLink` cuts with the flash and navigates
  at the peak. It's plain navigation under reduced motion or with the flash off.
- **`?f=` without JavaScript:** `proxy.ts` rewrites `/?f=07` to the prerendered
  `/f/07`, so the server renders the right print and hydration agrees.

Still open:

- React Bits Stack isn't evaluated, and the shadcn/USVA originals aren't
  fetched. The registries are blocked in the cloud session, so this needs a
  machine that can reach them.
- The wordmark's accessible name ("Mariana") doesn't contain its visible text
  (`anairam`). WCAG 2.5.3 (label in name) says it should. Benito decides.
- `others` counts for the reference photos are our read (021 and 030 show
  2 people each). They matter only once real photos replace them.

## 7. Affected files

`app/**`, `components/**`, `content/**`, `lib/**`, `proxy.ts`, `package.json`,
`pnpm-lock.yaml`, configs, `CLAUDE.md` §2 and §4, `docs/04-UX-AND-MOTION.md`,
`docs/05-ARCHITECTURE.md`, and this doc.

## 8. Checks

`pnpm typecheck`, `pnpm lint`, `pnpm build`, and `git diff --check`. Then desktop and
mobile screenshots, keyboard-only navigation, reduced motion, the flash turned off,
and the flash rate limit under rapid input.
