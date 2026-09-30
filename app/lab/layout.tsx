import type { Metadata } from "next";

import { LabBar } from "@/components/lab/lab-bar";

// Studies, not the site: never indexed, even once the rest is.
export const metadata: Metadata = { title: "lab", robots: { index: false, follow: false } };

/** Three directions for the home, to choose from before the site is rebuilt. */
export default function LabLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LabBar />
      {children}
    </>
  );
}
