import type { Metadata } from "next";
import Link from "next/link";
import { Mate } from "@/components/brand/Mate";
import { ReadMark } from "@/components/lesson/ReadMark";
import { Lv } from "@/components/level/Lv";
import { LevelTabs } from "@/components/level/LevelTabs";
import { roadmap, type RoadmapLevel } from "@/content/roadmap";

export const metadata: Metadata = {
  title: "수준별 필수 문법",
  description: "초등·중등·고등 학생이 꼭 알아야 할 영어 문법을 베스트셀러 교재의 학년 구성에 맞춰 골라 정리했어요.",
};

const TONE: Record<RoadmapLevel["band"], string> = {
  elem: "bg-mint-soft text-mint-ink",
  middle: "bg-sky-soft text-sky-ink",
  high: "bg-amber-soft text-amber-ink",
};
const LABEL: Record<RoadmapLevel["band"], string> = { elem: "초등", middle: "중등", high: "고등" };

function LevelSection({ lv }: { lv: RoadmapLevel }) {
  return (
    <section id={`lv-${lv.band}`} aria-labelledby={`h-${lv.band}`} className="scroll-mt-24">
      <div className="flex flex-wrap items-center gap-2 border-b-2 border-ink pb-2">
        <span className={`rounded-full px-2.5 py-0.5 text-[14px] font-extrabold ${TONE[lv.band]}`}>{LABEL[lv.band]}</span>
        <h2 id={`h-${lv.band}`} className="text-[1.4rem] font-extrabold">
          {lv.title}
        </h2>
      </div>
      <p className="mt-3 text-ink-2">{lv.intro}</p>
      <p className="mt-1 text-[14px] text-ink-3">참고 교재: {lv.books.join(" · ")}</p>
      <div className="mt-5 space-y-6">
        {lv.groups.map((g) => (
          <div key={g.name}>
            <h3 className="text-[1.08rem] font-extrabold">{g.name}</h3>
            <ul className="mt-2 grid gap-2 sm:grid-cols-2">
              {g.items.map((it) => (
                <li key={it.title} className="flex flex-col rounded-2xl border border-line bg-card px-4 py-3">
                  <span className="flex items-start justify-between gap-2">
                    <span className="font-extrabold">{it.title}</span>
                    {it.links[0].href.startsWith("/learn/") && <ReadMark unit={it.links[0].href.replace("/learn/", "")} />}
                  </span>
                  <span className="mt-1 text-[14.5px] text-ink-2">{it.know}</span>
                  <span className="mt-2 flex flex-wrap gap-1.5">
                    {it.links.map((l) => (
                      <Link
                        key={l.href}
                        href={l.href}
                        className="rounded-full bg-chip px-2.5 py-1 text-[14px] font-bold text-coral-ink hover:bg-line"
                      >
                        {l.label} ›
                      </Link>
                    ))}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function RoadmapPage() {
  const [elem, middle, high] = roadmap;
  return (
    <div className="mx-auto max-w-4xl px-4 pb-10 pt-10 sm:px-6">
      <h1 className="text-[2rem] font-extrabold tracking-[-0.02em]">수준별 필수 문법</h1>
      <p className="mt-2 text-ink-2">
        참고한 베스트셀러 문법 교재들이 학년마다 공통으로 다루는 내용을 골라, 초등·중등·고등에서 꼭 알아야 할 문법만 추렸어요. 교재마다 학년 배치가 조금씩 다르니, 앞 단계부터 차근차근 다지면 돼요.
      </p>
      <nav aria-label="수준 바로가기" className="mt-5 flex flex-wrap gap-2">
        {roadmap.map((lv) => (
          <a key={lv.band} href={`#lv-${lv.band}`} className="rounded-full bg-card px-3.5 py-1.5 text-[14px] font-bold ring-1 ring-line hover:bg-chip">
            {LABEL[lv.band]}
          </a>
        ))}
      </nav>
      <div className="mt-4">
        <LevelTabs />
      </div>
      <p className="mt-3 flex items-start gap-2 rounded-2xl bg-chip px-4 py-3 text-[14.5px]">
        <Mate mood="wink" size={24} className="mt-0.5 shrink-0 text-ink" />
        <span>
          위에서 고른 수준까지 펼쳐져 있어요. 더 높은 단계가 궁금하면 &lsquo;더 학습하기&rsquo;를 눌러 봐요. 이 목록은 남과 비교하려는 게 아니라, 내가 어디까지 왔는지 스스로 확인하는 지도예요.
        </span>
      </p>

      <div className="mt-10 space-y-12">
        <LevelSection lv={elem} />
        <Lv min="middle" topic="문장의 형식, 준동사, 관계사까지 · 내신 문법의 중심">
          <LevelSection lv={middle} />
          <div className="mt-12">
            <Lv min="high" topic="준동사·관계사 심화, 특수구문, 수능 어법까지">
              <LevelSection lv={high} />
            </Lv>
          </div>
        </Lv>
      </div>
    </div>
  );
}
