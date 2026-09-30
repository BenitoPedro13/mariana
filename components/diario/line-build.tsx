"use client";

import { useEffect, useRef } from "react";

import { Square } from "@/components/diario/marks";
import { cn } from "@/lib/utils";

/*
 * Line build: `a ———— b ■`. The hairline starts as a 3 px stub and grows to
 * the full row as `--p` goes 0 → 1, pushing the right label and its square
 * to the edge. The parent drives `--p` (scroll progress) on the element with
 * `data-line={id}`; this component only measures how much room the line has.
 */
export function LineBuild({
  id,
  left,
  right,
  className,
  headingLevel,
  headingId,
}: {
  id: string;
  left: string;
  right: string;
  className?: string;
  /** Render the left label as a heading (it names the section). */
  headingLevel?: 2 | 3;
  headingId?: string;
}) {
  const row = useRef<HTMLDivElement>(null);
  const l = useRef<HTMLSpanElement>(null);
  const r = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = row.current;
    if (!el) return;
    const measure = () => {
      const free = el.clientWidth - (l.current?.offsetWidth ?? 0) - (r.current?.offsetWidth ?? 0) - 16 - 3;
      el.style.setProperty("--free", `${Math.max(0, free)}px`);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const Left = headingLevel ? (`h${headingLevel}` as const) : "span";

  return (
    <div
      ref={row}
      data-line={id}
      className={cn("flex h-[10px] items-center gap-2 whitespace-nowrap [--p:0]", className)}
    >
      <Left ref={l as never} id={headingId} tabIndex={headingLevel ? -1 : undefined} className="font-[inherit] text-[length:inherit] outline-none">
        {left}
      </Left>
      <span
        aria-hidden="true"
        className="block h-[var(--d-hair)] shrink-0 bg-flash"
        style={{ width: "calc(3px + var(--free, 0px) * var(--p))" }}
      />
      <span ref={r} className="flex items-center gap-2">
        {right}
        <Square size={7} />
      </span>
    </div>
  );
}

/** Scroll progress of an element's top between two viewport heights (in vh), 0 → 1. */
export function travelProgress(el: Element, fromVh: number, toVh: number) {
  const top = el.getBoundingClientRect().top;
  const vh = window.innerHeight / 100;
  const p = (fromVh * vh - top) / ((fromVh - toVh) * vh);
  return Math.min(1, Math.max(0, p));
}
