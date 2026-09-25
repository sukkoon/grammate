"use client";

import { useRef, type KeyboardEvent } from "react";
import { Mate } from "@/components/brand/Mate";
import { BANDS, bandDesc, bandLabel, type Band } from "@/lib/level";
import { setBand, useBand, useBandChosen } from "@/lib/use-level";

/** 수준을 고르면 무엇이 달라지는지 한 줄로 */
const CHANGES: Record<Band, string> = {
  elem: "쉬운 풀이가 보이고, 중학생 이상 내용은 '더 학습하기'로 접혀 있어요.",
  middle: "내신 포인트까지 보이고, 고등 내용은 '더 학습하기'로 접혀 있어요.",
  high: "심화·수능 포인트와 '선생님의 한마디'까지 모두 펼쳐져 있어요.",
};

function useTabKeys(band: Band | null) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const next = e.key === "ArrowRight" ? i + 1 : e.key === "ArrowLeft" ? i - 1 : e.key === "Home" ? 0 : e.key === "End" ? BANDS.length - 1 : null;
    if (next === null) return;
    e.preventDefault();
    const j = (next + BANDS.length) % BANDS.length;
    setBand(BANDS[j]);
    refs.current[j]?.focus();
  };
  const tabIndex = (b: Band, i: number) => (band ? (band === b ? 0 : -1) : i === 0 ? 0 : -1);
  return { refs, onKeyDown, tabIndex };
}

/**
 * 초등 · 중등 · 고등 탭. 누르면 사이트 전체의 설명 수준이 바뀐다.
 * - variant="page": 단원·필수 문법·용어 사전 위에 두는 큰 탭 (무엇이 달라지는지 안내 포함)
 * - variant="compact": 머리글에 두는 작은 탭
 */
export function LevelTabs({ variant = "page" }: { variant?: "page" | "compact" }) {
  const band = useBand();
  const chosen = useBandChosen();
  const { refs, onKeyDown, tabIndex } = useTabKeys(band);

  const tabs = (
    <div role="tablist" aria-label="설명 수준 고르기" className={`grid grid-cols-3 gap-1 rounded-full bg-chip p-1 ${variant === "compact" ? "w-[11.5rem]" : ""}`}>
      {BANDS.map((b, i) => {
        const on = band === b;
        return (
          <button
            key={b}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="tab"
            aria-selected={on}
            tabIndex={tabIndex(b, i)}
            onClick={() => setBand(b)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={`rounded-full font-extrabold transition-colors ${
              variant === "compact" ? "h-8 text-[13.5px]" : "h-10 text-[15px]"
            } ${on ? "bg-ink text-on-ink shadow-sm" : "text-ink-2 hover:bg-card hover:text-ink"}`}
          >
            {bandLabel[b]}
          </button>
        );
      })}
    </div>
  );

  if (variant === "compact") return tabs;

  return (
    <section aria-label="설명 수준" className="rounded-2xl border border-line bg-card px-4 py-3.5">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2.5">
        <p className="flex items-center gap-2 text-[14.5px] font-extrabold">
          <Mate mood={chosen ? "happy" : "wink"} size={26} className="shrink-0 text-ink" />
          {chosen ? "지금 보는 설명 수준" : "나에게 맞는 수준을 골라 봐요"}
        </p>
        <div className="w-full sm:w-72">{tabs}</div>
      </div>
      <p className="mt-2.5 text-[13.5px] text-ink-2" aria-live="polite">
        {band ? (
          <>
            <b className="text-ink">{bandLabel[band]}</b> · {bandDesc[band]} {CHANGES[band]}
          </>
        ) : (
          "고른 수준에 맞춰 설명의 범위와 깊이가 달라져요."
        )}
      </p>
    </section>
  );
}
