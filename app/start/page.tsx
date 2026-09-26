import type { Metadata } from "next";
import Link from "next/link";
import { ReadMark } from "@/components/lesson/ReadMark";
import { Phrases } from "@/components/text/Phrases";
import { allUnits, curriculum, unitHref } from "@/content/curriculum";

export const metadata: Metadata = {
  title: "각 단원별 학습",
  description: "서장부터 제7부 수능 문법까지, 모든 단원의 요약과 수준을 보고 바로 들어가는 학습 목록.",
};

/** 각 단원별 학습: 서장과 제1부~제7부의 단원을 요약·수준과 함께 모두 보여 준다. 전체 목차(/learn)는 장 이름만 보여 준다. */
export default function StartPage() {
  const total = allUnits().length;
  return (
    <div className="mx-auto max-w-4xl px-4 pb-10 pt-10 sm:px-6">
      <h1 className="text-[2rem] font-extrabold tracking-[-0.02em]">각 단원별 학습</h1>
      <p className="mt-2 text-ink-2">
        <Phrases
          text={`서장부터 제7부까지 ${total}개 단원이에요. 단원마다 무엇을 배우는지 한 줄로 적어 두었어요.
처음이라면 서장 ‘시작하기 전에’부터, 이미 아는 곳이 있다면 어디서든 시작해도 좋아요.`}
        />
      </p>
      <p className="mt-3 flex flex-wrap gap-2">
        <Link href="/learn" className="inline-flex items-center rounded-lg bg-chip px-4 py-2 text-[14.5px] font-bold text-ink hover:bg-line">
          전체 목차 한눈에 보기 ›
        </Link>
        <Link href="/roadmap" className="inline-flex items-center rounded-lg bg-coral-soft px-4 py-2 text-[14.5px] font-bold text-coral-ink hover:bg-coral-soft/70">
          내 수준에서 꼭 알아야 할 문법만 골라 보기 ›
        </Link>
      </p>

      <div className="mt-10 space-y-12">
        {curriculum.map((part) => (
          <section key={part.id} id={`part-${part.id}`} aria-labelledby={`h-part-${part.id}`} className="scroll-mt-24">
            <div className="flex items-baseline gap-3 border-b-2 border-ink pb-2">
              <span className="text-[15px] font-extrabold text-coral-ink">{part.label}</span>
              <h2 id={`h-part-${part.id}`} className="text-[1.5rem] font-extrabold">
                {part.title}
              </h2>
            </div>
            <div className="mt-4 space-y-6">
              {part.chapters.map((c) => (
                <div key={c.slug} id={c.slug} className="scroll-mt-24">
                  <h3 className="text-[1.2rem] font-extrabold">{c.title}</h3>
                  <p className="text-[14.5px] text-ink-2">
                    <Phrases text={c.hook} />
                  </p>
                  <ol className="mt-3 grid gap-2 sm:grid-cols-2">
                    {c.units.map((u, i) =>
                      u.ready ? (
                        <li key={u.slug}>
                          <Link
                            href={unitHref(c.slug, u.slug)}
                            className="group flex h-full flex-col rounded-2xl border border-line bg-card px-4 py-3 transition-colors hover:border-ink-3"
                          >
                            <span className="flex items-start justify-between gap-2">
                              <span className="font-extrabold group-hover:text-coral-ink">
                                {i + 1}. {u.title}
                              </span>
                              <ReadMark unit={`${c.slug}/${u.slug}`} />
                            </span>
                            <span className="mt-1 text-[13.5px] text-ink-2">
                              <Phrases text={u.summary} />
                            </span>
                          </Link>
                        </li>
                      ) : (
                        <li key={u.slug} className="flex flex-col rounded-2xl border border-dashed border-line px-4 py-3 text-ink-3">
                          <span className="font-bold">
                            {i + 1}. {u.title}
                          </span>
                          <span className="mt-1 text-[13.5px]">준비 중이에요</span>
                        </li>
                      ),
                    )}
                  </ol>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
