"use client";

import Image, { type ImageProps, type StaticImageData } from "next/image";
import { useEffect, useState, type ComponentType } from "react";

import type { RippleDistortionProps } from "@/components/react-bits/ripple-distortion";
import { cn } from "@/lib/utils";

/*
 * A photo with React Bits' RippleDistortion over it on hover. The real
 * <img> stays underneath (first paint, no-JS, alt text, LCP) and the canvas
 * takes over once its texture is drawn. The ripple distorts her photo but
 * never recolours it: no grayscale, no tint. Fine pointers, ≥ 768 px and
 * motion allowed only; everywhere else it's the plain photo, and the WebGL
 * code (ogl) is never downloaded.
 */

const WIDTHS = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];

function optimized(src: string, px: number) {
  const w = WIDTHS.find((x) => x >= px) ?? 3840;
  return `/_next/image?url=${encodeURIComponent(src)}&w=${w}&q=75`;
}

type Props = Omit<ImageProps, "fill" | "src"> & {
  src: StaticImageData;
  /** Rough rendered width in CSS px, to pick the texture size. */
  widthHint?: number;
  ripple?: Partial<RippleDistortionProps>;
};

export function RippleImage({ src, alt, className, widthHint = 600, ripple, ...image }: Props) {
  const [texture, setTexture] = useState<string | null>(null);
  const [Ripple, setRipple] = useState<ComponentType<RippleDistortionProps> | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const ok =
      window.matchMedia("(pointer: fine) and (min-width: 768px)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!ok) return;
    const px = widthHint * Math.min(window.devicePixelRatio || 1, 2);
    // Loaded on demand so the photo paints first; the effect is an enhancement.
    let alive = true;
    import("@/components/react-bits/ripple-distortion").then((m) => {
      if (!alive) return;
      setRipple(() => m.default);
      setTexture(optimized(src.src, px));
    });
    return () => {
      alive = false;
    };
  }, [src.src, widthHint]);

  return (
    <div className="relative size-full overflow-hidden">
      <Image src={src} alt={alt} fill className={cn("object-cover", className)} {...image} />
      {texture && Ripple && (
        <Ripple
          src={texture}
          brushSize={150}
          strength={0.2}
          swirl={1}
          rings={4}
          grayscale={false}
          tintAmount={0}
          {...ripple}
          onReady={() => setReady(true)}
          className={cn("!absolute inset-0 transition-opacity duration-300", ready ? "opacity-100" : "opacity-0")}
        />
      )}
    </div>
  );
}
