"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useReducedMotion } from "motion/react";
import type { ComponentProps } from "react";

import { flash, markCut } from "@/lib/flash";
import { useFlashOn } from "@/lib/flash-preference";

/**
 * A link that cuts with the flash: the screen whites out, the next page
 * arrives while it's white, then develops. Used for prev/next on the photo
 * page. Modified clicks, reduced motion and "desligar flash" navigate plainly.
 */
export function FlashLink({ href, onClick, ...props }: ComponentProps<typeof Link> & { href: string }) {
  const router = useRouter();
  const reduced = useReducedMotion() ?? false;
  const flashOn = useFlashOn();

  return (
    <Link
      href={href}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented) return;
        if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        if (reduced || !flashOn) {
          markCut();
          return;
        }
        e.preventDefault();
        flash({ onPeak: () => router.push(href) });
      }}
      {...props}
    />
  );
}
