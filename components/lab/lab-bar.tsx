"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Monogram } from "@/components/brand/wordmark";
import { FlashToggle } from "@/components/site/flash-toggle";
import { cn } from "@/lib/utils";

const directions = [
  { href: "/lab/a", key: "a", name: "revelação" },
  { href: "/lab/b", key: "b", name: "contato" },
  { href: "/lab/c", key: "c", name: "pilha" },
];

/** The lab's only chrome: which direction you're in, and the flash switch. */
export function LabBar() {
  const path = usePathname();
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-40 flex items-center justify-between px-[var(--gutter)] pt-2 text-flash mix-blend-difference">
      <Monogram href="/lab" className="pointer-events-auto text-flash" />
      <nav aria-label="direções" className="pointer-events-auto flex gap-1 font-mono text-xs">
        {directions.map((d) => (
          <Link
            key={d.href}
            href={d.href}
            aria-current={path === d.href ? "page" : undefined}
            className={cn(
              "inline-flex min-h-11 items-center px-2 opacity-60 hover:opacity-100",
              path === d.href && "underline underline-offset-4 opacity-100",
            )}
          >
            {d.key}
            <span className="max-sm:sr-only">&nbsp;· {d.name}</span>
          </Link>
        ))}
      </nav>
      <div className="pointer-events-auto [&_button]:text-flash">
        <FlashToggle />
      </div>
    </div>
  );
}
