import type { Metadata } from "next";
import Link from "next/link";
import { allUnits, curriculum, readyUnits, unitHref } from "@/content/curriculum";

export const metadata: Metadata = {
  title: "핵심 문법",
  description: "베스트셀러 문법책들의 목차를 모두 모아 7부로 정리한 그래머랑 핵심 문법 한눈에 보기.",
};

export default function CorePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 pb-10 pt-10 sm:px-6">
      <h1 className="text-[2rem] font-extrabold tracking-[-0.02em]">한 권으로 끝내는 핵심 문법</h1>
      <p className="mt-2 text-ink-2">
        베스트셀러 문법책들의 목차를 모두 모아 7부로 정리했어요. 장 이름을 누르면 첫 단원으로 가요. 단원까지 모두
        보려면{" "}
        <Link href="/learn" className="font-bold text-coral-ink hover:underline">
          전체 목차
        </Link>
        에서 볼 수 있어요.
      </p>
      <ol className="mt-8 grid gap-3 sm:grid-cols-2">
        {curriculum.map((part) => (
          <li key={part.id} className="rounded-2xl border border-line bg-card px-5 py-4">
            <p className="text-[13px] font-extrabold text-coral-ink">{part.label}</p>
            <p className="text-[1.1rem] font-extrabold">{part.title}</p>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {part.chapters.map((c) => {
                const first = c.units.find((u) => u.ready);
                return (
                  <li key={c.slug}>
                    {first ? (
                      <Link
                        href={unitHref(c.slug, first.slug)}
                        className="inline-block rounded-full bg-ink px-3 py-1 text-[13.5px] font-bold text-on-ink hover:opacity-90"
                      >
                        {c.title}
                      </Link>
                    ) : (
                      <span className="inline-block rounded-full bg-chip px-3 py-1 text-[13.5px] font-bold text-ink-3">{c.title}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ol>
      <p className="mt-3 text-[14px] text-ink-3">
        {readyUnits().length === allUnits().length
          ? `모두 ${allUnits().length}개 단원을 지금 바로 공부할 수 있어요.`
          : "진한 색 단원은 지금 바로 공부할 수 있어요. 나머지는 차례로 채워 가고 있어요."}
      </p>
    </div>
  );
}
