"use client";

import { Button } from "@/components/ui/button";
import { setFlashOn, useFlashOn } from "@/lib/flash-preference";

/** Anyone can turn the flash off without an OS setting (WCAG 2.3.1 margin). */
export function FlashToggle() {
  const on = useFlashOn();
  return (
    <Button variant="quiet" size="data" onClick={() => setFlashOn(!on)}>
      {on ? "desligar flash" : "ligar flash"}
    </Button>
  );
}
