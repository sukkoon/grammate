import type { ReactNode } from "react";
import { En } from "@/components/lesson/En";

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
      <text x="180" y={y + 38} textAnchor="middle" fontSize="15" fontWeight="700" style={{ fill: "var(--coral-ink)" }}>
        지금
      </text>
    </>
  );
}

/** 현재·과거·미래를 한 줄에 */
export function TnTimeline() {
  return (
    <div>
      <svg viewBox="0 0 360 120" className="mx-auto w-full max-w-xl" role="img" aria-label="과거, 지금, 미래 시간선">
        <Axis />
        <circle cx="70" cy="70" r="9" style={{ fill: "var(--sky-ink)" }} />
        <text x="70" y="40" textAnchor="middle" fontSize="15" fontWeight="700" style={ink}>
          과거
        </text>
        <circle cx="290" cy="70" r="9" fill="none" strokeWidth="3" strokeDasharray="3 3" style={{ stroke: "var(--mint-ink)" }} />
        <text x="290" y="40" textAnchor="middle" fontSize="15" fontWeight="700" style={ink}>
          미래
        </text>
        <path d="M120 58 Q180 20 240 58" fill="none" strokeWidth="2" strokeDasharray="4 5" style={line} />
        <text x="180" y="22" textAnchor="middle" fontSize="13.5" style={ink2}>
          현재형: 어제도 오늘도 내일도
        </text>
      </svg>
      <ul className="mt-2 grid gap-2 text-[15px] sm:grid-cols-3">
        <li className="rounded-xl bg-sky-soft px-3 py-2 text-sky-ink">
          <b>과거</b>
          <span className="block font-medium">
            <En en="I [[played]] soccer." />
          </span>
        </li>
        <li className="rounded-xl bg-coral-soft px-3 py-2 text-coral-ink">
          <b>현재 (늘 그런 일)</b>
          <span className="block font-medium">
            <En en="I [[play]] soccer." />
          </span>
        </li>
        <li className="rounded-xl bg-mint-soft px-3 py-2 text-mint-ink">
          <b>미래</b>
          <span className="block font-medium">
            <En en="I [[will play]] soccer." />
          </span>
        </li>
      </ul>
    </div>
  );
}

/** 진행형: 한 점이 아니라 그 앞뒤로 이어지는 구간 */
export function TnProgressive() {
  return (
    <svg viewBox="0 0 360 130" className="mx-auto w-full max-w-xl" role="img" aria-label="진행형은 지금을 가운데 둔 진행 중인 구간">
      <Axis y={72} />
      <rect x="110" y="60" width="140" height="24" rx="12" style={{ fill: "var(--amber-soft)", stroke: "var(--amber-ink)" }} strokeWidth="2" />
      <text x="180" y="42" textAnchor="middle" fontSize="15" fontWeight="700" style={ink}>
        be + -ing: 한창 하는 중
      </text>
      <text x="126" y="112" textAnchor="middle" fontSize="13.5" style={ink2}>
        시작
      </text>
      <text x="236" y="112" textAnchor="middle" fontSize="13.5" style={ink2}>
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
      <svg viewBox="0 0 360 120" className="mx-auto w-full max-w-xl" role="img" aria-label="과거에서 지금까지 이어진 화살표">
        <Axis />
        <circle cx="60" cy="70" r="8" style={{ fill: "var(--sky-ink)" }} />
        <path d="M60 58 Q120 12 176 50" fill="none" strokeWidth="4" strokeLinecap="round" style={{ stroke: "var(--coral)" }} />
        <path d="M164 42 L178 52 L162 58" fill="none" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: "var(--coral)" }} />
        <text x="112" y="22" textAnchor="middle" fontSize="15" fontWeight="700" style={ink}>
          have + p.p.
        </text>
        <text x="60" y="104" textAnchor="middle" fontSize="13.5" style={ink2}>
          과거에 시작
        </text>
      </svg>
      <ul className="mt-2 grid gap-2 sm:grid-cols-2">
        {uses.map((u) => (
          <li key={u.name} className="rounded-xl border border-line px-3 py-2.5">
            <p className="text-[14px] font-extrabold text-coral-ink">
              {u.name} <span className="font-normal text-ink-3">· {u.words}</span>
            </p>
            <p className="text-[15.5px] font-medium">
              <En en={u.en} />
            </p>
            <p className="text-[14px] text-ink-2">{u.ko}</p>
          </li>
        ))}
      </ul>
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
    <div className="grid gap-3 sm:grid-cols-3">
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
