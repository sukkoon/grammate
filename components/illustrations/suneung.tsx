import type { ReactNode } from "react";
import { En } from "@/components/lesson/En";
import { ArrowRight, CrownIcon } from "./icons";

/* 수능 어법 종합 그림: 주어 괄호 치기, 수일치 규칙, 대명사 짝 찾기, 태 판단, 수동이 안 되는 동사, 목적격보어 표, 완전·불완전, 헷갈리는 짝,
   관계절 동사와 선행사, 자리 × 태 네 칸 */

/* ───────── 공통 도우미 ───────── */

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

function Card({ title, tone, children }: { title: string; tone: string; children: ReactNode }) {
  return (
    <li className="flex flex-col rounded-2xl border border-line">
      <p className={`rounded-t-2xl px-4 py-2 text-[14.5px] font-extrabold ${tone}`}>{title}</p>
      <div className="grid gap-1.5 px-4 py-3 text-[14px]">{children}</div>
    </li>
  );
}

/* ───────── 1. 주어에 괄호 치기 ───────── */

type Seg = { t: string; k: "core" | "verb" | "mod" | "rest" };

const BRACKET_ROWS: Seg[][] = [
  [
    { t: "The boxes", k: "core" },
    { t: "(on the top shelf)", k: "mod" },
    { t: "are", k: "verb" },
    { t: "heavy.", k: "rest" },
  ],
  [
    { t: "The girl", k: "core" },
    { t: "(with two dogs)", k: "mod" },
    { t: "lives", k: "verb" },
    { t: "next door.", k: "rest" },
  ],
  [
    { t: "The number", k: "core" },
    { t: "(of students who ride bikes)", k: "mod" },
    { t: "has", k: "verb" },
    { t: "grown.", k: "rest" },
  ],
];

const SEG_STYLE: Record<Seg["k"], string> = {
  core: "bg-coral-soft text-coral-ink font-extrabold",
  verb: "bg-coral text-white font-extrabold",
  mod: "border border-dashed border-ink-3 text-ink-3",
  rest: "",
};

/** 주어를 꾸미는 말에 괄호를 치면, 남은 핵심 명사와 진짜 동사가 짝이 돼요 */
export function SnSubjectBracket() {
  return (
    <div>
      <ul className="grid gap-2">
        {BRACKET_ROWS.map((row) => (
          <li key={row[0].t} className="flex flex-wrap items-center gap-1.5 rounded-2xl border border-line px-3 py-2.5 text-[1.05em]" lang="en">
            {row.map((s) => (
              <span key={s.t} className={`inline-flex items-center gap-1 rounded-lg px-2 py-1 ${SEG_STYLE[s.k]}`}>
                {s.k === "verb" && <CrownIcon size={14} />}
                {s.t}
              </span>
            ))}
          </li>
        ))}
      </ul>
      <p className="mt-3 flex flex-wrap items-center justify-center gap-2 text-[14px] font-bold">
        <span className="rounded-lg border border-dashed border-ink-3 px-2 py-1 text-ink-3">( 꾸미는 말 )</span>
        <span>은 지우고</span>
        <span className="rounded-lg bg-coral-soft px-2 py-1 text-coral-ink">핵심 명사</span>
        <span aria-hidden>↔</span>
        <span className="rounded-lg bg-coral px-2 py-1 text-white">진짜 동사</span>
        <span>의 수를 맞춰요</span>
      </p>
    </div>
  );
}

/* ───────── 2. 수일치 규칙 모음 ───────── */

const RULES: { title: string; rule: string; en: string }[] = [
  { title: "부분 표현", rule: "most / half / some / all of + 명사 → 그 명사에 맞춰요", en: "Most of the water [[is]] gone. / Most of the students [[are]] here." },
  { title: "the number vs a number", rule: "the number of (그 수) → 단수, a number of (많은) → 복수", en: "The number of cars [[is]] huge. / A number of cars [[are]] parked." },
  { title: "one of + 복수 명사", rule: "주어는 one이라 단수 동사", en: "One of my friends [[lives]] in Busan." },
  { title: "each, every", rule: "뒤에 명사가 둘이어도 단수", en: "Every boy and girl [[has]] a locker." },
  { title: "덩어리 주어", rule: "동명사, to부정사, 명사절 주어 → 단수", en: "{What|관계대명사:~하는 것} you need [[is]] more sleep." },
  { title: "주어가 뒤에 있을 때", rule: "There is/are, 도치 문장 → 동사 뒤의 주어에 맞춰요", en: "On the desk [[were]] two old books." },
];

/** 수능에 자주 나오는 수일치 규칙 여섯 가지 */
export function SnAgreementRules() {
  return (
    <ul className="grid gap-2.5 sm:grid-cols-2">
      {RULES.map((r) => (
        <Card key={r.title} title={r.title} tone="bg-sky-soft text-sky-ink">
          <p className="font-bold">{r.rule}</p>
          <p className="text-[1.03em] font-medium">
            <En en={r.en} />
          </p>
        </Card>
      ))}
    </ul>
  );
}

/* ───────── 3. 대명사의 짝 찾기 ───────── */

const PRONOUNS: { title: string; en: string; ok: boolean; why: string }[] = [
  { title: "단수·복수", en: "The company changed [[its]] logo.", ok: true, why: "company는 단수 → its (their ✕)" },
  { title: "that / those", en: "The ears of a rabbit are longer than [[those]] of a cat.", ok: true, why: "비교하는 ears가 복수 → those" },
  { title: "재귀대명사", en: "She looked at [[herself]] in the mirror.", ok: true, why: "주어와 목적어가 같은 사람 → herself" },
  { title: "one / it", en: "I lost my umbrella, so I bought a new [[one]].", ok: true, why: "같은 종류의 다른 것 → one (그 우산 자체면 it)" },
];

/** 대명사는 가리키는 명사를 찾아 수와 모양을 맞춰요 */
export function SnPronounMatch() {
  return (
    <ul className="grid gap-2.5 sm:grid-cols-2">
      {PRONOUNS.map((p) => (
        <li key={p.title} className="rounded-2xl border border-line px-4 py-3">
          <p className="flex items-center gap-2 text-[14.5px] font-extrabold">
            <Mark ok={p.ok} />
            {p.title}
          </p>
          <p className="mt-1.5 text-[1.03em] font-medium">
            <En en={p.en} />
          </p>
          <p className="text-[13.5px] text-ink-2">{p.why}</p>
        </li>
      ))}
    </ul>
  );
}

/* ───────── 4. 능동일까 수동일까: 진짜 동사의 태 ───────── */

/** 주어가 그 동작을 하는지 당하는지, 목적어가 있는지로 태를 정해요 */
export function SnVoiceCheck() {
  return (
    <div className="grid gap-2.5">
      <div className="rounded-2xl border border-line px-4 py-3">
        <p className="text-[14.5px] font-extrabold">① 주어가 그 동작을 하나요, 당하나요?</p>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          <div className="rounded-xl bg-mint-soft px-3 py-2">
            <p className="text-[13.5px] font-extrabold text-mint-ink">한다 → 능동</p>
            <p className="text-[1.02em] font-medium">
              <En en="My uncle [[built]] this house." />
            </p>
          </div>
          <div className="rounded-xl bg-amber-soft px-3 py-2">
            <p className="text-[13.5px] font-extrabold text-amber-ink">당한다 → be + p.p.</p>
            <p className="text-[1.02em] font-medium">
              <En en="This house [[was built]] in 1990." />
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 text-[13.5px] font-bold text-ink-2">
        <ArrowRight className="rotate-90 text-coral" />
        헷갈리면 뒤를 봐요
      </div>
      <div className="rounded-2xl border border-line px-4 py-3">
        <p className="text-[14.5px] font-extrabold">② 타동사 뒤에 목적어가 있나요?</p>
        <ul className="mt-2 grid gap-1.5 text-[14px]">
          <li className="flex items-start gap-2">
            <Mark ok />
            <span>
              목적어가 <b>있으면</b> 대개 능동: <span lang="en" className="font-bold">They <u>cleaned</u> the room.</span>
            </span>
          </li>
          <li className="flex items-start gap-2">
            <Mark ok />
            <span>
              목적어가 <b>없으면</b> 수동을 의심: <span lang="en" className="font-bold">The room <u>was cleaned</u>.</span>
            </span>
          </li>
        </ul>
        <p className="mt-2 text-[13.5px] text-ink-3">예외: 4형식·5형식 수동은 뒤에 말이 남아요 (was given a prize, is called Coco).</p>
      </div>
    </div>
  );
}

/* ───────── 5. 수동태가 안 되는 동사 ───────── */

const NO_PASSIVE: { en: string; ko: string }[] = [
  { en: "happen", ko: "일어나다" },
  { en: "occur", ko: "일어나다, 떠오르다" },
  { en: "appear", ko: "나타나다" },
  { en: "disappear", ko: "사라지다" },
  { en: "remain", ko: "남아 있다" },
  { en: "arise", ko: "생기다" },
  { en: "exist", ko: "존재하다" },
  { en: "consist of", ko: "~로 이루어지다" },
  { en: "belong to", ko: "~에 속하다" },
  { en: "result in", ko: "~을 낳다" },
];

/** 목적어를 갖지 않는 동사는 수동태로 쓰지 않아요 */
export function SnNoPassive() {
  return (
    <div>
      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-5">
        {NO_PASSIVE.map((v) => (
          <li key={v.en} className="rounded-xl border border-line px-3 py-2 text-center">
            <p lang="en" className="font-extrabold">
              {v.en}
            </p>
            <p className="text-[13.5px] text-ink-2">{v.ko}</p>
          </li>
        ))}
      </ul>
      <p className="mt-3 flex flex-wrap items-center justify-center gap-2 text-[14px]">
        <Mark ok={false} />
        <span lang="en" className="font-bold line-through decoration-coral">
          The accident was happened last night.
        </span>
        <Mark ok />
        <span lang="en" className="font-bold">
          The accident happened last night.
        </span>
      </p>
    </div>
  );
}

/* ───────── 6. 목적격보어 모양 표 ───────── */

const COMPLEMENTS: { verbs: string; form: string; en: string }[] = [
  { verbs: "make, have, let (사역)", form: "동사원형", en: "Mom made me [[clean]] my room." },
  { verbs: "want, ask, tell, get, allow", form: "to부정사", en: "I got my brother [[to help]] me." },
  { verbs: "see, watch, hear (지각)", form: "동사원형 / -ing", en: "I heard someone [[knock]] on the door." },
  { verbs: "help", form: "(to) 동사원형", en: "He helped me [[carry]] the boxes." },
  { verbs: "목적어가 당하면", form: "과거분사 p.p.", en: "I had my bike [[fixed]] yesterday." },
];

/** 목적격보어는 앞의 진짜 동사와, 목적어와의 관계가 정해요 */
export function SnComplementTable() {
  return (
    <ul className="grid gap-2">
      {COMPLEMENTS.map((c) => (
        <li key={c.verbs} className="grid gap-1 rounded-2xl border border-line px-4 py-2.5 sm:grid-cols-[12rem_7.5rem_1fr] sm:items-center sm:gap-3">
          <p lang="en" className="font-extrabold">
            {c.verbs}
          </p>
          <p>
            <span className="rounded-lg bg-coral-soft px-2 py-0.5 text-[13.5px] font-extrabold text-coral-ink">{c.form}</span>
          </p>
          <p className="text-[1.02em] font-medium">
            <En en={c.en} />
          </p>
        </li>
      ))}
    </ul>
  );
}

/* ───────── 7. 뒤가 완전할까, 불완전할까 ───────── */

const COMPLETE_ROWS: { en: string; ko: string; full: boolean }[] = [
  { en: "I know (that) he likes pizza.", ko: "he likes pizza: 주어·목적어 다 있어요", full: true },
  { en: "This is the pizza (which) he likes.", ko: "he likes ___: likes의 목적어가 비었어요", full: false },
  { en: "This is the place (where) we met.", ko: "we met: 빠진 성분이 없어요", full: true },
  { en: "(What) he likes is pizza.", ko: "he likes ___: 목적어가 비었어요", full: false },
];

/** 관계사·접속사 뒤의 절에 빠진 성분이 있는지 세어 봐요 */
export function SnCompleteCheck() {
  return (
    <div>
      <ul className="grid gap-2">
        {COMPLETE_ROWS.map((r) => (
          <li key={r.en} className="flex items-start gap-3 rounded-2xl border border-line px-4 py-2.5">
            <span
              className={`mt-0.5 shrink-0 rounded-lg px-2 py-0.5 text-[13.5px] font-extrabold ${
                r.full ? "bg-mint-soft text-mint-ink" : "bg-amber-soft text-amber-ink"
              }`}
            >
              {r.full ? "완전" : "불완전"}
            </span>
            <span className="min-w-0">
              <span lang="en" className="block font-bold">
                {r.en}
              </span>
              <span className="text-[13.5px] text-ink-2">{r.ko}</span>
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-3 rounded-2xl bg-chip px-4 py-3 text-[14px]">
        <b>불완전</b> → 관계대명사(which, who, that) 또는 what · <b>완전</b> → 접속사 that 또는 관계부사(where, when, why)
      </p>
    </div>
  );
}

/* ───────── 8. 헷갈리는 짝, 한 번에 가르기 ───────── */

const PAIRS: { a: string; b: string; test: string }[] = [
  { a: "that", b: "what", test: "앞에 선행사(명사)가 있으면 that, 없으면 what" },
  { a: "which", b: "where", test: "뒤가 불완전하면 which, 완전하면 where" },
  { a: "형용사", b: "부사", test: "보어 자리(be, look, keep ~)면 형용사, 동사·형용사를 꾸미면 부사" },
  { a: "because of, during, despite", b: "because, while, although", test: "뒤에 명사(구)면 전치사, 주어 + 동사면 접속사" },
];

/** 수능 어법의 단골 짝과 가르는 기준 */
export function SnWhichWord() {
  return (
    <ul className="grid gap-2.5">
      {PAIRS.map((p) => (
        <li key={p.a} className="rounded-2xl border border-line px-4 py-3">
          <p className="flex flex-wrap items-center gap-2" lang="en">
            <span className="rounded-lg bg-sky-soft px-2.5 py-1 font-extrabold text-sky-ink">{p.a}</span>
            <span className="text-ink-3">vs</span>
            <span className="rounded-lg bg-coral-soft px-2.5 py-1 font-extrabold text-coral-ink">{p.b}</span>
          </p>
          <p className="mt-1.5 text-[14px] font-bold">{p.test}</p>
        </li>
      ))}
    </ul>
  );
}

/* ───────── 9. 관계절 속 동사는 선행사를 가리켜요 ───────── */

type WpBit = { en: string; k: "ante" | "rel" | "verb" | "plain" | "decoy" };

const WP_LOOK: Record<WpBit["k"], string> = {
  ante: "bg-amber-soft text-amber-ink font-bold",
  rel: "bg-sky-soft text-sky-ink font-bold",
  verb: "bg-coral text-white font-bold",
  decoy: "border border-dashed border-ink-3 text-ink-3",
  plain: "",
};

const WHO_POINTS: { key: string; bits: WpBit[]; rule: string; tricky?: boolean }[] = [
  {
    key: "friend",
    bits: [
      { en: "I have", k: "plain" },
      { en: "a friend", k: "ante" },
      { en: "{who|관계대명사:~하는 (사람)}", k: "rel" },
      { en: "speaks", k: "verb" },
      { en: "three languages.", k: "plain" },
    ],
    rule: "who = a friend (단수) → speaks",
  },
  {
    key: "shoes",
    bits: [
      { en: "These are", k: "plain" },
      { en: "the shoes", k: "ante" },
      { en: "{that|관계대명사:~하는}", k: "rel" },
      { en: "were", k: "verb" },
      { en: "{on sale}.", k: "plain" },
    ],
    rule: "that = the shoes (복수) → were",
  },
  {
    key: "one",
    bits: [
      { en: "She is", k: "plain" },
      { en: "one", k: "decoy" },
      { en: "of", k: "plain" },
      { en: "the students", k: "ante" },
      { en: "{who|관계대명사:~하는 (사람)}", k: "rel" },
      { en: "help", k: "verb" },
      { en: "the teacher.", k: "plain" },
    ],
    rule: "who = 바로 앞 the students (복수) → help. one에 맞추지 않아요",
    tricky: true,
  },
];

/** 주격 관계대명사 뒤의 동사는 관계대명사가 가리키는 선행사의 수에 맞춘다 */
export function SnWhoPoints() {
  return (
    <div>
      <ul className="grid gap-2">
        {WHO_POINTS.map((r) => (
          <li key={r.key} className={`rounded-2xl px-4 py-2.5 ${r.tricky ? "border-2 border-coral" : "border border-line"}`}>
            <p className="flex flex-wrap items-center gap-1.5 text-[1.05em] font-medium">
              {r.bits.map((b, i) =>
                b.k === "plain" ? (
                  <span key={i}>
                    <En en={b.en} />
                  </span>
                ) : (
                  <span key={i} className={`inline-flex items-center gap-1 rounded-lg px-2 py-0.5 ${WP_LOOK[b.k]}`}>
                    {b.k === "verb" && <CrownIcon size={14} />}
                    <En en={b.en} />
                  </span>
                ),
              )}
            </p>
            <p className={`mt-1 text-[13.5px] font-bold ${r.tricky ? "text-coral-ink" : "text-ink-2"}`}>{r.rule}</p>
          </li>
        ))}
      </ul>
      <p className="mt-3 flex flex-wrap items-center justify-center gap-2 text-[13.5px] font-bold">
        <span className="rounded-md bg-amber-soft px-2 py-0.5 text-amber-ink">선행사</span>
        <ArrowRight size={16} className="rotate-180 text-ink-3" />
        <span className="rounded-md bg-sky-soft px-2 py-0.5 text-sky-ink">관계대명사</span>
        <ArrowRight size={16} className="text-ink-3" />
        <span className="rounded-md bg-coral px-2 py-0.5 text-white">관계절 동사</span>
        <span className="text-ink-2">: 선행사의 수를 그대로 받아요</span>
      </p>
    </div>
  );
}

/* ───────── 10. 자리 × 태: 네 칸 중 어디일까 ───────── */

const FOUR_ROWS: { place: string; when: string; active: { form: string; en: string }; passive: { form: string; en: string } }[] = [
  {
    place: "진짜 동사",
    when: "자리가 남았을 때",
    active: { form: "동사 (시제·수 맞추기)", en: "My uncle [[built]] it." },
    passive: { form: "be + p.p.", en: "It [[was built]] in 1990." },
  },
  {
    place: "준동사",
    when: "자리가 다 찼을 때",
    active: { form: "-ing · to 동사원형", en: "the man [[standing]] at the gate" },
    passive: { form: "p.p. · to be p.p. · being p.p.", en: "a letter [[hidden]] under the book" },
  },
];

function FourRow({ r }: { r: (typeof FOUR_ROWS)[number] }) {
  return (
    <>
      <span className="grid place-items-center rounded-xl border-2 border-coral px-1.5 py-2">
        <span className="text-[14.5px] font-extrabold text-coral-ink">{r.place}</span>
        <span className="text-[13.5px] font-bold text-ink-3">{r.when}</span>
      </span>
      {[r.active, r.passive].map((c) => (
        <span key={c.form} className="flex flex-col items-center justify-center gap-1 rounded-xl border border-line px-1.5 py-2">
          <span className="text-[13.5px] font-extrabold">
            {c.form}
          </span>
          <span className="text-[14px] font-medium">
            <En en={c.en} />
          </span>
        </span>
      ))}
    </>
  );
}

/** 밑줄 친 동사는 ① 자리(진짜 동사/준동사) ② 태(능동/수동)로 네 칸 중 하나에 들어간다 */
export function SnFourBoxes() {
  return (
    <div>
      <div className="grid grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)_minmax(0,1fr)] gap-1.5 text-center">
        <span className="grid place-items-center rounded-xl bg-chip px-1.5 py-2 text-[13.5px] font-extrabold text-ink-2">
          ① 자리
          <br />② 태
        </span>
        <span className="grid place-items-center rounded-xl bg-mint-soft px-1.5 py-2 text-[14px] font-extrabold text-mint-ink">
          능동
          <span className="block text-[13.5px] font-bold">하는 쪽</span>
        </span>
        <span className="grid place-items-center rounded-xl bg-amber-soft px-1.5 py-2 text-[14px] font-extrabold text-amber-ink">
          수동
          <span className="block text-[13.5px] font-bold">당하는 쪽</span>
        </span>
        {FOUR_ROWS.map((r) => (
          <FourRow key={r.place} r={r} />
        ))}
      </div>
      <p className="mt-3 text-center text-[13.5px] font-bold text-ink-2">
        자리는 접속사·관계사 개수 + 1로, 태는 &lsquo;하나, 당하나&rsquo;와 목적어로 정해요.
      </p>
    </div>
  );
}
