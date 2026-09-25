"use client";

import { supabase } from "./supabase";

/**
 * 읽어 주기.
 * 1) 서버의 신경망 음성(/api/tts, 키가 있을 때)을 먼저 쓴다 — 따뜻하고 차분한 과외 선생님 목소리.
 * 2) 없거나 실패하면 브라우저 내장 음성으로 읽는다(밝은 여성 목소리를 고른다).
 */

let cachedVoices: SpeechSynthesisVoice[] = [];

function voices(): SpeechSynthesisVoice[] {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return [];
  const v = window.speechSynthesis.getVoices();
  if (v.length) cachedVoices = v;
  return cachedVoices;
}

if (typeof window !== "undefined" && "speechSynthesis" in window) {
  window.speechSynthesis.onvoiceschanged = () => voices();
}

export const canSpeak = () =>
  typeof window !== "undefined" && (("speechSynthesis" in window) || typeof Audio !== "undefined");

type Lang = "en-US" | "ko-KR";

// ── 1) 서버 신경망 음성 ─────────────────────────────────────────────
let serverOff = false; // 404(키 없음)를 한 번 받으면 이 세션에서는 다시 묻지 않는다
const audioCache = new Map<string, string>(); // text|lang → object URL
let current: HTMLAudioElement | null = null;

async function token(): Promise<string | null> {
  const sb = supabase();
  if (!sb) return null;
  const { data } = await sb.auth.getSession();
  return data.session?.access_token ?? null;
}

async function serverAudio(text: string, lang: Lang): Promise<string | null> {
  if (serverOff) return null;
  const key = `${lang}|${text}`;
  const hit = audioCache.get(key);
  if (hit) return hit;
  const t = await token();
  if (!t) return null;
  const r = await fetch("/api/tts", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${t}` },
    body: JSON.stringify({ text, lang }),
  });
  if (r.status === 404) {
    serverOff = true;
    return null;
  }
  if (!r.ok) return null;
  const url = URL.createObjectURL(await r.blob());
  audioCache.set(key, url);
  return url;
}

// ── 2) 브라우저 내장 음성 ─────────────────────────────────────────────
const FEMALE: Record<Lang, RegExp> = {
  "ko-KR": /sunhi|heami|yuna|seoyeon|jimin|google 한국|google korean|kyuri|nara|sora|female|여성/i,
  "en-US": /aria|jenny|ava|emma|michelle|ana|zira|samantha|allison|nicky|susan|karen|moira|tessa|google us english|female/i,
};
const MALE = /injoon|hyunsu|guy|davis|andrew|brian|christopher|eric|roger|steve|alex\b|daniel|fred|tom\b|aaron|ryan|male/i;

function pick(lang: Lang): SpeechSynthesisVoice | undefined {
  const norm = (l: string) => l.replace("_", "-").toLowerCase();
  const pool = voices().filter((v) => norm(v.lang).startsWith(lang.slice(0, 2).toLowerCase()));
  if (!pool.length) return undefined;
  const score = (v: SpeechSynthesisVoice) => {
    let s = 0;
    if (norm(v.lang) === lang.toLowerCase()) s += 4;
    if (/natural|neural|online|premium|enhanced/i.test(v.name)) s += 3;
    if (FEMALE[lang].test(v.name)) s += 5;
    if (MALE.test(v.name)) s -= 6;
    return s;
  };
  return [...pool].sort((a, b) => score(b) - score(a))[0];
}

function browserSpeak(text: string, lang: Lang, onEnd?: () => void) {
  if (!("speechSynthesis" in window)) {
    onEnd?.();
    return;
  }
  const synth = window.speechSynthesis;
  synth.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang;
  u.rate = lang === "en-US" ? 0.92 : 0.98;
  u.pitch = 1.08;
  const best = pick(lang);
  if (best) u.voice = best;
  if (onEnd) {
    u.onend = onEnd;
    u.onerror = onEnd;
  }
  synth.speak(u);
}

// ── 공개 API ─────────────────────────────────────────────
let seq = 0;

export function speak(text: string, lang: Lang = "en-US", onEnd?: () => void) {
  if (typeof window === "undefined") return;
  stopSpeaking();
  const my = ++seq;
  serverAudio(text, lang)
    .catch(() => null)
    .then((url) => {
      if (my !== seq) return; // 그새 다른 읽기가 시작됐다
      if (!url) {
        browserSpeak(text, lang, onEnd);
        return;
      }
      const a = new Audio(url);
      current = a;
      a.onended = () => {
        if (current === a) current = null;
        onEnd?.();
      };
      a.onerror = () => {
        if (current === a) current = null;
        browserSpeak(text, lang, onEnd);
      };
      a.play().catch(() => browserSpeak(text, lang, onEnd));
    });
}

export function stopSpeaking() {
  if (typeof window === "undefined") return;
  seq++;
  if (current) {
    current.pause();
    current = null;
  }
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
}
