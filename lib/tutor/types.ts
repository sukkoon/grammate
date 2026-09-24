import type { Band } from "@/lib/level";

/** 질문 은행의 한 항목 (content/faq/*.json) */
export interface FaqItem {
  id: string;
  /** "chapter/unit" 또는 "general" */
  unit: string;
  /** 대표 질문 */
  q: string;
  /** 다르게 묻는 표현들 */
  alts: string[];
  /** 핵심 낱말 (질문에 들어 있으면 가산점) */
  keys: string[];
  /** 쉬운 설명. 문단은 줄바꿈으로 나누고 **굵게**를 쓸 수 있다. */
  a: string;
  ex?: { en: string; ko: string }[];
  /** 마지막에 던지는 확인 질문 */
  check?: string;
  level?: Band;
}

/** 서버에서 예문을 단어 조각으로 미리 나눠 보낸 모양 */
export interface Seg {
  /** 글자 */
  t: string;
  /** 단어 뜻 (단어일 때) */
  g?: { l: string; p: string; m: string; n?: string; a?: string };
  /** 형광 표시 */
  h?: 1;
  /** 뜻을 찾지 못한 단어 */
  x?: 1;
}

export interface FaqPayload extends Omit<FaqItem, "ex"> {
  ex?: { segs: Seg[]; plain: string; ko: string }[];
}
