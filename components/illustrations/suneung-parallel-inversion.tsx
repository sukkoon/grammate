import { En } from "@/components/lesson/En";
import { ArrowRight } from "./icons";

/* 수능 어법 종합 그림 (병렬·대동사·도치): 대동사는 앞 동사의 종류가 정한다, 도치 문장의 동사는 뒤의 주어와 짝 */

/* ───────── 1. 대동사: 앞 동사의 종류가 받는 말을 정해요 ───────── */

const PRO_ROWS: { kind: string; take: string; en: string; bad?: string }[] = [
  { kind: "일반동사 · 현재", take: "do / does", en: "My cat sleeps more than my dog [[does]].", bad: "is ✕ · do ✕ (주어 my dog는 단수)" },
  { kind: "일반동사 · 과거", take: "did", en: "We arrived earlier than the teacher [[did]].", bad: "was ✕" },
  { kind: "be동사", take: "am · is · are · was · were", en: "Jisu is more careful than her brother [[is]].", bad: "does ✕" },
  { kind: "조동사", take: "같은 조동사", en: "I can't whistle, but my sister [[can]]." },
  { kind: "완료의 have", take: "have / has / had", en: "She has read more books than I [[have]].", bad: "do ✕" },
];

/** 대동사는 앞 동사의 종류로 고르고, 시제와 대동사 자리의 주어 수로 모양을 맞춰요 */
export function SnPiProVerbMirror() {
  return (
    <div>
      <ul className="grid gap-2">
        {PRO_ROWS.map((r) => (
          <li key={r.kind} className="grid gap-1.5 rounded-2xl border border-line px-4 py-2.5 sm:grid-cols-[9rem_1fr] sm:items-center sm:gap-3">
            <p className="flex flex-wrap items-center gap-1.5 sm:flex-col sm:items-start">
              <span className="text-[14px] font-extrabold">{r.kind}</span>
              <span className="inline-flex items-center gap-1 rounded-lg bg-mint-soft px-2 py-0.5 text-[14px] font-extrabold text-mint-ink">
                <ArrowRight size={14} />
                <span lang="en">{r.take}</span>
              </span>
            </p>
            <div>
              <p className="text-[1.02em] font-medium">
                <En en={r.en} />
              </p>
              {r.bad && (
                <p lang="en" className="text-[14px] font-bold text-coral-ink">
                  {r.bad}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-3 flex flex-wrap items-center justify-center gap-2 text-[14px] font-bold">
        <span className="rounded-lg bg-chip px-2 py-1">① 앞 동사의 종류</span>
        <ArrowRight size={14} className="text-ink-3" />
        <span className="rounded-lg bg-chip px-2 py-1">② 시제</span>
        <ArrowRight size={14} className="text-ink-3" />
        <span className="rounded-lg bg-chip px-2 py-1">③ 대동사 자리의 주어 수</span>
      </p>
    </div>
  );
}

/* ───────── 2. 도치 문장: 동사는 뒤로 간 주어와 짝 ───────── */

type Piece = { en: string; k: "front" | "verb" | "subj" | "rest" };

const PIECE_STYLE: Record<Piece["k"], string> = {
  front: "bg-amber-soft text-amber-ink",
  verb: "bg-coral text-white font-extrabold",
  subj: "bg-sky-soft text-sky-ink font-extrabold",
  rest: "border border-line",
};

const AGREE_ROWS: { key: string; pieces: Piece[]; trap?: string; note: string }[] = [
  {
    key: "hill",
    pieces: [
      { en: "On the hill", k: "front" },
      { en: "stands", k: "verb" },
      { en: "a small church.", k: "subj" },
    ],
    trap: "hill",
    note: "주어는 a small church (단수) → stands",
  },
  {
    key: "guests",
    pieces: [
      { en: "Among the guests", k: "front" },
      { en: "were", k: "verb" },
      { en: "two famous singers.", k: "subj" },
    ],
    trap: "guests",
    note: "주어는 two famous singers (복수) → were",
  },
  {
    key: "sleep",
    pieces: [
      { en: "{So|부사:너무, 매우} important", k: "front" },
      { en: "is", k: "verb" },
      { en: "sleep", k: "subj" },
      { en: "{that|접속사:(so ~ that) 그래서} athletes plan it carefully.", k: "rest" },
    ],
    note: "보어가 앞으로 나왔어요. 주어는 sleep (단수) → is",
  },
];

/** 앞으로 나온 부사구·보어 속 명사는 주어가 아니에요. 동사 뒤의 주어에 수를 맞춰요 */
export function SnPiInversionAgree() {
  return (
    <div>
      <ul className="grid gap-2.5">
        {AGREE_ROWS.map((r) => (
          <li key={r.key} className="rounded-2xl border border-line px-4 py-3">
            <p className="flex flex-wrap items-center gap-1.5 text-[1.03em]">
              {r.pieces.map((p) => (
                <span key={p.en} className={`inline-flex items-center rounded-lg px-2.5 py-1 font-bold ${PIECE_STYLE[p.k]}`}>
                  <En en={p.en} />
                </span>
              ))}
            </p>
            <p className="mt-1.5 text-[14px] font-bold text-ink-2">
              {r.trap && (
                <span className="mr-2 text-coral-ink">
                  앞의 <span lang="en">{r.trap}</span>에 속지 마세요.
                </span>
              )}
              {r.note}
            </p>
          </li>
        ))}
      </ul>
      <p className="mt-3 flex flex-wrap items-center justify-center gap-2 text-[14px] font-bold">
        <span className="rounded-lg bg-amber-soft px-2 py-1 text-amber-ink">앞으로 나온 말</span>
        <span className="rounded-lg bg-coral px-2 py-1 text-white">동사</span>
        <span aria-hidden>↔</span>
        <span className="rounded-lg bg-sky-soft px-2 py-1 text-sky-ink">뒤로 간 진짜 주어</span>
      </p>
    </div>
  );
}
