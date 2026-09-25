import type { ReactNode } from "react";
import { En } from "@/components/lesson/En";
import { PersonIcon } from "./icons";

/* 명사 장 그림: 셀 수 있나 없나 분류함, 복수형 규칙 카드, 세는 그릇,
   셀 수 없는 명사의 세 규칙, 늘 복수인 짝꿍 명사, 그릇이 복수, a few와 few */

function Bin({ title, sub, tone, words }: { title: string; sub: string; tone: string; words: string[] }) {
  return (
    <div className={`rounded-2xl px-4 py-4 ${tone}`}>
      <p className="font-extrabold">{title}</p>
      <p className="text-[13.5px] opacity-80">{sub}</p>
      <p className="mt-2 flex flex-wrap gap-1.5">
        {words.map((w) => (
          <span key={w} className="rounded-lg bg-card px-2 py-1 text-[14.5px] font-medium text-ink">
            <En en={w} />
          </span>
        ))}
      </p>
    </div>
  );
}

/** 명사 분류함: 셀 수 있는 명사 / 셀 수 없는 명사(물질·추상·고유) */
export function NnSortBins() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Bin title="셀 수 있어요" sub="모양이 뚜렷해서 하나, 둘 셀 수 있어요 → a/an, -s" tone="bg-mint-soft text-mint-ink" words={["apple", "book", "dog", "friend", "chair", "idea"]} />
      <div className="grid gap-3">
        <Bin title="셀 수 없어요 ① 물질" sub="모양이 정해지지 않은 재료" tone="bg-sky-soft text-sky-ink" words={["water", "milk", "bread", "rice", "paper"]} />
        <Bin title="셀 수 없어요 ② 눈에 안 보이는 것" sub="생각, 느낌, 정보" tone="bg-sky-soft text-sky-ink" words={["love", "advice", "homework", "music", "information"]} />
        <Bin title="셀 수 없어요 ③ 이름" sub="세상에 하나뿐" tone="bg-sky-soft text-sky-ink" words={["Minsu", "Seoul", "Korea"]} />
      </div>
    </div>
  );
}

function RuleCard({ rule, how, pairs }: { rule: string; how: string; pairs: [string, string][] }) {
  return (
    <div className="rounded-2xl border border-line px-4 py-3">
      <p className="font-extrabold">{rule}</p>
      <p className="text-[13.5px] text-ink-2">{how}</p>
      <ul className="mt-2 space-y-1">
        {pairs.map(([a, b]) => (
          <li key={a} className="flex items-center gap-2 text-[14.5px] font-medium">
            <En en={a} />
            <span aria-hidden className="text-ink-3">
              →
            </span>
            <span className="rounded-md bg-amber-soft px-1.5 text-amber-ink">
              <En en={b} />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** 복수형 만들기 규칙 카드 */
export function NnPluralRules() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <RuleCard rule="대부분" how="끝에 -s" pairs={[["book", "books"], ["cat", "cats"]]} />
      <RuleCard rule="s, sh, ch, x, o로 끝나면" how="끝에 -es (발음하기 쉽게)" pairs={[["bus", "buses"], ["box", "boxes"], ["potato", "potatoes"]]} />
      <RuleCard rule="자음 + y로 끝나면" how="y를 i로 바꾸고 -es" pairs={[["baby", "babies"], ["city", "cities"]]} />
      <RuleCard rule="모음 + y로 끝나면" how="그냥 -s" pairs={[["boy", "boys"], ["day", "days"]]} />
      <RuleCard rule="f, fe로 끝나면" how="f를 v로 바꾸고 -es" pairs={[["leaf", "leaves"], ["knife", "knives"]]} />
      <RuleCard rule="모양이 확 바뀌는 것" how="외워 두기" pairs={[["man", "men"], ["child", "children"], ["foot", "feet"]]} />
    </div>
  );
}

function Vessel({ children, label, en }: { children: ReactNode; label: string; en: string }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-line px-2 py-3 text-center">
      <svg viewBox="0 0 48 48" className="size-12" aria-hidden>
        {children}
      </svg>
      <p className="mt-1.5 text-[14.5px] font-medium">
        <En en={en} />
      </p>
      <p className="text-[13.5px] text-ink-2">{label}</p>
    </div>
  );
}

const stroke = { stroke: "var(--ink-2)", fill: "none", strokeWidth: 2.5, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
const liquid = { fill: "var(--sky-soft)" };
const food = { fill: "var(--amber-soft)", stroke: "var(--amber-ink)", strokeWidth: 2 };

/** 셀 수 없는 것을 세는 그릇과 조각 */
export function NnContainers() {
  return (
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
      <Vessel en="{a glass of} water" label="물 한 잔">
        <path d="M14 20 L16 42 H32 L34 20 Z" style={liquid} />
        <path d="M12 8 L16 42 H32 L36 8" style={stroke} />
      </Vessel>
      <Vessel en="{a cup of} tea" label="차 한 잔">
        <path d="M10 18 H34 V32 A10 10 0 0 1 24 42 H20 A10 10 0 0 1 10 32 Z" style={liquid} />
        <path d="M10 14 H34 V32 A10 10 0 0 1 24 42 H20 A10 10 0 0 1 10 32 Z M34 20 H38 A5 5 0 0 1 38 30 H34" style={stroke} />
      </Vessel>
      <Vessel en="{a bottle of} juice" label="주스 한 병">
        <path d="M17 22 H31 V42 H17 Z" style={{ fill: "var(--amber-soft)" }} />
        <path d="M20 6 H28 V14 L32 20 V42 H16 V20 L20 14 Z" style={stroke} />
      </Vessel>
      <Vessel en="{a bowl of} rice" label="밥 한 그릇">
        <path d="M8 24 Q24 14 40 24 Z" style={{ fill: "var(--chip)" }} />
        <path d="M6 24 H42 A18 16 0 0 1 6 24 Z" style={stroke} />
      </Vessel>
      <Vessel en="{a piece of} cake" label="케이크 한 조각">
        <path d="M10 36 L24 12 L38 36 Z" style={food} />
        <path d="M13 31 H35" style={{ stroke: "var(--coral)", strokeWidth: 3 }} />
      </Vessel>
      <Vessel en="{a slice of} pizza" label="피자 한 조각">
        <path d="M8 12 Q24 4 40 12 L24 42 Z" style={food} />
        <circle cx="20" cy="17" r="3" style={{ fill: "var(--coral)" }} />
        <circle cx="28" cy="24" r="3" style={{ fill: "var(--coral)" }} />
      </Vessel>
    </div>
  );
}

/* ───────── 셀 수 없는 명사의 세 가지 규칙 ───────── */

const NN_NO_RULES: { rule: string; no: string; en: string; hint: string; more: { en: string } }[] = [
  { rule: "a/an을 붙이지 않아요", no: "a water", en: "water", hint: "꼭 세고 싶으면", more: { en: "{a glass of} water" } },
  { rule: "-s를 붙이지 않아요", no: "waters, homeworks", en: "water, homework", hint: "많다고 할 때는", more: { en: "{a lot of} homework" } },
  { rule: "늘 단수로 취급해요", no: "The water are cold.", en: "The water [[is]] cold.", hint: "동사도 단수로", more: { en: "is, was, has" } },
];

/** 셀 수 없는 명사: a/an ✕, -s ✕, 동사는 늘 단수 */
export function NnNoRules() {
  return (
    <div role="list" className="grid gap-2.5 sm:grid-cols-3">
      {NN_NO_RULES.map((r, i) => (
        <div role="listitem" key={r.rule} className="flex flex-col rounded-2xl border border-line">
          <p className="flex items-center gap-2 rounded-t-2xl bg-sky-soft px-4 py-2.5 text-sky-ink">
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-card text-[14.5px] font-extrabold">{i + 1}</span>
            <span className="text-[15px] font-extrabold">{r.rule}</span>
          </p>
          <div className="grid gap-1.5 px-4 py-3">
            <p className="flex items-center gap-2">
              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-coral-soft text-[13.5px] font-extrabold text-coral-ink" aria-label="틀린 표현">
                ✕
              </span>
              <span lang="en" className="text-[1.03em] text-coral-ink line-through">
                {r.no}
              </span>
            </p>
            <p className="flex items-center gap-2">
              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-mint-soft text-[13.5px] font-extrabold text-mint-ink" aria-label="맞는 표현">
                ✓
              </span>
              <span className="text-[1.05em] font-medium">
                <En en={r.en} />
              </span>
            </p>
            <p className="mt-1 text-[13.5px] text-ink-2">
              {r.hint}: <En en={r.more.en} className="font-bold text-ink" />
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ───────── 늘 복수인 짝꿍 명사, 단수와 복수가 같은 명사 ───────── */

const pairStroke = { stroke: "var(--ink-2)", fill: "none", strokeWidth: 2.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
const pairFill = { fill: "var(--sky-soft)", stroke: "var(--sky-ink)", strokeWidth: 2, strokeLinejoin: "round" as const };

const NN_PAIRS: { en: string; ko: string; draw: ReactNode }[] = [
  {
    en: "{a pair of} {glasses|명사:안경}",
    ko: "안경 하나",
    draw: (
      <>
        <circle cx="14" cy="27" r="8" style={pairFill} />
        <circle cx="34" cy="27" r="8" style={pairFill} />
        <path d="M22 26 Q24 23 26 26 M6 25 L3 18 M42 25 L45 18" style={pairStroke} />
      </>
    ),
  },
  {
    en: "{a pair of} pants",
    ko: "바지 한 벌",
    draw: <path d="M13 7 H35 L38 43 H28 L24 19 L20 43 H10 Z" style={pairFill} />,
  },
  {
    en: "{a pair of} scissors",
    ko: "가위 하나",
    draw: (
      <>
        <path d="M18 31 L33 5 M30 31 L15 5" style={{ ...pairStroke, strokeWidth: 3 }} />
        <circle cx="15" cy="37" r="6" style={pairFill} />
        <circle cx="33" cy="37" r="6" style={pairFill} />
      </>
    ),
  },
  {
    en: "{a pair of} shoes",
    ko: "신발 한 켤레",
    draw: (
      <>
        <path d="M3 34 V26 Q3 20 9 20 H12 Q14 27 22 28 V34 Z" style={pairFill} />
        <path d="M25 40 V32 Q25 26 31 26 H34 Q36 33 44 34 V40 Z" style={pairFill} />
      </>
    ),
  },
];

function NnFish({ faded = false }: { faded?: boolean }) {
  return (
    <svg width="40" height="28" viewBox="0 0 40 28" aria-hidden opacity={faded ? 0.3 : 1}>
      <ellipse cx="17" cy="14" rx="13" ry="8.5" style={{ fill: "var(--amber-soft)", stroke: "var(--amber-ink)" }} strokeWidth="2" />
      <path d="M29 14 L38 6 V22 Z" style={{ fill: "var(--amber-soft)", stroke: "var(--amber-ink)" }} strokeWidth="2" strokeLinejoin="round" />
      <circle cx="10" cy="12" r="1.8" style={{ fill: "var(--ink)" }} />
    </svg>
  );
}

const NN_SAME: { en: string; count: number }[] = [
  { en: "{one|수사:하나} {fish|명사:물고기}", count: 1 },
  { en: "three {fish|명사:물고기 (복수)}", count: 3 },
];

/** 두 쪽이 한 벌인 것은 늘 복수(a pair of로 센다), fish·sheep·deer는 단수와 복수가 같다 */
export function NnPairs() {
  return (
    <div className="grid gap-4">
      <div>
        <p className="font-extrabold">두 쪽이 모여 하나: 늘 복수</p>
        <p className="text-[13.5px] text-ink-2">하나, 둘 셀 때는 a pair of(한 벌, 한 켤레)를 써요. 동사도 복수(are)예요.</p>
        <div role="list" className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {NN_PAIRS.map((p) => (
            <div role="listitem" key={p.en} className="flex flex-col items-center rounded-2xl border border-line px-2 py-3 text-center">
              <svg viewBox="0 0 48 48" className="size-12" aria-hidden>
                {p.draw}
              </svg>
              <p className="mt-1.5 text-[14.5px] font-medium">
                <En en={p.en} />
              </p>
              <p className="text-[13.5px] text-ink-2">{p.ko}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <p className="font-extrabold">단수와 복수의 모양이 같아요</p>
        <div role="list" className="mt-2 grid gap-2 sm:grid-cols-2">
          {NN_SAME.map((s) => (
            <div role="listitem" key={s.en} className="flex items-center gap-3 rounded-2xl border border-line px-4 py-3">
              <span className="flex shrink-0 gap-0.5">
                {[0, 1, 2].map((k) => (
                  <NnFish key={k} faded={k >= s.count} />
                ))}
              </span>
              <span className="text-[1.08em] font-medium">
                <En en={s.en} />
              </span>
            </div>
          ))}
        </div>
        <p className="mt-2 text-[13.5px] text-ink-2">
          <En en="sheep, deer" className="font-bold text-ink" />도 하나든 여럿이든 모양이 같아요. -s를 붙이지 않아요.
        </p>
      </div>
    </div>
  );
}

/* ───────── 여러 개일 때는 그릇이 복수 ───────── */

const NN_COUNT_PARTS: { en: string; tag?: string; tone?: string }[] = [
  { en: "two" },
  { en: "glasses", tag: "복수가 돼요 (+es)", tone: "bg-coral text-white" },
  { en: "of" },
  { en: "water", tag: "그대로 (-s ✕)", tone: "bg-sky-soft text-sky-ink" },
];

const NN_COUNT_MORE: { en: string; ko: string }[] = [
  { en: "three [[slices]] of pizza", ko: "피자 세 조각" },
  { en: "two [[loaves]] of bread", ko: "빵 두 덩어리" },
  { en: "four [[cups]] of tea", ko: "차 네 잔" },
];

/** two glasses of water: -s가 붙는 건 그릇이고, 셀 수 없는 명사는 그대로 */
export function NnGlassCount() {
  return (
    <div>
      <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-6">
        <span className="flex gap-1" aria-hidden>
          {[0, 1].map((k) => (
            <svg key={k} viewBox="0 0 48 48" className="size-14">
              <path d="M14 20 L16 42 H32 L34 20 Z" style={liquid} />
              <path d="M12 8 L16 42 H32 L36 8" style={stroke} />
            </svg>
          ))}
        </span>
        <p className="flex flex-wrap items-start justify-center gap-2">
          {NN_COUNT_PARTS.map((p) => (
            <span key={p.en} className="inline-flex flex-col items-center gap-1">
              <span className={`rounded-xl px-2.5 py-1 text-[1.2em] font-medium ${p.tone ?? "border border-line"}`}>
                <En en={p.en} />
              </span>
              {p.tag && <span className="text-[13.5px] font-extrabold text-ink-2">{p.tag}</span>}
            </span>
          ))}
        </p>
      </div>
      <p className="mt-2 text-center text-[13.5px] text-ink-2">물 두 잔 · 세는 건 물이 아니라 잔이에요</p>
      <div role="list" className="mt-3 grid gap-2 sm:grid-cols-3">
        {NN_COUNT_MORE.map((m) => (
          <div role="listitem" key={m.en} className="rounded-2xl border border-line px-3 py-2.5 text-center">
            <p className="text-[1.05em] font-medium">
              <En en={m.en} />
            </p>
            <p className="text-[13.5px] text-ink-2">{m.ko}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ───────── a few · few · a little · little ───────── */

function NnMilkGlass({ top }: { top: number }) {
  const inset = ((top - 8) * 4) / 34;
  return (
    <svg viewBox="0 0 48 48" className="size-12 shrink-0" aria-hidden>
      <path d={`M${12 + inset} ${top} L16 42 H32 L${36 - inset} ${top} Z`} style={{ fill: "var(--card)", stroke: "var(--ink-3)" }} strokeWidth="1" />
      <path d="M12 8 L16 42 H32 L36 8" style={stroke} />
    </svg>
  );
}

function NnPeople({ n }: { n: number }) {
  return (
    <span className="flex shrink-0 items-end gap-0.5" aria-hidden>
      {[0, 1, 2].map((k) =>
        k < n ? (
          <PersonIcon key={k} size={28} className="text-mint-ink" />
        ) : (
          <span key={k} className="m-[3px] size-[22px] rounded-full border-2 border-dashed border-ink-3" />
        ),
      )}
    </span>
  );
}

const NN_FEW: { kind: string; plus: { en: string; ko: string }; minus: { en: string; ko: string } }[] = [
  {
    kind: "셀 수 있는 명사",
    plus: { en: "[[{a few}]] friends", ko: "친구가 몇 명 있어요" },
    minus: { en: "[[few]] friends", ko: "친구가 거의 없어요" },
  },
  {
    kind: "셀 수 없는 명사",
    plus: { en: "[[{a little}]] milk", ko: "우유가 조금 있어요" },
    minus: { en: "[[{little|형용사:(양이) 거의 없는}]] milk", ko: "우유가 거의 없어요" },
  },
];

/** a가 있으면 '조금 있다'(긍정), a가 없으면 '거의 없다'(부정) */
export function NnFewLittle() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {NN_FEW.map((f, i) => (
        <div key={f.kind} className="rounded-2xl border border-line">
          <p className="rounded-t-2xl bg-chip px-4 py-2 text-[14.5px] font-extrabold">{f.kind}</p>
          <div className="grid gap-2 px-4 py-3">
            <div className="flex items-center gap-3 rounded-xl bg-mint-soft px-3 py-2.5">
              {i === 0 ? <NnPeople n={3} /> : <NnMilkGlass top={28} />}
              <span className="min-w-0">
                <span className="block text-[1.08em] font-medium">
                  <En en={f.plus.en} />
                </span>
                <span className="block text-[13.5px] font-bold text-mint-ink">{f.plus.ko} · 긍정</span>
              </span>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-coral-soft px-3 py-2.5">
              {i === 0 ? <NnPeople n={1} /> : <NnMilkGlass top={39} />}
              <span className="min-w-0">
                <span className="block text-[1.08em] font-medium">
                  <En en={f.minus.en} />
                </span>
                <span className="block text-[13.5px] font-bold text-coral-ink">{f.minus.ko} · 부정</span>
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
