"use client";

import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";
import { Mate, type Mood } from "@/components/brand/Mate";
import { Phrases } from "@/components/text/Phrases";

export type Feature = { mood: Mood; title: string; body: string; demo: ReactNode };

/** 예시 창을 카드의 어느 쪽에 붙일지. 좁은 화면 2열, 넓은 화면 4열에서 화면 밖으로 나가지 않게 한다. */
const SIDE = ["left-0", "right-0 lg:left-0 lg:right-auto", "left-0 lg:left-auto lg:right-0", "right-0"];

/**
 * 첫 화면의 특징 카드. 좁은 화면은 2×2, 넓은 화면은 한 줄에 4개.
 * 마우스를 올리면 예시 창이 뜨고, 터치 화면에서는 카드를 누르면 열리고 닫힌다.
 */
export function FeatureCards({ items }: { items: Feature[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const pointer = useRef("");
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open === null) return;
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(null);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {items.map((f, i) => {
        const on = open === i;
        return (
          <div
            key={f.title}
            className="relative"
            onPointerEnter={(e) => e.pointerType === "mouse" && setOpen(i)}
            onPointerLeave={(e) => e.pointerType === "mouse" && setOpen((o) => (o === i ? null : o))}
          >
            <div
              onPointerDown={(e) => (pointer.current = e.pointerType)}
              onClick={() => {
                // 마우스는 올리는 순간 이미 열렸으니 눌러도 닫지 않는다. 터치·키보드는 열고 닫기.
                const mouse = pointer.current === "mouse";
                pointer.current = "";
                setOpen(mouse || !on ? i : null);
              }}
              className={`flex h-full cursor-pointer flex-col rounded-2xl border bg-card px-3.5 py-4 transition-colors sm:px-5 sm:py-5 ${
                on ? "border-ink-3" : "border-line"
              }`}
            >
              <Mate mood={f.mood} size={36} className="text-ink" />
              <h2 className="mt-3 text-[15px] font-extrabold leading-snug sm:text-[1.1rem]">{f.title}</h2>
              <p className="mt-1.5 flex-1 text-[13.5px] leading-relaxed text-ink-2 sm:text-[14.5px]">
                <Phrases text={f.body} />
              </p>
              <button
                type="button"
                aria-expanded={on}
                aria-controls={`feature-demo-${i}`}
                className="mt-3 inline-flex w-fit items-center gap-1 rounded-lg bg-chip px-2.5 py-1 text-[12.5px] font-bold text-ink-2"
              >
                예시 보기
                <span aria-hidden className={`transition-transform ${on ? "rotate-90" : ""}`}>
                  ›
                </span>
              </button>
            </div>
            <div id={`feature-demo-${i}`} hidden={!on} className={`fade-in absolute top-full z-20 w-[min(22rem,calc(100vw-2rem))] pt-2 ${SIDE[i % 4]}`}>
              <div className="rounded-2xl border border-line bg-card p-4 shadow-[0_18px_40px_-18px_rgba(31,42,68,0.45)]">{f.demo}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

const WORDS = [
  { w: "She", pos: "대명사", m: "그녀는" },
  { w: "sings", pos: "동사", m: "노래한다" },
  { w: "like", pos: "전치사", m: "~처럼, ~같이" },
  { w: "a", pos: "관사", m: "(어떤) 하나의" },
  { w: "bird", pos: "명사", m: "새" },
];

/** 단어에 마우스를 올리면(터치는 누르면) 이 문장 속 뜻이 뜨는 예시 */
export function WordDemo() {
  const [sel, setSel] = useState<number | null>(null);
  const cur = sel === null ? null : WORDS[sel];
  return (
    <div>
      <p className="text-[12.5px] font-extrabold text-coral-ink">단어 뜻풀이</p>
      <p lang="en" className="mt-2 text-[1.25rem] font-medium">
        {WORDS.map((x, i) => (
          <Fragment key={x.w}>
            {i > 0 && " "}
            <button
              type="button"
              aria-pressed={sel === i}
              onPointerEnter={() => setSel(i)}
              onFocus={() => setSel(i)}
              onClick={() => setSel(i)}
              className={`rounded px-0.5 underline decoration-dotted decoration-[1.5px] underline-offset-[0.22em] ${
                sel === i ? "bg-amber-soft decoration-coral" : "decoration-coral/70 hover:bg-amber-soft"
              }`}
            >
              {x.w}
            </button>
          </Fragment>
        ))}
        .
      </p>
      <div aria-live="polite" className="mt-3 min-h-[4.25rem] rounded-xl bg-chip px-3.5 py-2.5">
        {cur ? (
          <>
            <p className="flex items-center gap-2">
              <span lang="en" className="text-[1rem]">
                {cur.w}
              </span>
              <span className="rounded-lg bg-card px-2 py-0.5 text-[12px] font-bold text-ink-2">{cur.pos}</span>
            </p>
            <p className="mt-0.5 font-bold">{cur.m}</p>
          </>
        ) : (
          <p className="text-[13.5px] text-ink-2">밑줄 친 단어에 마우스를 올리거나 눌러 보세요.</p>
        )}
      </div>
      <p className="mt-3 text-[13px] leading-relaxed text-ink-3">
        발음도 들을 수 있고, 더 많은 뜻은 네이버 영어사전에서 이어서 볼 수 있어요.
      </p>
    </div>
  );
}

/** 말로 묻고 답을 받는 예시 (질문 은행의 실제 답을 줄였다) */
export function AskDemo() {
  return (
    <div className="space-y-2.5">
      <p className="text-[12.5px] font-extrabold text-coral-ink">말로 묻고 답 듣기</p>
      <p className="ml-auto flex w-fit max-w-[90%] items-center gap-1.5 rounded-2xl rounded-br-md bg-ink px-3.5 py-2 text-[14px] text-on-ink">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
          <rect x="9" y="3" width="6" height="11" rx="3" />
          <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
        </svg>
        a랑 an은 왜 달라요?
      </p>
      <div className="flex gap-2.5 rounded-2xl bg-chip px-3.5 py-3">
        <Mate mood="happy" size={28} className="mt-0.5 shrink-0 text-ink" />
        <div className="min-w-0 text-[14px] leading-relaxed">
          <p>
            뒤에 오는 단어의 <b>첫 소리</b>가 모음 소리면 an, 아니면 a예요. 철자가 아니라 <b>소리</b>가 기준이에요.
          </p>
          <p lang="en" className="mt-1.5">
            an apple · a cat
          </p>
        </div>
      </div>
    </div>
  );
}

/** 내 공부 쪽에 모이는 기록의 예시 */
export function RecordDemo() {
  const rows = [
    ["다 읽은 단원", "12개"],
    ["다시 볼 문제", "3문제"],
    ["내 단어장", "28개"],
  ];
  return (
    <div>
      <p className="text-[12.5px] font-extrabold text-coral-ink">내 공부</p>
      <ul className="mt-2 space-y-1.5 text-[14px]">
        {rows.map(([k, v]) => (
          <li key={k} className="flex items-center justify-between rounded-xl bg-chip px-3.5 py-2">
            <span className="font-bold">{k}</span>
            <span className="font-extrabold">{v}</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 flex items-start gap-1.5 text-[13px] leading-relaxed text-ink-3">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" className="mt-0.5 shrink-0" aria-hidden>
          <rect x="5" y="11" width="14" height="10" rx="2" />
          <path d="M8 11V8a4 4 0 0 1 8 0v3" />
        </svg>
        이 기기에만 저장돼요. 다른 사람과 비교하지 않아요.
      </p>
    </div>
  );
}
