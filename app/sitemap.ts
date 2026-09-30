import type { MetadataRoute } from "next";

import { photos } from "@/content/photos";
import { SITE_URL } from "@/lib/site";

// Pages only. Photo files stay out of it, so a takedown is one array edit
// (docs/05-ARCHITECTURE.md §6); /lab and /f/… aren't pages anyone should land on.
export default function sitemap(): MetadataRoute.Sitemap {
  const at = (path: string) => new URL(path, SITE_URL).href;
  return [
    { url: at("/"), priority: 1 },
    { url: at("/tudo"), priority: 0.8 },
    { url: at("/pilha"), priority: 0.8 },
    { url: at("/sobre"), priority: 0.5 },
    ...photos.map((p) => ({ url: at(`/foto/${p.slug}`), priority: 0.6 })),
  ];
}
