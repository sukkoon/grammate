import type { Metadata } from "next";
import Link from "next/link";
import { TermCard } from "@/components/lesson/TermAnatomy";
import { termGroups, terms } from "@/content/terms";
import { LevelTabs } from "@/components/level/LevelTabs";

export const metadata: Metadata = {
  title: "문법 용어 사전",
  description: "대명사, 부정관사, 동명사… 문법 용어를 글자 조각의 뜻으로 풀어 봤어요.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 pb-10 pt-10 sm:px-6">
      <h1 className="text-[2rem] font-extrabold tracking-[-0.02em]">문법 용어 사전</h1>
      <p className="mt-2 text-ink-2">
        용어를 조각내면 뜻이 보여요. &lsquo;-사&rsquo;는 단어의 종류, &lsquo;-어&rsquo;는 문장 속 역할이에요. 영어 이름의 뜻도 함께 붙였어요.
      </p>
      <div className="mt-5">
        <LevelTabs />
      </div>
      <nav aria-label="용어 분류" className="mt-6 flex flex-wrap gap-2">
        {termGroups.map((g) => (
          <a key={g} href={`#g-${g}`} className="rounded-full bg-card px-3.5 py-1.5 text-[14px] font-bold ring-1 ring-line hover:bg-chip">
            {g}
          </a>
        ))}
      </nav>
      <div className="mt-10 space-y-12">
        {termGroups.map((g) => (
          <section key={g} id={`g-${g}`} aria-labelledby={`h-${g}`}>
            <h2 id={`h-${g}`} className="border-b-2 border-ink pb-2 text-[1.35rem] font-extrabold">
              {g}
            </h2>
            <div className="mt-4 grid gap-4">
              {terms
                .filter((t) => t.group === g)
                .map((t) => (
                  <article key={t.id} id={t.id} className="scroll-mt-24 rounded-2xl border border-line bg-card px-4 py-5 sm:px-6">
                    <div className="mb-3 flex items-baseline justify-between gap-3">
                      <h3 className="text-[1.45rem] font-extrabold">{t.term}</h3>
                      {t.href && (
                        <Link href={t.href} className="shrink-0 text-[14px] font-bold text-coral-ink hover:underline">
                          배우러 가기 ›
                        </Link>
                      )}
                    </div>
                    <TermCard t={t} />
                  </article>
                ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
