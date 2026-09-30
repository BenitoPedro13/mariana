import { SquareCursor } from "@/components/diario/cursor";
import { SmoothScroll } from "@/components/diario/smooth-scroll";

/** The diary home: its own chrome, smooth scroll and the square cursor. */
export default function DiarioLayout({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <div data-diario className="bg-noite text-flash">
        <SquareCursor />
        {children}
      </div>
    </SmoothScroll>
  );
}
