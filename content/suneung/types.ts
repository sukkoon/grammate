/**
 * 수능형 예시 문제. 그래머랑이 수능 29번 어법 문제와 같은 형식으로 직접 새로 만든 문제다.
 * 실제 기출문제는 옮기지 않는다(저작권이 한국교육과정평가원과 지문 원저자에게 있다). 화면에도 '수능형'이라고 밝힌다.
 */

/** 밑줄형: 지문의 밑줄 ①~⑤ 가운데 어법상 틀린 것 하나를 고른다 */
export interface UnderlineItem {
  /** 주제 안에서 겹치지 않는 짧은 이름 (예: "sv-1") */
  id: string;
  kind: "underline";
  /** 지문. 밑줄은 [1:are]처럼 번호와 밑줄 친 말을 쓴다. 1~5가 차례대로 한 번씩 나온다 */
  passage: string;
  /** 어법상 틀린 밑줄 번호 */
  answer: 1 | 2 | 3 | 4 | 5;
  /** 틀린 밑줄을 바르게 고친 말 */
  fix: string;
  /** 밑줄 ①~⑤ 각각의 풀이: 맞는 것은 왜 맞는지, 틀린 것은 왜 틀렸고 어떻게 고치는지 */
  why: [string, string, string, string, string];
  /** 지문 해석 */
  ko: string;
}

/** 네모형: (A)(B)(C) 네모마다 어법에 맞는 말을 고른다 */
export interface BoxItem {
  id: string;
  kind: "box";
  /** 지문. 네모는 [A:is|are]처럼 쓴다. A, B, C가 차례대로 한 번씩, 보기는 두 개씩 */
  passage: string;
  /** (A)(B)(C) 각각 맞는 보기 번호 (0이면 앞, 1이면 뒤) */
  answer: [0 | 1, 0 | 1, 0 | 1];
  /** (A)(B)(C) 각각의 풀이 */
  why: [string, string, string];
  ko: string;
}

export type SuneungItem = UnderlineItem | BoxItem;

export interface SuneungTopic {
  /** 주제 이름 (MDX에서 <SuneungSet topic="…" />로 부른다) */
  id: string;
  /** 화면에 보이는 주제 제목 (예: "수일치") */
  title: string;
  items: SuneungItem[];
}
