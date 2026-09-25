"use client";

import { Fragment, useState, type ReactNode } from "react";
import { Mate } from "@/components/brand/Mate";
import { saveQuiz } from "@/lib/local-store";
import { bandLabel, bandRank, type Band } from "@/lib/level";
import { useBand } from "@/lib/use-level";

export interface PreparedPick {
  parts: ({ kind: "text"; node: ReactNode } | { kind: "box"; b: number; choices: string[] })[];
  answers: number[];
  why: string;
  ko?: string;
  level?: Band;
  /** 기록에 남길 문장 */
  plain: string;
}

export function PickClient({ id, title, items }: { id: string; title?: string; items: PreparedPick[] }) {
  const band = useBand();
  const [picked, setPicked] = useState<Record<string, number>>({});
  const [showAll, setShowAll] = useState(false);
  const fits = (it: PreparedPick) => showAll || !band || bandRank(it.level ?? "elem") <= bandRank(band);
  const visible = items.map((it, i) => ({ it, i })).filter(({ it }) => fits(it));
  const hidden = items.length - visible.length;

  const isDone = (i: number) => items[i].answers.every((_, b) => picked[`${i}.${b}`] !== undefined);
  const isRight = (i: number) => items[i].answers.every((a, b) => picked[`${i}.${b}`] === a);

  function choose(i: number, b: number, c: number) {
    const k = `${i}.${b}`;
    if (picked[k] !== undefined) return;
    const next = { ...picked, [k]: c };
    setPicked(next);
    const it = items[i];
    if (it.answers.every((_, bb) => next[`${i}.${bb}`] !== undefined))
      saveQuiz({ key: `${id}#p${i}`, unit: id, question: `네모 고르기: ${it.plain}`, correct: it.answers.every((a, bb) => next[`${i}.${bb}`] === a) });
  }

  const allDone = visible.length > 0 && visible.every(({ i }) => isDone(i));

  return (
    <section aria-label={title ?? "네모 고르기"} className="my-8">
      <div className="mb-3 flex items-center gap-2">
        <Mate mood="thinking" size={30} className="text-ink" />
        <h2 className="text-[1.25rem] font-extrabold">{title ?? "네모 고르기"}</h2>
      </div>
      <p className="mb-4 text-[0.93em] text-ink-2">괄호 안에서 어법에 맞는 것을 눌러요. 고르기 전에 진짜 동사 개수부터 세어 보세요.</p>
      <ol className="space-y-3">
        {visible.map(({ it, i }, n) => {
          const done = isDone(i);
          const right = done && isRight(i);
          return (
            <li key={i} className="rounded-2xl border border-line bg-card px-4 py-4 sm:px-5">
              <p className="text-[1.08em] font-medium leading-[2.3]">
                <span className="mr-2 font-bold text-coral-ink">{n + 1}.</span>
                {it.level && it.level !== "elem" && (
                  <span className="mr-2 rounded-full bg-sky-soft px-2 py-0.5 align-middle text-[12.5px] font-extrabold text-sky-ink">{bandLabel[it.level]}</span>
                )}
                {it.parts.map((p, pi) => {
                  if (p.kind === "text") return <Fragment key={pi}>{p.node}</Fragment>;
                  const b = p.b;
                  const k = `${i}.${b}`;
                  const sel = picked[k];
                  const answered = sel !== undefined;
                  return (
                    <span key={pi} role="group" aria-label={`${b + 1}번째 고를 곳`} className="mx-0.5 inline-flex items-center rounded-lg border-2 border-ink align-middle leading-none">
                      {p.choices.map((c, ci) => {
                        const isAns = ci === it.answers[b];
                        let cls = "hover:bg-chip";
                        if (answered && isAns) cls = "bg-mint-soft text-mint-ink";
                        else if (answered && ci === sel) cls = "bg-coral-soft text-coral-ink line-through";
                        else if (answered) cls = "text-ink-3";
                        return (
                          <Fragment key={ci}>
                            {ci > 0 && <span className="h-6 w-px bg-ink" aria-hidden />}
                            <button
                              type="button"
                              lang="en"
                              disabled={answered}
                              onClick={() => choose(i, b, ci)}
                              className={`min-h-9 px-2.5 py-1.5 font-bold transition-colors disabled:cursor-default ${cls}`}
                            >
                              {c}
                            </button>
                          </Fragment>
                        );
                      })}
                    </span>
                  );
                })}
              </p>
              {done && (
                <div className={`fade-in mt-3 flex gap-3 rounded-xl px-3 py-3 ${right ? "bg-mint-soft" : "bg-coral-soft"}`} role="status">
                  <Mate mood={right ? "happy" : "oops"} size={30} className="mt-0.5 shrink-0 text-ink" />
                  <div className="text-[0.95em]">
                    <p className={`font-extrabold ${right ? "text-mint-ink" : "text-coral-ink"}`}>{right ? "맞아요!" : "괜찮아요, 어디서 헷갈렸는지 알면 돼요."}</p>
                    <p className="mt-0.5">{it.why}</p>
                    {it.ko && <p className="mt-1 text-ink-2">{it.ko}</p>}
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
          className="mt-3 w-full rounded-2xl border border-dashed border-line px-4 py-3 text-[14.5px] text-ink-2 hover:border-ink-3"
        >
          더 높은 수준의 문제가 {hidden}개 더 있어요 · <b className="text-coral-ink">도전해 보기</b>
        </button>
      )}
      {allDone && (
        <div className="fade-in mt-4 flex items-center justify-between gap-3 rounded-2xl bg-chip px-4 py-3 text-[15px]">
          <span>끝까지 골라 봤어요. 틀린 문장은 &lsquo;내 공부&rsquo;에 모아 둘게요.</span>
          <button type="button" onClick={() => setPicked({})} className="shrink-0 rounded-full border border-line bg-card px-3.5 py-1.5 text-[14px] font-bold hover:bg-bg">
            다시 풀기
          </button>
        </div>
      )}
    </section>
  );
}
