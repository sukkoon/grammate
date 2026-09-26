"use client";

import { nextSoundMode, useSoundMode, type SoundMode } from "@/lib/feedback";

const LABEL: Record<SoundMode, string> = { voice: "목소리", chime: "효과음만", off: "소리 끔" };
const NEXT: Record<SoundMode, string> = { voice: "효과음만", chime: "소리 끔", off: "목소리" };

/** 문제 상자 머리의 작은 단추: 정답·오답 알림을 목소리 → 효과음만 → 끔 차례로 바꾼다 (모든 문제 상자가 함께 바뀐다) */
export function SoundToggle() {
  const mode = useSoundMode();
  return (
    <button
      type="button"
      onClick={nextSoundMode}
      aria-label={`정답 알림 소리: ${LABEL[mode]}. 누르면 ${NEXT[mode]}(으)로 바꿔요`}
      title="정답 알림 소리 바꾸기"
      className="ml-auto inline-flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[13px] font-bold text-ink-3 ring-1 ring-line hover:bg-chip hover:text-ink"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M11 5 6 9H3v6h3l5 4V5Z" />
        {mode === "off" ? (
          <path d="m16 9 5 6M21 9l-5 6" />
        ) : (
          <>
            <path d="M15.5 8.5a5 5 0 0 1 0 7" />
            {mode === "voice" && <path d="M18.5 5.5a9 9 0 0 1 0 13" />}
          </>
        )}
      </svg>
      {LABEL[mode]}
    </button>
  );
}
