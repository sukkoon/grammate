/**
 * '진짜 동사 찾기' 문장 표기법
 *   *want*            진짜 동사
 *   ~to eat|to부정사~  변장한 동사(준동사)와 변장 이름
 * 예) "I *want* ~to eat|to부정사~ pizza."
 */

export type HuntToken =
  | { kind: "word"; text: string; role: "verb" | "verbal" | "plain"; disguise?: string }
  | { kind: "text"; text: string };

const HUNT = /\*([^*]+)\*|~([^~|]+)\|([^~]+)~|([A-Za-z]+(?:['’][A-Za-z]+|-[A-Za-z]+)*)|([^A-Za-z*~]+)/g;

export function parseHunt(en: string): HuntToken[] {
  const out: HuntToken[] = [];
  for (const m of en.matchAll(HUNT)) {
    const [, verb, verbal, disguise, word, other] = m;
    if (verb) out.push({ kind: "word", text: verb.trim(), role: "verb" });
    else if (verbal) out.push({ kind: "word", text: verbal.trim(), role: "verbal", disguise: disguise.trim() });
    else if (word) out.push({ kind: "word", text: word, role: "plain" });
    else if (other) out.push({ kind: "text", text: other });
  }
  return out;
}

/** 단어 뜻 표시용 순수 문장 */
export function stripHunt(en: string): string {
  return en.replace(/\*([^*]+)\*/g, "$1").replace(/~([^~|]+)\|[^~]+~/g, "$1");
}
