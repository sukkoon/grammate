import type { Metadata } from "next";
import { LoginCard } from "@/components/auth/LoginCard";
import { BrandStory } from "@/components/brand/BrandStory";
import { InstallButton } from "@/components/pwa/InstallButton";
import { Phrases } from "@/components/text/Phrases";

export const metadata: Metadata = {
  title: "로그인",
  robots: { index: false },
};

/** 로그인 화면: 왼쪽은 브랜드와 이야기, 오른쪽은 로그인 카드. 오른쪽 위에 앱 설치 단추. */
export default function LoginPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-14 pt-6 sm:px-6 sm:pt-8">
      <div className="flex justify-end sm:hidden">
        <InstallButton />
      </div>
      <div className="mt-4 grid gap-10 lg:grid-cols-[1.1fr_minmax(20rem,26rem)] lg:items-start lg:gap-14">
        <section aria-label="그래머랑 소개">
          <h1 className="mt-2 text-[1.9rem] font-extrabold leading-[1.3] tracking-[-0.02em] sm:text-[2.3rem]">
            문법 용어,
            <br />
            <span className="marker">뜻부터 알면</span> 쉬워져요
          </h1>
          <p className="mt-4 max-w-[36rem] text-[15px] text-ink-2">
            <Phrases text="외우지 말고 이해하는 영어 문법. 예문의 모든 단어를 눌러 뜻을 바로 보고, 막히면 짝꿍에게 글이나 말로 물어보세요." />
          </p>
          <BrandStory compact />
        </section>
        <LoginCard />
      </div>
    </div>
  );
}
