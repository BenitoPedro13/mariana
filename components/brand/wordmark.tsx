"use client";

import Link from "next/link";
import { useRef } from "react";

import { ReversalWord, useReversal } from "@/components/brand/use-reversal";
import { cn } from "@/lib/utils";

export { REVERSE_EVENT } from "@/components/brand/use-reversal";

/** The header mark: `anairam`, which turns on first exposure, hover and focus. */
export function Wordmark({ className }: { className?: string }) {
  const r = useReversal();
  const armed = useRef(true);

  const turn = () => (r.reduced ? r.swap(true) : void r.reverse());
  const unturn = () => {
    if (r.reduced) r.swap(false);
  };

  return (
    <Link
      href="/"
      aria-label="Mariana, página inicial"
      className={cn(
        "relative inline-block font-display text-[length:clamp(1.25rem,1rem+1vw,1.75rem)] leading-none font-medium text-ink [font-variation-settings:'opsz'_96]",
        className,
      )}
      onPointerEnter={(e) => {
        if (e.pointerType !== "mouse" || !armed.current) return;
        armed.current = false;
        turn();
      }}
      onPointerLeave={() => {
        armed.current = true;
        unturn();
      }}
      onFocus={(e) => {
        if (e.currentTarget.matches(":focus-visible")) turn();
      }}
      onBlur={unturn}
    >
      <ReversalWord r={r} />
    </Link>
  );
}

/** `i.`: the collapsed header and the favicon. The tittle is the one magenta. */
export function Monogram({ className, href = "/" }: { className?: string; href?: string }) {
  return (
    <Link
      href={href}
      aria-label="Mariana, página inicial"
      className={cn(
        "relative inline-flex min-h-11 min-w-11 items-center font-display text-[1.75rem] leading-none font-medium text-ink [font-variation-settings:'opsz'_96]",
        className,
      )}
    >
      <span aria-hidden="true" className="relative inline-block">
        i
        <span className="absolute inset-0 text-mark [clip-path:inset(0_0_64%_0)]">i</span>
      </span>
      <span aria-hidden="true">.</span>
    </Link>
  );
}
