import { Pile } from "@/components/pile/pile";
import { photos } from "@/content/photos";
import { pad2, parseFrame } from "@/lib/print";
import { pageMetadata } from "@/lib/site";

// `/pilha?f=07` is rewritten here by proxy.ts, so a shared link opens on its print
// even without JavaScript, and every start frame is still a static page.
// Nothing links to /f/… directly; the address bar keeps `/pilha?f=07`.

export function generateStaticParams() {
  return photos.map((_, i) => ({ frame: pad2(i + 1) }));
}

// Seen as /pilha?f=07, and the same Pile, so it points search at /pilha.
export const metadata = pageMetadata({
  title: "pilha",
  description: "as fotos da Mariana, uma de cada vez.",
  path: "/pilha",
});

export default async function PileAt(props: PageProps<"/f/[frame]">) {
  const { frame } = await props.params;
  const initial = parseFrame(frame, photos.length) ?? 0;
  return (
    <main className="flex min-h-[calc(100svh-var(--header-h))] flex-col px-[var(--gutter)] pb-2">
      <h1 className="sr-only">pilha de fotos</h1>
      <Pile photos={photos} initial={initial} />
    </main>
  );
}
