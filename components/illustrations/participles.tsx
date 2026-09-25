import type { ReactNode } from "react";
import { En } from "@/components/lesson/En";
import { ArrowRight, MaskIcon, PersonIcon } from "./icons";

/* 분사 장 그림: -ing(하는 쪽) vs p.p.(당한 쪽), 명사 앞·뒤 꾸밈, 동명사 vs 현재분사, 감정 분사의 화살표 */

const ink2 = { fill: "var(--ink-2)" } as const;

/* ───────── 작은 그림 조각 ───────── */

/** 이불 덮고 자는 아기 */
function PtBabySvg() {
  return (
    <svg viewBox="0 0 120 80" className="h-20 w-auto" aria-hidden>
      <rect x="14" y="44" width="92" height="26" rx="13" strokeWidth="2.5" style={{ fill: "var(--sky-soft)", stroke: "var(--sky-ink)" }} />
      <circle cx="36" cy="40" r="15" strokeWidth="2.5" style={{ fill: "var(--amber-soft)", stroke: "var(--amber-ink)" }} />
      <path d="M28 40 Q31 43 34 40 M39 40 Q42 43 45 40" fill="none" strokeWidth="2" strokeLinecap="round" style={{ stroke: "var(--ink)" }} />
      <text x="64" y="30" fontSize="16" fontWeight="700" style={ink2}>
        Z
      </text>
      <text x="80" y="20" fontSize="14" fontWeight="700" style={ink2}>
        z
      </text>
    </svg>
  );
}

/** 금이 간 창문 */
function PtWindowSvg() {
  return (
    <svg viewBox="0 0 120 80" className="h-20 w-auto" aria-hidden>
      <rect x="30" y="8" width="60" height="64" rx="5" strokeWidth="4" style={{ fill: "var(--sky-soft)", stroke: "var(--sky-ink)" }} />
      <path d="M60 8 V72 M30 40 H90" strokeWidth="3" style={{ stroke: "var(--sky-ink)" }} />
      <path
        d="M36 14 L47 26 L42 31 L55 44 L51 50"
        fill="none"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ stroke: "var(--coral)" }}
      />
      <path d="M72 46 L80 56 L76 60" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: "var(--coral)" }} />
    </svg>
  );
}

/** 영화 화면 */
function PtScreenIcon() {
  return (
    <svg viewBox="0 0 48 40" width="52" height="44" aria-hidden>
      <rect x="3" y="4" width="42" height="27" rx="4" style={{ fill: "var(--ink)" }} />
      <path d="M20 11 L30 17.5 L20 24 Z" style={{ fill: "var(--marker)" }} />
      <path d="M16 36 H32" strokeWidth="3" strokeLinecap="round" style={{ stroke: "var(--ink)" }} />
    </svg>
  );
}

/* ───────── -ing는 하는 쪽, p.p.는 당한 쪽 ───────── */

type PtCardData = {
  key: string;
  tag: string;
  meaning: string;
  tone: string;
  picture: ReactNode;
  rows: { en: string; ko: string }[];
};

const PT_AP_CARDS: PtCardData[] = [
  {
    key: "ing",
    tag: "현재분사 -ing",
    meaning: "능동·진행: ~하는, ~하고 있는",
    tone: "bg-mint-soft text-mint-ink",
    picture: <PtBabySvg />,
    rows: [
      { en: "a [[{sleeping|현재분사:자고 있는}]] baby", ko: "아기가 자요 → 스스로 하는 쪽" },
      { en: "[[{boiling|현재분사:끓고 있는}]] water", ko: "물이 끓어요 → 스스로 하는 쪽" },
    ],
  },
  {
    key: "pp",
    tag: "과거분사 p.p.",
    meaning: "수동·완료: ~된, ~당한, ~해 버린",
    tone: "bg-sky-soft text-sky-ink",
    picture: <PtWindowSvg />,
    rows: [
      { en: "a [[{broken|과거분사:깨진}]] window", ko: "창문이 깨졌어요 → 당한 쪽" },
      { en: "[[{fallen|과거분사:떨어진}]] leaves", ko: "잎이 이미 떨어졌어요 → 끝난 일(완료)" },
    ],
  },
];

/** 현재분사는 하는 쪽, 과거분사는 당한 쪽 */
export function PtActivePassive() {
  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2">
        {PT_AP_CARDS.map((c) => (
          <div key={c.key} className="rounded-2xl border border-line px-4 py-4">
            <p className="flex flex-wrap items-center gap-2">
              <span className={`rounded-lg px-2.5 py-1 text-[15px] font-extrabold ${c.tone}`}>{c.tag}</span>
            </p>
            <p className="mt-1.5 text-[14px] font-bold text-ink-2">{c.meaning}</p>
            <div className="mt-2 flex justify-center">{c.picture}</div>
            <ul className="mt-2 space-y-2">
              {c.rows.map((r) => (
                <li key={r.en}>
                  <span className="block text-[1.1em] font-medium">
                    <En en={r.en} />
                  </span>
                  <span className="block text-[14px] text-ink-2">{r.ko}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mt-3 rounded-xl bg-chip px-3 py-2.5 text-center text-[14px] font-bold">
        꾸밈받는 명사가 그 동작을 직접 하면 -ing, 당하거나 이미 끝났으면 p.p.
      </p>
    </div>
  );
}

/* ───────── 명사 앞 vs 명사 뒤 ───────── */

function PtChip({ en, tone }: { en: string; tone: "noun" | "part" | "plain" }) {
  const cls =
    tone === "noun" ? "bg-sky-soft text-sky-ink" : tone === "part" ? "bg-mint-soft text-mint-ink" : "border border-line text-ink";
  return (
    <span className={`rounded-xl px-2.5 py-1.5 text-[1.1em] font-medium leading-tight ${cls}`}>
      <En en={en} />
    </span>
  );
}

const PT_POSITION: {
  key: string;
  title: string;
  sub: string;
  pieces: { en: string; tone: "noun" | "part" | "plain" }[];
  arrowBack: boolean;
  more: { en: string; ko: string };
}[] = [
  {
    key: "front",
    title: "분사 한 단어 → 명사 앞",
    sub: "형용사처럼 앞에서 꾸며요",
    pieces: [
      { en: "a", tone: "plain" },
      { en: "{smiling|현재분사:웃고 있는}", tone: "part" },
      { en: "girl", tone: "noun" },
    ],
    arrowBack: false,
    more: { en: "a {broken|과거분사:깨진} cup", ko: "깨진 컵" },
  },
  {
    key: "back",
    title: "뒤에 딸린 말이 있으면 → 명사 뒤",
    sub: "덩어리가 길어지면 뒤로 가요",
    pieces: [
      { en: "the girl", tone: "noun" },
      { en: "{smiling|현재분사:웃고 있는} at me", tone: "part" },
    ],
    arrowBack: true,
    more: { en: "a car {made|과거분사:만들어진} in Korea", ko: "한국에서 만들어진 차" },
  },
];

/** 한 단어면 명사 앞, 구가 되면 명사 뒤 */
export function PtPosition() {
  return (
    <ul className="space-y-3">
      {PT_POSITION.map((r) => (
        <li key={r.key} className="rounded-2xl border border-line px-4 py-4">
          <p className="font-extrabold">{r.title}</p>
          <p className="text-[14px] text-ink-2">{r.sub}</p>
          <p className="mt-3 flex flex-wrap items-center gap-2">
            {r.arrowBack ? (
              <>
                <PtChip en={r.pieces[0].en} tone={r.pieces[0].tone} />
                <ArrowRight size={20} className="rotate-180 text-mint-ink" />
                <PtChip en={r.pieces[1].en} tone={r.pieces[1].tone} />
              </>
            ) : (
              <>
                <PtChip en={r.pieces[0].en} tone={r.pieces[0].tone} />
                <PtChip en={r.pieces[1].en} tone={r.pieces[1].tone} />
                <ArrowRight size={20} className="text-mint-ink" />
                <PtChip en={r.pieces[2].en} tone={r.pieces[2].tone} />
              </>
            )}
          </p>
          <p className="mt-3 text-[14.5px]">
            <span className="font-bold text-ink-3">또: </span>
            <span className="font-medium">
              <En en={r.more.en} />
            </span>
            <span className="ml-2 text-ink-2">{r.more.ko}</span>
          </p>
        </li>
      ))}
    </ul>
  );
}

/* ───────── 동명사 + 명사 vs 현재분사 + 명사 ───────── */

const PT_GP: { key: string; tag: string; tone: string; en: string; ko: string; test: string; ok: boolean; means: { en: string; ko: string } }[] = [
  {
    key: "gerund",
    tag: "동명사 + 명사: 용도",
    tone: "bg-sky-soft text-sky-ink",
    en: "a [[{sleeping|동명사:잠자기}]] bag",
    ko: "침낭 (잠잘 때 쓰는 가방)",
    test: "가방이 자나요? ✕ → 무엇에 쓰는지 알려 줘요",
    ok: false,
    means: { en: "a bag for sleeping", ko: "잠자기 위한 가방" },
  },
  {
    key: "participle",
    tag: "현재분사 + 명사: 동작",
    tone: "bg-mint-soft text-mint-ink",
    en: "a [[{sleeping|현재분사:자고 있는}]] baby",
    ko: "자고 있는 아기",
    test: "아기가 자나요? ○ → 명사가 하는 동작이에요",
    ok: true,
    means: { en: "a baby {who|관계대명사:~하는 (사람)} is sleeping", ko: "자고 있는 아기" },
  },
];

/** a sleeping bag(동명사)과 a sleeping baby(현재분사) */
export function PtGerundVsParticiple() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {PT_GP.map((c) => (
        <div key={c.key} className="rounded-2xl border border-line px-4 py-4">
          <p className={`w-fit rounded-lg px-2.5 py-1 text-[14.5px] font-extrabold ${c.tone}`}>{c.tag}</p>
          <p className="mt-3 text-[1.25em] font-medium">
            <En en={c.en} />
          </p>
          <p className="text-[14px] text-ink-2">{c.ko}</p>
          <p className={`mt-3 rounded-lg px-2.5 py-1.5 text-[14px] font-bold ${c.ok ? "bg-mint-soft text-mint-ink" : "bg-chip text-ink-2"}`}>
            {c.test}
          </p>
          <p className="mt-2 text-[14.5px]">
            <span className="font-bold text-ink-3">= </span>
            <span className="font-medium">
              <En en={c.means.en} />
            </span>
          </p>
        </div>
      ))}
    </div>
  );
}

/* ───────── 감정 분사: 원인 → 느끼는 사람 ───────── */

/** 감정을 일으키는 쪽(-ing) → 감정을 느끼는 쪽(p.p.) */
export function PtEmotionArrow() {
  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
        <div className="rounded-2xl bg-coral-soft px-4 py-4 text-center">
          <div className="flex justify-center">
            <PtScreenIcon />
          </div>
          <p className="mt-2 font-extrabold text-coral-ink">영화: 감정을 일으키는 쪽</p>
          <p className="text-[14px] text-ink-2">흥미를 &lsquo;주는&rsquo; 원인</p>
          <p className="mx-auto mt-2 w-fit rounded-lg bg-card px-2.5 py-1 text-[1.1em] font-medium">
            <En en="{interesting|형용사:흥미로운}" /> <span className="text-[14px] font-bold text-coral-ink">-ing</span>
          </p>
        </div>
        <div className="flex flex-col items-center gap-1">
          <ArrowRight size={34} className="rotate-90 text-coral sm:rotate-0" />
          <span className="text-[14px] font-bold text-ink-2">흥미를 줘요</span>
        </div>
        <div className="rounded-2xl bg-sky-soft px-4 py-4 text-center">
          <PersonIcon size={44} className="mx-auto text-sky-ink" />
          <p className="mt-2 font-extrabold text-sky-ink">나: 감정을 느끼는 쪽</p>
          <p className="text-[14px] text-ink-2">흥미를 &lsquo;받은&rsquo; 사람</p>
          <p className="mx-auto mt-2 w-fit rounded-lg bg-card px-2.5 py-1 text-[1.1em] font-medium">
            <En en="{interested|형용사:흥미를 느끼는}" /> <span className="text-[14px] font-bold text-sky-ink">p.p.</span>
          </p>
        </div>
      </div>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
        <li className="rounded-xl border border-line px-3 py-2.5">
          <span className="block text-[1.05em] font-medium">
            <En en="The movie is [[{interesting|형용사:흥미로운}]]." />
          </span>
          <span className="block text-[14px] text-ink-2">그 영화는 흥미로워. (흥미를 주는 쪽)</span>
        </li>
        <li className="rounded-xl border border-line px-3 py-2.5">
          <span className="block text-[1.05em] font-medium">
            <En en="I am [[{interested|형용사:흥미를 느끼는}]] in the movie." />
          </span>
          <span className="block text-[14px] text-ink-2">나는 그 영화에 흥미가 있어. (흥미를 받은 쪽)</span>
        </li>
      </ul>
    </div>
  );
}

type PtPair = {
  verb: { en: string; ko: string };
  ing: { en: string; ko: string };
  pp: { en: string; ko: string };
};

const PT_PAIRS: PtPair[] = [
  { verb: { en: "interest", ko: "흥미를 느끼게 하다" }, ing: { en: "interesting", ko: "흥미로운" }, pp: { en: "interested", ko: "흥미를 느끼는" } },
  { verb: { en: "excite", ko: "신나게 하다" }, ing: { en: "exciting", ko: "신나는" }, pp: { en: "excited", ko: "신이 난" } },
  { verb: { en: "bore", ko: "지루하게 하다" }, ing: { en: "boring", ko: "지루한" }, pp: { en: "bored", ko: "지루해하는" } },
  { verb: { en: "surprise", ko: "놀라게 하다" }, ing: { en: "surprising", ko: "놀라운" }, pp: { en: "surprised", ko: "놀란" } },
  { verb: { en: "tire", ko: "피곤하게 하다" }, ing: { en: "tiring", ko: "피곤하게 하는" }, pp: { en: "tired", ko: "피곤한" } },
  { verb: { en: "confuse", ko: "헷갈리게 하다" }, ing: { en: "confusing", ko: "헷갈리는" }, pp: { en: "confused", ko: "헷갈려하는" } },
  { verb: { en: "disappoint", ko: "실망시키다" }, ing: { en: "disappointing", ko: "실망스러운" }, pp: { en: "disappointed", ko: "실망한" } },
  { verb: { en: "shock", ko: "충격을 주다" }, ing: { en: "shocking", ko: "충격적인" }, pp: { en: "shocked", ko: "충격을 받은" } },
  { verb: { en: "satisfy", ko: "만족시키다" }, ing: { en: "satisfying", ko: "만족스러운" }, pp: { en: "satisfied", ko: "만족한" } },
];

/** 감정동사 하나에서 나온 -ing와 p.p. 짝 */
export function PtEmotionPairs() {
  return (
    <div>
      <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {PT_PAIRS.map((p) => (
          <li key={p.verb.en} className="rounded-2xl border border-line px-3 py-3">
            <p className="flex flex-wrap items-baseline gap-x-2">
              <span className="text-[1.1em] font-bold">
                <En en={p.verb.en} />
              </span>
              <span className="text-[14px] text-ink-2">{p.verb.ko}</span>
            </p>
            <div className="mt-2 grid grid-cols-2 gap-1.5">
              <span className="rounded-lg bg-coral-soft px-2 py-1.5">
                <span className="block text-[1.02em] font-medium text-coral-ink">
                  <En en={p.ing.en} />
                </span>
                <span className="block text-[14px] text-ink-2">{p.ing.ko}</span>
              </span>
              <span className="rounded-lg bg-sky-soft px-2 py-1.5">
                <span className="block text-[1.02em] font-medium text-sky-ink">
                  <En en={p.pp.en} />
                </span>
                <span className="block text-[14px] text-ink-2">{p.pp.ko}</span>
              </span>
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-3 flex flex-wrap items-center justify-center gap-2 text-[14px] font-bold">
        <span className="rounded-full bg-coral-soft px-2.5 py-1 text-coral-ink">-ing: 감정을 일으키는 쪽</span>
        <span className="rounded-full bg-sky-soft px-2.5 py-1 text-sky-ink">p.p.: 감정을 느끼는 쪽</span>
      </p>
    </div>
  );
}

/** 분사 = 형용사로 변장한 동사 (가면 표시) */
export function PtCostume() {
  const rows: { en: string; ko: string; kind: string }[] = [
    { en: "The baby [[sleeps]].", ko: "아기가 자요.", kind: "진짜 동사" },
    { en: "the [[{sleeping|현재분사:자고 있는}]] baby", ko: "자고 있는 아기", kind: "형용사로 변장" },
  ];
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {rows.map((r, i) => (
        <li key={r.kind} className={`rounded-2xl px-4 py-4 text-center ${i === 0 ? "bg-coral-soft" : "bg-mint-soft"}`}>
          {i === 0 ? (
            <span className="mx-auto block w-fit rounded-lg bg-coral px-2.5 py-1 text-[14px] font-extrabold text-white">{r.kind}</span>
          ) : (
            <span className="mx-auto flex w-fit items-center gap-1.5 rounded-lg bg-card px-2.5 py-1 text-[14px] font-extrabold text-mint-ink">
              <MaskIcon size={20} /> {r.kind}
            </span>
          )}
          <p className="mt-3 text-[1.25em] font-medium">
            <En en={r.en} />
          </p>
          <p className="text-[14px] text-ink-2">{r.ko}</p>
        </li>
      ))}
    </ul>
  );
}

/* ───────── 사람도 감정의 원인이 될 수 있어요 ───────── */

type PtActorKind = "person" | "people" | "screen";

/** 감정 화살의 양 끝에 서는 그림 조각 (그, 친구들, 영화) */
function PtActor({ kind, label, focus }: { kind: PtActorKind; label: string; focus: boolean }) {
  return (
    <span
      className={`inline-flex min-w-[72px] flex-col items-center gap-1 rounded-xl px-2 py-1.5 ${
        focus ? "bg-card ring-2 ring-coral" : "bg-card"
      }`}
    >
      {kind === "screen" ? (
        <PtScreenIcon />
      ) : kind === "people" ? (
        <span className="flex">
          <PersonIcon size={30} className="text-ink-2" />
          <PersonIcon size={30} className="-ml-2 text-ink-2" />
        </span>
      ) : (
        <PersonIcon size={34} className="text-ink" />
      )}
      <span className="text-[14px] font-extrabold">{label}</span>
    </span>
  );
}

const PT_CAUSE: {
  key: string;
  tag: string;
  tone: string;
  from: { kind: PtActorKind; label: string; focus: boolean };
  to: { kind: PtActorKind; label: string; focus: boolean };
  en: string;
  ko: string;
  who: string;
}[] = [
  {
    key: "cause",
    tag: "그가 감정을 일으키면 → -ing",
    tone: "bg-coral-soft text-coral-ink",
    from: { kind: "person", label: "그", focus: true },
    to: { kind: "people", label: "친구들", focus: false },
    en: "He is [[{boring|형용사:지루한 (남을 지루하게 하는)}]].",
    ko: "그는 지루한 사람이야.",
    who: "그가 화살을 쏘는 쪽이에요.",
  },
  {
    key: "feel",
    tag: "그가 감정을 느끼면 → p.p.",
    tone: "bg-sky-soft text-sky-ink",
    from: { kind: "screen", label: "긴 영화", focus: false },
    to: { kind: "person", label: "그", focus: true },
    en: "He is [[{bored|형용사:지루해하는}]].",
    ko: "그는 지루해하고 있어.",
    who: "그가 화살을 맞는 쪽이에요.",
  },
];

/** 같은 사람 주어라도 감정을 주면 -ing, 느끼면 p.p. */
export function PtPersonCause() {
  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2">
        {PT_CAUSE.map((c) => (
          <div key={c.key} className="rounded-2xl border border-line px-4 py-4">
            <p className={`w-fit rounded-lg px-2.5 py-1 text-[14.5px] font-extrabold ${c.tone}`}>{c.tag}</p>
            <div className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-chip px-2 py-2.5">
              <PtActor {...c.from} />
              <span className="flex flex-col items-center">
                <ArrowRight size={28} className="text-coral" />
                <span className="text-[14px] font-bold text-ink-2">지루함</span>
              </span>
              <PtActor {...c.to} />
            </div>
            <p className="mt-3 text-[1.15em] font-medium">
              <En en={c.en} />
            </p>
            <p className="text-[14px] text-ink-2">{c.ko}</p>
            <p className="mt-1 text-[14px] font-bold text-ink-3">{c.who}</p>
          </div>
        ))}
      </div>
      <p className="mt-3 rounded-xl bg-chip px-3 py-2.5 text-center text-[14px] font-bold">
        사람이냐 사물이냐가 아니라, 감정의 화살을 쏘느냐 맞느냐로 정해요.
      </p>
    </div>
  );
}

/* ───────── 목적격보어 자리의 분사: 숨은 문장으로 판단 ───────── */

type PtBitTone = "plain" | "noun" | "ing" | "pp";

function PtBit({ en, tone }: { en: string; tone: PtBitTone }) {
  const cls =
    tone === "noun"
      ? "bg-marker text-ink"
      : tone === "ing"
        ? "bg-mint-soft text-mint-ink"
        : tone === "pp"
          ? "bg-sky-soft text-sky-ink"
          : "text-ink";
  return (
    <span className={`rounded-lg px-1.5 py-0.5 font-medium ${cls}`}>
      <En en={en} />
    </span>
  );
}

const PT_HIDDEN: { key: string; bits: { en: string; tone: PtBitTone }[]; hidden: { en: string }; judge: string; tone: string }[] = [
  {
    key: "ing",
    bits: [
      { en: "I saw", tone: "plain" },
      { en: "Minsu", tone: "noun" },
      { en: "crossing", tone: "ing" },
      { en: "the street.", tone: "plain" },
    ],
    hidden: { en: "Minsu is crossing the street." },
    judge: "민수가 건너요 → 하는 쪽 → -ing",
    tone: "bg-mint-soft text-mint-ink",
  },
  {
    key: "pp",
    bits: [
      { en: "I heard", tone: "plain" },
      { en: "my name", tone: "noun" },
      { en: "{called|과거분사:불린}.", tone: "pp" },
    ],
    hidden: { en: "My name is called." },
    judge: "이름이 불려요 → 당하는 쪽 → p.p.",
    tone: "bg-sky-soft text-sky-ink",
  },
];

/** 목적어 + 분사 사이의 숨은 문장: 목적어가 하면 -ing, 당하면 p.p. */
export function PtHiddenSentence() {
  return (
    <div>
      <p className="flex flex-wrap items-center justify-center gap-2 text-[15px] font-extrabold">
        <span className="rounded-lg bg-marker px-2.5 py-1">목적어</span>
        <span aria-hidden>+</span>
        <span className="rounded-lg bg-mint-soft px-2.5 py-1 text-mint-ink">-ing</span>
        <span className="text-ink-3">또는</span>
        <span className="rounded-lg bg-sky-soft px-2.5 py-1 text-sky-ink">p.p.</span>
      </p>
      <ul className="mt-3 grid gap-3 sm:grid-cols-2">
        {PT_HIDDEN.map((h) => (
          <li key={h.key} className="rounded-2xl border border-line px-4 py-3.5">
            <p className="flex flex-wrap items-center gap-1 text-[1.1em]">
              {h.bits.map((b) => (
                <PtBit key={b.en} en={b.en} tone={b.tone} />
              ))}
            </p>
            <p className="mt-2 text-[14px] text-ink-3">숨은 문장</p>
            <p className="text-[1.02em] font-medium">
              <En en={h.hidden.en} />
            </p>
            <p className={`mt-2 w-fit rounded-lg px-2.5 py-1 text-[14px] font-extrabold ${h.tone}`}>{h.judge}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
