import type { ReactNode } from "react";
import { En } from "@/components/lesson/En";
import { ArrowRight } from "./icons";

/* 가정법 장 그림: 한 칸 물러서는 시제, 단순 조건 vs 가정법, 가정법 공식, I wish, as if의 시제, 혼합가정법, if 생략 도치, 숨은 if */

/* ───────── 공통 도우미 ───────── */

type Tone = "sky" | "mint" | "amber" | "coral";

const TONE: Record<Tone, string> = {
  sky: "bg-sky-soft text-sky-ink",
  mint: "bg-mint-soft text-mint-ink",
  amber: "bg-amber-soft text-amber-ink",
  coral: "bg-coral-soft text-coral-ink",
};

function Chip({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`inline-flex items-center rounded-lg px-2.5 py-1 font-bold ${className}`}>{children}</span>;
}

/** 왼쪽(과거 쪽)을 가리키는 화살표 */
function BackArrow({ className = "" }: { className?: string }) {
  return (
    <svg width="34" height="18" viewBox="0 0 34 18" className={className} aria-hidden>
      <path d="M32 9 H5" fill="none" strokeWidth="2.6" strokeDasharray="4 3.5" strokeLinecap="round" style={{ stroke: "var(--coral)" }} />
      <path d="M11 3 L4 9 L11 15" fill="none" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: "var(--coral)" }} />
    </svg>
  );
}

function RealChip() {
  return <span className="inline-flex rounded-lg border border-line bg-card px-2 py-1 text-[14px] font-extrabold text-ink-2">현실</span>;
}

function ImagineChip() {
  return <span className="inline-flex rounded-lg bg-coral px-2 py-1 text-[14px] font-extrabold text-white">상상</span>;
}

/* ───────── 1. 한 칸 물러서는 시제 ───────── */

const SLOTS: { name: string; form: string }[] = [
  { name: "과거완료", form: "had p.p." },
  { name: "과거", form: "과거형" },
  { name: "현재", form: "현재형" },
];

const STEP_ROWS: {
  title: string;
  name: string;
  /** 현실이 있는 칸 (1 = 과거, 2 = 현재) */
  real: 1 | 2;
  realEn: string;
  realKo: string;
  imagineEn: string;
  imagineKo: string;
}[] = [
  {
    title: "지금 사실의 반대",
    name: "가정법 과거",
    real: 2,
    realEn: "I am not a bird.",
    realKo: "나는 새가 아니야.",
    imagineEn: "If I [[{were|동사:(가정법) ~라면}]] a bird, I [[{could|조동사:~할 수 있을 텐데} fly]] to you.",
    imagineKo: "내가 새라면 너에게 날아갈 수 있을 텐데.",
  },
  {
    title: "과거 사실의 반대",
    name: "가정법 과거완료",
    real: 1,
    realEn: "I didn't know your birthday.",
    realKo: "나는 네 생일을 몰랐어.",
    imagineEn:
      "If I [[{had|조동사:과거완료를 만드는 말} known]] your birthday, I [[{would|조동사:~했을 텐데} {have|조동사:완료형을 만드는 말} bought]] you a gift.",
    imagineKo: "네 생일을 알았더라면 선물을 사 줬을 텐데.",
  },
];

/** 슬롯 3개 + 그 사이 화살표 자리 2개. 머리줄과 각 줄이 같은 격자를 써서 칸이 맞는다 */
const STEP_GRID = "grid grid-cols-[minmax(0,1fr)_38px_minmax(0,1fr)_38px_minmax(0,1fr)] items-center";

function StepHeader() {
  const cells: ReactNode[] = [];
  SLOTS.forEach((s, i) => {
    cells.push(
      <span key={s.name} className="flex flex-col items-center gap-1 text-center">
        <span className="text-[15px] font-extrabold">{s.name}</span>
        <span lang={i === 0 ? "en" : undefined} className="rounded-md bg-chip px-1.5 py-0.5 text-[14px] font-bold text-ink-2">
          {s.form}
        </span>
      </span>,
    );
    if (i < 2) cells.push(<span key={`g${i}`} aria-hidden />);
  });
  return <div className={STEP_GRID}>{cells}</div>;
}

function StepTrack({ real }: { real: 1 | 2 }) {
  const cells: ReactNode[] = [];
  for (let i = 0; i < 3; i++) {
    cells.push(
      <span key={`s${i}`} className="flex justify-center">
        {i === real ? <RealChip /> : i === real - 1 ? <ImagineChip /> : null}
      </span>,
    );
    if (i < 2)
      cells.push(
        <span key={`g${i}`} className="flex flex-col items-center">
          {i === real - 1 && (
            <>
              <BackArrow />
              <span className="text-[14px] font-extrabold leading-none text-coral-ink">한 칸</span>
            </>
          )}
        </span>,
      );
  }
  return <div className={STEP_GRID}>{cells}</div>;
}

/** 현실에서 한 칸 뒤로: 지금의 반대는 과거형, 과거의 반대는 had p.p. */
export function SjStepBack() {
  return (
    <div className="mx-auto max-w-2xl">
      {/* 아래 카드와 같은 테두리·안쪽 여백을 줘서 칸을 맞춘다 */}
      <div className="border border-transparent px-3 sm:px-4">
        <StepHeader />
        <p className="mt-1.5 flex items-center justify-center gap-1.5 text-[14px] font-bold text-ink-3" aria-hidden>
          <span>더 옛날</span>
          <span className="h-0.5 w-16 rounded-full bg-line" />
          <span>지금</span>
        </p>
      </div>
      <ol className="mt-3 space-y-3">
        {STEP_ROWS.map((r) => (
          <li key={r.name} className="rounded-2xl border border-line px-3 py-3 sm:px-4">
            <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="text-[15px] font-extrabold">{r.title}</span>
              <span className="rounded-md bg-coral-soft px-2 py-0.5 text-[14px] font-extrabold text-coral-ink">{r.name}</span>
            </p>
            <div className="mt-2.5">
              <StepTrack real={r.real} />
            </div>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              <div className="rounded-xl bg-chip px-3 py-2">
                <p className="text-[14px] font-extrabold text-ink-2">현실</p>
                <p className="text-[1.03em] font-medium">
                  <En en={r.realEn} />
                </p>
                <p className="text-[14px] text-ink-2">{r.realKo}</p>
              </div>
              <div className="rounded-xl border-2 border-coral px-3 py-2">
                <p className="text-[14px] font-extrabold text-coral-ink">상상 (한 칸 뒤로)</p>
                <p className="text-[1.03em] font-medium">
                  <En en={r.imagineEn} />
                </p>
                <p className="text-[14px] text-ink-2">{r.imagineKo}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ───────── 2. 일어날 수 있는 일 vs 현실과 반대인 일 ───────── */

const REAL_VS: {
  label: string;
  sub: string;
  form: string;
  tone: Tone;
  items: { en: string; ko: string; hint: string }[];
}[] = [
  {
    label: "단순 조건 (직설법)",
    sub: "실제로 일어날 수 있는 일",
    form: "If + 현재형, will + 동사원형",
    tone: "mint",
    items: [
      { en: "If I [[have]] time, I [[will help]] you.", ko: "시간이 있으면 도와줄게.", hint: "시간이 날 수도 있어요" },
      { en: "If it [[rains]] tomorrow, I [[will stay]] home.", ko: "내일 비가 오면 집에 있을 거야.", hint: "비는 정말 올 수도 있어요" },
    ],
  },
  {
    label: "가정법 과거",
    sub: "현실과 반대이거나 거의 일어나지 않을 일",
    form: "If + 과거형, would + 동사원형",
    tone: "coral",
    items: [
      { en: "If I [[had]] time, I [[{would|조동사:~할 텐데} help]] you.", ko: "시간이 있다면 도와줄 텐데.", hint: "사실은 지금 시간이 없어요" },
      {
        en: "If I [[{were|동사:(가정법) ~라면}]] a cat, I [[{would|조동사:~할 텐데} sleep]] all day.",
        ko: "내가 고양이라면 하루 종일 잘 텐데.",
        hint: "고양이가 될 수는 없어요",
      },
    ],
  },
];

/** 같은 if라도 일어날 수 있는 일이면 현재형 + will, 현실과 반대면 과거형 + would */
export function SjRealVsImagine() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {REAL_VS.map((c) => (
        <div key={c.label} className={`rounded-2xl border ${c.tone === "coral" ? "border-2 border-coral" : "border-line"}`}>
          <div className={`rounded-t-2xl px-4 py-2.5 ${TONE[c.tone]}`}>
            <p className="text-[16px] font-extrabold">{c.label}</p>
            <p className="text-[14px] font-bold">{c.sub}</p>
          </div>
          <div className="px-4 py-3">
            <p className="w-fit rounded-md bg-chip px-2 py-0.5 text-[14px] font-extrabold text-ink-2">{c.form}</p>
            <ul className="mt-2 space-y-2.5">
              {c.items.map((it) => (
                <li key={it.en}>
                  <p className="text-[1.04em] font-medium">
                    <En en={it.en} />
                  </p>
                  <p className="text-[14px] text-ink-2">{it.ko}</p>
                  <p className="text-[14px] font-bold text-ink-3">속뜻: {it.hint}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ───────── 3. 가정법 과거·과거완료 공식 ───────── */

type Tile = { t: string; kind: "if" | "subj" | "verb" | "modal" | "comma" };

const TILE_TONE: Record<Tile["kind"], string> = {
  if: "border border-line",
  subj: "bg-chip",
  verb: "bg-coral text-white",
  modal: "bg-sky-soft text-sky-ink",
  comma: "",
};

const FORMULAS: { name: string; when: string; ko: string; tiles: Tile[]; en: string; enKo: string }[] = [
  {
    name: "가정법 과거",
    when: "지금 사실의 반대",
    ko: "(지금) ~라면, ~할 텐데",
    tiles: [
      { t: "If", kind: "if" },
      { t: "주어", kind: "subj" },
      { t: "과거형 (be → were)", kind: "verb" },
      { t: ",", kind: "comma" },
      { t: "주어", kind: "subj" },
      { t: "would · could · might", kind: "modal" },
      { t: "동사원형", kind: "verb" },
    ],
    en: "If I [[{were|동사:(가정법) ~라면}]] you, I [[{would|조동사:~할 텐데} {take a rest|숙어:좀 쉬다}]].",
    enKo: "내가 너라면 좀 쉴 텐데.",
  },
  {
    name: "가정법 과거완료",
    when: "과거 사실의 반대",
    ko: "(그때) ~했더라면, ~했을 텐데",
    tiles: [
      { t: "If", kind: "if" },
      { t: "주어", kind: "subj" },
      { t: "had p.p.", kind: "verb" },
      { t: ",", kind: "comma" },
      { t: "주어", kind: "subj" },
      { t: "would · could · might", kind: "modal" },
      { t: "have p.p.", kind: "verb" },
    ],
    en: "If you [[{had|조동사:과거완료를 만드는 말} told]] me, I [[{would|조동사:~했을 텐데} {have|조동사:완료형을 만드는 말} helped]] you.",
    enKo: "네가 말해 줬더라면 내가 도와줬을 텐데.",
  },
];

const MODAL_MEANINGS: { en: string; ko: string }[] = [
  { en: "would", ko: "~할 텐데 (결과)" },
  { en: "could", ko: "~할 수 있을 텐데 (가능)" },
  { en: "might", ko: "~할지도 모를 텐데 (약한 추측)" },
];

/** if절 동사와 주절 조동사가 짝을 맞춰 한 칸씩 물러선다 */
export function SjFormula() {
  return (
    <div>
      <ul className="space-y-3">
        {FORMULAS.map((f) => (
          <li key={f.name} className="rounded-2xl border border-line px-4 py-3">
            <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="rounded-md bg-coral-soft px-2 py-0.5 text-[15px] font-extrabold text-coral-ink">{f.name}</span>
              <span className="text-[15px] font-extrabold">{f.when}</span>
              <span className="text-[14px] font-bold text-ink-2">· {f.ko}</span>
            </p>
            <p className="mt-2.5 flex flex-wrap items-center gap-1.5 text-[14.5px] font-extrabold">
              {f.tiles.map((t, i) =>
                t.kind === "comma" ? (
                  <span key={i} className="px-0.5 text-ink-3" aria-hidden>
                    ,
                  </span>
                ) : (
                  <span key={i} className={`rounded-lg px-2.5 py-1 ${TILE_TONE[t.kind]}`}>
                    {t.t}
                  </span>
                ),
              )}
            </p>
            <p className="mt-1 grid grid-cols-2 text-[14px] font-bold text-ink-3">
              <span>if절: 조건</span>
              <span className="text-right sm:text-left">주절: 결과</span>
            </p>
            <div className="mt-2 rounded-xl bg-chip px-3 py-2">
              <p className="text-[1.03em] font-medium">
                <En en={f.en} />
              </p>
              <p className="text-[14px] text-ink-2">{f.enKo}</p>
            </div>
          </li>
        ))}
      </ul>
      <ul className="mt-3 grid gap-2 sm:grid-cols-3">
        {MODAL_MEANINGS.map((m) => (
          <li key={m.en} className="rounded-xl bg-sky-soft px-3 py-2 text-sky-ink">
            <span lang="en" className="text-[1.05em] font-extrabold">
              {m.en}
            </span>
            <span className="block text-[14px] font-bold">{m.ko}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ───────── 4. I wish: 지금의 아쉬움, 지난 일의 아쉬움 ───────── */

const WISH_ROWS: { when: string; form: string; realEn: string; realKo: string; en: string; ko: string }[] = [
  {
    when: "지금이 아쉬울 때",
    form: "I wish + 과거형",
    realEn: "I'm not tall.",
    realKo: "나는 키가 크지 않아.",
    en: "I wish I [[{were|동사:(가정법) ~라면}]] taller.",
    ko: "키가 더 크면 좋을 텐데.",
  },
  {
    when: "지난 일이 아쉬울 때",
    form: "I wish + had p.p.",
    realEn: "I didn't study for the test.",
    realKo: "나는 시험공부를 안 했어.",
    en: "I wish I [[{had|조동사:과거완료를 만드는 말} studied]] for the test.",
    ko: "시험공부를 했더라면 좋았을 텐데.",
  },
];

/** 현실 → I wish: 시제가 한 칸 뒤로 */
export function SjWish() {
  return (
    <div>
      <ul className="space-y-3">
        {WISH_ROWS.map((r) => (
          <li key={r.form} className="rounded-2xl border border-line px-4 py-3">
            <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="text-[15px] font-extrabold">{r.when}</span>
              <span lang="en" className="rounded-md bg-coral-soft px-2 py-0.5 text-[14px] font-extrabold text-coral-ink">
                {r.form}
              </span>
            </p>
            <div className="mt-2.5 grid items-center gap-2 sm:grid-cols-[1fr_auto_1fr]">
              <div className="rounded-xl bg-chip px-3 py-2">
                <p className="text-[14px] font-extrabold text-ink-2">현실</p>
                <p className="text-[1.03em] font-medium">
                  <En en={r.realEn} />
                </p>
                <p className="text-[14px] text-ink-2">{r.realKo}</p>
              </div>
              <span className="flex justify-center">
                <ArrowRight className="rotate-90 text-coral sm:rotate-0" />
              </span>
              <div className="rounded-xl border-2 border-coral px-3 py-2">
                <p className="text-[14px] font-extrabold text-coral-ink">바람 (한 칸 뒤로)</p>
                <p className="text-[1.03em] font-medium">
                  <En en={r.en} />
                </p>
                <p className="text-[14px] text-ink-2">{r.ko}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-3 flex flex-wrap items-center justify-center gap-2 text-[14.5px] font-bold">
        <Chip className="bg-mint-soft text-mint-ink">이루어질 수 있는 바람은 hope</Chip>
        <span className="font-medium">
          <En en="I [[hope]] you [[win]] the game." />
        </span>
      </p>
    </div>
  );
}

/* ───────── 5. as if의 시제: 주절 동사가 기준 ───────── */

function TimeDot({ label, tone }: { label: string; tone: "main" | "asif" }) {
  return (
    <span
      lang="en"
      className={`inline-flex items-center rounded-lg px-2 py-1 text-[14px] font-extrabold ${
        tone === "main" ? "bg-ink text-on-ink" : "bg-coral text-white"
      }`}
    >
      {label}
    </span>
  );
}

const AS_IF_CELLS: { main: string; asIf: string; same: boolean; mainKo: string; en: string; ko: string }[] = [
  {
    main: "talks",
    asIf: "knew",
    same: true,
    mainKo: "주절 현재",
    en: "He [[talks]] {as if} he [[knew]] everything.",
    ko: "그는 (지금) 모든 걸 아는 것처럼 말해.",
  },
  {
    main: "talked",
    asIf: "knew",
    same: true,
    mainKo: "주절 과거",
    en: "He [[talked]] {as if} he [[knew]] everything.",
    ko: "그는 (그때) 모든 걸 아는 것처럼 말했어.",
  },
  {
    main: "talks",
    asIf: "had seen",
    same: false,
    mainKo: "주절 현재",
    en: "He [[talks]] {as if} he [[{had|조동사:과거완료를 만드는 말} seen]] the movie.",
    ko: "그는 (전에) 그 영화를 본 것처럼 말해.",
  },
  {
    main: "talked",
    asIf: "had seen",
    same: false,
    mainKo: "주절 과거",
    en: "He [[talked]] {as if} he [[{had|조동사:과거완료를 만드는 말} seen]] the movie.",
    ko: "그는 (그 전에) 그 영화를 본 것처럼 말했어.",
  },
];

/** as if + 과거 = 주절과 같은 때, as if + had p.p. = 주절보다 먼저 */
export function SjAsIfTime() {
  return (
    <div>
      <ul className="grid gap-2.5 sm:grid-cols-2">
        {AS_IF_CELLS.map((c) => (
          <li key={c.en} className={`rounded-2xl border px-4 py-3 ${c.same ? "border-line" : "border-2 border-coral"}`}>
            <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[14px] font-extrabold">
              <span className="text-ink-2">{c.mainKo}</span>
              <span className={`rounded-md px-2 py-0.5 ${c.same ? "bg-sky-soft text-sky-ink" : "bg-coral-soft text-coral-ink"}`}>
                {c.same ? "as if + 과거형 = 같은 때" : "as if + had p.p. = 더 먼저"}
              </span>
            </p>
            <div className="mt-2 grid grid-cols-2 items-center gap-2 rounded-xl bg-chip px-2 py-2 text-center">
              <span className="text-[14px] font-bold text-ink-3">더 먼저</span>
              <span className="text-[14px] font-bold text-ink-3">주절의 때</span>
              <span>{!c.same && <TimeDot label={c.asIf} tone="asif" />}</span>
              <span className="flex flex-wrap justify-center gap-1.5">
                <TimeDot label={c.main} tone="main" />
                {c.same && <TimeDot label={c.asIf} tone="asif" />}
              </span>
            </div>
            <p className="mt-2 text-[1.03em] font-medium">
              <En en={c.en} />
            </p>
            <p className="text-[14px] text-ink-2">{c.ko}</p>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-center text-[14.5px] font-bold text-ink-2">
        기준은 &lsquo;지금&rsquo;이 아니라 <span className="text-ink">주절의 동사</span>예요. 주절이 과거가 돼도 같은 때면 knew 그대로예요.
      </p>
    </div>
  );
}

/* ───────── 6. 혼합가정법: 과거의 일, 지금의 결과 ───────── */

/** if절은 과거에서, 주절은 지금에서 각자 한 칸씩 물러선다 */
export function SjMixed() {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="grid items-stretch gap-2 sm:grid-cols-[1fr_auto_1fr]">
        <div className="rounded-2xl border border-line px-4 py-3">
          <p className="flex flex-wrap items-center gap-2">
            <Chip className="bg-sky-soft text-[14px] text-sky-ink">어젯밤 (과거)</Chip>
            <span className="text-[14px] font-extrabold text-ink-2">if절 · had p.p.</span>
          </p>
          <p className="mt-2 text-[1.04em] font-medium">
            <En en="If I [[{had|조동사:과거완료를 만드는 말} gone]] to bed early last night," />
          </p>
          <p className="text-[14px] text-ink-2">어젯밤 일찍 잤더라면</p>
          <p className="mt-1.5 text-[14px] font-bold text-ink-3">현실: 어젯밤 늦게 잤어요</p>
        </div>
        <span className="flex items-center justify-center">
          <ArrowRight className="rotate-90 text-coral sm:rotate-0" />
        </span>
        <div className="rounded-2xl border-2 border-coral px-4 py-3">
          <p className="flex flex-wrap items-center gap-2">
            <Chip className="bg-coral text-[14px] text-white">지금</Chip>
            <span className="text-[14px] font-extrabold text-coral-ink">주절 · would + 동사원형</span>
          </p>
          <p className="mt-2 text-[1.04em] font-medium">
            <En en="I [[{wouldn't|조동사:~하지 않을 텐데} be]] tired now." />
          </p>
          <p className="text-[14px] text-ink-2">지금 피곤하지 않을 텐데.</p>
          <p className="mt-1.5 text-[14px] font-bold text-ink-3">현실: 그래서 지금 피곤해요</p>
        </div>
      </div>
      <div className="mt-3 grid gap-2 text-[14.5px] font-bold sm:grid-cols-2">
        <p className="rounded-xl bg-sky-soft px-3 py-2 text-sky-ink">과거 쪽 단서: yesterday, last night, as a child</p>
        <p className="rounded-xl bg-coral-soft px-3 py-2 text-coral-ink">지금 쪽 단서: now, still, today</p>
      </div>
    </div>
  );
}

/* ───────── 7. if 생략 도치 ───────── */

const INVERSIONS: { kind: string; ifRest: string; inverted: string; ko: string }[] = [
  {
    kind: "be동사 were",
    ifRest: "I [[{were|동사:(가정법) ~라면}]] you,",
    inverted: "[[{Were|동사:(가정법) ~라면}]] I you,",
    ko: "내가 너라면",
  },
  {
    kind: "과거완료의 had",
    ifRest: "I [[{had|조동사:과거완료를 만드는 말}]] known,",
    inverted: "[[{Had|조동사:과거완료를 만드는 말}]] I known,",
    ko: "내가 알았더라면",
  },
  {
    kind: "혹시라도의 should",
    ifRest: "you [[{should|조동사:(혹시라도) ~한다면}]] need help,",
    inverted: "[[{Should|조동사:(혹시라도) ~한다면}]] you need help,",
    ko: "혹시라도 네가 도움이 필요하면",
  },
];

/** if를 빼면 were·had·should가 주어 앞으로 나온다 */
export function SjInversion() {
  return (
    <div>
      <ul className="space-y-2.5">
        {INVERSIONS.map((r) => (
          <li key={r.kind} className="rounded-2xl border border-line px-4 py-3">
            <p className="text-[14px] font-extrabold text-ink-2">
              {r.kind} <span className="font-bold text-ink-3">· {r.ko}</span>
            </p>
            <div className="mt-1.5 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-[1.08em] font-medium">
              <span className="inline-flex flex-wrap items-center gap-1.5">
                <span className="rounded-md bg-chip px-1.5 text-ink-3 line-through decoration-coral decoration-2">
                  <En en="If" />
                </span>
                <En en={r.ifRest} />
              </span>
              <ArrowRight size={20} className="text-coral" />
              <span className="rounded-lg border-2 border-coral px-2 py-0.5">
                <En en={r.inverted} />
              </span>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-3 grid gap-2 text-[14.5px] sm:grid-cols-2">
        <p className="rounded-xl bg-mint-soft px-3 py-2 font-bold text-mint-ink">앞으로 나올 수 있는 건 were, had, should 셋뿐이에요.</p>
        <p className="rounded-xl bg-coral-soft px-3 py-2 font-bold text-coral-ink">
          If I knew → <span lang="en">Knew I</span> ✕ · not은 주어 뒤: <span lang="en">Had it not been</span> ○
        </p>
      </div>
    </div>
  );
}

/* ───────── 8. 숨은 if 찾기 ───────── */

const HIDDEN_IF: { label: string; tone: Tone; en: string; ko: string; ifEn: string }[] = [
  {
    label: "without (~이 없다면)",
    tone: "sky",
    en: "[[{Without|전치사:~이 없다면}]] my phone, I [[{would|조동사:~할 텐데} be]] {lost|형용사:길을 잃은}.",
    ko: "휴대폰이 없다면 나는 길을 잃을 거야.",
    ifEn: "= [[{If it were not for}]] my phone",
  },
  {
    label: "with (~이 있다면)",
    tone: "sky",
    en: "[[{With|전치사:~이 있다면}]] more time, I [[{could|조동사:~할 수 있을 텐데} finish]] it.",
    ko: "시간이 더 있다면 그걸 끝낼 수 있을 텐데.",
    ifEn: "= [[If I had]] more time",
  },
  {
    label: "otherwise (그렇지 않았다면)",
    tone: "amber",
    en: "I left early. [[{Otherwise|부사:그렇지 않았다면}]], I [[{would|조동사:~했을 텐데} {have|조동사:완료형을 만드는 말} missed]] the bus.",
    ko: "나는 일찍 나왔어. 그렇지 않았다면 버스를 놓쳤을 거야.",
    ifEn: "= [[If I {hadn't|조동사:~하지 않았더라면} left]] early",
  },
  {
    label: "to부정사",
    tone: "mint",
    en: "[[To hear her sing]], you [[{would|조동사:~할 텐데} think]] she was a singer.",
    ko: "그녀가 노래하는 걸 들으면 가수인 줄 알 거야.",
    ifEn: "= [[If you heard]] her sing",
  },
  {
    label: "주어",
    tone: "coral",
    en: "[[A true friend]] [[{would|조동사:~할 텐데} {keep|동사:(비밀을) 지키다}]] your {secret|명사:비밀}.",
    ko: "진정한 친구라면 네 비밀을 지켜 줄 텐데.",
    ifEn: "= [[If he {were|동사:(가정법) ~라면}]] a true friend",
  },
];

/** if 없이 조건을 품은 말: without, with, otherwise, to부정사, 주어 */
export function SjHiddenIf() {
  return (
    <div>
      <p className="text-center text-[15px] font-bold">
        if가 없는데 <span className="text-coral-ink">would · could</span>가 보이면? 조건이 어딘가에 숨어 있어요.
      </p>
      <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
        {HIDDEN_IF.map((h, i) => (
          <li key={h.label} className={`rounded-2xl border border-line px-4 py-3 ${i === 0 ? "sm:col-span-2" : ""}`}>
            <Chip className={`text-[14px] ${TONE[h.tone]}`}>{h.label}</Chip>
            <p className="mt-2 text-[1.03em] font-medium">
              <En en={h.en} />
            </p>
            <p className="text-[14px] text-ink-2">{h.ko}</p>
            <p className="mt-1.5 rounded-lg bg-chip px-2.5 py-1 text-[14.5px] font-medium">
              <En en={h.ifEn} />
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
