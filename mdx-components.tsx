import type { MDXComponents } from "mdx/types";
import React, { type ComponentPropsWithoutRef } from "react";
import {
  DeepDive,
  E,
  ExamPoint,
  Ex,
  Examples,
  Figure,
  KeyIdea,
  Mistake,
  Summary,
  Tip,
} from "@/components/lesson/blocks";
import { TermAnatomy } from "@/components/lesson/TermAnatomy";
import { Quiz } from "@/components/lesson/Quiz";
import { Pick } from "@/components/lesson/Pick";
import { Compare, Formula, Steps } from "@/components/lesson/visuals";
import { VerbHunt } from "@/components/lesson/VerbHunt";
import * as illustrations from "@/components/illustrations";
import { chunkNodes } from "@/components/text/Phrases";
import { headingId } from "@/lib/slug";

/** 소제목 글에서 id를 만든다(검색 결과에서 바로 그 자리로 가기 위해). 문자열이 아닌 자식은 건너뛴다 */
function idOf(children: React.ReactNode): string | undefined {
  const text = React.Children.toArray(children)
    .map((c) => (typeof c === "string" || typeof c === "number" ? String(c) : ""))
    .join("")
    .trim();
  return text ? headingId(text) : undefined;
}
import { Easy, Lv, More } from "@/components/level/Lv";
import { Voice, Voices } from "@/components/level/Voices";

// 단원 MDX에서 import 없이 바로 쓸 수 있는 컴포넌트들
const components = {
  // 글이 흐르는 상자: 문자열 자식을 의미 단위 조각으로 바꿔, 줄이 바뀔 때 구/절 사이에서 바뀌게 한다
  p: ({ children, ...rest }: ComponentPropsWithoutRef<"p">) => <p {...rest}>{chunkNodes(children)}</p>,
  li: ({ children, ...rest }: ComponentPropsWithoutRef<"li">) => <li {...rest}>{chunkNodes(children)}</li>,
  h2: ({ children, ...rest }: ComponentPropsWithoutRef<"h2">) => (
    <h2 id={idOf(children)} className="scroll-mt-24" {...rest}>
      {chunkNodes(children)}
    </h2>
  ),
  h3: ({ children, ...rest }: ComponentPropsWithoutRef<"h3">) => (
    <h3 id={idOf(children)} className="scroll-mt-24" {...rest}>
      {chunkNodes(children)}
    </h3>
  ),
  td: ({ children, ...rest }: ComponentPropsWithoutRef<"td">) => <td {...rest}>{chunkNodes(children)}</td>,
  table: (props: ComponentPropsWithoutRef<"table">) => (
    <div className="table-wrap">
      <table {...props} />
    </div>
  ),
  DeepDive,
  E,
  ExamPoint,
  Ex,
  Examples,
  Figure,
  KeyIdea,
  Mistake,
  Summary,
  Tip,
  TermAnatomy,
  Quiz,
  Pick,
  Formula,
  Compare,
  Steps,
  VerbHunt,
  Lv,
  Easy,
  More,
  Voices,
  Voice,
  ...illustrations,
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}
