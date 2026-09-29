"use client";

import { AnimatePresence, motion } from "motion/react";

import { cn } from "@/lib/utils";

/**
 * Her caption, line by line, each line rising through its own mask. Line
 * breaks are hers, so they are the lines. The text is never altered.
 */
export function LineReveal({
  text,
  lang,
  revealKey,
  className,
  instant = false,
}: {
  text: string;
  lang?: string;
  revealKey: string;
  className?: string;
  instant?: boolean;
}) {
  const lines = text.split("\n");
  return (
    <div className={cn("relative", className)}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.p key={revealKey} lang={lang} className="whitespace-pre-line" exit={{ opacity: 0, transition: { duration: instant ? 0 : 0.18 } }}>
          {lines.map((line, i) => (
            <span key={i} className="block overflow-hidden pb-[0.08em]">
              <motion.span
                className="block"
                initial={instant ? false : { y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.25 + i * 0.08, ease: [0.2, 0.7, 0.1, 1] }}
              >
                {line || " "}
              </motion.span>
            </span>
          ))}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
