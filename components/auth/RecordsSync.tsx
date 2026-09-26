"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useMe } from "@/lib/auth";
import { onStoreChange } from "@/lib/local-store";
import { applyingRemote, stopSync, syncNow } from "@/lib/sync";

/** 화면을 보고 있는 동안 다른 기기의 기록을 받아 오는 간격 */
const POLL_MS = 30_000;
/** 화면 복귀·페이지 이동이 잇따를 때 너무 자주 맞추지 않도록 */
const MIN_GAP_MS = 5_000;

/**
 * 로그인한 동안 학습 기록을 계정에 맞춰 둔다. 어느 기기에서 공부해도 모든 기기에 같은 기록이 보이도록:
 * - 화면을 열면 바로 맞추고, 기록이 바뀌면 1.5초 뒤(화면을 떠나면 바로) 맞춘다. 서버 것을 먼저 받아 합친 뒤 올린다.
 * - 화면에 돌아올 때, 페이지를 옮길 때, 보고 있는 동안 30초마다 다른 기기에서 바뀐 것을 받아 온다.
 */
export function RecordsSync() {
  const me = useMe();
  const userId = me?.id ?? null;
  const pathname = usePathname();
  const kick = useRef<() => void>(() => {});

  useEffect(() => {
    if (!userId) {
      stopSync();
      return;
    }
    let timer: number | null = null;
    let last = 0;
    const run = () => {
      last = Date.now();
      syncNow(userId);
    };
    const maybe = () => {
      if (document.visibilityState !== "visible" || Date.now() - last < MIN_GAP_MS) return;
      run();
    };
    kick.current = maybe;
    run();

    const offStore = onStoreChange(() => {
      if (applyingRemote()) return;
      if (timer) window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        timer = null;
        run();
      }, 1500);
    });
    // 화면을 떠날 때 아직 올리지 않은 기록이 있으면 바로 올린다 (휴대폰에서 앱을 바꿀 때 등)
    const onVisibility = () => {
      if (document.visibilityState === "visible") return maybe();
      if (!timer) return;
      window.clearTimeout(timer);
      timer = null;
      run();
    };
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("focus", maybe);
    window.addEventListener("online", maybe);
    const poll = window.setInterval(maybe, POLL_MS);

    return () => {
      kick.current = () => {};
      if (timer) window.clearTimeout(timer);
      window.clearInterval(poll);
      offStore();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("focus", maybe);
      window.removeEventListener("online", maybe);
    };
  }, [userId]);

  useEffect(() => {
    kick.current();
  }, [pathname]);

  return null;
}
