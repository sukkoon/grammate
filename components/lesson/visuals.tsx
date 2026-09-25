import type { ReactNode } from "react";
import { En } from "./En";

/* 단원 어디서나 쓰는 작은 도식: 문장 공식 띠(Formula), 나란히 비교(Compare), 흐름(Steps) */

type Tone = "coral" | "sky" | "mint" | "amber" | "plain";

const CHIP: Record<Tone, string> = {
  coral: "bg-coral text-white",
  sky: "bg-sky-soft text-sky-ink",
  mint: "bg-mint-soft text-mint-ink",
  amber: "bg-amber-soft text-amber-ink",
  plain: "bg-chip text-ink",
};

const SYMBOLS = new Set(["+", ",", "→", "=", "/", "…", "·"]);

/**
 * 문장 공식 띠. parts의 표기:
 * - "주어"          보통 칸
 * - "*be + p.p."    강조 칸 (코랄)
 * - "(by + 행위자)" 생략할 수 있는 칸 (점선)
 * - "+", ",", "→", "=", "/" 는 기호로 그린다
 * - "~sky:동사원형" 처럼 앞에 색 이름을 붙이면 그 색 칸 (sky, mint, amber)
 */
export function Formula({ parts, caption, en, ko }: { parts: string[]; caption?: string; en?: string; ko?: string }) {
  return (
    <figure className="my-5 rounded-2xl border border-line bg-card px-4 py-3.5">
      {caption && <figcaption className="mb-2 text-[14px] font-extrabold text-ink-3">{caption}</figcaption>}
      <p className="flex flex-wrap items-center gap-1.5 text-[15.5px] font-bold">
        {parts.map((raw, i) => {
          if (SYMBOLS.has(raw))
            return (
              <span key={i} aria-hidden={raw === "+"} className="px-0.5 text-ink-3">
                {raw}
              </span>
            );
          let text = raw;
          let tone: Tone = "plain";
          let optional = false;
          const m = text.match(/^~(sky|mint|amber|coral):(.*)$/);
          if (m) {
            tone = m[1] as Tone;
            text = m[2];
          } else if (text.startsWith("*")) {
            tone = "coral";
            text = text.slice(1);
          }
          if (/^\(.*\)$/.test(text)) {
            optional = true;
            text = text.slice(1, -1);
          }
          return (
            <span
              key={i}
              className={`rounded-lg px-2.5 py-1 ${optional ? "border-2 border-dashed border-ink-3 text-ink-2" : CHIP[tone]}`}
              title={optional ? "생략할 수 있어요" : undefined}
            >
              {text}
              {optional && <span className="sr-only"> (생략 가능)</span>}
            </span>
          );
        })}
      </p>
      {en && (
        <p className="mt-2.5 text-[1.04em] font-medium">
          <En en={en} />
        </p>
      )}
      {ko && <p className="text-[14px] text-ink-2">{ko}</p>}
    </figure>
  );
}

export interface CompareItem {
  title: string;
  /** 짧은 설명(한두 줄) */
  sub?: string;
  tone?: Exclude<Tone, "plain">;
  /** 예문 (단어 뜻 표기법) */
  en?: string;
  ko?: string;
  /** 짧은 요점 목록 */
  points?: string[];
  /** 맞는 쪽/틀린 쪽 표시 */
  mark?: "ok" | "no";
}

const HEAD: Record<Exclude<Tone, "plain">, string> = {
  coral: "bg-coral-soft text-coral-ink",
  sky: "bg-sky-soft text-sky-ink",
  mint: "bg-mint-soft text-mint-ink",
  amber: "bg-amber-soft text-amber-ink",
};

/** 두세 가지를 나란히 놓고 비교하는 카드 */
export function Compare({ items, caption, vs = true }: { items: CompareItem[]; caption?: string; vs?: boolean }) {
  const cols = items.length >= 3 ? "sm:grid-cols-3" : "sm:grid-cols-2";
  return (
    <figure className="my-5">
      {caption && <figcaption className="mb-2 text-[14px] font-extrabold text-ink-3">{caption}</figcaption>}
      <div className={`relative grid gap-2.5 ${cols}`}>
        {items.map((it, i) => (
          <div key={it.title} className="relative flex flex-col rounded-2xl border border-line bg-card">
            {vs && i > 0 && items.length === 2 && (
              <span
                aria-hidden
                className="absolute -top-3.5 left-1/2 hidden size-8 -translate-x-1/2 place-items-center rounded-full bg-ink text-[14px] font-extrabold text-bg sm:-left-[1.15rem] sm:top-1/2 sm:grid sm:-translate-y-1/2 sm:translate-x-0"
              >
                vs
              </span>
            )}
            <div className={`flex items-center gap-2 rounded-t-2xl px-4 py-2.5 ${HEAD[it.tone ?? (i === 0 ? "sky" : "coral")]}`}>
              {it.mark && (
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-card text-[14px] font-extrabold" aria-label={it.mark === "ok" ? "맞아요" : "틀려요"}>
                  {it.mark === "ok" ? "✓" : "✕"}
                </span>
              )}
              <span className="min-w-0">
                <span className="block text-[16px] font-extrabold">{it.title}</span>
                {it.sub && <span className="block text-[14px] font-bold opacity-90">{it.sub}</span>}
              </span>
            </div>
            <div className="grid gap-1.5 px-4 py-3">
              {it.en && (
                <p className="text-[1.03em] font-medium">
                  <En en={it.en} />
                </p>
              )}
              {it.ko && <p className="text-[14px] text-ink-2">{it.ko}</p>}
              {it.points && (
                <ul className="grid gap-1 text-[14.5px]">
                  {it.points.map((p) => (
                    <li key={p} className="flex gap-1.5">
                      <span aria-hidden className="text-ink-3">
                        ·
                      </span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </figure>
  );
}

/** 순서대로 따라 하는 단계 (바꿔 쓰기, 만드는 법) */
export function Steps({ steps, caption }: { steps: { title: string; en?: string; ko?: string; note?: ReactNode }[]; caption?: string }) {
  return (
    <figure className="my-5">
      {caption && <figcaption className="mb-2 text-[14px] font-extrabold text-ink-3">{caption}</figcaption>}
      <ol className="grid gap-2">
        {steps.map((s, i) => (
          <li key={s.title} className="flex gap-3 rounded-2xl border border-line bg-card px-4 py-3">
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-ink text-[15px] font-extrabold text-bg" aria-hidden>
              {i + 1}
            </span>
            <span className="min-w-0">
              <span className="block font-extrabold">{s.title}</span>
              {s.en && (
                <span className="mt-0.5 block text-[1.03em] font-medium">
                  <En en={s.en} />
                </span>
              )}
              {s.ko && <span className="block text-[14px] text-ink-2">{s.ko}</span>}
              {s.note && <span className="mt-0.5 block text-[14px] text-ink-3">{s.note}</span>}
            </span>
          </li>
        ))}
      </ol>
    </figure>
  );
}
