import { readFileSync, readdirSync, existsSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { it } from "vitest";
import { registerExtra, tokenize } from "@/lib/lexicon";
import { stripHunt } from "@/lib/verbhunt";

const ROOT = join(__dirname, "..");

it("dump glosses", () => {
  registerExtra(JSON.parse(readFileSync(join(ROOT, "content/lexicon/patches/subjunctive.json"), "utf8")), {});
  const dir = join(ROOT, "content/lessons/subjunctive");
  const EN_ATTR = /\b(?:en|wrong|right)=(?:"([^"]*)"|'([^']*)')/g;
  const EN_KEY = /\b(?:en|wrong|right):\s*(?:"((?:[^"\\]|\\.)*)"|'((?:[^'\\]|\\.)*)')/g;
  const srcs: [string, string][] = readdirSync(dir).filter((f) => f.endsWith(".mdx")).map((f) => [f, readFileSync(join(dir, f), "utf8")]);
  srcs.push(["tsx", readFileSync(join(ROOT, "components/illustrations/subjunctive.tsx"), "utf8")]);
  const faq = join(ROOT, "content/faq/subjunctive.json");
  const terms = join(ROOT, "content/terms-patches/subjunctive.json");
  const out: string[] = [];
  const seen = new Map<string, string>();
  const add = (f: string, s: string) => {
    for (const seg of tokenize(s)) {
      if (seg.kind !== "word") continue;
      const key = `${seg.text.toLowerCase()} => ${seg.gloss ? `${seg.gloss.pos}: ${seg.gloss.meaning}` : "MISSING"}`;
      if (!seen.has(key)) seen.set(key, `${f}: ${s}`);
    }
  };
  for (const [f, src] of srcs)
    for (const re of [EN_ATTR, EN_KEY]) for (const m of src.matchAll(re)) {
      const x = m[1] ?? m[2];
      add(f, x.includes("*") ? stripHunt(x) : x);
    }
  if (existsSync(faq)) for (const item of JSON.parse(readFileSync(faq, "utf8"))) for (const e of item.ex ?? []) add(`faq ${item.id}`, e.en);
  if (existsSync(terms)) for (const t of JSON.parse(readFileSync(terms, "utf8"))) if (t.example) add(`term ${t.id}`, t.example);
  for (const [k, v] of [...seen.entries()].sort()) out.push(`${k}    | ${v.slice(0, 90)}`);
  writeFileSync(process.env.OUT!, out.join("\n"));
});
