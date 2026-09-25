import type { ReactNode } from "react";
import { En } from "@/components/lesson/En";
import { ArrowRight, CrownIcon } from "./icons";

/* 품사 장 그림: 다섯 가족, 사전 속 품사 기호, 문장의 뼈대와 꾸밈, 형용사의 두 자리, 접속사 다리, 자리 단서 */

/* 품사 색은 index.tsx의 PosSentence와 같게 맞춘다 */
const PO_POS: Record<string, string> = {
  명사: "bg-sky-soft text-sky-ink",
  대명사: "bg-sky-soft text-sky-ink",
  동사: "bg-coral text-white",
  형용사: "bg-mint-soft text-mint-ink",
  관사: "bg-mint-soft text-mint-ink",
  부사: "bg-amber-soft text-amber-ink",
  전치사: "bg-chip text-ink-2",
  접속사: "bg-chip text-ink-2",
  감탄사: "bg-chip text-ink-2",
};

function PoTag({ pos, children }: { pos: string; children?: ReactNode }) {
  return (
    <span className={`inline-flex items-center rounded-lg px-2 py-1 text-[14px] font-extrabold leading-none ${PO_POS[pos] ?? "bg-chip"}`}>
      {children ?? pos}
    </span>
  );
}

/* ───────── 1. 다섯 가족 ───────── */

const PO_FAMILIES: { family: string; members: string[]; role: string; en: string }[] = [
  { family: "이름 가족", members: ["명사", "대명사"], role: "문장의 등장인물이에요.", en: "dog, Minsu, I, she" },
  { family: "움직임", members: ["동사"], role: "등장인물이 무엇을 하는지, 어떤 상태인지 알려 줘요.", en: "run, eat, be" },
  { family: "명사 꾸미기", members: ["형용사", "관사"], role: "등장인물이 어떤지 꾸며 줘요.", en: "little, happy, the" },
  { family: "나머지 꾸미기", members: ["부사"], role: "움직임이나 꾸밈말을 더 자세히 꾸며 줘요.", en: "very, fast, always" },
  { family: "잇기·외치기", members: ["전치사", "접속사", "감탄사"], role: "문장을 잇고 연결하고 감정을 더해요.", en: "in, and, wow" },
];

/** 8품사를 다섯 가족으로 묶기 */
export function PoFamilies() {
  return (
    <div role="list" className="grid gap-2">
      {PO_FAMILIES.map((f) => (
        <div role="listitem" key={f.family} className="flex flex-col gap-2 rounded-2xl border border-line px-4 py-3 sm:flex-row sm:items-center sm:gap-4">
          <span className="flex shrink-0 flex-wrap items-center gap-1.5 sm:w-56">
            <span className="mr-1 text-[16px] font-extrabold">{f.family}</span>
            {f.members.map((m) => (
              <PoTag key={m} pos={m}>
                {m === "관사" ? "(관사)" : m}
              </PoTag>
            ))}
          </span>
          <span className="min-w-0">
            <span className="block text-[15px] font-bold text-ink-2">{f.role}</span>
            <span className="block text-[1.05em] font-medium">
              <En en={f.en} />
            </span>
          </span>
        </div>
      ))}
    </div>
  );
}

/* ───────── 2. 사전 속 품사 기호 ───────── */

const PO_DICT: { en: string; senses: { mark: string; abbr: string; pos: string; meaning: string; ex: { en: string } }[] }[] = [
  {
    en: "like",
    senses: [
      { mark: "[동]", abbr: "v.", pos: "동사", meaning: "좋아하다", ex: { en: "I [[like]] cats." } },
      { mark: "[전]", abbr: "prep.", pos: "전치사", meaning: "~처럼, ~같이", ex: { en: "It swims [[{like|전치사:~처럼, ~같이}]] a fish." } },
    ],
  },
  {
    en: "fast",
    senses: [
      { mark: "[형]", abbr: "adj.", pos: "형용사", meaning: "빠른", ex: { en: "a [[{fast|형용사:빠른}]] train" } },
      { mark: "[부]", abbr: "adv.", pos: "부사", meaning: "빨리", ex: { en: "Don't eat {so|부사:너무, 그렇게} [[fast]]." } },
    ],
  },
];

/** 사전 한 칸: 뜻 앞의 [동], [전] 기호가 품사다 */
export function PoDictEntry() {
  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2">
        {PO_DICT.map((d) => (
          <div key={d.en} className="rounded-2xl border border-line bg-card px-4 py-3">
            <p className="border-b border-line pb-2 text-[1.45em] font-bold leading-none">
              <En en={d.en} />
            </p>
            <div role="list" className="mt-2 grid gap-2.5">
              {d.senses.map((s) => (
                <div role="listitem" key={s.mark}>
                  <p className="flex flex-wrap items-center gap-2">
                    <PoTag pos={s.pos}>
                      {s.mark} {s.abbr}
                    </PoTag>
                    <span className="text-[15px] font-bold">{s.meaning}</span>
                  </p>
                  <p className="mt-0.5 text-[1.02em]">
                    <En en={s.ex.en} />
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 text-center text-[14px] font-bold text-ink-2">
        뜻보다 먼저 나오는 <span className="rounded-md bg-chip px-1.5 py-0.5">[동] v.</span> 같은 기호가 바로 품사예요. 품사가 바뀌면 뜻도 바뀌어요.
      </p>
    </div>
  );
}

/* ───────── 3. 문장의 뼈대와 꾸밈 ───────── */

const PO_SKELETON: { step: string; note: string; ko: string; words: { en: string; pos: string; add?: boolean }[] }[] = [
  {
    step: "뼈대",
    note: "명사 + 동사만 있어도 문장이 돼요.",
    ko: "개들은 달려.",
    words: [
      { en: "Dogs", pos: "명사" },
      { en: "run.", pos: "동사" },
    ],
  },
  {
    step: "+ 형용사",
    note: "형용사 small이 명사 dogs를 꾸며요.",
    ko: "작은 개들은 달려.",
    words: [
      { en: "Small", pos: "형용사", add: true },
      { en: "dogs", pos: "명사" },
      { en: "run.", pos: "동사" },
    ],
  },
  {
    step: "+ 부사",
    note: "부사 fast가 동사 run을 꾸며요.",
    ko: "작은 개들은 빨리 달려.",
    words: [
      { en: "Small", pos: "형용사" },
      { en: "dogs", pos: "명사" },
      { en: "run", pos: "동사" },
      { en: "fast.", pos: "부사", add: true },
    ],
  },
  {
    step: "+ 부사",
    note: "부사 very가 다른 부사 fast를 꾸며요.",
    ko: "작은 개들은 아주 빨리 달려.",
    words: [
      { en: "Small", pos: "형용사" },
      { en: "dogs", pos: "명사" },
      { en: "run", pos: "동사" },
      { en: "very", pos: "부사", add: true },
      { en: "fast.", pos: "부사" },
    ],
  },
];

/** 명사 + 동사가 뼈대, 형용사와 부사가 살을 붙인다 */
export function PoSkeleton() {
  return (
    <div role="list" className="grid gap-2">
      {PO_SKELETON.map((r, i) => (
        <div role="listitem" key={i} className={`rounded-2xl border px-4 py-3 ${i === 0 ? "border-2 border-ink/30" : "border-line"}`}>
          <p className="flex flex-wrap items-center gap-2">
            <span className={`rounded-lg px-2.5 py-1 text-[14px] font-extrabold ${i === 0 ? "bg-ink text-bg" : "bg-chip"}`}>{r.step}</span>
            <span className="text-[14px] text-ink-2">{r.note}</span>
          </p>
          <p className="mt-2.5 flex flex-wrap items-start gap-x-2 gap-y-3">
            {r.words.map((w, j) => (
              <span key={j} className="inline-flex flex-col items-center gap-1.5">
                <span className={`rounded-md px-1 text-[1.2em] font-medium leading-tight ${w.add ? "bg-marker" : ""}`}>
                  <En en={w.en} />
                </span>
                <PoTag pos={w.pos} />
              </span>
            ))}
          </p>
          <p className="mt-2 text-[14px] text-ink-2">{r.ko}</p>
        </div>
      ))}
    </div>
  );
}

/* ───────── 4. 형용사가 서는 두 자리 ───────── */

function PoSeat({ en, label }: { en: string; label: string }) {
  return (
    <span className="inline-flex flex-col items-center gap-1">
      <span className="rounded-xl border-2 border-dashed border-mint-ink/60 p-1">
        <span className="block rounded-lg bg-mint-soft px-2.5 py-1 text-[1.15em] font-medium text-mint-ink">
          <En en={en} />
        </span>
      </span>
      <span className="text-[14px] font-extrabold text-mint-ink">{label}</span>
    </span>
  );
}

function PoPlain({ en }: { en: string }) {
  return (
    <span className="inline-flex flex-col items-center gap-1">
      <span className="rounded-xl border border-line px-2.5 py-1.5 text-[1.15em] font-medium">
        <En en={en} />
      </span>
      <span className="text-[14px]" aria-hidden>
        &nbsp;
      </span>
    </span>
  );
}

/** 형용사 자리: ① 명사 바로 앞 ② be동사 뒤 */
export function PoAdjSeats() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <div className="rounded-2xl border border-line px-4 py-3">
        <p className="font-extrabold">① 명사 바로 앞</p>
        <p className="text-[14px] text-ink-2">명사를 앞에서 꾸며요.</p>
        <p className="mt-2.5 flex flex-wrap items-start gap-2">
          <PoPlain en="a" />
          <PoSeat en="cute" label="형용사" />
          <PoPlain en="dog" />
        </p>
        <p className="mt-1 text-[14px] text-ink-2">귀여운 강아지 · 우리말과 순서가 같아요</p>
      </div>
      <div className="rounded-2xl border border-line px-4 py-3">
        <p className="font-extrabold">② be동사 뒤</p>
        <p className="text-[14px] text-ink-2">주어가 어떤 상태인지 설명해요.</p>
        <p className="mt-2.5 flex flex-wrap items-start gap-2">
          <PoPlain en="The dog" />
          <PoPlain en="is" />
          <PoSeat en="cute." label="형용사" />
        </p>
        <p className="mt-1 text-[14px] text-ink-2">
          그 강아지는 귀여워 · <En en="look, feel, sound" /> 뒤도 이 자리예요
        </p>
      </div>
    </div>
  );
}

/* ───────── 5. 접속사 다리 ───────── */

type PoWord = { en: string; king?: boolean };

const PO_LEFT: PoWord[] = [{ en: "I" }, { en: "was", king: true }, { en: "hungry," }];
const PO_RIGHT: PoWord[] = [{ en: "I" }, { en: "ate", king: true }, { en: "some bread." }];
const PO_BRIDGE = { en: "so" };

function PoIsland({ words, label }: { words: PoWord[]; label: string }) {
  return (
    <div className="rounded-2xl border border-line px-4 py-3">
      <p className="text-[14px] font-extrabold text-ink-3">{label}</p>
      <p className="mt-1.5 flex flex-wrap items-end gap-1.5 text-[1.12em] font-medium">
        {words.map((w, i) =>
          w.king ? (
            <span key={i} className="inline-flex flex-col items-center">
              <CrownIcon size={18} className="text-coral" />
              <span className="rounded-lg bg-coral px-2 py-0.5 text-white">
                <En en={w.en} />
              </span>
            </span>
          ) : (
            <span key={i} className="py-0.5">
              <En en={w.en} />
            </span>
          ),
        )}
      </p>
    </div>
  );
}

/** 접속사는 문장과 문장을 잇는 다리: 하나가 놓이면 진짜 동사도 하나 더 */
export function PoConjBridge() {
  return (
    <div>
      <div className="grid items-center gap-2 sm:grid-cols-[1fr_auto_1fr]">
        <PoIsland words={PO_LEFT} label="문장 1" />
        <div className="flex flex-col items-center gap-1 py-1">
          <span className="rounded-full bg-sky-soft px-4 py-1.5 text-[1.15em] font-bold text-sky-ink">
            <En en={PO_BRIDGE.en} />
          </span>
          <span className="text-[14px] font-extrabold text-sky-ink">접속사 다리</span>
        </div>
        <PoIsland words={PO_RIGHT} label="문장 2" />
      </div>
      <p className="mt-3 flex flex-wrap items-center justify-center gap-2 text-[15px] font-extrabold">
        <span className="rounded-lg bg-sky-soft px-2.5 py-1 text-sky-ink">접속사 1개</span>
        <ArrowRight size={18} className="text-ink-3" />
        <span className="rounded-lg bg-coral px-2.5 py-1 text-white">진짜 동사 2개</span>
      </p>
      <p className="mt-2 text-center text-[14px] text-ink-2">
        배가 고파서 빵을 좀 먹었어. 단어와 단어를 이을 때도 써요: <En en="cats [[and]] dogs" />
      </p>
    </div>
  );
}

/* ───────── 6. 앞뒤 단서로 품사 알아내기 ───────── */

type PoPart = { en: string; clue?: boolean; target?: boolean };

const PO_CLUES: { parts: PoPart[]; clue: string; pos: string; ko: string }[] = [
  {
    parts: [{ en: "{Turn on}" }, { en: "the", clue: true }, { en: "{light|명사:빛, 불(조명)}.", target: true }],
    clue: "관사 the 바로 뒤",
    pos: "명사",
    ko: "불, 조명",
  },
  {
    parts: [{ en: "This bag" }, { en: "is very", clue: true }, { en: "{light|형용사:가벼운}.", target: true }],
    clue: "be동사 is와 very 뒤에서 상태 설명",
    pos: "형용사",
    ko: "가벼운",
  },
  {
    parts: [{ en: "Please" }, { en: "{water|동사:(식물에) 물을 주다}", target: true }, { en: "the flowers.", clue: true }],
    clue: "뒤에 목적어 the flowers가 있어요",
    pos: "동사",
    ko: "물을 주다",
  },
  {
    parts: [{ en: "He speaks English", clue: true }, { en: "well.", target: true }],
    clue: "동사 speaks를 '어떻게?' 꾸며요",
    pos: "부사",
    ko: "잘",
  },
];

function PoLens() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.5 15.5 L21 21" />
    </svg>
  );
}

/** 모르는 단어는 앞뒤 단서(자리)를 보면 품사와 뜻이 보인다 */
export function PoNeighborClues() {
  return (
    <div>
      <p className="mb-2 flex flex-wrap gap-2 text-[14px] font-bold">
        <span className="rounded-lg border-2 border-dashed border-coral px-2 py-0.5 text-coral-ink">단서: 앞뒤 말</span>
        <span className="rounded-lg bg-marker px-2 py-0.5">품사를 알아낼 단어</span>
      </p>
      <div role="list" className="grid gap-2">
        {PO_CLUES.map((r, i) => (
          <div role="listitem" key={i} className="rounded-2xl border border-line px-4 py-3">
            <p className="flex flex-wrap items-center gap-1.5 text-[1.12em] font-medium">
              {r.parts.map((p, j) => (
                <span
                  key={j}
                  className={`rounded-lg px-1.5 py-0.5 ${
                    p.clue ? "border-2 border-dashed border-coral" : p.target ? "bg-marker font-bold" : ""
                  }`}
                >
                  <En en={p.en} />
                </span>
              ))}
            </p>
            <p className="mt-2 flex flex-wrap items-center gap-2 text-[14px]">
              <span className="inline-flex items-center gap-1 font-bold text-coral-ink">
                <PoLens />
                {r.clue}
              </span>
              <ArrowRight size={18} className="text-ink-3" />
              <PoTag pos={r.pos} />
              <span className="font-bold">{r.ko}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
