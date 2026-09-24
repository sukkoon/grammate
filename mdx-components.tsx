import type { MDXComponents } from "mdx/types";
import type { ComponentPropsWithoutRef } from "react";
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
import { VerbHunt } from "@/components/lesson/VerbHunt";
import * as illustrations from "@/components/illustrations";

// 단원 MDX에서 import 없이 바로 쓸 수 있는 컴포넌트들
const components = {
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
  VerbHunt,
  ...illustrations,
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}
