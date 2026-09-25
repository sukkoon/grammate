import type { ReactNode } from "react";
import { En } from "@/components/lesson/En";
import { ArrowRight } from "./icons";

/* 대명사 장 그림: one과 it, him과 himself, 재귀대명사 만들기 */

/* ───────── 1. it은 바로 그것, one은 같은 종류의 다른 하나 ───────── */

function PnPen({ color, faded = false }: { color: string; faded?: boolean }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" aria-hidden opacity={faded ? 0.35 : 1}>
      <g transform="rotate(-35 24 24)">
        <rect x="6" y="19" width="28" height="10" rx="2.5" style={{ fill: color }} />
        <rect x="10" y="16.5" width="3.5" height="12.5" rx="1.2" style={{ fill: "var(--ink-2)" }} />
        <path d="M34 19 L43 24 L34 29 Z" style={{ fill: "var(--chip)", stroke: "var(--ink-3)" }} strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M40.5 22.6 L43 24 L40.5 25.4 Z" style={{ fill: "var(--ink)" }} />
      </g>
    </svg>
  );
}

function PnPicked({ children }: { children: ReactNode }) {
  return <span className="inline-grid place-items-center rounded-full ring-2 ring-coral ring-offset-2 ring-offset-card">{children}</span>;
}

const PN_IT = { en: "I found my pen. I found [[it]]!" };
const PN_ONE = { en: "I lost my pen. I need a new [[one]]." };

/** it은 앞에 말한 바로 그 물건, one은 같은 종류 가운데 아무거나 하나 */
export function PnOneOrIt() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <div className="rounded-2xl border border-line">
        <div className="rounded-t-2xl bg-sky-soft px-4 py-2.5 text-sky-ink">
          <p className="text-[16px] font-extrabold">it = 바로 그것</p>
          <p className="text-[14px] font-bold">잃어버렸던 그 펜을 다시 가리켜요</p>
        </div>
        <div className="px-4 py-3">
          <div className="flex items-center justify-center gap-3">
            <span className="flex flex-col items-center">
              <PnPen color="var(--coral)" faded />
              <span className="text-[14px] text-ink-2">잃어버린 펜</span>
            </span>
            <ArrowRight className="text-ink-3" />
            <span className="flex flex-col items-center">
              <PnPicked>
                <PnPen color="var(--coral)" />
              </PnPicked>
              <span className="mt-1 text-[14px] font-bold text-coral-ink">같은 펜</span>
            </span>
          </div>
          <p className="mt-2 text-[1.03em] font-medium">
            <En en={PN_IT.en} />
          </p>
          <p className="text-[14px] text-ink-2">펜을 찾았어. 그걸 찾았어!</p>
        </div>
      </div>
      <div className="rounded-2xl border border-line">
        <div className="rounded-t-2xl bg-amber-soft px-4 py-2.5 text-amber-ink">
          <p className="text-[16px] font-extrabold">one = 같은 종류의 다른 하나</p>
          <p className="text-[14px] font-bold">펜이라는 종류 가운데 아무거나 하나</p>
        </div>
        <div className="px-4 py-3">
          <div className="flex items-center justify-center gap-3">
            <span className="flex flex-col items-center">
              <PnPen color="var(--coral)" faded />
              <span className="text-[14px] text-ink-2">잃어버린 펜</span>
            </span>
            <ArrowRight className="text-ink-3" />
            <span className="flex flex-col items-center">
              <span className="flex items-center gap-1">
                <PnPen color="var(--sky-ink)" />
                <PnPicked>
                  <PnPen color="var(--mint-ink)" />
                </PnPicked>
                <PnPen color="var(--amber-ink)" />
              </span>
              <span className="mt-1 text-[14px] font-bold text-amber-ink">새 펜 하나</span>
            </span>
          </div>
          <p className="mt-2 text-[1.03em] font-medium">
            <En en={PN_ONE.en} />
          </p>
          <p className="text-[14px] text-ink-2">펜을 잃어버렸어. 새 거 하나가 필요해.</p>
        </div>
      </div>
    </div>
  );
}

/* ───────── 2. him과 himself ───────── */

function PnPerson({ x, color, opacity = 1 }: { x: number; color: string; opacity?: number }) {
  return (
    <g style={{ color }} opacity={opacity}>
      <circle cx={x} cy={64} r={13} fill="currentColor" />
      <path d={`M${x - 22} 118 C${x - 22} 97 ${x - 11} 86 ${x} 86 C${x + 11} 86 ${x + 22} 97 ${x + 22} 118 Z`} fill="currentColor" />
    </g>
  );
}

function PnArrowHead({ id }: { id: string }) {
  return (
    <defs>
      <marker id={id} viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
        <path d="M0 0 L10 5 L0 10 Z" style={{ fill: "var(--coral)" }} />
      </marker>
    </defs>
  );
}

const PN_HIM = { en: "He hurt [[him]]." };
const PN_HIMSELF = { en: "He hurt [[himself]]." };

/** He hurt him은 다른 사람을, He hurt himself는 자기 자신을 다치게 한 것 */
export function PnHimHimself() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <div className="rounded-2xl border border-line px-4 py-3">
        <svg viewBox="0 0 220 142" className="mx-auto w-full max-w-[260px]" role="img" aria-label="그가 다른 사람을 다치게 했어요">
          <PnArrowHead id="pn-arrow-him" />
          <PnPerson x={55} color="var(--sky-ink)" />
          <PnPerson x={165} color="var(--ink-3)" />
          <path d="M74 52 C98 20 122 20 146 52" fill="none" strokeWidth="4" strokeLinecap="round" markerEnd="url(#pn-arrow-him)" style={{ stroke: "var(--coral)" }} />
          <text x="55" y="138" textAnchor="middle" fontSize="17" fontWeight="700" style={{ fill: "var(--ink)" }}>
            he
          </text>
          <text x="165" y="138" textAnchor="middle" fontSize="17" fontWeight="700" style={{ fill: "var(--ink-2)" }}>
            him
          </text>
        </svg>
        <p className="mt-1 text-[1.08em] font-medium">
          <En en={PN_HIM.en} />
        </p>
        <p className="text-[14px] text-ink-2">그가 (다른) 그를 다치게 했어. 두 사람이에요.</p>
      </div>
      <div className="rounded-2xl border-2 border-coral/60 px-4 py-3">
        <svg viewBox="0 0 220 142" className="mx-auto w-full max-w-[260px]" role="img" aria-label="그가 자기 자신을 다치게 했어요">
          <PnArrowHead id="pn-arrow-self" />
          <PnPerson x={110} color="var(--sky-ink)" />
          <path d="M134 80 C182 62 164 14 110 16 C62 18 46 58 82 76" fill="none" strokeWidth="4" strokeLinecap="round" markerEnd="url(#pn-arrow-self)" style={{ stroke: "var(--coral)" }} />
          <text x="110" y="138" textAnchor="middle" fontSize="17" fontWeight="700" style={{ fill: "var(--ink)" }}>
            he = himself
          </text>
        </svg>
        <p className="mt-1 text-[1.08em] font-medium">
          <En en={PN_HIMSELF.en} />
        </p>
        <p className="text-[14px] text-ink-2">그가 (자기 자신을) 다쳤어. 한 사람이에요.</p>
      </div>
    </div>
  );
}

/* ───────── 3. 재귀대명사 만들기 ───────── */

const PN_SELF: { lane: string; sub: string; tone: string; rows: { base: string; tail: string; en: string; note?: string }[] }[] = [
  {
    lane: "1·2인칭",
    sub: "소유격 + self",
    tone: "bg-sky-soft text-sky-ink",
    rows: [
      { base: "my", tail: "self", en: "myself" },
      { base: "your", tail: "self", en: "yourself" },
      { base: "our", tail: "selves", en: "ourselves" },
      { base: "your", tail: "selves", en: "yourselves" },
    ],
  },
  {
    lane: "3인칭",
    sub: "목적격 + self",
    tone: "bg-mint-soft text-mint-ink",
    rows: [
      { base: "him", tail: "self", en: "himself" },
      { base: "her", tail: "self", en: "herself", note: "her는 소유격과 목적격이 같아요" },
      { base: "it", tail: "self", en: "itself" },
      { base: "them", tail: "selves", en: "themselves" },
    ],
  },
];

/** 1·2인칭은 소유격에, 3인칭은 목적격에 -self(복수는 -selves)를 붙인다 */
export function PnSelfBuilder() {
  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2">
        {PN_SELF.map((l) => (
          <div key={l.lane} className="rounded-2xl border border-line">
            <p className={`rounded-t-2xl px-4 py-2.5 ${l.tone}`}>
              <span className="block text-[16px] font-extrabold">{l.lane}</span>
              <span className="block text-[14px] font-bold">{l.sub}</span>
            </p>
            <div role="list" className="grid gap-2 px-4 py-3">
              {l.rows.map((r) => (
                <div role="listitem" key={r.en}>
                  <p className="flex flex-wrap items-center gap-1.5 text-[1.05em] font-medium">
                    <span className={`rounded-lg px-2 py-0.5 ${l.tone}`}>
                      <En en={r.base} />
                    </span>
                    <span className="text-ink-3">+</span>
                    <span lang="en" className="rounded-lg bg-chip px-2 py-0.5">
                      {r.tail}
                    </span>
                    <span className="text-ink-3">=</span>
                    <span className="font-bold">
                      <En en={r.en} />
                    </span>
                  </p>
                  {r.note && <p className="text-[14px] text-ink-2">{r.note}</p>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 flex flex-wrap items-center justify-center gap-2 text-[14px] font-bold">
        <span className="grid size-6 place-items-center rounded-full bg-coral-soft text-coral-ink" aria-label="틀린 말">
          ✕
        </span>
        <span lang="en" className="text-[15px] text-coral-ink line-through">
          hisself
        </span>
        <span lang="en" className="text-[15px] text-coral-ink line-through">
          theirselves
        </span>
        <span className="text-ink-2">3인칭은 소유격(his, their)이 아니라 목적격에 붙여요.</span>
      </p>
    </div>
  );
}
