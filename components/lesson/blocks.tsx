import type { ReactNode } from "react";
import { plain } from "@/lib/lexicon";
import { Mate, type Mood } from "@/components/brand/Mate";
import type { Level } from "@/content/curriculum";
import { BANDS, bandLabel, bandOf, type Band } from "@/lib/level";
import { Lv } from "@/components/level/Lv";
import { En } from "./En";
import { Speak } from "./Speak";

/** 예문 하나: 영어(단어마다 뜻) + 발음 + 해석 + 짧은 설명 */
export function Ex({ en, ko, note }: { en: string; ko?: string; note?: ReactNode }) {
  return (
    <div className="flex items-start gap-2 border-b border-line py-3 last:border-b-0">
      <div className="min-w-0 flex-1">
        <p className="text-[1.12em] font-medium leading-relaxed">
          <En en={en} />
        </p>
        {ko && <p className="mt-0.5 text-[0.93em] text-ink-2">{ko}</p>}
        {note && <p className="mt-1 text-[0.88em] text-ink-3">{note}</p>}
      </div>
      <Speak text={plain(en)} />
    </div>
  );
}

/** 예문 묶음 */
export function Examples({ title = "예문", children }: { title?: string; children: ReactNode }) {
  return (
    <section className="my-6 rounded-2xl border border-line bg-card px-4 pb-1 pt-3 sm:px-5">
      <p className="flex items-center gap-2 text-[13px] font-bold text-ink-3">
        {title}
        <span className="font-normal">· 밑줄 친 단어를 누르면 뜻이 보여요</span>
      </p>
      <div>{children}</div>
    </section>
  );
}

/** 자주 하는 실수: 틀린 문장과 맞는 문장 */
export function Mistake({ wrong, right, why }: { wrong: string; right: string; why?: ReactNode }) {
  return (
    <div className="my-5 overflow-hidden rounded-2xl border border-line bg-card">
      <div className="flex items-start gap-3 px-4 py-3 sm:px-5">
        <span aria-label="틀린 문장" className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-coral-soft text-[14.5px] font-extrabold text-coral-ink">
          ✕
        </span>
        <p className="text-[1.08em] text-ink-2 line-through decoration-coral/60 decoration-2">
          <En en={wrong} />
        </p>
      </div>
      <div className="flex items-start gap-3 border-t border-line px-4 py-3 sm:px-5">
        <span aria-label="맞는 문장" className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-mint-soft text-[14.5px] font-extrabold text-mint-ink">
          ✓
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[1.08em] font-medium">
            <En en={right} />
          </p>
          {why && <p className="mt-1 text-[0.92em] text-ink-2">{why}</p>}
        </div>
        <Speak text={plain(right)} />
      </div>
    </div>
  );
}

/** 내신·수능 포인트. level은 이 포인트가 필요한 수준 (내신은 중등, 수능은 고등) */
export function ExamPoint({
  title = "내신 포인트",
  level = "middle",
  children,
}: {
  title?: string;
  level?: Band;
  children: ReactNode;
}) {
  return (
    <Lv min={level} topic={title}>
    <aside className="my-6 rounded-2xl bg-amber-soft px-4 py-4 sm:px-5">
      <p className="flex items-center gap-2 text-[13.5px] font-extrabold text-amber-ink">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M9 11l3 3L22 4" />
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
        </svg>
        {title}
      </p>
      <div className="mt-2 text-[0.97em] [&>p]:my-1.5 [&_ul]:list-disc [&_ul]:pl-5">{children}</div>
    </aside>
    </Lv>
  );
}

/** 짝꿍의 한마디: 표정 이모지와 함께 */
export function Tip({ mood = "wink", title, children }: { mood?: Mood; title?: string; children: ReactNode }) {
  return (
    <aside className="my-6 flex gap-3 rounded-2xl border border-line bg-card px-4 py-4 sm:px-5">
      <Mate mood={mood} size={40} className="mt-0.5 shrink-0 text-ink" />
      <div className="min-w-0 text-[0.97em] [&>p]:my-1">
        <p className="text-[13px] font-bold text-coral-ink">{title ?? "짝꿍의 한마디"}</p>
        {children}
      </div>
    </aside>
  );
}

/** 접히는 심화 상자 */
export function DeepDive({ level = "고1", title, children }: { level?: Level; title: string; children: ReactNode }) {
  return (
    <Lv min={bandOf(level)} topic={`심화: ${title}`}>
    <details className="group my-6 rounded-2xl border border-line bg-card [&[open]>summary]:border-b [&[open]>summary]:border-line">
      <summary className="flex cursor-pointer list-none items-center gap-2 px-4 py-3.5 sm:px-5 [&::-webkit-details-marker]:hidden">
        <span className="rounded-lg bg-sky-soft px-2 py-0.5 text-[12px] font-extrabold text-sky-ink">심화 · {level}</span>
        <span className="flex-1 font-bold">{title}</span>
        <svg className="shrink-0 transition-transform group-open:rotate-180" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
          <path d="m6 9 6 6 6-6" />
        </svg>
      </summary>
      <div className="px-4 pb-4 pt-1 sm:px-5 [&>p]:my-3">{children}</div>
    </details>
    </Lv>
  );
}

/** 한눈에 정리: 마크다운 표를 감싸서 꾸민다 */
export function Summary({ title = "한눈에 정리", children }: { title?: string; children: ReactNode }) {
  return (
    <section className="my-8">
      <p className="mb-2 flex items-center gap-2 text-[14.5px] font-extrabold">
        <Mate mood="happy" size={26} className="text-ink" />
        {title}
      </p>
      <div className="[&_.table-wrap]:my-0">{children}</div>
    </section>
  );
}

/** 그림 상자 */
export function Figure({ caption, children }: { caption?: ReactNode; children: ReactNode }) {
  return (
    <figure className="my-7 overflow-hidden rounded-2xl border border-line bg-card">
      <div className="px-3 py-5 sm:px-6">{children}</div>
      {caption && <figcaption className="border-t border-line px-4 py-2.5 text-[13.5px] text-ink-2 sm:px-5">{caption}</figcaption>}
    </figure>
  );
}

/** 한 줄 핵심 */
export function KeyIdea({ children }: { children: ReactNode }) {
  return (
    <p className="my-6 rounded-2xl bg-ink px-5 py-4 text-[1.08em] font-bold leading-relaxed text-on-ink">
      <span className="mr-2 rounded-lg bg-coral px-2 py-0.5 text-[12px] font-extrabold align-middle text-white">한 줄 핵심</span>
      {children}
    </p>
  );
}

/** 본문 중간에 영어를 넣을 때: <E en="I like you." /> (MDX에서 중괄호가 코드로 읽히지 않도록 속성으로 받는다) */
export function E({ en }: { en: string }) {
  return (
    <span className="font-medium">
      <En en={en} />
    </span>
  );
}

export function LevelBadges({ levels }: { levels: Level[] }) {
  const bands = BANDS.filter((b) => levels.some((l) => bandOf(l) === b));
  return (
    <span className="inline-flex flex-wrap gap-1">
      {bands.map((b) => (
        <LevelBadge key={b} band={b} />
      ))}
    </span>
  );
}

/** 초등·중등·고등 표시: 모서리가 둥근 네모, 고등으로 갈수록 진한 색 (색은 globals.css의 .lv-badge) */
export function LevelBadge({ band, className = "" }: { band: Band; className?: string }) {
  return (
    <span data-band={band} className={`lv-badge inline-block rounded-md px-2 py-0.5 text-[12px] font-extrabold leading-[1.5] `}>
      {bandLabel[band]}
    </span>
  );
}
