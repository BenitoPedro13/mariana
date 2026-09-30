"use client";

import Lenis from "lenis";
import { createContext, useCallback, useContext, useEffect, useRef } from "react";

/*
 * Lenis smooth scroll on desktop only (fine pointer, ≥ 1025 px, motion
 * allowed). Touch and reduced motion keep native scrolling. Anchor jumps
 * glide for 900 ms and land under the fixed header. While one is gliding,
 * `gliding()` is true, so sections don't hold the page mid-glide.
 */

type Scroll = {
  to: (target: string | HTMLElement, opts?: { offset?: number }) => void;
  stop: () => void;
  start: () => void;
  gliding: () => boolean;
};

const ScrollContext = createContext<Scroll | null>(null);

export const HEADER_OFFSET = 72;

function easeInOutQuart(t: number) {
  return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenis = useRef<Lenis | null>(null);
  const stopped = useRef(false);
  const glide = useRef(0);

  useEffect(() => {
    const ok =
      window.matchMedia("(pointer: fine)").matches &&
      window.innerWidth >= 1025 &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!ok) return;
    const l = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenis.current = l;
    if (stopped.current) l.stop();
    let raf = 0;
    const loop = (t: number) => {
      l.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      l.destroy();
      lenis.current = null;
    };
  }, []);

  const to = useCallback<Scroll["to"]>((target, { offset = -HEADER_OFFSET } = {}) => {
    const el = typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.clearTimeout(glide.current);
    glide.current = window.setTimeout(() => (glide.current = 0), 1100);
    if (lenis.current) {
      stopped.current = false;
      lenis.current.start();
      lenis.current.scrollTo(el, { offset, duration: 0.9, easing: easeInOutQuart });
    } else {
      const top = el.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
    }
  }, []);

  const stop = useCallback(() => {
    stopped.current = true;
    lenis.current?.stop();
  }, []);
  const start = useCallback(() => {
    stopped.current = false;
    lenis.current?.start();
  }, []);

  const gliding = useCallback(() => glide.current !== 0, []);

  return <ScrollContext.Provider value={{ to, stop, start, gliding }}>{children}</ScrollContext.Provider>;
}

export function useSmoothScroll() {
  const ctx = useContext(ScrollContext);
  if (!ctx) throw new Error("useSmoothScroll outside <SmoothScroll>");
  return ctx;
}
