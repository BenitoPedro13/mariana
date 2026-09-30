import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import { notFound } from "next/navigation";

import { DateStamp } from "@/components/brand/date-stamp";
import { FrameCounter } from "@/components/brand/frame-counter";
import { Caption } from "@/components/pile/caption";
import { FlashLink } from "@/components/pile/flash-link";
import { Surface } from "@/components/site/surface";
import { photoIndex, photos } from "@/content/photos";
import { series } from "@/content/series";
import { formatStamp, pad2 } from "@/lib/print";
import { pageMetadata } from "@/lib/site";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return photos.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata(
  props: PageProps<"/foto/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const i = photoIndex(slug);
  if (i < 0) return { title: "foto" };
  const photo = photos[i];
  // Her caption, verbatim, when there is one; the counter and stamp when not.
  return pageMetadata({
    title: `foto ${pad2(i + 1)}`,
    description: photo.caption ?? `${pad2(i + 1)} / ${pad2(photos.length)}, ${formatStamp(photo.date)}.`,
    path: `/foto/${photo.slug}`,
    ownCard: true,
  });
}

const quiet = "inline-flex min-h-11 items-center text-ink-quiet hover:text-link";

export default async function FotoPage(props: PageProps<"/foto/[slug]">) {
  const { slug } = await props.params;
  const i = photoIndex(slug);
  if (i < 0) notFound();

  const photo = photos[i];
  const total = photos.length;
  const prev = photos[(i - 1 + total) % total];
  const next = photos[(i + 1) % total];
  const inSeries = series.find((s) => s.slug === photo.series);

  return (
    <main className="px-[var(--gutter)] pb-6">
      <Surface light={photo.light} />
      <h1 className="sr-only">foto {pad2(i + 1)}</h1>
      {/* The photo page never crops: the whole frame, as large as fits. */}
      <figure className="flex flex-col items-center">
        {/* Shares a name with the print on the lab home and the /tudo thumb, so it morphs across. */}
        <ViewTransition name={`foto-${photo.slug}`} share="morph" default="none">
          <div
            className="relative max-w-full shadow-[0_0_0_1px_var(--hairline)]"
            style={{
              aspectRatio: `${photo.image.width} / ${photo.image.height}`,
              height: `min(80svh, calc((100vw - 2 * var(--gutter)) * ${photo.image.height / photo.image.width}))`,
            }}
          >
            <Image
              src={photo.image}
              alt={photo.alt}
              fill
              sizes="(max-width: 640px) 100vw, 70vw"
              placeholder="blur"
              preload
              className="object-contain"
            />
            <DateStamp date={photo.date} className="absolute right-3 bottom-3" />
          </div>
        </ViewTransition>
        <figcaption className="mt-6 flex w-full max-w-[60ch] flex-col gap-2 self-start">
          <Caption photo={photo} />
          {inSeries && (
            <Link
              href={`/tudo?serie=${inSeries.slug}`}
              className="self-start font-mono text-xs text-ink-quiet hover:text-link"
            >
              {inSeries.title}
            </Link>
          )}
        </figcaption>
      </figure>

      <nav aria-label="fotos" className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <FrameCounter current={i + 1} total={total} />
          <Link href={`/pilha?f=${pad2(i + 1)}`} className={quiet}>
            voltar
          </Link>
        </div>
        <div className="flex gap-2">
          <FlashLink href={`/foto/${prev.slug}`} className={cn(quiet, "px-2 text-ink")}>
            <span aria-hidden="true">←&nbsp;</span>anterior
          </FlashLink>
          <FlashLink href={`/foto/${next.slug}`} className={cn(quiet, "px-2 text-ink")}>
            próxima<span aria-hidden="true">&nbsp;→</span>
          </FlashLink>
        </div>
      </nav>
    </main>
  );
}
