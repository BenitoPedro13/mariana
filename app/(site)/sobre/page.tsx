import { Surface } from "@/components/site/surface";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "sobre",
  description: "Mariana, @anairamodarnoc no instagram.",
  path: "/sobre",
});

// `>:(` is hers, from her bio. Whatever she writes goes under it; until then, nothing.
export default function Sobre() {
  return (
    <main className="flex min-h-[calc(100svh-var(--header-h)-8rem)] flex-col items-center justify-center gap-8 px-[var(--gutter)]">
      <Surface light="night" />
      <h1 className="font-mono text-[length:clamp(3rem,1.5rem+7vw,9rem)] leading-none">
        <span aria-hidden="true">&gt;:(</span>
        <span className="sr-only">sobre</span>
      </h1>
      <a
        href="https://www.instagram.com/anairamodarnoc/"
        className="inline-flex min-h-11 items-center font-mono text-xs text-link hover:underline"
      >
        @anairamodarnoc
      </a>
    </main>
  );
}
