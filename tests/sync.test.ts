/** 학습 기록 합치기 규칙: 같은 항목은 더 나중 일이 이긴다(저장·삭제 모두), 서로 없는 것은 합쳐진다 */
import { describe, expect, it } from "vitest";
import { merge } from "@/lib/sync";
import type { RecordsBundle } from "@/lib/local-store";

const word = (lemma: string, savedAt: number) => ({ word: lemma, lemma, pos: "명사", meaning: "뜻", savedAt });
const bundle = (p: Partial<RecordsBundle> = {}): RecordsBundle => ({ words: [], wordsGone: {}, quiz: {}, read: {}, readGone: {}, clearedAt: 0, ...p });

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

  it("'기록 모두 지우기'를 누르면 그보다 앞선 기록은 다른 기기에서 와도 사라지고, 그 뒤 기록은 남는다", () => {
    const cleared = bundle({ clearedAt: 200 });
    const other = bundle({
      words: [word("cat", 100), word("sun", 300)],
      quiz: { "x#1": { key: "x#1", unit: "x", question: "q", correct: false, at: 150 } },
      read: { "a/1": 100, "a/2": 250 },
      readGone: { "a/3": 120 },
    });
    for (const m of [merge(cleared, other), merge(other, cleared)]) {
      expect(m.words.map((w) => w.lemma)).toEqual(["sun"]);
      expect(m.quiz).toEqual({});
      expect(m.read).toEqual({ "a/2": 250 });
      expect(m.readGone).toEqual({});
      expect(m.clearedAt).toBe(200);
    }
  });

  it("지운 시각은 더 나중 것이 남는다 (옛 기기의 기록에 없어도 사라지지 않는다)", () => {
    expect(merge(bundle({ clearedAt: 300 }), bundle({ clearedAt: 100 })).clearedAt).toBe(300);
    expect(merge(bundle(), bundle({ clearedAt: 100 })).clearedAt).toBe(100);
  });
});
