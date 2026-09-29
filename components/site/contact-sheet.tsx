"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { DateStamp } from "@/components/brand/date-stamp";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import type { Light, Photo } from "@/content/photos";

type Filter = "tudo" | Light;

const filters: { value: Filter; label: string }[] = [
  { value: "tudo", label: "tudo" },
  { value: "night", label: "noite" },
  { value: "day", label: "dia" },
];

/** Everything in the Pile, flat, in the same order. No motion. */
export function ContactSheet({ photos }: { photos: Photo[] }) {
  const [filter, setFilter] = useState<Filter>("tudo");
  const visible = photos.filter((p) => filter === "tudo" || p.light === filter);

  return (
    <>
      <ToggleGroup
        aria-label="filtrar fotos"
        value={[filter]}
        onValueChange={(v) => {
          if (v[0]) setFilter(v[0] as Filter);
        }}
        className="mb-6"
      >
        {filters.map((f) => (
          <ToggleGroupItem key={f.value} value={f.value}>
            {f.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

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
