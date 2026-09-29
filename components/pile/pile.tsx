"use client";

import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type PanInfo,
  type Variants,
} from "motion/react";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";

import { DateStamp } from "@/components/brand/date-stamp";
import { FrameCounter } from "@/components/brand/frame-counter";
import { Caption } from "@/components/pile/caption";
import {
  setSurface,
  useFirstExposure,
  usePileKeys,
  useWheelStep,
} from "@/components/pile/hooks";
import { Button } from "@/components/ui/button";
import type { Photo } from "@/content/photos";
import { develop, flash, markCut } from "@/lib/flash";
import { useFlashOn } from "@/lib/flash-preference";
import { frameFromSearch, pad2, restingAngle } from "@/lib/print";

/** Prints on the table: the active one plus two peeking out underneath. */
const STACK = 3;

type Vec = { x: number; y: number };

/**
 * The last cut. `to` is where the print that left the top went (read by the
 * exit animation). `enter` is where a print brought back by "anterior" comes
 * from: the side it left by.
 */
type Exit = {
  dir: "next" | "prev";
  to: Vec;
  enter?: Vec;
  flung: boolean;
  instant: boolean;
};

const THROW_SPRING = { type: "spring", stiffness: 260, damping: 30 } as const;
const SLIDE = { duration: 0.38, ease: [0.3, 0, 0, 1] } as const;

const printVariants: Variants = {
  rest: (instant: boolean) => ({
    x: 0,
    y: 0,
    transition: instant ? { duration: 0 } : THROW_SPRING,
  }),
  exit: (e: Exit) =>
    e.dir === "prev" || e.instant
      ? { opacity: 0, transition: { duration: 0 } }
      : {
          x: e.to.x,
          y: e.to.y,
          zIndex: 20,
          transition: e.flung ? THROW_SPRING : SLIDE,
        },
};

function offTable(dir: Vec): Vec {
  const len = Math.hypot(dir.x, dir.y) || 1;
  const reach = Math.max(window.innerWidth, window.innerHeight) * 1.3;
  return { x: (dir.x / len) * reach, y: (dir.y / len) * reach };
}

const noSubscribe = () => () => {};

/** `?f=07` opens on the seventh print. The server renders the first. */
function useStartFrame(total: number) {
  const search = useSyncExternalStore(
    noSubscribe,
    () => window.location.search,
    () => "",
  );
  return frameFromSearch(search, total);
}

function announce(photo: Photo, i: number, total: number) {
  const caption = photo.caption ? ` legenda: ${photo.caption}` : "";
  return `foto ${i + 1} de ${total}. ${photo.alt}.${caption}`;
}

export function Pile({ photos }: { photos: Photo[] }) {
  const total = photos.length;
  const reduced = useReducedMotion() ?? false;
  const flashOn = useFlashOn();

  // `top` moves at once, so the throw starts on input. `shown` (surface,
  // counter, caption) changes while the screen is white. Both start at the
  // frame in the URL until the first cut.
  const start = useStartFrame(total);
  const [topState, setTop] = useState<number | null>(null);
  const [shownState, setShown] = useState<number | null>(null);
  const top = topState ?? start;
  const shown = shownState ?? start;
  const [exit, setExit] = useState<Exit>({
    dir: "next",
    to: { x: 0, y: 0 },
    flung: false,
    instant: true,
  });
  const [live, setLive] = useState("");

  const topRef = useRef<number | null>(null);
  const leftTo = useRef(new Map<string, Vec>());
  const stage = useRef<HTMLDivElement>(null);
  const topPrint = useRef<HTMLDivElement | null>(null);

  const show = useCallback(
    (i: number) => {
      setShown(i);
      setSurface(photos[i].light);
      setLive(announce(photos[i], i, total));
      window.history.replaceState(null, "", `?f=${pad2(i + 1)}`);
    },
    [photos, total],
  );

  const go = useCallback(
    (target: number, dir: "next" | "prev", fling?: Vec) => {
      const from = topRef.current ?? start;
      if (target === from) return;
      topRef.current = target;

      const to = offTable(fling ?? { x: -1, y: -0.08 });
      if (dir === "next") leftTo.current.set(photos[from].slug, to);
      const enter =
        dir === "prev"
          ? (leftTo.current.get(photos[target].slug) ?? offTable({ x: -1, y: 0 }))
          : undefined;
      setExit({ dir, to, enter, flung: Boolean(fling), instant: reduced });
      setTop(target);

      if (reduced || !flashOn) {
        markCut();
        show(target);
        return;
      }
      flash({
        delay: 0.04,
        onPeak: (flashed) => {
          // Always the print on top now: a later, unflashed cut may have
          // moved past this one's target while the screen was rising.
          show(topRef.current ?? target);
          if (flashed) develop(topPrint.current);
        },
      });
    },
    [flashOn, photos, reduced, show, start],
  );

  const next = useCallback(
    (fling?: Vec) => go(((topRef.current ?? start) + 1) % total, "next", fling),
    [go, start, total],
  );
  const prev = useCallback(
    () => go(((topRef.current ?? start) - 1 + total) % total, "prev"),
    [go, start, total],
  );

  usePileKeys({
    next: () => next(),
    prev,
    first: () => go(0, "prev"),
    last: () => go(total - 1, "next"),
  });
  useWheelStep(stage, (d) => (d > 0 ? next() : prev()));
  useFirstExposure(topPrint);

  // The room follows the photo on screen, and goes back to Noite on the way out.
  useEffect(() => {
    setSurface(photos[shown].light);
  }, [photos, shown]);
  useEffect(() => () => setSurface("night"), []);

  const stack = Array.from({ length: Math.min(STACK, total) }, (_, d) => ({
    photo: photos[(top + d) % total],
    depth: d,
  }));
  const current = photos[shown];
  const prevSlug = photos[(shown - 1 + total) % total].slug;
  const nextSlug = photos[(shown + 1) % total].slug;

  return (
    <section aria-label="fotos" className="flex flex-1 flex-col">
      <div
        ref={stage}
        data-pile-stage
        className="relative mx-auto h-[62svh] w-full [container-type:size] sm:h-[72svh]"
      >
        <AnimatePresence initial={false} custom={exit}>
          {stack.map(({ photo, depth }) => (
            <PrintCard
              key={photo.slug}
              photo={photo}
              depth={depth}
              instant={reduced}
              enterFrom={depth === 0 && !reduced ? exit.enter : undefined}
              printRef={depth === 0 ? topPrint : undefined}
              onFling={next}
              stageRef={stage}
            />
          ))}
        </AnimatePresence>
      </div>

      <div className="order-3 mt-auto flex items-center justify-between pt-4 sm:order-2 sm:mt-6 sm:pt-0">
        <FrameCounter current={shown + 1} total={total} />
        <div className="flex gap-2">
          <Button
            nativeButton={false}
            render={<Link href={`/foto/${prevSlug}`} />}
            onClick={(e) => {
              e.preventDefault();
              prev();
            }}
          >
            <span aria-hidden="true">←</span> anterior
          </Button>
          <Button
            nativeButton={false}
            render={<Link href={`/foto/${nextSlug}`} />}
            onClick={(e) => {
              e.preventDefault();
              next();
            }}
          >
            próxima <span aria-hidden="true">→</span>
          </Button>
        </div>
      </div>

      <Caption photo={current} className="order-2 mt-4 min-h-[1lh] sm:order-3 sm:mt-2" />

      <p aria-live="polite" aria-atomic="true" className="sr-only">
        {live}
      </p>
    </section>
  );
}

function PrintCard({
  photo,
  depth,
  instant,
  enterFrom,
  printRef,
  onFling,
  stageRef,
}: {
  photo: Photo;
  depth: number;
  instant: boolean;
  enterFrom?: Vec;
  printRef?: React.RefObject<HTMLDivElement | null>;
  onFling: (to: Vec) => void;
  stageRef: React.RefObject<HTMLDivElement | null>;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  // The print tilts the way it's pulled, and keeps tilting as it flies.
  const tilt = useTransform(x, [-900, 0, 900], [-16, 0, 16]);
  const dragged = useRef(false);
  const { width, height } = photo.image;
  const ratio = width / height;
  const isTop = depth === 0;

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const box = stageRef.current?.getBoundingClientRect();
    const w = box?.width ?? window.innerWidth;
    const h = box?.height ?? window.innerHeight;
    const { offset, velocity } = info;
    const far = Math.abs(offset.x) > w * 0.25 || Math.abs(offset.y) > h * 0.25;
    const fast = Math.hypot(velocity.x, velocity.y) > 650;
    if (!far && !fast) return; // springs back to the pile
    onFling(fast ? velocity : offset);
  };

  return (
    <motion.div
      className="absolute inset-0 m-auto"
      style={{
        x,
        y,
        rotate: tilt,
        zIndex: 10 - depth,
        width: `min(100cqw, calc(100cqh * ${ratio}))`,
        height: `min(100cqh, calc(100cqw / ${ratio}))`,
        touchAction: isTop ? "none" : undefined,
      }}
      custom={instant}
      variants={printVariants}
      initial={enterFrom ? { x: enterFrom.x, y: enterFrom.y } : false}
      animate="rest"
      exit="exit"
      drag={isTop}
      dragSnapToOrigin
      dragElastic={1}
      onDragStart={() => {
        dragged.current = true;
      }}
      onDragEnd={onDragEnd}
      inert={!isTop}
    >
      <div
        ref={printRef}
        className="relative size-full bg-noite shadow-[0_0_0_1px_var(--hairline)]"
        style={{ transform: `rotate(${restingAngle(photo.slug)}deg)` }}
      >
        <Link
          href={`/foto/${photo.slug}`}
          data-print
          draggable={false}
          className="block size-full"
          onClick={(e) => {
            if (!dragged.current) return;
            e.preventDefault();
            dragged.current = false;
          }}
          onPointerDown={() => {
            dragged.current = false;
          }}
        >
          <Image
            src={photo.image}
            alt={photo.alt}
            fill
            sizes="(max-width: 640px) 100vw, 60vw"
            placeholder="blur"
            loading="eager"
            fetchPriority={isTop ? "high" : "auto"}
            draggable={false}
            className="pointer-events-none object-contain select-none"
          />
        </Link>
        <DateStamp date={photo.date} className="absolute right-3 bottom-3" />
      </div>
    </motion.div>
  );
}
