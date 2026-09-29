import { useSyncExternalStore } from "react";

import { FLASH_STORAGE_KEY as KEY } from "@/lib/flash-key";

/* "desligar flash": one localStorage key, no cookie (docs/05-ARCHITECTURE.md §6). */

const listeners = new Set<() => void>();

function read(): boolean {
  try {
    return window.localStorage.getItem(KEY) !== "off";
  } catch {
    return true;
  }
}

export function setFlashOn(on: boolean) {
  try {
    window.localStorage.setItem(KEY, on ? "on" : "off");
  } catch {
    // Storage blocked: the choice lasts for this page only.
  }
  memo = on;
  listeners.forEach((l) => l());
}

let memo: boolean | null = null;

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  if (memo === null) memo = read();
  return memo;
}

export function useFlashOn() {
  return useSyncExternalStore(subscribe, getSnapshot, () => true);
}
