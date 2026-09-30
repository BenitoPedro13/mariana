"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

import { LineBuild, travelProgress } from "@/components/diario/line-build";
import { Square } from "@/components/diario/marks";
import { useSmoothScroll } from "@/components/diario/smooth-scroll";
import type { NavItem } from "@/components/diario/header";
import { pad2 } from "@/lib/print";

/*
 * S10 · Footer. `anairam ——— mariana ■` (the line carries her name the
 * right way round to the edge), four columns, and the name drawn across the
 * full width as ASCII: each Bodoni letter is a mask filled with rows of
 * `anairam` in DM Mono (12 px, smaller on narrow screens), over a faint
 * silhouette so the hairlines still read.
 *
 * Hover: only the letter under the pointer opens. Its rows within 20 px of
 * the pointer split exactly at the pointer's x and slide apart, leaving a
 * 24 px gap (eased 0.16 per frame); they close when the pointer leaves.
 * Touch: pressing the name turns it Rosa. Reduced motion: it stays still.
 *
 * It's a canvas, so it is one image to assistive tech: "Mariana".
 */

const WORD = "anairam";
const MICRO = 12; // px, the most; smaller names get smaller type, so ~14 rows fit
const REACH = 20;
const GAP = 24;
const LERP = 0.16;

type Glyph = { x0: number; x1: number };

export function DiarioFooter({ nav, counts, years }: { nav: NavItem[]; counts: { all: number; night: number; day: number }; years: string }) {
  const scroll = useSmoothScroll();
  const foot = useRef<HTMLElement>(null);
  const holder = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  // The line builds as the footer rises.
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const row = foot.current?.querySelector<HTMLElement>('[data-line="rodape"]');
      if (row) row.style.setProperty("--p", String(travelProgress(row, 85, 40)));
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

  // The ASCII name.
  useEffect(() => {
    const box = holder.current;
    const cv = canvas.current;
    const ctx = cv?.getContext("2d");
    if (!box || !cv || !ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const css = getComputedStyle(document.documentElement);
    const display = css.getPropertyValue("--font-bodoni").trim() || "serif";
    const mono = css.getPropertyValue("--font-dm-mono").trim() || "monospace";
    const layer = document.createElement("canvas");
    const lctx = layer.getContext("2d")!;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let size = 0;
    let base = 0;
    let glyphs: Glyph[] = [];
    let rows = 0;
    let open: Float32Array[] = [];
    let pointer: { x: number; y: number } | null = null;
    let splitX = 0;
    let target = -1;
    let pink = false;
    let raf = 0;
    let line = "";
    let micro = MICRO;
    let step = MICRO + 1;

    const layout = () => {
      w = box.clientWidth;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      // Fit the word to the width, then size the canvas to the ink.
      ctx.font = `900 100px ${display}`;
      const m = ctx.measureText(WORD);
      size = (100 * w) / (m.actualBoundingBoxLeft + m.actualBoundingBoxRight);
      ctx.font = `900 ${size}px ${display}`;
      const mm = ctx.measureText(WORD);
      h = Math.ceil(mm.actualBoundingBoxAscent + mm.actualBoundingBoxDescent) + 2;
      base = mm.actualBoundingBoxAscent + 1;
      const left = mm.actualBoundingBoxLeft; // ink starts at x = 0
      glyphs = [];
      let x = left;
      for (const ch of WORD) {
        const adv = ctx.measureText(ch).width;
        glyphs.push({ x0: x, x1: x + adv });
        x += adv;
      }
      micro = Math.max(4, Math.min(MICRO, Math.floor(h / 14)));
      step = micro + 1;
      rows = Math.ceil(h / step);
      open = glyphs.map(() => new Float32Array(rows));
      for (const c of [cv, layer]) {
        c.width = Math.round(w * dpr);
        c.height = Math.round(h * dpr);
      }
      cv.style.height = `${h}px`;
      ctx.font = `400 ${micro}px ${mono}`;
      const unit = WORD;
      line = unit.repeat(Math.ceil(w / ctx.measureText(unit).width) + 2);
      draw();
    };

    const draw = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const colour = pink ? "#c27790" : "rgba(246, 243, 238, 0.82)";
      glyphs.forEach((g, gi) => {
        lctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        lctx.globalCompositeOperation = "source-over";
        lctx.clearRect(0, 0, w, h);
        lctx.fillStyle = colour;
        lctx.font = `400 ${micro}px ${mono}`;
        lctx.textBaseline = "top";
        // Rows start at the letter's left edge, a little offset per letter.
        const start = g.x0 - (gi * 17) % 40;
        for (let r = 0; r < rows; r++) {
          const y = r * step;
          const s = open[gi][r] * (GAP / 2);
          if (s < 0.05) {
            lctx.fillText(line, start, y);
            continue;
          }
          lctx.save();
          lctx.beginPath();
          lctx.rect(0, y - 1, splitX, step + 1);
          lctx.clip();
          lctx.fillText(line, start - s, y);
          lctx.restore();
          lctx.save();
          lctx.beginPath();
          lctx.rect(splitX, y - 1, w - splitX, step + 1);
          lctx.clip();
          lctx.fillText(line, start + s, y);
          lctx.restore();
        }
        // Keep only what falls inside this letter.
        lctx.globalCompositeOperation = "destination-in";
        lctx.font = `900 ${size}px ${display}`;
        lctx.textBaseline = "alphabetic";
        lctx.fillStyle = "#000";
        lctx.fillText(WORD[gi], g.x0, base);
        // A faint silhouette under the rows, so Bodoni's hairlines still read.
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.font = `900 ${size}px ${display}`;
        ctx.textBaseline = "alphabetic";
        ctx.fillStyle = pink ? "rgba(194, 119, 144, 0.14)" : "rgba(246, 243, 238, 0.07)";
        ctx.fillText(WORD[gi], g.x0, base);
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.drawImage(layer, 0, 0);
      });
    };

    const tick = () => {
      raf = 0;
      let moving = false;
      open.forEach((rowsOpen, gi) => {
        for (let r = 0; r < rowsOpen.length; r++) {
          const cy = r * step + micro / 2;
          const want = pointer && gi === target && Math.abs(cy - pointer.y) <= REACH ? 1 : 0;
          const v = rowsOpen[r] + (want - rowsOpen[r]) * LERP;
          rowsOpen[r] = Math.abs(want - v) < 0.002 ? want : v;
          if (rowsOpen[r] !== want) moving = true;
        }
      });
      draw();
      if (moving) raf = requestAnimationFrame(tick);
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || reduced) return;
      const r = cv.getBoundingClientRect();
      pointer = { x: e.clientX - r.left, y: e.clientY - r.top };
      splitX = pointer.x;
      target = glyphs.findIndex((g) => pointer!.x >= g.x0 && pointer!.x < g.x1);
      kick();
    };
    const leave = () => {
      pointer = null;
      kick();
    };
    const press = (e: PointerEvent) => {
      if (e.pointerType === "mouse") return;
      pink = true;
      draw();
    };
    const lift = () => {
      if (!pink) return;
      pink = false;
      draw();
    };

    const ro = new ResizeObserver(() => layout());
    let alive = true;
    document.fonts.ready.then(() => {
      if (!alive) return;
      layout();
      ro.observe(box);
    });
    cv.addEventListener("pointermove", move);
    cv.addEventListener("pointerleave", leave);
    cv.addEventListener("pointerdown", press);
    window.addEventListener("pointerup", lift);
    window.addEventListener("pointercancel", lift);
    return () => {
      alive = false;
      ro.disconnect();
      cancelAnimationFrame(raf);
      cv.removeEventListener("pointermove", move);
      cv.removeEventListener("pointerleave", leave);
      cv.removeEventListener("pointerdown", press);
      window.removeEventListener("pointerup", lift);
      window.removeEventListener("pointercancel", lift);
    };
  }, []);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    scroll.to(`#${id}`);
    window.setTimeout(
      () => document.getElementById(id)?.querySelector<HTMLElement>("h2, [data-d-heading]")?.focus({ preventScroll: true }),
      950,
    );
  };

  const cols: { title: string; items: React.ReactNode[] }[] = [
    {
      title: "diário",
      items: [`${pad2(counts.all)} fotos`, `${pad2(counts.night)} de noite · ${pad2(counts.day)} de dia`, years],
    },
    {
      title: "navegação",
      items: nav.map((n) => (
        <a key={n.id} href={`#${n.id}`} onClick={go(n.id)} className="d-glow">
          {n.label}
        </a>
      )),
    },
    {
      title: "outras vistas",
      items: [
        <Link key="tudo" href="/tudo" className="d-glow">
          tudo, de uma vez
        </Link>,
        <Link key="pilha" href="/pilha" className="d-glow">
          a pilha
        </Link>,
      ],
    },
    {
      title: "nota",
      items: ["uma prévia.", "nada aqui é público ainda."],
    },
  ];

  return (
    <footer ref={foot} className="relative flex min-h-[72.5svh] flex-col bg-noite px-[var(--d-gutter)] pt-10 pb-[10px] lg:min-h-[80svh]">
      <LineBuild id="rodape" left="anairam" right="mariana" />

      <div className="mt-[100px] grid grid-cols-4 gap-y-10 max-md:mt-16 max-md:grid-cols-2">
        {cols.map((c) => (
          <div key={c.title}>
            <p className="flex items-center gap-2">
              <Square size={7} />
              {c.title}
            </p>
            <ul className="mt-2.5 flex flex-col gap-0.5 text-flash/70">
              {c.items.map((it, i) => (
                <li key={i}>{it}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div ref={holder} className="mt-auto pt-16">
        <canvas ref={canvas} role="img" aria-label="Mariana" className="block w-full" style={{ height: 0 }} />
      </div>
      <p className="mt-2.5 self-end text-flash/60">2026</p>
    </footer>
  );
}
