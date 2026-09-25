import Link from "next/link";
import { Mate, type Mood } from "@/components/brand/Mate";
import { En } from "@/components/lesson/En";
import { TermCard } from "@/components/lesson/TermAnatomy";
import { allUnits, curriculum, readyUnits, unitHref } from "@/content/curriculum";
import { termById } from "@/content/terms";
import { brand } from "@/lib/brand";

const features: { mood: Mood; title: string; body: string }[] = [
  {
    mood: "wink",
    title: "용어의 뜻부터",
    body: "대명사는 '대신하는' 명사, 부정관사의 '부정'은 '정해지지 않은'. 이름을 알면 개념이 보여요.",
  },
  {
    mood: "happy",
    title: "모든 단어에 뜻이",
    body: "예문의 단어를 누르면 이 문장에 맞는 뜻이 바로 떠요. 발음도 들을 수 있어요.",
  },
  {
    mood: "thinking",
    title: "동사 1개의 법칙",
    body: "한 문장의 진짜 동사는 하나! 나머지는 to부정사·동명사·분사로 변장해요. 게임으로 익혀요.",
  },
  {
    mood: "listening",
    title: "말로 물어보세요",
    body: "모르는 게 있으면 마이크를 누르고 편하게 말해요. 짝꿍이 알맞은 설명을 찾아 줄게요.",
  },
];

export default function Home() {
  const pronoun = termById("pronoun")!;
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      {/* 첫 화면 */}
      <section className="grid items-center gap-10 pb-14 pt-10 md:grid-cols-[1.05fr_1fr] md:pt-16">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-card px-3 py-1.5 text-[13.5px] font-bold text-ink-2 ring-1 ring-line">
            <Mate size={20} className="text-ink" />
            {brand.tagline}
          </p>
          <h1 className="mt-5 text-[2.1rem] font-extrabold leading-[1.3] tracking-[-0.02em] sm:text-[2.7rem]">
            문법 용어,
            <br />
            <span className="marker">뜻부터 알면</span> 쉬워져요
          </h1>
          <p className="mt-5 max-w-xl text-[1.05rem] text-ink-2">
            대명사의 &lsquo;대&rsquo;는 크다가 아니라 &lsquo;대신하다&rsquo;예요. 그래머랑은 초등 고학년부터 고2까지, 용어의 뜻부터
            풀어 주는 영어 문법 짝꿍이에요.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href={unitHref("intro", "reading-terms")}
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-6 font-bold text-on-ink transition-transform hover:-translate-y-0.5"
            >
              처음부터 배우기
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
            <Link href="/learn" className="inline-flex min-h-12 items-center rounded-full bg-card px-6 font-bold ring-1 ring-line hover:bg-chip">
              전체 목차 보기
            </Link>
          </div>
          <p className="mt-4 text-[15px]">
            <Link href="/roadmap" className="font-bold text-coral-ink hover:underline">
              초등·중등·고등 수준별 필수 문법 보기 ›
            </Link>
          </p>
        </div>

        <div className="relative">
          <div className="rounded-3xl border border-line bg-card p-5 shadow-[0_24px_60px_-32px_rgba(31,42,68,0.35)] sm:p-6">
            <div className="mb-3 flex items-center justify-between">
              <span className="rounded-full bg-coral-soft px-2.5 py-0.5 text-[12.5px] font-extrabold text-coral-ink">용어 뜻풀이</span>
              <span className="text-[12.5px] font-bold text-ink-3">초등 · 중1</span>
            </div>
            <p className="mb-3 text-[1.6rem] font-extrabold">{pronoun.term}</p>
            <TermCard t={pronoun} compact />
            <div className="mt-4 rounded-2xl bg-chip px-4 py-3">
              <p className="text-[12.5px] font-bold text-ink-3">밑줄 친 단어를 눌러 보세요</p>
              <p className="mt-1 text-[1.15em] font-medium">
                <En en="Minsu is my friend. [[He]] is kind." />
              </p>
              <p className="mt-1 text-[1.15em] font-medium">
                <En en="She sings {like|전치사:~처럼, ~같이} a bird." />
              </p>
            </div>
          </div>
          <Mate mood="wink" size={64} className="absolute -right-2 -top-7 hidden text-ink md:block" />
        </div>
      </section>

      {/* 특징 */}
      <section aria-label="그래머랑의 특징" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f) => (
          <div key={f.title} className="rounded-2xl border border-line bg-card px-5 py-5">
            <Mate mood={f.mood} size={40} className="text-ink" />
            <h2 className="mt-3 text-[1.08rem] font-extrabold">{f.title}</h2>
            <p className="mt-1.5 text-[15px] text-ink-2">{f.body}</p>
          </div>
        ))}
      </section>

      {/* 목차 미리보기 */}
      <section className="mt-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-[1.5rem] font-extrabold">한 권으로 끝내는 핵심 문법</h2>
            <p className="mt-1 text-ink-2">베스트셀러 문법책들의 목차를 모두 모아 7부로 정리했어요.</p>
          </div>
          <Link href="/learn" className="hidden shrink-0 font-bold text-coral-ink hover:underline sm:block">
            전체 목차 ›
          </Link>
        </div>
        <ol className="mt-6 grid gap-3 md:grid-cols-2">
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
            ? `모두 ${allUnits().length}개 단원을 지금 바로 공부할 수 있어요. 장 이름을 누르면 첫 단원으로 가요.`
            : "진한 색 단원은 지금 바로 공부할 수 있어요. 나머지는 차례로 채워 가고 있어요."}
        </p>
      </section>

      {/* 기록에 대한 약속 */}
      <section className="mt-16 flex flex-col gap-4 rounded-3xl bg-ink px-6 py-7 text-on-ink sm:flex-row sm:items-center sm:px-8">
        <Mate mood="happy" size={56} className="shrink-0 text-on-ink" />
        <div>
          <h2 className="text-[1.25rem] font-extrabold">내 기록은 나만 봐요</h2>
          <p className="mt-1 opacity-90">
            순위도, 비교도 없어요. 몇 개 맞혔는지보다 어디서 헷갈렸는지 아는 게 진짜 공부예요. 다른 사람 신경 쓰지 말고, 어제의 나보다
            한 걸음만 더 가요.
          </p>
        </div>
      </section>
    </div>
  );
}
