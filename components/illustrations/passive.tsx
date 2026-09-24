import { En } from "@/components/lesson/En";
import { ArrowRight } from "./icons";

/* 수동태 장 그림: 카메라 시점 바꾸기, 바꾸는 3단계, 시제별 수동태 조각, 4형식의 두 가지 수동태, made of / made from */

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
