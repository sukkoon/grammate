"use client";

import { exportAll, importAll, clearAll, type RecordsBundle, type SavedWord, type QuizRecord } from "./local-store";
import { supabase } from "./supabase";

/**
 * 학습 기록 동기화: 이 기기(localStorage) ↔ Supabase gm_records (본인만 읽고 쓸 수 있는 표).
 * - 로그인하면 서버 기록을 내려받아 기기 기록과 합치고, 합친 결과를 양쪽에 저장한다.
 * - 이후 기록이 바뀔 때마다 잠시 뒤 서버에 올린다. 인터넷이 없으면 기기에 남겨 두었다가 다음에 올린다.
 * - 같은 기기에서 다른 계정으로 로그인하면, 앞사람 기록은 서버에 있으므로 기기 기록을 비우고 새로 받는다.
 * - 합치는 규칙: 같은 항목은 더 나중에 일어난 일이 이긴다(저장 vs 삭제 모두 시각으로 비교).
 */

const OWNER_KEY = "gm-owner";
const KINDS = ["words", "quiz", "read"] as const;
type Kind = (typeof KINDS)[number];

const empty = (): RecordsBundle => ({ words: [], wordsGone: {}, quiz: {}, read: {}, readGone: {} });

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

export function merge(a: RecordsBundle, b: RecordsBundle): RecordsBundle {
  return { ...mergeWords(a, b), quiz: mergeQuiz(a.quiz, b.quiz), ...mergeRead(a, b) };
}

function payloadOf(b: RecordsBundle, kind: Kind): unknown {
  if (kind === "words") return { items: b.words, gone: b.wordsGone };
  if (kind === "quiz") return b.quiz;
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
    }
  }
  return b;
}

const lastPushed: Partial<Record<Kind, string>> = {};

async function pushAll(userId: string, b: RecordsBundle, force = false): Promise<boolean> {
  const sb = supabase();
  if (!sb) return false;
  const rows = KINDS.map((kind) => ({ kind, payload: payloadOf(b, kind) }))
    .filter((r) => force || lastPushed[r.kind] !== JSON.stringify(r.payload))
    .map((r) => ({ user_id: userId, kind: r.kind, key: "all", payload: r.payload, updated_at: new Date().toISOString() }));
  if (!rows.length) return true;
  const { error } = await sb.from("gm_records").upsert(rows, { onConflict: "user_id,kind,key" });
  if (error) return false;
  for (const r of rows) lastPushed[r.kind as Kind] = JSON.stringify(r.payload);
  return true;
}

async function pullAll(userId: string): Promise<RecordsBundle | null> {
  const sb = supabase();
  if (!sb) return null;
  const { data, error } = await sb.from("gm_records").select("kind,payload").eq("user_id", userId).eq("key", "all");
  if (error) return null;
  return bundleFromRows(data ?? []);
}

/** 로그인 직후: 기기 기록과 서버 기록을 합쳐 양쪽에 저장한다 */
export async function syncOnLogin(userId: string): Promise<void> {
  let owner: string | null = null;
  try {
    owner = localStorage.getItem(OWNER_KEY);
  } catch {}
  if (owner && owner !== userId) clearAll(); // 다른 사람의 기기 기록은 섞지 않는다 (그 사람 것은 서버에 있다)
  const server = await pullAll(userId);
  if (!server) return; // 인터넷이 없으면 다음 기회에
  const merged = merge(exportAll(), server);
  importAll(merged);
  try {
    localStorage.setItem(OWNER_KEY, userId);
  } catch {}
  await pushAll(userId, merged, true);
}

/** 기록이 바뀐 뒤: 잠시 기다렸다가 서버에 올린다 */
export async function syncPush(userId: string): Promise<void> {
  await pushAll(userId, exportAll());
}

/** 화면에 다시 돌아왔을 때: 다른 기기에서 바뀐 것을 받아 온다 */
export async function syncPull(userId: string): Promise<void> {
  const server = await pullAll(userId);
  if (!server) return;
  const local = exportAll();
  const merged = merge(local, server);
  if (JSON.stringify(merged) !== JSON.stringify(local)) importAll(merged);
  await pushAll(userId, merged);
}
