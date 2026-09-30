"use client";

import { animate } from "motion/react";
import Link from "next/link";
import { useCallback, useEffect, useRef } from "react";

import { REVERSE_EVENT } from "@/components/brand/use-reversal";
import { INTRO_DONE_EVENT } from "@/components/diario/header";
import { Hair, Square } from "@/components/diario/marks";
import { useSmoothScroll } from "@/components/diario/smooth-scroll";
import { RippleImage } from "@/components/diario/ripple-image";
import type { Photo } from "@/content/types";
import { flash } from "@/lib/flash";
import { useFlashOn } from "@/lib/flash-preference";
import { formatStamp, pad2 } from "@/lib/print";

/*
 * S0 · Preloader and S2 · Hero, one element.
 *
 * The preloader is the hero's centre line in its loading state: `NN%` · a
 * hairline growing · a square riding its tip, exactly where the line will
 * sit. Progress is min(images loaded, time), with a 1.5 s floor and a 6 s
 * safety, and the number eases toward it. At 100 % the room opens with one
 * flash (a 220 ms fade when the flash is off), then the three photos
 * curtain in top → bottom (650 ms, 80/160/240 ms), the ticks come in 40 ms
 * apart, the corners rise 8 px, and the header and the name follow.
 *
 * Scrolling away, the three columns leave at different speeds (0, 0.12,
 * 0.24 of the scroll) and the centre line holds at mid-screen until its
 * labels are 80 px above the next section's first row.
 */

const EASE = [0.76, 0, 0.24, 1] as const;
const FLOOR_MS = 1500;
const SAFETY_MS = 6000;
const LAG = [0, 0.12, 0.24];
const TICKS = [1, 2, 4, 5, 7, 8].map((n) => n / 9);

type Counts = { night: number; day: number; all: number };

export function DiarioHero({ photos, counts }: { photos: Photo[]; counts: Counts }) {
  const flashOn = useFlashOn();
  const scroll = useSmoothScroll();
  const section = useRef<HTMLElement>(null);
  const cols = useRef<(HTMLDivElement | null)[]>([]);
  const row = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const tip = useRef<HTMLSpanElement>(null);
  const line = useRef<HTMLSpanElement>(null);
  const ticks = useRef<HTMLDivElement>(null);
  const corners = useRef<(HTMLDivElement | null)[]>([]);
  const loaded = useRef(0);

  const onPhotoLoad = useCallback(() => {
    loaded.current += 1;
  }, []);

  // S0 → S2
  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains("diario-loading")) return;
    scroll.stop();
    window.scrollTo(0, 0);

    const t0 = performance.now();
    let shown = 0;
    let raf = 0;
    const total = photos.length;

    const paint = (p: number) => {
      const w = track.current?.clientWidth ?? 0;
      if (counter.current) counter.current.textContent = `${Math.round(p * 100)}%`;
      if (line.current) line.current.style.transform = `scaleX(${p})`;
      if (tip.current) tip.current.style.transform = `translateX(${p * w}px)`;
    };

    const intro = () => {
      // Hold the clip inline, drop the class, then open each column.
      cols.current.forEach((c) => c && (c.style.clipPath = "inset(0 0 100% 0)"));
      root.classList.remove("diario-loading");
      if (line.current) line.current.style.transform = "";
      if (tip.current) tip.current.style.transform = "";
      cols.current.forEach((c, i) => {
        if (!c) return;
        animate(c, { clipPath: ["inset(0 0 100% 0)", "inset(0 0 0% 0)"] }, { duration: 0.65, delay: 0.08 * (i + 1), ease: EASE });
      });
      const tickEls = Array.from(ticks.current?.children ?? []) as HTMLElement[];
      tickEls.forEach((t, i) => {
        t.style.opacity = "0";
        animate(t, { opacity: [0, 1] }, { duration: 0.3, delay: 0.9 + i * 0.04 });
      });
      corners.current.forEach((c) => {
        if (!c) return;
        c.style.opacity = "0";
        animate(c, { opacity: [0, 1] }, { duration: 0.32, delay: 0.95 });
        animate(c, { y: [8, 0] }, { duration: 0.42, delay: 0.95, ease: EASE });
      });
      window.setTimeout(() => {
        window.dispatchEvent(new Event(INTRO_DONE_EVENT));
        window.dispatchEvent(new Event(REVERSE_EVENT));
        scroll.start();
      }, 1250);
    };

    const tick = () => {
      const elapsed = performance.now() - t0;
      const byTime = Math.min(1, elapsed / FLOOR_MS);
      const byAssets = elapsed > SAFETY_MS ? 1 : loaded.current / total;
      const target = Math.min(byTime, byAssets);
      shown += (target - shown) * 0.12;
      if (target === 1 && shown > 0.995) shown = 1;
      paint(shown);
      if (shown < 1) {
        raf = requestAnimationFrame(tick);
        return;
      }
      if (flashOn) flash({ onPeak: intro });
      else intro();
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // Runs once per full load; the handlers read refs.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Scroll: the columns lag at their own rates, and the centre line holds.
  useEffect(() => {
    let raf = 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const h = section.current?.offsetHeight ?? window.innerHeight;
      if (y > h * 1.2) return;
      cols.current.forEach((c, i) => {
        const inner = c?.firstElementChild as HTMLElement | null;
        if (inner && !reduced) inner.style.transform = `translate3d(0, ${y * LAG[i]}px, 0)`;
      });
      const r = row.current;
      if (r) {
        const stop = document.querySelector<HTMLElement>("[data-hero-stop]");
        const labelsBottom = r.offsetTop + r.offsetHeight;
        const stopTop = stop ? stop.getBoundingClientRect().top + y : h;
        const hold = Math.max(0, stopTop - 80 - labelsBottom);
        r.style.transform = `translate3d(0, ${Math.min(y, hold)}px, 0)`;
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section ref={section} aria-label="abertura" className="relative h-svh min-h-[560px] text-flash">
      <h1 className="sr-only">Mariana, fotografia</h1>

      {/* Three photos, edge to edge. On phones they share one frame and take turns. */}
      <div className="absolute inset-0 grid grid-cols-3 max-md:grid-cols-1">
        {photos.map((p, i) => (
          <div
            key={p.slug}
            ref={(el) => {
              cols.current[i] = el;
            }}
            data-d-reveal
            className="relative overflow-hidden max-md:col-start-1 max-md:row-start-1 max-md:animate-[d-turns_9s_linear_infinite] max-md:[animation-delay:calc(var(--i)*-6s)]"
            style={{ ["--i" as string]: i }}
          >
            <Link href={`/foto/${p.slug}`} aria-label={`abrir foto: ${p.alt}`} className="block size-full will-change-transform">
              <RippleImage
                src={p.image}
                alt={p.alt}
                sizes="(max-width: 767px) 100vw, 34vw"
                placeholder="blur"
                preload
                onLoad={onPhotoLoad}
                widthHint={560}
              />
            </Link>
          </div>
        ))}
      </div>

      {/* The centre line: the preloader's row, then the hero's axis. */}
      <div
        ref={row}
        className="pointer-events-none absolute inset-x-[var(--d-gutter)] top-1/2 z-10 -translate-y-1/2 mix-blend-difference"
      >
        <div className="flex items-center gap-3">
          {/* 0% while loading (live), 100% after, and without JavaScript. */}
          <span className="w-9 tabular-nums">
            <span ref={counter} className="d-count-live">
              0%
            </span>
            <span className="d-count-done">100%</span>
          </span>
          <div ref={track} className="relative flex-1">
            <span ref={line} className="d-line block h-[var(--d-hair)] origin-left bg-flash" />
            {/* While loading, the square rides the line's tip; after, it ends the line. */}
            <span ref={tip} className="d-tip absolute top-1/2 -left-[5px] -translate-y-1/2">
              <Square />
            </span>
            {/* Ticks: two per photo, its date and its light. */}
            <div ref={ticks} aria-hidden="true" className="absolute inset-x-0 top-0 max-md:hidden" data-d-after-intro>
              {TICKS.map((at, i) => {
                const p = photos[Math.floor(i / 2)];
                const label = i % 2 === 0 ? formatStamp(p.date) : p.light === "night" ? "noite" : "dia";
                return (
                  <span key={i} className="absolute top-0 flex -translate-x-1/2 flex-col items-center gap-1.5" style={{ left: `${at * 100}%` }}>
                    <span className="block h-[5px] w-px bg-flash" />
                    <span className="text-[10px] whitespace-nowrap">{label}</span>
                  </span>
                );
              })}
            </div>
          </div>
          <Square className="d-end" />
        </div>
      </div>

      {/* Bottom left: what this is. */}
      <div
        ref={(el) => {
          corners.current[0] = el;
        }}
        data-d-after-intro
        className="absolute bottom-[22px] left-[var(--d-gutter)] z-10 w-[220px] mix-blend-difference"
      >
        <p>
          um diário
          <br />
          feito com
          <br />o flash ligado.
        </p>
      </div>

      {/* Bottom right: the two moods, and everything. */}
      <div
        ref={(el) => {
          corners.current[1] = el;
        }}
        data-d-after-intro
        className="absolute right-[var(--d-gutter)] bottom-[22px] z-10 flex w-[330px] flex-col gap-5 mix-blend-difference max-md:w-[calc(100%-2*var(--d-gutter)-230px)] max-sm:hidden"
      >
        <ol className="flex flex-col gap-1">
          {[
            ["01", "noite", counts.night],
            ["02", "dia", counts.day],
            ["03", "tudo", counts.all],
          ].map(([n, label, c]) => (
            <li key={n as string} className="grid grid-cols-[28px_1fr_auto]">
              <span className="text-flash/60">{n}</span>
              <span>{label}</span>
              <span className="tabular-nums">{pad2(c as number)}</span>
            </li>
          ))}
        </ol>
        <Link href="/tudo" className="d-glow group flex flex-col gap-1.5 py-1 pointer-events-auto">
          <span className="flex items-center justify-between">
            ver todas
            <Square />
          </span>
          <Hair className="origin-left transition-transform duration-300 group-hover:scale-x-100" />
        </Link>
      </div>
    </section>
  );
}
