"use client";

import { useSyncExternalStore } from "react";
import { getRead, markRead, onStoreChange } from "@/lib/local-store";

const isRead = (unit: string) => () => !!getRead()[unit];

/** 목차에 표시하는 '다 읽음' 표시 */
export function ReadMark({ unit }: { unit: string }) {
  const read = useSyncExternalStore(onStoreChange, isRead(unit), () => false);
  if (!read) return null;
  return (
    <span className="shrink-0 rounded-lg bg-mint-soft px-2 py-0.5 text-[12px] font-extrabold text-mint-ink">다 읽음</span>
  );
}

/** 단원 끝의 '다 읽었어요' 버튼 */
export function ReadButton({ unit }: { unit: string }) {
  const read = useSyncExternalStore(onStoreChange, isRead(unit), () => false);
  return (
    <button
      type="button"
      onClick={() => markRead(unit, !read)}
      aria-pressed={read}
      className={`inline-flex min-h-12 items-center gap-2 rounded-lg px-5 font-bold transition-colors ${
        read ? "bg-mint-soft text-mint-ink" : "bg-card ring-1 ring-line hover:bg-chip"
      }`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M5 12.5l4.5 4.5L19 7.5" />
      </svg>
      {read ? "다 읽었어요" : "이 단원 다 읽었어요"}
    </button>
  );
}
