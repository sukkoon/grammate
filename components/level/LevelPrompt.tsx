"use client";

import { Mate } from "@/components/brand/Mate";
import { BANDS, bandDesc, bandLabel } from "@/lib/level";
import { setBand, useBandChosen } from "@/lib/use-level";

/** 아직 수준을 고르지 않았을 때 단원 위에 뜨는 안내 */
export function LevelPrompt() {
  const chosen = useBandChosen();
  if (chosen) return null;
  return (
    <section aria-label="설명 수준 고르기" className="fade-in mb-6 rounded-2xl border border-line bg-card px-4 py-4 sm:px-5">
      <div className="flex items-start gap-3">
        <Mate mood="wink" size={36} className="shrink-0 text-ink" />
        <div className="min-w-0 flex-1">
          <p className="font-extrabold">나에게 맞는 설명으로 볼까요?</p>
          <p className="text-[14px] text-ink-2">고른 수준에 맞춰 설명의 범위와 깊이가 달라져요. 머리글에서 언제든 바꿀 수 있어요.</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {BANDS.map((b) => (
              <button
                key={b}
                type="button"
                onClick={() => setBand(b)}
                className="rounded-xl border border-line px-3 py-2.5 text-left hover:border-ink-3 hover:bg-chip"
              >
                <span className="block font-extrabold">{bandLabel[b]}학생이에요</span>
                <span className="block text-[12.5px] text-ink-2">{bandDesc[b]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
