import { FILLERS, SIGNALS, SYNONYMS } from "./synonyms";

/**
 * 질문 은행 검색 (브라우저 안에서 동작, 서버 비용 없음)
 * - 한국어 조사 때문에 낱말이 어긋나지 않도록 글자 2개씩 잘라 비교한다. "동명사가" ≈ "동명사"
 * - 자주 나오는 조각보다 드문 조각에 점수를 더 준다 (idf)
 * - 핵심 낱말이 들어 있으면 가산점, 지금 보는 단원의 질문이면 가산점
 */

export interface Searchable {
  id: string;
  unit: string;
  q: string;
  alts: string[];
  keys: string[];
}

export function normalize(text: string): string {
  const raw = ` ${text.toLowerCase().replace(/[’‘]/g, "'")} `;
  const extra: string[] = [];
  for (const [from, to] of SYNONYMS) if (raw.includes(from.toLowerCase())) extra.push(to.toLowerCase());
  let t = `${raw} ${extra.join(" ")} `;
  t = t.replace(/[?!.,~"“”()[\]{}]/g, " ");
  // "a랑", "to부정사"처럼 붙은 영어와 한글을 떼어 놓는다
  t = t.replace(/([a-z'])([가-힣])/g, "$1 $2").replace(/([가-힣])([a-z])/g, "$1 $2");
  for (const f of FILLERS) t = t.replace(new RegExp(`(^|\\s)${f}(?=\\s)`, "g"), " ");
  return t.replace(/\s+/g, " ").trim();
}

/** 글자 2개 조각. 공백으로 나뉜 낱말마다 자른다. 한 글자 낱말(a, 격 등)은 그대로 넣는다. */
export function grams(text: string): Set<string> {
  const out = new Set<string>();
  for (const w of normalize(text).split(" ")) {
    if (!w) continue;
    if (w.length === 1) out.add(`#${w}`);
    for (let i = 0; i < w.length - 1; i++) out.add(w.slice(i, i + 2));
  }
  return out;
}

export interface Index<T extends Searchable> {
  docs: { item: T; grams: Set<string>; keys: string[] }[];
  idf: Map<string, number>;
}

export function buildIndex<T extends Searchable>(items: T[]): Index<T> {
  const docs = items.map((item) => ({
    item,
    grams: grams([item.q, ...item.alts, ...item.keys].join(" ")),
    keys: item.keys.map((k) => normalize(k)),
  }));
  const df = new Map<string, number>();
  for (const d of docs) for (const g of d.grams) df.set(g, (df.get(g) ?? 0) + 1);
  const n = docs.length;
  const idf = new Map<string, number>();
  for (const [g, c] of df) idf.set(g, Math.log(1 + n / c));
  return { docs, idf };
}

/** 영어 낱말(a, an, the…)은 독립된 낱말로만, 한국어는 조사가 붙어도 되게 찾는다 */
function hasKey(nq: string, k: string): boolean {
  if (/^[a-z' ]+$/.test(k)) return ` ${nq} `.includes(` ${k} `);
  return nq.includes(k);
}

export interface Hit<T> {
  item: T;
  score: number;
}

export function search<T extends Searchable>(
  index: Index<T>,
  query: string,
  opts: { unit?: string; limit?: number } = {},
): Hit<T>[] {
  const qg = grams(query);
  const nq = normalize(query);
  if (qg.size === 0) return [];
  let qWeight = 0;
  for (const g of qg) qWeight += index.idf.get(g) ?? 0.5;
  const chapter = opts.unit?.split("/")[0];
  const hits: Hit<T>[] = [];
  for (const d of index.docs) {
    let shared = 0;
    for (const g of qg) if (d.grams.has(g)) shared += index.idf.get(g) ?? 0;
    if (shared === 0) continue;
    let score = shared / (qWeight + 1e-6);
    for (const k of d.keys) if (k && hasKey(nq, k)) score += 0.18;
    if (opts.unit && d.item.unit === opts.unit) score *= 1.25;
    else if (chapter && d.item.unit.startsWith(`${chapter}/`)) score *= 1.1;
    hits.push({ item: d.item, score });
  }
  hits.sort((a, b) => b.score - a.score);
  return hits.slice(0, opts.limit ?? 3);
}

/** 이 점수보다 낮으면 '맞는 답이 없다'고 본다 */
export const MIN_SCORE = 0.45;

/** 질문에 영어 낱말이나 문법·공부 이야기가 들어 있는지 */
export function hasSignal(query: string): boolean {
  const nq = normalize(query);
  return /[a-z]/.test(nq) || SIGNALS.some((s) => nq.includes(s));
}

/** 가장 좋은 답을 보여 줘도 될 만큼 확실한지 */
export function isConfident(query: string, top: { score: number } | undefined): boolean {
  if (!top || top.score < MIN_SCORE) return false;
  return hasSignal(query) || top.score >= 1.3;
}
