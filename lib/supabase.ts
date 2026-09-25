"use client";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * 브라우저에서 쓰는 Supabase 클라이언트.
 * 주소와 공개 키(publishable key)는 브라우저에 실려 나가는 공개 값이라 코드에 기본값으로 둔다.
 * 다른 프로젝트로 바꾸려면 환경 변수 NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY로 덮어쓴다.
 * 데이터 보호는 키가 아니라 Supabase의 행 단위 보안(RLS)이 맡는다.
 */
const DEFAULT_URL = "https://nsfwfnwpioyypccgdxab.supabase.co";
const DEFAULT_KEY = "sb_publishable_MEdm2sQb8Tq2H9BgXYukGw_yzcwkZxg";
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_URL;
export const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || DEFAULT_KEY;

let client: SupabaseClient | null = null;

export function supabase(): SupabaseClient | null {
  if (!SUPABASE_URL || !SUPABASE_KEY) return null;
  if (!client) {
    client = createClient(SUPABASE_URL, SUPABASE_KEY, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: false, storageKey: "gm-auth" },
    });
  }
  return client;
}

/** 로그인 기능이 켜져 있는지 (환경 변수가 있으면 켜진 것) */
export const authEnabled = () => Boolean(SUPABASE_URL && SUPABASE_KEY);
