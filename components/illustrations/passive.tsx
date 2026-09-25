import { En } from "@/components/lesson/En";
import { ArrowRight } from "./icons";

/* 수동태 장 그림: 카메라 시점 바꾸기, 바꾸는 3단계, 시제별 수동태 조각, 4형식의 두 가지 수동태, made of / made from, 부정문·의문문, 틀에 be 끼우기, 5형식 보어, 사역·지각의 to, 구동사 덩어리, that절의 두 수동태 */

/* ───────── 카메라 시점: 하는 쪽 vs 당하는 쪽 ───────── */

type PsFocus = "doer" | "receiver";

function PsSceneKid({ faded }: { faded: boolean }) {
  return (
    <g opacity={faded ? 0.35 : 1} style={{ color: faded ? "var(--ink-3)" : "var(--coral)" }}>
      <circle cx="62" cy="46" r="14" fill="currentColor" />
      <path d="M38 114 C38 84 48 68 62 68 C76 68 86 84 86 114 Z" fill="currentColor" />
      <path d="M80 82 L100 64" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
    </g>
  );
}

function PsSceneWindow({ faded }: { faded: boolean }) {
  const frame = faded ? "var(--ink-3)" : "var(--sky-ink)";
  return (
    <g opacity={faded ? 0.35 : 1}>
      <rect x="160" y="26" width="72" height="72" rx="6" strokeWidth="5" style={{ fill: "var(--sky-soft)", stroke: frame }} />
      <path d="M196 26 V98 M160 62 H232" strokeWidth="4" style={{ stroke: frame }} />
      <path
        d="M168 34 L181 48 L175 54 L190 69 L186 76"
        fill="none"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ stroke: "var(--coral)" }}
      />
    </g>
  );
}

/** 옆에서 본 카메라. 렌즈가 +x 쪽을 향하게 그린 뒤 돌린다. */
function PsSceneCamera({ angle }: { angle: number }) {
  return (
    <g transform={`translate(130 128) rotate(${angle})`}>
      <rect x="-17" y="-11" width="26" height="22" rx="5" style={{ fill: "var(--ink)" }} />
      <rect x="9" y="-7" width="12" height="14" rx="2" style={{ fill: "var(--ink)" }} />
      <rect x="21" y="-9" width="4" height="18" rx="1.5" style={{ fill: "var(--ink-2)" }} />
      <circle cx="-4" cy="0" r="5" style={{ fill: "var(--card)" }} />
    </g>
  );
}

function PsCameraScene({ focus }: { focus: PsFocus }) {
  const doer = focus === "doer";
  return (
    <svg
      viewBox="0 0 260 154"
      className="mx-auto w-full max-w-xs"
      role="img"
      aria-label={doer ? "카메라가 창문을 깬 아이를 비추고 있어요" : "카메라가 깨진 창문을 비추고 있어요"}
    >
      {doer ? (
        <ellipse cx="64" cy="78" rx="42" ry="52" style={{ fill: "var(--marker)" }} />
      ) : (
        <ellipse cx="196" cy="62" rx="52" ry="50" style={{ fill: "var(--marker)" }} />
      )}
      <PsSceneKid faded={!doer} />
      <PsSceneWindow faded={doer} />
      <path d="M104 60 Q126 38 150 46" fill="none" strokeWidth="2.5" strokeDasharray="5 6" strokeLinecap="round" style={{ stroke: "var(--ink-3)" }} />
      <circle cx="152" cy="47" r="7" style={{ fill: "var(--amber-ink)" }} />
      <PsSceneCamera angle={doer ? -143 : -46} />
    </svg>
  );
}

const PS_CAMERA_PANELS: { focus: PsFocus; title: string; sub: string; en: string; ko: string; who: string; tone: string }[] = [
  {
    focus: "doer",
    title: "능동태",
    sub: "카메라가 '하는 쪽'을 비춰요",
    en: "[[Minsu]] broke the window.",
    ko: "민수가 창문을 깼어.",
    who: "주인공(주어) = 깬 사람",
    tone: "bg-coral-soft text-coral-ink",
  },
  {
    focus: "receiver",
    title: "수동태",
    sub: "카메라가 '당하는 쪽'을 비춰요",
    en: "[[The window]] was broken by Minsu.",
    ko: "창문이 민수에 의해 깨졌어.",
    who: "주인공(주어) = 깨진 것",
    tone: "bg-sky-soft text-sky-ink",
  },
];

/** 같은 사건, 다른 시점: 카메라를 당하는 쪽으로 돌리면 수동태 */
export function PsCamera() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {PS_CAMERA_PANELS.map((p) => (
        <div key={p.focus} className="rounded-2xl border border-line px-4 py-4">
          <p className="flex flex-wrap items-baseline gap-x-2">
            <span className={`rounded-lg px-2.5 py-1 text-[15px] font-extrabold ${p.tone}`}>{p.title}</span>
            <span className="text-[14px] text-ink-2">{p.sub}</span>
          </p>
          <div className="mt-2">
            <PsCameraScene focus={p.focus} />
          </div>
          <p className="mt-2 text-[1.1em] font-medium">
            <En en={p.en} />
          </p>
          <p className="text-[14px] text-ink-2">{p.ko}</p>
          <p className="mt-2 w-fit rounded-lg bg-chip px-2.5 py-1 text-[14px] font-bold">{p.who}</p>
        </div>
      ))}
    </div>
  );
}

/* ───────── 바꾸는 3단계 ───────── */

type PsRole = "doer" | "verb" | "receiver";

/** 조각의 색은 '누구였는지'를 따라간다: 행위자는 하늘색, 동사는 빨강, 당하는 것은 민트 */
const PS_ROLE_TONE: Record<PsRole, string> = {
  doer: "bg-sky-soft text-sky-ink",
  verb: "bg-coral text-white",
  receiver: "bg-mint-soft text-mint-ink",
};

function PsPiece({ en, role, label }: { en: string; role: PsRole; label?: string }) {
  return (
    <span className="inline-flex flex-col items-center gap-1">
      <span className={`rounded-xl px-2.5 py-1.5 text-[1.1em] font-medium leading-tight ${PS_ROLE_TONE[role]}`}>
        <En en={en} />
      </span>
      {label && <span className="text-[14px] font-bold text-ink-2">{label}</span>}
    </span>
  );
}

const PS_ACTIVE: { en: string; role: PsRole; label: string }[] = [
  { en: "Jisu", role: "doer", label: "주어" },
  { en: "cleaned", role: "verb", label: "동사" },
  { en: "the room", role: "receiver", label: "목적어" },
];

const PS_PASSIVE: { en: string; role: PsRole; label: string }[] = [
  { en: "The room", role: "receiver", label: "주어" },
  { en: "was cleaned", role: "verb", label: "be + p.p." },
  { en: "by Jisu", role: "doer", label: "by + 행위자" },
];

const PS_STEPS: { title: string; from: { en: string; role: PsRole }; to: { en: string; role: PsRole }; note: string }[] = [
  {
    title: "목적어를 주어 자리로",
    from: { en: "the room", role: "receiver" },
    to: { en: "The room", role: "receiver" },
    note: "당한 쪽이 문장의 주인공이 돼요.",
  },
  {
    title: "동사를 be + p.p.로",
    from: { en: "cleaned", role: "verb" },
    to: { en: "was cleaned", role: "verb" },
    note: "be는 새 주어(단수)와 원래 시제(과거)에 맞춰 was",
  },
  {
    title: "원래 주어를 by + 목적격으로",
    from: { en: "Jisu", role: "doer" },
    to: { en: "by Jisu", role: "doer" },
    note: "맨 뒤로 가요. 대명사라면 she → by her",
  },
];

/** 능동태 → 수동태로 바꾸는 3단계 */
export function PsThreeSteps() {
  return (
    <div>
      <p className="text-[14px] font-extrabold text-ink-3">능동태</p>
      <p className="mt-1.5 flex flex-wrap items-start gap-2">
        {PS_ACTIVE.map((p) => (
          <PsPiece key={p.en} {...p} />
        ))}
      </p>
      <ol className="mt-4 space-y-2">
        {PS_STEPS.map((s, i) => (
          <li key={s.title} className="rounded-2xl border border-line px-3 py-3">
            <p className="flex items-center gap-2 font-extrabold">
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-ink text-[14px] text-on-ink">{i + 1}</span>
              {s.title}
            </p>
            <p className="mt-2 flex flex-wrap items-center gap-2">
              <PsPiece {...s.from} />
              <ArrowRight size={18} className="text-ink-3" />
              <PsPiece {...s.to} />
            </p>
            <p className="mt-1.5 text-[14px] text-ink-2">{s.note}</p>
          </li>
        ))}
      </ol>
      <p className="mt-4 text-[14px] font-extrabold text-ink-3">수동태</p>
      <p className="mt-1.5 flex flex-wrap items-start gap-2">
        {PS_PASSIVE.map((p) => (
          <PsPiece key={p.en} {...p} />
        ))}
      </p>
      <p className="mt-3 text-[14px] text-ink-2">색을 따라가 보세요. 조각들이 자리만 바꿨을 뿐, 누가 누구를 청소했는지는 그대로예요.</p>
    </div>
  );
}

/* ───────── 시제별 수동태 ───────── */

const PS_TENSES: { name: string; formula: string; parts: string[]; en: string; ko: string }[] = [
  { name: "현재", formula: "am·is·are + p.p.", parts: ["is", "cleaned"], en: "The room [[is cleaned]] every day.", ko: "그 방은 매일 청소돼." },
  { name: "과거", formula: "was·were + p.p.", parts: ["was", "cleaned"], en: "The room [[was cleaned]] yesterday.", ko: "그 방은 어제 청소됐어." },
  { name: "미래", formula: "will be + p.p.", parts: ["will", "be", "cleaned"], en: "The room [[will be cleaned]] tomorrow.", ko: "그 방은 내일 청소될 거야." },
  { name: "진행", formula: "be + being + p.p.", parts: ["is", "being", "cleaned"], en: "The room [[is being cleaned]] now.", ko: "그 방은 지금 청소되고 있어." },
  { name: "완료", formula: "have·has + been + p.p.", parts: ["has", "been", "cleaned"], en: "The room [[has]] already [[been cleaned]].", ko: "그 방은 벌써 청소가 끝났어." },
  { name: "조동사", formula: "조동사 + be + p.p.", parts: ["must", "be", "cleaned"], en: "The room [[must be cleaned]] today.", ko: "그 방은 오늘 꼭 청소돼야 해." },
];

function psPartTone(i: number, n: number) {
  if (i === 0) return "bg-coral text-white";
  if (i === n - 1) return "bg-mint-soft text-mint-ink";
  return "bg-amber-soft text-amber-ink";
}

/** 시제가 바뀌어도 끝은 늘 p.p. 맨 앞 조각만 주어·시제를 맡는다 */
export function PsTenseGrid() {
  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {PS_TENSES.map((t) => (
          <div key={t.name} className="rounded-2xl border border-line px-4 py-3">
            <p className="flex flex-wrap items-baseline justify-between gap-x-2">
              <span className="font-extrabold">{t.name}</span>
              <span className="text-[14px] font-bold text-ink-2">
                {t.formula}
              </span>
            </p>
            <p lang="en" className="mt-2 flex flex-wrap gap-1.5">
              {t.parts.map((p, i) => (
                <span key={p} className={`rounded-lg px-2 py-1 text-[1.05em] font-bold leading-tight ${psPartTone(i, t.parts.length)}`}>
                  <En en={p} />
                </span>
              ))}
            </p>
            <p className="mt-2 text-[1.02em] font-medium">
              <En en={t.en} />
            </p>
            <p className="text-[14px] text-ink-2">{t.ko}</p>
          </div>
        ))}
      </div>
      <ul className="mt-3 flex flex-wrap gap-2 text-[14px]">
        <li className="rounded-full bg-coral px-2.5 py-1 font-bold text-white">맨 앞 조각: 주어·시제 담당</li>
        <li className="rounded-full bg-amber-soft px-2.5 py-1 font-bold text-amber-ink">가운데: be의 여러 모양</li>
        <li className="rounded-full bg-mint-soft px-2.5 py-1 font-bold text-mint-ink">끝: 늘 p.p.</li>
      </ul>
    </div>
  );
}

/* ───────── 4형식: 목적어가 둘이면 수동태도 둘 ───────── */

const PS_TWO_WAYS: { title: string; en: string; ko: string; note: string; tone: string }[] = [
  {
    title: "① 간접목적어(me)가 주어로",
    en: "[[I]] was given a present by Mom.",
    ko: "나는 엄마에게 선물을 받았어.",
    note: "a present는 제자리에 그대로 남아요.",
    tone: "bg-sky-soft text-sky-ink",
  },
  {
    title: "② 직접목적어(a present)가 주어로",
    en: "[[A present]] was given [[to]] me by Mom.",
    ko: "선물이 엄마에 의해 나에게 주어졌어.",
    note: "남은 me 앞에 전치사 to를 붙여요.",
    tone: "bg-amber-soft text-amber-ink",
  },
];

const PS_PREPS: { prep: string; verbs: string; note: string }[] = [
  { prep: "to", verbs: "give, send, show, teach, tell, lend", note: "받는 사람에게 건너가요" },
  { prep: "for", verbs: "buy, make, cook, get, find", note: "②만 돼요 (직접목적어만 주어로)" },
  { prep: "of", verbs: "ask", note: "질문을 '~에게서' 구해요" },
];

/** 4형식 수동태: 주어가 될 수 있는 목적어가 둘 */
export function PsTwoWays() {
  return (
    <div>
      <p className="text-[14px] font-extrabold text-ink-3">능동태 (4형식)</p>
      <p className="mt-1.5 flex flex-wrap items-start gap-2 text-[1.1em] font-medium">
        <span className="rounded-xl border border-line px-2.5 py-1.5">
          <En en="Mom" />
        </span>
        <span className="rounded-xl bg-coral px-2.5 py-1.5 text-white">
          <En en="gave" />
        </span>
        <span className="inline-flex flex-col items-center gap-1">
          <span className="rounded-xl bg-sky-soft px-2.5 py-1.5 text-sky-ink">
            <En en="me" />
          </span>
          <span className="text-[14px] font-bold text-ink-2">간접목적어 (~에게)</span>
        </span>
        <span className="inline-flex flex-col items-center gap-1">
          <span className="rounded-xl bg-amber-soft px-2.5 py-1.5 text-amber-ink">
            <En en="a present" />
          </span>
          <span className="text-[14px] font-bold text-ink-2">직접목적어 (~을)</span>
        </span>
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {PS_TWO_WAYS.map((w) => (
          <div key={w.title} className="rounded-2xl border border-line px-4 py-3">
            <p className={`w-fit rounded-lg px-2.5 py-1 text-[14px] font-extrabold ${w.tone}`}>{w.title}</p>
            <p className="mt-2 text-[1.08em] font-medium">
              <En en={w.en} />
            </p>
            <p className="text-[14px] text-ink-2">{w.ko}</p>
            <p className="mt-1.5 text-[14px] font-bold">{w.note}</p>
          </div>
        ))}
      </div>
      <ul className="mt-3 grid gap-2 sm:grid-cols-3">
        {PS_PREPS.map((p) => (
          <li key={p.prep} className="rounded-2xl bg-chip px-3 py-2.5">
            <p className="flex items-baseline gap-2">
              <span lang="en" className="rounded-md bg-card px-2 py-0.5 text-[1.05em] font-extrabold">
                {p.prep}
              </span>
              <span lang="en" className="text-[15px] font-medium">
                {p.verbs}
              </span>
            </p>
            <p className="mt-1 text-[14px] text-ink-2">{p.note}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ───────── made of / made from ───────── */

function PsDeskDrawing() {
  return (
    <svg viewBox="0 0 120 72" className="h-20 w-auto" aria-hidden>
      <rect x="12" y="14" width="96" height="13" rx="3" strokeWidth="2.5" style={{ fill: "var(--amber-soft)", stroke: "var(--amber-ink)" }} />
      <path d="M22 20 H54 M62 20 H98" fill="none" strokeWidth="1.8" strokeLinecap="round" style={{ stroke: "var(--amber-ink)" }} />
      <rect x="20" y="27" width="9" height="38" rx="2" strokeWidth="2.5" style={{ fill: "var(--amber-soft)", stroke: "var(--amber-ink)" }} />
      <rect x="91" y="27" width="9" height="38" rx="2" strokeWidth="2.5" style={{ fill: "var(--amber-soft)", stroke: "var(--amber-ink)" }} />
      <path d="M23 36 V56 M96 38 V58" fill="none" strokeWidth="1.5" strokeLinecap="round" style={{ stroke: "var(--amber-ink)" }} />
    </svg>
  );
}

function PsMilkToCheese() {
  return (
    <svg viewBox="0 0 150 72" className="h-20 w-auto" aria-hidden>
      <path d="M14 22 L22 10 H42 L50 22 V64 H14 Z" strokeWidth="2.5" strokeLinejoin="round" style={{ fill: "var(--sky-soft)", stroke: "var(--sky-ink)" }} />
      <path d="M14 22 H50" fill="none" strokeWidth="2.5" style={{ stroke: "var(--sky-ink)" }} />
      <circle cx="32" cy="42" r="7" style={{ fill: "var(--card)" }} />
      <path d="M62 40 H86" fill="none" strokeWidth="3" strokeLinecap="round" style={{ stroke: "var(--ink-3)" }} />
      <path d="M80 33 L88 40 L80 47" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: "var(--ink-3)" }} />
      <path d="M98 60 L138 60 L138 38 L98 22 Z" strokeWidth="2.5" strokeLinejoin="round" style={{ fill: "var(--amber-soft)", stroke: "var(--amber-ink)" }} />
      <circle cx="112" cy="44" r="4" style={{ fill: "var(--card)" }} />
      <circle cx="126" cy="50" r="3" style={{ fill: "var(--card)" }} />
      <circle cx="122" cy="38" r="2.5" style={{ fill: "var(--card)" }} />
    </svg>
  );
}

/** 재료가 그대로 보이면 made of, 변해서 안 보이면 made from */
export function PsMadeOfFrom() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <div className="rounded-2xl border border-line px-4 py-4">
        <p lang="en" className="w-fit rounded-lg bg-amber-soft px-2.5 py-1 text-[1.05em] font-extrabold text-amber-ink">
          made of
        </p>
        <div className="mt-2 flex justify-center">
          <PsDeskDrawing />
        </div>
        <p className="mt-2 text-[1.08em] font-medium">
          <En en="This desk [[is {made of}]] wood." />
        </p>
        <p className="text-[14px] text-ink-2">이 책상은 나무로 만들어졌어.</p>
        <p className="mt-1.5 text-[14px] font-bold">나뭇결이 그대로 보여요. 모양만 바뀌었어요.</p>
      </div>
      <div className="rounded-2xl border border-line px-4 py-4">
        <p lang="en" className="w-fit rounded-lg bg-sky-soft px-2.5 py-1 text-[1.05em] font-extrabold text-sky-ink">
          made from
        </p>
        <div className="mt-2 flex justify-center">
          <PsMilkToCheese />
        </div>
        <p className="mt-2 text-[1.08em] font-medium">
          <En en="Cheese [[is {made from}]] milk." />
        </p>
        <p className="text-[14px] text-ink-2">치즈는 우유로 만들어.</p>
        <p className="mt-1.5 text-[14px] font-bold">치즈를 봐서는 우유인지 알 수 없어요. 성질까지 바뀌었어요.</p>
      </div>
    </div>
  );
}

/* ───────── 공통: 색 조각 ───────── */

type PsTone = "be" | "pp" | "not" | "subj" | "doer" | "comp" | "slot" | "plain";

const PS_TONE: Record<PsTone, string> = {
  be: "bg-coral text-white",
  pp: "bg-mint-soft text-mint-ink",
  not: "bg-amber-soft text-amber-ink",
  subj: "bg-chip text-ink",
  doer: "bg-sky-soft text-sky-ink",
  comp: "bg-amber-soft text-amber-ink",
  slot: "border-2 border-dashed border-sky-ink text-sky-ink",
  plain: "border border-line",
};

/** en은 뜻 풍선이 달리는 영어, text는 그냥 글자(빈칸 표시 등) */
type PsChip = { en?: string; text?: string; tone?: PsTone; label?: string };

function PsTile({ chip }: { chip: PsChip }) {
  const box = (
    <span className={`rounded-lg px-2.5 py-1 leading-tight ${PS_TONE[chip.tone ?? "plain"]}`}>
      {chip.en ? <En en={chip.en} /> : chip.text}
    </span>
  );
  if (!chip.label) return box;
  return (
    <span className="inline-flex flex-col items-center gap-1">
      {box}
      <span className="text-[14px] font-bold text-ink-2">{chip.label}</span>
    </span>
  );
}

function PsRow({ chips, className = "" }: { chips: PsChip[]; className?: string }) {
  return (
    <p lang="en" className={`flex flex-wrap items-start gap-1.5 text-[1.12em] font-medium ${className}`}>
      {chips.map((c, i) => (
        <PsTile key={i} chip={c} />
      ))}
    </p>
  );
}

function PsWrong({ ok }: { ok: boolean }) {
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

/* ───────── 부정문과 의문문: be동사 문장처럼 ───────── */

const PS_NEG_Q: { label: string; hint: string; chips: PsChip[]; answer?: { en: string } }[] = [
  {
    label: "긍정문",
    hint: "주어 + be + p.p.",
    chips: [{ en: "The door", tone: "subj" }, { en: "was", tone: "be" }, { en: "locked.", tone: "pp" }],
  },
  {
    label: "부정문",
    hint: "be 바로 뒤에 not (was not → wasn't)",
    chips: [{ en: "The door", tone: "subj" }, { en: "was", tone: "be" }, { en: "not", tone: "not" }, { en: "locked.", tone: "pp" }],
  },
  {
    label: "의문문",
    hint: "be만 주어 앞으로. p.p.는 제자리",
    chips: [{ en: "Was", tone: "be" }, { en: "the door", tone: "subj" }, { en: "locked?", tone: "pp" }],
    answer: { en: "Yes, it was. / {No|부사:아니(요)}, it wasn't." },
  },
];

const PS_NO_DO: { en: string }[] = [{ en: "Did the door locked?" }, { en: "The door didn't locked." }];

/** 수동태의 부정문·의문문은 맨 앞 be가 움직인다. do·did는 끼어들지 않는다 */
export function PsNegQ() {
  return (
    <div>
      <ol className="space-y-2.5">
        {PS_NEG_Q.map((row) => (
          <li key={row.label} className="rounded-2xl border border-line px-4 py-3">
            <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="rounded-lg bg-chip px-2.5 py-1 text-[14px] font-extrabold">{row.label}</span>
              <span className="text-[14px] text-ink-2">{row.hint}</span>
            </p>
            <PsRow chips={row.chips} className="mt-2.5" />
            {row.answer && (
              <p className="mt-2 text-[15px]">
                <span className="mr-1.5 font-extrabold text-ink-2">대답</span>
                <En en={row.answer.en} />
              </p>
            )}
          </li>
        ))}
      </ol>
      <div className="mt-3 flex items-start gap-3 rounded-2xl bg-coral-soft px-4 py-3 text-coral-ink">
        <PsWrong ok={false} />
        <div>
          <ul className="flex flex-wrap gap-x-4 gap-y-1">
            {PS_NO_DO.map((w) => (
              <li key={w.en} className="text-[1.03em] font-medium text-ink-2 line-through decoration-coral/60">
                <En en={w.en} />
              </li>
            ))}
          </ul>
          <p className="mt-1 text-[14px]">맨 앞이 be동사라서 do, does, did가 들어갈 자리가 없어요.</p>
        </div>
      </div>
    </div>
  );
}

/* ───────── 두 공식 겹치기: 틀의 빈칸에 수동태의 be를 넣는다 ───────── */

const PS_FRAMES: { name: string; frame: PsChip[]; result: PsChip[]; note: string }[] = [
  {
    name: "진행형",
    frame: [{ en: "is", tone: "doer" }, { text: "▢ + -ing", tone: "slot" }],
    result: [{ en: "is", tone: "doer" }, { en: "being", tone: "be" }, { en: "cleaned", tone: "pp" }],
    note: "be의 -ing형 = being",
  },
  {
    name: "완료형",
    frame: [{ en: "has", tone: "doer" }, { text: "▢ + p.p.", tone: "slot" }],
    result: [{ en: "has", tone: "doer" }, { en: "been", tone: "be" }, { en: "cleaned", tone: "pp" }],
    note: "be의 p.p. = been",
  },
  {
    name: "조동사",
    frame: [{ en: "will", tone: "doer" }, { text: "▢ 원형", tone: "slot" }],
    result: [{ en: "will", tone: "doer" }, { en: "be", tone: "be" }, { en: "cleaned", tone: "pp" }],
    note: "be의 원형 = be",
  },
];

const PS_PASSIVE_PAIR: PsChip[] = [
  { en: "be", tone: "be" },
  { en: "cleaned", tone: "pp" },
];

/** 진행·완료·조동사 틀의 빈칸에 수동태 be + p.p.를 끼우면 being / been / be + p.p. */
export function PsStackFrames() {
  return (
    <div>
      <div className="mx-auto w-fit rounded-2xl bg-chip px-4 py-2.5 text-center">
        <p className="text-[14px] font-extrabold text-ink-2">끼워 넣을 수동태 조각</p>
        <PsRow chips={PS_PASSIVE_PAIR} className="mt-1 justify-center" />
      </div>
      <ul className="mt-3 grid gap-2.5 sm:grid-cols-3">
        {PS_FRAMES.map((f) => (
          <li key={f.name} className="rounded-2xl border border-line px-3 py-3">
            <p className="font-extrabold">{f.name}</p>
            <p className="mt-1.5 text-[14px] font-bold text-ink-3">틀</p>
            <PsRow chips={f.frame} className="mt-1" />
            <p className="mt-2 text-[14px] font-bold text-ink-3">↓ 빈칸에 be를 넣으면</p>
            <PsRow chips={f.result} className="mt-1" />
            <p className="mt-2 w-fit rounded-lg bg-chip px-2 py-0.5 text-[14px] font-bold">{f.note}</p>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-center text-[14px] text-ink-2">하늘색 틀 조각이 주어·시제를 맡고, 끝은 늘 p.p.예요.</p>
    </div>
  );
}

/* ───────── 5형식 수동태: 목적격보어는 제자리 ───────── */

const PS_COMPLEMENTS: { kind: string; active: PsChip[]; passive: PsChip[]; ko: string }[] = [
  {
    kind: "명사 보어",
    active: [
      { en: "We", tone: "doer", label: "주어" },
      { en: "elected", tone: "be", label: "동사" },
      { en: "him", tone: "pp", label: "목적어" },
      { en: "captain.", tone: "comp", label: "목적격보어" },
    ],
    passive: [
      { en: "He", tone: "pp", label: "주어" },
      { en: "was elected", tone: "be", label: "be + p.p." },
      { en: "captain", tone: "comp", label: "그대로!" },
      { en: "(by us).", tone: "doer", label: "행위자" },
    ],
    ko: "그는 (우리에 의해) 주장으로 뽑혔어.",
  },
  {
    kind: "형용사 보어",
    active: [
      { en: "The news", tone: "doer", label: "주어" },
      { en: "made", tone: "be", label: "동사" },
      { en: "her", tone: "pp", label: "목적어" },
      { en: "happy.", tone: "comp", label: "목적격보어" },
    ],
    passive: [
      { en: "She", tone: "pp", label: "주어" },
      { en: "was made", tone: "be", label: "be + p.p." },
      { en: "happy", tone: "comp", label: "그대로!" },
      { en: "by the news.", tone: "doer", label: "행위자" },
    ],
    ko: "그녀는 그 소식에 행복해졌어.",
  },
];

/** 주어로 올라가는 건 목적어 하나뿐, 목적격보어(노란 조각)는 p.p. 뒤 제자리 */
export function PsComplementStays() {
  return (
    <div className="grid gap-3">
      {PS_COMPLEMENTS.map((c) => (
        <div key={c.kind} className="rounded-2xl border border-line px-4 py-3">
          <p className="w-fit rounded-lg bg-amber-soft px-2.5 py-0.5 text-[14px] font-extrabold text-amber-ink">{c.kind}</p>
          <p className="mt-2 text-[14px] font-extrabold text-ink-3">능동태</p>
          <PsRow chips={c.active} className="mt-1" />
          <p className="mt-3 text-[14px] font-extrabold text-ink-3">수동태</p>
          <PsRow chips={c.passive} className="mt-1" />
          <p className="mt-2 text-[14px] text-ink-2">{c.ko}</p>
        </div>
      ))}
      <p className="text-[14px] text-ink-2">민트 조각(목적어)만 앞으로 가고, 노란 조각(목적격보어)은 모양도 자리도 그대로예요.</p>
    </div>
  );
}

/* ───────── 사역·지각동사 수동태: 원형 앞에 to가 돌아온다 ───────── */

const PS_TO_ACTIVE: PsChip[] = [
  { en: "Mom", tone: "doer" },
  { en: "{made|동사:시켰다 (make의 과거형)}", tone: "be", label: "진짜 동사" },
  { en: "me", tone: "pp", label: "목적어" },
  { en: "clean", tone: "comp", label: "원형으로 변장" },
  { en: "my room." },
];

const PS_TO_WRONG: PsChip[] = [
  { en: "I", tone: "pp" },
  { en: "was {made|동사:시키다 (make의 과거분사)}", tone: "be" },
  { en: "clean", tone: "comp", label: "청소하다? 깨끗한?" },
  { en: "my room." },
];

const PS_TO_RIGHT: PsChip[] = [
  { en: "I", tone: "pp" },
  { en: "was {made|동사:시키다 (make의 과거분사)}", tone: "be" },
  { en: "to clean", tone: "comp", label: "to로 변장을 밝혀요" },
  { en: "my room." },
];

/** 능동태에서 목적어가 떠나면 원형이 be + p.p. 바로 뒤에 붙어 헷갈린다. 그래서 to를 다시 붙인다 */
export function PsToReturns() {
  return (
    <div>
      <div className="rounded-2xl border border-line px-4 py-3">
        <p className="text-[14px] font-extrabold text-ink-3">능동태: 목적어 me가 사이에 있어서 원형 clean도 헷갈리지 않아요</p>
        <PsRow chips={PS_TO_ACTIVE} className="mt-2" />
      </div>
      <div className="mt-2.5 rounded-2xl border-2 border-coral-soft px-4 py-3">
        <p className="flex items-center gap-2 text-[14px] font-extrabold text-coral-ink">
          <PsWrong ok={false} />
          me가 주어로 떠나면 clean이 was made에 딱 붙어요
        </p>
        <PsRow chips={PS_TO_WRONG} className="mt-2" />
      </div>
      <div className="mt-2.5 rounded-2xl border-2 border-mint-soft px-4 py-3">
        <p className="flex items-center gap-2 text-[14px] font-extrabold text-mint-ink">
          <PsWrong ok />
          to를 붙여 &lsquo;변장한 동사&rsquo;라고 밝혀요
        </p>
        <PsRow chips={PS_TO_RIGHT} className="mt-2" />
        <p className="mt-2 text-[14px] text-ink-2">나는 (엄마 때문에) 방 청소를 해야 했어.</p>
      </div>
      <p className="mt-3 text-[14px] text-ink-2">
        지각동사도 똑같아요: <En en="He [[was seen to enter]] the building." /> 다만 -ing는 그대로 써도 돼요:{" "}
        <En en="He [[was seen entering]] the building." />
      </p>
    </div>
  );
}

/* ───────── 구동사 수동태: 한 덩어리째 ───────── */

const PS_PHRASAL_ACTIVE: PsChip[] = [
  { en: "My grandma", tone: "doer", label: "주어" },
  { en: "{looks after}", tone: "be", label: "구동사 한 덩어리" },
  { en: "the baby.", tone: "pp", label: "목적어" },
];

const PS_PHRASAL_PASSIVE: PsChip[] = [
  { en: "The baby", tone: "pp", label: "주어" },
  { en: "is {looked after}", tone: "be", label: "after까지 한 덩어리" },
  { en: "by my grandma.", tone: "doer", label: "by + 행위자" },
];

/** look after는 통째로 be + p.p.가 되고, 그 뒤에 행위자의 by가 따로 온다 */
export function PsPhrasalChunk() {
  return (
    <div>
      <p className="text-[14px] font-extrabold text-ink-3">능동태</p>
      <PsRow chips={PS_PHRASAL_ACTIVE} className="mt-1" />
      <p className="mt-4 text-[14px] font-extrabold text-ink-3">수동태</p>
      <PsRow chips={PS_PHRASAL_PASSIVE} className="mt-1" />
      <p className="mt-2 text-[14px] text-ink-2">아기는 할머니께서 돌봐 주셔.</p>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <p className="rounded-2xl bg-chip px-3 py-2 text-[14px]">
          <b>after by</b>처럼 전치사 둘이 나란히 와도 괜찮아요. after는 구동사의 일부, by는 행위자를 데려오는 말이에요.
        </p>
        <p className="flex items-start gap-2 rounded-2xl bg-coral-soft px-3 py-2 text-[14px] text-coral-ink">
          <PsWrong ok={false} />
          <span>
            <span className="block font-medium text-ink-2 line-through decoration-coral/60">
              <En en="The baby is looked by my grandma." />
            </span>
            after를 떼면 &lsquo;돌보다&rsquo;라는 뜻이 사라져요.
          </span>
        </p>
      </div>
    </div>
  );
}

/* ───────── that절 목적어의 두 가지 수동태 ───────── */

const PS_SAID: { label: string; chips: PsChip[]; count: string; tone: string }[] = [
  {
    label: "능동태",
    chips: [
      { en: "People" },
      { en: "say", tone: "be" },
      { en: "{that|접속사:~라고}", tone: "doer" },
      { en: "he" },
      { en: "is", tone: "be" },
      { en: "honest." },
    ],
    count: "진짜 동사 2개 = that 1개 + 1",
    tone: "bg-chip text-ink",
  },
  {
    label: "① It is said that ~",
    chips: [
      { en: "{It|대명사:가주어 (뜻 없이 자리만 채워요)}" },
      { en: "is said", tone: "be" },
      { en: "{that|접속사:~라고}", tone: "doer" },
      { en: "he" },
      { en: "is", tone: "be" },
      { en: "honest." },
    ],
    count: "진짜 동사 2개 = that 1개 + 1",
    tone: "bg-sky-soft text-sky-ink",
  },
  {
    label: "② 주어 + is said to ~",
    chips: [{ en: "He" }, { en: "is said", tone: "be" }, { en: "to be", tone: "comp", label: "is → to be" }, { en: "honest." }],
    count: "진짜 동사 1개 = that 0개 + 1",
    tone: "bg-amber-soft text-amber-ink",
  },
];

/** that이 남으면 동사 2개, that이 사라지면 is가 to be로 변장해 동사 1개 */
export function PsSaidTwoWays() {
  return (
    <ul className="space-y-2.5">
      {PS_SAID.map((r) => (
        <li key={r.label} className="rounded-2xl border border-line px-4 py-3">
          <p lang="en" className="text-[14px] font-extrabold text-ink-2">
            {r.label}
          </p>
          <PsRow chips={r.chips} className="mt-2" />
          <p className={`mt-2 w-fit rounded-lg px-2.5 py-1 text-[14px] font-extrabold ${r.tone}`}>{r.count}</p>
        </li>
      ))}
    </ul>
  );
}
