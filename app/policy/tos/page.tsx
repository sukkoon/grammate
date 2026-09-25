import type { Metadata } from "next";

export const metadata: Metadata = { title: "이용약관" };

// 초안: 회원·결제 기능을 붙일 때 정식 약관으로 바꾸고 법률 검토를 받는다.
export default function TosPage() {
  return (
    <div className="lesson mx-auto max-w-3xl px-4 pb-10 pt-10 sm:px-6">
      <h1 className="text-[1.8rem] font-extrabold">이용약관</h1>
      <p className="text-ink-3">초안 · 정식 서비스 전에 내용을 확정할 예정이에요.</p>

      <h2>1. 서비스</h2>
      <p>그래머랑은 초등 고학년부터 고등학생까지를 위한 영어 문법 학습 서비스예요. 지금은 누구나 무료로 쓸 수 있어요.</p>

      <h2>2. 콘텐츠</h2>
      <p>
        그래머랑의 설명, 예문, 그림, 문제는 그래머랑이 직접 만들었어요. 개인 공부를 위해 자유롭게 보고 쓸 수 있지만, 허락 없이
        복제해서 다른 곳에 배포하거나 판매할 수는 없어요.
      </p>

      <h2>3. 단어 뜻과 외부 링크</h2>
      <p>
        예문의 단어 뜻은 문맥에 맞게 직접 정리했어요. &lsquo;네이버 사전에서 더 보기&rsquo;는 네이버 영어사전으로 가는 링크이고, 그
        내용은 네이버의 약관을 따라요.
      </p>

      <h2>4. 바뀌는 내용</h2>
      <p>로그인, 결제 같은 기능이 생기면 약관을 새로 알리고, 시행 전에 미리 안내할게요.</p>
    </div>
  );
}
