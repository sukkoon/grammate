import type { Metadata } from "next";

export const metadata: Metadata = { title: "개인정보처리방침" };

// 초안: 로그인 기능을 붙이기 전에 수집 항목·보관 기간·위탁 업체(Supabase 등)를 채우고 법률 검토를 받는다.
export default function PrivacyPage() {
  return (
    <div className="lesson mx-auto max-w-3xl px-4 pb-10 pt-10 sm:px-6">
      <h1 className="text-[2rem] font-extrabold">개인정보처리방침</h1>
      <p className="text-ink-3">초안 · 정식 서비스 전에 내용을 확정할 예정이에요.</p>

      <h2>1. 지금 모으는 정보</h2>
      <p>
        그래메이트는 지금 회원가입 없이 쓸 수 있고, 서버에 개인정보를 모으지 않아요. 단어장, 확인 문제 기록, 읽은 단원은 이용자의
        기기(브라우저) 안에만 저장되고, 언제든 &lsquo;내 공부&rsquo; 화면에서 지울 수 있어요.
      </p>

      <h2>2. 음성 질문</h2>
      <p>
        &lsquo;모르는 것이 있으면 이야기 해봐요&rsquo;의 음성 인식은 이용자가 쓰는 브라우저의 기능을 사용해요. 브라우저에 따라 음성이
        브라우저 회사(예: Google, Apple)의 서버에서 글자로 바뀔 수 있어요. 그래메이트는 음성 파일을 저장하지 않아요.
      </p>

      <h2>3. 로그인 기능이 생기면</h2>
      <ul>
        <li>회원가입 시 모으는 정보, 이용 목적, 보관 기간을 이 페이지에 먼저 알려 드릴게요.</li>
        <li>
          만 14세 미만 어린이는 개인정보보호법에 따라 <strong>보호자(법정대리인)의 동의</strong>를 받은 뒤에 가입할 수 있어요.
        </li>
        <li>학습 기록은 본인만 볼 수 있고, 다른 이용자에게 보여 주거나 순위를 매기지 않아요.</li>
      </ul>

      <h2>4. 문의</h2>
      <p>개인정보에 관한 문의 창구는 정식 서비스 전에 안내할게요.</p>
    </div>
  );
}
