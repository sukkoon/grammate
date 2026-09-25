"use client";

import { useState, type ReactNode } from "react";
import { Mate } from "@/components/brand/Mate";
import { saveQuiz } from "@/lib/local-store";
import { bandLabel, bandRank, type Band } from "@/lib/level";
import { useBand } from "@/lib/use-level";

export interface PreparedItem {
  q: string;
  en?: string;
  enNode: ReactNode;
  options: string[];
  answer: number;
  why: string;
  level?: Band;
}

export function QuizClient({ id, items }: { id: string; items: PreparedItem[] }) {
  const band = useBand();
  const [picked, setPicked] = useState<Record<number, number>>({});
  const [showAll, setShowAll] = useState(false);
  // 내 수준보다 높은 문제는 접어 둔다. (원래 번호 i는 기록 키로 그대로 쓴다)
  const fits = (it: PreparedItem) => showAll || !band || bandRank(it.level ?? "elem") <= bandRank(band);
  const visible = items.map((it, i) => ({ it, i })).filter(({ it }) => fits(it));
  const hidden = items.length - visible.length;
  const done = visible.length > 0 && visible.every(({ i }) => picked[i] !== undefined);
  const again = visible
    .map(({ it, i }, n) => (picked[i] !== undefined && picked[i] !== it.answer ? n + 1 : 0))
    .filter(Boolean);

  function choose(i: number, o: number) {
    if (picked[i] !== undefined) return;
    setPicked((p) => ({ ...p, [i]: o }));
    saveQuiz({ key: `${id}#${i}`, unit: id, question: items[i].q, correct: o === items[i].answer });
  }

  return (
    <section aria-label="확인 문제" className="my-8">
      <div className="mb-3 flex items-center gap-2">
        <Mate mood="thinking" size={30} className="text-ink" />
        <h2 className="text-[1.15rem] font-extrabold">스스로 확인해 봐요</h2>
      </div>
      <p className="mb-4 text-[0.93em] text-ink-2">
        점수를 매기는 시험이 아니에요. 내가 정말 이해했는지 스스로 확인하는 시간이에요.
      </p>
      <ol className="space-y-4">
        {visible.map(({ it, i }, n) => {
          const p = picked[i];
          const answeredThis = p !== undefined;
          const right = p === it.answer;
          return (
            <li key={i} className="rounded-2xl border border-line bg-card px-4 py-4 sm:px-5">
              <p className="font-bold">
                <span className="mr-2 text-coral-ink">{n + 1}.</span>
                {it.q}
                {it.level && it.level !== "elem" && (
                  <span className="ml-2 rounded-full bg-sky-soft px-2 py-0.5 align-middle text-[11.5px] font-extrabold text-sky-ink">
                    {bandLabel[it.level]}
                  </span>
                )}
              </p>
              {it.enNode && <p className="mt-2 text-[1.1em] font-medium">{it.enNode}</p>}
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {it.options.map((o, oi) => {
                  const isAnswer = oi === it.answer;
                  const isPicked = oi === p;
                  let cls = "border-line hover:border-ink-3 hover:bg-chip";
                  if (answeredThis && isAnswer) cls = "border-mint-ink bg-mint-soft text-mint-ink";
                  else if (answeredThis && isPicked) cls = "border-coral bg-coral-soft text-coral-ink";
                  else if (answeredThis) cls = "border-line opacity-60";
                  return (
                    <button
                      key={oi}
                      type="button"
                      disabled={answeredThis}
                      onClick={() => choose(i, oi)}
                      className={`min-h-12 rounded-xl border px-4 py-2.5 text-left font-bold transition-colors disabled:cursor-default ${cls}`}
                    >
                      {o}
                    </button>
                  );
                })}
              </div>
              {answeredThis && (
                <div className={`fade-in mt-3 flex gap-3 rounded-xl px-3 py-3 ${right ? "bg-mint-soft" : "bg-coral-soft"}`} role="status">
                  <Mate mood={right ? "happy" : "oops"} size={32} className="mt-0.5 shrink-0 text-ink" />
                  <div className="text-[0.95em]">
                    <p className={`font-extrabold ${right ? "text-mint-ink" : "text-coral-ink"}`}>
                      {right ? "맞아요!" : "괜찮아요, 틀린 덕분에 하나 더 알게 됐어요."}
                    </p>
                    <p className="mt-0.5">{it.why}</p>
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ol>
      {hidden > 0 && (
        <button
          type="button"
          onClick={() => setShowAll(true)}
          className="mt-3 w-full rounded-2xl border border-dashed border-line px-4 py-3 text-[14px] text-ink-2 hover:border-ink-3"
        >
          더 높은 수준의 문제가 {hidden}개 더 있어요 · <b className="text-coral-ink">도전해 보기</b>
        </button>
      )}
      {done && (
        <div className="fade-in mt-5 rounded-2xl bg-ink px-5 py-5 text-on-ink">
          <div className="flex items-start gap-3">
            <Mate mood="cheer" size={40} className="shrink-0 text-on-ink" />
            <div>
              <p className="font-extrabold">끝까지 풀었어요. 그게 제일 중요해요!</p>
              <p className="mt-1 text-[0.95em] opacity-90">
                이 기록은 나만 볼 수 있어요. 누구와도 비교하지 않아요. 몇 개 맞혔는지보다 <b>어디서 헷갈렸는지</b> 아는 게 진짜 공부예요.
              </p>
              {again.length > 0 ? (
                <p className="mt-2 text-[0.95em]">
                  다시 볼 문제: {again.map((n) => `${n}번`).join(", ")}. &lsquo;내 공부&rsquo;에 모아 둘게요.
                </p>
              ) : (
                <p className="mt-2 text-[0.95em]">헷갈린 문제가 없어요. 다음 단원으로 가 볼까요?</p>
              )}
              <button
                type="button"
                onClick={() => setPicked({})}
                className="mt-3 rounded-full border border-on-ink/40 px-4 py-2 text-[13.5px] font-bold hover:bg-on-ink/10"
              >
                처음부터 다시 풀기
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
