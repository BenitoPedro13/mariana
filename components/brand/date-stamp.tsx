import { formatStamp } from "@/lib/print";
import { cn } from "@/lib/utils";

/** The camera date in the corner of the print. Amarelo Táxi, nothing else. */
export function DateStamp({
  date,
  className,
}: {
  date: string;
  className?: string;
}) {
  return (
    <time
      dateTime={date}
      className={cn(
        "pointer-events-none font-mono text-xs leading-none tracking-wide text-taxi tabular-nums",
        className,
      )}
    >
      {formatStamp(date)}
    </time>
  );
}
