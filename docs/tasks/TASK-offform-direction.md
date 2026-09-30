# TASK: new direction, rebuilt from the OFFFORM reference

Status: planned, not started · 2026-09-29. Benito asked for the plan only; no code yet.

## 1. Scenario

Benito rejected the Direct Flash direction ("the brand is horrible, everything
looks off and amateur"). He recorded a walkthrough of a reference site,
**OFFFORM — Talent Agency** (offform.net), and wants its layout, animations and
style used for Mariana's site, section by section.

Inputs:

- Screen recording `~/Desktop/Screen Recording 2026-09-29 at 21.07.24.mov`
  (108 s, 3420×1908, 60 fps). Not copied into the repo (700 MB).
- Frames per section, 8 fps, 1440 px wide:
  `docs/reference/offform-frames/<section>/NNN.jpg` (gitignored). Frame `NNN`
  sits at `start + (NNN-1)/8` seconds of the recording.
- The saved page `docs/reference/OFFFORM - Talent Agency.html` and its
  `_files/` folder (gitignored). Its custom JS is unminified and commented, so
  the timings below are read from the source, not guessed from video.

What we take and what we don't:

- **Take:** layout grid, type scale, mono UI, colour logic, cursor, every
  motion pattern and its timing.
- **Don't take:** the name, the wordmark, their copy, their photos, their
  code. Everything is re-implemented in React from the behaviour described
  here. Their photos are AI fashion shots of models; ours are Mariana's.
- **Still binding** from `CLAUDE.md` §4: consent, privacy, verbatim captions,
  no invented facts, noindex preview.

## 2. Global system (applies to every section)

| Thing | Reference value | Ours |
| --- | --- | --- |
| Background | `#0b0b0b` (sections `#0d0d0d`) | `--bg: #0b0b0b` |
| Foreground | `#ffffff`, secondary text ~55% white | `--fg`, `--fg-muted` |
| Accent | `#ff4fd8` (active nav, hover, focus) | `--accent: #ff4fd8` |
| Lines | 0.5 px white hairlines | same |
| Type | Courier (Courier Prime), uppercase, 500 | Courier Prime via `next/font` |
| Sizes | 10 px UI, 8 px marker labels, letter-spacing 0.02–0.08em | same, `clamp` up on wide screens |
| Gutter | 20 px desktop, 16 px ≤1024 px | same |
| Squares | 10 px solid white squares end every line/label ("■") | same |
| Cursor | 12 px white square, `mix-blend-mode: difference`, hides native cursor on fine pointers | same, off for coarse pointers |
| Scroll | Lenis smooth scroll, desktop only; native on touch | Lenis, desktop only |
| Anchors | nav clicks glide with a 900 ms eased scroll | same |

Motion vocabulary used everywhere:

- **Curtain reveal**: `clip-path: inset(0 0 100% 0) → inset(0)`, 650 ms,
  `cubic-bezier(0.76, 0, 0.24, 1)`. Images open top → bottom.
- **Line build**: a label pair `A ———— B ■` whose hairline grows from 3 px to
  full width as the section scrolls in, pushing the second label and square
  to the right edge.
- **Wave hover**: on pointer movement over an image, a canvas copy of it is
  cut into 2 px horizontal strips, each shifted sideways by
  `(sin(y·0.045+φ) + 0.65·sin(y·0.021−1.7φ) + 0.35·sin((y−mouseY)·0.018+0.65φ)) × 4.5 px × amount`.
  `φ += 0.13` per frame. `amount` eases to 1 while moving (×0.45), decays
  ×0.86 per frame once the pointer has been still 70 ms. Fine pointer, ≥1025 px only.
- **Pink glow**: hovered/focused rows and links turn `#ff4fd8` with a soft
  text-shadow glow, 280 ms.

## 3. Sections

Reference header copy, for scale: `OFFFORM` · `TALENT AGENCY / MODEL MANAGEMENT / CASTING` ·
`ABOUT TALENTS SERVICES CONTACT` · `TALENT ROSTER / 2024 — 2026`. Hero labels: `FACES`,
`TALENT`, `FASHION`, `BEAUTY`, `EDITORIAL`, `RUNWAY`; bottom-right list `01 WOMEN / 02 MEN /
03 NEW FACE` and `VIEW ALL TALENTS ■`.

Timestamps are seconds in the recording.

### S0 · Preloader (frames `01-loader-hero-reveal`, 4.5–8 s)

- Full-screen `#0b0b0b`. A single row sits exactly where the hero's centre
  line will be: `NN%` counter (10 px mono) · a hairline that grows · a 10 px
  white square riding the line's tip.
- Progress = min(asset progress, time progress). Assets: the hero photos,
  every roster photo, the services and gallery openers. Time floor 1500 ms.
  Displayed value lerps ×0.12 per frame toward the target, so it eases.
- At 100 %: background fades out over 220 ms; the row stays and becomes the
  hero's line (it is the same geometry). Loader removed at 230 ms.
- Safety: after 6 s, everything counts as loaded.

### S1 · Header (all frames)

- Fixed, transparent, `padding: 28px 20px 0`, grid `1fr 1.25fr 0.5fr 1fr 0.8fr`:
  1. wordmark (left)
  2. two-line discipline text
  3. theme squares: a black square with white border + a white square with black border (decorative)
  4. nav, 28 px gaps; hover and active section in accent pink
  5. two-line right text, right-aligned
- Fades in (opacity 340 ms) only after the hero intro ends.
- Active nav item follows the section in view.
- ≤1024 px: wordmark · squares · 22×11 burger; menu drops down (220 ms).

### S2 · Hero (frames `01`, `02-hero-hover`, 8–27 s)

- `100vh`, three equal columns, one full-bleed photo each, `object-fit: cover`.
- Intro, right after the loader: each column curtain-reveals top → bottom,
  650 ms, delays 80 / 160 / 240 ms.
- Centre system (absolutely placed at 50 % height, 20 px sides): `100%` counter ·
  hairline · square. Six tick markers (1 × 5 px) sit on the line at 1/9, 2/9,
  4/9, 5/9, 7/9, 8/9 of the width (two per photo), each with an 8 px label
  underneath. Ticks fade in with 40 ms stagger once the images are in.
- Bottom-left (20 px, 22.5 px from bottom): three-line intro copy, 220 px wide.
  Reference: `A ROSTER OF DISTINCTIVE FACES / BUILT FOR FASHION, BEAUTY AND / WHAT COMES NEXT.`
- Bottom-right (330 px wide): a numbered 3-item list (`01 … 02 … 03 …`, label right-aligned)
  and a "view all" button: text, hairline underneath, square at the end.
  Both corners fade up 8 px (320 ms opacity, 420 ms transform).
- Hover: wave distortion on the hovered photo (see §2).
- Scroll exit: the hero scrolls away normally, but each column is pushed
  down by `travelled × [0, 0.12, 0.24]`, so the left photo leaves first and
  the right one last (frames `03-hero-exit-about` 1–30).
- The centre line **holds** (is translated down by the scroll amount) until
  its lowest marker label is 80 px above the next section's first row, then
  scrolls away with the page.
- Mobile: the three photos stack in one frame and cross-fade on a 9 s loop;
  the image inside moves (parallax 0.32, max 105 px), the frame doesn't.

### S3 · About (frames `03-hero-exit-about`, 29–35 s)

- Black section right under the hero; it and S4 share one sticky 100vh stage.
- Row 1, a line build: `SOBRE ■` sits left with a 3 px stub of line; as the
  row travels from 65vh to 36vh of the viewport the 0.5 px line grows and
  pushes `ANAIRAM ■` (7 px square, 8 px gaps) to the right edge.
- Under it, three columns at 10 px mono: short statement (left, 3 lines),
  paragraph (middle, 3 lines), 3 × 3 meta grid (right).
- The **obstacle**: a 7 px white square in the middle column, below the
  paragraph. The list `01 … / 02 … / 03 …` under it scrolls 1:1 with the page
  and each line steps right (70 px open distance, 20 px clearance) while it
  passes the square, then closes back (frames 03/020–050).
- Wide screens keep square and labels on one row.

### S4 · Featured strip (frames `04-featured-strip`, 31–42 s)

- Row label (line build, second half of the sticky): `DESTAQUES ———— FOTOS ■`.
  The about line opens during sticky progress 0–0.5, this one during 0.5–1,
  so two lines never open together.
- Full-width row of portrait frames, edge to edge, no gaps. Frame height
  50vh; each frame is cropped from top and/or bottom by the scroll (entry
  parallax down, exit up), so the bottom edge is ragged.
- Infinite loop: items are cloned; the row drifts left continuously (one
  loop = 150 s). Pointer drag (3 px threshold) moves it by hand; touch
  drag locks direction after 4 px (vertical lock at 10 px).
- Hover on a frame: the missing crop opens like the hero curtain, 650 ms,
  same easing. A frame cropped at the bottom opens downward, at the top
  upward, in the middle both ways. Leaving returns to the live crop.
  Then the wave hover runs on the image (object-position: top).
- When the strip reaches its sticky spot the section holds for 1000 ms of
  real time before scrolling on.

### S5 · Roster list (frames `05-roster`, 40–50 s)

- Sticky stage 100vh, sticky distance 100–140vh.
- Intro block: `ROSTER ———— FOTOS ■` line build (it's the one line that
  opens during the sticky), a sub-label, a centred category text
  (`NOITE / DIA`), the switch, and a right-aligned small text.
- **Switch** (`NOITE`, `DIA`): each option is text + 0.5 px underline +
  7 px square 8 px to the right. It builds in on entry: (1) nothing, square
  below-left; (2) the square travels right under the word while the line
  grows behind it; (3) the square rises to text height as the line reaches
  its end. The options start a touch after each other. Active option pink.
- List: rows 48 px (40 px ≤1024), grid `60px 1fr 190px` (number, name,
  place), hairline under each. The list sits 40vh from the top and its
  height is ~58vh. It scrolls through the sticky stage.
- Row hover or keyboard focus: text turns pink with a soft pink glow
  (`0 0 5px` 42 % + `0 0 11px` 20 %), 280 ms. A 260 × 360 preview
  (object-position top) follows the pointer: target x = pointer + 24 px,
  lerp 0.16 per frame, clamped 20 px from every edge and never below the
  section's bottom edge. Focused by keyboard, it centres on the row.
- Switching lists swaps the rows.

### S6 · Photo curtain (frames `06-services-curtain`, 49–67 s)

- One full-screen photo enters with its inside moving +45 px → 0 (entry
  parallax), already in place at the section start.
- Split: over 90vh of scroll the photo parts down the middle; the halves
  slide out until only 250 px of each stays visible at the sides (20 px on
  tablet, 15 px on mobile).
- The small centre image (≈ 90 × 120 px) starts at 58 % of the split, is
  already in its sticky spot, and reveals top → bottom (no fade), arriving
  exactly when the split finishes. Label `SÉRIES` sits right above it.
- Text waits until both are settled (24–30vh delay). Then three blocks, each
  120vh of scroll: title + 3-line paragraph rise from the bottom. While
  passing the unit (label + gap + image), **every line splits into a left
  and a right half that open around it**, then close again above the label.
  Each block swaps the small image (cross-fade) and the active title.
- After the third block: 25–35vh hold, then the exact reverse. The small
  image un-reveals bottom → top, the halves close back together over
  90–120vh, then the closed photo leaves with −45 px internal parallax.
  No parallax while closing.
- Small image has the wave hover (with a soft cross-fade at the tail).

### S7 · Selected gallery (frames `07-campaigns`, 64–72 s)

- Sticky stage 100vh, sticky distance 90–140vh.
- Header: `SELEÇÃO ———— SÉRIE ■` line build (7 px square, 8 px gaps), a
  sub-label, a middle paragraph, a right meta block (years, category, count).
- Left info column (32 % wide, 40 % from top): square + label, 3-line
  description, two meta lines, and the progress `1.1 ■────── 1.5` (the
  square moves along the line as images change).
- Right: the image area from 34 % to the right edge, 68vh tall (45vh on
  small screens), final top 40vh. It enters from below with a 150 px gap
  and parks.
- Timed gallery: hold 2300 ms, close 950 ms (curtain up), open 950 ms with
  the next photo. Starts when the stage is stuck, pauses on hover, resets to
  the first photo when the section is fully off-screen.
- A "view" button builds under it (text, line, square). Wave hover on image.

### S8 · Index list (frames `08-partners-contact`, 70–80 s)

- `SELECIONADAS ———— ÍNDICE ■` line build.
- Left (32 %): landscape image, 40 px gap, then `FOTO / SÉRIE / ANO` meta.
- Right (66 %): 10 rows, 48 px each, number column 60 px, hairlines,
  `calc(58vh − 50px)` tall. Hover or focus swaps the left image instantly
  (all preloaded) and turns the row pink. On wide screens the hovered row
  stays in sync with a still pointer while the page scrolls.
- Final image has the wave hover.

### S9 · Contact (frames `08`, 76–82 s)

- Same sticky as S8; in its second half `CONTATO ———— VAMOS CONVERSAR ■`
  line builds.
- Left: 3-line intro. Right: four inputs in two columns (label left,
  0.5 px underline), submit = text + line + square, 32 px lower.
- Reference submit is a demo: 650 ms `SENDING…`, then 1800 ms `SENT`;
  errors `COMPLETE FIELDS` / `CHECK EMAIL` for 1400 ms.

### S10 · Footer (frames `09-footer`, 81–94 s)

- Height ~72.5vh (80vh wide). `ANAIRAM ———— DIREÇÃO ■` line; its moving
  label rides the line as it builds.
- Four columns, 140 px from the top: `■ SOCIAL`, `■ LEGAL`, `■ LUGARES`,
  `■ NAVEGAÇÃO`; lists at 10 px under them.
- Giant wordmark across the full width (20 px sides), SVG viewBox
  1600 × 320: one mask per letter, filled with rows of the wordmark repeated
  in 12 px micro type (3 px x-gap, 1 px y-gap), so it reads as ASCII art.
- Hover: find the letter under the pointer; only that letter opens. Rows
  within 20 px of the pointer split exactly at the pointer x; the left part
  slides left and the right part slides right, leaving a 20–30 px gap.
  Eased 0.16 per frame; they close when the pointer leaves.
- `© 2026` bottom-right, 10 px gap.
- Touch: one tap presses the wordmark pink.

### S11 · Nav jumps (frames `10-nav-jumps`, 94–108 s)

- Nav clicks glide to the section in 900 ms (eased), offset by the header
  height; focus moves to the section heading. Active item turns pink.

## 4. Content mapping for Mariana

UI language pt-BR, deadpan (her bio is `>:(`). No invented facts.

| Reference | Ours |
| --- | --- |
| OFFFORM wordmark | `anairam` |
| Talent agency / model management / casting | `FOTOGRAFIA / DIÁRIO` |
| About / Talents / Services / Contact | `SOBRE · FOTOS · SÉRIES · CONTATO` |
| Talent roster 2024–2026 | `DIÁRIO` + first–last year of the photos |
| Hero marker labels | per photo: its date and `NOITE`/`DIA` |
| Hero intro copy | `UM DIÁRIO FEITO COM O FLASH LIGADO.` |
| Roster rows (talents) | photos: number · her caption (verbatim, truncated visually, full text in the accessible name) · date |
| Photo curtain (services) | one big photo splits; three photos with her captions pass through the centre |
| Women / Men / New face | `NOITE / DIA` (series appears once series exist) |
| Campaign gallery | a run of 5 photos |
| Partners list | index of the photos |
| Contact form | **open question** (see §7) |

Every photo keeps `alt` (ours) and its caption (hers). Captions in other
languages keep their `lang`.

## 5. Build order

Each step is one commit, checked in the browser against its frames.

1. Foundation: tokens, Courier Prime, cursor, Lenis, header, preloader, hero (S0–S2)
2. About + featured strip (S3–S4)
3. Roster list (S5)
4. Services curtain (S6)
5. Selected gallery (S7)
6. Index + contact (S8–S9)
7. Footer ASCII wordmark (S10) and nav jumps (S11)
8. Mobile pass, reduced motion pass, a11y pass

## 6. Affected files

- New route group `app/(diario)/` for the new home; the old Pile home moves to
  `app/(site)/pilha/` so it can still be compared.
- New components under `components/diario/`.
- `app/layout.tsx`: Courier Prime font; first-exposure script scoped to `/pilha`.
- `.gitignore`: OFFFORM reference files and frames.
- `CLAUDE.md`: note the direction change.

## 7. Assumptions and open questions

- Photos are still the Instagram reference set (8 entries in `content/photos.ts`).
  Real photographs replace them later; nothing here is deployed publicly.
- Reduced motion: no curtains, no wave, no parallax, no hold; content and
  order unchanged; the timed gallery doesn't autoplay.
- **Open:** contact. Mariana has no clients, so a "book talent" form doesn't
  fit. Default for now: the same layout with fields, but the submit opens a
  `mailto:` draft — to confirm with Benito.
- **Open:** the brand docs 01–04 describe the rejected direction. They stay
  in place until this direction settles, then get rewritten.
- **Open:** the roster and index want 10 rows and the strip wants 6+ photos;
  `content/photos.ts` has 8. The reference folder has 33 posts with captions,
  so more entries can be added (each needs our alt text and an `others` count).
- **Flag:** `.gitignore` has the `docs/reference/instagram/*.jpg` rules
  commented out and commit `2b6cdaf` added the photos to git. `CLAUDE.md` §4
  says they never enter git history. Left as is; Benito's call.

## 8. Adaptation (agreed 2026-09-30)

Benito agreed to take OFFFORM's **technique and pacing** and keep Mariana's
identity, rather than a faithful clone. So these values override §2:

| §2 says | Built as | Why |
| --- | --- | --- |
| `#0b0b0b` / `#fff` | Noite `#0E0B0F` / Flash `#F6F3EE` | her palette (`02-VISUAL-IDENTITY.md` §3) |
| accent `#ff4fd8` | Rosa Banheiro `#C27790` for text and glow; Magenta VDV stays a fill | Rosa passes AA on Noite (5.9:1); VDV fails as text (2.23:1) |
| Courier, uppercase | DM Mono, lowercase, 11 px (10 px tick labels) | her type set; her voice is lowercase; 11 px is the doc floor |
| static wordmark | `anairam` with the Reversal; it turns when the intro ends | the one brand element Benito kept |
| loader fades out (220 ms) | one flash opens the room (fade only when `desligar flash` is on) | Direct Flash; same flash safety rules |
| header grid `1fr 1.25fr 0.5fr 1fr 0.8fr` | `1.1fr 1.2fr 0.45fr 1fr 0.85fr`; the two squares are her "dois moods" (a Noite one, a Flash one) | ours, not theirs |

Decisions from §7:

- **Contact (S9): dropped.** No form and no contact block.
- **More photos: yes.** Added 10 reference posts where she's alone or no one
  is identifiable (002, 006, 008, 010, 011, 014, 019, 020, 022, 029), for 18 in
  total. Each has our alt text, the decoded post date, and `others: 0`.
- **Instagram photos stay in git.** That's Benito's call, so the `CLAUDE.md` §4 line
  is updated.

Routes: the diary is the home at `/` (`app/(diario)`). The Pile moves to
`/pilha`, with its `?f=` proxy and first exposure, so the two can be compared.

### Hover effect: React Bits RippleDistortion (2026-09-30)

Benito replaced the strip-wave hover ("trash") with **RippleDistortion from
React Bits** (MIT), ported to TypeScript in `components/react-bits/ripple-distortion.tsx`
and wrapped for photos by `components/diario/ripple-image.tsx`.

- **Storytelling job:** the photo reacts to the pointer like wet paper.
  It's a hover detail on photos that are already the region's sula, not a sula of its own.
- **Layer:** motion, on the photo. It never runs during a flash cut, because the hero
  intro finishes before it can be reached.
- **Settings:** brushSize 150, strength 0.2, swirl 1, rings 4, the library's defaults.
  `grayscale` is off and `tintAmount` is 0, so it distorts her photo but never
  recolours it.
- **Keyboard, touch, reduced motion, SSR:** it's hover-only, so there's nothing for the keyboard.
  It only mounts on fine pointers ≥ 768 px with motion allowed. The real `<img>` stays
  underneath for first paint, no-JS and the alt text, and the canvas takes over once its
  texture is drawn.
- **Our changes to the source:** an `onReady` callback, and the loop stops drawing
  while no ripple is alive, so three instances cost nothing at rest.

## 9. Progress

- [x] Step 1: foundation (tokens, cursor, Lenis, header, preloader, hero, S0–S2).
  Checked in Chromium: the preloader counts 0 → 100% with the square on the tip,
  then the flash, the curtain reveal with 80/160/240 ms delays, the ticks and
  corners, the header fade and the Reversal, the hover (now RippleDistortion), column lag and line
  hold on scroll, phones (one frame, 9 s turns), reduced motion and no-JS (all
  visible at once), and the Tab order. The frames weren't available in the cloud
  session, so this was checked against the plan's text.
- [x] Step 2: S3–S4 (`components/diario/about-strip.tsx`, `line-build.tsx`).
  One sticky stage, pinned for 248 px + 70vh. `sobre ——— anairam ■` builds as
  it rises (65vh → 36vh); pinned, the list rises through a fixed 7 px square at
  half speed and each line parts around it (split at 42 px, 20 px clear each
  side, open within 40 px); then `destaques ——— fotos ■` builds. One 1 s hold
  the first time it pins (smooth scroll only). The strip: 20vw frames (46vw on
  phones), each cropped from the bottom to its own height, opens on hover or
  focus (650 ms), drifts left (one loop = 150 s, paused offscreen and with
  reduced motion) and drags (a drag never opens a photo). Clones are
  `aria-hidden` and out of the Tab order. The header turns into a Noite bar
  past the hero, so text scrolling under it stays readable. Checked against
  frames `03-hero-exit-about` and `04-featured-strip` in Chromium at 1440 × 804,
  phones at 390, and with reduced motion. The about copy only says what the
  photos show (dates, counts, flash, her captions); nothing about her is invented.
- [x] Step 3: S5 (`components/diario/roster.tsx`). `#fotos`: a sticky stage
  pinned for 110vh. `fotos ——— o diário ■` builds over the first 40 % of the
  pin (to the middle of the row, where the switch starts); a list taller than
  the stage rises through the rest. The `noite` / `dia` switch (toggle buttons
  with `aria-pressed`, the count announced politely) builds once on entry:
  square below-left, along the growing underline, up to the word, the two
  options 90 ms apart. Rows: the photo's diary number · her caption verbatim
  (ellipsis on screen, whole in the DOM, `lang` kept) · the date, 48 px (40 px
  ≤ 1024), hairline under each. Hover or focus: Rosa with the glow, and a
  260 × 360 preview that follows the pointer (x + 24, lerp 0.16, 20 px from
  every edge, never below the section), or sits by the row when focused by
  keyboard. The previews load only when the section is near. Phones: no pin,
  no preview. Reduced motion: the switch is already built, the preview snaps.
  Checked against frames `05-roster`.
- [x] Step 4: S6 (`components/diario/curtain.tsx`). `#legendas` (the nav's
  third item is now `legendas`: no series exist yet, so the section doesn't
  claim them). One sticky stage, pinned for 535vh: the big photo (ref-005)
  parts down the middle over 90vh until 250 px of each half is left (20 px on
  tablet, 15 px on phones); the 90 × 120 print reveals top → bottom over the
  split's last 42 %; after 25vh, three captions (ref-007, ref-002, ref-008:
  date · light, then her caption verbatim with her line breaks) rise 100vh
  each and every line parts around the print as it passes, then closes
  again. The print swaps with a hard cut per caption and links to that photo.
  30vh hold, then the exact reverse. The photo drifts +45 → 0 px inside its
  frame on the way in and 0 → −45 px on the way out, never while closing.
  One readable copy of each caption stays in the accessibility tree; the
  parted lines are `aria-hidden` copies. Reduced motion and no JavaScript get
  a still column instead (`lib/motion-preference.ts`): the photo, then each
  print with its caption. Checked against frames `06-services-curtain` in
  Chromium at 1440 × 804, phones at 390, and with reduced motion.
- [x] Step 5: S7 (`components/diario/gallery.tsx`). `#selecao`: a sticky stage
  pinned for 115vh; `seleção ——— 05 fotos ■` builds over the first 40 %. The
  frame (34 % → the edge, 68vh, 45vh on phones) comes in 150 px low and parks.
  Five photos (ref-003, ref-019, ref-011, ref-025, ref-022): hold 2300 ms, the
  curtain rises 950 ms, the next opens 950 ms. It runs only while the stage is
  stuck (the frame fully in view on phones), holds on hover or focus, has
  `anterior` / `pausar` / `próxima` (WCAG 2.2.2), and goes back to the first
  photo once the section is off-screen. The left column shows the diary number,
  her caption verbatim, the date and light, `ver foto`, and the progress
  `01 ■──── 05`. Reduced motion: no autoplay and no pause button; the arrows
  cut straight to the photo. No wave hover here: five stacked WebGL canvases
  cost more than the effect is worth. Checked against frames `07-campaigns`.
- [x] Step 6: S8 (`components/diario/index-list.tsx`; S9 dropped). `#indice`:
  S5 already lists every photo, so the index is by month instead: 13 rows,
  newest first, each the month, its count, and a link to that month's first
  photo. `índice ——— por mês ■` builds as it rises. Left (32 %, sticky): a 4:3
  crop of the active month's first photo (all loaded, swapped at once) and
  `foto · luz · ano`. Hover or focus makes a row active and Rosa; with a still
  pointer, the row under it stays active while the page scrolls. Not pinned:
  the section is a plain scroll with a sticky left column, which reads the
  same on phones (stacked). Checked against frames `08-partners-contact`.
- [ ] Step 7: S10–S11
- [ ] Step 8: mobile, reduced motion, a11y
