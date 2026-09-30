"use client";

import { useEffect, useRef, useState } from "react";

import { Wordmark } from "@/components/brand/wordmark";
import { useSmoothScroll } from "@/components/diario/smooth-scroll";
import { cn } from "@/lib/utils";

/*
 * S1 · Header. Fixed, five columns: the name (which turns on
 * hover), what this is, her two moods as two squares (a Noite one and a Flash
 * one), the section nav, and the years. The active section is Rosa. It fades
 * in once the hero intro has finished. At ≤ 1024 px: name · squares · menu.
 * Transparent over the hero; past it, a Noite bar (a hard cut) so text
 * scrolling underneath never runs into it.
 */

export const INTRO_DONE_EVENT = "diario:intro-done";

export type NavItem = { id: string; label: string };

export function DiarioHeader({ nav, years }: { nav: NavItem[]; years: string }) {
  const scroll = useSmoothScroll();
  const [active, setActive] = useState<string | null>(null);
  const [menu, setMenu] = useState(false);
  const bar = useRef<HTMLElement>(null);

  // On a full load of the home the header waits for the hero intro, then fades in.
  useEffect(() => {
    const el = bar.current;
    if (!el || !document.documentElement.classList.contains("diario-loading")) return;
    el.style.opacity = "0";
    const show = () => {
      el.style.transition = "opacity 340ms ease";
      el.style.opacity = "1";
    };
    window.addEventListener(INTRO_DONE_EVENT, show, { once: true });
    const failsafe = window.setTimeout(show, 7000);
    return () => {
      window.removeEventListener(INTRO_DONE_EVENT, show);
      window.clearTimeout(failsafe);
    };
  }, []);

  // Solid once the hero has gone.
  useEffect(() => {
    const el = bar.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      el.toggleAttribute("data-solid", window.scrollY > window.innerHeight - 60);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // The nav follows the section in view.
  useEffect(() => {
    const els = nav
      .map((n) => document.getElementById(n.id))
      .filter((e): e is HTMLElement => Boolean(e));
    if (els.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.01] },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [nav]);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenu(false);
    scroll.to(`#${id}`);
    const target = document.getElementById(id);
    // Move focus to the section heading once the glide has landed.
    window.setTimeout(() => target?.querySelector<HTMLElement>("h2, [data-d-heading]")?.focus({ preventScroll: true }), 950);
  };

  const links = nav.map((n) => (
    <a
      key={n.id}
      href={`#${n.id}`}
      onClick={go(n.id)}
      aria-current={active === n.id ? "true" : undefined}
      className="d-glow inline-flex min-h-11 items-center"
    >
      {n.label}
    </a>
  ));

  return (
    <header
      ref={bar}
      data-d-after-intro
      className="fixed inset-x-0 top-0 z-40 grid grid-cols-[1.1fr_1.2fr_0.45fr_1fr_0.85fr] items-start px-[var(--d-gutter)] pt-5 pb-2 text-flash data-[solid]:bg-noite max-lg:pb-0 max-lg:grid-cols-[1fr_auto_auto] max-lg:items-center max-lg:gap-4"
    >
      <Wordmark className="-mt-1" />

      <p className="text-flash/60 max-lg:hidden">
        fotografia
        <br />
        diário com flash
      </p>

      <div aria-hidden="true" className="flex gap-1.5 pt-0.5">
        <span className="size-[10px] border-[0.5px] border-flash bg-noite" title="noite" />
        <span className="size-[10px] border-[0.5px] border-noite bg-flash" title="dia" />
      </div>

      <nav aria-label="seções" className="flex gap-7 max-lg:hidden [&_a]:-mt-3.5">
        {links}
      </nav>

      <p className="text-right text-flash/60 max-lg:hidden">
        diário
        <br />
        {years}
      </p>

      {/* Small screens: a two-line menu button and a drop-down. */}
      <div className="lg:hidden">
        <button
          type="button"
          aria-expanded={menu}
          aria-controls="d-menu"
          aria-label={menu ? "fechar menu" : "abrir menu"}
          onClick={() => setMenu((m) => !m)}
          className="flex size-11 flex-col items-end justify-center gap-[5px]"
        >
          <span className={cn("block h-[0.5px] w-[22px] bg-flash transition-transform duration-200", menu && "translate-y-[3px] rotate-45")} />
          <span className={cn("block h-[0.5px] w-[22px] bg-flash transition-transform duration-200", menu && "-translate-y-[3px] -rotate-45")} />
        </button>
        <nav
          id="d-menu"
          aria-label="seções"
          hidden={!menu}
          className="absolute inset-x-0 top-full flex flex-col gap-1 bg-noite px-[var(--d-gutter)] pt-2 pb-5 text-base"
        >
          {links}
        </nav>
      </div>
    </header>
  );
}
