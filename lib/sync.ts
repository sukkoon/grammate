"use client";

import { useSyncExternalStore } from "react";
import { exportAll, importAll, clearAll, type RecordsBundle, type SavedWord, type QuizRecord } from "./local-store";
import { supabase } from "./supabase";

/**
 * 학습 기록 동기화: 이 기기(localStorage) ↔ Supabase gm_records (본인만 읽고 쓸 수 있는 표).
 * - 맞출 때마다 서버 기록을 먼저 받아 기기 기록과 합치고, 합친 결과를 양쪽에 저장한다(받기 → 합치기 → 올리기).
 *   그래서 두 기기에서 번갈아 공부해도 한쪽 기록이 다른 쪽을 덮어쓰지 않고, 어느 기기에서나 같은 기록이 보인다.
 * - 언제 맞추나: 화면을 열 때, 기록이 바뀐 뒤, 화면에 돌아올 때, 페이지를 옮길 때, 화면을 보고 있는 동안 30초마다 (components/auth/RecordsSync.tsx).
 * - 인터넷이 없으면 기기에 남겨 두었다가 다음에 맞춘다.
 * - 같은 기기에서 다른 계정으로 로그인하면, 앞사람 기록은 서버에 있으므로 기기 기록을 비우고 새로 받는다.
 * - 합치는 규칙: 같은 항목은 더 나중에 일어난 일이 이긴다(저장 vs 삭제 모두 시각으로 비교).
 *   '기록 모두 지우기'를 누른 시각보다 앞선 기록은 어느 기기에서 와도 버린다.
 */

const OWNER_KEY = "gm-owner";
const KINDS = ["words", "quiz", "read", "meta"] as const;
type Kind = (typeof KINDS)[number];

const empty = (): RecordsBundle => ({ words: [], wordsGone: {}, quiz: {}, read: {}, readGone: {}, clearedAt: 0 });

function mergeWords(a: RecordsBundle, b: RecordsBundle): { words: SavedWord[]; wordsGone: Record<string, number> } {
  const gone: Record<string, number> = { ...a.wordsGone };
  for (const [k, t] of Object.entries(b.wordsGone)) gone[k] = Math.max(gone[k] ?? 0, t);
  const byLemma = new Map<string, SavedWord>();
  for (const w of [...a.words, ...b.words]) {
    const cur = byLemma.get(w.lemma);
    if (!cur || w.savedAt > cur.savedAt) byLemma.set(w.lemma, w);
  }
  const words = [...byLemma.values()].filter((w) => !(gone[w.lemma] && gone[w.lemma] > w.savedAt)).sort((x, y) => y.savedAt - x.savedAt);
  for (const w of words) delete gone[w.lemma]; // 살아 있는 항목의 옛 삭제 흔적은 정리
  return { words, wordsGone: gone };
}

function mergeQuiz(a: Record<string, QuizRecord>, b: Record<string, QuizRecord>) {
  const out = { ...a };
  for (const [k, r] of Object.entries(b)) if (!out[k] || r.at > out[k].at) out[k] = r;
  return out;
}

function mergeRead(a: RecordsBundle, b: RecordsBundle): { read: Record<string, number>; readGone: Record<string, number> } {
  const gone: Record<string, number> = { ...a.readGone };
  for (const [k, t] of Object.entries(b.readGone)) gone[k] = Math.max(gone[k] ?? 0, t);
  const read: Record<string, number> = { ...a.read };
  for (const [k, t] of Object.entries(b.read)) read[k] = Math.max(read[k] ?? 0, t);
  for (const k of Object.keys(read)) {
    if (gone[k] && gone[k] > read[k]) delete read[k];
    else delete gone[k];
  }
  return { read, readGone: gone };
}

/** '기록 모두 지우기' 시각(t) 이전의 기록과 삭제 흔적을 버린다 */
function dropBefore(b: RecordsBundle, t: number): RecordsBundle {
  const after = <V,>(o: Record<string, V>, at: (v: V) => number) => Object.fromEntries(Object.entries(o).filter(([, v]) => at(v) > t));
  return {
    words: b.words.filter((w) => w.savedAt > t),
    wordsGone: after(b.wordsGone, (x) => x),
    quiz: after(b.quiz, (r) => r.at),
    read: after(b.read, (x) => x),
    readGone: after(b.readGone, (x) => x),
    clearedAt: t,
  };
}

export function merge(a: RecordsBundle, b: RecordsBundle): RecordsBundle {
  const clearedAt = Math.max(a.clearedAt ?? 0, b.clearedAt ?? 0);
  const m = { ...mergeWords(a, b), quiz: mergeQuiz(a.quiz, b.quiz), ...mergeRead(a, b), clearedAt };
  return clearedAt ? dropBefore(m, clearedAt) : m;
}

function payloadOf(b: RecordsBundle, kind: Kind): unknown {
  if (kind === "words") return { items: b.words, gone: b.wordsGone };
  if (kind === "quiz") return b.quiz;
  if (kind === "meta") return { clearedAt: b.clearedAt };
  return { items: b.read, gone: b.readGone };
}

function bundleFromRows(rows: { kind: string; payload: unknown }[]): RecordsBundle {
  const b = empty();
  for (const r of rows) {
    const p = r.payload as Record<string, unknown> | null;
    if (!p) continue;
    if (r.kind === "words") {
      b.words = Array.isArray(p.items) ? (p.items as SavedWord[]) : [];
      b.wordsGone = (p.gone as Record<string, number>) ?? {};
    } else if (r.kind === "quiz") {
      b.quiz = p as unknown as Record<string, QuizRecord>;
    } else if (r.kind === "read") {
      b.read = (p.items as Record<string, number>) ?? {};
      b.readGone = (p.gone as Record<string, number>) ?? {};
    } else if (r.kind === "meta") {
      b.clearedAt = Number(p.clearedAt) || 0;
    }
  }
  return b;
}

/** 키 순서와 상관없이 같은 값이면 같은 문자열 (서버 jsonb는 키 순서를 바꿔 저장한다) */
function stable(v: unknown): string {
  if (Array.isArray(v)) return `[${v.map(stable).join(",")}]`;
  if (v && typeof v === "object")
    return `{${Object.keys(v)
      .sort()
      .map((k) => `${JSON.stringify(k)}:${stable((v as Record<string, unknown>)[k])}`)
      .join(",")}}`;
  return JSON.stringify(v) ?? "null";
}

/* ───────── 맞춘 상태 (내 공부 화면에 보여 준다) ───────── */

export interface SyncState {
  status: "idle" | "syncing" | "ok" | "offline";
  /** 마지막으로 계정과 맞춘 시각 */
  at: number | null;
}
const IDLE: SyncState = { status: "idle", at: null };
let state: SyncState = IDLE;
const listeners = new Set<() => void>();
function setState(s: Partial<SyncState>) {
  state = { ...state, ...s };
  for (const fn of listeners) fn();
}
const subscribe = (fn: () => void) => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};
export const useSyncState = () => useSyncExternalStore(subscribe, () => state, () => IDLE);

/* ───────── 맞추기 ───────── */

// 서버 기록을 기기에 쓰는 동안에는 '기록이 바뀌었다' 알림을 무시하게 한다 (맞추기가 맞추기를 부르지 않도록)
let applying = false;
export const applyingRemote = () => applying;
function apply(b: RecordsBundle) {
  applying = true;
  try {
    importAll(b);
  } finally {
    applying = false;
  }
}
function wipeDevice() {
  applying = true;
  try {
    clearAll();
  } finally {
    applying = false;
  }
}

async function syncOnce(userId: string): Promise<void> {
  const sb = supabase();
  if (!sb) return;
  setState({ status: "syncing" });
  let owner: string | null = null;
  try {
    owner = localStorage.getItem(OWNER_KEY);
  } catch {}
  if (owner && owner !== userId) wipeDevice(); // 다른 사람의 기기 기록은 섞지 않는다 (그 사람 것은 서버에 있다)

  const { data, error } = await sb.from("gm_records").select("kind,payload").eq("user_id", userId).eq("key", "all");
  if (wanted !== userId) return; // 기다리는 사이에 로그아웃했거나 계정이 바뀌었다
  if (error) {
    setState({ status: "offline" });
    return;
  }
  const server = bundleFromRows(data ?? []);
  const local = exportAll(); // 받는 사이에 바뀐 것까지 담도록 받은 뒤에 읽는다
  const merged = merge(local, server);
  if (stable(merged) !== stable(local)) apply(merged);
  try {
    localStorage.setItem(OWNER_KEY, userId);
  } catch {}

  const now = new Date().toISOString();
  const rows = KINDS.filter((k) => stable(payloadOf(merged, k)) !== stable(payloadOf(server, k))).map((kind) => ({
    user_id: userId,
    kind,
    key: "all",
    payload: payloadOf(merged, kind),
    updated_at: now,
  }));
  if (rows.length) {
    const { error: upErr } = await sb.from("gm_records").upsert(rows, { onConflict: "user_id,kind,key" });
    if (upErr) {
      setState({ status: "offline" });
      return;
    }
  }
  setState({ status: "ok", at: Date.now() });
}

let wanted: string | null = null;
let running: Promise<void> | null = null;
let again = false;

/** 지금 계정과 맞춘다. 이미 맞추는 중이면 끝난 뒤 한 번 더 맞춘다 */
export function syncNow(userId: string): Promise<void> {
  wanted = userId;
  if (running) {
    again = true;
    return running;
  }
  running = (async () => {
    try {
      do {
        again = false;
        const u = wanted;
        if (u) await syncOnce(u).catch(() => setState({ status: "offline" }));
      } while (again);
    } finally {
      running = null;
    }
  })();
  return running;
}

/** 로그아웃: 더 이상 맞추지 않는다 */
export function stopSync() {
  wanted = null;
  again = false;
  setState(IDLE);
}
