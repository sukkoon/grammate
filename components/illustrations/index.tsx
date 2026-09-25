import type { ReactNode } from "react";
import { En } from "@/components/lesson/En";
import {
  ArrowRight,
  BoxIcon,
  CalendarIcon,
  CatIcon,
  ClockIcon,
  CrownIcon,
  HatIcon,
  MaskIcon,
  MoonIcon,
  PersonIcon,
  RoadIcon,
  SunIcon,
} from "./icons";

/* 품사 가족별 색: 이름(명사·대명사) / 동사 / 명사 꾸밈(형용사·관사) / 나머지 꾸밈(부사) / 잇고 외치기 */
const POS_STYLE: Record<string, string> = {
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

function Tagged({ w, tag, sub }: { w: string; tag?: string; sub?: string }) {
  if (!tag) return <span className="self-start pt-2 text-[1.3em] font-medium">{w}</span>;
  return (
    <span className="inline-flex flex-col items-center gap-1.5">
      <span className="text-[1.3em] font-medium leading-none">
        <En en={w} />
      </span>
      <span className={`rounded-lg px-2 py-1 text-[12.5px] font-extrabold leading-none ${POS_STYLE[tag] ?? "bg-chip"}`}>{tag}</span>
      {sub && <span className="text-[11.5px] text-ink-3">{sub}</span>}
    </span>
  );
}

/** 한 문장에 8품사가 모두 들어 있는 그림 */
export function PosSentence() {
  const words: [string, string?][] = [
    ["Oh", "감탄사"],
    [","],
    ["the", "관사"],
    ["little", "형용사"],
    ["dog", "명사"],
    ["and", "접속사"],
    ["I", "대명사"],
    ["run", "동사"],
    ["very", "부사"],
    ["fast", "부사"],
    ["in", "전치사"],
    ["the", "관사"],
    ["park", "명사"],
    ["!"],
  ];
  return (
    <div>
      <p lang="en" className="flex flex-wrap items-start justify-center gap-x-2.5 gap-y-4">
        {words.map(([w, t], i) => (
          <Tagged key={i} w={w} tag={t} />
        ))}
      </p>
      <p className="mt-4 text-center text-[14px] text-ink-2">
        오, 그 작은 강아지와 나는 공원에서 아주 빨리 달려요!
      </p>
      <ul className="mt-4 flex flex-wrap justify-center gap-2 text-[12.5px]">
        <li className="rounded-full bg-sky-soft px-2.5 py-1 font-bold text-sky-ink">이름 가족</li>
        <li className="rounded-full bg-coral px-2.5 py-1 font-bold text-white">움직임</li>
        <li className="rounded-full bg-mint-soft px-2.5 py-1 font-bold text-mint-ink">명사 꾸미기</li>
        <li className="rounded-full bg-amber-soft px-2.5 py-1 font-bold text-amber-ink">나머지 꾸미기</li>
        <li className="rounded-full bg-chip px-2.5 py-1 font-bold text-ink-2">잇기·외치기</li>
      </ul>
    </div>
  );
}

/** 품사(직업) vs 문장 성분(오늘 맡은 역할) */
export function JobVsRole() {
  return (
    <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
      <div className="rounded-2xl bg-chip px-4 py-4 text-center">
        <PersonIcon size={40} className="mx-auto text-ink-2" />
        <p className="mt-2 font-extrabold">지수의 직업: 학생</p>
        <p className="text-[13px] text-ink-2">어디에 있든 변하지 않아요</p>
        <p className="mt-2 rounded-lg bg-card px-2 py-1.5 text-[13.5px] font-bold">= 품사 (-사)</p>
      </div>
      <ArrowRight className="mx-auto rotate-90 text-ink-3 sm:rotate-0" />
      <div className="rounded-2xl bg-coral-soft px-4 py-4 text-center">
        <CrownIcon size={34} className="mx-auto text-coral" />
        <p className="mt-2 font-extrabold">연극에서 맡은 역할: 왕</p>
        <p className="text-[13px] text-ink-2">무대(문장)마다 달라져요</p>
        <p className="mt-2 rounded-lg bg-card px-2 py-1.5 text-[13.5px] font-bold">= 문장 성분 (-어)</p>
      </div>
    </div>
  );
}

/** 구와 절: 동사가 있느냐 없느냐 */
export function PhraseClause() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <div className="rounded-2xl border border-line px-4 py-4">
        <p className="text-[13px] font-extrabold text-ink-3">구 · 단어 묶음</p>
        <p className="mt-2 text-[1.2em] font-medium">
          <span className="rounded-md border-2 border-dashed border-ink-3 px-1.5 py-0.5">
            <En en="in the morning" />
          </span>
        </p>
        <p className="mt-2 text-[14px] text-ink-2">주어도 동사도 없어요. 그냥 한 덩어리예요.</p>
      </div>
      <div className="rounded-2xl border border-line px-4 py-4">
        <p className="text-[13px] font-extrabold text-coral-ink">절 · 주어 + 동사가 있는 마디</p>
        <p className="mt-2 text-[1.2em] font-medium">
          <span className="rounded-md border-2 border-coral px-1.5 py-0.5">
            <En en="when [[I]] [[woke]] up" />
          </span>
        </p>
        <p className="mt-2 text-[14px] text-ink-2">
          주어 <b>I</b>와 동사 <b>woke</b>가 들어 있어요.
        </p>
      </div>
    </div>
  );
}

/** 동사 1개의 법칙: 진짜 동사는 왕관, 변장한 동사는 가면 */
export function OneVerbBlueprint() {
  return (
    <div>
      <p lang="en" className="flex flex-wrap items-end justify-center gap-x-2 gap-y-4 text-[1.35em] font-medium">
        <span className="rounded-xl border border-line px-3 py-2">
          <En en="I" />
        </span>
        <span className="flex flex-col items-center gap-1">
          <CrownIcon size={26} className="text-coral" />
          <span className="rounded-xl bg-coral px-3 py-2 text-white">want</span>
          <span className="text-[12px] font-extrabold text-coral-ink">진짜 동사</span>
        </span>
        <span className="flex flex-col items-center gap-1">
          <MaskIcon size={28} className="text-amber-ink" />
          <span className="rounded-xl bg-amber-soft px-3 py-2 text-amber-ink">to eat</span>
          <span className="text-[12px] font-extrabold text-amber-ink">변장한 동사</span>
        </span>
        <span className="rounded-xl border border-line px-3 py-2">
          <En en="pizza" />
        </span>
        <span className="pb-2">.</span>
      </p>
      <p className="mt-4 text-center text-[14px] text-ink-2">
        eat도 원래는 동사지만, 이 문장의 왕 자리는 이미 want가 차지했어요. 그래서 eat은 <b>to</b>를 쓰고 변장했어요.
      </p>
    </div>
  );
}

/** 세 가지 변장 */
export function VerbCostumes() {
  const items = [
    { name: "to부정사", how: "to + 동사원형", ex: "to eat", role: "명사·형용사·부사 무엇이든", tone: "bg-amber-soft text-amber-ink" },
    { name: "동명사", how: "동사원형 + -ing", ex: "eating", role: "명사로 변장 (~하기)", tone: "bg-sky-soft text-sky-ink" },
    { name: "분사", how: "-ing / p.p.", ex: "eating · eaten", role: "형용사로 변장 (~하는, ~된)", tone: "bg-mint-soft text-mint-ink" },
  ];
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {items.map((it) => (
        <div key={it.name} className="rounded-2xl border border-line px-4 py-4 text-center">
          <MaskIcon size={34} className={`mx-auto ${it.tone.split(" ")[1]}`} />
          <p className="mt-2 font-extrabold">{it.name}</p>
          <p className="text-[13px] text-ink-2">{it.how}</p>
          <p lang="en" className={`mx-auto mt-2 w-fit rounded-lg px-2.5 py-1 font-medium ${it.tone}`}>
            {it.ex}
          </p>
          <p className="mt-2 text-[13px] text-ink-2">{it.role}</p>
        </div>
      ))}
    </div>
  );
}

/** 진짜 동사 개수 = 접속사 개수 + 1 */
export function VerbFormula() {
  return (
    <div className="text-center">
      <p className="inline-flex flex-wrap items-center justify-center gap-2 text-[1.05em] font-extrabold">
        <span className="rounded-xl bg-coral px-3 py-1.5 text-white">진짜 동사 개수</span>
        <span>=</span>
        <span className="rounded-xl bg-sky-soft px-3 py-1.5 text-sky-ink">접속사·관계사 개수</span>
        <span>+ 1</span>
      </p>
      <p lang="en" className="mt-5 flex flex-wrap items-end justify-center gap-x-1.5 gap-y-3 text-[1.25em] font-medium">
        <span>
          <En en="I" />
        </span>
        <span className="flex flex-col items-center">
          <span className="rounded-lg bg-coral px-2 py-1 text-white">think</span>
          <span className="text-[11.5px] font-extrabold text-coral-ink">동사 1</span>
        </span>
        <span className="flex flex-col items-center">
          <span className="rounded-lg bg-sky-soft px-2 py-1 text-sky-ink">that</span>
          <span className="text-[11.5px] font-extrabold text-sky-ink">접속사</span>
        </span>
        <span>
          <En en="she" />
        </span>
        <span className="flex flex-col items-center">
          <span className="rounded-lg bg-coral px-2 py-1 text-white">likes</span>
          <span className="text-[11.5px] font-extrabold text-coral-ink">동사 2</span>
        </span>
        <span>
          <En en="you." />
        </span>
      </p>
      <p className="mt-3 text-[14px] text-ink-2">접속사 that이 문장을 하나 더 이어 주었으니, 진짜 동사도 하나 더 올 수 있어요. 1 + 1 = 2!</p>
    </div>
  );
}

/** 용어 조각 맞추기: -사와 -어 */
export function TermLego() {
  const rows: { a: string; b: string; out: string; kind: string }[] = [
    { a: "명", b: "사", out: "명사", kind: "단어의 종류" },
    { a: "동", b: "사", out: "동사", kind: "단어의 종류" },
    { a: "주", b: "어", out: "주어", kind: "문장 속 역할" },
    { a: "목적", b: "어", out: "목적어", kind: "문장 속 역할" },
  ];
  return (
    <div className="grid gap-2.5 sm:grid-cols-2">
      {rows.map((r) => (
        <div key={r.out} className="flex items-center gap-2 rounded-2xl border border-line px-3 py-3">
          <span className="rounded-lg bg-chip px-2.5 py-1.5 font-extrabold">{r.a}</span>
          <span className="text-ink-3">+</span>
          <span className={`rounded-lg px-2.5 py-1.5 font-extrabold ${r.b === "사" ? "bg-sky-soft text-sky-ink" : "bg-coral-soft text-coral-ink"}`}>
            {r.b}
          </span>
          <span className="text-ink-3">=</span>
          <span className="font-extrabold">{r.out}</span>
          <span className="ml-auto text-[12.5px] text-ink-3">{r.kind}</span>
        </div>
      ))}
    </div>
  );
}

/** 대명사 = 대신 뛰는 선수 */
export function PronounSwap() {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-[13px] font-extrabold text-ink-3">대명사가 없다면…</p>
        <p lang="en" className="mt-1.5 text-[1.2em] font-medium">
          <En en="Minsu is my friend." />{" "}
          <span className="rounded-md border-2 border-dashed border-coral/70 px-1">
            <En en="Minsu" />
          </span>{" "}
          <En en="is kind." />{" "}
          <span className="rounded-md border-2 border-dashed border-coral/70 px-1">
            <En en="Minsu" />
          </span>{" "}
          <En en="likes soccer." />
        </p>
        <p className="mt-1 text-[13.5px] text-coral-ink">같은 이름이 자꾸 나와서 답답해요.</p>
      </div>
      <div className="rounded-2xl bg-chip px-4 py-3">
        <p className="text-[13px] font-extrabold text-ink-3">대명사가 대신 뛰면</p>
        <p lang="en" className="mt-1.5 text-[1.2em] font-medium">
          <En en="Minsu is my friend." /> <span className="rounded-md bg-coral px-1.5 text-white">He</span>{" "}
          <En en="is kind." /> <span className="rounded-md bg-coral px-1.5 text-white">He</span> <En en="likes soccer." />
        </p>
        <p className="mt-1 text-[13.5px] text-ink-2">
          he가 Minsu 대신 경기장에 들어갔어요. 교체 선수처럼요!
        </p>
      </div>
    </div>
  );
}

/** 관사 = 명사에 씌우는 모자: a(아무거나 하나) vs the(바로 그것) */
export function ArticleHats() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <div className="rounded-2xl border border-line px-4 py-4">
        <p className="flex items-center gap-2 font-extrabold">
          <HatIcon className="text-mint-ink" />
          <span lang="en" className="text-[1.2em]">
            a cat
          </span>
        </p>
        <div className="mt-3 flex items-end justify-center gap-2 text-ink-3">
          <CatIcon size={30} />
          <CatIcon size={30} />
          <span className="rounded-full ring-2 ring-mint-ink ring-offset-2 ring-offset-card">
            <CatIcon size={34} className="text-mint-ink" />
          </span>
          <CatIcon size={30} />
          <CatIcon size={30} />
        </div>
        <p className="mt-3 text-[14px] text-ink-2">
          세상의 많은 고양이 중 <b>아무거나 한 마리</b>. 누군지 정해지지 않았어요.
        </p>
      </div>
      <div className="rounded-2xl border border-line px-4 py-4">
        <p className="flex items-center gap-2 font-extrabold">
          <HatIcon className="text-coral" />
          <span lang="en" className="text-[1.2em]">
            the cat
          </span>
        </p>
        <div className="relative mt-3 flex items-end justify-center">
          <span className="absolute bottom-0 h-10 w-24 rounded-[50%] bg-marker" aria-hidden />
          <CatIcon size={44} className="relative text-ink" />
        </div>
        <p className="mt-3 text-[14px] text-ink-2">
          우리 둘 다 아는 <b>바로 그 고양이</b>. 딱 정해져 있어요.
        </p>
      </div>
    </div>
  );
}

/** a냐 an이냐는 철자가 아니라 첫 소리가 정한다 */
export function AAnSound() {
  const aList: [string, string][] = [
    ["a cat", "[캣]"],
    ["a dog", "[도그]"],
    ["a university", "[유니버시티]"],
    ["a uniform", "[유니폼]"],
  ];
  const anList: [string, string][] = [
    ["an apple", "[애플]"],
    ["an egg", "[에그]"],
    ["an hour", "[아워]"],
    ["an honest boy", "[아니스트]"],
  ];
  const col = (title: string, sub: string, list: [string, string][], tone: string) => (
    <div className="rounded-2xl border border-line px-4 py-4">
      <p className="font-extrabold">{title}</p>
      <p className="text-[13px] text-ink-2">{sub}</p>
      <ul className="mt-3 space-y-2">
        {list.map(([en, sound]) => (
          <li key={en} className="flex items-baseline justify-between gap-3">
            <span className="text-[1.15em] font-medium">
              <En en={en} />
            </span>
            <span className={`rounded-md px-2 py-0.5 text-[13px] font-bold ${tone}`}>{sound}</span>
          </li>
        ))}
      </ul>
    </div>
  );
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {col("a + 자음 소리", "ㅋ, ㄷ, 'ㅠ(유)'처럼 모음이 아닌 소리", aList, "bg-mint-soft text-mint-ink")}
      {col("an + 모음 소리", "'아, 에, 이, 오, 우' 같은 소리", anList, "bg-coral-soft text-coral-ink")}
    </div>
  );
}

/** the를 쓰는 네 가지 이유 */
export function TheReasons() {
  const items: { title: string; en: string; ko: string; icon: ReactNode }[] = [
    { title: "앞에서 한 번 말했어요", en: "I have a cat. [[The]] cat is white.", ko: "고양이가 한 마리 있어. 그 고양이는 하얘.", icon: <span className="text-lg font-extrabold">2번째</span> },
    { title: "상황을 보면 둘 다 알아요", en: "Close [[the]] door, please.", ko: "(지금 이 방의) 문 좀 닫아 줘.", icon: <BoxIcon /> },
    { title: "세상에 하나뿐이에요", en: "[[The]] sun is hot.", ko: "태양은 뜨거워.", icon: <SunIcon /> },
    { title: "뒤에서 꾸며서 정해졌어요", en: "[[The]] book on the desk is mine.", ko: "책상 위의 그 책은 내 거야.", icon: <CalendarIcon /> },
  ];
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map((it) => (
        <div key={it.title} className="rounded-2xl border border-line px-4 py-4">
          <div className="flex items-center gap-2 text-coral-ink">
            <span className="grid min-w-9 place-items-center">{it.icon}</span>
            <p className="font-extrabold text-ink">{it.title}</p>
          </div>
          <p className="mt-2 text-[1.08em] font-medium">
            <En en={it.en} />
          </p>
          <p className="text-[13.5px] text-ink-2">{it.ko}</p>
        </div>
      ))}
    </div>
  );
}

/** 1·2·3인칭 */
export function PersonCircles() {
  const cards = [
    { n: "1인칭", who: "말하는 나", words: "I, we", tone: "bg-coral text-white" },
    { n: "2인칭", who: "내 말을 듣는 너", words: "you", tone: "bg-sky-soft text-sky-ink" },
    { n: "3인칭", who: "나와 너를 뺀 나머지 모두", words: "he, she, it, they, Minsu, my dog…", tone: "bg-chip text-ink" },
  ];
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {cards.map((c, i) => (
        <div key={c.n} className={`rounded-2xl px-4 py-4 text-center ${c.tone}`}>
          <PersonIcon size={i === 2 ? 30 : 36} className="mx-auto opacity-90" />
          <p className="mt-2 text-[1.1em] font-extrabold">{c.n}</p>
          <p className="text-[14px] opacity-90">{c.who}</p>
          <p lang="en" className="mt-1.5 font-medium">
            {c.words}
          </p>
        </div>
      ))}
    </div>
  );
}

/** 자리에 따라 옷을 갈아입는 I */
export function CaseOutfits() {
  const rows: { seat: string; en: string; ko: string }[] = [
    { seat: "주어 자리 (~은/는)", en: "[[I]] love my mom.", ko: "나는 엄마를 사랑해." },
    { seat: "~의 (소유격)", en: "This is [[my]] bag.", ko: "이건 내 가방이야." },
    { seat: "목적어 자리 (~을/를)", en: "Mom loves [[me]].", ko: "엄마는 나를 사랑해." },
    { seat: "~의 것 (소유대명사)", en: "This bag is [[mine]].", ko: "이 가방은 내 거야." },
  ];
  return (
    <ol className="space-y-2">
      {rows.map((r, i) => (
        <li key={r.seat} className="flex flex-col gap-1 rounded-2xl border border-line px-4 py-3 sm:flex-row sm:items-center sm:gap-4">
          <span className="w-fit shrink-0 rounded-lg bg-chip px-2.5 py-1 text-[13px] font-extrabold sm:w-44">
            {i + 1}. {r.seat}
          </span>
          <span className="min-w-0">
            <span className="text-[1.12em] font-medium">
              <En en={r.en} />
            </span>
            <span className="ml-2 text-[13.5px] text-ink-2">{r.ko}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}

/** this(가까이) / that(멀리) */
export function ThisThat() {
  return (
    <svg viewBox="0 0 520 170" className="mx-auto w-full max-w-lg" role="img" aria-label="가까운 것은 this, 먼 것은 that">
      <g style={{ color: "var(--ink)" }}>
        <circle cx="60" cy="70" r="16" fill="currentColor" />
        <path d="M34 128 C34 104 46 94 60 94 C74 94 86 104 86 128 Z" fill="currentColor" />
      </g>
      <path d="M92 96 H150" stroke="var(--coral)" strokeWidth="4" strokeLinecap="round" />
      <path d="M142 88 L152 96 L142 104" fill="none" stroke="var(--coral)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="160" y="80" width="40" height="40" rx="8" style={{ fill: "var(--coral)" }} />
      <text x="180" y="150" textAnchor="middle" fontSize="24" fontWeight="700" style={{ fill: "var(--ink)" }}>
        this
      </text>
      <text x="180" y="68" textAnchor="middle" fontSize="17" style={{ fill: "var(--ink-2)" }}>
        가까이
      </text>
      <path d="M92 110 H410" stroke="var(--ink-3)" strokeWidth="3" strokeDasharray="6 7" strokeLinecap="round" />
      <path d="M402 102 L412 110 L402 118" fill="none" stroke="var(--ink-3)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="425" y="92" width="36" height="36" rx="8" style={{ fill: "var(--sky-ink)" }} />
      <text x="443" y="158" textAnchor="middle" fontSize="24" fontWeight="700" style={{ fill: "var(--ink)" }}>
        that
      </text>
      <text x="443" y="80" textAnchor="middle" fontSize="17" style={{ fill: "var(--ink-2)" }}>
        멀리
      </text>
    </svg>
  );
}

/** 비인칭 it: 가리키는 게 없는 빈자리 채우기 */
export function ItFiller() {
  const rows: { icon: ReactNode; label: string; en: string; ko: string }[] = [
    { icon: <SunIcon />, label: "날씨", en: "[[It]] is sunny today.", ko: "오늘은 화창해." },
    { icon: <ClockIcon />, label: "시간", en: "[[It]] is five o'clock.", ko: "5시야." },
    { icon: <CalendarIcon />, label: "날짜·요일", en: "[[It]] is Monday.", ko: "월요일이야." },
    { icon: <RoadIcon />, label: "거리", en: "[[It]] is far from here.", ko: "여기서 멀어." },
    { icon: <MoonIcon />, label: "명암", en: "[[It]] is dark outside.", ko: "밖이 어두워." },
  ];
  return (
    <ul className="grid gap-2 sm:grid-cols-2">
      {rows.map((r) => (
        <li key={r.label} className="flex items-center gap-3 rounded-2xl border border-line px-3 py-3">
          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-chip text-ink-2">{r.icon}</span>
          <span className="min-w-0">
            <span className="text-[12.5px] font-extrabold text-ink-3">{r.label}</span>
            <span className="block text-[1.08em] font-medium">
              <En en={r.en} />
            </span>
            <span className="block text-[13px] text-ink-2">{r.ko}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}

/** 재귀대명사: 거울처럼 되돌아오는 말 */
export function ReflexiveMirror() {
  return (
    <svg viewBox="0 0 520 190" className="mx-auto w-full max-w-lg" role="img" aria-label="I가 한 동작이 myself로 되돌아온다">
      <g style={{ color: "var(--ink)" }}>
        <circle cx="120" cy="72" r="18" fill="currentColor" />
        <path d="M90 140 C90 112 104 100 120 100 C136 100 150 112 150 140 Z" fill="currentColor" />
      </g>
      <text x="120" y="172" textAnchor="middle" fontSize="20" fontWeight="700" style={{ fill: "var(--ink)" }}>
        I
      </text>
      <rect x="300" y="30" width="110" height="130" rx="55" fill="none" strokeWidth="5" style={{ stroke: "var(--sky-ink)" }} />
      <g style={{ color: "var(--ink-3)" }} opacity="0.75">
        <circle cx="355" cy="78" r="16" fill="currentColor" />
        <path d="M328 138 C328 114 340 104 355 104 C370 104 382 114 382 138 Z" fill="currentColor" />
      </g>
      <text x="355" y="182" textAnchor="middle" fontSize="20" fontWeight="700" style={{ fill: "var(--coral-ink)" }}>
        myself
      </text>
      <path d="M160 70 C210 30 250 30 292 60" fill="none" strokeWidth="4" strokeLinecap="round" style={{ stroke: "var(--coral)" }} />
      <path d="M282 52 L294 62 L280 66" fill="none" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: "var(--coral)" }} />
      <path d="M292 120 C250 150 210 150 162 118" fill="none" strokeWidth="4" strokeDasharray="7 7" strokeLinecap="round" style={{ stroke: "var(--coral)" }} />
      <path d="M172 112 L160 116 L168 127" fill="none" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: "var(--coral)" }} />
      <text x="226" y="100" textAnchor="middle" fontSize="18" style={{ fill: "var(--ink-2)" }}>
        되돌아와요
      </text>
    </svg>
  );
}

function Dot({ tone }: { tone: "a" | "b" | "c" | "g" }) {
  return (
    <span
      className={`inline-block size-6 rounded-full ${
        tone === "a" ? "bg-coral" : tone === "b" ? "bg-amber-ink/70" : tone === "c" ? "bg-sky-ink/80" : "bg-line"
      }`}
    />
  );
}

/** one / another / the other / others / the others */
export function OtherGroups() {
  const rows: { title: string; dots: ("a" | "b" | "c" | "g")[]; label: ReactNode }[] = [
    { title: "둘 중에서", dots: ["a", "c"], label: <>one ➊ · the other ➋ (남은 하나)</> },
    { title: "셋 중에서", dots: ["a", "b", "c"], label: <>one ➊ · another ➋ (또 하나) · the other ➌ (마지막 하나)</> },
    { title: "여럿 중에서 (끝을 정하지 않음)", dots: ["a", "a", "b", "b", "g", "g", "g"], label: <>some (몇몇) · others (다른 몇몇) · 나머지는 몰라요</> },
    { title: "정해진 무리에서", dots: ["a", "a", "c", "c", "c", "c"], label: <>some (몇몇) · the others (나머지 전부)</> },
  ];
  return (
    <ul className="space-y-3">
      {rows.map((r) => (
        <li key={r.title} className="rounded-2xl border border-line px-4 py-3">
          <p className="text-[13px] font-extrabold text-ink-3">{r.title}</p>
          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            {r.dots.map((d, i) => (
              <Dot key={i} tone={d} />
            ))}
          </div>
          <p lang="en" className="mt-2 text-[15px] font-medium">
            {r.label}
          </p>
        </li>
      ))}
    </ul>
  );
}

/** 한 단어, 여러 직업: 자리가 품사를 정한다 */
export function WordJobs() {
  const rows: { word: string; uses: { en: string; job: string; ko: string }[] }[] = [
    {
      word: "like",
      uses: [
        { en: "I [[like]] you.", job: "동사", ko: "좋아하다" },
        { en: "She sings [[{like|전치사:~처럼, ~같이}]] a bird.", job: "전치사", ko: "~처럼" },
      ],
    },
    {
      word: "fast",
      uses: [
        { en: "It is a [[{fast|형용사:빠른}]] car.", job: "형용사", ko: "빠른" },
        { en: "He runs [[fast]].", job: "부사", ko: "빨리" },
      ],
    },
  ];
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {rows.map((r) => (
        <div key={r.word} className="rounded-2xl border border-line px-4 py-4">
          <p lang="en" className="text-[1.5em] font-bold leading-none">
            {r.word}
          </p>
          <ul className="mt-3 space-y-2.5">
            {r.uses.map((u) => (
              <li key={u.en} className="flex items-center gap-2">
                <span className={`shrink-0 rounded-lg px-2 py-1 text-[12.5px] font-extrabold ${POS_STYLE[u.job]}`}>{u.job}</span>
                <span className="min-w-0 text-[1.05em] font-medium">
                  <En en={u.en} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/** 꾸밈 화살표: 형용사는 명사를, 부사는 나머지(동사·형용사·부사)를 꾸민다 */
export function ModifyArrows() {
  const rows: { from: [string, string]; to: [string, string]; ex: string; ko: string }[] = [
    { from: ["형용사", "little"], to: ["명사", "dog"], ex: "a [[little]] dog", ko: "작은 강아지" },
    { from: ["부사", "fast"], to: ["동사", "runs"], ex: "He runs [[fast]].", ko: "그는 빨리 달린다." },
    { from: ["부사", "very"], to: ["형용사", "cute"], ex: "It is [[very]] cute.", ko: "그건 아주 귀엽다." },
    { from: ["부사", "very"], to: ["부사", "fast"], ex: "He runs [[very]] fast.", ko: "그는 아주 빨리 달린다." },
  ];
  return (
    <ul className="space-y-2.5">
      {rows.map((r, i) => (
        <li key={i} className="flex flex-col gap-2 rounded-2xl border border-line px-3 py-3 sm:flex-row sm:items-center sm:gap-4">
          <span className="flex shrink-0 items-center gap-2">
            <span className={`rounded-lg px-2 py-1 text-[13px] font-extrabold ${POS_STYLE[r.from[0]]}`}>
              {r.from[0]} <span lang="en">{r.from[1]}</span>
            </span>
            <ArrowRight size={18} className="text-ink-3" />
            <span className={`rounded-lg px-2 py-1 text-[13px] font-extrabold ${POS_STYLE[r.to[0]]}`}>
              {r.to[0]} <span lang="en">{r.to[1]}</span>
            </span>
          </span>
          <span className="min-w-0 text-[1.05em] font-medium">
            <En en={r.ex} />
            <span className="ml-2 text-[13px] font-normal text-ink-2">{r.ko}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}

function BoxCat({ x, y, s = 1, faded = false }: { x: number; y: number; s?: number; faded?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={faded ? 0.45 : 1}>
      <path d="M8 16 L10 4 L17.5 11 H22.5 L30 4 L32 16 A12.5 11.5 0 1 1 8 16 Z" style={{ fill: "var(--coral)" }} />
      <circle cx="15" cy="21.5" r="1.9" style={{ fill: "var(--card)" }} />
      <circle cx="25" cy="21.5" r="1.9" style={{ fill: "var(--card)" }} />
    </g>
  );
}

function BoxLabel({ t, ko }: { t: string; ko: string }) {
  return (
    <>
      <text x="65" y="128" textAnchor="middle" fontSize="19" fontWeight="700" style={{ fill: "var(--ink)" }}>
        {t}
      </text>
      <text x="65" y="148" textAnchor="middle" fontSize="14" style={{ fill: "var(--ink-2)" }}>
        {ko}
      </text>
    </>
  );
}

const boxStroke = { stroke: "var(--ink-2)" } as const;

/** 전치사 상자: 상자와 고양이의 위치. 휴대폰에서는 줄을 바꿔 크게 보인다. */
export function PrepositionBox() {
  const scenes: { t: string; ko: string; draw: ReactNode }[] = [
    {
      t: "in",
      ko: "~ 안에",
      draw: (
        <>
          <rect x="30" y="40" width="70" height="56" rx="6" fill="none" strokeWidth="3" style={boxStroke} />
          <BoxCat x={45} y={54} s={1} />
        </>
      ),
    },
    {
      t: "on",
      ko: "~ 위에",
      draw: (
        <>
          <rect x="30" y="58" width="70" height="44" rx="6" fill="none" strokeWidth="3" style={boxStroke} />
          <BoxCat x={45} y={22} s={1} />
        </>
      ),
    },
    {
      t: "under",
      ko: "~ 아래에",
      draw: (
        <>
          <rect x="22" y="30" width="86" height="8" rx="3" style={{ fill: "var(--ink-2)" }} />
          <path d="M30 38 V100 M100 38 V100" strokeWidth="3" style={boxStroke} />
          <BoxCat x={45} y={62} s={1} />
        </>
      ),
    },
    {
      t: "next to",
      ko: "~ 옆에",
      draw: (
        <>
          <rect x="10" y="46" width="62" height="54" rx="6" fill="none" strokeWidth="3" style={boxStroke} />
          <BoxCat x={80} y={70} s={0.9} />
        </>
      ),
    },
    {
      t: "behind",
      ko: "~ 뒤에",
      draw: (
        <>
          <BoxCat x={45} y={24} s={1} faded />
          <rect x="28" y="48" width="74" height="54" rx="6" strokeWidth="3" style={{ fill: "var(--card)", ...boxStroke }} />
        </>
      ),
    },
  ];
  return (
    <ul className="grid grid-cols-3 gap-2 sm:grid-cols-5" aria-label="상자 안, 위, 아래, 옆, 뒤에 있는 고양이">
      {scenes.map((sc) => (
        <li key={sc.t}>
          <svg viewBox="0 0 130 156" className="w-full" role="img" aria-label={`${sc.t}: ${sc.ko}`}>
            {sc.draw}
            <BoxLabel t={sc.t} ko={sc.ko} />
          </svg>
        </li>
      ))}
    </ul>
  );
}
export * from "./nouns";
export * from "./tenses";
export * from "./verbs-basics";
export * from "./sentence-types";
export * from "./comparison";
export * from "./phrase-clause";
export * from "./sentence-elements";
export * from "./sentence-patterns";
export * from "./passive";
export * from "./prepositions";
export * from "./adjectives-adverbs";
export * from "./modals";
export * from "./gerunds";
export * from "./to-infinitive";
export * from "./participial-constructions";
export * from "./participles";
