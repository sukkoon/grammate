# 그래메이트 단원 작성 가이드

이 문서는 단원(MDX), 질문 은행(FAQ), 단어 사전, 그림을 쓸 때 지키는 규칙이다. 먼저 완성된 단원을 한두 개 읽고 시작한다.

- `content/lessons/articles/a-an.mdx`
- `content/lessons/pronouns/personal.mdx`
- `content/lessons/intro/one-verb-rule.mdx`

## 1. 톤과 원칙

- **대상**: 초등 고학년~고2. 친구 같은 짝꿍이 옆에서 설명하는 말투로 쓴다. 해요체를 쓰고, "~예요 / ~해요 / ~거든요"로 끝낸다.
- **한자 금지**: 한자는 한 글자도 쓰지 않는다. 용어는 글자 조각의 뜻을 우리말로 푼다.
  - 예: 대명사 = 대(대신하다) + 명사
  - 비슷한 말이 있으면 괄호 안에 예로 든다. 예: '보충'의 보
- **용어 뜻풀이가 먼저**: 새 용어가 나오면 `<TermAnatomy id="…" />`로 뜻을 먼저 풀고 설명을 시작한다.
- **책 전체를 꿰는 줄기**:
  - "동사 1개의 법칙": 한 절에 진짜 동사는 하나, 나머지는 to부정사·동명사·분사로 변장한다.
  - "진짜 동사 개수 = 접속사·관계사 개수 + 1"
  - 준동사·접속사·관계사·수능 어법 단원에서는 이 법칙을 다시 불러낸다.
- **깊이는 교재 한 권 수준**: 쉬운 말로 시작하되, 내신·수능에 나오는 포인트까지 빠짐없이 다룬다.
- **예문은 모두 직접 만든다**: 시판 교재의 예문을 옮기지 않는다. 예문에는 학생의 일상(학교, 친구, 가족, 반려동물, 운동, 음식)을 쓴다.
- **점수·비교를 부추기는 말을 쓰지 않는다**: 순위, 등수, "몇 점" 같은 말은 쓰지 않는다.

## 2. 단원 파일 구조

파일 위치는 `content/lessons/<chapter-slug>/<unit-slug>.mdx`다. slug는 `content/curriculum.ts`에 있는 것을 그대로 쓴다. 페이지 제목·요약·학년은 curriculum.ts에서 오므로 MDX 첫 줄에 제목(#)을 쓰지 않는다.

권장 순서는 아래와 같다. 필요하면 바꿔도 된다.

1. 도입 문단 2~3문장
2. `<TermAnatomy id="…" />`: 핵심 용어
3. `<KeyIdea>한 줄 핵심</KeyIdea>`
4. `<Easy>`: 초등용 쉬운 풀이 (필요할 때)
5. `## 소제목`으로 개념을 설명하고, `<Figure>` 그림과 `<Examples>` 예문을 넣는다
6. `<Tip mood="…">`: 짝꿍의 한마디
7. `<DeepDive level="중2" title="…">`: 심화
8. `## 자주 하는 실수` + `<Mistake … />` 2~4개
9. `<ExamPoint>`: 내신 포인트. 수능이면 `level="high"`
10. `<Summary>` + 마크다운 표
11. `<Quiz id="chapter/unit" items={[…]} />`: 5~7문제

## 3. 컴포넌트

모든 컴포넌트는 import 없이 쓴다(`mdx-components.tsx`에 등록되어 있다).

### 3-1. 예문과 문장

| 컴포넌트 | 쓰는 법 |
|---|---|
| `<Examples title="…">…</Examples>` | 예문 묶음. title은 생략할 수 있다 |
| `<Ex en="…" ko="…" note="…" />` | 예문 하나. note는 짧은 설명이고 생략할 수 있다 |
| `<Mistake wrong="…" right="…" why="…" />` | 틀린 문장과 맞는 문장 |
| `<E en="…" />` | 본문 문장 중간에 영어를 넣을 때 |

### 3-2. 설명 상자

| 컴포넌트 | 쓰는 법 |
|---|---|
| `<KeyIdea>…</KeyIdea>` | 한 줄 핵심 |
| `<TermAnatomy id="…" />` | 용어 뜻풀이 카드. id는 `content/terms.ts`에 있어야 한다 |
| `<Tip mood="wink\|happy\|thinking\|listening\|oops\|cheer" title="…">…</Tip>` | 짝꿍의 한마디. title은 생략할 수 있다 |
| `<Figure caption="…"><그림컴포넌트 /></Figure>` | 그림 상자 |
| `<Summary>` 빈 줄, 마크다운 표, 빈 줄, `</Summary>` | 한눈에 정리 |

### 3-3. 수준별 상자

| 컴포넌트 | 쓰는 법 |
|---|---|
| `<DeepDive level="중1\|중2\|중3\|고1\|고2" title="…">…</DeepDive>` | 접히는 심화 상자. 수준보다 높으면 '살짝 보기'로 접힌다 |
| `<ExamPoint title="…" level="middle\|high">…</ExamPoint>` | 시험 포인트. 기본값은 middle(내신), 수능은 high |
| `<Easy>…</Easy>` | 초등에게만 보이는 쉬운 풀이 |
| `<More from="middle\|high">…</More>` | 중등·고등에게만 보이는 설명. Easy와 짝으로 쓴다 |
| `<Lv min="middle\|high">…</Lv>` | 아무 내용이나 수준 이상에서만 펼치고, 아래 수준에는 '살짝 보기'로 접는다 |

### 3-4. 문제와 게임

| 컴포넌트 | 쓰는 법 |
|---|---|
| `<Quiz id="chapter/unit" items={[{ q, en?, options, answer, why, level? }]} />` | 확인 문제 |
| `<VerbHunt items={[{ en, ko, why? }]} />` | 진짜 동사 찾기 게임. 표기법은 5장 참고 |

Quiz 문제 하나의 필드는 다음과 같다.

- `q`: 한국어 질문
- `en`: 영어 문장. 빈칸은 `___`
- `options`: 보기 3~4개
- `answer`: 정답 번호. 0부터 센다
- `why`: 해설
- `level`: `"middle"`이나 `"high"`. 초등도 풀 수 있는 문제는 적지 않는다

### 3-5. MDX 주의

- **본문 글에 `{` `}` `<` `>`를 쓰지 않는다**(코드로 읽힌다). 화살표는 `→`를 쓴다.
- **따옴표**: 본문에서는 `&lsquo;…&rsquo;`, `&ldquo;…&rdquo;`나 '…'를 쓴다.
- **속성값 안의 큰따옴표**: `en="…"` 안에는 `"`를 쓸 수 없다. 영어 인용은 작은따옴표로 쓴다.
- **컴포넌트 안에 마크다운 표나 목록을 넣을 때**: 앞뒤에 빈 줄을 둔다.
- **Quiz의 items**: 자바스크립트 배열이다. 문자열 안의 작은따옴표는 큰따옴표 문자열로 감싸면 된다.

## 4. 영어 문장 표기법 (단어 뜻 풍선)

`en`, `wrong`, `right`에 들어가는 영어는 모든 단어가 자동으로 뜻 풍선이 된다.

| 표기 | 뜻 |
|---|---|
| `[[have been]]` | 목표 구문 형광 표시 (여러 단어 가능) |
| `{look after}` | 여러 단어를 한 뜻으로 묶기. 사전에 그 구가 있어야 한다 |
| `{like\|전치사:~처럼, ~같이}` | 이 문장에서의 뜻으로 덮어쓰기. 품사 없이 `{light\|가벼운}`도 된다 |
| `[[{by myself\|숙어:혼자서}]]` | 형광 + 덮어쓰기 |

**사전의 대표 뜻이 문맥과 다르면 반드시 덮어쓴다.** 예: like(전치사), well(형용사 '건강한'), light(가벼운). 사전에 없는 단어는 5장의 사전 패치로 추가한다.

## 5. 진짜 동사 찾기(VerbHunt) 표기

- `*want*`: 진짜 동사
- `~to eat|to부정사~`: 변장한 동사와 변장 이름(to부정사 / 동명사 / 분사)
- 예: `"I *want* ~to eat|to부정사~ pizza."`
- 조동사 + 동사처럼 한 덩어리면 `*can swim*`처럼 묶는다.

## 6. 수준 표시

- `curriculum.ts`의 학년이 초등·중1이어도, 중·고등 내용은 `DeepDive`, `Lv`, `ExamPoint level`로 나눈다.
- 초등 학년이 들어 있는 단원은 `<Easy>`를 한두 곳에 둔다.
- 고등 단원(고1·고2)은 `Easy` 대신 기초를 짧게 다시 정리하는 문단을 둔다.

## 7. 질문 은행 (FAQ)

파일은 `content/faq/<chapter-slug>.json`이다. 단원마다 4~6개를 쓴다. 학생이 실제로 두서없이 물을 법한 질문으로 쓴다.

```json
{
  "id": "짧은접두어-번호",
  "unit": "chapter/unit",
  "q": "대표 질문",
  "alts": ["다르게 묻는 표현 3~5개. 말투는 구어체, 음성 인식처럼 영어를 한글로 적은 것도 섞는다"],
  "keys": ["핵심 낱말 2~5개. 영어 낱말은 소문자로"],
  "a": "쉬운 답 2~4문장. 문단은 \n, 강조는 **굵게**",
  "ex": [{ "en": "단어 뜻 표기법을 쓴 예문", "ko": "해석 (설명)" }],
  "check": "확인 질문 하나 (생략 가능)",
  "level": "middle"
}
```

- id 접두어는 장마다 겹치지 않게 짓는다(예: be-1, st-1).
- 초등도 볼 수 있는 답이면 level을 적지 않는다.

## 8. 단어 사전 패치

`content/lexicon/words.json`을 직접 고치지 말고, 새 단어는 **패치 파일**에 적는다. 파일 위치는 `content/lexicon/patches/<chapter-slug>.json`이다.

```json
{
  "단어": ["품사", "대표 뜻", "다른 품사: 다른 뜻 (선택)"],
  "look up": ["구동사", "(사전에서) 찾아보다"]
}
```

- **어떤 단어를 넣나**: 예문에 쓴 모든 단어 중 기존 words.json에 없는 표제어를 넣는다. 규칙 변화형(-s, -ed, -ing, -er, -est)은 원형만 넣으면 자동으로 찾는다.
- **품사 표기**: 명사, 동사, 형용사, 부사, 전치사, 접속사, 대명사, 감탄사, 조동사, 구동사, 숙어, 이름, 수사
- **뜻**: 네이버 영한사전의 가장 대표적인 뜻을 우리말로 짧게 쓴다.
- **불규칙 변화형**: forms 패치 파일 `content/lexicon/patches/<chapter-slug>.forms.json`에 적는다. 형식은 `"went": ["go", "과거형"]`이고, 기존 forms.json에 없는 것만 넣는다.

## 9. 용어 사전 패치

새 용어는 `content/terms-patches/<chapter-slug>.json`에 적는다. 형식은 `content/terms.ts`의 Term 모양을 JSON으로 옮긴 것이다.

```json
{
  "id": "영문-소문자-하이픈",
  "term": "수여동사",
  "parts": [{ "c": "수여", "m": "주다 ('수여식'의 수여)" }, { "c": "동사", "m": "움직임·상태를 나타내는 말" }],
  "result": "…",
  "myth": "흔한 오해 (선택)",
  "english": "dative verb",
  "englishNote": "영어 이름의 뜻 (선택)",
  "example": "단어 뜻 표기법 예문 (선택)",
  "group": "품사 | 문장 성분 | 문장 구조 | 대명사 | 명사·관사 | 동사 | 준동사 | 연결 | 표현",
  "href": "/learn/chapter/unit"
}
```

- 이미 있는 용어 id: pos, noun, pronoun, verb, adjective, adverb, preposition, conjunction, interjection, article, indefinite-article, definite-article, countable, uncountable, proper-noun, subject, predicate, object, complement, modifier, phrase, clause, finite-verb, person, personal-pronoun, case, demonstrative, impersonal-it, reflexive, indefinite-pronoun, auxiliary, intransitive, transitive, tense, active, passive, verbal, infinitive, gerund, participle, relative-pronoun, antecedent, subjunctive, comparative.
- 이미 있는 id는 새로 만들지 말고 그대로 쓴다.

## 10. 그림

- 새 그림은 `components/illustrations/<chapter-slug>.tsx`에 **named export** 서버 컴포넌트로 만든다. `index.tsx`는 고치지 않는다(합칠 때 내가 연결한다).
- **색**: CSS 변수만 쓴다. 예: `var(--ink)`, `var(--coral)`, `var(--card)`, `var(--line)`
  - Tailwind 클래스: `text-ink`, `bg-coral`, `bg-sky-soft`, `text-sky-ink`, `bg-mint-soft`, `text-mint-ink`, `bg-amber-soft`, `text-amber-ink`, `bg-chip`, `border-line`
- **다크 모드**: 흰색·검은색을 직접 쓰지 않는다(`text-white`는 coral·ink 배경 위에서만 쓴다).
- **휴대폰(375px)에서 글씨가 14px보다 작아지지 않게** 한다. 긴 SVG 한 장보다 HTML 격자(`grid sm:grid-cols-…`)나 칸을 나눈 작은 SVG를 쓴다. SVG 안의 `<text>`는 `style={{ fill: "var(--ink)" }}`로 색을 준다.
- **그림 속 영어**: `import { En } from "@/components/lesson/En"`로 `<En en="…" />`를 쓰면 뜻 풍선이 된다. 이렇게 쓴 영어도 사전 검사를 받는다.
- **아이콘**: `components/illustrations/icons.tsx`의 아이콘을 쓸 수 있다: CatIcon, CrownIcon, MaskIcon, HatIcon, PersonIcon, BoxIcon, SunIcon, ClockIcon, RoadIcon, CalendarIcon, MoonIcon, ArrowRight.
- **React 규칙**: 컴포넌트 안에서 다른 컴포넌트를 정의하지 않는다. 도우미 컴포넌트는 파일 최상단에 둔다.
- **이미 있는 그림**(index.tsx): PosSentence, JobVsRole, PhraseClause, OneVerbBlueprint, VerbCostumes, VerbFormula, TermLego, PronounSwap, ArticleHats, AAnSound, TheReasons, PersonCircles, CaseOutfits, ThisThat, ItFiller, ReflexiveMirror, OtherGroups, WordJobs, ModifyArrows, PrepositionBox.

## 11. 하지 않을 것

- `content/curriculum.ts`, `words.json`, `forms.json`, `terms.ts`, `components/illustrations/index.tsx`, `mdx-components.tsx`는 고치지 않는다(합칠 때 한 사람이 한다).
- 개발 서버를 띄우거나 git 커밋을 하지 않는다.

## 12. 스스로 검사하기

셸은 Git Bash다. 먼저 Node 경로를 잡는다.

```bash
export PATH="/c/Program Files/nodejs:$PATH"
```

그다음 두 가지를 검사한다.

1. **내가 쓴 장의 빠진 단어 뜻**: 사전 패치를 더한 상태로 검사한다. 빠진 단어가 없을 때까지 패치를 채운다.

   ```bash
   DRAFT=<chapter-slug> npx vitest run tests/draft.test.ts
   ```

2. **그림 파일의 타입 오류**: 다른 사람 파일의 오류는 무시하고, 내 파일 오류만 고친다.

   ```bash
   npx tsc --noEmit
   ```
