import type { ReactNode } from "react";
import { En } from "@/components/lesson/En";
import { ArrowRight, CrownIcon, PersonIcon } from "./icons";

/* 조동사 장 그림: 도우미 조동사, 부정·의문 만들기, must not vs don't have to, 확신 사다리, 과거 돌아보기, should 공식, So do I */

/* ───────── 공통 도우미 ───────── */

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

function BanIcon({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" strokeWidth="2.4" strokeLinecap="round" aria-hidden style={{ stroke: "var(--coral-ink)" }}>
      <circle cx="12" cy="12" r="9" />
      <path d="M5.6 18.4 18.4 5.6" />
    </svg>
  );
}

function OkIcon({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden style={{ stroke: "var(--mint-ink)" }}>
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12.5 2.6 2.6L16.5 9" />
    </svg>
  );
}

/* ───────── 1. 조동사는 동사의 도우미 ───────── */

const HELPER_CHECKS: { en: string; ok: boolean; why: string }[] = [
  { en: "He [[can swim]].", ok: true, why: "조동사 + 동사원형" },
  { en: "He cans swim.", ok: false, why: "조동사에는 -s가 붙지 않아요" },
  { en: "He can swims.", ok: false, why: "뒤의 동사는 원형 그대로예요" },
  { en: "He can to swim.", ok: false, why: "조동사 뒤에는 to가 필요 없어요" },
];

/** 조동사 can이 동사 swim을 돕는다: 둘이 한 덩어리 진짜 동사, 동사는 원형 그대로 */
export function MdHelper() {
  return (
    <div>
      <p lang="en" className="flex flex-wrap items-end justify-center gap-x-2 gap-y-3 text-[1.3em] font-medium">
        <span className="rounded-xl border border-line px-3 py-2">
          <En en="He" />
        </span>
        <span className="flex flex-col items-center gap-1">
          <CrownIcon size={26} className="text-coral" />
          <span className="flex items-center gap-1.5 rounded-2xl border-2 border-coral px-1.5 py-1.5">
            <span className="rounded-lg bg-sky-soft px-2.5 py-1 text-sky-ink">can</span>
            <span className="rounded-lg bg-coral px-2.5 py-1 text-white">swim</span>
          </span>
          <span className="text-[14px] font-extrabold text-coral-ink">한 덩어리 진짜 동사</span>
        </span>
        <span className="pb-9">.</span>
      </p>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <div className="rounded-2xl bg-sky-soft px-4 py-3 text-sky-ink">
          <p className="font-extrabold">조동사 can: 도우미</p>
          <p className="text-[14px]">&lsquo;~할 수 있다&rsquo;는 뜻을 더해요. 주어가 he여도 모양이 그대로예요.</p>
        </div>
        <div className="rounded-2xl bg-coral-soft px-4 py-3 text-coral-ink">
          <p className="font-extrabold">동사 swim: 동사원형</p>
          <p className="text-[14px]">-s, -ed, -ing, to를 붙이지 않은 맨 처음 모양으로 와요.</p>
        </div>
      </div>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {HELPER_CHECKS.map((c) => (
          <li key={c.en} className="flex items-center gap-3 rounded-2xl border border-line px-3 py-2.5">
            <Mark ok={c.ok} />
            <span className="min-w-0">
              <span className={`block text-[1.08em] font-medium ${c.ok ? "" : "text-ink-2 line-through decoration-coral/60"}`}>
                <En en={c.en} />
              </span>
              <span className="block text-[14px] text-ink-2">{c.why}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ───────── 2. 부정문과 의문문 ───────── */

type MoveChip = { en: string; kind?: "modal" | "not" | "subj" };

const MOVE_TONE: Record<NonNullable<MoveChip["kind"]> | "plain", string> = {
  modal: "bg-sky-soft text-sky-ink",
  not: "bg-amber-soft text-amber-ink",
  subj: "bg-chip text-ink",
  plain: "border border-line",
};

const MODAL_MOVES: { label: string; hint: string; chips: MoveChip[]; answer?: { en: string } }[] = [
  {
    label: "긍정문",
    hint: "조동사 + 동사원형",
    chips: [{ en: "She", kind: "subj" }, { en: "can", kind: "modal" }, { en: "swim." }],
  },
  {
    label: "부정문",
    hint: "조동사 바로 뒤에 not을 끼워요 (can + not은 cannot, 줄여서 can't)",
    chips: [{ en: "She", kind: "subj" }, { en: "can", kind: "modal" }, { en: "not", kind: "not" }, { en: "swim." }],
  },
  {
    label: "의문문",
    hint: "조동사가 주어 앞으로 나가요. do/does는 필요 없어요",
    chips: [{ en: "Can", kind: "modal" }, { en: "she", kind: "subj" }, { en: "swim?" }],
    answer: { en: "Yes, she can. / {No|부사:아니(요)}, she can't." },
  },
];

/** 조동사 문장의 부정문(not 끼우기)과 의문문(조동사 앞으로) */
export function MdMoves() {
  return (
    <ol className="space-y-2.5">
      {MODAL_MOVES.map((row) => (
        <li key={row.label} className="rounded-2xl border border-line px-4 py-3">
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="rounded-lg bg-chip px-2.5 py-1 text-[14px] font-extrabold">{row.label}</span>
            <span className="text-[14px] text-ink-2">{row.hint}</span>
          </p>
          <p className="mt-2.5 flex flex-wrap items-center gap-1.5 text-[1.2em] font-medium">
            {row.chips.map((c, i) => (
              <span key={i} className={`rounded-lg px-2.5 py-1 ${MOVE_TONE[c.kind ?? "plain"]}`}>
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

/* ───────── 3. must not vs don't have to ───────── */

function RuleCard({
  icon,
  title,
  ko,
  en,
  enKo,
  sub,
  tone,
}: {
  icon: ReactNode;
  title: string;
  ko: string;
  en: string;
  enKo: string;
  sub: string;
  tone: string;
}) {
  return (
    <div className={`rounded-2xl px-4 py-4 ${tone}`}>
      <div className="flex items-center gap-2.5">
        {icon}
        <span>
          <span lang="en" className="block text-[1.25em] font-extrabold leading-tight">
            {title}
          </span>
          <span className="block text-[14.5px] font-bold">{ko}</span>
        </span>
      </div>
      <p className="mt-3 rounded-xl bg-card px-3 py-2 text-ink">
        <span className="block text-[1.05em] font-medium">
          <En en={en} />
        </span>
        <span className="block text-[14px] text-ink-2">{enKo}</span>
      </p>
      <p className="mt-2 text-[14px]">{sub}</p>
    </div>
  );
}

/** 긍정에서는 must = have to, 부정에서는 must not(금지) ≠ don't have to(필요 없음) */
export function MdMustNotVsDontHaveTo() {
  return (
    <div>
      <div className="mx-auto w-fit rounded-2xl bg-chip px-4 py-3 text-center">
        <p className="text-[1.15em] font-bold">
          <En en="must = {have to}" />
        </p>
        <p className="text-[14px] text-ink-2">긍정일 때는 둘 다 &lsquo;~해야 한다&rsquo;</p>
      </div>
      <p className="my-3 text-center text-[14.5px] font-extrabold text-ink-2">그런데 not이 붙으면 뜻이 갈라져요</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <RuleCard
          icon={<BanIcon />}
          title="must not"
          ko="~하면 안 된다 (금지)"
          en="You [[must not]] run here."
          enKo="여기서 뛰면 안 돼."
          sub="하면 안 되는 일이에요. 고를 수 없어요."
          tone="bg-coral-soft text-coral-ink"
        />
        <RuleCard
          icon={<OkIcon />}
          title="don't have to"
          ko="~할 필요가 없다"
          en="You [[{don't have to}]] run."
          enKo="뛸 필요 없어."
          sub="뛰어도 되고, 안 뛰어도 돼요. 같은 뜻: need not"
          tone="bg-mint-soft text-mint-ink"
        />
      </div>
    </div>
  );
}

/* ───────── 4. 추측의 확신 사다리 ───────── */

const LADDER: { modal: string; ko: string; level: number; label: string; en: string; tone: string }[] = [
  {
    modal: "must be",
    ko: "틀림없이 ~이다",
    level: 95,
    label: "거의 확실해요",
    en: "It [[{must|조동사:~임에 틀림없다} be]] Mom.",
    tone: "var(--coral)",
  },
  {
    modal: "will be",
    ko: "(아마) ~일 것이다",
    level: 85,
    label: "아주 그럴 것 같아요",
    en: "It [[{will|조동사:(아마) ~일 것이다} be]] Mom.",
    tone: "var(--coral)",
  },
  {
    modal: "should be",
    ko: "(당연히) ~일 것이다",
    level: 72,
    label: "그래야 자연스러워요",
    en: "It [[{should|조동사:(당연히) ~일 것이다} be]] Mom.",
    tone: "var(--amber-ink)",
  },
  {
    modal: "may be · might be · could be",
    ko: "~일지도 모른다",
    level: 45,
    label: "반반이에요",
    en: "It [[{may|조동사:~일지도 모른다} be]] Mom.",
    tone: "var(--sky-ink)",
  },
  {
    modal: "can't be",
    ko: "~일 리가 없다",
    level: 4,
    label: "아니라고 확신해요",
    en: "It [[{can't|조동사:~일 리가 없다} be]] Mom.",
    tone: "var(--ink-3)",
  },
];

/** 추측의 확신 정도: must be → will be → should be → may/might/could be → can't be */
export function MdCertaintyLadder() {
  return (
    <div>
      <p className="text-center text-[15px] font-bold">
        전화벨이 울려요. 엄마일까요? <span className="font-normal text-ink-2">막대는 &lsquo;그렇다고 믿는 정도&rsquo;예요.</span>
      </p>
      <ol className="mt-3 space-y-2">
        {LADDER.map((r) => (
          <li key={r.modal} className="rounded-2xl border border-line px-4 py-3">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
              <span lang="en" className="text-[1.12em] font-extrabold">
                {r.modal}
              </span>
              <span className="text-[14.5px] font-bold text-ink-2">{r.ko}</span>
            </div>
            <div className="mt-2 flex items-center gap-2.5">
              <span className="h-3 flex-1 overflow-hidden rounded-full bg-chip" aria-hidden>
                <span className="block h-3 rounded-full" style={{ width: `${r.level}%`, background: r.tone }} />
              </span>
              <span className="w-28 shrink-0 text-right text-[14px] text-ink-2">{r.label}</span>
            </div>
            <p className="mt-1.5 text-[1.05em] font-medium">
              <En en={r.en} />
            </p>
          </li>
        ))}
      </ol>
      <p className="mt-3 text-center text-[14px] text-ink-2">might는 may보다 살짝 더 자신 없을 때 써요. must be의 반대말은 can&rsquo;t be예요.</p>
    </div>
  );
}

/* ───────── 5. 조동사 + have p.p.: 지금에서 과거 돌아보기 ───────── */

const LOOK_BACK: { form: string; ko: string; kind: "guess" | "regret"; real: string; en: string; enKo: string }[] = [
  {
    form: "must have p.p.",
    ko: "~했음에 틀림없다",
    kind: "guess",
    real: "했다고 거의 확신해요",
    en: "It [[{must|조동사:~였음에 틀림없다} {have|조동사:완료형을 만드는 말} rained]].",
    enKo: "비가 왔던 게 틀림없어.",
  },
  {
    form: "may · might have p.p.",
    ko: "~했을지도 모른다",
    kind: "guess",
    real: "했는지 잘 몰라요",
    en: "It [[{may|조동사:~했을지도 모른다} {have|조동사:완료형을 만드는 말} rained]].",
    enKo: "비가 왔을지도 몰라.",
  },
  {
    form: "can't have p.p.",
    ko: "~했을 리가 없다",
    kind: "guess",
    real: "안 했다고 거의 확신해요",
    en: "It [[{can't|조동사:~했을 리가 없다} {have|조동사:완료형을 만드는 말} rained]].",
    enKo: "비가 왔을 리가 없어.",
  },
  {
    form: "should have p.p.",
    ko: "~했어야 했는데",
    kind: "regret",
    real: "실제로는 안 했어요",
    en: "I [[{should|조동사:~했어야 했는데} {have|조동사:완료형을 만드는 말} left]] earlier.",
    enKo: "더 일찍 나왔어야 했는데.",
  },
  {
    form: "shouldn't have p.p.",
    ko: "~하지 말았어야 했는데",
    kind: "regret",
    real: "실제로는 했어요",
    en: "I [[{shouldn't|조동사:~하지 말았어야 했는데} {have|조동사:완료형을 만드는 말} eaten]] {so|부사:그렇게} much.",
    enKo: "그렇게 많이 먹지 말았어야 했는데.",
  },
  {
    form: "could have p.p.",
    ko: "~할 수도 있었는데",
    kind: "regret",
    real: "실제로는 못 했어요",
    en: "We [[{could|조동사:~할 수도 있었는데} {have|조동사:완료형을 만드는 말} won]].",
    enKo: "우리가 이길 수도 있었는데.",
  },
];

/** 지금 서서 과거를 돌아보는 조동사 + have p.p. 시간선 */
export function MdLookBack() {
  return (
    <div>
      <div className="mx-auto flex max-w-xl items-end gap-2">
        <div className="flex w-20 shrink-0 flex-col items-center text-center">
          <span className="size-5 rounded-full" style={{ background: "var(--sky-ink)" }} aria-hidden />
          <span className="mt-1.5 text-[15px] font-extrabold">과거</span>
          <span className="text-[14px] text-ink-2">이미 지난 일</span>
        </div>
        <svg viewBox="0 0 200 70" className="h-16 min-w-0 flex-1" aria-hidden>
          <path d="M0 58 H200" strokeWidth="2.5" style={{ stroke: "var(--ink-3)" }} />
          <path d="M188 44 C140 4, 60 4, 14 40" fill="none" strokeWidth="3" strokeDasharray="6 6" strokeLinecap="round" style={{ stroke: "var(--coral)" }} />
          <path d="M26 38 L12 42 L18 28" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: "var(--coral)" }} />
        </svg>
        <div className="flex w-20 shrink-0 flex-col items-center text-center">
          <PersonIcon size={30} className="text-coral" />
          <span className="mt-1 text-[15px] font-extrabold text-coral-ink">지금</span>
          <span className="text-[14px] text-ink-2">돌아보며 생각</span>
        </div>
      </div>
      <p className="mt-3 flex flex-wrap items-center justify-center gap-2 text-[15px] font-bold">
        <span className="rounded-lg bg-sky-soft px-2.5 py-1 text-sky-ink">조동사 = 지금의 생각</span>
        <span aria-hidden>+</span>
        <span className="rounded-lg bg-amber-soft px-2.5 py-1 text-amber-ink">have p.p. = 과거의 일</span>
      </p>
      <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
        {LOOK_BACK.map((r) => (
          <li key={r.form} className="rounded-2xl border border-line px-4 py-3">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`rounded-lg px-2 py-0.5 text-[14px] font-extrabold ${
                  r.kind === "guess" ? "bg-sky-soft text-sky-ink" : "bg-coral-soft text-coral-ink"
                }`}
              >
                {r.kind === "guess" ? "추측" : "후회·아쉬움"}
              </span>
              <span lang="en" className="text-[1.08em] font-extrabold">
                {r.form}
              </span>
            </div>
            <p className="mt-1 text-[14.5px] font-bold">
              {r.ko} <span className="font-normal text-ink-2">· {r.real}</span>
            </p>
            <p className="mt-1.5 text-[1.03em] font-medium">
              <En en={r.en} />
            </p>
            <p className="text-[14px] text-ink-2">{r.enKo}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ───────── 6. 주장·요구·제안·명령 + that + 주어 + (should) 동사원형 ───────── */

const SHOULD_VERBS: { group: string; words: { en: string; ko: string }[] }[] = [
  { group: "주장", words: [{ en: "insist", ko: "주장하다" }] },
  {
    group: "요구",
    words: [
      { en: "demand", ko: "요구하다" },
      { en: "require", ko: "요구하다" },
      { en: "request", ko: "요청하다" },
    ],
  },
  {
    group: "제안",
    words: [
      { en: "suggest", ko: "제안하다" },
      { en: "recommend", ko: "권하다" },
      { en: "advise", ko: "충고하다" },
    ],
  },
  { group: "명령", words: [{ en: "{order|동사:명령하다}", ko: "명령하다" }] },
];

const FORMULA: { t: string; tone: string }[] = [
  { t: "주장·요구·제안·명령 동사", tone: "bg-sky-soft text-sky-ink" },
  { t: "that", tone: "border border-line" },
  { t: "주어", tone: "bg-chip" },
  { t: "(should)", tone: "border-2 border-dashed border-ink-3 text-ink-2" },
  { t: "동사원형", tone: "bg-coral text-white" },
];

/** that절이 '~해야 한다'는 내용이면 (should) 동사원형 */
export function MdShouldFormula() {
  return (
    <div>
      <p className="flex flex-wrap items-center justify-center gap-1.5 text-[15px] font-extrabold">
        {FORMULA.map((f, i) => (
          <span key={f.t} className="inline-flex items-center gap-1.5">
            {i > 0 && <span className="text-ink-3" aria-hidden>+</span>}
            <span className={`rounded-lg px-2.5 py-1 ${f.tone}`}>{f.t}</span>
          </span>
        ))}
      </p>
      <div className="mt-4 rounded-2xl bg-chip px-4 py-3">
        <p className="text-[1.08em] font-medium">
          <En en="The doctor [[suggested]] {that|접속사:~라고} he [[(should) rest]]." />
        </p>
        <p className="text-[14px] text-ink-2">의사는 그가 쉬어야 한다고 제안했어.</p>
        <p className="mt-2 text-[14px] text-ink-2">
          주어가 he이고 문장이 과거여도 <b className="text-ink">rests ✕, rested ✕</b>. should를 빼도 원형 rest 그대로예요.
        </p>
      </div>
      <ul className="mt-3 grid gap-2 sm:grid-cols-4">
        {SHOULD_VERBS.map((g) => (
          <li key={g.group} className="rounded-2xl border border-line px-3 py-2.5">
            <p className="text-[14px] font-extrabold text-ink-2">{g.group}</p>
            <ul className="mt-1 space-y-0.5">
              {g.words.map((w) => (
                <li key={w.en} className="text-[15px]">
                  <span className="font-medium">
                    <En en={w.en} />
                  </span>{" "}
                  <span className="text-[14px] text-ink-2">{w.ko}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ───────── 7. So do I / Neither do I ───────── */

type Line = { en: string };

const ECHO_ROWS: { kind: string; pairs: { say: Line; reply: Line }[] }[] = [
  {
    kind: "be동사 문장",
    pairs: [
      { say: { en: "I am hungry." }, reply: { en: "[[{So|부사:~도 그렇다} am I]]." } },
      { say: { en: "I'm not hungry." }, reply: { en: "[[{Neither|부사:~도 아니다} am I]]." } },
    ],
  },
  {
    kind: "조동사 문장",
    pairs: [
      { say: { en: "I can swim." }, reply: { en: "[[{So|부사:~도 그렇다} can I]]." } },
      { say: { en: "I can't swim." }, reply: { en: "[[{Neither|부사:~도 아니다} can I]]." } },
    ],
  },
  {
    kind: "일반동사 문장",
    pairs: [
      { say: { en: "I like cats." }, reply: { en: "[[{So|부사:~도 그렇다} {do|대동사:앞의 동사를 대신해요} I]]." } },
      { say: { en: "I didn't go." }, reply: { en: "[[{Neither|부사:~도 아니다} {did|대동사:앞의 동사를 대신해요} I]]." } },
    ],
  },
];

/** 맞장구: 앞 문장의 동사 종류와 시제를 그대로 따라 해요 */
export function MdSoNeither() {
  return (
    <div>
      <p className="text-center text-[15px] font-bold">
        So(나도 그래) · Neither(나도 아니야) + <span className="text-coral-ink">동사</span> + 주어
      </p>
      <ul className="mt-3 space-y-2.5">
        {ECHO_ROWS.map((row) => (
          <li key={row.kind} className="rounded-2xl border border-line px-4 py-3">
            <p className="text-[14px] font-extrabold text-ink-2">{row.kind}</p>
            <div className="mt-1.5 grid gap-2 sm:grid-cols-2">
              {row.pairs.map((p) => (
                <p key={p.say.en} className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[1.05em] font-medium">
                  <En en={p.say.en} />
                  <ArrowRight size={18} className="text-ink-3" />
                  <span className="rounded-lg bg-coral-soft px-2 py-0.5 text-coral-ink">
                    <En en={p.reply.en} />
                  </span>
                </p>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
