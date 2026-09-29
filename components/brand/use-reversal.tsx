"use client";

import { animate, useReducedMotion, type AnimationPlaybackControls } from "motion/react";
import { useCallback, useEffect, useRef } from "react";

import { CUT_EVENT, isCutActive } from "@/lib/flash";
import { cn } from "@/lib/utils";

/*
 * The Reversal (docs/04-UX-AND-MOTION.md §3.2) as a hook, so the same motion
 * runs on the 24 px header mark and on a wordmark set across the viewport.
 * The seven letters of anairam travel to their mirrored index and read
 * mariana. The i at index 3 is the hinge and never moves. Letters travelling
 * right pass over it, letters travelling left pass under it, so the word reads
 * as turning around the i. Its tittle blinks Magenta VDV once.
 */

export const REVERSE_EVENT = "anairam:reverse";

const REST = "anairam".split("");
const TURNED = "mariana".split("");
const HINGE = 3;
const LETTER_S = 0.7;
const STAGGER_S = 0.045;
const HOLD_MS = 1200;
const EASE = [0.65, 0, 0.35, 1] as const;

export function useReversal({
  listen = true,
  liftEm = 0.3,
}: {
  listen?: boolean;
  /** Minimum arc height in em. Scroll-driven words hold mid-flight, so they arc higher to clear the x-height. */
  liftEm?: number;
} = {}) {
  const reduced = useReducedMotion() ?? false;
  const letters = useRef<(HTMLSpanElement | null)[]>([]);
  const slots = useRef<(HTMLSpanElement | null)[]>([]);
  const tittle = useRef<HTMLSpanElement>(null);
  const controls = useRef<AnimationPlaybackControls[]>([]);
  const hold = useRef<number | undefined>(undefined);
  const running = useRef(false);

  /** Horizontal travel of each letter, keeping the hinge exactly in place. */
  const travel = useCallback(() => {
    const rest = letters.current.map((el) => el?.offsetLeft ?? 0);
    const slot = slots.current.map((el) => el?.offsetLeft ?? 0);
    const shift = rest[HINGE] - slot[HINGE];
    return rest.map((x, k) => slot[REST.length - 1 - k] + shift - x);
  }, []);

  const place = useCallback((k: number, p: number, dx: number) => {
    const el = letters.current[k];
    if (!el) return;
    const em = parseFloat(getComputedStyle(el).fontSize) || 24;
    const lift = Math.max(Math.abs(dx) * 0.1, em * liftEm) * (dx > 0 ? -1 : 1);
    el.style.transform =
      p === 0 ? "" : `translate(${p * dx}px, ${4 * lift * p * (1 - p)}px)`;
  }, [liftEm]);

  const reset = useCallback(() => {
    controls.current.forEach((c) => c.stop());
    controls.current = [];
    window.clearTimeout(hold.current);
    running.current = false;
    REST.forEach((_, k) => place(k, 0, 0));
    if (tittle.current) tittle.current.style.opacity = "0";
  }, [place]);

  const sweep = useCallback(
    (from: 0 | 1, to: 0 | 1, dx: number[], duration = LETTER_S) =>
      Promise.all(
        REST.map((_, k) => {
          if (k === HINGE) return Promise.resolve();
          const fromEdge = HINGE - Math.abs(k - HINGE);
          const c = animate(from, to, {
            duration,
            delay: fromEdge * STAGGER_S,
            ease: EASE,
            onUpdate: (p) => place(k, p, dx[k]),
          });
          controls.current.push(c);
          return c.finished;
        }),
      ),
    [place],
  );

  const blink = useCallback((delay: number) => {
    if (!tittle.current) return;
    controls.current.push(
      animate(tittle.current, { opacity: [0, 1, 0] }, { duration: 0.32, delay }),
    );
  }, []);

  /** Turn once and come back. */
  const reverse = useCallback(
    async ({ duration = LETTER_S, holdMs = HOLD_MS } = {}) => {
      if (running.current || isCutActive() || reduced) return;
      running.current = true;
      const dx = travel();
      blink(duration * 0.37);
      await sweep(0, 1, dx, duration);
      if (!running.current) return;
      await new Promise<void>((r) => {
        hold.current = window.setTimeout(r, holdMs);
      });
      if (!running.current) return;
      await sweep(1, 0, dx, duration);
      controls.current = [];
      running.current = false;
    },
    [blink, reduced, sweep, travel],
  );

  /** Reduced motion: the letters swap instantly, and swap back. */
  const swap = useCallback(
    (turned: boolean) => {
      const dx = travel();
      REST.forEach((_, k) => place(k, turned ? 1 : 0, dx[k]));
    },
    [place, travel],
  );

  /**
   * Scroll-driven: p 0 → 1 turns the word. Outer letters lead, as in the
   * timed version. Reduced motion snaps at the halfway point.
   */
  const scrub = useCallback(
    (p: number) => {
      const dx = travel();
      const span = 1 + STAGGER_S * 2 * 6;
      REST.forEach((_, k) => {
        if (k === HINGE) return;
        const fromEdge = HINGE - Math.abs(k - HINGE);
        const local = Math.min(1, Math.max(0, p * span - fromEdge * STAGGER_S * 6));
        const eased = reduced ? (local >= 0.5 ? 1 : 0) : EASE_IN_OUT(local);
        place(k, eased, dx[k]);
      });
      if (tittle.current) {
        tittle.current.style.opacity = String(reduced ? 0 : Math.max(0, 1 - Math.abs(p - 0.45) * 8));
      }
    },
    [place, reduced, travel],
  );

  useEffect(() => {
    if (!listen) return;
    const onReverse = () => void reverse();
    window.addEventListener(REVERSE_EVENT, onReverse);
    window.addEventListener(CUT_EVENT, reset);
    return () => {
      window.removeEventListener(REVERSE_EVENT, onReverse);
      window.removeEventListener(CUT_EVENT, reset);
      reset();
    };
  }, [listen, reverse, reset]);

  return { letters, slots, tittle, reverse, reset, swap, scrub, reduced };
}

function EASE_IN_OUT(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

type ReversalRefs = Pick<ReturnType<typeof useReversal>, "letters" | "slots" | "tittle">;

/** The seven letters plus the invisible `mariana` the travel is measured from. */
export function ReversalWord({
  r,
  className,
  letterClassName,
  tittleVisible = false,
}: {
  r: ReversalRefs;
  className?: string;
  letterClassName?: string;
  /** Keep the magenta tittle on at rest (the monogram, the giant mark). */
  tittleVisible?: boolean;
}) {
  return (
    <span aria-hidden="true" className={cn("relative inline-block whitespace-nowrap", className)}>
      {REST.map((ch, k) => (
        <span
          key={k}
          ref={(el) => {
            r.letters.current[k] = el;
          }}
          className={cn("relative inline-block will-change-transform", letterClassName)}
        >
          {ch}
          {k === HINGE && (
            <>
              {tittleVisible && (
                <span className="absolute inset-0 text-mark [clip-path:inset(0_0_64%_0)]">{ch}</span>
              )}
              <span
                ref={r.tittle}
                className="absolute inset-0 text-mark opacity-0 [clip-path:inset(0_0_64%_0)]"
              >
                {ch}
              </span>
            </>
          )}
        </span>
      ))}
      <span className="invisible absolute top-0 left-0 whitespace-nowrap">
        {TURNED.map((ch, j) => (
          <span
            key={j}
            ref={(el) => {
              r.slots.current[j] = el;
            }}
            className={cn("inline-block", letterClassName)}
          >
            {ch}
          </span>
        ))}
      </span>
    </span>
  );
}
