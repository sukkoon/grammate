"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { signOut, useMe } from "@/lib/auth";

/** 전화번호를 010-1234-5678 꼴로 */
function prettyPhone(p: string | null) {
  if (!p) return null;
  return p.length === 11 ? `${p.slice(0, 3)}-${p.slice(3, 7)}-${p.slice(7)}` : `${p.slice(0, 3)}-${p.slice(3, 6)}-${p.slice(6)}`;
}

/**
 * 머리글의 로그인 상태.
 * - 로그인 전: '로그인' 링크
 * - 로그인 뒤: 별명 단추. 누르면 아래에 계정 창(별명·전화번호·내 공부·로그아웃)이 열린다.
 *   로그아웃은 계정에 딸린 일이라 여기에 둔다(메뉴에는 없다).
 */
export function AuthStatus() {
  const me = useMe();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (me === undefined || pathname === "/login") return null;
  if (!me) {
    return (
      <Link
        href="/login"
        className="inline-flex h-9 shrink-0 items-center rounded-lg border border-line bg-card px-3 text-[13.5px] font-bold text-ink transition-colors hover:border-ink-3"
      >
        로그인
      </Link>
    );
  }

  return (
    <div ref={rootRef} className="relative shrink-0">
      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex h-9 max-w-[7rem] items-center gap-1.5 rounded-lg border px-3 text-[13.5px] font-bold transition-colors ${
          open ? "border-ink bg-ink text-on-ink" : "border-line bg-card text-ink hover:border-ink-3"
        }`}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden className="shrink-0">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" />
        </svg>
        <span className="truncate">{me.name}</span>
      </button>
      <div
        id={panelId}
        role="dialog"
        aria-label="내 계정"
        hidden={!open}
        className="absolute right-0 top-full z-40 mt-2 w-60 rounded-xl border border-line bg-card p-2 shadow-[0_12px_32px_-12px_rgba(31,42,68,0.35)]"
      >
        <div className="rounded-lg bg-chip px-3 py-2.5">
          <p className="truncate text-[15px] font-extrabold text-ink">{me.name}</p>
          {me.phone && <p className="mt-0.5 text-[12.5px] font-bold text-ink-3">{prettyPhone(me.phone)}</p>}
        </div>
        <Link
          href="/me"
          onClick={() => setOpen(false)}
          className="mt-1 flex items-center rounded-lg px-3 py-2 text-[14px] font-bold text-ink-2 transition-colors hover:bg-chip hover:text-ink"
        >
          내 공부 보기
        </Link>
        <button
          type="button"
          onClick={() => {
            setOpen(false);
            signOut();
          }}
          className="flex w-full items-center rounded-lg px-3 py-2 text-left text-[14px] font-bold text-coral-ink transition-colors hover:bg-coral-soft"
        >
          로그아웃
        </button>
      </div>
    </div>
  );
}
