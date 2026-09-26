# 그래머랑 단원 작성 가이드

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
| `<DeepDive level="중1\|중2\|중3\|고1\|고2" title="…">…</DeepDive>` | 접히는 심화 상자. 수준보다 높으면 '○○ 문법까지 더 학습하기' 단추로 접힌다 |
| `<ExamPoint title="…" level="middle\|high">…</ExamPoint>` | 시험 포인트. 기본값은 middle(내신), 수능은 high |
| `<Easy>…</Easy>` | 초등에게만 보이는 쉬운 풀이 |
| `<More from="middle\|high">…</More>` | 중등·고등에게만 보이는 설명. Easy와 짝으로 쓴다 |
| `<Lv min="middle|high">…</Lv>` | 아무 내용이나 수준 이상에서만 펼치고, 아래 수준에는 '더 학습하기' 단추로 접는다 |
| `<Voices><Voice level="elem">…</Voice><Voice level="middle">…</Voice><Voice level="high">…</Voice></Voices>` | 같은 내용을 수준별로 다른 목소리로 쓴다. 고른 수준의 목소리 하나만 보인다. 빠진 수준은 가장 가까운 낮은 수준의 목소리를 보여 준다 |
|high">…</Lv>` | 아무 내용이나 수준 이상에서만 펼치고, 아래 수준에는 '더 학습하기' 단추로 접는다 |

### 3-4. 문제와 게임

| 컴포넌트 | 쓰는 법 |
|---|---|
| `<Quiz id="chapter/unit" items={[{ q, en?, options, answer, why, level? }]} />` | 확인 문제 |
| `<VerbHunt items={[{ en, ko, why? }]} />` | 진짜 동사 찾기 게임. 표기법은 5장 참고 |
| `<Pick id="chapter/unit" title="…" items={[{ en, answer, why, ko?, level? }]} />` | 수능식 네모 고르기. 문장 속 고를 곳을 `((is\|are))`처럼 쓴다. 한 문장에 여러 곳이면 answer를 `[0, 1]`처럼 배열로 |

Quiz 문제 하나의 필드는 다음과 같다.

- `q`: 한국어 질문
- `en`: 영어 문장. 빈칸은 `___`
- `options`: 보기 3~4개
- `answer`: 정답 번호. 0부터 센다
- `why`: 해설
- `level`: `"middle"`이나 `"high"`. 초등도 풀 수 있는 문제는 적지 않는다

### 3-5. 작은 도식 (그림 파일 없이 바로 쓰는 시각화)

| 컴포넌트 | 쓰는 법 |
|---|---|
| `<Formula caption="…" parts={["주어", "*be + p.p.", "(by + 행위자)"]} en="…" ko="…" />` | 문장 공식 띠. `*`는 강조 칸, `( )`는 생략 가능 칸, `"~sky:동사원형"`처럼 색(sky, mint, amber, coral) 지정. `"+"`, `","`, `"→"`, `"="`, `"/"`는 기호로 그린다 |
| `<Compare caption="…" items={[{ title, sub?, tone?, en?, ko?, points?, mark? }]} />` | 두세 가지를 나란히 비교하는 카드. tone은 sky, mint, amber, coral. mark는 "ok"/"no" |
| `<Steps caption="…" steps={[{ title, en?, ko?, note? }]} />` | 순서대로 따라 하는 단계 (바꿔 쓰기, 만드는 법) |

- 설명 문단이 길어지면(3~4문장 이상) 그림, 표, Formula, Compare, Steps 중 하나로 **보이게** 만든다.
- 공식은 Formula, 두 가지 비교는 Compare, 절차는 Steps, 여러 항목 정리는 마크다운 표, 개념의 핵심 비유는 직접 그린 그림(Figure).

### 3-6. MDX 주의

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

**사전의 대표 뜻이 문맥과 다르면 반드시 덮어쓴다.** 예: like(전치사), well(형용사 '건강한'), light(가벼운). 사전에 없는 단어는 8장의 사전 패치로 추가한다.

- 덮어쓰기의 품사 이름은 **괄호 없는 한글**만 된다: `{broken|과거분사:깨진}` ○, `{broken|형용사(분사):깨진}` ✕
- 가주어·가목적어 it은 `{It|대명사:가주어 (뜻 없이 자리만 채워요)}`, 의미상 주어의 for는 `{for|전치사:(to부정사의 주어) ~가}`처럼 쓴다.
- 대화문은 `A: … B: …`를 한 문장에 넣지 말고 예문을 나눈다. Quiz의 `en`에는 영어만 쓴다(우리말 문장은 q에).

## 5. 진짜 동사 찾기(VerbHunt) 표기

- `*want*`: 진짜 동사
- `~to eat|to부정사~`: 변장한 동사와 변장 이름(to부정사 / 동명사 / 분사)
- 예: `"I *want* ~to eat|to부정사~ pizza."`
- 조동사 + 동사처럼 한 덩어리면 `*can swim*`처럼 묶는다.
- VerbHunt 문장에는 `{…}` 덮어쓰기와 `[[…]]`를 쓸 수 없다(게임 화면에 그대로 보인다). 대표 뜻이 문맥과 다른 단어(when 접속사, like 전치사 등)는 되도록 피한다.

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
- **뜻**: 학생이 알기 쉬운 대표 뜻을 **직접** 우리말로 짧게 쓴다(apple → 사과). 사전의 뜻풀이 문장을 그대로 옮기거나 여러 사전의 뜻을 통째로 모아 오지 않는다. 더 자세한 뜻은 화면의 '네이버 사전에서 더 보기' 링크가 맡는다.
- **이미 있는 단어는 다시 적지 않는다.** 패치는 기존 항목을 통째로 덮어쓴다. 뜻을 더해야 할 때만 기존 뜻을 모두 살린 채 뒤에 덧붙이고, 기존 뜻을 줄이거나 바꾸지 않는다. 기존 뜻과 다르면 문장 안에서 덮어쓴다.
- -ed, -ing형은 대표 품사가 명사여도 다른 뜻에 `동사: …`가 있으면 동사 뜻으로 찾는다(promised → 약속하다).
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

- 이미 있는 용어는 `content/terms.ts`에서 `id`를 검색해 확인한다(100개가 넘는다. 예: noun-clause, adverb-clause, subordinate-clause, coordinating-conjunction, subordinating-conjunction, relative-pronoun, antecedent, subjunctive, semantic-subject, dummy-subject, past-participle, participial-construction).
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
- **이미 있는 그림**: `components/illustrations/index.tsx`와 각 장 파일(`components/illustrations/*.tsx`)의 export를 본다. 다른 장의 그림도 MDX에서 그대로 쓸 수 있다(예: VerbFormula, OneVerbBlueprint, PhraseClause).
- 그림 속 영어 문장은 `en: "…"` 또는 `en="…"` 이름으로 적어야 사전 검사를 받는다(다른 이름의 필드는 검사되지 않는다).

## 11. 하지 않을 것

- `content/curriculum.ts`, `words.json`, `forms.json`, `terms.ts`, `components/illustrations/index.tsx`, `mdx-components.tsx`는 고치지 않는다(합칠 때 한 사람이 한다).
- 개발 서버를 띄우거나 git 커밋을 하지 않는다.
- 아직 공개되지 않은 단원(curriculum.ts에서 `true`가 없는 단원)으로 링크하지 않는다.
- 임시 검사 파일은 scratchpad에 만들고, 꼭 tests/에 둬야 하면 `tests/zz-<장>-….test.ts`로 만든 뒤 끝나면 지운다.

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

## 13. 수준별 목소리 (Voices)

같은 내용도 초등·중등·고등에게 다른 말투로 들려준다. 단원 전체를 세 번 쓰지 않는다. **도입 문단과 핵심 개념 문단 2~3곳**만 `<Voices>`로 나눠 쓰고, 나머지는 기존처럼 `Easy`·`DeepDive`·`ExamPoint`로 범위와 깊이를 조절한다.

```mdx
<Voices>
<Voice level="elem">

문장에는 대장 동사가 딱 한 명이에요. …

<Figure caption="…"><EzOneKing words={[…]} ko="…" /></Figure>

</Voice>
<Voice level="middle">

한 문장의 진짜 동사는 딱 하나예요. 나머지는 모두 변장한 동사예요. …

</Voice>
<Voice level="high">

한 절에는 정동사가 하나뿐이에요. 나머지 동사는 준동사로 바뀌거나 접속사·관계사와 함께 새 절을 열어야 해요. …

</Voice>
</Voices>
```

- `Voice` 안의 마크다운은 앞뒤에 빈 줄을 둔다. 문단·목록·소제목·그림 무엇이든 넣을 수 있다.
- 기본 목소리는 **중등**이다. 초등이 없는 단원(중2 이상)이면 `elem`을 쓰지 않아도 된다(초등에게는 중등 목소리가 보인다).

| 수준 | 말투 | 길이와 구성 | 용어 | 그림 |
|---|---|---|---|---|
| 초등 | 친구가 옆에서 말하듯. "~해요, ~이죠?, ~해 봐요" | 한 문장에 생각 하나. 문단은 2~3문장. 규칙은 3개까지 | 우리말 비유가 먼저(대장 동사, 이름표), 용어는 괄호 안에 | 문단마다 그림 하나를 목표로. `Ez…` 그림(components/illustrations/easy.tsx)이나 기존 그림 |
| 중등 | 지금 본문 말투 | 지금 본문 | 용어를 바로 쓰되 조각 뜻풀이와 함께 | 기존 그림 |
| 고등 | 간결하고 정확하게. 이유와 예외를 말한다 | 문단은 짧게, 조건·예외는 목록으로 | 정동사·준동사·절처럼 정확한 용어를 그대로 | 표와 공식(Formula) 위주 |

- 초등 목소리에서는 어렵거나 부정적인 말(틀리다, 실수) 대신 "이렇게 해요"로 말한다. 한자어 용어 대신 비유를 먼저 두고, 같은 비유를 단원 안에서 계속 쓴다.
- 고등 목소리는 시험 관점을 담되(`ExamPoint`와 겹치지 않게) 왜 그런지 원리를 한 줄 덧붙인다.

## 14. 수능형 예시 문제 (SuneungSet)

제7부 단원에서 `<SuneungSet topic="주제 id" />`를 두면 '예시 보기' 상자가 생긴다. 누를 때마다 섞인 순서로 다른 문제가 나오고, 답을 고르거나 '정답과 풀이 보기'를 누르면 정답·밑줄마다 풀이·지문 해석이 보인다.

- 문제는 `content/suneung/<주제 id>.ts`에 쓴다. 모양은 `content/suneung/types.ts`, 본보기는 `content/suneung/subject-verb.ts`.
- 주제 목록은 `content/suneung/index.ts`. 새 주제를 만들면 여기에 이어 붙인다.
- **실제 기출을 옮기지 않는다.** 수능·모의고사·EBS 지문과 문장을 베끼거나 살짝 바꿔 쓰지 않는다. 화면에는 '그래머랑이 수능 어법 문제와 같은 형식으로 새로 만든 문제'라고 밝히고 평가원 누리집을 안내한다.

### 문제 쓰는 규칙

- **한 주제에 8문제 이상**: 밑줄형 5개 + 네모형 3개가 기본. 실전 세트(mixed)는 12문제.
- **지문**: 자연스럽고 문법이 정확한 영어. 고1~2 수준. 주제는 학교생활, 과학, 역사, 심리, 환경, 운동, 예술처럼 수능다운 소재. 주제별 문제는 3~6문장(60~110단어), 실전 세트는 120~170단어.
- **밑줄형** `[1:말]`~`[5:말]`
  - 1~5가 차례대로 한 번씩. 밑줄 친 말은 1~4단어.
  - **틀린 곳은 정확히 하나**이고, 그 주제의 포인트여야 한다. 나머지 넷은 누가 봐도 맞는 표준 문어체여야 한다. 사람마다 판단이 갈리는 표현(who/whom, data is/are, none is/are, 단수 they 등)은 밑줄에 넣지 않는다.
  - 나머지 넷도 수능에 자주 나오는 다른 포인트(수일치, 준동사, 관계사, 태, 형용사/부사 등)로 골라 풀이할 가치가 있게 한다.
  - 밑줄 친 말만 바꿔서 고칠 수 있어야 하고, `fix`에 고친 말을 쓴다.
  - 정답 번호가 한쪽에 몰리지 않게 1~5를 고루 쓴다.
- **네모형** `[A:앞|뒤]` `[B:앞|뒤]` `[C:앞|뒤]`
  - 네모마다 맞는 것은 정확히 하나, 다른 하나는 분명히 틀린 것. 세 네모는 서로 다른 문장에 둔다.
  - 맞는 쪽이 늘 앞이거나 늘 뒤가 되지 않게 섞는다. 보기 다섯 줄은 화면이 알아서 만든다.
- **풀이(why)**: 해요체 1~3문장, 꾸밈 없는 글(마크다운·중괄호 ✕). 주어가 무엇인지, 절이 몇 개인지처럼 판단 순서를 구체적으로 쓴다. 틀린 곳은 왜 틀렸고 어떻게 고치는지 쓴다. 필요하면 '진짜 동사 개수 = 접속사·관계사 개수 + 1'을 불러낸다.
- **해석(ko)**: 바르게 고친 지문 전체의 자연스러운 우리말 해석.
- 지문 안에 큰따옴표를 쓰지 않는다(대화는 작은따옴표). 문자열은 TS 큰따옴표 문자열이다.
- 다 쓰면 채점자처럼 다시 읽는다: 틀린 곳이 정말 하나뿐인지, 다른 밑줄을 틀렸다고 볼 여지는 없는지, 정답·고친 말·풀이가 서로 맞는지.

### 검사

```bash
npx vitest run tests/suneung.test.ts   # 모양·문제 수·정답 분포·단원 연결
node scripts/check-mdx.mjs content/lessons/suneung/<단원>.mdx   # MDX 문법
```
