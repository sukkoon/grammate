import { En } from "@/components/lesson/En";
import { ArrowRight, CrownIcon, MaskIcon } from "./icons";

/* 동명사 장 그림. 휴대폰(375px)에서도 글씨가 14px 아래로 내려가지 않도록 HTML 격자와 작은 SVG로 그린다.
   색 약속: 동명사(-ing) = sky, to부정사(to) = amber, 진짜 동사 = coral */

const ink = { fill: "var(--ink)" } as const;
const ink2 = { fill: "var(--ink-2)" } as const;

/* ───────── 동명사가 설 수 있는 네 자리 ───────── */

const SEATS: { n: string; seat: string; hint: string; en: string; ko: string; king: string }[] = [
  { n: "①", seat: "주어 자리", hint: "~하는 것은, ~하기는", en: "[[{Swimming|동명사:수영하기}]] is fun.", ko: "수영은 재미있어.", king: "is" },
  { n: "②", seat: "목적어 자리", hint: "~하는 것을", en: "I enjoy [[{reading|동명사:읽기, 읽는 것}]].", ko: "나는 독서를 즐겨.", king: "enjoy" },
  { n: "③", seat: "보어 자리", hint: "~하는 것이다", en: "My hobby is [[{drawing|동명사:그리기}]].", ko: "내 취미는 그리기야.", king: "is" },
  { n: "④", seat: "전치사 뒤", hint: "전치사의 목적어", en: "I'm good at [[{cooking|동명사:요리하기}]].", ko: "나는 요리를 잘해.", king: "'m (= am)" },
];

/** 동명사가 앉을 수 있는 네 자리: 주어·목적어·보어·전치사 뒤 */
export function GdSeats() {
  return (
    <div>
      <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-2xl bg-sky-soft px-4 py-2.5 text-center text-[14.5px] font-extrabold text-sky-ink">
        <MaskIcon size={24} className="text-sky-ink" />
        동사 + -ing = 명사로 변장 → 명사 자리라면 어디든!
      </p>
      <ol className="mt-3 grid gap-3 sm:grid-cols-2">
        {SEATS.map((s) => (
          <li key={s.n} className="rounded-2xl border border-line px-4 py-3">
            <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="rounded-lg bg-sky-soft px-2.5 py-1 text-[13.5px] font-extrabold text-sky-ink">
                {s.n} {s.seat}
              </span>
              <span className="text-[13.5px] text-ink-2">{s.hint}</span>
            </p>
            <p className="mt-2 text-[1.12em] font-medium">
              <En en={s.en} />
            </p>
            <p className="text-[13.5px] text-ink-2">{s.ko}</p>
            <p className="mt-2 flex flex-wrap items-center gap-1.5 text-[13.5px]">
              <CrownIcon size={18} className="text-coral" />
              <span className="font-extrabold text-coral-ink">진짜 동사</span>
              <span lang="en" className="rounded-md bg-coral px-2 py-0.5 font-bold text-white">
                {s.king}
              </span>
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ───────── 진짜 동사가 고르는 변장: 네 바구니 ───────── */

const BINS: { title: string; sub: string; tone: string; verbs: { en: string }[]; ex: { en: string; ko: string } }[] = [
  {
    title: "-ing만",
    sub: "동명사만 받아요",
    tone: "bg-sky-soft text-sky-ink",
    verbs: [
      { en: "enjoy" },
      { en: "finish" },
      { en: "mind" },
      { en: "avoid" },
      { en: "{give up}" },
      { en: "keep" },
      { en: "practice" },
      { en: "quit" },
      { en: "consider" },
      { en: "suggest" },
    ],
    ex: { en: "I enjoy [[{reading|동명사:읽기, 읽는 것}]].", ko: "나는 독서를 즐겨." },
  },
  {
    title: "to만",
    sub: "to부정사만 받아요",
    tone: "bg-amber-soft text-amber-ink",
    verbs: [
      { en: "want" },
      { en: "hope" },
      { en: "plan" },
      { en: "decide" },
      { en: "expect" },
      { en: "{promise|동사:약속하다}" },
      { en: "agree" },
      { en: "refuse" },
      { en: "learn" },
      { en: "need" },
    ],
    ex: { en: "I want [[to go]] home.", ko: "집에 가고 싶어." },
  },
  {
    title: "둘 다 · 뜻 같음",
    sub: "-ing도 to도 괜찮아요",
    tone: "bg-mint-soft text-mint-ink",
    verbs: [{ en: "like" }, { en: "love" }, { en: "hate" }, { en: "begin" }, { en: "start" }, { en: "continue" }],
    ex: { en: "It started [[{raining|동명사:비가 오기}]]. = It started [[to rain]].", ko: "비가 오기 시작했어." },
  },
  {
    title: "둘 다 · 뜻 다름",
    sub: "-ing는 한 일, to는 할 일",
    tone: "bg-coral-soft text-coral-ink",
    verbs: [{ en: "remember" }, { en: "forget" }, { en: "regret" }, { en: "try" }, { en: "stop" }],
    ex: { en: "I remember [[{meeting|동명사:만난 것}]] her. / [[Remember to call]] her.", ko: "그녀를 만난 게 기억나. / 잊지 말고 그녀에게 전화해." },
  },
];

/** 목적어로 무엇을 받느냐에 따라 동사를 네 바구니에 나눠 담는다 */
export function GdVerbBins() {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {BINS.map((b) => (
        <li key={b.title} className="rounded-2xl border border-line px-4 py-4">
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className={`rounded-lg px-2.5 py-1 text-[14.5px] font-extrabold ${b.tone}`}>{b.title}</span>
            <span className="text-[13.5px] text-ink-2">{b.sub}</span>
          </p>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {b.verbs.map((v) => (
              <li key={v.en} className={`rounded-lg px-2 py-1 text-[14.5px] font-bold ${b.tone}`}>
                <En en={v.en} />
              </li>
            ))}
          </ul>
          <p className="mt-3 border-t border-line pt-3 text-[1.02em] font-medium">
            <En en={b.ex.en} />
          </p>
          <p className="text-[13.5px] text-ink-2">{b.ex.ko}</p>
        </li>
      ))}
    </ul>
  );
}

/* ───────── -ing는 뒤를 돌아보고, to는 앞을 바라본다 ───────── */

const PAIRS: { en: string; ing: string; to: string }[] = [
  { en: "remember", ing: "~한 것을 기억하다", to: "~할 것을 기억하다" },
  { en: "forget", ing: "~한 것을 잊다", to: "~할 것을 잊다" },
  { en: "regret", ing: "~한 것을 후회하다", to: "~하게 되어 유감이다" },
  { en: "try", ing: "시험 삼아 ~해 보다", to: "~하려고 애쓰다" },
  { en: "stop", ing: "하던 ~을 멈추다", to: "~하려고 멈추다" },
];

/** 시간 방향: 진짜 동사의 때를 기준으로 -ing는 과거 쪽, to는 미래 쪽 */
export function GdTimeArrow() {
  return (
    <div>
      <svg viewBox="0 0 360 132" className="mx-auto w-full max-w-xl" role="img" aria-label="-ing는 과거 쪽을 돌아보고, to는 미래 쪽을 바라봐요">
        <path d="M14 72 H346" strokeWidth="2" style={{ stroke: "var(--line)" }} />
        {/* -ing: 왼쪽(과거)으로 */}
        <path d="M166 72 H34" strokeWidth="5" strokeLinecap="round" style={{ stroke: "var(--sky-ink)" }} />
        <path d="M46 62 L32 72 L46 82" fill="none" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: "var(--sky-ink)" }} />
        <text x="96" y="44" textAnchor="middle" fontSize="16" fontWeight="800" style={{ fill: "var(--sky-ink)" }}>
          -ing: 뒤를 봐요
        </text>
        <text x="96" y="106" textAnchor="middle" fontSize="15" style={ink2}>
          이미 한 일
        </text>
        {/* to: 오른쪽(미래)으로 */}
        <path d="M194 72 H326" strokeWidth="5" strokeLinecap="round" style={{ stroke: "var(--amber-ink)" }} />
        <path d="M314 62 L328 72 L314 82" fill="none" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: "var(--amber-ink)" }} />
        <text x="264" y="44" textAnchor="middle" fontSize="16" fontWeight="800" style={{ fill: "var(--amber-ink)" }}>
          to: 앞을 봐요
        </text>
        <text x="264" y="106" textAnchor="middle" fontSize="15" style={ink2}>
          앞으로 할 일
        </text>
        {/* 가운데: 진짜 동사의 때 */}
        <rect x="175" y="54" width="10" height="36" rx="5" style={{ fill: "var(--coral)" }} />
        <text x="180" y="126" textAnchor="middle" fontSize="15" fontWeight="800" style={{ fill: "var(--coral-ink)" }}>
          진짜 동사
        </text>
        <text x="180" y="22" textAnchor="middle" fontSize="15" fontWeight="700" style={ink}>
          지금 이 순간
        </text>
      </svg>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
        {PAIRS.map((p) => (
          <li key={p.en} className="rounded-xl border border-line px-3 py-2.5">
            <p className="text-[1.08em] font-extrabold">
              <En en={p.en} />
            </p>
            <div className="mt-1.5 grid grid-cols-2 gap-2 text-[13.5px]">
              <span className="rounded-lg bg-sky-soft px-2 py-1.5 text-sky-ink">
                <b lang="en">-ing</b> {p.ing}
              </span>
              <span className="rounded-lg bg-amber-soft px-2 py-1.5 text-amber-ink">
                <b lang="en">to</b> {p.to}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ───────── stop -ing vs stop to ───────── */

type Step = { t: string; tag: string; tone: string };

const STOP_WAYS: { title: string; sub: string; steps: Step[]; en: string; ko: string }[] = [
  {
    title: "stop + -ing",
    sub: "하던 일을 멈춰요",
    steps: [
      { t: "달리는 중", tag: "하던 일 (-ing)", tone: "bg-sky-soft text-sky-ink" },
      { t: "멈춤", tag: "진짜 동사 stop", tone: "bg-coral text-white" },
    ],
    en: "Minsu [[stopped {running|동명사:달리기}]].",
    ko: "민수는 달리기를 멈췄어. (이제 안 달려요)",
  },
  {
    title: "stop + to",
    sub: "~하려고 멈춰요",
    steps: [
      { t: "달리는 중", tag: "하던 일", tone: "bg-chip text-ink-2" },
      { t: "멈춤", tag: "진짜 동사 stop", tone: "bg-coral text-white" },
      { t: "물 마시기", tag: "다음에 할 일 (to)", tone: "bg-amber-soft text-amber-ink" },
    ],
    en: "Minsu [[stopped]] [[to drink]] water.",
    ko: "민수는 물을 마시려고 멈췄어. (멈춘 다음에 마셔요)",
  },
];

function StepChip({ step }: { step: Step }) {
  return (
    <span className="inline-flex flex-col items-center gap-1">
      <span className={`rounded-xl px-3 py-1.5 text-[14.5px] font-extrabold ${step.tone}`}>{step.t}</span>
      <span className="text-[13.5px] text-ink-2">{step.tag}</span>
    </span>
  );
}

/** stop -ing(하던 일을 멈춤)와 stop to(다음 일을 하려고 멈춤)를 차례대로 보여 준다 */
export function GdStopTwoWays() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {STOP_WAYS.map((w) => (
        <div key={w.title} className="rounded-2xl border border-line px-4 py-4">
          <p className="flex flex-wrap items-baseline gap-x-2">
            <span lang="en" className="text-[1.15em] font-extrabold">
              {w.title}
            </span>
            <span className="text-[13.5px] text-ink-2">{w.sub}</span>
          </p>
          <div className="mt-3 flex flex-wrap items-start gap-x-1.5 gap-y-2">
            {w.steps.map((s, i) => (
              <span key={s.t + i} className="inline-flex items-start gap-1.5">
                {i > 0 && <ArrowRight size={18} className="mt-2 text-ink-3" />}
                <StepChip step={s} />
              </span>
            ))}
          </div>
          <p className="mt-3 border-t border-line pt-3 text-[1.05em] font-medium">
            <En en={w.en} />
          </p>
          <p className="text-[13.5px] text-ink-2">{w.ko}</p>
        </div>
      ))}
    </div>
  );
}

/* ───────── 의미상 주어: 그 일은 누가 하나 ───────── */

const DOERS: { en: string; ko: string; verbWho: string; ingWho: string; same: boolean; result: string }[] = [
  {
    en: "I don't mind [[{opening|동명사:여는 것}]] the window.",
    ko: "나는 창문 여는 거 괜찮아.",
    verbWho: "I",
    ingWho: "I",
    same: true,
    result: "같아요 → 따로 밝히지 않아요",
  },
  {
    en: "Do you mind [[my {opening|동명사:여는 것}]] the window?",
    ko: "제가 창문을 열어도 될까요?",
    verbWho: "you",
    ingWho: "나 (my)",
    same: false,
    result: "달라요 → 동명사 앞에 my를 붙여요",
  },
];

/** 진짜 동사의 주어와 동명사의 주인(의미상 주어)을 나란히 비교한다 */
export function GdDoerTag() {
  return (
    <ul className="space-y-3">
      {DOERS.map((d) => (
        <li key={d.en} className="rounded-2xl border border-line px-4 py-3">
          <p className="text-[1.1em] font-medium">
            <En en={d.en} />
          </p>
          <p className="text-[13.5px] text-ink-2">{d.ko}</p>
          <div className="mt-2.5 flex flex-wrap gap-2 text-[13.5px]">
            <span className="rounded-lg bg-coral-soft px-2.5 py-1 font-bold text-coral-ink">
              꺼리는 사람 (<span lang="en">mind</span>의 주어): <span lang="en">{d.verbWho}</span>
            </span>
            <span className="rounded-lg bg-sky-soft px-2.5 py-1 font-bold text-sky-ink">
              여는 사람 (<span lang="en">opening</span>의 주인): <span lang="en">{d.ingWho}</span>
            </span>
          </div>
          <p className={`mt-2 text-[13.5px] font-extrabold ${d.same ? "text-ink-2" : "text-coral-ink"}`}>{d.result}</p>
        </li>
      ))}
    </ul>
  );
}

/* ───────── to의 두 얼굴: to부정사의 to vs 전치사 to ───────── */

const TO_PREP_LIST: { en: string; ko: string }[] = [
  { en: "{look forward to}", ko: "~하기를 몹시 기다리다" },
  { en: "{be used to}", ko: "~에 익숙하다" },
  { en: "{object to}", ko: "~에 반대하다" },
  { en: "{when it comes to}", ko: "~에 관해서라면" },
  { en: "{be devoted to}", ko: "~에 몸 바치다, 전념하다" },
];

/** to 뒤에 명사를 넣어 보면 전치사 to인지 to부정사의 to인지 보인다 */
export function GdToTwoFaces() {
  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl bg-amber-soft px-4 py-4 text-amber-ink">
          <p className="font-extrabold">to부정사의 to</p>
          <p className="text-[13.5px]">to + 동사원형</p>
          <p className="mt-2 text-[1.05em] font-medium text-ink">
            <En en="I want [[to visit]] Jeju." />
          </p>
          <p className="mt-2 text-[13.5px] font-bold">명사를 넣어 보면</p>
          <p className="text-[1.02em] font-medium text-ink">
            <En en="I want to [[the trip]]." /> <span className="text-coral-ink">✕</span>
          </p>
          <p className="mt-1 text-[13.5px]">말이 안 되니까 전치사가 아니에요.</p>
        </div>
        <div className="rounded-2xl bg-sky-soft px-4 py-4 text-sky-ink">
          <p className="font-extrabold">전치사 to</p>
          <p className="text-[13.5px]">to + 명사 · 동명사(-ing)</p>
          <p className="mt-2 text-[1.05em] font-medium text-ink">
            <En en="I'm {looking forward to} [[{visiting|동명사:방문하기}]] Jeju." />
          </p>
          <p className="mt-2 text-[13.5px] font-bold">명사를 넣어 보면</p>
          <p className="text-[1.02em] font-medium text-ink">
            <En en="I'm {looking forward to} [[the trip]]." /> <span className="text-mint-ink">✓</span>
          </p>
          <p className="mt-1 text-[13.5px]">말이 되니까 전치사예요. 동사는 -ing로!</p>
        </div>
      </div>
      <div className="mt-3 rounded-2xl border border-line px-4 py-3">
        <p className="text-[13.5px] font-extrabold text-ink-2">뒤에 -ing가 오는 전치사 to 표현</p>
        <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
          {TO_PREP_LIST.map((t) => (
            <li key={t.en} className="flex flex-wrap items-baseline gap-x-2 text-[14.5px]">
              <span className="font-bold">
                <En en={t.en} />
              </span>
              <span className="text-ink-3">+ -ing</span>
              <span className="text-[13.5px] text-ink-2">{t.ko}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ───────── 동명사의 때와 태: 네 가지 모양 ───────── */

const GD_FORMS: { key: string; time: string; rel: string; form: string; en: string; ko: string; tone: string }[] = [
  {
    key: "same-active",
    time: "진짜 동사와 같은 때",
    rel: "주인이 한다",
    form: "-ing",
    en: "I enjoy [[{helping|동명사:돕기}]] my mom.",
    ko: "나는 엄마를 돕는 걸 즐겨.",
    tone: "bg-sky-soft text-sky-ink",
  },
  {
    key: "same-passive",
    time: "진짜 동사와 같은 때",
    rel: "주인이 당한다",
    form: "being p.p.",
    en: "My cat hates [[being washed]].",
    ko: "우리 고양이는 씻겨지는 걸 싫어해.",
    tone: "bg-mint-soft text-mint-ink",
  },
  {
    key: "before-active",
    time: "진짜 동사보다 먼저",
    rel: "주인이 한다",
    form: "having p.p.",
    en: "He is proud of [[{having|조동사:완료형을 만드는 말 (have의 -ing형)} finished]] the marathon.",
    ko: "그는 마라톤을 끝까지 달린 게 자랑스러워.",
    tone: "bg-sky-soft text-sky-ink",
  },
  {
    key: "before-passive",
    time: "진짜 동사보다 먼저",
    rel: "주인이 당한다",
    form: "having been p.p.",
    en: "I'm proud of [[{having|조동사:완료형을 만드는 말 (have의 -ing형)} been chosen]] for the team.",
    ko: "나는 그 팀에 뽑혔던 게 자랑스러워.",
    tone: "bg-mint-soft text-mint-ink",
  },
];

/** 때(같은 때 / 더 먼저)와 관계(하는 쪽 / 당하는 쪽)를 보면 동명사의 모양이 정해진다 */
export function GdFormGrid() {
  return (
    <ul className="grid gap-2.5 sm:grid-cols-2">
      {GD_FORMS.map((f) => (
        <li key={f.key} className="rounded-2xl border border-line px-3.5 py-3">
          <p className="flex flex-wrap gap-1.5 text-[13.5px] font-bold">
            <span className="rounded-full bg-chip px-2.5 py-0.5 text-ink-2">{f.time}</span>
            <span className="rounded-full bg-chip px-2.5 py-0.5 text-ink-2">{f.rel}</span>
          </p>
          <p lang="en" className={`mt-2 w-fit rounded-lg px-2.5 py-1 text-[1.1em] font-extrabold ${f.tone}`}>
            {f.form}
          </p>
          <p className="mt-2 text-[1.02em] font-medium">
            <En en={f.en} />
          </p>
          <p className="text-[13.5px] text-ink-2">{f.ko}</p>
        </li>
      ))}
    </ul>
  );
}

/* ───────── 완료 동명사: 진짜 동사보다 한 칸 먼저 ───────── */

const GD_BEFORE = { en: "[[{having|조동사:완료형을 만드는 말 (have의 -ing형)} finished]] the marathon", ko: "마라톤을 끝까지 달렸어요" };
const GD_NOW = { en: "He [[is]] proud.", ko: "지금 자랑스러워요" };

/** having p.p.는 진짜 동사보다 먼저 일어난 일 */
export function GdHavingTimeline() {
  return (
    <div className="grid gap-2 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
      <div className="rounded-2xl bg-sky-soft px-4 py-3">
        <p className="text-[13.5px] font-extrabold text-sky-ink">① 먼저 (작년) · having p.p.</p>
        <p className="mt-1 text-[1.05em] font-medium">
          <En en={GD_BEFORE.en} />
        </p>
        <p className="text-[13.5px] text-ink-2">{GD_BEFORE.ko}</p>
      </div>
      <ArrowRight size={26} className="mx-auto rotate-90 text-ink-3 sm:rotate-0" />
      <div className="rounded-2xl bg-coral-soft px-4 py-3">
        <p className="flex items-center gap-1.5 text-[13.5px] font-extrabold text-coral-ink">
          <CrownIcon size={16} />② 나중 (지금) · 진짜 동사
        </p>
        <p className="mt-1 text-[1.05em] font-medium">
          <En en={GD_NOW.en} />
        </p>
        <p className="text-[13.5px] text-ink-2">{GD_NOW.ko}</p>
      </div>
    </div>
  );
}
