"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, ViewTransition } from "react";

import { DateStamp } from "@/components/brand/date-stamp";
import { ReversalWord, REVERSE_EVENT, useReversal } from "@/components/brand/use-reversal";
import { setSurface, usePileKeys } from "@/components/pile/hooks";
import { LabCursor } from "@/components/lab/lab-cursor";
import { LineReveal } from "@/components/lab/line-reveal";
import { MorphStage, type MorphMode, type MorphStageHandle } from "@/components/lab/morph-stage";
import { Odometer } from "@/components/lab/odometer";
import { usePressure } from "@/components/lab/use-pressure";
import { useWheelNotch } from "@/components/lab/use-cut";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import type { Photo } from "@/content/types";
import { flash, markCut } from "@/lib/flash";
import { useFlashOn } from "@/lib/flash-preference";
import { pad2 } from "@/lib/print";

/*
 * Direction D: metamorfose. A's room (the name across it) with C's physical
 * print, and the photo inside the print morphs into the next: it melts, rings
 * out from your finger, or slides in strips. The flash lands halfway through.
 * Hold the print and it goes wet under your finger; fling it to change. Open
 * it and the print itself becomes the photo page. The name leans toward the
 * pointer and turns round its i.
 */

const MODES: { value: MorphMode; label: string }[] = [
  { value: "derreter", label: "derreter" },
  { value: "onda", label: "onda" },
  { value: "fatias", label: "fatias" },
];

const MORPH_MS = 1150;
const MIDPOINT = 0.46;

export function DMetamorfose({ photos }: { photos: Photo[] }) {
  const total = photos.length;
  const reduced = useReducedMotion() ?? false;
  const flashOn = useFlashOn();
  const r = useReversal();
  usePressure(r.letters, r.slots, { enabled: !reduced, radius: 0.32 });

  const stage = useRef<MorphStageHandle>(null);
  const [shown, setShown] = useState(0);
  const [mode, setMode] = useState<MorphMode>("derreter");
  const target = useRef(0);
  const photo = photos[shown];

  useEffect(() => {
    setSurface(photos[shown].light);
  }, [photos, shown]);
  useEffect(() => () => setSurface("night"), []);

  useEffect(() => {
    const t = window.setTimeout(() => window.dispatchEvent(new Event(REVERSE_EVENT)), 1200);
    return () => window.clearTimeout(t);
  }, []);

  const go = useCallback(
    (to: number, dir: [number, number], origin?: [number, number]) => {
      const t = ((to % total) + total) % total;
      if (t === target.current) return;
      target.current = t;
      if (reduced) {
        markCut();
        stage.current?.set(t);
        setShown(t);
        return;
      }
      void stage.current?.cut(t, { mode, dir, origin, ms: MORPH_MS });
      const midpoint = (MORPH_MS * MIDPOINT) / 1000;
      if (flashOn) {
        // The flash peaks halfway through the morph, and the room cuts there.
        flash({ delay: Math.max(0, midpoint - 0.06), onPeak: () => setShown(target.current) });
      } else {
        markCut();
        window.setTimeout(() => setShown(target.current), midpoint * 1000);
      }
    },
    [flashOn, mode, reduced, total],
  );

  const next = useCallback(() => go(target.current + 1, [1, 0]), [go]);
  const prev = useCallback(() => go(target.current - 1, [-1, 0]), [go]);
  usePileKeys({ next, prev, first: () => go(0, [-1, 0]), last: () => go(total - 1, [1, 0]) });
  useWheelNotch((d) => (d > 0 ? next() : prev()));

  return (
    <main className="relative h-svh min-h-[640px] overflow-hidden bg-surface text-ink">
      <LabCursor />
      <h1 className="sr-only">Mariana, fotos</h1>

      {/* The name across the room; it leans toward the pointer. */}
      <div
        className="pointer-events-auto absolute inset-x-0 bottom-[-0.09em] z-0 flex justify-center font-display text-[29vw] leading-[0.8] font-medium tracking-[-0.02em] select-none max-sm:bottom-[33svh] max-sm:text-[30vw]"
        onPointerEnter={() => void r.reverse()}
      >
        <ReversalWord r={r} tittleVisible letterClassName="[font-variation-settings:'wght'_400,'opsz'_96]" />
      </div>

      <section
        aria-label="foto"
        className="absolute top-[9svh] left-[var(--gutter)] z-20 flex w-[30vw] flex-col gap-8 max-sm:top-auto max-sm:bottom-[4svh] max-sm:w-[calc(100vw-2*var(--gutter))] max-sm:gap-4"
      >
        <div className="flex items-end gap-3">
          <Odometer value={shown + 1} className="font-display text-[8vw] font-medium max-sm:text-[15vw]" instant={reduced} />
          <span className="pb-[0.6vw] font-mono text-xs text-ink-quiet">/ {pad2(total)}</span>
          <span className="sr-only">
            foto {shown + 1} de {total}
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
            instant={reduced}
            className="text-[clamp(1.25rem,2.1vw,2.25rem)] leading-[1.15] font-medium tracking-[-0.01em] text-balance"
          />
        )}
        <div className="flex flex-col gap-3 max-sm:hidden">
          <div className="flex gap-1 font-mono text-xs">
            <button type="button" onClick={prev} className="inline-flex min-h-11 items-center pr-3 hover:text-link">
              ← anterior
            </button>
            <button type="button" onClick={next} className="inline-flex min-h-11 items-center px-3 hover:text-link">
              próxima →
            </button>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] tracking-[0.3em] text-ink-quiet">morph</span>
            <ToggleGroup
              aria-label="tipo de morph"
              value={[mode]}
              onValueChange={(v) => {
                if (v[0]) setMode(v[0] as MorphMode);
              }}
            >
              {MODES.map((m) => (
                <ToggleGroupItem
                  key={m.value}
                  value={m.value}
                  className="px-2 font-mono text-xs data-[pressed]:bg-ink data-[pressed]:text-surface"
                >
                  {m.label}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
        </div>
      </section>

      {/* The print. */}
      <div className="absolute top-[7svh] right-[var(--gutter)] bottom-[10svh] z-10 flex w-[54vw] items-center justify-center [container-type:size] [perspective:1600px] max-sm:inset-x-[var(--gutter)] max-sm:top-[9svh] max-sm:bottom-[40svh] max-sm:w-auto">
        <Print
          photos={photos}
          photo={photo}
          stage={stage}
          reduced={reduced}
          onFling={(dir, origin) => go(target.current + (dir[0] >= 0 ? 1 : -1), dir, origin)}
        />
      </div>

      <p aria-live="polite" className="sr-only">
        {`foto ${shown + 1} de ${total}. ${photo.alt}.${photo.caption ? ` legenda: ${photo.caption}` : ""}`}
      </p>
    </main>
  );
}

function Print({
  photos,
  photo,
  stage,
  reduced,
  onFling,
}: {
  photos: Photo[];
  photo: Photo;
  stage: React.RefObject<MorphStageHandle | null>;
  reduced: boolean;
  onFling: (dir: [number, number], origin: [number, number]) => void;
}) {
  const ratio = photo.image.width / photo.image.height;
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 26 });
  const sy = useSpring(y, { stiffness: 260, damping: 26 });
  const rx = useSpring(0, { stiffness: 200, damping: 20 });
  const ry = useSpring(0, { stiffness: 200, damping: 20 });
  const press = useRef<{ x: number; y: number; t: number; moved: boolean } | null>(null);
  const suppressClick = useRef(false);

  const local = (e: React.PointerEvent<HTMLElement>): [number, number] => {
    const b = e.currentTarget.getBoundingClientRect();
    return [(e.clientX - b.left) / b.width, (e.clientY - b.top) / b.height];
  };

  return (
    <motion.div
      className="relative"
      style={{
        x: sx,
        y: sy,
        rotateX: rx,
        rotateY: ry,
        width: `min(100cqw, calc(100cqh * ${ratio}))`,
        height: `min(100cqh, calc(100cqw / ${ratio}))`,
        transition: reduced ? "none" : "width 700ms cubic-bezier(0.65,0,0.25,1), height 700ms cubic-bezier(0.65,0,0.25,1)",
      }}
    >
      <ViewTransition name={`foto-${photo.slug}`} share="morph" default="none">
        <Link
          href={`/foto/${photo.slug}`}
          data-cursor="abrir"
          aria-label={`abrir foto: ${photo.alt}`}
          draggable={false}
          className="block size-full touch-none bg-flash p-[2.4%] shadow-[0_1px_2px_rgba(0,0,0,0.35),0_30px_70px_-20px_rgba(0,0,0,0.85)]"
          onPointerDown={(e) => {
            e.currentTarget.setPointerCapture(e.pointerId);
            press.current = { x: e.clientX, y: e.clientY, t: performance.now(), moved: false };
            if (!reduced) stage.current?.wet(local(e));
          }}
          onPointerMove={(e) => {
            const [px, py] = local(e);
            if (!press.current) {
              if (e.pointerType === "mouse" && !reduced) {
                rx.set((0.5 - py) * 8);
                ry.set((px - 0.5) * 10);
              }
              return;
            }
            const dx = e.clientX - press.current.x;
            const dy = e.clientY - press.current.y;
            if (Math.hypot(dx, dy) > 6) press.current.moved = true;
            if (!reduced) {
              x.set(dx * 0.35);
              y.set(dy * 0.35);
              stage.current?.wet([px, py]);
            }
          }}
          onPointerUp={(e) => {
            const p = press.current;
            press.current = null;
            stage.current?.wet(null);
            x.set(0);
            y.set(0);
            if (!p) return;
            const dx = e.clientX - p.x;
            const dy = e.clientY - p.y;
            const dist = Math.hypot(dx, dy);
            const speed = dist / Math.max(1, performance.now() - p.t);
            suppressClick.current = p.moved;
            if (dist > 90 || (p.moved && speed > 0.6)) {
              const [px, py] = local(e);
              onFling([dx / dist, -dy / dist], [px, 1 - py]);
            }
          }}
          onPointerLeave={() => {
            rx.set(0);
            ry.set(0);
          }}
          onClick={(e) => {
            if (suppressClick.current) {
              e.preventDefault();
              suppressClick.current = false;
            }
          }}
        >
          <div className="relative size-full">
            <MorphStage ref={stage} photos={photos} initial={0} className="size-full" sizes="(max-width: 640px) 100vw, 54vw" />
            <DateStamp date={photo.date} className="absolute right-3 bottom-3" />
          </div>
        </Link>
      </ViewTransition>
    </motion.div>
  );
}
