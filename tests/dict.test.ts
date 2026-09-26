/** 사전 검색: 영어는 앞글자로, 우리말은 뜻으로 찾고, 바뀐 모양은 원래 단어로 찾는다 */
import { describe, expect, it } from "vitest";
import { lookup, lookupPhrase, searchWords } from "@/lib/lexicon";

describe("사전 검색", () => {
  it("영어는 같은 단어가 맨 앞, 그다음 앞글자가 같은 단어", () => {
    const hits = searchWords("app");
    expect(hits.length).toBeGreaterThan(0);
    expect(hits.every((h) => h.lemma.toLowerCase().includes("app"))).toBe(true);
    expect(searchWords("apple")[0].lemma).toBe("apple");
  });

  it("단어 가운데 글자만 같은 것은 찾지 않고, 묶음 표현은 낱말 앞글자로 찾는다", () => {
    expect(searchWords("went").map((h) => h.lemma)).not.toContain("twenty");
    expect(searchWords("after").map((h) => h.lemma)).toContain("look after");
  });

  it("우리말로 적으면 그 뜻의 영어 단어를 찾는다", () => {
    expect(searchWords("사과").map((h) => h.lemma)).toContain("apple");
  });

  it("바뀐 모양과 여러 단어 묶음도 찾는다", () => {
    expect(lookup("went")?.lemma).toBe("go");
    expect(lookupPhrase("look after")?.lemma).toBe("look after");
  });

  it("빈 말은 아무것도 찾지 않는다", () => {
    expect(searchWords("  ")).toEqual([]);
  });
});
