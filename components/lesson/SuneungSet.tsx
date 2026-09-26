import { suneungTopics } from "@/content/suneung";
import { boxOptions, parsePassage, problemsOf } from "@/lib/suneung";
import { SuneungSetClient, type PreparedSuneung } from "./SuneungSetClient";

/**
 * 수능형 예시 문제 묶음: <SuneungSet topic="subject-verb" />
 * 문제는 content/suneung/<topic>.ts에 있다. 누를 때마다 섞인 순서로 다른 문제를 보여 준다.
 */
export function SuneungSet({ topic, title }: { topic: string; title?: string }) {
  const t = suneungTopics[topic];
  if (!t) throw new Error(`SuneungSet: '${topic}' 주제가 없어요 (content/suneung/index.ts)`);
  const items: PreparedSuneung[] = t.items.map((it) => {
    const problems = problemsOf(it);
    if (problems.length) throw new Error(`SuneungSet ${topic}/${it.id}: ${problems.join(" / ")}`);
    const parts = parsePassage(it.passage);
    if (it.kind === "underline") {
      const wrong = parts.find((p) => p.kind === "underline" && p.n === it.answer);
      return { id: it.id, kind: "underline", parts, answer: it.answer - 1, why: it.why, ko: it.ko, wrong: wrong?.kind === "underline" ? wrong.text : "", fix: it.fix };
    }
    const boxes = parts.flatMap((p) => (p.kind === "box" ? [p.choices] : []));
    const [options, answer] = boxOptions(it);
    return {
      id: it.id,
      kind: "box",
      parts,
      answer,
      why: it.why,
      ko: it.ko,
      options: options.map((combo) => combo.map((c, b) => boxes[b][c])),
      picks: it.answer.map((c, b) => boxes[b][c]),
    };
  });
  return <SuneungSetClient title={title ?? t.title} items={items} />;
}
