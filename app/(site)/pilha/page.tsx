import { Pile } from "@/components/pile/pile";
import { photos } from "@/content/photos";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "pilha",
  description: "as fotos da Mariana, uma de cada vez.",
  path: "/pilha",
});

export default function Home() {
  return (
    <main className="flex min-h-[calc(100svh-var(--header-h))] flex-col px-[var(--gutter)] pb-2">
      <h1 className="sr-only">pilha de fotos</h1>
      <Pile photos={photos} />
    </main>
  );
}
