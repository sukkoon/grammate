import type { BoxItem, SuneungItem } from "@/content/suneung/types";

/** 지문 조각: 그냥 글, 밑줄(①~⑤), 네모((A)(B)(C)) */
export type PassagePart =
  | { kind: "text"; text: string }
  | { kind: "underline"; n: number; text: string }
  | { kind: "box"; label: "A" | "B" | "C"; choices: [string, string] };

const MARK = /\[([1-5]|[ABC]):([^\]]+)\]/g;

export function parsePassage(passage: string): PassagePart[] {
  const parts: PassagePart[] = [];
  let last = 0;
  for (const m of passage.matchAll(MARK)) {
    if (m.index > last) parts.push({ kind: "text", text: passage.slice(last, m.index) });
    const [, mark, body] = m;
    if (/[1-5]/.test(mark)) parts.push({ kind: "underline", n: Number(mark), text: body.trim() });
    else {
      const choices = body.split("|").map((c) => c.trim());
      parts.push({ kind: "box", label: mark as "A" | "B" | "C", choices: [choices[0] ?? "", choices[1] ?? ""] });
    }
    last = m.index + m[0].length;
  }
  if (last < passage.length) parts.push({ kind: "text", text: passage.slice(last) });
  return parts;
}

/** 표시 문자열에서 표기를 걷어 낸 글 (밑줄 친 말, 네모는 (A) 앞/뒤로) */
export const plainPassage = (passage: string) =>
  passage.replace(MARK, (_, mark: string, body: string) => (/[1-5]/.test(mark) ? body.trim() : `(${mark})`));

type Combo = [0 | 1, 0 | 1, 0 | 1];

/** 문자열로 만든 작은 씨앗: 같은 문제는 언제나 같은 보기 순서가 나오게 */
function seed(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}

/**
 * 네모형의 보기 다섯 개: 여덟 가지 조합 가운데 정답과 다른 네 개를 고르고, 수능처럼 (A)→(B)→(C) 순으로 늘어놓는다.
 * 돌려주는 값은 [보기 목록, 정답 보기 번호(0부터)].
 */
export function boxOptions(item: BoxItem): [Combo[], number] {
  const all: Combo[] = [];
  for (const a of [0, 1] as const) for (const b of [0, 1] as const) for (const c of [0, 1] as const) all.push([a, b, c]);
  const key = (c: Combo) => c.join("");
  const right = key(item.answer);
  const others = all.filter((c) => key(c) !== right);
  let s = seed(item.id);
  while (others.length > 4) {
    s = Math.imul(s ^ (s >>> 15), 2246822519) >>> 0;
    others.splice(s % others.length, 1);
  }
  const options = [...others, item.answer].sort((x, y) => key(x).localeCompare(key(y)));
  return [options, options.findIndex((c) => key(c) === right)];
}

/** 문제 모양 검사: 고칠 곳이 있으면 설명을 돌려준다 (tests/suneung.test.ts와 SuneungSet에서 쓴다) */
export function problemsOf(item: SuneungItem): string[] {
  const out: string[] = [];
  const parts = parsePassage(item.passage);
  if (!item.id) out.push("id가 비어 있어요");
  if (!item.ko?.trim()) out.push("해석(ko)이 비어 있어요");
  if (item.kind === "underline") {
    const ns = parts.filter((p) => p.kind === "underline").map((p) => (p.kind === "underline" ? p.n : 0));
    if (ns.join(",") !== "1,2,3,4,5") out.push(`밑줄은 1~5가 차례대로 한 번씩이어야 해요 (지금: ${ns.join(",") || "없음"})`);
    if (parts.some((p) => p.kind === "box")) out.push("밑줄형에 네모가 섞여 있어요");
    if (![1, 2, 3, 4, 5].includes(item.answer)) out.push("정답은 1~5 가운데 하나예요");
    if (item.why?.length !== 5 || item.why.some((w) => !w?.trim())) out.push("풀이(why)는 밑줄마다 하나씩 다섯 개예요");
    if (!item.fix?.trim()) out.push("고친 말(fix)이 비어 있어요");
    const wrong = parts.find((p) => p.kind === "underline" && p.n === item.answer);
    if (wrong && wrong.kind === "underline" && wrong.text === item.fix.trim()) out.push("고친 말이 밑줄 친 말과 같아요");
  } else {
    const labels = parts.filter((p) => p.kind === "box").map((p) => (p.kind === "box" ? p.label : ""));
    if (labels.join("") !== "ABC") out.push(`네모는 A, B, C가 차례대로 한 번씩이어야 해요 (지금: ${labels.join("") || "없음"})`);
    if (parts.some((p) => p.kind === "underline")) out.push("네모형에 밑줄이 섞여 있어요");
    for (const p of parts)
      if (p.kind === "box" && (p.choices.some((c) => !c) || p.choices[0] === p.choices[1])) out.push(`(${p.label}) 보기는 서로 다른 두 개여야 해요`);
    if (item.answer?.length !== 3 || item.answer.some((a) => a !== 0 && a !== 1)) out.push("정답은 [0 또는 1, …] 세 개예요");
    if (item.why?.length !== 3 || item.why.some((w) => !w?.trim())) out.push("풀이(why)는 네모마다 하나씩 세 개예요");
  }
  return out;
}
