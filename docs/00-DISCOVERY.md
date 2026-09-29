# 00 — Discovery

What the reference material shows, what it doesn't, and what we still need.
Everything in the later docs builds on this, so it separates what we saw
from what we assume.

## 1. Material in hand

| Item | Source | Notes |
| --- | --- | --- |
| 33 images, `anairamodarnoc_001…033.jpg` | Public grid of `@anairamodarnoc`, saved 2026-09-29 | Numbered newest first. Only the first slide of each carousel was saved. |
| `anairamodarnoc_grid.json` | Same session | Caption and link for each of the 33 |
| `anairamodarnoc_instagram_partial.json` | Same session | Profile header: 66 posts, bio `>:(` |
| `collect.js` | Written for this repo | Console script that collects all 66 posts, every carousel slide, full captions, and dates |

We have half the grid and no carousel interiors. Run `collect.js` before any
curation decision (see `reference/instagram/README.md`).

### The brief (from Benito, 2026-09-29)

- A personal site for her photography, made as a thank-you gift. She didn't ask for it.
- It should not try to impress anyone. It should just show her art.
- She is "fascinating, smart as fuck, and gracious, full of life."
- Deliverable: the brand book, visual identity, design system, and a feel of
  the site first. Then the real site.

## 2. The honest read

**Her Instagram is a diary, not a portfolio.** Almost every image is Mariana
herself, her friends, or a night out: mirror selfies, flash selfies, fisheye
shots at arm's length, group photos, photodumps. Very few frames are clearly
*her photographs of the world*, meaning shots where she is behind the camera
and not in front of it.

That changes the brief in two ways:

1. **The selfies are her photography.** Arm's-length flash, fisheye distortion,
   and tilted horizons are consistent choices across three years. That is a
   point of view, and the identity is built on it.
2. **The site can't be built from this material.** We need the photographs she
   considers her work. They may be on another account, her camera roll, or a
   hard drive. Until we have them, the Instagram is mood reference only (see §6).

## 3. What the photos show

### Light

- **Direct on-camera flash at night.** This is the strongest recurring trait (001, 003,
  011, 012, 022, 023, 029). Faces blown bright, backgrounds dropping to black,
  hard shadows, flare streaks.
- **Coloured club light.** Magenta and violet wash (005, 013, 021), a red glow
  behind a sequinned cross (006).
- **Flat daylight, Rio.** The street market, a yellow taxi, a trail above the
  city, graffiti walls (016, 025, 026, 029, 030).

### Framing

- Arm's-length and fisheye: the camera held by the subject (002, 003, 010).
- Tilted and sideways frames kept as they are (010, 014, 027).
- Full-body street portraits against a found wall: sandbags, posters, graffiti,
  a taxi (011, 020, 023, 029).
- Close, flash-lit food and objects (008).

### Places and objects

Rio streets, the feira, yellow taxis, favela hillsides seen from a trail, club
floors, a pink bathroom, a VDV stage with marquee-bulb letters, a Lula flag,
disco balls, sequins, fake fur, platform heels, a cat on a mountain.

### People

Mostly her. Often her friends, and one best friend by name in a long caption
(028). Any friend on the final site needs their own yes (CLAUDE.md §4).

## 4. Colour, sampled

Averaged from specific regions of the reference photos. These are the raw
samples. `02-VISUAL-IDENTITY.md` turns them into tokens.

| Sample | Photo | Hex |
| --- | --- | --- |
| VDV bed, magenta light | 005 | `#98003B` |
| Club floor, violet wash | 021 | `#330262` |
| Red glow behind the cross | 006 | `#D4153B` |
| Sequin cross, cobalt | 006 | `#431A5A` |
| Cobalt sweater | 007 | `#2E4AA7` |
| Bathroom stall pink | 019 | `#C27790` |
| Yellow taxi, flash-lit | 029 | `#937904` |
| Painted wall, grey | 002 | `#888084` |
| Coral eyeshadow | 033 | `#D58C6F` |

The pattern: **a near-black room, skin blown bright by flash, and one
saturated colour per frame**, usually magenta, cobalt, pink, or taxi yellow.

## 5. Voice, from her captions

Selected captions, verbatim:

- bio: `>:(`
- "o tédio é de uma felicidade primária demais / e é por isso que me é intolerável o paraíso"
- "é bafo né?!?!"
- "meus dois moods"
- "don't touch, it's art"
- "i hear you call my name and it feels like home"
- "why you so obssesed w/ me?"
- "todo el mundo mira pero a ella le da igual 💅🏻💚💖🫦🐅"
- "🌷ganhei uma flor do feirante, ele disse q eu merecia mesmo era um buquê 🌷"
- "…eu queria voltar no tempo e contar p mariana de 8 anos q esse dia ia acontecer mas acho q no fundo ela smp soube"

What these captions show:

- **Three languages in one feed**: Portuguese, English, Spanish. She uses lyrics and
  pop quotes as captions.
- **Literary one moment, "é bafo" the next.** The brief says "smart as fuck,"
  and the captions back it up. She quotes literature and then undercuts it.
- **Deadpan outside, warm inside.** The bio is a frown. The captions are full of
  hearts and thank-yous to friends.
- **Lowercase, abbreviated, emoji as punctuation.**
- **Two moods.** She names them herself.

## 6. Her name

The handle `anairamodarnoc` is **mariana conrado** written backwards. The display
name `anairam` is **mariana** backwards. She already made her own mark. We
develop it, we don't invent a new one.

`anairam` also has a hinge. Reverse its seven letters and the middle one, `i`,
stays in place:

```
a n a i r a m
m a r i a n a
      ↑ index 3 holds
```

Everything turns around that `i`. That becomes the signature (`01-BRAND-BOOK.md` §4).

## 7. Gaps and open questions

These must be answered before content decisions. None of them block the brand docs.

1. **Where is her photography?** A second account, camera roll, film scans? Which
   photos does *she* call hers? (Blocking for the site, not for the identity.)
2. **What does she shoot with?** Phone, point-and-shoot, film? If it's a flash
   compact, the date stamp is literal. If not, it's a nod.
3. Post 033 is credited "by @orestonaoimporta". At least some images are
   other people's photographs *of* her. Authorship needs checking per image.
4. Post 009 is a party flyer reposted from `@astral.producoes`. Is she involved
   in producing nights ("meu mundinho astral")? Don't assume it.
5. Is her surname for public use, or does she only want the reversed handle?
6. How does she want to be described, if at all? The About page stays at `>:(`
   until she writes something herself.
7. How does she feel about a site existing at all? The gift framing means asking
   before publishing, not after.
