import Link from "next/link";

import { FlashToggle } from "@/components/site/flash-toggle";
import { cn } from "@/lib/utils";

const quiet = "inline-flex min-h-11 items-center text-ink-quiet hover:text-link";

export function SiteFooter() {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 px-[var(--gutter)] py-6 font-mono text-xs">
      <div className="flex flex-wrap items-center gap-x-4">
        <a href="https://www.instagram.com/anairamodarnoc/" className={quiet}>
          @anairamodarnoc
        </a>
        <Link href="/sobre" className={cn(quiet, "sm:hidden")}>
          sobre
        </Link>
        <p className="text-ink-quiet">fotos por mariana. site por benito, de presente.</p>
      </div>
      <div className="flex flex-wrap items-center gap-x-4">
        <p className="text-ink-quiet">protótipo. não publicar.</p>
        <FlashToggle />
      </div>
    </footer>
  );
}
