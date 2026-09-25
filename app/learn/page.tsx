import type { Metadata } from "next";
import Link from "next/link";
import { LevelBadges } from "@/components/lesson/blocks";
import { ReadMark } from "@/components/lesson/ReadMark";
import { LevelAbove } from "@/components/level/LevelAbove";
import { curriculum, unitHref, readyUnits, allUnits } from "@/content/curriculum";

export const metadata: Metadata = {
  title: "전체 목차",
  description: "서장부터 수능 어법까지, 7부 24장으로 정리한 그래머랑 영어 문법 전체 목차.",
};

export default function LearnPage() {
  const ready = readyUnits().length;
  const total = allUnits().length;
  return (
    <div className="mx-auto max-w-4xl px-4 pb-10 pt-10 sm:px-6">
      <h1 className="text-[2rem] font-extrabold tracking-[-0.02em]">전체 목차</h1>
      <p className="mt-2 text-ink-2">
        베스트셀러 문법책 9종의 목차를 모두 모아 순서를 다시 짰어요.{" "}
        {ready === total ? `모두 ${total}개 단원을 지금 바로 공부할 수 있어요.` : `지금 ${ready}개 단원을 공부할 수 있고, 모두 ${total}개 단원을 차례로 채우고 있어요.`}
      </p>
      <p className="mt-3">
        <Link href="/roadmap" className="inline-flex items-center rounded-full bg-coral-soft px-4 py-2 text-[15px] font-bold text-coral-ink hover:bg-coral-soft/70">
          내 수준에서 꼭 알아야 할 문법만 골라 보기 ›
        </Link>
      </p>

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
                <div key={c.slug} id={c.slug}>
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
