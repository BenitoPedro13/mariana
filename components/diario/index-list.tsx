"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { LineBuild, travelProgress } from "@/components/diario/line-build";
import type { Photo } from "@/content/types";
import { pad2 } from "@/lib/print";
import { cn } from "@/lib/utils";

/*
 * S8 · Índice: the diary month by month. The list of photos is S5, so the
 * index is by month instead: each row is a month, its count, and it opens
 * that month's first photo.
 *
 * - `índice ——— por mês ■` builds as it rises (80vh → 45vh).
 * - Left (32 %, sticky on wide screens): a landscape crop of the active
 *   month's first photo, then `foto · luz · ano`.
 * - Right (66 %): 48 px rows (40 px ≤ 1024), 60 px number column,
 *   hairlines. Hover or focus swaps the left photo at once (all loaded) and
 *   turns the row Rosa. With a still pointer, the row under it stays active
 *   while the page scrolls.
 */

const MESES = [
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
];

type Month = { key: string; label: string; year: string; photos: { p: Photo; n: number }[] };

function byMonth(photos: Photo[]): Month[] {
  const map = new Map<string, Month>();
  photos.forEach((p, i) => {
    const key = p.date.slice(0, 7);
    const [y, m] = key.split("-");
    const month = map.get(key) ?? { key, label: MESES[Number(m) - 1], year: y, photos: [] };
    month.photos.push({ p, n: i + 1 });
    map.set(key, month);
  });
  // Newest first, like the diary.
  return [...map.values()].sort((a, b) => b.key.localeCompare(a.key));
}

export function IndexList({ photos }: { photos: Photo[] }) {
  const months = byMonth(photos);
  const [active, setActive] = useState(0);
  const section = useRef<HTMLElement>(null);
  const list = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const sec = section.current;
    const ol = list.current;
    if (!sec || !ol) return;
    const fine = window.matchMedia("(pointer: fine)");
    let raf = 0;
    let pointer: { x: number; y: number } | null = null;

    const update = () => {
      raf = 0;
      const row = sec.querySelector<HTMLElement>('[data-line="indice"]');
      if (row) row.style.setProperty("--p", String(travelProgress(row, 80, 45)));
      // A still pointer over the list: the row under it follows the scroll.
      if (pointer && fine.matches) {
        const hit = document.elementFromPoint(pointer.x, pointer.y)?.closest<HTMLElement>("[data-month]");
        if (hit && ol.contains(hit)) setActive(Number(hit.dataset.month));
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const move = (e: PointerEvent) => {
      pointer = { x: e.clientX, y: e.clientY };
      const hit = (e.target as Element).closest<HTMLElement>("[data-month]");
      if (hit) setActive(Number(hit.dataset.month));
    };
    const leave = () => {
      pointer = null;
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    ol.addEventListener("pointermove", move);
    ol.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      ol.removeEventListener("pointermove", move);
      ol.removeEventListener("pointerleave", leave);
    };
  }, []);

  const m = months[active];
  const first = m.photos[0];

  return (
    <section ref={section} id="indice" aria-labelledby="d-indice" className="relative bg-noite px-[var(--d-gutter)] pt-[120px] pb-[20svh]">
      <LineBuild id="indice" left="índice" right="por mês" headingLevel={2} headingId="d-indice" />
      <p className="mt-1 text-flash/60">o diário, mês a mês.</p>

      <div className="mt-16 grid grid-cols-[32%_1fr] gap-x-[2%] max-md:grid-cols-1 max-md:gap-y-10">
        {/* Left: the active month's first photo. */}
        <div className="md:sticky md:top-[96px] md:self-start">
          <Link href={`/foto/${first.p.slug}`} className="relative block aspect-[4/3] overflow-hidden" tabIndex={-1} aria-hidden="true">
            {months.map((x, i) => (
              <Image
                key={x.key}
                src={x.photos[0].p.image}
                alt=""
                fill
                sizes="(max-width: 767px) 100vw, 32vw"
                className={cn("object-cover object-[50%_30%]", i === active ? "visible" : "invisible")}
              />
            ))}
          </Link>
          <dl className="mt-10 grid grid-cols-[1fr_auto] gap-y-0.5">
            <dt className="text-flash/60">foto</dt>
            <dd className="text-right tabular-nums">{pad2(first.n)}</dd>
            <dt className="text-flash/60">luz</dt>
            <dd className="text-right">{first.p.light === "night" ? "noite" : "dia"}</dd>
            <dt className="text-flash/60">ano</dt>
            <dd className="text-right tabular-nums">{m.year}</dd>
          </dl>
        </div>

        {/* Right: the months. */}
        <ol ref={list} className="border-t-[length:var(--d-hair)] border-flash/25">
          {months.map((x, i) => (
            <li key={x.key}>
              <Link
                href={`/foto/${x.photos[0].p.slug}`}
                data-month={i}
                data-active={i === active || undefined}
                onFocus={() => setActive(i)}
                className="d-glow grid h-12 grid-cols-[60px_1fr_auto] items-center gap-4 border-b-[length:var(--d-hair)] border-flash/25 outline-offset-[-2px] max-lg:h-10 max-md:grid-cols-[36px_1fr_auto]"
              >
                <span className="text-flash/60 tabular-nums">{pad2(i + 1)}</span>
                <span>
                  {x.label} {x.year}
                </span>
                <span className="tabular-nums text-flash/60">
                  {pad2(x.photos.length)} {x.photos.length === 1 ? "foto" : "fotos"}
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
