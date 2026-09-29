"use client";

import { motion } from "motion/react";

import { cn } from "@/lib/utils";

/** A camera's frame counter: each digit rolls on its own drum. */
export function Odometer({
  value,
  digits = 2,
  className,
  instant = false,
}: {
  value: number;
  digits?: number;
  className?: string;
  instant?: boolean;
}) {
  const chars = String(value).padStart(digits, "0").split("");
  return (
    <span aria-hidden="true" className={cn("inline-flex font-mono leading-none tabular-nums lining-nums", className)}>
      {chars.map((c, i) => (
        <span key={i} className="relative inline-block h-[1.08em] w-[0.62em] overflow-hidden">
          <motion.span
            className="absolute inset-x-0 top-0 flex flex-col"
            animate={{ y: `${-Number(c) * 10}%` }}
            initial={false}
            transition={
              instant
                ? { duration: 0 }
                : { type: "spring", stiffness: 180, damping: 22, delay: (chars.length - 1 - i) * 0.06 }
            }
          >
            {Array.from({ length: 10 }, (_, d) => (
              <span key={d} className="block h-[1.08em] text-center leading-[1.08em]">
                {d}
              </span>
            ))}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
