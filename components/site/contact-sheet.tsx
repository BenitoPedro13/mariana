"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useSyncExternalStore } from "react";

import { DateStamp } from "@/components/brand/date-stamp";
import { Chip } from "@/components/ui/chip";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import type { Light, Photo, Series } from "@/content/types";

type Filter = "tudo" | Light;

const filters: { value: Filter; label: string }[] = [
  { value: "tudo", label: "tudo" },
  { value: "night", label: "noite" },
  { value: "day", label: "dia" },
];

const noSubscribe = () => () => {};

/** `/tudo?serie=carnaval-2023` opens filtered, from the photo page's label. */
function useSeriesFromUrl(series: Series[]) {
  const search = useSyncExternalStore(
    noSubscribe,
    () => window.location.search,
    () => "",
  );
  const slug = new URLSearchParams(search).get("serie");
  return series.some((s) => s.slug === slug) ? slug : null;
}

/** Everything in the Pile, flat, in the same order. No motion. */
export function ContactSheet({ photos, series }: { photos: Photo[]; series: Series[] }) {
  const [filter, setFilter] = useState<Filter>("tudo");
  const fromUrl = useSeriesFromUrl(series);
  // undefined: nothing chosen here yet, so the URL decides.
  const [chosen, setChosen] = useState<string | null | undefined>(undefined);
  const activeSeries = chosen === undefined ? fromUrl : chosen;

  const visible = photos.filter(
    (p) =>
      (filter === "tudo" || p.light === filter) &&
      (!activeSeries || p.series === activeSeries),
  );

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center gap-x-6 gap-y-2">
        <ToggleGroup
          aria-label="filtrar por luz"
          value={[filter]}
          onValueChange={(v) => {
            if (v[0]) setFilter(v[0] as Filter);
          }}
        >
          {filters.map((f) => (
            <ToggleGroupItem key={f.value} value={f.value}>
              {f.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>

        {series.length > 0 && (
          <div role="group" aria-label="séries" className="flex flex-wrap gap-2">
            {series.map((s) => (
              <Chip
                key={s.slug}
                pressed={activeSeries === s.slug}
                onPressedChange={(on) => setChosen(on ? s.slug : null)}
              >
                {s.title}
              </Chip>
            ))}
          </div>
        )}
      </div>

      {visible.length === 0 ? (
        <p className="text-ink-quiet">nada aqui. ainda.</p>
      ) : (
        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
          {visible.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/foto/${p.slug}`}
                className="group relative block aspect-[4/5] bg-noite shadow-[0_0_0_1px_var(--hairline)]"
              >
                <Image
                  src={p.image}
                  alt={p.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1280px) 25vw, 16vw"
                  placeholder="blur"
                  className="object-cover"
                />
                <DateStamp
                  date={p.date}
                  className="absolute right-2 bottom-2 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
                />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
