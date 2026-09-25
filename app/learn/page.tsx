import type { Metadata } from "next";
import Link from "next/link";
import { Phrases } from "@/components/text/Phrases";
import { allUnits, curriculum } from "@/content/curriculum";

export const metadata: Metadata = {
  title: "전체 목차",
  description: "서장부터 제7부 수능 어법까지, 그래머랑 영어 문법의 전체 목차.",
};

/** 전체 목차: 부와 장 이름만 한눈에. 단원 요약과 수준은 각 단원별 학습(/start)에서 본다. */
export default function LearnPage() {
  const total = allUnits().length;
  const chapters = curriculum.reduce((n, p) => n + p.chapters.length, 0);
  return (
    <div className="mx-auto max-w-4xl px-4 pb-10 pt-10 sm:px-6">
      <h1 className="text-[2rem] font-extrabold tracking-[-0.02em]">전체 목차</h1>
      <p className="mt-2 text-ink-2">
        <Phrases
          text={`다양한 문법책의 목차와 구성을 하나하나 살펴봤어요.
그중 먼저 배워야 할 것과 나중에 익혀도 될 것을 나누고, 서장과 7부, ${chapters}장 ${total}개 단원으로 다시 엮었어요.
장 이름을 누르면 그 장의 단원 목록으로 가요.`}
        />
      </p>
      <p className="mt-3 flex flex-wrap gap-2">
        <Link href="/start" className="inline-flex items-center rounded-lg bg-ink px-4 py-2 text-[14.5px] font-bold text-on-ink hover:bg-ink/85">
          각 단원별 학습으로 가기 ›
        </Link>
        <Link href="/roadmap" className="inline-flex items-center rounded-lg bg-coral-soft px-4 py-2 text-[14.5px] font-bold text-coral-ink hover:bg-coral-soft/70">
          내 수준에서 꼭 알아야 할 문법만 골라 보기 ›
        </Link>
      </p>

      <ol className="mt-8 grid gap-3 sm:grid-cols-2">
        {curriculum.map((part) => (
          <li key={part.id} className="rounded-2xl border border-line bg-card px-4 py-4 sm:px-5">
            <p className="flex items-baseline gap-2">
              <span className="text-[14.5px] font-extrabold text-coral-ink">{part.label}</span>
              <Link href={`/start#part-${part.id}`} className="text-[1.2rem] font-extrabold text-ink hover:text-coral-ink">
                {part.title}
              </Link>
            </p>
            <ol className="mt-3 flex flex-wrap gap-1.5">
              {part.chapters.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/start#${c.slug}`}
                    className="inline-block rounded-lg bg-chip px-3 py-1.5 text-[14px] font-bold text-ink ring-1 ring-line hover:bg-ink hover:text-on-ink hover:ring-ink"
                  >
                    {c.title}
                    <span className="ml-1.5 text-[12.5px] font-bold text-ink-3">{c.units.length}</span>
                  </Link>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>

      <section aria-labelledby="part-appendix" className="mt-10">
        <div className="flex items-baseline gap-3 border-b-2 border-ink pb-2">
          <span className="text-[15px] font-extrabold text-coral-ink">부록</span>
          <h2 id="part-appendix" className="text-[1.5rem] font-extrabold">
            찾아보기
          </h2>
        </div>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {[
            { href: "/roadmap", title: "수준별 필수 문법", sub: "초등·중등·고등에서 꼭 알아야 할 문법만 골랐어요" },
            { href: "/terms", title: "문법 용어 사전", sub: "용어를 글자 조각의 뜻으로 풀었어요" },
            { href: "/verbs", title: "불규칙 동사표", sub: "모양별로 찾고, 가리고 외우고, 들어 봐요" },
          ].map((a) => (
            <li key={a.href}>
              <Link href={a.href} className="group flex h-full flex-col rounded-2xl border border-line bg-card px-4 py-3 transition-colors hover:border-ink-3">
                <span className="font-extrabold group-hover:text-coral-ink">{a.title}</span>
                <span className="mt-1 text-[13.5px] text-ink-2">
                  <Phrases text={a.sub} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
