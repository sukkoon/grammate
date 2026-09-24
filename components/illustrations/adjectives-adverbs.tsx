import type { ReactNode } from "react";
import { En } from "@/components/lesson/En";
import { ArrowRight } from "./icons";

/* 형용사와 부사 장 그림: 형용사의 두 자리, 형용사 순서, 수량형용사 눈금, -ly 규칙, 빈도 막대, 빈도부사 자리, 뜻이 달라지는 -ly, 빼 보기 테스트 */

/* ───────── 형용사의 두 자리 ───────── */

const seatVerbs: { en: string; ko: string }[] = [
  { en: "be", ko: "…이다" },
  { en: "become", ko: "…이 되다" },
  { en: "look", ko: "…해 보이다" },
  { en: "feel", ko: "…하게 느끼다" },
  { en: "sound", ko: "…하게 들리다" },
  { en: "smell", ko: "…한 냄새가 나다" },
  { en: "taste", ko: "…한 맛이 나다" },
];

function SeatCard({ title, sub, children, note }: { title: string; sub: string; children: ReactNode; note: ReactNode }) {
  return (
    <div className="rounded-2xl border border-line px-4 py-4">
      <p className="text-[15px] font-extrabold">{title}</p>
      <p className="text-[14px] text-ink-2">{sub}</p>
      <p lang="en" className="mt-3 flex flex-wrap items-center gap-1.5 text-[1.25em] font-medium">
        {children}
      </p>
      <p className="mt-3 text-[14px] text-ink-2">{note}</p>
    </div>
  );
}

/** 형용사가 앉는 두 자리: 명사 앞(한정적) / 동사 뒤 보어 자리(서술적) */
export function AaTwoSeats() {
  return (
    <div className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <SeatCard
          title="자리 ① 명사 바로 앞"
          sub="꾸며 주는 자리 · 한정적 용법"
          note={
            <>
              많고 많은 개 중에서 <b>작은 개</b>로 범위를 좁혀요.
            </>
          }
        >
          <En en="a" />
          <span className="rounded-lg bg-mint-soft px-2 py-0.5 font-bold text-mint-ink">
            <En en="small" />
          </span>
          <span className="rounded-lg bg-sky-soft px-2 py-0.5 text-sky-ink">
            <En en="dog" />
          </span>
        </SeatCard>
        <SeatCard
          title="자리 ② 동사 뒤"
          sub="설명하는 자리 (보어) · 서술적 용법"
          note={
            <>
              그 개가 <b>어떤지</b> 설명해요. small을 빼면 말이 끊겨요.
            </>
          }
        >
          <span className="rounded-lg bg-sky-soft px-2 py-0.5 text-sky-ink">
            <En en="The dog" />
          </span>
          <span className="rounded-lg bg-coral px-2 py-0.5 text-white">
            <En en="is" />
          </span>
          <span className="rounded-lg bg-mint-soft px-2 py-0.5 font-bold text-mint-ink">
            <En en="small." />
          </span>
        </SeatCard>
      </div>
      <div className="rounded-2xl bg-chip px-4 py-3">
        <p className="text-[14px] font-extrabold text-ink-2">자리 ②를 열어 주는 동사들</p>
        <ul className="mt-2 flex flex-wrap gap-2">
          {seatVerbs.map((v) => (
            <li key={v.en} className="rounded-lg bg-card px-2.5 py-1 text-[14px]">
              <span className="text-[15px] font-bold">
                <En en={v.en} />
              </span>{" "}
              <span className="text-ink-2">{v.ko}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ───────── 형용사 여러 개의 순서 ───────── */

const orderSlots: { label: string; en: string; noun?: boolean }[] = [
  { label: "의견", en: "nice · cute" },
  { label: "크기", en: "big · little" },
  { label: "나이", en: "old · new" },
  { label: "색", en: "red · white" },
  { label: "재료", en: "wooden · paper" },
  { label: "명사", en: "box · cat", noun: true },
];

const orderExamples: { en: string; ko: string }[] = [
  { en: "a [[cute little white]] cat", ko: "의견 → 크기 → 색" },
  { en: "an [[old wooden]] box", ko: "나이 → 재료" },
];

/** 형용사 순서: 의견 → 크기 → 나이 → 색 → 재료 → 명사 */
export function AaAdjectiveOrder() {
  return (
    <div>
      <ol className="grid grid-cols-3 gap-2 sm:grid-cols-6">
        {orderSlots.map((s, i) => (
          <li
            key={s.label}
            className={`rounded-2xl px-2 py-3 text-center ${s.noun ? "bg-sky-soft text-sky-ink" : "bg-mint-soft text-mint-ink"}`}
          >
            <p className="text-[14px] font-extrabold">
              {i + 1}. {s.label}
            </p>
            <p className="mt-1 text-[15px] font-medium text-ink">
              <En en={s.en} />
            </p>
          </li>
        ))}
      </ol>
      <p className="mt-2 text-center text-[14px] text-ink-2">
        명사에서 멀수록 사람마다 다른 생각, 가까울수록 잘 변하지 않는 성질이에요.
      </p>
      <ul className="mt-3 space-y-1.5">
        {orderExamples.map((e) => (
          <li key={e.en} className="flex flex-wrap items-baseline gap-x-3 rounded-xl border border-line px-3 py-2">
            <span className="text-[1.1em] font-medium">
              <En en={e.en} />
            </span>
            <span className="text-[14px] text-ink-2">{e.ko}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ───────── 수량형용사 눈금 ───────── */

function Cookies({ n }: { n: number }) {
  return (
    <span className="flex w-16 shrink-0 flex-wrap gap-1" aria-hidden>
      {Array.from({ length: n }, (_, i) => (
        <span key={i} className="size-3.5 rounded-full bg-amber-ink/80" />
      ))}
    </span>
  );
}

function Glass({ level }: { level: number }) {
  // 유리컵 옆면: (5,4)→(9,40), (27,4)→(23,40)
  const top = 8 + (1 - level) * 30;
  const left = 5 + ((top - 4) * 4) / 36;
  const right = 27 - ((top - 4) * 4) / 36;
  return (
    <svg viewBox="0 0 32 44" className="h-11 w-16 shrink-0" aria-hidden>
      <path d={`M${left} ${top} L9 40 H23 L${right} ${top} Z`} style={{ fill: "var(--sky-ink)", opacity: 0.45 }} />
      <path
        d="M5 4 L9 40 H23 L27 4"
        style={{ stroke: "var(--ink-2)", fill: "none", strokeWidth: 2.2, strokeLinejoin: "round", strokeLinecap: "round" }}
      />
    </svg>
  );
}

const scale: { title: string; mood: string; tone: string; count: number; level: number; rows: { en: string; kind: "count" | "mass" }[] }[] = [
  {
    title: "거의 없어요",
    mood: "아쉬운 느낌",
    tone: "text-coral-ink",
    count: 1,
    level: 0.1,
    rows: [
      { en: "[[few]] cookies", kind: "count" },
      { en: "[[{little|형용사:(양이) 거의 없는}]] milk", kind: "mass" },
    ],
  },
  {
    title: "조금 있어요",
    mood: "다행인 느낌",
    tone: "text-mint-ink",
    count: 3,
    level: 0.35,
    rows: [
      { en: "[[{a few}]] cookies", kind: "count" },
      { en: "[[{a little}]] milk", kind: "mass" },
    ],
  },
  {
    title: "많아요",
    mood: "넉넉한 느낌",
    tone: "text-sky-ink",
    count: 8,
    level: 0.9,
    rows: [
      { en: "[[many]] cookies", kind: "count" },
      { en: "[[much]] milk", kind: "mass" },
    ],
  },
];

const bothWords: { en: string }[] = [{ en: "{a lot of}" }, { en: "{lots of}" }, { en: "some" }, { en: "any" }, { en: "enough" }];

/** 수량형용사: 셀 수 있는 명사(쿠키) / 셀 수 없는 명사(우유) × 거의 없음·조금·많음 */
export function AaQuantityScale() {
  return (
    <div className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-3">
        {scale.map((s) => (
          <div key={s.title} className="rounded-2xl border border-line px-4 py-3">
            <p className={`text-[15px] font-extrabold ${s.tone}`}>{s.title}</p>
            <p className="text-[14px] text-ink-2">{s.mood}</p>
            <ul className="mt-2 space-y-2">
              {s.rows.map((r) => (
                <li key={r.en} className="flex items-center gap-2">
                  {r.kind === "count" ? <Cookies n={s.count} /> : <Glass level={s.level} />}
                  <span className="min-w-0">
                    <span className="block text-[14px] text-ink-3">{r.kind === "count" ? "셀 수 있어요" : "셀 수 없어요"}</span>
                    <span className="block text-[1.05em] font-medium">
                      <En en={r.en} />
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="rounded-2xl bg-chip px-4 py-3">
        <p className="text-[14px] font-extrabold text-ink-2">둘 다 쓸 수 있는 말</p>
        <p className="mt-2 flex flex-wrap gap-2">
          {bothWords.map((w) => (
            <span key={w.en} className="rounded-lg bg-card px-2.5 py-1 text-[15px] font-medium">
              <En en={w.en} />
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}

/* ───────── 부사 만드는 -ly 규칙 ───────── */

const lyRules: { rule: string; how: string; pairs: { en: string }[] }[] = [
  { rule: "대부분", how: "끝에 -ly", pairs: [{ en: "slow → [[slowly]]" }, { en: "quiet → [[quietly]]" }, { en: "careful → [[carefully]]" }] },
  { rule: "자음 + y로 끝나면", how: "y를 i로 바꾸고 -ly", pairs: [{ en: "happy → [[happily]]" }, { en: "easy → [[easily]]" }] },
  { rule: "-le로 끝나면", how: "e를 빼고 y", pairs: [{ en: "gentle → [[gently]]" }, { en: "simple → [[simply]]" }] },
  {
    rule: "모양이 그대로",
    how: "-ly를 붙이지 않아요",
    pairs: [{ en: "{fast|형용사:빠른} → [[fast]]" }, { en: "{hard|형용사:어려운, 딱딱한} → [[hard]]" }, { en: "{early|형용사:이른} → [[early]]" }],
  },
  { rule: "모양이 확 바뀌는 것", how: "외워 두기", pairs: [{ en: "good → [[well]]" }] },
];

/** 형용사 → 부사 만들기 규칙 카드 */
export function AaLyRules() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {lyRules.map((r) => (
        <div key={r.rule} className="rounded-2xl border border-line px-4 py-3">
          <p className="font-extrabold">{r.rule}</p>
          <p className="text-[14px] text-ink-2">{r.how}</p>
          <ul className="mt-2 space-y-1">
            {r.pairs.map((p) => (
              <li key={p.en} className="text-[15px] font-medium">
                <En en={p.en} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/* ───────── 빈도부사 막대 ───────── */

const freq: { en: string; ko: string; p: number; label: string }[] = [
  { en: "always", ko: "항상", p: 100, label: "100%" },
  { en: "usually", ko: "보통, 대개", p: 90, label: "약 90%" },
  { en: "often", ko: "자주", p: 70, label: "약 70%" },
  { en: "sometimes", ko: "가끔", p: 50, label: "약 50%" },
  { en: "rarely", ko: "좀처럼 …않는", p: 10, label: "약 10%" },
  { en: "never", ko: "절대 …않는", p: 0, label: "0%" },
];

/** 빈도부사: always 100% … never 0% */
export function AaFrequencyBar() {
  return (
    <ul className="space-y-2.5" aria-label="빈도부사를 자주 하는 순서로 늘어놓은 막대">
      {freq.map((f) => (
        <li key={f.en} className="grid grid-cols-[6.5rem_1fr_3.5rem] items-center gap-2 sm:grid-cols-[9rem_1fr_4rem]">
          <span className="min-w-0">
            <span className="block text-[1.08em] font-bold">
              <En en={f.en} />
            </span>
            <span className="block text-[14px] leading-tight text-ink-2">{f.ko}</span>
          </span>
          <span className="block h-4 overflow-hidden rounded-full bg-chip">
            <span className="block h-4 rounded-full bg-coral" style={{ width: `${f.p}%` }} />
          </span>
          <span className="text-right text-[14px] font-bold text-ink-2">{f.label}</span>
        </li>
      ))}
    </ul>
  );
}

/* ───────── 빈도부사의 자리 ───────── */

type Piece = { en: string; kind?: "adv" | "verb" };

const seatRows: { label: string; pieces: Piece[] }[] = [
  {
    label: "일반동사 앞",
    pieces: [{ en: "I" }, { en: "always", kind: "adv" }, { en: "walk", kind: "verb" }, { en: "to school." }],
  },
  {
    label: "be동사 뒤",
    pieces: [{ en: "I" }, { en: "am", kind: "verb" }, { en: "always", kind: "adv" }, { en: "happy." }],
  },
  {
    label: "조동사 뒤",
    pieces: [{ en: "I" }, { en: "can", kind: "verb" }, { en: "always", kind: "adv" }, { en: "help you." }],
  },
  {
    label: "don't 뒤",
    pieces: [{ en: "I" }, { en: "don't", kind: "verb" }, { en: "usually", kind: "adv" }, { en: "eat breakfast." }],
  },
];

function PieceChip({ p }: { p: Piece }) {
  const tone =
    p.kind === "adv"
      ? "rounded-lg bg-amber-soft px-1.5 py-0.5 font-bold text-amber-ink ring-2 ring-amber-ink/40"
      : p.kind === "verb"
        ? "rounded-lg bg-coral px-1.5 py-0.5 text-white"
        : "";
  return (
    <span className={tone}>
      <En en={p.en} />
    </span>
  );
}

/** 빈도부사의 자리: 일반동사 앞, be동사·조동사 뒤 */
export function AaFrequencySeat() {
  return (
    <div>
      <ul className="space-y-2">
        {seatRows.map((r) => (
          <li key={r.label} className="flex flex-col gap-2 rounded-2xl border border-line px-3 py-3 sm:flex-row sm:items-center sm:gap-4">
            <span className="w-fit shrink-0 rounded-lg bg-chip px-2.5 py-1 text-[14px] font-extrabold sm:w-28">{r.label}</span>
            <span lang="en" className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[1.15em] font-medium">
              {r.pieces.map((p, i) => (
                <PieceChip key={i} p={p} />
              ))}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-3 flex flex-wrap items-center justify-center gap-2 text-[14px] font-bold">
        <span className="rounded-lg bg-coral px-2 py-1 text-white">동사</span>
        <span className="rounded-lg bg-amber-soft px-2 py-1 text-amber-ink">빈도부사</span>
        <span className="text-ink-2">be동사·조동사는 뒤, 일반동사는 앞</span>
      </p>
    </div>
  );
}

/* ───────── -ly를 붙이면 뜻이 달라지는 부사 ───────── */

const lookAlikes: { en: string; ko: string; ly: { en: string; ko: string } }[] = [
  { en: "hard", ko: "열심히 · 어려운", ly: { en: "hardly", ko: "거의 …않다" } },
  { en: "late", ko: "늦게 · 늦은", ly: { en: "lately", ko: "최근에" } },
  { en: "high", ko: "높이 · 높은", ly: { en: "highly", ko: "매우, 대단히" } },
  { en: "{near|형용사·부사:가까운, 가까이}", ko: "가까이 · 가까운", ly: { en: "nearly", ko: "거의" } },
  { en: "{close|형용사·부사:가까운, 가까이}", ko: "가까이 · 가까운", ly: { en: "closely", ko: "자세히, 면밀히" } },
  { en: "most", ko: "가장 · 대부분의", ly: { en: "mostly", ko: "주로, 대개" } },
];

/** 모양은 비슷, 뜻은 남남: hard / hardly … */
export function AaLookAlikes() {
  return (
    <ul className="grid gap-2.5 sm:grid-cols-2">
      {lookAlikes.map((w) => (
        <li key={w.ly.en} className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 rounded-2xl border border-line px-3 py-3">
          <span className="min-w-0">
            <span className="block text-[1.15em] font-bold">
              <En en={w.en} />
            </span>
            <span className="block text-[14px] text-ink-2">{w.ko}</span>
          </span>
          <ArrowRight size={18} className="text-ink-3" />
          <span className="min-w-0">
            <span className="block text-[1.15em] font-bold text-coral-ink">
              <En en={w.ly.en} />
            </span>
            <span className="block text-[14px] text-ink-2">{w.ly.ko}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}

/* ───────── 빼 보기 테스트: 보어냐 수식어냐 ───────── */

const removeCases: { tag: string; en: string; rest: string; verdict: string; ok: boolean; answer: string }[] = [
  {
    tag: "taste: …한 맛이 나다",
    en: "The soup tastes [[salty]].",
    rest: "The soup tastes",
    verdict: "무슨 맛이 난다는 거죠? 뜻이 끊겨요.",
    ok: false,
    answer: "보어 자리 → 형용사",
  },
  {
    tag: "taste: 맛보다 (동작)",
    en: "He tasted the soup [[carefully]].",
    rest: "He tasted the soup",
    verdict: "그는 수프를 맛봤다. 그래도 멀쩡해요.",
    ok: true,
    answer: "수식어 자리 → 부사",
  },
];

/** 빼 보기: 빼면 무너지면 보어(형용사), 빼도 멀쩡하면 수식어(부사) */
export function AaRemoveTest() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {removeCases.map((c) => (
        <div key={c.en} className="rounded-2xl border border-line px-4 py-4">
          <p className="text-[14px] font-extrabold text-ink-3">{c.tag}</p>
          <p className="mt-1.5 text-[1.15em] font-medium">
            <En en={c.en} />
          </p>
          <p className="mt-3 text-[14px] font-bold text-ink-2">빼 보면</p>
          <p className="mt-1 text-[1.1em] font-medium">
            <En en={c.rest} />{" "}
            <span className="inline-block w-12 border-b-2 border-dashed border-ink-3 align-middle" aria-hidden />.
          </p>
          <p className={`mt-1 text-[14px] ${c.ok ? "text-mint-ink" : "text-coral-ink"}`}>{c.verdict}</p>
          <p
            className={`mt-3 w-fit rounded-lg px-2.5 py-1 text-[14px] font-extrabold ${
              c.ok ? "bg-amber-soft text-amber-ink" : "bg-mint-soft text-mint-ink"
            }`}
          >
            {c.answer}
          </p>
        </div>
      ))}
    </div>
  );
}
