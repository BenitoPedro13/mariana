"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

/*
 * Wave hover: while the pointer moves over the photo, a canvas copy of it is
 * cut into 2 px strips and each strip slides sideways:
 *
 *   (sin(y·0.045 + φ) + 0.65·sin(y·0.021 − 1.7φ) + 0.35·sin((y − py)·0.018 + 0.65φ)) × 4.5 px × amount
 *
 * φ advances 0.13 per frame. `amount` rises toward 1 while the pointer moves
 * and decays ×0.86 per frame once it has been still for 70 ms. Fine pointers
 * and ≥ 1025 px only; reduced motion never starts it. The <img> underneath
 * stays the photo; the canvas is only laid over it while it moves.
 */

const STRIP = 2;

type Props = Omit<ImageProps, "fill"> & {
  /** CSS object-position vertical, 0 (top) → 1 (bottom). */
  focusY?: number;
  wrapClassName?: string;
};

export function WaveImage({ focusY = 0.5, wrapClassName, className, alt, ...image }: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLImageElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = wrap.current;
    const cv = canvas.current;
    if (!el || !cv) return;
    const allowed = () =>
      window.matchMedia("(pointer: fine)").matches &&
      window.innerWidth >= 1025 &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = cv.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    let amount = 0;
    let phase = 0;
    let py = 0;
    let lastMove = 0;
    let moving = false;

    const draw = () => {
      const im = img.current;
      if (!im || !im.complete || !im.naturalWidth) {
        raf = requestAnimationFrame(draw);
        return;
      }
      const b = el.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio, 2);
      const w = Math.round(b.width * dpr);
      const h = Math.round(b.height * dpr);
      if (cv.width !== w || cv.height !== h) {
        cv.width = w;
        cv.height = h;
      }
      // object-fit: cover, object-position: center focusY
      const iw = im.naturalWidth;
      const ih = im.naturalHeight;
      const scale = Math.max(b.width / iw, b.height / ih);
      const sw = b.width / scale;
      const sh = b.height / scale;
      const sx = (iw - sw) / 2;
      const sy = (ih - sh) * focusY;

      const still = performance.now() - lastMove > 70;
      if (moving && !still) amount += (1 - amount) * 0.45;
      else amount *= 0.86;
      phase += 0.13;

      ctx.clearRect(0, 0, w, h);
      for (let y = 0; y < b.height; y += STRIP) {
        const off =
          (Math.sin(y * 0.045 + phase) +
            0.65 * Math.sin(y * 0.021 - 1.7 * phase) +
            0.35 * Math.sin((y - py) * 0.018 + 0.65 * phase)) *
          4.5 *
          amount;
        ctx.drawImage(im, sx, sy + (y / b.height) * sh, sw, (STRIP / b.height) * sh, off * dpr, y * dpr, w, STRIP * dpr + 1);
      }

      if (amount < 0.01 && still) {
        amount = 0;
        cv.style.opacity = "0";
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(draw);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || !allowed()) return;
      const b = el.getBoundingClientRect();
      py = e.clientY - b.top;
      lastMove = performance.now();
      moving = true;
      cv.style.opacity = "1";
      if (!raf) raf = requestAnimationFrame(draw);
    };
    const onLeave = () => {
      moving = false;
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [focusY]);

  return (
    <div ref={wrap} className={cn("relative size-full overflow-hidden", wrapClassName)}>
      <Image
        ref={img}
        alt={alt}
        fill
        className={cn("object-cover", className)}
        style={{ objectPosition: `50% ${focusY * 100}%` }}
        {...image}
      />
      <canvas ref={canvas} aria-hidden="true" className="pointer-events-none absolute inset-0 size-full opacity-0" />
    </div>
  );
}
