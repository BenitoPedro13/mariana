import type { Photo } from "@/content/types";
import { cn } from "@/lib/utils";

/** Her words, verbatim: line breaks, emoji and language kept. */
export function Caption({
  photo,
  className,
}: {
  photo: Pick<Photo, "caption" | "captionLang">;
  className?: string;
}) {
  if (!photo.caption) return null;
  return (
    <p
      lang={photo.captionLang && photo.captionLang !== "pt-BR" ? photo.captionLang : undefined}
      className={cn(
        "max-w-[60ch] whitespace-pre-line text-[length:clamp(1rem,0.9rem+0.4vw,1.25rem)] leading-snug text-ink",
        className,
      )}
    >
      {photo.caption}
    </p>
  );
}
