"use client";

import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";

import { cn } from "@/lib/utils";

// Chip: USVA's slot in docs/03-DESIGN-SYSTEM.md §5, for the series filter.
// The USVA registry is unreachable from the cloud session, so this is a Base UI
// Toggle in the same skin as ToggleGroupItem. Swap for USVA's Chip when it can
// be fetched, and keep this skin. Selected is an ink fill plus an underline, not
// Magenta: the light filter beside it already holds the screen's one magenta.
function Chip({ className, ...props }: TogglePrimitive.Props) {
  return (
    <TogglePrimitive
      data-slot="chip"
      className={cn(
        "inline-flex min-h-11 cursor-pointer items-center px-3 font-mono text-xs text-ink-quiet shadow-[inset_0_0_0_1px_var(--hairline)] hover:text-link",
        "data-[pressed]:bg-ink data-[pressed]:text-surface data-[pressed]:underline data-[pressed]:underline-offset-4 data-[pressed]:shadow-none",
        className,
      )}
      {...props}
    />
  );
}

export { Chip };
