import { faq } from "@/content/faq";
import { plain, tokenize } from "@/lib/lexicon";
import type { FaqPayload, Seg } from "@/lib/tutor/types";

// 빌드할 때 한 번 만들어 두는 정적 파일. 질문 도우미를 열 때만 내려받는다.
export const dynamic = "force-static";

function toSegs(en: string): Seg[] {
  return tokenize(en).map((s): Seg => {
    const h = s.hl ? (1 as const) : undefined;
    if (s.kind === "text") return h ? { t: s.text, h } : { t: s.text };
    if (!s.gloss) return { t: s.text, x: 1, ...(h && { h }) };
    const g = s.gloss;
    return {
      t: s.text,
      g: { l: g.lemma, p: g.pos, m: g.meaning, ...(g.note && { n: g.note }), ...(g.alts && { a: g.alts.join("|") }) },
      ...(h && { h }),
    };
  });
}

export function GET() {
  const items: FaqPayload[] = faq.map((f) => ({
    ...f,
    ex: f.ex?.map((e) => ({ segs: toSegs(e.en), plain: plain(e.en), ko: e.ko })),
  }));
  return Response.json({ items });
}
