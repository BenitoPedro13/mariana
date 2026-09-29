import { pad2 } from "@/lib/print";

/** `07 / 66` on screen, "foto 7 de 66" for assistive tech. */
export function FrameCounter({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  return (
    <p className="font-mono text-xs tracking-wide text-ink-quiet tabular-nums">
      <span aria-hidden="true">
        {pad2(current)} / {pad2(total)}
      </span>
      <span className="sr-only">
        foto {current} de {total}
      </span>
    </p>
  );
}
