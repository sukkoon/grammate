"use client";

import { useRef, useState } from "react";
import { phrasesOf } from "@/components/text/Phrases";
import { playFeedback } from "@/lib/feedback";
import { SoundToggle } from "./SoundToggle";
import type { PassagePart } from "@/lib/suneung";

export interface PreparedSuneung {
  id: string;
  kind: "underline" | "box";
  parts: PassagePart[];
  /** 정답 보기 번호 (0부터). 밑줄형은 밑줄 번호 - 1 */
  answer: number;
  /** 밑줄형: 밑줄마다, 네모형: 네모마다 풀이 */
  why: string[];
  ko: string;
  /** 밑줄형: 틀린 밑줄의 말과 고친 말 */
  wrong?: string;
  fix?: string;
  /** 네모형: 보기 다섯 줄 (한 줄에 (A)(B)(C) 세 말)과 네모마다 맞는 말 */
  options?: string[][];
  picks?: string[];
}

const CIRCLED = ["①", "②", "③", "④", "⑤"];
const KICE = "https://www.suneung.re.kr/";
const ASK = {
  underline: "다음 글의 밑줄 친 부분 중, 어법상 틀린 것은?",
  box: "(A), (B), (C)의 각 네모 안에서 어법에 맞는 표현으로 가장 적절한 것은?",
};

/** 섞인 순서. 방금 본 문제가 새 순서의 첫 문제가 되지 않게 한다 */
function shuffled(n: number, avoidFirst?: number): number[] {
  const a = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  if (n > 1 && a[0] === avoidFirst) [a[0], a[1]] = [a[1], a[0]];
  return a;
}

function Passage({ item, open }: { item: PreparedSuneung; open: boolean }) {
  return (
    <p lang="en" className="mt-3 rounded-xl border border-line px-4 py-3.5 text-[1.02em] leading-[2.15]">
      {item.parts.map((p, i) => {
        if (p.kind === "text") return <span key={i}>{p.text}</span>;
        if (p.kind === "underline") {
          const hit = open && p.n - 1 === item.answer;
          return (
            <span key={i} className={hit ? "rounded bg-coral-soft" : undefined}>
              <span className="mr-0.5 font-bold text-coral-ink">{CIRCLED[p.n - 1]}</span>
              <span className="underline decoration-ink decoration-[1.5px] underline-offset-[5px]">{p.text}</span>
            </span>
          );
        }
        return (
          <span key={i}>
            <span className="font-bold">({p.label})</span>{" "}
            <span className="inline-flex items-center rounded-md border-2 border-ink px-1.5 align-middle leading-snug">
              {p.choices[0]}
              <span aria-hidden className="mx-1.5 text-ink-3">
                /
              </span>
              <span className="sr-only">또는</span>
              {p.choices[1]}
            </span>
          </span>
        );
      })}
    </p>
  );
}

function choiceClass(i: number, answer: number, picked: number | null, open: boolean) {
  const shown = open || picked !== null;
  if (shown && i === answer) return "border-mint-ink bg-mint-soft text-mint-ink";
  if (picked === i) return "border-coral bg-coral-soft text-coral-ink";
  if (shown) return "border-line opacity-60";
  return "border-line hover:border-ink-3 hover:bg-chip";
}

function Choices({ item, picked, open, onPick }: { item: PreparedSuneung; picked: number | null; open: boolean; onPick: (i: number) => void }) {
  const locked = picked !== null;
  if (item.kind === "underline")
    return (
      <div className="mt-3 grid grid-cols-5 gap-2" role="group" aria-label="답 고르기">
        {CIRCLED.map((c, i) => (
          <button
            key={c}
            type="button"
            disabled={locked}
            onClick={() => onPick(i)}
            className={`h-11 rounded-xl border-2 text-[1.1rem] font-bold transition-colors ${choiceClass(i, item.answer, picked, open)}`}
          >
            {c}
          </button>
        ))}
      </div>
    );
  return (
    <div className="mt-3" role="group" aria-label="답 고르기">
      <div className="grid grid-cols-[2rem_repeat(3,minmax(0,1fr))] gap-x-2 px-3 text-[13px] font-extrabold text-ink-3">
        <span />
        <span>(A)</span>
        <span>(B)</span>
        <span>(C)</span>
      </div>
      <div className="mt-1 space-y-1.5">
        {item.options!.map((row, i) => (
          <button
            key={i}
            type="button"
            disabled={locked}
            onClick={() => onPick(i)}
            className={`grid w-full grid-cols-[2rem_repeat(3,minmax(0,1fr))] items-center gap-x-2 rounded-xl border-2 px-3 py-2 text-left text-[14.5px] transition-colors ${choiceClass(i, item.answer, picked, open)}`}
          >
            <span className="font-bold">{CIRCLED[i]}</span>
            {row.map((w, j) => (
              <span key={j} lang="en" className="min-w-0 break-words font-medium">
                {w}
              </span>
            ))}
          </button>
        ))}
      </div>
    </div>
  );
}

function Explain({ item, picked }: { item: PreparedSuneung; picked: number | null }) {
  const labels = item.kind === "underline" ? CIRCLED : ["(A)", "(B)", "(C)"];
  return (
    <div className="mt-4 rounded-xl bg-chip px-4 py-3.5 text-[14.5px]" aria-live="polite">
      <p className="font-extrabold">
        정답 {CIRCLED[item.answer]}
        {picked !== null && <span className={picked === item.answer ? "ml-2 text-mint-ink" : "ml-2 text-coral-ink"}>{picked === item.answer ? "맞았어요" : "헷갈렸던 곳을 풀이에서 확인해 봐요"}</span>}
      </p>
      {item.kind === "underline" ? (
        <p className="mt-1">
          {CIRCLED[item.answer]}{" "}
          <span lang="en" className="text-coral-ink line-through">
            {item.wrong}
          </span>{" "}
          →{" "}
          <b lang="en" className="text-mint-ink">
            {item.fix}
          </b>
        </p>
      ) : (
        <p className="mt-1">
          {item.picks!.map((w, i) => (
            <span key={i} className="mr-3 inline-block">
              ({"ABC"[i]}){" "}
              <b lang="en" className="text-mint-ink">
                {w}
              </b>
            </span>
          ))}
        </p>
      )}
      <ul className="mt-3 space-y-2">
        {item.why.map((w, i) => {
          const bad = item.kind === "underline" && i === item.answer;
          return (
            <li key={i} className="flex gap-2">
              <span className={`shrink-0 font-bold ${bad ? "text-coral-ink" : "text-mint-ink"}`}>
                {labels[i]}
                <span className="sr-only">{bad ? " 틀린 곳" : ""}</span>
              </span>
              <span className={bad ? "text-ink" : "text-ink-2"}>{phrasesOf(w, `${i}-`)}</span>
            </li>
          );
        })}
      </ul>
      <details className="mt-3 border-t border-line pt-3">
        <summary className="cursor-pointer font-bold text-ink-2">지문 해석 보기</summary>
        <p className="mt-2 text-ink-2">{phrasesOf(item.ko)}</p>
      </details>
    </div>
  );
}

/** 수능형 예시: '예시 보기'를 누를 때마다 다른 문제가 나오고, '정답과 풀이 보기'로 답과 설명을 본다 */
export function SuneungSetClient({ title, items }: { title: string; items: PreparedSuneung[] }) {
  const [order, setOrder] = useState<number[] | null>(null);
  const [pos, setPos] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLElement>(null);
  const item = order ? items[order[pos]] : null;

  function next() {
    setPicked(null);
    setOpen(false);
    if (!order) {
      setOrder(shuffled(items.length));
      setPos(0);
    } else if (pos + 1 < order.length) setPos(pos + 1);
    else {
      setOrder(shuffled(items.length, order[pos]));
      setPos(0);
    }
    // 아래쪽 '다른 문제 보기'를 눌렀으면 새 문제의 첫머리로 올려 준다
    const top = box.current?.getBoundingClientRect().top ?? 0;
    if (top < 0) box.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section ref={box} aria-label={`수능형 예시 문제: ${title}`} className="my-8 scroll-mt-24 rounded-2xl border border-line bg-card">
      <div className="flex flex-wrap items-center gap-2 px-4 pt-4 sm:px-5">
        <span className="rounded-lg bg-amber-soft px-2 py-0.5 text-[12.5px] font-extrabold text-amber-ink">수능형</span>
        <h3 className="text-[1.08rem] font-extrabold">{title} 예시 문제</h3>
        <SoundToggle />
      </div>

      {!item ? (
        <div className="px-4 pb-4 pt-2 sm:px-5">
          <p className="text-[14.5px] text-ink-2">
            {phrasesOf(`수능 어법 문제와 같은 모양으로 만든 문제예요. 누를 때마다 다른 문제가 나와요. 모두 ${items.length}문제예요.`)}
          </p>
          <button type="button" onClick={next} className="mt-3 rounded-lg bg-ink px-4 py-2.5 font-bold text-on-ink hover:bg-ink/85">
            예시 보기
          </button>
        </div>
      ) : (
        <div className="px-4 pb-4 pt-3 sm:px-5">
          <p className="font-extrabold">{ASK[item.kind]}</p>
          <Passage item={item} open={open || picked !== null} />
          <Choices
            item={item}
            picked={picked}
            open={open}
            onPick={(i) => {
              setPicked(i);
              setOpen(true);
              playFeedback(i === item.answer);
            }}
          />
          {!open ? (
            <div className="mt-4 flex flex-wrap gap-2">
              <button type="button" onClick={() => setOpen(true)} className="rounded-lg bg-ink px-4 py-2.5 font-bold text-on-ink hover:bg-ink/85">
                정답과 풀이 보기
              </button>
              <button type="button" onClick={next} className="rounded-lg px-4 py-2.5 font-bold text-ink ring-1 ring-line hover:bg-chip">
                다른 문제 보기 ↻
              </button>
            </div>
          ) : (
            <>
              <Explain item={item} picked={picked} />
              <div className="mt-3 flex justify-end">
                <button type="button" onClick={next} className="rounded-lg bg-ink px-4 py-2.5 font-bold text-on-ink hover:bg-ink/85">
                  다른 문제 보기 ↻
                </button>
              </div>
            </>
          )}
        </div>
      )}

      <p className="border-t border-line px-4 py-3 text-[13px] text-ink-3 sm:px-5">
        {phrasesOf("그래머랑이 수능 어법 문제와 같은 형식으로 새로 만든 문제예요. 실제 기출문제는")}{" "}
        <a href={KICE} target="_blank" rel="noopener noreferrer" className="inline-block font-bold text-ink-2 underline underline-offset-2 hover:text-ink">
          한국교육과정평가원 수능 누리집
        </a>
        {phrasesOf("에서 무료로 볼 수 있어요.")}
      </p>
    </section>
  );
}
