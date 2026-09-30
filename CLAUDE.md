# anairam Repository Guide

## 1. Project

anairam is a personal site for Mariana Conrado's photographs. Benito is building it
as a gift, to say thank you. Mariana did not commission it and has not yet agreed
to it being public.

The site has one job: give her photographs a room that feels like her. It does
not try to impress anyone. No clients, no pitch, no "hire me", no metrics.

The direction is **Direct Flash**: a dark room, photographs as the only light,
one flash per cut, and a name that reads the other way round.

The source of truth is the numbered set in `docs/`:

| Doc | Owns |
| --- | --- |
| `docs/00-DISCOVERY.md` | what the reference material actually shows, and what it doesn't |
| `docs/01-BRAND-BOOK.md` | brand idea, name, essence, personality, voice |
| `docs/02-VISUAL-IDENTITY.md` | wordmark, palette, type, graphic language, photo treatment |
| `docs/03-DESIGN-SYSTEM.md` | tokens, intensity contract, components and where they come from |
| `docs/04-UX-AND-MOTION.md` | information architecture, the signature moments, motion, accessibility |
| `docs/05-ARCHITECTURE.md` | stack, content model, privacy, performance, delivery phases |

The current task must have a document in `docs/tasks/` before work begins.

## 2. Current phase: the diary direction

The home is being rebuilt on the OFFFORM study (`docs/tasks/TASK-offform-direction.md`):
their technique and pacing, with her palette, type, name and Reversal. It lives at `/`
(`app/(diario)`); the earlier Pile is kept at `/pilha` for comparison, and the
four home studies at `/lab`. Brand docs 01–04 still describe Direct Flash and
get rewritten once this direction settles.

The Next.js app exists (`docs/tasks/TASK-feel-prototype.md`). It runs the Pile,
the flash cut, and the Reversal on 8 reference photos, so the feel can be judged
on the real stack. It is a prototype: its photos are Instagram reference
material, not site content, and it is never deployed publicly. The brand docs
are still under review. Change them first when the feel says they're wrong.

## 3. Source hierarchy

Use this order when sources disagree:

1. Mariana's own words and photographs, given to us by her
2. The decisions in `docs/`
3. Her public Instagram, `@anairamodarnoc`, as saved in `docs/reference/instagram/`
4. ART'hur (`../ART'hur`) for technical architecture and the component-sourcing
   workflow only

Never borrow ART'hur's look: not its palette, type, route line, walker, or Living
Tag. They are Arthur's. The two sites share a way of working, not an identity.

## 4. Consent and privacy

These rules outrank every design decision:

- Nothing goes public until Mariana says yes. Until then the site lives behind a
  protected preview with `noindex`.
- Photos of other people need their consent before they appear. A friend's face
  is not ours to publish because it was on her Instagram. Record `others` and
  `people` per photo; `content/check.ts` fails the build when they don't add up.
- The Instagram reference photos are mood material, not site content. Benito
  chose to keep them in git (commit `2b6cdaf`) while the repo is a working
  prototype; they must never ship in a public build (`ANAIRAM_PUBLIC=1` fails on them).
- Strip GPS and device EXIF from every image before it ships. Read the capture
  date first if we need it.
- Captions are hers, verbatim: emoji, typos, mixed languages and all. Never
  rewrite, translate, or "clean up" what she wrote.
- Do not invent facts about her: no job title, biography, projects, awards, or
  quotes she didn't write. Mark anything unconfirmed as provisional.

## 5. Brand invariants

- Wordmark: `anairam`, lowercase. It's her name reversed, as she writes it herself.
  It turns around to `mariana` around its fixed middle `i`.
- Use `Mariana` in prose, metadata, and accessibility labels. The wordmark's
  accessible name is `Mariana`, with `anairam` as its visible text.
- Brand idea: **A diary kept with the flash on.**
- Essence: **Direct flash.** Close, bright, honest, unretouched.
- Her bio is `>:(`. The site's voice is that deadpan; her captions carry all the
  warmth. Site chrome never uses emoji. Her captions always keep theirs.
- UI language is pt-BR. Captions keep their original language and get a `lang`
  attribute when they aren't Portuguese.

### Palette

Components consume semantic tokens, never raw hex:

- Noite `#0E0B0F`: the night room, the default background
- Flash `#F6F3EE`: primary text on Noite, and the day sheet
- Asfalto `#8A8386` / `#6B6468` on the sheet: metadata and inactive states
- Magenta VDV `#98003B`: the one assertive fill: active state, selection. Never text on Noite
- Rosa Banheiro `#C27790` / `#A3446A` on the sheet: hover, annotation, links
- Amarelo Táxi `#F2C200` / `#7A5F00` on the sheet: the date stamp, and nothing else
- Cobalto Luz `#6F8BFF`: focus rings, and nothing else

### Typography

- Bodoni Moda: the wordmark and display moments
- Schibsted Grotesk: UI, captions, and body copy
- DM Mono: the date stamp, counters, and EXIF-style data

## 6. Experience rules

- The home is **the Pile**: her photos as a stack of prints you go through one at
  a time. One gesture moves one print: a flick, drag, wheel notch, swipe, or arrow
  key. It is never a carousel strip or a masonry wall.
- Every cut between photos is a **flash cut**: one short white-out that develops into
  the next photo. It happens once per cut and never more than three times in a second.
- The surface follows the photo. Night photos sit in the Noite room, day photos on
  the Flash sheet. It's a hard cut, never a fade.
- `/tudo` is the full contact sheet and the complete low-motion alternative to the
  home. Everything reachable in the Pile is reachable there.
- Mobile keeps the Pile. It does not turn into stacked cards.

## 7. Intensity contract

> Core recedes. Patterns structure. Motion guides. Sula asserts. Atmospheres are the room.

- The photograph is always the region's assertive element. Nothing competes with it.
- The flash cut and the Reversal are the only two signature motions. Never run
  both in the same moment.
- At most one sula element per region. Grain and the room colour are atmosphere.
- Controls, counters, and captions are quiet.

## 8. Motion and media

Motion should feel like a camera, not a screensaver: flash, shutter, advance.

- Use flash cuts, a hard surface cut, the print thrown off the pile, and the Reversal.
- Avoid ambient loops, parallax, cursor trails, glow stacks, and generic fades.
- Reduced motion removes the flash, the throw, and the Reversal animation. Cuts
  become immediate. All content and order stay the same.
- The first photo is usable without JavaScript. Only the active and next prints
  load eagerly.
- No autoplay audio. No sound in v1.

## 9. Accessibility

WCAG 2.2 AA is the floor.

- The Pile works with keyboard, touch, pointer, and screen readers. It has visible
  previous/next controls, and it announces position ("7 de 66") and the caption.
- Flash cuts respect WCAG 2.3.1: at most three flashes per second, capped
  brightness, and never a saturated red flash.
- Visible focus uses Cobalto Luz. Targets are 44 × 44 CSS px where practical.
- Every photo needs alt text. We write it, since her captions are not
  descriptions. The caption stays as the caption.

## 10. Component sourcing

Use libraries for accessible behaviour, not their demo looks. Same priority and
workflow as ART'hur:

1. USVA (shadcn-compatible registry)
2. shadcn/ui, via `pnpm dlx shadcn@latest docs|view|add <component>`
3. AlignUI
4. React Bits
5. Aceternity UI
6. Custom code for the Pile, the flash cut, the Reversal, and the date stamp

Before adding a component, document its storytelling job, intensity layer, the
region's existing sula, keyboard/touch/reduced-motion/SSR behaviour, and why it
serves Mariana rather than looking like a component demo. If it isn't necessary,
don't add it. `docs/03-DESIGN-SYSTEM.md` §6 holds the current decisions.

## 11. Next.js and React workflow (once the app exists)

- Next.js App Router, TypeScript, Tailwind CSS v4, pnpm. Match ART'hur's Next.js
  major version, and read the version-matched guide in `node_modules/next/dist/docs/`
  before editing Next.js behaviour.
- Server Components by default. Client boundaries only for the Pile, the flash
  cut, and the Reversal.
- Use `next/image` for every photo.

## 12. Work sequence

Before work:

1. read the relevant `docs/` section and the reference photos
2. write or update `docs/tasks/TASK-*.md` with the current scenario, planned
   changes, reasons, and affected files
3. state content assumptions explicitly

After code work (once there is code): `pnpm typecheck`, `pnpm lint`, `pnpm build`,
`git diff --check`, keyboard and reduced-motion checks, and a mobile pass.

Update the affected doc and this guide when a decision changes. Commit coherent
changes as work progresses.
