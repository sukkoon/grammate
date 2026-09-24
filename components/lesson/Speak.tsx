"use client";

import { useState, useSyncExternalStore } from "react";
import { canSpeak, speak, stopSpeaking } from "@/lib/speech";

const noSubscribe = () => () => {};

/** 예문 원어민 발음 듣기 (브라우저 내장 음성) */
export function Speak({ text, label = "발음 듣기" }: { text: string; label?: string }) {
  // 서버에서는 false, 브라우저에서는 음성 기능이 있는지 확인한다.
  const ok = useSyncExternalStore(noSubscribe, canSpeak, () => false);
  const [on, setOn] = useState(false);
  if (!ok) return null;
  return (
    <button
      type="button"
      onClick={() => {
        if (on) {
          stopSpeaking();
          setOn(false);
          return;
        }
        setOn(true);
        speak(text, "en-US", () => setOn(false));
      }}
      aria-label={on ? "멈추기" : `${label}: ${text}`}
      className={`grid size-10 shrink-0 place-items-center rounded-full transition-colors ${
        on ? "bg-coral text-on-ink" : "text-ink-3 hover:bg-chip hover:text-ink"
      }`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M11 5 6 9H3v6h3l5 4V5Z" />
        <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />
      </svg>
    </button>
  );
}
