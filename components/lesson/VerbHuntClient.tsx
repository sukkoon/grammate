"use client";

import { useState, type ReactNode } from "react";
import { Mate, type Mood } from "@/components/brand/Mate";
import type { HuntToken } from "@/lib/verbhunt";

export interface HuntRound {
  tokens: HuntToken[];
  ko: string;
  why?: string;
  enNode: ReactNode;
}

type Mark = "verb" | "verbal" | "plain";

export function VerbHuntClient({ rounds, title }: { rounds: HuntRound[]; title: string }) {
  const [r, setR] = useState(0);
  const [marks, setMarks] = useState<Record<number, Mark>>({});
  const [msg, setMsg] = useState<{ mood: Mood; text: string } | null>(null);

  const round = rounds[r];
  const verbIdx = round.tokens.flatMap((t, i) => (t.kind === "word" && t.role === "verb" ? [i] : []));
  const found = verbIdx.filter((i) => marks[i] === "verb").length;
  const complete = found === verbIdx.length;
  const verbals = round.tokens.filter(
    (t): t is Extract<HuntToken, { kind: "word" }> => t.kind === "word" && t.role === "verbal",
  );

  function tap(i: number) {
    const t = round.tokens[i];
    if (t.kind !== "word" || complete) return;
    setMarks((m) => ({ ...m, [i]: t.role }));
    if (t.role === "verb") {
      const left = verbIdx.length - found - (marks[i] === "verb" ? 0 : 1);
      setMsg(
        left > 0
          ? { mood: "happy", text: `찾았다! "${t.text}"는 진짜 동사예요. 진짜 동사가 ${left}개 더 있어요.` }
          : { mood: "cheer", text: `찾았다! "${t.text}"가 이 문장의 진짜 동사예요.` },
      );
    } else if (t.role === "verbal") {
      setMsg({ mood: "wink", text: `앗, "${t.text}"는 ${t.disguise}(으)로 변장한 동사예요. 진짜 동사는 따로 있어요!` });
    } else {
      setMsg({ mood: "thinking", text: `"${t.text}"는 동사가 아니에요. 다시 찾아볼까요?` });
    }
  }

  function go(next: number) {
    setR(next);
    setMarks({});
    setMsg(null);
  }

  return (
    <section aria-label={title} className="my-8 overflow-hidden rounded-2xl border border-line bg-card">
      <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3 sm:px-5">
        <p className="flex items-center gap-2 font-extrabold">
          <Mate mood="listening" size={28} className="text-ink" />
          {title}
        </p>
        <p className="text-[13px] font-bold text-ink-3" aria-live="polite">
          {r + 1} / {rounds.length}
        </p>
      </div>
      <div className="px-4 py-5 sm:px-5">
        <p className="text-[13.5px] text-ink-2">
          문장에서 <b className="text-coral-ink">진짜 동사</b>를 눌러 보세요. 이 문장의 진짜 동사는 <b>{verbIdx.length}개</b>예요.
        </p>
        <p lang="en" className="mt-4 flex flex-wrap items-end gap-x-1.5 gap-y-3 text-[1.3em] font-medium leading-none">
          {round.tokens.map((t, i) => {
            if (t.kind === "text") {
              const s = t.text.trim();
              return s ? (
                <span key={i} className="-ml-1 pb-2">
                  {s}
                </span>
              ) : null;
            }
            const m = marks[i];
            const cls =
              m === "verb"
                ? "border-coral bg-coral text-white"
                : m === "verbal"
                  ? "border-amber-ink/40 bg-amber-soft text-amber-ink"
                  : m === "plain"
                    ? "border-line bg-chip text-ink-3"
                    : "border-line hover:border-ink-3 hover:bg-chip";
            return (
              <span key={i} className="inline-flex flex-col items-center gap-1">
                <button
                  type="button"
                  onClick={() => tap(i)}
                  className={`rounded-xl border px-2.5 py-2 transition-colors ${cls}`}
                  aria-pressed={!!m}
                >
                  {t.text}
                </button>
                {m === "verbal" && <span className="text-[11px] font-extrabold text-amber-ink">{t.disguise}</span>}
                {m === "verb" && <span className="text-[11px] font-extrabold text-coral-ink">진짜 동사</span>}
              </span>
            );
          })}
        </p>
        {msg && !complete && (
          <p role="status" className="fade-in mt-5 flex items-center gap-2 text-[0.95em]">
            <Mate mood={msg.mood} size={28} className="shrink-0 text-ink" />
            {msg.text}
          </p>
        )}
        {complete && (
          <div className="fade-in mt-5 rounded-xl bg-chip px-4 py-4">
            <p className="flex items-center gap-2 font-extrabold text-mint-ink">
              <Mate mood="cheer" size={28} className="shrink-0 text-ink" />
              다 찾았어요!
            </p>
            <p className="mt-2 text-[1.08em] font-medium">{round.enNode}</p>
            <p className="text-[0.93em] text-ink-2">{round.ko}</p>
            {verbals.length > 0 && (
              <p className="mt-2 text-[0.93em]">
                변장한 동사:{" "}
                {verbals.map((v, i) => (
                  <span key={i} className="mr-2 inline-block rounded-lg bg-amber-soft px-2 py-0.5 font-bold text-amber-ink">
                    {v.text} → {v.disguise}
                  </span>
                ))}
              </p>
            )}
            {round.why && <p className="mt-2 text-[0.93em] text-ink-2">{round.why}</p>}
            <div className="mt-3">
              {r < rounds.length - 1 ? (
                <button type="button" onClick={() => go(r + 1)} className="rounded-lg bg-ink px-5 py-2.5 text-[14.5px] font-bold text-on-ink">
                  다음 문장
                </button>
              ) : (
                <button type="button" onClick={() => go(0)} className="rounded-lg border border-line bg-card px-5 py-2.5 text-[14.5px] font-bold">
                  처음부터 다시
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
