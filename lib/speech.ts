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

/**
 * 밝고 상냥한 여성 목소리를 고른다(아나운서 느낌).
 * 기기마다 들어 있는 음성 이름이 달라서, 알려진 여성 음성에 점수를 주고 남성 음성은 뒤로 보낸다.
 */
const FEMALE: Record<"ko-KR" | "en-US", RegExp> = {
  "ko-KR": /sunhi|heami|yuna|seoyeon|jimin|google 한국|google korean|kyuri|nara|sora|female|여성/i,
  "en-US": /aria|jenny|ava|emma|michelle|ana|zira|samantha|allison|ava|nicky|susan|karen|moira|tessa|google us english|female/i,
};
const MALE = /injoon|hyunsu|guy|davis|andrew|brian|christopher|eric|roger|steve|alex\b|daniel|fred|tom\b|aaron|ryan|male/i;

function pick(lang: "en-US" | "ko-KR"): SpeechSynthesisVoice | undefined {
  const norm = (l: string) => l.replace("_", "-");
  const pool = voices().filter((v) => norm(v.lang).toLowerCase().startsWith(lang.slice(0, 2).toLowerCase()));
  if (!pool.length) return undefined;
  const score = (v: SpeechSynthesisVoice) => {
    let s = 0;
    if (norm(v.lang).toLowerCase() === lang.toLowerCase()) s += 4;
    if (/natural|neural|online|premium|enhanced/i.test(v.name)) s += 3;
    if (FEMALE[lang].test(v.name)) s += 5;
    if (MALE.test(v.name)) s -= 6;
    return s;
  };
  return [...pool].sort((a, b) => score(b) - score(a))[0];
}

/** 브라우저에 내장된 음성으로 읽어 준다(무료). 밝은 여성 목소리를 먼저 고른다. */
export function speak(text: string, lang: "en-US" | "ko-KR" = "en-US", onEnd?: () => void) {
  if (!canSpeak()) return;
  const synth = window.speechSynthesis;
  synth.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang;
  // 또렷하고 상냥하게: 영어는 조금 천천히, 음높이는 살짝 올린다
  u.rate = lang === "en-US" ? 0.95 : 1.02;
  u.pitch = 1.12;
  const best = pick(lang);
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
