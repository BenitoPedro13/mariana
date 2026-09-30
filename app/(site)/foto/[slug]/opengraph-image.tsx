import { notFound } from "next/navigation";

import { ogCard } from "@/components/og/card";
import { photoIndex, photos } from "@/content/photos";

// The card carries the photo's number and date stamp, never the photo itself
// (components/og/card.tsx).
export const alt = "anairam, o nome da Mariana ao contrário, com o número e a data da foto";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Prerendered with the pages, one card per photo.
export function generateStaticParams() {
  return photos.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export default async function Image(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const index = photoIndex(slug);
  if (index < 0) notFound();
  return ogCard({ index, date: photos[index].date });
}
