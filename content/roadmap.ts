import type { Band } from "@/lib/level";

/**
 * 수준별 꼭 알아야 할 문법.
 * 참고한 베스트셀러 문법 교재들이 그 학년에 공통으로 다루는 내용을 골라 묶었다.
 * links의 href는 실제 단원이어야 한다 (tests/content.test.ts가 검사).
 */
export interface RoadmapItem {
  title: string;
  /** 이 수준에서 꼭 할 수 있어야 하는 것 */
  know: string;
  links: { label: string; href: string }[];
}

export interface RoadmapLevel {
  band: Band;
  title: string;
  intro: string;
  books: string[];
  groups: { name: string; items: RoadmapItem[] }[];
}

const L = (label: string, href: string) => ({ label, href: `/learn/${href}` });

export const roadmap: RoadmapLevel[] = [
  {
    band: "elem",
    title: "초등학생이 꼭 알아야 할 문법",
    intro: "문장을 이루는 낱말의 종류와 동사의 기본 모양을 익혀요. 쉬운 문장을 스스로 만들고 물어볼 수 있으면 충분해요.",
    books: ["초등영문법 3800제", "초등 Grammar Inside"],
    groups: [
      {
        name: "낱말의 종류",
        items: [
          { title: "품사: 명사·동사·형용사·부사", know: "낱말이 하는 일에 따라 이름이 다르다는 걸 알아요.", links: [L("핵심 품사 넷", "parts-of-speech/core-four")] },
          { title: "셀 수 있는 명사와 없는 명사", know: "an apple은 되고 a water는 안 되는 이유를 말할 수 있어요.", links: [L("명사", "nouns/countable")] },
          { title: "복수형 만들기", know: "-s, -es, 불규칙 복수(child → children)를 만들어요.", links: [L("복수형", "nouns/plurals")] },
          { title: "a, an, the", know: "처음 말할 때는 a/an, 서로 아는 것은 the를 써요.", links: [L("a와 an", "articles/a-an"), L("the", "articles/the")] },
          { title: "인칭대명사", know: "I, my, me, mine처럼 자리마다 모양이 바뀌는 걸 알아요.", links: [L("인칭대명사", "pronouns/personal")] },
          { title: "this, that과 it", know: "가까운 것·먼 것을 가리키고, 날씨·시간의 it을 써요.", links: [L("지시대명사와 it", "pronouns/demonstrative-it")] },
        ],
      },
      {
        name: "동사의 기본",
        items: [
          { title: "be동사", know: "am, are, is를 주어에 맞게 고르고, 부정문·의문문을 만들어요.", links: [L("be동사", "verbs-basics/be-verb")] },
          { title: "일반동사와 3인칭 단수", know: "He likes처럼 -s를 붙이고, do/does로 묻고 부정해요.", links: [L("일반동사", "verbs-basics/general-verbs")] },
          { title: "과거형", know: "played, went처럼 규칙·불규칙 과거형을 쓰고 did로 물어요.", links: [L("과거형", "verbs-basics/past-forms"), { label: "불규칙 동사표", href: "/verbs" }] },
          { title: "현재진행형", know: "지금 하고 있는 일을 be + -ing로 말해요.", links: [L("진행형", "tenses/progressive")] },
          { title: "현재·과거·미래", know: "will, be going to로 앞으로의 일을 말해요.", links: [L("기본 시제", "tenses/simple")] },
          { title: "조동사 can, will, may, must", know: "조동사 뒤에는 동사원형이 온다는 걸 알아요.", links: [L("조동사의 기본", "modals/basic")] },
        ],
      },
      {
        name: "문장 만들기",
        items: [
          { title: "의문사 의문문", know: "who, what, where, when, why, how로 물어요.", links: [L("의문사", "sentence-types/wh-questions")] },
          { title: "명령문과 Let's", know: "~해, ~하지 마, ~하자를 영어로 말해요.", links: [L("명령문", "sentence-types/imperatives")] },
          { title: "There is / There are", know: "'~이 있다'를 뒤에 오는 명사의 수에 맞춰 말해요.", links: [L("There is", "sentence-types/there-is")] },
          { title: "형용사와 부사", know: "명사를 꾸미는 말과 동작을 꾸미는 말을 구별해요.", links: [L("형용사", "adjectives-adverbs/adjectives"), L("부사", "adjectives-adverbs/adverbs")] },
          { title: "비교급과 최상급", know: "taller, the tallest처럼 비교하는 말을 만들어요.", links: [L("비교급·최상급 만들기", "comparison/forms")] },
          { title: "시간·장소 전치사", know: "at, on, in을 시간과 장소에 맞게 써요.", links: [L("시간 전치사", "prepositions/time"), L("장소 전치사", "prepositions/place")] },
          { title: "and, but, or, so", know: "두 문장을 이어서 하나로 말해요.", links: [L("등위접속사", "conjunctions/coordinating")] },
        ],
      },
    ],
  },
  {
    band: "middle",
    title: "중학생이 꼭 알아야 할 문법",
    intro: "문장의 뼈대(문장 성분과 형식)를 세우고, 동사가 변장하는 법(준동사)과 문장을 잇는 법(접속사·관계사)을 익혀요. 내신 문법의 대부분이 여기에 있어요.",
    books: ["중학영문법 3800제", "천일문 중등 GRAMMAR", "GRAMMAR ZONE 중등"],
    groups: [
      {
        name: "문장의 뼈대",
        items: [
          { title: "문장 성분과 1~5형식", know: "주어·목적어·보어를 찾고, 문장이 몇 형식인지 말해요.", links: [L("문장 성분", "sentence-elements/five-roles"), L("문장의 5형식", "sentence-patterns/five-patterns")] },
          { title: "감각동사 + 형용사", know: "look happy처럼 보어 자리에 형용사를 써요.", links: [L("2형식 동사", "sentence-patterns/linking-verbs")] },
          { title: "4형식 ↔ 3형식", know: "give me a book = give a book to me로 바꿔요.", links: [L("수여동사", "sentence-patterns/giving-verbs")] },
          { title: "목적격보어: 사역·지각동사", know: "make/have/let + 원형, want + to부정사를 골라 써요.", links: [L("목적격보어", "sentence-patterns/object-complements")] },
          { title: "구와 절", know: "주어 + 동사가 있으면 절, 없으면 구라는 걸 알아요.", links: [L("구와 절", "phrase-clause/phrase-vs-clause")] },
        ],
      },
      {
        name: "시제와 동사",
        items: [
          { title: "현재완료", know: "완료·경험·계속·결과를 구별하고, yesterday와 함께 쓰지 않아요.", links: [L("현재완료", "tenses/present-perfect")] },
          { title: "조동사 심화", know: "must/have to, should, had better, used to를 구별해요.", links: [L("여러 조동사", "modals/more")] },
          { title: "수동태", know: "be + p.p.로 바꾸고, 시제·조동사가 있는 수동태도 만들어요.", links: [L("수동태 기본", "passive/basic"), L("시제별 수동태", "passive/tenses")] },
        ],
      },
      {
        name: "준동사: 변장한 동사",
        items: [
          { title: "to부정사의 세 가지 쓰임", know: "명사·형용사·부사처럼 쓰인 to부정사를 해석해요.", links: [L("명사처럼", "to-infinitive/noun-use"), L("형용사·부사처럼", "to-infinitive/adjective-adverb")] },
          { title: "too ~ to, enough to, 의문사 + to", know: "so ~ that 구문과 서로 바꿔 써요.", links: [L("to부정사 구문", "to-infinitive/patterns")] },
          { title: "동명사와 to부정사 목적어", know: "enjoy -ing, want to처럼 동사에 맞는 목적어를 골라요.", links: [L("동명사", "gerunds/basic"), L("동명사 vs to부정사", "gerunds/vs-infinitive")] },
          { title: "현재분사·과거분사", know: "-ing(하는)와 p.p.(된)를 구별하고, 감정 분사를 바르게 써요.", links: [L("분사", "participles/present-past"), L("감정 분사", "participles/emotion")] },
        ],
      },
      {
        name: "문장 잇기",
        items: [
          { title: "명사절과 간접의문문", know: "that, if/whether 절을 쓰고, 간접의문문 어순을 지켜요.", links: [L("명사절", "conjunctions/noun-clauses")] },
          { title: "부사절", know: "when, because, if, though로 시간·이유·조건·양보를 말해요.", links: [L("부사절", "conjunctions/adverb-clauses")] },
          { title: "관계대명사 who, which, that, what", know: "두 문장을 관계대명사로 잇고, what과 that을 구별해요.", links: [L("관계대명사", "relatives/pronouns"), L("관계대명사 what", "relatives/what")] },
          { title: "관계부사", know: "where, when, why, how를 선행사에 맞게 써요.", links: [L("관계부사", "relatives/adverbs")] },
          { title: "상관접속사", know: "both A and B, not only A but also B를 쓰고 수를 맞춰요.", links: [L("상관접속사", "conjunctions/correlative")] },
        ],
      },
      {
        name: "생각의 표현",
        items: [
          { title: "비교 구문", know: "as ~ as, 비교급 강조(much), the 비교급, the 비교급을 써요.", links: [L("원급 비교", "comparison/as-as"), L("비교 표현", "comparison/comparative-expressions")] },
          { title: "가정법 과거·과거완료, I wish, as if", know: "현재·과거 사실과 반대되는 상상을 시제를 한 칸 물려 말해요.", links: [L("가정법", "subjunctive/basic"), L("I wish, as if", "subjunctive/wish-as-if")] },
          { title: "부정대명사와 재귀대명사", know: "one, another, the other와 myself를 알맞게 써요.", links: [L("부정대명사", "pronouns/indefinite"), L("재귀대명사", "pronouns/reflexive")] },
          { title: "부가의문문과 감탄문", know: "그렇지?를 붙이고, What a ~! / How ~!를 만들어요.", links: [L("부가의문문", "sentence-types/tag-questions"), L("감탄문", "sentence-types/exclamations")] },
        ],
      },
    ],
  },
  {
    band: "high",
    title: "고등학생이 꼭 알아야 할 문법",
    intro: "중학 문법을 깊게 다지고, 긴 문장을 정확히 읽는 힘과 수능 어법에서 구별하는 눈을 길러요. 핵심은 '진짜 동사 찾기'예요.",
    books: ["GRAMMAR ZONE 기본·필수", "천일문 고등 GRAMMAR", "어법끝 START"],
    groups: [
      {
        name: "동사 깊게",
        items: [
          { title: "완료 시제 가족", know: "과거완료, 미래완료, 완료진행을 기준 시점으로 구별해요.", links: [L("완료 시제", "tenses/perfect-family")] },
          { title: "조동사 + have p.p., should 특별 용법", know: "should have p.p.와 must have p.p.를 구별하고, suggest that + (should) 원형을 써요.", links: [L("조동사 + have p.p.", "modals/have-pp"), L("should의 특별 용법", "modals/special-should")] },
          { title: "4·5형식 수동태와 구동사 수동태", know: "목적격보어가 있는 문장, It is said that 문장을 수동으로 바꿔요.", links: [L("문장 형식별 수동태", "passive/patterns"), L("구동사·that절 수동태", "passive/phrasal")] },
        ],
      },
      {
        name: "준동사 깊게",
        items: [
          { title: "to부정사의 의미상 주어·시제·태", know: "for/of 의미상 주어, to have p.p., to be p.p., be to 용법을 써요.", links: [L("to부정사 심화", "to-infinitive/subject-tense")] },
          { title: "동명사 심화와 관용 표현", know: "의미상 주어, having p.p., look forward to -ing를 알아요.", links: [L("동명사 심화", "gerunds/advanced")] },
          { title: "분사구문", know: "접속사를 지우고 분사로 바꾸며, Having p.p.와 with + 명사 + 분사를 해석해요.", links: [L("분사구문", "participial-constructions/basic"), L("분사구문 심화", "participial-constructions/advanced")] },
          { title: "동사 vs 준동사", know: "접속사·관계사 개수로 진짜 동사 자리를 세요.", links: [L("준동사 종합", "verbals-review/verb-or-verbal")] },
        ],
      },
      {
        name: "문장 잇기와 일치",
        items: [
          { title: "관계사 심화", know: "계속적 용법, 전치사 + 관계대명사, 복합관계사를 써요.", links: [L("관계사 심화", "relatives/advanced")] },
          { title: "수의 일치와 시제 일치", know: "긴 주어의 수를 맞추고, 주절이 과거일 때 종속절 시제를 맞춰요.", links: [L("일치", "agreement-narration/agreement")] },
          { title: "직접화법과 간접화법", know: "평서문·의문문·명령문을 간접화법으로 옮겨요.", links: [L("화법", "agreement-narration/narration")] },
        ],
      },
      {
        name: "표현 깊게",
        items: [
          { title: "혼합가정법, if 생략 도치", know: "Had I known…, without/but for를 해석하고 써요.", links: [L("가정법 심화", "subjunctive/advanced")] },
          { title: "강조와 도치", know: "It is ~ that 강조구문과 부정어 도치를 알아봐요.", links: [L("강조와 도치", "special-constructions/emphasis-inversion")] },
          { title: "생략·동격·삽입", know: "동격 that과 관계대명사 that을 구별해요.", links: [L("생략·동격·삽입", "special-constructions/ellipsis-apposition")] },
          { title: "부분부정과 병렬", know: "not all과 none을 구별하고, 병렬 구조의 모양을 맞춰요.", links: [L("부정과 병렬", "special-constructions/negation-parallel")] },
          { title: "최상급을 나타내는 여러 표현", know: "No other ~ 비교급 than 같은 표현과 배수 비교를 알아요.", links: [L("최상급 표현", "comparison/superlative-meaning")] },
        ],
      },
      {
        name: "수능 어법",
        items: [
          { title: "수일치와 대명사 일치", know: "괄호로 수식어를 지우고 진짜 주어와 동사의 수를 맞춰요.", links: [L("수일치", "suneung/agreement")] },
          { title: "동사 vs 준동사, 능동 vs 수동", know: "자리를 먼저, 태를 그다음에 확인해요.", links: [L("동사와 태", "suneung/verb-verbal")] },
          { title: "that/what, 관계사, 형용사/부사, 전치사/접속사", know: "선행사와 뒤 절의 완전성, 보어 자리, 뒤에 오는 말로 골라요.", links: [L("헷갈리는 짝", "suneung/which-word")] },
          { title: "목적격보어와 자동사·타동사", know: "동사가 고르는 목적격보어의 모양과, 목적어가 필요한 동사인지를 확인해요.", links: [L("목적격보어·자동사/타동사", "suneung/complement-transitive")] },
          { title: "병렬·대동사·도치", know: "짝의 모양을 맞추고, 대동사는 앞 동사의 종류에, 도치된 동사는 뒤의 주어에 맞춰요.", links: [L("병렬·대동사·도치", "suneung/parallel-inversion")] },
          { title: "시제·가정법·조동사", know: "시간 단서로 시제를 정하고, 가정법의 짝과 조동사 have p.p.의 뜻을 가려요.", links: [L("시제·가정법·조동사", "suneung/tense-mood")] },
          { title: "실전 29번형 지문", know: "지문 하나에서 밑줄 다섯 개를 점검표로 차례차례 확인해요.", links: [L("실전 세트", "suneung/practice")] },
        ],
      },
    ],
  },
];
