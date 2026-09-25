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

  // 추가된 용어
  {
    "id": "syllable",
    "term": "음절",
    "parts": [
      {
        "c": "음",
        "m": "소리 ('음악', '발음'의 음)"
      },
      {
        "c": "절",
        "m": "마디 (대나무 마디처럼)"
      }
    ],
    "result": "한 번에 소리 내는 소리 덩어리. 영어에서는 모음 소리 하나가 한 음절이에요: tall(1음절), hap-py(2음절), beau-ti-ful(3음절)",
    "myth": "글자 수가 아니라 모음 소리의 수를 세요. strong은 글자가 여섯 개지만 1음절이에요.",
    "english": "syllable",
    "englishNote": "그리스어 syllabe(함께 묶은 것): 소리를 한 덩어리로 묶은 것",
    "example": "[[tall]] → [[taller]], [[famous]] → [[more famous]]",
    "group": "표현",
    "href": "/learn/comparison/forms"
  },
  {
    "id": "equative",
    "term": "원급 비교",
    "parts": [
      {
        "c": "원급",
        "m": "모양을 바꾸지 않은 본래 그대로의 등급 (tall)"
      },
      {
        "c": "비교",
        "m": "견주어 보다"
      }
    ],
    "result": "형용사·부사를 원급 그대로 as와 as 사이에 넣어, 두 대상이 같은 정도라고 말하는 비교: as tall as (~만큼 키가 큰)",
    "myth": "'원급'의 원은 동그라미가 아니라 '본래 그대로'라는 뜻이에요.",
    "english": "equative comparison",
    "englishNote": "equal(같은)과 뿌리가 같아요: '같은 정도'를 말하는 비교",
    "example": "My cat is [[{as|부사:그만큼} heavy {as|접속사:…만큼}]] your dog.",
    "group": "표현",
    "href": "/learn/comparison/as-as"
  },
  {
    "id": "multiplier",
    "term": "배수사",
    "parts": [
      {
        "c": "배",
        "m": "곱절, 몇 곱 ('두 배', '세 배'의 배)"
      },
      {
        "c": "수",
        "m": "수, 개수"
      },
      {
        "c": "사",
        "m": "말"
      }
    ],
    "result": "몇 배인지 나타내는 말: half(절반), twice(두 배), three times(세 배)… as ~ as나 비교급 앞에 써요",
    "english": "multiplier",
    "englishNote": "multiply(곱하다)에서 왔어요: 곱하는 말",
    "example": "My room is [[{twice|부사:두 배}]] {as|부사:그만큼} big {as|접속사:…만큼} yours.",
    "group": "표현",
    "href": "/learn/comparison/comparative-expressions"
  },
  {
    "id": "main-clause",
    "term": "주절",
    "parts": [
      {
        "c": "주",
        "m": "주인, 중심 ('주인공'의 주)"
      },
      {
        "c": "절",
        "m": "주어와 동사를 갖춘 문장의 한 마디"
      }
    ],
    "result": "문장의 중심이 되는 절. 접속사가 붙어 있지 않고, 혼자서도 문장이 될 수 있어요.",
    "english": "main clause",
    "englishNote": "main(중심의, 주된). independent clause(혼자 설 수 있는 절)라고도 해요.",
    "example": "{When|접속사:~할 때} I {got home}, [[my mom was cooking]].",
    "group": "문장 구조",
    "href": "/learn/phrase-clause/phrase-vs-clause"
  },
  {
    "id": "subordinate-clause",
    "term": "종속절",
    "parts": [
      {
        "c": "종",
        "m": "따르다 ('복종', '종업원'의 종)"
      },
      {
        "c": "속",
        "m": "딸려 붙다 ('소속', '부속'의 속)"
      },
      {
        "c": "절",
        "m": "주어와 동사를 갖춘 문장의 한 마디"
      }
    ],
    "result": "접속사나 관계사가 이끌어서 주절에 딸린 절. 혼자서는 문장이 될 수 없어요. 명사절·형용사절·부사절이 모두 종속절이에요.",
    "english": "subordinate clause",
    "englishNote": "sub(아래) + ordinate(순서를 매기다): 한 단계 아래에 놓인 절",
    "example": "I was late [[because I missed the bus]].",
    "group": "문장 구조",
    "href": "/learn/phrase-clause/phrase-vs-clause"
  },
  {
    "id": "coordinating-conjunction",
    "term": "등위접속사",
    "parts": [
      {
        "c": "등",
        "m": "같다, 대등하다 ('평등', '동등'의 등)"
      },
      {
        "c": "위",
        "m": "자리 ('위치', '지위'의 위)"
      },
      {
        "c": "접속사",
        "m": "이어 주는 말"
      }
    ],
    "result": "같은 자격의 말끼리 나란히 잇는 접속사: and, but, or, so. 이어진 두 절은 각각 혼자서도 문장이 돼요.",
    "english": "coordinating conjunction",
    "englishNote": "co(함께) + ordinate(순서를 매기다): 같은 순서에 나란히 놓는 말",
    "example": "I like cats, [[but]] my sister likes dogs.",
    "group": "연결",
    "href": "/learn/phrase-clause/phrase-vs-clause"
  },
  {
    "id": "subordinating-conjunction",
    "term": "종속접속사",
    "parts": [
      {
        "c": "종속",
        "m": "주인에게 따라 딸려 붙다 ('종'은 따르다, '속'은 붙다)"
      },
      {
        "c": "접속사",
        "m": "이어 주는 말"
      }
    ],
    "result": "절을 이끌어서 주절에 딸려 붙이는 접속사: that, whether, if, when, because, although…",
    "english": "subordinating conjunction",
    "englishNote": "subordinate(아래에 두다, 딸리게 하다)",
    "example": "I stayed home [[because]] it rained.",
    "group": "연결",
    "href": "/learn/phrase-clause/phrase-vs-clause"
  },
  {
    "id": "noun-clause",
    "term": "명사절",
    "parts": [
      {
        "c": "명사",
        "m": "이름을 나타내는 말"
      },
      {
        "c": "절",
        "m": "주어와 동사를 갖춘 문장의 한 마디"
      }
    ],
    "result": "명사처럼 주어·목적어·보어 자리에 서는 절. that(~라는 것), whether·if(~인지), 의문사, what(~하는 것)이 이끌어요.",
    "english": "noun clause",
    "englishNote": "noun(명사) + clause(절)",
    "example": "I believe [[{that|접속사:~라는 것} you can do it]].",
    "group": "문장 구조",
    "href": "/learn/phrase-clause/three-clauses"
  },
  {
    "id": "adjective-clause",
    "term": "형용사절",
    "parts": [
      {
        "c": "형용사",
        "m": "명사를 꾸미는 말"
      },
      {
        "c": "절",
        "m": "주어와 동사를 갖춘 문장의 한 마디"
      }
    ],
    "result": "형용사처럼 바로 앞의 명사(선행사)를 꾸미는 절. 관계사가 이끌어서 관계사절이라고도 해요.",
    "myth": "한 단어 형용사는 명사 앞에서 꾸미지만, 형용사절은 명사 뒤에서 꾸며요.",
    "english": "adjective clause (relative clause)",
    "englishNote": "relative(관계를 맺는): 앞의 명사와 관계를 맺는 절",
    "example": "This is the cake [[{that|관계대명사:~하는 (앞의 명사를 꾸며요)} my dad made]].",
    "group": "문장 구조",
    "href": "/learn/phrase-clause/three-clauses"
  },
  {
    "id": "adverb-clause",
    "term": "부사절",
    "parts": [
      {
        "c": "부사",
        "m": "곁에서 꾸며 주는 말"
      },
      {
        "c": "절",
        "m": "주어와 동사를 갖춘 문장의 한 마디"
      }
    ],
    "result": "부사처럼 동사나 문장 전체를 꾸미는 절. 때·이유·조건·양보를 나타내요: when, because, if, although…",
    "english": "adverb clause",
    "englishNote": "adverb(부사) + clause(절)",
    "example": "[[{When|접속사:~할 때} I {got home}]], my dog was sleeping.",
    "group": "문장 구조",
    "href": "/learn/phrase-clause/three-clauses"
  },
  {
    "id": "sentence-element",
    "term": "문장 성분",
    "parts": [
      {
        "c": "문장",
        "m": "생각을 완성해서 나타낸 말"
      },
      {
        "c": "성",
        "m": "이루다 ('완성', '구성'의 성)"
      },
      {
        "c": "분",
        "m": "나눈 한 부분 ('부분', '분량'의 분)"
      }
    ],
    "result": "문장을 이루는 조각이 문장 속에서 맡은 역할: 주어, 서술어, 목적어, 보어, 수식어",
    "myth": "품사와 헷갈리지 마세요. 품사는 단어의 직업이라 늘 같고, 성분은 그 문장에서 맡은 역할이라 문장마다 달라져요.",
    "english": "sentence element",
    "englishNote": "element(요소): 전체를 이루는 기본 조각",
    "example": "[[Minsu]] [[plays]] [[soccer]] [[after school]].",
    "group": "문장 성분",
    "href": "/learn/sentence-patterns/object-complements"
  },
  {
    "id": "subject-complement",
    "term": "주격보어",
    "parts": [
      {
        "c": "주격",
        "m": "주어에 대한, 주어 자리의"
      },
      {
        "c": "보어",
        "m": "모자란 뜻을 채우는 말 ('보충'의 보)"
      }
    ],
    "result": "주어가 누구인지, 어떤 상태인지 채워 주는 말. 주어 = 보어 관계가 돼요. 명사나 형용사가 맡아요.",
    "myth": "보어 자리에 부사는 올 수 없어요. You look happily (✕) → You look happy (O)",
    "english": "subject complement",
    "englishNote": "subject(주어)를 complete(채우다)하는 말",
    "example": "My dad is [[a nurse]]. This soup smells [[good]].",
    "group": "문장 성분",
    "href": "/learn/sentence-patterns/object-complements"
  },
  {
    "id": "object-complement",
    "term": "목적격보어",
    "parts": [
      {
        "c": "목적격",
        "m": "목적어에 대한, 목적어 자리의"
      },
      {
        "c": "보어",
        "m": "모자란 뜻을 채우는 말 ('보충'의 보)"
      }
    ],
    "result": "목적어가 누구인지, 어떤 상태인지 채워 주는 말. 목적어 = 보어 관계가 돼요.",
    "english": "object complement",
    "englishNote": "object(목적어)를 complete(채우다)하는 말",
    "example": "The movie made me [[sad]]. We call our cat [[Coco]].",
    "group": "문장 성분",
    "href": "/learn/sentence-patterns/object-complements"
  },
  {
    "id": "dummy-subject",
    "term": "가주어",
    "parts": [
      {
        "c": "가",
        "m": "가짜, 임시로 세운 ('가짜', '가면'의 가)"
      },
      {
        "c": "주어",
        "m": "문장의 주인. '누가, 무엇이'에 해당하는 말"
      }
    ],
    "result": "긴 진짜 주어(to부정사, that절, whether절)를 문장 뒤로 보내고, 주어 자리를 대신 채우는 it. 뒤로 간 진짜 주어는 진주어라고 해요.",
    "myth": "가주어 it은 '그것'이라고 해석하지 않아요. 뒤에 있는 진주어를 주어로 해석해요.",
    "english": "dummy subject (preparatory it)",
    "englishNote": "dummy(모형, 자리만 채우는 가짜)",
    "example": "[[{It|대명사:가주어 (뜻 없이 자리만 채워요)}]] is fun [[to ride a bike]].",
    "group": "문장 성분",
    "href": "/learn/sentence-elements/forms-of-elements"
  },
  {
    "id": "sentence-pattern",
    "term": "형식 (문장의 형식)",
    "parts": [
      {
        "c": "형",
        "m": "모양, 틀 ('형태', '외형'의 형)"
      },
      {
        "c": "식",
        "m": "정해진 방식 ('공식', '방식'의 식)"
      }
    ],
    "result": "진짜 동사가 무엇을 필요로 하느냐에 따라 나눈 영어 문장의 다섯 가지 틀(설계도). 1형식부터 5형식까지 있어요.",
    "myth": "'형식적이다'처럼 겉모양만 갖춘다는 뜻이 아니에요. 문장을 짓는 설계도라는 뜻이에요.",
    "english": "sentence pattern",
    "englishNote": "pattern(본, 틀): 옷을 만들 때 대고 자르는 본처럼, 문장을 찍어 내는 틀이에요.",
    "example": "Birds [[fly]]. I [[love]] my cat. Mom [[gave]] me a gift.",
    "group": "문장 구조",
    "href": "/learn/sentence-patterns/five-patterns"
  },
  {
    "id": "sense-verb",
    "term": "감각동사",
    "parts": [
      {
        "c": "감각",
        "m": "눈·귀·코·입·피부로 느끼는 것"
      },
      {
        "c": "동사",
        "m": "움직임·상태를 나타내는 말"
      }
    ],
    "result": "보고, 듣고, 냄새 맡고, 맛보고, 만져서 느낀 주어의 상태를 말하는 2형식 동사: look, sound, smell, taste, feel",
    "myth": "우리말로 '~하게'라고 해석돼도 뒤에는 부사가 아니라 형용사가 와요!",
    "english": "sensory linking verb",
    "englishNote": "link(잇다): 주어와 보어를 등호(=)로 이어 주는 동사라서 linking verb라고 불러요.",
    "example": "This soup [[tastes]] salty.",
    "group": "동사",
    "href": "/learn/sentence-patterns/linking-verbs"
  },
  {
    "id": "dative-verb",
    "term": "수여동사",
    "parts": [
      {
        "c": "수여",
        "m": "주다 ('수여식'의 수여)"
      },
      {
        "c": "동사",
        "m": "움직임·상태를 나타내는 말"
      }
    ],
    "result": "'누구에게 무엇을 주다'라는 뜻으로 목적어를 두 개(사람 + 물건) 데려오는 동사. 4형식을 만들어요.",
    "english": "dative verb",
    "englishNote": "dative: 라틴어 dare(주다)에서 온 말로 '~에게 주는'이라는 뜻이에요.",
    "example": "Mom [[gave]] me a gift.",
    "group": "동사",
    "href": "/learn/sentence-patterns/giving-verbs"
  },
  {
    "id": "indirect-object",
    "term": "간접목적어",
    "parts": [
      {
        "c": "간",
        "m": "사이 ('중간', '공간'의 간)"
      },
      {
        "c": "접",
        "m": "닿다 ('접촉'의 접)"
      },
      {
        "c": "목적어",
        "m": "동작이 향하는 대상"
      }
    ],
    "result": "동작이 곧바로 닿지 않고 물건을 사이에 두고 거쳐서 닿는 목적어. 4형식에서 '~에게'에 해당하는 받는 사람이에요.",
    "english": "indirect object",
    "englishNote": "indirect(곧바로가 아닌, 돌아서 가는)",
    "example": "Mom gave [[me]] a gift.",
    "group": "문장 성분",
    "href": "/learn/sentence-patterns/giving-verbs"
  },
  {
    "id": "direct-object",
    "term": "직접목적어",
    "parts": [
      {
        "c": "직",
        "m": "곧바로 ('직진', '직행'의 직)"
      },
      {
        "c": "접",
        "m": "닿다 ('접촉'의 접)"
      },
      {
        "c": "목적어",
        "m": "동작이 향하는 대상"
      }
    ],
    "result": "동작이 곧바로 닿는 목적어. 4형식에서 '~을/를'에 해당하는 주는 물건이에요.",
    "english": "direct object",
    "englishNote": "direct(곧바로의)",
    "example": "Mom gave me [[a gift]].",
    "group": "문장 성분",
    "href": "/learn/sentence-patterns/giving-verbs"
  },
  {
    "id": "causative",
    "term": "사역동사",
    "parts": [
      {
        "c": "사",
        "m": "부리다, 시키다 ('사용'의 사)"
      },
      {
        "c": "역",
        "m": "일 ('역할'의 역)"
      },
      {
        "c": "동사",
        "m": "움직임·상태를 나타내는 말"
      }
    ],
    "result": "남을 부려 어떤 일을 하게 시키는 동사: make, have, let. 목적격보어로 동사원형을 써요.",
    "english": "causative verb",
    "englishNote": "cause(원인이 되다, ~하게 하다)",
    "example": "Mom made me [[clean]] my room.",
    "group": "동사",
    "href": "/learn/sentence-patterns/object-complements"
  },
  {
    "id": "perception-verb",
    "term": "지각동사",
    "parts": [
      {
        "c": "지",
        "m": "알다 ('지식'의 지)"
      },
      {
        "c": "각",
        "m": "깨닫다, 느끼다 ('감각'의 각)"
      },
      {
        "c": "동사",
        "m": "움직임·상태를 나타내는 말"
      }
    ],
    "result": "눈·귀·몸으로 알아차리는 동사: see, watch, hear, feel. 목적격보어로 동사원형이나 -ing를 써요.",
    "myth": "학교에 늦는 '지각'과는 소리만 같아요!",
    "english": "perception verb",
    "englishNote": "perceive(알아차리다, 감지하다)",
    "example": "I heard someone [[call]] my name.",
    "group": "동사",
    "href": "/learn/sentence-patterns/object-complements"
  },
  {
    "id": "bare-infinitive",
    "term": "원형부정사",
    "parts": [
      {
        "c": "원형",
        "m": "본래 모양 그대로"
      },
      {
        "c": "부정사",
        "m": "주어·시제에 따라 모양이 정해지지 않는 말"
      }
    ],
    "result": "to 없이 동사원형 그대로 쓰는 부정사. 사역동사·지각동사의 목적격보어 자리에서 만나요.",
    "myth": "to가 없어도 진짜 동사가 아니에요. 모양만 동사원형일 뿐, 변장한 동사예요.",
    "english": "bare infinitive",
    "englishNote": "bare(맨-, 벌거벗은): to를 입지 않은 맨몸의 부정사",
    "example": "Dad let me [[use]] his phone.",
    "group": "준동사",
    "href": "/learn/sentence-patterns/object-complements"
  },

  // 추가된 용어
  {
    "id": "past-participle",
    "term": "과거분사 (p.p.)",
    "parts": [
      {
        "c": "과거",
        "m": "지나간 때"
      },
      {
        "c": "분사",
        "m": "동사와 형용사의 성질을 나누어 가진 말 ('분배', '분담'의 분)"
      }
    ],
    "result": "동사의 세 번째 모양(원형 – 과거형 – 과거분사). 수동태(be + p.p.)와 완료형(have + p.p.)을 만들고, '~된, ~당한'이라는 뜻으로 명사를 꾸미기도 해요.",
    "myth": "이름에 '과거'가 들어 있지만 과거에만 쓰는 게 아니에요! is made(현재), will be made(미래)처럼 어느 시제에나 써요.",
    "english": "past participle",
    "englishNote": "p.p.는 past participle의 머리글자예요.",
    "example": "This cake was [[made]] by my mom.",
    "group": "준동사",
    "href": "/learn/passive/basic"
  },
  {
    "id": "agent",
    "term": "행위자",
    "parts": [
      {
        "c": "행위",
        "m": "하는 일, 움직임 ('행동'의 행)"
      },
      {
        "c": "자",
        "m": "사람, ~하는 이 ('학자', '기자'의 자)"
      }
    ],
    "result": "수동태에서 그 동작을 실제로 한 사람이나 것. by 뒤에 와요.",
    "myth": "사람만이 아니에요. by a ball, by the news처럼 물건이나 일도 행위자가 될 수 있어요.",
    "english": "agent",
    "englishNote": "라틴어 agere(하다, 움직이다)에서 왔어요. act(행동하다)와 뿌리가 같아요.",
    "example": "This picture was painted [[by my sister]].",
    "group": "동사",
    "href": "/learn/passive/basic"
  },
  {
    "id": "phrasal-verb",
    "term": "구동사",
    "parts": [
      {
        "c": "구",
        "m": "두 단어 이상의 묶음 ('구와 절'의 구)"
      },
      {
        "c": "동사",
        "m": "움직임·상태를 나타내는 말"
      }
    ],
    "result": "동사 뒤에 전치사나 부사가 붙어서 한 덩어리로 새로운 뜻을 만드는 동사: look after(돌보다), turn off(끄다)",
    "myth": "look after를 '뒤를 보다'로 읽으면 안 돼요. 두 단어가 합쳐져 새로운 뜻이 돼요.",
    "english": "phrasal verb",
    "englishNote": "phrase(구, 단어 묶음) + al(~의): 단어 묶음으로 된 동사",
    "example": "My grandma [[{looks after}]] the baby.",
    "group": "동사",
    "href": "/learn/passive/phrasal"
  },
  {
    "id": "phrasal-preposition",
    "term": "구전치사",
    "parts": [
      {
        "c": "구",
        "m": "두 단어 이상이 모인 묶음"
      },
      {
        "c": "전치사",
        "m": "명사 앞에 놓이는 말"
      }
    ],
    "result": "두 단어 이상이 모여 전치사 하나처럼 쓰이는 것: in front of, next to, because of",
    "myth": "'전치사구'와 헷갈리지 마세요. 전치사구는 전치사 + 명사 덩어리(in the box)예요.",
    "english": "phrasal preposition",
    "englishNote": "phrase(단어 묶음) + preposition(전치사)",
    "example": "The bank is [[{next to}]] the bakery.",
    "group": "품사",
    "href": "/learn/prepositions/place"
  },
  {
    "id": "prepositional-phrase",
    "term": "전치사구",
    "parts": [
      {
        "c": "전치사",
        "m": "명사 앞에 놓이는 말"
      },
      {
        "c": "구",
        "m": "주어·동사 없이 모인 단어 묶음"
      }
    ],
    "result": "전치사와 그 뒤의 명사(구)가 모인 한 덩어리. 주어와 동사가 없어서 진짜 동사를 늘리지 않아요: during the movie, in the box",
    "myth": "'구전치사'(in front of처럼 여러 단어로 된 전치사 하나)와는 달라요.",
    "english": "prepositional phrase",
    "englishNote": "preposition(전치사) + phrase(단어 묶음)",
    "example": "I {fell asleep} [[during the movie]].",
    "group": "문장 구조",
    "href": "/learn/prepositions/prep-vs-conj"
  },
  {
    "id": "concession",
    "term": "양보",
    "parts": [
      {
        "c": "양",
        "m": "내주다, 물러서다 ('사양하다'의 양)"
      },
      {
        "c": "보",
        "m": "걸음 ('보행', '도보'의 보)"
      }
    ],
    "result": "자리를 양보하듯 상대의 말을 한 걸음 물러서서 인정해 준 뒤, 예상과 다른 이야기를 잇는 것. '~에도 불구하고, 비록 ~이지만'의 뜻: although, though, despite, in spite of",
    "english": "concession",
    "englishNote": "concede(인정하다, 내주다)",
    "example": "[[Although]] it was raining, we played soccer.",
    "group": "연결",
    "href": "/learn/prepositions/prep-vs-conj"
  },

  // 추가된 용어
  {
    "id": "attributive",
    "term": "한정적 용법",
    "parts": [
      {
        "c": "한정",
        "m": "범위를 좁혀 딱 정하다 ('한정판'의 한정)"
      },
      {
        "c": "적",
        "m": "~의 성질을 띤 ('과학적'의 적)"
      },
      {
        "c": "용법",
        "m": "쓰는 방법"
      }
    ],
    "result": "형용사가 명사 바로 앞에서 명사를 꾸며, 어떤 것인지 범위를 좁혀 주는 쓰임 (a small dog)",
    "english": "attributive use",
    "englishNote": "attribute(성질을 붙여 주다): 명사에 성질을 딱 붙여 줘요.",
    "example": "I have a [[small]] dog.",
    "group": "품사",
    "href": "/learn/adjectives-adverbs/adjectives"
  },
  {
    "id": "predicative",
    "term": "서술적 용법",
    "parts": [
      {
        "c": "서술",
        "m": "설명해서 말하다"
      },
      {
        "c": "적",
        "m": "~의 성질을 띤"
      },
      {
        "c": "용법",
        "m": "쓰는 방법"
      }
    ],
    "result": "형용사가 동사 뒤 보어 자리에서 주어나 목적어가 어떤 상태인지 설명하는 쓰임 (The dog is small.)",
    "myth": "명사 앞이 아니라 동사 뒤에 있어도 형용사는 형용사예요. 자리만 달라요.",
    "english": "predicative use",
    "englishNote": "predicate(서술어) 쪽에 붙어서 주어를 설명해요.",
    "example": "My dog is [[small]].",
    "group": "품사",
    "href": "/learn/adjectives-adverbs/adjectives"
  },
  {
    "id": "suffix",
    "term": "접미사",
    "parts": [
      {
        "c": "접",
        "m": "붙이다 ('접착제'의 접)"
      },
      {
        "c": "미",
        "m": "꼬리, 끝 ('말미', '어미'의 미)"
      },
      {
        "c": "사",
        "m": "말"
      }
    ],
    "result": "단어 끝에 붙어서 뜻이나 품사를 바꾸는 말 조각: -ful, -less, -ous, -y, -ly",
    "english": "suffix",
    "englishNote": "suf(아래, 뒤에) + fix(붙이다): 뒤에 붙이는 것",
    "example": "Be [[careful]].",
    "group": "품사",
    "href": "/learn/adjectives-adverbs/adjectives"
  },
  {
    "id": "quantifier",
    "term": "수량형용사",
    "parts": [
      {
        "c": "수량",
        "m": "수(몇 개)와 양(얼마만큼)"
      },
      {
        "c": "형용사",
        "m": "명사를 꾸미는 말"
      }
    ],
    "result": "명사 앞에서 얼마나 많은지, 적은지 알려 주는 형용사: many, much, a few, a little, some, any, enough",
    "myth": "'수'는 하나, 둘 셀 수 있는 것의 개수, '양'은 물이나 돈처럼 셀 수 없는 것의 많고 적음이에요. 그래서 셀 수 있느냐에 따라 쓰는 말이 갈려요.",
    "english": "quantifier",
    "englishNote": "quantity(양, 수량)에서 왔어요: 양을 나타내는 말",
    "example": "I have [[{a few}]] friends.",
    "group": "품사",
    "href": "/learn/adjectives-adverbs/quantifiers"
  },
  {
    "id": "frequency-adverb",
    "term": "빈도부사",
    "parts": [
      {
        "c": "빈",
        "m": "자주 ('빈번하다'의 빈)"
      },
      {
        "c": "도",
        "m": "정도, 횟수 ('온도', '속도'의 도)"
      },
      {
        "c": "부사",
        "m": "곁에서 꾸며 주는 말"
      }
    ],
    "result": "어떤 일이 얼마나 자주 일어나는지 알려 주는 부사: always, usually, often, sometimes, rarely, never",
    "english": "adverb of frequency",
    "englishNote": "frequency(자주 일어남, 빈도)",
    "example": "I [[always]] get up early.",
    "group": "품사",
    "href": "/learn/adjectives-adverbs/adverbs"
  },

  // 추가된 용어
  {
    "id": "deduction",
    "term": "추측",
    "parts": [
      {
        "c": "추",
        "m": "미루어 생각하다 ('추리'의 추)"
      },
      {
        "c": "측",
        "m": "헤아리다, 재다 ('측정'의 측)"
      }
    ],
    "result": "눈앞의 증거를 바탕으로 '아마 그럴 것이다'라고 미루어 짐작하는 것. 영어에서는 must, may, might, can't 같은 조동사로 얼마나 확신하는지를 나타내요.",
    "myth": "아무렇게나 찍는 게 아니에요. 보이는 증거에서 결론을 끌어내는 거예요.",
    "english": "deduction",
    "englishNote": "de(~에서) + duct(이끌다): 증거에서 결론을 이끌어 내다",
    "example": "Minsu ate three bowls of rice. He [[{must|조동사:~임에 틀림없다} be]] hungry.",
    "group": "동사",
    "href": "/learn/modals/guess"
  },
  {
    "id": "pro-verb",
    "term": "대동사",
    "parts": [
      {
        "c": "대",
        "m": "대신하다 ('대명사', '대신'의 대)"
      },
      {
        "c": "동사",
        "m": "움직임·상태를 나타내는 말"
      }
    ],
    "result": "앞에 나온 동사(와 뒤에 딸린 말)를 되풀이하지 않고 대신하는 do, does, did",
    "myth": "크다는 뜻의 '대'가 아니에요! 대명사의 '대'처럼 대신한다는 뜻이에요.",
    "english": "pro-verb",
    "englishNote": "pro(대신하여) + verb(동사): pronoun(대명사)과 같은 방식으로 지은 이름이에요.",
    "example": "She runs faster than I [[do]].",
    "group": "동사",
    "href": "/learn/modals/special-should"
  },

  // 추가된 용어
  {
    "id": "prepositional-object",
    "term": "전치사의 목적어",
    "parts": [
      {
        "c": "전치사",
        "m": "명사 앞에 놓이는 말 ('앞'의 전 + '놓다'의 치)"
      },
      {
        "c": "목적어",
        "m": "동작이나 말이 겨냥하는 대상"
      }
    ],
    "result": "전치사 바로 뒤에 와서 전치사와 한 덩어리가 되는 말. 명사·대명사·동명사만 올 수 있어요. 동사가 오려면 반드시 -ing로 변장해요.",
    "myth": "동사만 목적어를 거느리는 게 아니에요. at, for, in 같은 전치사도 뒤에 목적어를 데리고 다녀요.",
    "english": "object of a preposition",
    "englishNote": "전치사(preposition)가 거느리는 목적어(object)라는 뜻이에요.",
    "example": "I'm good at [[{cooking|동명사:요리하기}]].",
    "group": "문장 성분",
    "href": "/learn/gerunds/basic"
  },
  {
    "id": "perfect-gerund",
    "term": "완료 동명사",
    "parts": [
      {
        "c": "완료",
        "m": "다 마치다 ('완성', '완주'의 완)"
      },
      {
        "c": "동명사",
        "m": "-ing를 입고 명사로 변장한 동사"
      }
    ],
    "result": "having + p.p. 모양의 동명사. 진짜 동사보다 먼저 일어난 일을 나타내요.",
    "myth": "have p.p.(현재완료)처럼 생겼지만 진짜 동사가 아니에요. 여전히 명사로 변장한 동명사예요.",
    "english": "perfect gerund",
    "englishNote": "perfect(완전히 끝난): 진짜 동사보다 먼저 끝난 일이라는 뜻이에요.",
    "example": "He is proud of [[having finished]] the marathon.",
    "group": "준동사",
    "href": "/learn/gerunds/advanced"
  },
  {
    "id": "idiom",
    "term": "관용 표현",
    "parts": [
      {
        "c": "관",
        "m": "익숙하다, 버릇이 되다 ('습관', '관습'의 관)"
      },
      {
        "c": "용",
        "m": "쓰다 ('사용'의 용)"
      },
      {
        "c": "표현",
        "m": "생각을 말로 드러내다"
      }
    ],
    "result": "오랫동안 늘 써 와서 굳어진 말 덩어리. 낱말 뜻을 하나씩 더해서는 뜻을 알기 어려워서 덩어리째 익혀요.",
    "myth": "'너그럽게 봐준다'는 뜻의 관용이 아니에요! 늘 써서 익숙해진 말이라는 뜻이에요.",
    "english": "idiom (idiomatic expression)",
    "englishNote": "그리스어 idios(자기만의, 독특한)에서 왔어요. 그 언어만의 독특한 말버릇이라는 뜻이에요.",
    "example": "I [[{feel like|숙어:~하고 싶다} {eating|동명사:먹기}]] pizza.",
    "group": "표현",
    "href": "/learn/gerunds/advanced"
  },
  {
    "id": "dummy-object",
    "term": "가목적어",
    "parts": [
      {
        "c": "가",
        "m": "가짜, 임시로 세운 ('가짜', '가면'의 가)"
      },
      {
        "c": "목적어",
        "m": "동작을 받는 대상. '무엇을, 누구를'에 해당하는 말"
      }
    ],
    "result": "5형식 문장에서 긴 진짜 목적어(to부정사, that절)를 문장 뒤로 보내고, 목적어 자리를 대신 채우는 it. 뒤로 간 진짜 목적어는 진목적어라고 해요.",
    "myth": "가목적어 it은 빼면 안 돼요. I found to solve the puzzle hard ✕ → I found it hard to solve the puzzle ○",
    "english": "dummy object (preparatory it)",
    "englishNote": "dummy(자리만 채우는 가짜) + object(목적어)",
    "example": "I found [[{it|대명사:가목적어 (뜻 없이 자리만 채워요)}]] easy [[to make pancakes]].",
    "group": "문장 성분",
    "href": "/learn/to-infinitive/noun-use"
  },
  {
    "id": "semantic-subject",
    "term": "의미상 주어",
    "parts": [
      {
        "c": "의미상",
        "m": "뜻으로 따져 보면 ('의미'의 의미 + '~에서 보면'의 상)"
      },
      {
        "c": "주어",
        "m": "문장의 주인. '누가, 무엇이'에 해당하는 말"
      }
    ],
    "result": "문장의 주어는 아니지만, 뜻으로 따지면 준동사(to부정사·동명사)의 동작을 하는 사람. to부정사 앞에서는 for(of) + 목적격, 동명사 앞에서는 소유격(목적격)으로 써요.",
    "myth": "문장 전체의 주어가 아니에요. 문장의 주어는 따로 있고, 변장한 동사의 동작을 누가 하는지만 알려 줘요.",
    "english": "semantic subject",
    "englishNote": "semantic(뜻의) + subject(주어)",
    "example": "It is hard [[{for|전치사:(to부정사의 주어) ~가} me]] to swim.",
    "group": "준동사",
    "href": "/learn/to-infinitive/subject-tense"
  },
  {
    "id": "perfect-infinitive",
    "term": "완료부정사",
    "parts": [
      {
        "c": "완료",
        "m": "이미 다 끝남 ('완료', '완성'의 완)"
      },
      {
        "c": "부정사",
        "m": "모양이 정해지지 않은 동사의 모양 (to + 동사원형)"
      }
    ],
    "result": "to have + 과거분사(p.p.). 진짜 동사가 나타내는 때보다 더 먼저 일어난 일을 말해요.",
    "myth": "'완료'라서 현재완료 뜻만 있는 게 아니에요. 진짜 동사보다 한 칸 앞선 때라는 뜻이에요.",
    "english": "perfect infinitive",
    "englishNote": "perfect(완료된) + infinitive(부정사)",
    "example": "He seems [[to have been]] sick last week.",
    "group": "준동사",
    "href": "/learn/to-infinitive/subject-tense"
  },
  {
    "id": "independent-infinitive",
    "term": "독립부정사",
    "parts": [
      {
        "c": "독립",
        "m": "홀로 섬, 남에게 기대지 않음 ('독립', '독자'의 독)"
      },
      {
        "c": "부정사",
        "m": "모양이 정해지지 않은 동사의 모양 (to + 동사원형)"
      }
    ],
    "result": "문장의 다른 부분과 문법적으로 얽히지 않고 홀로 떨어져서, 말하는 사람의 태도를 덧붙이는 to부정사 표현. to be honest, to tell the truth, needless to say 등이 있어요.",
    "myth": "뜻을 하나하나 따지기보다 숙어처럼 통째로 외우는 게 좋아요.",
    "english": "independent infinitive",
    "englishNote": "independent(홀로 선) + infinitive(부정사)",
    "example": "[[{To be honest|숙어:솔직히 말하면}]], I didn't read the book.",
    "group": "준동사",
    "href": "/learn/to-infinitive/subject-tense"
  },

  // 추가된 용어
  {
    "id": "participial-construction",
    "term": "분사구문",
    "parts": [
      {
        "c": "분사",
        "m": "동사와 형용사의 성질을 나누어 가진 말 ('분배', '분담'의 분)"
      },
      {
        "c": "구문",
        "m": "구(단어 묶음)로 짜인 글 ('구와 절'의 구 + '문장'의 문)"
      }
    ],
    "result": "부사절에서 접속사와 (주절과 같은) 주어를 지우고 동사를 분사로 바꿔, 분사로 시작하는 구로 줄인 것. 때·이유·조건·양보·동시동작·연속동작을 나타내요.",
    "myth": "이름에 '문'이 있지만 문장이 아니에요! 진짜 동사가 없는 구라서 혼자서는 문장이 될 수 없어요. 주절에 붙어서 뜻을 더해요.",
    "english": "participial construction",
    "englishNote": "construction(짜임, 구조): 분사로 짜인 덩어리라는 뜻이에요. participial phrase(분사구)라고도 해요.",
    "example": "[[Walking to school]], I met Minsu.",
    "group": "준동사",
    "href": "/learn/participial-constructions/basic"
  },
  {
    "id": "perfect-participle",
    "term": "완료분사 (Having p.p.)",
    "parts": [
      {
        "c": "완료",
        "m": "다 마치다 ('완성', '완주'의 완)"
      },
      {
        "c": "분사",
        "m": "동사와 형용사의 성질을 나누어 가진 말"
      }
    ],
    "result": "having + 과거분사. 분사구문의 일이 주절보다 먼저 일어났다는 것을 보여 주는 모양이에요.",
    "myth": "과거분사(p.p.)와 헷갈리지 마세요. 완료분사는 having이 앞에 붙은 두 단어짜리 모양이에요.",
    "english": "perfect participle",
    "englishNote": "perfect(완전히 끝난) + participle(분사)",
    "example": "[[{Having|조동사:완료형을 만드는 말 (have의 -ing형)} finished]] my homework, I went out to play.",
    "group": "준동사",
    "href": "/learn/participial-constructions/advanced"
  },
  {
    "id": "absolute-participle",
    "term": "독립분사구문",
    "parts": [
      {
        "c": "독립",
        "m": "남에게 기대지 않고 홀로 서다 ('독립운동'의 독립)"
      },
      {
        "c": "분사구문",
        "m": "부사절을 분사로 시작하는 구로 줄인 것"
      }
    ],
    "result": "분사구문의 주어가 주절의 주어와 달라서, 주어를 지우지 않고 분사 앞에 남겨 둔 분사구문: It being fine, we went out.",
    "myth": "주어가 다른데 지워 버리면 분사구문의 주인이 주절의 주어로 바뀌어 엉뚱한 뜻이 돼요.",
    "english": "absolute participial construction",
    "englishNote": "absolute(따로 떨어진, 독립된): 주절의 주어에 기대지 않고 자기 주어를 가져요.",
    "example": "[[{It|비인칭 주어:날씨를 말하는 it} being]] cold, we stayed inside.",
    "group": "준동사",
    "href": "/learn/participial-constructions/advanced"
  },
  {
    "id": "impersonal-absolute",
    "term": "비인칭 독립분사구문",
    "parts": [
      {
        "c": "비인칭",
        "m": "특정한 사람을 가리키지 않는 ('비인칭 it'의 비인칭)"
      },
      {
        "c": "독립분사구문",
        "m": "주절과 다른 주어를 가진 분사구문"
      }
    ],
    "result": "주어가 '우리, 사람들' 같은 막연한 일반 사람이라서, 주절의 주어와 달라도 생략하고 굳어진 표현처럼 쓰는 분사구문: generally speaking, frankly speaking, judging from, considering",
    "myth": "주어를 지웠는데도 틀린 문장이 아니에요. 누가 말하든 상관없는 굳어진 표현이라 숙어처럼 외워요.",
    "english": "impersonal absolute",
    "englishNote": "impersonal(특정한 사람이 아닌) + absolute(독립된). 뜻이 굳어져서 idiomatic participle(관용 분사)이라고도 해요.",
    "example": "[[{Frankly speaking}]], I didn't like the movie.",
    "group": "준동사",
    "href": "/learn/participial-constructions/advanced"
  },
  {
    "id": "attendant-circumstances",
    "term": "부대상황",
    "parts": [
      {
        "c": "부대",
        "m": "주된 것에 딸려 붙은 ('부대 비용', '부대시설'의 부대)"
      },
      {
        "c": "상황",
        "m": "그때의 모습이나 형편"
      }
    ],
    "result": "주된 동작에 곁들여 함께 일어나는 모습. '~한 채로, ~하면서'라는 뜻으로, 동시동작 분사구문이나 with + 명사 + 분사로 나타내요.",
    "myth": "군대의 '부대'가 아니에요! 주된 일에 딸려 붙어 있다는 뜻이에요.",
    "english": "attendant circumstances",
    "englishNote": "attendant(곁에 따라다니는) + circumstances(상황)",
    "example": "He listened to music [[with his eyes {closed|과거분사:감긴}]].",
    "group": "준동사",
    "href": "/learn/participial-constructions/advanced"
  },
  {
    "id": "present-participle",
    "term": "현재분사 (-ing)",
    "parts": [
      {
        "c": "현재",
        "m": "지금, 한창 이어지고 있는 때"
      },
      {
        "c": "분사",
        "m": "동사와 형용사의 성질을 나누어 가진 말 ('분배', '분담'의 분)"
      }
    ],
    "result": "동사원형 + -ing. '~하는, ~하고 있는'이라는 능동·진행의 뜻으로 명사를 꾸미거나 보어가 돼요. be와 함께 진행형(be + -ing)도 만들어요.",
    "myth": "이름에 '현재'가 들어 있지만 현재에만 쓰는 게 아니에요! was sleeping(과거), will be sleeping(미래)처럼 어느 때에나 써요. '지금 한창 하고 있는' 느낌이라는 뜻이에요.",
    "english": "present participle",
    "englishNote": "present(지금의, 진행 중인) + participle(분사)",
    "example": "Who is the girl [[{singing|현재분사:노래하고 있는}]] on the stage?",
    "group": "준동사",
    "href": "/learn/participles/present-past"
  },
  {
    "id": "emotion-verb",
    "term": "감정동사",
    "parts": [
      {
        "c": "감정",
        "m": "기쁨, 슬픔, 놀람 같은 마음의 느낌"
      },
      {
        "c": "동사",
        "m": "움직임·상태를 나타내는 말"
      }
    ],
    "result": "남에게 어떤 감정을 '느끼게 만드는' 동사: surprise(놀라게 하다), interest(흥미를 느끼게 하다), bore(지루하게 하다). 그래서 -ing는 감정을 일으키는 쪽, p.p.는 감정을 느끼는 쪽이 돼요.",
    "myth": "surprise는 '놀라다'가 아니라 '놀라게 하다'예요! 그래서 내가 놀랐으면 놀라게 '된' 것, 곧 I was surprised예요.",
    "english": "emotive verb",
    "englishNote": "emotive(감정을 일으키는)는 emotion(감정)에서 온 말이에요. 마음(psych)을 움직인다고 psych verb라고도 해요.",
    "example": "The news [[surprised]] me. I was [[{surprised|형용사:놀란}]].",
    "group": "동사",
    "href": "/learn/participles/emotion"
  },
];

export const termById = (id: string) => terms.find((t) => t.id === id);
export const termGroups = ["품사", "문장 성분", "문장 구조", "명사·관사", "대명사", "동사", "준동사", "연결", "표현"] as const;
