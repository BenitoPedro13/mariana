import type { Metadata } from "next";

import { CPilha } from "@/components/lab/c-pilha";
import { photos } from "@/content/photos";

export const metadata: Metadata = { title: "lab c · pilha" };

export default function LabC() {
  return <CPilha photos={photos} />;
}
