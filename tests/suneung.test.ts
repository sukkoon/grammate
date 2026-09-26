/** 수능형 예시 문제 검사: 모양(밑줄 1~5, 네모 A~C, 풀이 개수)과 주제별 문제 수, 단원에서 부르는 주제가 있는지 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { suneungTopics } from "@/content/suneung";
import { readyUnits } from "@/content/curriculum";
import { boxOptions, parsePassage, problemsOf } from "@/lib/suneung";

const ROOT = join(__dirname, "..");
/** 주제마다 적어도 이만큼은 있어야 누를 때마다 다른 문제가 나온다 */
const MIN_ITEMS = 8;

describe("수능형 예시 문제", () => {
  it("모든 문제의 모양이 맞다", () => {
    const bad: string[] = [];
    for (const t of Object.values(suneungTopics))
      for (const it of t.items) for (const p of problemsOf(it)) bad.push(`${t.id}/${it.id}: ${p}`);
    expect(bad, bad.join("\n")).toEqual([]);
  });

  it("문제 id는 전체에서 겹치지 않는다", () => {
    const seen = new Map<string, string>();
    const dup: string[] = [];
    for (const t of Object.values(suneungTopics))
      for (const it of t.items) {
        if (seen.has(it.id)) dup.push(`${it.id} (${seen.get(it.id)}, ${t.id})`);
        seen.set(it.id, t.id);
      }
    expect(dup).toEqual([]);
  });

  it(`주제마다 ${MIN_ITEMS}문제 이상이고 밑줄형과 네모형이 섞여 있다`, () => {
    const short: string[] = [];
    for (const t of Object.values(suneungTopics)) {
      if (t.items.length < MIN_ITEMS) short.push(`${t.id}: ${t.items.length}문제`);
      else if (t.id !== "mixed" && !(t.items.some((i) => i.kind === "underline") && t.items.some((i) => i.kind === "box"))) short.push(`${t.id}: 한 가지 형식만 있음`);
    }
    expect(short, short.join("\n")).toEqual([]);
  });

  it("밑줄형 정답이 한곳에 몰리지 않는다", () => {
    const counts = [0, 0, 0, 0, 0];
    for (const t of Object.values(suneungTopics)) for (const it of t.items) if (it.kind === "underline") counts[it.answer - 1]++;
    const total = counts.reduce((a, b) => a + b, 0);
    for (const c of counts) expect(c, `정답 번호 분포: ${counts.join(", ")}`).toBeLessThanOrEqual(Math.ceil(total * 0.35));
  });

  it("네모형 보기는 서로 다른 다섯 개이고 정답이 들어 있다", () => {
    for (const t of Object.values(suneungTopics))
      for (const it of t.items) {
        if (it.kind !== "box") continue;
        const [options, answer] = boxOptions(it);
        expect(options).toHaveLength(5);
        expect(new Set(options.map((o) => o.join(""))).size).toBe(5);
        expect(options[answer]).toEqual(it.answer);
      }
  });

  it("지문 표기를 조각으로 나눈다", () => {
    expect(parsePassage("He [1:go] and [A:is|are] ok.")).toEqual([
      { kind: "text", text: "He " },
      { kind: "underline", n: 1, text: "go" },
      { kind: "text", text: " and " },
      { kind: "box", label: "A", choices: ["is", "are"] },
      { kind: "text", text: " ok." },
    ]);
  });

  it("단원에서 부르는 주제가 모두 있고, 모든 주제가 공개된 단원 어딘가에 나온다", () => {
    const used = new Set<string>();
    const missing: string[] = [];
    for (const r of readyUnits()) {
      const src = readFileSync(join(ROOT, "content", "lessons", r.chapter.slug, `${r.unit.slug}.mdx`), "utf8");
      for (const m of src.matchAll(/<SuneungSet\s+topic="([^"]+)"/g)) {
        used.add(m[1]);
        if (!suneungTopics[m[1]]) missing.push(`${r.chapter.slug}/${r.unit.slug}: ${m[1]}`);
      }
    }
    expect(missing).toEqual([]);
    expect(Object.keys(suneungTopics).filter((t) => !used.has(t))).toEqual([]);
  });
});
