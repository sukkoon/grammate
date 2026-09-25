"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { isGuest, useMe } from "@/lib/auth";
import { authEnabled } from "@/lib/supabase";

/** 로그인 없이도 볼 수 있는 화면: 로그인, 약관·개인정보 */
const PUBLIC = ["/login", "/policy"];
const isPublic = (path: string) => PUBLIC.some((p) => path === p || path.startsWith(`${p}/`));

/**
 * 모든 시작은 로그인 화면부터. 앱이든 웹이든 로그인하지 않았으면 어떤 화면을 열어도 /login으로 보낸다.
 * 로그인 기능이 아직 꺼져 있을 때(환경 변수 없음)만 로그인 화면의 '둘러보기'로 들어올 수 있다(이 탭에서만 유효).
 * 로그인 여부를 알기 전에는 아무것도 그리지 않아, 잠긴 화면이 잠깐 비치지 않는다.
 */
export function AuthGate({ children }: { children: ReactNode }) {
  const me = useMe();
  const pathname = usePathname();
  const router = useRouter();
  const [guest, setGuest] = useState<boolean | null>(null);

  useEffect(() => {
    setGuest(isGuest());
  }, [pathname]);

  const open = isPublic(pathname);
  const known = me !== undefined && guest !== null;
  const allowed = open || (known && (me !== null || (guest === true && !authEnabled())));
  const blocked = !open && known && !allowed;

  useEffect(() => {
    if (blocked) router.replace("/login");
  }, [blocked, router]);

  if (open) return <>{children}</>;
  if (!allowed) return null;
  return <>{children}</>;
}
