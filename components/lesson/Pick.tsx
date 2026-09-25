import type { Band } from "@/lib/level";
import { En } from "./En";
import { PickClient, type PreparedPick } from "./PickClient";

export interface PickItem {
  /** 영어 문장. 고를 곳은 ((is|are))처럼 쓴다. 한 문장에 여러 곳도 된다. */
  en: string;
  /** 고를 곳마다 정답 번호 (0부터). 한 곳이면 숫자 하나 */
  answer: number | number[];
  /** 해설 */
  why: string;
  /** 우리말 해석 (선택) */
  ko?: string;
  level?: Band;
}

const BOX = /\(\(([^()]+?)\)\)/g;

/** 수능식 '네모 고르기'. 문장 속 괄호에서 어법에 맞는 것을 고른다. */
export function Pick({ id, title, items }: { id: string; title?: string; items: PickItem[] }) {
  const prepared: PreparedPick[] = items.map((it, n) => {
    const parts: PreparedPick["parts"] = [];
    let last = 0;
    for (const m of it.en.matchAll(BOX)) {
      const text = it.en.slice(last, m.index);
      if (text) parts.push({ kind: "text", node: <En en={text} /> });
      parts.push({ kind: "box", b: parts.filter((x) => x.kind === "box").length, choices: m[1].split("|").map((c) => c.trim()) });
      last = m.index + m[0].length;
    }
    const tail = it.en.slice(last);
    if (tail) parts.push({ kind: "text", node: <En en={tail} /> });

    const boxes = parts.filter((p) => p.kind === "box");
    const answers = Array.isArray(it.answer) ? it.answer : [it.answer];
    if (boxes.length === 0 || boxes.length !== answers.length)
      throw new Error(`Pick ${id} #${n + 1}: 고를 곳 ${boxes.length}개, 정답 ${answers.length}개`);
    answers.forEach((a, b) => {
      const box = boxes[b];
      if (box.kind === "box" && (a < 0 || a >= box.choices.length)) throw new Error(`Pick ${id} #${n + 1}: 정답 번호가 보기 밖이에요`);
    });
    return { parts, answers, why: it.why, ko: it.ko, level: it.level, plain: it.en.replace(BOX, "[ ]") };
  });
  return <PickClient id={id} title={title} items={prepared} />;
}
