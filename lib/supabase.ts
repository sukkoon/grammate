"use client";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/** 브라우저에서 쓰는 Supabase 클라이언트. 주소와 공개 키는 .env.local(배포에서는 환경 변수)에서 온다. */
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "";

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
