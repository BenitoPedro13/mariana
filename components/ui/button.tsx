import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// shadcn/ui Button (Base UI), retokened: core layer, quiet, text-only.
// Written by hand because the registry is unreachable from the cloud session;
// re-add with `pnpm dlx shadcn@latest add button` and keep these variants.
const buttonVariants = cva(
  "inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center gap-2 whitespace-nowrap select-none text-ink disabled:pointer-events-none disabled:text-ink-quiet aria-disabled:text-ink-quiet",
  {
    variants: {
      variant: {
        text: "hover:text-link",
        quiet: "text-ink-quiet hover:text-link",
      },
      size: {
        default: "px-2 text-base",
        data: "px-2 font-mono text-xs tracking-wide",
      },
    },
    defaultVariants: {
      variant: "text",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
