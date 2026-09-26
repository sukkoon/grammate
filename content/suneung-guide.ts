/**
 * 수능 문법(/suneung) 안내: 제7부 단원마다 '수능에서는 무엇을 묻는지'와 '바탕이 되는 앞 단원'.
 * 앞에서 쌓은 기초가 수능 문제로 이어진다는 것을 한눈에 보여 준다.
 * unit과 bases의 href는 공개된 단원이어야 하고, 제7부의 공개 단원은 모두 여기 있어야 한다 (tests/suneung-guide.test.ts).
 */
export interface SuneungGuideItem {
  /** 제7부 단원 "chapter/unit" */
  unit: string;
  /** 수능에서는 이렇게 물어요 */
  asks: string;
  /** 바탕이 되는 앞 단원 */
  bases: { label: string; href: string }[];
}

const L = (label: string, href: string) => ({ label, href: `/learn/${href}` });

export const suneungGuide: SuneungGuideItem[] = [
  {
    unit: "suneung/agreement",
    asks: "주어와 동사 사이를 멀리 떼어 놓고, 동사의 단수·복수와 대명사가 가리키는 명사를 물어요.",
    bases: [L("수의 일치", "agreement-narration/agreement"), L("인칭대명사", "pronouns/personal"), L("재귀대명사", "pronouns/reflexive")],
  },
  {
    unit: "suneung/verb-verbal",
    asks: "밑줄 친 동사가 진짜 동사 자리인지 준동사 자리인지, 능동인지 수동인지 물어요.",
    bases: [L("동사 1개의 법칙", "intro/one-verb-rule"), L("동사 vs 준동사", "verbals-review/verb-or-verbal"), L("수동태", "passive/basic"), L("현재분사·과거분사", "participles/present-past")],
  },
  {
    unit: "suneung/which-word",
    asks: "that과 what, 관계대명사와 관계부사, 형용사와 부사, 전치사와 접속사처럼 헷갈리는 짝 가운데 하나를 골라요.",
    bases: [L("관계대명사", "relatives/pronouns"), L("관계대명사 what", "relatives/what"), L("관계부사", "relatives/adverbs"), L("헷갈리는 부사", "adjectives-adverbs/tricky-adverbs"), L("전치사 vs 접속사", "prepositions/prep-vs-conj")],
  },
  {
    unit: "suneung/complement-transitive",
    asks: "사역·지각동사 뒤 목적격보어의 모양과, lie와 lay처럼 목적어가 필요한 동사인지를 물어요.",
    bases: [L("문장의 5형식", "sentence-patterns/five-patterns"), L("목적격보어", "sentence-patterns/object-complements")],
  },
  {
    unit: "suneung/parallel-inversion",
    asks: "and·or로 이어진 말의 모양, 앞 동사를 대신 받는 do·be·have, 도치된 문장의 수일치를 물어요.",
    bases: [L("상관접속사", "conjunctions/correlative"), L("부정과 병렬", "special-constructions/negation-parallel"), L("강조와 도치", "special-constructions/emphasis-inversion")],
  },
  {
    unit: "suneung/tense-mood",
    asks: "시간 단서에 맞는 시제, 가정법의 짝, should have p.p.와 '~해야 한다'의 should를 물어요.",
    bases: [L("시간·조건 부사절", "tenses/time-clauses"), L("가정법 기초", "subjunctive/basic"), L("조동사 + have p.p.", "modals/have-pp"), L("should의 특별 용법", "modals/special-should")],
  },
  {
    unit: "suneung/practice",
    asks: "긴 지문 하나에 밑줄 다섯 개. 앞의 여섯 단원에서 익힌 점검표를 한꺼번에 써 봐요.",
    bases: [],
  },
];
