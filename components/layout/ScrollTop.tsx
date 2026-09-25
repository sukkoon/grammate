"use client";

import { useEffect, useState } from "react";

/**
 * 맨 위로 단추. 한 화면 넘게 내려가면 왼쪽 아래에 나타나고, 누르면 부드럽게 맨 위로 간다.
 * 오른쪽 아래는 '물어보기' 단추 자리라서 왼쪽에 둔다. 웹·앱(설치형) 모두에서 동작한다.
 */
export function ScrollTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      setShow(window.scrollY > Math.max(480, window.innerHeight * 0.8));
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  function toTop() {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  }

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="맨 위로"
      aria-hidden={!show}
      tabIndex={show ? 0 : -1}
      className={`fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] left-4 z-40 grid size-11 place-items-center rounded-full border border-line bg-card text-ink shadow-[0_10px_24px_-12px_rgba(31,42,68,0.45)] transition-all duration-200 hover:bg-chip ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M12 19V6M5 13l7-7 7 7" />
      </svg>
    </button>
  );
}
