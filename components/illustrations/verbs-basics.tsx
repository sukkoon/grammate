import { En } from "@/components/lesson/En";
import { ArrowRight, ClockIcon } from "./icons";

/* ───────── be동사 ───────── */

const BE_CARDS: { be: string; who: string; subjects: string; en: string; ko: string; tone: string }[] = [
  {
    be: "am",
    who: "나 하나 (1인칭 단수)",
    subjects: "I",
    en: "[[I am]] a student.",
    ko: "나는 학생이야.",
    tone: "bg-coral text-white",
  },
  {
    be: "are",
    who: "너, 그리고 여럿",
    subjects: "you, we, they, my friends",
    en: "[[You are]] my friend.",
    ko: "너는 내 친구야.",
    tone: "bg-sky-soft text-sky-ink",
  },
  {
    be: "is",
    who: "나와 너를 뺀 하나 (3인칭 단수)",
    subjects: "he, she, it, Minsu, my dog",
    en: "[[My dog is]] cute.",
    ko: "우리 개는 귀여워.",
    tone: "bg-mint-soft text-mint-ink",
  },
];

/** be동사 고르기: 주어에 따라 am / are / is, 과거로 가면 was / were */
export function VbBeTable() {
  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-3">
        {BE_CARDS.map((c) => (
          <div key={c.be} className="rounded-2xl border border-line px-4 py-4">
            <span lang="en" className={`inline-block rounded-xl px-3 py-1.5 text-[1.4em] font-extrabold leading-none ${c.tone}`}>
              {c.be}
            </span>
            <p className="mt-2 text-[14px] font-extrabold text-ink-2">{c.who}</p>
            <p lang="en" className="mt-1 text-[15px] font-medium">
              {c.subjects}
            </p>
            <p className="mt-3 border-t border-line pt-3 text-[1.05em] font-medium">
              <En en={c.en} />
            </p>
            <p className="text-[14px] text-ink-2">{c.ko}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-2xl bg-chip px-4 py-3 text-[15px]">
        <span className="font-extrabold text-ink-2">과거로 가면</span>
        <span className="inline-flex items-center gap-1.5">
          <span lang="en" className="font-bold">
            am · is
          </span>
          <ArrowRight size={18} className="text-ink-3" />
          <span lang="en" className="rounded-lg bg-card px-2 py-0.5 font-extrabold">
            was
          </span>
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span lang="en" className="font-bold">
            are
          </span>
          <ArrowRight size={18} className="text-ink-3" />
          <span lang="en" className="rounded-lg bg-card px-2 py-0.5 font-extrabold">
            were
          </span>
        </span>
      </div>
    </div>
  );
}

type MoveChip = { en: string; kind?: "be" | "not" | "subj" };

const CHIP_TONE: Record<NonNullable<MoveChip["kind"]> | "plain", string> = {
  be: "bg-coral text-white",
  not: "bg-amber-soft text-amber-ink",
  subj: "bg-sky-soft text-sky-ink",
  plain: "border border-line",
};

const BE_MOVES: { label: string; hint: string; chips: MoveChip[]; answer?: { en: string } }[] = [
  {
    label: "긍정문",
    hint: "기본 문장",
    chips: [{ en: "She", kind: "subj" }, { en: "is", kind: "be" }, { en: "happy." }],
  },
  {
    label: "부정문",
    hint: "be동사 바로 뒤에 not을 끼워요",
    chips: [{ en: "She", kind: "subj" }, { en: "is", kind: "be" }, { en: "not", kind: "not" }, { en: "happy." }],
  },
  {
    label: "의문문",
    hint: "be동사가 주어 앞으로 자리를 바꿔요",
    chips: [{ en: "Is", kind: "be" }, { en: "she", kind: "subj" }, { en: "happy?" }],
    answer: { en: "Yes, she is. / No, she isn't." },
  },
];

/** be동사의 부정문(not 끼우기)과 의문문(자리 바꾸기) */
export function VbBeMoves() {
  return (
    <ol className="space-y-2.5">
      {BE_MOVES.map((row) => (
        <li key={row.label} className="rounded-2xl border border-line px-4 py-3">
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="rounded-lg bg-chip px-2.5 py-1 text-[14px] font-extrabold">{row.label}</span>
            <span className="text-[14px] text-ink-2">{row.hint}</span>
          </p>
          <p className="mt-2.5 flex flex-wrap items-center gap-1.5 text-[1.2em] font-medium">
            {row.chips.map((c, i) => (
              <span key={i} className={`rounded-lg px-2.5 py-1 ${CHIP_TONE[c.kind ?? "plain"]}`}>
                <En en={c.en} />
              </span>
            ))}
          </p>
          {row.answer && (
            <p className="mt-2 text-[15px]">
              <span className="mr-1.5 font-extrabold text-ink-2">대답</span>
              <En en={row.answer.en} />
            </p>
          )}
        </li>
      ))}
    </ol>
  );
}

/* ───────── 일반동사 ───────── */

const S_RULES: { end: string; how: string; pairs: { en: string }[]; note?: string; tone: string }[] = [
  {
    end: "대부분의 동사",
    how: "+ s",
    pairs: [{ en: "like → likes" }, { en: "play → plays" }, { en: "eat → eats" }],
    tone: "bg-coral text-white",
  },
  {
    end: "s, sh, ch, x, o로 끝나면",
    how: "+ es",
    pairs: [{ en: "wash → washes" }, { en: "watch → watches" }, { en: "fix → fixes" }, { en: "go → goes" }],
    tone: "bg-sky-soft text-sky-ink",
  },
  {
    end: "자음 + y로 끝나면",
    how: "y를 i로 + es",
    pairs: [{ en: "study → studies" }, { en: "cry → cries" }, { en: "fly → flies" }],
    note: "모음 + y는 그냥 + s예요: buy → buys",
    tone: "bg-mint-soft text-mint-ink",
  },
  {
    end: "딱 하나, 특별한 동사",
    how: "모양이 바뀌어요",
    pairs: [{ en: "have → has" }],
    note: "haves가 아니에요!",
    tone: "bg-amber-soft text-amber-ink",
  },
];

/** 3인칭 단수 현재형 -s 붙이는 규칙 */
export function VbSRule() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {S_RULES.map((r) => (
        <div key={r.end} className="rounded-2xl border border-line px-4 py-4">
          <p className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-[14px] font-extrabold text-ink-2">{r.end}</span>
            <span className={`rounded-lg px-2.5 py-1 text-[15px] font-extrabold ${r.tone}`}>{r.how}</span>
          </p>
          <ul className="mt-3 space-y-1.5">
            {r.pairs.map((p) => (
              <li key={p.en} className="text-[1.1em] font-medium">
                <En en={p.en} />
              </li>
            ))}
          </ul>
          {r.note && <p className="mt-2 text-[14px] text-ink-2">{r.note}</p>}
        </div>
      ))}
    </div>
  );
}

type Piece = { t: string; mark?: string; role?: "helper" | "verb" | "not" };

const PIECE_TONE: Record<NonNullable<Piece["role"]> | "plain", string> = {
  helper: "bg-coral-soft",
  verb: "border-2 border-coral",
  not: "bg-amber-soft text-amber-ink",
  plain: "",
};

const TAKEOVER: Record<"present" | "past", { label: string; pieces: Piece[]; note: string }[]> = {
  present: [
    {
      label: "긍정문",
      pieces: [{ t: "She" }, { t: "play", mark: "s", role: "verb" }, { t: "soccer." }],
      note: "주어가 3인칭 단수라서 play에 -s가 붙어요.",
    },
    {
      label: "부정문",
      pieces: [{ t: "She" }, { t: "do", mark: "es", role: "helper" }, { t: "not", role: "not" }, { t: "play", role: "verb" }, { t: "soccer." }],
      note: "-s가 does로 이사 갔어요. play는 원형으로 돌아가요.",
    },
    {
      label: "의문문",
      pieces: [{ t: "Do", mark: "es", role: "helper" }, { t: "she" }, { t: "play", role: "verb" }, { t: "soccer?" }],
      note: "Does가 맨 앞으로 나와도 play는 그대로 원형이에요.",
    },
  ],
  past: [
    {
      label: "긍정문",
      pieces: [{ t: "She" }, { t: "play", mark: "ed", role: "verb" }, { t: "soccer." }],
      note: "지나간 일이라서 play에 -ed가 붙어요.",
    },
    {
      label: "부정문",
      pieces: [{ t: "She" }, { t: "", mark: "did", role: "helper" }, { t: "not", role: "not" }, { t: "play", role: "verb" }, { t: "soccer." }],
      note: "과거 표시는 did가 통째로 가져가요. play는 원형!",
    },
    {
      label: "의문문",
      pieces: [{ t: "", mark: "Did", role: "helper" }, { t: "she" }, { t: "play", role: "verb" }, { t: "soccer?" }],
      note: "Did가 맨 앞으로 나와도 play는 그대로 원형이에요.",
    },
  ],
};

function PieceChip({ p }: { p: Piece }) {
  const tone = PIECE_TONE[p.role ?? "plain"];
  return (
    <span className={`rounded-lg py-1 ${tone ? `px-2.5 ${tone}` : "px-0.5"}`}>
      {p.t}
      {p.mark && <b className="font-extrabold text-coral-ink underline decoration-2 underline-offset-4">{p.mark}</b>}
    </span>
  );
}

/** 모양 바꾸기는 한 번만: -s(-ed)가 do/does/did로 이사 간다 */
export function VbDoesTakesOver({ tense = "present" }: { tense?: "present" | "past" }) {
  return (
    <ol className="space-y-2.5">
      {TAKEOVER[tense].map((row) => (
        <li key={row.label} className="rounded-2xl border border-line px-4 py-3">
          <span className="rounded-lg bg-chip px-2.5 py-1 text-[14px] font-extrabold">{row.label}</span>
          <p lang="en" className="mt-2.5 flex flex-wrap items-center gap-1.5 text-[1.2em] font-medium">
            {row.pieces.map((p, i) => (
              <PieceChip key={i} p={p} />
            ))}
          </p>
          <p className="mt-2 text-[14px] text-ink-2">{row.note}</p>
        </li>
      ))}
    </ol>
  );
}

/* ───────── 끝소리 발음: -s와 -ed ───────── */

const ENDING_SOUNDS: Record<"s" | "ed", { sound: string; when: string; list: { en: string }[]; tone: string }[]> = {
  s: [
    {
      sound: "[스]",
      when: "k, p, f처럼 목이 떨리지 않는 소리 뒤",
      list: [{ en: "likes" }, { en: "stops" }, { en: "helps" }, { en: "laughs" }],
      tone: "bg-sky-soft text-sky-ink",
    },
    {
      sound: "[즈]",
      when: "모음이나 목이 떨리는 소리 뒤",
      list: [{ en: "plays" }, { en: "runs" }, { en: "goes" }, { en: "reads" }],
      tone: "bg-mint-soft text-mint-ink",
    },
    {
      sound: "[이즈]",
      when: "s, sh, ch, x, z 소리 뒤",
      list: [{ en: "watches" }, { en: "washes" }, { en: "fixes" }, { en: "passes" }],
      tone: "bg-coral-soft text-coral-ink",
    },
  ],
  ed: [
    {
      sound: "[트]",
      when: "k, p, s, sh, ch, f처럼 목이 떨리지 않는 소리 뒤",
      list: [{ en: "walked" }, { en: "helped" }, { en: "washed" }, { en: "watched" }],
      tone: "bg-sky-soft text-sky-ink",
    },
    {
      sound: "[드]",
      when: "모음이나 목이 떨리는 소리 뒤",
      list: [{ en: "played" }, { en: "called" }, { en: "lived" }, { en: "cleaned" }],
      tone: "bg-mint-soft text-mint-ink",
    },
    {
      sound: "[이드]",
      when: "t, d 소리 뒤",
      list: [{ en: "wanted" }, { en: "needed" }, { en: "visited" }, { en: "ended" }],
      tone: "bg-coral-soft text-coral-ink",
    },
  ],
};

/** 끝소리에 따라 세 가지로 읽는 -s / -ed */
export function VbEndingSound({ ending }: { ending: "s" | "ed" }) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {ENDING_SOUNDS[ending].map((g) => (
        <div key={g.sound} className="rounded-2xl border border-line px-4 py-4">
          <span className={`inline-block rounded-lg px-2.5 py-1 text-[1.2em] font-extrabold ${g.tone}`}>{g.sound}</span>
          <p className="mt-2 text-[14px] text-ink-2">{g.when}</p>
          <ul className="mt-2.5 flex flex-wrap gap-x-3 gap-y-1.5 text-[1.1em] font-medium">
            {g.list.map((w) => (
              <li key={w.en}>
                <En en={w.en} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/* ───────── 과거형 ───────── */

const TIME_POINTS: { en: string; ko: string }[] = [
  { en: "last year", ko: "작년에" },
  { en: "last week", ko: "지난주에" },
  { en: "two days ago", ko: "이틀 전에" },
  { en: "yesterday", ko: "어제" },
  { en: "last night", ko: "어젯밤에" },
];

/** 시간선: 과거를 알려 주는 말들과 지금 */
export function VbTimeline() {
  return (
    <div>
      <p className="mb-3 flex items-center gap-2 text-[14px] font-extrabold text-ink-2">
        <ClockIcon size={20} />
        옛날 → 지금
      </p>
      <ol className="grid gap-2 sm:grid-cols-6 sm:gap-1.5">
        {TIME_POINTS.map((p) => (
          <li key={p.en} className="border-l-4 border-sky-ink/40 py-1 pl-3 sm:border-l-0 sm:border-t-4 sm:pl-0 sm:pt-2 sm:text-center">
            <span className="block text-[15px] font-bold">
              <En en={p.en} />
            </span>
            <span className="block text-[14px] text-ink-2">{p.ko}</span>
          </li>
        ))}
        <li className="border-l-4 border-coral py-1 pl-3 sm:border-l-0 sm:border-t-4 sm:pl-0 sm:pt-2 sm:text-center">
          <span className="block text-[15px] font-extrabold text-coral-ink">
            <En en="now" />
          </span>
          <span className="block text-[14px] text-ink-2">지금</span>
        </li>
      </ol>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <div className="rounded-2xl bg-sky-soft px-4 py-3">
          <p className="text-[14px] font-extrabold text-sky-ink">지나간 일 → 과거형</p>
          <p className="mt-1 text-[1.05em] font-medium">
            <En en="I [[played]] soccer yesterday." />
          </p>
        </div>
        <div className="rounded-2xl bg-coral-soft px-4 py-3">
          <p className="text-[14px] font-extrabold text-coral-ink">요즘 늘 하는 일 → 현재형</p>
          <p className="mt-1 text-[1.05em] font-medium">
            <En en="I [[play]] soccer every day." />
          </p>
        </div>
      </div>
    </div>
  );
}

const LETTER_TONE: Record<string, string> = {
  A: "bg-coral text-white",
  B: "bg-sky-soft text-sky-ink",
  C: "bg-mint-soft text-mint-ink",
};

const IRREGULAR_TYPES: { type: string; desc: string; rows: { en: string }[] }[] = [
  { type: "AAA", desc: "셋 다 같아요", rows: [{ en: "cut – cut – cut" }, { en: "put – put – put" }, { en: "hit – hit – hit" }] },
  { type: "ABB", desc: "과거형과 과거분사가 같아요", rows: [{ en: "buy – bought – bought" }, { en: "make – made – made" }, { en: "have – had – had" }] },
  { type: "ABC", desc: "셋 다 달라요", rows: [{ en: "go – went – gone" }, { en: "see – saw – seen" }, { en: "eat – ate – eaten" }] },
  { type: "ABA", desc: "원형과 과거분사가 같아요", rows: [{ en: "come – came – come" }, { en: "run – ran – run" }, { en: "become – became – become" }] },
];

function LetterChip({ l }: { l: string }) {
  return <span className={`grid size-8 place-items-center rounded-lg text-[15px] font-extrabold ${LETTER_TONE[l]}`}>{l}</span>;
}

/** 불규칙 동사의 네 가지 모양: 원형 – 과거형 – 과거분사 */
export function VbIrregularTypes() {
  return (
    <div>
      <p className="mb-3 text-center text-[14px] font-extrabold text-ink-2">원형 – 과거형 – 과거분사</p>
      <div className="grid gap-3 sm:grid-cols-2">
        {IRREGULAR_TYPES.map((g) => (
          <div key={g.type} className="rounded-2xl border border-line px-4 py-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1" aria-label={g.type.split("").join("-")}>
                {g.type.split("").map((l, i) => (
                  <LetterChip key={i} l={l} />
                ))}
              </span>
              <span className="text-[14px] font-extrabold text-ink-2">{g.desc}</span>
            </div>
            <ul className="mt-3 space-y-1.5">
              {g.rows.map((r) => (
                <li key={r.en} className="text-[1.1em] font-medium">
                  <En en={r.en} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
