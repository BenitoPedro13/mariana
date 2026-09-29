import type { Metadata } from "next";

import { ContactSheet } from "@/components/site/contact-sheet";
import { Surface } from "@/components/site/surface";
import { photos } from "@/content/photos";
import { series } from "@/content/series";

export const metadata: Metadata = { title: "tudo" };

export default function Tudo() {
  return (
    <main className="px-[var(--gutter)] pb-6">
      <Surface light="night" />
      <h1 className="sr-only">todas as fotos</h1>
      <ContactSheet photos={photos} series={series} />
    </main>
  );
}
