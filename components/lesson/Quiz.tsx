import type { Band } from "@/lib/level";
import { En } from "./En";
import { QuizClient, type PreparedItem } from "./QuizClient";

export interface QuizItem {
  /** 한국어 질문 */
  q: string;
  /** 문제에 쓰이는 영어 문장 (빈칸은 ___) */
  en?: string;
  options: string[];
  /** 정답 보기의 번호 (0부터) */
  answer: number;
  /** 해설 */
  why: string;
  /** 이 문제가 필요한 수준 (없으면 모두에게) */
  level?: Band;
}

/** 확인 문제. 영어 문장은 서버에서 단어 뜻까지 붙여서 넘긴다. */
export function Quiz({ id, items }: { id: string; items: QuizItem[] }) {
  const prepared: PreparedItem[] = items.map((it) => ({
    ...it,
    enNode: it.en ? <En en={it.en} /> : null,
  }));
  return <QuizClient id={id} items={prepared} />;
}
