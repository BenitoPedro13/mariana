"use client";

import { useEffect, type RefObject } from "react";

/**
 * The name feels the pointer: each letter of the Bodoni gains weight and
 * loses contrast as the pointer comes near (wght 400 → 900, opsz 96 → 12),
 * and relaxes when it leaves. The `mariana` measuring letters get the same
 * axes as the letter that will land on them, so the Reversal still measures
 * true while the word is heavy.
 */
export function usePressure(
  letters: RefObject<(HTMLSpanElement | null)[]>,
  slots: RefObject<(HTMLSpanElement | null)[]>,
  { enabled = true, radius = 0.22 }: { enabled?: boolean; radius?: number } = {},
) {
  useEffect(() => {
    if (!enabled || !window.matchMedia("(pointer: fine)").matches) return;
    const n = 7;
    const weight = new Array(n).fill(0);
    const target = new Array(n).fill(0);
    let raf = 0;
    let px = -9999;
    let py = -9999;

    const apply = () => {
      let moving = false;
      for (let k = 0; k < n; k++) {
        const el = letters.current?.[k];
        if (!el) continue;
        const b = el.getBoundingClientRect();
        const cx = b.left + b.width / 2;
        const cy = b.top + b.height / 2;
        const reach = window.innerWidth * radius;
        const d = Math.hypot(px - cx, py - cy);
        target[k] = Math.max(0, 1 - d / reach) ** 1.6;
        weight[k] += (target[k] - weight[k]) * 0.14;
        if (Math.abs(target[k] - weight[k]) > 0.002) moving = true;
        const v = `'wght' ${Math.round(400 + weight[k] * 500)}, 'opsz' ${Math.round(96 - weight[k] * 84)}`;
        el.style.fontVariationSettings = v;
        const slot = slots.current?.[n - 1 - k];
        if (slot) slot.style.fontVariationSettings = v;
      }
      raf = moving ? requestAnimationFrame(apply) : 0;
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onMove = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
      kick();
    };
    const onLeave = () => {
      px = -9999;
      py = -9999;
      kick();
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, letters, slots, radius]);
}
