import type { Level } from "@/content/curriculum";
import { bandLabel, minBand } from "@/lib/level";

/** 목차의 단원 옆에 붙는 표시: 내 수준보다 높은 단원이면 '중등 과정'처럼 보인다 (CSS로 켜고 끈다) */
export function LevelAbove({ levels }: { levels: Level[] }) {
  const need = minBand(levels);
  if (need === "elem") return null;
  return (
    <span data-need={need} className="lv-above shrink-0 rounded-lg bg-sky-soft px-2 py-0.5 text-[11.5px] font-extrabold text-sky-ink">
      {bandLabel[need]} 과정
    </span>
  );
}
