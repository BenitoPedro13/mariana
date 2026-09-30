import { Pile } from "@/components/pile/pile";
import { photos } from "@/content/photos";

export default function Home() {
  return (
    <main className="flex min-h-[calc(100svh-var(--header-h))] flex-col px-[var(--gutter)] pb-2">
      <Pile photos={photos} />
    </main>
  );
}
