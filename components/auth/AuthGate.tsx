"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { useMe } from "@/lib/auth";
import { authEnabled } from "@/lib/supabase";

/** 로그인 없이도 볼 수 있는 화면: 로그인, 약관·개인정보 */
const PUBLIC = ["/login", "/policy"];
const isPublic = (path: string) => PUBLIC.some((p) => path === p || path.startsWith(`${p}/`));

/**
 * 모든 시작은 로그인 화면부터. 로그인하지 않았으면 어떤 화면을 열어도 /login으로 보낸다.
 * 로그인 기능이 꺼져 있으면(환경 변수 없음) 막지 않는다.
 */
export function AuthGate({ children }: { children: ReactNode }) {
  const me = useMe();
  const pathname = usePathname();
  const router = useRouter();
  const open = !authEnabled() || isPublic(pathname);
  const blocked = !open && me === null;

  useEffect(() => {
    if (blocked) router.replace("/login");
  }, [blocked, router]);

  if (blocked) return null;
  return <>{children}</>;
}
