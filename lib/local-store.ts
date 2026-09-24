"use client";

/**
 * 로그인 전에도 쓸 수 있도록 이 기기에 저장하는 학습 기록.
 * 로그인 기능이 붙으면 같은 모양으로 Supabase와 동기화한다.
 */

export interface SavedWord {
  word: string;
  lemma: string;
  pos: string;
  meaning: string;
  from?: string;
  savedAt: number;
}

export interface QuizRecord {
  /** "chapter/unit#index" */
  key: string;
  unit: string;
  question: string;
  correct: boolean;
  at: number;
}

const WORDS_KEY = "gm-words";
const QUIZ_KEY = "gm-quiz";
const READ_KEY = "gm-read";
const EVENT = "gm-store";

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new Event(EVENT));
  } catch {}
}

/** useSyncExternalStore용: 저장된 원본 문자열(값이 같으면 같은 스냅샷) */
export const rawSnapshot = (key: "words" | "quiz" | "read") => () => {
  try {
    return localStorage.getItem(key === "words" ? WORDS_KEY : key === "quiz" ? QUIZ_KEY : READ_KEY) ?? "";
  } catch {
    return "";
  }
};

export function clearAll() {
  for (const k of [WORDS_KEY, QUIZ_KEY, READ_KEY]) {
    try {
      localStorage.removeItem(k);
    } catch {}
  }
  window.dispatchEvent(new Event(EVENT));
}

export const onStoreChange = (fn: () => void) => {
  window.addEventListener(EVENT, fn);
  window.addEventListener("storage", fn);
  return () => {
    window.removeEventListener(EVENT, fn);
    window.removeEventListener("storage", fn);
  };
};

export const getWords = () => read<SavedWord[]>(WORDS_KEY, []);
export const hasWord = (lemma: string) => getWords().some((w) => w.lemma === lemma);
export function toggleWord(w: Omit<SavedWord, "savedAt">): boolean {
  const list = getWords();
  const i = list.findIndex((x) => x.lemma === w.lemma);
  if (i >= 0) {
    list.splice(i, 1);
    write(WORDS_KEY, list);
    return false;
  }
  write(WORDS_KEY, [{ ...w, savedAt: Date.now() }, ...list]);
  return true;
}
export const removeWord = (lemma: string) => write(WORDS_KEY, getWords().filter((w) => w.lemma !== lemma));

export const getQuiz = () => read<Record<string, QuizRecord>>(QUIZ_KEY, {});
export function saveQuiz(r: Omit<QuizRecord, "at">) {
  const all = getQuiz();
  all[r.key] = { ...r, at: Date.now() };
  write(QUIZ_KEY, all);
}

export const getRead = () => read<Record<string, number>>(READ_KEY, {});
export function markRead(unit: string, done = true) {
  const all = getRead();
  if (done) all[unit] = Date.now();
  else delete all[unit];
  write(READ_KEY, all);
}
