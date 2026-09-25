"use client";

import { useEffect } from "react";

/** '더 학습하기'(펼치기)와 '접기' 단추를 문서 전체에서 한 번에 처리한다. */
export function LevelLayer() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      // 같은 쪽 안의 바로가기(#…)가 접힌 상자 안을 가리키면 먼저 펼친다
      const hash = target?.closest?.('a[href^="#"]')?.getAttribute("href");
      if (hash && hash.length > 1) {
        for (let el = document.getElementById(hash.slice(1))?.parentElement; el; el = el.parentElement)
          if (el.hasAttribute("data-lv-min")) el.setAttribute("data-open", "1");
      }
      const open = target?.closest?.(".lv-peek");
      if (open?.parentElement) {
        open.parentElement.setAttribute("data-open", "1");
        return;
      }
      const fold = target?.closest?.(".lv-fold");
      if (fold?.parentElement) {
        fold.parentElement.removeAttribute("data-open");
        fold.parentElement.scrollIntoView({ block: "nearest" });
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
