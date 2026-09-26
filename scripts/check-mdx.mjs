// MDX 문법 검사: 개발 서버 없이 단원 파일이 컴파일되는지 본다 (next.config.ts와 같은 remark 설정).
//   node scripts/check-mdx.mjs content/lessons/suneung/practice.mdx [다른 파일 …]
import { readFileSync } from "node:fs";
import { compile } from "@mdx-js/mdx";
import remarkGfm from "remark-gfm";

let bad = 0;
for (const file of process.argv.slice(2)) {
  try {
    await compile(readFileSync(file, "utf8"), { remarkPlugins: [[remarkGfm, { singleTilde: false }]] });
    console.log(`ok   ${file}`);
  } catch (e) {
    bad++;
    console.log(`FAIL ${file}: ${e.message}${e.line ? ` (줄 ${e.line})` : ""}`);
  }
}
process.exit(bad ? 1 : 0);
