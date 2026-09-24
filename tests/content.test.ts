/**
 * 콘텐츠 검사: 사이트에 나오는 모든 영어 예문의 단어가 사전에 있는지, 단원 파일이 빠짐없는지 확인한다.
 * `npm run build` 전에 자동으로 돌아서, 뜻이 빠진 단어가 있으면 배포를 막는다.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";
import { missingWords } from "@/lib/lexicon";
import { stripHunt } from "@/lib/verbhunt";
import { readyUnits } from "@/content/curriculum";
import { terms, termById } from "@/content/terms";

const ROOT = join(__dirname, "..");

function walk(dir: string, exts: string[]): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...walk(p, exts));
    else if (exts.some((e) => name.endsWith(e))) out.push(p);
  }
  return out;
}

/** 영어 문장이 들어가는 자리: en="…", wrong="…", right="…", en: "…" */
const EN_ATTR = /\b(?:en|wrong|right)=(?:"([^"]*)"|'([^']*)')/g;
const EN_KEY = /\b(?:en|wrong|right):\s*(?:"((?:[^"\\]|\\.)*)"|'((?:[^'\\]|\\.)*)')/g;

function sentencesIn(file: string): string[] {
  const src = readFileSync(file, "utf8");
  const out: string[] = [];
  for (const re of [EN_ATTR, EN_KEY]) for (const m of src.matchAll(re)) out.push((m[1] ?? m[2]).replace(/\\(["'])/g, "$1"));
  // 진짜 동사 찾기 표기(*동사*, ~변장|이름~)가 있는 문장만 벗긴다
  return out.map((x) => (x.includes("*") ? stripHunt(x) : x));
}

// 공개된 단원과 연결된 그림만 검사한다. 쓰는 중인 초안은 tests/draft.test.ts로 따로 검사한다.
const readyMdx = readyUnits().map((r) => join(ROOT, "content", "lessons", r.chapter.slug, `${r.unit.slug}.mdx`));
const linkedIllustrations = [
  join(ROOT, "components", "illustrations", "index.tsx"),
  ...[...readFileSync(join(ROOT, "components", "illustrations", "index.tsx"), "utf8").matchAll(/export \* from "\.\/([^"]+)"/g)].map((m) =>
    join(ROOT, "components", "illustrations", `${m[1]}.tsx`),
  ),
];
const sources = [...readyMdx, ...linkedIllustrations, join(ROOT, "app", "page.tsx")];

describe("모든 예문의 단어에 뜻이 있다", () => {
  it("단원·그림·홈 화면", () => {
    const missing: string[] = [];
    for (const f of sources)
      for (const s of sentencesIn(f)) {
        const m = missingWords(s);
        if (m.length) missing.push(`${relative(ROOT, f)}: ${m.join(", ")}  ←  "${s}"`);
      }
    expect(missing, `뜻이 없는 단어가 있어요. content/lexicon/words.json에 추가하세요.\n${missing.join("\n")}`).toEqual([]);
  });

  it("용어 사전 예문", () => {
    const missing = terms.flatMap((t) => (t.example ? missingWords(t.example).map((w) => `${t.id}: ${w}`) : []));
    expect(missing).toEqual([]);
  });
});

describe("단원 파일", () => {
  it("준비된 단원마다 MDX 파일이 있다", () => {
    const missing = readyUnits()
      .map((r) => join("content", "lessons", r.chapter.slug, `${r.unit.slug}.mdx`))
      .filter((p) => {
        try {
          return !statSync(join(ROOT, p)).isFile();
        } catch {
          return true;
        }
      });
    expect(missing).toEqual([]);
  });

  it("용어 뜻풀이 카드의 id가 용어 사전에 있다", () => {
    const bad: string[] = [];
    for (const f of readyMdx)
      for (const m of readFileSync(f, "utf8").matchAll(/<TermAnatomy id="([^"]+)"/g))
        if (!termById(m[1])) bad.push(`${relative(ROOT, f)}: ${m[1]}`);
    expect(bad).toEqual([]);
  });

  it("확인 문제 정답 번호가 보기 안에 있다", () => {
    const bad: string[] = [];
    for (const f of readyMdx) {
      const src = readFileSync(f, "utf8");
      for (const m of src.matchAll(/options:\s*\[([^\]]*)\][\s\S]*?answer:\s*(\d+)/g)) {
        const count = (m[1].match(/"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/g) ?? []).length;
        if (Number(m[2]) >= count) bad.push(`${relative(ROOT, f)}: answer ${m[2]} / 보기 ${count}개`);
      }
    }
    expect(bad).toEqual([]);
  });
});
