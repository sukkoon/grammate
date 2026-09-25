import type { Metadata } from "next";
import Link from "next/link";
import { LevelBadges } from "@/components/lesson/blocks";
import { ReadMark } from "@/components/lesson/ReadMark";
import { LevelAbove } from "@/components/level/LevelAbove";
import { curriculum, unitHref, allUnits } from "@/content/curriculum";

export const metadata: Metadata = {
  title: "전체 목차",
  description: "서장부터 수능 어법까지, 7부 27장 88단원으로 정리한 그래머랑 영어 문법 전체 목차.",
};

export default function LearnPage() {
  const total = allUnits().length;
  return (
    <div className="mx-auto max-w-4xl px-4 pb-10 pt-10 sm:px-6">
      <h1 className="text-[2rem] font-extrabold tracking-[-0.02em]">전체 목차</h1>
      <p className="mt-2 text-ink-2">
        다양한 문법책의 목차와 구성을 하나하나 살펴봤어요.
        <br />
        그중 먼저 배워야 할 것과 나중에 익혀도 될 것을 나누고, 단계별로 다시 엮어 {total}개 단원을 만들었어요.
        <br />
        지금 바로 시작해 보세요.
      </p>
      <p className="mt-3">
        <Link href="/roadmap" className="inline-flex items-center rounded-full bg-coral-soft px-4 py-2 text-[15px] font-bold text-coral-ink hover:bg-coral-soft/70">
          내 수준에서 꼭 알아야 할 문법만 골라 보기 ›
        </Link>
      </p>

      {/* 장 지도: 7부 24장을 한눈에. 장을 누르면 아래 그 장의 단원 목록으로 내려간다 */}
      <section id="map" aria-labelledby="h-map" className="mt-8 scroll-mt-24 rounded-2xl border border-line bg-card px-4 py-4 sm:px-5">
        <h2 id="h-map" className="text-[1.08rem] font-extrabold">
          한눈에 보는 핵심 문법
        </h2>
        <p className="mt-1 text-[14px] text-ink-2">7부 {curriculum.reduce((n, p) => n + p.chapters.length, 0)}장이에요. 장 이름을 누르면 그 장의 단원 목록으로 내려가요.</p>
        <ol className="mt-3 grid gap-2.5 sm:grid-cols-2">
          {curriculum.map((part) => (
            <li key={part.id} className="rounded-xl bg-chip px-3.5 py-3">
              <p className="text-[13px] font-extrabold text-coral-ink">
                {part.label} <span className="text-ink">{part.title}</span>
              </p>
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {part.chapters.map((c) => (
                  <li key={c.slug}>
                    <a href={`#${c.slug}`} className="inline-block rounded-full bg-card px-3 py-1 text-[13.5px] font-bold text-ink ring-1 ring-line hover:bg-ink hover:text-on-ink hover:ring-ink">
                      {c.title}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>

      <div className="mt-10 space-y-12">
        {curriculum.map((part) => (
          <section key={part.id} aria-labelledby={`part-${part.id}`}>
            <div className="flex items-baseline gap-3 border-b-2 border-ink pb-2">
              <span className="text-[14px] font-extrabold text-coral-ink">{part.label}</span>
              <h2 id={`part-${part.id}`} className="text-[1.45rem] font-extrabold">
                {part.title}
              </h2>
            </div>
            <div className="mt-4 space-y-6">
              {part.chapters.map((c) => (
                <div key={c.slug} id={c.slug} className="scroll-mt-24">
                  <h3 className="text-[1.15rem] font-extrabold">{c.title}</h3>
                  <p className="text-[15px] text-ink-2">{c.hook}</p>
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
                              <span className="flex shrink-0 flex-col items-end gap-1">
                                <ReadMark unit={`${c.slug}/${u.slug}`} />
                                <LevelAbove levels={u.levels} />
                              </span>
                            </span>
                            <span className="mt-1 text-[14px] text-ink-2">{u.summary}</span>
                            <span className="mt-2">
                              <LevelBadges levels={u.levels} />
                            </span>
                          </Link>
                        </li>
                      ) : (
                        <li key={u.slug} className="flex flex-col rounded-2xl border border-dashed border-line px-4 py-3 text-ink-3">
                          <span className="font-bold">
                            {i + 1}. {u.title}
                          </span>
                          <span className="mt-1 text-[14px]">준비 중이에요</span>
                        </li>
                      ),
                    )}
                  </ol>
                </div>
              ))}
            </div>
          </section>
        ))}
        <section aria-labelledby="part-appendix">
          <div className="flex items-baseline gap-3 border-b-2 border-ink pb-2">
            <span className="text-[14px] font-extrabold text-coral-ink">부록</span>
            <h2 id="part-appendix" className="text-[1.45rem] font-extrabold">
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
                  <span className="mt-1 text-[14px] text-ink-2">{a.sub}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
