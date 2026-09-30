"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useRef } from "react";

import type { Photo } from "@/content/types";
import { useMotionOk } from "@/lib/motion-preference";
import { formatStamp, pad2 } from "@/lib/print";

/*
 * S6 · Legendas, the photo curtain. One sticky stage; everything is driven
 * by how far the stage has been pinned (t, in vh):
 *
 *   0 ─ SPLIT          the big photo parts down the middle until SIDE px
 *                      of each half is left at the edges
 *   58 % of SPLIT ─    the small print (90 × 120) reveals top → bottom,
 *   SPLIT              landing as the split finishes
 *   + DELAY            nothing moves
 *   + 3 × BLOCK        three captions rise from the bottom; every line
 *                      parts around the print as it passes and closes
 *                      again above the label. Each block swaps the print
 *   + HOLD             nothing moves
 *   + CLOSE            the exact reverse: the print un-reveals bottom → top
 *                      over the first 42 %, and the halves close
 *
 * The photo drifts +45 px → 0 inside its frame on the way in and 0 → −45 px
 * on the way out, never while it's closing. The captions are hers, verbatim,
 * with her line breaks.
 *
 * Reduced motion and no JavaScript: the same content as a still column (the
 * photo, then each print with its caption).
 */

const SPLIT = 90;
const DELAY = 25;
const BLOCK = 100;
const HOLD = 30;
const CLOSE = 90;
const PINNED = SPLIT + DELAY + 3 * BLOCK + HOLD + CLOSE;
const REVEAL_AT = 0.58;
const PARALLAX = 45;
const UNIT = { w: 90, h: 120 };
const LINE = 15; // px, the captions' line height
const BANDS = 8; // lines per block, at most
const CLEAR = 20; // px between a parted line and the print
const OPEN = 26; // px above/below the print where a line starts to part

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - (-2 * x + 2) ** 3 / 2);
const side = (w: number) => (w >= 1024 ? 250 : w >= 768 ? 20 : 15);

export function Curtain({ cover, photos }: { cover: Photo; photos: Photo[] }) {
  const live = useMotionOk();
  return live ? <Live cover={cover} photos={photos} /> : <Still cover={cover} photos={photos} />;
}

function Title({ p }: { p: Photo }) {
  return (
    <span className="text-flash/60">
      <time dateTime={p.date}>{formatStamp(p.date)}</time> · {p.light === "night" ? "noite" : "dia"}
    </span>
  );
}

function Caption({ p }: { p: Photo }) {
  return (
    <span
      lang={p.captionLang && p.captionLang !== "pt-BR" ? p.captionLang : undefined}
      className="whitespace-pre-line"
    >
      {p.caption}
    </span>
  );
}

function Still({ cover, photos }: { cover: Photo; photos: Photo[] }) {
  return (
    <section id="legendas" aria-labelledby="d-legendas" className="relative bg-noite">
      <div className="relative h-svh">
        <Image src={cover.image} alt={cover.alt} fill sizes="100vw" className="object-cover" />
      </div>
      <div className="flex flex-col items-center gap-24 px-[var(--d-gutter)] py-32 text-center">
        <h2 id="d-legendas" tabIndex={-1} className="outline-none">
          legendas
        </h2>
        {photos.map((p) => (
          <article key={p.slug} className="flex max-w-[460px] flex-col items-center gap-5">
            <Link href={`/foto/${p.slug}`} className="relative block" style={{ width: UNIT.w, height: UNIT.h }}>
              <Image src={p.image} alt={p.alt} fill sizes="90px" className="object-cover" />
            </Link>
            <p className="flex flex-col gap-1" style={{ lineHeight: `${LINE}px` }}>
              <Title p={p} />
              <Caption p={p} />
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Live({ cover, photos }: { cover: Photo; photos: Photo[] }) {
  const section = useRef<HTMLElement>(null);
  const halves = useRef<(HTMLDivElement | null)[]>([]);
  const inner = useRef<(HTMLDivElement | null)[]>([]);
  const unit = useRef<HTMLDivElement>(null);
  const reveal = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const blocks = useRef<(HTMLElement | null)[]>([]);
  const bands = useRef<(HTMLSpanElement | null)[][]>([]);

  useEffect(() => {
    const sec = section.current;
    if (!sec) return;
    let raf = 0;
    let shown = -1;

    const update = () => {
      raf = 0;
      const vh = window.innerHeight / 100;
      const vw = window.innerWidth;
      const top = sec.getBoundingClientRect().top;
      const t = -top / vh; // vh pinned
      if (t < -110 || t > PINNED + 110) return;

      // The halves part, then close.
      const closeAt = PINNED - CLOSE;
      const o = t < closeAt ? ease(clamp01(t / SPLIT)) : 1 - ease(clamp01((t - closeAt) / CLOSE));
      const d = o * Math.max(0, vw / 2 - side(vw));
      if (halves.current[0]) halves.current[0].style.transform = `translate3d(${-d}px, 0, 0)`;
      if (halves.current[1]) halves.current[1].style.transform = `translate3d(${d}px, 0, 0)`;

      // Inside the frame: in from +45, out to −45, still while closing.
      const y = t < 0 ? PARALLAX * clamp01(-t / 100) : t > PINNED ? -PARALLAX * clamp01((t - PINNED) / 100) : 0;
      inner.current.forEach((el) => el && (el.style.transform = `translate3d(0, ${y}px, 0)`));

      // The print: in over the split's last 42 %, out over the close's first 42 %.
      const span = SPLIT * (1 - REVEAL_AT);
      const r = t < closeAt ? clamp01((t - SPLIT * REVEAL_AT) / span) : 1 - clamp01((t - closeAt) / span);
      if (reveal.current) reveal.current.style.clipPath = `inset(0 0 ${(1 - r) * 100}% 0)`;
      if (unit.current) unit.current.style.visibility = r > 0 ? "visible" : "hidden";

      // Which caption the print belongs to: a hard cut, like the shutter.
      const start = SPLIT + DELAY;
      const active = Math.min(photos.length - 1, Math.max(0, Math.floor((t - start) / BLOCK)));
      if (active !== shown) {
        shown = active;
        reveal.current?.querySelectorAll<HTMLElement>("[data-print]").forEach((el, i) => {
          el.style.visibility = i === active ? "" : "hidden"; // the active one inherits the unit's
        });
        if (counter.current) counter.current.textContent = `${pad2(active + 1)} / ${pad2(photos.length)}`;
      }

      // The captions rise through the print, parting around it line by line.
      const u = unit.current?.getBoundingClientRect();
      const shift = UNIT.w / 2 + CLEAR;
      blocks.current.forEach((b, i) => {
        if (!b) return;
        const h = b.offsetHeight;
        const k = clamp01((t - start - i * BLOCK) / BLOCK);
        const by = window.innerHeight * (1 - k) - h * k;
        b.style.transform = `translate3d(0, ${by}px, 0)`;
        if (!u) return;
        for (let line = 0; line < BANDS; line++) {
          const cy = by + line * LINE + LINE / 2;
          const dist = Math.max(u.top - cy, cy - u.bottom, 0);
          const open = 1 - clamp01((dist - 4) / OPEN);
          const [l, rr] = [bands.current[i]?.[line * 2], bands.current[i]?.[line * 2 + 1]];
          const s = open * open * (3 - 2 * open) * shift;
          if (l) l.style.transform = `translate3d(${-s}px, 0, 0)`;
          if (rr) rr.style.transform = `translate3d(${s}px, 0, 0)`;
        }
      });
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
  }, [photos]);

  const text = (p: Photo) => (
    <span className="flex flex-col gap-0" style={{ lineHeight: `${LINE}px` }}>
      <Title p={p} />
      <Caption p={p} />
    </span>
  );

  return (
    <section
      ref={section}
      id="legendas"
      aria-labelledby="d-legendas"
      className="relative"
      style={{ height: `${100 + PINNED}svh` }}
    >
      <div className="sticky top-0 h-svh overflow-hidden bg-noite">
        <h2 id="d-legendas" tabIndex={-1} className="sr-only">
          legendas
        </h2>
        {/* The big photo, as two halves of one image. */}
        {[0, 1].map((half) => (
          <div
            key={half}
            ref={(el) => {
              halves.current[half] = el;
            }}
            className="absolute inset-y-0 w-1/2 overflow-hidden will-change-transform"
            style={{ left: half ? "50%" : 0 }}
          >
            <div
              ref={(el) => {
                inner.current[half] = el;
              }}
              className="absolute -inset-y-[45px] w-[100vw]"
              style={{ left: half ? "-50vw" : 0 }}
            >
              <Image
                src={cover.image}
                alt={half ? "" : cover.alt}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </div>
        ))}

        {/* The unit: label, print, counter. It never moves. */}
        <div
          ref={unit}
          className="invisible absolute top-1/2 left-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2.5"
        >
          <span aria-hidden="true">legendas</span>
          <div ref={reveal} className="relative" style={{ width: UNIT.w, height: UNIT.h, clipPath: "inset(0 0 100% 0)" }}>
            {photos.map((p, i) => (
              <Link
                key={p.slug}
                href={`/foto/${p.slug}`}
                data-print
                className="absolute inset-0 block"
                style={{ visibility: i ? "hidden" : undefined }}
              >
                <Image src={p.image} alt={p.alt} fill sizes="90px" className="object-cover" />
              </Link>
            ))}
          </div>
          <span ref={counter} aria-hidden="true" className="text-flash/60 tabular-nums">
            {pad2(1)} / {pad2(photos.length)}
          </span>
        </div>

        {/* The captions. One readable copy; the parted lines are its image. */}
        {photos.map((p, i) => (
          <article
            key={p.slug}
            ref={(el) => {
              blocks.current[i] = el;
            }}
            className="absolute inset-x-0 top-0 z-20 mx-auto w-[min(460px,calc(100vw-2*var(--d-gutter)-130px))] text-center will-change-transform"
            style={{ transform: "translate3d(0, 100vh, 0)" }}
          >
            <p className="opacity-0">{text(p)}</p>
            <span aria-hidden="true">
              {Array.from({ length: BANDS }, (_, line) => (
                <Fragment key={line}>
                  {[0, 1].map((half) => (
                    <span
                      key={half}
                      ref={(el) => {
                        (bands.current[i] ??= [])[line * 2 + half] = el;
                      }}
                      className="absolute inset-0 block"
                      style={{
                        clipPath: `inset(${line * LINE}px ${half ? 0 : "50%"} calc(100% - ${(line + 1) * LINE}px) ${half ? "50%" : 0})`,
                      }}
                    >
                      {text(p)}
                    </span>
                  ))}
                </Fragment>
              ))}
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}
