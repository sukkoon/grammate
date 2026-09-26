"use client";

/**
 * 로그인 전에도 쓸 수 있도록 이 기기에 저장하는 학습 기록.
 * 로그인하면 lib/sync.ts가 같은 모양으로 계정(Supabase gm_records)과 맞춘다.
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
// '기록 모두 지우기'를 누른 시각. 이보다 앞선 기록은 어느 기기에서 와도 버린다
const CLEARED_KEY = "gm-cleared-at";
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

const RECORD_KEYS = [WORDS_KEY, QUIZ_KEY, READ_KEY, WORDS_GONE_KEY, READ_GONE_KEY];

/** 이 기기의 기록만 비운다 (다른 계정으로 로그인했을 때). 계정에 저장된 기록은 그대로다 */
export function clearAll() {
  for (const k of [...RECORD_KEYS, CLEARED_KEY]) {
    try {
      localStorage.removeItem(k);
    } catch {}
  }
  window.dispatchEvent(new Event(EVENT));
}

/** '기록 모두 지우기': 지운 시각을 남겨, 로그인한 다른 기기의 기록도 함께 지워지게 한다 */
export function clearMine() {
  try {
    for (const k of RECORD_KEYS) localStorage.removeItem(k);
    localStorage.setItem(CLEARED_KEY, JSON.stringify(Date.now()));
  } catch {}
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
  /** 기록 모두 지우기를 누른 시각 (없으면 0) */
  clearedAt: number;
}
export const exportAll = (): RecordsBundle => ({
  words: getWords(),
  wordsGone: read<Record<string, number>>(WORDS_GONE_KEY, {}),
  quiz: getQuiz(),
  read: getRead(),
  readGone: read<Record<string, number>>(READ_GONE_KEY, {}),
  clearedAt: read<number>(CLEARED_KEY, 0),
});
/** 동기화용: 합친 결과를 이 기기에 덮어쓴다 (화면도 새로 그려진다) */
export function importAll(b: RecordsBundle) {
  try {
    localStorage.setItem(WORDS_KEY, JSON.stringify(b.words));
    localStorage.setItem(WORDS_GONE_KEY, JSON.stringify(b.wordsGone));
    localStorage.setItem(QUIZ_KEY, JSON.stringify(b.quiz));
    localStorage.setItem(READ_KEY, JSON.stringify(b.read));
    localStorage.setItem(READ_GONE_KEY, JSON.stringify(b.readGone));
    if (b.clearedAt) localStorage.setItem(CLEARED_KEY, JSON.stringify(b.clearedAt));
    else localStorage.removeItem(CLEARED_KEY);
  } catch {}
  window.dispatchEvent(new Event(EVENT));
}
