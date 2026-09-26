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
// 지운 기록의 흔적(무엇을 언제 지웠는지). 다른 기기와 합칠 때 지운 것이 되살아나지 않게 한다
const WORDS_GONE_KEY = "gm-words-gone";
const READ_GONE_KEY = "gm-read-gone";
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
  for (const k of [WORDS_KEY, QUIZ_KEY, READ_KEY, WORDS_GONE_KEY, READ_GONE_KEY]) {
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
    noteGone(WORDS_GONE_KEY, w.lemma);
    write(WORDS_KEY, list);
    return false;
  }
  write(WORDS_KEY, [{ ...w, savedAt: Date.now() }, ...list]);
  return true;
}
export function removeWord(lemma: string) {
  noteGone(WORDS_GONE_KEY, lemma);
  write(WORDS_KEY, getWords().filter((w) => w.lemma !== lemma));
}

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
  else {
    delete all[unit];
    noteGone(READ_GONE_KEY, unit);
  }
  write(READ_KEY, all);
}

function noteGone(key: string, id: string) {
  const gone = read<Record<string, number>>(key, {});
  gone[id] = Date.now();
  try {
    localStorage.setItem(key, JSON.stringify(gone));
  } catch {}
}

/** 동기화용: 이 기기의 기록 전부 */
export interface RecordsBundle {
  words: SavedWord[];
  wordsGone: Record<string, number>;
  quiz: Record<string, QuizRecord>;
  read: Record<string, number>;
  readGone: Record<string, number>;
}
export const exportAll = (): RecordsBundle => ({
  words: getWords(),
  wordsGone: read<Record<string, number>>(WORDS_GONE_KEY, {}),
  quiz: getQuiz(),
  read: getRead(),
  readGone: read<Record<string, number>>(READ_GONE_KEY, {}),
});
/** 동기화용: 합친 결과를 이 기기에 덮어쓴다 (화면도 새로 그려진다) */
export function importAll(b: RecordsBundle) {
  try {
    localStorage.setItem(WORDS_KEY, JSON.stringify(b.words));
    localStorage.setItem(WORDS_GONE_KEY, JSON.stringify(b.wordsGone));
    localStorage.setItem(QUIZ_KEY, JSON.stringify(b.quiz));
    localStorage.setItem(READ_KEY, JSON.stringify(b.read));
    localStorage.setItem(READ_GONE_KEY, JSON.stringify(b.readGone));
  } catch {}
  window.dispatchEvent(new Event(EVENT));
}
