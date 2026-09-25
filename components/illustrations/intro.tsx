import { En } from "@/components/lesson/En";
import { CrownIcon, MaskIcon } from "./icons";

/* 서장 그림: 용어 조각 해독기, 모양이 바뀌는 건 왕뿐 */

type InTone = "sky" | "mint" | "amber" | "coral";

const IN_TONE: Record<InTone, string> = {
  sky: "bg-sky-soft text-sky-ink",
  mint: "bg-mint-soft text-mint-ink",
  amber: "bg-amber-soft text-amber-ink",
  coral: "bg-coral-soft text-coral-ink",
};

function InPiece({ c, m, tone }: { c: string; m: string; tone: InTone }) {
  return (
    <span className={`inline-flex flex-col rounded-xl px-3 py-1.5 leading-tight ${IN_TONE[tone]}`}>
      <span className="text-[15px] font-extrabold">{c}</span>
      <span className="text-[13.5px] font-bold opacity-90">{m}</span>
    </span>
  );
}

/* ───────── 1. 용어 조각 해독기 ───────── */

const IN_DECODE: { term: string; pieces: { c: string; m: string; tone: InTone }[]; result: string; en?: string }[] = [
  {
    term: "부정관사",
    pieces: [
      { c: "부정", m: "정해지지 않은", tone: "sky" },
      { c: "관사", m: "명사에 씌우는 모자", tone: "mint" },
    ],
    result: "정해지지 않은 하나에 씌우는 모자",
    en: "a, an",
  },
  {
    term: "조동사",
    pieces: [
      { c: "조", m: "돕다", tone: "sky" },
      { c: "동사", m: "움직임·상태", tone: "coral" },
    ],
    result: "동사를 돕는 동사",
    en: "can, will",
  },
  {
    term: "목적격보어",
    pieces: [
      { c: "목적격", m: "목적어의", tone: "mint" },
      { c: "보어", m: "채워 주는 말", tone: "amber" },
    ],
    result: "목적어가 어떤지 채워 주는 말",
  },
];

/** 용어를 조각으로 나누면 뜻이 읽힌다: 대명사의 '대'를 잘못 읽으면 엉뚱한 뜻이 된다 */
export function InTermDecoder() {
  return (
    <div className="grid gap-4">
      <div>
        <p className="text-[13.5px] font-extrabold text-ink-3">대명사, 조각을 어떻게 읽느냐에 따라</p>
        <div className="mt-2 grid gap-2.5 sm:grid-cols-2">
          <div className="rounded-2xl border border-line px-4 py-3">
            <p className="flex items-center gap-2">
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-coral-soft text-[14.5px] font-extrabold text-coral-ink" aria-label="틀린 풀이">
                ✕
              </span>
              <InPiece c="대" m="크다" tone="coral" />
              <span className="text-ink-3">+</span>
              <InPiece c="명사" m="이름" tone="sky" />
            </p>
            <p className="mt-2 text-[14.5px] font-bold text-coral-ink">= 큰 명사? 뜻이 엉뚱해져요.</p>
          </div>
          <div className="rounded-2xl border-2 border-mint-ink/40 px-4 py-3">
            <p className="flex items-center gap-2">
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-mint-soft text-[14.5px] font-extrabold text-mint-ink" aria-label="바른 풀이">
                ✓
              </span>
              <InPiece c="대" m="대신하다" tone="mint" />
              <span className="text-ink-3">+</span>
              <InPiece c="명사" m="이름" tone="sky" />
            </p>
            <p className="mt-2 text-[14.5px] font-bold text-mint-ink">
              = 명사를 대신하는 말 <span className="font-medium text-ink-2">(</span>
              <En en="I, you, he, it" className="font-medium text-ink" />
              <span className="font-medium text-ink-2">)</span>
            </p>
          </div>
        </div>
      </div>
      <div>
        <p className="text-[13.5px] font-extrabold text-ink-3">처음 보는 용어도 조각을 맞추면 읽혀요</p>
        <div role="list" className="mt-2 grid gap-2">
          {IN_DECODE.map((d) => (
            <div role="listitem" key={d.term} className="rounded-2xl border border-line px-4 py-3">
              <p className="text-[15px] font-extrabold">{d.term}</p>
              <p className="mt-1.5 flex flex-wrap items-center gap-2">
                {d.pieces.map((p, i) => (
                  <span key={p.c} className="inline-flex items-center gap-2">
                    {i > 0 && <span className="text-ink-3">+</span>}
                    <InPiece c={p.c} m={p.m} tone={p.tone} />
                  </span>
                ))}
              </p>
              <p className="mt-2 flex items-center gap-2">
                <span className="text-ink-3">=</span>
                <span className="rounded-xl bg-chip px-3 py-2 text-[14.5px] font-bold">
                  {d.result}
                  {d.en && (
                    <>
                      {" "}
                      <span className="text-ink-2">(</span>
                      <En en={d.en} className="font-medium" />
                      <span className="text-ink-2">)</span>
                    </>
                  )}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ───────── 2. 모양이 바뀌는 건 왕뿐 ───────── */

type InCell = { en: string; king?: boolean; mask?: boolean; add?: string };

const IN_KING_ROWS: { label: string; cells: InCell[] }[] = [
  {
    label: "지금 · 주어 I",
    cells: [{ en: "I" }, { en: "love", king: true, add: "기본 모양" }, { en: "to draw.", mask: true }],
  },
  {
    label: "주어가 she",
    cells: [{ en: "She" }, { en: "loves", king: true, add: "+ s" }, { en: "to draw.", mask: true }],
  },
  {
    label: "지난 일 (과거)",
    cells: [{ en: "They" }, { en: "loved", king: true, add: "과거형" }, { en: "to draw.", mask: true }],
  },
];

function InKingCell({ c }: { c: InCell }) {
  if (c.king)
    return (
      <span className="inline-flex flex-col items-center gap-1">
        <span className="inline-flex min-w-[6.5rem] items-center justify-center gap-1.5 rounded-xl bg-coral px-3 py-1.5 text-[1.1em] font-medium text-white">
          <CrownIcon size={18} />
          <En en={c.en} />
        </span>
        <span className="text-[13.5px] font-extrabold text-coral-ink">{c.add}</span>
      </span>
    );
  if (c.mask)
    return (
      <span className="inline-flex flex-col items-center gap-1">
        <span className="inline-flex items-center gap-1.5 rounded-xl bg-amber-soft px-3 py-1.5 text-[1.1em] font-medium text-amber-ink">
          <MaskIcon size={18} />
          <En en={c.en} />
        </span>
        <span className="text-[13.5px] font-extrabold text-amber-ink">늘 그대로</span>
      </span>
    );
  return (
    <span className="inline-flex flex-col items-center gap-1">
      <span className="min-w-[4.75rem] rounded-xl border border-line px-3 py-1.5 text-center text-[1.1em] font-medium">
        <En en={c.en} />
      </span>
      <span className="text-[13.5px]" aria-hidden>
        &nbsp;
      </span>
    </span>
  );
}

/** 주어와 시제가 바뀌면 진짜 동사(왕)만 모양이 바뀌고, 변장한 to draw는 그대로다 */
export function InKingChanges() {
  return (
    <div>
      <div role="list" className="grid gap-2">
        {IN_KING_ROWS.map((r) => (
          <div role="listitem" key={r.label} className="flex flex-col gap-2 rounded-2xl border border-line px-4 py-3 sm:flex-row sm:items-center sm:gap-4">
            <span className="w-fit shrink-0 rounded-lg bg-chip px-2.5 py-1 text-[13.5px] font-extrabold sm:w-32">{r.label}</span>
            <span className="flex flex-wrap items-start gap-2">
              {r.cells.map((c, i) => (
                <InKingCell key={i} c={c} />
              ))}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-3 grid gap-2 text-[13.5px] sm:grid-cols-2">
        <p className="rounded-xl bg-coral-soft px-3 py-2 text-coral-ink">
          <b>진짜 동사(왕)</b>: 주어와 시제에 맞춰 옷을 갈아입어요.
        </p>
        <p className="rounded-xl bg-amber-soft px-3 py-2 text-amber-ink">
          <b>변장한 동사</b>: 모양이 정해지지 않고 늘 그대로라서 &lsquo;부정사&rsquo;예요.
        </p>
      </div>
    </div>
  );
}
