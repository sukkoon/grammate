import type { Metadata } from "next";
import Link from "next/link";
import { Mate } from "@/components/brand/Mate";
import { ReadMark } from "@/components/lesson/ReadMark";
import { Phrases } from "@/components/text/Phrases";
import { findUnit, unitHref } from "@/content/curriculum";
import { suneungGuide } from "@/content/suneung-guide";

export const metadata: Metadata = {
  title: "수능 문법",
  description: "그래머랑에서 쌓은 문법 기초로 수능 영어의 문법 문제를 푸는 법. 수능에 자주 나오는 문법과 수능형 예시 문제를 한곳에 모았어요.",
};

const KICE = "https://www.suneung.re.kr/";

/** 공부 순서: 기초 → 수능 포인트 → 실전 */
const STEPS = [
  {
    title: "기초 다지기",
    text: "품사, 문장의 형식, 준동사, 관계사처럼 앞에서 배운 문법이 수능 문제의 재료예요. 낯선 곳이 있다면 먼저 다지고 와요.",
    links: [
      { label: "필수 문법", href: "/roadmap" },
      { label: "각 단원별 학습", href: "/start" },
    ],
  },
  {
    title: "수능 포인트 익히기",
    text: "배운 문법을 수능 문제의 눈으로 다시 묶어요. 어디를 먼저 보고 무엇을 확인하는지, 푸는 순서를 몸에 익혀요.",
    links: [{ label: "첫 단원부터", href: "/learn/suneung/agreement" }],
  },
  {
    title: "실전 지문으로 연습",
    text: "밑줄 다섯 개가 있는 긴 지문에서 점검표를 차례차례 써 봐요. 누를 때마다 다른 문제가 나와요.",
    links: [{ label: "실전 세트", href: "/learn/suneung/practice" }],
  },
];

/** 수능 문법: 제7부를 따로 모은 안내 페이지. 앞 단원의 기초가 수능 문제로 어떻게 이어지는지 보여 준다 */
export default function SuneungPage() {
  const items = suneungGuide.flatMap((g) => {
    const [chapter, unit] = g.unit.split("/");
    const ref = findUnit(chapter, unit);
    return ref?.unit.ready ? [{ ...g, ref }] : [];
  });

  return (
    <div className="mx-auto max-w-4xl px-4 pb-10 pt-10 sm:px-6">
      <h1 className="text-[2rem] font-extrabold tracking-[-0.02em]">수능 문법</h1>
      <p className="mt-2 text-ink-2">
        <Phrases
          text={`수능 영어 어법 문제는 낯선 문법을 묻지 않아요.
그래머랑에서 품사부터 준동사, 관계사까지 차근차근 쌓아 온 바로 그 문법이 나와요.
기초만 단단히 다져 두면 수능 문제도 자신 있게 풀 수 있어요.`}
        />
      </p>

      <div className="mt-5 flex gap-3 rounded-2xl bg-card px-4 py-4 ring-1 ring-line sm:px-5">
        <Mate mood="cheer" size={40} className="shrink-0 text-ink" />
        <p className="text-[14.5px] text-ink-2">
          <Phrases
            text={`수능 문법은 새로 외우는 곳이 아니라, 이미 배운 문법을 시험 문제의 눈으로 다시 묶는 곳이에요.
문제를 풀다 멈칫한 곳이 있으면 아래의 ‘바탕이 되는 단원’으로 돌아가 한 번 더 다지면 돼요.`}
          />
        </p>
      </div>

      <section aria-labelledby="how" className="mt-10">
        <h2 id="how" className="text-[1.45rem] font-extrabold">
          이렇게 공부해요
        </h2>
        <ol className="mt-4 grid gap-3 sm:grid-cols-3">
          {STEPS.map((s, i) => (
            <li key={s.title} className="flex flex-col rounded-2xl border border-line bg-card px-4 py-4">
              <span className="flex items-center gap-2">
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-ink text-[14px] font-extrabold text-on-ink">{i + 1}</span>
                <span className="font-extrabold">{s.title}</span>
              </span>
              <span className="mt-2 flex-1 text-[14px] text-ink-2">
                <Phrases text={s.text} />
              </span>
              <span className="mt-3 flex flex-wrap gap-1.5">
                {s.links.map((l) => (
                  <Link key={l.href} href={l.href} className="rounded-lg bg-chip px-2.5 py-1 text-[13.5px] font-bold text-coral-ink hover:bg-line">
                    {l.label} ›
                  </Link>
                ))}
              </span>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="points" className="mt-12">
        <div className="border-b-2 border-ink pb-2">
          <h2 id="points" className="text-[1.45rem] font-extrabold">
            수능에 자주 나오는 문법
          </h2>
        </div>
        <p className="mt-3 text-ink-2">
          <Phrases text="단원마다 수능에서 무엇을 묻는지, 어느 단원에서 배운 것이 바탕이 되는지 적어 두었어요." />
        </p>
        <ol className="mt-5 space-y-3">
          {items.map(({ ref, asks, bases }, i) => {
            const href = unitHref(ref.chapter.slug, ref.unit.slug);
            return (
              <li key={href} className="rounded-2xl border border-line bg-card px-4 py-4 sm:px-5">
                <div className="flex items-start justify-between gap-2">
                  <Link href={href} className="font-extrabold hover:text-coral-ink">
                    {i + 1}. {ref.unit.title}
                  </Link>
                  <ReadMark unit={`${ref.chapter.slug}/${ref.unit.slug}`} />
                </div>
                {ref.unit.summary && (
                  <p className="mt-1 text-[14px] text-ink-2">
                    <Phrases text={ref.unit.summary} />
                  </p>
                )}
                <p className="mt-3 rounded-xl bg-amber-soft px-3 py-2.5 text-[14px]">
                  <b className="mr-1.5 text-amber-ink">수능에서는</b>
                  <Phrases text={asks} />
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-1.5">
                  {bases.length > 0 && <span className="mr-1 text-[13px] font-extrabold text-ink-3">바탕이 되는 단원</span>}
                  {bases.map((b) => (
                    <Link key={b.href} href={b.href} className="rounded-lg bg-chip px-2.5 py-1 text-[13.5px] font-bold text-ink-2 hover:bg-line hover:text-ink">
                      {b.label}
                    </Link>
                  ))}
                  <Link href={href} className="ml-auto rounded-lg bg-ink px-3 py-1.5 text-[13.5px] font-bold text-on-ink hover:bg-ink/85">
                    단원으로 가기 ›
                  </Link>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      <section aria-labelledby="examples" className="mt-12 rounded-2xl border border-line bg-card px-4 py-5 sm:px-5">
        <div className="flex items-center gap-2">
          <span className="rounded-lg bg-amber-soft px-2 py-0.5 text-[12.5px] font-extrabold text-amber-ink">수능형</span>
          <h2 id="examples" className="text-[1.2rem] font-extrabold">
            예시 문제로 확인해요
          </h2>
        </div>
        <p className="mt-2 text-[14.5px] text-ink-2">
          <Phrases
            text={`단원마다 ‘예시 보기’를 누르면 수능 문제와 같은 형식의 문제가 나와요. 누를 때마다 다른 문제가 나오고, 정답과 밑줄마다의 풀이도 볼 수 있어요.
모두 그래머랑이 새로 만든 문제예요. 실제 기출문제는 한국교육과정평가원 수능 누리집에서 무료로 볼 수 있어요.`}
          />
        </p>
        <a href={KICE} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-[13.5px] font-bold text-coral-ink hover:underline">
          한국교육과정평가원 수능 누리집
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden>
            <path d="M7 17 17 7M9 7h8v8" />
          </svg>
        </a>
      </section>

      <p className="mt-8 flex items-start gap-2 rounded-2xl bg-chip px-4 py-3 text-[14px]">
        <Mate mood="wink" size={24} className="mt-0.5 shrink-0 text-ink" />
        <span>
          <Phrases text="몇 문제를 맞혔는지보다 ‘어디서 멈칫했는지’가 더 중요해요. 헷갈린 곳을 적어 두고 바탕이 되는 단원으로 돌아가면, 다음에는 훨씬 가볍게 풀 수 있어요." />
        </span>
      </p>
    </div>
  );
}
