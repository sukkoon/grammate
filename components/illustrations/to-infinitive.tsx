import type { ReactNode } from "react";
import { En } from "@/components/lesson/En";
import { ArrowRight, CrownIcon, MaskIcon } from "./icons";

/* to부정사 장 그림: 세 가지 일, 가주어 it, 명사 뒤 꼬리표, 부사 쓰임, too·enough, 의문사 + to, for·of, 시제 */

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

/* ───────── 1. to부정사의 세 가지 일 ───────── */

const JOBS: { job: string; tone: Tone; q: string; ko: string; en: string; enKo: string; note: string }[] = [
  {
    job: "명사처럼",
    tone: "sky",
    q: "무엇을? 무엇이?",
    ko: "~하는 것, ~하기",
    en: "I want [[to eat]] pizza.",
    enKo: "나는 피자 먹는 것을 원해.",
    note: "want의 목적어 자리",
  },
  {
    job: "형용사처럼",
    tone: "mint",
    q: "어떤 명사?",
    ko: "~할, ~하는",
    en: "I need something [[to eat]].",
    enKo: "나는 먹을 무언가가 필요해.",
    note: "something을 뒤에서 꾸며요",
  },
  {
    job: "부사처럼",
    tone: "amber",
    q: "왜? 어째서?",
    ko: "~하기 위해, ~해서",
    en: "I went to the kitchen [[to eat]] pizza.",
    enKo: "나는 피자를 먹으려고 부엌에 갔어.",
    note: "went에 이유를 더해요",
  },
];

/** to eat 하나가 문장 속 자리에 따라 명사·형용사·부사 일을 한다 */
export function TiThreeJobs() {
  return (
    <div>
      <p className="flex flex-wrap items-center justify-center gap-2 text-[1.15em]">
        <MaskIcon size={26} className="text-coral" />
        <Chip className="border border-line">to</Chip>
        <span aria-hidden>+</span>
        <Chip className="bg-coral text-white">동사원형</Chip>
        <span className="text-[14.5px] font-bold text-ink-2">= 변장한 동사 하나, 일은 세 가지</span>
      </p>
      <ul className="mt-4 grid gap-2.5 sm:grid-cols-3">
        {JOBS.map((j) => (
          <li key={j.job} className="flex flex-col rounded-2xl border border-line">
            <div className={`rounded-t-2xl px-4 py-2.5 ${TONE[j.tone]}`}>
              <p className="text-[15px] font-extrabold">{j.job}</p>
              <p className="text-[13.5px] font-bold">
                {j.q} · {j.ko}
              </p>
            </div>
            <div className="px-4 py-3">
              <p className="text-[1.05em] font-medium">
                <En en={j.en} />
              </p>
              <p className="text-[13.5px] text-ink-2">{j.enKo}</p>
              <p className="mt-1.5 text-[13.5px] font-bold text-ink-3">{j.note}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ───────── 2. 가주어 it: 무거운 머리는 뒤로 ───────── */

/** 긴 to부정사 주어를 뒤로 보내고 it이 자리를 채운다 */
export function TiItMove() {
  return (
    <div className="mx-auto grid max-w-xl gap-3">
      <div className="rounded-2xl border border-line px-4 py-3">
        <p className="text-[13.5px] font-extrabold text-ink-3">머리가 무거운 문장</p>
        <p className="mt-2 flex flex-wrap items-center gap-2 text-[1.08em]">
          <Chip className="bg-coral-soft text-coral-ink">
            <En en="To learn a new language" />
          </Chip>
          <Chip className="border border-line">
            <En en="is" />
          </Chip>
          <Chip className="border border-line">
            <En en="fun." />
          </Chip>
        </p>
        <p className="mt-1.5 text-[13.5px] text-ink-2">주어가 길어서 진짜 동사 is가 한참 뒤에 나와요.</p>
      </div>
      <div className="flex items-center justify-center gap-2 text-[13.5px] font-bold text-ink-2">
        <ArrowRight className="rotate-90 text-coral" />
        긴 주어는 뒤로, 빈자리에는 it
      </div>
      <div className="rounded-2xl border-2 border-coral px-4 py-3">
        <p className="text-[13.5px] font-extrabold text-coral-ink">가볍게 시작하는 문장</p>
        <p className="mt-2 flex flex-wrap items-center gap-2 text-[1.08em]">
          <Chip className="border-2 border-dashed border-ink-3">
            <En en="{It|대명사:가주어 (뜻 없이 자리만 채워요)}" />
          </Chip>
          <Chip className="border border-line">
            <En en="is" />
          </Chip>
          <Chip className="border border-line">
            <En en="fun" />
          </Chip>
          <Chip className="bg-coral-soft text-coral-ink">
            <En en="to learn a new language." />
          </Chip>
        </p>
        <div className="mt-2 grid gap-1.5 text-[13.5px] sm:grid-cols-2">
          <p>
            <span className="font-extrabold">It</span> = 가주어. &lsquo;그것&rsquo;이라고 해석하지 않아요.
          </p>
          <p>
            <span className="font-extrabold text-coral-ink">to learn …</span> = 진주어. 이걸 주어로 해석해요.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ───────── 3. 명사 뒤에 붙는 꼬리표 ───────── */

const TAGS: { from: string; en: string; ko: string; prep?: string }[] = [
  { from: "drink something", en: "something [[to drink]]", ko: "마실 무언가" },
  { from: "do homework", en: "homework [[to do]]", ko: "해야 할 숙제" },
  { from: "sit on a chair", en: "a chair [[to sit on]]", ko: "앉을 의자", prep: "on" },
  { from: "talk with a friend", en: "a friend [[to talk with]]", ko: "이야기할 친구", prep: "with" },
  { from: "write with a pen", en: "a pen [[to write with]]", ko: "쓸 펜 (그것으로 쓴다)", prep: "with" },
  { from: "live in a house", en: "a house [[to live in]]", ko: "살 집", prep: "in" },
];

/** 형용사처럼 쓰인 to부정사는 명사 뒤에 꼬리표처럼 붙는다. 원래 필요한 전치사는 끝에 남는다 */
export function TiNounTag() {
  return (
    <div>
      <p className="flex flex-wrap items-center justify-center gap-2 text-[1.1em]">
        <Chip className="bg-chip">명사</Chip>
        <span aria-hidden>+</span>
        <Chip className="bg-mint-soft text-mint-ink">to부정사 꼬리표</Chip>
        <span className="text-[14.5px] font-bold text-ink-2">= &lsquo;~할 명사&rsquo;</span>
      </p>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {TAGS.map((t) => (
          <li key={t.en} className="rounded-2xl border border-line px-4 py-2.5">
            <p className="flex flex-wrap items-center gap-x-2 text-[14px] text-ink-2">
              <span>원래:</span>
              <span lang="en" className="font-bold">
                {t.from}
              </span>
            </p>
            <p className="mt-1 flex flex-wrap items-center gap-2 text-[1.08em] font-medium">
              <En en={t.en} />
              {t.prep && <span className="rounded-md bg-coral-soft px-1.5 text-[13.5px] font-extrabold text-coral-ink">{t.prep} 남아요</span>}
            </p>
            <p className="text-[13.5px] text-ink-2">{t.ko}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ───────── 4. 부사처럼 쓰인 to부정사: 무엇을 더해 주나 ───────── */

const ADVERB_USES: { use: string; q: string; ko: string; hint: string; en: string; enKo: string }[] = [
  {
    use: "목적",
    q: "왜 했어?",
    ko: "~하기 위해, ~하려고",
    hint: "동작 뒤에. in order to로 바꿀 수 있어요",
    en: "She {got up} early [[to catch]] the first bus.",
    enKo: "그녀는 첫 버스를 타려고 일찍 일어났어.",
  },
  {
    use: "감정의 원인",
    q: "왜 그런 기분이야?",
    ko: "~해서, ~하게 되어",
    hint: "glad, happy, sad, sorry, surprised 뒤",
    en: "I was happy [[to see]] my grandma.",
    enKo: "할머니를 뵈어서 기뻤어.",
  },
  {
    use: "판단의 근거",
    q: "왜 그렇게 생각해?",
    ko: "~하다니, ~하는 걸 보니",
    hint: "must be, 칭찬·비난하는 말 뒤",
    en: "He must be tired [[to {fall asleep}]] in class.",
    enKo: "수업 중에 잠든 걸 보니 그는 피곤한 게 틀림없어.",
  },
  {
    use: "결과",
    q: "그래서 결국?",
    ko: "(그 결과) ~하게 되다",
    hint: "grow up, live, wake up 뒤. only to, never to",
    en: "The boy {grew up} [[to be]] a famous chef.",
    enKo: "그 소년은 자라서 유명한 요리사가 되었어.",
  },
  {
    use: "형용사 꾸미기",
    q: "어떤 점에서?",
    ko: "~하기에",
    hint: "easy, hard, difficult, safe 뒤",
    en: "This book is easy [[to read]].",
    enKo: "이 책은 읽기 쉬워.",
  },
];

/** 부사처럼 쓰인 to부정사의 다섯 가지 뜻과 알아보는 질문 */
export function TiAdverbUses() {
  return (
    <ul className="grid gap-2.5 sm:grid-cols-2">
      {ADVERB_USES.map((u, i) => (
        <li key={u.use} className={`rounded-2xl border border-line px-4 py-3 ${i === 0 ? "sm:col-span-2" : ""}`}>
          <div className="flex flex-wrap items-center gap-2">
            <Chip className="bg-amber-soft text-[14.5px] text-amber-ink">{u.use}</Chip>
            <span className="text-[14.5px] font-extrabold">{u.ko}</span>
            <span className="text-[13.5px] font-bold text-ink-3">&ldquo;{u.q}&rdquo;</span>
          </div>
          <p className="mt-1.5 text-[1.05em] font-medium">
            <En en={u.en} />
          </p>
          <p className="text-[13.5px] text-ink-2">{u.enKo}</p>
          <p className="mt-1 text-[13.5px] font-bold text-ink-3">{u.hint}</p>
        </li>
      ))}
    </ul>
  );
}

/* ───────── 5. too ~ to와 enough to ───────── */

function Gauge({ fill, over }: { fill: number; over: boolean }) {
  return (
    <div className="relative mt-2 h-4 rounded-full bg-chip" aria-hidden>
      <div
        className="h-4 rounded-full"
        style={{ width: `${fill}%`, background: over ? "var(--coral)" : "var(--mint-ink)" }}
      />
      <div className="absolute -top-1.5 h-7 border-l-2 border-dashed border-ink" style={{ left: "70%" }} />
    </div>
  );
}

/** too는 선을 넘어 '못 한다', enough는 선에 닿아 '할 수 있다' */
export function TiTooEnough() {
  return (
    <div>
      <div className="grid gap-2.5 sm:grid-cols-2">
        <div className="rounded-2xl border border-line px-4 py-3">
          <p className="flex items-center gap-2">
            <Mark ok={false} />
            <span className="text-[15px] font-extrabold text-coral-ink">too + 형용사 + to</span>
          </p>
          <Gauge fill={94} over />
          <p className="mt-1 text-[13.5px] font-bold text-ink-2">무거움이 &lsquo;들 수 있는 선&rsquo;을 넘었어요</p>
          <p className="mt-2 text-[1.06em] font-medium">
            <En en="The box is [[too heavy to lift]]." />
          </p>
          <p className="text-[13.5px] text-ink-2">상자가 너무 무거워서 들 수 없어.</p>
          <p className="mt-1.5 text-[13.5px] font-bold">
            = so heavy that I <span className="text-coral-ink">can&apos;t</span> lift it
          </p>
        </div>
        <div className="rounded-2xl border border-line px-4 py-3">
          <p className="flex items-center gap-2">
            <Mark ok />
            <span className="text-[15px] font-extrabold text-mint-ink">형용사 + enough + to</span>
          </p>
          <Gauge fill={72} over={false} />
          <p className="mt-1 text-[13.5px] font-bold text-ink-2">힘이 &lsquo;들 수 있는 선&rsquo;에 닿았어요</p>
          <p className="mt-2 text-[1.06em] font-medium">
            <En en="Minho is [[strong enough to lift]] the box." />
          </p>
          <p className="text-[13.5px] text-ink-2">민호는 그 상자를 들 만큼 힘이 세.</p>
          <p className="mt-1.5 text-[13.5px] font-bold">
            = so strong that he <span className="text-mint-ink">can</span> lift the box
          </p>
        </div>
      </div>
      <p className="mt-3 flex flex-wrap items-center justify-center gap-2 text-[14px] font-bold">
        <span>자리 주의:</span>
        <Chip className="bg-mint-soft text-mint-ink">old enough</Chip>
        <span className="text-ink-3">enough old ✕</span>
        <span aria-hidden>·</span>
        <Chip className="bg-mint-soft text-mint-ink">enough money</Chip>
        <span className="text-ink-3">명사 앞은 OK</span>
      </p>
    </div>
  );
}

/* ───────── 6. 의문사 + to부정사 ───────── */

const WH_TO: { en: string; ko: string }[] = [
  { en: "what to do", ko: "무엇을 할지" },
  { en: "how to swim", ko: "어떻게 수영할지 = 수영하는 방법" },
  { en: "where to go", ko: "어디로 갈지" },
  { en: "when to start", ko: "언제 시작할지" },
  { en: "which to choose", ko: "어느 것을 고를지" },
  { en: "who to invite", ko: "누구를 초대할지" },
];

/** 의문사 + to부정사 = 의문사 + 주어 + should + 동사원형 */
export function TiWhTo() {
  return (
    <div>
      <ul className="grid grid-cols-1 gap-2 min-[420px]:grid-cols-2 sm:grid-cols-3">
        {WH_TO.map((w) => (
          <li key={w.en} className="rounded-2xl border border-line px-3.5 py-2.5">
            <p className="text-[1.08em] font-bold">
              <En en={`[[${w.en}]]`} />
            </p>
            <p className="text-[13.5px] text-ink-2">{w.ko}</p>
          </li>
        ))}
      </ul>
      <p className="mt-3 flex flex-wrap items-center justify-center gap-2 text-[14px] font-bold">
        <Chip className="bg-sky-soft text-sky-ink">의문사 + to부정사</Chip>
        <span aria-hidden>=</span>
        <Chip className="border border-line">의문사 + 주어 + should + 동사원형</Chip>
      </p>
      <p className="mt-2 text-center text-[13.5px] text-ink-2">
        <span lang="en" className="font-bold">
          why to
        </span>
        는 쓰지 않아요.
      </p>
    </div>
  );
}

/* ───────── 7. 의미상 주어: for일까 of일까 ───────── */

const FOR_WORDS = ["easy", "hard", "important", "necessary", "dangerous", "possible"];
const OF_WORDS = ["kind", "nice", "wise", "careless", "polite", "rude", "brave", "silly"];

/** 일에 대한 판단이면 for, 사람의 성격을 말하면 of */
export function TiForOf() {
  return (
    <div>
      <div className="grid gap-2.5 sm:grid-cols-2">
        <div className="rounded-2xl border border-line px-4 py-3">
          <p className="flex flex-wrap items-center gap-2">
            <Chip className="bg-sky-soft text-[1.05em] text-sky-ink">for + 사람</Chip>
            <span className="text-[14.5px] font-extrabold">그 일이 어떤지</span>
          </p>
          <p lang="en" className="mt-2 flex flex-wrap gap-1.5 text-[14px]">
            {FOR_WORDS.map((w) => (
              <span key={w} className="rounded-md bg-chip px-2 py-0.5">
                {w}
              </span>
            ))}
          </p>
          <p className="mt-2 text-[1.04em] font-medium">
            <En en="It is hard [[{for|전치사:(to부정사의 주어) ~가} me]] to wake up early." />
          </p>
          <p className="text-[13.5px] text-ink-2">내가 일찍 일어나는 것은 어려워.</p>
        </div>
        <div className="rounded-2xl border-2 border-coral px-4 py-3">
          <p className="flex flex-wrap items-center gap-2">
            <Chip className="bg-coral-soft text-[1.05em] text-coral-ink">of + 사람</Chip>
            <span className="text-[14.5px] font-extrabold">그 사람이 어떤지 (성격)</span>
          </p>
          <p lang="en" className="mt-2 flex flex-wrap gap-1.5 text-[14px]">
            {OF_WORDS.map((w) => (
              <span key={w} className="rounded-md bg-chip px-2 py-0.5">
                {w}
              </span>
            ))}
          </p>
          <p className="mt-2 text-[1.04em] font-medium">
            <En en="It was kind [[{of|전치사:(to부정사의 주어) ~가} you]] to help me." />
          </p>
          <p className="text-[13.5px] text-ink-2">네가 나를 도와주다니 친절했어.</p>
        </div>
      </div>
      <div className="mt-3 rounded-2xl bg-chip px-4 py-3 text-[14px]">
        <p className="font-extrabold">헷갈리면 사람을 주어로 바꿔 보세요</p>
        <ul className="mt-1.5 grid gap-1.5 sm:grid-cols-2">
          <li className="flex items-center gap-2">
            <Mark ok />
            <span>
              <span lang="en" className="font-bold">
                You were kind.
              </span>{" "}
              말이 돼요 → of
            </span>
          </li>
          <li className="flex items-center gap-2">
            <Mark ok={false} />
            <span>
              <span lang="en" className="font-bold">
                I am hard.
              </span>{" "}
              뜻이 이상해요 → for
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

/* ───────── 8. to부정사의 시제: 같은 때 vs 더 먼저 ───────── */

const TENSE_ROWS: { en: string; ko: string; same: boolean; that: string }[] = [
  {
    en: "He seems [[to be]] sick.",
    ko: "그는 (지금) 아픈 것 같아.",
    same: true,
    that: "= It seems that he is sick.",
  },
  {
    en: "He seems [[to have been]] sick.",
    ko: "그는 (전에) 아팠던 것 같아.",
    same: false,
    that: "= It seems that he was sick.",
  },
];

function Dot({ label, tone }: { label: string; tone: "real" | "verbal" }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[13.5px] font-extrabold ${
        tone === "real" ? "bg-coral text-white" : "bg-sky-soft text-sky-ink"
      }`}
    >
      {tone === "real" && <CrownIcon size={15} />}
      {label}
    </span>
  );
}

/** to 동사원형은 진짜 동사와 같은 때, to have p.p.는 진짜 동사보다 먼저 */
export function TiTenseShift() {
  return (
    <div className="mx-auto max-w-xl">
      <div className="grid grid-cols-[1fr_1fr] gap-2 text-center text-[14px] font-extrabold">
        <span className="rounded-lg bg-chip py-1">더 먼저 (과거)</span>
        <span className="rounded-lg bg-chip py-1">지금 (seems)</span>
      </div>
      <ul className="mt-2 grid gap-2.5">
        {TENSE_ROWS.map((r) => (
          <li key={r.en} className="rounded-2xl border border-line px-4 py-3">
            <div className="grid grid-cols-[1fr_1fr] items-center gap-2 text-center">
              <span>{!r.same && <Dot label="to have been" tone="verbal" />}</span>
              <span className="flex flex-wrap justify-center gap-1.5">
                <Dot label="seems" tone="real" />
                {r.same && <Dot label="to be" tone="verbal" />}
              </span>
            </div>
            <p className="mt-2 text-[1.05em] font-medium">
              <En en={r.en} />
            </p>
            <p className="text-[13.5px] text-ink-2">{r.ko}</p>
            <p lang="en" className="mt-1 text-[13.5px] font-bold text-ink-3">
              {r.that}
            </p>
          </li>
        ))}
      </ul>
      <p className="mt-3 grid gap-1.5 text-[14px] font-bold sm:grid-cols-2">
        <span className="rounded-xl bg-sky-soft px-3 py-2 text-sky-ink">to 동사원형: 진짜 동사와 같은 때 (또는 그 뒤)</span>
        <span className="rounded-xl bg-amber-soft px-3 py-2 text-amber-ink">to have p.p.: 진짜 동사보다 더 먼저</span>
      </p>
    </div>
  );
}

/* ───────── 9. to 뒤는 언제나 동사원형 ───────── */

const FIXED_ROWS: { tag: string; subj: { en: string }; verb: { en: string } }[] = [
  { tag: "나 · 지금", subj: { en: "I" }, verb: { en: "want" } },
  { tag: "그녀 · 지금", subj: { en: "She" }, verb: { en: "wants" } },
  { tag: "그녀 · 과거", subj: { en: "She" }, verb: { en: "wanted" } },
];

/** 주어와 때가 바뀌면 진짜 동사만 모양이 바뀌고, to부정사는 그대로 */
export function TiFixedTo() {
  return (
    <div className="mx-auto max-w-xl">
      <p className="flex flex-wrap items-center justify-center gap-2 text-[13.5px] font-bold">
        <span className="rounded-full bg-coral px-2.5 py-1 text-white">진짜 동사: 주어·때 따라 바뀌어요</span>
        <span className="rounded-full bg-sky-soft px-2.5 py-1 text-sky-ink">to부정사: 늘 그대로</span>
      </p>
      <ul className="mt-3 grid gap-2">
        {FIXED_ROWS.map((r) => (
          <li key={r.tag} className="flex flex-wrap items-center gap-1.5 rounded-2xl border border-line px-3.5 py-2.5 text-[1.08em]">
            <span className="mr-1 rounded-full bg-chip px-2.5 py-0.5 text-[13.5px] font-bold text-ink-2">{r.tag}</span>
            <span className="font-medium">
              <En en={r.subj.en} />
            </span>
            <Chip className="bg-coral text-white">
              <En en={r.verb.en} />
            </Chip>
            <Chip className="bg-sky-soft text-sky-ink">
              <En en="to be" />
            </Chip>
            <span className="font-medium">
              <En en="a vet." />
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[14px] font-bold text-ink-2">
        <CrownIcon size={18} className="shrink-0 text-coral" />
        옷을 갈아입는 건 진짜 동사뿐, to 뒤는 언제나 동사원형이에요.
      </p>
    </div>
  );
}

/* ───────── 10. 목적어 자리의 to부정사: 앞을 바라봐요 ───────── */

const AHEAD_VERBS: { en: string; ko: string }[] = [
  { en: "want", ko: "원하다" },
  { en: "hope", ko: "바라다" },
  { en: "plan", ko: "계획하다" },
  { en: "decide", ko: "결심하다" },
  { en: "{promise|동사:약속하다}", ko: "약속하다" },
  { en: "expect", ko: "기대하다" },
];

/** want, hope, plan… 은 아직 하지 않은 일을 향하고, to가 그쪽으로 이어 준다 */
export function TiLookAhead() {
  return (
    <div>
      <div className="grid gap-2 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
        <div className="rounded-2xl bg-coral-soft px-4 py-3 text-center">
          <p className="flex items-center justify-center gap-1.5 font-extrabold text-coral-ink">
            <CrownIcon size={18} />
            지금: 진짜 동사
          </p>
          <p className="text-[13.5px] text-ink-2">바라고, 정하고, 약속해요</p>
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <ArrowRight size={30} className="rotate-90 text-amber-ink sm:rotate-0" />
          <span className="text-[13.5px] font-bold text-amber-ink">to = ~ 쪽으로</span>
        </div>
        <div className="rounded-2xl bg-amber-soft px-4 py-3 text-center">
          <p className="font-extrabold text-amber-ink">앞으로: to + 동사원형</p>
          <p className="text-[13.5px] text-ink-2">아직 하지 않은 일</p>
        </div>
      </div>
      <ul className="mt-3 grid grid-cols-2 gap-2 min-[420px]:grid-cols-3">
        {AHEAD_VERBS.map((v) => (
          <li key={v.en} className="rounded-xl border border-line px-3 py-2">
            <span className="block text-[1.05em] font-bold">
              <En en={v.en} />
            </span>
            <span className="block text-[13.5px] text-ink-2">{v.ko}</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 rounded-2xl border border-line px-4 py-3">
        <span className="block text-[1.05em] font-medium">
          <En en="We plan [[to visit]] Grandma this Sunday." />
        </span>
        <span className="block text-[13.5px] text-ink-2">우리는 이번 일요일에 할머니 댁에 가려고 계획하고 있어. (가는 건 아직 앞으로의 일)</span>
      </p>
    </div>
  );
}

/* ───────── 11. enough의 자리 ───────── */

/** 형용사·부사는 enough 앞, 명사는 enough 뒤 */
export function TiEnoughSpot() {
  return (
    <div className="grid gap-2.5 sm:grid-cols-2">
      <div className="rounded-2xl border border-line px-4 py-3">
        <p className="text-[13.5px] font-extrabold text-ink-3">형용사·부사 + enough</p>
        <p className="mt-2 flex flex-wrap items-center gap-1.5 text-[1.08em]">
          <Chip className="bg-mint-soft text-mint-ink">
            <En en="warm" />
          </Chip>
          <Chip className="bg-coral text-white">
            <En en="enough" />
          </Chip>
          <Mark ok />
        </p>
        <p className="mt-1.5 text-[13.5px] font-bold text-ink-2">형용사·부사가 enough 앞에 서요</p>
        <p className="mt-2 text-[1.04em] font-medium">
          <En en="The soup is [[warm enough]] to eat now." />
        </p>
        <p className="text-[13.5px] text-ink-2">수프가 이제 먹기 딱 좋을 만큼 따뜻해.</p>
        <p className="mt-2 flex items-center gap-2 text-[13.5px] text-ink-3">
          <Mark ok={false} />
          <span lang="en" className="font-bold line-through decoration-coral decoration-2">
            enough warm
          </span>
        </p>
      </div>
      <div className="rounded-2xl border border-line px-4 py-3">
        <p className="text-[13.5px] font-extrabold text-ink-3">enough + 명사</p>
        <p className="mt-2 flex flex-wrap items-center gap-1.5 text-[1.08em]">
          <Chip className="bg-coral text-white">
            <En en="enough" />
          </Chip>
          <Chip className="bg-sky-soft text-sky-ink">
            <En en="eggs" />
          </Chip>
          <Mark ok />
        </p>
        <p className="mt-1.5 text-[13.5px] font-bold text-ink-2">명사는 enough 뒤에 와요</p>
        <p className="mt-2 text-[1.04em] font-medium">
          <En en="Do we have [[enough eggs]] to make a cake?" />
        </p>
        <p className="text-[13.5px] text-ink-2">케이크를 만들 만큼 달걀이 충분히 있어?</p>
      </div>
    </div>
  );
}

/* ───────── 12. to부정사의 모양 네 가지: 때 × 관계 ───────── */

const TI_FORMS: { key: string; time: string; rel: string; form: string; en: string; ko: string; tone: Tone }[] = [
  {
    key: "same-active",
    time: "같은 때",
    rel: "하는 쪽",
    form: "to + 동사원형",
    en: "She seems [[to know]] the {answer|명사:답, 정답}.",
    ko: "그녀는 답을 아는 것 같아.",
    tone: "sky",
  },
  {
    key: "same-passive",
    time: "같은 때",
    rel: "당하는 쪽",
    form: "to be p.p.",
    en: "He seems [[to be loved]] by everyone.",
    ko: "그는 모두에게 사랑받는 것 같아.",
    tone: "sky",
  },
  {
    key: "before-active",
    time: "더 먼저",
    rel: "하는 쪽",
    form: "to have p.p.",
    en: "She seems [[to {have|조동사:완료형을 만드는 말} lost]] her key.",
    ko: "그녀는 열쇠를 잃어버린 것 같아.",
    tone: "amber",
  },
  {
    key: "before-passive",
    time: "더 먼저",
    rel: "당하는 쪽",
    form: "to have been p.p.",
    en: "The bridge seems [[to {have|조동사:완료형을 만드는 말} been built]] long ago.",
    ko: "그 다리는 오래전에 지어진 것 같아.",
    tone: "amber",
  },
];

/** 진짜 동사와의 때(같은 때 / 더 먼저)와 관계(하는 쪽 / 당하는 쪽)로 to부정사 모양이 정해진다 */
export function TiFormGrid() {
  return (
    <ul className="grid gap-2.5 sm:grid-cols-2">
      {TI_FORMS.map((f) => (
        <li key={f.key} className="rounded-2xl border border-line px-3.5 py-3">
          <p className="flex flex-wrap gap-1.5 text-[13.5px] font-bold">
            <span className="rounded-full bg-chip px-2.5 py-0.5 text-ink-2">진짜 동사와 {f.time}</span>
            <span className="rounded-full bg-chip px-2.5 py-0.5 text-ink-2">{f.rel}</span>
          </p>
          <p className={`mt-2 w-fit rounded-lg px-2.5 py-1 text-[1.1em] font-extrabold ${TONE[f.tone]}`}>
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
