import localFont from "next/font/local";

/** 영문: Changa. 나눔스퀘어와 글자 크기가 비슷해 보이도록 112%로 키운다. */
export const changa = localFont({
  src: "./fonts/Changa-latin.woff2",
  weight: "200 800",
  variable: "--font-en",
  display: "swap",
  declarations: [{ prop: "size-adjust", value: "112%" }],
});

/** 한글: 나눔스퀘어 ac. 400·700·800 세 굵기만 쓴다. */
export const nanumSquare = localFont({
  src: [
    { path: "./fonts/NanumSquare_acR.woff2", weight: "400", style: "normal" },
    { path: "./fonts/NanumSquare_acB.woff2", weight: "700", style: "normal" },
    { path: "./fonts/NanumSquare_acEB.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-ko",
  display: "swap",
  preload: false,
  fallback: ["Apple SD Gothic Neo", "Malgun Gothic", "sans-serif"],
});
