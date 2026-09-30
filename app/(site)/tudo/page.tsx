import { ContactSheet } from "@/components/site/contact-sheet";
import { Surface } from "@/components/site/surface";
import { photos } from "@/content/photos";
import { series } from "@/content/series";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "tudo",
  description: "todas as fotos da Mariana, numa folha só.",
  path: "/tudo",
});

export default function Tudo() {
  return (
    <main className="px-[var(--gutter)] pb-6">
      <Surface light="night" />
      <h1 className="sr-only">todas as fotos</h1>
      <ContactSheet photos={photos} series={series} />
    </main>
  );
}
