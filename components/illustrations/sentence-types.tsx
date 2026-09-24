import { En } from "@/components/lesson/En";
import { ArrowRight } from "./icons";

/* 문장의 종류 장 그림: 의문사 카드, 의문문 어순, 명령문 네 가지, What/How 감탄문, There is 뜯어보기, 부가의문문 뒤집기, 부정의문문 대답 */

type Tone = "sky" | "mint" | "amber" | "coral" | "solid" | "chip" | "line";

const TONE: Record<Tone, string> = {
  sky: "bg-sky-soft text-sky-ink",
  mint: "bg-mint-soft text-mint-ink",
  amber: "bg-amber-soft text-amber-ink",
  coral: "bg-coral-soft text-coral-ink",
  solid: "bg-coral text-white",
  chip: "bg-chip text-ink",
  line: "border border-line text-ink",
};

/* ── 도우미 (컴포넌트 밖, 파일 최상단) ── */

function WordChip({ en, tone, label }: { en: string; tone: Tone; label?: string }) {
  return (
    <span className="inline-flex flex-col items-center gap-1">
      <span className={`rounded-xl px-2.5 py-1.5 text-[1.12em] font-medium leading-none ${TONE[tone]}`}>
        <En en={en} />
      </span>
      {label && <span className="text-[14px] font-bold leading-tight text-ink-2">{label}</span>}
    </span>
  );
}

function FormulaChip({ t, tone, en = false }: { t: string; tone: Tone; en?: boolean }) {
  return (
    <span lang={en ? "en" : undefined} className={`rounded-lg px-2 py-1 text-[15px] font-extrabold leading-none ${TONE[tone]}`}>
      {t}
    </span>
  );
}

function SignBadge({ sign }: { sign: "+" | "−" }) {
  return (
    <span
      aria-label={sign === "+" ? "긍정" : "부정"}
      className={`grid size-7 shrink-0 place-items-center rounded-full text-[16px] font-extrabold ${
        sign === "+" ? "bg-mint-soft text-mint-ink" : "bg-coral-soft text-coral-ink"
      }`}
    >
      {sign}
    </span>
  );
}

/* ── 1. 의문사 여덟 개 ── */

const WH_WORDS: { en: string; ko: string; asks: string; tone: Tone }[] = [
  { en: "who", ko: "누구", asks: "사람", tone: "sky" },
  { en: "what", ko: "무엇", asks: "사물·일", tone: "mint" },
  { en: "when", ko: "언제", asks: "때", tone: "amber" },
  { en: "where", ko: "어디", asks: "장소", tone: "amber" },
  { en: "why", ko: "왜", asks: "이유", tone: "coral" },
  { en: "how", ko: "어떻게", asks: "방법·상태", tone: "coral" },
  { en: "which", ko: "어느 것", asks: "보기 중 고르기", tone: "mint" },
  { en: "whose", ko: "누구의", asks: "주인", tone: "sky" },
];

/** 의문사 여덟 개: 무엇을 묻는 말인지 */
export function StWhWords() {
  return (
    <div>
      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {WH_WORDS.map((w) => (
          <li key={w.en} className={`rounded-2xl px-3 py-3 text-center ${TONE[w.tone]}`}>
            <span className="block text-[1.35em] font-bold leading-tight">
              <En en={w.en} />
            </span>
            <span className="mt-1 block text-[15px] font-extrabold">{w.ko}</span>
            <span className="block text-[14px] opacity-80">{w.asks}</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-center text-[14px] text-ink-2">
        how만 빼고 모두 <b lang="en">wh</b>로 시작해요. 그래서 영어로는 wh-word라고도 불러요.
      </p>
    </div>
  );
}

/* ── 2. 평서문 → 의문문 → 의문사 의문문 ── */

const ORDER_STEPS: { step: string; note: string; words: { en: string; tone: Tone; label?: string }[] }[] = [
  {
    step: "① 평서문",
    note: "그녀는 피자를 좋아해.",
    words: [
      { en: "She", tone: "sky", label: "주어" },
      { en: "likes", tone: "mint", label: "동사" },
      { en: "pizza.", tone: "line" },
    ],
  },
  {
    step: "② Yes/No 의문문",
    note: "does를 주어 앞에 세우면 likes는 원형 like로 돌아가요.",
    words: [
      { en: "Does", tone: "amber", label: "does" },
      { en: "she", tone: "sky", label: "주어" },
      { en: "like", tone: "mint", label: "동사원형" },
      { en: "pizza?", tone: "line" },
    ],
  },
  {
    step: "③ 의문사 의문문",
    note: "궁금한 부분(pizza)을 What으로 바꿔 맨 앞에 세워요. 나머지 순서는 ②와 같아요.",
    words: [
      { en: "What", tone: "solid", label: "의문사" },
      { en: "does", tone: "amber", label: "does" },
      { en: "she", tone: "sky", label: "주어" },
      { en: "like?", tone: "mint", label: "동사원형" },
    ],
  },
];

/** 의문사 의문문의 어순: 의문사 + 의문문 */
export function StWordOrder() {
  return (
    <ol className="space-y-2.5">
      {ORDER_STEPS.map((s) => (
        <li key={s.step} className="rounded-2xl border border-line px-4 py-3">
          <p className="text-[14px] font-extrabold text-ink-3">{s.step}</p>
          <p className="mt-2 flex flex-wrap items-start gap-x-2 gap-y-2">
            {s.words.map((w) => (
              <WordChip key={w.en} en={w.en} tone={w.tone} label={w.label} />
            ))}
          </p>
          <p className="mt-2 text-[14px] text-ink-2">{s.note}</p>
        </li>
      ))}
    </ol>
  );
}

/* ── 3. 명령문과 제안문 네 가지 ── */

const COMMANDS: { title: string; how: string; en: string; ko: string; tone: Tone }[] = [
  { title: "시키기", how: "동사원형으로 시작", en: "[[Sit]] down.", ko: "앉아.", tone: "coral" },
  { title: "말리기", how: "Don't + 동사원형", en: "[[Don't sit]] down.", ko: "앉지 마.", tone: "amber" },
  { title: "부드럽게", how: "please를 앞이나 뒤에", en: "[[Please]] sit down.", ko: "앉으세요.", tone: "mint" },
  { title: "같이 하자", how: "Let's + 동사원형", en: "[[Let's sit]] down.", ko: "우리 앉자.", tone: "sky" },
];

/** 명령문: you를 빼고 동사원형부터. 그리고 네 가지 변신 */
export function StCommandCards() {
  return (
    <div>
      <p className="flex flex-wrap items-center justify-center gap-2 text-[1.2em] font-medium">
        <span
          lang="en"
          className="rounded-lg border-2 border-dashed border-line px-2 py-0.5 text-ink-3 line-through decoration-coral decoration-2"
        >
          You
        </span>
        <En en="[[Sit]] down." />
      </p>
      <p className="mt-1.5 text-center text-[14px] text-ink-2">
        명령은 늘 눈앞의 너(you)에게 하는 말이라서 you를 빼고 동사원형부터 말해요.
      </p>
      <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {COMMANDS.map((c) => (
          <li key={c.title} className="rounded-2xl border border-line px-3 py-3">
            <span className={`inline-block rounded-lg px-2 py-0.5 text-[14px] font-extrabold ${TONE[c.tone]}`}>{c.title}</span>
            <span className="mt-2 block text-[1.08em] font-medium leading-snug">
              <En en={c.en} />
            </span>
            <span className="block text-[14px] text-ink-2">{c.ko}</span>
            <span className="mt-1.5 block text-[14px] font-bold text-ink-3">{c.how}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── 4. What 감탄문과 How 감탄문 ── */

const EXCLAIMS: { when: string; formula: { t: string; tone: Tone; en?: boolean }[]; en: string; ko: string }[] = [
  {
    when: "명사가 있으면 What",
    formula: [
      { t: "What", tone: "solid", en: true },
      { t: "a/an", tone: "chip", en: true },
      { t: "형용사", tone: "mint" },
      { t: "명사", tone: "sky" },
      { t: "(주어 + 동사)", tone: "line" },
      { t: "!", tone: "line" },
    ],
    en: "[[{What|의문사:(감탄문) 정말 ~한} a cute dog]] it is!",
    ko: "정말 귀여운 강아지구나!",
  },
  {
    when: "형용사·부사만 있으면 How",
    formula: [
      { t: "How", tone: "solid", en: true },
      { t: "형용사·부사", tone: "mint" },
      { t: "(주어 + 동사)", tone: "line" },
      { t: "!", tone: "line" },
    ],
    en: "[[{How|의문사:(감탄문) 정말, 얼마나} cute]] it is!",
    ko: "정말 귀엽구나!",
  },
];

const NO_A: { en: string; ko: string; why: string }[] = [
  { en: "[[{What|의문사:(감탄문) 정말 ~한} cute dogs]]!", ko: "정말 귀여운 강아지들이다!", why: "복수" },
  { en: "[[{What|의문사:(감탄문) 정말 ~한} nice weather]]!", ko: "날씨 정말 좋다!", why: "셀 수 없는 명사" },
];

/** 감탄문의 두 가지 틀 */
export function StWhatHow() {
  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2">
        {EXCLAIMS.map((x) => (
          <div key={x.when} className="rounded-2xl border border-line px-4 py-4">
            <p className="font-extrabold">{x.when}</p>
            <p className="mt-2 flex flex-wrap items-center gap-1.5">
              {x.formula.map((f, i) => (
                <FormulaChip key={i} t={f.t} tone={f.tone} en={f.en} />
              ))}
            </p>
            <p className="mt-3 text-[1.1em] font-medium">
              <En en={x.en} />
            </p>
            <p className="text-[14px] text-ink-2">{x.ko}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-2xl bg-chip px-4 py-3">
        <p className="text-[14px] font-extrabold text-ink-2">a/an을 빼는 때: 여럿이거나 셀 수 없을 때</p>
        <ul className="mt-1.5 space-y-1">
          {NO_A.map((n) => (
            <li key={n.why} className="flex flex-wrap items-baseline gap-x-2">
              <span className="text-[1.08em] font-medium">
                <En en={n.en} />
              </span>
              <span className="text-[14px] text-ink-2">
                {n.ko} ({n.why})
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ── 5. There is / There are 뜯어보기 ── */

const THERE_ROWS: { parts: { en: string; tone: Tone; label: string }[]; why: string; ko: string }[] = [
  {
    parts: [
      { en: "{There|부사:(해석하지 않는) 자리 채움 말}", tone: "chip", label: "해석 안 해요" },
      { en: "is", tone: "solid", label: "동사" },
      { en: "a dog", tone: "sky", label: "진짜 주어" },
      { en: "in the park.", tone: "line", label: "장소" },
    ],
    why: "a dog는 하나 → is",
    ko: "공원에 개가 한 마리 있어.",
  },
  {
    parts: [
      { en: "{There|부사:(해석하지 않는) 자리 채움 말}", tone: "chip", label: "해석 안 해요" },
      { en: "are", tone: "solid", label: "동사" },
      { en: "three dogs", tone: "sky", label: "진짜 주어" },
      { en: "in the park.", tone: "line", label: "장소" },
    ],
    why: "three dogs는 여럿 → are",
    ko: "공원에 개가 세 마리 있어.",
  },
];

/** There is/are: there는 자리만 채우고, 동사는 뒤의 진짜 주어를 보고 정한다 */
export function StThereLook() {
  return (
    <ul className="space-y-2.5">
      {THERE_ROWS.map((r) => (
        <li key={r.why} className="rounded-2xl border border-line px-4 py-3">
          <p className="flex flex-wrap items-start gap-x-2 gap-y-2">
            {r.parts.map((p, i) => (
              <WordChip key={i} en={p.en} tone={p.tone} label={p.label} />
            ))}
          </p>
          <p className="mt-2 text-[14px] text-ink-2">{r.ko}</p>
          <p className="mt-1 flex items-center gap-1.5 text-[14px] font-bold text-coral-ink">
            <ArrowRight size={16} className="rotate-180" />
            동사는 뒤를 봐요: {r.why}
          </p>
        </li>
      ))}
    </ul>
  );
}

/* ── 6. 부가의문문: 앞과 꼬리는 반대 ── */

const TAG_ROWS: { parts: [{ en: string; sign: "+" | "−" }, { en: string; sign: "+" | "−" }]; steps: string; ko: string }[] = [
  {
    parts: [
      { en: "You are hungry,", sign: "+" },
      { en: "[[aren't you]]?", sign: "−" },
    ],
    steps: "be동사 are → aren't, 주어 you → you",
    ko: "너 배고프지, 그렇지?",
  },
  {
    parts: [
      { en: "Minsu doesn't like milk,", sign: "−" },
      { en: "[[does he]]?", sign: "+" },
    ],
    steps: "일반동사라 does, 부정 → 긍정, Minsu → he",
    ko: "민수는 우유를 안 좋아하지, 그렇지?",
  },
];

/** 부가의문문 뒤집기: 긍정이면 부정 꼬리, 부정이면 긍정 꼬리 */
export function StTagFlip() {
  return (
    <ul className="space-y-3">
      {TAG_ROWS.map((r) => (
        <li key={r.ko} className="rounded-2xl border border-line px-4 py-3">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <span className="flex items-center gap-2">
              <SignBadge sign={r.parts[0].sign} />
              <span className="text-[1.12em] font-medium">
                <En en={r.parts[0].en} />
              </span>
            </span>
            <span className="flex items-center gap-1 pl-1 text-[14px] font-bold text-ink-3 sm:pl-0">
              <ArrowRight size={18} className="rotate-90 sm:rotate-0" />
              뒤집기
            </span>
            <span className="flex items-center gap-2 rounded-xl bg-chip px-2.5 py-1.5 sm:w-fit">
              <SignBadge sign={r.parts[1].sign} />
              <span className="text-[1.12em] font-medium">
                <En en={r.parts[1].en} />
              </span>
            </span>
          </div>
          <p className="mt-2 text-[14px] text-ink-2">{r.ko}</p>
          <p className="text-[14px] font-bold text-ink-3">{r.steps}</p>
        </li>
      ))}
    </ul>
  );
}

/* ── 7. 부정의문문의 대답: 영어는 내용, 우리말은 상대 말 ── */

const ANSWER_COLS: { fact: string; en: string; ko: string; koWord: string }[] = [
  { fact: "배가 고프면", en: "[[Yes]], I am.", koWord: "아니,", ko: "배고파." },
  { fact: "배가 안 고프면", en: "[[{No|부사:아니(요)}]], I'm not.", koWord: "응,", ko: "안 고파." },
];

/** 부정의문문 대답: 영어 Yes/No와 우리말 네/아니요가 엇갈린다 */
export function StAnswerMap() {
  return (
    <div>
      <p className="text-center text-[1.2em] font-medium">
        <En en="[[Aren't you]] hungry?" />
      </p>
      <p className="text-center text-[14px] text-ink-2">배 안 고파?</p>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {ANSWER_COLS.map((c) => (
          <div key={c.fact} className="rounded-2xl border border-line px-3 py-3">
            <p className="text-[14px] font-extrabold text-ink-3">{c.fact}</p>
            <p className="mt-2 text-[14px] font-bold text-sky-ink">영어</p>
            <p className="text-[1.1em] font-medium">
              <En en={c.en} />
            </p>
            <p className="mt-2 text-[14px] font-bold text-coral-ink">우리말</p>
            <p className="text-[15px]">
              <b className="rounded bg-coral-soft px-1 text-coral-ink">{c.koWord}</b> {c.ko}
            </p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-center text-[14px] text-ink-2">
        영어는 <b>내 대답 내용</b>이 긍정이면 Yes, 부정이면 No. 우리말은 <b>상대의 말</b>이 맞으면 응, 틀리면 아니.
      </p>
    </div>
  );
}
