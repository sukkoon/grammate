import type { Metadata } from "next";
import Link from "next/link";
import { LevelBadges } from "@/components/lesson/blocks";
import { ReadMark } from "@/components/lesson/ReadMark";
import { Phrases } from "@/components/text/Phrases";
import { curriculum, unitHref } from "@/content/curriculum";

export const metadata: Metadata = {
  title: "시작하기 전에",
  description: "문법 용어 읽는 법부터 문장 설계도까지, 본격적으로 배우기 전에 먼저 다지는 서장.",
};

/** 서장(시작하기 전에)만 따로 보여 주는 페이지. 전체 목차(/learn)에는 제1부부터 싣는다. */
export default function StartPage() {
  const intro = curriculum.find((p) => p.id === "intro");
  if (!intro) return null;
  const count = intro.chapters.reduce((n, c) => n + c.units.length, 0);
  return (
    <div className="mx-auto max-w-4xl px-4 pb-10 pt-10 sm:px-6">
      <p className="text-[15px] font-extrabold text-coral-ink">{intro.label}</p>
      <h1 className="mt-1 text-[2rem] font-extrabold tracking-[-0.02em]">{intro.title}</h1>
      <p className="mt-2 text-ink-2">
        <Phrases
          text={`본격적으로 문법을 배우기 전에 먼저 다져 두면 좋은 ${count}개 단원이에요.
용어를 읽는 법과 문장의 설계도를 알고 나면, 뒤에 나오는 모든 단원이 훨씬 쉽게 읽혀요.`}
        />
      </p>
      <p className="mt-3">
        <Link href="/learn" className="inline-flex items-center rounded-lg bg-coral-soft px-4 py-2 text-[14.5px] font-bold text-coral-ink hover:bg-coral-soft/70">
          전체 목차 보기 ›
        </Link>
      </p>

      <div className="mt-8 space-y-8">
        {intro.chapters.map((c) => (
          <section key={c.slug} id={c.slug} aria-labelledby={`h-${c.slug}`} className="scroll-mt-24">
            <h2 id={`h-${c.slug}`} className="border-b-2 border-ink pb-2 text-[1.5rem] font-extrabold">
              {c.title}
            </h2>
            <p className="mt-2 text-[14.5px] text-ink-2">
              <Phrases text={c.hook} />
            </p>
            <ol className="mt-3 grid gap-2 sm:grid-cols-2">
              {c.units.map((u, i) => (
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
                    <span className="mt-2">
                      <LevelBadges levels={u.levels} />
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>
    </div>
  );
}
