import type { SuneungTopic } from "./types";

const topic: SuneungTopic = {
  id: "pro-verb",
  title: "대동사",
  items: [
    {
      id: "pv-1",
      kind: "underline",
      passage:
        "Octopuses are remarkable problem solvers. In laboratory tests, they can open a closed jar to get the food inside, something that many other animals [1:cannot]. Unlike humans, who keep most of their nerve cells in the brain, an octopus [2:do] not; about two thirds of its nerve cells are found in its arms. This allows each arm [3:to react] to its surroundings almost on its own. Scientists who [4:study] these animals believe octopuses could teach us new ways of thinking about intelligence. Few creatures surprise researchers as often as octopuses [5:do].",
      answer: 2,
      fix: "does",
      why: [
        "앞 절의 동사가 조동사 can + open이라 대동사도 조동사를 그대로 받아 cannot이 맞아요. 다른 많은 동물은 그 일을 할 수 없다는 뜻이에요.",
        "앞의 keep은 일반동사라 do로 받지만, 대동사 자리의 주어가 an octopus(단수)예요. 그래서 do를 does로 고쳐야 해요.",
        "allow + 목적어 + to부정사 구조예요. each arm이 반응하는 쪽이라 능동 to react가 맞아요.",
        "관계절 who study these animals의 선행사는 Scientists(복수)라서 study가 맞아요. 문장 전체의 진짜 동사는 believe예요.",
        "surprise researchers를 대신하는 대동사예요. 주어 octopuses가 복수이고 현재 시제라 do가 맞아요.",
      ],
      ko: "문어는 놀라운 문제 해결사이다. 실험실 시험에서 문어는 닫힌 병을 열어 안의 먹이를 꺼낼 수 있는데, 이는 다른 많은 동물이 하지 못하는 일이다. 신경 세포 대부분을 뇌에 두는 사람과 달리 문어는 그렇지 않다. 문어의 신경 세포 가운데 약 3분의 2는 다리에 있다. 이 덕분에 다리 하나하나가 거의 스스로 주변에 반응할 수 있다. 이 동물을 연구하는 과학자들은 문어가 지능에 대해 새롭게 생각하는 방법을 가르쳐 줄 수 있다고 믿는다. 문어만큼 자주 연구자를 놀라게 하는 생물은 거의 없다.",
    },
    {
      id: "pv-2",
      kind: "underline",
      passage:
        "When our school library extended its opening hours, more students [1:began] using it after class. Last semester, it lent out twice as many books as it [2:did] the semester before. The librarian, [3:surprised] by the change, decided to ask students why. Most said the library was quieter than their homes [4:did], so they could focus better. Others explained that they liked having a place [5:where] they could study with friends.",
      answer: 4,
      fix: "were",
      why: [
        "when절 다음 주절의 주어 more students의 진짜 동사예요. 지난 일이라 과거형 began이 맞고, begin 뒤에는 동명사 using이 올 수 있어요.",
        "앞의 lent out은 일반동사 과거형이에요. 이를 대신하는 대동사는 did가 맞아요.",
        "사서는 변화에 '놀란' 쪽이라 과거분사 surprised가 The librarian을 꾸며요. 이 문장의 진짜 동사는 decided예요.",
        "앞 절의 동사는 be동사 was예요(the library was quieter). 비교 대상 their homes(복수)를 받는 대동사도 be동사여야 하니 did를 were로 고쳐야 해요.",
        "a place 뒤의 they could study with friends는 빠진 성분이 없는 완전한 절이에요. 그래서 관계부사 where가 맞아요.",
      ],
      ko: "우리 학교 도서관이 여는 시간을 늘리자 방과 후에 도서관을 이용하는 학생이 늘었다. 지난 학기에 도서관은 그 전 학기보다 두 배나 많은 책을 빌려주었다. 이 변화에 놀란 사서 선생님은 학생들에게 까닭을 물어보기로 했다. 대부분은 도서관이 집보다 조용해서 더 잘 집중할 수 있다고 말했다. 다른 학생들은 친구들과 함께 공부할 수 있는 곳이 있어서 좋다고 설명했다.",
    },
    {
      id: "pv-3",
      kind: "underline",
      passage:
        "Last month, Mina and her brother Joon decided to record how much water they used every day. After a week, Mina found that her showers were much longer than she [1:had thought]. Joon did not turn off the tap while brushing his teeth, and neither [2:did] Mina. So they wrote a simple rule on a note and [3:stuck] it above the bathroom sink. By the end of the month, their family's water bill was lower than it [4:had been] in years. Their parents were pleased, and so [5:did] their grandmother, who had worried about the dry summer.",
      answer: 5,
      fix: "was",
      why: [
        "미나가 알게 된(found) 때보다 그전에 생각하고 있던 때가 앞서니 과거완료 had thought가 맞아요.",
        "앞 절의 did not turn off는 일반동사 과거의 부정이에요. '미나도 안 그랬다'는 neither + did + 주어로 쓰니 did가 맞아요.",
        "and 앞의 짝은 주어 they의 진짜 동사 wrote(과거)예요. stick의 과거형 stuck으로 모양이 맞아요.",
        "그전 여러 해의 요금과 견주는 말이라 과거보다 앞선 때를 나타내는 과거완료 had been이 맞아요. was lower의 be동사를 받는 말이기도 해요.",
        "앞 절의 동사는 be동사 were(were pleased)예요. so 뒤의 대동사도 be동사여야 하고, 주어 their grandmother가 단수라 did를 was로 고쳐야 해요.",
      ],
      ko: "지난달 미나와 준 남매는 날마다 물을 얼마나 쓰는지 기록하기로 했다. 일주일 뒤 미나는 자기 샤워 시간이 생각보다 훨씬 길다는 것을 알게 되었다. 준은 이를 닦는 동안 수도꼭지를 잠그지 않았고, 미나도 마찬가지였다. 그래서 둘은 쪽지에 간단한 규칙을 적어 욕실 세면대 위에 붙였다. 그달 말이 되자 집의 수도 요금은 몇 년 사이 가장 낮았다. 부모님은 기뻐하셨고, 메마른 여름을 걱정하시던 할머니도 기뻐하셨다.",
    },
    {
      id: "pv-4",
      kind: "underline",
      passage:
        "Many people assume that cats are less attached to their owners than dogs [1:do]. However, recent research [2:suggests] otherwise. In one study, many cats that were left alone in an unfamiliar room [3:became] calm as soon as their owners came back. The researchers concluded that cats are not as [4:independent] as they seem. They simply express affection in ways [5:that] are harder for humans to notice.",
      answer: 1,
      fix: "are",
      why: [
        "앞 절의 동사는 be동사 are(cats are less attached)예요. 비교 대상 dogs를 받는 대동사도 be동사여야 하니 do를 are로 고쳐야 해요.",
        "주어는 셀 수 없는 명사 research라 단수 동사 suggests가 맞아요.",
        "주어 many cats를 관계절 that were left alone in an unfamiliar room이 꾸며요. 괄호를 치면 many cats became이고, 지난 연구 이야기라 과거형이 맞아요.",
        "be동사 are의 보어 자리이고 as ~ as 사이에 들어가는 말이라 형용사 independent가 맞아요.",
        "ways를 꾸미는 관계절에서 are의 주어가 비어 있어요. 그래서 주격 관계대명사 that이 맞아요.",
      ],
      ko: "많은 사람은 고양이가 개보다 주인에게 덜 애착을 느낀다고 생각한다. 하지만 최근 연구는 그렇지 않다고 말한다. 한 연구에서 낯선 방에 혼자 남겨진 고양이 가운데 많은 수가 주인이 돌아오자마자 차분해졌다. 연구자들은 고양이가 보이는 것만큼 독립적이지 않다고 결론지었다. 고양이는 그저 사람이 알아차리기 더 어려운 방식으로 애정을 표현할 뿐이다.",
    },
    {
      id: "pv-5",
      kind: "underline",
      passage:
        "Smartphones have changed daily life more quickly than almost any other invention [1:has]. Thirty years ago, few people carried a device that [2:could] take photos, play music, and show maps. Today, paper maps have mostly been replaced by apps, and so [3:did] printed travel guides. Some experts worry that people now [4:depend] on their phones too much. Others argue that phones simply do what notebooks and maps once [5:did], only faster.",
      answer: 3,
      fix: "have",
      why: [
        "앞의 have changed를 받는 대동사예요. 주어 any other invention이 단수라 has가 맞아요.",
        "30년 전의 일이라 과거형 조동사 could가 맞아요. that은 a device를 꾸미는 주격 관계대명사예요.",
        "앞 절의 동사는 현재완료 수동태 have been replaced예요. did로는 been replaced를 받을 수 없고, 완료의 have를 그대로 받아야 해요. 주어 printed travel guides가 복수라 did를 have로 고쳐야 해요.",
        "that절의 주어는 people(복수)이고 지금(now)의 일이라 depend가 맞아요.",
        "노트와 지도가 예전에(once) 하던 일을 말하니 일반동사 과거를 받는 대동사 did가 맞아요.",
      ],
      ko: "스마트폰은 거의 어떤 다른 발명품보다도 빠르게 일상을 바꾸어 놓았다. 30년 전에는 사진을 찍고, 음악을 틀고, 지도를 보여 주는 기기를 가지고 다니는 사람이 거의 없었다. 오늘날 종이 지도는 대부분 앱으로 바뀌었고, 인쇄된 여행 안내서도 마찬가지이다. 몇몇 전문가는 사람들이 이제 휴대폰에 너무 많이 기댄다고 걱정한다. 다른 사람들은 휴대폰이 예전에 노트와 지도가 하던 일을 더 빠르게 할 뿐이라고 주장한다.",
    },
    {
      id: "pv-6",
      kind: "box",
      passage:
        "My grandparents live in a small village by the sea. My grandfather walks along the beach every morning, and so [A:does|is] my grandmother. They are both over eighty, but they are more active than most people half their age [B:do|are]. My grandfather never skips breakfast, and neither [C:do|does] she. They say simple habits like these keep them healthy. I hope I will be as healthy as they are when I reach their age.",
      answer: [0, 1, 1],
      why: [
        "앞 절의 walks는 일반동사 현재이고, 대동사 자리의 주어 my grandmother가 단수라 does가 맞아요.",
        "앞 절의 동사는 be동사 are(they are more active)예요. 비교 대상 most people을 받는 대동사도 be동사라 are가 맞아요.",
        "앞 절의 skips는 일반동사 현재예요. neither 뒤의 주어 she가 단수라 does가 맞아요.",
      ],
      ko: "우리 할아버지 할머니는 바닷가의 작은 마을에 사신다. 할아버지는 매일 아침 해변을 따라 걸으시고, 할머니도 그러신다. 두 분 모두 여든이 넘으셨지만 나이가 절반인 대부분의 사람보다 더 활동적이시다. 할아버지는 아침을 절대 거르지 않으시고, 할머니도 마찬가지이다. 두 분은 이런 단순한 습관이 건강을 지켜 준다고 말씀하신다. 나도 그 나이가 되었을 때 두 분만큼 건강하면 좋겠다.",
    },
    {
      id: "pv-7",
      kind: "box",
      passage:
        "Before email and text messages, people wrote far more letters than they [A:do|are] today. My grandmother has kept every letter she received as a young woman, and so [B:has|have] my grandfather. Last winter, they let me read some of them. I realized that handwritten words carry feelings that short text messages rarely [C:does|do]. Maybe that is why they have kept those letters for so long.",
      answer: [0, 0, 1],
      why: [
        "앞 절의 wrote는 일반동사예요. 오늘날(today)의 일이고 주어 they가 복수라 do가 맞아요.",
        "앞 절의 동사는 현재완료 has kept예요. 완료의 have는 그대로 받고, 주어 my grandfather가 단수라 has가 맞아요.",
        "관계절 안에서 carry를 대신하는 대동사예요. 주어 short text messages가 복수라 do가 맞아요.",
      ],
      ko: "이메일과 문자 메시지가 생기기 전에는 사람들이 오늘날보다 훨씬 많은 편지를 썼다. 할머니는 젊은 시절 받은 편지를 모두 간직하고 계시고, 할아버지도 그러시다. 지난겨울 두 분은 그 가운데 몇 통을 내게 읽게 해 주셨다. 나는 손으로 쓴 글이 짧은 문자 메시지에는 좀처럼 담기지 않는 마음을 담고 있다는 것을 깨달았다. 아마 그래서 두 분이 그 편지들을 그토록 오래 간직해 오셨을 것이다.",
    },
    {
      id: "pv-8",
      kind: "box",
      passage:
        "Large animals often sleep far less than small ones. Elephants in the wild sleep only about two hours a night, much less than most other mammals [A:are|do]. A horse sleeps a little more than an elephant [B:does|do], but still only about three hours a day. Some small bats, by contrast, sleep nearly twenty hours a day. Scientists think animals that spend many hours eating have less time to rest than those that [C:doesn't|don't].",
      answer: [1, 0, 1],
      why: [
        "앞 절의 sleep은 일반동사예요. 비교 대상 most other mammals가 복수이고 현재라 do가 맞아요.",
        "앞 절의 sleeps를 받는 대동사예요. 주어 an elephant가 단수라 does가 맞아요.",
        "관계절의 spend many hours eating을 받는 대동사예요. 선행사 those가 복수라 don't가 맞아요.",
      ],
      ko: "큰 동물은 작은 동물보다 훨씬 적게 자는 경우가 많다. 야생 코끼리는 하룻밤에 두 시간 정도만 자는데, 이는 다른 대부분의 포유동물보다 훨씬 적다. 말은 코끼리보다 조금 더 자지만, 그래도 하루에 세 시간 정도밖에 자지 않는다. 반대로 어떤 작은 박쥐는 하루에 거의 스무 시간을 잔다. 과학자들은 먹는 데 많은 시간을 쓰는 동물이 그렇지 않은 동물보다 쉴 시간이 적다고 생각한다.",
    },
  ],
};

export default topic;
