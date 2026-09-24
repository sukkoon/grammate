import type { Metadata } from "next";
import { Mate } from "@/components/brand/Mate";
import { MyStudy } from "@/components/me/MyStudy";
import { allUnits } from "@/content/curriculum";

export const metadata: Metadata = {
  title: "내 공부",
  robots: { index: false },
};

export default function MePage() {
  // 단원 이름표를 클라이언트로 넘긴다.
  const units = Object.fromEntries(
    allUnits().map((r) => [`${r.chapter.slug}/${r.unit.slug}`, { title: r.unit.title, chapter: r.chapter.title }]),
  );
  return (
    <div className="mx-auto max-w-4xl px-4 pb-10 pt-10 sm:px-6">
      <h1 className="text-[2rem] font-extrabold tracking-[-0.02em]">내 공부</h1>
      <div className="mt-4 flex gap-3 rounded-2xl bg-card px-4 py-4 ring-1 ring-line sm:px-5">
        <Mate mood="happy" size={40} className="shrink-0 text-ink" />
        <p className="text-[15px] text-ink-2">
          이 기록은 <b className="text-ink">나만 볼 수 있어요.</b> 순위도 없고, 누구와도 비교하지 않아요. 점수보다 &lsquo;어디서
          헷갈렸는지&rsquo;가 중요해요. 오늘의 나는 어제의 나보다 한 걸음만 더 가면 돼요.
        </p>
      </div>
      <MyStudy units={units} />
    </div>
  );
}
