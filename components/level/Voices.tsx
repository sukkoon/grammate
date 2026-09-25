import { Children, isValidElement, type ReactNode } from "react";
import { BANDS, bandRank, type Band } from "@/lib/level";

/**
 * 같은 내용을 수준별로 다른 목소리로 쓴다.
 *
 * <Voices>
 *   <Voice level="elem">초등 목소리: 짧은 문장, 비유, 그림</Voice>
 *   <Voice level="middle">중등 목소리(기본)</Voice>
 *   <Voice level="high">고등 목소리: 정확한 용어, 예외, 시험 관점</Voice>
 * </Voices>
 *
 * - 화면에는 지금 고른 수준의 목소리 하나만 보인다 (globals.css의 [data-voice] 규칙, 수준 전환은 CSS만으로 즉시).
 * - 어떤 수준의 목소리가 없으면 가장 가까운 낮은 수준의 목소리를, 그것도 없으면 가장 가까운 높은 수준의 목소리를 보여 준다.
 */
export function Voice({ children }: { level: Band; children: ReactNode }) {
  return <>{children}</>;
}

function pick(given: Map<Band, ReactNode>, band: Band): ReactNode {
  if (given.has(band)) return given.get(band);
  const r = bandRank(band);
  for (let i = r - 1; i >= 0; i--) if (given.has(BANDS[i])) return given.get(BANDS[i]);
  for (let i = r + 1; i < BANDS.length; i++) if (given.has(BANDS[i])) return given.get(BANDS[i]);
  return null;
}

export function Voices({ children }: { children: ReactNode }) {
  const given = new Map<Band, ReactNode>();
  Children.forEach(children, (c) => {
    if (isValidElement<{ level: Band; children: ReactNode }>(c) && c.type === Voice) given.set(c.props.level, c.props.children);
  });
  return (
    <>
      {BANDS.map((b) => {
        const node = pick(given, b);
        return node == null ? null : (
          <div key={b} data-voice={b}>
            {node}
          </div>
        );
      })}
    </>
  );
}
