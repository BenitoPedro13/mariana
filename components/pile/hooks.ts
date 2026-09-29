"use client";

import { useEffect, useRef, type RefObject } from "react";

import { REVERSE_EVENT } from "@/components/brand/wordmark";
import type { Light } from "@/content/photos";
import { develop, flash, settleFlash } from "@/lib/flash";

type Steps = {
  next: () => void;
  prev: () => void;
  first: () => void;
  last: () => void;
};

/** One key = one print (docs/04-UX-AND-MOTION.md §2, Input). */
export function usePileKeys(steps: Steps) {
  const ref = useRef(steps);
  useEffect(() => {
    ref.current = steps;
  });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return;
      const t = e.target as HTMLElement | null;
      if (t?.closest("input, textarea, select, [contenteditable]")) return;
      // Space and Enter keep their own meaning on buttons and links, except
      // Space on the print itself, which advances.
      const onControl = t?.closest("button, a") && !t.closest("[data-print]");
      const s = ref.current;
      let run: (() => void) | undefined;
      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
        case "j":
        case "J":
          run = s.next;
          break;
        case "ArrowLeft":
        case "ArrowUp":
        case "k":
        case "K":
          run = s.prev;
          break;
        case " ":
          if (!onControl) run = e.shiftKey ? s.prev : s.next;
          break;
        case "Home":
          run = s.first;
          break;
        case "End":
          run = s.last;
          break;
      }
      if (!run) return;
      e.preventDefault();
      run();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
}

/** One wheel notch: accumulated delta ≥ 40 px, then a 600 ms lock. */
export function useWheelStep(
  target: RefObject<HTMLElement | null>,
  step: (dir: 1 | -1) => void,
) {
  const ref = useRef(step);
  useEffect(() => {
    ref.current = step;
  });

  useEffect(() => {
    const el = target.current;
    if (!el) return;
    let acc = 0;
    let lockedUntil = 0;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const now = performance.now();
      if (now < lockedUntil) return;
      acc += Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (Math.abs(acc) < 40) return;
      ref.current(acc > 0 ? 1 : -1);
      acc = 0;
      lockedUntil = now + 600;
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [target]);
}

/** The room follows the photo. A hard cut: the attribute flips, nothing fades. */
export function setSurface(light: Light) {
  document.body.dataset.surface = light;
}

export function useSurface(light: Light) {
  useEffect(() => {
    setSurface(light);
  }, [light]);
  useEffect(() => () => setSurface("night"), []);
}

// Module state survives client-side navigation and resets on a full load, so
// the first exposure never replays when you come back to the home. It also
// keeps a Strict Mode double effect from starting a second exposure.
let exposure: "idle" | "running" | "done" = "idle";

/**
 * The first exposure (docs/04-UX-AND-MOTION.md §3.1): Noite, one flash at
 * 200 ms, the first print develops, the Reversal at 900 ms. Any input skips
 * straight to the settled state.
 */
export function useFirstExposure(topPrint: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = document.documentElement;
    if (exposure === "running") return;
    if (exposure === "done" || !root.classList.contains("first-exposure")) {
      root.classList.remove("first-exposure");
      exposure = "done";
      return;
    }
    exposure = "running";

    const events = ["keydown", "pointerdown", "wheel"] as const;
    const finish = () => {
      exposure = "done";
      window.clearTimeout(reversal);
      events.forEach((ev) => window.removeEventListener(ev, skip));
    };
    const skip = () => {
      settleFlash();
      root.classList.remove("first-exposure");
      finish();
    };
    events.forEach((ev) => window.addEventListener(ev, skip, { passive: true }));

    flash({
      delay: 0.2,
      onPeak: () => {
        root.classList.remove("first-exposure");
        develop(topPrint.current);
      },
    });
    const reversal = window.setTimeout(() => {
      finish();
      window.dispatchEvent(new Event(REVERSE_EVENT));
    }, 900);
  }, [topPrint]);
}
