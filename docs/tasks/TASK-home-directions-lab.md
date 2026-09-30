# TASK: Home directions lab

## 0. Status (2026-09-29): four directions built, waiting for Benito's pick

## 1. Current scenario

- Benito's feedback on the first prototype: "achei o design ruim... não parece nada
  Awwwards, o do Arthur é muito mais foda."
- The first prototype followed the docs to the letter: the brief says the site does
  not try to impress, the intensity contract keeps everything quiet, and the
  wordmark sits at 24 px in a corner. The result is correct, but it has no presence.
- ART'hur (read-only clone) is built on MILEZ Archive and YK Produce: full-viewport
  scenes, oversized type, WebGL transitions (`ogl`), an opening plate, and a
  cursor that carries verbs. We match that level of craft, not its look (`CLAUDE.md` §3).

## 2. Planned changes

`/lab` with three home directions, each on the same 8 reference photos. The
current site is untouched.

- **a · revelação:** `anairam` set across the whole viewport, with the print laid
  over it off-centre. Each cut flashes, then the next print develops out of white
  paper in WebGL (`ogl`): shadows first, highlights last, with warm halation and
  grain. At rest the shader returns her pixels unchanged. There's a Bodoni odometer
  counter, her caption set large with line reveals, the film edge, and a cursor
  with verbs.
- **b · contato:** the home is a contact sheet on the light table. The name is
  pinned while the Reversal scrubs with scroll, then the film strips rise over it.
  There's a loupe at 2.6×, a Rosa grease-pencil circle, and an enlargement that
  grows off the sheet (shared layout) out of a flash.
- **c · pilha:** real prints in 3D, with a white lab border, weight, and a gloss
  that follows the pointer. Flicked prints spin off the pile. `virar` (or V) turns
  the print over, and the back shows her caption and the lab stamp. The name sits
  in outline behind the pile, with a Bodoni odometer.

- **d · metamorfose** (after Benito: "i really liked the name inverting thing"
  and asked for transitions like morphing): A's room with C's physical print.
  The photo inside the print morphs into the next in WebGL
  (`components/lab/morph-stage.tsx`), in three selectable modes: **derreter**
  (each photo displaces the other by its brightness), **onda** (a lens ring
  runs out from where you touched), and **fatias** (strips slide past each
  other). The flash peaks at 46% of the morph, and the room cuts there. Holding
  the print makes it wet: the image ripples under the finger. Flinging it changes
  the photo in the fling's direction. Clicking opens `/foto/[slug]`, and the print
  becomes the photo page through React `<ViewTransition name="foto-…" share="morph">`,
  also wired on the `/tudo` thumbs and the photo page. The name leans toward the
  pointer on Bodoni Moda's axes (`wght` 400 → 900, `opsz` 96 → 12, in
  `components/lab/use-pressure.ts`) and still turns round its i.

Shared: `components/brand/use-reversal.tsx` (the Reversal as a hook: timed,
scrubbed, and at any size), `components/lab/*`. The site's routes move into `app/(site)`
so the lab gets its own full-bleed layout.

## 3. Why

The brand idea and the photos were right. What was missing was scale,
composition, and technique. Three concrete directions let Benito choose by
seeing them, rather than by reading.

## 4. What the lab bends on purpose (docs to update once a direction is chosen)

- `01-BRAND-BOOK.md`: "does not try to impress anyone" becomes "impressive
  in her way".
- `02-VISUAL-IDENTITY.md` §5: C adds shadows and a gloss over the photo; A and C
  set the counter in Bodoni.
- `03-DESIGN-SYSTEM.md` §4: the name becomes a region's architecture next to the photo.
- `04-UX-AND-MOTION.md`: B replaces the Pile with a contact sheet (the Pile rule
  in `CLAUDE.md` §6). The develop takes 1.3 s rather than 520 ms.

The safety rules are unchanged: at most 3 flashes per second, 0.85 peak,
reduced motion removes the flash, the develop, the throw, and the Reversal
animation, and `desligar flash` works in every direction.

## 5. Affected files

`app/(site)/**` (moved), `app/lab/**`, `app/layout.tsx`, `app/not-found.tsx`,
`components/brand/use-reversal.tsx`, `components/brand/wordmark.tsx`,
`components/lab/**`, `app/globals.css`, `package.json` (`ogl`).

## 6. Checks

`pnpm typecheck`, `pnpm lint`, `pnpm build`, and `git diff --check`. Then desktop
and mobile screenshots of each direction, the WebGL develop in Chromium
(SwiftShader), reduced motion with no flash in all three, and the enlargement
dialog returning focus.
