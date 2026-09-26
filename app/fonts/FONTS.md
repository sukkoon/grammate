# 글꼴 출처와 라이선스

| 파일 | 글꼴 | 출처 | 라이선스 |
|---|---|---|---|
| GrammarangKo-Regular/Bold/ExtraBold.woff2 | Grammarang Ko: 나눔스퀘어 ac (Regular, Bold, ExtraBold)를 바탕으로 한 수정본 | 네이버 한글한글 아름답게 (https://hangeul.naver.com) 나눔스퀘어 ac | SIL Open Font License 1.1 (`OFL-Korean.txt`) |
| Changa-Regular-latin.woff2 | Changa Regular (라틴 서브셋) | Google Fonts (https://fonts.google.com/specimen/Changa) 가변 글꼴에서 굵기 400만 뽑아냄 | SIL Open Font License 1.1 (`OFL-Changa.txt`) |

## 지키는 조건

- 두 글꼴 모두 SIL OFL 1.1이라 **서비스·앱에 넣어 상업적으로 써도 된다.** 글꼴 파일 자체를 따로 파는 것만 안 된다.
- 글꼴 파일과 함께 **저작권 표시와 라이선스 전문**을 둔다: 이 폴더의 `OFL-Korean.txt`, `OFL-Changa.txt`.
- 나눔 글꼴 라이선스에는 **예약 글꼴 이름**(Nanum, NanumSquareNeo 등)이 있다. 자주 쓰는 글자만 담아 줄인 파일은 '수정본'이라 이 이름을 쓸 수 없어서, 글꼴 안의 이름을 **Grammarang Ko(그래머랑 한글)** 로 바꿨다. 글자 모양은 그대로이고, 네이버의 저작권 표시는 글꼴 안에 남겨 두었다.
- Changa 라이선스에는 예약 이름이 없어서 이름을 그대로 쓴다.
- 글꼴 파일을 새로 바꾸거나 더할 때도 같은 조건을 지킨다 (예약 이름이 있는 글꼴을 줄이거나 고치면 이름을 바꾼다).

## 참고

- 한글 파일에는 자주 쓰는 한글 2,479자가 들어 있다. 드문 글자는 시스템 글꼴로 대신 보인다.
- 영문은 볼드체를 쓰지 않는다. 굵게 표시한 곳도 영문은 보통 굵기로, 한글만 굵게 보인다.
- Changa는 한글 글꼴과 글자 크기가 비슷해 보이도록 112%로 키워서 쓴다(`app/fonts.ts`의 size-adjust).
