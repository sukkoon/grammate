import localFont from "next/font/local";

/**
 * 영문: Changa Regular 한 굵기만 쓴다. 굵기 범위를 100~900으로 걸어 두어
 * font-weight를 굵게 줘도 영문은 늘 보통 굵기로 보인다(가짜 볼드도 생기지 않음).
 * 나눔스퀘어와 글자 크기가 비슷해 보이도록 112%로 키운다.
 */
export const changa = localFont({
  src: "./fonts/Changa-Regular-latin.woff2",
  weight: "100 900",
  variable: "--font-en",
  display: "swap",
  declarations: [{ prop: "size-adjust", value: "112%" }],
});

/**
 * 한글: 네이버 나눔스퀘어 ac를 바탕으로 한 글꼴(SIL OFL 1.1). 400·700·800 세 굵기만 쓴다.
 * 자주 쓰는 글자만 담은 수정본이라, 라이선스의 예약 이름 조항에 따라 이름을 'Grammarang Ko'로 바꿨다 (fonts/FONTS.md, fonts/OFL-Korean.txt).
 */
export const koFont = localFont({
  src: [
    { path: "./fonts/GrammarangKo-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/GrammarangKo-Bold.woff2", weight: "700", style: "normal" },
    { path: "./fonts/GrammarangKo-ExtraBold.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-ko",
  display: "swap",
  preload: false,
  fallback: ["Apple SD Gothic Neo", "Malgun Gothic", "sans-serif"],
});
