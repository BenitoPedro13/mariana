import { ogCard } from "@/components/og/card";
import { CARD_ALT } from "@/lib/site";

export const alt = CARD_ALT;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogCard();
}
