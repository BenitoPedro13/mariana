"use client";

import { useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

import { usePileKeys } from "@/components/pile/hooks";
import { flash, markCut } from "@/lib/flash";
import { useFlashOn } from "@/lib/flash-preference";

/**
 * One cut between photos, shared by the lab directions: `index` moves on
 * input, `shown` moves while the screen is white (or at once without the
 * flash). `developing` says whether this cut should develop out of the white.
 */
export function useCut(total: number, { initial = 0, keys = true } = {}) {
  const reduced = useReducedMotion() ?? false;
  const flashOn = useFlashOn();
  const [index, setIndex] = useState(initial);
  const [shown, setShown] = useState(initial);
  const [dir, setDir] = useState<1 | -1>(1);
  const [developing, setDeveloping] = useState(false);
  const indexRef = useRef(initial);

  const go = useCallback(
    (target: number, d: 1 | -1) => {
      const t = ((target % total) + total) % total;
      if (t === indexRef.current) return;
      indexRef.current = t;
      setDir(d);
      setIndex(t);
      if (reduced || !flashOn) {
        markCut();
        setDeveloping(false);
        setShown(t);
        return;
      }
      flash({
        delay: 0.04,
        onPeak: (flashed) => {
          setDeveloping(flashed);
          setShown(indexRef.current);
        },
      });
    },
    [flashOn, reduced, total],
  );

  const next = useCallback(() => go(indexRef.current + 1, 1), [go]);
  const prev = useCallback(() => go(indexRef.current - 1, -1), [go]);
  const steps = { next, prev, first: () => go(0, -1), last: () => go(total - 1, 1) };
  usePileKeys(keys ? steps : { next: noop, prev: noop, first: noop, last: noop });

  return { index, shown, dir, developing, go, next, prev, reduced, flashOn, motionOn: !reduced && flashOn };
}

function noop() {}

/** Accumulated wheel notch → one step, then a lock (same rule as the Pile). */
export function useWheelNotch(step: (d: 1 | -1) => void, enabled = true) {
  const ref = useRef(step);
  useEffect(() => {
    ref.current = step;
  });
  useEffect(() => {
    if (!enabled) return;
    let acc = 0;
    let lockedUntil = 0;
    const onWheel = (e: WheelEvent) => {
      const now = performance.now();
      if (now < lockedUntil) return;
      acc += Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (Math.abs(acc) < 40) return;
      ref.current(acc > 0 ? 1 : -1);
      acc = 0;
      lockedUntil = now + 700;
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, [enabled]);
}
