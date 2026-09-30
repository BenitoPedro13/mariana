import { cn } from "@/lib/utils";

/** The square that ends every line and label (■). */
export function Square({ size = 10, className }: { size?: 7 | 10; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("inline-block shrink-0 bg-flash", size === 7 ? "size-[7px]" : "size-[10px]", className)}
    />
  );
}

/** A 0.5 px Flash hairline. */
export function Hair({ className }: { className?: string }) {
  return <span aria-hidden="true" className={cn("block h-[var(--d-hair)] bg-flash", className)} />;
}
