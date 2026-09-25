import type { ReactNode } from "react";
import { En } from "@/components/lesson/En";

/* 전치사 장 그림: 시간의 점·면·공간, by와 until, 거리 지도, 움직임 화살표, 탈것, 전치사 vs 접속사, 하루 띠, for와 during, 위아래, 전치사 편과 접속사 편, 전치사 뒤 -ing 자리, 둘 다 되는 말 */

/* ───────── 시간: 점 · 면 · 공간 ───────── */

type ShapeKind = "dot" | "face" | "room";

function ShapeMark({ kind }: { kind: ShapeKind }) {
  return (
    <svg viewBox="0 0 24 24" className="size-5 shrink-0" aria-hidden>
      {kind === "dot" && <circle cx="12" cy="12" r="5" fill="currentColor" />}
      {kind === "face" && <path d="M2.5 17 L8.5 7 H21.5 L15.5 17 Z" fill="currentColor" opacity="0.85" />}
      {kind === "room" && (
        <path
          d="M4 8 L12 4 L20 8 V17 L12 21 L4 17 Z M4 8 L12 12 L20 8 M12 12 V21"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}

interface TimeLayer {
  p: string;
  shape: ShapeKind;
  shapeKo: string;
  what: string;
  tone: string;
  ex: { en: string; ko: string }[];
}

const LAYER_IN: TimeLayer = {
  p: "in",
  shape: "room",
  shapeKo: "공간",
  what: "달 · 계절 · 연도 · 하루 중 때",
  tone: "bg-sky-soft text-sky-ink",
  ex: [
    { en: "[[in]] July", ko: "7월에" },
    { en: "[[in]] summer", ko: "여름에" },
    { en: "[[in]] 2025", ko: "2025년에" },
    { en: "[[in]] the morning", ko: "아침에" },
  ],
};

const LAYER_ON: TimeLayer = {
  p: "on",
  shape: "face",
  shapeKo: "면",
  what: "요일 · 날짜 · 특정한 날",
  tone: "bg-mint-soft text-mint-ink",
  ex: [
    { en: "[[on]] Monday", ko: "월요일에" },
    { en: "[[on]] May 5", ko: "5월 5일에" },
    { en: "[[on]] my birthday", ko: "내 생일에" },
  ],
};

const LAYER_AT: TimeLayer = {
  p: "at",
  shape: "dot",
  shapeKo: "점",
  what: "시각 · 한 순간",
  tone: "bg-amber-soft text-amber-ink",
  ex: [
    { en: "[[at]] 7:30", ko: "7시 30분에" },
    { en: "[[at]] noon", ko: "정오에" },
    { en: "[[at]] night", ko: "밤에" },
  ],
};

function TimeLayerBox({ layer, children }: { layer: TimeLayer; children?: ReactNode }) {
  return (
    <div className={`rounded-2xl border border-line px-3 py-3 sm:px-4 ${layer.tone}`}>
      <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <span lang="en" className="text-[1.5em] font-bold leading-none">
          {layer.p}
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-card px-2 py-0.5 text-[14px] font-extrabold">
          <ShapeMark kind={layer.shape} />
          {layer.shapeKo}
        </span>
        <span className="text-[14px] font-bold">{layer.what}</span>
      </p>
      <ul className="mt-2 flex flex-wrap gap-1.5">
        {layer.ex.map((e) => (
          <li key={e.en} className="rounded-lg bg-card px-2 py-1 text-[15px] text-ink">
            <En en={e.en} /> <span className="text-[14px] text-ink-2">{e.ko}</span>
          </li>
        ))}
      </ul>
      {children && <div className="mt-3">{children}</div>}
    </div>
  );
}

/** 시간의 at · on · in: 점은 면 안에, 면은 공간 안에 */
export function PrAtOnIn() {
  return (
    <div>
      <TimeLayerBox layer={LAYER_IN}>
        <TimeLayerBox layer={LAYER_ON}>
          <TimeLayerBox layer={LAYER_AT} />
        </TimeLayerBox>
      </TimeLayerBox>
      <p className="mt-3 flex flex-wrap items-center justify-center gap-2 text-[15px] font-extrabold">
        <span className="rounded-lg bg-amber-soft px-2 py-1 text-amber-ink">점 at</span>
        <span aria-hidden className="text-ink-3">
          →
        </span>
        <span className="rounded-lg bg-mint-soft px-2 py-1 text-mint-ink">면 on</span>
        <span aria-hidden className="text-ink-3">
          →
        </span>
        <span className="rounded-lg bg-sky-soft px-2 py-1 text-sky-ink">공간 in</span>
      </p>
      <p className="mt-1 text-center text-[14px] text-ink-2">좁은 때에서 넓은 때로</p>
    </div>
  );
}

/* ───────── 시간: until(계속) vs by(마감) ───────── */

const axisText = { fill: "var(--ink-2)" } as const;

function TimeBar({ kind }: { kind: "until" | "by" }) {
  return (
    <svg viewBox="0 0 320 70" className="w-full" aria-hidden>
      <path d="M16 44 H300" strokeWidth="2" strokeLinecap="round" style={{ stroke: "var(--ink-3)" }} />
      <path d="M16 36 V52 M256 36 V52" strokeWidth="2.5" strokeLinecap="round" style={{ stroke: "var(--ink-2)" }} />
      {kind === "until" ? (
        <>
          <rect x="16" y="20" width="240" height="14" rx="7" style={{ fill: "var(--coral)" }} />
          <path d="M256 12 V40" strokeWidth="3" strokeLinecap="round" style={{ stroke: "var(--coral-ink)" }} />
        </>
      ) : (
        <>
          <path d="M16 27 H256" strokeWidth="3" strokeDasharray="6 7" strokeLinecap="round" style={{ stroke: "var(--ink-3)" }} />
          <circle cx="150" cy="27" r="13" style={{ fill: "var(--mint-soft)", stroke: "var(--mint-ink)" }} strokeWidth="2.5" />
          <path d="M143 27 L148.5 32.5 L157.5 21.5" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: "var(--mint-ink)" }} />
          <path d="M256 10 V40" strokeWidth="4" strokeLinecap="round" style={{ stroke: "var(--coral)" }} />
        </>
      )}
      <text x="16" y="67" fontSize="16" textAnchor="start" style={axisText}>
        지금
      </text>
      <text x="256" y="67" fontSize="16" textAnchor="middle" style={axisText}>
        5시
      </text>
    </svg>
  );
}

/** until(그때까지 쭉 계속) vs by(늦어도 그때까지 한 번 끝) */
export function PrByUntil() {
  const rows: { kind: "until" | "by"; title: string; how: string; en: string; ko: string }[] = [
    {
      kind: "until",
      title: "until · 5시까지 쭉 계속",
      how: "wait, stay, sleep처럼 계속하는 동작",
      en: "I'll wait here [[until]] five.",
      ko: "5시까지 (계속) 여기서 기다릴게.",
    },
    {
      kind: "by",
      title: "by · 늦어도 5시까지 한 번 끝",
      how: "finish, return, hand in처럼 끝내는 동작",
      en: "Finish your homework [[{by|전치사:~까지 (늦어도)}]] five.",
      ko: "늦어도 5시까지 숙제를 끝내.",
    },
  ];
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {rows.map((r) => (
        <div key={r.kind} className="rounded-2xl border border-line px-4 py-3">
          <p className="font-extrabold">{r.title}</p>
          <p className="text-[14px] text-ink-2">{r.how}</p>
          <div className="mt-2">
            <TimeBar kind={r.kind} />
          </div>
          <p className="mt-2 text-[1.05em] font-medium">
            <En en={r.en} />
          </p>
          <p className="text-[14px] text-ink-2">{r.ko}</p>
        </div>
      ))}
    </div>
  );
}

/* ───────── 장소: 거리 지도 ───────── */

function Building({ en, ko, focus = false }: { en: string; ko: string; focus?: boolean }) {
  return (
    <div
      className={`rounded-xl border-2 px-1 py-2 text-center ${focus ? "border-coral bg-coral-soft" : "border-line bg-card"}`}
    >
      <svg viewBox="0 0 40 28" className="mx-auto h-7 w-10" aria-hidden>
        <path d="M4 12 L20 3 L36 12 Z" style={{ fill: focus ? "var(--coral)" : "var(--ink-3)" }} />
        <rect x="7" y="12" width="26" height="15" rx="1.5" style={{ fill: "var(--chip)", stroke: "var(--ink-2)" }} strokeWidth="1.8" />
        <rect x="17" y="18" width="6" height="9" style={{ fill: "var(--ink-2)" }} />
      </svg>
      <p className="text-[14px] font-extrabold">{ko}</p>
      <p className="text-[15px]">
        <En en={en} />
      </p>
    </div>
  );
}

function TreeMark() {
  return (
    <svg viewBox="0 0 40 40" className="size-10" aria-hidden>
      <rect x="17" y="24" width="6" height="14" rx="1.5" style={{ fill: "var(--amber-ink)" }} />
      <circle cx="20" cy="17" r="13" style={{ fill: "var(--mint-soft)", stroke: "var(--mint-ink)" }} strokeWidth="2.5" />
    </svg>
  );
}

const MAP_LINES: { en: string; ko: string }[] = [
  { en: "The bank is [[{next to}]] the bakery.", ko: "은행은 빵집 옆에 있어요." },
  { en: "The bakery is [[between]] the bank [[and]] the library.", ko: "빵집은 은행과 도서관 사이에 있어요." },
  { en: "The park is [[{across from}]] the bakery.", ko: "공원은 빵집 건너편에 있어요." },
  { en: "There is a tree [[{in front of}]] the library.", ko: "도서관 앞에 나무가 있어요." },
];

/** 거리 지도: next to, between A and B, across from, in front of */
export function PrStreetMap() {
  return (
    <div>
      <div className="mx-auto max-w-md">
        <div className="grid grid-cols-3 gap-2">
          <Building en="bank" ko="은행" />
          <Building en="bakery" ko="빵집" focus />
          <Building en="library" ko="도서관" />
          <span />
          <span />
          <span className="flex justify-center" role="img" aria-label="도서관 앞의 나무">
            <TreeMark />
          </span>
        </div>
        <div className="relative my-2 flex h-11 items-center justify-center rounded-lg bg-chip" aria-hidden>
          <span className="absolute inset-x-3 top-1/2 border-t-2 border-dashed border-ink-3/60" />
          <span className="relative rounded-md bg-chip px-2 text-[14px] font-bold text-ink-2">길</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <span />
          <Building en="park" ko="공원" />
          <span />
        </div>
      </div>
      <ul className="mt-4 space-y-1.5">
        {MAP_LINES.map((l) => (
          <li key={l.en} className="rounded-xl bg-chip px-3 py-2">
            <span className="text-[1.05em] font-medium">
              <En en={l.en} />
            </span>
            <span className="block text-[14px] text-ink-2">{l.ko}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ───────── 방향: 움직임 화살표 ───────── */

const arrow = { stroke: "var(--coral)", strokeWidth: 3.5, fill: "none", strokeLinecap: "round", strokeLinejoin: "round" } as const;
const dashed = { stroke: "var(--coral)", strokeWidth: 3.5, fill: "none", strokeLinecap: "round", strokeDasharray: "5 7" } as const;
const thing = { stroke: "var(--ink-2)", strokeWidth: 2.5, fill: "none", strokeLinecap: "round", strokeLinejoin: "round" } as const;
const thingFill = { fill: "var(--chip)", stroke: "var(--ink-2)", strokeWidth: 2.5, strokeLinejoin: "round" } as const;
const plainFill = { fill: "var(--chip)" } as const;

const ROAD = (
  <>
    <rect x="0" y="24" width="120" height="34" style={plainFill} />
    <path d="M0 24 H120 M0 58 H120" style={thing} />
  </>
);

const MOVES: { en: string; ko: string; draw: ReactNode }[] = [
  {
    en: "into",
    ko: "~ 안으로",
    draw: (
      <>
        <path d="M60 30 V68 H108 V30 Z" style={plainFill} />
        <path d="M60 30 V68 H108 V30" style={thing} />
        <path d="M12 62 C 22 8, 80 0, 84 46" style={arrow} />
        <path d="M77 40 L84 48 L91 40" style={arrow} />
      </>
    ),
  },
  {
    en: "{out of}",
    ko: "~ 밖으로",
    draw: (
      <>
        <path d="M12 30 V68 H60 V30 Z" style={plainFill} />
        <path d="M12 30 V68 H60 V30" style={thing} />
        <path d="M36 58 C 36 4, 100 4, 104 50" style={arrow} />
        <path d="M97 43 L104 52 L111 43" style={arrow} />
      </>
    ),
  },
  {
    en: "onto",
    ko: "~ 위로 (올라가 닿게)",
    draw: (
      <>
        <path d="M4 70 H116" style={thing} />
        <rect x="62" y="46" width="46" height="24" rx="3" style={thingFill} />
        <path d="M14 66 C 18 8, 82 4, 85 40" style={arrow} />
        <path d="M78 33 L85 42 L92 33" style={arrow} />
      </>
    ),
  },
  {
    en: "through",
    ko: "~을 뚫고 지나",
    draw: (
      <>
        <path d="M20 68 C 32 12, 88 12, 100 68 Z" style={thingFill} />
        <path d="M4 54 H24" style={arrow} />
        <path d="M30 54 H92" style={dashed} />
        <path d="M98 54 H112" style={arrow} />
        <path d="M105 47 L113 54 L105 61" style={arrow} />
      </>
    ),
  },
  {
    en: "across",
    ko: "~을 가로질러 건너",
    draw: (
      <>
        {ROAD}
        <path d="M0 41 H120" strokeWidth="2" strokeDasharray="8 8" style={{ stroke: "var(--ink-3)" }} />
        <path d="M60 76 V9" style={arrow} />
        <path d="M53 16 L60 8 L67 16" style={arrow} />
      </>
    ),
  },
  {
    en: "along",
    ko: "~을 따라서",
    draw: (
      <>
        {ROAD}
        <path d="M8 41 H108" style={arrow} />
        <path d="M101 34 L109 41 L101 48" style={arrow} />
      </>
    ),
  },
  {
    en: "{up|전치사:~ 위로}",
    ko: "~ 위로 (올라)",
    draw: (
      <>
        <path d="M8 70 H32 V56 H56 V42 H80 V28 H112 V70 Z" style={plainFill} />
        <path d="M8 70 H32 V56 H56 V42 H80 V28 H112" style={thing} />
        <path d="M14 54 L92 12" style={arrow} />
        <path d="M79.5 11.9 L92 12 L85.2 22.5" style={arrow} />
      </>
    ),
  },
  {
    en: "{down|전치사:~ 아래로}",
    ko: "~ 아래로 (내려)",
    draw: (
      <>
        <path d="M8 28 H40 V42 H64 V56 H88 V70 H8 Z" style={plainFill} />
        <path d="M8 28 H40 V42 H64 V56 H88 V70 H112" style={thing} />
        <path d="M28 12 L106 54" style={arrow} />
        <path d="M93.5 54.1 L106 54 L99.1 43.6" style={arrow} />
      </>
    ),
  },
  {
    en: "toward",
    ko: "~ 쪽으로 (향해)",
    draw: (
      <>
        <path d="M86 46 L101 33 L116 46 V68 H86 Z" style={thingFill} />
        <path d="M6 54 H60" style={arrow} />
        <path d="M53 47 L61 54 L53 61" style={arrow} />
        <path d="M68 54 H80" strokeWidth="2.5" strokeDasharray="3 5" strokeLinecap="round" style={{ stroke: "var(--ink-3)" }} />
      </>
    ),
  },
  {
    en: "from … to",
    ko: "~에서 ~까지",
    draw: (
      <>
        <circle cx="14" cy="44" r="8" style={{ fill: "var(--ink-2)" }} />
        <circle cx="104" cy="44" r="9" strokeWidth="3" style={{ fill: "var(--coral-soft)", stroke: "var(--coral)" }} />
        <path d="M26 44 H86" style={arrow} />
        <path d="M79 37 L87 44 L79 51" style={arrow} />
      </>
    ),
  },
];

/** 방향 전치사: 기준 물건(회색)과 움직임 화살표 */
export function PrMoves() {
  return (
    <ul className="grid grid-cols-2 gap-2 sm:grid-cols-5">
      {MOVES.map((m) => (
        <li key={m.en} className="rounded-2xl border border-line px-2 pb-3 pt-2 text-center">
          <svg viewBox="0 0 120 80" className="mx-auto w-full max-w-[150px]" aria-hidden>
            {m.draw}
          </svg>
          <p className="mt-1 text-[1.15em] font-bold">
            <En en={m.en} />
          </p>
          <p className="text-[14px] text-ink-2">{m.ko}</p>
        </li>
      ))}
    </ul>
  );
}

/* ───────── 탈것: on the bus vs in a car ───────── */

function BusDrawing() {
  return (
    <svg viewBox="0 0 160 84" className="mx-auto w-full max-w-[200px]" aria-hidden>
      <rect x="6" y="8" width="148" height="58" rx="10" strokeWidth="2.5" style={{ fill: "var(--sky-soft)", stroke: "var(--sky-ink)" }} />
      {[16, 50, 84].map((x) => (
        <rect key={x} x={x} y="16" width="28" height="20" rx="3" style={{ fill: "var(--card)" }} />
      ))}
      <rect x="120" y="16" width="24" height="42" rx="3" style={{ fill: "var(--card)" }} />
      <circle cx="132" cy="26" r="5" style={{ fill: "var(--coral)" }} />
      <path d="M132 31 V47 M132 47 L127 57 M132 47 L137 57 M126 38 H138" strokeWidth="3" strokeLinecap="round" style={{ stroke: "var(--coral)" }} />
      <circle cx="36" cy="68" r="9" style={{ fill: "var(--ink-2)" }} />
      <circle cx="120" cy="68" r="9" style={{ fill: "var(--ink-2)" }} />
    </svg>
  );
}

function CarDrawing() {
  return (
    <svg viewBox="0 0 140 76" className="mx-auto w-full max-w-[180px]" aria-hidden>
      <path
        d="M10 56 V44 Q12 38 22 36 L42 20 H94 L114 36 Q128 38 130 44 V56 Z"
        strokeWidth="2.5"
        strokeLinejoin="round"
        style={{ fill: "var(--mint-soft)", stroke: "var(--mint-ink)" }}
      />
      <path d="M48 25 H66 V36 H35 Z" style={{ fill: "var(--card)" }} />
      <path d="M72 25 H91 L104 36 H72 Z" style={{ fill: "var(--card)" }} />
      <circle cx="56" cy="31" r="4.5" style={{ fill: "var(--coral)" }} />
      <circle cx="36" cy="58" r="9" style={{ fill: "var(--ink-2)" }} />
      <circle cx="106" cy="58" r="9" style={{ fill: "var(--ink-2)" }} />
    </svg>
  );
}

interface Ride {
  p: string;
  how: string;
  drawing: ReactNode;
  list: { en: string }[];
  getOnOff: { en: string };
}

const RIDES: Ride[] = [
  {
    p: "on",
    how: "서서 걸어 다닐 수 있는 큰 탈것, 올라타는 탈것",
    drawing: <BusDrawing />,
    list: [{ en: "on the bus" }, { en: "on the train" }, { en: "on the subway" }, { en: "on a plane" }, { en: "on my bike" }],
    getOnOff: { en: "{get on} / {get off} the bus" },
  },
  {
    p: "in",
    how: "몸을 굽혀 들어가 앉는 작은 탈것",
    drawing: <CarDrawing />,
    list: [{ en: "in a car" }, { en: "in a taxi" }],
    getOnOff: { en: "{get in} / {get out of} the car" },
  },
];

function RideCard({ ride }: { ride: Ride }) {
  return (
    <div className="rounded-2xl border border-line px-4 py-4">
      <p className="flex items-baseline gap-2">
        <span lang="en" className="text-[1.5em] font-bold leading-none">
          {ride.p}
        </span>
        <span className="text-[14px] font-bold text-ink-2">{ride.how}</span>
      </p>
      <div className="mt-3">{ride.drawing}</div>
      <ul className="mt-3 flex flex-wrap gap-1.5">
        {ride.list.map((r) => (
          <li key={r.en} className="rounded-lg bg-chip px-2 py-1 text-[15px]">
            <En en={r.en} />
          </li>
        ))}
      </ul>
      <p className="mt-2 text-[14px] text-ink-2">
        타고 내리기: <En en={ride.getOnOff.en} />
      </p>
    </div>
  );
}

/** 탈것의 on과 in: 서서 걸을 수 있는 큰 탈것 vs 몸을 굽혀 앉는 작은 탈것 */
export function PrRide() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {RIDES.map((r) => (
        <RideCard key={r.p} ride={r} />
      ))}
    </div>
  );
}

/* ───────── 전치사 + 명사구 vs 접속사 + 절 ───────── */

type TokTag = "v" | "prep" | "conj" | "np" | "s";

const TAG_STYLE: Record<TokTag, string> = {
  v: "bg-coral text-white",
  prep: "bg-chip text-ink ring-1 ring-ink-3",
  conj: "bg-sky-soft text-sky-ink",
  np: "bg-mint-soft text-mint-ink",
  s: "bg-amber-soft text-amber-ink",
};

const TAG_LABEL_STYLE: Record<TokTag, string> = {
  v: "text-coral-ink",
  prep: "text-ink-2",
  conj: "text-sky-ink",
  np: "text-mint-ink",
  s: "text-amber-ink",
};

interface Tok {
  en: string;
  /** 색칠한 칸에 보일 글자 (진짜 동사는 뜻 풍선 없이 글자만) */
  label?: string;
  tag?: TokTag;
  sub?: string;
}

const PHRASE_ROW: Tok[] = [
  { en: "I" },
  { en: "{fell asleep}", label: "fell asleep", tag: "v", sub: "동사 1" },
  { en: "during", tag: "prep", sub: "전치사" },
  { en: "the movie", tag: "np", sub: "명사구" },
  { en: "." },
];

const CLAUSE_ROW: Tok[] = [
  { en: "I" },
  { en: "{fell asleep}", label: "fell asleep", tag: "v", sub: "동사 1" },
  { en: "while", tag: "conj", sub: "접속사" },
  { en: "I", tag: "s", sub: "주어" },
  { en: "was watching", label: "was watching", tag: "v", sub: "동사 2" },
  { en: "the movie." },
];

function TokChip({ t }: { t: Tok }) {
  if (!t.tag)
    return (
      <span className="self-start pt-1">
        <En en={t.en} />
      </span>
    );
  return (
    <span className="inline-flex flex-col items-center gap-1">
      <span className={`rounded-lg px-2 py-1 ${TAG_STYLE[t.tag]}`}>{t.label ?? <En en={t.en} />}</span>
      <span className={`text-[14px] font-extrabold ${TAG_LABEL_STYLE[t.tag]}`}>{t.sub}</span>
    </span>
  );
}

function ClauseRow({ title, row, formula, note }: { title: string; row: Tok[]; formula: string; note: string }) {
  return (
    <div className="rounded-2xl border border-line px-4 py-4">
      <p className="text-[14px] font-extrabold text-ink-2">{title}</p>
      <p lang="en" className="mt-3 flex flex-wrap items-start gap-x-2 gap-y-3 text-[1.2em] font-medium">
        {row.map((t, i) => (
          <TokChip key={i} t={t} />
        ))}
      </p>
      <p className="mt-3 w-fit rounded-lg bg-chip px-2.5 py-1 text-[14px] font-extrabold">{formula}</p>
      <p className="mt-1.5 text-[14px] text-ink-2">{note}</p>
    </div>
  );
}

/** 전치사 + 명사(구)는 동사를 늘리지 않고, 접속사 + 절은 동사를 하나 늘린다 */
export function PrClauseOrPhrase() {
  return (
    <div className="grid gap-3">
      <ClauseRow
        title="전치사 + 명사(구)"
        row={PHRASE_ROW}
        formula="진짜 동사 1개 = 접속사 0개 + 1"
        note="during 뒤에는 명사구만 있어요. 동사가 늘지 않아요."
      />
      <ClauseRow
        title="접속사 + 주어 + 동사 (절)"
        row={CLAUSE_ROW}
        formula="진짜 동사 2개 = 접속사 1개 + 1"
        note="while 뒤에 주어 I와 동사 was watching이 있어요. 접속사가 동사 자리를 하나 더 열어 줘요."
      />
    </div>
  );
}

/* ───────── 시간: 하루 띠 (긴 때는 in the, 한 순간은 at) ───────── */

const DAY_BLOCKS: { x: number; w: number; ko: string; at: boolean }[] = [
  { x: 10, w: 80, ko: "밤", at: true },
  { x: 90, w: 80, ko: "아침", at: false },
  { x: 170, w: 80, ko: "오후", at: false },
  { x: 250, w: 40, ko: "저녁", at: false },
  { x: 290, w: 40, ko: "밤", at: true },
];

const DAY_HOURS: { x: number; t: string; anchor: "start" | "middle" | "end" }[] = [
  { x: 10, t: "0시", anchor: "start" },
  { x: 90, t: "6시", anchor: "middle" },
  { x: 170, t: "12시", anchor: "middle" },
  { x: 250, t: "18시", anchor: "middle" },
  { x: 330, t: "24시", anchor: "end" },
];

const DAY_IN: { en: string; ko: string }[] = [
  { en: "[[in the]] morning", ko: "아침에" },
  { en: "[[in the]] afternoon", ko: "오후에" },
  { en: "[[in the]] evening", ko: "저녁에" },
];

const DAY_AT: { en: string; ko: string }[] = [
  { en: "[[at]] noon", ko: "정오에" },
  { en: "[[at]] night", ko: "밤에" },
  { en: "[[at]] midnight", ko: "자정에" },
];

function DayChipBox({ title, tone, items }: { title: string; tone: string; items: { en: string; ko: string }[] }) {
  return (
    <div className={`rounded-2xl px-3 py-2.5 ${tone}`}>
      <p className="text-[14px] font-extrabold">{title}</p>
      <ul className="mt-1.5 flex flex-wrap gap-1.5">
        {items.map((e) => (
          <li key={e.en} className="rounded-lg bg-card px-2 py-1 text-[15px] text-ink">
            <En en={e.en} /> <span className="text-[14px] text-ink-2">{e.ko}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** 하루를 띠로 펼치면: 몇 시간씩 이어지는 아침·오후·저녁은 in the, 정오·자정 같은 한 순간과 밤은 at */
export function PrDayStrip() {
  return (
    <div>
      <svg viewBox="0 0 340 100" className="w-full" role="img" aria-label="하루를 띠로 그린 그림. 아침, 오후, 저녁은 긴 구간이고 정오와 자정은 한 점이에요.">
        <text x="170" y="17" fontSize="16" fontWeight="800" textAnchor="middle" style={{ fill: "var(--amber-ink)" }}>
          정오
        </text>
        <text x="10" y="17" fontSize="16" fontWeight="800" textAnchor="start" style={{ fill: "var(--amber-ink)" }}>
          자정
        </text>
        <text x="330" y="17" fontSize="16" fontWeight="800" textAnchor="end" style={{ fill: "var(--amber-ink)" }}>
          자정
        </text>
        {DAY_BLOCKS.map((b) => (
          <g key={b.x}>
            <rect
              x={b.x}
              y="34"
              width={b.w}
              height="32"
              strokeWidth="2"
              style={{ fill: b.at ? "var(--amber-soft)" : "var(--sky-soft)", stroke: "var(--card)" }}
            />
            <text
              x={b.x + b.w / 2}
              y="56"
              fontSize="16"
              fontWeight="700"
              textAnchor="middle"
              style={{ fill: b.at ? "var(--amber-ink)" : "var(--sky-ink)" }}
            >
              {b.ko}
            </text>
          </g>
        ))}
        {[16, 170, 324].map((x) => (
          <circle key={x} cx={x} cy="34" r="6" strokeWidth="2.5" style={{ fill: "var(--amber-ink)", stroke: "var(--card)" }} />
        ))}
        {DAY_HOURS.map((h) => (
          <text key={h.t} x={h.x} y="90" fontSize="15" textAnchor={h.anchor} style={{ fill: "var(--ink-3)" }}>
            {h.t}
          </text>
        ))}
      </svg>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <DayChipBox title="몇 시간씩 이어지는 때 → in the" tone="bg-sky-soft text-sky-ink" items={DAY_IN} />
        <DayChipBox title="한 순간, 그리고 밤 → at" tone="bg-amber-soft text-amber-ink" items={DAY_AT} />
      </div>
    </div>
  );
}

/* ───────── 시간: for(숫자 길이) vs during(이름 붙은 기간) ───────── */

function ForBar() {
  return (
    <svg viewBox="0 0 300 76" className="w-full" aria-hidden>
      <path d="M10 64 H290" strokeWidth="2" strokeLinecap="round" style={{ stroke: "var(--ink-3)" }} />
      <rect x="70" y="42" width="160" height="14" rx="7" style={{ fill: "var(--coral)" }} />
      <path d="M70 34 V26 H230 V34" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: "var(--ink-2)" }} />
      <text x="150" y="19" fontSize="17" fontWeight="800" textAnchor="middle" style={{ fill: "var(--ink)" }}>
        2시간
      </text>
    </svg>
  );
}

function DuringBar() {
  return (
    <svg viewBox="0 0 300 76" className="w-full" aria-hidden>
      <path d="M10 64 H290" strokeWidth="2" strokeLinecap="round" style={{ stroke: "var(--ink-3)" }} />
      <rect x="40" y="6" width="220" height="54" rx="10" strokeWidth="2.5" style={{ fill: "var(--sky-soft)", stroke: "var(--sky-ink)" }} />
      <text x="150" y="29" fontSize="17" fontWeight="800" textAnchor="middle" style={{ fill: "var(--sky-ink)" }}>
        겨울 방학
      </text>
      <rect x="96" y="40" width="108" height="12" rx="6" style={{ fill: "var(--coral)" }} />
    </svg>
  );
}

const FOR_DURING: { key: string; title: string; q: string; bar: ReactNode; en: string; ko: string; after: { en: string }[] }[] = [
  {
    key: "for",
    title: "for + 숫자로 잰 길이",
    q: "얼마 동안?",
    bar: <ForBar />,
    en: "We played badminton [[for]] two hours.",
    ko: "우리는 두 시간 동안 배드민턴을 쳤어.",
    after: [{ en: "two hours" }, { en: "three days" }, { en: "a week" }],
  },
  {
    key: "during",
    title: "during + 이름이 붙은 기간",
    q: "언제?",
    bar: <DuringBar />,
    en: "I {read|동사:읽었다 (read의 과거형)} ten books [[during]] the winter vacation.",
    ko: "나는 겨울 방학 동안 책을 열 권 읽었어.",
    after: [{ en: "the vacation" }, { en: "the movie" }, { en: "class" }],
  },
];

/** for는 자로 잰 길이, during은 이름표가 붙은 기간 상자 */
export function PrForDuring() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {FOR_DURING.map((r) => (
        <div key={r.key} className="rounded-2xl border border-line px-4 py-3">
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="font-extrabold">{r.title}</span>
            <span className="rounded-full bg-chip px-2 py-0.5 text-[14px] font-bold text-ink-2">{r.q}</span>
          </p>
          <div className="mt-2">{r.bar}</div>
          <p className="mt-1 text-[1.05em] font-medium">
            <En en={r.en} />
          </p>
          <p className="text-[14px] text-ink-2">{r.ko}</p>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {r.after.map((a) => (
              <li key={a.en} className="rounded-lg bg-chip px-2 py-0.5 text-[15px]">
                <En en={a.en} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/* ───────── 장소: on · over · under · above · below ───────── */

const TABLE_TOP = (
  <>
    <rect x="18" y="46" width="84" height="8" rx="2" style={thingFill} />
    <path d="M28 54 V76 M92 54 V76" style={thing} />
  </>
);

const HEIGHTS: { en: string; ko: string; pair: string; draw: ReactNode }[] = [
  {
    en: "on",
    ko: "닿아서 위에",
    pair: "표면에 닿음",
    draw: (
      <>
        {TABLE_TOP}
        <rect x="50" y="26" width="20" height="20" rx="3" style={{ fill: "var(--coral)" }} />
      </>
    ),
  },
  {
    en: "over",
    ko: "떠서 바로 위에",
    pair: "짝: under",
    draw: (
      <>
        {TABLE_TOP}
        <path d="M60 0 V12" style={thing} />
        <path d="M44 26 L51 12 H69 L76 26 Z" style={{ fill: "var(--coral)" }} />
        <path d="M60 31 V42" strokeWidth="2" strokeDasharray="3 4" strokeLinecap="round" style={{ stroke: "var(--ink-3)" }} />
      </>
    ),
  },
  {
    en: "under",
    ko: "바로 아래에",
    pair: "짝: over",
    draw: (
      <>
        {TABLE_TOP}
        <circle cx="60" cy="66" r="9" style={{ fill: "var(--coral)" }} />
      </>
    ),
  },
  {
    en: "above",
    ko: "기준보다 더 높이",
    pair: "짝: below",
    draw: (
      <>
        <path d="M8 58 H112" style={thing} />
        <circle cx="88" cy="20" r="9" style={{ fill: "var(--coral)" }} />
        <path d="M88 32 V52" strokeWidth="2" strokeDasharray="3 4" strokeLinecap="round" style={{ stroke: "var(--ink-3)" }} />
      </>
    ),
  },
  {
    en: "below",
    ko: "기준보다 더 낮게",
    pair: "짝: above",
    draw: (
      <>
        <path d="M8 24 H112" style={thing} />
        <path d="M32 30 V50" strokeWidth="2" strokeDasharray="3 4" strokeLinecap="round" style={{ stroke: "var(--ink-3)" }} />
        <circle cx="32" cy="62" r="9" style={{ fill: "var(--coral)" }} />
      </>
    ),
  },
];

/** 위아래 전치사: on은 닿음, over·under는 바로 위아래, above·below는 기준선보다 높이·낮게 */
export function PrOverAbove() {
  return (
    <div>
      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-5">
        {HEIGHTS.map((h) => (
          <li key={h.en} className="rounded-2xl border border-line px-2 pb-3 pt-2 text-center">
            <svg viewBox="0 0 120 80" className="mx-auto w-full max-w-[150px]" aria-hidden>
              {h.draw}
            </svg>
            <p className="mt-1 text-[1.15em] font-bold">
              <En en={h.en} />
            </p>
            <p className="text-[14px] text-ink-2">{h.ko}</p>
            <p className="mt-0.5 text-[14px] font-bold text-ink-3">{h.pair}</p>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-center text-[14px] text-ink-2">회색이 기준(식탁, 선)이고, 빨간 것이 위치를 말하려는 물건이에요.</p>
    </div>
  );
}

/* ───────── 전치사 편 vs 접속사 편 ───────── */

const PR_TEAMS: { ko: string; prep: { en: string }[]; conj: { en: string }[] }[] = [
  { ko: "~ 동안", prep: [{ en: "during" }], conj: [{ en: "while" }] },
  {
    ko: "~ 때문에",
    prep: [{ en: "{because of}" }, { en: "{due to}" }, { en: "{owing to}" }, { en: "{thanks to}" }],
    conj: [{ en: "because" }, { en: "{since|접속사:~ 때문에}" }, { en: "{as|접속사:~ 때문에}" }],
  },
  {
    ko: "~에도 불구하고",
    prep: [{ en: "despite" }, { en: "{in spite of}" }],
    conj: [{ en: "although" }, { en: "though" }],
  },
];

function TeamWords({ words, tone }: { words: { en: string }[]; tone: string }) {
  return (
    <ul className="flex flex-wrap content-start gap-1.5">
      {words.map((w) => (
        <li key={w.en} className={`rounded-lg px-2 py-0.5 text-[15px] font-medium ${tone}`}>
          <En en={w.en} />
        </li>
      ))}
    </ul>
  );
}

/** 뜻은 같아도 편이 달라요: 전치사 편은 명사(구)를, 접속사 편은 주어 + 동사를 데려와요 */
export function PrPairTeams() {
  return (
    <div>
      <div className="grid grid-cols-2 gap-2 text-center">
        <p className="rounded-2xl bg-mint-soft px-2 py-2 text-mint-ink">
          <span className="block font-extrabold">전치사 편</span>
          <span className="block text-[14px] font-bold">뒤에 명사(구) · -ing</span>
        </p>
        <p className="rounded-2xl bg-sky-soft px-2 py-2 text-sky-ink">
          <span className="block font-extrabold">접속사 편</span>
          <span className="block text-[14px] font-bold">뒤에 주어 + 동사</span>
        </p>
      </div>
      <ul className="mt-2 space-y-2">
        {PR_TEAMS.map((t) => (
          <li key={t.ko} className="rounded-2xl border border-line px-3 py-2.5">
            <p className="text-center text-[14px] font-extrabold text-ink-2">{t.ko}</p>
            <div className="mt-1.5 grid grid-cols-2 gap-2">
              <TeamWords words={t.prep} tone="bg-mint-soft text-mint-ink" />
              <TeamWords words={t.conj} tone="bg-sky-soft text-sky-ink" />
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-2 rounded-2xl bg-chip px-3 py-2 text-center text-[14px] font-bold">양쪽 편을 오가는 말: before · after · since · until</p>
    </div>
  );
}

/* ───────── 전치사 뒤 명사 자리: 동사는 -ing로 ───────── */

const ING_CANDIDATES: { en: string; ok: boolean; why: string }[] = [
  { en: "brushing", ok: true, why: "동명사: 명사로 변장한 동사라서 명사 자리에 앉을 수 있어요" },
  { en: "to brush", ok: false, why: "to부정사는 전치사 뒤에 오지 않아요" },
  { en: "brush", ok: false, why: "동사원형은 변장하지 않은 모양이에요. 진짜 동사는 이미 went예요" },
];

function IngMark({ ok }: { ok: boolean }) {
  return (
    <span
      aria-label={ok ? "맞아요" : "틀려요"}
      className={`grid size-7 shrink-0 place-items-center rounded-full text-[15px] font-extrabold ${
        ok ? "bg-mint-soft text-mint-ink" : "bg-coral-soft text-coral-ink"
      }`}
    >
      {ok ? "✓" : "✕"}
    </span>
  );
}

/** 전치사 without 뒤의 빈자리는 명사 자리: 동사가 들어가려면 -ing로 변장 */
export function PrIngSlot() {
  return (
    <div>
      <p lang="en" className="flex flex-wrap items-start gap-x-2 gap-y-3 text-[1.15em] font-medium">
        <span className="pt-1">
          <En en="Jisu" />
        </span>
        <span className="inline-flex flex-col items-center gap-1">
          <span className="rounded-lg bg-coral px-2 py-1 text-white">went</span>
          <span className="text-[14px] font-extrabold text-coral-ink">동사 1</span>
        </span>
        <span className="pt-1">
          <En en="to bed" />
        </span>
        <span className="inline-flex flex-col items-center gap-1">
          <span className="rounded-lg bg-chip px-2 py-1 ring-1 ring-ink-3">
            <En en="without" />
          </span>
          <span className="text-[14px] font-extrabold text-ink-2">전치사</span>
        </span>
        <span className="inline-flex flex-col items-center gap-1">
          <span className="rounded-lg border-2 border-dashed border-mint-ink px-4 py-1 text-mint-ink">?</span>
          <span className="text-[14px] font-extrabold text-mint-ink">명사 자리</span>
        </span>
        <span className="pt-1">
          <En en="her teeth." />
        </span>
      </p>
      <ul className="mt-4 grid gap-2">
        {ING_CANDIDATES.map((c) => (
          <li key={c.en} className="flex items-center gap-3 rounded-2xl border border-line px-3 py-2.5">
            <IngMark ok={c.ok} />
            <span className="min-w-0">
              <span className={`block text-[1.08em] font-medium ${c.ok ? "" : "text-ink-2 line-through decoration-coral/60"}`}>
                <En en={c.en} />
              </span>
              <span className="block text-[14px] text-ink-2">{c.why}</span>
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-3 rounded-2xl bg-chip px-3 py-2">
        <p className="text-[1.05em] font-medium">
          <En en="Jisu went to bed [[without brushing]] her teeth." />
        </p>
        <p className="text-[14px] text-ink-2">지수는 이를 닦지 않고 잤어.</p>
      </div>
    </div>
  );
}

/* ───────── 둘 다 되는 말: before, after, since, until ───────── */

const BOTH_WAYS: { w: string; prep: { en: string; ko: string }; conj: { en: string; ko: string } }[] = [
  {
    w: "before",
    prep: { en: "[[before]] lunch", ko: "점심 전에" },
    conj: { en: "[[before]] the bell rings", ko: "종이 울리기 전에" },
  },
  {
    w: "after",
    prep: { en: "[[after]] school", ko: "방과 후에" },
    conj: { en: "[[after]] we finish dinner", ko: "우리가 저녁을 다 먹은 후에" },
  },
  {
    w: "since",
    prep: { en: "[[since]] Monday", ko: "월요일부터" },
    conj: { en: "[[{since|접속사:~한 이후로}]] I moved here", ko: "내가 여기로 이사 온 이후로" },
  },
  {
    w: "until",
    prep: { en: "[[until]] ten", ko: "10시까지" },
    conj: { en: "[[until]] the rain stops", ko: "비가 그칠 때까지" },
  },
];

/** 한 단어가 뒤에 명사가 오면 전치사, 주어 + 동사가 오면 접속사 */
export function PrBothWays() {
  return (
    <div className="grid gap-2.5 sm:grid-cols-2">
      {BOTH_WAYS.map((b) => (
        <div key={b.w} className="rounded-2xl border border-line px-3 py-3">
          <p lang="en" className="w-fit rounded-lg bg-ink px-2.5 py-0.5 text-[1.1em] font-extrabold text-on-ink">
            {b.w}
          </p>
          <div className="mt-2 grid gap-1.5">
            <p className="rounded-xl bg-mint-soft px-3 py-1.5">
              <span className="block text-[14px] font-extrabold text-mint-ink">전치사 + 명사</span>
              <span className="block text-[1.02em] font-medium">
                <En en={b.prep.en} />
              </span>
              <span className="block text-[14px] text-ink-2">{b.prep.ko}</span>
            </p>
            <p className="rounded-xl bg-sky-soft px-3 py-1.5">
              <span className="block text-[14px] font-extrabold text-sky-ink">접속사 + 주어 + 동사</span>
              <span className="block text-[1.02em] font-medium">
                <En en={b.conj.en} />
              </span>
              <span className="block text-[14px] text-ink-2">{b.conj.ko}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
