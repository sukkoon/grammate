import { Fragment } from "react";
import type { Seg } from "@/lib/tutor/types";

/** 서버에서 미리 나눈 예문 조각을 단어 버튼으로 그린다. 단어 풍선(WordTooltipLayer)이 그대로 동작한다. */
export function SegText({ segs }: { segs: Seg[] }) {
  return (
    <span lang="en">
      {segs.map((s, i) => {
        const inner = s.g ? (
          <button
            type="button"
            className="w"
            aria-haspopup="dialog"
            aria-expanded="false"
            data-w={s.t}
            data-l={s.g.l}
            data-p={s.g.p}
            data-m={s.g.m}
            data-n={s.g.n}
            data-a={s.g.a}
          >
            {s.t}
          </button>
        ) : s.x ? (
          <button type="button" className="w" data-w={s.t} data-missing="1">
            {s.t}
          </button>
        ) : (
          s.t
        );
        return s.h ? (
          <span key={i} className="marker">
            {inner}
          </span>
        ) : (
          <Fragment key={i}>{inner}</Fragment>
        );
      })}
    </span>
  );
}

/** 답변 글의 **굵게** 표시만 살려서 그린다 */
export function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split("\n").map((para, i) => (
        <p key={i} className="my-1.5">
          {para.split(/(\*\*[^*]+\*\*)/g).map((part, j) =>
            part.startsWith("**") && part.endsWith("**") ? <b key={j}>{part.slice(2, -2)}</b> : <Fragment key={j}>{part}</Fragment>,
          )}
        </p>
      ))}
    </>
  );
}
