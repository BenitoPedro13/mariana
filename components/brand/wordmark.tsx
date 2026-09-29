"use client";

import Link from "next/link";
import { animate, useReducedMotion, type AnimationPlaybackControls } from "motion/react";
import { useCallback, useEffect, useRef } from "react";

import { CUT_EVENT, isCutActive } from "@/lib/flash";
import { cn } from "@/lib/utils";

/*
 * The Reversal (docs/04-UX-AND-MOTION.md §3.2). The seven letters of anairam
 * travel to their mirrored index on a low arc and read mariana. The i at
 * index 3 is the hinge and never moves. Its tittle blinks Magenta VDV once.
 */

export const REVERSE_EVENT = "anairam:reverse";

const REST = "anairam".split("");
const TURNED = "mariana".split("");
const HINGE = 3;
const LETTER_S = 0.7;
const STAGGER_S = 0.045;
const HOLD_MS = 1200;
const EASE = [0.65, 0, 0.35, 1] as const;

export function Wordmark({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const letters = useRef<(HTMLSpanElement | null)[]>([]);
  const slots = useRef<(HTMLSpanElement | null)[]>([]);
  const tittle = useRef<HTMLSpanElement>(null);
  const controls = useRef<AnimationPlaybackControls[]>([]);
  const hold = useRef<number | undefined>(undefined);
  const running = useRef(false);
  const armed = useRef(true);

  /** Horizontal travel of each letter, keeping the hinge exactly in place. */
  const travel = useCallback(() => {
    const rest = letters.current.map((el) => el?.offsetLeft ?? 0);
    const slot = slots.current.map((el) => el?.offsetLeft ?? 0);
    const shift = rest[HINGE] - slot[HINGE];
    return rest.map((x, k) => slot[REST.length - 1 - k] + shift - x);
  }, []);

  // Letters travelling right pass over the hinge and letters travelling left
  // pass under it, so the word reads as turning around the i.
  const place = useCallback((k: number, p: number, dx: number) => {
    const el = letters.current[k];
    if (!el) return;
    const em = parseFloat(getComputedStyle(el).fontSize) || 24;
    const lift = Math.max(Math.abs(dx) * 0.1, em * 0.3) * (dx > 0 ? -1 : 1);
    el.style.transform =
      p === 0 ? "" : `translate(${p * dx}px, ${4 * lift * p * (1 - p)}px)`;
  }, []);

  const reset = useCallback(() => {
    controls.current.forEach((c) => c.stop());
    controls.current = [];
    window.clearTimeout(hold.current);
    running.current = false;
    REST.forEach((_, k) => place(k, 0, 0));
    if (tittle.current) tittle.current.style.opacity = "0";
  }, [place]);

  const sweep = useCallback(
    (from: 0 | 1, to: 0 | 1, dx: number[]) =>
      Promise.all(
        REST.map((_, k) => {
          if (k === HINGE) return Promise.resolve();
          const fromEdge = HINGE - Math.abs(k - HINGE);
          const c = animate(from, to, {
            duration: LETTER_S,
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

  const reverse = useCallback(async () => {
    if (running.current || isCutActive()) return;
    running.current = true;
    const dx = travel();

    if (tittle.current) {
      controls.current.push(
        animate(tittle.current, { opacity: [0, 1, 0] }, { duration: 0.32, delay: 0.26 }),
      );
    }
    await sweep(0, 1, dx);
    if (!running.current) return;
    await new Promise<void>((r) => {
      hold.current = window.setTimeout(r, HOLD_MS);
    });
    if (!running.current) return;
    await sweep(1, 0, dx);
    controls.current = [];
    running.current = false;
  }, [sweep, travel]);

  /** Reduced motion: the letters swap instantly, and swap back. */
  const swap = useCallback(
    (turned: boolean) => {
      const dx = travel();
      REST.forEach((_, k) => place(k, turned ? 1 : 0, dx[k]));
    },
    [place, travel],
  );

  useEffect(() => {
    const onReverse = () => {
      if (!reduced) void reverse();
    };
    window.addEventListener(REVERSE_EVENT, onReverse);
    window.addEventListener(CUT_EVENT, reset);
    return () => {
      window.removeEventListener(REVERSE_EVENT, onReverse);
      window.removeEventListener(CUT_EVENT, reset);
      reset();
    };
  }, [reduced, reverse, reset]);

  const turn = () => (reduced ? swap(true) : void reverse());
  const unturn = () => {
    if (reduced) swap(false);
  };

  return (
    <Link
      href="/"
      aria-label="Mariana, página inicial"
      className={cn(
        "relative inline-block font-display text-[length:clamp(1.25rem,1rem+1vw,1.75rem)] leading-none font-medium text-ink [font-variation-settings:'opsz'_96]",
        className,
      )}
      onPointerEnter={(e) => {
        if (e.pointerType !== "mouse" || !armed.current) return;
        armed.current = false;
        turn();
      }}
      onPointerLeave={() => {
        armed.current = true;
        unturn();
      }}
      onFocus={(e) => {
        if (e.currentTarget.matches(":focus-visible")) turn();
      }}
      onBlur={unturn}
    >
      <span aria-hidden="true" className="relative inline-block whitespace-nowrap">
        {REST.map((ch, k) => (
          <span
            key={k}
            ref={(el) => {
              letters.current[k] = el;
            }}
            className="relative inline-block will-change-transform"
          >
            {ch}
            {k === HINGE && (
              <span
                ref={tittle}
                className="absolute inset-0 text-mark opacity-0 [clip-path:inset(0_0_64%_0)]"
              >
                {ch}
              </span>
            )}
          </span>
        ))}
        {/* Measures where each letter lands when the word reads mariana. */}
        <span className="invisible absolute top-0 left-0 whitespace-nowrap">
          {TURNED.map((ch, j) => (
            <span
              key={j}
              ref={(el) => {
                slots.current[j] = el;
              }}
              className="inline-block"
            >
              {ch}
            </span>
          ))}
        </span>
      </span>
    </Link>
  );
}

/** `i.`: the collapsed header and the favicon. The tittle is the one magenta. */
export function Monogram({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Mariana, página inicial"
      className={cn(
        "relative inline-flex min-h-11 min-w-11 items-center font-display text-[1.75rem] leading-none font-medium text-ink [font-variation-settings:'opsz'_96]",
        className,
      )}
    >
      <span aria-hidden="true" className="relative inline-block">
        i
        <span className="absolute inset-0 text-mark [clip-path:inset(0_0_64%_0)]">i</span>
      </span>
      <span aria-hidden="true">.</span>
    </Link>
  );
}
