# 02 — Visual Identity

## 1. Direction

## **Direct Flash**

A near-black room. The photograph is the only light source. Type is sparse and
sits at the edges like the markings on a print: a date stamp in the corner, a
frame counter, a caption underneath. Colour comes from the photos. The frame adds
one magenta, used once.

### On the home: the diary

The home (`/`) is built on the OFFFORM study: their technique and pacing,
her palette, type, name and Reversal. The room is still Noite and the photos
are still the only light, but they arrive large and edge to edge, and the
chrome becomes a thin set of markings: DM Mono at 11 px, lowercase, 0.5 px
Flash hairlines, and small Flash squares. Rosa is the only colour the frame
adds (hover, focus glow, the active item). Magenta VDV doesn't appear on the
diary at all; there is no fill that needs it. The Pile at `/pilha` keeps the
treatment below as first written.

### Aesthetic risk

The deliberate risk is **the flash cut**: on the Pile, every transition briefly
whites out the screen and develops the next photo out of the overexposure (on
the diary, the preloader's one flash). It's the one thing
people will remember, and the one thing that must be engineered carefully for
photosensitivity (`04-UX-AND-MOTION.md` §5).

### What it should never become

- An Instagram clone: square grid, likes, stories rings.
- A nightclub flyer: neon glow, chrome type, stacked effects. Her photos already
  contain the club. The frame stays calm.
- Y2K pastiche: butterflies, sparkles, glitter cursors. Those live in her captions
  as emoji, not in our chrome.

## 2. Wordmark

`anairam` set in **Bodoni Moda**, lowercase, optical size high (`opsz` 96), weight
500 with regular letter-spacing.

- High-contrast Bodoni reads like a fashion masthead, which matches the sequins,
  the platform heels, the VDV stage. Lowercase undercuts it the way her captions do.
- The `i` is the hinge. Its tittle (the dot) is the one place Magenta VDV may
  touch the wordmark. It stays in place when the other letters swap, like a
  pivot pin.
- Minimum size: 20 px tall on screen. Below that, use the monogram.
- Clear space: the height of the `a` on all sides.

**Monogram:** `i.` A Bodoni lowercase `i` with a magenta tittle, followed by a
full stop in Flash. Used for the favicon, social avatar, and the collapsed header
on mobile.

**Secondary mark:** `>:(`, set in DM Mono. It's hers, from her bio, used only on
the About page and the 404. It is not a logo.

Custom lettering, if Mariana ever makes her own mark, replaces the Bodoni
wordmark entirely. Until then, don't draw fake handwriting.

## 3. Colour

### Tokens

| Token | Name | Hex | Role |
| --- | --- | --- | --- |
| `--noite` | Noite | `#0E0B0F` | The night room. Default background. |
| `--flash` | Flash | `#F6F3EE` | Text on Noite. The day sheet. The flash cut. |
| `--asfalto` | Asfalto | `#8A8386` | Metadata, inactive controls on Noite |
| `--asfalto-sheet` | Asfalto (sheet) | `#6B6468` | Same role on Flash |
| `--vdv` | Magenta VDV | `#98003B` | The one assertive fill: selected state, active series, the `i` tittle |
| `--rosa` | Rosa Banheiro | `#C27790` | Links, hover, annotation on Noite |
| `--rosa-sheet` | Rosa Banheiro (sheet) | `#A3446A` | Same role on Flash |
| `--taxi` | Amarelo Táxi | `#F2C200` | The date stamp on Noite. Nothing else. |
| `--taxi-sheet` | Amarelo Táxi (sheet) | `#7A5F00` | The date stamp on Flash |
| `--cobalto` | Cobalto Luz | `#6F8BFF` | Focus rings. Nothing else. |

Origins: Noite and Flash are chosen: a slightly warm black and a flash-burnt
off-white. Magenta VDV, Rosa Banheiro, and Asfalto are sampled directly
(`00-DISCOVERY.md` §4). Amarelo Táxi and Cobalto Luz are the sampled taxi and
sweater hues, lifted to work as screen colours.

### Contrast (WCAG 2.2, computed)

| Pair | Ratio | Use |
| --- | --- | --- |
| Flash on Noite | 17.68 | Body, captions |
| Asfalto on Noite | 5.28 | Small metadata ✓ AA |
| Asfalto sheet on Flash | 5.20 | Small metadata ✓ AA |
| Rosa on Noite | 5.90 | Links ✓ AA |
| Rosa sheet on Flash | 5.28 | Links ✓ AA |
| Amarelo Táxi on Noite | 11.64 | Date stamp ✓ |
| Táxi sheet on Flash | 5.48 | Date stamp ✓ AA |
| Cobalto Luz on Noite | 6.35 | Focus ring ✓ (needs ≥ 3) |
| Flash on Magenta VDV | 7.91 | Text on selected fill ✓ |
| Magenta VDV on Noite | 2.23 | ✗ Never text or a lone indicator on Noite |

### Colour behaviour

- The photo owns colour. Chrome is Noite, Flash, and Asfalto. Magenta appears
  once per screen, at most.
- Selection is never colour alone. A selected series also gets an underline or a
  position marker.
- No gradients, no glows, no duotones applied to her photos.
- The surface follows the photo: a night photo sits on Noite, a day photo on
  Flash. Each photo carries a `light: 'night' | 'day'` field (`05-ARCHITECTURE.md` §3).

## 4. Typography

| Role | Face | Where |
| --- | --- | --- |
| Display | **Bodoni Moda** (variable, `opsz` 6–96) | Wordmark, the About page's single line, the 404 |
| Text | **Schibsted Grotesk** (variable, 400–900) | Captions, UI, body |
| Data | **DM Mono** (400, 500) | Date stamp, counter, EXIF-style details; on the diary, all UI text |

All three are on Google Fonts, loaded through `next/font` with `display: swap`
and Latin + Latin Extended subsets (Portuguese and Spanish diacritics).

Why this set: the Bodoni brings the glamour she dresses in, the Grotesk is plain
and newsy so captions read as spoken, and DM Mono is soft enough to feel like a
camera's LCD instead of a terminal.

### Scale (fluid, rem at a 16 px root)

| Token | Size | Use |
| --- | --- | --- |
| `--step-mark` | `clamp(1.25rem, 1rem + 1vw, 1.75rem)` | Wordmark in the header |
| `--step-display` | `clamp(3rem, 1.5rem + 7vw, 9rem)` | About line, 404 |
| `--step-caption` | `clamp(1rem, 0.9rem + 0.4vw, 1.25rem)` | Captions |
| `--step-body` | `1rem` | UI, body |
| `--step-data` | `0.75rem` | Date stamp, counter. The floor is `0.6875rem`, never smaller. |

### Type behaviour

- Captions keep their line breaks. Long captions (028) wrap to a comfortable
  measure of 60ch and never truncate on the photo page.
- DM Mono uses `font-variant-numeric: tabular-nums` so the counter doesn't jitter.
- No all-caps anywhere except inside her own captions.
- Text is selectable everywhere.
- On the diary, UI and captions are DM Mono at 11 px (the `--step-data`
  floor), line height 1.35, letter-spacing 0.04em, lowercase as written. Nothing
  goes below 11 px. Bodoni appears only in the wordmark and the footer's
  ASCII name. Schibsted Grotesk stays on the other pages.

## 5. Graphic language

### The date stamp

The disposable-camera date in the corner of the print, set in DM Mono in Amarelo
Táxi: `’23 12 31`, which is the capture or post date in the camera format
(two-digit year with an apostrophe). It sits bottom-right on the print, in the photo's
own space, as camera stamps did. It's one of the site's two constant markings.

### The frame counter

`07 / 66`, in DM Mono, Asfalto. It's the other constant marking. On film it was
the frame number. Here it's the position in the Pile.

### The print

On the home, each photo is a print: a hairline Flash border (1 px at 12%
opacity on Noite), no drop shadow, no rounded corners. It rests at a slight
rotation (−3° to +3°, fixed per photo and seeded from its id, so it never
reshuffles) and lies on top of the few prints under it.

### Hairlines, squares and the line build (the diary)

- A 0.5 px Flash hairline (`--d-hair`) is the diary's one line: dividers under
  rows, underlines, the progress track.
- Squares mark things: 10 px beside the name and in the hero, 7 px ending a
  label or riding a line. Flash or the text's own colour; the header's two
  mood squares are the one pair, a Noite one in a Flash hairline and a Flash
  one.
- A section opens with a **line build**: `label ——— label ■`. The line starts
  as a 3 px stub and grows to the full row with scroll, pushing the right
  label and its square to the edge.
- Where a square sits in the way of text, the text parts around it (the sobre
  list, the curtain's captions) rather than the square moving.

### Grain

One atmosphere layer: a static SVG noise at 4–6% opacity over Noite only. It
never animates and never sits on top of a photo.

### Rules

- One magenta element per screen (none on the diary).
- Nothing overlaps the photo except the date stamp. On the diary, the only
  exceptions are the hero's centre line and corner texts and the small frame
  numbers, all in `mix-blend-difference` so they stay readable on any photo.
- On the diary, dates are plain Flash text in the camera format (`’24 04 22`);
  Amarelo Táxi stays reserved for the date stamp printed on a photo.
- No icons, except a plain arrow in the prev/next controls and the Instagram link
  as text. No icon libraries in the chrome.
- No emoji in chrome.

## 6. Photo treatment

- **Never edit her photos.** No filters, grading, sharpening, or AI upscaling.
  Crop only when she asks.
- Preserve orientation as posted, including sideways frames (027). If it's
  sideways on Instagram, it's sideways here.
- The photo page never crops (`object-fit: contain`), and neither does the
  Pile. The contact sheet may crop to a uniform 4:5 thumbnail. The diary crops
  to fill its frames (hero columns, strip, seleção, índice, the curtain) and
  every cropped frame links to the uncropped photo page. Hover effects (the
  ripple) distort the image in motion but never recolour it.
- Alt text describes the image in plain pt-BR ("mariana de óculos rosa num
  corredor branco, foto de cima com flash"). It's written by us, reviewed by her,
  and never replaces the caption.

## 7. Applications

| Surface | Treatment |
| --- | --- |
| Favicon | `i.` monogram on Noite (SVG, plus a 180 px PNG touch icon) |
| Open Graph image | One photo she picks, full-bleed, with the date stamp and a small `anairam` bottom-left. Until she picks one: the name on Noite, set like the diary's chrome (header columns and squares, the magenta tittle, `anairam ——— mariana ■`, the count and the date stamp), one per photo page with its counter and stamp. Never a reference photo (`docs/tasks/TASK-og-and-seo.md`) |
| Instagram bio link | `anairam.com.br`, no link-tree, no UTM |
| Print (if ever) | Same rules: Noite border, date stamp, counter |
