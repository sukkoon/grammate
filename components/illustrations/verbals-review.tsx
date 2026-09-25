import type { ReactNode } from "react";
import { En } from "@/components/lesson/En";
import { CrownIcon, MaskIcon } from "./icons";

/* 준동사 종합 그림: 동사 vs 준동사 판단 순서, 자리별 변장표, 능동 -ing vs 수동 p.p. */

/* ───────── 공통 도우미 ───────── */

function StepNo({ n }: { n: number }) {
  return (
    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-ink text-[15px] font-extrabold text-bg" aria-hidden>
      {n}
    </span>
  );
}

function Step({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <li className="rounded-2xl border border-line px-4 py-3">
      <p className="flex items-center gap-2.5">
        <StepNo n={n} />
        <span className="text-[16px] font-extrabold">{title}</span>
      </p>
      <div className="mt-2 text-[14.5px]">{children}</div>
    </li>
  );
}

/* ───────── 1. 동사일까, 준동사일까: 판단 순서 ───────── */

/** 밑줄 친 동사를 만나면 묻는 네 가지 질문 */
export function VrDecisionTree() {
  return (
    <div>
      <ol className="grid gap-2.5">
        <Step n={1} title="접속사·관계사를 세요">
          <p>
            진짜 동사 자리 수 = <span className="font-extrabold text-coral-ink">접속사·관계사 개수 + 1</span>
          </p>
          <p className="mt-1 text-ink-2">생략된 that, 생략된 목적격 관계대명사도 하나로 세요.</p>
        </Step>
        <Step n={2} title="진짜 동사 자리가 남았나요?">
          <div className="grid gap-2 sm:grid-cols-2">
            <p className="flex items-start gap-2 rounded-xl bg-coral-soft px-3 py-2 text-coral-ink">
              <CrownIcon size={18} className="mt-0.5 shrink-0" />
              <span>
                <span className="font-extrabold">남았다</span> → 진짜 동사. 주어와 수, 시제를 맞춰요.
              </span>
            </p>
            <p className="flex items-start gap-2 rounded-xl bg-sky-soft px-3 py-2 text-sky-ink">
              <MaskIcon size={18} className="mt-0.5 shrink-0" />
              <span>
                <span className="font-extrabold">다 찼다</span> → 준동사로 변장해요.
              </span>
            </p>
          </div>
        </Step>
        <Step n={3} title="변장이라면, 어느 자리인가요?">
          <ul className="grid gap-1.5 sm:grid-cols-3">
            <li className="rounded-xl bg-chip px-3 py-2">
              <span className="font-extrabold">명사 자리</span>
              <br />
              to부정사 · 동명사
            </li>
            <li className="rounded-xl bg-chip px-3 py-2">
              <span className="font-extrabold">명사 꾸밈</span>
              <br />
              분사 · to부정사
            </li>
            <li className="rounded-xl bg-chip px-3 py-2">
              <span className="font-extrabold">문장에 덧붙임</span>
              <br />
              분사구문 · to부정사
            </li>
          </ul>
        </Step>
        <Step n={4} title="하는 쪽인가요, 당하는 쪽인가요?">
          <p>
            <span className="font-extrabold text-mint-ink">하면 -ing</span> (to 동사원형), <span className="font-extrabold text-amber-ink">당하면 p.p.</span> (to be p.p.)
          </p>
        </Step>
      </ol>
      <div className="mt-3 rounded-2xl border-2 border-coral px-4 py-3">
        <p className="text-[14px] font-extrabold text-coral-ink">따라 해 보기</p>
        <p className="mt-1 text-[1.05em] font-medium">
          <En en="The boy (playing / plays) soccer over there is my cousin." />
        </p>
        <p className="mt-1 text-[14.5px] text-ink-2">
          ① 접속사·관계사 0개 → 진짜 동사 자리 1개 ② 이미 is가 차지 ③ boy를 꾸미는 자리 ④ 소년이 축구를 하니까 →{" "}
          <span className="font-extrabold text-ink">playing</span>
        </p>
      </div>
    </div>
  );
}

/* ───────── 2. 자리별 변장표 ───────── */

const SLOTS: { slot: string; tone: string; costumes: string; rows: { en: string; ko: string }[] }[] = [
  {
    slot: "명사 자리",
    tone: "bg-sky-soft text-sky-ink",
    costumes: "주어·목적어·보어·전치사 뒤",
    rows: [
      { en: "[[Keeping]] a diary is not easy.", ko: "동명사 주어" },
      { en: "She decided [[to learn]] the guitar.", ko: "to부정사 목적어" },
      { en: "Thank you for [[helping]] me.", ko: "전치사 뒤는 동명사" },
    ],
  },
  {
    slot: "명사 꾸밈",
    tone: "bg-mint-soft text-mint-ink",
    costumes: "명사 앞뒤",
    rows: [
      { en: "Look at the [[sleeping]] cat.", ko: "현재분사: 자고 있는" },
      { en: "I found a [[broken]] cup.", ko: "과거분사: 깨진" },
      { en: "I need something [[to drink]].", ko: "to부정사: 마실" },
    ],
  },
  {
    slot: "문장에 덧붙임",
    tone: "bg-amber-soft text-amber-ink",
    costumes: "문장 앞뒤, 쉼표와 함께",
    rows: [
      { en: "[[Hearing]] the news, he smiled.", ko: "분사구문: 듣고서" },
      { en: "He ran [[to catch]] the bus.", ko: "to부정사: 잡으려고" },
    ],
  },
];

/** 준동사는 서는 자리에 맞는 변장을 골라요 */
export function VrSlotMap() {
  return (
    <ul className="grid gap-2.5 md:grid-cols-3">
      {SLOTS.map((s) => (
        <li key={s.slot} className="flex flex-col rounded-2xl border border-line">
          <div className={`rounded-t-2xl px-4 py-2.5 ${s.tone}`}>
            <p className="text-[16px] font-extrabold">{s.slot}</p>
            <p className="text-[14px] font-bold">{s.costumes}</p>
          </div>
          <ul className="grid gap-2 px-4 py-3">
            {s.rows.map((r) => (
              <li key={r.en}>
                <p className="text-[1.03em] font-medium">
                  <En en={r.en} />
                </p>
                <p className="text-[14px] text-ink-2">{r.ko}</p>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}

/* ───────── 3. 능동 -ing vs 수동 p.p. ───────── */

const PAIRS: { who: string; active: { en: string; ko: string }; passive: { en: string; ko: string } }[] = [
  {
    who: "명사를 꾸밀 때",
    active: { en: "the girl [[singing]] on the stage", ko: "무대에서 노래하는 소녀 (소녀가 부름)" },
    passive: { en: "the song [[sung]] by the girl", ko: "그 소녀가 부른 노래 (노래가 불림)" },
  },
  {
    who: "분사구문일 때",
    active: { en: "[[Seeing]] me, she waved.", ko: "나를 보고 그녀가 손을 흔들었어. (그녀가 봄)" },
    passive: { en: "[[Seen]] from the sky, the island looks like a heart.", ko: "하늘에서 보면 그 섬은 하트 같아. (섬이 보임)" },
  },
];

/** 꾸밈을 받는 말(의미상 주어)이 하면 -ing, 당하면 p.p. */
export function VrActivePassive() {
  return (
    <div>
      <ul className="grid gap-2.5">
        {PAIRS.map((p) => (
          <li key={p.who} className="rounded-2xl border border-line px-4 py-3">
            <p className="text-[14px] font-extrabold text-ink-3">{p.who}</p>
            <div className="mt-1.5 grid gap-2 sm:grid-cols-2">
              <div className="rounded-xl bg-mint-soft px-3 py-2">
                <p className="text-[14px] font-extrabold text-mint-ink">한다 → -ing</p>
                <p className="text-[1.03em] font-medium">
                  <En en={p.active.en} />
                </p>
                <p className="text-[14px] text-ink-2">{p.active.ko}</p>
              </div>
              <div className="rounded-xl bg-amber-soft px-3 py-2">
                <p className="text-[14px] font-extrabold text-amber-ink">당한다 → p.p.</p>
                <p className="text-[1.03em] font-medium">
                  <En en={p.passive.en} />
                </p>
                <p className="text-[14px] text-ink-2">{p.passive.ko}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-3 rounded-2xl bg-chip px-4 py-3 text-[14.5px]">
        <span className="font-extrabold">확인법:</span> 꾸밈을 받는 말을 주어로 세우고 be + p.p.를 붙여 봐요.{" "}
        <span lang="en" className="font-bold">
          The song is sung.
        </span>{" "}
        말이 되면 p.p., 어색하면 -ing예요.
      </p>
    </div>
  );
}
