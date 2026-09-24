/**
 * 문법 용어 뜻풀이. 한자는 쓰지 않고, 글자 조각의 뜻을 우리말로 푼다.
 * english: 영어 이름과 그 어원 한 줄
 */
export interface Term {
  id: string;
  term: string;
  parts: { c: string; m: string }[];
  result: string;
  myth?: string;
  english: string;
  englishNote?: string;
  /** 예문 (단어 뜻 표시 문법 사용) */
  example?: string;
  group: "품사" | "문장 성분" | "문장 구조" | "대명사" | "명사·관사" | "동사" | "준동사" | "연결" | "표현";
  /** 이 용어를 자세히 다루는 단원 */
  href?: string;
}

export const terms: Term[] = [
  // 품사
  {
    id: "pos",
    term: "품사",
    parts: [
      { c: "품", m: "종류, 갈래 ('상품', '품목'의 품)" },
      { c: "사", m: "말, 단어" },
    ],
    result: "단어를 하는 일에 따라 나눈 종류",
    english: "parts of speech",
    englishNote: "말(speech)을 이루는 부품(parts)들",
    group: "품사",
    href: "/learn/parts-of-speech/what-is-pos",
  },
  {
    id: "noun",
    term: "명사",
    parts: [
      { c: "명", m: "이름" },
      { c: "사", m: "말" },
    ],
    result: "사람·사물·장소·생각의 이름을 나타내는 말",
    english: "noun",
    englishNote: "라틴어 nomen(이름)에서 왔어요. name과 뿌리가 같아요.",
    example: "My [[cat]] likes [[milk]].",
    group: "품사",
    href: "/learn/parts-of-speech/core-four",
  },
  {
    id: "pronoun",
    term: "대명사",
    parts: [
      { c: "대", m: "대신하다" },
      { c: "명사", m: "사람·사물의 이름" },
    ],
    result: "명사를 대신하는 말",
    myth: "크다는 뜻의 '대'가 아니에요!",
    english: "pronoun",
    englishNote: "pro(대신하여) + noun(명사)",
    example: "Minsu is my friend. [[He]] is kind.",
    group: "품사",
    href: "/learn/pronouns/personal",
  },
  {
    id: "verb",
    term: "동사",
    parts: [
      { c: "동", m: "움직이다 ('운동', '동작'의 동)" },
      { c: "사", m: "말" },
    ],
    result: "움직임이나 상태를 나타내는 말",
    english: "verb",
    englishNote: "라틴어 verbum(말). 문장에서 가장 중요한 '그 말'이라는 뜻이에요.",
    example: "Birds [[fly]]. I [[am]] happy.",
    group: "품사",
    href: "/learn/parts-of-speech/core-four",
  },
  {
    id: "adjective",
    term: "형용사",
    parts: [
      { c: "형용", m: "모양과 모습 ('형태', '용모')" },
      { c: "사", m: "말" },
    ],
    result: "사람·사물의 모양, 상태, 성질을 나타내는 말 (명사를 꾸며요)",
    english: "adjective",
    englishNote: "ad(~에) + ject(던지다): 명사에 덧붙여 던지는 말",
    example: "She has a [[cute]] dog.",
    group: "품사",
    href: "/learn/parts-of-speech/core-four",
  },
  {
    id: "adverb",
    term: "부사",
    parts: [
      { c: "부", m: "곁에서 돕다 ('부반장', '부업'의 부)" },
      { c: "사", m: "말" },
    ],
    result: "동사·형용사·다른 부사·문장 전체를 곁에서 꾸며 주는 말",
    myth: "'부자', '부정'의 부가 아니에요. 곁에서 돕는 '부'예요.",
    english: "adverb",
    englishNote: "ad(~에) + verb(동사): 동사에 붙는 말",
    example: "He runs [[very]] [[fast]].",
    group: "품사",
    href: "/learn/parts-of-speech/core-four",
  },
  {
    id: "preposition",
    term: "전치사",
    parts: [
      { c: "전", m: "앞" },
      { c: "치", m: "두다, 놓다 ('배치', '위치'의 치)" },
      { c: "사", m: "말" },
    ],
    result: "명사 앞에 놓여서 시간·장소·방향 등을 나타내는 말",
    english: "preposition",
    englishNote: "pre(앞) + position(놓다): 우리말 이름과 뜻이 똑같아요!",
    example: "The cat is [[under]] the table.",
    group: "품사",
    href: "/learn/parts-of-speech/helpers",
  },
  {
    id: "conjunction",
    term: "접속사",
    parts: [
      { c: "접속", m: "이어 붙이다 ('접속', '연결')" },
      { c: "사", m: "말" },
    ],
    result: "단어와 단어, 문장과 문장을 이어 주는 말",
    english: "conjunction",
    englishNote: "con(함께) + junct(잇다): 함께 이어 주는 말",
    example: "I like tea [[and]] coffee.",
    group: "품사",
    href: "/learn/parts-of-speech/helpers",
  },
  {
    id: "interjection",
    term: "감탄사",
    parts: [
      { c: "감탄", m: "크게 느껴서 외치다" },
      { c: "사", m: "말" },
    ],
    result: "놀람, 기쁨, 아픔 같은 느낌을 외치는 말",
    english: "interjection",
    englishNote: "inter(사이) + ject(던지다): 말 사이에 툭 던지는 말",
    example: "[[Wow]], it is beautiful!",
    group: "품사",
    href: "/learn/parts-of-speech/helpers",
  },
  {
    id: "article",
    term: "관사",
    parts: [
      { c: "관", m: "모자, 갓 ('왕관'의 관)" },
      { c: "사", m: "말" },
    ],
    result: "명사 머리에 씌우는 모자 같은 말: a, an, the",
    english: "article",
    englishNote: "라틴어 articulus(작은 마디, 연결 부분)에서 왔어요.",
    example: "[[The]] boy has [[a]] ball.",
    group: "명사·관사",
    href: "/learn/articles/a-an",
  },
  {
    id: "indefinite-article",
    term: "부정관사",
    parts: [
      { c: "부정", m: "정해지지 않은" },
      { c: "관사", m: "명사에 씌우는 모자" },
    ],
    result: "정해지지 않은 '어떤 하나'에 씌우는 관사: a, an",
    myth: "'부정'은 not(아니다)이 아니에요! '정해지지 않은'이라는 뜻이에요.",
    english: "indefinite article",
    englishNote: "in(아닌) + definite(정해진): 정해지지 않은",
    example: "I want [[a]] dog.",
    group: "명사·관사",
    href: "/learn/articles/a-an",
  },
  {
    id: "definite-article",
    term: "정관사",
    parts: [
      { c: "정", m: "정해진" },
      { c: "관사", m: "명사에 씌우는 모자" },
    ],
    result: "말하는 사람과 듣는 사람이 둘 다 아는, 정해진 것에 씌우는 관사: the",
    english: "definite article",
    englishNote: "definite(정해진, 분명한)",
    example: "Close [[the]] door, please.",
    group: "명사·관사",
    href: "/learn/articles/the",
  },
  {
    id: "countable",
    term: "가산명사",
    parts: [
      { c: "가", m: "~할 수 있는 ('가능'의 가)" },
      { c: "산", m: "세다 ('계산'의 산)" },
      { c: "명사", m: "이름을 나타내는 말" },
    ],
    result: "하나, 둘 셀 수 있는 명사",
    english: "countable noun",
    englishNote: "count(세다) + able(할 수 있는)",
    example: "I have [[two]] [[apples]].",
    group: "명사·관사",
    href: "/learn/articles/a-an",
  },
  {
    id: "uncountable",
    term: "불가산명사",
    parts: [
      { c: "불", m: "아니다" },
      { c: "가산", m: "셀 수 있는" },
      { c: "명사", m: "이름을 나타내는 말" },
    ],
    result: "하나, 둘 셀 수 없는 명사 (물, 돈, 사랑 같은 것)",
    english: "uncountable noun",
    englishNote: "un(아닌) + countable(셀 수 있는)",
    example: "I drink [[water]] every day.",
    group: "명사·관사",
    href: "/learn/articles/no-article",
  },
  {
    id: "proper-noun",
    term: "고유명사",
    parts: [
      { c: "고유", m: "그것만 가진, 하나뿐인" },
      { c: "명사", m: "이름을 나타내는 말" },
    ],
    result: "세상에 하나뿐인 이름. 대문자로 시작해요.",
    english: "proper noun",
    englishNote: "proper(그것만의, 고유한)",
    example: "[[Minsu]] lives in [[Seoul]].",
    group: "명사·관사",
    href: "/learn/articles/no-article",
  },

  // 문장 성분
  {
    id: "subject",
    term: "주어",
    parts: [
      { c: "주", m: "주인" },
      { c: "어", m: "문장 속 역할을 맡은 말" },
    ],
    result: "문장의 주인. '누가, 무엇이'에 해당하는 말",
    english: "subject",
    englishNote: "sub(아래) + ject(던지다): 이야기의 바탕에 놓인 것",
    example: "[[My sister]] sings well.",
    group: "문장 성분",
  },
  {
    id: "predicate",
    term: "서술어",
    parts: [
      { c: "서술", m: "설명해서 말하다" },
      { c: "어", m: "문장 속 역할을 맡은 말" },
    ],
    result: "주어가 무엇을 하는지, 어떤지 설명하는 말. 영어에서는 동사가 이 자리를 맡아요.",
    english: "predicate",
    englishNote: "pre(앞에서) + dicate(말하다): 주어에 대해 밝혀 말하는 부분",
    example: "My sister [[sings]] well.",
    group: "문장 성분",
  },
  {
    id: "object",
    term: "목적어",
    parts: [
      { c: "목적", m: "겨냥하는 대상, 과녁" },
      { c: "어", m: "문장 속 역할을 맡은 말" },
    ],
    result: "동작이 향하는 대상. '무엇을, 누구를'에 해당하는 말",
    english: "object",
    englishNote: "ob(~을 향해) + ject(던지다): 동작이 던져지는 곳",
    example: "I love [[music]].",
    group: "문장 성분",
  },
  {
    id: "complement",
    term: "보어",
    parts: [
      { c: "보", m: "채우다 ('보충', '보완'의 보)" },
      { c: "어", m: "문장 속 역할을 맡은 말" },
    ],
    result: "뜻이 모자란 곳을 채워 주는 말",
    english: "complement",
    englishNote: "complete(완성하다, 채우다)와 뿌리가 같아요.",
    example: "She is [[a teacher]].",
    group: "문장 성분",
  },
  {
    id: "modifier",
    term: "수식어",
    parts: [
      { c: "수식", m: "꾸미다" },
      { c: "어", m: "문장 속 역할을 맡은 말" },
    ],
    result: "다른 말을 꾸며 주는 말. 빼도 문장은 성립해요.",
    english: "modifier",
    englishNote: "modify(바꾸다, 꾸미다)",
    example: "I read [[{a lot of}]] books [[at night]].",
    group: "문장 성분",
  },

  // 문장 구조
  {
    id: "phrase",
    term: "구",
    parts: [{ c: "구", m: "어구, 단어 묶음 ('글귀'의 귀와 같은 뜻)" }],
    result: "두 단어 이상이 모여 한 덩어리로 쓰이는 것 (주어+동사는 없어요)",
    english: "phrase",
    englishNote: "그리스어 phrasis(말하는 방식)",
    example: "[[in the morning]]",
    group: "문장 구조",
    href: "/learn/intro/reading-terms",
  },
  {
    id: "clause",
    term: "절",
    parts: [{ c: "절", m: "마디 (대나무 마디처럼)" }],
    result: "주어와 동사를 갖춘 문장의 한 마디",
    english: "clause",
    englishNote: "라틴어 claudere(닫다): 앞뒤가 닫힌 한 덩어리",
    example: "I know [[that you like music]].",
    group: "문장 구조",
    href: "/learn/intro/reading-terms",
  },
  {
    id: "finite-verb",
    term: "정동사 (진짜 동사)",
    parts: [
      { c: "정", m: "정해진" },
      { c: "동사", m: "움직임·상태를 나타내는 말" },
    ],
    result: "주어와 시제에 맞춰 모양이 정해진 동사. 한 절에 딱 하나!",
    english: "finite verb",
    englishNote: "finite(정해진, 한정된) — 부정사 infinitive의 반대말이에요.",
    example: "She [[wants]] to dance.",
    group: "문장 구조",
    href: "/learn/intro/one-verb-rule",
  },

  // 대명사
  {
    id: "person",
    term: "인칭",
    parts: [
      { c: "인", m: "사람" },
      { c: "칭", m: "부르다, 일컫다 ('호칭'의 칭)" },
    ],
    result: "말하는 사람을 기준으로 사람을 부르는 방식. 1인칭은 나, 2인칭은 너, 3인칭은 나머지 모두",
    english: "person",
    englishNote: "라틴어 persona(연극의 가면, 등장인물)",
    example: "[[I]] like [[you]]. [[She]] likes [[them]].",
    group: "대명사",
    href: "/learn/pronouns/personal",
  },
  {
    id: "personal-pronoun",
    term: "인칭대명사",
    parts: [
      { c: "인칭", m: "나·너·그 밖의 사람을 부르는 방식" },
      { c: "대명사", m: "명사를 대신하는 말" },
    ],
    result: "사람이나 사물을 인칭에 따라 대신하는 말: I, you, he, she, it, we, they",
    english: "personal pronoun",
    group: "대명사",
    href: "/learn/pronouns/personal",
  },
  {
    id: "case",
    term: "격",
    parts: [{ c: "격", m: "자격, 자리 ('자격'의 격)" }],
    result: "문장에서 맡은 자리에 따라 바뀌는 모양. 주격(주어 자리), 소유격(~의), 목적격(목적어 자리)",
    english: "case",
    englishNote: "라틴어 casus(떨어진 자리)",
    example: "[[I]] love [[my]] mom. She loves [[me]].",
    group: "대명사",
    href: "/learn/pronouns/personal",
  },
  {
    id: "demonstrative",
    term: "지시대명사",
    parts: [
      { c: "지시", m: "가리키다" },
      { c: "대명사", m: "명사를 대신하는 말" },
    ],
    result: "손가락으로 가리키듯 '이것, 저것'을 나타내는 대명사",
    english: "demonstrative pronoun",
    englishNote: "demonstrate(보여 주다, 가리키다)",
    example: "[[This]] is my bag.",
    group: "대명사",
    href: "/learn/pronouns/demonstrative-it",
  },
  {
    id: "impersonal-it",
    term: "비인칭 it",
    parts: [
      { c: "비", m: "아니다" },
      { c: "인칭", m: "사람·사물을 가리키는 방식" },
    ],
    result: "아무것도 가리키지 않고 날씨·시간·거리·명암을 말할 때 자리만 채우는 it",
    english: "impersonal it",
    englishNote: "im(아닌) + personal(인칭의)",
    example: "[[It]] is sunny today.",
    group: "대명사",
    href: "/learn/pronouns/demonstrative-it",
  },
  {
    id: "reflexive",
    term: "재귀대명사",
    parts: [
      { c: "재귀", m: "다시 돌아오다 ('재방송'의 재 + '귀가'의 귀)" },
      { c: "대명사", m: "명사를 대신하는 말" },
    ],
    result: "동작이 주어 자신에게 되돌아올 때 쓰는 대명사: myself, yourself…",
    english: "reflexive pronoun",
    englishNote: "reflect(되비치다): 거울처럼 되돌아오는 말",
    example: "I love [[myself]].",
    group: "대명사",
    href: "/learn/pronouns/reflexive",
  },
  {
    id: "indefinite-pronoun",
    term: "부정대명사",
    parts: [
      { c: "부정", m: "정해지지 않은" },
      { c: "대명사", m: "명사를 대신하는 말" },
    ],
    result: "정해지지 않은 사람·사물이나 수량을 나타내는 대명사: one, some, any, another, other…",
    myth: "여기서도 '부정'은 not이 아니라 '정해지지 않은'이에요.",
    english: "indefinite pronoun",
    englishNote: "in(아닌) + definite(정해진)",
    example: "I lost my pen. I need a new [[one]].",
    group: "대명사",
    href: "/learn/pronouns/indefinite",
  },

  // 동사
  {
    id: "auxiliary",
    term: "조동사",
    parts: [
      { c: "조", m: "돕다 ('보조', '조수'의 조)" },
      { c: "동사", m: "움직임·상태를 나타내는 말" },
    ],
    result: "동사 앞에서 가능·허락·의무 같은 뜻을 더해 돕는 동사: can, will, must…",
    english: "auxiliary verb",
    englishNote: "라틴어 auxilium(도움)",
    example: "I [[can]] swim.",
    group: "동사",
  },
  {
    id: "intransitive",
    term: "자동사",
    parts: [
      { c: "자", m: "스스로 ('자동', '자신'의 자)" },
      { c: "동사", m: "움직임·상태를 나타내는 말" },
    ],
    result: "목적어 없이 스스로 뜻이 완성되는 동사",
    english: "intransitive verb",
    englishNote: "in(아닌) + trans(건너가다): 동작이 대상에게 건너가지 않아요",
    example: "The baby [[sleeps]].",
    group: "동사",
  },
  {
    id: "transitive",
    term: "타동사",
    parts: [
      { c: "타", m: "다른 것, 남 ('타인'의 타)" },
      { c: "동사", m: "움직임·상태를 나타내는 말" },
    ],
    result: "동작을 받는 다른 대상, 즉 목적어가 꼭 필요한 동사",
    english: "transitive verb",
    englishNote: "trans(건너가다): 동작이 대상에게 건너가요",
    example: "I [[need]] a pen.",
    group: "동사",
  },
  {
    id: "tense",
    term: "시제",
    parts: [
      { c: "시", m: "때, 시간" },
      { c: "제", m: "정해 놓은 틀 ('제도'의 제)" },
    ],
    result: "동작이 일어난 때를 나타내는 동사의 모양 틀",
    english: "tense",
    englishNote: "라틴어 tempus(시간)",
    example: "I [[played]] soccer yesterday.",
    group: "동사",
  },
  {
    id: "active",
    term: "능동태",
    parts: [
      { c: "능동", m: "스스로 움직이다" },
      { c: "태", m: "모습, 모양 ('형태', '상태'의 태)" },
    ],
    result: "주어가 직접 하는 모습의 문장",
    english: "active voice",
    englishNote: "active(활동적인)",
    example: "Tom [[made]] this cake.",
    group: "동사",
  },
  {
    id: "passive",
    term: "수동태",
    parts: [
      { c: "수동", m: "남에게서 받다 ('수신', '수상'의 수)" },
      { c: "태", m: "모습, 모양" },
    ],
    result: "주어가 동작을 받는(당하는) 모습의 문장: be + 과거분사",
    english: "passive voice",
    englishNote: "라틴어 pati(받다, 겪다)",
    example: "This cake [[was made]] by Tom.",
    group: "동사",
  },

  // 준동사
  {
    id: "verbal",
    term: "준동사",
    parts: [
      { c: "준", m: "~에 버금가는, 비슷한 ('준우승', '준결승'의 준)" },
      { c: "동사", m: "움직임·상태를 나타내는 말" },
    ],
    result: "동사에서 나왔지만 진짜 동사 자리에는 못 서는, 변장한 동사: to부정사·동명사·분사",
    english: "verbal",
    englishNote: "verb(동사) + al(~의 성질을 가진)",
    example: "I want [[to eat]] pizza.",
    group: "준동사",
    href: "/learn/intro/one-verb-rule",
  },
  {
    id: "infinitive",
    term: "부정사",
    parts: [
      { c: "부정", m: "정해지지 않은" },
      { c: "사", m: "말" },
    ],
    result: "주어나 시제에 따라 모양이 정해지지 않는 동사의 모양 (to + 동사원형)",
    myth: "'부정'은 not이 아니에요! 주어가 바뀌어도 모양이 정해지지 않고 늘 그대로라서 '부정'사예요.",
    english: "infinitive",
    englishNote: "in(아닌) + finite(정해진): 모양이 정해지지 않은",
    example: "He wants [[to dance]]. They want [[to dance]].",
    group: "준동사",
    href: "/learn/intro/one-verb-rule",
  },
  {
    id: "gerund",
    term: "동명사",
    parts: [
      { c: "동", m: "동사" },
      { c: "명사", m: "이름을 나타내는 말" },
    ],
    result: "동사에 -ing를 붙여 명사처럼 쓰는 것 ('~하기, ~하는 것')",
    english: "gerund",
    englishNote: "라틴어 gerere(하다, 수행하다)",
    example: "[[Swimming]] is fun.",
    group: "준동사",
    href: "/learn/intro/one-verb-rule",
  },
  {
    id: "participle",
    term: "분사",
    parts: [
      { c: "분", m: "나누다 ('분배', '분담'의 분)" },
      { c: "사", m: "말" },
    ],
    result: "동사와 형용사의 성질을 나누어 가진 말: 현재분사(-ing), 과거분사(p.p.)",
    english: "participle",
    englishNote: "participate(나누어 갖다, 참여하다)와 뿌리가 같아요.",
    example: "Look at the [[sleeping]] baby.",
    group: "준동사",
    href: "/learn/intro/one-verb-rule",
  },

  // 연결
  {
    id: "relative-pronoun",
    term: "관계대명사",
    parts: [
      { c: "관계", m: "둘을 이어 관계를 맺다" },
      { c: "대명사", m: "명사를 대신하는 말" },
    ],
    result: "앞의 명사를 대신하면서 두 문장을 이어 주는 말. 접속사 + 대명사의 1인 2역!",
    english: "relative pronoun",
    englishNote: "relate(관계를 맺다)",
    example: "I have a friend [[who]] lives in Paris.",
    group: "연결",
  },
  {
    id: "antecedent",
    term: "선행사",
    parts: [
      { c: "선행", m: "먼저 앞서 가다" },
      { c: "사", m: "말" },
    ],
    result: "관계사보다 앞에 먼저 나와서, 관계사가 가리키는 명사",
    english: "antecedent",
    englishNote: "ante(앞) + cede(가다): 앞서 가는 것",
    example: "I have [[a friend]] who lives in Paris.",
    group: "연결",
  },

  // 표현
  {
    id: "subjunctive",
    term: "가정법",
    parts: [
      { c: "가정", m: "사실이 아닌 것을 임시로 정해 보다 ('가짜'의 가)" },
      { c: "법", m: "말하는 방식" },
    ],
    result: "현실이 아닌 일을 상상하거나 바랄 때 쓰는 말하기 방식",
    english: "subjunctive mood",
    englishNote: "sub(아래) + junctive(이어진): 다른 말에 딸려 쓰이는 방식",
    group: "표현",
  },
  {
    id: "comparative",
    term: "원급·비교급·최상급",
    parts: [
      { c: "원", m: "본래 그대로" },
      { c: "비교", m: "견주어 보다" },
      { c: "최상", m: "가장 높은" },
      { c: "급", m: "등급 ('1급', '등급'의 급)" },
    ],
    result: "형용사·부사의 세 가지 등급: tall(원급) → taller(비교급) → tallest(최상급)",
    english: "positive · comparative · superlative",
    englishNote: "compare(비교하다), super(위에, 넘어서)",
    example: "Tom is [[taller]] than Minsu.",
    group: "표현",
  },

  // 추가된 용어
  {
    "id": "plural",
    "term": "복수",
    "parts": [
      {
        "c": "복",
        "m": "겹치다, 여럿 ('복사', '중복'의 복)"
      },
      {
        "c": "수",
        "m": "수, 개수"
      }
    ],
    "result": "둘 이상. 명사가 여럿일 때의 모양 (books, children)",
    "myth": "'복수(원수를 갚음)'가 아니에요! 여럿이라는 뜻이에요.",
    "english": "plural",
    "englishNote": "라틴어 plus(더 많은)와 뿌리가 같아요.",
    "example": "I have two [[cats]].",
    "group": "명사·관사",
    "href": "/learn/nouns/plurals"
  },
  {
    "id": "singular",
    "term": "단수",
    "parts": [
      {
        "c": "단",
        "m": "하나, 홑 ('단독', '단일'의 단)"
      },
      {
        "c": "수",
        "m": "수, 개수"
      }
    ],
    "result": "하나. 명사가 하나일 때의 모양 (a book, a child)",
    "english": "singular",
    "englishNote": "single(하나의)과 뿌리가 같아요.",
    "example": "I have [[a cat]].",
    "group": "명사·관사",
    "href": "/learn/nouns/plurals"
  },

  // 추가된 용어
  {
    "id": "progressive",
    "term": "진행형",
    "parts": [
      {
        "c": "진행",
        "m": "앞으로 나아가며 계속되다"
      },
      {
        "c": "형",
        "m": "모양 ('형태'의 형)"
      }
    ],
    "result": "동작이 한창 이어지고 있는 중인 모양: be + -ing",
    "english": "progressive",
    "englishNote": "progress(나아가다, 진행하다)",
    "example": "I [[am reading]] a book.",
    "group": "동사",
    "href": "/learn/tenses/progressive"
  },
  {
    "id": "present-perfect",
    "term": "현재완료",
    "parts": [
      {
        "c": "현재",
        "m": "지금"
      },
      {
        "c": "완료",
        "m": "다 마치다 ('완성', '완주'의 완)"
      }
    ],
    "result": "과거의 일이 지금까지 이어지거나 지금에 영향을 줄 때 쓰는 시제: have/has + p.p.",
    "myth": "'지금 막 끝난 일'만이 아니에요. 과거와 지금을 잇는 다리예요.",
    "english": "present perfect",
    "englishNote": "perfect(완전히 끝난)",
    "example": "I [[have lived]] here for five years.",
    "group": "동사",
    "href": "/learn/tenses/present-perfect"
  },
  {
    "id": "past-perfect",
    "term": "과거완료",
    "parts": [
      {
        "c": "과거",
        "m": "지나간 때"
      },
      {
        "c": "완료",
        "m": "다 마치다"
      }
    ],
    "result": "과거의 어느 때보다 더 먼저 일어났거나 그때까지 이어진 일: had + p.p.",
    "english": "past perfect",
    "englishNote": "과거 기준의 perfect(완료)",
    "example": "The movie [[had started]] when I arrived.",
    "group": "동사",
    "href": "/learn/tenses/perfect-family"
  },

  // 추가된 용어
  {
    "id": "be-verb",
    "term": "be동사",
    "parts": [
      {
        "c": "be",
        "m": "영어 동사 be를 그대로 읽은 이름 (~이다, ~에 있다)"
      },
      {
        "c": "동사",
        "m": "움직임·상태를 나타내는 말"
      }
    ],
    "result": "주어가 누구인지, 어떤지, 어디에 있는지 말해 주는 동사. 원래 모양은 be이고, 주어와 시제에 따라 am, are, is, was, were로 바뀌어요.",
    "myth": "am, are, is는 서로 다른 동사가 아니에요. 모두 be 하나가 옷만 갈아입은 거예요.",
    "english": "be verb",
    "englishNote": "be는 '있다, 존재하다'라는 뜻의 아주 오래된 영어 동사예요.",
    "example": "I [[am]] a student. My bag [[is]] on the desk.",
    "group": "동사",
    "href": "/learn/verbs-basics/be-verb"
  },
  {
    "id": "contraction",
    "term": "축약형 (줄임말)",
    "parts": [
      {
        "c": "축약",
        "m": "줄여서 짧게 만들다 ('축소'의 축 + '요약'의 약)"
      },
      {
        "c": "형",
        "m": "모양 ('형태'의 형)"
      }
    ],
    "result": "두 단어를 줄여 하나로 붙인 모양. 빠진 글자 자리에 아포스트로피(')를 찍어요: I'm, isn't, don't",
    "english": "contraction",
    "englishNote": "contract(줄어들다, 오그라들다)에서 왔어요.",
    "example": "[[I'm]] hungry. It [[isn't]] cold.",
    "group": "동사",
    "href": "/learn/verbs-basics/be-verb"
  },
  {
    "id": "negative",
    "term": "부정문",
    "parts": [
      {
        "c": "부정",
        "m": "아니라고 하다 (not)"
      },
      {
        "c": "문",
        "m": "문장 ('문장'의 문)"
      }
    ],
    "result": "'~이 아니다', '~하지 않다'라고 말하는 문장. not을 넣어서 만들어요.",
    "myth": "부정관사·부정사의 '부정'(정해지지 않은)과는 다른 말이에요! 여기서는 not이라는 뜻이에요.",
    "english": "negative sentence",
    "englishNote": "negative(아니라고 하는)",
    "example": "I [[am not]] hungry. He [[doesn't]] like milk.",
    "group": "문장 구조",
    "href": "/learn/verbs-basics/be-verb"
  },
  {
    "id": "interrogative",
    "term": "의문문",
    "parts": [
      {
        "c": "의문",
        "m": "궁금해서 묻다 ('의문점'의 의문)"
      },
      {
        "c": "문",
        "m": "문장 ('문장'의 문)"
      }
    ],
    "result": "궁금한 것을 묻는 문장. 끝에 물음표(?)를 붙여요.",
    "english": "interrogative sentence (question)",
    "englishNote": "interrogate(묻다, 캐묻다)에서 왔어요.",
    "example": "[[Are you]] hungry? [[{Do|조동사:의문문을 만드는 말}]] you like cats?",
    "group": "문장 구조",
    "href": "/learn/verbs-basics/be-verb"
  },
  {
    "id": "general-verb",
    "term": "일반동사",
    "parts": [
      {
        "c": "일반",
        "m": "특별하지 않은 보통의 것 ('일반인'의 일반)"
      },
      {
        "c": "동사",
        "m": "움직임·상태를 나타내는 말"
      }
    ],
    "result": "be동사와 조동사를 뺀 나머지 모든 동사. 동작이나 마음·상태를 나타내요: eat, play, like, have, know…",
    "myth": "영어 동사의 대부분이 일반동사예요. 특별한 건 오히려 be동사와 조동사 쪽이에요.",
    "english": "lexical verb",
    "englishNote": "lexical(낱말의, 사전의): 사전에 실린 뜻을 그대로 담은 동사라는 뜻이에요. main verb(주된 동사)라고도 해요.",
    "example": "I [[play]] soccer. She [[likes]] cats.",
    "group": "동사",
    "href": "/learn/verbs-basics/general-verbs"
  },
  {
    "id": "third-singular",
    "term": "3인칭 단수",
    "parts": [
      {
        "c": "3인칭",
        "m": "나(1인칭)와 너(2인칭)를 뺀 나머지"
      },
      {
        "c": "단수",
        "m": "하나 ('단 하나'의 단 + '숫자'의 수)"
      }
    ],
    "result": "나와 너를 뺀 하나: he, she, it, Minsu, my dog, the book. 현재형 일반동사에 -s가 붙어요.",
    "myth": "사람만 3인칭이 아니에요. 동물, 물건도 하나면 모두 3인칭 단수예요.",
    "english": "third person singular",
    "englishNote": "third(세 번째) + person(인칭) + singular(하나의)",
    "example": "[[My dog]] likes water. [[She]] plays the piano.",
    "group": "동사",
    "href": "/learn/verbs-basics/general-verbs"
  },
  {
    "id": "base-form",
    "term": "동사원형",
    "parts": [
      {
        "c": "동사",
        "m": "움직임·상태를 나타내는 말"
      },
      {
        "c": "원형",
        "m": "본래 모양 ('원래'의 원 + '형태'의 형)"
      }
    ],
    "result": "아무것도 붙지 않은 동사의 본래 모양. 사전에 실린 모양 그대로예요: be, go, play, have",
    "myth": "동그라미 모양이라는 '원형'이 아니에요! '원래 모양'이라는 뜻이에요.",
    "english": "base form",
    "englishNote": "base(바탕): -s, -ed, -ing가 모두 이 모양을 바탕으로 만들어져요.",
    "example": "She doesn't [[like]] milk. Can you [[swim]]?",
    "group": "동사",
    "href": "/learn/verbs-basics/general-verbs"
  },
  {
    "id": "regular-verb",
    "term": "규칙 동사",
    "parts": [
      {
        "c": "규칙",
        "m": "모두가 똑같이 따르는 정해진 약속 ('교통 규칙'의 규칙)"
      },
      {
        "c": "동사",
        "m": "움직임·상태를 나타내는 말"
      }
    ],
    "result": "과거형·과거분사를 만들 때 -ed만 붙이면 되는, 규칙을 잘 지키는 동사: play → played → played",
    "english": "regular verb",
    "englishNote": "regular(규칙적인): rule(규칙)과 뿌리가 같아요.",
    "example": "I [[played]] soccer. She [[studied]] math.",
    "group": "동사",
    "href": "/learn/verbs-basics/past-forms"
  },
  {
    "id": "irregular-verb",
    "term": "불규칙 동사",
    "parts": [
      {
        "c": "불",
        "m": "아니다 ('불가능'의 불)"
      },
      {
        "c": "규칙",
        "m": "모두가 똑같이 따르는 정해진 약속"
      },
      {
        "c": "동사",
        "m": "움직임·상태를 나타내는 말"
      }
    ],
    "result": "과거형·과거분사가 -ed 규칙을 따르지 않고 따로 정해진 모양으로 바뀌는 동사: go → went → gone",
    "myth": "아무렇게나 바뀌는 건 아니에요. buy – bought, think – thought처럼 소리가 닮은 가족이 많아요.",
    "english": "irregular verb",
    "englishNote": "ir(아닌) + regular(규칙적인)",
    "example": "I [[went]] to the park and [[saw]] Minsu.",
    "group": "동사",
    "href": "/learn/verbs-basics/past-forms"
  },

  // 추가된 용어
  {
    "id": "declarative",
    "term": "평서문",
    "parts": [
      {
        "c": "평",
        "m": "평범한, 보통의 ('평소', '평일'의 평)"
      },
      {
        "c": "서",
        "m": "차례대로 풀어 말하다 ('서술'의 서)"
      },
      {
        "c": "문",
        "m": "문장"
      }
    ],
    "result": "사실이나 생각을 있는 그대로 전하는 보통 문장. 마침표(.)로 끝나요.",
    "myth": "'평평한 문장'이 아니에요. 묻거나 시키거나 감탄하지 않는 '보통' 문장이라는 뜻이에요.",
    "english": "declarative sentence",
    "englishNote": "declare(밝히다, 알리다): 사실을 밝혀 알리는 문장",
    "example": "I [[live]] in Seoul.",
    "group": "문장 구조",
    "href": "/learn/sentence-types/exclamations"
  },
  {
    "id": "wh-word",
    "term": "의문사",
    "parts": [
      {
        "c": "의문",
        "m": "궁금해서 묻다 ('의문점'의 의문)"
      },
      {
        "c": "사",
        "m": "말"
      }
    ],
    "result": "궁금한 것을 물어볼 때 질문 맨 앞에 서는 말: who, what, when, where, why, how, which, whose",
    "english": "question word (wh-word)",
    "englishNote": "how만 빼고 모두 wh로 시작해서 wh-word라고도 해요.",
    "example": "[[Where]] do you live?",
    "group": "문장 구조",
    "href": "/learn/sentence-types/wh-questions"
  },
  {
    "id": "imperative",
    "term": "명령문",
    "parts": [
      {
        "c": "명령",
        "m": "하라고 시키다"
      },
      {
        "c": "문",
        "m": "문장"
      }
    ],
    "result": "상대에게 무엇을 하라고(하지 말라고) 시키는 문장. 주어 you 없이 동사원형으로 시작해요.",
    "myth": "무섭게 호통치는 말만이 아니에요. please를 붙인 부탁, 길 안내, 요리법도 모두 명령문이에요.",
    "english": "imperative sentence",
    "englishNote": "라틴어 imperare(명령하다)",
    "example": "[[Open]] the window, please.",
    "group": "문장 구조",
    "href": "/learn/sentence-types/imperatives"
  },
  {
    "id": "suggestion",
    "term": "제안문",
    "parts": [
      {
        "c": "제안",
        "m": "생각을 내놓아 권하다"
      },
      {
        "c": "문",
        "m": "문장"
      }
    ],
    "result": "'우리 같이 ~하자'라고 함께 하기를 권하는 문장: Let's + 동사원형",
    "english": "suggestion (Let's ~)",
    "englishNote": "suggest(제안하다). Let's는 Let us를 줄인 말이에요.",
    "example": "[[Let's play]] soccer after school.",
    "group": "문장 구조",
    "href": "/learn/sentence-types/imperatives"
  },
  {
    "id": "exclamatory",
    "term": "감탄문",
    "parts": [
      {
        "c": "감탄",
        "m": "크게 느껴서 외치다 ('감탄사'의 감탄)"
      },
      {
        "c": "문",
        "m": "문장"
      }
    ],
    "result": "놀람, 기쁨, 감동을 크게 나타내는 문장. What이나 How로 시작하고 느낌표(!)로 끝나요.",
    "myth": "감탄사(Wow, Oh)는 한 단어, 감탄문은 What·How로 만든 문장이에요.",
    "english": "exclamatory sentence",
    "englishNote": "exclaim(외치다): ex(밖으로) + claim(소리치다)",
    "example": "[[How cute]] your cat is!",
    "group": "문장 구조",
    "href": "/learn/sentence-types/exclamations"
  },
  {
    "id": "introductory-there",
    "term": "유도부사 there",
    "parts": [
      {
        "c": "유도",
        "m": "이끌어 들이다 ('유도'의 뜻 그대로)"
      },
      {
        "c": "부사",
        "m": "곁에서 꾸며 주는 말"
      }
    ],
    "result": "뜻 없이 문장 맨 앞 자리를 채우고, be동사 뒤의 진짜 주어를 이끌어 오는 there",
    "myth": "'거기에'라는 뜻이 아니에요! There is a cat.은 '거기에 고양이가 있다'가 아니라 '고양이가 있다'예요.",
    "english": "introductory there",
    "englishNote": "introduce(이끌어 들이다, 소개하다): 뒤의 주어를 소개하는 there",
    "example": "[[{There is}]] a park near my house.",
    "group": "문장 구조",
    "href": "/learn/sentence-types/there-is"
  },
  {
    "id": "tag-question",
    "term": "부가의문문",
    "parts": [
      {
        "c": "부가",
        "m": "덧붙이다 ('부가 서비스'의 부가)"
      },
      {
        "c": "의문문",
        "m": "묻는 문장"
      }
    ],
    "result": "평서문이나 명령문 끝에 짧게 덧붙여 '그렇지?', '알았지?' 하고 확인하는 꼬리 질문",
    "myth": "부사의 '부'(곁에서 돕다)나 부정의 '부'(아니다)가 아니에요. 덧붙인다는 뜻의 '부'예요.",
    "english": "tag question",
    "englishNote": "tag(꼬리표): 문장 끝에 꼬리표처럼 달려요.",
    "example": "You are hungry, [[aren't you]]?",
    "group": "문장 구조",
    "href": "/learn/sentence-types/tag-questions"
  },
  {
    "id": "negative-question",
    "term": "부정의문문",
    "parts": [
      {
        "c": "부정",
        "m": "아니라고 하다 (not)"
      },
      {
        "c": "의문문",
        "m": "묻는 문장"
      }
    ],
    "result": "not이 붙은 줄임말로 시작하는 의문문: Aren't you ~? Don't you ~? ('~하지 않니?')",
    "myth": "이번 '부정'은 not이 맞아요! 부정관사·부정사의 '부정'(정해지지 않은)과는 다른 말이에요.",
    "english": "negative question",
    "englishNote": "negative(부정의, 아니라고 하는)",
    "example": "[[Aren't you]] hungry?",
    "group": "문장 구조",
    "href": "/learn/sentence-types/tag-questions"
  },
];

export const termById = (id: string) => terms.find((t) => t.id === id);
export const termGroups = ["품사", "문장 성분", "문장 구조", "명사·관사", "대명사", "동사", "준동사", "연결", "표현"] as const;
