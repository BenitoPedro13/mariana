"use client";

import { useEffect, useRef } from "react";

/**
 * A 12 px Flash square that inverts what it passes over. Fine pointers only;
 * the native cursor comes back everywhere else. It's the same square that
 * ends every line on the page.
 */
export function SquareCursor() {
  const el = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    if (!fine.matches) return;
    const root = document.documentElement;
    root.classList.add("d-cursor");
    let x = -40;
    let y = -40;
    let raf = 0;
    const paint = () => {
      raf = 0;
      if (el.current) el.current.style.transform = `translate3d(${x - 6}px, ${y - 6}px, 0)`;
    };
    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (el.current) el.current.style.opacity = "1";
      if (!raf) raf = requestAnimationFrame(paint);
    };
    const onLeave = () => {
      if (el.current) el.current.style.opacity = "0";
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      root.classList.remove("d-cursor");
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={el}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[60] size-3 bg-flash opacity-0 mix-blend-difference"
    />
  );
}
