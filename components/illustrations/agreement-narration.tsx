import type { ReactNode } from "react";
import { En } from "@/components/lesson/En";
import { ArrowRight, CrownIcon, MaskIcon, PersonIcon } from "./icons";

/* 일치와 화법 장 그림: 진짜 주어 찾기, of 앞·뒤, 시제 한 칸 물러서기, 평서문 옮기기 다섯 단계, 때·곳의 말, 문장 종류별 진짜 동사,
   수를 드러내는 동사, 늘 단수인 주어, 한 덩어리 양, 말풍선 옮기기, 의문사 의문문 뒤집기 */

/* ───────── 공통 도우미 ───────── */

type Tone = "sky" | "mint" | "amber" | "coral";

const TONE: Record<Tone, string> = {
  sky: "bg-sky-soft text-sky-ink",
  mint: "bg-mint-soft text-mint-ink",
  amber: "bg-amber-soft text-amber-ink",
  coral: "bg-coral-soft text-coral-ink",
};

function Chip({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`inline-flex items-center rounded-lg px-2.5 py-1 font-bold ${className}`}>{children}</span>;
}

function VerbTag({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-lg bg-coral px-2 py-1 text-[14px] font-extrabold text-white">
      <CrownIcon size={15} />
      {label}
    </span>
  );
}

/* ───────── 1. 진짜 주어 찾기: 꾸미는 말은 괄호로 ───────── */

type HuntPart = { en: string; role: "head" | "mod" | "verb" | "rest"; label?: string };

const HUNT_ROWS: { parts: HuntPart[]; ko: string; match: string }[] = [
  {
    parts: [
      { en: "The books", role: "head", label: "복수" },
      { en: "on the desk", role: "mod", label: "전치사구" },
      { en: "are", role: "verb" },
      { en: "mine.", role: "rest" },
    ],
    ko: "책상 위에 있는 책들은 내 거야.",
    match: "books (복수) → are",
  },
  {
    parts: [
      { en: "The girl", role: "head", label: "단수" },
      { en: "with two dogs", role: "mod", label: "전치사구" },
      { en: "lives", role: "verb" },
      { en: "{next door}.", role: "rest" },
    ],
    ko: "개 두 마리를 키우는 그 여자아이는 옆집에 살아.",
    match: "girl (단수) → lives",
  },
  {
    parts: [
      { en: "The boy", role: "head", label: "단수" },
      { en: "{who|관계대명사:~하는 (사람)} helped the new students", role: "mod", label: "관계사절" },
      { en: "is", role: "verb" },
      { en: "our {class president}.", role: "rest" },
    ],
    ko: "새로 온 학생들을 도와준 그 남자아이가 우리 반 반장이야.",
    match: "boy (단수) → is",
  },
  {
    parts: [
      { en: "The kids", role: "head", label: "복수" },
      { en: "playing in the park", role: "mod", label: "분사구" },
      { en: "are", role: "verb" },
      { en: "my cousins.", role: "rest" },
    ],
    ko: "공원에서 놀고 있는 아이들은 내 사촌들이야.",
    match: "kids (복수) → are",
  },
];

function HuntChip({ part }: { part: HuntPart }) {
  if (part.role === "rest")
    return (
      <span className="self-start py-1 text-[1.06em] font-medium">
        <En en={part.en} />
      </span>
    );
  if (part.role === "verb")
    return (
      <span className="inline-flex flex-col items-start gap-1">
        <span className="inline-flex items-center gap-1 rounded-lg bg-coral px-2.5 py-1 text-[1.06em] font-bold text-white">
          <CrownIcon size={16} />
          <En en={part.en} />
        </span>
        <span className="text-[14px] font-bold text-coral-ink">진짜 동사</span>
      </span>
    );
  if (part.role === "mod")
    return (
      <span className="inline-flex flex-col items-start gap-1">
        <span className="rounded-lg border-2 border-dashed border-ink-3 px-2.5 py-0.5 text-[1.06em] text-ink-2">
          ( <En en={part.en} /> )
        </span>
        <span className="text-[14px] font-bold text-ink-3">{part.label} · 빼고 읽기</span>
      </span>
    );
  return (
    <span className="inline-flex flex-col items-start gap-1">
      <span className="rounded-lg bg-sky-soft px-2.5 py-1 text-[1.06em] font-bold text-sky-ink">
        <En en={part.en} />
      </span>
      <span className="text-[14px] font-bold text-sky-ink">진짜 주어 · {part.label}</span>
    </span>
  );
}

/** 주어와 동사 사이에 끼어든 꾸밈 말을 괄호로 빼면 진짜 주어가 보인다 */
export function AnSubjectHunt() {
  return (
    <ul className="grid gap-2.5">
      {HUNT_ROWS.map((r) => (
        <li key={r.match} className="rounded-2xl border border-line px-4 py-3">
          <p className="flex flex-wrap items-start gap-x-2 gap-y-2">
            {r.parts.map((p) => (
              <HuntChip key={p.en} part={p} />
            ))}
          </p>
          <p className="mt-2 text-[14px] text-ink-2">{r.ko}</p>
          <p lang="en" className="mt-1 text-[14px] font-bold text-coral-ink">
            {r.match}
          </p>
        </li>
      ))}
    </ul>
  );
}

/* ───────── 2. of 앞을 볼까, 뒤를 볼까 ───────── */

const FRONT_ROWS: { en: string; ko: string }[] = [
  { en: "[[One]] of my friends [[has]] a pet snake.", ko: "one of: 여럿 중 하나" },
  { en: "[[Each]] of the players [[has]] a locker.", ko: "each of: 하나씩 따로따로" },
  { en: "[[{The number of}]] students [[is]] {about|부사:약, ~쯤} 600.", ko: "the number of: ~의 수" },
];

const BACK_WORDS = ["most", "some", "half", "all", "the rest"];

const BACK_ROWS: { en: string; ko: string }[] = [
  { en: "{Most|대명사:대부분} of [[the cake]] [[was]] {gone|형용사:없어진}.", ko: "the cake (하나의 덩어리) → was" },
  { en: "{Most|대명사:대부분} of [[the students]] [[were]] tired.", ko: "the students (복수) → were" },
  { en: "Some of [[this information]] [[is]] wrong.", ko: "information (셀 수 없음) → is" },
];

/** one of·each of·the number of는 앞을 보고 단수, 부분 표현은 of 뒤의 명사를 본다 */
export function AnOfLook() {
  return (
    <div>
      <div className="grid gap-2.5 sm:grid-cols-2">
        <div className="rounded-2xl border border-line px-4 py-3">
          <p className="flex flex-wrap items-center gap-2">
            <Chip className="bg-sky-soft text-[15px] text-sky-ink">of 앞을 봐요</Chip>
            <span className="text-[15px] font-extrabold">늘 단수</span>
          </p>
          <ul className="mt-2 grid gap-2">
            {FRONT_ROWS.map((r) => (
              <li key={r.ko}>
                <p className="text-[1.04em] font-medium">
                  <En en={r.en} />
                </p>
                <p className="text-[14px] font-bold text-ink-3">{r.ko}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border-2 border-coral px-4 py-3">
          <p className="flex flex-wrap items-center gap-2">
            <Chip className="bg-coral-soft text-[15px] text-coral-ink">of 뒤를 봐요</Chip>
            <span className="text-[15px] font-extrabold">뒤의 명사에 맞춰요</span>
          </p>
          <p lang="en" className="mt-2 flex flex-wrap gap-1.5 text-[14.5px]">
            {BACK_WORDS.map((w) => (
              <span key={w} className="rounded-md bg-chip px-2 py-0.5">
                {w} of
              </span>
            ))}
            <span className="rounded-md bg-chip px-2 py-0.5">분수·percent of</span>
          </p>
          <ul className="mt-2 grid gap-2">
            {BACK_ROWS.map((r) => (
              <li key={r.ko}>
                <p className="text-[1.04em] font-medium">
                  <En en={r.en} />
                </p>
                <p lang="en" className="text-[14px] font-bold text-ink-3">
                  {r.ko}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-3 flex flex-col gap-1.5 rounded-2xl bg-chip px-4 py-3 text-[14.5px] sm:flex-row sm:items-center sm:gap-3">
        <span className="font-extrabold">헷갈리는 짝</span>
        <span className="font-medium">
          <En en="[[{A number of}]] students [[were]] late." />
        </span>
        <span className="font-bold text-ink-2">a number of = many (많은) → 복수</span>
      </div>
    </div>
  );
}

/* ───────── 3. 시제 일치: 주절이 과거면 한 칸 물러서기 ───────── */

const TENSE_SLOTS: { when: string; form: string; tone: Tone; en: string; ko: string }[] = [
  {
    when: "더 먼저",
    form: "had + p.p.",
    tone: "amber",
    en: "I thought {that|접속사:~라고} he [[had lost]] his key.",
    ko: "나는 그가 열쇠를 잃어버렸다고 생각했어.",
  },
  {
    when: "같은 때",
    form: "과거형",
    tone: "sky",
    en: "I thought {that|접속사:~라고} he [[was]] busy.",
    ko: "나는 그가 바쁘다고 생각했어.",
  },
  {
    when: "그 뒤",
    form: "would + 동사원형",
    tone: "mint",
    en: "I thought {that|접속사:~라고} he [[would call]] me.",
    ko: "나는 그가 나에게 전화할 거라고 생각했어.",
  },
];

const TENSE_MOVES: [string, string][] = [
  ["is, am", "was"],
  ["are", "were"],
  ["likes", "liked"],
  ["will", "would"],
  ["can", "could"],
  ["has p.p. / 과거형", "had p.p."],
];

/** 주절의 과거 동사를 기준으로 종속절의 때를 정한다 */
export function AnTenseBack() {
  return (
    <div>
      <p className="flex flex-wrap items-center justify-center gap-2 text-[15px] font-bold">
        <span>기준</span>
        <VerbTag label="thought" />
        <span className="text-ink-2">주절의 진짜 동사 (과거)</span>
      </p>
      <div className="mt-3 hidden grid-cols-3 gap-2 text-center text-[14px] font-extrabold text-ink-2 sm:grid" aria-hidden>
        <span className="rounded-lg bg-chip py-1">← 더 먼저</span>
        <span className="rounded-lg bg-chip py-1">thought와 같은 때</span>
        <span className="rounded-lg bg-chip py-1">그 뒤 →</span>
      </div>
      <ul className="mt-2 grid gap-2.5 sm:grid-cols-3">
        {TENSE_SLOTS.map((s) => (
          <li key={s.when} className="flex flex-col rounded-2xl border border-line">
            <div className={`rounded-t-2xl px-4 py-2 ${TONE[s.tone]}`}>
              <p className="text-[15px] font-extrabold">{s.when}</p>
              <p lang="en" className="text-[14px] font-bold">
                {s.form}
              </p>
            </div>
            <div className="px-4 py-3">
              <p className="text-[1.04em] font-medium">
                <En en={s.en} />
              </p>
              <p className="text-[14px] text-ink-2">{s.ko}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-3 rounded-2xl bg-chip px-4 py-3">
        <p className="text-[14.5px] font-extrabold">한 칸 물러서기</p>
        <ul lang="en" className="mt-2 grid grid-cols-1 gap-1.5 text-[14.5px] min-[420px]:grid-cols-2 sm:grid-cols-3">
          {TENSE_MOVES.map(([from, to]) => (
            <li key={to + from} className="flex flex-wrap items-center gap-1.5">
              <span className="rounded-md border border-line px-2 py-0.5">{from}</span>
              <ArrowRight size={16} className="text-coral" />
              <span className="rounded-md bg-coral-soft px-2 py-0.5 font-bold text-coral-ink">{to}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ───────── 4. 평서문 옮기기 다섯 단계 ───────── */

const REPORT_STEPS: { what: string; from: string; to: string; tip: string }[] = [
  { what: "전달동사", from: "said to me", to: "told me", tip: "say to + 사람 → tell + 사람" },
  { what: "이음말", from: ", ' … '", to: "that", tip: "쉼표·따옴표를 떼고 that (생략해도 돼요)" },
  { what: "인칭", from: "I / you", to: "she / me", tip: "전하는 내 입장에서 누구인지" },
  { what: "시제", from: "will", to: "would", tip: "전달동사가 과거라서 한 칸 물러서기" },
  { what: "때·곳", from: "here / tomorrow", to: "there / the next day", tip: "말한 사람의 '지금·여기' → '그때·거기'" },
];

/** 직접화법 문장을 다섯 단계로 간접화법으로 바꾼다 */
export function AnReportSteps() {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-2xl border border-line px-4 py-3">
        <p className="text-[14px] font-extrabold text-ink-3">직접화법 · 들은 그대로</p>
        <p className="mt-1.5 text-[1.08em] font-medium">
          <En en="Jisu said to me, 'I will meet you here tomorrow.'" />
        </p>
        <p className="text-[14px] text-ink-2">지수가 나에게 &lsquo;내일 여기서 만나자&rsquo;고 말했어.</p>
      </div>
      <ol className="mt-3 grid gap-2">
        {REPORT_STEPS.map((s, i) => (
          <li key={s.what} className="flex items-start gap-3 rounded-2xl bg-chip px-3.5 py-2.5">
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-coral text-[14px] font-extrabold text-white">
              {i + 1}
            </span>
            <div className="min-w-0">
              <p className="flex flex-wrap items-center gap-1.5 text-[14.5px]">
                <span className="font-extrabold">{s.what}</span>
                <span lang="en" className="rounded-md border border-line bg-card px-2 py-0.5">
                  {s.from}
                </span>
                <ArrowRight size={16} className="text-coral" />
                <span lang="en" className="rounded-md bg-coral-soft px-2 py-0.5 font-bold text-coral-ink">
                  {s.to}
                </span>
              </p>
              <p className="mt-0.5 text-[14px] text-ink-2">{s.tip}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className="mt-3 rounded-2xl border-2 border-coral px-4 py-3">
        <p className="text-[14px] font-extrabold text-coral-ink">간접화법 · 내 말로 바꿔서</p>
        <p className="mt-1.5 text-[1.08em] font-medium">
          <En en="Jisu [[told me]] {that|접속사:~라고} [[she would meet me there {the next day}]]." />
        </p>
        <p className="text-[14px] text-ink-2">지수가 나에게 그다음 날 거기서 만나자고 했어.</p>
      </div>
    </div>
  );
}

/* ───────── 5. 때·곳을 나타내는 말 바꾸기 ───────── */

const WORD_SHIFTS: { group: string; rows: { from: { en: string }; to: { en: string }; ko: string }[] }[] = [
  {
    group: "때",
    rows: [
      { from: { en: "now" }, to: { en: "then" }, ko: "지금 → 그때" },
      { from: { en: "today" }, to: { en: "{that day}" }, ko: "오늘 → 그날" },
      { from: { en: "tonight" }, to: { en: "{that night}" }, ko: "오늘 밤 → 그날 밤" },
      { from: { en: "yesterday" }, to: { en: "{the day before}" }, ko: "어제 → 그 전날" },
      { from: { en: "tomorrow" }, to: { en: "{the next day}" }, ko: "내일 → 그다음 날" },
      { from: { en: "{last week}" }, to: { en: "{the week before}" }, ko: "지난주 → 그 전 주" },
      { from: { en: "{next week}" }, to: { en: "{the following week}" }, ko: "다음 주 → 그다음 주" },
      { from: { en: "ago" }, to: { en: "{before|부사:(그때보다) ~ 전에}" }, ko: "(지금부터) ~ 전에 → (그때보다) ~ 전에" },
    ],
  },
  {
    group: "곳·가리키는 말",
    rows: [
      { from: { en: "here" }, to: { en: "there" }, ko: "여기 → 거기" },
      { from: { en: "this" }, to: { en: "that" }, ko: "이 → 그" },
      { from: { en: "these" }, to: { en: "those" }, ko: "이것들 → 그것들" },
    ],
  },
];

/** 말한 사람의 '지금·여기'를 전하는 사람의 '그때·거기'로 */
export function AnWordShift() {
  return (
    <div className="grid gap-3">
      {WORD_SHIFTS.map((g) => (
        <div key={g.group}>
          <p className="text-[14.5px] font-extrabold text-ink-2">{g.group}</p>
          <ul className="mt-1.5 grid grid-cols-1 gap-2 min-[420px]:grid-cols-2 sm:grid-cols-3">
            {g.rows.map((r) => (
              <li key={r.ko} className="rounded-2xl border border-line px-3.5 py-2.5">
                <p className="flex flex-wrap items-center gap-1.5 text-[1.06em]">
                  <span className="font-medium">
                    <En en={r.from.en} />
                  </span>
                  <ArrowRight size={16} className="text-coral" />
                  <span className="font-bold text-coral-ink">
                    <En en={r.to.en} />
                  </span>
                </p>
                <p className="text-[14px] text-ink-2">{r.ko}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/* ───────── 6. 문장 종류별로 옮기기: 진짜 동사가 늘까 ───────── */

const REPORT_TYPES: { kind: string; verb: string; link: string; en: string; ko: string; verbs: 1 | 2; note: string }[] = [
  {
    kind: "평서문",
    verb: "say, tell",
    link: "that",
    en: "Minsu [[said]] {that|접속사:~라고} he [[was]] tired.",
    ko: "민수는 피곤하다고 말했어.",
    verbs: 2,
    note: "that이 절을 이어 줘요",
  },
  {
    kind: "의문사 의문문",
    verb: "ask",
    link: "의문사",
    en: "Jisu [[asked]] me where I [[lived]].",
    ko: "지수는 나에게 어디 사는지 물었어.",
    verbs: 2,
    note: "의문사 + 주어 + 동사",
  },
  {
    kind: "Yes/No 의문문",
    verb: "ask",
    link: "if, whether",
    en: "Minho [[asked]] me {if|접속사:~인지} I [[liked]] K-pop.",
    ko: "민호는 나에게 케이팝을 좋아하는지 물었어.",
    verbs: 2,
    note: "if·whether = ~인지",
  },
  {
    kind: "제안문",
    verb: "suggest",
    link: "that",
    en: "Minsu [[suggested]] {that|접속사:~라고} we [[play]] badminton.",
    ko: "민수는 배드민턴을 치자고 제안했어.",
    verbs: 2,
    note: "주어 + (should) 동사원형",
  },
  {
    kind: "명령문",
    verb: "tell, ask, order, advise",
    link: "없음",
    en: "Mom [[{told|동사:(~하라고) 말했다}]] me to clean my room.",
    ko: "엄마가 나에게 방을 청소하라고 하셨어.",
    verbs: 1,
    note: "to clean은 to부정사로 변장",
  },
];

function VerbCount({ verbs }: { verbs: 1 | 2 }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[14px] font-extrabold ${
        verbs === 2 ? "bg-coral-soft text-coral-ink" : "bg-sky-soft text-sky-ink"
      }`}
    >
      <CrownIcon size={15} />
      {verbs === 2 ? (
        <CrownIcon size={15} />
      ) : (
        <MaskIcon size={17} />
      )}
      {verbs === 2 ? "진짜 동사 2개" : "진짜 동사 1개 + 변장"}
    </span>
  );
}

/** 이음말이 들어오면 진짜 동사가 하나 늘고, 명령문은 to부정사로 변장해서 그대로 */
export function AnFourTypes() {
  return (
    <ul className="grid gap-2.5 sm:grid-cols-2">
      {REPORT_TYPES.map((t) => (
        <li
          key={t.kind}
          className={`rounded-2xl px-4 py-3 ${t.verbs === 1 ? "border-2 border-coral sm:col-span-2" : "border border-line"}`}
        >
          <div className="flex flex-wrap items-center gap-2">
            <Chip className="bg-chip text-[15px]">{t.kind}</Chip>
            <VerbCount verbs={t.verbs} />
          </div>
          <p className="mt-1.5 text-[14px] font-bold text-ink-2">
            전달동사 <span lang="en">{t.verb}</span> · 이음말 <span lang="en">{t.link}</span>
          </p>
          <p className="mt-1.5 text-[1.04em] font-medium">
            <En en={t.en} />
          </p>
          <p className="text-[14px] text-ink-2">{t.ko}</p>
          <p className="mt-1 text-[14px] font-bold text-ink-3">{t.note}</p>
        </li>
      ))}
    </ul>
  );
}

/* ───────── 7. 수를 드러내는 동사, 드러내지 않는 동사 ───────── */

function Mark({ ok }: { ok: boolean }) {
  return (
    <span
      aria-label={ok ? "맞아요" : "틀려요"}
      className={`grid size-7 shrink-0 place-items-center rounded-full text-[15px] font-extrabold ${
        ok ? "bg-mint-soft text-mint-ink" : "bg-coral-soft text-coral-ink"
      }`}
    >
      {ok ? "✓" : "✕"}
    </span>
  );
}

const NUMBER_ROWS: { kind: string; one: string; many: string; shows: boolean }[] = [
  { kind: "be동사 현재", one: "is", many: "are", shows: true },
  { kind: "be동사 과거", one: "was", many: "were", shows: true },
  { kind: "have", one: "has", many: "have", shows: true },
  { kind: "일반동사 현재", one: "likes", many: "like", shows: true },
  { kind: "일반동사 과거", one: "liked", many: "liked", shows: false },
  { kind: "조동사 + 동사원형", one: "can swim", many: "can swim", shows: false },
  { kind: "변장한 동사", one: "to swim", many: "to swim", shows: false },
];

const NUM_GRID = "grid grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)_minmax(0,1fr)] items-center gap-x-2";

/** 주어가 하나일 때와 여럿일 때 모양이 바뀌는 동사만 수를 드러낸다. 변장한 동사는 늘 그대로 */
export function AnNumberVerbs() {
  return (
    <div>
      <div className="overflow-hidden rounded-2xl border border-line">
        <div className={`${NUM_GRID} bg-chip px-3 py-2 text-[14px] font-extrabold`}>
          <span>동사 종류</span>
          <span className="text-center">
            주어 하나
            <span lang="en" className="block font-bold text-ink-2">
              he, she
            </span>
          </span>
          <span className="text-center">
            주어 여럿
            <span lang="en" className="block font-bold text-ink-2">
              they
            </span>
          </span>
        </div>
        {NUMBER_ROWS.map((r) => (
          <div key={r.kind} className={`${NUM_GRID} border-t border-line px-3 py-2`}>
            <span className="min-w-0">
              <span className="block text-[14.5px] font-extrabold">{r.kind}</span>
              <span className={`text-[14px] font-bold ${r.shows ? "text-coral-ink" : "text-ink-3"}`}>
                {r.shows ? "수가 보여요" : "모양이 같아요"}
              </span>
            </span>
            {[r.one, r.many].map((w, i) => (
              <span
                key={i}
                lang="en"
                className={`justify-self-center rounded-lg px-2 py-1 text-center text-[15px] font-extrabold ${
                  r.shows ? "bg-coral-soft text-coral-ink" : "text-ink-3"
                }`}
              >
                {w}
              </span>
            ))}
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-2xl border-2 border-coral px-4 py-3">
        <p className="text-[14px] font-extrabold text-coral-ink">한 문장 안에서도 수를 맞추는 건 진짜 동사 하나</p>
        <p className="mt-2 flex flex-wrap items-start gap-x-2 gap-y-2 text-[1.08em] font-medium">
          <span className="inline-flex flex-col items-start gap-1">
            <span className="rounded-lg bg-sky-soft px-2.5 py-1 font-bold text-sky-ink">
              <En en="My brothers" />
            </span>
            <span className="text-[14px] font-bold text-sky-ink">진짜 주어 · 복수</span>
          </span>
          <span className="inline-flex flex-col items-start gap-1">
            <span className="inline-flex items-center gap-1 rounded-lg bg-coral px-2.5 py-1 font-bold text-white">
              <CrownIcon size={16} />
              <En en="like" />
            </span>
            <span className="text-[14px] font-bold text-coral-ink">복수에 맞춰요</span>
          </span>
          <span className="inline-flex flex-col items-start gap-1">
            <span className="inline-flex items-center gap-1 rounded-lg bg-amber-soft px-2.5 py-1 font-bold text-amber-ink">
              <MaskIcon size={17} />
              <En en="to play" />
            </span>
            <span className="text-[14px] font-bold text-amber-ink">변장 · 늘 그대로</span>
          </span>
          <span className="py-1">
            <En en="soccer." />
          </span>
        </p>
        <p className="mt-2 text-[14px] text-ink-2">우리 형들은 축구하는 걸 좋아해. 형이 한 명이면 like만 likes로 바뀌고, to play는 그대로예요.</p>
      </div>
    </div>
  );
}

/* ───────── 8. 하나로 보는 주어, 여럿으로 보는 주어 ───────── */

type Lump = { title: string; why: string; en: string };

const ONE_LUMPS: Lump[] = [
  { title: "each · every + 단수 명사", why: "하나씩 따로따로 봐요", en: "[[Every]] room [[has]] a window." },
  { title: "the number of + 복수 명사", why: "'~의 수'는 숫자 하나", en: "[[{The number of}]] kids in my class [[is]] 25." },
  { title: "동명사 · to부정사 · 명사절", why: "한 가지 일, 한 가지 사실", en: "[[{Walking|동명사:(개를) 산책시키기}]] my dogs [[is]] my job." },
  { title: "시간 · 거리 · 돈", why: "하나의 양으로 봐요", en: "Two [[hours]] [[is]] a long time." },
];

const MANY_LUMPS: Lump[] = [
  { title: "a number of + 복수 명사", why: "'많은 ~' (= many)", en: "[[{A number of}]] kids [[were]] late." },
  { title: "the + 형용사", why: "'~한 사람들' (= people)", en: "[[{The young|숙어:젊은 사람들 (= young people)}]] [[love]] new apps." },
];

function LumpCard({ l, many = false }: { l: Lump; many?: boolean }) {
  return (
    <li className="rounded-2xl border border-line bg-card px-4 py-2.5">
      <p className={`text-[15px] font-extrabold ${many ? "text-sky-ink" : "text-coral-ink"}`}>{l.title}</p>
      <p className="text-[14px] font-bold text-ink-2">{l.why}</p>
      <p className="mt-1 text-[1.04em] font-medium">
        <En en={l.en} />
      </p>
    </li>
  );
}

/** 여럿처럼 보여도 하나로 보는 주어들과, 거꾸로 늘 복수로 받는 주어들 */
export function AnSingleLumps() {
  return (
    <div className="grid gap-3">
      <div>
        <p className="flex items-center gap-2 text-[15px] font-extrabold">
          <span className="grid size-7 place-items-center rounded-full bg-coral text-[15px] text-white">1</span>
          하나로 보는 주어 → 단수 동사
        </p>
        <ul className="mt-2 grid gap-2 sm:grid-cols-2">
          {ONE_LUMPS.map((l) => (
            <LumpCard key={l.title} l={l} />
          ))}
        </ul>
      </div>
      <div className="rounded-2xl bg-chip px-3 py-3">
        <p className="flex items-center gap-2 text-[15px] font-extrabold">
          <span className="grid h-7 place-items-center rounded-full bg-ink px-2 text-[14px] text-on-ink">여럿</span>
          헷갈리는 반대편 → 복수 동사
        </p>
        <ul className="mt-2 grid gap-2 sm:grid-cols-2">
          {MANY_LUMPS.map((l) => (
            <LumpCard key={l.title} l={l} many />
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ───────── 9. 시간·거리·돈은 한 덩어리 ───────── */

const TEN = Array.from({ length: 10 }, (_, i) => i);

/** 10분을 1분짜리 열 개가 아니라 시간 한 덩어리로 보면 단수 동사 */
export function AnTimeLump() {
  return (
    <div className="mx-auto grid max-w-xl gap-2.5">
      <div className="rounded-2xl border border-line px-4 py-3">
        <p className="flex items-center gap-2 text-[14.5px] font-extrabold text-ink-2">
          <Mark ok={false} />
          1분짜리 열 개로 세면
        </p>
        <div className="mt-2 grid grid-cols-10 gap-1" aria-hidden>
          {TEN.map((i) => (
            <span key={i} className="h-7 rounded-md border-2 border-dashed border-ink-3" />
          ))}
        </div>
      </div>
      <div className="rounded-2xl border-2 border-coral px-4 py-3">
        <p className="flex items-center gap-2 text-[14.5px] font-extrabold text-coral-ink">
          <Mark ok />
          10분이라는 시간 한 덩어리로 보면
        </p>
        <div className="mt-2 grid h-9 place-items-center rounded-lg bg-coral-soft text-[15px] font-extrabold text-coral-ink">10분</div>
        <p className="mt-2 text-[1.05em] font-medium">
          <En en="Ten [[minutes]] [[is]] enough." />
        </p>
        <p className="text-[14px] text-ink-2">10분이면 충분해.</p>
      </div>
      <p className="text-center text-[14px] font-bold text-ink-2">
        돈(<span lang="en">thirty dollars</span>)과 거리(<span lang="en">five kilometers</span>)도 한 덩어리 → 단수
      </p>
    </div>
  );
}

/* ───────── 10. 들은 그대로 vs 내 말로: 말풍선 ───────── */

function Bubble({ children, strong = false }: { children: ReactNode; strong?: boolean }) {
  return (
    <span
      className={`relative inline-block rounded-2xl border-2 bg-card px-3.5 py-2 text-[1.06em] font-medium ${
        strong ? "border-coral" : "border-line"
      }`}
    >
      {children}
      <span
        aria-hidden
        className={`absolute -bottom-[9px] left-5 size-4 rotate-45 border-b-2 border-r-2 bg-card ${strong ? "border-coral" : "border-line"}`}
      />
    </span>
  );
}

const SPEECH_CHANGES: { what: string; from: string; to: string }[] = [
  { what: "이음말", from: ", ' '", to: "that" },
  { what: "인칭", from: "I", to: "she" },
  { what: "시제", from: "am", to: "was" },
];

/** 직접화법은 말풍선을 그대로 붙이고, 간접화법은 말풍선을 풀어 전하는 사람의 말로 바꾼다 */
export function AnSpeechBubble() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <div className="rounded-2xl border border-line px-4 py-3">
        <p className="text-[14px] font-extrabold text-ink-3">직접화법 · 말풍선을 그대로 붙여요</p>
        <div className="mt-3 flex flex-col items-start gap-1.5">
          <Bubble>
            <En en="I am hungry." />
          </Bubble>
          <span className="ml-2 flex items-center gap-1.5">
            <PersonIcon size={32} className="text-sky-ink" />
            <span className="text-[14px] font-bold">지수 (말한 사람)</span>
          </span>
        </div>
        <p className="mt-3 flex flex-wrap items-center gap-1.5 text-[1.06em] font-medium">
          <En en="Jisu said," />
          <span className="rounded-xl border-2 border-dashed border-ink-3 px-2 py-0.5">
            <En en="'I am hungry.'" />
          </span>
        </p>
        <p className="mt-2 flex flex-wrap gap-1.5 text-[14px] font-bold text-ink-2">
          <span className="rounded-md bg-chip px-2 py-0.5">쉼표</span>
          <span className="rounded-md bg-chip px-2 py-0.5">따옴표</span>
          <span className="rounded-md bg-chip px-2 py-0.5">따옴표 안은 대문자로 시작</span>
        </p>
      </div>
      <div className="rounded-2xl border-2 border-coral px-4 py-3">
        <p className="text-[14px] font-extrabold text-coral-ink">간접화법 · 말풍선을 풀어 내 말로</p>
        <div className="mt-3 flex flex-col items-start gap-1.5">
          <Bubble strong>
            <En en="Jisu said {that|접속사:~라고} [[she was]] hungry." />
          </Bubble>
          <span className="ml-2 flex items-center gap-1.5">
            <PersonIcon size={32} className="text-coral" />
            <span className="text-[14px] font-bold">나 (전하는 사람)</span>
          </span>
        </div>
        <ul className="mt-3 grid gap-1.5 text-[14.5px]">
          {SPEECH_CHANGES.map((c) => (
            <li key={c.what} className="flex flex-wrap items-center gap-1.5">
              <span className="w-14 shrink-0 font-extrabold">{c.what}</span>
              <span lang="en" className="rounded-md border border-line px-2 py-0.5">
                {c.from}
              </span>
              <ArrowRight size={16} className="text-coral" />
              <span lang="en" className="rounded-md bg-coral-soft px-2 py-0.5 font-bold text-coral-ink">
                {c.to}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ───────── 11. 의문사 의문문 옮기기: 순서가 풀려요 ───────── */

type QBit = { en: string; k: "wh" | "aux" | "subj" | "verb" | "plain" };

const Q_LOOK: Record<QBit["k"], string> = {
  wh: "bg-sky-soft text-sky-ink",
  aux: "bg-chip text-ink-2",
  subj: "border border-line",
  verb: "bg-coral text-white",
  plain: "",
};

const Q_BEFORE: QBit[] = [
  { en: "Where", k: "wh" },
  { en: "do", k: "aux" },
  { en: "you", k: "subj" },
  { en: "live?", k: "verb" },
];

const Q_AFTER: QBit[] = [
  { en: "Jisu asked me", k: "plain" },
  { en: "where", k: "wh" },
  { en: "I", k: "subj" },
  { en: "lived.", k: "verb" },
];

const Q_NOTES: string[] = ["의문사는 그대로", "do·does·did는 사라져요", "주어 + 동사 순서 (물음표 ✕)", "you → I, live → lived"];

function QRow({ bits }: { bits: QBit[] }) {
  return (
    <p className="flex flex-wrap items-center gap-1.5 text-[1.08em] font-medium">
      {bits.map((b) =>
        b.k === "plain" ? (
          <span key={b.en}>
            <En en={b.en} />
          </span>
        ) : (
          <span key={b.en} className={`rounded-lg px-2.5 py-1 font-bold ${Q_LOOK[b.k]}`}>
            <En en={b.en} />
          </span>
        ),
      )}
    </p>
  );
}

/** 따옴표 속 의문사 의문문을 옮기면 do가 빠지고 의문사 + 주어 + 동사 순서가 된다 */
export function AnQuestionFlip() {
  return (
    <div className="mx-auto grid max-w-xl gap-2.5">
      <div className="rounded-2xl border border-line px-4 py-3">
        <p className="text-[14px] font-extrabold text-ink-3">따옴표 속 질문 · 질문 순서</p>
        <div className="mt-2">
          <QRow bits={Q_BEFORE} />
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 text-[14px] font-bold text-ink-2">
        <ArrowRight className="rotate-90 text-coral" />
        내 말로 옮기면
      </div>
      <div className="rounded-2xl border-2 border-coral px-4 py-3">
        <p className="text-[14px] font-extrabold text-coral-ink">옮긴 질문 · 평서문 순서</p>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <QRow bits={Q_AFTER} />
          <span lang="en" className="rounded-lg px-2 py-1 text-[14px] font-bold text-ink-3 line-through decoration-coral decoration-2">
            do
          </span>
        </div>
        <ul className="mt-2.5 grid gap-1.5 text-[14px] font-bold sm:grid-cols-2">
          {Q_NOTES.map((n) => (
            <li key={n} className="rounded-lg bg-chip px-2.5 py-1">
              {n}
            </li>
          ))}
        </ul>
      </div>
      <p className="rounded-2xl bg-chip px-4 py-2.5 text-center text-[14.5px] font-bold">
        의문사가 주어면 순서 그대로: <span lang="en">Who broke it? → asked who had broken it</span>
      </p>
    </div>
  );
}
