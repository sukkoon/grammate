import type { ReactNode } from "react";
import { Mate } from "@/components/brand/Mate";
import type { Band } from "@/lib/level";

const bandWho: Record<Exclude<Band, "elem">, string> = {
  middle: "중학생",
  high: "고등학생",
};

/**
 * 내 수준보다 높은 내용을 접어 둔다.
 * - 초등이 중등 내용을 만나면: '중학생 문법까지 더 학습하기' 단추. 누르면 펼치고, '접기'로 다시 접는다.
 * - label로 단추 글을 바꿀 수 있다 (용어 카드: '중학생 설명까지 더 보기').
 * - peek={false}면 접지 않고 아예 숨긴다 (쉬운 풀이가 따로 있을 때)
 */
export function Lv({
  min,
  peek = true,
  label,
  topic,
  compact = false,
  children,
}: {
  min: Band;
  peek?: boolean;
  label?: string;
  /** 접힌 내용의 제목 (심화 상자·시험 포인트) */
  topic?: string;
  compact?: boolean;
  children: ReactNode;
}) {
  if (min === "elem") return <>{children}</>;
  if (!peek) return <div data-lv-only-min={min}>{children}</div>;
  const who = bandWho[min];
  return (
    <div data-lv-min={min}>
      <button
        type="button"
        className={`lv-peek w-full items-center gap-2.5 rounded-2xl border border-dashed border-coral/50 bg-coral-soft/40 text-left transition-colors hover:border-coral hover:bg-coral-soft/70 ${
          compact ? "mt-3 px-3 py-2" : "my-4 px-4 py-3"
        }`}
      >
        {!compact && <Mate mood="cheer" size={28} className="shrink-0 text-ink" />}
        <span className="min-w-0 flex-1">
          <b className="block text-[15px] text-ink">{label ?? `${who} 문법까지 더 학습하기`}</b>
          {!compact && (
            <span className="text-[14px] text-ink-2">{topic ? `${topic} · 궁금하면 펼쳐 봐요` : "지금 고른 수준보다 높은 내용이에요. 궁금하면 펼쳐 봐요."}</span>
          )}
        </span>
        <span aria-hidden className="shrink-0 text-[15px] font-extrabold text-coral-ink">
          펼치기 +
        </span>
      </button>
      <button type="button" className="lv-fold mb-1 ml-auto items-center gap-1 rounded-full px-2.5 py-1 text-[13.5px] font-bold text-ink-3 hover:bg-chip hover:text-ink">
        {who} 내용 · 접기 −
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
