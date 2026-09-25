import type { ReactNode } from "react";
import { En } from "@/components/lesson/En";

/* 명사 장 그림: 셀 수 있나 없나 분류함, 복수형 규칙 카드, 세는 그릇 */

function Bin({ title, sub, tone, words }: { title: string; sub: string; tone: string; words: string[] }) {
  return (
    <div className={`rounded-2xl px-4 py-4 ${tone}`}>
      <p className="font-extrabold">{title}</p>
      <p className="text-[14px] opacity-80">{sub}</p>
      <p className="mt-2 flex flex-wrap gap-1.5">
        {words.map((w) => (
          <span key={w} className="rounded-lg bg-card px-2 py-1 text-[15px] font-medium text-ink">
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
      <p className="text-[14px] text-ink-2">{how}</p>
      <ul className="mt-2 space-y-1">
        {pairs.map(([a, b]) => (
          <li key={a} className="flex items-center gap-2 text-[15px] font-medium">
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
      <p className="mt-1.5 text-[15px] font-medium">
        <En en={en} />
      </p>
      <p className="text-[14px] text-ink-2">{label}</p>
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
