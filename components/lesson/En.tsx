import { Fragment, type ReactNode } from "react";
import { tokenize, type Segment } from "@/lib/lexicon";

function WordButton({ seg }: { seg: Extract<Segment, { kind: "word" }> }) {
  const g = seg.gloss;
  if (!g) {
    if (process.env.NODE_ENV !== "production") console.warn(`[lexicon] 뜻 없음: "${seg.text}"`);
    return (
      <button type="button" className="w" data-w={seg.text} data-missing="1">
        {seg.text}
      </button>
    );
  }
  return (
    <button
      type="button"
      className="w"
      aria-haspopup="dialog"
      aria-expanded="false"
      data-w={g.surface}
      data-l={g.lemma}
      data-p={g.pos}
      data-m={g.meaning}
      data-n={g.note}
      data-a={g.alts?.join("|")}
    >
      {seg.text}
    </button>
  );
}

/**
 * 영어 문장을 단어마다 눌러 볼 수 있게 그린다.
 * 문장 문법은 lib/lexicon.ts의 tokenize 참고: [[형광]], {묶음}, {단어|품사:뜻}
 */
export function En({ en, className = "" }: { en: string; className?: string }) {
  const segs = tokenize(en);
  // 형광 표시 구간은 하나의 span으로 묶는다.
  const groups: { hl: boolean; items: Segment[] }[] = [];
  for (const s of segs) {
    const last = groups[groups.length - 1];
    if (last && last.hl === s.hl) last.items.push(s);
    else groups.push({ hl: s.hl, items: [s] });
  }
  const render = (items: Segment[]): ReactNode =>
    items.map((s, i) => (
      <Fragment key={i}>{s.kind === "text" ? s.text : <WordButton seg={s} />}</Fragment>
    ));
  return (
    <span lang="en" className={className}>
      {groups.map((g, i) =>
        g.hl ? (
          <span key={i} className="marker">
            {render(g.items)}
          </span>
        ) : (
          <Fragment key={i}>{render(g.items)}</Fragment>
        ),
      )}
    </span>
  );
}
