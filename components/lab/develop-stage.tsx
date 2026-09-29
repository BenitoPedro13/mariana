"use client";

import { animate } from "motion/react";
import Image, { type StaticImageData } from "next/image";
import { Mesh, Program, Renderer, Texture, Triangle } from "ogl";
import { useEffect, useRef, useState } from "react";

import { flash } from "@/lib/flash";
import { cn } from "@/lib/utils";

/*
 * The develop: the print comes up out of white paper the way it does in the
 * tray. Shadows first, then midtones, highlights last, with a little warm
 * halation and grain while it's still wet. At rest (uT = 1) the shader returns
 * the photo's own pixels: no filter, no grade.
 */

const vertex = /* glsl */ `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = /* glsl */ `
precision highp float;
uniform sampler2D uTex;
uniform vec2 uRes;
uniform vec2 uImg;
uniform float uT;
uniform float uTime;
uniform vec3 uPaper;
varying vec2 vUv;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

void main() {
  float ca = uRes.x / uRes.y;
  float ia = uImg.x / uImg.y;
  vec2 s = ca > ia ? vec2(ca / ia, 1.0) : vec2(1.0, ia / ca);
  vec2 uv = (vUv - 0.5) * s + 0.5;
  if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
    gl_FragColor = vec4(0.0);
    return;
  }

  float d = 1.0 - uT;
  float ab = d * d * 0.012;
  vec3 c;
  c.r = texture2D(uTex, uv + vec2(ab, 0.0)).r;
  c.g = texture2D(uTex, uv).g;
  c.b = texture2D(uTex, uv - vec2(ab, 0.0)).b;

  // Each pixel resolves once the develop passes its own brightness.
  float l = dot(c, vec3(0.299, 0.587, 0.114));
  float k = smoothstep(l - 0.22, l + 0.22, uT * 1.5 - 0.12);
  vec3 col = mix(uPaper, c, k);

  // Halation: highlights bleed warm while the print is still coming up.
  vec3 h = vec3(0.0);
  for (int i = 0; i < 8; i++) {
    float a = float(i) * 0.785398;
    vec2 o = vec2(cos(a), sin(a) * ia) * 0.012;
    h += max(texture2D(uTex, uv + o).rgb - 0.72, 0.0);
  }
  col += d * (h / 8.0) * vec3(1.0, 0.32, 0.18) * 2.2;

  col += (hash(vUv * uRes + fract(uTime) * 97.0) - 0.5) * 0.09 * d;
  gl_FragColor = vec4(col, 1.0);
}
`;

type StagePhoto = { image: StaticImageData; alt: string; slug: string };

const WIDTHS = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];

function optimized(src: string, px: number) {
  const w = WIDTHS.find((x) => x >= px) ?? 3840;
  return `/_next/image?url=${encodeURIComponent(src)}&w=${w}&q=75`;
}

export function DevelopStage({
  photos,
  index,
  developing,
  className,
  developMs = 1300,
  sizes = "60vw",
  expose = false,
}: {
  photos: StagePhoto[];
  index: number;
  /** Develop out of white for this change (false: a plain cut). */
  developing: boolean;
  className?: string;
  developMs?: number;
  sizes?: string;
  /** First exposure: the first print also comes up out of a flash. */
  expose?: boolean;
}) {
  const firstRun = useRef(true);
  const wrap = useRef<HTMLDivElement>(null);
  const gl = useRef<{
    renderer: Renderer;
    program: Program;
    mesh: Mesh;
    textures: Map<number, Promise<Texture>>;
    draw: () => void;
    width: number;
  } | null>(null);
  const [ready, setReady] = useState(false);
  const photo = photos[index];

  // Set up once: renderer, one full-screen triangle, a resize observer.
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    let renderer: Renderer;
    try {
      renderer = new Renderer({ alpha: true, dpr: Math.min(window.devicePixelRatio, 2) });
    } catch {
      return; // No WebGL: the <Image> underneath stays the photo.
    }
    const context = renderer.gl;
    context.clearColor(0, 0, 0, 0);
    const canvas = context.canvas as HTMLCanvasElement;
    canvas.setAttribute("aria-hidden", "true");
    canvas.className = "absolute inset-0 size-full";
    el.appendChild(canvas);

    const program = new Program(context, {
      vertex,
      fragment,
      transparent: true,
      uniforms: {
        uTex: { value: new Texture(context) },
        uRes: { value: [1, 1] },
        uImg: { value: [1, 1] },
        uT: { value: 1 },
        uTime: { value: 0 },
        uPaper: { value: [0.965, 0.953, 0.933] },
      },
    });
    const mesh = new Mesh(context, { geometry: new Triangle(context), program });
    const draw = () => renderer.render({ scene: mesh });

    const state = { renderer, program, mesh, textures: new Map(), draw, width: 1 };
    gl.current = state;

    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      renderer.setSize(width, height);
      program.uniforms.uRes.value = [width * renderer.dpr, height * renderer.dpr];
      state.width = width * renderer.dpr;
      draw();
    });
    ro.observe(el);

    return () => {
      ro.disconnect();
      canvas.remove();
      context.getExtension("WEBGL_lose_context")?.loseContext();
      gl.current = null;
    };
  }, []);

  // Each change: load (and cache) the texture, then develop or cut.
  useEffect(() => {
    const g = gl.current;
    if (!g) return;
    const context = g.renderer.gl;

    const load = (i: number) => {
      const cached = g.textures.get(i);
      if (cached) return cached;
      const p = photos[i];
      const promise = new Promise<Texture>((resolve, reject) => {
        const img = new window.Image();
        img.decoding = "async";
        img.src = optimized(p.image.src, Math.max(g.width, 800));
        img
          .decode()
          .then(() =>
            resolve(
              new Texture(context, {
                image: img,
                generateMipmaps: false,
                minFilter: context.LINEAR,
                magFilter: context.LINEAR,
              }),
            ),
          )
          .catch(reject);
      });
      g.textures.set(i, promise);
      return promise;
    };

    let stopped = false;
    let run: ReturnType<typeof animate> | undefined;
    load(index)
      .then((tex) => {
        if (stopped) return;
        const u = g.program.uniforms;
        u.uTex.value = tex;
        u.uImg.value = [photos[index].image.width, photos[index].image.height];
        const first = firstRun.current;
        firstRun.current = false;
        const start = () => {
          run = animate(0, 1, {
            duration: developMs / 1000,
            ease: [0.3, 0.1, 0.2, 1],
            onUpdate: (v) => {
              u.uT.value = v;
              u.uTime.value = performance.now() / 1000;
              g.draw();
            },
          });
        };
        if (first && expose) {
          // Hold the old frame (the <Image>) until the white covers the swap.
          flash({
            delay: 0.15,
            onPeak: () => {
              if (stopped) return;
              setReady(true);
              u.uT.value = 0;
              g.draw();
              start();
            },
          });
          return;
        }
        setReady(true);
        if (!developing) {
          u.uT.value = 1;
          g.draw();
          return;
        }
        start();
      })
      .catch(() => setReady(false));

    // The neighbours are one flick away.
    const n = photos.length;
    load((index + 1) % n).catch(() => {});
    load((index - 1 + n) % n).catch(() => {});

    return () => {
      stopped = true;
      run?.complete();
    };
  }, [index, developing, developMs, expose, photos]);

  return (
    <div ref={wrap} className={cn("relative", className)}>
      {/* The real image: first paint, no-JS, no-WebGL, and the alt text. */}
      <Image
        src={photo.image}
        alt={photo.alt}
        fill
        sizes={sizes}
        placeholder="blur"
        preload={index === 0}
        className={cn("object-contain transition-none", ready && "opacity-0")}
      />
    </div>
  );
}
