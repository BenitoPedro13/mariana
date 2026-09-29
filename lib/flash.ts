import { animate, type AnimationPlaybackControls } from "motion";

/*
 * The flash layer and its safety rules (docs/04-UX-AND-MOTION.md §5):
 * - at most one flash per cut, and flashes at least 334 ms apart (≤ 3/s)
 * - brightness capped at --flash-peak (0.85), always neutral Flash
 * - the caller decides reduced motion and the "desligar flash" preference
 *
 * It also tells the Reversal a cut is running, so the two signature motions
 * never share a moment.
 */

const FLASH_IN = 0.06;
const FLASH_DEVELOP = 0.52;
const DEVELOP_EASE = [0.2, 0.7, 0.1, 1] as const;
const MIN_GAP_MS = 334;
const PEAK = 0.85;

export const CUT_EVENT = "anairam:cut";

let layer: HTMLElement | null = null;
let lastFlashAt = -Infinity;
let running: AnimationPlaybackControls | null = null;
let cutActiveUntil = 0;

export function registerFlashLayer(el: HTMLElement | null) {
  layer = el;
}

export function isCutActive() {
  return performance.now() < cutActiveUntil;
}

function announceCut(durationMs: number) {
  cutActiveUntil = Math.max(cutActiveUntil, performance.now() + durationMs);
  window.dispatchEvent(new Event(CUT_EVENT));
}

type FlashOptions = {
  /** Runs while the screen is white: swap surface, caption, counter. */
  onPeak: (flashed: boolean) => void;
  /** Delay before the white-out rises, so the throw is seen to start. */
  delay?: number;
};

/**
 * Fires one flash if allowed by the rate limit. Returns false (and runs
 * onPeak immediately) when the flash is skipped.
 */
export function flash({ onPeak, delay = 0 }: FlashOptions) {
  const now = performance.now();
  if (!layer || now - lastFlashAt < MIN_GAP_MS) {
    announceCut(400);
    onPeak(false);
    return false;
  }

  lastFlashAt = now + delay * 1000;
  performance.mark("anairam:flash");
  announceCut((delay + FLASH_IN + FLASH_DEVELOP) * 1000);
  running?.stop();

  const el = layer;
  const rise = animate(
    el,
    { opacity: [0, PEAK] },
    { duration: FLASH_IN, delay, ease: "linear" },
  );
  running = rise;
  rise.finished.then(() => {
    // A newer flash took over: its own peak will swap the photo.
    if (running !== rise) return;
    onPeak(true);
    running = animate(
      el,
      { opacity: [PEAK, 0] },
      { duration: FLASH_DEVELOP, ease: DEVELOP_EASE },
    );
  });
  return true;
}

/** A cut with no flash (reduced motion, flash off). Still stops the Reversal. */
export function markCut() {
  announceCut(400);
}

/** The new print develops out of the white: overexposed to true. */
export function develop(el: HTMLElement | null) {
  if (!el) return;
  animate(
    el,
    { filter: ["brightness(1.9) saturate(0.7)", "brightness(1) saturate(1)"] },
    { duration: FLASH_DEVELOP, ease: DEVELOP_EASE },
  ).finished.then(() => {
    el.style.filter = "";
  });
}

/** Ends any running flash at once (first exposure skipped by input). */
export function settleFlash() {
  running?.stop();
  running = null;
  if (layer) layer.style.opacity = "0";
}
