import type { ReactNode } from "react";
import { En } from "@/components/lesson/En";
import { ArrowRight, PersonIcon } from "./icons";

/* 문장의 종류 장 그림: 의문사 카드, 의문문 어순, 명령문 네 가지, What/How 감탄문, There is 뜯어보기, 부가의문문 뒤집기, 부정의문문 대답,
   의문사 의문문의 대답, 의문사 주어, Let's, and/or 갈림길, 감탄문 만들기, There is/are 분류, How many ~ are there, 부가의문문 대답 */

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
      {label && <span className="text-[13.5px] font-bold leading-tight text-ink-2">{label}</span>}
    </span>
  );
}

function FormulaChip({ t, tone, en = false }: { t: string; tone: Tone; en?: boolean }) {
  return (
    <span lang={en ? "en" : undefined} className={`rounded-lg px-2 py-1 text-[14.5px] font-extrabold leading-none ${TONE[tone]}`}>
      {t}
    </span>
  );
}

function SignBadge({ sign }: { sign: "+" | "−" }) {
  return (
    <span
      aria-label={sign === "+" ? "긍정" : "부정"}
      className={`grid size-7 shrink-0 place-items-center rounded-full text-[15px] font-extrabold ${
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
      <div role="list" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {WH_WORDS.map((w) => (
          <div role="listitem" key={w.en} className={`rounded-2xl px-3 py-3 text-center ${TONE[w.tone]}`}>
            <span className="block text-[1.35em] font-bold leading-tight">
              <En en={w.en} />
            </span>
            <span className="mt-1 block text-[14.5px] font-extrabold">{w.ko}</span>
            <span className="block text-[13.5px] opacity-80">{w.asks}</span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-center text-[13.5px] text-ink-2">
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
    <div role="list" className="space-y-2.5">
      {ORDER_STEPS.map((s) => (
        <div role="listitem" key={s.step} className="rounded-2xl border border-line px-4 py-3">
          <p className="text-[13.5px] font-extrabold text-ink-3">{s.step}</p>
          <p className="mt-2 flex flex-wrap items-start gap-x-2 gap-y-2">
            {s.words.map((w) => (
              <WordChip key={w.en} en={w.en} tone={w.tone} label={w.label} />
            ))}
          </p>
          <p className="mt-2 text-[13.5px] text-ink-2">{s.note}</p>
        </div>
      ))}
    </div>
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
      <p className="mt-1.5 text-center text-[13.5px] text-ink-2">
        명령은 늘 눈앞의 너(you)에게 하는 말이라서 you를 빼고 동사원형부터 말해요.
      </p>
      <div role="list" className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {COMMANDS.map((c) => (
          <div role="listitem" key={c.title} className="rounded-2xl border border-line px-3 py-3">
            <span className={`inline-block rounded-lg px-2 py-0.5 text-[13.5px] font-extrabold ${TONE[c.tone]}`}>{c.title}</span>
            <span className="mt-2 block text-[1.08em] font-medium leading-snug">
              <En en={c.en} />
            </span>
            <span className="block text-[13.5px] text-ink-2">{c.ko}</span>
            <span className="mt-1.5 block text-[13.5px] font-bold text-ink-3">{c.how}</span>
          </div>
        ))}
      </div>
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
            <p className="text-[13.5px] text-ink-2">{x.ko}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-2xl bg-chip px-4 py-3">
        <p className="text-[13.5px] font-extrabold text-ink-2">a/an을 빼는 때: 여럿이거나 셀 수 없을 때</p>
        <div role="list" className="mt-1.5 space-y-1">
          {NO_A.map((n) => (
            <div role="listitem" key={n.why} className="flex flex-wrap items-baseline gap-x-2">
              <span className="text-[1.08em] font-medium">
                <En en={n.en} />
              </span>
              <span className="text-[13.5px] text-ink-2">
                {n.ko} ({n.why})
              </span>
            </div>
          ))}
        </div>
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
    <div role="list" className="space-y-2.5">
      {THERE_ROWS.map((r) => (
        <div role="listitem" key={r.why} className="rounded-2xl border border-line px-4 py-3">
          <p className="flex flex-wrap items-start gap-x-2 gap-y-2">
            {r.parts.map((p, i) => (
              <WordChip key={i} en={p.en} tone={p.tone} label={p.label} />
            ))}
          </p>
          <p className="mt-2 text-[13.5px] text-ink-2">{r.ko}</p>
          <p className="mt-1 flex items-center gap-1.5 text-[13.5px] font-bold text-coral-ink">
            <ArrowRight size={16} className="rotate-180" />
            동사는 뒤를 봐요: {r.why}
          </p>
        </div>
      ))}
    </div>
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
    <div role="list" className="space-y-3">
      {TAG_ROWS.map((r) => (
        <div role="listitem" key={r.ko} className="rounded-2xl border border-line px-4 py-3">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <span className="flex items-center gap-2">
              <SignBadge sign={r.parts[0].sign} />
              <span className="text-[1.12em] font-medium">
                <En en={r.parts[0].en} />
              </span>
            </span>
            <span className="flex items-center gap-1 pl-1 text-[13.5px] font-bold text-ink-3 sm:pl-0">
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
          <p className="mt-2 text-[13.5px] text-ink-2">{r.ko}</p>
          <p className="text-[13.5px] font-bold text-ink-3">{r.steps}</p>
        </div>
      ))}
    </div>
  );
}

/* ── 7. 부정의문문의 대답: 영어는 내용, 우리말은 상대 말 ── */

type AnswerCol = { fact: string; en: string; ko: string; koWord: string };

/** 질문 하나에 사실별로 두 대답을 나란히: 영어 Yes/No와 우리말 응/아니 */
function AnswerBoard({ q, cols, note }: { q: { en: string; ko: string }; cols: AnswerCol[]; note: ReactNode }) {
  return (
    <div>
      <p className="text-center text-[1.2em] font-medium">
        <En en={q.en} />
      </p>
      <p className="text-center text-[13.5px] text-ink-2">{q.ko}</p>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {cols.map((c) => (
          <div key={c.fact} className="rounded-2xl border border-line px-3 py-3">
            <p className="text-[13.5px] font-extrabold text-ink-3">{c.fact}</p>
            <p className="mt-2 text-[13.5px] font-bold text-sky-ink">영어</p>
            <p className="text-[1.1em] font-medium">
              <En en={c.en} />
            </p>
            <p className="mt-2 text-[13.5px] font-bold text-coral-ink">우리말</p>
            <p className="text-[14.5px]">
              <b className="rounded bg-coral-soft px-1 text-coral-ink">{c.koWord}</b> {c.ko}
            </p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-center text-[13.5px] text-ink-2">{note}</p>
    </div>
  );
}

const ANSWER_Q = { en: "[[Aren't you]] hungry?", ko: "배 안 고파?" };

const ANSWER_COLS: AnswerCol[] = [
  { fact: "배가 고프면", en: "[[Yes]], I am.", koWord: "아니,", ko: "배고파." },
  { fact: "배가 안 고프면", en: "[[{No|부사:아니(요)}]], I'm not.", koWord: "응,", ko: "안 고파." },
];

/** 부정의문문 대답: 영어 Yes/No와 우리말 네/아니요가 엇갈린다 */
export function StAnswerMap() {
  return (
    <AnswerBoard
      q={ANSWER_Q}
      cols={ANSWER_COLS}
      note={
        <>
          영어는 <b>내 대답 내용</b>이 긍정이면 Yes, 부정이면 No. 우리말은 <b>상대의 말</b>이 맞으면 응, 틀리면 아니.
        </>
      }
    />
  );
}

/* ════════════ 시각화 보강 ════════════ */

/* ── 8. 의문사 의문문의 대답: Yes/No가 아니라 정보 ── */

const ANSWER_KINDS: { title: string; sub: string; head: string; q: { en: string }; a: { en: string }; badge: string }[] = [
  {
    title: "Yes/No 의문문",
    sub: "의문사 없이 시작해요",
    head: "bg-sky-soft text-sky-ink",
    q: { en: "Do you like pizza?" },
    a: { en: "[[Yes]], I do." },
    badge: "Yes / No로 대답",
  },
  {
    title: "의문사 의문문",
    sub: "의문사로 시작해요",
    head: "bg-coral-soft text-coral-ink",
    q: { en: "[[What]] do you like?" },
    a: { en: "I like [[pizza]]." },
    badge: "물어본 정보로 대답",
  },
];

const WH_ANSWERS: { wh: { en: string }; info: string; a: { en: string } }[] = [
  { wh: { en: "Who" }, info: "사람", a: { en: "Minsu." } },
  { wh: { en: "What" }, info: "사물·일", a: { en: "A new bike." } },
  { wh: { en: "When" }, info: "때", a: { en: "Next Friday." } },
  { wh: { en: "Where" }, info: "장소", a: { en: "In Busan." } },
  { wh: { en: "Why" }, info: "이유", a: { en: "Because I was sick." } },
  { wh: { en: "How" }, info: "방법·상태", a: { en: "By bus." } },
];

/** 의문사가 있으면 Yes/No 대신 그 의문사가 묻는 정보로 대답한다 */
export function StAnswerKinds() {
  return (
    <div>
      <div className="grid gap-2.5 sm:grid-cols-2">
        {ANSWER_KINDS.map((k) => (
          <div key={k.title} className="flex flex-col rounded-2xl border border-line">
            <div className={`rounded-t-2xl px-4 py-2.5 ${k.head}`}>
              <p className="text-[15px] font-extrabold">{k.title}</p>
              <p className="text-[13.5px] font-bold">{k.sub}</p>
            </div>
            <div className="grid gap-1.5 px-4 py-3">
              <p className="text-[1.05em] font-medium">
                <span className="mr-1.5 text-[13.5px] font-extrabold text-ink-3">묻기</span>
                <En en={k.q.en} />
              </p>
              <p className="text-[1.05em] font-medium">
                <span className="mr-1.5 text-[13.5px] font-extrabold text-ink-3">대답</span>
                <En en={k.a.en} />
              </p>
              <p className="w-fit rounded-lg bg-chip px-2.5 py-0.5 text-[13.5px] font-bold text-ink-2">{k.badge}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-[13.5px] font-extrabold text-ink-2">의문사를 보면 대답에 담을 정보가 보여요</p>
      <div role="list" className="mt-2 grid grid-cols-1 gap-2 min-[420px]:grid-cols-2 sm:grid-cols-3">
        {WH_ANSWERS.map((w) => (
          <div role="listitem" key={w.wh.en} className="rounded-xl border border-line px-3 py-2">
            <p className="flex items-center gap-2">
              <span className="rounded-lg bg-coral px-2 py-0.5 text-[14.5px] font-bold text-white">
                <En en={w.wh.en} />
              </span>
              <span className="text-[13.5px] font-extrabold text-ink-2">{w.info}</span>
            </p>
            <p className="mt-1 flex items-center gap-1.5">
              <ArrowRight size={16} className="shrink-0 text-ink-3" />
              <span className="text-[14.5px] font-medium">
                <En en={w.a.en} />
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── 9. 의문사가 주어일 때: 주어 자리에 그대로 ── */

const WHO_SUBJECT_ROWS: {
  from: { en: string; tone: Tone; label?: string }[];
  to: { en: string; tone: Tone; label?: string }[];
  ko: string;
}[] = [
  {
    from: [
      { en: "Minsu", tone: "sky", label: "주어" },
      { en: "made", tone: "mint", label: "동사" },
      { en: "this.", tone: "line" },
    ],
    to: [
      { en: "Who", tone: "solid", label: "주어 = 누가" },
      { en: "made", tone: "mint", label: "동사 그대로" },
      { en: "this?", tone: "line" },
    ],
    ko: "이거 누가 만들었어?",
  },
  {
    from: [
      { en: "Something", tone: "sky", label: "주어" },
      { en: "happened.", tone: "mint", label: "동사" },
    ],
    to: [
      { en: "What", tone: "solid", label: "주어 = 무엇이" },
      { en: "happened?", tone: "mint", label: "동사 그대로" },
    ],
    ko: "무슨 일이야? (무엇이 일어났어?)",
  },
];

/** 누가·무엇이를 묻는 의문사는 주어 자리에 그대로 들어가서, 자리 이동도 do도 없다 */
export function StWhoSubject() {
  return (
    <div>
      <div role="list" className="space-y-2.5">
        {WHO_SUBJECT_ROWS.map((r) => (
          <div role="listitem" key={r.ko} className="rounded-2xl border border-line px-4 py-3">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start">
              <p className="flex flex-wrap items-start gap-x-2 gap-y-2">
                {r.from.map((w, i) => (
                  <WordChip key={i} en={w.en} tone={w.tone} label={w.label} />
                ))}
              </p>
              <span className="flex items-center gap-1 text-[13.5px] font-bold text-ink-3 sm:pt-1.5">
                <ArrowRight size={18} className="rotate-90 sm:rotate-0" />
                주어만 바꾸기
              </span>
              <p className="flex flex-wrap items-start gap-x-2 gap-y-2">
                {r.to.map((w, i) => (
                  <WordChip key={i} en={w.en} tone={w.tone} label={w.label} />
                ))}
              </p>
            </div>
            <p className="mt-2 text-[13.5px] text-ink-2">{r.ko}</p>
          </div>
        ))}
      </div>
      <p className="mt-3 flex flex-wrap items-center justify-center gap-2 text-[14px]">
        <span className="font-bold">주어 자리에 의문사를 넣었을 뿐이라 순서가 그대로예요.</span>
        <span className="rounded-lg bg-coral-soft px-2 py-0.5 font-bold text-coral-ink">
          <span lang="en">Who did make this?</span> ✕
        </span>
      </p>
    </div>
  );
}

/* ── 10. 명령문과 제안문: 누가 하나? ── */

const LETS_EX: { en: string; ko: string }[] = [
  { en: "[[Clean]] your room.", ko: "네 방 치워." },
  { en: "[[Let's clean]] the classroom together.", ko: "우리 같이 교실 청소하자." },
  { en: "[[Let's not]] be late.", ko: "늦지 말자." },
];

/** 명령문은 듣는 너 혼자, Let's는 나와 너 우리 모두 */
export function StLetsWho() {
  return (
    <div>
      <div className="grid gap-2.5 sm:grid-cols-2">
        <div className="rounded-2xl border border-line px-4 py-3">
          <p className="w-fit rounded-lg bg-amber-soft px-2.5 py-1 text-[14.5px] font-extrabold text-amber-ink">명령문: 너 해</p>
          <p className="mt-3 flex items-center justify-center gap-2" aria-label="말하는 내가 너에게 시켜요">
            <PersonIcon size={34} className="text-ink-3" />
            <ArrowRight className="text-ink-3" />
            <PersonIcon size={40} className="text-coral" />
          </p>
          <p className="mt-1 text-center text-[13.5px] font-bold text-ink-2">하는 사람: 듣는 너</p>
          <p className="mt-2 text-[1.05em] font-medium">
            <En en={LETS_EX[0].en} />
          </p>
          <p className="text-[13.5px] text-ink-2">{LETS_EX[0].ko}</p>
        </div>
        <div className="rounded-2xl border-2 border-coral px-4 py-3">
          <p className="w-fit rounded-lg bg-coral-soft px-2.5 py-1 text-[14.5px] font-extrabold text-coral-ink">제안문: 우리 같이 하자</p>
          <p className="mt-3 flex justify-center" aria-label="나와 너가 함께 해요">
            <span className="flex items-center gap-0.5 rounded-lg bg-coral-soft px-3 py-0.5">
              <PersonIcon size={40} className="text-coral" />
              <PersonIcon size={40} className="text-coral" />
            </span>
          </p>
          <p className="mt-1 text-center text-[13.5px] font-bold text-ink-2">하는 사람: 나 + 너 = 우리</p>
          <p className="mt-2 text-[1.05em] font-medium">
            <En en={LETS_EX[1].en} />
          </p>
          <p className="text-[13.5px] text-ink-2">{LETS_EX[1].ko}</p>
        </div>
      </div>
      <div className="mt-3 grid gap-2 rounded-2xl bg-chip px-4 py-3 text-[14px] sm:grid-cols-2">
        <p className="flex flex-wrap items-center gap-1.5">
          <span lang="en" className="rounded-lg bg-card px-2 py-0.5 font-extrabold">
            Let&apos;s
          </span>
          <span>=</span>
          <span lang="en" className="font-bold">
            Let us
          </span>
          <span className="text-ink-2">(우리 ~하자)</span>
        </p>
        <p className="flex flex-wrap items-center gap-1.5">
          <span className="font-bold text-ink-2">하지 말자:</span>
          <En en={LETS_EX[2].en} />
          <span className="text-ink-2">{LETS_EX[2].ko}</span>
        </p>
      </div>
    </div>
  );
}

/* ── 11. 명령문, and / or: 갈림길 ── */

const FORK_BASE = { en: "Eat breakfast,", ko: "아침을 먹어," };

const FORK_WAYS: {
  word: string;
  mean: string;
  good: boolean;
  res: { en: string; ko: string };
  same: { en: string };
}[] = [
  {
    word: "and",
    mean: "그러면 · 좋은 결과",
    good: true,
    res: { en: "[[and]] you will feel great.", ko: "그러면 기분이 아주 좋을 거야." },
    same: { en: "= If you eat breakfast, you will feel great." },
  },
  {
    word: "or",
    mean: "그렇지 않으면 · 나쁜 결과",
    good: false,
    res: { en: "[[or]] you will be hungry soon.", ko: "그렇지 않으면 곧 배고플 거야." },
    same: { en: "= If you [[don't]] eat breakfast, you will be hungry soon." },
  },
];

/** 명령문 뒤 and는 '하면 좋은 결과', or는 '안 하면 나쁜 결과'로 갈라진다 */
export function StAndOrFork() {
  return (
    <div className="mx-auto max-w-2xl">
      <p className="mx-auto w-fit rounded-xl bg-ink px-3.5 py-2 text-[1.1em] font-medium text-bg">
        <En en={FORK_BASE.en} />
      </p>
      <p className="mt-1 text-center text-[13.5px] text-ink-2">{FORK_BASE.ko}</p>
      <svg viewBox="0 0 320 40" className="mx-auto hidden w-full max-w-md sm:block" aria-hidden>
        <path d="M160 2 Q160 22 80 36" fill="none" strokeWidth="3" strokeLinecap="round" style={{ stroke: "var(--mint-ink)" }} />
        <path d="M160 2 Q160 22 240 36" fill="none" strokeWidth="3" strokeLinecap="round" style={{ stroke: "var(--coral)" }} />
      </svg>
      <div className="mt-2 grid gap-2.5 sm:mt-0 sm:grid-cols-2">
        {FORK_WAYS.map((w) => (
          <div key={w.word} className={`rounded-2xl border-2 px-4 py-3 ${w.good ? "border-mint-ink" : "border-coral"}`}>
            <p className="flex flex-wrap items-center gap-2">
              <span
                lang="en"
                className={`rounded-lg px-2.5 py-0.5 text-[15px] font-extrabold ${w.good ? "bg-mint-soft text-mint-ink" : "bg-coral-soft text-coral-ink"}`}
              >
                {w.word}
              </span>
              <span className="text-[14px] font-extrabold">{w.mean}</span>
            </p>
            <p className="mt-2 text-[1.05em] font-medium">
              <En en={w.res.en} />
            </p>
            <p className="text-[13.5px] text-ink-2">{w.res.ko}</p>
            <p className="mt-2 rounded-lg bg-chip px-2.5 py-1 text-[14px] font-medium">
              <En en={w.same.en} />
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── 12. 평서문 → 감탄문 세 단계 ── */

type ExChip = { en: string; kind?: "cut" | "key" | "move" };

const EXCLAIM_TRACKS: { title: string; key: string; steps: { label: string; chips: ExChip[]; note?: string }[]; ko: string }[] = [
  {
    title: "명사가 있으면 What",
    key: "bg-coral-soft text-coral-ink",
    steps: [
      {
        label: "very를 지워요",
        chips: [{ en: "It is a" }, { en: "very", kind: "cut" }, { en: "old house." }],
      },
      {
        label: "What + a/an + 형용사 + 명사를 맨 앞에",
        chips: [{ en: "{What|의문사:(감탄문) 정말 ~한}", kind: "key" }, { en: "an", kind: "key" }, { en: "old house", kind: "key" }],
        note: "very가 빠지면 a 바로 뒤가 old [올드]라서 an",
      },
      {
        label: "주어 + 동사는 맨 뒤로, 느낌표",
        chips: [{ en: "{What|의문사:(감탄문) 정말 ~한} an old house", kind: "key" }, { en: "it is!", kind: "move" }],
      },
    ],
    ko: "정말 오래된 집이구나!",
  },
  {
    title: "명사가 없으면 How",
    key: "bg-sky-soft text-sky-ink",
    steps: [
      {
        label: "very를 지워요",
        chips: [{ en: "The movie is" }, { en: "very", kind: "cut" }, { en: "funny." }],
      },
      {
        label: "How + 형용사·부사를 맨 앞에",
        chips: [{ en: "{How|의문사:(감탄문) 정말, 얼마나}", kind: "key" }, { en: "funny", kind: "key" }],
        note: "명사 없이 형용사 funny만 있으니 How",
      },
      {
        label: "주어 + 동사는 맨 뒤로, 느낌표",
        chips: [{ en: "{How|의문사:(감탄문) 정말, 얼마나} funny", kind: "key" }, { en: "the movie is!", kind: "move" }],
      },
    ],
    ko: "그 영화 정말 웃기다!",
  },
];

function ExclaimChip({ c, keyTone }: { c: ExChip; keyTone: string }) {
  const tone =
    c.kind === "cut"
      ? "border-2 border-dashed border-ink-3 text-ink-3 line-through decoration-coral decoration-2"
      : c.kind === "key"
        ? keyTone
        : c.kind === "move"
          ? "bg-amber-soft text-amber-ink"
          : "border border-line";
  return (
    <span className={`rounded-lg px-2 py-0.5 text-[1.04em] font-medium ${tone}`}>
      <En en={c.en} />
    </span>
  );
}

/** 평서문을 감탄문으로: very 지우기 → What/How 덩어리를 앞으로 → 주어 + 동사는 뒤로 */
export function StExclaimSteps() {
  return (
    <div>
      <div className="grid gap-2.5 sm:grid-cols-2">
        {EXCLAIM_TRACKS.map((t) => (
          <div key={t.title} className="rounded-2xl border border-line px-3.5 py-3">
            <p className="text-[15px] font-extrabold">{t.title}</p>
            <div role="list" className="mt-2 grid gap-2.5">
              {t.steps.map((s, i) => (
                <div role="listitem" key={s.label} className="flex gap-2.5">
                  <span aria-hidden className="grid size-7 shrink-0 place-items-center rounded-full bg-ink text-[13.5px] font-extrabold text-bg">
                    {i + 1}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[13.5px] font-bold text-ink-2">{s.label}</span>
                    <span className="mt-1 flex flex-wrap items-center gap-1">
                      {s.chips.map((c, j) => (
                        <ExclaimChip key={j} c={c} keyTone={t.key} />
                      ))}
                    </span>
                    {s.note && <span className="mt-1 block text-[13.5px] text-ink-3">{s.note}</span>}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-2 border-t border-line pt-2 text-[13.5px] font-bold text-ink-2">{t.ko}</p>
          </div>
        ))}
      </div>
      <p className="mt-3 flex flex-wrap items-center justify-center gap-2 text-[13.5px]">
        <span className="rounded-md border-2 border-dashed border-ink-3 px-1.5 text-ink-3 line-through decoration-coral decoration-2">지움</span>
        <span className="rounded-md bg-coral-soft px-1.5 font-bold text-coral-ink">맨 앞 덩어리</span>
        <span className="rounded-md bg-amber-soft px-1.5 font-bold text-amber-ink">맨 뒤로 간 주어 + 동사</span>
      </p>
    </div>
  );
}

/* ── 13. There is/are: 뒤의 명사 분류하기 ── */

const THERE_BINS: { head: { en: string }; who: string; tone: Tone; items: { en: string; why: string }[] }[] = [
  {
    head: { en: "{There is}" },
    who: "하나 · 셀 수 없는 것",
    tone: "sky",
    items: [
      { en: "a pencil", why: "하나" },
      { en: "an apple", why: "하나" },
      { en: "some bread", why: "셀 수 없음" },
      { en: "{a lot of} water", why: "셀 수 없음" },
    ],
  },
  {
    head: { en: "{There are}" },
    who: "둘 이상 (복수)",
    tone: "mint",
    items: [
      { en: "three pencils", why: "복수" },
      { en: "two apples", why: "복수" },
      { en: "some cookies", why: "복수" },
      { en: "{a lot of} students", why: "복수" },
    ],
  },
];

/** be동사는 뒤에 오는 명사를 보고 고른다: 하나·셀 수 없으면 is, 여럿이면 are */
export function StThereSort() {
  return (
    <div>
      <p className="flex flex-wrap items-center justify-center gap-1.5 text-[14.5px] font-extrabold">
        <span lang="en" className="rounded-lg bg-chip px-2.5 py-1">
          There
        </span>
        <span lang="en" className="rounded-lg bg-coral px-2.5 py-1 text-white">
          is / are
        </span>
        <ArrowRight size={18} className="text-coral" />
        <span className="rounded-lg bg-sky-soft px-2.5 py-1 text-sky-ink">뒤의 명사</span>
      </p>
      <p className="mt-1 text-center text-[13.5px] text-ink-2">be동사는 뒤에 오는 명사를 보고 골라요</p>
      <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
        {THERE_BINS.map((b) => (
          <div key={b.who} className="rounded-2xl border border-line px-4 py-3">
            <p className="flex flex-wrap items-baseline gap-2">
              <span className={`rounded-lg px-2.5 py-1 text-[1.1em] font-bold ${TONE[b.tone]}`}>
                <En en={b.head.en} />
              </span>
              <span className="text-[13.5px] font-extrabold text-ink-2">{b.who}</span>
            </p>
            <div role="list" className="mt-2.5 flex flex-wrap gap-1.5">
              {b.items.map((it) => (
                <div role="listitem" key={it.en} className="flex items-center gap-1 rounded-lg border border-line px-2 py-1">
                  <span className="text-[1.02em] font-medium">
                    <En en={it.en} />
                  </span>
                  <span className="text-[13.5px] text-ink-3">{it.why}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 text-center text-[13.5px] text-ink-2">
        some, a lot of가 붙어도 명사만 보세요. water는 셀 수 없어서 is, students는 여럿이라 are예요.
      </p>
    </div>
  );
}

/* ── 14. How many + 복수 명사 + are there ~? ── */

const HOW_MANY_STEPS: { step: string; note: string; words: { en: string; tone: Tone; label?: string }[] }[] = [
  {
    step: "① 평서문",
    note: "너희 반에는 학생이 30명 있어.",
    words: [
      { en: "{There|부사:(해석하지 않는) 자리 채움 말}", tone: "chip", label: "there" },
      { en: "are", tone: "amber", label: "be" },
      { en: "thirty students", tone: "sky", label: "개수 + 복수 명사" },
      { en: "in your class.", tone: "line" },
    ],
  },
  {
    step: "② 개수를 묻는 질문",
    note: "개수 부분을 How many + 복수 명사로 바꿔 맨 앞에 세워요. 그 뒤는 의문문 순서 are there예요.",
    words: [
      { en: "How many students", tone: "solid", label: "How many + 복수 명사" },
      { en: "are", tone: "amber", label: "be" },
      { en: "{there|부사:(해석하지 않는) 자리 채움 말}", tone: "chip", label: "there" },
      { en: "in your class?", tone: "line" },
    ],
  },
  {
    step: "③ 셀 수 없으면 How much",
    note: "셀 수 없는 것은 How much + 명사 + is there예요.",
    words: [
      { en: "How much milk", tone: "solid", label: "How much + 명사" },
      { en: "is", tone: "amber", label: "be" },
      { en: "{there|부사:(해석하지 않는) 자리 채움 말}", tone: "chip", label: "there" },
      { en: "in the fridge?", tone: "line" },
    ],
  },
];

/** 개수 묻기: How many + 복수 명사를 앞에, 그 뒤는 are there */
export function StHowManyThere() {
  return (
    <div>
      <div role="list" className="space-y-2.5">
        {HOW_MANY_STEPS.map((s) => (
          <div role="listitem" key={s.step} className="rounded-2xl border border-line px-4 py-3">
            <p className="text-[13.5px] font-extrabold text-ink-3">{s.step}</p>
            <p className="mt-2 flex flex-wrap items-start gap-x-2 gap-y-2">
              {s.words.map((w, i) => (
                <WordChip key={i} en={w.en} tone={w.tone} label={w.label} />
              ))}
            </p>
            <p className="mt-2 text-[13.5px] text-ink-2">{s.note}</p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-center text-[13.5px] text-ink-2">
        How many 뒤에는 늘 복수 명사가 오니까 be동사도 늘 <b lang="en">are</b>(과거는 <b lang="en">were</b>)예요.
      </p>
    </div>
  );
}

/* ── 15. 부가의문문에 대답하기: 꼬리 말고 사실 ── */

const TAG_ANSWER_Q = { en: "She isn't busy, [[is she]]?", ko: "그녀는 안 바쁘지, 그렇지?" };

const TAG_ANSWER_COLS: AnswerCol[] = [
  { fact: "바쁘면 (사실이 긍정)", en: "[[Yes]], she is.", koWord: "아니,", ko: "바빠." },
  { fact: "안 바쁘면 (사실이 부정)", en: "[[{No|부사:아니(요)}]], she isn't.", koWord: "응,", ko: "안 바빠." },
];

/** 부가의문문의 대답: 꼬리가 어떻든 사실이 긍정이면 Yes, 부정이면 No */
export function StTagAnswer() {
  return (
    <AnswerBoard
      q={TAG_ANSWER_Q}
      cols={TAG_ANSWER_COLS}
      note={
        <>
          꼬리가 <b lang="en">is she?</b>든 <b lang="en">isn&apos;t she?</b>든 상관없어요. <b>사실</b>이 긍정이면 Yes, 부정이면 No.
        </>
      }
    />
  );
}
