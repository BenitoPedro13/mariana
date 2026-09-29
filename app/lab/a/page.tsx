import type { Metadata } from "next";

import { ARevelacao } from "@/components/lab/a-revelacao";
import { photos } from "@/content/photos";

export const metadata: Metadata = { title: "lab a · revelação" };

export default function LabA() {
  return <ARevelacao photos={photos} />;
}
