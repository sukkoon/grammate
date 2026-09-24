/**
 * 한 장(chapter)의 초안 검사. 사전 패치를 잠시 더한 상태로 뜻이 빠진 단어를 찾는다.
 *   DRAFT=sentence-types npx vitest run tests/draft.test.ts
 */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { missingWords, registerExtra } from "@/lib/lexicon";
import { stripHunt } from "@/lib/verbhunt";

const chapter = process.env.DRAFT;
const ROOT = join(__dirname, "..");
const read = (p: string) => JSON.parse(readFileSync(p, "utf8"));

describe.skipIf(!chapter)(`초안 검사: ${chapter}`, () => {
  it("뜻이 빠진 단어가 없다", () => {
    const wp = join(ROOT, "content/lexicon/patches", `${chapter}.json`);
    const fp = join(ROOT, "content/lexicon/patches", `${chapter}.forms.json`);
    registerExtra(existsSync(wp) ? read(wp) : {}, existsSync(fp) ? read(fp) : {});

    const EN_ATTR = /\b(?:en|wrong|right)=(?:"([^"]*)"|'([^']*)')/g;
    const EN_KEY = /\b(?:en|wrong|right):\s*(?:"((?:[^"\\]|\\.)*)"|'((?:[^'\\]|\\.)*)')/g;
    const sentences: [string, string][] = [];
    const dir = join(ROOT, "content/lessons", chapter!);
    if (existsSync(dir))
      for (const f of readdirSync(dir).filter((n) => n.endsWith(".mdx"))) {
        const src = readFileSync(join(dir, f), "utf8");
        for (const re of [EN_ATTR, EN_KEY]) for (const m of src.matchAll(re)) sentences.push([f, stripHunt(m[1] ?? m[2])]);
      }
    const illu = join(ROOT, "components/illustrations", `${chapter}.tsx`);
    if (existsSync(illu)) {
      const src = readFileSync(illu, "utf8");
      for (const re of [EN_ATTR, EN_KEY]) for (const m of src.matchAll(re)) sentences.push([`${chapter}.tsx`, m[1] ?? m[2]]);
    }
    const faqPath = join(ROOT, "content/faq", `${chapter}.json`);
    if (existsSync(faqPath))
      for (const item of read(faqPath)) for (const e of item.ex ?? []) sentences.push([`faq ${item.id}`, e.en]);
    const tp = join(ROOT, "content/terms-patches", `${chapter}.json`);
    if (existsSync(tp)) for (const t of read(tp)) if (t.example) sentences.push([`term ${t.id}`, t.example]);

    const missing = sentences.flatMap(([f, s]) => missingWords(s).map((w) => `${f}: ${w}  ←  ${s}`));
    expect(missing, `사전 패치(content/lexicon/patches/${chapter}.json)에 추가할 단어:\n${missing.join("\n")}`).toEqual([]);
  });
});
