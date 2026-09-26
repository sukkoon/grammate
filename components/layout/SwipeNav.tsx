"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { menuNeighbors } from "@/lib/nav";

/**
 * 휴대폰·태블릿에서 옆으로 밀어 페이지 옮기기.
 * - 손가락을 왼쪽으로 밀면 다음, 오른쪽으로 밀면 이전 (책장 넘기듯).
 * - 메뉴 화면은 머리글 메뉴 순서대로, 단원 화면은 이전·다음 단원으로(페이지의 [data-swipe-prev]/[data-swipe-next]).
 *   끝에 닿으면 반대쪽 끝으로 이어져서 같은 쪽으로 계속 밀어도 멈추지 않는다.
 * - 화면 어디서 밀어도 된다. 다만 글자를 입력하는 칸, 열린 창(검색·로그인 등), 아직 옆으로 더 스크롤되는 표 안에서는
 *   그 동작이 먼저다(표가 끝까지 스크롤되면 그다음 밀기는 페이지를 넘긴다). 위아래 스크롤과 글자 고르기도 무시한다.
 * - 밀기 시작하면 어디로 가는지 옆에 작게 보여 준다.
 */

type Target = { href: string; label: string };
type Targets = { prev?: Target; next?: Target };
type Scroller = { canLeft: boolean; canRight: boolean };

const SHOW = 24; // 이만큼 밀면 안내를 보여 준다
const GO = 64; // 이만큼 밀면 넘어간다

function menuTargets(path: string): Targets | null {
  const m = menuNeighbors(path);
  return m && { prev: { href: m.prev.href, label: `이전: ${m.prev.label}` }, next: { href: m.next.href, label: `다음: ${m.next.label}` } };
}

function pageTargets(): Targets {
  const d = document.querySelector<HTMLElement>("[data-swipe-prev], [data-swipe-next]")?.dataset;
  if (!d) return {};
  return {
    prev: d.swipePrev ? { href: d.swipePrev, label: d.swipePrevLabel ?? "이전" } : undefined,
    next: d.swipeNext ? { href: d.swipeNext, label: d.swipeNextLabel ?? "다음" } : undefined,
  };
}

/** 입력칸·열린 창에서 시작한 손짓은 페이지 넘기기가 아니다 */
const blocked = (el: Element) => !!el.closest('input, textarea, select, [contenteditable="true"], [role="dialog"], [data-no-swipe]');

/** 손가락 아래에서 옆으로 스크롤되는 상자들과, 지금 어느 쪽으로 더 스크롤될 수 있는지 */
function scrollersAt(start: Element): Scroller[] {
  const out: Scroller[] = [];
  for (let el: Element | null = start; el && el !== document.body; el = el.parentElement) {
    if (el.scrollWidth <= el.clientWidth + 1) continue;
    const ox = getComputedStyle(el).overflowX;
    if (ox !== "auto" && ox !== "scroll") continue;
    out.push({ canLeft: el.scrollLeft > 1, canRight: el.scrollLeft + el.clientWidth < el.scrollWidth - 1 });
  }
  return out;
}

export function SwipeNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [hint, setHint] = useState<{ dir: "prev" | "next"; label: string; ready: boolean; progress: number } | null>(null);

  useEffect(() => {
    const touch = window.matchMedia("(hover: none) and (pointer: coarse)");
    let start: { x: number; y: number; at: number; targets: Targets; scrollers: Scroller[] } | null = null;
    // 넘어가는 중에 또 밀면 방금 고른 곳에서 이어서 넘긴다 (빠르게 여러 번 밀어도 멈추지 않게)
    let pending: string | null = null;

    const reset = () => {
      start = null;
      setHint(null);
    };
    /** 손가락 방향(-1: 왼쪽, 1: 오른쪽)으로 표가 아직 스크롤되면 표가 먼저다 */
    const tableFirst = (dx: number) => !!start?.scrollers.some((s) => (dx < 0 ? s.canRight : s.canLeft));

    const onStart = (e: TouchEvent) => {
      start = null;
      if (!touch.matches || e.touches.length !== 1 || !(e.target instanceof Element)) return;
      if (blocked(e.target) || window.getSelection()?.toString()) return;
      const base = pending ?? pathname;
      const targets = menuTargets(base) ?? (pending ? {} : pageTargets());
      if (!targets.prev && !targets.next) return;
      const t = e.touches[0];
      start = { x: t.clientX, y: t.clientY, at: Date.now(), targets, scrollers: scrollersAt(e.target) };
    };
    const onMove = (e: TouchEvent) => {
      if (!start) return;
      if (e.touches.length !== 1) return reset();
      const t = e.touches[0];
      const dx = t.clientX - start.x;
      const dy = t.clientY - start.y;
      // 위아래로 스크롤하는 중이면 이번 손짓은 넘기기가 아니다
      if (Math.abs(dy) > 30 && Math.abs(dy) > Math.abs(dx)) return reset();
      if (Math.abs(dx) < SHOW || Math.abs(dx) < Math.abs(dy) * 1.5 || tableFirst(dx)) return setHint(null);
      const dir = dx < 0 ? "next" : "prev";
      const to = start.targets[dir];
      setHint(to ? { dir, label: to.label, ready: Math.abs(dx) >= GO, progress: Math.min(1, Math.abs(dx) / GO) } : null);
    };
    const onEnd = (e: TouchEvent) => {
      if (!start) return;
      const t = e.changedTouches[0];
      const dx = t.clientX - start.x;
      const dy = t.clientY - start.y;
      const quick = Date.now() - start.at < 1000;
      const far = Math.abs(dx) >= GO && Math.abs(dx) > Math.abs(dy) * 1.5 && (quick || Math.abs(dx) >= GO * 1.6) && !tableFirst(dx);
      const to = dx < 0 ? start.targets.next : start.targets.prev;
      reset();
      if (!far || !to) return;
      pending = to.href;
      router.push(to.href);
    };

    document.addEventListener("touchstart", onStart, { passive: true });
    document.addEventListener("touchmove", onMove, { passive: true });
    document.addEventListener("touchend", onEnd, { passive: true });
    document.addEventListener("touchcancel", reset, { passive: true });
    return () => {
      document.removeEventListener("touchstart", onStart);
      document.removeEventListener("touchmove", onMove);
      document.removeEventListener("touchend", onEnd);
      document.removeEventListener("touchcancel", reset);
    };
  }, [pathname, router]);

  if (!hint) return null;
  return (
    <div
      aria-hidden
      style={{ opacity: 0.35 + hint.progress * 0.65 }}
      className={`pointer-events-none fixed top-1/2 z-40 max-w-[70vw] -translate-y-1/2 truncate rounded-full px-4 py-2.5 text-[14px] font-bold shadow-lg ring-1 transition-colors ${
        hint.dir === "prev" ? "left-3" : "right-3"
      } ${hint.ready ? "bg-ink text-on-ink ring-ink" : "bg-card text-ink ring-line"}`}
    >
      {hint.dir === "prev" ? `‹ ${hint.label}` : `${hint.label} ›`}
    </div>
  );
}
