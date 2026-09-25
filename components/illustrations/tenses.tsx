import type { ReactNode } from "react";
import { En } from "@/components/lesson/En";
import { CrownIcon } from "./icons";

/* 시제 장 그림: 시간선 위에 동사를 올려놓는다. 휴대폰에서도 글씨가 보이도록 폭 360 기준으로 그린다. */

const ink = { fill: "var(--ink)" } as const;
const ink2 = { fill: "var(--ink-2)" } as const;
const line = { stroke: "var(--ink-3)" } as const;

function Axis({ y = 70 }: { y?: number }) {
  return (
    <>
      <path d={`M14 ${y} H346`} strokeWidth="2.5" style={line} />
      <path d={`M338 ${y - 7} L348 ${y} L338 ${y + 7}`} fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={line} />
      <rect x="176" y={y - 16} width="8" height="32" rx="4" style={{ fill: "var(--coral)" }} />
      <text x="180" y={y + 38} textAnchor="middle" fontSize="17" fontWeight="700" style={{ fill: "var(--coral-ink)" }}>
        지금
      </text>
    </>
  );
}

/** 현재·과거·미래를 한 줄에 */
export function TnTimeline() {
  return (
    <div>
      <svg viewBox="0 0 360 120" className="mx-auto w-full max-w-md" role="img" aria-label="과거, 지금, 미래 시간선">
        <Axis />
        <circle cx="70" cy="70" r="9" style={{ fill: "var(--sky-ink)" }} />
        <text x="70" y="40" textAnchor="middle" fontSize="17" fontWeight="700" style={ink}>
          과거
        </text>
        <circle cx="290" cy="70" r="9" fill="none" strokeWidth="3" strokeDasharray="3 3" style={{ stroke: "var(--mint-ink)" }} />
        <text x="290" y="40" textAnchor="middle" fontSize="17" fontWeight="700" style={ink}>
          미래
        </text>
        <path d="M120 58 Q180 20 240 58" fill="none" strokeWidth="2" strokeDasharray="4 5" style={line} />
        <text x="180" y="20" textAnchor="middle" fontSize="16" style={ink2}>
          현재형: 어제도 오늘도 내일도
        </text>
      </svg>
      <div role="list" className="mt-2 grid gap-2 text-[15px] sm:grid-cols-3">
        <div role="listitem" className="rounded-xl bg-sky-soft px-3 py-2 text-sky-ink">
          <b>과거</b>
          <span className="block font-medium">
            <En en="I [[played]] soccer." />
          </span>
        </div>
        <div role="listitem" className="rounded-xl bg-coral-soft px-3 py-2 text-coral-ink">
          <b>현재 (늘 그런 일)</b>
          <span className="block font-medium">
            <En en="I [[play]] soccer." />
          </span>
        </div>
        <div role="listitem" className="rounded-xl bg-mint-soft px-3 py-2 text-mint-ink">
          <b>미래</b>
          <span className="block font-medium">
            <En en="I [[will play]] soccer." />
          </span>
        </div>
      </div>
    </div>
  );
}

/** 진행형: 한 점이 아니라 그 앞뒤로 이어지는 구간 */
export function TnProgressive() {
  return (
    <svg viewBox="0 0 360 130" className="mx-auto w-full max-w-md" role="img" aria-label="진행형은 지금을 가운데 둔 진행 중인 구간">
      <Axis y={72} />
      <rect x="110" y="60" width="140" height="24" rx="12" style={{ fill: "var(--amber-soft)", stroke: "var(--amber-ink)" }} strokeWidth="2" />
      <rect x="176" y="56" width="8" height="32" rx="4" style={{ fill: "var(--coral)" }} />
      <text x="180" y="42" textAnchor="middle" fontSize="17" fontWeight="700" style={ink}>
        be + -ing: 한창 하는 중
      </text>
      <text x="104" y="112" textAnchor="middle" fontSize="16" style={ink2}>
        시작
      </text>
      <text x="262" y="112" textAnchor="middle" fontSize="16" style={ink2}>
        아직 안 끝남
      </text>
    </svg>
  );
}

/** 현재완료: 과거에서 지금까지 이어진 다리 */
export function TnPerfectBridge() {
  const uses: { name: string; en: string; ko: string; words: string }[] = [
    { name: "완료", en: "I [[have just finished]] my homework.", ko: "방금 숙제를 끝냈어.", words: "just, already, yet" },
    { name: "경험", en: "I [[have been]] to Jeju twice.", ko: "제주도에 두 번 가 봤어.", words: "ever, never, before, once" },
    { name: "계속", en: "I [[have lived]] here for five years.", ko: "5년째 여기 살고 있어.", words: "for, since, how long" },
    { name: "결과", en: "I [[have lost]] my key.", ko: "열쇠를 잃어버렸어. (그래서 지금 없어)", words: "lost, gone" },
  ];
  return (
    <div>
      <svg viewBox="0 0 360 120" className="mx-auto w-full max-w-md" role="img" aria-label="과거에서 지금까지 이어진 화살표">
        <Axis />
        <circle cx="60" cy="70" r="8" style={{ fill: "var(--sky-ink)" }} />
        <path d="M60 58 Q120 12 176 50" fill="none" strokeWidth="4" strokeLinecap="round" style={{ stroke: "var(--coral)" }} />
        <path d="M164 42 L178 52 L162 58" fill="none" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: "var(--coral)" }} />
        <text x="112" y="22" textAnchor="middle" fontSize="17" fontWeight="700" style={ink}>
          have + p.p.
        </text>
        <text x="64" y="106" textAnchor="middle" fontSize="16" style={ink2}>
          과거에 시작
        </text>
      </svg>
      <div role="list" className="mt-2 grid gap-2 sm:grid-cols-2">
        {uses.map((u) => (
          <div role="listitem" key={u.name} className="rounded-xl border border-line px-3 py-2.5">
            <p className="text-[14px] font-extrabold text-coral-ink">
              {u.name} <span className="font-normal text-ink-3">· {u.words}</span>
            </p>
            <p className="text-[15.5px] font-medium">
              <En en={u.en} />
            </p>
            <p className="text-[14px] text-ink-2">{u.ko}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function MiniLine({ title, children, caption }: { title: string; children: ReactNode; caption: ReactNode }) {
  return (
    <div className="rounded-2xl border border-line px-3 py-3">
      <p className="text-[14px] font-extrabold">{title}</p>
      <svg viewBox="0 0 300 70" className="w-full" aria-hidden>
        <path d="M10 40 H290" strokeWidth="2" style={line} />
        {children}
      </svg>
      <div className="text-[15px] font-medium">{caption}</div>
    </div>
  );
}

/** 완료 시제 가족: 기준점이 과거·지금·미래로 옮겨 간다 */
export function TnPerfectFamily() {
  const dot = (x: number, tone: string) => <circle cx={x} cy="40" r="7" style={{ fill: tone }} />;
  const arrow = (x1: number, x2: number) => (
    <path d={`M${x1} 30 Q${(x1 + x2) / 2} 4 ${x2} 30`} fill="none" strokeWidth="3" strokeLinecap="round" style={{ stroke: "var(--coral)" }} />
  );
  const label = (x: number, t: string) => (
    <text x={x} y="62" textAnchor="middle" fontSize="15" style={ink2}>
      {t}
    </text>
  );
  return (
    <div className="mx-auto grid max-w-md gap-3">
      <MiniLine title="과거완료 had + p.p." caption={<En en="The movie [[had started]] when I arrived." />}>
        {dot(60, "var(--sky-ink)")}
        {arrow(60, 170)}
        {dot(170, "var(--ink)")}
        {label(60, "더 먼저")}
        {label(170, "과거 기준")}
      </MiniLine>
      <MiniLine title="현재완료 have + p.p." caption={<En en="I [[have finished]] my work." />}>
        {dot(80, "var(--sky-ink)")}
        {arrow(80, 190)}
        {dot(190, "var(--coral)")}
        {label(80, "과거")}
        {label(190, "지금")}
      </MiniLine>
      <MiniLine title="미래완료 will have + p.p." caption={<En en="I [[will have finished]] it by six." />}>
        {dot(130, "var(--coral)")}
        {arrow(130, 250)}
        {dot(250, "var(--mint-ink)")}
        {label(130, "지금")}
        {label(250, "미래 기준")}
      </MiniLine>
    </div>
  );
}

/** 시간·조건 부사절은 현재, 명사절은 미래 그대로 */
export function TnTimeClause() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <div className="rounded-2xl bg-mint-soft px-4 py-3 text-mint-ink">
        <p className="font-extrabold">부사절 (언제? 만약?)</p>
        <p className="text-[14px]">미래 일이어도 현재형으로</p>
        <p className="mt-2 text-[15.5px] font-medium text-ink">
          <En en="If it [[rains]] tomorrow, we will stay home." />
        </p>
      </div>
      <div className="rounded-2xl bg-sky-soft px-4 py-3 text-sky-ink">
        <p className="font-extrabold">명사절 (~인지, 언제 ~인지)</p>
        <p className="text-[14px]">미래 일이면 will 그대로</p>
        <p className="mt-2 text-[15.5px] font-medium text-ink">
          <En en="I don't know if it [[will rain]] tomorrow." />
        </p>
      </div>
    </div>
  );
}

/* ════════════ 시각화 보강: 폭 320 기준 작은 시간선 ════════════
 * 휴대폰에서 카드 안쪽 폭이 약 290px이라 글씨 17 → 약 15px로 보인다. 넓은 화면에서는 max-w-md로 너무 커지지 않게 한다.
 */

type TxTone = "ink" | "ink2" | "coral" | "sky" | "mint" | "amber";

const TX: Record<TxTone, string> = {
  ink: "var(--ink)",
  ink2: "var(--ink-2)",
  coral: "var(--coral-ink)",
  sky: "var(--sky-ink)",
  mint: "var(--mint-ink)",
  amber: "var(--amber-ink)",
};

const skyFill = { fill: "var(--sky-ink)" } as const;
const coralStroke = { stroke: "var(--coral)" } as const;

function Tx({ x, y, tone = "ink", children }: { x: number; y: number; tone?: TxTone; children: ReactNode }) {
  return (
    <text x={x} y={y} textAnchor="middle" fontSize="17" fontWeight="700" style={{ fill: TX[tone] }}>
      {children}
    </text>
  );
}

/** 폭 320 시간선. 축 → 그림(children) → '지금' 막대 순서로 그려서 지금 막대가 늘 위에 보인다 */
function Rail({
  h,
  y,
  now,
  nowLabel = "below",
  label,
  children,
}: {
  h: number;
  y: number;
  now?: number;
  nowLabel?: "above" | "below";
  label: string;
  children?: ReactNode;
}) {
  return (
    <svg viewBox={`0 0 320 ${h}`} className="mx-auto w-full max-w-md" role="img" aria-label={label}>
      <path d={`M8 ${y} H308`} strokeWidth="2.5" style={line} />
      <path d={`M300 ${y - 6} L309 ${y} L300 ${y + 6}`} fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={line} />
      {children}
      {now !== undefined && (
        <>
          <rect x={now - 3.5} y={y - 14} width="7" height="28" rx="3.5" style={{ fill: "var(--coral)" }} />
          <Tx x={now} y={nowLabel === "below" ? y + 34 : y - 22} tone="coral">
            지금
          </Tx>
        </>
      )}
    </svg>
  );
}

/** 화살촉: (x, y)가 끝. deg는 끝이 향하는 각도 (0 = 오른쪽, 양수 = 오른쪽 아래) */
function Head({ x, y, deg = 0, color = "var(--coral)", w = 4 }: { x: number; y: number; deg?: number; color?: string; w?: number }) {
  const a = (deg * Math.PI) / 180;
  const s = Math.PI / 6;
  const r = (n: number) => Math.round(n * 10) / 10;
  const p1 = `${r(x - 12 * Math.cos(a - s))} ${r(y - 12 * Math.sin(a - s))}`;
  const p2 = `${r(x - 12 * Math.cos(a + s))} ${r(y - 12 * Math.sin(a + s))}`;
  return <path d={`M${p1} L${x} ${y} L${p2}`} fill="none" strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" style={{ stroke: color }} />;
}

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-2xl border border-line px-3.5 py-3 ${className}`}>{children}</div>;
}

/* ───────── 현재 시제: 네 가지 모양 ───────── */

type PresentShape = "repeat" | "band" | "always" | "now";

const PRESENT_USES: { name: string; desc: string; shape: PresentShape; aria: string; en: string; ko: string }[] = [
  {
    name: "습관",
    desc: "늘 되풀이하는 일",
    shape: "repeat",
    aria: "과거, 지금, 미래에 점이 되풀이해 찍혀 있어요",
    en: "I [[ride]] my bike to school every day.",
    ko: "나는 매일 자전거를 타고 학교에 가.",
  },
  {
    name: "평소의 모습",
    desc: "요즘 늘 그런 모습",
    shape: "band",
    aria: "지금을 가운데 두고 앞뒤로 넓게 이어진 띠",
    en: "My brother [[wears]] {glasses|명사:안경}.",
    ko: "우리 형은 안경을 써.",
  },
  {
    name: "변하지 않는 사실",
    desc: "어제도 내일도 참인 일",
    shape: "always",
    aria: "시간선 처음부터 끝까지 이어진 띠",
    en: "The sun [[rises]] in the east.",
    ko: "해는 동쪽에서 떠.",
  },
  {
    name: "지금의 상태",
    desc: "바로 지금 어떤지",
    shape: "now",
    aria: "지금 막대에만 동그라미가 쳐져 있어요",
    en: "I [[am]] sleepy now.",
    ko: "나 지금 졸려.",
  },
];

function PresentPattern({ shape, aria }: { shape: PresentShape; aria: string }) {
  return (
    <Rail h={64} y={26} now={160} label={aria}>
      {shape === "repeat" &&
        [34, 76, 118, 202, 244, 284].map((x) =>
          x < 160 ? (
            <circle key={x} cx={x} cy="26" r="6" style={skyFill} />
          ) : (
            <circle key={x} cx={x} cy="26" r="6" fill="none" strokeWidth="2.5" strokeDasharray="3 3" style={{ stroke: "var(--mint-ink)" }} />
          ),
        )}
      {shape === "band" && (
        <rect x="56" y="18" width="208" height="16" rx="8" strokeWidth="2" style={{ fill: "var(--amber-soft)", stroke: "var(--amber-ink)" }} />
      )}
      {shape === "always" && (
        <rect x="10" y="19" width="282" height="14" rx="7" strokeWidth="2" style={{ fill: "var(--mint-soft)", stroke: "var(--mint-ink)" }} />
      )}
      {shape === "now" && <circle cx="160" cy="26" r="14" fill="none" strokeWidth="3" style={coralStroke} />}
    </Rail>
  );
}

/** 현재형의 네 가지 쓰임을 시간선 모양으로: 되풀이, 넓은 띠, 끝없는 띠, 지금 한 점 */
export function TnPresentUses() {
  return (
    <div role="list" className="grid gap-2.5 sm:grid-cols-2">
      {PRESENT_USES.map((u) => (
        <div role="listitem" key={u.name} className="rounded-2xl border border-line px-3.5 py-3">
          <p className="flex flex-wrap items-baseline gap-x-2">
            <span className="text-[15.5px] font-extrabold text-coral-ink">{u.name}</span>
            <span className="text-[14px] text-ink-2">{u.desc}</span>
          </p>
          <PresentPattern shape={u.shape} aria={u.aria} />
          <p className="text-[1.03em] font-medium">
            <En en={u.en} />
          </p>
          <p className="text-[14px] text-ink-2">{u.ko}</p>
        </div>
      ))}
    </div>
  );
}

/* ───────── 미래: will과 be going to는 '언제 정했나'가 달라요 ───────── */

const FUTURE_EX: { en: string; ko: string }[] = [
  { en: "It's cold. I [[will close]] the window.", ko: "춥다. 내가 창문 닫을게." },
  { en: "We [[are {going to|숙어:~할 것이다 (예정)}]] watch a movie tonight.", ko: "우리 오늘 밤에 영화 볼 거야. (어제 정해 뒀어요)" },
];

/** will은 말하는 지금 막 정한 일, be going to는 미리 정해 둔 일 */
export function TnFutureTwo() {
  return (
    <div className="grid gap-2.5 sm:grid-cols-2">
      <Card>
        <p className="text-[15.5px] font-extrabold text-coral-ink">will + 동사원형</p>
        <p className="text-[14px] text-ink-2">말하는 지금, 막 정한 일 · 예측 · 의지</p>
        <Rail h={92} y={50} now={110} label="지금 막 정한 일이 미래로 이어져요">
          <path d="M118 50 H236" strokeWidth="4" strokeDasharray="7 6" strokeLinecap="round" style={coralStroke} />
          <Head x={240} y={50} />
          <circle cx="258" cy="50" r="9" fill="none" strokeWidth="3" style={{ stroke: "var(--mint-ink)" }} />
          <Tx x={110} y={24} tone="amber">
            막 정함
          </Tx>
          <Tx x={258} y={24}>
            할 일
          </Tx>
        </Rail>
        <p className="text-[1.03em] font-medium">
          <En en={FUTURE_EX[0].en} />
        </p>
        <p className="text-[14px] text-ink-2">{FUTURE_EX[0].ko}</p>
      </Card>
      <Card>
        <p className="text-[15.5px] font-extrabold text-coral-ink">be going to + 동사원형</p>
        <p className="text-[14px] text-ink-2">전부터 계획해 둔 일 · 눈앞의 증거</p>
        <Rail h={92} y={50} now={150} label="미리 정해 둔 계획이 지금을 지나 미래로 이어져요">
          <circle cx="52" cy="50" r="8" style={skyFill} />
          <path d="M60 50 H240" strokeWidth="4" strokeLinecap="round" style={coralStroke} />
          <Head x={244} y={50} />
          <circle cx="260" cy="50" r="9" fill="none" strokeWidth="3" style={{ stroke: "var(--mint-ink)" }} />
          <Tx x={52} y={24} tone="sky">
            미리 정함
          </Tx>
          <Tx x={260} y={24}>
            할 일
          </Tx>
        </Rail>
        <p className="text-[1.03em] font-medium">
          <En en={FUTURE_EX[1].en} />
        </p>
        <p className="text-[14px] text-ink-2">{FUTURE_EX[1].ko}</p>
      </Card>
    </div>
  );
}

/* ───────── 과거진행: 긴 구간 속에 끼어든 한 점 ───────── */

/** 과거진행은 그때 한창 하던 구간, 끼어든 일은 과거형 한 점 */
export function TnPastProgressive() {
  return (
    <div className="mx-auto max-w-xl">
      <Rail h={112} y={58} now={282} label="과거에 저녁을 먹던 긴 구간 가운데에 아빠가 도착한 한 점이 있어요">
        <rect x="36" y="46" width="170" height="24" rx="12" strokeWidth="2" style={{ fill: "var(--amber-soft)", stroke: "var(--amber-ink)" }} />
        <circle cx="132" cy="58" r="8" style={skyFill} />
        <Tx x={121} y={32} tone="amber">
          저녁 먹는 중
        </Tx>
        <Tx x={132} y={96} tone="sky">
          아빠 도착
        </Tx>
      </Rail>
      <p className="mt-1 text-[1.05em] font-medium">
        <En en="We [[were eating]] dinner {when|접속사:~할 때} Dad [[came]] home." />
      </p>
      <p className="text-[14px] text-ink-2">아빠가 집에 오셨을 때 우리는 저녁을 먹고 있었어.</p>
      <p className="mt-2 grid gap-1.5 text-[14px] font-bold sm:grid-cols-2">
        <span className="rounded-xl bg-amber-soft px-3 py-1.5 text-amber-ink">긴 구간: was/were + -ing</span>
        <span className="rounded-xl bg-sky-soft px-3 py-1.5 text-sky-ink">끼어든 한 점: 과거형 (came)</span>
      </p>
    </div>
  );
}

/* ───────── 과거형 vs 현재완료 ───────── */

/** 과거형은 과거의 한 점, 현재완료는 그 점에서 지금까지 이어진 화살표 */
export function TnPastVsPerfect() {
  return (
    <div className="grid gap-2.5 sm:grid-cols-2">
      <Card>
        <p className="text-[15.5px] font-extrabold text-sky-ink">과거형 lost</p>
        <p className="text-[14px] text-ink-2">어제의 한 점. 지금은 관심 밖이에요</p>
        <Rail h={94} y={46} now={252} label="과거의 한 점만 있고 지금과는 이어져 있지 않아요">
          <circle cx="70" cy="46" r="8" style={skyFill} />
          <text x="252" y="24" textAnchor="middle" fontSize="22" fontWeight="800" style={{ fill: "var(--ink-3)" }}>
            ?
          </text>
          <Tx x={70} y={80} tone="sky">
            잃어버림
          </Tx>
        </Rail>
        <p className="text-[1.03em] font-medium">
          <En en="I [[lost]] my key yesterday." />
        </p>
        <p className="text-[14px] text-ink-2">어제 열쇠를 잃어버렸어.</p>
        <p className="mt-1.5 rounded-lg bg-chip px-2.5 py-1 text-[14px] font-bold text-ink-2">지금은? 찾았는지 몰라요</p>
      </Card>
      <Card className="border-2 border-coral">
        <p className="text-[15.5px] font-extrabold text-coral-ink">현재완료 have lost</p>
        <p className="text-[14px] text-ink-2">과거의 일을 지금의 눈으로 봐요</p>
        <Rail h={94} y={46} now={252} label="과거에 잃어버린 일이 지금까지 이어져 있어요">
          <circle cx="70" cy="46" r="8" style={skyFill} />
          <path d="M76 36 Q160 0 244 30" fill="none" strokeWidth="4" strokeLinecap="round" style={coralStroke} />
          <Head x={244} y={30} deg={20} />
          <Tx x={70} y={80} tone="sky">
            잃어버림
          </Tx>
        </Rail>
        <p className="text-[1.03em] font-medium">
          <En en="I [[have lost]] my key." />
        </p>
        <p className="text-[14px] text-ink-2">열쇠를 잃어버렸어.</p>
        <p className="mt-1.5 rounded-lg bg-coral-soft px-2.5 py-1 text-[14px] font-bold text-coral-ink">그래서 지금 열쇠가 없어요</p>
      </Card>
    </div>
  );
}

/* ───────── 현재완료 네 가지 쓰임의 모양 ───────── */

type PerfectShape = "done" | "times" | "span" | "result";

const PERFECT_SHAPES: { name: string; desc: string; words: string; shape: PerfectShape; aria: string }[] = [
  { name: "완료", desc: "막 끝나서 지금 끝나 있어요", words: "just, already, yet", shape: "done", aria: "지금 바로 앞에서 끝난 짧은 화살표와 체크 표시" },
  { name: "경험", desc: "지금까지 통틀어 몇 번 해 봤는지", words: "ever, never, once, twice", shape: "times", aria: "과거 여기저기의 점들을 지금까지 한 괄호로 묶었어요" },
  { name: "계속", desc: "그때부터 지금까지 쭉", words: "for, since, how long", shape: "span", aria: "과거에서 지금까지 이어진 띠" },
  { name: "결과", desc: "그 일 때문에 지금 이런 상태", words: "lost, gone, broken", shape: "result", aria: "과거의 한 일에서 지금의 상태로 이어진 화살표" },
];

function PerfectPattern({ shape, aria }: { shape: PerfectShape; aria: string }) {
  return (
    <Rail h={70} y={32} now={252} label={aria}>
      {shape === "done" && (
        <>
          <path d="M186 24 Q216 6 242 20" fill="none" strokeWidth="4" strokeLinecap="round" style={coralStroke} />
          <Head x={242} y={20} deg={28} />
          <path d="M266 14 L273 21 L287 5" fill="none" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: "var(--mint-ink)" }} />
        </>
      )}
      {shape === "times" && (
        <>
          <path d="M36 18 V11 H252 V18" fill="none" strokeWidth="2" strokeDasharray="5 4" style={line} />
          {[56, 116, 176].map((x) => (
            <circle key={x} cx={x} cy="32" r="6.5" style={skyFill} />
          ))}
        </>
      )}
      {shape === "span" && (
        <>
          <rect x="58" y="24" width="194" height="16" rx="8" strokeWidth="2" style={{ fill: "var(--amber-soft)", stroke: "var(--amber-ink)" }} />
          <path d="M262 32 H296" strokeWidth="3" strokeDasharray="5 5" style={{ stroke: "var(--amber-ink)" }} />
        </>
      )}
      {shape === "result" && (
        <>
          <circle cx="86" cy="32" r="7" style={skyFill} />
          <path d="M92 24 Q164 -2 232 16" fill="none" strokeWidth="4" strokeLinecap="round" style={coralStroke} />
          <Head x={232} y={16} deg={15} />
          <circle cx="252" cy="32" r="15" fill="none" strokeWidth="3" style={coralStroke} />
        </>
      )}
    </Rail>
  );
}

function PerfectCard({ s }: { s: (typeof PERFECT_SHAPES)[number] }) {
  return (
    <>
      <p className="flex flex-wrap items-baseline gap-x-2">
        <span className="text-[15.5px] font-extrabold text-coral-ink">{s.name}의 모양</span>
        <span className="text-[14px] text-ink-2">{s.desc}</span>
      </p>
      <PerfectPattern shape={s.shape} aria={s.aria} />
      <p className="text-[14px] font-bold text-ink-3">
        자주 함께 쓰는 말: <span lang="en">{s.words}</span>
      </p>
    </>
  );
}

/**
 * 현재완료 네 가지 쓰임이 시간선 위에서 그리는 모양.
 * only를 주면 그 쓰임 하나만 작은 카드로 그린다(각 소제목 아래에 둘 때).
 */
export function TnPerfectShapes({ only }: { only?: PerfectShape }) {
  if (only) {
    const s = PERFECT_SHAPES.find((x) => x.shape === only)!;
    return (
      <figure className="my-5 mx-auto max-w-md rounded-2xl border border-line bg-card px-3.5 py-3">
        <PerfectCard s={s} />
      </figure>
    );
  }
  return (
    <div role="list" className="grid gap-2.5 sm:grid-cols-2">
      {PERFECT_SHAPES.map((s) => (
        <div role="listitem" key={s.name} className="rounded-2xl border border-line px-3.5 py-3">
          <PerfectCard s={s} />
        </div>
      ))}
    </div>
  );
}

/* ───────── for와 since ───────── */

const SINCE_CHIPS: { en: string }[] = [{ en: "since 2020" }, { en: "since Monday" }, { en: "since last week" }];
const FOR_CHIPS: { en: string }[] = [{ en: "for five years" }, { en: "for three days" }, { en: "for an hour" }];

/** since는 시작한 때(깃발), for는 그때부터 지금까지의 길이(괄호) */
export function TnForSince() {
  return (
    <div className="mx-auto max-w-xl">
      <Rail h={122} y={62} now={276} nowLabel="above" label="since는 시작한 한 점을, for는 그때부터 지금까지의 길이를 말해요">
        <path d="M56 62 V26" strokeWidth="3" style={{ stroke: "var(--sky-ink)" }} />
        <path d="M56 26 L82 33 L56 40 Z" style={skyFill} />
        <Tx x={56} y={16} tone="sky">
          시작한 때
        </Tx>
        <path d="M56 80 V88 H276 V80" fill="none" strokeWidth="2.5" style={{ stroke: "var(--amber-ink)" }} />
        <Tx x={166} y={112} tone="amber">
          기간 (얼마 동안)
        </Tx>
      </Rail>
      <div className="mt-2 grid gap-2.5 sm:grid-cols-2">
        <div className="rounded-2xl bg-sky-soft px-3.5 py-3">
          <p className="text-[15px] font-extrabold text-sky-ink">since + 시작한 때 · 언제부터?</p>
          <p className="mt-1.5 flex flex-wrap gap-1.5 text-[15px] font-medium">
            {SINCE_CHIPS.map((c) => (
              <span key={c.en} className="rounded-lg bg-card px-2 py-0.5">
                <En en={c.en} />
              </span>
            ))}
          </p>
          <p className="mt-2 text-[1.02em] font-medium">
            <En en="We [[have lived]] here [[since]] 2020." />
          </p>
          <p className="text-[14px] text-ink-2">우리는 2020년부터 여기 살고 있어.</p>
        </div>
        <div className="rounded-2xl bg-amber-soft px-3.5 py-3">
          <p className="text-[15px] font-extrabold text-amber-ink">for + 기간 · 얼마 동안?</p>
          <p className="mt-1.5 flex flex-wrap gap-1.5 text-[15px] font-medium">
            {FOR_CHIPS.map((c) => (
              <span key={c.en} className="rounded-lg bg-card px-2 py-0.5">
                <En en={c.en} />
              </span>
            ))}
          </p>
          <p className="mt-2 text-[1.02em] font-medium">
            <En en="We [[have lived]] here [[for]] five years." />
          </p>
          <p className="text-[14px] text-ink-2">우리는 5년째 여기 살고 있어.</p>
        </div>
      </div>
    </div>
  );
}

/* ───────── 과거완료: 두 개의 과거에 번호 붙이기 ───────── */

/** 먼저 일어난 과거는 had + p.p., 기준이 되는 과거는 과거형 */
export function TnPastPerfectOrder() {
  return (
    <div className="mx-auto max-w-xl">
      <Rail h={116} y={60} now={286} label="먼저 수업이 시작하고, 그다음에 내가 도착했어요. 둘 다 지금보다 과거예요">
        <path d="M84 46 Q128 28 168 42" fill="none" strokeWidth="3" strokeLinecap="round" style={coralStroke} />
        <Head x={168} y={42} deg={19} w={3} />
        <circle cx="70" cy="60" r="9" style={skyFill} />
        <circle cx="186" cy="60" r="9" style={{ fill: "var(--ink)" }} />
        <Tx x={70} y={26} tone="sky">
          ① 수업 시작
        </Tx>
        <Tx x={186} y={26}>
          ② 내가 도착
        </Tx>
        <Tx x={70} y={96} tone="sky">
          had + p.p.
        </Tx>
        <Tx x={186} y={96}>
          과거형
        </Tx>
      </Rail>
      <p className="mt-1 text-[1.05em] font-medium">
        <En en="The class [[had started]] {when|접속사:~할 때} I [[arrived]] at school." />
      </p>
      <p className="text-[14px] text-ink-2">내가 학교에 도착했을 때 수업은 이미 시작했었어.</p>
      <div className="mt-3 rounded-2xl bg-chip px-3.5 py-3">
        <p className="text-[14px] font-extrabold text-ink-2">말하는 순서와 일어난 순서는 다를 수 있어요</p>
        <p className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[1.03em] font-medium">
          <span className="inline-flex items-center gap-1.5">
            <span className="grid size-6 shrink-0 place-items-center rounded-full bg-ink text-[14px] font-extrabold text-bg">②</span>
            <En en="I [[found]] the book" />
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="grid size-6 shrink-0 place-items-center rounded-full bg-sky-soft text-[14px] font-extrabold text-sky-ink">①</span>
          <En en="{that|관계대명사:~한 (앞의 명사 book을 꾸며요)} I [[had lost]]." />
          </span>
        </p>
        <p className="text-[14px] text-ink-2">나는 잃어버렸던 책을 찾았어. 문장에서는 ②가 먼저 나와도, 먼저 일어난 일은 ①이에요.</p>
      </div>
    </div>
  );
}

/* ───────── 미래완료: 기준 시점 깃발 앞에서 끝내기 ───────── */

/** 미래의 기준 시점(by ~)까지는 다 끝나 있을 일 */
export function TnDeadline() {
  return (
    <div className="mx-auto max-w-xl">
      <p className="flex flex-wrap items-center justify-center gap-1.5 text-[15px] font-extrabold">
        <span className="rounded-lg bg-coral px-2.5 py-1 text-white">will have + p.p.</span>
        <span className="text-ink-3">+</span>
        <span className="rounded-lg bg-sky-soft px-2.5 py-1 text-sky-ink">by + 미래 시점</span>
        <span className="text-[14px] text-ink-2">= 그때까지는 다 ~해 두었을 것이다</span>
      </p>
      <Rail h={114} y={60} now={40} label="지금부터 일을 해서, 미래의 기준 시점인 7시가 되기 전에 끝나 있어요">
        <path d="M48 60 H186" strokeWidth="5" strokeLinecap="round" style={coralStroke} />
        <circle cx="200" cy="60" r="11" style={{ fill: "var(--mint-ink)" }} />
        <path d="M194 60 L198.5 64.5 L206 55" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: "var(--card)" }} />
        <path d="M262 60 V24" strokeWidth="3" style={{ stroke: "var(--ink)" }} />
        <path d="M262 24 L288 31 L262 38 Z" style={{ fill: "var(--ink)" }} />
        <Tx x={200} y={34} tone="mint">
          다 끝냄
        </Tx>
        <Tx x={262} y={16}>
          7시
        </Tx>
        <Tx x={262} y={94}>
          기준 시점
        </Tx>
      </Rail>
      <p className="mt-1 text-[1.05em] font-medium">
        <En en="Mom [[will have cooked]] dinner by seven." />
      </p>
      <p className="text-[14px] text-ink-2">7시까지는 엄마가 저녁을 다 해 두셨을 거야.</p>
    </div>
  );
}

/* ───────── 현재완료진행: 두 틀이 합쳐진 모양 ───────── */

/** have + p.p.(지금까지)와 be + -ing(하는 중)가 합쳐져 have been + -ing */
export function TnPerfectProgMerge() {
  return (
    <div className="mx-auto max-w-xl">
      <div className="flex flex-col items-center justify-center gap-1.5 text-center sm:flex-row sm:gap-2">
        <div className="rounded-xl bg-sky-soft px-3 py-2 text-sky-ink">
          <p className="text-[14px] font-bold">현재완료 · 지금까지</p>
          <p lang="en" className="text-[16px] font-extrabold">
            have + p.p.
          </p>
        </div>
        <span aria-hidden className="text-[18px] font-extrabold text-ink-3">
          +
        </span>
        <div className="rounded-xl bg-amber-soft px-3 py-2 text-amber-ink">
          <p className="text-[14px] font-bold">진행형 · 한창 하는 중</p>
          <p lang="en" className="text-[16px] font-extrabold">
            be + -ing
          </p>
        </div>
        <span aria-hidden className="text-[18px] font-extrabold text-ink-3">
          =
        </span>
        <div className="rounded-xl bg-coral px-3 py-2 text-white">
          <p className="text-[14px] font-bold">현재완료진행</p>
          <p lang="en" className="text-[16px] font-extrabold">
            have + been + -ing
          </p>
        </div>
      </div>
      <p className="mt-2 text-center text-[14px] text-ink-2">
        진행형의 be가 have 뒤에 오면서 p.p. 모양 <b lang="en">been</b>으로 바뀌었어요.
      </p>
      <Rail h={100} y={52} now={228} label="과거에 시작해서 지금도 계속 진행되고 있어요">
        <rect x="50" y="42" width="178" height="20" rx="10" strokeWidth="2" style={{ fill: "var(--amber-soft)", stroke: "var(--amber-ink)" }} />
        <path d="M238 52 H292" strokeWidth="3.5" strokeDasharray="6 6" style={{ stroke: "var(--amber-ink)" }} />
        <circle cx="50" cy="52" r="7" style={skyFill} />
        <Tx x={50} y={86} tone="sky">
          시작
        </Tx>
        <Tx x={270} y={30} tone="amber">
          계속 중
        </Tx>
      </Rail>
      <p className="text-[1.05em] font-medium">
        <En en="It [[has been snowing]] since last night." />
      </p>
      <p className="text-[14px] text-ink-2">어젯밤부터 계속 눈이 오고 있어. (지금도 와요)</p>
    </div>
  );
}

/* ───────── 부사절과 명사절: 빼 보면 알아요 ───────── */

type SlotKind = "adv" | "noun" | "main" | "gap";

const SLOT_TONE: Record<SlotKind, string> = {
  adv: "border-2 border-dashed border-mint-ink bg-mint-soft text-mint-ink",
  noun: "bg-sky-soft text-sky-ink",
  main: "border border-line",
  gap: "border-2 border-dashed border-ink-3 text-ink-3",
};

const CLAUSE_SLOTS: {
  title: string;
  tone: "mint" | "sky";
  parts: { en: string; kind: SlotKind; label?: string }[];
  rest: { en?: string; kind: SlotKind }[];
  ok: boolean;
  note: string;
}[] = [
  {
    title: "부사절: 빼도 문장이 서요",
    tone: "mint",
    parts: [
      { en: "{When|접속사:~할 때} Dad comes back,", kind: "adv", label: "부사절 · 언제?" },
      { en: "we will eat dinner.", kind: "main" },
    ],
    rest: [{ en: "We will eat dinner.", kind: "main" }],
    ok: true,
    note: "때를 덧붙이는 부사 같은 절이에요. 빼도 문장이 완전해요.",
  },
  {
    title: "명사절: 빼면 자리가 비어요",
    tone: "sky",
    parts: [
      { en: "I don't know", kind: "main" },
      { en: "when Dad will come back.", kind: "noun", label: "know의 목적어 · 무엇을?" },
    ],
    rest: [{ en: "I don't know", kind: "main" }, { kind: "gap" }],
    ok: false,
    note: "무엇을 모르는지가 바로 이 절이에요. 목적어 자리를 차지한 명사 같은 절이라, 빼면 알맹이가 사라져요.",
  },
];

/** 부사절은 빼도 되는 덧붙임, 명사절은 문장의 자리(주어·목적어)를 차지한다 */
export function TnClauseSlots() {
  return (
    <div role="list" className="grid gap-2.5">
      {CLAUSE_SLOTS.map((r) => (
        <div role="listitem" key={r.title} className="rounded-2xl border border-line px-3.5 py-3">
          <p className={`text-[15px] font-extrabold ${r.tone === "mint" ? "text-mint-ink" : "text-sky-ink"}`}>{r.title}</p>
          <p className="mt-2 flex flex-wrap items-start gap-x-1.5 gap-y-2">
            {r.parts.map((p) => (
              <span key={p.en} className="inline-flex flex-col items-start gap-1">
                <span className={`rounded-lg px-2.5 py-1 text-[1.04em] font-medium ${SLOT_TONE[p.kind]}`}>
                  <En en={p.en} />
                </span>
                {p.label && <span className="text-[14px] font-bold text-ink-2">{p.label}</span>}
              </span>
            ))}
          </p>
          <p className="mt-2 flex flex-wrap items-center gap-1.5 text-[14px]">
            <span className="font-extrabold text-ink-3">빼 보면</span>
            {r.rest.map((p, i) =>
              p.en === undefined ? (
                <span key={i} className={`rounded-lg px-3 py-0.5 font-bold ${SLOT_TONE.gap}`}>
                  무엇을?
                </span>
              ) : (
                <span key={i} className={`rounded-lg px-2 py-0.5 text-[15px] font-medium ${SLOT_TONE[p.kind]}`}>
                  <En en={p.en} />
                </span>
              ),
            )}
            <span
              aria-label={r.ok ? "문장이 그대로예요" : "빈자리가 생겨요"}
              className={`grid size-6 place-items-center rounded-full text-[14px] font-extrabold ${
                r.ok ? "bg-mint-soft text-mint-ink" : "bg-coral-soft text-coral-ink"
              }`}
            >
              {r.ok ? "✓" : "✕"}
            </span>
          </p>
          <p className="mt-1.5 text-[14px] text-ink-2">{r.note}</p>
        </div>
      ))}
    </div>
  );
}

/* ───────── 접속사 1개 → 진짜 동사 2개 ───────── */

const CLAUSE_VERBS: { en: string; kind?: "conj" | "verb"; tag?: string }[] = [
  { en: "If", kind: "conj", tag: "접속사" },
  { en: "you" },
  { en: "study", kind: "verb", tag: "동사 1 · 현재형" },
  { en: "hard," },
  { en: "you" },
  { en: "will {pass|동사:(시험에) 합격하다}", kind: "verb", tag: "동사 2 · will" },
  { en: "the test." },
];

/** 부사절에도 진짜 동사가 하나. 미래 표시 will은 주절에만 */
export function TnClauseVerbs() {
  return (
    <div className="text-center">
      <p className="inline-flex flex-wrap items-center justify-center gap-2 text-[15px] font-extrabold">
        <span className="rounded-xl bg-sky-soft px-3 py-1.5 text-sky-ink">접속사 1개</span>
        <span>+ 1 =</span>
        <span className="rounded-xl bg-coral px-3 py-1.5 text-white">진짜 동사 2개</span>
      </p>
      <p className="mt-4 flex flex-wrap items-end justify-center gap-x-1.5 gap-y-3 text-[1.2em] font-medium">
        {CLAUSE_VERBS.map((w, i) => (
          <span key={i} className="inline-flex flex-col items-center gap-1">
            <CrownIcon size={22} className={w.kind === "verb" ? "text-coral" : "invisible"} />
            <span
              className={`rounded-lg px-2 py-1 ${
                w.kind === "verb" ? "bg-coral text-white" : w.kind === "conj" ? "bg-sky-soft text-sky-ink" : ""
              }`}
            >
              <En en={w.en} />
            </span>
            <span className={`text-[14px] font-extrabold ${w.kind === "verb" ? "text-coral-ink" : w.tag ? "text-sky-ink" : "invisible"}`}>{w.tag ?? "·"}</span>
          </span>
        ))}
      </p>
      <p className="mt-3 text-[14px] text-ink-2">
        두 절에 진짜 동사가 하나씩 있어요. 미래라는 표시(will)는 주절이 맡고, if절의 동사는 현재형으로 가볍게 써요.
      </p>
    </div>
  );
}
