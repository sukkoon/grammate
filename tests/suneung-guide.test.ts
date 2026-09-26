/** 수능 문법 안내(/suneung): 가리키는 단원이 모두 공개돼 있고, 제7부 공개 단원이 빠짐없이 들어 있다 */
import { describe, expect, it } from "vitest";
import { readyUnits } from "@/content/curriculum";
import { suneungGuide } from "@/content/suneung-guide";

const ready = new Set(readyUnits().map((r) => `${r.chapter.slug}/${r.unit.slug}`));

describe("수능 문법 안내", () => {
  it("단원과 바탕이 되는 단원이 모두 공개된 단원이다", () => {
    const bad: string[] = [];
    for (const g of suneungGuide) {
      if (!ready.has(g.unit)) bad.push(g.unit);
      for (const b of g.bases) if (!ready.has(b.href.replace("/learn/", ""))) bad.push(`${g.unit} → ${b.href}`);
    }
    expect(bad).toEqual([]);
  });

  it("제7부(수능 문법 포인트)의 공개 단원이 모두 안내에 있다", () => {
    const part7 = [...ready].filter((u) => u.startsWith("suneung/"));
    expect(part7.filter((u) => !suneungGuide.some((g) => g.unit === u))).toEqual([]);
  });
});
