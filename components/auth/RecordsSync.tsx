"use client";

import { useEffect, useRef } from "react";
import { useMe } from "@/lib/auth";
import { onStoreChange } from "@/lib/local-store";
import { syncOnLogin, syncPull, syncPush } from "@/lib/sync";

/**
 * 로그인한 동안 학습 기록을 계정에 맞춰 둔다.
 * - 로그인 직후 한 번 합치고, 기록이 바뀌면 1.5초 뒤 올리고, 화면에 돌아오면(다른 기기에서 공부했을 수 있으니) 받아 온다.
 */
export function RecordsSync() {
  const me = useMe();
  const userId = me?.id ?? null;
  const ready = useRef(false);

  useEffect(() => {
    if (!userId) {
      ready.current = false;
      return;
    }
    let alive = true;
    let timer: number | null = null;
    let lastPull = Date.now();

    syncOnLogin(userId).finally(() => {
      if (alive) ready.current = true;
    });

    const offStore = onStoreChange(() => {
      if (!ready.current) return;
      if (timer) window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        timer = null;
        syncPush(userId);
      }, 1500);
    });

    const onVisible = () => {
      if (document.visibilityState !== "visible" || !ready.current) return;
      if (Date.now() - lastPull < 60_000) return;
      lastPull = Date.now();
      syncPull(userId);
    };
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("online", onVisible);

    return () => {
      alive = false;
      if (timer) window.clearTimeout(timer);
      offStore();
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("online", onVisible);
    };
  }, [userId]);

  return null;
}
