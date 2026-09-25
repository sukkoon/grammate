"use client";

import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { SUPABASE_KEY, SUPABASE_URL, supabase } from "./supabase";

/**
 * 전화번호 계정: 가입·로그인·비밀번호 찾기는 Edge Function gm-phone이 맡는다
 * (전화번호를 아이디로 쓰고, 메일 주소는 비밀번호를 잊었을 때만 쓴다).
 */
export type PhoneAction = "check" | "signup" | "login" | "sendreset" | "verifyreset";

export interface PhoneResult {
  ok: boolean;
  code?: string;
  message?: string;
  exists?: boolean;
  to?: string;
  session?: { access_token: string; refresh_token: string };
}

export async function phoneAuth(action: PhoneAction, body: Record<string, unknown>): Promise<PhoneResult> {
  if (!SUPABASE_URL) return { ok: false, code: "off", message: "아직 로그인 기능이 준비되지 않았어요." };
  try {
    const r = await fetch(`${SUPABASE_URL}/functions/v1/gm-phone`, {
      method: "POST",
      headers: { "Content-Type": "application/json", apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
      body: JSON.stringify({ action, ...body }),
    });
    const data = (await r.json()) as PhoneResult;
    return data;
  } catch {
    return { ok: false, code: "network", message: "연결이 잘 되지 않아요. 인터넷을 확인하고 다시 해 주세요." };
  }
}

/** 로그인 결과의 세션을 브라우저에 저장한다 */
export async function adoptSession(s: { access_token: string; refresh_token: string }) {
  const sb = supabase();
  if (!sb) return;
  await sb.auth.setSession({ access_token: s.access_token, refresh_token: s.refresh_token });
}

export async function signOut() {
  const sb = supabase();
  if (!sb) return;
  await sb.auth.signOut();
}

export interface Me {
  id: string;
  name: string;
  phone: string | null;
}

/** 지금 로그인한 사람. null이면 로그인 전, undefined면 아직 모름 */
export function useMe(): Me | null | undefined {
  const [me, setMe] = useState<Me | null | undefined>(undefined);
  useEffect(() => {
    const sb = supabase();
    if (!sb) {
      setMe(null);
      return;
    }
    let alive = true;
    const apply = (session: Session | null) => {
      if (!alive) return;
      if (!session) {
        setMe(null);
        return;
      }
      const meta = (session.user.user_metadata ?? {}) as { display_name?: string; gm_phone?: string };
      setMe({ id: session.user.id, name: meta.display_name || "학생", phone: meta.gm_phone ?? null });
    };
    sb.auth.getSession().then(({ data }) => apply(data.session));
    const { data: sub } = sb.auth.onAuthStateChange((_e, session) => apply(session));
    return () => {
      alive = false;
      sub.subscription.unsubscribe();
    };
  }, []);
  return me;
}

export const normPhone = (p: string) => {
  let d = p.replace(/[^0-9]/g, "");
  if (d.startsWith("82")) d = "0" + d.slice(2);
  return d;
};
export const validPhone = (p: string) => /^01[016789][0-9]{7,8}$/.test(p);
