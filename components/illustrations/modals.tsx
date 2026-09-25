import type { ReactNode } from "react";
import { En } from "@/components/lesson/En";
import { ArrowRight, CrownIcon, PersonIcon } from "./icons";

/* 조동사 장 그림: 도우미 조동사, 부정·의문 만들기, must not vs don't have to, 확신 사다리, 과거 돌아보기, should 공식, So do I, 충고의 세기, must의 두 얼굴, not이 붙을 때, have p.p.로 과거 밀기, 후회는 사실과 반대, can·must의 모양 바꾸기, used to, 대동사 */

/* ───────── 공통 도우미 ───────── */

function Mark({ ok }: { ok: boolean }) {
  return (
    <span
      aria-label={ok ? "맞는 문장" : "틀린 문장"}
      className={`grid size-7 shrink-0 place-items-center rounded-full text-[14.5px] font-extrabold ${
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
          <span className="text-[13.5px] font-extrabold text-coral-ink">한 덩어리 진짜 동사</span>
        </span>
        <span className="pb-9">.</span>
      </p>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <div className="rounded-2xl bg-sky-soft px-4 py-3 text-sky-ink">
          <p className="font-extrabold">조동사 can: 도우미</p>
          <p className="text-[13.5px]">&lsquo;~할 수 있다&rsquo;는 뜻을 더해요. 주어가 he여도 모양이 그대로예요.</p>
        </div>
        <div className="rounded-2xl bg-coral-soft px-4 py-3 text-coral-ink">
          <p className="font-extrabold">동사 swim: 동사원형</p>
          <p className="text-[13.5px]">-s, -ed, -ing, to를 붙이지 않은 맨 처음 모양으로 와요.</p>
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
              <span className="block text-[13.5px] text-ink-2">{c.why}</span>
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
            <span className="rounded-lg bg-chip px-2.5 py-1 text-[13.5px] font-extrabold">{row.label}</span>
            <span className="text-[13.5px] text-ink-2">{row.hint}</span>
          </p>
          <p className="mt-2.5 flex flex-wrap items-center gap-1.5 text-[1.2em] font-medium">
            {row.chips.map((c, i) => (
              <span key={i} className={`rounded-lg px-2.5 py-1 ${MOVE_TONE[c.kind ?? "plain"]}`}>
                <En en={c.en} />
              </span>
            ))}
          </p>
          {row.answer && (
            <p className="mt-2 text-[14.5px]">
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
          <span className="block text-[14px] font-bold">{ko}</span>
        </span>
      </div>
      <p className="mt-3 rounded-xl bg-card px-3 py-2 text-ink">
        <span className="block text-[1.05em] font-medium">
          <En en={en} />
        </span>
        <span className="block text-[13.5px] text-ink-2">{enKo}</span>
      </p>
      <p className="mt-2 text-[13.5px]">{sub}</p>
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
        <p className="text-[13.5px] text-ink-2">긍정일 때는 둘 다 &lsquo;~해야 한다&rsquo;</p>
      </div>
      <p className="my-3 text-center text-[14px] font-extrabold text-ink-2">그런데 not이 붙으면 뜻이 갈라져요</p>
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
      <p className="text-center text-[14.5px] font-bold">
        전화벨이 울려요. 엄마일까요? <span className="font-normal text-ink-2">막대는 &lsquo;그렇다고 믿는 정도&rsquo;예요.</span>
      </p>
      <ol className="mt-3 space-y-2">
        {LADDER.map((r) => (
          <li key={r.modal} className="rounded-2xl border border-line px-4 py-3">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
              <span lang="en" className="text-[1.12em] font-extrabold">
                {r.modal}
              </span>
              <span className="text-[14px] font-bold text-ink-2">{r.ko}</span>
            </div>
            <div className="mt-2 flex items-center gap-2.5">
              <span className="h-3 flex-1 overflow-hidden rounded-full bg-chip" aria-hidden>
                <span className="block h-3 rounded-full" style={{ width: `${r.level}%`, background: r.tone }} />
              </span>
              <span className="w-28 shrink-0 text-right text-[13.5px] text-ink-2">{r.label}</span>
            </div>
            <p className="mt-1.5 text-[1.05em] font-medium">
              <En en={r.en} />
            </p>
          </li>
        ))}
      </ol>
      <p className="mt-3 text-center text-[13.5px] text-ink-2">might는 may보다 살짝 더 자신 없을 때 써요. must be의 반대말은 can&rsquo;t be예요.</p>
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
          <span className="mt-1.5 text-[14.5px] font-extrabold">과거</span>
          <span className="text-[13.5px] text-ink-2">이미 지난 일</span>
        </div>
        <svg viewBox="0 0 200 70" className="h-16 min-w-0 flex-1" aria-hidden>
          <path d="M0 58 H200" strokeWidth="2.5" style={{ stroke: "var(--ink-3)" }} />
          <path d="M188 44 C140 4, 60 4, 14 40" fill="none" strokeWidth="3" strokeDasharray="6 6" strokeLinecap="round" style={{ stroke: "var(--coral)" }} />
          <path d="M26 38 L12 42 L18 28" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: "var(--coral)" }} />
        </svg>
        <div className="flex w-20 shrink-0 flex-col items-center text-center">
          <PersonIcon size={30} className="text-coral" />
          <span className="mt-1 text-[14.5px] font-extrabold text-coral-ink">지금</span>
          <span className="text-[13.5px] text-ink-2">돌아보며 생각</span>
        </div>
      </div>
      <p className="mt-3 flex flex-wrap items-center justify-center gap-2 text-[14.5px] font-bold">
        <span className="rounded-lg bg-sky-soft px-2.5 py-1 text-sky-ink">조동사 = 지금의 생각</span>
        <span aria-hidden>+</span>
        <span className="rounded-lg bg-amber-soft px-2.5 py-1 text-amber-ink">have p.p. = 과거의 일</span>
      </p>
      <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
        {LOOK_BACK.map((r) => (
          <li key={r.form} className="rounded-2xl border border-line px-4 py-3">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`rounded-lg px-2 py-0.5 text-[13.5px] font-extrabold ${
                  r.kind === "guess" ? "bg-sky-soft text-sky-ink" : "bg-coral-soft text-coral-ink"
                }`}
              >
                {r.kind === "guess" ? "추측" : "후회·아쉬움"}
              </span>
              <span lang="en" className="text-[1.08em] font-extrabold">
                {r.form}
              </span>
            </div>
            <p className="mt-1 text-[14px] font-bold">
              {r.ko} <span className="font-normal text-ink-2">· {r.real}</span>
            </p>
            <p className="mt-1.5 text-[1.03em] font-medium">
              <En en={r.en} />
            </p>
            <p className="text-[13.5px] text-ink-2">{r.enKo}</p>
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
      <p className="flex flex-wrap items-center justify-center gap-1.5 text-[14.5px] font-extrabold">
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
        <p className="text-[13.5px] text-ink-2">의사는 그가 쉬어야 한다고 제안했어.</p>
        <p className="mt-2 text-[13.5px] text-ink-2">
          주어가 he이고 문장이 과거여도 <b className="text-ink">rests ✕, rested ✕</b>. should를 빼도 원형 rest 그대로예요.
        </p>
      </div>
      <ul className="mt-3 grid gap-2 sm:grid-cols-4">
        {SHOULD_VERBS.map((g) => (
          <li key={g.group} className="rounded-2xl border border-line px-3 py-2.5">
            <p className="text-[13.5px] font-extrabold text-ink-2">{g.group}</p>
            <ul className="mt-1 space-y-0.5">
              {g.words.map((w) => (
                <li key={w.en} className="text-[14.5px]">
                  <span className="font-medium">
                    <En en={w.en} />
                  </span>{" "}
                  <span className="text-[13.5px] text-ink-2">{w.ko}</span>
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
      <p className="text-center text-[14.5px] font-bold">
        So(나도 그래) · Neither(나도 아니야) + <span className="text-coral-ink">동사</span> + 주어
      </p>
      <ul className="mt-3 space-y-2.5">
        {ECHO_ROWS.map((row) => (
          <li key={row.kind} className="rounded-2xl border border-line px-4 py-3">
            <p className="text-[13.5px] font-extrabold text-ink-2">{row.kind}</p>
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

/* ───────── 8. 충고·의무의 세기: must → had better → should ───────── */

const ADVICE: { modal: string; ko: string; feel: string; level: number; tone: string; en: string; enKo: string; full?: boolean }[] = [
  {
    modal: "must",
    ko: "꼭 ~해야 한다",
    feel: "안 하면 큰일 나요",
    level: 100,
    tone: "var(--coral)",
    en: "You [[must]] stop at a {red light|명사:빨간불}.",
    enKo: "빨간불에서는 꼭 멈춰야 해.",
  },
  {
    modal: "had better",
    ko: "~하는 게 좋을 거야",
    feel: "안 하면 곤란해질걸 (경고)",
    level: 72,
    tone: "var(--amber-ink)",
    en: "You [[{had better}]] hurry, {or|접속사:그렇지 않으면} you'll miss the bus.",
    enKo: "서두르는 게 좋을 거야, 안 그러면 버스 놓쳐.",
    full: true,
  },
  {
    modal: "should",
    ko: "~하는 게 좋겠다",
    feel: "그러면 좋겠어 (부드러운 충고)",
    level: 45,
    tone: "var(--sky-ink)",
    en: "You [[should]] ask your teacher.",
    enKo: "선생님께 여쭤보는 게 좋겠어.",
  },
];

/** 해야 한다는 말의 세기. withHadBetter를 주면 had better까지 세 칸 */
export function MdAdviceScale({ withHadBetter = false }: { withHadBetter?: boolean }) {
  const rows = ADVICE.filter((r) => withHadBetter || !r.full);
  return (
    <div>
      <p className="flex items-center justify-between text-[13.5px] font-extrabold text-ink-2">
        <span>세게</span>
        <span aria-hidden className="mx-2 h-px flex-1 bg-line" />
        <span>부드럽게</span>
      </p>
      <ol className="mt-2 space-y-2">
        {rows.map((r) => (
          <li key={r.modal} className="rounded-2xl border border-line px-4 py-3">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
              <span lang="en" className="text-[1.12em] font-extrabold">
                {r.modal}
              </span>
              <span className="text-[14px] font-bold text-ink-2">{r.ko}</span>
            </div>
            <div className="mt-2 flex items-center gap-2.5">
              <span className="h-3 flex-1 overflow-hidden rounded-full bg-chip" aria-hidden>
                <span className="block h-3 rounded-full" style={{ width: `${r.level}%`, background: r.tone }} />
              </span>
              <span className="w-32 shrink-0 text-right text-[13.5px] text-ink-2">{r.feel}</span>
            </div>
            <p className="mt-1.5 text-[1.05em] font-medium">
              <En en={r.en} />
            </p>
            <p className="text-[13.5px] text-ink-2">{r.enKo}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ───────── 9. must의 두 얼굴: 의무 vs 추측 ───────── */

function RuleBoardIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden style={{ stroke: "var(--sky-ink)" }}>
      <rect x="5" y="3.5" width="14" height="18" rx="2" />
      <path d="M8.5 8.5h7M8.5 12.5h7M8.5 16.5h4" />
    </svg>
  );
}

function MagnifierIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" strokeWidth="2.4" strokeLinecap="round" aria-hidden style={{ stroke: "var(--coral-ink)" }}>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.5 15.5 20.5 20.5" />
    </svg>
  );
}

const TWO_MUSTS: {
  key: string;
  icon: ReactNode;
  title: string;
  ko: string;
  tone: string;
  clues: string[];
  en: string;
  enKo: string;
  neg: { en: string; ko: string };
}[] = [
  {
    key: "duty",
    icon: <RuleBoardIcon />,
    title: "의무의 must",
    ko: "~해야 한다",
    tone: "bg-sky-soft text-sky-ink",
    clues: ["규칙, 꼭 할 일을 말해요", "뒤에 finish, wear, clean 같은 동작 동사가 많아요"],
    en: "Students [[{must|조동사:~해야 한다} {turn off}]] their phones in class.",
    enKo: "학생들은 수업 중에 휴대폰을 꺼야 해.",
    neg: { en: "[[must not]]", ko: "~하면 안 된다 (금지)" },
  },
  {
    key: "guess",
    icon: <MagnifierIcon />,
    title: "추측의 must",
    ko: "틀림없이 ~이다",
    tone: "bg-coral-soft text-coral-ink",
    clues: ["눈앞의 증거를 보고 짐작해요", "뒤에 be, know, love, have(가지다) 같은 상태 동사가 많아요"],
    en: "Her eyes are red. She [[{must|조동사:~임에 틀림없다} be]] sleepy.",
    enKo: "눈이 빨개. 졸린 게 틀림없어.",
    neg: { en: "[[{can't|조동사:~일 리가 없다} be]]", ko: "~일 리가 없다" },
  },
];

/** must는 두 얼굴: 규칙을 말하면 의무, 증거로 짐작하면 추측. 반대말도 서로 달라요 */
export function MdTwoMusts() {
  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2">
        {TWO_MUSTS.map((m) => (
          <div key={m.key} className="flex flex-col rounded-2xl border border-line">
            <div className={`flex items-center gap-2.5 rounded-t-2xl px-4 py-2.5 ${m.tone}`}>
              {m.icon}
              <span>
                <span className="block font-extrabold">{m.title}</span>
                <span className="block text-[13.5px] font-bold">{m.ko}</span>
              </span>
            </div>
            <div className="grid flex-1 content-start gap-2 px-4 py-3">
              <ul className="grid gap-1 text-[14px]">
                {m.clues.map((c) => (
                  <li key={c} className="flex gap-1.5">
                    <span aria-hidden className="text-ink-3">
                      ·
                    </span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
              <p className="rounded-xl bg-chip px-3 py-2">
                <span className="block text-[1.03em] font-medium">
                  <En en={m.en} />
                </span>
                <span className="block text-[13.5px] text-ink-2">{m.enKo}</span>
              </p>
              <p className="text-[14px]">
                <span className="mr-1.5 rounded-md bg-chip px-1.5 py-0.5 text-[13.5px] font-extrabold text-ink-2">반대말</span>
                <span className="font-medium">
                  <En en={m.neg.en} />
                </span>{" "}
                <span className="text-[13.5px] text-ink-2">{m.neg.ko}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 text-center text-[13.5px] text-ink-2">마지막 판단은 언제나 문맥이에요. be가 와도 규칙을 말하면 의무예요.</p>
    </div>
  );
}

/* ───────── 10. not이 붙으면: may not be는 그대로 약하게, couldn't be는 확 세게 ───────── */

type NotStep = { form: string; ko: string; level: number; tone: string };

const NOT_SHIFTS: { key: string; title: string; from: NotStep; to: NotStep; en: string; enKo: string }[] = [
  {
    key: "may",
    title: "may + not: 여전히 약해요",
    from: { form: "may be", ko: "~일지도 몰라", level: 45, tone: "var(--sky-ink)" },
    to: { form: "may not be", ko: "~이 아닐지도 몰라", level: 45, tone: "var(--sky-ink)" },
    en: "It [[{may|조동사:~일지도 모른다} not be]] true.",
    enKo: "그건 사실이 아닐지도 몰라.",
  },
  {
    key: "could",
    title: "could + not: 확 세져요",
    from: { form: "could be", ko: "~일 수도 있어", level: 40, tone: "var(--sky-ink)" },
    to: { form: "couldn't be", ko: "~일 리가 없어 (= can't be)", level: 95, tone: "var(--coral)" },
    en: "It [[{couldn't|조동사:~일 리가 없다} be]] true.",
    enKo: "그게 사실일 리가 없어.",
  },
];

function NotBar({ step }: { step: NotStep }) {
  return (
    <div>
      <p className="flex flex-wrap items-baseline justify-between gap-x-2">
        <span lang="en" className="font-extrabold">
          {step.form}
        </span>
        <span className="text-[13.5px] text-ink-2">{step.ko}</span>
      </p>
      <span className="mt-1 block h-3 overflow-hidden rounded-full bg-chip" aria-hidden>
        <span className="block h-3 rounded-full" style={{ width: `${step.level}%`, background: step.tone }} />
      </span>
    </div>
  );
}

/** not 하나로 확신의 세기가 달라지는 두 경우. 막대는 확신의 세기 */
export function MdNotShift() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {NOT_SHIFTS.map((s) => (
        <div key={s.key} className="rounded-2xl border border-line px-4 py-3">
          <p className="font-extrabold">{s.title}</p>
          <div className="mt-2.5 grid gap-1.5">
            <NotBar step={s.from} />
            <p className="text-center text-[13.5px] font-extrabold text-ink-3">↓ not</p>
            <NotBar step={s.to} />
          </div>
          <p className="mt-3 text-[1.03em] font-medium">
            <En en={s.en} />
          </p>
          <p className="text-[13.5px] text-ink-2">{s.enKo}</p>
        </div>
      ))}
    </div>
  );
}

/* ───────── 11. 왜 have p.p.? be 자리를 have been으로 ───────── */

type ShiftChip = { en: string; kind?: "modal" | "have" };

const SHIFT_TONE: Record<NonNullable<ShiftChip["kind"]> | "plain", string> = {
  modal: "bg-sky-soft text-sky-ink",
  have: "bg-amber-soft text-amber-ink",
  plain: "border border-line",
};

const PAST_SHIFT: { label: string; chips: ShiftChip[]; ko: string }[] = [
  {
    label: "지금에 대한 추측",
    chips: [{ en: "She" }, { en: "{must|조동사:~임에 틀림없다}", kind: "modal" }, { en: "be", kind: "have" }, { en: "busy." }],
    ko: "그녀는 (지금) 바쁜 게 틀림없어.",
  },
  {
    label: "과거에 대한 추측",
    chips: [
      { en: "She" },
      { en: "{must|조동사:~였음에 틀림없다}", kind: "modal" },
      { en: "{have|조동사:완료형을 만드는 말} been", kind: "have" },
      { en: "busy." },
    ],
    ko: "그녀는 (그때) 바빴던 게 틀림없어.",
  },
];

const PAST_WRONG: { en: string }[] = [{ en: "She must was busy." }, { en: "It must rained." }];

function ShiftRow({ row }: { row: (typeof PAST_SHIFT)[number] }) {
  return (
    <div className="rounded-2xl border border-line px-4 py-3">
      <p className="text-[13.5px] font-extrabold text-ink-2">{row.label}</p>
      <p className="mt-2 flex flex-wrap items-center gap-1.5 text-[1.15em] font-medium">
        {row.chips.map((c, i) => (
          <span key={i} className={`rounded-lg px-2.5 py-1 ${SHIFT_TONE[c.kind ?? "plain"]}`}>
            <En en={c.en} />
          </span>
        ))}
      </p>
      <p className="mt-1.5 text-[13.5px] text-ink-2">{row.ko}</p>
    </div>
  );
}

/** 조동사 뒤에는 과거형을 못 쓰니, 원형 have + p.p.로 시간을 한 칸 과거로 민다 */
export function MdPastShift() {
  return (
    <div>
      <ShiftRow row={PAST_SHIFT[0]} />
      <p className="my-2 text-center text-[14px] font-extrabold text-amber-ink">↓ be → have been · 시간을 한 칸 과거로</p>
      <ShiftRow row={PAST_SHIFT[1]} />
      <div className="mt-3 rounded-2xl bg-coral-soft px-4 py-3 text-coral-ink">
        <p className="text-[13.5px] font-extrabold">과거형을 바로 붙이면 ✕</p>
        <ul className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
          {PAST_WRONG.map((w) => (
            <li key={w.en} className="text-[1.03em] font-medium text-ink-2 line-through decoration-coral/60">
              <En en={w.en} />
            </li>
          ))}
        </ul>
        <p className="mt-1 text-[13.5px]">조동사 뒤에는 원형만 와요. 그래서 원형 have를 세우고 p.p.를 붙여요.</p>
      </div>
    </div>
  );
}

/* ───────── 12. 후회·아쉬움은 사실과 반대 ───────── */

const REGRET_FLIPS: { form: string; en: string; ko: string; real: string; did: boolean }[] = [
  {
    form: "should have p.p.",
    en: "I [[{should|조동사:~했어야 했는데} {have|조동사:완료형을 만드는 말} brought]] a jacket.",
    ko: "재킷을 가져왔어야 했는데.",
    real: "안 가져왔어요. 그래서 추웠어요.",
    did: false,
  },
  {
    form: "shouldn't have p.p.",
    en: "I [[{shouldn't|조동사:~하지 말았어야 했는데} {have|조동사:완료형을 만드는 말} watched]] the scary movie.",
    ko: "그 무서운 영화를 보지 말았어야 했는데.",
    real: "봤어요. 그래서 잠을 설쳤어요.",
    did: true,
  },
  {
    form: "could have p.p.",
    en: "We [[{could|조동사:~할 수도 있었는데} {have|조동사:완료형을 만드는 말} {caught|동사:(버스를) 잡아탔다 (catch의 과거분사)}]] the bus.",
    ko: "우리가 그 버스를 탈 수도 있었는데.",
    real: "못 탔어요. 조금 늦었거든요.",
    did: false,
  },
];

/** 말은 '그랬어야 했는데', 실제는 그 반대 */
export function MdRegretFlip() {
  return (
    <ul className="space-y-2.5">
      {REGRET_FLIPS.map((r) => (
        <li key={r.form} className="grid gap-2 rounded-2xl border border-line px-3 py-3 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,0.8fr)] sm:items-center">
          <div className="rounded-xl bg-coral-soft px-3 py-2">
            <p lang="en" className="text-[13.5px] font-extrabold text-coral-ink">
              말: {r.form}
            </p>
            <p className="text-[1.03em] font-medium">
              <En en={r.en} />
            </p>
            <p className="text-[13.5px] text-ink-2">{r.ko}</p>
          </div>
          <p className="text-center text-[13.5px] font-extrabold text-ink-3">
            <span className="sm:hidden">↓ </span>반대<span className="hidden sm:inline"> ⇄</span>
          </p>
          <div className="flex items-center gap-2.5 rounded-xl bg-chip px-3 py-2">
            <Mark ok={r.did} />
            <span>
              <span className="block text-[13.5px] font-extrabold text-ink-2">실제로는</span>
              <span className="block text-[14px] font-bold">{r.real}</span>
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}

/* ───────── 13. can·must는 그대로, be able to·have to는 모양이 바뀐다 ───────── */

type FormCell = { en?: string; ok?: boolean; note?: string };

function FormGrid({ heads, rows }: { heads: [string, string, string, string]; rows: { label: string; a: FormCell; b: FormCell }[] }) {
  return (
    <div>
      <div className="grid grid-cols-2 gap-2 text-center">
        <p className="rounded-2xl bg-sky-soft px-2 py-2 text-sky-ink">
          <span lang="en" className="block font-extrabold">
            {heads[0]}
          </span>
          <span className="block text-[13.5px] font-bold">{heads[1]}</span>
        </p>
        <p className="rounded-2xl bg-mint-soft px-2 py-2 text-mint-ink">
          <span lang="en" className="block font-extrabold">
            {heads[2]}
          </span>
          <span className="block text-[13.5px] font-bold">{heads[3]}</span>
        </p>
      </div>
      <ul className="mt-2 space-y-2">
        {rows.map((r) => (
          <li key={r.label} className="rounded-2xl border border-line px-3 py-2.5">
            <p className="text-center text-[13.5px] font-extrabold text-ink-2">{r.label}</p>
            <div className="mt-1 grid grid-cols-2 gap-2">
              {[r.a, r.b].map((c, i) => (
                <p key={i} className="text-[1.02em] font-medium">
                  {c.ok === false && (
                    <span aria-label="틀린 문장" className="mr-1 font-extrabold text-coral-ink">
                      ✕
                    </span>
                  )}
                  {c.en && (
                    <span className={c.ok === false ? "text-ink-2 line-through decoration-coral/60" : ""}>
                      <En en={c.en} />
                    </span>
                  )}
                  {c.note && <span className="block text-[13.5px] font-normal text-ink-2">{c.note}</span>}
                </p>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** can은 모양이 그대로, be able to는 be가 주어·시제에 맞춰 바뀌어 will 뒤에도 선다 */
export function MdCanForms() {
  return (
    <FormGrid
      heads={["can", "조동사: 모양이 그대로", "be able to", "be가 주어·시제에 맞춰 바뀌어요"]}
      rows={[
        { label: "지금 · 주어 he", a: { en: "He [[can]] swim." }, b: { en: "He [[{is able to}]] swim." } },
        { label: "과거", a: { en: "He [[could]] swim." }, b: { en: "He [[{was able to}]] swim." } },
        {
          label: "미래",
          a: { en: "He will can swim.", ok: false, note: "조동사 두 개는 ✕" },
          b: { en: "He [[will {be able to}]] swim." },
        },
      ]}
    />
  );
}

/** must는 모양이 그대로, have to는 일반동사처럼 has to · had to · do 의문문 */
export function MdMustForms() {
  return (
    <FormGrid
      heads={["must", "조동사: 모양이 그대로", "have to", "일반동사처럼 바뀌어요"]}
      rows={[
        { label: "지금 · 주어 she", a: { en: "She [[must]] go." }, b: { en: "She [[{has to}]] go." } },
        {
          label: "과거",
          a: { note: "과거형이 없어요. had to를 빌려 써요" },
          b: { en: "She [[{had to}]] go." },
        },
        {
          label: "미래",
          a: { en: "She will must go.", ok: false, note: "조동사 두 개는 ✕" },
          b: { en: "She [[will {have to}]] go." },
        },
        {
          label: "의문문",
          a: { en: "[[Must]] she go?" },
          b: { en: "[[{Does|조동사:의문문을 만드는 말}]] she [[{have to}]] go?" },
        },
      ]}
    />
  );
}

/* ───────── 14. used to: 예전엔 그랬고 지금은 아니다 ───────── */

const USED_TO_ROWS: { en: string; ko: string; then: string; now: string; kind: string }[] = [
  {
    en: "I [[{used to} {get up}]] {late|부사:늦게} on weekends.",
    ko: "나는 예전엔 주말마다 늦게 일어났어.",
    then: "주말마다 늦잠",
    now: "지금은 일찍 일어나요",
    kind: "습관 (동작)",
  },
  {
    en: "I [[{used to} have]] long hair.",
    ko: "나는 예전에 머리가 길었어.",
    then: "머리가 길었어요",
    now: "지금은 짧아요",
    kind: "상태",
  },
];

/** used to는 예전(✓)과 지금(✕) 사이에 선을 긋는다 */
export function MdUsedTo() {
  return (
    <div>
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 text-center">
        <p className="rounded-2xl bg-mint-soft px-2 py-2.5 text-mint-ink">
          <span className="block font-extrabold">예전 ✓</span>
          <span className="block text-[13.5px] font-bold">그랬어요</span>
        </p>
        <ArrowRight size={20} className="text-ink-3" />
        <p className="rounded-2xl bg-coral-soft px-2 py-2.5 text-coral-ink">
          <span className="block font-extrabold">지금 ✕</span>
          <span className="block text-[13.5px] font-bold">지금은 아니에요</span>
        </p>
      </div>
      <ul className="mt-3 space-y-2">
        {USED_TO_ROWS.map((r) => (
          <li key={r.kind} className="rounded-2xl border border-line px-4 py-3">
            <p className="w-fit rounded-md bg-chip px-2 py-0.5 text-[13.5px] font-extrabold text-ink-2">{r.kind}</p>
            <p className="mt-1.5 text-[1.05em] font-medium">
              <En en={r.en} />
            </p>
            <p className="text-[13.5px] text-ink-2">{r.ko}</p>
            <div className="mt-2 grid grid-cols-2 gap-2 text-[13.5px] font-bold">
              <span className="rounded-lg bg-mint-soft px-2 py-1 text-mint-ink">예전: {r.then}</span>
              <span className="rounded-lg bg-coral-soft px-2 py-1 text-coral-ink">{r.now}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ───────── 15. 대동사 do: 앞의 동사 덩어리를 대신 ───────── */

const STAND_IN_RULES: { from: string; to: string; en: string; ko: string }[] = [
  { from: "be동사", to: "be동사로", en: "I'm tired, and Jisu [[is]], too.", ko: "나 피곤해. 지수도 그래." },
  { from: "조동사", to: "조동사로", en: "I can whistle, and my brother [[can]], too.", ko: "나는 휘파람을 불 수 있어. 형도 그래." },
  {
    from: "일반동사",
    to: "do · does · did로",
    en: "I walked to school, and Minsu [[{did|대동사:= walked to school}]], too.",
    ko: "나는 걸어서 학교에 갔어. 민수도 그랬어.",
  },
];

/** 되풀이되는 동사 덩어리를 대동사 한 단어가 받는다. 받는 말은 앞 동사의 종류를 따라간다 */
export function MdStandIn() {
  return (
    <div>
      <div className="rounded-2xl border border-line px-4 py-3">
        <p className="text-[13.5px] font-extrabold text-ink-3">되풀이하면 길어요</p>
        <p className="mt-1 text-[1.05em] font-medium">
          <En en="My dad drinks coffee, and my mom drinks coffee, too." />
        </p>
        <p className="mt-3 text-[13.5px] font-extrabold text-ink-3">대동사로 받으면</p>
        <p className="mt-1 text-[1.05em] font-medium leading-loose">
          <En en="My dad" />{" "}
          <span className="rounded-lg bg-sky-soft px-1.5 py-0.5 text-sky-ink">
            <En en="drinks coffee" />
          </span>
          <En en=", and my mom" />{" "}
          <span className="rounded-lg bg-coral px-1.5 py-0.5 text-white">
            <En en="{does|대동사:= drinks coffee}" />
          </span>
          <En en=", too." />
        </p>
        <p className="mt-2 w-fit rounded-lg bg-chip px-2.5 py-1 text-[13.5px] font-bold">
          does = drinks coffee · 주어 my mom(3인칭 단수)과 현재에 맞춰 does
        </p>
      </div>
      <p className="mt-3 text-center text-[14px] font-extrabold text-ink-2">받는 말은 앞 동사의 종류를 따라가요</p>
      <ul className="mt-2 grid gap-2 sm:grid-cols-3">
        {STAND_IN_RULES.map((r) => (
          <li key={r.from} className="rounded-2xl border border-line px-3 py-2.5">
            <p className="text-[13.5px] font-extrabold">
              <span className="text-ink-2">앞이 {r.from}</span> → <span className="text-coral-ink">{r.to}</span>
            </p>
            <p className="mt-1 text-[1.02em] font-medium">
              <En en={r.en} />
            </p>
            <p className="text-[13.5px] text-ink-2">{r.ko}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
