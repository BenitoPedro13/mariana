import Link from "next/link";

import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { Surface } from "@/components/site/surface";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="flex min-h-[calc(100svh-var(--header-h)-8rem)] flex-col items-center justify-center gap-8 px-[var(--gutter)] text-center">
        <Surface light="night" />
        <h1 className="font-display text-[length:clamp(2rem,1rem+4vw,5rem)] leading-tight [font-variation-settings:'opsz'_96]">
          essa foto não existe <span className="font-mono">&gt;:(</span>
        </h1>
        <Link href="/tudo" className="inline-flex min-h-11 items-center text-link hover:underline">
          tudo
        </Link>
      </main>
      <SiteFooter />
    </>
  );
}
