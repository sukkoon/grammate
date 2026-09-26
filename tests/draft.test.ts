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
    // 한 장을 여럿이 나눠 쓸 때는 <장>-<단원>.json처럼 패치를 따로 둔다: 장 이름으로 시작하는 패치를 모두 더한다
    const pdir = join(ROOT, "content/lexicon/patches");
    const mine = (n: string) => n === `${chapter}.json` || n === `${chapter}.forms.json` || (n.startsWith(`${chapter}-`) && n.endsWith(".json"));
    const patches = existsSync(pdir) ? readdirSync(pdir).filter(mine) : [];
    const words = Object.assign({}, ...patches.filter((n) => !n.endsWith(".forms.json")).map((n) => read(join(pdir, n))));
    const forms = Object.assign({}, ...patches.filter((n) => n.endsWith(".forms.json")).map((n) => read(join(pdir, n))));
    registerExtra(words, forms);

    const EN_ATTR = /\b(?:en|wrong|right)=(?:"([^"]*)"|'([^']*)')/g;
    const EN_KEY = /\b(?:en|wrong|right):\s*(?:"((?:[^"\\]|\\.)*)"|'((?:[^'\\]|\\.)*)')/g;
    const sentences: [string, string][] = [];
    const dir = join(ROOT, "content/lessons", chapter!);
    if (existsSync(dir))
      for (const f of readdirSync(dir).filter((n) => n.endsWith(".mdx"))) {
        const src = readFileSync(join(dir, f), "utf8");
        for (const re of [EN_ATTR, EN_KEY]) for (const m of src.matchAll(re)) {
          const x = m[1] ?? m[2];
          sentences.push([f, x.includes("*") ? stripHunt(x) : x]);
        }
      }
    const idir = join(ROOT, "components/illustrations");
    for (const name of readdirSync(idir).filter((n) => n === `${chapter}.tsx` || (n.startsWith(`${chapter}-`) && n.endsWith(".tsx")))) {
      const src = readFileSync(join(idir, name), "utf8");
      for (const re of [EN_ATTR, EN_KEY]) for (const m of src.matchAll(re)) sentences.push([name, m[1] ?? m[2]]);
    }
    const faqFiles = [join(ROOT, "content/faq", `${chapter}.json`)];
    const fdir = join(ROOT, "content/faq/drafts");
    if (existsSync(fdir)) faqFiles.push(...readdirSync(fdir).filter((n) => n.startsWith(`${chapter}-`) && n.endsWith(".json")).map((n) => join(fdir, n)));
    for (const faqPath of faqFiles.filter((f) => existsSync(f)))
      for (const item of read(faqPath)) for (const e of item.ex ?? []) sentences.push([`faq ${item.id}`, e.en]);
    const tdir = join(ROOT, "content/terms-patches");
    if (existsSync(tdir))
      for (const name of readdirSync(tdir).filter((n) => n === `${chapter}.json` || (n.startsWith(`${chapter}-`) && n.endsWith(".json"))))
        for (const t of read(join(tdir, name))) if (t.example) sentences.push([`term ${t.id}`, t.example]);

    const missing = sentences.flatMap(([f, s]) => missingWords(s).map((w) => `${f}: ${w}  ←  ${s}`));
    expect(missing, `사전 패치(content/lexicon/patches/${chapter}.json)에 추가할 단어:\n${missing.join("\n")}`).toEqual([]);
  });
});
