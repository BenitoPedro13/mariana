"use client";

import { animate } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { LineBuild, travelProgress } from "@/components/diario/line-build";
import { Square } from "@/components/diario/marks";
import type { Photo } from "@/content/types";
import { useMotionOk } from "@/lib/motion-preference";
import { formatStamp, pad2 } from "@/lib/print";

/*
 * S7 · Seleção, a timed run of five photos. A sticky stage (100vh, pinned
 * for PIN_VH):
 *
 * - `seleção ——— 05 fotos ■` builds over the first 40 % of the pin.
 * - Right, from 34 % to the edge: the frame, 68vh tall, bottom-aligned. It
 *   comes in 150 px low and parks as the stage sticks.
 * - Left: the photo's number, her caption, its date and light, the
 *   controls, `ver foto`, and the progress `01 ■──── 05` (the square rides
 *   the line).
 * - Timed: hold 2300 ms, the curtain rises 950 ms, the next photo opens
 *   950 ms top → bottom. It runs only while the stage is stuck (in view on
 *   phones), pauses on hover or focus and with `pausar`, and goes back to
 *   the first photo once the section is fully off-screen.
 *
 * Reduced motion: never runs by itself; `anterior` / `próxima` cut straight
 * to the photo. Phones: no pin, the frame 45vh above the text.
 */

const PIN_VH = 115;
const HOLD = 2300;
const CURTAIN = 0.95;
const MANUAL = 0.5;
const EASE = [0.76, 0, 0.24, 1] as const;
const LOW = 150;

export function Gallery({ photos, numbers }: { photos: Photo[]; numbers: number[] }) {
  const motionOk = useMotionOk();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const section = useRef<HTMLElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const frameMove = useRef<HTMLDivElement>(null);
  const stack = useRef<HTMLDivElement>(null);
  const at = useRef(0);
  const busy = useRef(false);
  const flags = useRef({ stuck: false, hover: false, paused: false });
  const timer = useRef(0);
  const syncRef = useRef<() => void>(() => {});

  // Show photo n: curtain up, swap, curtain down. Hard cut with reduced motion.
  const go = useRef(async (n: number, speed = CURTAIN) => {
    const el = frame.current;
    if (!el || busy.current) return;
    const next = (n + photos.length) % photos.length;
    if (next === at.current) return;
    busy.current = true;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduced) await animate(el, { clipPath: ["inset(0 0 0% 0)", "inset(0 0 100% 0)"] }, { duration: speed, ease: EASE });
    stack.current?.querySelectorAll<HTMLElement>("[data-shot]").forEach((s, i) => {
      s.style.visibility = i === next ? "visible" : "hidden";
    });
    at.current = next;
    setIndex(next);
    if (!reduced) await animate(el, { clipPath: ["inset(0 0 100% 0)", "inset(0 0 0% 0)"] }, { duration: speed, ease: EASE });
    busy.current = false;
    syncRef.current();
  });

  // The timer: armed while stuck, not hovered, not paused, motion allowed.
  useEffect(() => {
    const sync = () => {
      window.clearTimeout(timer.current);
      const { stuck, hover, paused } = flags.current;
      if (!motionOk || !stuck || hover || paused || busy.current) return;
      timer.current = window.setTimeout(() => go.current(at.current + 1), HOLD);
    };
    syncRef.current = sync;
    sync();
    return () => window.clearTimeout(timer.current);
  }, [motionOk]);

  // Pin, line, the frame parking, and when the timer may run.
  useEffect(() => {
    const sec = section.current;
    if (!sec) return;
    const pinned = window.matchMedia("(min-width: 768px)");
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = sec.getBoundingClientRect();
      const vh = window.innerHeight;
      const row = sec.querySelector<HTMLElement>('[data-line="selecao"]');
      let stuck: boolean;
      if (pinned.matches) {
        const q = Math.min(1, Math.max(0, -r.top / ((PIN_VH / 100) * vh)));
        if (row) row.style.setProperty("--p", String(Math.min(1, q / 0.4)));
        const low = LOW * Math.min(1, Math.max(0, r.top / vh));
        if (frameMove.current) frameMove.current.style.transform = `translate3d(0, ${low}px, 0)`;
        stuck = r.top <= 1 && r.bottom >= vh - 1;
      } else {
        if (row) row.style.setProperty("--p", String(travelProgress(row, 80, 45)));
        if (frameMove.current) frameMove.current.style.transform = "";
        const f = frame.current?.getBoundingClientRect();
        stuck = !!f && f.top >= 0 && f.bottom <= vh;
      }
      // Fully off-screen: back to the first photo, quietly.
      if (r.bottom < 0 || r.top > vh) {
        if (at.current !== 0 && !busy.current) {
          stack.current?.querySelectorAll<HTMLElement>("[data-shot]").forEach((s, i) => {
            s.style.visibility = i === 0 ? "visible" : "hidden";
          });
          at.current = 0;
          setIndex(0);
        }
      }
      if (stuck !== flags.current.stuck) {
        flags.current.stuck = stuck;
        syncRef.current();
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

  const hold = () => {
    flags.current.hover = true;
    syncRef.current();
  };
  const release = () => {
    flags.current.hover = false;
    syncRef.current();
  };
  const togglePause = () => {
    flags.current.paused = !paused;
    setPaused(!paused);
    syncRef.current();
  };

  const p = photos[index];
  const years = photos.map((x) => x.date.slice(0, 4)).sort();
  const nights = photos.filter((x) => x.light === "night").length;
  const auto = motionOk;

  return (
    <section
      ref={section}
      id="selecao"
      aria-labelledby="d-selecao"
      aria-roledescription="galeria"
      className="relative"
    >
      <div className="bg-noite md:sticky md:top-0 md:h-svh md:overflow-hidden">
        {/* Header */}
        <div className="px-[var(--d-gutter)] pt-[50px] md:pt-[76px]">
          <div className="grid grid-cols-4 max-md:grid-cols-1">
            <div className="col-span-2 md:pr-[var(--d-gutter)]">
              <LineBuild id="selecao" left="seleção" right={`${pad2(photos.length)} fotos`} headingLevel={2} headingId="d-selecao" />
            </div>
          </div>
          <div className="mt-1 grid grid-cols-4 items-start gap-y-4 max-md:grid-cols-2">
            <p className="text-flash/60">
              uma de cada vez
            </p>
            <p className="max-md:hidden">noite / dia</p>
            <p className="max-w-[330px] max-md:col-span-2">
              cinco fotos, uma de cada vez.
            </p>
            <dl className="grid grid-cols-[auto_auto] justify-end gap-x-4 text-right max-md:col-span-2 max-md:justify-start max-md:text-left">
              <dt className="text-flash/60">anos</dt>
              <dd>
                {years[0]} — {years.at(-1)}
              </dd>
              <dt className="text-flash/60">noite</dt>
              <dd className="tabular-nums">{pad2(nights)}</dd>
              <dt className="text-flash/60">dia</dt>
              <dd className="tabular-nums">{pad2(photos.length - nights)}</dd>
            </dl>
          </div>
        </div>

        {/* The frame */}
        <div
          ref={frameMove}
          className="mt-10 px-[var(--d-gutter)] will-change-transform md:absolute md:right-[var(--d-gutter)] md:bottom-6 md:left-[34%] md:mt-0 md:p-0"
          onPointerEnter={hold}
          onPointerLeave={release}
          onFocus={hold}
          onBlur={release}
        >
          <div ref={frame} className="relative h-[45svh] md:h-[68svh]">
            <div ref={stack} className="absolute inset-0">
              {photos.map((x, i) => (
                <Link
                  key={x.slug}
                  href={`/foto/${x.slug}`}
                  data-shot
                  tabIndex={i === index ? undefined : -1}
                  aria-hidden={i === index ? undefined : true}
                  className="absolute inset-0 block"
                  style={{ visibility: i === 0 ? "visible" : "hidden" }}
                >
                  <Image
                    src={x.image}
                    alt={x.alt}
                    fill
                    sizes="(max-width: 767px) 100vw, 66vw"
                    className="object-cover object-[50%_30%]"
                  />
                </Link>
              ))}
            </div>
            <span aria-hidden="true" className="absolute bottom-2 left-2 text-[10px] mix-blend-difference">
              {pad2(numbers[index])}
            </span>
          </div>
        </div>

        {/* The info column */}
        <div className="flex flex-col justify-between px-[var(--d-gutter)] max-md:mt-6 max-md:gap-8 max-md:pb-16 md:absolute md:bottom-6 md:left-0 md:h-[68svh] md:w-[32%] md:pr-0">
          <div className="flex flex-col gap-5" aria-live={paused || !auto ? "polite" : "off"}>
            <p className="flex items-center gap-2">
              <Square size={7} />
              foto {pad2(numbers[index])}
            </p>
            <p
              lang={p.captionLang && p.captionLang !== "pt-BR" ? p.captionLang : undefined}
              className="line-clamp-4 max-w-[330px] whitespace-pre-line"
            >
              {p.caption}
            </p>
            <p className="text-flash/60">
              <time dateTime={p.date}>{formatStamp(p.date)}</time>
              <br />
              {p.light === "night" ? "noite" : "dia"}
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex gap-6" role="group" aria-label="controles da seleção">
              <button type="button" className="d-glow -my-3.5 min-h-11" onClick={() => go.current(at.current - 1, MANUAL)}>
                anterior
              </button>
              {auto && (
                <button type="button" className="d-glow -my-3.5 min-h-11" aria-pressed={paused} onClick={togglePause}>
                  {paused ? "continuar" : "pausar"}
                </button>
              )}
              <button type="button" className="d-glow -my-3.5 min-h-11" onClick={() => go.current(at.current + 1, MANUAL)}>
                próxima
              </button>
            </div>
            <Link href={`/foto/${p.slug}`} className="d-glow group flex w-[200px] items-center gap-2">
              ver foto
              <span aria-hidden="true" className="h-[var(--d-hair)] flex-1 bg-current" />
              <Square size={7} className="bg-current" />
            </Link>
            <div className="flex items-center gap-2 tabular-nums" aria-hidden="true">
              <span>{pad2(1)}</span>
              <span className="relative h-[var(--d-hair)] flex-1 bg-flash/40">
                <span
                  className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 transition-[left] duration-[950ms] ease-[cubic-bezier(0.76,0,0.24,1)] motion-reduce:transition-none"
                  style={{ left: `${(index / (photos.length - 1)) * 100}%` }}
                >
                  <Square size={7} />
                </span>
              </span>
              <span>{pad2(photos.length)}</span>
            </div>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="max-md:hidden" style={{ height: `${PIN_VH}svh` }} />
    </section>
  );
}
