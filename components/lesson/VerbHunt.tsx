import { parseHunt, stripHunt } from "@/lib/verbhunt";
import { En } from "./En";
import { VerbHuntClient, type HuntRound } from "./VerbHuntClient";

export interface HuntItem {
  /** 표기법은 lib/verbhunt.ts 참고 */
  en: string;
  ko: string;
  /** 다 찾은 뒤 보여 줄 설명 */
  why?: string;
}

/** '진짜 동사 찾기' 게임 */
export function VerbHunt({ items, title = "진짜 동사 찾기" }: { items: HuntItem[]; title?: string }) {
  const rounds: HuntRound[] = items.map((it) => ({
    tokens: parseHunt(it.en),
    ko: it.ko,
    why: it.why,
    enNode: <En en={stripHunt(it.en)} />,
  }));
  return <VerbHuntClient rounds={rounds} title={title} />;
}
