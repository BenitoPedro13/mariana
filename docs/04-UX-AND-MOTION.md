# 04 — UX and Motion

## 1. Information architecture

| Route | Surface | Job | Sula |
| --- | --- | --- | --- |
| `/` | Follows the active photo | The Pile: her photos one at a time | The active photo |
| `/tudo` | Noite | Contact sheet of everything. The complete low-motion alternative | None |
| `/foto/[slug]` | Follows the photo | One photo, full caption, date, series, prev/next | The photo |
| `/sobre` | Noite | `>:(` and whatever she writes. Nothing invented | `>:(` |
| `404` | Noite | `essa foto não existe >:(` and a link to `tudo` | None |

The header is on every page and has three items: `anairam` (home), `tudo`,
`sobre`. The footer has `@anairamodarnoc` and the gift line.

No search, contact form, newsletter, cookie banner (no tracking cookies), or
language switch in v1. `/foto/[slug]` pages exist so every photo has a URL you
can send to a friend.

### Series

Photos can belong to a **série** (a night or a trip, such as "carnaval 2023/rj"),
named by her. Series are a filter on `/tudo` and a quiet label on the photo
page. They are not a separate route in v1.

## 2. The home: the Pile

### Composition (desktop)

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

### Composition (mobile)

Same hierarchy, not stacked cards. The print fills the width minus the gutter,
the counter and prev/next sit in a bottom bar within thumb reach, and the caption
sits under the print and scrolls with the page if long. The header collapses to
the `i.` monogram and a `tudo` link.

### Input

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
exactly three.

### 3.1 The first exposure (home, full page load only)

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
- Triggers: first exposure, then hover or focus of the wordmark (once per hover,
  and not again until the pointer leaves).
- It never runs during a flash cut.
- Screen readers hear "Mariana, página inicial" once. The letters are
  `aria-hidden`.
- Built with FLIP layout animations on individual letter spans. The server
  renders `anairam` in the resting order.

### 3.3 The flash cut

Every photo change on `/` and `/foto/[slug]`:

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

### Reduced motion

`prefers-reduced-motion: reduce`, or flash off plus reduced motion:

- No flash, throw, Reversal animation, or develop.
- Photo changes are an instant cut. The surface cut stays (it's a cut already).
- The Pile keeps its stacked look (static angles) and all inputs.
- The wordmark shows `anairam`. Focus reveals `mariana` as plain text in a
  tooltip-free way: the letters swap instantly.

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

### Without JavaScript

The home renders the first photo, its caption, and plain links to `anterior`,
`próxima` (as `/foto/…` URLs), and `tudo`. Everything is reachable.

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
