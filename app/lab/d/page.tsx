import type { Metadata } from "next";

import { DMetamorfose } from "@/components/lab/d-metamorfose";
import { photos } from "@/content/photos";

export const metadata: Metadata = { title: "lab d · metamorfose" };

export default function LabD() {
  return <DMetamorfose photos={photos} />;
}
