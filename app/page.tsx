import { AskDemo, FeatureCards, RecordDemo, WordDemo, type Feature } from "@/components/home/FeatureCards";
import { TermCard } from "@/components/lesson/TermAnatomy";
import { termById } from "@/content/terms";

export default function Home() {
  const pronoun = termById("pronoun")!;
  // 제목은 모두 '○○는 ~요' 꼴로 맞춘다. 카드에 마우스를 올리거나 누르면 예시가 뜬다.
  const features: Feature[] = [
    {
      mood: "wink",
      title: "용어는 뜻부터 풀어요",
      body: "‘대명사’는 이름을 ‘대신하는’ 말, ‘부정사’는 모양이 ‘정해지지 않은’ 말이에요. 어려운 문법 용어를 글자 하나하나의 뜻으로 풀어 주니까, 이름만 알아도 개념이 절반은 보여요. 외우기 전에 먼저 이해해요.",
      demo: (
        <div>
          <p className="text-[12.5px] font-extrabold text-coral-ink">용어 뜻풀이</p>
          <p className="mb-3 mt-1 text-[1.3rem] font-extrabold">{pronoun.term}</p>
          <TermCard t={pronoun} compact />
        </div>
      ),
    },
    {
      mood: "happy",
      title: "단어는 뜻이 바로 떠요",
      body: "예문 속 모르는 단어는 톡 눌러 보세요. 사전을 따로 찾지 않아도 그 문장에 딱 맞는 뜻과 발음이 바로 떠요. 기억하고 싶은 단어는 ★를 눌러 나만의 단어장에 모아 둘 수 있어요.",
      demo: <WordDemo />,
    },
    {
      mood: "listening",
      title: "질문은 말로 해요",
      body: "공부하다 막히면 오른쪽 아래 ‘물어보기’를 누르고 편하게 말해 보세요. ‘그 a랑 an 있잖아요…’처럼 두서없이 말해도 알아듣고, 쉬운 설명과 예문으로 답해 줘요. 답을 소리 내어 읽어 주기도 해요.",
      demo: <AskDemo />,
    },
    {
      mood: "cheer",
      title: "각 단원별 학습 평가 기록은 나만 봐요",
      body: "단원마다 확인 문제를 풀면, 어디서 헷갈렸는지가 ‘내 공부’에 차곡차곡 모여요. 순위도, 남과의 비교도 없어요. 오직 나만 보는, 나를 위한 복습 지도예요.",
      demo: <RecordDemo />,
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      {/* 첫 화면 */}
      <section className="pb-12 pt-10 md:pt-16">
        <h1 className="text-[1.9rem] font-extrabold leading-[1.3] tracking-[-0.02em] sm:text-[2.4rem]">
          문법 용어,
          <br />
          <span className="marker">뜻부터 알면</span> 쉬워져요
        </h1>
        <p className="mt-5 max-w-[52rem] text-[1rem] text-ink-2">
          영어 문법이 어려운 건, 용어의 뜻을 모른 채 외우기 때문이에요.
          <br />
          그래머랑은 &lsquo;대명사&rsquo;, &lsquo;분사&rsquo;, &lsquo;관계사&rsquo;처럼 낯선 용어를 뜻부터 하나하나 짚어 줘요.
          <br />
          한 걸음씩 차근차근 밟아 가다 보면, 어느새 이해가 쌓이는 문법 공부. 그래머랑과 함께해요.
        </p>
      </section>

      {/* 특징 */}
      <section aria-label="그래머랑의 특징">
        <FeatureCards items={features} />
      </section>
    </div>
  );
}
