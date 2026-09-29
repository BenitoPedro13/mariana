# TASK: Brand foundation — docs only

## 0. Status (2026-09-29): docs written, direction not yet reviewed

## 1. Current scenario

- A new, empty repository for a site Benito is making as a gift for Mariana.
- The only material is 33 of 66 images from her public Instagram, the grid
  captions, and her profile header (bio `>:(`).
- The brief comes from Benito: a personal site, photography, not trying to
  impress, and she is "fascinating, smart as fuck, gracious, full of life."
- Mariana hasn't been asked yet.

## 2. Planned changes

1. `CLAUDE.md`, adapted from ART'hur's guide: same way of working (source
   hierarchy, intensity contract, component sourcing, work sequence), with
   Mariana's own identity and a new consent and privacy section.
2. `docs/00-DISCOVERY.md`: what the photos and captions actually show, sampled
   colours, her name's hinge, and open questions.
3. `docs/01-BRAND-BOOK.md`: idea, essence, the Reversal, voice.
4. `docs/02-VISUAL-IDENTITY.md`: wordmark, palette with computed contrast, type,
   the date stamp, photo treatment.
5. `docs/03-DESIGN-SYSTEM.md`: tokens as CSS, motion tokens, intensity audit,
   component inventory, and library decisions.
6. `docs/04-UX-AND-MOTION.md`: IA, the Pile, three signature moments, and accessibility.
7. `docs/05-ARCHITECTURE.md`: stack, content model, image pipeline, privacy, phases.
8. `docs/reference/instagram/`: reference photos (gitignored), JSON, and a
   `collect.js` console script for the full profile.

## 3. Why

The user asked for the documents first and the site after. The docs also need
to hold up once her real photographs arrive, so they are built on traits that run
through all the material (direct flash, the reversed name, the two moods) rather
than on specific images.

## 4. Content assumptions (explicit)

- She is a photographer (from Benito). Her body of work is **not** in the
  Instagram sample. The site's content is still to come.
- She's based in Rio (inferred from the photos, unconfirmed).
- `anairamodarnoc` = Mariana Conrado reversed (inferred from the handle). Whether
  the surname can be shown is unconfirmed.
- Some reference images are by other photographers (033 is credited).

## 5. Affected files

`CLAUDE.md`, `.gitignore`, `docs/**`.

## 6. Next

1. Run `docs/reference/instagram/collect.js` for all 66 posts and carousels.
2. Benito reviews the direction. Adjust the docs.
3. Phase 1 feel prototype (`05-ARCHITECTURE.md` §8).
4. Ask Mariana, and gather her own photographs.
