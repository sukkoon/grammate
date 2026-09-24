import { describe, expect, it } from "vitest";
import { lookup, lookupPhrase, plain, tokenize } from "@/lib/lexicon";
import { parseHunt, stripHunt } from "@/lib/verbhunt";

describe("lookup", () => {
  it("불규칙 변화형은 원형과 설명을 붙인다", () => {
    const g = lookup("went");
    expect(g?.lemma).toBe("go");
    expect(g?.note).toBe("go의 과거형");
  });

  it("규칙 변화형을 되돌린다", () => {
    expect(lookup("likes")?.note).toBe("like의 3인칭 단수형");
    expect(lookup("cats")?.note).toBe("cat의 복수형");
    expect(lookup("played")?.lemma).toBe("play");
    expect(lookup("running")?.lemma).toBe("run");
    expect(lookup("making")?.lemma).toBe("make");
    expect(lookup("taller")?.note).toBe("tall의 비교급");
  });

  it("소유격 's", () => {
    expect(lookup("Minsu's")?.meaning).toBe("민수 (사람 이름)의");
  });

  it("문장 첫 단어는 소문자 뜻을 먼저 본다", () => {
    expect(lookup("The", true)?.pos).toBe("정관사");
  });

  it("구동사는 첫 단어가 변해도 찾는다", () => {
    expect(lookupPhrase("looked after")?.lemma).toBe("look after");
  });
});

describe("tokenize", () => {
  it("형광 표시와 뜻 덮어쓰기", () => {
    const segs = tokenize("She sings [[{like|전치사:~처럼}]] a bird.");
    const like = segs.find((s) => s.kind === "word" && s.text === "like");
    expect(like && like.kind === "word" && like.gloss?.meaning).toBe("~처럼");
    expect(like && like.kind === "word" && like.gloss?.pos).toBe("전치사");
    expect(like?.hl).toBe(true);
  });

  it("발음용 순수 문장", () => {
    expect(plain("I {look after} [[my]] sister.")).toBe("I look after my sister.");
  });
});

describe("verbhunt", () => {
  it("진짜 동사와 변장한 동사를 가른다", () => {
    const t = parseHunt("I *want* ~to eat|to부정사~ pizza.");
    expect(t.filter((x) => x.kind === "word" && x.role === "verb").map((x) => x.text)).toEqual(["want"]);
    expect(stripHunt("I *want* ~to eat|to부정사~ pizza.")).toBe("I want to eat pizza.");
  });
});
