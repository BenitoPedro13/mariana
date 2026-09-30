"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

import { LineBuild, travelProgress } from "@/components/diario/line-build";
import { useSmoothScroll } from "@/components/diario/smooth-scroll";
import type { Photo } from "@/content/types";
import { pad2 } from "@/lib/print";

/*
 * S3 · Sobre and S4 · Destaques share one sticky stage (100vh, pinned for
 * A + 70vh of scroll).
 *
 * - Entering: `sobre ——— anairam ■` builds as its row travels 65vh → 36vh.
 * - Pinned, first A px: the list under the paragraph rises through a 7 px
 *   square that stays put (half speed, TRAVEL px), and each line parts
 *   around it as it passes (open within OPEN px, 20 px clear each side).
 *   The rest of the block holds still.
 * - Pinned, next 70vh: `destaques ——— fotos ■` builds. The two lines never
 *   open together.
 * - The strip along the bottom: 20vw frames, 50vh tall, each cropped from
 *   the bottom to its own height, drifting left (one loop = 150 s) and
 *   draggable. Hovering a frame opens its crop (650 ms).
 * - When the stage first pins, the page holds for 1 s (smooth scroll only).
 *
 * Phones: no pin, the blocks stack, and the strip drifts and drags.
 */

const SCROLL_A = 248; // px of pinned scroll for the list
const TRAVEL = 124; // px the list rises through the square
const LINE_B_VH = 70;
const HEIGHTS = [45, 30, 50, 38, 45, 50, 40, 30, 40, 50]; // vh of the 50vh strip
const LOOP_S = 150;
const SPLIT_AT = 42; // px into a line where it parts
const GAP = 47; // 20 clear + 7 square + 20 clear
const OPEN = 40; // px from the square where a line starts to part

type Counts = { all: number; night: number; day: number };

export function AboutStrip({
  photos,
  counts,
  years,
}: {
  photos: Photo[];
  counts: Counts;
  years: [string, string];
}) {
  const scroll = useSmoothScroll();
  const section = useRef<HTMLElement>(null);
  const list = useRef<HTMLOListElement>(null);
  const obstacle = useRef<HTMLSpanElement>(null);
  const lines = useRef<(HTMLLIElement | null)[]>([]);
  const held = useRef(false);

  // Scroll choreography (≥ 768 px; phones read it as a plain column).
  useEffect(() => {
    const sec = section.current;
    if (!sec) return;
    const pinned = window.matchMedia("(min-width: 768px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;

    const update = () => {
      raf = 0;
      const sobreRow = sec.querySelector<HTMLElement>('[data-line="sobre"]');
      const destaquesRow = sec.querySelector<HTMLElement>('[data-line="destaques"]');
      if (sobreRow) sobreRow.style.setProperty("--p", String(travelProgress(sobreRow, 65, 36)));

      if (!pinned.matches) {
        if (destaquesRow) destaquesRow.style.setProperty("--p", String(travelProgress(destaquesRow, 80, 45)));
        return;
      }

      const s = -sec.getBoundingClientRect().top; // px scrolled into the pin
      const a = (Math.min(SCROLL_A, Math.max(0, s)) / SCROLL_A) * TRAVEL;
      if (list.current) list.current.style.transform = `translate3d(0, ${-a}px, 0)`;

      // Lines part around the square as they pass it.
      const sq = obstacle.current?.getBoundingClientRect();
      if (sq) {
        const sy = sq.top + sq.height / 2;
        lines.current.forEach((li) => {
          if (!li) return;
          const b = li.getBoundingClientRect();
          const dy = Math.abs(b.top + b.height / 2 - sy);
          const k = reduced ? 0 : smooth(OPEN, 10, dy);
          li.style.setProperty("--open", String(k));
        });
      }

      const b = (s - SCROLL_A) / ((LINE_B_VH / 100) * window.innerHeight);
      if (destaquesRow) destaquesRow.style.setProperty("--p", String(Math.min(1, Math.max(0, b))));

      // Hold for one real second the first time the stage pins.
      if (!held.current && s > 0 && s < 200 && !reduced) {
        held.current = true;
        scroll.stop();
        window.setTimeout(scroll.start, 1000);
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
  }, [scroll]);

  const services = ["noite", "dia", "as legendas são dela"];
  const meta = [
    ["diário", "fotos", pad2(counts.all)],
    [years[0], "noite", pad2(counts.night)],
    [years[1], "dia", pad2(counts.day)],
  ];

  return (
    <section
      ref={section}
      id="sobre"
      aria-labelledby="d-sobre"
      className="relative md:h-[calc(170svh+248px)]"
    >
      <div className="bg-noite md:sticky md:top-0 md:h-svh md:overflow-hidden">
        {/* S3 · sobre */}
        <div className="relative z-20 px-[var(--d-gutter)] pt-[50px] md:absolute md:inset-x-0 md:top-0 md:pt-[76px]">
          <div data-hero-stop>
            <LineBuild id="sobre" left="sobre" right="anairam" headingLevel={2} headingId="d-sobre" />
          </div>

          <div className="mt-1 grid grid-cols-4 gap-y-8 max-md:grid-cols-1 max-md:mt-6">
            <p className="max-w-[250px] self-start">
              um diário
              <br />
              feito com
              <br />o flash ligado.
            </p>

            <div className="col-start-3 max-w-[470px] self-start max-md:col-start-1">
              <p>
                fotos de perto, com flash, entre {years[0]} e {years[1]}. noite e dia, na ordem em que
                aconteceram. as legendas são dela, do jeito que ela escreveu.
              </p>

              {/* The obstacle: stays put while the list rises past it. */}
              <span ref={obstacle} aria-hidden="true" className="mt-[91px] ml-[62px] block size-[7px] bg-flash max-md:hidden" />

              <ol ref={list} className="mt-[30px] flex flex-col will-change-transform max-md:mt-6">
                {services.map((s, i) => (
                  <li
                    key={s}
                    ref={(el) => {
                      lines.current[i] = el;
                    }}
                    className="relative [--open:0]"
                  >
                    {/* Left of the split, readable for everyone. */}
                    <span className="block" style={{ clipPath: `inset(0 calc(100% - ${SPLIT_AT}px) 0 0)` }}>
                      <span className="text-flash/60">{pad2(i + 1)}</span>&nbsp;&nbsp;{s}
                    </span>
                    {/* Right of the split: the same line, pushed clear of the square. */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 block"
                      style={{
                        clipPath: `inset(0 0 0 ${SPLIT_AT}px)`,
                        transform: `translateX(calc(var(--open) * ${GAP}px))`,
                      }}
                    >
                      <span className="text-flash/60">{pad2(i + 1)}</span>&nbsp;&nbsp;{s}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <dl className="col-start-4 grid self-start grid-cols-3 gap-x-4 justify-self-end text-right max-md:col-start-1 max-md:justify-self-start max-md:text-left">
              {meta.flat().map((m, i) => (
                <dd key={i} className={i % 3 === 2 ? "tabular-nums" : "text-flash/60"}>
                  {m}
                </dd>
              ))}
            </dl>
          </div>
        </div>

        {/* S4 · destaques */}
        <div className="z-20 px-[var(--d-gutter)] max-md:mt-16 max-md:mb-4 md:absolute md:inset-x-0 md:bottom-[calc(50svh+50px)]">
          <LineBuild id="destaques" left="destaques" right="fotos" />
        </div>
        <Strip photos={photos} />
      </div>
    </section>
  );
}

function smooth(edge0: number, edge1: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

/** The featured strip: an endless, draggable row of ragged-bottom frames. */
function Strip({ photos }: { photos: Photo[] }) {
  const gallery = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const g = gallery.current;
    const t = track.current;
    if (!g || !t) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let offset = 0;
    let last = 0;
    let raf = 0;
    let visible = false;
    let drag: { x: number; start: number; moved: boolean; id: number } | null = null;
    let suppressClick = false;

    const half = () => t.scrollWidth / 2;
    const paint = () => {
      const h = half();
      offset = ((offset % h) + h) % h;
      t.style.transform = `translate3d(${-offset}px, 0, 0)`;
    };
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
      last = now;
      if (!drag && !reduced) offset += (half() / LOOP_S) * dt;
      paint();
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !raf) {
        last = 0;
        raf = requestAnimationFrame(loop);
      } else if (!visible && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    });
    io.observe(g);

    const down = (e: PointerEvent) => {
      if (e.button !== 0) return;
      drag = { x: e.clientX, start: offset, moved: false, id: e.pointerId };
    };
    const move = (e: PointerEvent) => {
      if (!drag || e.pointerId !== drag.id) return;
      const dx = e.clientX - drag.x;
      if (!drag.moved && Math.abs(dx) > (e.pointerType === "touch" ? 4 : 3)) {
        drag.moved = true;
        g.setPointerCapture(e.pointerId);
      }
      if (drag.moved) {
        offset = drag.start - dx;
        paint();
      }
    };
    const up = () => {
      if (drag?.moved) suppressClick = true;
      drag = null;
    };
    const click = (e: MouseEvent) => {
      if (!suppressClick) return;
      e.preventDefault();
      e.stopPropagation();
      suppressClick = false;
    };
    g.addEventListener("pointerdown", down);
    g.addEventListener("pointermove", move);
    g.addEventListener("pointerup", up);
    g.addEventListener("pointercancel", up);
    g.addEventListener("click", click, true);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      g.removeEventListener("pointerdown", down);
      g.removeEventListener("pointermove", move);
      g.removeEventListener("pointerup", up);
      g.removeEventListener("pointercancel", up);
      g.removeEventListener("click", click, true);
    };
  }, []);

  const items = [...photos, ...photos];
  return (
    <div
      ref={gallery}
      role="region"
      aria-label="fotos em destaque"
      className="relative z-10 h-[50svh] touch-pan-y overflow-hidden select-none md:absolute md:inset-x-0 md:bottom-0 max-md:h-[62svh]"
    >
      <div ref={track} className="absolute bottom-0 left-0 flex h-full w-max items-end will-change-transform">
        {items.map((p, i) => {
          const clone = i >= photos.length;
          const n = i % photos.length;
          const h = HEIGHTS[n % HEIGHTS.length];
          return (
            <Link
              key={`${p.slug}-${i}`}
              href={`/foto/${p.slug}`}
              draggable={false}
              aria-hidden={clone || undefined}
              tabIndex={clone ? -1 : undefined}
              aria-label={clone ? undefined : `abrir foto ${n + 1}: ${p.alt}`}
              className="group relative block h-full w-[20vw] shrink-0 max-md:w-[46vw]"
              style={{ ["--cb" as string]: `${((50 - h) / 50) * 100}%` }}
            >
              <span className="d-strip-media absolute inset-0 block overflow-hidden">
                <Image
                  src={p.image}
                  alt=""
                  fill
                  sizes="(max-width: 767px) 46vw, 20vw"
                  draggable={false}
                  className="pointer-events-none object-cover object-top"
                />
              </span>
              <span
                aria-hidden="true"
                className="absolute left-2 text-[10px] text-flash mix-blend-difference"
                style={{ top: `calc(${(h / 50) * 100}% - 18px)` }}
              >
                {pad2(n + 1)}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
