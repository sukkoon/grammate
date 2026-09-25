"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMe } from "@/lib/auth";

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
  // 로그인 뒤에는 이름만 보인다(누르면 내 공부). 로그아웃은 메뉴 맨 아래에 있어서 실수로 누르지 않는다.
  return (
    <Link
      href="/me"
      className="inline-flex h-9 max-w-[7rem] shrink-0 items-center truncate rounded-lg border border-line bg-card px-3 text-[13.5px] font-bold text-ink transition-colors hover:border-ink-3 hover:text-coral-ink"
    >
      {me.name}
    </Link>
  );
}
