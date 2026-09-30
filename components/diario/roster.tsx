"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { LineBuild, travelProgress } from "@/components/diario/line-build";
import type { Light, Photo } from "@/content/types";
import { formatStamp, pad2 } from "@/lib/print";
import { cn } from "@/lib/utils";

/*
 * S5 · Fotos, the roster list. A sticky stage (100vh, pinned for PIN_VH):
 *
 * - The intro: `fotos ——— o diário ■` (the one line that builds during the
 *   pin), a sub-label, `noite / dia`, the switch, and the count.
 * - The switch builds once on entry: the square sits below-left, travels
 *   right under the word while its underline grows, then rises to the text.
 *   The two options start 90 ms apart. The active one is Rosa.
 * - The list sits 40vh from the top. Rows: number · her caption (verbatim,
 *   cut visually with an ellipsis, whole in the DOM) · date, hairline under
 *   each. A list taller than the stage rises through it during the pin.
 * - Hover or keyboard focus on a row: Rosa with the glow, and a 260 × 360
 *   preview follows the pointer (x + 24 px, lerp 0.16), 20 px from every
 *   edge, never below the section. Focused by keyboard, it sits by the row.
 *
 * Phones: no pin, no preview; the switch and the rows work the same.
 */

const PIN_VH = 110;
const PREVIEW = { w: 260, h: 360 };
const EDGE = 20;
const LERP = 0.16;

type Counts = { night: number; day: number };

export function Roster({ photos, counts }: { photos: Photo[]; counts: Counts }) {
  const [light, setLight] = useState<Light>("night");
  const section = useRef<HTMLElement>(null);
  const list = useRef<HTMLOListElement>(null);
  const sw = useRef<HTMLDivElement>(null);

  const numbered = photos.map((p, i) => ({ p, n: i + 1 }));
  const rows = numbered.filter(({ p }) => p.light === light);

  // Pin: the line builds over the first 40 %, and a long list rises through the rest.
  useEffect(() => {
    const sec = section.current;
    if (!sec) return;
    const pinned = window.matchMedia("(min-width: 768px)");
    let raf = 0;
    const update = () => {
      raf = 0;
      const row = sec.querySelector<HTMLElement>('[data-line="fotos"]');
      const ol = list.current;
      if (!pinned.matches) {
        if (row) row.style.setProperty("--p", String(travelProgress(row, 80, 45)));
        if (ol) ol.style.transform = "";
        return;
      }
      const pinPx = (PIN_VH / 100) * window.innerHeight;
      const q = Math.min(1, Math.max(0, -sec.getBoundingClientRect().top / pinPx));
      if (row) row.style.setProperty("--p", String(Math.min(1, q / 0.4)));
      if (ol) {
        const room = window.innerHeight - ol.offsetTop - 24;
        const over = Math.max(0, ol.scrollHeight - room);
        const k = Math.min(1, Math.max(0, (q - 0.35) / 0.65));
        ol.style.transform = `translate3d(0, ${-over * k}px, 0)`;
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
  }, [light]);

  // The switch builds once, when it first comes into view. Without JS it's already built.
  useEffect(() => {
    const el = sw.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.85) return;
    el.setAttribute("data-armed", "");
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        el.setAttribute("data-built", "");
        io.disconnect();
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const years = photos.map((p) => p.date.slice(0, 4)).sort();
  const n = light === "night" ? counts.night : counts.day;

  return (
    <section
      ref={section}
      id="fotos"
      aria-labelledby="d-fotos"
      className="relative"
    >
      <div className="bg-noite md:sticky md:top-0 md:h-svh md:overflow-hidden">
        <div className="px-[var(--d-gutter)] pt-[50px] md:pt-[76px]">
          <div className="grid grid-cols-4 max-md:grid-cols-1">
            <div className="col-span-2 md:pr-[var(--d-gutter)]">
              <LineBuild id="fotos" left="fotos" right="o diário" headingLevel={2} headingId="d-fotos" />
            </div>
          </div>
          <div className="mt-1 grid grid-cols-4 items-start gap-y-5 max-md:grid-cols-2">
            <p className="text-flash/60">legendas dela</p>
            <p className="max-md:text-right">noite / dia</p>
            <div ref={sw} className="d-switch flex gap-8" role="group" aria-label="mostrar">
              {(["night", "day"] as const).map((l, i) => (
                <button
                  key={l}
                  type="button"
                  aria-pressed={light === l}
                  aria-controls="d-fotos-list"
                  onClick={() => setLight(l)}
                  className={cn(
                    "d-glow relative -my-3.5 inline-flex min-h-11 items-center pr-[15px]",
                    light === l && "text-link",
                  )}
                  style={{ ["--d-delay" as string]: `${i * 90}ms` }}
                >
                  <span className="relative">
                    {l === "night" ? "noite" : "dia"}
                    <span aria-hidden="true" className="d-switch-line absolute inset-x-0 -bottom-[3px] block h-[var(--d-hair)] bg-current" />
                    <span aria-hidden="true" className="d-switch-sq absolute block size-[7px] bg-current" />
                  </span>
                </button>
              ))}
            </div>
            <p className="text-right text-flash/60 max-md:col-span-2 max-md:text-left" aria-live="polite">
              <span className="tabular-nums text-flash">{pad2(n)}</span> {light === "night" ? "de noite" : "de dia"} ·{" "}
              {years[0]} — {years.at(-1)}
            </p>
          </div>
        </div>

        <ol
          ref={list}
          id="d-fotos-list"
          className="px-[var(--d-gutter)] will-change-transform max-md:mt-10 md:absolute md:inset-x-0 md:top-[40svh]"
        >
          {rows.map(({ p, n }) => (
            <li key={p.slug}>
              <Link
                href={`/foto/${p.slug}`}
                data-slug={p.slug}
                className="d-glow d-row grid h-12 grid-cols-[60px_1fr_190px] items-center gap-4 border-b-[length:var(--d-hair)] border-flash/25 outline-offset-[-2px] max-lg:h-10 max-md:grid-cols-[36px_1fr_72px]"
              >
                <span className="text-flash/60 tabular-nums">
                  {pad2(n)}
                  <span className="sr-only">. </span>
                </span>
                {p.caption ? (
                  <span lang={p.captionLang && p.captionLang !== "pt-BR" ? p.captionLang : undefined} className="truncate">
                    {p.caption}
                  </span>
                ) : (
                  <span className="truncate text-flash/60">sem legenda · {p.alt}</span>
                )}
                <span className="text-right tabular-nums">
                  <span className="sr-only">, </span>
                  <time dateTime={p.date}>{formatStamp(p.date)}</time>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
      {/* The pin's extra scroll, desktop only. */}
      <div aria-hidden="true" className="max-md:hidden" style={{ height: `${PIN_VH}svh` }} />
      <Preview section={section} list={list} photos={photos} />
    </section>
  );
}

/** The 260 × 360 print that follows the pointer over the rows. Fine pointers only. */
function Preview({
  section,
  list,
  photos,
}: {
  section: React.RefObject<HTMLElement | null>;
  list: React.RefObject<HTMLOListElement | null>;
  photos: Photo[];
}) {
  const box = useRef<HTMLDivElement>(null);
  // The prints load once the list is near, not with the page.
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const sec = section.current;
    if (!sec || !window.matchMedia("(pointer: fine) and (min-width: 768px)").matches) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        setArmed(true);
        io.disconnect();
      },
      { rootMargin: "100% 0px" },
    );
    io.observe(sec);
    return () => io.disconnect();
  }, [section]);

  useEffect(() => {
    const el = box.current;
    const sec = section.current;
    const ol = list.current;
    if (!el || !sec || !ol) return;
    if (!window.matchMedia("(pointer: fine) and (min-width: 768px)").matches) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pos = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    let shown: string | null = null;
    let raf = 0;

    const clamp = (x: number, y: number) => {
      const bottom = Math.min(window.innerHeight, sec.getBoundingClientRect().bottom);
      return {
        x: Math.min(window.innerWidth - PREVIEW.w - EDGE, Math.max(EDGE, x)),
        y: Math.min(bottom - PREVIEW.h - EDGE, Math.max(EDGE, y)),
      };
    };
    const paint = () => {
      el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
    };
    const loop = () => {
      raf = 0;
      const t = clamp(target.x, target.y);
      pos.x += (t.x - pos.x) * LERP;
      pos.y += (t.y - pos.y) * LERP;
      paint();
      if (shown && (Math.abs(t.x - pos.x) > 0.3 || Math.abs(t.y - pos.y) > 0.3)) raf = requestAnimationFrame(loop);
    };
    const kick = () => {
      if (reduced) {
        const t = clamp(target.x, target.y);
        pos.x = t.x;
        pos.y = t.y;
        paint();
      } else if (!raf) raf = requestAnimationFrame(loop);
    };
    const show = (slug: string, snap: boolean) => {
      if (shown !== slug) {
        el.querySelectorAll<HTMLElement>("[data-preview]").forEach((img) => {
          img.style.visibility = img.dataset.preview === slug ? "visible" : "hidden";
        });
      }
      if (!shown || snap) {
        const t = clamp(target.x, target.y);
        pos.x = t.x;
        pos.y = t.y;
        paint();
      }
      if (!shown) el.setAttribute("data-open", "");
      shown = slug;
      kick();
    };
    const hide = () => {
      shown = null;
      el.removeAttribute("data-open");
    };

    const move = (e: PointerEvent) => {
      target.x = e.clientX + 24;
      target.y = e.clientY - PREVIEW.h / 2;
      const row = (e.target as Element).closest<HTMLElement>("[data-slug]");
      if (row?.dataset.slug) show(row.dataset.slug, false);
      else if (shown) kick();
    };
    const focus = (e: FocusEvent) => {
      const row = (e.target as Element).closest<HTMLElement>("[data-slug]");
      if (!row?.dataset.slug || !row.matches(":focus-visible")) return;
      const r = row.getBoundingClientRect();
      target.x = window.innerWidth * 0.62;
      target.y = r.top + r.height / 2 - PREVIEW.h / 2;
      show(row.dataset.slug, true);
    };
    const blur = (e: FocusEvent) => {
      if (!ol.contains(e.relatedTarget as Node | null)) hide();
    };
    const scrolled = () => {
      if (shown) kick();
    };

    ol.addEventListener("pointermove", move);
    ol.addEventListener("pointerleave", hide);
    ol.addEventListener("focusin", focus);
    ol.addEventListener("focusout", blur);
    window.addEventListener("scroll", scrolled, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      ol.removeEventListener("pointermove", move);
      ol.removeEventListener("pointerleave", hide);
      ol.removeEventListener("focusin", focus);
      ol.removeEventListener("focusout", blur);
      window.removeEventListener("scroll", scrolled);
    };
  }, [section, list]);

  return (
    <div
      ref={box}
      aria-hidden="true"
      className="d-preview pointer-events-none fixed top-0 left-0 z-30 max-md:hidden"
      style={{ width: PREVIEW.w, height: PREVIEW.h }}
    >
      {armed &&
        photos.map((p) => (
          <div key={p.slug} data-preview={p.slug} className="invisible absolute inset-0">
            <Image src={p.image} alt="" fill sizes="260px" loading="eager" className="object-cover object-top" />
          </div>
        ))}
    </div>
  );
}
