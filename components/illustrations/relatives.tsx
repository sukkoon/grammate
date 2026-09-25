import type { ReactNode } from "react";
import { En } from "@/components/lesson/En";
import { ArrowRight, CrownIcon, MaskIcon, PersonIcon } from "./icons";

/* 관계사 장 그림: 두 문장 잇기, 격 고르기, 진짜 동사 세기, what의 속, 네 갈래 고르기, 관계부사 카드, 쉼표의 차이, 전치사 옮기기, -ever 가족 */

/* ───────── 공통 도우미 ───────── */

type RlKind = "plain" | "cut" | "rel" | "verb" | "verbal" | "ante";
type RlBit = { en: string; kind: RlKind };

function RlWord({ bit }: { bit: RlBit }) {
  switch (bit.kind) {
    case "cut":
      // 지운 단어는 뜻 풍선 없이 줄만 긋는다
      return (
        <span className="rounded-lg border border-dashed border-ink-3 px-1.5 py-0.5 text-ink-3 line-through decoration-coral decoration-2">
          {bit.en}
        </span>
      );
    case "rel":
      return (
        <span className="rounded-lg bg-sky-soft px-1.5 py-0.5 font-bold text-sky-ink">
          <En en={bit.en} />
        </span>
      );
    case "ante":
      return (
        <span className="rounded-lg bg-amber-soft px-1.5 py-0.5 text-amber-ink">
          <En en={bit.en} />
        </span>
      );
    case "verb":
      return (
        <span className="inline-flex items-center gap-1 rounded-lg bg-coral px-1.5 py-0.5 text-white">
          <CrownIcon size={16} />
          <En en={bit.en} />
        </span>
      );
    case "verbal":
      return (
        <span className="inline-flex items-center gap-1 rounded-lg bg-mint-soft px-1.5 py-0.5 text-mint-ink">
          <MaskIcon size={18} />
          <En en={bit.en} />
        </span>
      );
    default:
      return (
        <span className="py-0.5">
          <En en={bit.en} />
        </span>
      );
  }
}

function RlLine({ bits, className = "" }: { bits: RlBit[]; className?: string }) {
  return (
    <p lang="en" className={`flex flex-wrap items-center gap-x-1.5 gap-y-2 text-[1.1em] font-medium ${className}`}>
      {bits.map((b, i) => (
        <RlWord key={i} bit={b} />
      ))}
    </p>
  );
}

function Mark({ ok }: { ok: boolean }) {
  return (
    <span
      aria-label={ok ? "맞는 문장" : "틀린 문장"}
      className={`grid size-7 shrink-0 place-items-center rounded-full text-[15px] font-extrabold ${
        ok ? "bg-mint-soft text-mint-ink" : "bg-coral-soft text-coral-ink"
      }`}
    >
      {ok ? "✓" : "✕"}
    </span>
  );
}

function Chip({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`inline-flex items-center rounded-lg px-2.5 py-1 font-bold ${className}`}>{children}</span>;
}

function RlLegend() {
  return (
    <p className="flex flex-wrap items-center justify-center gap-2 text-[14px] font-bold">
      <span className="rounded-md bg-amber-soft px-2 py-0.5 text-amber-ink">선행사</span>
      <span className="rounded-md bg-sky-soft px-2 py-0.5 text-sky-ink">관계사</span>
      <span className="inline-flex items-center gap-1 rounded-md bg-coral px-2 py-0.5 text-white">
        <CrownIcon size={14} />
        진짜 동사
      </span>
      <span className="inline-flex items-center gap-1 rounded-md bg-mint-soft px-2 py-0.5 text-mint-ink">
        <MaskIcon size={15} />
        변장한 동사
      </span>
    </p>
  );
}

const WHO = "{who|관계대명사:~하는 (사람)}";

/* ───────── 1. 두 문장을 한 문장으로 ───────── */

const RL_JOIN: { key: string; step: string; title: string; lines: RlBit[][]; note: string; clauseFrom?: number }[] = [
  {
    key: "start",
    step: "처음",
    title: "문장 두 개",
    lines: [
      [
        { en: "I", kind: "plain" },
        { en: "have", kind: "verb" },
        { en: "a friend.", kind: "ante" },
      ],
      [
        { en: "She", kind: "ante" },
        { en: "lives", kind: "verb" },
        { en: "in Jeju.", kind: "plain" },
      ],
    ],
    note: "a friend와 She는 같은 사람이에요.",
  },
  {
    key: "s1",
    step: "1단계",
    title: "겹치는 대명사를 관계대명사로 바꿔요",
    lines: [
      [
        { en: "She", kind: "cut" },
        { en: WHO, kind: "rel" },
        { en: "lives", kind: "verb" },
        { en: "in Jeju.", kind: "plain" },
      ],
    ],
    note: "who = 접속사(두 문장 잇기) + 대명사(She 대신). 혼자서 두 가지 일을 해요.",
  },
  {
    key: "s2",
    step: "2단계",
    title: "선행사 바로 뒤에 붙여요",
    lines: [
      [
        { en: "I", kind: "plain" },
        { en: "have", kind: "verb" },
        { en: "a friend", kind: "ante" },
        { en: WHO, kind: "rel" },
        { en: "lives", kind: "verb" },
        { en: "in Jeju.", kind: "plain" },
      ],
    ],
    clauseFrom: 3,
    note: "관계사 who 1개 → 진짜 동사 2개 (have, lives)",
  },
];

/** 겹치는 대명사를 who로 바꿔 선행사 뒤에 붙이면 두 문장이 하나가 된다 */
export function RlJoin() {
  return (
    <div>
      <ol className="space-y-2.5">
        {RL_JOIN.map((s) => (
          <li
            key={s.key}
            className={`rounded-2xl px-4 py-3 ${s.clauseFrom !== undefined ? "bg-mint-soft/60 ring-2 ring-mint-ink/40" : "border border-line"}`}
          >
            <p className="flex flex-wrap items-baseline gap-x-2">
              <span className={`rounded-lg px-2 py-0.5 text-[14px] font-extrabold ${s.key === "start" ? "bg-chip text-ink-2" : "bg-ink text-on-ink"}`}>
                {s.step}
              </span>
              <span className="font-extrabold">{s.title}</span>
            </p>
            {s.lines.map((line, li) =>
              s.clauseFrom === undefined ? (
                <RlLine key={li} bits={line} className="mt-2" />
              ) : (
                <div key={li} lang="en" className="mt-2 flex flex-wrap items-start gap-x-1.5 gap-y-2 text-[1.1em] font-medium">
                  {line.slice(0, s.clauseFrom).map((b, i) => (
                    <span key={i} className="flex flex-col items-center gap-1">
                      <RlWord bit={b} />
                      {b.kind === "ante" && (
                        <span lang="ko" className="text-[14px] font-extrabold text-amber-ink">
                          선행사
                        </span>
                      )}
                    </span>
                  ))}
                  <span className="flex flex-col items-center gap-1">
                    <span className="flex flex-wrap items-center gap-1.5 rounded-xl border-2 border-dashed border-sky-ink/50 px-1.5 py-1">
                      {line.slice(s.clauseFrom).map((b, i) => (
                        <RlWord key={i} bit={b} />
                      ))}
                    </span>
                    <span lang="ko" className="text-[14px] font-extrabold text-sky-ink">
                      관계절: 어떤 친구?
                    </span>
                  </span>
                </div>
              ),
            )}
            <p className="mt-1.5 text-[14px] text-ink-2">{s.note}</p>
          </li>
        ))}
      </ol>
      <div className="mt-3">
        <RlLegend />
      </div>
    </div>
  );
}

/* ───────── 2. 격: 관계절 안에서 비어 있는 자리 ───────── */

const CASE_ROWS: { ante: string; subj: string; obj: string; poss: string }[] = [
  { ante: "사람", subj: "who", obj: "who(m)", poss: "whose" },
  { ante: "사물·동물", subj: "which", obj: "which", poss: "whose" },
  { ante: "둘 다", subj: "that", obj: "that", poss: "✕" },
];

const CASE_CARDS: { name: string; tone: string; slot: string; en: string; ko: string; gap: string }[] = [
  {
    name: "주격",
    tone: "bg-sky-soft text-sky-ink",
    slot: "관계절의 주어 자리가 비었어요 → 바로 뒤에 동사",
    en: "The girl [[{who|관계대명사:~하는 (사람)}]] sits {next to} me is Jisu.",
    ko: "내 옆에 앉는 여자애는 지수야.",
    gap: "___ sits next to me",
  },
  {
    name: "목적격",
    tone: "bg-mint-soft text-mint-ink",
    slot: "관계절의 목적어 자리가 비었어요 → 뒤에 주어 + 동사, 생략할 수 있어요",
    en: "The pizza [[({which|관계대명사:~하는 (사물)})]] we ordered was cold.",
    ko: "우리가 주문한 피자는 식어 있었어.",
    gap: "we ordered ___",
  },
  {
    name: "소유격",
    tone: "bg-amber-soft text-amber-ink",
    slot: "선행사의 '~의' 자리예요 → whose 뒤에 꼭 명사",
    en: "I have a friend [[{whose|관계대명사:그 (사람)의} dad]] is a pilot.",
    ko: "나는 아빠가 비행기 조종사인 친구가 있어.",
    gap: "her dad → whose dad",
  },
];

/** 선행사(사람·사물)와 관계절 속 빈자리(주어·목적어·~의)로 관계대명사를 고른다 */
export function RlCaseGrid() {
  return (
    <div>
      <div className="overflow-hidden rounded-2xl border border-line">
        <div className="grid grid-cols-4 bg-chip text-center text-[14px] font-extrabold">
          <span className="px-1.5 py-2">선행사</span>
          <span className="px-1.5 py-2 text-sky-ink">주격</span>
          <span className="px-1.5 py-2 text-mint-ink">목적격</span>
          <span className="px-1.5 py-2 text-amber-ink">소유격</span>
        </div>
        {CASE_ROWS.map((r) => (
          <div key={r.ante} className="grid grid-cols-4 border-t border-line text-center">
            <span className="px-1.5 py-2 text-[14px] font-bold text-ink-2">{r.ante}</span>
            {[r.subj, r.obj, r.poss].map((w, i) => (
              <span key={i} lang="en" className={`px-1.5 py-2 text-[15px] font-extrabold ${w === "✕" ? "text-ink-3" : ""}`}>
                {w}
              </span>
            ))}
          </div>
        ))}
      </div>
      <ul className="mt-3 grid gap-2.5 sm:grid-cols-3">
        {CASE_CARDS.map((c) => (
          <li key={c.name} className="flex flex-col rounded-2xl border border-line">
            <div className={`rounded-t-2xl px-4 py-2 ${c.tone}`}>
              <p className="text-[16px] font-extrabold">{c.name}</p>
              <p className="text-[14px] font-bold">{c.slot}</p>
            </div>
            <div className="px-4 py-3">
              <p className="text-[1.03em] font-medium">
                <En en={c.en} />
              </p>
              <p className="text-[14px] text-ink-2">{c.ko}</p>
              <p className="mt-1.5 text-[14px] font-bold text-ink-3">
                속을 보면: <span lang="en">{c.gap}</span>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ───────── 3. 관계사를 세면 진짜 동사가 보여요 ───────── */

const KINGS: { key: string; ok: boolean; title: string; bits: RlBit[]; count: string }[] = [
  {
    key: "who",
    ok: true,
    title: "관계대명사가 있을 때",
    bits: [
      { en: "The boy", kind: "ante" },
      { en: WHO, kind: "rel" },
      { en: "plays", kind: "verb" },
      { en: "soccer", kind: "plain" },
      { en: "is", kind: "verb" },
      { en: "my brother.", kind: "plain" },
    ],
    count: "관계사 1개 → 진짜 동사 2개 (plays, is)",
  },
  {
    key: "ing",
    ok: true,
    title: "관계대명사가 없을 때",
    bits: [
      { en: "The boy", kind: "plain" },
      { en: "playing", kind: "verbal" },
      { en: "soccer", kind: "plain" },
      { en: "is", kind: "verb" },
      { en: "my brother.", kind: "plain" },
    ],
    count: "관계사 0개 → 진짜 동사 1개 (is). playing은 분사로 변장했어요.",
  },
  {
    key: "bad",
    ok: false,
    title: "관계사도 변장도 없을 때",
    bits: [
      { en: "The boy", kind: "plain" },
      { en: "plays", kind: "verb" },
      { en: "soccer", kind: "plain" },
      { en: "is", kind: "verb" },
      { en: "my brother.", kind: "plain" },
    ],
    count: "관계사 0개인데 진짜 동사가 2개예요. 공식이 맞지 않아요.",
  },
];

/** The boy who plays soccer is ~ vs The boy playing soccer is ~: 관계사 개수 + 1 = 진짜 동사 개수 */
export function RlTwoKings() {
  return (
    <div>
      <p className="flex flex-wrap items-center justify-center gap-2 text-[1.02em] font-extrabold">
        <Chip className="bg-coral text-white">진짜 동사 개수</Chip>
        <span>=</span>
        <Chip className="bg-sky-soft text-sky-ink">관계사 개수</Chip>
        <span>+ 1</span>
      </p>
      <ul className="mt-4 grid gap-2.5">
        {KINGS.map((k) => (
          <li key={k.key} className={`rounded-2xl px-4 py-3 ${k.ok ? "border border-line" : "border-2 border-dashed border-coral/60"}`}>
            <p className="flex items-center gap-2">
              <Mark ok={k.ok} />
              <span className="font-extrabold">{k.title}</span>
            </p>
            <RlLine bits={k.bits} className={`mt-2 ${k.ok ? "" : "opacity-80"}`} />
            <p className={`mt-1.5 text-[14px] font-bold ${k.ok ? "text-ink-2" : "text-coral-ink"}`}>{k.count}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ───────── 4. what = 선행사를 품은 관계대명사 ───────── */

const WHAT_SLOTS: { slot: string; en: string; ko: string; inside: string }[] = [
  {
    slot: "주어",
    en: "[[{What|관계대명사:~하는 것} I need now]] is a nap.",
    ko: "내가 지금 필요한 건 낮잠이야.",
    inside: "need의 목적어가 빈 자리를 what이 맡았어요",
  },
  {
    slot: "목적어",
    en: "I can't believe [[{what|관계대명사:~하는 것} he said]].",
    ko: "나는 그가 한 말을 믿을 수 없어.",
    inside: "said의 목적어 자리가 비었어요",
  },
  {
    slot: "보어",
    en: "This is [[{what|관계대명사:~하는 것} I made in art class]].",
    ko: "이게 내가 미술 시간에 만든 거야.",
    inside: "made의 목적어 자리가 비었어요",
  },
];

/** the thing + which가 합쳐져 what. what절은 통째로 명사 자리에 선다 */
export function RlWhatInside() {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-center gap-2 text-[1.12em] font-medium" lang="en">
        <Chip className="bg-amber-soft text-amber-ink">
          <En en="the thing" />
        </Chip>
        <span aria-hidden className="font-extrabold">
          +
        </span>
        <Chip className="bg-sky-soft text-sky-ink">
          <En en="{which|관계대명사:~하는 (사물)}" />
        </Chip>
        <ArrowRight className="text-coral" />
        <span className="rounded-xl border-2 border-amber-ink/50 bg-sky-soft px-3 py-1 text-[1.15em] font-extrabold text-sky-ink">
          <En en="{what|관계대명사:~하는 것}" />
        </span>
      </div>
      <p className="mt-2 text-center text-[14.5px] font-bold text-ink-2">선행사를 품은 관계대명사 = &lsquo;~하는 것&rsquo;. 그래서 앞에 명사가 오지 않아요.</p>
      <ul className="mt-4 grid gap-2.5 sm:grid-cols-3">
        {WHAT_SLOTS.map((w) => (
          <li key={w.slot} className="rounded-2xl border border-line px-4 py-3">
            <Chip className="bg-chip text-[15px]">{w.slot} 자리</Chip>
            <p className="mt-2 text-[1.03em] font-medium">
              <En en={w.en} />
            </p>
            <p className="text-[14px] text-ink-2">{w.ko}</p>
            <p className="mt-1.5 text-[14px] font-bold text-ink-3">{w.inside}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ───────── 5. 네 갈래 고르기: 선행사? 빈자리? ───────── */

const CHOICES: { ante: boolean; full: boolean; name: string; words: string; en: string; ko: string }[] = [
  {
    ante: true,
    full: false,
    name: "관계대명사",
    words: "who · which · that",
    en: "the book [[{which|관계대명사:~하는 (사물)}]] I read ___",
    ko: "내가 읽은 책 (read의 목적어가 빔)",
  },
  {
    ante: true,
    full: true,
    name: "관계부사",
    words: "where · when · why (= 전치사 + which)",
    en: "the town [[{where|관계부사:~하는 (곳)}]] I {grew up}",
    ko: "내가 자란 동네 (빈자리 없음)",
  },
  {
    ante: false,
    full: false,
    name: "관계대명사 what",
    words: "what (= the thing which)",
    en: "[[{what|관계대명사:~하는 것}]] I read ___",
    ko: "내가 읽은 것 (read의 목적어가 빔)",
  },
  {
    ante: false,
    full: true,
    name: "접속사 that",
    words: "that (~라는 것)",
    en: "I know [[{that|접속사:~라는 것}]] he is honest.",
    ko: "나는 그가 정직하다는 걸 알아 (빈자리 없음)",
  },
];

function CondChip({ yes, label }: { yes: boolean; label: string }) {
  return (
    <span className={`rounded-md px-2 py-0.5 text-[14px] font-extrabold ${yes ? "bg-ink text-on-ink" : "border border-ink-3 text-ink-2"}`}>
      {label}
    </span>
  );
}

/** that·what·관계대명사·관계부사: 앞에 선행사가 있나, 뒤에 빈자리가 있나 */
export function RlWordChoice() {
  return (
    <div>
      <div className="grid gap-2 text-[14.5px] font-bold sm:grid-cols-2">
        <p className="flex items-start gap-2 rounded-xl bg-chip px-3 py-2">
          <span className="grid size-6 shrink-0 place-items-center rounded-full bg-ink text-[14px] text-on-ink">1</span>
          앞에 꾸밈 받는 명사(선행사)가 있나요?
        </p>
        <p className="flex items-start gap-2 rounded-xl bg-chip px-3 py-2">
          <span className="grid size-6 shrink-0 place-items-center rounded-full bg-ink text-[14px] text-on-ink">2</span>
          뒤 절에 주어·목적어 같은 빈자리가 있나요?
        </p>
      </div>
      <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
        {CHOICES.map((c) => (
          <li key={c.name} className={`rounded-2xl px-4 py-3 ${c.ante ? "border border-line" : "border-2 border-dashed border-line"}`}>
            <p className="flex flex-wrap gap-1.5">
              <CondChip yes={c.ante} label={c.ante ? "선행사 있음" : "선행사 없음"} />
              <CondChip yes={!c.full} label={c.full ? "뒤가 완전" : "뒤가 불완전"} />
            </p>
            <p className="mt-2 flex flex-wrap items-baseline gap-x-2">
              <span className="text-[16px] font-extrabold text-sky-ink">{c.name}</span>
              <span className="text-[14px] font-bold text-ink-3">{c.words}</span>
            </p>
            <p className="mt-1 text-[1.05em] font-medium">
              <En en={c.en} />
            </p>
            <p className="text-[14px] text-ink-2">{c.ko}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ───────── 6. 네 가지 관계부사 ───────── */

const ADVERBS: { word: string; kind: string; ante: string; prep: string; en: string; ko: string; warn?: string }[] = [
  {
    word: "where",
    kind: "장소",
    ante: "the place, the house, the town …",
    prep: "in / at / on which",
    en: "the cafe [[{where|관계부사:~하는 (곳)}]] we met",
    ko: "우리가 만났던 카페",
  },
  {
    word: "when",
    kind: "때",
    ante: "the time, the day, the year …",
    prep: "at / on / in which",
    en: "the day [[{when|관계부사:~하는 (때)}]] I got my puppy",
    ko: "내가 강아지를 데려온 날",
  },
  {
    word: "why",
    kind: "이유",
    ante: "the reason",
    prep: "for which",
    en: "the reason [[{why|관계부사:~하는 (이유)}]] you were late",
    ko: "네가 늦은 이유",
  },
  {
    word: "how",
    kind: "방법",
    ante: "the way (둘 중 하나만)",
    prep: "in which",
    en: "[[{how|관계부사:~하는 (방법)}]] I solved the puzzle",
    ko: "내가 그 퍼즐을 푼 방법",
    warn: "the way how ✕",
  },
];

/** there가 where로: 관계부사 = 전치사 + which. 선행사 종류에 따라 네 가지 */
export function RlAdverbCards() {
  return (
    <div>
      <ol className="mx-auto grid max-w-xl gap-1.5 text-[1.05em] font-medium">
        <li className="flex flex-wrap items-center gap-2 rounded-xl border border-line px-3 py-2">
          <span className="text-[14px] font-extrabold text-ink-3">원래</span>
          <En en="We play soccer [[in the park]]." />
          <span className="text-[14px] font-bold text-ink-2">(= there)</span>
        </li>
        <li className="flex flex-wrap items-center gap-2 rounded-xl border border-line px-3 py-2">
          <span className="text-[14px] font-extrabold text-ink-3">전치사 + which</span>
          <En en="the park [[in {which|관계대명사:~하는 (사물)}]] we play soccer" />
        </li>
        <li className="flex flex-wrap items-center gap-2 rounded-xl bg-mint-soft/60 px-3 py-2 ring-2 ring-mint-ink/40">
          <span className="text-[14px] font-extrabold text-mint-ink">관계부사</span>
          <En en="the park [[{where|관계부사:~하는 (곳)}]] we play soccer" />
        </li>
      </ol>
      <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
        {ADVERBS.map((a) => (
          <li key={a.word} className="rounded-2xl border border-line px-4 py-3">
            <p className="flex flex-wrap items-center gap-2">
              <Chip className="bg-sky-soft text-[1.05em] text-sky-ink">
                <span lang="en">{a.word}</span>
              </Chip>
              <span className="text-[15px] font-extrabold">{a.kind}</span>
              <span lang="en" className="text-[14px] font-bold text-ink-3">
                = {a.prep}
              </span>
            </p>
            <p className="mt-1.5 text-[14px] text-ink-2">
              선행사: <span lang="en">{a.ante}</span>
            </p>
            <p className="mt-1 text-[1.05em] font-medium">
              <En en={a.en} />
            </p>
            <p className="text-[14px] text-ink-2">{a.ko}</p>
            {a.warn && (
              <p lang="en" className="mt-1.5 w-fit rounded-md bg-coral-soft px-2 py-0.5 text-[14px] font-extrabold text-coral-ink">
                {a.warn}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ───────── 7. 쉼표 하나의 차이: 한정 vs 계속 ───────── */

function Cousins({ inside, outside }: { inside: number; outside: number }) {
  return (
    <div className="mt-2 flex flex-wrap items-end gap-3">
      <div className="rounded-xl border-2 border-mint-ink/50 bg-mint-soft/60 px-2.5 pb-1.5 pt-1">
        <p className="text-[14px] font-extrabold text-mint-ink">부산</p>
        <p className="flex gap-1 text-mint-ink">
          {Array.from({ length: inside }, (_, i) => (
            <PersonIcon key={i} size={30} />
          ))}
        </p>
      </div>
      {outside > 0 && (
        <div className="px-1 pb-1.5">
          <p className="text-[14px] font-bold text-ink-3">다른 곳에도?</p>
          <p className="flex gap-1 text-ink-3 opacity-50">
            {Array.from({ length: outside }, (_, i) => (
              <PersonIcon key={i} size={30} />
            ))}
          </p>
        </div>
      )}
    </div>
  );
}

/** 쉼표 없는 관계절은 범위를 좁히고, 쉼표 뒤 관계절은 설명을 덧붙인다 */
export function RlCommaSplit() {
  return (
    <div>
      <div className="grid gap-2.5 sm:grid-cols-2">
        <div className="rounded-2xl border border-line px-4 py-3">
          <p className="flex flex-wrap items-center gap-2">
            <Chip className="bg-chip text-[15px]">쉼표 없음 · 한정적 용법</Chip>
          </p>
          <p className="mt-2 text-[1.05em] font-medium">
            <En en="I have two cousins [[{who|관계대명사:~하는 (사람)} live in Busan]]." />
          </p>
          <Cousins inside={2} outside={2} />
          <p className="mt-1.5 text-[14px] text-ink-2">부산에 사는 사촌이 둘이에요. 다른 곳에 사는 사촌이 더 있을 수도 있어요.</p>
          <p className="mt-1 text-[14px] font-bold text-ink-3">&lsquo;어떤 사촌?&rsquo; → 범위를 좁혀요</p>
        </div>
        <div className="rounded-2xl border-2 border-coral px-4 py-3">
          <p className="flex flex-wrap items-center gap-2">
            <Chip className="bg-coral-soft text-[15px] text-coral-ink">쉼표 있음 · 계속적 용법</Chip>
          </p>
          <p className="mt-2 text-[1.05em] font-medium">
            <En en="I have two cousins, [[{who|관계대명사:그리고 그 사람들은} live in Busan]]." />
          </p>
          <Cousins inside={2} outside={0} />
          <p className="mt-1.5 text-[14px] text-ink-2">사촌은 딱 둘이고, 둘 다 부산에 살아요.</p>
          <p className="mt-1 text-[14px] font-bold text-ink-3">
            = <span lang="en">and they live in Busan</span> → 설명을 이어 붙여요
          </p>
        </div>
      </div>
      <p className="mt-3 flex flex-wrap items-center justify-center gap-2 text-[14.5px] font-bold">
        <span>쉼표 뒤에는</span>
        <Chip className="bg-mint-soft text-mint-ink">
          <span lang="en">who · which</span>
        </Chip>
        <span className="text-ink-3" lang="en">
          that ✕ · what ✕
        </span>
        <span aria-hidden>·</span>
        <span>
          <span lang="en">, which</span>는 앞 문장 전체도 받아요
        </span>
      </p>
    </div>
  );
}

/* ───────── 8. 전치사는 어디로? ───────── */

const PREP_ROWS: { key: string; ok: boolean; en?: string; bad?: string; note: string }[] = [
  {
    key: "end",
    ok: true,
    en: "the chair [[{which|관계대명사:~하는 (사물)}]] I sat [[on]]",
    note: "전치사를 끝에 남겨요. which 대신 that을 써도, 아예 생략해도 돼요.",
  },
  {
    key: "front",
    ok: true,
    en: "the chair [[on {which|관계대명사:~하는 (사물)}]] I sat",
    note: "전치사를 관계대명사 앞으로 데려와요. 조금 더 격식 있는 말투예요.",
  },
  {
    key: "that",
    ok: false,
    bad: "the chair on that I sat",
    note: "전치사 바로 뒤에는 that을 쓸 수 없어요. 생략도 안 돼요.",
  },
  {
    key: "who",
    ok: false,
    bad: "the friend with who I study",
    note: "사람이면 전치사 뒤에 목적격 whom을 써요: with whom",
  },
];

/** 관계절 속 전치사: 끝에 남기거나 관계대명사 앞으로. 앞으로 오면 which·whom만 */
export function RlPrepMove() {
  return (
    <div>
      <p className="flex flex-wrap items-center justify-center gap-2 text-[1.08em] font-medium">
        <span className="text-[14px] font-extrabold text-ink-3">원래 문장</span>
        <En en="I sat [[on the chair]]." />
      </p>
      <ul className="mt-3 grid gap-2">
        {PREP_ROWS.map((r) => (
          <li key={r.key} className={`flex items-start gap-3 rounded-2xl px-4 py-3 ${r.ok ? "border border-line" : "bg-chip"}`}>
            <Mark ok={r.ok} />
            <div className="min-w-0">
              {r.en ? (
                <p className="text-[1.08em] font-medium">
                  <En en={r.en} />
                </p>
              ) : (
                <p lang="en" className="text-[1.08em] font-medium text-ink-2 line-through decoration-coral/60 decoration-2">
                  {r.bad}
                </p>
              )}
              <p className="mt-0.5 text-[14px] text-ink-2">{r.note}</p>
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-center text-[14.5px] font-bold">
        전치사 + 관계대명사 뒤는 <span className="rounded-md bg-mint-soft px-1.5 text-mint-ink">완전한 절</span>이에요. 빈자리를 전치사와 함께 데려갔으니까요.
      </p>
    </div>
  );
}

/* ───────── 9. -ever 가족: 두 얼굴 ───────── */

const EVER_GROUPS: { title: string; sub: string; plainLabel: string; items: { word: string; plain: string; plainEn: string; conc: string; concEn: string }[] }[] = [
  {
    title: "복합관계대명사",
    sub: "선행사를 품었어요",
    plainLabel: "명사절",
    items: [
      { word: "whoever", plain: "~하는 사람은 누구든지", plainEn: "anyone who", conc: "누가 ~하더라도", concEn: "no matter who" },
      { word: "whatever", plain: "~하는 것은 무엇이든지", plainEn: "anything that", conc: "무엇이 ~하더라도", concEn: "no matter what" },
      { word: "whichever", plain: "~하는 것은 어느 것이든지", plainEn: "any one that", conc: "어느 것을 ~하더라도", concEn: "no matter which" },
    ],
  },
  {
    title: "복합관계부사",
    sub: "부사절을 만들어요",
    plainLabel: "때·장소·방법",
    items: [
      { word: "whenever", plain: "~할 때마다, ~할 때는 언제든지", plainEn: "at any time when", conc: "언제 ~하더라도", concEn: "no matter when" },
      { word: "wherever", plain: "~하는 곳은 어디든지", plainEn: "at any place where", conc: "어디서 ~하더라도", concEn: "no matter where" },
      { word: "however", plain: "어떤 방법으로 ~하든", plainEn: "in whatever way", conc: "아무리 ~해도 (+ 형용사·부사)", concEn: "no matter how" },
    ],
  },
];

/** whoever·whatever·whichever·whenever·wherever·however: 기본 뜻과 양보 뜻 */
export function RlEverTable() {
  return (
    <div className="space-y-3">
      {EVER_GROUPS.map((g) => (
        <section key={g.title} className="rounded-2xl bg-chip px-3 py-3">
          <p className="flex flex-wrap items-baseline gap-x-2 px-1">
            <span className="text-[16px] font-extrabold">{g.title}</span>
            <span className="text-[14px] font-bold text-ink-3">{g.sub}</span>
          </p>
          <ul className="mt-2 grid gap-2 sm:grid-cols-3">
            {g.items.map((it) => (
              <li key={it.word} className="rounded-xl border border-line bg-card px-3 py-2.5">
                <p lang="en" className="text-[1.12em] font-extrabold text-sky-ink">
                  {it.word}
                </p>
                <p className="mt-1.5 text-[14px]">
                  <span className="mr-1 rounded bg-sky-soft px-1.5 py-0.5 font-extrabold text-sky-ink">{g.plainLabel}</span>
                  {it.plain}
                </p>
                <p lang="en" className="text-[14px] text-ink-3">
                  = {it.plainEn}
                </p>
                <p className="mt-1.5 text-[14px]">
                  <span className="mr-1 rounded bg-amber-soft px-1.5 py-0.5 font-extrabold text-amber-ink">양보</span>
                  {it.conc}
                </p>
                <p lang="en" className="text-[14px] text-ink-3">
                  = {it.concEn}
                </p>
              </li>
            ))}
          </ul>
        </section>
      ))}
      <p className="text-center text-[14px] text-ink-2">
        -ever절을 빼 보세요. 문장이 무너지면 명사절, 멀쩡하면 양보나 때·장소를 더하는 부사절이에요.
      </p>
    </div>
  );
}
