import { Mate, Wordmark } from "@/components/brand/Mate";
import { Phrases } from "@/components/text/Phrases";

/**
 * 브랜드 스토리: Grammar + 랑 = Grammarang.
 * 첫 화면과 로그인 화면에서 같이 쓴다. compact면 로그인 화면용으로 여백을 줄인다.
 */
export function BrandStory({ compact = false }: { compact?: boolean }) {
  return (
    <section
      aria-labelledby="brand-story"
      className={compact ? "mt-8" : "mt-14 rounded-3xl border border-line bg-card px-5 py-8 sm:px-10 sm:py-10"}
    >
      <p id="brand-story" className="text-[12.5px] font-extrabold tracking-[0.18em] text-ink-3">
        BRAND STORY
      </p>
      <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[1.6rem] font-extrabold leading-none sm:text-[2rem]">
        <span className="font-korean">Grammar</span>
        <span className="text-ink-3">+</span>
        <span className="font-korean text-coral">랑</span>
        <span className="text-ink-3">=</span>
        <Wordmark />
      </p>
      <p className="mt-2 text-[14.5px] font-bold text-ink-2">
        <Phrases text="영어 ‘Grammar(문법)’에 ‘누구누구랑’ 할 때의 ‘랑’을 더했어요. 문법이랑, 그리고 너랑." />
      </p>
      <div className="mt-5 flex gap-3 sm:gap-4">
        <Mate mood="happy" size={compact ? 36 : 44} className="mt-0.5 shrink-0 text-ink" />
        <div className="space-y-2 text-[15px] leading-relaxed text-ink-2">
          <p>
            <Phrases text="초등학생부터 고등학생까지, 누구나 영어 문법 걱정 없이 공부할 수 있으면 좋겠다는 마음으로 만들었어요." />
          </p>
          <p>
            <Phrases text="과외 선생님이 옆에 앉아 있듯 친절하게, 이해가 될 때까지 몇 번이고 함께해요." />
          </p>
          <p className="font-bold text-ink">
            <Phrases text="외우지 말고, 이해하자. 문법이랑 너랑, 그래머랑." />
          </p>
        </div>
      </div>
    </section>
  );
}
