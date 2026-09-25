import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { compile } from "@mdx-js/mdx";
import remarkGfm from "remark-gfm";
import { missingWords, registerExtra } from "@/lib/lexicon";
import { stripHunt } from "@/lib/verbhunt";
import { termById } from "@/content/terms";
import * as Sj from "@/components/illustrations/subjunctive";

const ROOT = join(__dirname, "..");
const dir = join(ROOT, "content/lessons/subjunctive");
const files = readdirSync(dir).filter((f) => f.endsWith(".mdx"));

describe("subjunctive temp checks", () => {
  it("compiles, components, terms, quiz, hanja, counts", async () => {
    const patchTerms = JSON.parse(readFileSync(join(ROOT, "content/terms-patches/subjunctive.json"), "utf8")) as { id: string }[];
    const known = new Set([
      "DeepDive", "E", "ExamPoint", "Ex", "Examples", "Figure", "KeyIdea", "Mistake", "Summary", "Tip",
      "TermAnatomy", "Quiz", "VerbHunt", "Lv", "Easy", "More", ...Object.keys(Sj),
    ]);
    const report: string[] = [];
    for (const f of files) {
      const src = readFileSync(join(dir, f), "utf8");
      await compile(src, { remarkPlugins: [remarkGfm] });
      const comps = [...src.matchAll(/<([A-Z][A-Za-z]*)/g)].map((m) => m[1]);
      const unknown = [...new Set(comps.filter((c) => !known.has(c)))];
      expect(unknown, f).toEqual([]);
      for (const m of src.matchAll(/<TermAnatomy id="([^"]+)"/g))
        expect(!!termById(m[1]) || patchTerms.some((t) => t.id === m[1]), `${f} term ${m[1]}`).toBe(true);
      for (const m of src.matchAll(/options:\s*\[([^\]]*)\][\s\S]*?answer:\s*(\d+)/g)) {
        const count = (m[1].match(/"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/g) ?? []).length;
        expect(Number(m[2]) < count, `${f} answer ${m[2]} / ${count}`).toBe(true);
      }
      expect(src.match(/[一-鿿]/g), `${f} hanja`).toBeNull();
      const ex = (src.match(/<Ex /g) ?? []).length;
      const mi = (src.match(/<Mistake /g) ?? []).length;
      const qz = (src.match(/\bq: "/g) ?? []).length;
      const fig = (src.match(/<Figure /g) ?? []).length;
      const vh = (src.match(/<VerbHunt/g) ?? []).length;
      report.push(`${f}: Ex ${ex} + Mistake ${mi} + Quiz ${qz} = ${ex + mi + qz}; Figure ${fig}; VerbHunt ${vh}`);
      for (const m of src.matchAll(/<Sj([A-Za-z]+)/g)) report.push(`  uses Sj${m[1]}`);
    }
    // 패치 없이 뽑은 빠진 단어 (패치가 실제로 쓰이는지 확인용)
    const EN_ATTR = /\b(?:en|wrong|right)=(?:"([^"]*)"|'([^']*)')/g;
    const EN_KEY = /\b(?:en|wrong|right):\s*(?:"((?:[^"\\]|\\.)*)"|'((?:[^'\\]|\\.)*)')/g;
    const sentences: string[] = [];
    const srcs = [
      ...files.map((f) => readFileSync(join(dir, f), "utf8")),
      readFileSync(join(ROOT, "components/illustrations/subjunctive.tsx"), "utf8"),
    ];
    for (const src of srcs)
      for (const re of [EN_ATTR, EN_KEY]) for (const m of src.matchAll(re)) {
        const x = m[1] ?? m[2];
        sentences.push(x.includes("*") ? stripHunt(x) : x);
      }
    const faqPath = join(ROOT, "content/faq/subjunctive.json");
    if (existsSync(faqPath)) for (const item of JSON.parse(readFileSync(faqPath, "utf8"))) for (const e of item.ex ?? []) sentences.push(e.en);
    const before = [...new Set(sentences.flatMap((s) => missingWords(s)))];
    report.push(`sentences: ${sentences.length}; missing without patch: ${before.join(", ")}`);
    const patch = JSON.parse(readFileSync(join(ROOT, "content/lexicon/patches/subjunctive.json"), "utf8"));
    registerExtra(patch, {});
    const after = [...new Set(sentences.flatMap((s) => missingWords(s)))];
    report.push(`missing with patch: ${after.join(", ")}`);
    const unused = Object.keys(patch).filter((k) => !sentences.some((s) => s.toLowerCase().includes(k.toLowerCase())));
    report.push(`patch keys not seen in sentences: ${unused.join(", ")}`);
    console.log(report.join("\n"));
  });
});
