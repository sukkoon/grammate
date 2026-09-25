"use client";

import Link from "next/link";
import { useMemo, useSyncExternalStore } from "react";
import { Mate } from "@/components/brand/Mate";
import {
  clearAll,
  onStoreChange,
  rawSnapshot,
  removeWord,
  type QuizRecord,
  type SavedWord,
} from "@/lib/local-store";
import { speak } from "@/lib/speech";

const parse = <T,>(raw: string, fallback: T): T => {
  try {
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

const server = () => "";
const snapWords = rawSnapshot("words");
const snapQuiz = rawSnapshot("quiz");
const snapRead = rawSnapshot("read");

export function MyStudy({ units }: { units: Record<string, { title: string; chapter: string }> }) {
  const wordsRaw = useSyncExternalStore(onStoreChange, snapWords, server);
  const quizRaw = useSyncExternalStore(onStoreChange, snapQuiz, server);
  const readRaw = useSyncExternalStore(onStoreChange, snapRead, server);

  const words = useMemo(() => parse<SavedWord[]>(wordsRaw, []), [wordsRaw]);
  const again = useMemo(() => {
    const all = Object.values(parse<Record<string, QuizRecord>>(quizRaw, {})).filter((r) => !r.correct);
    const byUnit = new Map<string, QuizRecord[]>();
    for (const r of all) byUnit.set(r.unit, [...(byUnit.get(r.unit) ?? []), r]);
    return [...byUnit.entries()];
  }, [quizRaw]);
  const read = useMemo(
    () => Object.entries(parse<Record<string, number>>(readRaw, {})).sort((a, b) => b[1] - a[1]),
    [readRaw],
  );

  const empty = words.length === 0 && again.length === 0 && read.length === 0;

  return (
    <div className="mt-8 space-y-10">
      {empty && (
        <div className="flex flex-col items-center rounded-2xl border border-dashed border-line px-6 py-10 text-center">
          <Mate mood="thinking" size={56} className="text-ink" />
          <p className="mt-3 font-extrabold">아직 기록이 없어요</p>
          <p className="mt-1 text-[14.5px] text-ink-2">예문에서 단어를 누르고 ★를 눌러 담거나, 단원 끝의 확인 문제를 풀어 보세요.</p>
          <Link href="/learn" className="mt-4 rounded-lg bg-ink px-5 py-2.5 font-bold text-on-ink">
            공부하러 가기
          </Link>
        </div>
      )}

      {again.length > 0 && (
        <section aria-labelledby="again">
          <h2 id="again" className="text-[1.3rem] font-extrabold">
            다시 볼 문제
          </h2>
          <p className="mt-1 text-[14px] text-ink-2">헷갈렸던 문제예요. 다시 풀어서 맞히면 여기서 사라져요.</p>
          <ul className="mt-4 space-y-3">
            {again.map(([unit, list]) => (
              <li key={unit} className="rounded-2xl border border-line bg-card px-4 py-4">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="font-extrabold">{units[unit]?.title ?? unit}</p>
                  <Link href={`/learn/${unit}`} className="shrink-0 text-[13.5px] font-bold text-coral-ink hover:underline">
                    다시 풀기 ›
                  </Link>
                </div>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-[14.5px] text-ink-2">
                  {list.map((r) => (
                    <li key={r.key}>{r.question}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>
      )}

      {words.length > 0 && (
        <section aria-labelledby="words">
          <h2 id="words" className="text-[1.3rem] font-extrabold">
            내 단어장 <span className="text-ink-3">{words.length}</span>
          </h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {words.map((w) => (
              <li key={w.lemma} className="flex items-center gap-2 rounded-2xl border border-line bg-card px-4 py-3">
                <div className="min-w-0 flex-1">
                  <p lang="en" className="text-[1.1em] font-bold">
                    {w.lemma}
                  </p>
                  <p className="text-[14px] text-ink-2">
                    <span className="mr-1.5 rounded-lg bg-chip px-1.5 py-0.5 text-[12px] font-bold">{w.pos}</span>
                    {w.meaning}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => speak(w.lemma)}
                  aria-label={`${w.lemma} 발음 듣기`}
                  className="grid size-10 place-items-center rounded-full text-ink-3 hover:bg-chip hover:text-ink"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M11 5 6 9H3v6h3l5 4V5Z" />
                    <path d="M15.5 8.5a5 5 0 0 1 0 7" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => removeWord(w.lemma)}
                  aria-label={`${w.lemma} 단어장에서 빼기`}
                  className="grid size-10 place-items-center rounded-full text-ink-3 hover:bg-chip hover:text-coral-ink"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {read.length > 0 && (
        <section aria-labelledby="read">
          <h2 id="read" className="text-[1.3rem] font-extrabold">
            다 읽은 단원
          </h2>
          <ul className="mt-4 divide-y divide-line rounded-2xl border border-line bg-card">
            {read.map(([unit, at]) => (
              <li key={unit} className="flex items-center justify-between gap-3 px-4 py-3">
                <Link href={`/learn/${unit}`} className="font-bold hover:text-coral-ink">
                  {units[unit]?.chapter} · {units[unit]?.title ?? unit}
                </Link>
                <span className="shrink-0 text-[13px] text-ink-3">{new Date(at).toLocaleDateString("ko-KR")}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="border-t border-line pt-6 text-[13.5px] text-ink-3">
        <p>
          지금은 이 기기(브라우저)에만 저장돼요. 로그인 기능이 생기면 다른 기기에서도 이어서 볼 수 있어요.
        </p>
        {!empty && (
          <button
            type="button"
            onClick={() => {
              if (confirm("이 기기에 저장된 내 공부 기록을 모두 지울까요?")) clearAll();
            }}
            className="mt-3 rounded-lg px-4 py-2 font-bold ring-1 ring-line hover:bg-chip"
          >
            기록 모두 지우기
          </button>
        )}
      </div>
    </div>
  );
}
