import { NextResponse } from "next/server";
import { lookup, lookupPhrase, searchWords } from "@/lib/lexicon";

/**
 * 사전 검색: 그래머랑 사전(content/lexicon)에서 찾는다. 사전 파일은 서버에만 두고, 화면에는 찾은 결과만 보낸다.
 *   GET /api/dict?q=went → { exact: go의 과거형 뜻, more: 비슷한 표제어 }
 *   GET /api/dict?q=사과 → { exact: null, more: [apple …] }
 * 더 자세한 뜻은 화면에서 네이버 영한사전으로 이어 준다(네이버는 공개 사전 API가 없어 링크로만 연결한다).
 */
export const runtime = "nodejs";

export async function GET(request: Request) {
  const q = (new URL(request.url).searchParams.get("q") ?? "").trim().slice(0, 60);
  if (!q) return NextResponse.json({ q, exact: null, more: [] });
  const english = /^[A-Za-z][A-Za-z'’ -]*$/.test(q);
  const exact = english ? (/\s/.test(q) ? lookupPhrase(q) : lookup(q)) : null;
  const more = searchWords(q, 12).filter((h) => h.lemma !== exact?.lemma);
  return NextResponse.json({ q, exact, more }, { headers: { "Cache-Control": "public, max-age=3600" } });
}
