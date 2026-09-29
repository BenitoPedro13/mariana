import type { StaticImageData } from "next/image";

export type Light = "night" | "day";

export type Photo = {
  slug: string;
  image: StaticImageData;
  /** Written by us, approved by her. Provisional until she has seen it. */
  alt: string;
  /** Hers, verbatim. Never edited. */
  caption?: string;
  captionLang?: "pt-BR" | "en" | "es";
  /** ISO date. For reference photos this is the post date, not the capture date. */
  date: string;
  light: Light;
  /** Slug into content/series.ts. */
  series?: string;
  /** Who pressed the shutter. */
  author: "mariana" | "unconfirmed" | { name: string; handle?: string };
  /**
   * `reference`: mood material from her Instagram, for the prototype only.
   * `mariana`: a photograph she gave us for the site.
   */
  source: "reference" | "mariana";
  /** Identifiable people in the frame besides her. A human counts; the build enforces. */
  others: number;
  /** One entry per identifiable friend, only once they said yes. */
  people?: { consent: true }[];
};

/** A night or a trip, named by her. */
export type Series = { slug: string; title: string };
