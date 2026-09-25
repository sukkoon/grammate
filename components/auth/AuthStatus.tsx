"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useMe } from "@/lib/auth";

/** 머리글의 로그인 상태: 로그인 전에는 '로그인' 링크, 로그인 뒤에는 이름과 로그아웃 */
export function AuthStatus() {
  const me = useMe();
  const pathname = usePathname();
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
    <span className="inline-flex h-9 shrink-0 items-center gap-1 rounded-lg border border-line bg-card pl-3 pr-1 text-[13.5px] font-bold text-ink">
      <Link href="/me" className="max-w-[6rem] truncate hover:text-coral-ink">
        {me.name}
      </Link>
      <button type="button" onClick={() => signOut()} aria-label="로그아웃" className="grid size-7 place-items-center rounded-md text-ink-3 hover:bg-chip hover:text-ink">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M10 17l5-5-5-5M15 12H3M21 3v18" />
        </svg>
      </button>
    </span>
  );
}
