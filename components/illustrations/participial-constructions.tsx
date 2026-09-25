import { En } from "@/components/lesson/En";
import { ArrowRight, CrownIcon, MaskIcon } from "./icons";

/* 분사구문 장 그림: 만드는 3단계, 여섯 가지 뜻, 모양 고르기 표, 완료 분사구문의 시간, 주인 찾기, with + 명사 + 분사 */

/* ───────── 만드는 3단계 ───────── */

type Pc2Kind = "plain" | "cut" | "conj" | "verb" | "verbal" | "keep";
type Pc2Bit = { en: string; kind: Pc2Kind };

function Pc2Word({ bit }: { bit: Pc2Bit }) {
  switch (bit.kind) {
    case "cut":
      // 지운 단어는 뜻 풍선 없이 줄만 긋는다 (버튼에는 취소선이 이어지지 않아서)
      return (
        <span className="rounded-lg border border-dashed border-ink-3 px-1.5 py-0.5 text-ink-3 line-through decoration-coral decoration-2">
          {bit.en}
        </span>
      );
    case "conj":
      return (
        <span className="rounded-lg bg-sky-soft px-1.5 py-0.5 text-sky-ink">
          <En en={bit.en} />
        </span>
      );
    case "verb":
      return (
        <span className="inline-flex items-center gap-1 rounded-lg bg-coral px-1.5 py-0.5 text-white">
          <CrownIcon size={16} />
          <En en={bit.en} />
        </span>
      );
    case "verbal":
      return (
        <span className="inline-flex items-center gap-1 rounded-lg bg-mint-soft px-1.5 py-0.5 text-mint-ink">
          <MaskIcon size={18} />
          <En en={bit.en} />
        </span>
      );
    case "keep":
      // 지우지 않고 남기는 주어: 형광 표시
      return (
        <span className="rounded-lg bg-marker px-1.5 py-0.5 text-ink">
          <En en={bit.en} />
        </span>
      );
    default:
      return (
        <span className="py-0.5">
          <En en={bit.en} />
        </span>
      );
  }
}

type Pc2StepData = { key: string; step: string; title: string; bits: Pc2Bit[]; note: string; last?: boolean };

const PC2_STEPS: Pc2StepData[] = [
  {
    key: "start",
    step: "처음",
    title: "부사절 + 주절",
    bits: [
      { en: "{When|접속사:~할 때}", kind: "conj" },
      { en: "I", kind: "plain" },
      { en: "walked", kind: "verb" },
      { en: "home,", kind: "plain" },
      { en: "I", kind: "plain" },
      { en: "met", kind: "verb" },
      { en: "Minsu.", kind: "plain" },
    ],
    note: "접속사 1개 → 진짜 동사 2개",
  },
  {
    key: "s1",
    step: "1단계",
    title: "접속사를 지워요",
    bits: [
      { en: "When", kind: "cut" },
      { en: "I", kind: "plain" },
      { en: "walked", kind: "verb" },
      { en: "home,", kind: "plain" },
      { en: "I", kind: "plain" },
      { en: "met", kind: "verb" },
      { en: "Minsu.", kind: "plain" },
    ],
    note: "접속사가 0개가 되면 진짜 동사도 1개만 남아야 해요.",
  },
  {
    key: "s2",
    step: "2단계",
    title: "주어가 주절과 같으면 지워요",
    bits: [
      { en: "I", kind: "cut" },
      { en: "walked", kind: "verb" },
      { en: "home,", kind: "plain" },
      { en: "I", kind: "plain" },
      { en: "met", kind: "verb" },
      { en: "Minsu.", kind: "plain" },
    ],
    note: "앞의 I와 뒤의 I는 같은 사람이에요.",
  },
  {
    key: "s3",
    step: "3단계",
    title: "동사를 -ing로 바꿔요",
    bits: [
      { en: "Walking", kind: "verbal" },
      { en: "home,", kind: "plain" },
      { en: "I", kind: "plain" },
      { en: "met", kind: "verb" },
      { en: "Minsu.", kind: "plain" },
    ],
    note: "walked는 왕관을 벗고 분사로 변장! 과거라는 건 주절의 met이 알려 줘요.",
    last: true,
  },
];

/** 단계별로 문장이 바뀌는 모습을 차례로 보여 주는 목록 */
function Pc2StepList({ steps }: { steps: Pc2StepData[] }) {
  return (
    <ol className="space-y-2.5">
      {steps.map((s) => (
        <li key={s.key} className={`rounded-2xl px-4 py-3 ${s.last ? "bg-mint-soft/60 ring-2 ring-mint-ink/40" : "border border-line"}`}>
          <p className="flex flex-wrap items-baseline gap-x-2">
            <span className={`rounded-lg px-2 py-0.5 text-[13.5px] font-extrabold ${s.key === "start" ? "bg-chip text-ink-2" : "bg-ink text-on-ink"}`}>
              {s.step}
            </span>
            <span className="font-extrabold">{s.title}</span>
          </p>
          <p lang="en" className="mt-2 flex flex-wrap items-center gap-x-1.5 gap-y-2 text-[1.12em] font-medium">
            {s.bits.map((b, i) => (
              <Pc2Word key={i} bit={b} />
            ))}
          </p>
          <p className="mt-1.5 text-[13.5px] text-ink-2">{s.note}</p>
        </li>
      ))}
    </ol>
  );
}

/** 부사절 → 분사구문: 접속사 지우기 → 같은 주어 지우기 → 동사를 -ing로 */
export function Pc2ThreeSteps() {
  return <Pc2StepList steps={PC2_STEPS} />;
}

/* ───────── 독립분사구문: 주어가 다르면 남겨요 ───────── */

const PC2_ABS_STEPS: Pc2StepData[] = [
  {
    key: "start",
    step: "처음",
    title: "부사절 + 주절",
    bits: [
      { en: "Because", kind: "conj" },
      { en: "{it|비인칭 주어:날씨를 말하는 it}", kind: "plain" },
      { en: "was", kind: "verb" },
      { en: "{fine|형용사:(날씨가) 맑은},", kind: "plain" },
      { en: "we", kind: "plain" },
      { en: "went", kind: "verb" },
      { en: "on a picnic.", kind: "plain" },
    ],
    note: "접속사 1개 → 진짜 동사 2개 (was, went)",
  },
  {
    key: "s1",
    step: "1단계",
    title: "접속사를 지워요",
    bits: [
      { en: "Because", kind: "cut" },
      { en: "{it|비인칭 주어:날씨를 말하는 it}", kind: "plain" },
      { en: "was", kind: "verb" },
      { en: "{fine|형용사:(날씨가) 맑은},", kind: "plain" },
      { en: "we", kind: "plain" },
      { en: "went", kind: "verb" },
      { en: "on a picnic.", kind: "plain" },
    ],
    note: "접속사가 0개가 되면 진짜 동사도 1개만 남아야 해요.",
  },
  {
    key: "s2",
    step: "2단계",
    title: "두 주어를 견줘 봐요: 다르면 남겨요",
    bits: [
      { en: "{it|비인칭 주어:날씨를 말하는 it}", kind: "keep" },
      { en: "was", kind: "verb" },
      { en: "{fine|형용사:(날씨가) 맑은},", kind: "plain" },
      { en: "we", kind: "keep" },
      { en: "went", kind: "verb" },
      { en: "on a picnic.", kind: "plain" },
    ],
    note: "날씨의 it과 우리(we)는 달라요. it을 지우면 주인이 we로 읽혀서 '우리가 맑아서'가 돼 버려요. 그래서 남겨요.",
  },
  {
    key: "s3",
    step: "3단계",
    title: "동사를 -ing로 바꿔요",
    bits: [
      { en: "{It|비인칭 주어:날씨를 말하는 it}", kind: "keep" },
      { en: "being", kind: "verbal" },
      { en: "{fine|형용사:(날씨가) 맑은},", kind: "plain" },
      { en: "we", kind: "plain" },
      { en: "went", kind: "verb" },
      { en: "on a picnic.", kind: "plain" },
    ],
    note: "was → being. 주어 It이 분사 앞에 그대로 남은 모양이 독립분사구문이에요.",
    last: true,
  },
];

/** 부사절의 주어가 주절의 주어와 다르면 지우지 않고 분사 앞에 남긴다 */
export function Pc2AbsoluteSteps() {
  return <Pc2StepList steps={PC2_ABS_STEPS} />;
}

/* ───────── 분사구문의 여섯 가지 뜻 ───────── */

const PC2_MEANINGS: { name: string; conj: string; en: string; ko: string }[] = [
  { name: "시간", conj: "when, while: ~할 때, ~하다가", en: "[[Walking]] along the beach, we found a shell.", ko: "해변을 걷다가 조개껍데기를 찾았어." },
  { name: "이유", conj: "because, as: ~해서, ~ 때문에", en: "[[Feeling]] tired, I went to bed early.", ko: "피곤해서 일찍 잤어." },
  { name: "조건", conj: "if: ~하면", en: "[[Turning]] {left|부사:왼쪽으로}, you will see the library.", ko: "왼쪽으로 돌면 도서관이 보일 거야." },
  { name: "양보", conj: "although: ~이지만", en: "[[Living]] {next door|부사:옆집에}, I rarely see her.", ko: "옆집에 살지만 그녀를 거의 못 봐." },
  { name: "동시동작", conj: "as: ~하면서", en: "[[Smiling]] brightly, she waved at me.", ko: "환하게 웃으면서 나에게 손을 흔들었어." },
  { name: "연속동작", conj: "and: 그리고 ~하다", en: "The bus left at nine, [[arriving]] in Busan at noon.", ko: "버스는 9시에 떠나서 정오에 부산에 도착했어." },
];

/** 지운 접속사는 문맥으로 되살려 읽는다 */
export function Pc2Meanings() {
  return (
    <ul className="grid gap-2.5 sm:grid-cols-2">
      {PC2_MEANINGS.map((m) => (
        <li key={m.name} className="rounded-2xl border border-line px-3.5 py-3">
          <p className="flex flex-wrap items-baseline gap-x-2">
            <span className="rounded-lg bg-amber-soft px-2 py-0.5 text-[13.5px] font-extrabold text-amber-ink">{m.name}</span>
            <span className="text-[13.5px] text-ink-2">{m.conj}</span>
          </p>
          <p className="mt-2 text-[1.05em] font-medium">
            <En en={m.en} />
          </p>
          <p className="text-[13.5px] text-ink-2">{m.ko}</p>
        </li>
      ))}
    </ul>
  );
}

/* ───────── 모양 고르기: 때 × 관계 ───────── */

const PC2_FORMS: { key: string; time: string; rel: string; form: string; en: string; ko: string; tone: string }[] = [
  {
    key: "same-active",
    time: "주절과 같은 때",
    rel: "주어가 한다",
    form: "-ing",
    en: "[[Walking]] home, I met Minsu.",
    ko: "집에 걸어가다가 민수를 만났어.",
    tone: "bg-mint-soft text-mint-ink",
  },
  {
    key: "same-passive",
    time: "주절과 같은 때",
    rel: "주어가 당한다",
    form: "(Being) p.p.",
    en: "[[Seen]] from the sky, the island {looks like} a {heart|명사:하트 (모양)}.",
    ko: "하늘에서 보면 그 섬은 하트처럼 보여.",
    tone: "bg-sky-soft text-sky-ink",
  },
  {
    key: "before-active",
    time: "주절보다 먼저",
    rel: "주어가 한다",
    form: "Having p.p.",
    en: "[[{Having|조동사:완료형을 만드는 말 (have의 -ing형)} finished]] my homework, I went out.",
    ko: "숙제를 끝내고 나서 나갔어.",
    tone: "bg-mint-soft text-mint-ink",
  },
  {
    key: "before-passive",
    time: "주절보다 먼저",
    rel: "주어가 당한다",
    form: "(Having been) p.p.",
    en: "[[Built]] long ago, the bridge needs {repair|명사:수리}.",
    ko: "오래전에 지어져서 그 다리는 수리가 필요해.",
    tone: "bg-sky-soft text-sky-ink",
  },
];

/** 때(같은 때/먼저)와 관계(하는 쪽/당하는 쪽)로 분사구문의 모양이 정해진다 */
export function Pc2FormGrid() {
  return (
    <ul className="grid gap-2.5 sm:grid-cols-2">
      {PC2_FORMS.map((f) => (
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

/* ───────── 완료 분사구문: 주절보다 먼저 ───────── */

const PC2_BEFORE = { en: "[[{Having|조동사:완료형을 만드는 말 (have의 -ing형)} finished]] my homework,", ko: "숙제를 끝냈어요" };
const PC2_AFTER = { en: "I went out to play.", ko: "놀러 나갔어요" };

/** Having p.p.는 주절보다 한 칸 앞선 일 */
export function Pc2HavingTimeline() {
  return (
    <div>
      <svg viewBox="0 0 320 40" className="mx-auto w-full max-w-md" aria-hidden>
        <path d="M10 20 H300" strokeWidth="2.5" style={{ stroke: "var(--ink-3)" }} />
        <path d="M292 13 L302 20 L292 27" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: "var(--ink-3)" }} />
        <circle cx="80" cy="20" r="9" style={{ fill: "var(--sky-ink)" }} />
        <circle cx="230" cy="20" r="9" style={{ fill: "var(--coral)" }} />
        <path d="M94 14 Q155 -4 216 14" fill="none" strokeWidth="3" strokeLinecap="round" style={{ stroke: "var(--coral)" }} />
      </svg>
      <div className="mt-2 grid gap-2 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
        <div className="rounded-2xl bg-sky-soft px-3.5 py-3">
          <p className="text-[13.5px] font-extrabold text-sky-ink">① 먼저 · Having p.p.</p>
          <p className="mt-1 text-[1.05em] font-medium">
            <En en={PC2_BEFORE.en} />
          </p>
          <p className="text-[13.5px] text-ink-2">{PC2_BEFORE.ko}</p>
        </div>
        <ArrowRight size={26} className="mx-auto rotate-90 text-ink-3 sm:rotate-0" />
        <div className="rounded-2xl bg-coral-soft px-3.5 py-3">
          <p className="text-[13.5px] font-extrabold text-coral-ink">② 나중 · 주절</p>
          <p className="mt-1 text-[1.05em] font-medium">
            <En en={PC2_AFTER.en} />
          </p>
          <p className="text-[13.5px] text-ink-2">{PC2_AFTER.ko}</p>
        </div>
      </div>
    </div>
  );
}

/* ───────── 분사구문의 주인 찾기: 하면 -ing, 당하면 p.p. ───────── */

const PC2_OWNERS: { key: string; en: string; owner: { en: string }; q: string; a: string; tone: string }[] = [
  {
    key: "passive",
    en: "[[Seen]] from the sky, the island {looks like} a {heart|명사:하트 (모양)}.",
    owner: { en: "the island" },
    q: "섬이 보나요, 보이나요?",
    a: "보여요 → 당하는 쪽 → p.p.",
    tone: "bg-sky-soft text-sky-ink",
  },
  {
    key: "active",
    en: "[[Seeing]] the island from the plane, I took a picture.",
    owner: { en: "I" },
    q: "내가 보나요, 보이나요?",
    a: "내가 봐요 → 하는 쪽 → -ing",
    tone: "bg-mint-soft text-mint-ink",
  },
];

/** 분사구문의 주인은 주절의 주어 */
export function Pc2WhoDoes() {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {PC2_OWNERS.map((o) => (
        <li key={o.key} className="rounded-2xl border border-line px-4 py-3.5">
          <p className="text-[1.08em] font-medium">
            <En en={o.en} />
          </p>
          <p className="mt-2.5 flex flex-wrap items-center gap-2 text-[13.5px] font-bold">
            <span className="text-ink-3">주인(주절의 주어)</span>
            <span className="rounded-lg bg-marker px-2 py-0.5 text-[14.5px] text-ink">
              <En en={o.owner.en} />
            </span>
          </p>
          <p className="mt-1.5 text-[13.5px] text-ink-2">{o.q}</p>
          <p className={`mt-1.5 w-fit rounded-lg px-2.5 py-1 text-[13.5px] font-extrabold ${o.tone}`}>{o.a}</p>
        </li>
      ))}
    </ul>
  );
}

/* ───────── with + 명사 + 분사 ───────── */

const PC2_WITH: { key: string; en: string; hidden: { en: string }; judge: string; tone: string }[] = [
  {
    key: "pp",
    en: "with his eyes [[{closed|과거분사:감긴}]]",
    hidden: { en: "His eyes are closed." },
    judge: "눈이 감겨요 → 당하는 쪽 → p.p.",
    tone: "bg-sky-soft text-sky-ink",
  },
  {
    key: "ing",
    en: "with its tail [[{wagging|현재분사:흔들리는}]]",
    hidden: { en: "Its tail is wagging." },
    judge: "꼬리가 흔들려요 → 스스로 움직여요 → -ing",
    tone: "bg-mint-soft text-mint-ink",
  },
];

/** with + 명사 + 분사: 명사와 분사 사이의 숨은 문장으로 판단한다 */
export function Pc2WithNoun() {
  return (
    <div>
      <p className="flex flex-wrap items-center justify-center gap-2 text-[14.5px] font-extrabold">
        <span lang="en" className="rounded-lg bg-chip px-2.5 py-1">
          with
        </span>
        <span>+</span>
        <span className="rounded-lg bg-marker px-2.5 py-1">명사</span>
        <span>+</span>
        <span className="rounded-lg bg-mint-soft px-2.5 py-1 text-mint-ink">-ing</span>
        <span className="text-ink-3">또는</span>
        <span className="rounded-lg bg-sky-soft px-2.5 py-1 text-sky-ink">p.p.</span>
      </p>
      <ul className="mt-3 grid gap-3 sm:grid-cols-2">
        {PC2_WITH.map((w) => (
          <li key={w.key} className="rounded-2xl border border-line px-4 py-3.5">
            <p className="text-[1.15em] font-medium">
              <En en={w.en} />
            </p>
            <p className="mt-2 text-[13.5px] text-ink-3">숨은 문장</p>
            <p className="text-[1.02em] font-medium">
              <En en={w.hidden.en} />
            </p>
            <p className={`mt-2 w-fit rounded-lg px-2.5 py-1 text-[13.5px] font-extrabold ${w.tone}`}>{w.judge}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
