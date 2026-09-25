import { En } from "@/components/lesson/En";
import { ArrowRight, BoxIcon, CatIcon, ClockIcon, HatIcon } from "./icons";

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
    <div role="list" className="space-y-2.5">
      {BE_MOVES.map((row) => (
        <div role="listitem" key={row.label} className="rounded-2xl border border-line px-4 py-3">
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
        </div>
      ))}
    </div>
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
          <div role="list" className="mt-3 space-y-1.5">
            {r.pairs.map((p) => (
              <div role="listitem" key={p.en} className="text-[1.1em] font-medium">
                <En en={p.en} />
              </div>
            ))}
          </div>
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
    <div role="list" className="space-y-2.5">
      {TAKEOVER[tense].map((row) => (
        <div role="listitem" key={row.label} className="rounded-2xl border border-line px-4 py-3">
          <span className="rounded-lg bg-chip px-2.5 py-1 text-[14px] font-extrabold">{row.label}</span>
          <p lang="en" className="mt-2.5 flex flex-wrap items-center gap-1.5 text-[1.2em] font-medium">
            {row.pieces.map((p, i) => (
              <PieceChip key={i} p={p} />
            ))}
          </p>
          <p className="mt-2 text-[14px] text-ink-2">{row.note}</p>
        </div>
      ))}
    </div>
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
          <div role="list" className="mt-2.5 flex flex-wrap gap-x-3 gap-y-1.5 text-[1.1em] font-medium">
            {g.list.map((w) => (
              <div role="listitem" key={w.en}>
                <En en={w.en} />
              </div>
            ))}
          </div>
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
      <div role="list" className="grid gap-2 sm:grid-cols-6 sm:gap-1.5">
        {TIME_POINTS.map((p) => (
          <div role="listitem" key={p.en} className="border-l-4 border-sky-ink/40 py-1 pl-3 sm:border-l-0 sm:border-t-4 sm:pl-0 sm:pt-2 sm:text-center">
            <span className="block text-[15px] font-bold">
              <En en={p.en} />
            </span>
            <span className="block text-[14px] text-ink-2">{p.ko}</span>
          </div>
        ))}
        <div role="listitem" className="border-l-4 border-coral py-1 pl-3 sm:border-l-0 sm:border-t-4 sm:pl-0 sm:pt-2 sm:text-center">
          <span className="block text-[15px] font-extrabold text-coral-ink">
            <En en="now" />
          </span>
          <span className="block text-[14px] text-ink-2">지금</span>
        </div>
      </div>
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
            <div role="list" className="mt-3 space-y-1.5">
              {g.rows.map((r) => (
                <div role="listitem" key={r.en} className="text-[1.1em] font-medium">
                  <En en={r.en} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ════════════ 시각화 보강 ════════════ */

/* ───────── be동사 가족: 이름은 하나, 옷은 다섯 벌 ───────── */

const BE_FAMILY: { when: string; tone: string; forms: { en: string; who: string }[] }[] = [
  {
    when: "지금 (현재형)",
    tone: "bg-sky-soft text-sky-ink",
    forms: [
      { en: "am", who: "I" },
      { en: "are", who: "you · 여럿" },
      { en: "is", who: "he · she · it" },
    ],
  },
  {
    when: "지나간 때 (과거형)",
    tone: "bg-mint-soft text-mint-ink",
    forms: [
      { en: "was", who: "I · he · she · it" },
      { en: "were", who: "you · 여럿" },
    ],
  },
];

/** am, are, is, was, were는 모두 원래 모양 be가 옷을 갈아입은 것 */
export function VbBeFamily() {
  return (
    <div className="mx-auto max-w-xl">
      <div className="flex flex-col items-center text-center">
        <span className="rounded-2xl bg-coral px-5 py-2 text-[1.6em] font-extrabold leading-none text-white">
          <En en="be" />
        </span>
        <span className="mt-1.5 text-[14px] font-extrabold text-coral-ink">원래 모양 · 사전에 실린 이름</span>
        <span className="mt-2 flex items-center gap-1.5 text-[14px] font-bold text-ink-2">
          <HatIcon size={22} className="text-amber-ink" />
          주어와 때에 맞춰 옷을 갈아입어요
        </span>
        <ArrowRight className="mt-1 rotate-90 text-ink-3" />
      </div>
      <div className="mt-2 grid gap-2.5 sm:grid-cols-2">
        {BE_FAMILY.map((g) => (
          <div key={g.when} className="rounded-2xl border border-line px-4 py-3">
            <p className="text-[14px] font-extrabold text-ink-2">{g.when}</p>
            <div role="list" className="mt-2 flex flex-wrap gap-x-3 gap-y-2">
              {g.forms.map((f) => (
                <div role="listitem" key={f.en} className="flex flex-col items-center gap-1">
                  <span className={`rounded-xl px-3 py-1.5 text-[1.25em] font-extrabold leading-none ${g.tone}`}>
                    <En en={f.en} />
                  </span>
                  <span className="text-[14px] text-ink-2">{f.who}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 text-center text-[14px] text-ink-2">
        다섯 모양을 한 식구로 묶어 부르는 이름이 <b>be동사</b>예요.
      </p>
    </div>
  );
}

/* ───────── be동사의 두 가지 뜻 ───────── */

const BE_IS_ROWS: { en: string; ko: string; tag: string }[] = [
  { en: "Minsu [[is]] my cousin.", ko: "민수는 내 사촌이야.", tag: "+ 명사: 누구인지" },
  { en: "The water [[is]] cold.", ko: "물이 차가워.", tag: "+ 형용사: 어떤지" },
];

const BE_AT_ROWS: { en: string; ko: string; tag: string }[] = [
  { en: "My cat [[is]] in the box.", ko: "우리 고양이는 상자 안에 있어.", tag: "+ 장소: 어디에" },
  { en: "My friends [[are]] at the park.", ko: "내 친구들은 공원에 있어.", tag: "+ 장소: 어디에" },
];

function MeaningRows({ rows }: { rows: { en: string; ko: string; tag: string }[] }) {
  return (
    <div role="list" className="mt-3 grid gap-2">
      {rows.map((r) => (
        <div role="listitem" key={r.en}>
          <p className="text-[14px] font-bold text-ink-3">{r.tag}</p>
          <p className="text-[1.05em] font-medium">
            <En en={r.en} />
          </p>
          <p className="text-[14px] text-ink-2">{r.ko}</p>
        </div>
      ))}
    </div>
  );
}

/** be 뒤가 명사·형용사면 '= ~이다', 장소면 '~에 있다' */
export function VbBeMeanings() {
  return (
    <div className="grid gap-2.5 sm:grid-cols-2">
      <div className="rounded-2xl border border-line px-4 py-3">
        <p className="rounded-lg bg-sky-soft px-2.5 py-1 text-[15px] font-extrabold text-sky-ink">be + 명사·형용사 → ~이다</p>
        <p className="mt-3 flex flex-wrap items-center justify-center gap-2 text-[1.1em] font-medium">
          <span className="rounded-lg border border-line px-2.5 py-1">
            <En en="Minsu" />
          </span>
          <span aria-label="같다" className="text-[1.5em] font-extrabold leading-none text-sky-ink">
            =
          </span>
          <span className="rounded-lg border border-line px-2.5 py-1">
            <En en="my cousin" />
          </span>
        </p>
        <p className="mt-1 text-center text-[14px] text-ink-2">주어와 뒤의 설명을 등호처럼 이어요</p>
        <MeaningRows rows={BE_IS_ROWS} />
      </div>
      <div className="rounded-2xl border border-line px-4 py-3">
        <p className="rounded-lg bg-mint-soft px-2.5 py-1 text-[15px] font-extrabold text-mint-ink">be + 장소 → ~에 있다</p>
        <p className="mt-3 flex items-end justify-center gap-2">
          <CatIcon size={40} className="text-ink" />
          <span className="pb-1 text-[1.1em] font-medium">
            <En en="in" />
          </span>
          <BoxIcon size={44} className="text-amber-ink" />
        </p>
        <p className="mt-1 text-center text-[14px] text-ink-2">주어가 어디에 있는지 알려 줘요</p>
        <MeaningRows rows={BE_AT_ROWS} />
      </div>
    </div>
  );
}

/* ───────── 3인칭 단수: 딱 한 칸만 -s ───────── */

const PERSON_COLS = ["1인칭 · 나", "2인칭 · 너", "3인칭 · 나머지"];

const PERSON_ROWS: { label: string; sub: string; cells: { who: { en: string }; verb: { en: string }; hot?: boolean }[] }[] = [
  {
    label: "단수",
    sub: "하나",
    cells: [
      { who: { en: "I" }, verb: { en: "play" } },
      { who: { en: "you" }, verb: { en: "play" } },
      { who: { en: "he, she, it, Minsu" }, verb: { en: "plays" }, hot: true },
    ],
  },
  {
    label: "복수",
    sub: "여럿",
    cells: [
      { who: { en: "we" }, verb: { en: "play" } },
      { who: { en: "you" }, verb: { en: "play" } },
      { who: { en: "they, my friends" }, verb: { en: "play" } },
    ],
  },
];

/** 인칭 × 수 여섯 칸 중에 -s가 붙는 곳은 3인칭 단수 한 칸뿐 */
export function VbPersonGrid() {
  return (
    <div>
      <div className="grid grid-cols-[auto_repeat(3,minmax(0,1fr))] gap-1.5 text-center">
        <span aria-hidden />
        {PERSON_COLS.map((c) => (
          <span key={c} className="rounded-lg bg-chip px-1 py-1.5 text-[14px] font-extrabold text-ink-2">
            {c}
          </span>
        ))}
        {PERSON_ROWS.map((r) => (
          <div key={r.label} className="contents">
            <span className="grid place-items-center rounded-lg bg-chip px-2 text-[14px] font-extrabold text-ink-2">
              <span>
                {r.label}
                <span className="block font-bold text-ink-3">{r.sub}</span>
              </span>
            </span>
            {r.cells.map((c, i) => (
              <span
                key={i}
                className={`flex flex-col items-center justify-center gap-1 rounded-xl px-1.5 py-2 ${c.hot ? "border-2 border-coral bg-coral-soft" : "border border-line"}`}
              >
                <span className="text-[14.5px] leading-snug text-ink-2">
                  <En en={c.who.en} />
                </span>
                <span className={`rounded-md px-2 py-0.5 text-[1.05em] font-bold ${c.hot ? "bg-coral text-white" : "bg-chip"}`}>
                  <En en={c.verb.en} />
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
      <p className="mt-3 text-center text-[14px] text-ink-2">
        여섯 칸 가운데 <b className="text-coral-ink">3인칭 단수</b> 한 칸에만 -s가 붙어요. 나머지는 모두 원형 그대로예요.
      </p>
    </div>
  );
}

/* ───────── Do/Does로 물으면 do/does로 대답 ───────── */

const DO_QA: { q: { en: string; ko: string }; a: { en: string; ko: string }; map: string[] }[] = [
  {
    q: { en: "[[{Do|조동사:의문문을 만드는 말}]] they walk to school?", ko: "걔네는 걸어서 학교에 가?" },
    a: { en: "Yes, they [[{do|조동사:앞에 나온 동사를 대신하는 말}]].", ko: "응, 걸어가." },
    map: ["Do → do", "they → they"],
  },
  {
    q: { en: "[[{Does|조동사:의문문을 만드는 말}]] your sister like milk?", ko: "너희 언니는 우유 좋아해?" },
    a: { en: "{No|부사:아니(요)}, she [[doesn't]].", ko: "아니, 안 좋아해." },
    map: ["Does → doesn't", "your sister → she"],
  },
];

/** 일반동사 의문문: Do/Does + 주어 + 동사원형? 대답도 do/does로 받는다 */
export function VbDoAnswer() {
  return (
    <div>
      <p className="flex flex-wrap items-center justify-center gap-1.5 text-[15px] font-extrabold">
        <span lang="en" className="rounded-lg bg-coral px-2.5 py-1 text-white">
          Do / Does
        </span>
        <span className="text-ink-3">+</span>
        <span className="rounded-lg bg-chip px-2.5 py-1">주어</span>
        <span className="text-ink-3">+</span>
        <span className="rounded-lg bg-sky-soft px-2.5 py-1 text-sky-ink">동사원형 ~?</span>
      </p>
      <div role="list" className="mt-3 grid gap-2.5">
        {DO_QA.map((x) => (
          <div role="listitem" key={x.q.en} className="rounded-2xl border border-line px-3.5 py-3">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="rounded-xl bg-chip px-3 py-2 sm:flex-1">
                <p className="text-[14px] font-extrabold text-ink-3">질문</p>
                <p className="text-[1.05em] font-medium">
                  <En en={x.q.en} />
                </p>
                <p className="text-[14px] text-ink-2">{x.q.ko}</p>
              </div>
              <ArrowRight className="mx-auto rotate-90 text-coral sm:mx-0 sm:rotate-0" />
              <div className="rounded-xl border-2 border-coral px-3 py-2 sm:flex-1">
                <p className="text-[14px] font-extrabold text-coral-ink">대답</p>
                <p className="text-[1.05em] font-medium">
                  <En en={x.a.en} />
                </p>
                <p className="text-[14px] text-ink-2">{x.a.ko}</p>
              </div>
            </div>
            <p className="mt-2 flex flex-wrap gap-1.5">
              {x.map.map((m) => (
                <span key={m} lang="en" className="rounded-md bg-amber-soft px-2 py-0.5 text-[14px] font-bold text-amber-ink">
                  {m}
                </span>
              ))}
            </p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-center text-[14px] text-ink-2">
        대답의 주어는 대명사로 바꾸고, Do로 물었으면 do로 받아요. <span lang="en">Yes, I am.</span>처럼 be동사로 받으면 틀려요.
      </p>
    </div>
  );
}
