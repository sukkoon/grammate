import type { ReactNode } from "react";
import { En } from "@/components/lesson/En";
import { ArrowRight, CrownIcon, MaskIcon, PersonIcon } from "./icons";

/* 특수구문 장 그림: 강조구문 조명, 강조구문 vs 가주어, 도치 어순, 주어 + be 생략, 동격 that vs 관계대명사 that, 삽입절 괄호, 부분부정, 병렬,
   ~하자마자 시간선, 되풀이 생략 채우기, 동격 =, 병렬과 진짜 동사, 준부정어 눈금 */

/* ───────── 공통 도우미 ───────── */

type Tone = "sky" | "mint" | "amber" | "coral";

const TONE: Record<Tone, string> = {
  sky: "bg-sky-soft text-sky-ink",
  mint: "bg-mint-soft text-mint-ink",
  amber: "bg-amber-soft text-amber-ink",
  coral: "bg-coral-soft text-coral-ink",
};

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

function Chip({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`inline-flex items-center rounded-lg px-2.5 py-1 font-bold ${className}`}>{children}</span>;
}

/** 지워지는 말: 줄을 긋고 흐리게 */
function Cut({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-lg border border-dashed border-ink-3 px-2.5 py-1 font-bold text-ink-3 line-through decoration-coral decoration-2">
      {children}
    </span>
  );
}

/* ───────── 1. It is ~ that 강조구문: 조명 비추기 ───────── */

const BASE_PARTS: { part: { en: string }; role: string; tone: Tone | null }[] = [
  { part: { en: "Jisu" }, role: "주어", tone: "sky" },
  { part: { en: "found" }, role: "동사", tone: null },
  { part: { en: "my cat" }, role: "목적어", tone: "mint" },
  { part: { en: "in the park" }, role: "장소", tone: "amber" },
  { part: { en: "yesterday" }, role: "시간", tone: "coral" },
];

const SPOTS: { role: string; tone: Tone; en: string; ko: string }[] = [
  {
    role: "주어",
    tone: "sky",
    en: "{It|대명사:(강조구문) 뜻 없이 틀을 만들어요} was [[Jisu]] {that|접속사:(강조구문) ~한 것은} found my cat in the park yesterday.",
    ko: "어제 공원에서 우리 고양이를 찾은 건 바로 지수였어.",
  },
  {
    role: "목적어",
    tone: "mint",
    en: "{It|대명사:(강조구문) 뜻 없이 틀을 만들어요} was [[my cat]] {that|접속사:(강조구문) ~한 것은} Jisu found in the park yesterday.",
    ko: "어제 지수가 공원에서 찾은 건 바로 우리 고양이였어.",
  },
  {
    role: "장소",
    tone: "amber",
    en: "{It|대명사:(강조구문) 뜻 없이 틀을 만들어요} was [[in the park]] {that|접속사:(강조구문) ~한 것은} Jisu found my cat yesterday.",
    ko: "어제 지수가 우리 고양이를 찾은 곳은 바로 공원이었어.",
  },
  {
    role: "시간",
    tone: "coral",
    en: "{It|대명사:(강조구문) 뜻 없이 틀을 만들어요} was [[yesterday]] {that|접속사:(강조구문) ~한 것은} Jisu found my cat in the park.",
    ko: "지수가 공원에서 우리 고양이를 찾은 건 바로 어제였어.",
  },
];

/** 한 문장에서 무엇을 It was와 that 사이에 넣느냐에 따라 조명이 바뀐다 */
export function ScSpotlight() {
  return (
    <div>
      <p className="flex flex-wrap items-center justify-center gap-2 text-[1.08em]">
        <Chip className="border border-line">It is(was)</Chip>
        <span aria-hidden>+</span>
        <Chip className="bg-coral text-white">강조할 말</Chip>
        <span aria-hidden>+</span>
        <Chip className="border border-line">that</Chip>
        <span aria-hidden>+</span>
        <Chip className="bg-chip">나머지</Chip>
      </p>
      <div className="mt-4 rounded-2xl border border-line px-4 py-3">
        <p className="text-[13.5px] font-extrabold text-ink-3">원래 문장</p>
        <p className="mt-2 flex flex-wrap items-end gap-x-2 gap-y-2">
          {BASE_PARTS.map((p) => (
            <span key={p.role} className="inline-flex flex-col items-center gap-1">
              <span className={`rounded-lg px-2.5 py-1 text-[1.05em] font-medium ${p.tone ? TONE[p.tone] : "border border-line"}`}>
                <En en={p.part.en} />
              </span>
              <span className="text-[13.5px] font-bold text-ink-3">{p.role}</span>
            </span>
          ))}
        </p>
      </div>
      <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
        {SPOTS.map((s) => (
          <li key={s.role} className="rounded-2xl border border-line px-4 py-3">
            <Chip className={`text-[13.5px] ${TONE[s.tone]}`}>{s.role}에 조명</Chip>
            <p className="mt-2 text-[1.04em] font-medium">
              <En en={s.en} />
            </p>
            <p className="text-[13.5px] text-ink-2">{s.ko}</p>
          </li>
        ))}
      </ul>
      <p className="mt-3 rounded-2xl bg-chip px-4 py-2.5 text-center text-[14px] font-bold">
        동사 found는 틀에 넣지 않아요. 동사는{" "}
        <span className="text-coral-ink">
          <En en="Jisu {did|조동사:(강조) 정말 ~했다} find my cat." />
        </span>
        처럼 did로 강조해요.
      </p>
    </div>
  );
}

/* ───────── 2. 강조구문 vs 가주어: 지워 보기 ───────── */

const CLEFT_TESTS: {
  kind: string;
  pieces: { en: string; cut: boolean }[];
  rest: { en: string };
  ok: boolean;
  verdict: string;
}[] = [
  {
    kind: "강조구문",
    pieces: [
      { en: "{It|대명사:(강조구문) 뜻 없이 틀을 만들어요} was", cut: true },
      { en: "Minsu", cut: false },
      { en: "{that|접속사:(강조구문) ~한 것은}", cut: true },
      { en: "broke the window.", cut: false },
    ],
    rest: { en: "Minsu broke the window." },
    ok: true,
    verdict: "빠진 것 없는 완전한 문장이 남아요 → 강조구문",
  },
  {
    kind: "가주어 It",
    pieces: [
      { en: "{It|대명사:가주어 (뜻 없이 자리만 채워요)} is", cut: true },
      { en: "strange", cut: false },
      { en: "{that|접속사:~라는 것}", cut: true },
      { en: "Minsu is late again.", cut: false },
    ],
    rest: { en: "strange Minsu is late again." },
    ok: false,
    verdict: "형용사 strange가 덩그러니 남아 문장이 안 돼요 → 가주어 It, 진주어 that절",
  },
];

/** It is(was)와 that을 지웠을 때 완전한 문장이 남으면 강조구문, 아니면 가주어 */
export function ScCleftTest() {
  return (
    <div>
      <p className="text-center text-[14.5px] font-bold">
        <span className="text-coral-ink">It is(was)</span>와 <span className="text-coral-ink">that</span>을 지워 보세요
      </p>
      <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
        {CLEFT_TESTS.map((t) => (
          <div key={t.kind} className={`rounded-2xl px-4 py-3 ${t.ok ? "border-2 border-coral" : "border border-line"}`}>
            <p className="text-[13.5px] font-extrabold text-ink-3">{t.kind}일까?</p>
            <p className="mt-2 flex flex-wrap items-center gap-1.5 text-[1.02em]">
              {t.pieces.map((p) =>
                p.cut ? (
                  <Cut key={p.en}>
                    <En en={p.en} />
                  </Cut>
                ) : (
                  <Chip key={p.en} className="border border-line font-medium">
                    <En en={p.en} />
                  </Chip>
                ),
              )}
            </p>
            <div className="mt-2 flex items-center gap-2 text-[13.5px] font-bold text-ink-2">
              <ArrowRight size={18} className="rotate-90 text-coral" />
              남은 말
            </div>
            <p className="mt-1 flex items-center gap-2 text-[1.04em] font-medium">
              <Mark ok={t.ok} />
              <En en={t.rest.en} />
            </p>
            <p className={`mt-2 text-[13.5px] font-bold ${t.ok ? "text-coral-ink" : "text-ink-2"}`}>{t.verdict}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ───────── 3. 도치: 동사 종류에 따라 세 가지 ───────── */

type Role = "neg" | "aux" | "subj" | "main" | "rest";

const ROLE_STYLE: Record<Role, string> = {
  neg: "bg-amber-soft text-amber-ink",
  aux: "border-2 border-coral bg-coral-soft text-coral-ink",
  subj: "bg-sky-soft text-sky-ink",
  main: "border-2 border-dashed border-coral text-coral-ink",
  rest: "border border-line",
};

const FLIPS: { kind: string; from: { en: string }; to: { en: string; r: Role }[]; note: string }[] = [
  {
    kind: "be동사",
    from: { en: "The classroom was never {so|부사:그렇게, 매우} quiet." },
    to: [
      { en: "Never", r: "neg" },
      { en: "was", r: "aux" },
      { en: "the classroom", r: "subj" },
      { en: "{so|부사:그렇게, 매우} quiet.", r: "rest" },
    ],
    note: "be동사가 그대로 주어 앞으로 나가요.",
  },
  {
    kind: "조동사 · 완료의 have",
    from: { en: "I {have|조동사:완료형을 만드는 말} never seen such a big dog." },
    to: [
      { en: "Never", r: "neg" },
      { en: "{have|조동사:완료형을 만드는 말}", r: "aux" },
      { en: "I", r: "subj" },
      { en: "seen", r: "main" },
      { en: "such a big dog.", r: "rest" },
    ],
    note: "have만 주어 앞으로 나가요. have와 seen은 주어를 사이에 둔 한 덩어리 진짜 동사예요.",
  },
  {
    kind: "일반동사",
    from: { en: "My dad rarely eats breakfast." },
    to: [
      { en: "Rarely", r: "neg" },
      { en: "{does|조동사:(도치) 주어 앞으로 나온 조동사}", r: "aux" },
      { en: "my dad", r: "subj" },
      { en: "eat", r: "main" },
      { en: "breakfast.", r: "rest" },
    ],
    note: "does를 불러와 주어 앞에 세워요. eats의 -s는 does가 가져가고 eat은 원형이 돼요.",
  },
];

/** 부정어가 앞에 오면 의문문처럼 (조)동사가 주어 앞으로. 그래도 진짜 동사는 하나 */
export function ScInversionFlip() {
  return (
    <div>
      <ul className="grid gap-2.5">
        {FLIPS.map((f) => (
          <li key={f.kind} className="rounded-2xl border border-line px-4 py-3">
            <p className="text-[13.5px] font-extrabold text-ink-3">{f.kind}</p>
            <p className="mt-1 text-[1em] text-ink-2">
              <En en={f.from.en} />
            </p>
            <p className="mt-2 flex flex-wrap items-center gap-1.5 text-[1.05em]">
              <ArrowRight size={18} className="text-coral" />
              {f.to.map((t) => (
                <span key={t.en} className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 font-bold ${ROLE_STYLE[t.r]}`}>
                  {(t.r === "aux" || t.r === "main") && <CrownIcon size={15} />}
                  <En en={t.en} />
                </span>
              ))}
            </p>
            <p className="mt-1.5 text-[13.5px] font-bold text-ink-2">{f.note}</p>
          </li>
        ))}
      </ul>
      <p className="mt-3 flex flex-wrap items-center justify-center gap-2 text-[13.5px] font-bold">
        <Chip className={ROLE_STYLE.neg}>앞으로 나온 말</Chip>
        <Chip className={ROLE_STYLE.aux}>주어 앞으로 간 (조)동사</Chip>
        <Chip className={ROLE_STYLE.subj}>주어</Chip>
        <Chip className={ROLE_STYLE.main}>남은 본동사</Chip>
      </p>
    </div>
  );
}

/* ───────── 4. 부사절의 주어 + be동사 생략 ───────── */

const SHRINKS: { conj: { en: string }; cut: { en: string }; keep: { en: string }; kind: string }[] = [
  { conj: { en: "{When|접속사:~할 때}" }, cut: { en: "he was" }, keep: { en: "young" }, kind: "형용사" },
  { conj: { en: "{Though|접속사:비록 ~이지만}" }, cut: { en: "she was" }, keep: { en: "tired" }, kind: "형용사" },
  { conj: { en: "{while|접속사:~하는 동안}" }, cut: { en: "you are" }, keep: { en: "crossing the street" }, kind: "현재분사 (하는 쪽)" },
  { conj: { en: "{When|접속사:~할 때}" }, cut: { en: "he was" }, keep: { en: "asked about the test" }, kind: "과거분사 (당하는 쪽)" },
  { conj: { en: "{If|접속사:만약 ~라면}" }, cut: { en: "it is" }, keep: { en: "necessary" }, kind: "형용사 (굳은 표현)" },
];

/** 주어와 be동사가 함께 빠지면 부사절에 진짜 동사가 남지 않는다 */
export function ScShrinkClause() {
  return (
    <div>
      <p className="flex flex-wrap items-center justify-center gap-2 text-[1.05em]">
        <Chip className="bg-chip">접속사</Chip>
        <span aria-hidden>+</span>
        <Cut>주어 + be동사</Cut>
        <span aria-hidden>+</span>
        <Chip className="bg-mint-soft text-mint-ink">남은 말</Chip>
      </p>
      <ul className="mt-3 grid gap-2">
        {SHRINKS.map((s) => (
          <li key={s.keep.en} className="flex flex-wrap items-center gap-x-2 gap-y-1.5 rounded-2xl border border-line px-4 py-2.5 text-[1.04em]">
            <Chip className="bg-chip font-medium">
              <En en={s.conj.en} />
            </Chip>
            <Cut>
              <En en={s.cut.en} />
            </Cut>
            <Chip className="bg-mint-soft font-medium text-mint-ink">
              <En en={s.keep.en} />
            </Chip>
            <span className="text-[13.5px] font-bold text-ink-3">{s.kind}</span>
          </li>
        ))}
      </ul>
      <div className="mt-3 grid gap-2 text-[14px] font-bold sm:grid-cols-2">
        <p className="flex items-center gap-2 rounded-xl bg-mint-soft px-3 py-2 text-mint-ink">
          <Mark ok />
          진짜 동사 0개: 형용사·분사·전치사구만 남아요
        </p>
        <p className="flex items-center gap-2 rounded-xl bg-coral-soft px-3 py-2 text-coral-ink">
          <Mark ok={false} />
          <span>
            주어만 빼고 be동사를 남기면 안 돼요{" "}
            <span lang="en" className="whitespace-nowrap">
              (When was young)
            </span>
          </span>
        </p>
      </div>
    </div>
  );
}

/* ───────── 5. 동격 that vs 관계대명사 that ───────── */

const THAT_TWINS: {
  kind: string;
  head: { en: string };
  slots: { word?: { en: string }; label: string; gap?: boolean }[];
  verdict: string;
  meaning: string;
  strong: boolean;
}[] = [
  {
    kind: "동격 that",
    head: { en: "the news [[{that|접속사:(동격) ~라는}]] our team won the {final|명사:결승전}" },
    slots: [
      { word: { en: "our team" }, label: "주어" },
      { word: { en: "won" }, label: "동사" },
      { word: { en: "the {final|명사:결승전}" }, label: "목적어" },
    ],
    verdict: "빠진 것 없음 → 완전한 문장",
    meaning: "'~라는' 소식: that절이 소식의 내용이에요.",
    strong: true,
  },
  {
    kind: "관계대명사 that",
    head: { en: "the news [[{that|관계대명사:~한 (앞의 명사를 꾸며요)}]] I heard yesterday" },
    slots: [
      { word: { en: "I" }, label: "주어" },
      { word: { en: "heard" }, label: "동사" },
      { label: "목적어", gap: true },
      { word: { en: "yesterday" }, label: "때" },
    ],
    verdict: "목적어가 빠짐 → 불완전한 문장",
    meaning: "'~한' 소식: that이 빈자리를 채우며 news를 꾸며요.",
    strong: false,
  },
];

/** that 뒤가 완전하면 동격, 주어나 목적어가 빠져 있으면 관계대명사 */
export function ScThatTwins() {
  return (
    <div>
      <div className="grid gap-2.5 sm:grid-cols-2">
        {THAT_TWINS.map((t) => (
          <div key={t.kind} className={`rounded-2xl px-4 py-3 ${t.strong ? "border-2 border-coral" : "border border-line"}`}>
            <Chip className={`text-[14.5px] ${t.strong ? TONE.coral : TONE.sky}`}>{t.kind}</Chip>
            <p className="mt-2 text-[1.05em] font-medium">
              <En en={t.head.en} />
            </p>
            <p className="mt-2 text-[13.5px] font-bold text-ink-3">that 뒤를 뜯어 보면</p>
            <p className="mt-1 flex flex-wrap items-end gap-1.5">
              {t.slots.map((s) => (
                <span key={s.label} className="inline-flex flex-col items-center gap-1">
                  {s.gap ? (
                    <span className="rounded-lg border-2 border-dashed border-coral px-4 py-1 font-extrabold text-coral-ink" aria-label="빈자리">
                      ?
                    </span>
                  ) : (
                    <span className="rounded-lg border border-line px-2.5 py-1 font-medium">
                      <En en={s.word?.en ?? ""} />
                    </span>
                  )}
                  <span className="text-[13.5px] font-bold text-ink-3">{s.label}</span>
                </span>
              ))}
            </p>
            <p className={`mt-2 text-[14px] font-extrabold ${t.strong ? "text-coral-ink" : "text-sky-ink"}`}>{t.verdict}</p>
            <p className="text-[13.5px] text-ink-2">{t.meaning}</p>
          </div>
        ))}
      </div>
      <p className="mt-3 flex flex-wrap items-center justify-center gap-2 text-[14px] font-bold">
        <span>동격절은 that으로만 써요</span>
        <span lang="en" className="text-ink-3">
          the news which our team won ✕
        </span>
      </p>
    </div>
  );
}

/* ───────── 6. 삽입절: 괄호로 빼고 읽기 ───────── */

/** 끼어든 I think를 괄호로 빼면 who가 is의 주어라는 게 보인다 */
export function ScBracketOut() {
  return (
    <div className="mx-auto grid max-w-xl gap-3">
      <div className="rounded-2xl border border-line px-4 py-3">
        <p className="text-[13.5px] font-extrabold text-ink-3">끼어든 말이 있는 문장</p>
        <p className="mt-2 flex flex-wrap items-center gap-1.5 text-[1.05em]">
          <Chip className="border border-line font-medium">
            <En en="Jisu is the student" />
          </Chip>
          <Chip className="bg-sky-soft text-sky-ink">
            <En en="{who|관계대명사:~하는 (앞의 사람을 꾸며요)}" />
          </Chip>
          <Chip className="border-2 border-dashed border-amber-ink bg-amber-soft text-amber-ink">
            <En en="I think" />
          </Chip>
          <Chip className="border border-line font-medium">
            <En en="is the kindest in our class." />
          </Chip>
        </p>
        <p className="mt-1.5 text-[13.5px] text-ink-2">지수는 내 생각에 우리 반에서 가장 친절한 학생이야.</p>
      </div>
      <div className="flex items-center justify-center gap-2 text-[13.5px] font-bold text-ink-2">
        <ArrowRight className="rotate-90 text-coral" />
        I think를 괄호로 빼면
      </div>
      <div className="rounded-2xl border-2 border-coral px-4 py-3">
        <p className="flex flex-wrap items-center gap-1.5 text-[1.05em]">
          <Chip className="border border-line font-medium">
            <En en="Jisu is the student" />
          </Chip>
          <Chip className="bg-sky-soft text-sky-ink">
            <En en="{who|관계대명사:~하는 (앞의 사람을 꾸며요)}" />
          </Chip>
          <span className="text-[13.5px] font-bold text-ink-3">( I think )</span>
          <Chip className="border-2 border-coral bg-coral-soft text-coral-ink">
            <CrownIcon size={15} className="mr-1" />
            <En en="is" />
          </Chip>
          <Chip className="border border-line font-medium">
            <En en="the kindest in our class." />
          </Chip>
        </p>
        <div className="mt-2 grid gap-1.5 text-[13.5px] sm:grid-cols-2">
          <p>
            <span className="font-extrabold text-sky-ink">who</span> = is의 주어. 그래서 주격 who예요.{" "}
            <span lang="en" className="text-ink-3">
              whom ✕
            </span>
          </p>
          <p>
            괄호 밖 진짜 동사: <span className="font-extrabold">is, is</span> (관계사 who 1개 + 1 = 2)
          </p>
        </div>
      </div>
      <p className="rounded-2xl bg-chip px-4 py-2.5 text-center text-[14px] font-bold">
        괄호 속 think는 끼어든 말의 동사예요. 관계절의 동사로 세지 않아요.
      </p>
    </div>
  );
}

/* ───────── 7. 부분부정 vs 전체부정 ───────── */

const NEG_GROUPS: { label: string; tag: string; en: string; ko: string; liked: number; strong: boolean }[] = [
  { label: "All", tag: "전체 긍정", en: "[[All]] of us liked the movie.", ko: "우리 모두 그 영화를 좋아했어.", liked: 5, strong: false },
  { label: "Not all", tag: "부분부정", en: "[[Not all]] of us liked the movie.", ko: "우리 모두가 그 영화를 좋아한 건 아니야.", liked: 3, strong: true },
  { label: "None", tag: "전체부정", en: "[[{None|대명사:아무도 ~ 않다}]] of us liked the movie.", ko: "우리 중 아무도 그 영화를 좋아하지 않았어.", liked: 0, strong: false },
];

const NEG_PAIRS: [string, string][] = [
  ["not all", "none, no"],
  ["not every", "no, nobody"],
  ["not both", "neither"],
  ["not always", "never"],
  ["not necessarily", "not ~ at all"],
];

const FIVE = [0, 1, 2, 3, 4];

/** Not all은 일부만 아니다, None은 하나도 아니다 */
export function ScNotAll() {
  return (
    <div>
      <ul className="grid gap-2.5 sm:grid-cols-3">
        {NEG_GROUPS.map((g) => (
          <li key={g.label} className={`flex flex-col rounded-2xl px-4 py-3 ${g.strong ? "border-2 border-coral" : "border border-line"}`}>
            <p className="flex flex-wrap items-center gap-2">
              <span lang="en" className="text-[15px] font-extrabold">
                {g.label}
              </span>
              <Chip className={`text-[13.5px] ${g.strong ? TONE.coral : "bg-chip"}`}>{g.tag}</Chip>
            </p>
            <p className="mt-2 flex gap-1" aria-label={`다섯 명 중 ${g.liked}명이 좋아함`}>
              {FIVE.map((i) => (
                <PersonIcon key={i} size={26} className={i < g.liked ? "text-mint-ink" : "text-ink-3 opacity-40"} />
              ))}
            </p>
            <p className="mt-2 text-[1.02em] font-medium">
              <En en={g.en} />
            </p>
            <p className="text-[13.5px] text-ink-2">{g.ko}</p>
          </li>
        ))}
      </ul>
      <div className="mt-3 overflow-hidden rounded-2xl border border-line text-[14px]">
        <div className="grid grid-cols-2 bg-chip font-extrabold">
          <span className="px-3 py-2">부분부정 (일부만 아니다)</span>
          <span className="px-3 py-2">전체부정 (하나도 아니다)</span>
        </div>
        {NEG_PAIRS.map(([p, t]) => (
          <div key={p} lang="en" className="grid grid-cols-2 border-t border-line font-bold">
            <span className="px-3 py-1.5 text-coral-ink">{p}</span>
            <span className="px-3 py-1.5">{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ───────── 8. 병렬: 같은 모양끼리 ───────── */

const RAILS: { kind: string; en: string; ko: string; note: string; bad: string; real: boolean }[] = [
  {
    kind: "진짜 동사 = 진짜 동사",
    en: "She [[opened]] the window and [[cleaned]] the room.",
    ko: "그녀는 창문을 열고 방을 청소했어.",
    note: "and 1개 → 진짜 동사 2개. 둘 다 과거형",
    bad: "and cleaning ✕",
    real: true,
  },
  {
    kind: "동명사 = 동명사",
    en: "I enjoy [[swimming]] and [[hiking]].",
    ko: "나는 수영과 하이킹을 즐겨.",
    note: "진짜 동사는 enjoy 하나. and가 동명사 둘을 이어요",
    bad: "and to hike ✕",
    real: false,
  },
  {
    kind: "to부정사 = to부정사",
    en: "My goal is [[to read]] {more|형용사:더 많은} books and [[(to) write]] a diary.",
    ko: "내 목표는 책을 더 많이 읽고 일기를 쓰는 거야.",
    note: "뒤의 to는 생략할 수 있어요",
    bad: "and writing ✕",
    real: false,
  },
  {
    kind: "형용사 = 형용사",
    en: "My sister is [[smart]], [[funny]], and [[kind]].",
    ko: "우리 언니는 똑똑하고, 재미있고, 친절해.",
    note: "보어 자리의 형용사 셋",
    bad: "and kindness ✕",
    real: false,
  },
];

/** and 앞뒤는 같은 모양. 짝이 진짜 동사면 진짜 동사, 짝이 준동사면 같은 준동사 */
export function ScParallelRails() {
  return (
    <div>
      <p className="flex flex-wrap items-center justify-center gap-2 text-[1.05em]">
        <Chip className="bg-chip">A</Chip>
        <span className="font-bold">and · but · or</span>
        <Chip className="bg-chip">B</Chip>
        <span className="text-[14.5px] font-bold text-ink-2">= A와 B는 같은 모양</span>
      </p>
      <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
        {RAILS.map((r) => (
          <li key={r.kind} className={`rounded-2xl px-4 py-3 ${r.real ? "border-2 border-coral" : "border border-line"}`}>
            <p className="flex flex-wrap items-center gap-2">
              <Chip className={`text-[13.5px] ${r.real ? "bg-coral text-white" : TONE.amber}`}>
                {r.real && <CrownIcon size={15} className="mr-1" />}
                {r.kind}
              </Chip>
            </p>
            <p className="mt-2 text-[1.04em] font-medium">
              <En en={r.en} />
            </p>
            <p className="text-[13.5px] text-ink-2">{r.ko}</p>
            <p className="mt-1.5 text-[13.5px] font-bold text-ink-3">{r.note}</p>
            <p lang="en" className="mt-1 text-[13.5px] font-bold text-coral-ink">
              {r.bad}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ───────── 9. ~하자마자: 먼저 일어난 일은 had p.p. ───────── */

const SOONER_ROWS: { key: string; parts: { t: string; tone: string }[] }[] = [
  {
    key: "hardly",
    parts: [
      { t: "Hardly", tone: "bg-amber-soft text-amber-ink" },
      { t: "had + 주어 + p.p.", tone: "bg-sky-soft text-sky-ink" },
      { t: "when", tone: "bg-amber-soft text-amber-ink" },
      { t: "주어 + 과거형", tone: "bg-coral-soft text-coral-ink" },
    ],
  },
  {
    key: "sooner",
    parts: [
      { t: "No sooner", tone: "bg-amber-soft text-amber-ink" },
      { t: "had + 주어 + p.p.", tone: "bg-sky-soft text-sky-ink" },
      { t: "than", tone: "bg-amber-soft text-amber-ink" },
      { t: "주어 + 과거형", tone: "bg-coral-soft text-coral-ink" },
    ],
  },
];

/** 거의 동시에 일어난 두 일: 먼저 일어난 쪽은 had p.p., 뒤따른 쪽은 과거형 */
export function ScSoonerTimeline() {
  return (
    <div>
      <div className="relative grid grid-cols-2 gap-3 rounded-2xl border border-line px-4 pb-3 pt-4">
        <span className="absolute left-8 right-8 top-[26px] h-1 rounded-full bg-line" aria-hidden />
        <div className="relative flex flex-col items-center text-center">
          <span className="z-10 size-5 rounded-full border-4 border-card bg-sky-ink" aria-hidden />
          <span className="mt-1.5 text-[13.5px] font-extrabold text-sky-ink">① 먼저 · had p.p.</span>
          <span className="mt-1 text-[1.02em] font-medium">
            <En en="I {had|조동사:과거완료를 만드는 말} sat down" />
          </span>
          <span className="text-[13.5px] text-ink-2">내가 앉았다</span>
        </div>
        <div className="relative flex flex-col items-center text-center">
          <span className="z-10 size-5 rounded-full border-4 border-card bg-coral" aria-hidden />
          <span className="mt-1.5 text-[13.5px] font-extrabold text-coral-ink">② 바로 뒤 · 과거형</span>
          <span className="mt-1 text-[1.02em] font-medium">
            <En en="the phone rang" />
          </span>
          <span className="text-[13.5px] text-ink-2">전화가 울렸다</span>
        </div>
      </div>
      <ul className="mt-3 grid gap-2">
        {SOONER_ROWS.map((r) => (
          <li key={r.key} lang="en" className="flex flex-wrap items-center gap-1.5 text-[14px] font-bold">
            {r.parts.map((p, i) => (
              <span key={p.t} className="inline-flex items-center gap-1.5">
                {i === 2 && <span className="text-ink-3">~</span>}
                <span className={`rounded-lg px-2 py-1 ${p.tone}`}>{p.t}</span>
              </span>
            ))}
          </li>
        ))}
      </ul>
      <p className="mt-2 text-center text-[13.5px] font-bold text-ink-2">앞 절은 도치(had + 주어), 뒤 절은 보통 순서예요.</p>
    </div>
  );
}

/* ───────── 10. 되풀이 생략: 빈자리는 앞에서 가져와 채워요 ───────── */

const FILL_ROWS: { key: string; pre: { en: string }; ghost: { en: string }; post?: { en: string }; from: string }[] = [
  {
    key: "ordered",
    pre: { en: "Minsu ordered pizza, and Jisu" },
    ghost: { en: "ordered" },
    post: { en: "spaghetti." },
    from: "앞 절의 동사 ordered",
  },
  {
    key: "guitar",
    pre: { en: "I can play the guitar, but my brother can't" },
    ghost: { en: "play the guitar" },
    from: "앞 절의 play the guitar",
  },
  {
    key: "to",
    pre: { en: "You can come with us if you want to" },
    ghost: { en: "come with us" },
    from: "대부정사: to만 남기고 동사 부분을 빼요",
  },
];

/** 앞에 나온 말이 되풀이되면 빼고, 읽을 때는 빈자리를 앞 절에서 찾아 채운다 */
export function ScFillGap() {
  return (
    <ul className="grid gap-2">
      {FILL_ROWS.map((r) => (
        <li key={r.key} className="rounded-2xl border border-line px-4 py-2.5">
          <p className="flex flex-wrap items-center gap-1.5 text-[1.05em] font-medium">
            <En en={r.pre.en} />
            <span className="rounded-lg border-2 border-dashed border-coral/70 px-2 py-0.5 text-ink-3 italic">
              <En en={r.ghost.en} />
            </span>
            {r.post && <En en={r.post.en} />}
          </p>
          <p className="mt-1 flex items-center gap-1.5 text-[13.5px] font-bold text-coral-ink">
            <ArrowRight size={16} className="rotate-180" />
            빈자리 = {r.from}
          </p>
        </li>
      ))}
    </ul>
  );
}

/* ───────── 11. 동격: 같은 대상을 나란히, = 를 넣어 읽기 ───────── */

const SAME_ROWS: { kind: string; a: { en: string }; b: { en: string }; ko: string }[] = [
  { kind: "명사, 명사", a: { en: "my best friend," }, b: { en: "Jisu," }, ko: "내 가장 친한 친구 = 지수" },
  { kind: "명사 + that절", a: { en: "the fact" }, b: { en: "{that|접속사:(동격) ~라는} Minsu moved to Canada" }, ko: "그 사실 = 민수가 캐나다로 이사 갔다는 것" },
  { kind: "명사 + of", a: { en: "a dream" }, b: { en: "{of|전치사:(동격) ~라는} becoming a vet" }, ko: "꿈 = 수의사가 되는 것" },
];

/** 동격은 앞 명사와 뒤의 말이 같은 대상이다. 둘 사이에 = 를 넣어 읽는다 */
export function ScSameThing() {
  return (
    <ul className="grid gap-2">
      {SAME_ROWS.map((r) => (
        <li key={r.kind} className="rounded-2xl border border-line px-4 py-2.5">
          <p className="text-[13.5px] font-extrabold text-ink-3">{r.kind}</p>
          <p className="mt-1.5 flex flex-wrap items-center gap-2 text-[1.05em] font-medium">
            <span className="rounded-lg bg-amber-soft px-2.5 py-1 text-amber-ink">
              <En en={r.a.en} />
            </span>
            <span className="grid size-7 place-items-center rounded-full bg-ink text-[14.5px] font-extrabold text-on-ink" aria-label="같은 대상">
              =
            </span>
            <span className="rounded-lg bg-sky-soft px-2.5 py-1 text-sky-ink">
              <En en={r.b.en} />
            </span>
          </p>
          <p className="mt-1 text-[13.5px] text-ink-2">{r.ko}</p>
        </li>
      ))}
    </ul>
  );
}

/* ───────── 12. 병렬과 진짜 동사 개수 ───────── */

type ScKind = "verb" | "verbal" | "link" | "hidden" | "plain";
type ScBit = { en: string; k: ScKind; sub?: string };

const SC_LOOK: Record<Exclude<ScKind, "plain">, { box: string; label: string }> = {
  verb: { box: "bg-coral text-white", label: "text-coral-ink" },
  verbal: { box: "bg-sky-soft text-sky-ink", label: "text-sky-ink" },
  link: { box: "bg-amber-soft text-amber-ink", label: "text-amber-ink" },
  hidden: { box: "border-2 border-dashed border-ink-3 text-ink-3", label: "text-ink-3" },
};

function ScChip({ b }: { b: ScBit }) {
  if (b.k === "plain")
    return (
      <span className="self-start py-1">
        <En en={b.en} />
      </span>
    );
  const look = SC_LOOK[b.k];
  return (
    <span className="inline-flex flex-col items-center gap-1">
      <span className={`inline-flex items-center gap-1 rounded-lg px-2 py-1 font-bold ${look.box}`}>
        {b.k === "verb" && <CrownIcon size={15} />}
        {b.k === "verbal" && <MaskIcon size={16} />}
        <En en={b.en} />
      </span>
      {b.sub && <span className={`text-[13.5px] font-extrabold ${look.label}`}>{b.sub}</span>}
    </span>
  );
}

const PARALLEL_COUNTS: { key: string; title: string; bits: ScBit[]; count: string; plus: boolean }[] = [
  {
    key: "real",
    title: "진짜 동사끼리 이으면",
    bits: [
      { en: "She", k: "plain" },
      { en: "opened", k: "verb", sub: "동사 1" },
      { en: "the window", k: "plain" },
      { en: "and", k: "link", sub: "접속사" },
      { en: "(she)", k: "hidden", sub: "숨은 주어" },
      { en: "{turned on}", k: "verb", sub: "동사 2" },
      { en: "the {fan|명사:선풍기}.", k: "plain" },
    ],
    count: "and 1개 → 진짜 동사 2개. 둘 다 주어·시제에 맞춰 과거형",
    plus: true,
  },
  {
    key: "verbal",
    title: "준동사끼리 이으면",
    bits: [
      { en: "I", k: "plain" },
      { en: "like", k: "verb", sub: "동사 1" },
      { en: "reading", k: "verbal", sub: "동명사" },
      { en: "comics", k: "plain" },
      { en: "and", k: "link", sub: "접속사" },
      { en: "playing", k: "verbal", sub: "동명사" },
      { en: "badminton.", k: "plain" },
    ],
    count: "and가 동명사 둘을 이었을 뿐 → 진짜 동사는 like 1개 그대로",
    plus: false,
  },
];

/** and가 진짜 동사끼리 이으면 진짜 동사 +1, 준동사끼리 이으면 개수 그대로 */
export function ScParallelCount() {
  return (
    <div className="grid gap-2.5">
      {PARALLEL_COUNTS.map((r) => (
        <div key={r.key} className={`rounded-2xl px-4 py-3 ${r.plus ? "border-2 border-coral" : "border border-line"}`}>
          <p className="text-[14.5px] font-extrabold">{r.title}</p>
          <p className="mt-2 flex flex-wrap items-start gap-x-1.5 gap-y-2.5 text-[1.05em] font-medium">
            {r.bits.map((b, i) => (
              <ScChip key={i} b={b} />
            ))}
          </p>
          <p className={`mt-2 text-[13.5px] font-bold ${r.plus ? "text-coral-ink" : "text-sky-ink"}`}>{r.count}</p>
        </div>
      ))}
    </div>
  );
}

/* ───────── 13. 준부정어: 0은 아니지만 거의 0 ───────── */

const ZERO_SCALE: { label: string; sub: string; fill: number; words: string[]; strong: boolean }[] = [
  { label: "0", sub: "전혀 없다", fill: 0, words: ["no", "none", "never"], strong: false },
  { label: "거의 0", sub: "거의 ~않다 (준부정어)", fill: 12, words: ["hardly", "scarcely", "rarely", "seldom", "few", "little"], strong: true },
  { label: "조금", sub: "조금 있다", fill: 40, words: ["a few", "a little"], strong: false },
  { label: "많이", sub: "많다", fill: 90, words: ["many", "much"], strong: false },
];

/** 준부정어는 완전한 0은 아니지만 '거의 없다' 쪽이라 부정문으로 본다 */
export function ScAlmostZero() {
  return (
    <div>
      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {ZERO_SCALE.map((z) => (
          <li key={z.label} className={`flex flex-col rounded-2xl px-3 py-2.5 ${z.strong ? "border-2 border-coral" : "border border-line"}`}>
            <p className={`text-[15px] font-extrabold ${z.strong ? "text-coral-ink" : ""}`}>{z.label}</p>
            <p className="text-[13.5px] font-bold text-ink-2">{z.sub}</p>
            <div className="mt-2 h-3 rounded-full bg-chip" aria-hidden>
              <div className="h-3 rounded-full" style={{ width: `${z.fill}%`, background: z.strong ? "var(--coral)" : "var(--ink-3)" }} />
            </div>
            <p lang="en" className="mt-2 flex flex-wrap gap-1 text-[13.5px] font-bold">
              {z.words.map((w) => (
                <span key={w} className={`rounded-md px-1.5 py-0.5 ${z.strong ? "bg-coral-soft text-coral-ink" : "bg-chip"}`}>
                  {w}
                </span>
              ))}
            </p>
          </li>
        ))}
      </ul>
      <p className="mt-3 flex flex-wrap items-center justify-center gap-2 text-[14px] font-bold">
        <Mark ok={false} />
        <span lang="en" className="line-through decoration-coral decoration-2">
          can&apos;t hardly
        </span>
        <span className="text-ink-2">준부정어에는 not을 또 붙이지 않아요</span>
      </p>
    </div>
  );
}
