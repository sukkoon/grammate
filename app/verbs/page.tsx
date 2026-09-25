import type { Metadata } from "next";
import Link from "next/link";
import { IrregularTable } from "@/components/verbs/IrregularTable";
import { confusingVerbs, groupInfo, irregularVerbs, type VerbGroup } from "@/content/irregular-verbs";
import { Mate } from "@/components/brand/Mate";

export const metadata: Metadata = {
  title: "불규칙 동사표",
  description: "go – went – gone처럼 모양이 따로 있는 동사를 모양별로 묶어 찾고, 가리고 외우고, 소리로 들어 봐요.",
};

const GROUP_ORDER: VerbGroup[] = ["AAA", "ABB", "ABC", "ABA"];

export default function VerbsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-10 pt-10 sm:px-6">
      <p className="text-[13.5px] font-extrabold text-coral-ink">부록</p>
      <h1 className="mt-1 text-[1.8rem] font-extrabold tracking-[-0.02em]">불규칙 동사표</h1>
      <p className="mt-2 text-ink-2">
        대부분의 동사는 -ed만 붙이면 과거형과 과거분사가 돼요. 그런데 go – went – gone처럼 <strong>모양이 따로 있는 동사</strong>가 있어요. 재미있게도 아주 자주 쓰는 동사일수록 불규칙이 많아요. 세 모양을 한 줄로 소리 내어 외우면 오래 남아요.
      </p>
      <p className="mt-2 text-[14.5px]">
        <Link href="/learn/verbs-basics/past-forms" className="font-bold text-coral-ink hover:underline">
          과거형 단원에서 먼저 배우기 ›
        </Link>
      </p>

      <section aria-labelledby="h-groups" className="mt-8">
        <h2 id="h-groups" className="text-[1.15rem] font-extrabold">
          네 가지 모양으로 묶어 외워요
        </h2>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {GROUP_ORDER.map((g) => (
            <li key={g} className="rounded-2xl border border-line bg-card px-4 py-3">
              <p className="flex items-baseline justify-between gap-2">
                <span className="text-[1.1em] font-extrabold">{groupInfo[g].label}</span>
                <span className="text-[13.5px] font-bold text-ink-3">{irregularVerbs.filter((v) => v.group === g).length}개</span>
              </p>
              <p className="text-[14.5px] text-ink-2">{groupInfo[g].desc}</p>
              <p lang="en" className="mt-1 font-bold text-coral-ink">
                {groupInfo[g].example}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="h-table" className="mt-10">
        <h2 id="h-table" className="text-[1.15rem] font-extrabold">
          찾고, 가리고, 들어 봐요
        </h2>
        <p className="mt-1 text-[14.5px] text-ink-2">
          과거분사(p.p.)는 현재완료(have + p.p.), 수동태(be + p.p.), 분사에 쓰는 모양이에요. 초등이라면 &lsquo;초등 필수&rsquo;의 과거형부터 챙겨요.
        </p>
        <div className="mt-4">
          <IrregularTable />
        </div>
      </section>

      <section aria-labelledby="h-confusing" className="mt-12">
        <h2 id="h-confusing" className="flex flex-wrap items-center gap-2 text-[1.15rem] font-extrabold">
          모양이 닮아서 헷갈리는 동사
          <span className="rounded-full bg-sky-soft px-2.5 py-0.5 text-[13.5px] font-extrabold text-sky-ink">고등 어법</span>
        </h2>
        <div className="mt-3 grid gap-3">
          {confusingVerbs.map((c) => (
            <div key={c.rows.map((r) => r.forms).join()} className="rounded-2xl border border-line bg-card px-4 py-3">
              <ul className="grid gap-1.5">
                {c.rows.map((r) => (
                  <li key={r.forms} className="flex flex-wrap items-baseline gap-x-3">
                    <span lang="en" className="font-extrabold">
                      {r.forms}
                    </span>
                    <span className="text-[14.5px] text-ink-2">{r.ko}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-2 flex items-start gap-2 rounded-xl bg-chip px-3 py-2 text-[14px]">
                <Mate size={20} mood="wink" className="mt-0.5 shrink-0 text-ink" />
                <span>{c.tip}</span>
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
