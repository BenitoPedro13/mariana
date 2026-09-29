# 03 — Design System

This is the contract between the identity and the code. Values here are the
only values components may use.

## 1. Token layers

1. **Primitive** tokens: the raw values from `02-VISUAL-IDENTITY.md`.
2. **Semantic** tokens: what components consume (`--surface`, `--ink`, `--mark`…).
3. **Surface** switch: `data-surface="night" | "day"` on the region remaps the
   semantic layer. Components never check which surface they're on.

```css
/* app/globals.css (future), Tailwind v4 */
@import "tailwindcss";

:root {
  /* primitives */
  --noite: #0e0b0f;
  --flash: #f6f3ee;
  --asfalto: #8a8386;
  --asfalto-sheet: #6b6468;
  --vdv: #98003b;
  --rosa: #c27790;
  --rosa-sheet: #a3446a;
  --taxi: #f2c200;
  --taxi-sheet: #7a5f00;
  --cobalto: #6f8bff;
}

[data-surface="night"] {
  --surface: var(--noite);
  --ink: var(--flash);
  --ink-quiet: var(--asfalto);
  --link: var(--rosa);
  --stamp: var(--taxi);
  --hairline: color-mix(in srgb, var(--flash) 12%, transparent);
}

[data-surface="day"] {
  --surface: var(--flash);
  --ink: var(--noite);
  --ink-quiet: var(--asfalto-sheet);
  --link: var(--rosa-sheet);
  --stamp: var(--taxi-sheet);
  --hairline: color-mix(in srgb, var(--noite) 14%, transparent);
}

:root {
  --mark: var(--vdv);     /* the one assertive fill */
  --focus: var(--cobalto);
}

@theme inline {
  --color-surface: var(--surface);
  --color-ink: var(--ink);
  --color-ink-quiet: var(--ink-quiet);
  --color-link: var(--link);
  --color-stamp: var(--stamp);
  --color-mark: var(--mark);
  --color-focus: var(--focus);
  --font-display: var(--font-bodoni);
  --font-sans: var(--font-schibsted);
  --font-mono: var(--font-dm-mono);
}
```

Cobalto Luz is 2.78:1 on Flash, below the 3:1 non-text minimum. On the day sheet
the focus ring is therefore a 2 px Cobalto ring **plus** a 2 px Noite outer ring,
which passes against both the sheet and the photo.

## 2. Space, shape, layers

| Token | Value | Note |
| --- | --- | --- |
| Space scale | 4, 8, 12, 16, 24, 32, 48, 72, 120 px | Use Tailwind's default spacing, restricted to these steps |
| Gutter | `clamp(16px, 4vw, 48px)` | Page edge. Never less than 16 px |
| Radius | `0` | Prints are cut paper. The only exception is the focus ring, which follows the element |
| Hairline | 1 px `--hairline` | Print border, dividers |
| Z layers | `photo 0 · stamp 1 · chrome 10 · flash 20 · dialog 30` | The flash sits above the chrome so the whole screen exposes |

## 3. Motion tokens

| Token | Value | Use |
| --- | --- | --- |
| `--flash-in` | 60 ms, `linear` | White-out rises |
| `--flash-develop` | 520 ms, `cubic-bezier(0.2, 0.7, 0.1, 1)` | Next photo develops out of the white |
| `--flash-peak` | 0.85 opacity of Flash | Brightness cap, never 100% white |
| `--throw` | spring (stiffness 260, damping 30) | Print leaving the pile |
| `--settle` | 380 ms, `cubic-bezier(0.3, 0, 0, 1)` | Next print lifting into place |
| `--reverse-step` | 45 ms stagger, 700 ms per letter | The Reversal |
| `--cut` | 0 ms | Surface change night↔day. Always a cut |
| Flash rate limit | ≥ 334 ms between flashes | ≤ 3 per second (WCAG 2.3.1) |

Under `prefers-reduced-motion: reduce`, every token above resolves to 0 ms and
the flash never renders.

## 4. Intensity contract

> Core recedes. Patterns structure. Motion guides. Sula asserts. Atmospheres are the room.

A **region** is one bounded attention area.

1. **Core recedes.** Buttons, counter, caption, and nav are quiet: Asfalto or Ink,
   no fills.
2. **Patterns structure.** The Pile, the contact sheet grid, and the series list
   organise photos without becoming the show.
3. **Motion guides.** The flash cut says "next". The throw says "this one's done".
   The Reversal says "this is her". Nothing moves for decoration.
4. **Sula asserts.** At most one per region. On Mariana's site the photograph is
   almost always that sula. The Reversal is the only other candidate, and it
   only runs when no transition is happening.
5. **Atmospheres are the room.** Noite, grain, and the surface cut.

### Region audit

| Region | Core | Pattern | Motion | Sula | Atmosphere |
| --- | --- | --- | --- | --- | --- |
| Home: the Pile | Counter, prev/next, caption | Stacked prints | Flash cut + throw | The active photo | Noite/Flash surface, grain |
| Header | Wordmark link, `tudo`, `sobre` | Edge row | The Reversal (first load, hover) | Wordmark only while no cut runs | None |
| `/tudo` | Filters, links | Contact sheet grid | Focus/hover only | None | Flat surface |
| `/foto/[slug]` | Back, prev/next, caption | Single print | Flash cut on prev/next | The photo | Surface follows photo |
| `/sobre` | Instagram link | One column | None | `>:(` at display size | Flat Noite |

## 5. Component inventory

| Component | Kind | Source | Notes |
| --- | --- | --- | --- |
| `Wordmark` | Brand | Custom | Renders `anairam`, runs the Reversal. Accessible name "Mariana". |
| `Pile` | Pattern | Custom on `motion` | The home. See §6 on React Bits Stack. |
| `Print` | Pattern | Custom | `next/image`, hairline, rotation seed, date stamp slot |
| `FlashCut` | Motion | Custom | One full-viewport layer, rate-limited, reduced-motion aware |
| `DateStamp` | Brand | Custom | DM Mono, `--stamp`, formats `’YY MM DD` |
| `FrameCounter` | Core | Custom | `07 / 66` visible, "foto 7 de 66" for assistive tech |
| `Caption` | Core | Custom | Verbatim text, `lang` passthrough, preserves line breaks |
| `Button` | Core | USVA | Prev/next, text-only skin |
| `ToggleGroup` | Core | shadcn/ui | `/tudo` filter: `tudo · noite · dia` |
| `Chip` | Core | USVA | Series filter on `/tudo` |
| `Dialog` | Core | USVA, or shadcn/ui as fallback | Not in v1. Reserved if a lightbox is ever needed on `/tudo` |
| `VisuallyHidden` | Core | shadcn/ui utilities | Live-region announcements for the Pile |
| `ContactSheet` | Pattern | Custom CSS grid | Plain grid of links. No library. |

## 6. Library decisions

Each external candidate goes through the rejection rule: storytelling job,
intensity layer, the region's sula, keyboard/touch/reduced-motion/SSR, fit
with Mariana. Read each library's current docs before installing. APIs and
availability change, and these notes are a snapshot from 2026-09-29.

### USVA: adopt

Button, Chip, and Dialog (later) from the shadcn-compatible registry, retokened
to the semantic layer. Core layer, no sula. They're accessible primitives with
a quiet skin, which is exactly what the core layer needs.

### shadcn/ui: adopt

ToggleGroup for the `/tudo` filter, plus the accessibility utilities. Use the CLI
workflow from `CLAUDE.md` §10. Match ART'hur's base style (`base-maia` on Base
UI) so the workflow is familiar, but retoken everything. Nothing may keep the
default look.

### React Bits: evaluate one, reject the rest

- **Stack** (draggable card stack): *evaluate as reference for the Pile.* It has
  the right storytelling job (flick a print away) and sits in the pattern layer. Its demo
  is pointer-first. If adopted it needs keyboard controls, a live region, a
  reduced-motion path, and SSR of the top print. If wrapping it fights those, build
  the Pile on `motion` directly and keep Stack as the gesture reference.
- **Shuffle / scramble text**: *reject for the wordmark.* The Reversal is a
  specific positional swap around a fixed `i`, not a scramble. A generic effect
  would lose the one true idea.
- **Masonry, Image Trail, Flying Posters**: *reject.* Collage and screensaver
  energy. They'd compete with the photo, which is the sula.
- **Noise**: *reject.* A static SVG grain does the same job with no runtime cost.

### Aceternity UI: none in v1

Evaluated Lens, Direction Aware Hover, and Compare. None has a job the photos
need: zoom distracts from the whole-frame rule, and hover reveals hide
captions. Revisit only for a specific series that calls for it.

### AlignUI: none in v1

Its strength is product UI (tables, forms, dashboards). This site has no forms
and no data UI. Revisit if a CMS admin surface is ever built.

### Motion runtime

`motion` (motion.dev) for the throw and the Reversal (layout animations with
spring physics). The flash cut is plain CSS on one element. No GSAP. One motion
library is enough.

## 7. States

| State | Treatment |
| --- | --- |
| Hover (pointer) | Links → `--link`. Prints on `/tudo` show their date stamp. |
| Focus-visible | 2 px `--focus` ring, 2 px offset (plus the Noite outer ring on the day sheet) |
| Active/selected | `--mark` fill with Flash text, plus an underline |
| Disabled | `--ink-quiet`, `aria-disabled`, never removed from tab order silently |
| Loading | The previous print holds. No spinners. If a photo is late, its blur placeholder shows |
| Error (image fails) | The print shows its alt text on the surface, date stamp intact |
