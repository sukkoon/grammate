"use client";

import { useSyncExternalStore } from "react";
import { speak } from "./speech";

/**
 * 문제를 풀었을 때 소리로 알려 주기.
 * - 효과음: 파일 없이 브라우저에서 바로 만든다(Web Audio). 맞으면 밝게 올라가는 두 음, 틀리면 부드럽게 내려가는 두 음.
 *   틀렸을 때도 '삑' 같은 경고음은 쓰지 않는다: 점수보다 헷갈린 곳을 보자는 사이트 원칙에 맞춰 다정하게.
 * - 목소리: 효과음 뒤에 짧은 말 ('잘했어요!', '다시 생각해 봐요'). 같은 말만 되풀이하지 않게 몇 가지를 돌려 쓴다.
 * - 설정은 기기마다 저장한다: 목소리까지 / 효과음만 / 끄기.
 */

export type SoundMode = "voice" | "chime" | "off";
const KEY = "gm-quiz-sound";
const EVENT = "gm-quiz-sound";
const MODES: SoundMode[] = ["voice", "chime", "off"];

function read(): SoundMode {
  try {
    const v = localStorage.getItem(KEY);
    return v === "chime" || v === "off" ? v : "voice";
  } catch {
    return "voice";
  }
}

export function nextSoundMode() {
  const next = MODES[(MODES.indexOf(read()) + 1) % MODES.length];
  try {
    localStorage.setItem(KEY, next);
  } catch {}
  window.dispatchEvent(new Event(EVENT));
}

const subscribe = (fn: () => void) => {
  window.addEventListener(EVENT, fn);
  window.addEventListener("storage", fn);
  return () => {
    window.removeEventListener(EVENT, fn);
    window.removeEventListener("storage", fn);
  };
};
export const useSoundMode = () => useSyncExternalStore(subscribe, read, () => "voice" as SoundMode);

const PRAISE = ["잘했어요!", "정답이에요!", "맞았어요, 좋아요!", "훌륭해요!"];
const RETHINK = ["다시 생각해 봐요. 풀이에 힌트가 있어요.", "괜찮아요. 풀이를 보고 다시 생각해 봐요.", "아쉬워요. 왜 그런지 같이 볼까요?"];
let turn = 0;

let ctx: AudioContext | null = null;
function audio(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AC) return null;
  if (!ctx) ctx = new AC();
  if (ctx.state === "suspended") ctx.resume().catch(() => {});
  return ctx;
}

/** 부드러운 음 하나: 빨리 올라갔다가 천천히 사라진다 */
function tone(ac: AudioContext, freq: number, at: number, length: number, peak: number, type: OscillatorType) {
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, at);
  gain.gain.setValueAtTime(0.0001, at);
  gain.gain.exponentialRampToValueAtTime(peak, at + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, at + length);
  osc.connect(gain).connect(ac.destination);
  osc.start(at);
  osc.stop(at + length + 0.05);
}

function chime(correct: boolean) {
  const ac = audio();
  if (!ac) return;
  const t = ac.currentTime + 0.01;
  if (correct) {
    // 라5 → 미6: 맑게 올라가는 '딩동'
    tone(ac, 880, t, 0.35, 0.14, "sine");
    tone(ac, 1318.5, t + 0.12, 0.5, 0.12, "sine");
    tone(ac, 2637, t + 0.12, 0.3, 0.02, "sine"); // 살짝 반짝이는 배음
  } else {
    // 솔4 → 미♭4: 낮고 부드럽게 내려가는 '음-음'
    tone(ac, 392, t, 0.28, 0.1, "triangle");
    tone(ac, 311.1, t + 0.16, 0.4, 0.09, "triangle");
  }
}

/** 답을 고른 직후에 부른다 (누른 순간 안에서 불러야 휴대폰에서도 소리가 난다) */
export function playFeedback(correct: boolean) {
  const mode = read();
  if (mode === "off") return;
  chime(correct);
  if (mode !== "voice") return;
  const list = correct ? PRAISE : RETHINK;
  const text = list[turn++ % list.length];
  window.setTimeout(() => speak(text, "ko-KR"), correct ? 420 : 480);
}
