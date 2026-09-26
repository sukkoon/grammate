import { En } from "@/components/lesson/En";
import { ArrowRight } from "./icons";

/* 수능 어법: 목적격보어와 자동사·타동사 그림. 목적어로 건너가는 다리(자동사·타동사), 모양이 닮은 자동사·타동사 짝 */

/* ───────── 공통 도우미 ───────── */

function SnCtMark({ ok }: { ok: boolean }) {
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

type Piece = { en: string; k: "subj" | "verb" | "prep" | "obj" | "bad" };

const PIECE_STYLE: Record<Piece["k"], string> = {
  subj: "border border-line",
  verb: "bg-coral text-white",
  prep: "bg-amber-soft text-amber-ink",
  obj: "bg-mint-soft text-mint-ink",
  bad: "border-2 border-dashed border-coral text-coral-ink line-through decoration-coral",
};

function SnCtPiece({ p }: { p: Piece }) {
  return (
    <span lang="en" className={`rounded-xl px-2.5 py-1 text-[15px] font-bold ${PIECE_STYLE[p.k]}`}>
      <En en={p.en} />
    </span>
  );
}

/* ───────── 1. 목적어로 건너가는 다리 ───────── */

const BRIDGE_ROWS: { title: string; ok: boolean; pieces: Piece[]; note: string }[] = [
  {
    title: "타동사",
    ok: true,
    pieces: [
      { en: "We", k: "subj" },
      { en: "discussed", k: "verb" },
      { en: "the plan.", k: "obj" },
    ],
    note: "목적어로 바로 건너가요.",
  },
  {
    title: "자동사 + 전치사",
    ok: true,
    pieces: [
      { en: "We", k: "subj" },
      { en: "listened", k: "verb" },
      { en: "to", k: "prep" },
      { en: "the song.", k: "obj" },
    ],
    note: "전치사가 다리가 되어야 목적어로 건너가요.",
  },
  {
    title: "자동사 혼자",
    ok: true,
    pieces: [
      { en: "The sun", k: "subj" },
      { en: "rose.", k: "verb" },
    ],
    note: "목적어 없이도 문장이 끝나요.",
  },
  {
    title: "타동사 + 전치사",
    ok: false,
    pieces: [
      { en: "We", k: "subj" },
      { en: "discussed", k: "verb" },
      { en: "about", k: "bad" },
      { en: "the plan.", k: "obj" },
    ],
    note: "다리가 필요 없는 곳에 다리를 놓으면 틀려요.",
  },
];

/** 타동사는 목적어로 바로, 자동사는 전치사 다리를 건너서. 타동사에 전치사를 붙이면 틀린다 */
export function SnCtObjectBridge() {
  return (
    <ul className="grid gap-2.5">
      {BRIDGE_ROWS.map((r) => (
        <li
          key={r.title}
          className={`rounded-2xl border-2 px-4 py-3 ${r.ok ? "border-line" : "border-coral-soft"}`}
        >
          <p className="flex items-center gap-2 text-[14.5px] font-extrabold">
            <SnCtMark ok={r.ok} />
            {r.title}
          </p>
          <p className="mt-2 flex flex-wrap items-center gap-1.5">
            {r.pieces.map((p, i) => (
              <span key={p.en + i} className="flex items-center gap-1.5">
                {i > 0 && <ArrowRight size={16} className="text-ink-3" />}
                <SnCtPiece p={p} />
              </span>
            ))}
          </p>
          <p className="mt-2 text-[14px] text-ink-2">{r.note}</p>
        </li>
      ))}
      <li className="flex flex-wrap gap-2 text-[14px]">
        <span className="rounded-lg bg-coral px-2 py-0.5 font-extrabold text-white">동사</span>
        <span className="rounded-lg bg-amber-soft px-2 py-0.5 font-extrabold text-amber-ink">전치사 다리</span>
        <span className="rounded-lg bg-mint-soft px-2 py-0.5 font-extrabold text-mint-ink">목적어</span>
      </li>
    </ul>
  );
}

/* ───────── 2. 모양이 닮은 자동사·타동사 짝 ───────── */

type Side = { word: string; forms: string; ko: string; en: string };

const TWINS: { intr: Side; tr: Side }[] = [
  {
    intr: { word: "lie", forms: "lie – lay – lain (lying)", ko: "눕다, 놓여 있다", en: "The cat [[{lay|동사:누워 있었다 (lie의 과거형)}]] in the sun." },
    tr: { word: "lay", forms: "lay – laid – laid (laying)", ko: "놓다, 눕히다", en: "She [[laid]] her bag on the chair." },
  },
  {
    intr: { word: "rise", forms: "rise – rose – risen", ko: "오르다, (해가) 뜨다", en: "The price [[rose]] again." },
    tr: { word: "raise", forms: "raise – raised – raised", ko: "올리다, 기르다", en: "The shop [[raised]] the price again." },
  },
  {
    intr: { word: "sit", forms: "sit – sat – sat", ko: "앉다", en: "We [[sat]] in the front row." },
    tr: { word: "seat", forms: "seat – seated – seated", ko: "앉히다 (be seated: 앉다)", en: "The teacher [[seated]] us in the front row." },
  },
  {
    intr: { word: "arise", forms: "arise – arose – arisen", ko: "(문제가) 생기다", en: "A new problem [[arose]]." },
    tr: { word: "arouse", forms: "arouse – aroused – aroused", ko: "(감정을) 불러일으키다", en: "The story [[aroused]] our {interest|명사:관심, 흥미}." },
  },
];

function SnCtSide({ s, intr }: { s: Side; intr: boolean }) {
  return (
    <div className={`flex min-w-0 flex-col gap-1 px-3 py-2.5 ${intr ? "border-r border-line" : ""}`}>
      <span className={`w-fit rounded-lg px-2 py-0.5 text-[14px] font-extrabold ${intr ? "bg-sky-soft text-sky-ink" : "bg-coral-soft text-coral-ink"}`}>
        {intr ? "자동사 · 목적어 ✕" : "타동사 · 목적어 ○"}
      </span>
      <p lang="en" className="text-[1.35em] font-extrabold leading-tight">
        {s.word}
      </p>
      <p lang="en" className="text-[14px] font-bold text-ink-2">
        {s.forms}
      </p>
      <p className="text-[14px]">{s.ko}</p>
      <p className="mt-1 text-[15px] font-medium">
        <En en={s.en} />
      </p>
    </div>
  );
}

/** 뒤에 목적어가 있으면 오른쪽(타동사), 없으면 왼쪽(자동사) */
export function SnCtTwinVerbs() {
  return (
    <div>
      <ul className="grid gap-3 sm:grid-cols-2">
        {TWINS.map((t) => (
          <li key={t.intr.word} className="grid grid-cols-2 overflow-hidden rounded-2xl border border-line">
            <SnCtSide s={t.intr} intr />
            <SnCtSide s={t.tr} intr={false} />
          </li>
        ))}
      </ul>
      <p className="mt-3 rounded-2xl bg-chip px-4 py-3 text-[14px]">
        <b lang="en">lay</b>는 두 번 나와요. lie(눕다)의 과거형이기도 하고, 놓다라는 타동사의 현재형이기도 해요. 뒤에 목적어가 있는지 보면 갈려요.
      </p>
    </div>
  );
}
