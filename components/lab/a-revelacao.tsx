"use client";

import { useEffect } from "react";

import { DateStamp } from "@/components/brand/date-stamp";
import { ReversalWord, REVERSE_EVENT, useReversal } from "@/components/brand/use-reversal";
import { setSurface } from "@/components/pile/hooks";
import { DevelopStage } from "@/components/lab/develop-stage";
import { LabCursor } from "@/components/lab/lab-cursor";
import { LineReveal } from "@/components/lab/line-reveal";
import { Odometer } from "@/components/lab/odometer";
import { useCut, useWheelNotch } from "@/components/lab/use-cut";
import type { Photo } from "@/content/types";
import { pad2 } from "@/lib/print";
import { cn } from "@/lib/utils";

/*
 * Direction A: revelação. The name is the architecture: `anairam` set across
 * the whole viewport, the print laid over it, off centre. Every cut flashes
 * and the next print develops out of white paper, shadows first. Her caption
 * is set large, like a line of a diary.
 */
export function ARevelacao({ photos }: { photos: Photo[] }) {
  const total = photos.length;
  const cut = useCut(total);
  const r = useReversal();
  const photo = photos[cut.shown];
  useWheelNotch((d) => (d > 0 ? cut.next() : cut.prev()));

  useEffect(() => {
    setSurface(photos[cut.shown].light);
  }, [cut.shown, photos]);
  useEffect(() => () => setSurface("night"), []);

  // First exposure: the print develops, then the name turns once.
  useEffect(() => {
    const t = window.setTimeout(() => window.dispatchEvent(new Event(REVERSE_EVENT)), 1500);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <main className="relative h-svh min-h-[640px] overflow-hidden bg-surface text-ink">
      <LabCursor />
      <h1 className="sr-only">Mariana, fotos</h1>

      {/* The name, across the room. The print sits over its middle. */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-[-0.09em] z-0 flex justify-center font-display text-[30vw] leading-[0.8] font-medium tracking-[-0.02em] select-none [font-variation-settings:'opsz'_96] max-sm:bottom-[33svh] max-sm:text-[31vw]"
        onPointerEnter={() => void r.reverse()}
      >
        <ReversalWord r={r} tittleVisible />
      </div>

      {/* Left column: counter, stamp, light, caption. */}
      <section
        aria-label="foto"
        className="absolute top-[9svh] left-[var(--gutter)] z-20 flex w-[30vw] flex-col gap-8 max-sm:top-auto max-sm:bottom-[4svh] max-sm:w-[calc(100vw-2*var(--gutter))] max-sm:gap-4"
      >
        <div className="flex items-end gap-3 font-mono">
          <Odometer value={cut.shown + 1} className="font-display text-[8vw] font-medium max-sm:text-[15vw]" instant={cut.reduced} />
          <span className="pb-[0.6vw] text-xs text-ink-quiet">/ {pad2(total)}</span>
          <span className="sr-only">
            foto {cut.shown + 1} de {total}
          </span>
        </div>
        <div className="flex gap-6 font-mono text-xs text-ink-quiet">
          <DateStamp date={photo.date} className="text-stamp" />
          <span>{photo.light === "night" ? "noite" : "dia"}</span>
        </div>
        {photo.caption && (
          <LineReveal
            text={photo.caption}
            lang={photo.captionLang !== "pt-BR" ? photo.captionLang : undefined}
            revealKey={photo.slug}
            instant={cut.reduced}
            className="text-[clamp(1.25rem,2.1vw,2.25rem)] leading-[1.15] font-medium tracking-[-0.01em] text-balance"
          />
        )}
      </section>

      {/* The print. Left third goes back, the rest goes on. */}
      <div className="absolute top-[7svh] right-[var(--gutter)] bottom-[9svh] z-10 w-[56vw] max-sm:inset-x-[var(--gutter)] max-sm:top-[9svh] max-sm:bottom-[40svh] max-sm:w-auto">
        <DevelopStage
          photos={photos}
          index={cut.shown}
          developing={cut.developing}
          expose={cut.motionOn}
          sizes="(max-width: 640px) 100vw, 56vw"
          className="size-full"
        />
        <button
          type="button"
          aria-label="foto anterior"
          data-cursor="anterior"
          onClick={cut.prev}
          className="absolute inset-y-0 left-0 w-1/3 focus-visible:outline-offset-[-4px]"
        />
        <button
          type="button"
          aria-label="próxima foto"
          data-cursor="próxima"
          onClick={cut.next}
          className="absolute inset-y-0 right-0 w-2/3 focus-visible:outline-offset-[-4px]"
        />
        {/* Film edge, the way the lab prints it along the frame. */}
        <p
          aria-hidden="true"
          className="absolute top-0 -right-6 origin-top-left translate-x-full rotate-90 font-mono text-[10px] tracking-[0.3em] whitespace-nowrap text-stamp max-sm:hidden"
        >
          ▸ {pad2(cut.shown + 1)} &nbsp; anairam 400 &nbsp; ▸ {pad2(cut.shown + 1)}A
        </p>
      </div>

      {/* Frames, like the edge of a contact strip. */}
      <nav aria-label="fotos" className="absolute top-[9svh] left-[calc(var(--gutter)+30vw)] z-20 flex -translate-x-full flex-col gap-1 max-sm:hidden">
        {photos.map((p, i) => (
          <button
            key={p.slug}
            type="button"
            aria-label={`foto ${i + 1}`}
            aria-current={i === cut.shown ? "true" : undefined}
            onClick={() => cut.go(i, i > cut.index ? 1 : -1)}
            className="group flex h-6 w-11 items-center justify-end"
          >
            <span
              className={cn(
                "block h-[2px] w-3 bg-ink-quiet transition-[width,background-color] duration-300 group-hover:w-6",
                i === cut.shown && "w-9 bg-ink",
              )}
            />
          </button>
        ))}
      </nav>
    </main>
  );
}
