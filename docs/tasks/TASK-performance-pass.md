# TASK: performance pass on the diary home

## Scenario

The diary home is built (`TASK-offform-direction.md` §9). Measured against the
budgets in `docs/05-ARCHITECTURE.md` §7, in Chromium (production build, phone
390 × 844 at DPR 2, 150 ms latency, 9 Mbps down, CPU 4× slower):

| Metric | Budget | Before |
| --- | --- | --- |
| LCP | ≤ 2.0 s | 3.8–6.3 s (the intro ends ~3.8 s) |
| CLS | ≤ 0.02 | 0 |
| JS on `/` | ≤ 90 kB gzip | ~224 kB transferred |
| Fonts | ≤ 120 kB | 166 kB, all preloaded |
| Eager images | 3 | 3 hero photos (plus small lazy ones that sit in the first screen) |

## Causes

1. **The preloader's 1.5 s floor starts at hydration**, not at navigation. On a
   slow phone hydration lands ~2.2 s in, so the intro can't start before
   ~3.7 s even though the three photos were loaded at ~1.3 s.
2. **ogl ships to every visitor.** RippleDistortion (and ogl under it) is only
   ever mounted for fine pointers ≥ 768 px with motion allowed, but it's in the
   home's first-load JS for phones too.
3. **Every font subset is preloaded**, including Schibsted Grotesk, which the
   diary doesn't use, and each family's `latin-ext` files, which Portuguese,
   Spanish and English captions don't need up front.

## Planned changes

- `components/diario/hero.tsx`: count the floor from navigation start
  (`performance.now()` is already relative to it). Asset progress unchanged.
- `components/diario/ripple-image.tsx`: load RippleDistortion with a dynamic
  `import()` only once the ripple is going to mount.
- `app/layout.tsx`: preload only `latin` for each family (`latin-ext` stays
  available through `unicode-range`, fetched only if a caption needs it), and
  don't preload Schibsted at all (`preload: false`; the pages that use it still
  load it on first use).

## Not changing

- The preloader itself. It's the plan's S0 and the reason LCP can't meet 2.0 s:
  the photos are held back on purpose for ≥ 1.5 s. The budget in 05 §7 was set
  for the Pile. Recorded as a known trade-off.
- motion stays on the home: the Reversal and the flash use it.

## Affected files

`components/diario/hero.tsx`, `components/diario/ripple-image.tsx`,
`app/layout.tsx`, `docs/05-ARCHITECTURE.md` §7.

## Result

Same conditions, after:

| Metric | Budget | Before | After |
| --- | --- | --- | --- |
| Intro starts | none | ~3.8 s | ~2.9 s (right after hydration) |
| LCP (phone, 4G, 4× CPU) | ≤ 2.0 s | 3.8–6.3 s | ~4.0 s |
| LCP (desktop) | none | 3.6 s | 3.4 s |
| CLS | ≤ 0.02 | 0 | 0 |
| JS on `/`, phone | ≤ 90 kB | ~224 kB | ~205 kB (no ogl) |
| Fonts | ≤ 120 kB | 166 kB | 109 kB |

- The ripple still mounts on desktop (three canvases); phones get no canvas
  and no WebGL code in their JS.
- The `latin-ext` faces are still in the CSS through `unicode-range`, so an
  accented or unusual character in a caption still gets the right font.
- LCP stays over budget by design: the hero photos are clipped shut during
  the preloader, so Chrome counts the first paint of the corner text after the
  curtain. What the reader sees is the photos opening ~0.1 s after the intro
  starts. The JS is over budget because React, Next's runtime, motion (the
  Reversal and the flash) and Lenis are all on the home; the next cut would
  be motion's `animate` on the diary for plain Web Animations, which isn't
  worth the churn while the feel is still being judged.

## Content assumptions

None. No photo, caption or copy changes.
