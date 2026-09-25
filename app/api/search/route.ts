import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { NextResponse } from "next/server";
import { readyUnits, unitHref } from "@/content/curriculum";
import { terms } from "@/content/terms";
import { headingId } from "@/lib/slug";

/**
 * 검색 색인: 단원, 단원 안의 소제목, 문법 용어, 질문 은행을 한 목록으로.
 * 처음 한 번 만들어 메모리에 두고, 화면에서는 이 목록을 받아 글자를 칠 때마다 바로 거른다.
 */
export const runtime = "nodejs";

export interface SearchItem {
  t: "unit" | "section" | "term" | "faq";
  title: string;
  sub: string;
  href: string;
  tag: string;
  /** 제목·설명 말고도 같이 찾아볼 말(질문의 다른 표현, 핵심 낱말) */
  keys?: string;
}

const ROOT = process.cwd();

/** 마크다운·MDX 기호를 걷어 낸 보통 글 */
function plain(s: string): string {
  return s
    .replace(/<[^>]+>/g, " ")
    .replace(/\*\*|__|`/g, "")
    .replace(/&lsquo;|&rsquo;/g, "'")
    .replace(/&ldquo;|&rdquo;/g, '"')
    .replace(/\[\[|\]\]/g, "")
    .replace(/\{([^|}]+)\|[^}]*\}/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

function unitSections(chapter: string, unit: string, unitTitle: string): SearchItem[] {
  let src = "";
  try {
    src = readFileSync(join(ROOT, "content", "lessons", chapter, `${unit}.mdx`), "utf8");
  } catch {
    return [];
  }
  const lines = src.split(/\r?\n/);
  const out: SearchItem[] = [];
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^##+\s+(.+)$/);
    if (!m) continue;
    const title = plain(m[1]);
    // 소제목 아래 첫 보통 문단을 설명으로
    let sub = "";
    for (let j = i + 1; j < lines.length && j < i + 25; j++) {
      const l = lines[j].trim();
      if (!l || l.startsWith("<") || l.startsWith("|") || l.startsWith("#") || l.startsWith("-") || l.startsWith("{")) continue;
      sub = plain(l).slice(0, 140);
      break;
    }
    out.push({ t: "section", title, sub, href: `${unitHref(chapter, unit)}#${headingId(title)}`, tag: unitTitle });
  }
  return out;
}

function faqItems(): SearchItem[] {
  const dir = join(ROOT, "content", "faq");
  const out: SearchItem[] = [];
  let files: string[] = [];
  try {
    files = readdirSync(dir).filter((f) => f.endsWith(".json"));
  } catch {
    return out;
  }
  for (const f of files) {
    try {
      const rows = JSON.parse(readFileSync(join(dir, f), "utf8")) as { unit: string; q: string; alts?: string[]; keys?: string[]; a: string }[];
      for (const r of rows) {
        out.push({
          t: "faq",
          title: r.q,
          sub: plain(r.a.split("\n")[0]).slice(0, 140),
          href: `/learn/${r.unit}`,
          tag: "질문",
          keys: [...(r.alts ?? []), ...(r.keys ?? [])].join(" "),
        });
      }
    } catch {}
  }
  return out;
}

let cache: SearchItem[] | null = null;

function build(): SearchItem[] {
  const items: SearchItem[] = [];
  for (const r of readyUnits()) {
    items.push({
      t: "unit",
      title: r.unit.title,
      sub: r.unit.summary,
      href: unitHref(r.chapter.slug, r.unit.slug),
      tag: `${r.part.label} ${r.chapter.title}`,
      keys: r.chapter.hook,
    });
    items.push(...unitSections(r.chapter.slug, r.unit.slug, r.unit.title));
  }
  for (const t of terms) {
    items.push({
      t: "term",
      title: t.term,
      sub: t.result,
      href: t.href ?? `/terms#${t.id}`,
      tag: `용어 · ${t.group}`,
      keys: [t.english, ...t.parts.map((p) => `${p.c} ${p.m}`)].join(" "),
    });
  }
  items.push(...faqItems());
  return items;
}

export async function GET() {
  if (!cache || process.env.NODE_ENV !== "production") cache = build();
  return NextResponse.json(
    { items: cache },
    { headers: { "Cache-Control": "public, max-age=600, s-maxage=3600, stale-while-revalidate=86400" } },
  );
}
