"use client";

import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group";

import { cn } from "@/lib/utils";

// shadcn/ui ToggleGroup (Base UI), retokened. Selected = the one Magenta VDV
// fill plus an underline, so selection is never colour alone.
// Re-add with `pnpm dlx shadcn@latest add toggle-group` and keep this skin.

function ToggleGroup({ className, ...props }: ToggleGroupPrimitive.Props) {
  return (
    <ToggleGroupPrimitive
      data-slot="toggle-group"
      className={cn("flex items-center gap-1", className)}
      {...props}
    />
  );
}

function ToggleGroupItem({ className, ...props }: TogglePrimitive.Props) {
  return (
    <TogglePrimitive
      data-slot="toggle-group-item"
      className={cn(
        "inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center px-3 text-ink-quiet hover:text-link",
        "data-[pressed]:bg-mark data-[pressed]:text-flash data-[pressed]:underline data-[pressed]:underline-offset-4",
        className,
      )}
      {...props}
    />
  );
}

export { ToggleGroup, ToggleGroupItem };
