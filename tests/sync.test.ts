/** 학습 기록 합치기 규칙: 같은 항목은 더 나중 일이 이긴다(저장·삭제 모두), 서로 없는 것은 합쳐진다 */
import { describe, expect, it } from "vitest";
import { merge } from "@/lib/sync";
import type { RecordsBundle } from "@/lib/local-store";

const word = (lemma: string, savedAt: number) => ({ word: lemma, lemma, pos: "명사", meaning: "뜻", savedAt });
const bundle = (p: Partial<RecordsBundle> = {}): RecordsBundle => ({ words: [], wordsGone: {}, quiz: {}, read: {}, readGone: {}, ...p });

describe("학습 기록 합치기", () => {
  it("두 기기의 단어장은 합쳐지고, 같은 단어는 나중에 저장한 것만 남는다", () => {
    const a = bundle({ words: [word("cat", 100), word("dog", 50)] });
    const b = bundle({ words: [word("dog", 80), word("sun", 30)] });
    const m = merge(a, b);
    expect(m.words.map((w) => `${w.lemma}@${w.savedAt}`)).toEqual(["cat@100", "dog@80", "sun@30"]);
  });

  it("한쪽에서 지운 단어는 지운 시각이 저장 시각보다 뒤이면 되살아나지 않는다", () => {
    const a = bundle({ words: [], wordsGone: { cat: 200 } });
    const b = bundle({ words: [word("cat", 100)] });
    expect(merge(a, b).words).toEqual([]);
    expect(merge(b, a).words).toEqual([]);
  });

  it("지운 뒤 다시 저장한 단어는 살아난다", () => {
    const a = bundle({ words: [], wordsGone: { cat: 100 } });
    const b = bundle({ words: [word("cat", 300)] });
    const m = merge(a, b);
    expect(m.words.map((w) => w.lemma)).toEqual(["cat"]);
    expect(m.wordsGone).toEqual({});
  });

  it("확인 문제 기록은 항목마다 더 나중 것을 남긴다", () => {
    const a = bundle({ quiz: { "x#1": { key: "x#1", unit: "x", question: "q", correct: false, at: 10 } } });
    const b = bundle({ quiz: { "x#1": { key: "x#1", unit: "x", question: "q", correct: true, at: 20 }, "x#2": { key: "x#2", unit: "x", question: "q2", correct: true, at: 5 } } });
    const m = merge(a, b);
    expect(m.quiz["x#1"].correct).toBe(true);
    expect(Object.keys(m.quiz).sort()).toEqual(["x#1", "x#2"]);
  });

  it("다 읽음 표시는 합쳐지고, 나중에 푼 표시는 사라진다", () => {
    const a = bundle({ read: { "a/1": 100, "a/2": 100 } });
    const b = bundle({ read: { "a/3": 50 }, readGone: { "a/2": 150 } });
    const m = merge(a, b);
    expect(Object.keys(m.read).sort()).toEqual(["a/1", "a/3"]);
  });
});
