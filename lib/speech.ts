"use client";

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

export const canSpeak = () => typeof window !== "undefined" && "speechSynthesis" in window;

/** 브라우저에 내장된 음성으로 읽어 준다(무료). 자연스러운 음성을 먼저 고른다. */
export function speak(text: string, lang: "en-US" | "ko-KR" = "en-US", onEnd?: () => void) {
  if (!canSpeak()) return;
  const synth = window.speechSynthesis;
  synth.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang;
  u.rate = lang === "en-US" ? 0.92 : 1;
  const pool = voices().filter((v) => v.lang.replace("_", "-").startsWith(lang.slice(0, 2)));
  const best =
    pool.find((v) => /natural|neural|online/i.test(v.name) && v.lang.replace("_", "-") === lang) ??
    pool.find((v) => v.lang.replace("_", "-") === lang) ??
    pool[0];
  if (best) u.voice = best;
  if (onEnd) {
    u.onend = onEnd;
    u.onerror = onEnd;
  }
  synth.speak(u);
}

export function stopSpeaking() {
  if (canSpeak()) window.speechSynthesis.cancel();
}
