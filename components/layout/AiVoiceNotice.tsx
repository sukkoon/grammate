"use client";

import { useEffect, useState } from "react";
import { AI_VOICE_EVENT } from "@/lib/speech";

/** 읽어 주기에 AI 음성이 처음 나올 때, 사람 목소리가 아니라 AI가 만든 목소리라고 잠깐 알려 준다 */
export function AiVoiceNotice() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    let timer: number | undefined;
    const on = () => {
      setShow(true);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setShow(false), 5000);
    };
    window.addEventListener(AI_VOICE_EVENT, on);
    return () => {
      window.removeEventListener(AI_VOICE_EVENT, on);
      window.clearTimeout(timer);
    };
  }, []);
  if (!show) return null;
  return (
    <div
      role="status"
      className="fade-in fixed bottom-24 left-1/2 z-50 flex w-max max-w-[calc(100vw-32px)] -translate-x-1/2 items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-[14px] font-bold text-on-ink shadow-lg"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="shrink-0">
        <path d="M11 5 6 9H3v6h3l5 4V5Z" />
        <path d="M15.5 8.5a5 5 0 0 1 0 7" />
      </svg>
      지금 들리는 목소리는 AI가 만든 목소리예요
    </div>
  );
}
