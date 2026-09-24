"use client";

import { useEffect } from "react";

/** '살짝 보기' 단추를 문서 전체에서 한 번에 처리한다. */
export function LevelLayer() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const btn = (e.target as Element | null)?.closest?.(".lv-peek");
      const box = btn?.parentElement;
      if (box) box.setAttribute("data-open", "1");
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
