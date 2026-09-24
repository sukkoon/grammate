"use client";

import { useEffect, useRef, useState } from "react";
import { BANDS, bandDesc, bandLabel } from "@/lib/level";
import { setBand, useBand } from "@/lib/use-level";

/** 머리글의 수준 선택: 초등 / 중등 / 고등 */
export function LevelSwitch() {
  const band = useBand();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={`설명 수준: ${band ? bandLabel[band] : "선택"}. 바꾸기`}
        className="inline-flex h-10 items-center gap-1.5 rounded-full bg-card px-3.5 text-[14px] font-extrabold ring-1 ring-line hover:bg-chip"
      >
        <span className="size-2 rounded-full bg-coral" aria-hidden />
        {band ? bandLabel[band] : "수준"}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden>
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      {open && (
        <div role="menu" className="fade-in absolute right-0 top-12 z-50 w-64 rounded-2xl border border-line bg-card p-2 shadow-[0_18px_40px_-18px_rgba(31,42,68,0.45)]">
          <p className="px-2.5 pb-1.5 pt-1 text-[12.5px] font-bold text-ink-3">어떤 설명으로 볼까요?</p>
          {BANDS.map((b) => (
            <button
              key={b}
              type="button"
              role="menuitemradio"
              aria-checked={band === b}
              onClick={() => {
                setBand(b);
                setOpen(false);
              }}
              className={`flex w-full flex-col rounded-xl px-3 py-2.5 text-left hover:bg-chip ${band === b ? "bg-chip" : ""}`}
            >
              <span className="flex items-center gap-2 font-extrabold">
                {bandLabel[b]}학생
                {band === b && <span className="text-[12px] text-coral-ink">선택됨</span>}
              </span>
              <span className="text-[13px] text-ink-2">{bandDesc[b]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
