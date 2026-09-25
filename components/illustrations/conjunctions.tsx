import type { ReactNode } from "react";
import { En } from "@/components/lesson/En";
import { ArrowRight, CrownIcon, MaskIcon } from "./icons";

/* 접속사 장 그림: 네 가지 고리, 왕국 둘, so vs because, 명사절 자리, 간접의문문, 부사절 지도, so·such, 짝 접속사, 수 일치, 병렬 */

/* ───────── 공통 도우미 ───────── */

type Tone = "sky" | "mint" | "amber" | "coral" | "chip";

const TONE: Record<Tone, string> = {
  sky: "bg-sky-soft text-sky-ink",
  mint: "bg-mint-soft text-mint-ink",
  amber: "bg-amber-soft text-amber-ink",
  coral: "bg-coral-soft text-coral-ink",
  chip: "bg-chip text-ink",
};

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

function Chip({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`inline-flex items-center rounded-lg px-2.5 py-1 font-bold ${className}`}>{children}</span>;
}

/* 문장 조각: 진짜 동사(왕관) / 변장한 동사(가면) / 접속사 / 숨은 주어 / 보통 단어 */
type PieceKind = "verb" | "verbal" | "link" | "hidden" | "plain";
type Piece = { en: string; kind?: PieceKind; sub?: string };

function PieceChip({ p }: { p: Piece }) {
  const kind = p.kind ?? "plain";
  if (kind === "plain")
    return (
      <span className="self-start pt-1">
        <En en={p.en} />
      </span>
    );
  const look: Record<Exclude<PieceKind, "plain">, string> = {
    verb: "bg-coral text-white",
    verbal: "bg-sky-soft text-sky-ink",
    link: "bg-amber-soft text-amber-ink",
    hidden: "border-2 border-dashed border-ink-3 text-ink-3",
  };
  const label: Record<Exclude<PieceKind, "plain">, string> = {
    verb: "text-coral-ink",
    verbal: "text-sky-ink",
    link: "text-amber-ink",
    hidden: "text-ink-3",
  };
  return (
    <span className="inline-flex flex-col items-center gap-1">
      <span className={`inline-flex items-center gap-1 rounded-lg px-2 py-1 ${look[kind]}`}>
        {kind === "verb" && <CrownIcon size={15} />}
        {kind === "verbal" && <MaskIcon size={16} />}
        <En en={p.en} />
      </span>
      {p.sub && <span className={`text-[14px] font-extrabold ${label[kind]}`}>{p.sub}</span>}
    </span>
  );
}

function PieceRow({ pieces }: { pieces: Piece[] }) {
  return (
    <p lang="en" className="flex flex-wrap items-start gap-x-2 gap-y-3 text-[1.12em] font-medium">
      {pieces.map((p, i) => (
        <PieceChip key={i} p={p} />
      ))}
    </p>
  );
}

/* ───────── 1. 네 개의 고리: and, but, or, so ───────── */

const LINKS: { word: string; ko: string; tone: Tone; relation: string; a: string; sign: string; b: string; en: string; enKo: string }[] = [
  {
    word: "and",
    ko: "그리고",
    tone: "sky",
    relation: "더하기",
    a: "A",
    sign: "+",
    b: "B",
    en: "Minho plays soccer [[and]] basketball.",
    enKo: "민호는 축구와 농구를 해.",
  },
  {
    word: "but",
    ko: "하지만",
    tone: "coral",
    relation: "반대",
    a: "A",
    sign: "↔",
    b: "B",
    en: "The test was long [[but]] easy.",
    enKo: "시험은 길었지만 쉬웠어.",
  },
  {
    word: "or",
    ko: "또는, 아니면",
    tone: "mint",
    relation: "둘 중 고르기",
    a: "A",
    sign: "/",
    b: "B",
    en: "Is your cat a boy [[or]] a girl?",
    enKo: "너희 고양이는 수컷이야, 암컷이야?",
  },
  {
    word: "so",
    ko: "그래서",
    tone: "amber",
    relation: "원인 → 결과",
    a: "원인",
    sign: "→",
    b: "결과",
    en: "{It|대명사:(날씨를 말할 때 자리를 채우는 말)} was sunny, [[so]] we went to the beach.",
    enKo: "날씨가 화창해서 우리는 바닷가에 갔어.",
  },
];

/** and·but·or·so가 앞뒤를 잇는 네 가지 방식 */
export function CjFourLinks() {
  return (
    <ul className="grid gap-2.5 sm:grid-cols-2">
      {LINKS.map((l) => (
        <li key={l.word} className="flex flex-col rounded-2xl border border-line">
          <div className={`flex flex-wrap items-center gap-2 rounded-t-2xl px-4 py-2.5 ${TONE[l.tone]}`}>
            <span lang="en" className="text-[1.3em] font-extrabold">
              {l.word}
            </span>
            <span className="text-[15px] font-bold">{l.ko}</span>
            <span className="ml-auto text-[14px] font-extrabold">{l.relation}</span>
          </div>
          <div className="px-4 py-3">
            <p className="flex items-center gap-2 text-[15px] font-extrabold" aria-hidden>
              <span className="rounded-lg border border-line px-2.5 py-1">{l.a}</span>
              <span className={`grid size-8 place-items-center rounded-full ${TONE[l.tone]}`}>{l.sign}</span>
              <span className="rounded-lg border border-line px-2.5 py-1">{l.b}</span>
            </p>
            <p className="mt-2.5 text-[1.05em] font-medium">
              <En en={l.en} />
            </p>
            <p className="text-[14px] text-ink-2">{l.enKo}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

/* ───────── 2. 왕국 둘: 접속사가 들어오면 왕관이 하나 더 ───────── */

const ONE_KINGDOM: Piece[] = [
  { en: "He" },
  { en: "went", kind: "verb", sub: "진짜 동사" },
  { en: "to the store" },
  { en: "to buy", kind: "verbal", sub: "to부정사" },
  { en: "milk." },
];

const TWO_KINGDOMS_A: Piece[] = [{ en: "He" }, { en: "went", kind: "verb", sub: "동사 1" }, { en: "to the store" }];
const TWO_KINGDOMS_B: Piece[] = [
  { en: "(he)", kind: "hidden", sub: "숨은 주어" },
  { en: "bought", kind: "verb", sub: "동사 2" },
  { en: "milk." },
];

function Kingdom({ pieces, tag }: { pieces: Piece[]; tag: string }) {
  return (
    <div className="rounded-2xl border-2 border-ink-3 px-3 py-2.5">
      <p className="mb-2 text-[14px] font-extrabold text-ink-3">{tag}</p>
      <PieceRow pieces={pieces} />
    </div>
  );
}

/** 접속사 없이는 두 번째 동사가 변장하고, and가 들어오면 진짜 동사가 하나 더 선다 */
export function CjTwoKingdoms() {
  return (
    <div className="grid gap-3">
      <div className="rounded-2xl bg-chip px-3 py-3.5">
        <p className="text-[15px] font-extrabold">접속사 0개 → 왕국 하나, 진짜 동사 1개</p>
        <div className="mt-2.5">
          <Kingdom pieces={ONE_KINGDOM} tag="절 1" />
        </div>
        <p className="mt-2 text-[14px] text-ink-2">왕(went)이 이미 있으니 buy는 to를 쓰고 변장해요. &lsquo;우유를 사려고&rsquo;</p>
      </div>
      <div className="rounded-2xl bg-chip px-3 py-3.5">
        <p className="text-[15px] font-extrabold">접속사 and 1개 → 왕국 둘, 진짜 동사 2개</p>
        <div className="mt-2.5 flex flex-wrap items-stretch gap-2">
          <Kingdom pieces={TWO_KINGDOMS_A} tag="절 1" />
          <span className="self-center rounded-full bg-amber-soft px-3 py-1 text-[15px] font-extrabold text-amber-ink">
            <En en="and" />
          </span>
          <Kingdom pieces={TWO_KINGDOMS_B} tag="절 2" />
        </div>
        <p className="mt-2 text-[14px] text-ink-2">
          주어가 같아서 두 번째 he는 생략했어요. bought는 he에 맞춰 과거형이 된 진짜 동사예요. &lsquo;가게에 가서 우유를 샀다&rsquo;
        </p>
      </div>
      <p className="text-center text-[14px] font-bold text-ink-2">
        <span className="rounded-md bg-coral px-1.5 text-white">진짜 동사</span> 개수 = 절을 잇는 접속사 개수 + 1
      </p>
    </div>
  );
}

/* ───────── 3. so vs because: 화살표 방향 ───────── */

function CauseBox({ en, role }: { en: string; role: "cause" | "result" }) {
  return (
    <span className={`inline-flex flex-col gap-1 rounded-2xl px-3 py-2 ${role === "cause" ? TONE.amber : TONE.mint}`}>
      <span className="text-[14px] font-extrabold">{role === "cause" ? "원인" : "결과"}</span>
      <span className="text-[1.08em] font-medium text-ink">
        <En en={en} />
      </span>
    </span>
  );
}

function LinkPill({ word }: { word: string }) {
  return (
    <span className="rounded-full border-2 border-ink px-3 py-1 text-[15px] font-extrabold sm:self-center">
      <En en={word} />
    </span>
  );
}

/** so 뒤에는 결과, because 뒤에는 원인이 온다 */
export function CjSoBecause() {
  return (
    <div className="grid gap-3">
      <div className="rounded-2xl border border-line px-3 py-3.5">
        <p className="text-[15px] font-extrabold">so: 원인 → 결과 (앞에서부터 차례로)</p>
        <div className="mt-2.5 flex flex-col items-start gap-1.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-2">
          <CauseBox role="cause" en="I was sleepy," />
          <ArrowRight className="ml-5 shrink-0 rotate-90 text-ink-3 sm:ml-0 sm:rotate-0" />
          <LinkPill word="so" />
          <ArrowRight className="ml-5 shrink-0 rotate-90 text-ink-3 sm:ml-0 sm:rotate-0" />
          <CauseBox role="result" en="I {took a nap}." />
        </div>
      </div>
      <div className="rounded-2xl border border-line px-3 py-3.5">
        <p className="text-[15px] font-extrabold">because: 결과 ← 원인 (이유를 뒤에서 덧붙이기)</p>
        <div className="mt-2.5 flex flex-col items-start gap-1.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-2">
          <CauseBox role="result" en="I {took a nap}" />
          <ArrowRight className="ml-5 shrink-0 -rotate-90 text-ink-3 sm:ml-0 sm:rotate-180" />
          <LinkPill word="because" />
          <ArrowRight className="ml-5 shrink-0 -rotate-90 text-ink-3 sm:ml-0 sm:rotate-180" />
          <CauseBox role="cause" en="I was sleepy." />
        </div>
      </div>
      <p className="flex flex-wrap items-center justify-center gap-2 text-[14.5px] font-bold">
        <Mark ok={false} />
        <span lang="en" className="line-through decoration-coral decoration-2">
          Because I was sleepy, so I took a nap.
        </span>
        <span className="text-ink-2">접속사는 하나만!</span>
      </p>
    </div>
  );
}

/* ───────── 4. 명사절이 서는 세 자리 ───────── */

const NOUN_SLOTS: { slot: string; ask: string; opener: string; en: string; ko: string; verbs: string }[] = [
  {
    slot: "주어 자리",
    ask: "무엇이?",
    opener: "whether",
    en: "[[Whether we win or {lose|동사:지다}]] doesn't {matter|동사:중요하다}.",
    ko: "이기든 지든 중요하지 않아.",
    verbs: "win·lose, doesn't matter",
  },
  {
    slot: "목적어 자리",
    ask: "무엇을?",
    opener: "that",
    en: "I know [[{that|접속사:~라는 것} you made this cake]].",
    ko: "네가 이 케이크를 만든 거 알아.",
    verbs: "know, made",
  },
  {
    slot: "보어 자리",
    ask: "= 무엇?",
    opener: "의문사",
    en: "The question is [[where we should meet]].",
    ko: "문제는 우리가 어디서 만날지야.",
    verbs: "is, should meet",
  },
];

const OPENERS: { en: string; ko: string }[] = [
  { en: "that", ko: "~라는 것" },
  { en: "whether · if", ko: "~인지 (아닌지)" },
  { en: "who · what · where …", ko: "누가·무엇을·어디서 ~하는지" },
];

/** 명사절은 명사 자리(주어·목적어·보어)에 서고, 여는 말 하나가 진짜 동사 하나를 더한다 */
export function CjNounSlots() {
  return (
    <div>
      <ul className="flex flex-wrap justify-center gap-2">
        {OPENERS.map((o) => (
          <li key={o.en} className="flex items-center gap-2 rounded-xl bg-sky-soft px-3 py-1.5 text-sky-ink">
            <span lang="en" className="font-extrabold">
              {o.en}
            </span>
            <span className="text-[14px] font-bold">{o.ko}</span>
          </li>
        ))}
      </ul>
      <ul className="mt-3 grid gap-2.5 sm:grid-cols-3">
        {NOUN_SLOTS.map((s) => (
          <li key={s.slot} className="flex flex-col rounded-2xl border border-line px-4 py-3">
            <p className="flex flex-wrap items-center gap-2">
              <Chip className="bg-sky-soft text-[15px] text-sky-ink">{s.slot}</Chip>
              <span className="text-[14px] font-bold text-ink-3">{s.ask}</span>
            </p>
            <p className="mt-2 text-[1.05em] font-medium">
              <En en={s.en} />
            </p>
            <p className="text-[14px] text-ink-2">{s.ko}</p>
            <p className="mt-auto pt-2 text-[14px] font-bold text-coral-ink">
              여는 말 {s.opener} → 진짜 동사 {s.verbs}
            </p>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-center text-[14px] text-ink-2">
        절을 통째로 &lsquo;그것&rsquo;으로 바꿔도 말이 되면 명사절이에요. 명사절 주어는 한 덩어리라 단수로 받아요.
      </p>
    </div>
  );
}

/* ───────── 5. 질문이 문장 속으로: 간접의문문 ───────── */

const INSIDE_RULES: { tone: Tone; name: string; order: string; en: string; ko: string }[] = [
  {
    tone: "sky",
    name: "의문사가 있는 질문",
    order: "의문사 + 주어 + 동사",
    en: "I forgot [[when the movie started]].",
    ko: "영화가 언제 시작했는지 잊어버렸어.",
  },
  {
    tone: "mint",
    name: "의문사가 주어인 질문",
    order: "의문사 + 동사 (순서 그대로)",
    en: "I want to know [[who ate my {pudding|명사:푸딩}]].",
    ko: "누가 내 푸딩을 먹었는지 알고 싶어.",
  },
  {
    tone: "amber",
    name: "의문사가 없는 질문",
    order: "if · whether + 주어 + 동사",
    en: "I'll ask [[{if|접속사:~인지} Jisu is at home]].",
    ko: "지수가 집에 있는지 물어볼게.",
  },
];

/** 질문이 다른 문장 속에 들어가면 평서문 순서(주어 + 동사)로 돌아온다 */
export function CjQuestionInside() {
  return (
    <div className="grid gap-3">
      <div className="rounded-2xl border border-line px-4 py-3">
        <p className="text-[14px] font-extrabold text-ink-3">혼자 쓰는 질문</p>
        <p lang="en" className="mt-2 flex flex-wrap items-center gap-2 text-[1.1em] font-medium">
          <Chip className="bg-sky-soft text-sky-ink">Where</Chip>
          <Chip className="bg-chip">does</Chip>
          <Chip className="border border-line">Minho</Chip>
          <Chip className="border border-line">live?</Chip>
        </p>
        <div className="mt-3 flex items-center gap-2 text-[14px] font-bold text-ink-2">
          <ArrowRight className="rotate-90 text-coral" />
          문장 속으로 들어가면
        </div>
        <p lang="en" className="mt-2 flex flex-wrap items-center gap-2 text-[1.1em] font-medium">
          <span>
            <En en="Do you know" />
          </span>
          <Chip className="bg-sky-soft text-sky-ink">where</Chip>
          <Chip className="border border-line">Minho</Chip>
          <Chip className="bg-coral text-white">lives?</Chip>
          <span className="rounded-lg px-2 py-1 text-[14px] text-ink-3 line-through">does</span>
        </p>
        <p className="mt-2 text-[14px] text-ink-2">does가 빠지면서 가져갔던 -s를 동사에게 돌려줘요. 과거라면 did가 빠지고 동사가 과거형이 돼요.</p>
      </div>
      <ul className="grid gap-2.5 sm:grid-cols-3">
        {INSIDE_RULES.map((r) => (
          <li key={r.name} className="flex flex-col rounded-2xl border border-line">
            <div className={`rounded-t-2xl px-4 py-2 ${TONE[r.tone]}`}>
              <p className="text-[15px] font-extrabold">{r.name}</p>
              <p className="text-[14px] font-bold">{r.order}</p>
            </div>
            <div className="px-4 py-2.5">
              <p className="text-[1.04em] font-medium">
                <En en={r.en} />
              </p>
              <p className="text-[14px] text-ink-2">{r.ko}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="rounded-2xl bg-chip px-4 py-3 text-[14.5px]">
        <p className="font-extrabold">think · believe · guess · suppose · imagine과 쓰면 의문사가 맨 앞으로</p>
        <p className="mt-1.5 text-[1.04em] font-medium">
          <En en="[[What]] do you think [[Minsu wants]] for his birthday?" />
        </p>
        <p className="text-[14px] text-ink-2">&lsquo;응, 아니&rsquo;로 대답할 수 없는 질문이라 의문사가 먼저 나와요.</p>
      </div>
    </div>
  );
}

/* ───────── 6. 부사절 지도: 여섯 가지 질문 ───────── */

const ADVERB_MAP: { name: string; ask: string; tone: Tone; words: string; en: string; ko: string }[] = [
  {
    name: "때",
    ask: "언제?",
    tone: "sky",
    words: "when, while, before, after, until, since, as soon as",
    en: "Call me [[{as soon as} you {get home}]].",
    ko: "집에 도착하자마자 전화해.",
  },
  {
    name: "이유",
    ask: "왜?",
    tone: "amber",
    words: "because, since, as",
    en: "[[{Since|접속사:~ 때문에} it's Sunday]], the library closes early.",
    ko: "일요일이라서 도서관이 일찍 문을 닫아.",
  },
  {
    name: "조건",
    ask: "어떤 경우에?",
    tone: "mint",
    words: "if, unless, as long as, in case",
    en: "[[Unless you hurry]], you'll miss the bus.",
    ko: "서두르지 않으면 버스를 놓칠 거야.",
  },
  {
    name: "양보",
    ask: "~인데도?",
    tone: "coral",
    words: "though, although, even though, even if",
    en: "[[Although the test was {hard|형용사:어려운}]], I did my best.",
    ko: "시험이 어려웠지만 나는 최선을 다했어.",
  },
  {
    name: "목적",
    ask: "무엇을 위해?",
    tone: "chip",
    words: "so that, in order that",
    en: "I set an alarm [[{so that} I can {wake up} early]].",
    ko: "일찍 일어날 수 있도록 알람을 맞췄어.",
  },
  {
    name: "결과",
    ask: "그래서 어떻게 됐어?",
    tone: "chip",
    words: "so ~ that, such ~ that",
    en: "The soup was [[{so|부사:너무, 아주} hot {that|접속사:(so ~ that) 그래서 ~하다} I couldn't eat it]].",
    ko: "수프가 너무 뜨거워서 먹을 수가 없었어.",
  },
];

/** 부사절 접속사를 뜻(답하는 질문)별로 모은 지도 */
export function CjAdverbMap() {
  return (
    <ul className="grid gap-2.5 sm:grid-cols-2">
      {ADVERB_MAP.map((m) => (
        <li key={m.name} className="rounded-2xl border border-line px-4 py-3">
          <p className="flex flex-wrap items-center gap-2">
            <Chip className={`text-[15px] ${TONE[m.tone]}`}>{m.name}</Chip>
            <span className="text-[15px] font-extrabold">&ldquo;{m.ask}&rdquo;</span>
          </p>
          <p lang="en" className="mt-1.5 text-[14.5px] font-bold text-ink-2">
            {m.words}
          </p>
          <p className="mt-1.5 text-[1.04em] font-medium">
            <En en={m.en} />
          </p>
          <p className="text-[14px] text-ink-2">{m.ko}</p>
        </li>
      ))}
    </ul>
  );
}

/* ───────── 7. so ~ that과 such ~ that ───────── */

function Slot({ children, tone }: { children: ReactNode; tone: Tone | "line" }) {
  return (
    <span
      className={`inline-flex items-center rounded-lg px-2.5 py-1 text-[15px] font-extrabold ${
        tone === "line" ? "border border-line" : TONE[tone]
      }`}
    >
      {children}
    </span>
  );
}

/** so 뒤에는 형용사·부사, such 뒤에는 (a) + 형용사 + 명사. 둘 다 that 뒤에 결과가 온다 */
export function CjSoSuch() {
  return (
    <div className="grid gap-3">
      <div className="rounded-2xl border border-line px-4 py-3">
        <p className="flex flex-wrap items-center gap-1.5">
          <Slot tone="coral">so</Slot>
          <span aria-hidden>+</span>
          <Slot tone="mint">형용사 · 부사</Slot>
          <span aria-hidden>+</span>
          <Slot tone="coral">that</Slot>
          <span aria-hidden>+</span>
          <Slot tone="line">주어 + 동사</Slot>
        </p>
        <p className="mt-2 text-[1.05em] font-medium">
          <En en="Minho ran [[{so|부사:너무, 아주} fast {that|접속사:(so ~ that) 그래서 ~하다}]] nobody could catch him." />
        </p>
        <p className="text-[14px] text-ink-2">민호가 너무 빨리 달려서 아무도 그를 잡지 못했어.</p>
      </div>
      <div className="rounded-2xl border border-line px-4 py-3">
        <p className="flex flex-wrap items-center gap-1.5">
          <Slot tone="coral">such</Slot>
          <span aria-hidden>+</span>
          <Slot tone="line">a</Slot>
          <span aria-hidden>+</span>
          <Slot tone="mint">형용사</Slot>
          <span aria-hidden>+</span>
          <Slot tone="sky">명사</Slot>
          <span aria-hidden>+</span>
          <Slot tone="coral">that</Slot>
          <span aria-hidden>+</span>
          <Slot tone="line">주어 + 동사</Slot>
        </p>
        <p className="mt-2 text-[1.05em] font-medium">
          <En en="It was [[{such|형용사:그렇게 …한} a funny movie {that|접속사:(such ~ that) 그래서 ~하다}]] we laughed the whole time." />
        </p>
        <p className="text-[14px] text-ink-2">너무 웃긴 영화라서 우리는 내내 웃었어. 복수 명사면 a 없이 such kind neighbors처럼 써요.</p>
      </div>
      <div className="grid gap-2 text-[14.5px] sm:grid-cols-2">
        <div className="rounded-xl bg-chip px-3 py-2.5">
          <p className="font-extrabold">so that: 붙어 있으면 목적</p>
          <p className="mt-0.5 text-ink-2">&lsquo;~하도록, ~하기 위해&rsquo;</p>
        </div>
        <div className="rounded-xl bg-chip px-3 py-2.5">
          <p className="font-extrabold">so + 형용사 + that: 떨어져 있으면 결과</p>
          <p className="mt-0.5 text-ink-2">&lsquo;너무 ~해서 …하다&rsquo;</p>
        </div>
      </div>
    </div>
  );
}

/* ───────── 8. 짝으로 일하는 접속사 ───────── */

const PAIRS: { first: string; second: string; ko: string; en: string; enKo: string; before?: boolean; stress?: boolean }[] = [
  {
    first: "both",
    second: "and",
    ko: "A와 B 둘 다",
    en: "[[{Both|접속사:(both A and B) A와 B 둘 다}]] my mom [[and]] my dad like hiking.",
    enKo: "엄마와 아빠 두 분 다 등산을 좋아하셔.",
  },
  {
    first: "either",
    second: "or",
    ko: "A나 B 둘 중 하나",
    en: "You can have [[{either|접속사:(either A or B) A나 B 둘 중 하나}]] pizza [[or]] pasta.",
    enKo: "피자나 파스타 중 하나를 먹을 수 있어.",
  },
  {
    first: "neither",
    second: "nor",
    ko: "A도 B도 아닌",
    en: "I like [[{neither|접속사:(neither A nor B) A도 B도 아닌}]] carrots [[nor]] onions.",
    enKo: "나는 당근도 양파도 좋아하지 않아.",
  },
  {
    first: "not",
    second: "but",
    ko: "A가 아니라 B",
    en: "The winner was [[not]] Minho [[{but|접속사:(not A but B) A가 아니라 B}]] Jisu.",
    enKo: "우승자는 민호가 아니라 지수였어.",
    stress: true,
  },
  {
    first: "not only",
    second: "but also",
    ko: "A뿐만 아니라 B도",
    en: "She is [[{not only}]] smart [[{but also}]] kind.",
    enKo: "그녀는 똑똑할 뿐만 아니라 친절하기도 해.",
    stress: true,
  },
  {
    first: "as well as",
    second: "",
    ko: "A뿐만 아니라 B도",
    en: "Kids [[{as well as}]] adults love this game.",
    enKo: "어른들뿐만 아니라 아이들도 이 게임을 좋아해.",
    before: true,
    stress: true,
  },
];

function Blank({ letter, stress = false }: { letter: "A" | "B"; stress?: boolean }) {
  return (
    <span
      className={`grid h-8 min-w-9 place-items-center rounded-lg border-2 border-dashed px-2 text-[15px] font-extrabold ${
        stress ? "border-coral text-coral-ink" : "border-ink-3 text-ink-2"
      }`}
    >
      {letter}
    </span>
  );
}

function PairWord({ w }: { w: string }) {
  return (
    <span lang="en" className="rounded-lg bg-amber-soft px-2 py-1 text-[15px] font-extrabold text-amber-ink">
      {w}
    </span>
  );
}

/** 상관접속사: 앞 단어가 뒤 단어를 미리 불러 A와 B를 짝으로 잇는다 */
export function CjPairs() {
  return (
    <div>
      <ul className="grid gap-2.5 sm:grid-cols-2">
        {PAIRS.map((p) => (
          <li key={p.first} className="rounded-2xl border border-line px-4 py-3">
            <p className="flex flex-wrap items-center gap-1.5" aria-label={p.before ? `B ${p.first} A` : `${p.first} A ${p.second} B`}>
              {p.before ? (
                <>
                  <Blank letter="B" stress={p.stress} />
                  <PairWord w={p.first} />
                  <Blank letter="A" />
                </>
              ) : (
                <>
                  <PairWord w={p.first} />
                  <Blank letter="A" />
                  <PairWord w={p.second} />
                  <Blank letter="B" stress={p.stress} />
                </>
              )}
              <span className="ml-1 text-[15px] font-extrabold">{p.ko}</span>
            </p>
            <p className="mt-2 text-[1.04em] font-medium">
              <En en={p.en} />
            </p>
            <p className="text-[14px] text-ink-2">{p.enKo}</p>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-center text-[14px] text-ink-2">
        빨간 테두리의 <span className="font-extrabold text-coral-ink">B</span>: not A but B, not only A but also B, B as well as A는 B 쪽을 더 힘주어 말해요.
      </p>
    </div>
  );
}

/* ───────── 9. 동사는 누구에게 맞출까 ───────── */

const AGREE: { expr: string; target: "both" | "B" | "front"; rule: string; en: string; ko: string }[] = [
  {
    expr: "both A and B",
    target: "both",
    rule: "A + B → 복수",
    en: "[[{Both|접속사:(both A and B) A와 B 둘 다}]] Jisu and I [[are]] in the drama club.",
    ko: "지수와 나는 둘 다 연극부야.",
  },
  {
    expr: "either A or B",
    target: "B",
    rule: "가까운 B에 맞춰요",
    en: "{Either|접속사:(either A or B) A나 B 둘 중 하나} you or [[Minho {has to}]] {take out} the trash.",
    ko: "너나 민호 둘 중 한 명은 쓰레기를 내다 버려야 해.",
  },
  {
    expr: "neither A nor B",
    target: "B",
    rule: "가까운 B에 맞춰요",
    en: "{Neither|접속사:(neither A nor B) A도 B도 아닌} my sister nor [[I am]] {good at} math.",
    ko: "언니도 나도 수학을 잘 못해.",
  },
  {
    expr: "not only A but also B",
    target: "B",
    rule: "힘주는 B에 맞춰요",
    en: "{Not only} the students {but also} [[the teacher was]] excited.",
    ko: "학생들뿐만 아니라 선생님도 신이 나셨어.",
  },
  {
    expr: "B as well as A",
    target: "front",
    rule: "앞에 있는 B에 맞춰요",
    en: "[[The teacher]] {as well as} the students [[was]] excited.",
    ko: "학생들뿐만 아니라 선생님도 신이 나셨어.",
  },
];

function Who({ target }: { target: "both" | "B" | "front" }) {
  const box = (l: string, on: boolean) => (
    <span
      className={`grid h-8 min-w-9 place-items-center rounded-lg px-2 text-[15px] font-extrabold ${
        on ? "bg-coral text-white" : "border border-line text-ink-3"
      }`}
    >
      {l}
    </span>
  );
  const verb = (
    <span className="inline-flex items-center gap-1 rounded-lg border-2 border-coral px-2 py-0.5 text-[14px] font-extrabold text-coral-ink">
      <CrownIcon size={14} />
      동사
    </span>
  );
  if (target === "front")
    return (
      <span className="flex items-center gap-1.5" aria-hidden>
        {box("B", true)}
        {box("A", false)}
        {verb}
      </span>
    );
  return (
    <span className="flex items-center gap-1.5" aria-hidden>
      {box("A", target === "both")}
      {box("B", true)}
      {verb}
    </span>
  );
}

/** 상관접속사가 주어를 이을 때 동사가 맞추는 쪽 */
export function CjAgreement() {
  return (
    <ul className="grid gap-2">
      {AGREE.map((a) => (
        <li key={a.expr} className="rounded-2xl border border-line px-4 py-3">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span lang="en" className="text-[15px] font-extrabold">
              {a.expr}
            </span>
            <Who target={a.target} />
            <span className="text-[14px] font-bold text-coral-ink">{a.rule}</span>
          </div>
          <p className="mt-1.5 text-[1.04em] font-medium">
            <En en={a.en} />
          </p>
          <p className="text-[14px] text-ink-2">{a.ko}</p>
        </li>
      ))}
    </ul>
  );
}

/* ───────── 10. 병렬: 저울의 양쪽은 같은 모양 ───────── */

const BALANCE: { shape: string; pre?: string; a: string; link: string; b: string; wrong: string }[] = [
  { shape: "형용사 = 형용사", pre: "not only", a: "smart", link: "but also", b: "kind", wrong: "kindness" },
  { shape: "동명사 = 동명사", a: "swimming", link: "and", b: "riding my bike", wrong: "ride my bike" },
  { shape: "to부정사 = to부정사", pre: "not", a: "to complain", link: "but", b: "to say thanks", wrong: "saying thanks" },
  { shape: "과거형 = 과거형", a: "finished his homework", link: "and", b: "went to bed", wrong: "go to bed" },
];

function Scale() {
  return (
    <svg width={240} height={78} viewBox="0 0 240 78" className="mx-auto block" aria-hidden>
      <path d="M120 18 L106 70 H134 Z" style={{ fill: "var(--ink-3)" }} />
      <rect x={24} y={14} width={192} height={6} rx={3} style={{ fill: "var(--ink)" }} />
      <path d="M30 20 L16 44 H64 L50 20" fill="none" strokeWidth={2} style={{ stroke: "var(--ink-3)" }} />
      <path d="M190 20 L176 44 H224 L210 20" fill="none" strokeWidth={2} style={{ stroke: "var(--ink-3)" }} />
      <rect x={12} y={44} width={56} height={10} rx={5} style={{ fill: "var(--sky-soft)" }} />
      <rect x={172} y={44} width={56} height={10} rx={5} style={{ fill: "var(--sky-soft)" }} />
      <text x={40} y={72} textAnchor="middle" fontSize={16} fontWeight={800} style={{ fill: "var(--ink)" }}>
        A
      </text>
      <text x={200} y={72} textAnchor="middle" fontSize={16} fontWeight={800} style={{ fill: "var(--ink)" }}>
        B
      </text>
    </svg>
  );
}

/** 접속사로 이은 A와 B는 같은 모양이어야 균형이 맞는다 */
export function CjSameShape() {
  return (
    <div>
      <Scale />
      <ul className="mt-3 grid gap-2">
        {BALANCE.map((r) => (
          <li key={r.shape} className="rounded-2xl border border-line px-4 py-2.5">
            <p className="text-[14px] font-extrabold text-sky-ink">{r.shape}</p>
            <p lang="en" className="mt-1 flex flex-wrap items-center gap-1.5 text-[1.04em] font-medium">
              <Mark ok />
              {r.pre && <span className="text-[14.5px] font-bold text-amber-ink">{r.pre}</span>}
              <span className="rounded-lg bg-sky-soft px-2 py-0.5 text-sky-ink">{r.a}</span>
              <span className="text-[14.5px] font-bold text-amber-ink">{r.link}</span>
              <span className="rounded-lg bg-sky-soft px-2 py-0.5 text-sky-ink">{r.b}</span>
            </p>
            <p lang="en" className="mt-1 flex flex-wrap items-center gap-1.5 text-[14.5px] text-ink-3">
              <Mark ok={false} />
              {r.pre && <span>{r.pre}</span>}
              <span>{r.a}</span>
              <span>{r.link}</span>
              <span className="line-through decoration-coral decoration-2">{r.wrong}</span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
