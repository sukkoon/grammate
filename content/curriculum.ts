export type Level = "초등" | "중1" | "중2" | "중3" | "고1" | "고2";

export interface Unit {
  slug: string;
  title: string;
  summary: string;
  levels: Level[];
  ready: boolean;
}

export interface Chapter {
  slug: string;
  title: string;
  /** 한 줄로 이 장이 무엇을 다루는지 */
  hook: string;
  units: Unit[];
}

export interface Part {
  id: string;
  label: string;
  title: string;
  chapters: Chapter[];
}

const u = (
  slug: string,
  title: string,
  summary: string,
  levels: Level[],
  ready = false,
): Unit => ({ slug, title, summary, levels, ready });

export const curriculum: Part[] = [
  {
    id: "intro",
    label: "서장",
    title: "시작하기 전에",
    chapters: [
      {
        slug: "intro",
        title: "문법 용어 읽는 법",
        hook: "용어의 뜻만 알아도 문법의 절반은 이해한 거예요.",
        units: [
          u("reading-terms", "용어에 숨은 뜻 읽기", "-사와 -어, 구와 절, 두 가지 '부정'까지. 용어를 쪼개면 뜻이 보여요.", ["초등", "중1"], true),
          u("one-verb-rule", "문장 설계도: 동사 1개의 법칙", "한 문장의 진짜 동사는 딱 하나! 나머지 동사는 모두 변장한 거예요.", ["초등", "중1", "중2", "고1"], true),
        ],
      },
    ],
  },
  {
    id: "part1",
    label: "제1부",
    title: "문장의 뼈대",
    chapters: [
      {
        slug: "parts-of-speech",
        title: "품사",
        hook: "단어에도 직업이 있어요. 문장 속에서 무슨 일을 하느냐가 품사예요.",
        units: [
          u("what-is-pos", "품사: 단어의 직업", "8품사를 한눈에. 품사를 알면 사전이 읽히고 문장이 보여요.", ["초등", "중1"]),
          u("core-four", "문장의 주인공들: 명사·동사·형용사·부사", "이름, 움직임, 꾸밈. 문장의 대부분은 이 넷이 만들어요.", ["초등", "중1"]),
          u("helpers", "잇고 대신하고 외치는 말: 대명사·전치사·접속사·감탄사", "나머지 넷의 품사와 관사까지.", ["초등", "중1"]),
          u("one-word-many-jobs", "한 단어, 여러 직업", "like는 동사일까, 전치사일까? 품사는 자리가 정해요.", ["중1", "중2"]),
        ],
      },
      {
        slug: "sentence-elements",
        title: "문장 성분",
        hook: "주어, 서술어, 목적어, 보어, 수식어. 문장 속 역할 이름이에요.",
        units: [
          u("five-roles", "문장 속 다섯 가지 역할", "품사는 직업, 성분은 오늘 맡은 역할.", ["중1", "중2"]),
          u("forms-of-elements", "성분이 될 수 있는 여러 모양", "주어 자리에 to부정사, 동명사, 명사절이 올 수 있어요.", ["고1", "고2"]),
        ],
      },
      {
        slug: "phrase-clause",
        title: "구와 절",
        hook: "단어 묶음이 구, 주어와 동사가 있는 마디가 절이에요.",
        units: [
          u("phrase-vs-clause", "구와 절의 차이", "동사가 있느냐 없느냐.", ["중2"]),
          u("three-clauses", "명사절·형용사절·부사절", "절도 품사처럼 일해요.", ["중3", "고1"]),
        ],
      },
      {
        slug: "verbs-basics",
        title: "be동사와 일반동사",
        hook: "영어 문장의 심장, 동사부터 제대로.",
        units: [
          u("be-verb", "be동사: ~이다, ~에 있다", "am, are, is와 부정문·의문문.", ["초등"]),
          u("general-verbs", "일반동사와 3인칭 단수", "do/does와 -s의 비밀.", ["초등"]),
          u("past-forms", "과거형과 불규칙 동사", "went, saw, had…", ["초등", "중1"]),
        ],
      },
      {
        slug: "sentence-types",
        title: "문장의 종류",
        hook: "묻고, 시키고, 제안하고, 감탄하는 문장.",
        units: [
          u("wh-questions", "의문사 의문문", "who, what, when, where, why, how", ["초등", "중1"]),
          u("imperatives", "명령문과 제안문", "Open the door. / Let's go.", ["초등"]),
          u("exclamations", "감탄문", "What a day! / How nice!", ["초등", "중1"]),
          u("there-is", "There is / There are", "~이 있다", ["중1"]),
          u("tag-questions", "부가의문문과 부정의문문", "~지, 그렇지?", ["중1", "고2"]),
        ],
      },
      {
        slug: "sentence-patterns",
        title: "문장의 형식",
        hook: "영어 문장은 다섯 가지 설계도로 만들어져요.",
        units: [
          u("five-patterns", "1~5형식 한눈에", "동사가 무엇을 필요로 하느냐가 형식을 정해요.", ["초등", "중1"]),
          u("linking-verbs", "감각동사와 2형식", "look, sound, smell + 형용사", ["중1"]),
          u("giving-verbs", "수여동사와 4형식", "give, send, show + 사람 + 물건", ["중1", "중2"]),
          u("object-complements", "5형식과 목적격보어", "사역동사·지각동사까지", ["중2", "중3", "고1"]),
        ],
      },
    ],
  },
  {
    id: "part2",
    label: "제2부",
    title: "이름과 꾸밈",
    chapters: [
      {
        slug: "nouns",
        title: "명사",
        hook: "셀 수 있을까, 없을까? 명사의 첫 질문.",
        units: [
          u("countable", "셀 수 있는 명사와 셀 수 없는 명사", "an apple vs water", ["초등", "중1"]),
          u("plurals", "복수형 만들기", "-s, -es, 불규칙 복수", ["초등"]),
          u("quantity", "물질명사의 수량 표현", "a glass of, a piece of", ["초등", "중1"]),
        ],
      },
      {
        slug: "articles",
        title: "관사",
        hook: "명사 머리에 쓰는 모자. 정해진 것인지, 아닌지를 알려줘요.",
        units: [
          u("a-an", "부정관사 a/an: 정해지지 않은 하나", "'부정'은 not이 아니라 '정해지지 않은'!", ["초등", "중1"]),
          u("the", "정관사 the: 우리 둘 다 아는 그것", "말하는 사람과 듣는 사람이 둘 다 아는 것.", ["초등", "중1", "중2"]),
          u("no-article", "관사를 쓰지 않을 때", "go to school, by bus, play soccer", ["중1", "중2", "고1"]),
        ],
      },
      {
        slug: "pronouns",
        title: "대명사",
        hook: "같은 이름을 반복하지 않게, 대신 뛰는 선수.",
        units: [
          u("personal", "인칭대명사와 격", "I, my, me, mine: 자리마다 옷을 갈아입어요.", ["초등", "중1"]),
          u("demonstrative-it", "지시대명사와 비인칭 it", "this, that, 그리고 날씨·시간의 it", ["초등", "중1"]),
          u("reflexive", "재귀대명사", "myself: 나에게 되돌아오는 말", ["중1", "중2"]),
          u("indefinite", "부정대명사", "one, another, the other, some, any", ["중2", "중3", "고1"]),
        ],
      },
      {
        slug: "adjectives-adverbs",
        title: "형용사와 부사",
        hook: "명사를 꾸미면 형용사, 나머지를 꾸미면 부사.",
        units: [
          u("adjectives", "형용사의 두 가지 자리", "명사 앞, 그리고 보어 자리", ["초등", "중1"]),
          u("quantifiers", "수량형용사", "many, much, a few, a little", ["초등", "중1"]),
          u("adverbs", "부사와 빈도부사", "-ly의 비밀과 always, usually", ["초등", "중1"]),
          u("tricky-adverbs", "헷갈리는 형용사와 부사", "hard/hardly, late/lately", ["고1", "고2"]),
        ],
      },
      {
        slug: "comparison",
        title: "비교",
        hook: "더, 가장, 만큼. 저울에 올려 보자.",
        units: [
          u("forms", "비교급과 최상급 만들기", "-er, -est, more, most", ["초등", "중1"]),
          u("as-as", "원급 비교", "as ~ as", ["중1", "중2"]),
          u("comparative-expressions", "비교급을 이용한 표현", "배수사, the 비교급 the 비교급", ["중2", "중3"]),
          u("superlative-meaning", "최상급을 나타내는 여러 방법", "No other ~ than", ["중3", "고1"]),
        ],
      },
      {
        slug: "prepositions",
        title: "전치사",
        hook: "명사 앞에 놓여서 시간과 장소를 그려요.",
        units: [
          u("time", "시간의 전치사", "at, on, in", ["초등", "중1"]),
          u("place", "장소와 방향의 전치사", "in, on, under, into, through", ["초등", "중1"]),
          u("prep-vs-conj", "전치사 vs 접속사", "during vs while, because of vs because", ["고1", "고2"]),
        ],
      },
    ],
  },
  {
    id: "part3",
    label: "제3부",
    title: "동사의 변신",
    chapters: [
      {
        slug: "tenses",
        title: "시제",
        hook: "시간선 위에 동사를 올려놓는 방법.",
        units: [
          u("simple", "현재·과거·미래", "", ["초등", "중1"]),
          u("progressive", "진행형", "be + -ing", ["초등", "중1"]),
          u("present-perfect", "현재완료", "과거가 지금까지 이어질 때", ["중2"]),
          u("perfect-family", "과거완료·미래완료·완료진행", "", ["중3", "고1"]),
          u("time-clauses", "시간·조건 부사절의 현재시제", "When he comes, …", ["고1"]),
        ],
      },
      {
        slug: "modals",
        title: "조동사",
        hook: "동사를 도와 기분과 태도를 더해 주는 말.",
        units: [
          u("basic", "can, may, must, will, should", "", ["초등", "중1"]),
          u("more", "had better, used to, would like to", "", ["중2"]),
          u("guess", "추측의 조동사", "must be, can't be", ["중3"]),
          u("have-pp", "조동사 + have p.p.", "과거에 대한 추측과 후회", ["중3", "고1"]),
          u("special-should", "should의 특별한 쓰임과 대동사 do", "", ["고1", "고2"]),
        ],
      },
      {
        slug: "passive",
        title: "수동태",
        hook: "카메라를 '당하는 쪽'으로 돌리면 수동태.",
        units: [
          u("basic", "수동태의 기본", "be + p.p.", ["중1", "중2"]),
          u("tenses", "여러 시제의 수동태", "", ["중2", "중3"]),
          u("patterns", "4·5형식의 수동태", "", ["중3", "고1"]),
          u("phrasal", "구동사와 by 이외의 전치사", "", ["중3", "고1"]),
        ],
      },
    ],
  },
  {
    id: "part4",
    label: "제4부",
    title: "준동사: 변장한 동사들",
    chapters: [
      {
        slug: "to-infinitive",
        title: "to부정사",
        hook: "to를 쓰고 변장하면 명사도, 형용사도, 부사도 될 수 있어요.",
        units: [
          u("noun-use", "명사처럼 쓰이는 to부정사", "", ["초등", "중1"]),
          u("adjective-adverb", "형용사·부사처럼 쓰이는 to부정사", "", ["중1", "중2"]),
          u("patterns", "too ~ to, enough to와 의문사 + to부정사", "", ["중2"]),
          u("subject-tense", "의미상 주어와 시제·태", "", ["고1", "고2"]),
        ],
      },
      {
        slug: "gerunds",
        title: "동명사",
        hook: "-ing를 붙여 명사로 변장한 동사.",
        units: [
          u("basic", "동명사의 역할", "", ["초등", "중1"]),
          u("vs-infinitive", "동명사 vs to부정사", "enjoy -ing, want to", ["중2"]),
          u("advanced", "의미상 주어와 관용 표현", "", ["중3", "고2"]),
        ],
      },
      {
        slug: "participles",
        title: "분사",
        hook: "동사가 형용사로 변장하면 분사.",
        units: [
          u("present-past", "현재분사와 과거분사", "", ["중2"]),
          u("emotion", "감정을 나타내는 분사", "interesting vs interested", ["중3", "고1"]),
        ],
      },
      {
        slug: "participial-constructions",
        title: "분사구문",
        hook: "접속사와 주어를 떼고 분사로 줄인 문장.",
        units: [
          u("basic", "분사구문 만들기", "", ["중3"]),
          u("advanced", "완료·수동 분사구문과 with + 명사 + 분사", "", ["고1", "고2"]),
        ],
      },
      {
        slug: "verbals-review",
        title: "준동사 종합",
        hook: "진짜 동사와 변장한 동사 가려내기.",
        units: [u("verb-or-verbal", "동사 vs 준동사", "수능 어법 단골!", ["고1", "고2"])],
      },
    ],
  },
  {
    id: "part5",
    label: "제5부",
    title: "문장 잇기",
    chapters: [
      {
        slug: "conjunctions",
        title: "접속사",
        hook: "접속사 하나가 들어오면 동사 자리도 하나 더 생겨요.",
        units: [
          u("coordinating", "and, but, or, so", "", ["초등", "중1"]),
          u("noun-clauses", "명사절과 간접의문문", "that, whether, if", ["중2", "중3"]),
          u("adverb-clauses", "부사절", "시간·이유·조건·양보", ["중2", "고1"]),
          u("correlative", "상관접속사", "both A and B, not only A but also B", ["중3", "고1"]),
        ],
      },
      {
        slug: "relatives",
        title: "관계사",
        hook: "두 문장을 잇는 고리. 접속사 + 대명사의 1인 2역.",
        units: [
          u("pronouns", "관계대명사 who, which, that", "", ["중2"]),
          u("what", "관계대명사 what", "", ["중2", "중3"]),
          u("adverbs", "관계부사", "where, when, why, how", ["중3"]),
          u("advanced", "계속적 용법, 전치사 + 관계사, 복합관계사", "", ["고1", "고2"]),
        ],
      },
    ],
  },
  {
    id: "part6",
    label: "제6부",
    title: "생각의 표현",
    chapters: [
      {
        slug: "subjunctive",
        title: "가정법",
        hook: "현실에서 한 발 물러서서 상상할 때, 시제도 한 칸 물러서요.",
        units: [
          u("basic", "가정법 과거와 과거완료", "", ["중2", "중3"]),
          u("wish-as-if", "I wish, as if", "", ["중3"]),
          u("advanced", "혼합가정법과 if 생략", "", ["고2"]),
        ],
      },
      {
        slug: "agreement-narration",
        title: "일치와 화법",
        hook: "주어와 동사의 짝, 남의 말을 옮기는 법.",
        units: [
          u("agreement", "수의 일치와 시제 일치", "", ["중3", "고1"]),
          u("narration", "직접화법과 간접화법", "", ["중3", "고1"]),
        ],
      },
      {
        slug: "special-constructions",
        title: "특수구문",
        hook: "강조하고, 뒤집고, 생략하는 기술.",
        units: [
          u("emphasis-inversion", "강조와 도치", "", ["중3", "고2"]),
          u("ellipsis-apposition", "생략·동격·삽입", "", ["고1", "고2"]),
          u("negation-parallel", "부정 표현과 병렬", "", ["고1", "고2"]),
        ],
      },
    ],
  },
  {
    id: "part7",
    label: "제7부",
    title: "수능 어법 종합",
    chapters: [
      {
        slug: "suneung",
        title: "수능 어법 포인트",
        hook: "시험에 꼭 나오는 구별 문제를 한곳에.",
        units: [
          u("agreement", "수일치와 대명사 일치", "", ["고1", "고2"]),
          u("verb-verbal", "동사 vs 준동사, 능동 vs 수동", "", ["고1", "고2"]),
          u("which-word", "that/what/관계부사, 형용사/부사, 전치사/접속사", "", ["고1", "고2"]),
        ],
      },
    ],
  },
];

export interface UnitRef {
  part: Part;
  chapter: Chapter;
  unit: Unit;
  index: number;
}

/** 전체 단원을 순서대로 */
export function allUnits(): UnitRef[] {
  const out: UnitRef[] = [];
  for (const part of curriculum)
    for (const chapter of part.chapters)
      for (const unit of chapter.units) out.push({ part, chapter, unit, index: out.length });
  return out;
}

export function readyUnits(): UnitRef[] {
  return allUnits().filter((r) => r.unit.ready);
}

export function findChapter(slug: string) {
  for (const part of curriculum)
    for (const chapter of part.chapters) if (chapter.slug === slug) return { part, chapter };
  return undefined;
}

export function findUnit(chapterSlug: string, unitSlug: string) {
  return allUnits().find((r) => r.chapter.slug === chapterSlug && r.unit.slug === unitSlug);
}

/** 준비된 단원 기준으로 이전·다음 */
export function neighbors(chapterSlug: string, unitSlug: string) {
  const list = readyUnits();
  const i = list.findIndex((r) => r.chapter.slug === chapterSlug && r.unit.slug === unitSlug);
  return { prev: i > 0 ? list[i - 1] : undefined, next: i >= 0 && i < list.length - 1 ? list[i + 1] : undefined };
}

export const unitHref = (chapter: string, unit: string) => `/learn/${chapter}/${unit}`;

export function countChapters() {
  return curriculum.reduce((n, p) => n + p.chapters.length, 0);
}
