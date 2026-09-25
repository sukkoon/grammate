import type { ReactNode } from "react";
import { En } from "@/components/lesson/En";
import { ArrowRight, CrownIcon, MaskIcon } from "./icons";

/* 일치와 화법 장 그림: 진짜 주어 찾기, of 앞·뒤, 시제 한 칸 물러서기, 평서문 옮기기 다섯 단계, 때·곳의 말, 문장 종류별 진짜 동사 */

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
