"use client";

import { useEffect, useRef } from "react";

import { registerFlashLayer } from "@/lib/flash";

/** One full-viewport layer, above the chrome, so the whole screen exposes. */
export function FlashLayer() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    registerFlashLayer(ref.current);
    return () => registerFlashLayer(null);
  }, []);
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 bg-flash opacity-0"
    />
  );
}
