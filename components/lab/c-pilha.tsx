"use client";

import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
  type PanInfo,
  type Variants,
} from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { DateStamp } from "@/components/brand/date-stamp";
import { ReversalWord, REVERSE_EVENT, useReversal } from "@/components/brand/use-reversal";
import { LabCursor } from "@/components/lab/lab-cursor";
import { LineReveal } from "@/components/lab/line-reveal";
import { Odometer } from "@/components/lab/odometer";
import { useCut, useWheelNotch } from "@/components/lab/use-cut";
import { Surface } from "@/components/site/surface";
import type { Photo } from "@/content/types";
import { develop } from "@/lib/flash";
import { formatStamp, pad2, restingAngle } from "@/lib/print";
import { cn } from "@/lib/utils";

/*
 * Direction C: a pilha. Real prints on a dark table: a white lab border,
 * weight, a gloss that catches the light as you move. Flick one and it spins
 * off the pile in 3D. Turn it over and the back carries what she wrote, with
 * the lab's stamp. The name is drawn in outline behind the pile.
 */

const STACK = 4;

type Exit = { dir: 1 | -1; vx: number; vy: number; flung: boolean; instant: boolean };

const variants: Variants = {
  rest: (instant: boolean) => ({
    x: 0,
    y: 0,
    rotateX: 0,
    rotateY: 0,
    transition: instant ? { duration: 0 } : { type: "spring", stiffness: 220, damping: 28 },
  }),
  exit: (e: Exit) =>
    e.dir === -1 || e.instant
      ? { opacity: 0, transition: { duration: 0 } }
      : {
          x: e.vx,
          y: e.vy,
          rotateX: 38 + Math.random() * 20,
          rotateY: (e.vx > 0 ? 1 : -1) * (50 + Math.random() * 30),
          zIndex: 30,
          transition: { type: "spring", stiffness: 120, damping: 22 },
        },
};

export function CPilha({ photos }: { photos: Photo[] }) {
  const total = photos.length;
  const cut = useCut(total);
  const r = useReversal();
  const [flipped, setFlipped] = useState(false);
  const [exit, setExit] = useState<Exit>({ dir: 1, vx: 0, vy: 0, flung: false, instant: true });
  const top = useRef<HTMLDivElement | null>(null);

  const reach = () => Math.max(window.innerWidth, window.innerHeight) * 1.4;

  const throwNext = useCallback(
    (v?: { x: number; y: number }) => {
      const dx = v?.x ?? -1;
      const dy = v?.y ?? -0.25;
      const len = Math.hypot(dx, dy) || 1;
      setExit({ dir: 1, vx: (dx / len) * reach(), vy: (dy / len) * reach(), flung: !!v, instant: cut.reduced });
      setFlipped(false);
      cut.next();
    },
    [cut],
  );
  const back = useCallback(() => {
    setExit((e) => ({ ...e, dir: -1, instant: cut.reduced }));
    setFlipped(false);
    cut.prev();
  }, [cut]);

  useWheelNotch((d) => (d > 0 ? throwNext() : back()));

  useEffect(() => {
    if (cut.developing) develop(top.current);
  }, [cut.shown, cut.developing]);

  useEffect(() => {
    const t = window.setTimeout(() => window.dispatchEvent(new Event(REVERSE_EVENT)), 900);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "v" || e.key === "V") setFlipped((f) => !f);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const photo = photos[cut.shown];
  const stack = Array.from({ length: Math.min(STACK, total) }, (_, d) => ({
    photo: photos[(cut.index + d) % total],
    depth: d,
  }));

  return (
    <main className="relative h-svh min-h-[640px] overflow-hidden bg-noite text-flash">
      <Surface light="night" />
      <LabCursor />
      <h1 className="sr-only">Mariana, fotos</h1>

      {/* The name in outline, behind the pile. */}
      <div
        className="pointer-events-auto absolute inset-x-0 top-1/2 z-0 flex -translate-y-[58%] justify-center font-display text-[27vw] leading-none font-medium text-transparent select-none [-webkit-text-stroke:1px_rgba(246,243,238,0.32)] [font-variation-settings:'opsz'_96]"
        onPointerEnter={() => void r.reverse()}
      >
        <ReversalWord r={r} />
      </div>

      <section aria-label="fotos" className="absolute inset-0 z-10">
        <div className="absolute top-[6svh] left-1/2 h-[72svh] w-[min(46vw,60svh)] -translate-x-1/2 [container-type:size] [perspective:1600px] max-sm:top-[8svh] max-sm:h-[58svh] max-sm:w-[82vw]">
          <AnimatePresence initial={false} custom={exit}>
            {stack.map(({ photo: p, depth }) => (
              <PrintObject
                key={p.slug}
                photo={p}
                depth={depth}
                n={((cut.index + depth) % total) + 1}
                total={total}
                instant={cut.reduced}
                flipped={depth === 0 && flipped}
                enterFromLeft={depth === 0 && exit.dir === -1 && !cut.reduced}
                printRef={depth === 0 ? top : undefined}
                onFling={throwNext}
                onFlip={() => setFlipped((f) => !f)}
              />
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Counter, bottom left, like the window on the back of a camera. */}
      <div className="absolute bottom-[3svh] left-[var(--gutter)] z-20 flex items-end gap-2 font-mono">
        <Odometer value={cut.shown + 1} className="font-display text-[11vw] font-medium max-sm:text-[16vw]" instant={cut.reduced} />
        <span className="pb-1 text-xs text-[color:var(--asfalto)]">/ {pad2(total)}</span>
        <span className="sr-only">
          foto {cut.shown + 1} de {total}
        </span>
      </div>

      {/* Caption, bottom right (above the controls on phones). */}
      <div className="absolute right-[var(--gutter)] bottom-[4svh] z-20 flex w-[30vw] flex-col items-end gap-4 text-right max-sm:bottom-[13svh] max-sm:w-[60vw] max-sm:gap-2">
        <DateStamp date={photo.date} />
        {photo.caption && (
          <LineReveal
            text={photo.caption}
            lang={photo.captionLang !== "pt-BR" ? photo.captionLang : undefined}
            revealKey={photo.slug}
            instant={cut.reduced}
            className="text-[clamp(1.1rem,1.6vw,1.75rem)] leading-[1.2] font-medium text-balance"
          />
        )}
      </div>

      <nav
        aria-label="controles"
        className="absolute bottom-[3svh] left-1/2 z-20 flex -translate-x-1/2 gap-1 font-mono text-xs max-sm:right-[var(--gutter)] max-sm:left-auto max-sm:translate-x-0"
      >
        <button type="button" onClick={back} aria-label="anterior" className="inline-flex min-h-11 min-w-11 items-center justify-center px-3 hover:text-[color:var(--rosa)]">
          ←<span className="max-sm:hidden">&nbsp;anterior</span>
        </button>
        <button
          type="button"
          aria-pressed={flipped}
          onClick={() => setFlipped((f) => !f)}
          className="inline-flex min-h-11 items-center px-3 hover:text-[color:var(--rosa)]"
        >
          virar
        </button>
        <button type="button" onClick={() => throwNext()} aria-label="próxima" className="inline-flex min-h-11 min-w-11 items-center justify-center px-3 hover:text-[color:var(--rosa)]">
          <span className="max-sm:hidden">próxima&nbsp;</span>→
        </button>
      </nav>

      <p aria-live="polite" className="sr-only">
        {`foto ${cut.shown + 1} de ${total}. ${photo.alt}.${photo.caption ? ` legenda: ${photo.caption}` : ""}`}
      </p>
    </main>
  );
}

function PrintObject({
  photo,
  depth,
  n,
  total,
  instant,
  flipped,
  enterFromLeft,
  printRef,
  onFling,
  onFlip,
}: {
  photo: Photo;
  depth: number;
  n: number;
  total: number;
  instant: boolean;
  flipped: boolean;
  enterFromLeft: boolean;
  printRef?: React.RefObject<HTMLDivElement | null>;
  onFling: (v: { x: number; y: number }) => void;
  onFlip: () => void;
}) {
  const isTop = depth === 0;
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const spin = useTransform(x, [-900, 0, 900], [-18, 0, 18]);
  // Tilt toward the pointer, like a print held under a lamp.
  const tx = useSpring(0, { stiffness: 200, damping: 20 });
  const ty = useSpring(0, { stiffness: 200, damping: 20 });
  const gx = useMotionValue(50);
  const gy = useMotionValue(30);
  const glare = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.38), rgba(255,255,255,0) 55%)`;
  const [hover, setHover] = useState(false);
  const dragged = useRef(false);

  const { width, height } = photo.image;
  const ratio = width / height;
  const angle = restingAngle(photo.slug) * (isTop ? 0.6 : 1.8);

  return (
    <motion.div
      className="absolute inset-0 m-auto [transform-style:preserve-3d]"
      style={{
        x,
        y,
        rotateZ: spin,
        z: -depth * 14,
        zIndex: 10 - depth,
        width: `min(100cqw, calc(100cqh * ${ratio}))`,
        height: `min(100cqh, calc(100cqw / ${ratio}))`,
        touchAction: isTop ? "none" : undefined,
      }}
      custom={instant}
      variants={variants}
      initial={enterFromLeft ? { x: -1400, y: -120, rotateY: -60 } : false}
      animate="rest"
      exit="exit"
      drag={isTop}
      dragSnapToOrigin
      dragElastic={1}
      onDragStart={() => {
        dragged.current = true;
      }}
      onDragEnd={(_: unknown, info: PanInfo) => {
        const far = Math.hypot(info.offset.x, info.offset.y) > 180;
        const fast = Math.hypot(info.velocity.x, info.velocity.y) > 650;
        if (far || fast) onFling(fast ? info.velocity : info.offset);
      }}
      inert={!isTop}
    >
      <motion.div
        className="relative size-full [transform-style:preserve-3d]"
        style={{ rotateX: tx, rotateY: ty, rotateZ: angle }}
        onPointerMove={(e) => {
          if (!isTop || e.pointerType !== "mouse") return;
          const b = e.currentTarget.getBoundingClientRect();
          const px = (e.clientX - b.left) / b.width;
          const py = (e.clientY - b.top) / b.height;
          tx.set((0.5 - py) * 10);
          ty.set((px - 0.5) * 12);
          gx.set(px * 100);
          gy.set(py * 100);
        }}
        onPointerEnter={() => setHover(true)}
        onPointerLeave={() => {
          setHover(false);
          tx.set(0);
          ty.set(0);
        }}
      >
        <motion.div
          className="relative size-full [transform-style:preserve-3d]"
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={instant ? { duration: 0 } : { type: "spring", stiffness: 120, damping: 18 }}
        >
          {/* Front: the photo in a white lab border. */}
          <button
            type="button"
            data-cursor={isTop ? "virar" : undefined}
            aria-label={isTop ? `virar a foto: ${photo.alt}` : undefined}
            tabIndex={isTop ? 0 : -1}
            onClick={(e) => {
              if (dragged.current) {
                dragged.current = false;
                e.preventDefault();
                return;
              }
              onFlip();
            }}
            onPointerDown={() => {
              dragged.current = false;
            }}
            className="absolute inset-0 block bg-flash p-[3.2%] [backface-visibility:hidden] shadow-[0_1px_2px_rgba(0,0,0,0.4),0_24px_60px_-18px_rgba(0,0,0,0.85)]"
          >
            <div ref={printRef} className="relative size-full bg-noite">
              <Image
                src={photo.image}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 82vw, 46vw"
                placeholder="blur"
                loading="eager"
                draggable={false}
                className="pointer-events-none object-cover select-none"
              />
              <DateStamp date={photo.date} className="absolute right-3 bottom-3" />
            </div>
            <motion.span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 mix-blend-soft-light"
              style={{ background: glare }}
              animate={{ opacity: hover ? 1 : 0 }}
            />
          </button>

          {/* Back: what she wrote, and the lab's stamp. */}
          <div
            aria-hidden={!flipped}
            className="absolute inset-0 flex flex-col justify-between bg-[#eee9e1] p-[7%] text-noite [backface-visibility:hidden] [transform:rotateY(180deg)] shadow-[0_24px_60px_-18px_rgba(0,0,0,0.85)]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent 0 27px, rgba(14,11,15,0.05) 27px 28px)",
            }}
          >
            <p className="font-mono text-[10px] tracking-[0.3em] text-[color:var(--asfalto-sheet)]">
              anairam 400 · revelado com flash
            </p>
            {photo.caption ? (
              <p
                lang={photo.captionLang !== "pt-BR" ? photo.captionLang : undefined}
                className="text-[clamp(1.1rem,1.9vw,2rem)] leading-[1.2] font-medium whitespace-pre-line text-balance"
              >
                {photo.caption}
              </p>
            ) : (
              <p className="font-mono text-xs text-[color:var(--asfalto-sheet)]">sem legenda.</p>
            )}
            <div className="flex items-end justify-between font-mono text-xs">
              <span className="text-[color:var(--taxi-sheet)]">{formatStamp(photo.date)}</span>
              <span className={cn("text-[color:var(--asfalto-sheet)]")}>
                {pad2(n)} / {pad2(total)}
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
