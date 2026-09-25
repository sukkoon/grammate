import { Children, Fragment, isValidElement, type ReactNode } from "react";
import { splitPhrases } from "@/lib/phrases";

/** 의미 단위 하나. 덩어리째 다음 줄로 내려가고, 덩어리가 줄보다 길 때만 안에서 접힌다. */
function Chunk({ children }: { children: string }) {
  return <span className="inline-block">{children}</span>;
}

/** 문자열을 의미 단위 조각으로 바꾼다. 조각 사이에는 보통 띄어쓰기를 둔다. */
export function phrasesOf(text: string, keyPrefix = ""): ReactNode[] {
  const parts = splitPhrases(text);
  const nodes: ReactNode[] = [];
  parts.forEach((p, i) => {
    if (i) nodes.push(" ");
    nodes.push(<Chunk key={`${keyPrefix}${i}`}>{p}</Chunk>);
  });
  return nodes;
}

/**
 * React 자식 중 문자열만 의미 단위 조각으로 바꾼다. <strong>, 링크 같은 요소는 그대로 둔다.
 * 문단(p)·목록(li)·제목처럼 글이 흐르는 상자 안에서 쓴다.
 */
export function chunkNodes(children: ReactNode): ReactNode {
  return Children.map(children, (child, i) => {
    if (typeof child === "string") {
      // 앞뒤 공백은 요소 사이 띄어쓰기이므로 살린다
      const lead = /^\s/.test(child) ? " " : "";
      const trail = /\s$/.test(child) ? " " : "";
      if (!child.trim()) return child;
      return (
        <Fragment key={i}>
          {lead}
          {phrasesOf(child, `${i}-`)}
          {trail}
        </Fragment>
      );
    }
    if (typeof child === "number") return String(child);
    if (isValidElement(child) && child.type === Fragment) {
      const props = child.props as { children?: ReactNode };
      return <Fragment key={i}>{chunkNodes(props.children)}</Fragment>;
    }
    return child;
  });
}

/**
 * 문자열을 의미 단위로 줄바꿈되게 그린다.
 * - text에 줄바꿈(\n)이 있으면 줄마다 한 덩어리 묶음(block)으로 그린다: 넓은 화면에서는 한 줄에 한 문장,
 *   좁은 화면에서는 그 문장이 의미 단위로 접힌다.
 */
export function Phrases({ text, className }: { text: string; className?: string }) {
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);
  if (lines.length <= 1) return <span className={className}>{phrasesOf(lines[0] ?? "")}</span>;
  return (
    <>
      {lines.map((l, i) => (
        <span key={i} className={`block ${className ?? ""}`}>
          {phrasesOf(l, `${i}-`)}
        </span>
      ))}
    </>
  );
}
