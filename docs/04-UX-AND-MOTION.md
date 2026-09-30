# 04 — UX and Motion

## 1. Information architecture

| Route | Surface | Job | Sula |
| --- | --- | --- | --- |
| `/` | Noite | The diary: the home, one long scroll of sections (§2) | The photo in view |
| `/pilha` | Follows the active photo | The Pile: her photos one at a time (§2.9) | The active photo |
| `/tudo` | Noite | Contact sheet of everything. The complete low-motion alternative | None |
| `/foto/[slug]` | Follows the photo | One photo, full caption, date, series, prev/next | The photo |
| `/sobre` | Noite | `>:(` and whatever she writes. Nothing invented | `>:(` |
| `/lab` | Noite | The four home studies, kept for comparison. Not linked | Varies |
| `404` | Noite | `essa foto não existe >:(` and a link to `tudo` | None |

On the home, the header is fixed and has five columns: `anairam` (home), "fotografia /
diário com flash", the two mood squares, the section nav (`sobre · fotos ·
legendas · seleção · índice`), and the years. Under 1024 px it's the name, the
squares and a menu. It's transparent over the hero and a Noite bar after it.
The other pages keep their own header: `anairam`, `tudo`, `sobre`.

No search, contact form, newsletter, cookie banner (no tracking cookies), or
language switch in v1. `/foto/[slug]` pages exist so every photo has a URL you
can send to a friend.

### Series

Photos can belong to a **série** (a night or a trip, such as "carnaval 2023/rj"),
named by her. Series are a filter on `/tudo` and a quiet label on the photo
page, which links to `/tudo?serie=…`. They are not a separate route in v1. The
selected series chip is an ink fill plus an underline, because the light filter
next to it already holds the screen's one magenta.

## 2. The home: the diary

The OFFFORM study's technique and pacing with her palette, type, name and
Reversal (`docs/tasks/TASK-offform-direction.md`, where §3 has every number
and §9 what was built). One long scroll. UI text is DM Mono at 11 px, lowercase,
with 0.5 px Flash hairlines and 7 or 10 px squares as the only marks. Every
section is a Server Component page handing data to one client component in
`components/diario/`.

| # | Section | Component | What happens |
| --- | --- | --- | --- |
| S0 | Preloader | `hero.tsx` | The hero's centre line in its loading state: `NN%`, the line growing, a square on its tip. At 100 % one flash, then the room opens |
| S1 | Header | `header.tsx` | Fades in after the intro. The active section is Rosa |
| S2 | Hero | `hero.tsx` | Three photos edge to edge, revealed top → bottom 80/160/240 ms apart; the centre line with each photo's date and light. They leave at three speeds; the line holds until the next section. Hover: React Bits RippleDistortion |
| S3 | Sobre | `about-strip.tsx` | `sobre ——— anairam ■` builds; pinned, the list rises through a fixed square and each line parts around it |
| S4 | Destaques | `about-strip.tsx` | A drifting, draggable strip of bottom-cropped frames; hover opens the crop |
| S5 | Fotos | `roster.tsx` | Every photo as a row (number, her caption, date), `noite / dia` switch, a preview that follows the pointer |
| S6 | Legendas | `curtain.tsx` | One photo parts down the middle; three captions rise through the gap, every line parting around the small print |
| S7 | Seleção | `gallery.tsx` | Five photos on a timer (hold 2.3 s, curtain 0.95 s), with anterior / pausar / próxima |
| S8 | Índice | `index-list.tsx` | The diary by month; hover swaps the sticky photo |
| S10 | Footer | `footer.tsx` | Her name in ASCII: Bodoni letters masking rows of micro type; the letter under the pointer parts |

S9 (contact) was dropped: she has no clients, so there is nothing to book.
Phones keep every section; pinned stages become plain scroll except the
curtain, which pins everywhere.

### 2.9 The Pile (`/pilha`)

The earlier home, kept for comparison. It's still the flash-cut showcase.


#### Composition (desktop)

```
┌─────────────────────────────────────────────────────────────┐
│ anairam                                        tudo   sobre │  ← header, quiet
│                                                             │
│                   ┌───────────────────┐                     │
│                 ┌─┤                   │                     │
│                 │ │                   │                     │  ← the Pile, centred,
│                 │ │     the photo     │                     │    ~72vh tall,
│                 │ │                   │                     │    prints under it
│                 │ │                   │                     │    peek out at angles
│                 │ │           ’23 12 31│                     │  ← date stamp on print
│                 └─┴───────────────────┘                     │
│                                                             │
│  07 / 66                                  ← anterior  próxima → │
│  "é bafo né?!?!"                                            │  ← caption, left-aligned
└─────────────────────────────────────────────────────────────┘
```

- One photo dominates. Two or three prints underneath show only their edges,
  each at its own fixed angle.
- The caption sits below, left-aligned to the gutter and never over the photo.
- Order: newest first by default, as the diary reads today. Within a series,
  chronological, as the night happened.

#### Composition (mobile)

Same hierarchy, not stacked cards. The print fills the width minus the gutter,
the counter and prev/next sit in a bottom bar within thumb reach, and the caption
sits under the print and scrolls with the page if long. The header collapses to
the `i.` monogram and a `tudo` link.

#### Input

One gesture = one print. Never scrub.

| Input | Action |
| --- | --- |
| Flick / drag the top print past a threshold (~25% width or velocity) | Next (throw direction = drag direction) |
| Drag released under the threshold | Print springs back. Nothing changes |
| `→` / `↓` / `Space` / `J` | Next |
| `←` / `↑` / `Shift+Space` / `K` | Previous |
| Wheel / trackpad: one notch (accumulated delta ≥ 40 px, then 600 ms lock) | Next or previous |
| `Home` / `End` | First / last |
| `Enter` on the print | Open `/foto/[slug]` |
| `próxima` / `anterior` buttons | Next / previous (always visible, 44 × 44 targets) |

Previous brings the last thrown print back onto the pile from the direction it
left. The sequence wraps: after the last photo comes the first, with the counter
reading `01 / 66`.

The URL tracks position with `?f=07` (`replace`, not `push`), so a reload or a
shared link keeps your place without polluting history.

## 3. Signature moments

These make the site feel like her, and they need the most craft. There are
exactly three. On the diary home, the preloader's single flash stands in for
the first exposure; the section moves (line builds, parting lines, curtains)
are the motion layer that guides, not signatures.

### 3.0 The preloader (diary home, full page load only)

The counter and the line run on real progress (images loaded, with a 1.5 s
floor and a 6 s safety). At 100 % one flash (the §3.3 rules: capped, rate
limited, never with reduced motion), and the hero curtains open at its peak.
With the flash turned off it's a plain cut. Without JavaScript, or with
reduced motion, the hero is simply there at 100 %.

### 3.1 The first exposure (`/pilha`, full page load only)

1. The screen is Noite. The header is already present, because content is never
   hidden behind an intro.
2. At 200 ms, one flash: white-out to `--flash-peak` in 60 ms.
3. The first photo develops out of it over 520 ms, going from overexposed to true.
4. At 900 ms, the wordmark does its Reversal once (§3.2).

The whole thing takes about 1.6 s and doesn't block input: a key press or flick
during it skips straight to the settled state. It never replays on client-side
navigation back to the home. Base styles are the final state, and the animation
only supplies an earlier state, so if the script fails the page is simply there.

### 3.2 The Reversal

The seven letters of `anairam` animate to their mirrored index (`i → 6 − i`),
each on a low arc (outer letters travel furthest and arc highest). The `i` at
index 3 doesn't move. The tittle blinks Magenta VDV once as the other letters
pass it.

- Timing: 700 ms per letter, 45 ms stagger from the outside in. It holds as
  `mariana` for 1.2 s, then returns.
- Triggers: the end of the diary intro (or the first exposure on `/pilha`),
  then hover or focus of the wordmark (once per hover, and not again until the
  pointer leaves).
- It never runs during a flash cut.
- Screen readers hear "Mariana, página inicial" once. The letters are
  `aria-hidden`.
- Built with FLIP layout animations on individual letter spans. The server
  renders `anairam` in the resting order.

### 3.3 The flash cut

Every photo change on `/pilha` and `/foto/[slug]`:

1. Input is received and the current print starts its throw (or, for the
   buttons and keys, a short 8° slide off in the travel direction).
2. The flash layer rises to `--flash-peak` in 60 ms.
3. While white, the surface cuts (night ↔ day if the lighting changes), the next
   print is placed, and the counter and caption update.
4. The flash decays over 520 ms. The new photo develops out of the white.

When the surface changes night → day, the flash and the day sheet are nearly the
same colour. The cut becomes a *burn-in*: it feels like stepping out of a club
into daylight. Day → night feels like the flash going off in a dark room. That's
her "dois moods" as a transition.

## 4. The other pages

**`/tudo`**: a contact sheet. A CSS grid of 4:5 thumbnails (2 columns on mobile,
up to 6 on wide screens) in the same order as the Pile. Each thumb is a link
to its photo page. Hover or focus shows the date stamp. Filter row: `tudo · noite · dia`
(ToggleGroup) plus series chips. No motion beyond focus and hover. This is the
page for anyone who prefers reduced motion, a screen reader, or just scanning.

**`/foto/[slug]`**: the print, uncropped, as large as the viewport allows. Full
caption, date stamp, series label, and `anterior` / `próxima` within the current
order. `voltar` returns to the Pile at this photo's position.

**`/sobre`**: `>:(` at display size in DM Mono, centred in the Noite room. Under it
is whatever Mariana chooses to write, and until then, nothing. Then
`@anairamodarnoc` and the credit line.

## 5. Accessibility

WCAG 2.2 AA is the minimum.

### Photosensitivity (WCAG 2.3.1 and 2.3.3)

- At most one flash per cut, and flashes are rate-limited to ≥ 334 ms apart (≤ 3/s).
  Rapid input still changes photos but skips the flash.
- Brightness capped at 0.85 opacity of Flash, never pure white.
- The flash is always neutral Flash, never magenta or red. Saturated red flashes
  are the higher-risk case.
- Reduced motion removes the flash entirely.
- A persistent `flash: on / off` control in the footer lets anyone turn it off
  without an OS setting, remembered per browser. It's labelled "desligar flash".

### Things that move by themselves

Only two: the destaques strip drifts, and the seleção gallery changes photo
every 3–4 s. The strip pauses off-screen and stops for reduced motion; the
gallery runs only while its stage is on screen, holds on hover or focus, and
has `anterior / pausar / próxima` (WCAG 2.2.2). With reduced motion neither
moves on its own.

### Reduced motion

`prefers-reduced-motion: reduce`, or flash off plus reduced motion:

- No flash, throw, Reversal animation, or develop.
- Photo changes are an instant cut. The surface cut stays (it's a cut already).
- The Pile keeps its stacked look (static angles) and all inputs.
- The wordmark shows `anairam`. Focus reveals `mariana` as plain text in a
  tooltip-free way: the letters swap instantly.
- The diary: no preloader (the hero is there at 100 %), no column lag, no
  ripple, no parting lines or preview lerp; the curtain becomes a still column
  of the same photos and captions; the gallery and strip don't move by
  themselves. Scroll-linked moves (line builds, the sobre list rising) stay,
  since they only follow the reader's own scrolling.

### Screen readers

- The Pile is a `region` labelled "fotos", with a polite live region that
  announces "foto 7 de 66. {alt}. legenda: {caption}" after each change.
- Each print is an `img` with our written alt text. The caption is real text,
  not part of the alt.
- Captions carry `lang` when not pt-BR.
- Dragging is never the only way. Buttons and keys do everything (WCAG 2.5.7).

### Keyboard

- Tab order: header → the Pile (the print is one focusable link) → anterior →
  próxima → caption links → footer.
- A skip link goes to `tudo` ("pular para todas as fotos").
- Visible focus uses Cobalto Luz (`03-DESIGN-SYSTEM.md` §1).

- On the diary, each section has one `h2` (the nav jumps focus it), captions
  are real text with `lang`, the ASCII footer is one `img` named "Mariana",
  and the parted lines in S3 and S6 are `aria-hidden` copies of one readable
  text. axe-core (WCAG 2.0–2.2 A/AA) is clean on desktop, phones and reduced
  motion (task §9, step 8).

### Without JavaScript

The diary renders every section with its photos and captions; the hero shows
at 100 %, the curtain as its still column, the switch and the gallery on their
first state (every photo is still reachable through the rows, the index and
`/tudo`). The Pile renders the first photo (or the one in `?f=`, through the
proxy), its caption, and plain links to `anterior`, `próxima` (as `/foto/…`
URLs), and `tudo`.

## 6. Craft details (the awards level)

What separates this from a template is the finish, not the effects:

- The rotation of each print is seeded by its id, so the pile looks the same every
  visit, like a real pile on a real table.
- The throw inherits the pointer's velocity and direction. The print leaves the
  way you flicked it.
- The date stamp is the actual date, in camera format, with the apostrophe.
- The counter uses tabular figures, so it never jitters.
- Night → day burns in and day → night flashes. The transition knows the light.
- A blur placeholder (from `next/image`) sits under every print, so nothing
  pops in grey.
- The next two prints preload while you look at the current one. A flick is
  never followed by a loading state.
- Captions keep her line breaks exactly.
- The Reversal pivots on the one letter that doesn't move. Someone will notice,
  and that's the point.
- On the diary, numbers are the photo's place in the diary everywhere (hero
  ticks, strip, rows, seleção), so `07` is the same photo on every screen.
- The curtain's captions sit on whole pixels, so the seam where a line parts
  never shows as a hairline through a letter.
- The footer's name is her name backwards made of her name backwards.
