import type { ReactNode } from "react";
import { Mate } from "@/components/brand/Mate";
import type { Band } from "@/lib/level";

const peekText: Record<Exclude<Band, "elem">, string> = {
  middle: "중학생 과정이에요",
  high: "고등학생 과정이에요",
};

/**
 * 내 수준보다 높은 내용을 접어 둔다.
 * - 초등이 중등 내용을 만나면: '중학생 과정이에요 · 살짝 보기'
 * - peek={false}면 접지 않고 아예 숨긴다 (쉬운 풀이가 따로 있을 때)
 */
export function Lv({ min, peek = true, children }: { min: Band; peek?: boolean; children: ReactNode }) {
  if (min === "elem") return <>{children}</>;
  if (!peek) return <div data-lv-only-min={min}>{children}</div>;
  return (
    <div data-lv-min={min}>
      <button
        type="button"
        className="lv-peek my-4 w-full items-center gap-2.5 rounded-2xl border border-dashed border-line bg-card/60 px-4 py-3 text-left hover:border-ink-3"
      >
        <Mate mood="thinking" size={28} className="shrink-0 text-ink-3" />
        <span className="min-w-0 flex-1 text-[14.5px] text-ink-2">
          <b className="text-ink">{peekText[min]}</b>
          <span className="hidden sm:inline"> · 궁금하면 살짝 볼 수 있어요</span>
        </span>
        <span className="shrink-0 text-[13.5px] font-bold text-coral-ink">살짝 보기</span>
      </button>
      <div className="lv-body">{children}</div>
    </div>
  );
}

/** 초등학생에게만 보이는 쉬운 풀이 */
export function Easy({ children }: { children: ReactNode }) {
  return (
    <div data-lv-max="elem" className="my-5 rounded-2xl bg-mint-soft px-4 py-3.5 sm:px-5">
      <p className="text-[13px] font-extrabold text-mint-ink">쉽게 말하면</p>
      <div className="mt-1 [&>p]:my-1">{children}</div>
    </div>
  );
}

/** 중등 이상에게만 보이는 설명 (초등에게는 Easy가 대신 보일 때) */
export function More({ from = "middle", children }: { from?: Exclude<Band, "elem">; children: ReactNode }) {
  return <Lv min={from} peek={false}>{children}</Lv>;
}
