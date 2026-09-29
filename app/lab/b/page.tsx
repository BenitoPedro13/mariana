import type { Metadata } from "next";

import { BContato } from "@/components/lab/b-contato";
import { photos } from "@/content/photos";

export const metadata: Metadata = { title: "lab b · contato" };

export default function LabB() {
  return <BContato photos={photos} />;
}
