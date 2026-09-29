"use client";

import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { DateStamp } from "@/components/brand/date-stamp";
import { ReversalWord, useReversal } from "@/components/brand/use-reversal";
import { usePileKeys } from "@/components/pile/hooks";
import { LabCursor } from "@/components/lab/lab-cursor";
import { LineReveal } from "@/components/lab/line-reveal";
import { Surface } from "@/components/site/surface";
import type { Photo } from "@/content/types";
import { develop, flash, markCut } from "@/lib/flash";
import { useFlashOn } from "@/lib/flash-preference";
import { pad2 } from "@/lib/print";
import { cn } from "@/lib/utils";

/*
 * Direction B: folha de contato. The home is the contact sheet on the light
 * table: frames on a strip with sprocket holes and edge numbers. A loupe
 * reads each frame up close, a grease pencil circles the one you look at, and
 * choosing it makes the enlargement, out of a flash. The name turns as you
 * scroll the sheet.
 */

const PER_STRIP = 4;
const LOUPE = 220;
const ZOOM = 2.6;

export function BContato({ photos }: { photos: Photo[] }) {
  const reduced = useReducedMotion() ?? false;
  const flashOn = useFlashOn();
  const r = useReversal({ listen: false, liftEm: 0.5 });
  const [open, setOpen] = useState<number | null>(null);
  const [marked, setMarked] = useState<string | null>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  // The name turns as the sheet scrolls under it.
  useEffect(() => {
    const onScroll = () => {
      const p = Math.min(1, Math.max(0, window.scrollY / (window.innerHeight * 0.6)));
      r.scrub(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [r]);

  const cut = useCallback(
    (then: () => void) => {
      if (reduced || !flashOn) {
        markCut();
        then();
        return;
      }
      flash({ onPeak: then });
    },
    [flashOn, reduced],
  );

  const enlarge = (i: number, from: HTMLElement) => {
    lastFocus.current = from;
    setMarked(photos[i].slug);
    cut(() => setOpen(i));
  };
  const close = () => {
    setOpen(null);
    requestAnimationFrame(() => lastFocus.current?.focus());
  };

  const strips: Photo[][] = [];
  for (let i = 0; i < photos.length; i += PER_STRIP) strips.push(photos.slice(i, i + PER_STRIP));

  return (
    <LayoutGroup>
      <main className="relative min-h-svh bg-noite pb-[20svh] text-flash">
        <Surface light="night" />
        <LabCursor />

        {/* A runway: the name is pinned while it turns, then the sheet rises over it. */}
        <div className="relative h-[175svh]">
          <header className="sticky top-0 flex h-svh flex-col items-center justify-center gap-10 overflow-hidden">
            <h1 className="sr-only">Mariana, folha de contato</h1>
            <div className="font-display text-[25vw] leading-[0.8] font-medium tracking-[-0.02em] select-none [font-variation-settings:'opsz'_96]">
              <ReversalWord r={r} tittleVisible />
            </div>
            <p aria-hidden="true" className="font-mono text-xs tracking-[0.3em] text-[color:var(--asfalto)]">
              role ↓
            </p>
          </header>
        </div>

        <div className="relative z-20 mx-auto -mt-[38svh] flex w-[min(1320px,calc(100vw-2*var(--gutter)))] flex-col gap-10">
          {strips.map((strip, s) => (
            <FilmStrip key={s} startAt={s * PER_STRIP}>
              {strip.map((p, j) => {
                const i = s * PER_STRIP + j;
                return (
                  <Frame
                    key={p.slug}
                    photo={p}
                    n={i + 1}
                    marked={marked === p.slug}
                    hidden={open === i}
                    onOpen={(el) => enlarge(i, el)}
                    onLook={() => setMarked(p.slug)}
                  />
                );
              })}
            </FilmStrip>
          ))}
        </div>

        <AnimatePresence>
          {open !== null && (
            <Enlargement
              key="enlargement"
              photos={photos}
              index={open}
              reduced={reduced}
              onIndex={(i) =>
                cut(() => {
                  setMarked(photos[i].slug);
                  setOpen(i);
                })
              }
              onClose={close}
            />
          )}
        </AnimatePresence>
      </main>
    </LayoutGroup>
  );
}

/** A strip of 35 mm: sprocket holes above and below, edge numbers on top. */
function FilmStrip({ children, startAt }: { children: React.ReactNode; startAt: number }) {
  const sprockets =
    "repeating-linear-gradient(90deg, transparent 0 10px, rgba(246,243,238,0.14) 10px 22px, transparent 22px 34px)";
  return (
    <section className="relative bg-[#16121a] px-[1.2vw] py-9 shadow-[0_0_0_1px_rgba(246,243,238,0.06)]">
      <div aria-hidden="true" className="absolute inset-x-0 top-2.5 h-3.5" style={{ background: sprockets }} />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-2.5 h-3.5" style={{ background: sprockets }} />
      <p aria-hidden="true" className="absolute top-[26px] right-3 font-mono text-[9px] tracking-[0.35em] text-taxi/80">
        anairam 400 · {pad2(startAt + 1)}
      </p>
      <ul className="grid grid-cols-4 gap-[1.2vw] max-sm:grid-cols-2">{children}</ul>
    </section>
  );
}

function Frame({
  photo,
  n,
  marked,
  hidden,
  onOpen,
  onLook,
}: {
  photo: Photo;
  n: number;
  marked: boolean;
  hidden: boolean;
  onOpen: (el: HTMLElement) => void;
  onLook: () => void;
}) {
  const cell = useRef<HTMLButtonElement>(null);
  const [loupe, setLoupe] = useState<{ x: number; y: number; w: number; h: number } | null>(null);

  return (
    <li className="relative">
      <p aria-hidden="true" className="mb-1.5 font-mono text-[9px] tracking-[0.3em] text-taxi/90">
        ▸ {n} &nbsp; {n}A
      </p>
      <button
        ref={cell}
        type="button"
        data-cursor="ampliar"
        aria-label={`ampliar foto ${n}: ${photo.alt}`}
        onClick={(e) => onOpen(e.currentTarget)}
        onPointerEnter={onLook}
        onFocus={onLook}
        onPointerMove={(e) => {
          if (e.pointerType !== "mouse") return;
          const b = e.currentTarget.getBoundingClientRect();
          setLoupe({ x: e.clientX - b.left, y: e.clientY - b.top, w: b.width, h: b.height });
        }}
        onPointerLeave={() => setLoupe(null)}
        className="relative block aspect-[4/5] w-full"
      >
        {!hidden && (
          <motion.div layoutId={`frame-${photo.slug}`} className="absolute inset-0 overflow-hidden bg-noite">
            <Image
              src={photo.image}
              alt=""
              fill
              sizes="(max-width: 640px) 50vw, 25vw"
              placeholder="blur"
              className="object-cover"
            />
          </motion.div>
        )}
        <GreasePencil show={marked} />
        {loupe && <Loupe photo={photo} {...loupe} />}
      </button>
    </li>
  );
}

/** The circle a grease pencil draws round the chosen frame, in Rosa. */
function GreasePencil({ show }: { show: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 125"
      preserveAspectRatio="none"
      className="pointer-events-none absolute -inset-[7%] z-10 size-[114%] overflow-visible"
    >
      <AnimatePresence>
        {show && (
          <motion.path
            d="M52 4 C 84 3, 99 22, 97 60 C 96 98, 80 121, 49 121 C 16 121, 3 99, 4 61 C 5 27, 20 6, 57 7"
            fill="none"
            stroke="var(--rosa)"
            strokeWidth="3"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0, opacity: 1 }}
            animate={{ pathLength: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
          />
        )}
      </AnimatePresence>
    </svg>
  );
}

/** A photographer's loupe: the frame at 2.6×, under a rim with tick marks. */
function Loupe({ photo, x, y, w, h }: { photo: Photo; x: number; y: number; w: number; h: number }) {
  const src = `/_next/image?url=${encodeURIComponent(photo.image.src)}&w=1080&q=75`;
  // The cell crops the photo to 4:5 (cover), so map through the same crop.
  const cover = Math.max(w / photo.image.width, h / photo.image.height);
  const iw = photo.image.width * cover * ZOOM;
  const ih = photo.image.height * cover * ZOOM;
  const ox = (iw - w * ZOOM) / 2;
  const oy = (ih - h * ZOOM) / 2;
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute z-20 block overflow-hidden rounded-full shadow-[0_0_0_1px_var(--flash),0_20px_50px_-10px_rgba(0,0,0,0.8)]"
      style={{
        width: LOUPE,
        height: LOUPE,
        left: x - LOUPE / 2,
        top: y - LOUPE / 2,
        backgroundImage: `url("${src}")`,
        backgroundSize: `${iw}px ${ih}px`,
        backgroundPosition: `${-(x * ZOOM + ox - LOUPE / 2)}px ${-(y * ZOOM + oy - LOUPE / 2)}px`,
        backgroundColor: "var(--noite)",
      }}
    >
      <span
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "repeating-conic-gradient(from 0deg, rgba(246,243,238,0.7) 0 0.6deg, transparent 0.6deg 10deg)",
          mask: "radial-gradient(circle, transparent 0 calc(50% - 7px), #000 calc(50% - 7px))",
        }}
      />
    </span>
  );
}

/** The enlargement: the frame grows off the sheet into a print. */
function Enlargement({
  photos,
  index,
  reduced,
  onIndex,
  onClose,
}: {
  photos: Photo[];
  index: number;
  reduced: boolean;
  onIndex: (i: number) => void;
  onClose: () => void;
}) {
  const photo = photos[index];
  const total = photos.length;
  const closeRef = useRef<HTMLButtonElement>(null);
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [onClose]);

  useEffect(() => {
    develop(printRef.current);
  }, [index]);

  usePileKeys({
    next: () => onIndex((index + 1) % total),
    prev: () => onIndex((index - 1 + total) % total),
    first: () => onIndex(0),
    last: () => onIndex(total - 1),
  });

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`foto ${index + 1} de ${total}`}
      className="fixed inset-0 z-30 grid grid-cols-[1fr_minmax(260px,28vw)] gap-[var(--gutter)] bg-noite/95 p-[var(--gutter)] backdrop-blur-sm max-sm:grid-cols-1 max-sm:grid-rows-[1fr_auto]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: reduced ? 0 : 0.25 } }}
      transition={{ duration: reduced ? 0 : 0.2 }}
    >
      <div className="relative min-h-0" data-cursor="fechar" onClick={onClose}>
        <motion.div
          layoutId={`frame-${photo.slug}`}
          ref={printRef}
          className="absolute inset-0 m-auto bg-noite"
          style={{
            aspectRatio: `${photo.image.width} / ${photo.image.height}`,
            maxWidth: "100%",
            maxHeight: "100%",
            height: "100%",
          }}
          transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 160, damping: 26 }}
        >
          <Image src={photo.image} alt={photo.alt} fill sizes="70vw" placeholder="blur" className="object-contain" />
          <DateStamp date={photo.date} className="absolute right-3 bottom-3" />
        </motion.div>
      </div>

      <aside className="flex flex-col justify-between gap-8 text-flash">
        <div className="flex items-start justify-between font-mono text-xs text-[color:var(--asfalto)]">
          <span>
            {pad2(index + 1)} / {pad2(total)}
          </span>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="inline-flex min-h-11 items-center px-2 hover:text-[color:var(--rosa)]"
          >
            voltar à folha
          </button>
        </div>
        {photo.caption && (
          <LineReveal
            text={photo.caption}
            lang={photo.captionLang !== "pt-BR" ? photo.captionLang : undefined}
            revealKey={photo.slug}
            instant={reduced}
            className="text-[clamp(1.25rem,2vw,2.25rem)] leading-[1.15] font-medium"
          />
        )}
        <div className="flex gap-2 font-mono text-xs">
          <button
            type="button"
            onClick={() => onIndex((index - 1 + total) % total)}
            className={cn("inline-flex min-h-11 items-center px-2 hover:text-[color:var(--rosa)]")}
          >
            ← anterior
          </button>
          <button
            type="button"
            onClick={() => onIndex((index + 1) % total)}
            className="inline-flex min-h-11 items-center px-2 hover:text-[color:var(--rosa)]"
          >
            próxima →
          </button>
        </div>
      </aside>
    </motion.div>
  );
}
