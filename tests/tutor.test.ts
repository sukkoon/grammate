import { describe, expect, it } from "vitest";
import { faq } from "@/content/faq";
import { allUnits } from "@/content/curriculum";
import { missingWords } from "@/lib/lexicon";
import { buildIndex, isConfident, normalize, search } from "@/lib/tutor/match";

describe("질문 은행", () => {
  it("id가 겹치지 않는다", () => {
    const ids = faq.map((f) => f.id);
    expect(ids.length).toBe(new Set(ids).size);
  });

  it("unit이 실제 단원이거나 general이다", () => {
    const units = new Set(allUnits().map((r) => `${r.chapter.slug}/${r.unit.slug}`));
    const bad = faq.filter((f) => f.unit !== "general" && !units.has(f.unit)).map((f) => `${f.id}: ${f.unit}`);
    expect(bad).toEqual([]);
  });

  it("예문의 모든 단어에 뜻이 있다", () => {
    const bad = faq.flatMap((f) => (f.ex ?? []).flatMap((e) => missingWords(e.en).map((w) => `${f.id}: ${w} ← ${e.en}`)));
    expect(bad, bad.join("\n")).toEqual([]);
  });
});

describe("normalize", () => {
  it("붙은 영어와 한글을 떼고, 한글로 적힌 영어를 알아듣는다", () => {
    expect(normalize("a랑 an")).toContain("a 랑 an");
    expect(normalize("에이랑 언 차이")).toContain(" a");
    expect(normalize("투부정사가 뭐예요")).toContain("to 부정사");
  });
});

/** 학생이 실제로 말할 법한 두서없는 질문 → 기대하는 답 (여러 개면 그중 하나) */
const CASES: [string, string | string[]][] = [
  ["그 a랑 an 있잖아요 왜 다르게 써요", "aa-1"],
  ["에이랑 언 차이가 뭐예요", "aa-1"],
  ["유니버시티는 유로 시작하는데 왜 에이를 써요", "aa-2"],
  ["아워 앞에 언 쓰는 이유", "aa-2"],
  ["물 앞에 a 붙여도 되나요", "aa-3"],
  ["책 두권인데 a 붙여요?", "aa-4"],
  ["a랑 the 뭐가 달라요", "th-1"],
  ["해 앞에는 왜 the를 붙여요", "th-2"],
  ["피아노 칠때 the 쓰는데 축구는 왜 안써요", "th-3"],
  ["버스 타고 갈 때 by the bus 아니에요?", "na-2"],
  ["go to school에 왜 the가 없어요", ["na-3", "na-1"]],
  ["점심 먹는다 할때 a lunch 해요?", "na-4"],
  ["대명사 대 무슨뜻", "rt-1"],
  ["품사랑 성분 헷갈려요", "rt-2"],
  ["구랑 절이 뭐가 달라요", "rt-3"],
  ["부정관사에서 부정이 부정적이라는 거예요?", "rt-4"],
  ["동사 두개 쓰면 안돼요? I want eat", "ov-1"],
  ["투부정사 동명사 분사 변장이 뭐예요", "ov-2"],
  ["부정사는 왜 부정사라고 해요", "ov-3"],
  ["진짜 동사 어떻게 찾아요", "ov-4"],
  ["can swim 동사 두개 아니에요", "ov-5"],
  ["접속사 있으면 동사 몇 개 써요", "ov-6"],
  ["to 다음에 plays 쓰면 왜 틀려", "ov-7"],
  ["품사가 뭔지 모르겠어요", "pos-1"],
  ["사전에 명 동 이런거 뭐예요", "pos-2"],
  ["형용사랑 부사 차이 알려줘요", "c4-1"],
  ["is 뒤에 cutely 써도 돼요", "c4-2"],
  ["fastly는 왜 없어요", ["c4-3", "wj-2"]],
  ["with I 라고 하면 틀려요?", "hp-1"],
  ["비코즈랑 비코즈 오브 차이", "hp-2"],
  ["like가 좋아하다가 아닌 경우도 있어요", "wj-1"],
  ["라이크 뜻이 처럼일 때", "wj-1"],
  ["패스트가 형용사예요 부사예요", "wj-2"],
  ["아이 마이 미 마인 헷갈려", "pp-1"],
  ["3인칭이 뭔지", "pp-2"],
  ["its랑 it's 차이", "pp-3"],
  ["my랑 mine 뭐가 달라요", "pp-4"],
  ["디스랑 댓 차이", "dt-1"],
  ["날씨 말할 때 it은 뭘 가리켜요", "dt-2"],
  ["마이셀프 언제 써요", "rf-1"],
  ["hisself 왜 안돼요", "rf-2"],
  ["원이랑 잇 차이 새거 하나", "id-1"],
  ["어나더랑 디 아더 차이", "id-2"],
  ["썸이랑 애니 언제 써요", "id-4"],
  ["every 다음에 단수 복수", "id-5"],
  ["어디서부터 공부해요", "gen-1"],
  ["문제 다 틀려서 속상해", "gen-4"],
  ["설명이 너무 어려워요", "gen-3"],
];

describe("두서없는 질문도 알맞은 답을 찾는다", () => {
  const index = buildIndex(faq);
  it("상위 3개 안에 맞는 답이 90% 이상", () => {
    const misses: string[] = [];
    for (const [q, want] of CASES) {
      const wants = Array.isArray(want) ? want : [want];
      const top = search(index, q, { limit: 3 }).map((h) => h.item.id);
      if (!top.some((id) => wants.includes(id))) misses.push(`"${q}" → ${top.join(", ")} (기대: ${wants.join("/")})`);
    }
    const rate = 1 - misses.length / CASES.length;
    const detail = misses.length ? `\n${misses.join("\n")}` : "";
    console.info(`질문 도우미 정확도(상위 3개): ${Math.round(rate * 100)}% (${CASES.length - misses.length}/${CASES.length})${detail}`);
    expect(rate, `놓친 질문:\n${misses.join("\n")}`).toBeGreaterThanOrEqual(0.9);
  });
});

describe("엉뚱한 질문에는 억지 답을 내놓지 않는다", () => {
  const index = buildIndex(faq);
  it("문법과 상관없는 말", () => {
    const off = ["오늘 점심 메뉴 뭐에요", "배고파요", "게임하고 싶어", "너 이름이 뭐야", "내일 날씨 어때", "수학 숙제 알려줘", "엄마가 화났어요", "유튜브 보고 싶다"];
    const wrong = off.filter((q) => isConfident(q, search(index, q, { limit: 1 })[0]));
    expect(wrong).toEqual([]);
  });

  it("문법 질문은 대부분 자신 있게 답한다", () => {
    const shy = CASES.map(([q]) => q).filter((q) => !isConfident(q, search(index, q, { limit: 1 })[0]));
    expect(shy.length, shy.join("\n")).toBeLessThanOrEqual(Math.floor(CASES.length * 0.1));
  });
});
