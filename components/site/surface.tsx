"use client";

import { useSurface } from "@/components/pile/hooks";
import type { Light } from "@/content/types";

/** Sets the room for a page that isn't the Pile: a photo page, or Noite. */
export function Surface({ light }: { light: Light }) {
  useSurface(light);
  return null;
}
