import words from "@/content/lexicon/words.json";
import forms from "@/content/lexicon/forms.json";

/**
 * 사전 항목: [품사, 대표 뜻, ...다른 뜻("품사: 뜻")]
 * 예) "like": ["동사", "좋아하다", "전치사: ~처럼, ~같이"]
 */
type Entry = string[];
const WORDS = words as Record<string, Entry>;
/** 불규칙 변화형: "went": ["go", "과거형"] */
const FORMS = forms as unknown as Record<string, [string, string]>;

export interface Gloss {
  /** 문장에 쓰인 모양 그대로 */
  surface: string;
  /** 사전에서 찾은 표제어 */
  lemma: string;
  pos: string;
  meaning: string;
  /** 변화형 설명 (예: "go의 과거형") */
  note?: string;
  alts?: string[];
}

export type Segment =
  | { kind: "text"; text: string; hl: boolean }
  | { kind: "word"; text: string; gloss: Gloss | null; hl: boolean };

const norm = (s: string) => s.replace(/[’‘]/g, "'");

function fromEntry(surface: string, lemma: string, e: Entry, note?: string): Gloss {
  const [pos, meaning, ...alts] = e;
  return { surface, lemma, pos, meaning, note, alts: alts.length ? alts : undefined };
}

function get(key: string): Entry | undefined {
  return Object.prototype.hasOwnProperty.call(WORDS, key) ? WORDS[key] : undefined;
}

const hasPos = (e: Entry, p: string) => e[0].includes(p);

/** 규칙 변화(-s, -ed, -ing, -er, -est)를 되돌려 원형 후보를 만든다. */
function regularCandidates(w: string): { base: string; kind: "s" | "ed" | "ing" | "er" | "est" }[] {
  const out: { base: string; kind: "s" | "ed" | "ing" | "er" | "est" }[] = [];
  const add = (base: string, kind: (typeof out)[number]["kind"]) => base.length > 1 && out.push({ base, kind });
  const undouble = (s: string) => (/([bdgklmnprt])\1$/.test(s) ? s.slice(0, -1) : null);
  if (w.endsWith("ies")) add(w.slice(0, -3) + "y", "s");
  if (w.endsWith("es")) add(w.slice(0, -2), "s");
  if (w.endsWith("s") && !w.endsWith("ss")) add(w.slice(0, -1), "s");
  if (w.endsWith("ied")) add(w.slice(0, -3) + "y", "ed");
  if (w.endsWith("ed")) {
    const b = w.slice(0, -2);
    add(b, "ed");
    add(w.slice(0, -1), "ed");
    const u = undouble(b);
    if (u) add(u, "ed");
  }
  if (w.endsWith("ing")) {
    const b = w.slice(0, -3);
    add(b, "ing");
    add(b + "e", "ing");
    const u = undouble(b);
    if (u) add(u, "ing");
    if (b.endsWith("y")) add(b.slice(0, -1) + "ie", "ing");
  }
  if (w.endsWith("iest")) add(w.slice(0, -4) + "y", "est");
  if (w.endsWith("est")) {
    const b = w.slice(0, -3);
    add(b, "est");
    add(b + "e", "est");
    const u = undouble(b);
    if (u) add(u, "est");
  }
  if (w.endsWith("ier")) add(w.slice(0, -3) + "y", "er");
  if (w.endsWith("er")) {
    const b = w.slice(0, -2);
    add(b, "er");
    add(b + "e", "er");
    const u = undouble(b);
    if (u) add(u, "er");
  }
  return out;
}

function noteFor(kind: "s" | "ed" | "ing" | "er" | "est", lemma: string, e: Entry): string | null {
  switch (kind) {
    case "s":
      if (hasPos(e, "명사")) return `${lemma}의 복수형`;
      if (hasPos(e, "동사")) return `${lemma}의 3인칭 단수형`;
      return null;
    case "ed":
      return hasPos(e, "동사") ? `${lemma}의 과거형` : null;
    case "ing":
      return hasPos(e, "동사") ? `${lemma}의 -ing형` : null;
    case "er":
      return hasPos(e, "형용사") || hasPos(e, "부사") ? `${lemma}의 비교급` : null;
    case "est":
      return hasPos(e, "형용사") || hasPos(e, "부사") ? `${lemma}의 최상급` : null;
  }
}

/** 단어 하나의 뜻을 찾는다. 문장 첫 단어는 소문자 뜻을 먼저 본다(May I …의 may). */
export function lookup(raw: string, sentenceStart = false): Gloss | null {
  const surface = norm(raw);
  const lower = surface.toLowerCase();
  const order = sentenceStart ? [lower, surface] : [surface, lower];
  for (const k of order) {
    const e = get(k);
    if (e) return fromEntry(surface, k, e);
  }
  for (const k of order) {
    const f = Object.prototype.hasOwnProperty.call(FORMS, k) ? FORMS[k] : undefined;
    if (f) {
      const e = get(f[0]);
      if (e) return fromEntry(surface, f[0], e, `${f[0]}의 ${f[1]}`);
    }
  }
  // 소유격 's: Minsu's → 민수의
  const poss = surface.match(/^(.+)'s$/);
  if (poss) {
    const base = lookup(poss[1], sentenceStart);
    if (base) return { ...base, surface, meaning: `${base.meaning}의`, note: "'s: ~의 (소유격)", alts: undefined };
  }
  for (const { base, kind } of regularCandidates(lower)) {
    const e = get(base);
    if (!e) continue;
    const note = noteFor(kind, base, e);
    if (note) return fromEntry(surface, base, e, note);
  }
  return null;
}

/** 여러 단어 묶음(구동사, 숙어) 찾기 */
export function lookupPhrase(raw: string): Gloss | null {
  const surface = norm(raw).trim();
  const e = get(surface.toLowerCase()) ?? get(surface);
  if (e) return fromEntry(surface, surface.toLowerCase(), e);
  // 첫 단어만 변화한 경우: looked after → look after
  const [head, ...rest] = surface.toLowerCase().split(/\s+/);
  const h = lookup(head);
  if (h) {
    const e2 = get([h.lemma, ...rest].join(" "));
    if (e2) return fromEntry(surface, [h.lemma, ...rest].join(" "), e2, h.note?.replace(h.lemma, [h.lemma, ...rest].join(" ")));
  }
  return null;
}

const TOKEN =
  /\[\[|\]\]|\{([^{}|]+)(?:\|([^{}]*))?\}|([A-Za-z]+(?:['’][A-Za-z]+|-[A-Za-z]+)*)|([^A-Za-z[\]{}]+|[[\]{}])/g;

/**
 * 예문 문자열을 조각으로 나눈다.
 * - [[ ... ]] : 목표 구문 형광 표시
 * - {look after} : 여러 단어를 한 뜻으로 묶기
 * - {like|전치사:~처럼} : 이 문장에서의 뜻으로 덮어쓰기
 */
export function tokenize(en: string): Segment[] {
  const out: Segment[] = [];
  let hl = false;
  let start = true;
  const pushText = (text: string) => {
    const last = out[out.length - 1];
    if (last && last.kind === "text" && last.hl === hl) last.text += text;
    else out.push({ kind: "text", text, hl });
  };
  for (const m of en.matchAll(TOKEN)) {
    const [tok, groupText, override, word, other] = m;
    if (tok === "[[") {
      hl = true;
      continue;
    }
    if (tok === "]]") {
      hl = false;
      continue;
    }
    if (groupText !== undefined) {
      const text = groupText.trim();
      let gloss: Gloss | null;
      if (override !== undefined) {
        const base = /\s/.test(text) ? lookupPhrase(text) : lookup(text, start);
        const o = override.trim();
        // "전치사:~처럼" 처럼 품사를 함께 적었으면 나눈다.
        const withPos = o.match(/^([가-힣·\s]{1,8}):\s*(.+)$/);
        const pos = withPos ? withPos[1].trim() : (base?.pos ?? "");
        const meaning = withPos ? withPos[2].trim() : o;
        gloss = {
          surface: norm(text),
          lemma: base?.lemma ?? norm(text).toLowerCase(),
          pos,
          meaning,
          note: base?.note,
        };
      } else {
        gloss = /\s/.test(text) ? lookupPhrase(text) : lookup(text, start);
      }
      out.push({ kind: "word", text, gloss, hl });
      start = false;
      continue;
    }
    if (word !== undefined) {
      out.push({ kind: "word", text: word, gloss: lookup(word, start), hl });
      start = false;
      continue;
    }
    if (other !== undefined) {
      pushText(other);
      if (/[.!?]\s*$/.test(other) || /^["“]/.test(other.trim())) start = true;
    }
  }
  return out;
}

/** 형광 표시·묶음 기호를 뺀 순수 문장 (발음 듣기용) */
export function plain(en: string): string {
  return en
    .replace(/\[\[|\]\]/g, "")
    .replace(/\{([^{}|]+)(?:\|[^{}]*)?\}/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

/** 뜻을 찾지 못한 단어 목록 (내용 검사용) */
export function missingWords(en: string): string[] {
  return tokenize(en)
    .filter((s): s is Extract<Segment, { kind: "word" }> => s.kind === "word" && !s.gloss)
    .map((s) => s.text);
}

export const naverUrl = (lemma: string) =>
  `https://en.dict.naver.com/#/search?query=${encodeURIComponent(lemma)}`;
