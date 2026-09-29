import type { Metadata } from "next";

import { LabBar } from "@/components/lab/lab-bar";

export const metadata: Metadata = { title: "lab" };

/** Three directions for the home, to choose from before the site is rebuilt. */
export default function LabLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LabBar />
      {children}
    </>
  );
}
