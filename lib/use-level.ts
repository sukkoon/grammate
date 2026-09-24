"use client";

import { useSyncExternalStore } from "react";
import { DEFAULT_BAND, LEVEL_EVENT, LEVEL_KEY, type Band } from "./level";

function read(): Band {
  const l = document.documentElement.dataset.level;
  return l === "elem" || l === "middle" || l === "high" ? l : DEFAULT_BAND;
}

function subscribe(fn: () => void) {
  window.addEventListener(LEVEL_EVENT, fn);
  return () => window.removeEventListener(LEVEL_EVENT, fn);
}

/** 지금 고른 수준. 서버에서는 null */
export function useBand(): Band | null {
  return useSyncExternalStore<Band | null>(subscribe, read, () => null);
}

/** 학생이 직접 수준을 골랐는지 */
export function useBandChosen(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => document.documentElement.dataset.levelSet === "1",
    () => true,
  );
}

export function setBand(b: Band) {
  const d = document.documentElement;
  d.dataset.level = b;
  d.dataset.levelSet = "1";
  try {
    localStorage.setItem(LEVEL_KEY, b);
  } catch {}
  window.dispatchEvent(new Event(LEVEL_EVENT));
}
