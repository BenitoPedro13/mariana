import Link from "next/link";

import { Monogram, Wordmark } from "@/components/brand/wordmark";
import { cn } from "@/lib/utils";

const navLink = "inline-flex min-h-11 items-center px-2 text-ink-quiet hover:text-link";

export function SiteHeader() {
  return (
    <header className="flex h-[var(--header-h)] items-center justify-between px-[var(--gutter)]">
      <Link
        href="/tudo"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-40 focus:bg-surface focus:px-3 focus:py-2"
      >
        pular para todas as fotos
      </Link>
      <Wordmark className="hidden sm:inline-block" />
      <Monogram className="sm:hidden" />
      <nav aria-label="principal" className="flex gap-2">
        <Link href="/tudo" className={navLink}>
          tudo
        </Link>
        <Link href="/sobre" className={cn(navLink, "hidden sm:inline-flex")}>
          sobre
        </Link>
      </nav>
    </header>
  );
}
