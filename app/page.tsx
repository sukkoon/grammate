import Link from "next/link";
import { Mate } from "@/components/brand/Mate";
import { AskDemo, FeatureCards, RecordDemo, WordDemo, type Feature } from "@/components/home/FeatureCards";
import { TermCard } from "@/components/lesson/TermAnatomy";
import { unitHref } from "@/content/curriculum";
import { termById } from "@/content/terms";
import { brand } from "@/lib/brand";

export default function Home() {
  const pronoun = termById("pronoun")!;
  // 제목은 모두 '○○는 ~요' 꼴로 맞춘다. 카드에 마우스를 올리거나 누르면 예시가 뜬다.
  const features: Feature[] = [
    {
      mood: "wink",
      title: "용어는 뜻부터 풀어요",
      body: "대명사는 ‘대신하는’ 명사. 이름을 알면 개념이 보여요.",
      demo: (
        <div>
          <p className="text-[12.5px] font-extrabold text-coral-ink">용어 뜻풀이</p>
          <p className="mb-3 mt-1 text-[1.4rem] font-extrabold">{pronoun.term}</p>
          <TermCard t={pronoun} compact />
        </div>
      ),
    },
    {
      mood: "happy",
      title: "단어는 뜻이 바로 떠요",
      body: "예문 속 단어를 누르면 문맥에 맞게 직접 정리한 뜻이 떠요.",
      demo: <WordDemo />,
    },
    {
      mood: "listening",
      title: "질문은 말로 해요",
      body: "모르는 게 있으면 마이크를 누르고 편하게 물어봐요.",
      demo: <AskDemo />,
    },
    {
      mood: "cheer",
      title: "기록은 나만 봐요",
      body: "순위도 비교도 없어요. 어디서 헷갈렸는지만 차곡차곡 모아 둬요.",
      demo: <RecordDemo />,
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      {/* 첫 화면 */}
      <section className="pb-12 pt-10 md:pt-16">
        <p className="inline-flex items-center gap-2 rounded-full bg-card px-3 py-1.5 text-[13.5px] font-bold text-ink-2 ring-1 ring-line">
          <Mate size={20} className="text-ink" />
          {brand.tagline}
        </p>
        <h1 className="mt-5 text-[2.1rem] font-extrabold leading-[1.3] tracking-[-0.02em] sm:text-[2.7rem]">
          문법 용어,
          <br />
          <span className="marker">뜻부터 알면</span> 쉬워져요
        </h1>
        <p className="mt-5 max-w-[52rem] text-[1.05rem] text-ink-2">
          영어 문법이 어려운 건, 용어의 뜻을 모른 채 외우기 때문이에요.
          <br />
          그래머랑은 &lsquo;대명사&rsquo;, &lsquo;분사&rsquo;, &lsquo;관계사&rsquo;처럼 낯선 용어를 뜻부터 하나하나 짚어 줘요.
          <br />
          한 걸음씩 차근차근 밟아 가다 보면, 어느새 이해가 쌓이는 문법 공부. 그래머랑과 함께해요.
        </p>
        <div className="mt-7">
          <Link
            href={unitHref("intro", "reading-terms")}
            className="inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-6 font-bold text-on-ink transition-transform hover:-translate-y-0.5"
          >
            처음부터 배우기
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>
      </section>

      {/* 특징 */}
      <section aria-label="그래머랑의 특징">
        <FeatureCards items={features} />
      </section>
    </div>
  );
}
