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
  // 시제·동사
  ["윌이랑 비고잉투 뭐가 달라", "tn-1"],
  ["현재완료랑 과거 차이를 모르겠어요", "tn-5"],
  ["포랑 신스 언제 써요", "tn-7"],
  ["해브빈투랑 해브곤투 차이", "tn-8"],
  ["주어가 he일 때 동사에 에스 붙이는 거", "vb-8"],
  ["did not 다음에 과거형 써도 돼요", "vb-15"],
  ["아이엠 라이크는 왜 틀려요", "vb-6"],
  // 문장의 종류·성분·형식
  ["웨어 유 리브 이거 왜 틀려요", "st-2"],
  ["감탄문 what이랑 how 뭐 써요", "st-13"],
  ["부가의문문 만드는 법", "st-22"],
  ["데얼 이즈 데얼 아 어떻게 골라요", "st-18"],
  ["목적어랑 보어 구별이 안 돼요", ["se-2", "sp-3"]],
  ["사역동사 다음에 투를 왜 안 써요", "sp-18"],
  ["4형식 5형식 구별하는 법", "sp-5"],
  ["룩 해필리는 왜 틀려", "sp-7"],
  // 비교·수동태·전치사·형용사와 부사
  ["굿 비교급이 구더 아니에요", "cp-3"],
  ["애즈 애즈가 무슨 뜻이에요", "cp-7"],
  ["더 비교급 더 비교급 뜻", "cp-14"],
  ["수동태 만드는 법 알려줘", ["ps-2", "ps-1"]],
  ["해픈은 왜 수동태가 안 돼", "ps-5"],
  ["바이 뒤에 목적격 쓰는 이유", "ps-3"],
  ["메이드 오브랑 메이드 프롬 차이", "ps-19"],
  ["앳 온 인 시간 앞에 헷갈려요", "pr-1"],
  ["바이랑 언틸 차이가 뭐예요", "pr-5"],
  ["비코즈랑 비코즈 오브 차이", "pr-13"],
  ["퓨랑 어퓨 뜻이 달라요", "ad-7"],
  ["올웨이즈 위치가 어디예요", ["ad-12", "ad-13"]],
  ["하들리가 하드의 부사 아니에요", "ad-17"],
  // 조동사
  ["머스트 낫이랑 돈 해브 투 차이", "md-7"],
  ["슈드 해브 피피 뜻", ["md-19", "md-18"]],
  ["서제스트 뒤에 왜 동사원형이 와요", "md-23"],
  ["유즈드 투랑 우드 차이", "md-11"],
  // 준동사
  ["투부정사 용법 세 가지가 뭐예요", "ti-1"],
  ["잇 이즈 펀 투에서 잇은 뭐야", "ti-3"],
  ["too to 구문 뜻이 뭐예요", "ti-12"],
  ["의미상 주어 포랑 오브 구별", "ti-18"],
  ["투 해브 피피 언제 써요", "ti-19"],
  ["하우 투가 무슨 뜻이에요", "ti-15"],
  ["인조이 다음에 투를 못 쓰는 이유", "gd-6"],
  ["리멤버 ing랑 리멤버 투 차이", "gd-8"],
  ["룩 포워드 투 다음에 왜 ing", ["gd-14", "vr-6"]],
  ["인터레스팅이랑 인터레스티드 차이", "pt-6"],
  ["현재분사 과거분사 고르는 법", ["pt-2", "vr-3"]],
  ["분사구문 만드는 방법", "pcc-2"],
  ["동사랑 준동사를 어떻게 구별해", "vr-1"],
  ["주격 관계대명사도 생략 돼요", "vr-5"],
  // 접속사·관계사
  ["웨더랑 이프 똑같은 거예요", "cj-9"],
  ["두 유 노우 웨어 더즈 히 리브 왜 틀려", "cj-7"],
  ["언리스가 이프 낫이랑 같아요", "cj-13"],
  ["쏘 댓이랑 쏘 형용사 댓 구별", "cj-15"],
  ["상관접속사가 뭐예요", "cj-19"],
  ["관계대명사가 뭐야", "rl-1"],
  ["후 위치 댓 어떻게 골라요", "rl-2"],
  ["왓이랑 댓 관계대명사 구별", ["rl-8", "sn-5"]],
  ["더 웨이 하우 왜 안 돼요", "rl-14"],
  ["쉼표 뒤에 댓 쓰면 안 돼요", "rl-18"],
  ["관계부사가 뭐예요", "rl-12"],
  // 가정법·일치·화법·특수구문
  ["가정법이 뭐예요", "sj-1"],
  ["이프 아이 워 왜 워즈가 아니에요", "sj-2"],
  ["아이 위시 뒤에 과거형 쓰는 이유", "sj-8"],
  ["애즈 이프 뒤에 시제", "sj-9"],
  ["혼합가정법 뜻", "sj-13"],
  ["시제 일치가 뭐예요", "an-5"],
  ["직접화법 간접화법 차이", "an-7"],
  ["세이랑 텔 차이", "an-8"],
  ["강조구문이랑 가주어 구별법", "sc-1"],
  ["도치가 뭐예요", "sc-2"],
  ["낫 올은 모두 아니다예요", "sc-13"],
  ["병렬이 뭐예요", ["sc-17", "cj-4"]],
  // 수능
  ["수능 어법 문제 푸는 요령", "sn-1"],
  ["위치랑 웨어 수능에서 고르는 법", ["sn-4", "rl-13"]],
  ["디스파이트랑 올도 고르기", ["sn-6", "pr-14"]],
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
