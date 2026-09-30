"use client";

import { animate, type AnimationPlaybackControls } from "motion/react";
import Image, { type StaticImageData } from "next/image";
import { Mesh, Program, Renderer, Texture, Triangle } from "ogl";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

import { cn } from "@/lib/utils";

/*
 * The morph cut: one photo turns into the next inside the same print.
 *
 * - derreter: each photo displaces the other by its own brightness, so the
 *   bright parts of one flow into the bright parts of the next.
 * - onda: a ring runs out from where you touched, and the next photo is
 *   behind it.
 * - fatias: the print is cut into strips that slide past each other.
 *
 * While you hold the print it goes wet: the image ripples under the finger.
 * At rest (progress 0, not wet) the shader returns the photo's own pixels.
 */

export type MorphMode = "derreter" | "onda" | "fatias";
const MODE_ID: Record<MorphMode, number> = { derreter: 0, onda: 1, fatias: 2 };

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
uniform sampler2D uA;
uniform sampler2D uB;
uniform vec2 uImgA;
uniform vec2 uImgB;
uniform vec2 uRes;
uniform float uP;
uniform float uMode;
uniform vec2 uOrigin;
uniform vec2 uDir;
uniform vec2 uPtr;
uniform float uWet;
uniform float uTime;
varying vec2 vUv;

vec2 cover(vec2 uv, vec2 img) {
  float ca = uRes.x / uRes.y;
  float ia = img.x / img.y;
  vec2 s = ca > ia ? vec2(1.0, ia / ca) : vec2(ca / ia, 1.0);
  return (uv - 0.5) * s + 0.5;
}

float luma(vec3 c) { return dot(c, vec3(0.299, 0.587, 0.114)); }
float hash(float n) { return fract(sin(n) * 43758.5453); }

vec3 sampleA(vec2 uv) { return texture2D(uA, clamp(cover(uv, uImgA), 0.0, 1.0)).rgb; }
vec3 sampleB(vec2 uv) { return texture2D(uB, clamp(cover(uv, uImgB), 0.0, 1.0)).rgb; }

void main() {
  vec2 uv = vUv;
  float aspect = uRes.x / uRes.y;

  // Wet print: a ripple around the finger while it holds the print.
  if (uWet > 0.001) {
    vec2 d = (uv - uPtr) * vec2(aspect, 1.0);
    float r = length(d);
    float ring = sin(r * 30.0 - uTime * 7.0) * exp(-r * r * 5.0);
    uv += normalize(d + 1e-5) / vec2(aspect, 1.0) * ring * 0.022 * uWet;
  }

  float p = uP;
  float mid = p * (1.0 - p) * 4.0; // 0 at the ends, 1 halfway
  vec3 col;

  if (uMode < 0.5) {
    // derreter
    float lA = luma(sampleA(uv));
    float lB = luma(sampleB(uv));
    vec2 flowA = uv + uDir * p * (0.12 + lB * 0.35);
    vec2 flowB = uv - uDir * (1.0 - p) * (0.12 + lA * 0.35);
    float k = smoothstep(0.0, 1.0, (p - 0.5) * 2.2 + 0.5 + (lB - lA) * 0.6 * mid);
    float ab = mid * 0.01;
    vec3 a = vec3(sampleA(flowA + vec2(ab, 0.0)).r, sampleA(flowA).g, sampleA(flowA - vec2(ab, 0.0)).b);
    vec3 b = vec3(sampleB(flowB + vec2(ab, 0.0)).r, sampleB(flowB).g, sampleB(flowB - vec2(ab, 0.0)).b);
    col = mix(a, b, clamp(k, 0.0, 1.0));
  } else if (uMode < 1.5) {
    // onda
    vec2 d = (uv - uOrigin) * vec2(aspect, 1.0);
    float r = length(d);
    float front = p * 1.9;
    float edge = r - front;
    vec2 n = normalize(d + 1e-5) / vec2(aspect, 1.0);
    float wave = exp(-edge * edge * 90.0) * 0.06;
    vec2 w = uv + n * wave * sin(edge * 70.0);
    float ab = wave * 0.35;
    vec3 a = vec3(sampleA(w + n * ab).r, sampleA(w).g, sampleA(w - n * ab).b);
    vec3 b = vec3(sampleB(w + n * ab).r, sampleB(w).g, sampleB(w - n * ab).b);
    col = mix(b, a, smoothstep(-0.015, 0.015, edge));
  } else {
    // fatias
    float strips = 11.0;
    float s = floor(uv.y * strips);
    float delay = hash(s + 3.1) * 0.45;
    float sp = clamp((p - delay) / (1.0 - 0.45), 0.0, 1.0);
    sp = sp * sp * (3.0 - 2.0 * sp);
    float dir = uDir.x >= 0.0 ? 1.0 : -1.0;
    vec2 ua = uv + vec2(sp * 1.05 * dir, 0.0);
    vec2 ub = uv - vec2((1.0 - sp) * 1.05 * dir, 0.0);
    bool inB = ub.x >= 0.0 && ub.x <= 1.0;
    bool inA = ua.x >= 0.0 && ua.x <= 1.0;
    col = inB ? sampleB(ub) : (inA ? sampleA(ua) : vec3(0.055, 0.043, 0.059));
  }

  gl_FragColor = vec4(col, 1.0);
}
`;

type StagePhoto = { image: StaticImageData; alt: string; slug: string };

const WIDTHS = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];
function optimized(src: string, px: number) {
  const w = WIDTHS.find((x) => x >= px) ?? 3840;
  return `/_next/image?url=${encodeURIComponent(src)}&w=${w}&q=75`;
}

export type MorphStageHandle = {
  /** Morph to `to`. `onMidpoint` runs halfway (surface, caption, counter). */
  cut: (
    to: number,
    opts: { mode: MorphMode; dir: [number, number]; origin?: [number, number]; ms?: number },
  ) => Promise<void>;
  /** Jump straight to `to` (reduced motion, or no WebGL). */
  set: (to: number) => void;
  /** Wet print: pointer in 0..1 print space, amount 0..1. */
  wet: (ptr: [number, number] | null) => void;
};

export const MorphStage = forwardRef<
  MorphStageHandle,
  { photos: StagePhoto[]; initial: number; className?: string; sizes?: string }
>(function MorphStage({ photos, initial, className, sizes = "56vw" }, ref) {
  const wrap = useRef<HTMLDivElement>(null);
  const gl = useRef<{
    program: Program;
    draw: () => void;
    load: (i: number) => Promise<Texture>;
    context: Renderer["gl"];
  } | null>(null);
  const current = useRef(initial);
  const running = useRef<AnimationPlaybackControls | null>(null);
  const wetState = useRef({ amount: 0, target: 0, raf: 0 });
  const [ready, setReady] = useState(false);
  const [fallback, setFallback] = useState(initial);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    let renderer: Renderer;
    try {
      renderer = new Renderer({ dpr: Math.min(window.devicePixelRatio, 2) });
    } catch {
      return;
    }
    const context = renderer.gl;
    const canvas = context.canvas as HTMLCanvasElement;
    canvas.setAttribute("aria-hidden", "true");
    canvas.className = "absolute inset-0 size-full";
    el.appendChild(canvas);

    const blank = new Texture(context);
    const program = new Program(context, {
      vertex,
      fragment,
      uniforms: {
        uA: { value: blank },
        uB: { value: blank },
        uImgA: { value: [1, 1] },
        uImgB: { value: [1, 1] },
        uRes: { value: [1, 1] },
        uP: { value: 0 },
        uMode: { value: 0 },
        uOrigin: { value: [0.5, 0.5] },
        uDir: { value: [1, 0] },
        uPtr: { value: [0.5, 0.5] },
        uWet: { value: 0 },
        uTime: { value: 0 },
      },
    });
    const mesh = new Mesh(context, { geometry: new Triangle(context), program });
    const draw = () => {
      program.uniforms.uTime.value = performance.now() / 1000;
      renderer.render({ scene: mesh });
    };

    const cache = new Map<number, Promise<Texture>>();
    let width = 800;
    const load = (i: number) => {
      const hit = cache.get(i);
      if (hit) return hit;
      const promise = new Promise<Texture>((resolve, reject) => {
        const img = new window.Image();
        img.decoding = "async";
        img.src = optimized(photos[i].image.src, width);
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
      cache.set(i, promise);
      return promise;
    };

    gl.current = { program, draw, load, context };

    const ro = new ResizeObserver(([entry]) => {
      const { width: w, height: h } = entry.contentRect;
      renderer.setSize(w, h);
      program.uniforms.uRes.value = [w * renderer.dpr, h * renderer.dpr];
      width = Math.max(800, w * renderer.dpr);
      draw();
    });
    ro.observe(el);

    load(current.current)
      .then((tex) => {
        const u = program.uniforms;
        u.uA.value = tex;
        u.uB.value = tex;
        const p = photos[current.current].image;
        u.uImgA.value = [p.width, p.height];
        u.uImgB.value = [p.width, p.height];
        u.uP.value = 0;
        draw();
        setReady(true);
      })
      .catch(() => {});
    const n = photos.length;
    load((current.current + 1) % n).catch(() => {});

    const wet = wetState.current;
    return () => {
      ro.disconnect();
      cancelAnimationFrame(wet.raf);
      canvas.remove();
      context.getExtension("WEBGL_lose_context")?.loseContext();
      gl.current = null;
    };
  }, [photos]);

  useImperativeHandle(
    ref,
    () => ({
      async cut(to, { mode, dir, origin = [0.5, 0.5], ms = 1100 }) {
        const g = gl.current;
        setFallback(to);
        if (!g) {
          current.current = to;
          return;
        }
        running.current?.complete();
        const u = g.program.uniforms;
        const [texA, texB] = await Promise.all([g.load(current.current), g.load(to)]);
        const a = photos[current.current].image;
        const b = photos[to].image;
        u.uA.value = texA;
        u.uB.value = texB;
        u.uImgA.value = [a.width, a.height];
        u.uImgB.value = [b.width, b.height];
        u.uMode.value = MODE_ID[mode];
        u.uDir.value = dir;
        u.uOrigin.value = origin;
        current.current = to;
        const n = photos.length;
        g.load((to + 1) % n).catch(() => {});
        g.load((to - 1 + n) % n).catch(() => {});

        const run = animate(0, 1, {
          duration: ms / 1000,
          ease: [0.65, 0, 0.25, 1],
          onUpdate: (v) => {
            u.uP.value = v;
            g.draw();
          },
        });
        running.current = run;
        await run.finished;
        // Settle on B alone so the rest state is exactly the photo.
        u.uA.value = texB;
        u.uImgA.value = [b.width, b.height];
        u.uP.value = 0;
        g.draw();
      },
      set(to) {
        setFallback(to);
        current.current = to;
        const g = gl.current;
        if (!g) return;
        running.current?.complete();
        g.load(to)
          .then((tex) => {
            const u = g.program.uniforms;
            const p = photos[to].image;
            u.uA.value = tex;
            u.uB.value = tex;
            u.uImgA.value = [p.width, p.height];
            u.uImgB.value = [p.width, p.height];
            u.uP.value = 0;
            g.draw();
          })
          .catch(() => {});
      },
      wet(ptr) {
        const g = gl.current;
        if (!g) return;
        const w = wetState.current;
        w.target = ptr ? 1 : 0;
        if (ptr) g.program.uniforms.uPtr.value = [ptr[0], 1 - ptr[1]];
        if (w.raf) return;
        const tick = () => {
          // Wets slowly under the finger, dries fast when you let go.
          w.amount += (w.target - w.amount) * (w.target > w.amount ? 0.12 : 0.3);
          g.program.uniforms.uWet.value = w.amount;
          g.draw();
          if (Math.abs(w.target - w.amount) > 0.002 || w.target > 0) {
            w.raf = requestAnimationFrame(tick);
          } else {
            w.amount = 0;
            g.program.uniforms.uWet.value = 0;
            g.draw();
            w.raf = 0;
          }
        };
        w.raf = requestAnimationFrame(tick);
      },
    }),
    [photos],
  );

  const photo = photos[fallback];
  return (
    <div ref={wrap} className={cn("relative overflow-hidden bg-noite", className)}>
      <Image
        src={photo.image}
        alt={photo.alt}
        fill
        sizes={sizes}
        placeholder="blur"
        preload={initial === 0}
        className={cn("object-cover", ready && "opacity-0")}
      />
    </div>
  );
});
