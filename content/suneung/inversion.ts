import type { SuneungTopic } from "./types";

const topic: SuneungTopic = {
  id: "inversion",
  title: "도치와 수일치",
  items: [
    {
      id: "iv-1",
      kind: "underline",
      passage:
        "Deep in the forest [1:lies] a quiet lake that few hikers have ever seen. The path to it [2:is] narrow and steep, so most visitors turn back halfway. Those who reach the shore, however, [3:are rewarded] with a remarkable view. On the surface of the water [4:floats] hundreds of white water lilies, and around the edges grow tall reeds that sway in the wind. Rarely [5:does] a place feel so peaceful.",
      answer: 4,
      fix: "float",
      why: [
        "장소 부사구 Deep in the forest가 앞으로 나와 동사가 주어 앞에 섰어요. 진짜 주어 a quiet lake가 단수라 lies가 맞아요.",
        "주어는 The path예요. to it은 꾸미는 전치사구라 괄호를 치면 The path is가 돼요.",
        "주어 Those(복수)를 관계절 who reach the shore가 꾸며요. 사람들이 멋진 경치로 '보상받는' 쪽이라 수동 are rewarded가 맞아요.",
        "장소 부사구 On the surface of the water가 앞으로 나온 도치 문장이에요. 진짜 주어는 동사 뒤의 hundreds of white water lilies(복수)이니 floats를 float로 고쳐야 해요.",
        "부정어 Rarely가 앞에 오면 조동사가 주어 앞으로 나가요. 주어 a place가 단수이고 뒤에 원형 feel이 오니 does가 맞아요.",
      ],
      ko: "숲 깊은 곳에 등산객이 거의 본 적 없는 고요한 호수가 있다. 그곳으로 가는 길은 좁고 가팔라서 대부분의 방문객은 중간에 돌아간다. 하지만 호숫가에 닿은 사람들은 놀라운 경치로 보상을 받는다. 물 위에는 흰 수련 수백 송이가 떠 있고, 가장자리에는 바람에 흔들리는 키 큰 갈대가 자란다. 이렇게 평화롭게 느껴지는 곳은 좀처럼 없다.",
    },
    {
      id: "iv-2",
      kind: "underline",
      passage:
        "Never before [1:scientists had] seen such clear images of a distant planet. The images, [2:taken] by a new space telescope, showed thick clouds moving across the planet's surface. Not only [3:did] they reveal the planet's weather, but they also offered clues about the gases in its atmosphere. Researchers say such discoveries [4:help] them understand how planets form. Only by studying many worlds [5:can we] learn how rare planets like Earth really are.",
      answer: 1,
      fix: "had scientists",
      why: [
        "부정어 Never before가 문장 앞에 오면 조동사가 주어 앞으로 나가야 해요. scientists had를 had scientists로 고쳐야 해요.",
        "사진은 망원경에 의해 '찍힌' 쪽이라 과거분사 taken이 맞아요. 이 문장의 진짜 동사는 showed예요.",
        "Not only가 앞에 와서 앞 절이 도치됐어요. 일반동사 reveal의 과거라 did + 주어 + 동사원형 reveal이 맞아요.",
        "주어 such discoveries(복수)의 진짜 동사라 help가 맞아요. help + 목적어 + 동사원형 understand 구조예요.",
        "Only + 부사구(by studying many worlds)가 앞에 오면 조동사 + 주어 순서로 도치해요. 그래서 can we가 맞아요.",
      ],
      ko: "과학자들은 멀리 있는 행성을 이렇게 선명하게 찍은 사진을 본 적이 한 번도 없었다. 새 우주 망원경이 찍은 그 사진들에는 행성 표면을 가로질러 움직이는 두꺼운 구름이 담겨 있었다. 그 사진들은 행성의 날씨를 보여 주었을 뿐 아니라 대기 속 기체에 관한 단서도 주었다. 연구자들은 이런 발견이 행성이 어떻게 생기는지 이해하는 데 도움이 된다고 말한다. 많은 세계를 연구해야만 지구 같은 행성이 실제로 얼마나 드문지 알 수 있다.",
    },
    {
      id: "iv-3",
      kind: "underline",
      passage:
        "On the morning of the school festival, our class was busy [1:preparing] the stage. The decorations [2:were finished], and the costumes hung neatly in the back room. Little [3:did we knew] that a heavy storm was heading toward the town. By noon, strong winds had knocked down the tents outside, [4:forcing] the teachers to move everything indoors. So [5:determined] were the students, however, that the festival started only an hour late.",
      answer: 3,
      fix: "did we know",
      why: [
        "be busy + -ing는 '~하느라 바쁘다'라는 뜻이에요. 그래서 preparing이 맞아요.",
        "장식은 '끝마쳐진' 쪽이라 수동 were finished가 맞아요. 주어 The decorations가 복수라 were예요.",
        "부정어 Little이 앞에 와서 did가 주어 앞으로 나갔어요. 시제는 did가 맡으니 뒤의 동사는 원형이어야 해요. did we knew를 did we know로 고쳐야 해요.",
        "강한 바람이 선생님들에게 짐을 옮기게 '만든' 쪽이라 능동의 분사구문 forcing이 맞아요. 앞 절의 결과를 나타내요.",
        "보어 So determined가 앞으로 나온 도치 문장이에요. were의 보어 자리라 형용사처럼 쓰인 분사 determined가 맞고, 주어 the students가 복수라 were예요.",
      ],
      ko: "학교 축제 날 아침, 우리 반은 무대를 준비하느라 바빴다. 장식은 다 끝났고 의상은 뒷방에 가지런히 걸려 있었다. 거센 폭풍이 마을 쪽으로 오고 있다는 것을 우리는 전혀 몰랐다. 정오가 되자 강한 바람이 바깥의 천막을 쓰러뜨려, 선생님들은 모든 것을 실내로 옮겨야 했다. 하지만 학생들의 의지가 워낙 굳어서 축제는 겨우 한 시간 늦게 시작되었다.",
    },
    {
      id: "iv-4",
      kind: "underline",
      passage:
        "Many people believe that motivation [1:comes] before action. Psychologists, however, have found that the opposite is often [2:true]. Only after we start a task [3:do we] begin to feel interested in it. This is why experts advise people who [4:struggle] with putting things off to begin with one small, easy step. Equally important [5:are] the habit of rewarding yourself after each step.",
      answer: 5,
      fix: "is",
      why: [
        "that절의 주어 motivation은 셀 수 없는 명사라 단수 동사 comes가 맞아요.",
        "is의 보어 자리라 형용사 true가 맞아요.",
        "Only + 부사절(after we start a task)이 앞에 와서 주절이 도치됐어요. 일반동사 begin의 현재라 do + 주어 + 동사원형 순서가 맞아요.",
        "관계절 who struggle ~의 선행사는 people(복수)이라 struggle이 맞아요. advise + 목적어 + to부정사 구조에서 목적어가 people이에요.",
        "보어 Equally important가 앞으로 나온 도치 문장이에요. 진짜 주어는 동사 뒤의 the habit(단수)이니 are를 is로 고쳐야 해요. of rewarding ~은 habit을 꾸미는 말이에요.",
      ],
      ko: "많은 사람은 동기가 행동보다 먼저 온다고 믿는다. 하지만 심리학자들은 그 반대인 경우가 많다는 것을 알아냈다. 우리는 일을 시작하고 나서야 비로소 그 일에 흥미를 느끼기 시작한다. 그래서 전문가들은 일을 미루는 버릇으로 힘들어하는 사람들에게 작고 쉬운 한 걸음부터 시작하라고 조언한다. 한 걸음을 뗄 때마다 스스로에게 보상하는 습관도 똑같이 중요하다.",
    },
    {
      id: "iv-5",
      kind: "underline",
      passage:
        "By the middle of the season, our school's soccer team had lost five games in a row, and so [1:had] the basketball team. The coaches did not blame the players, and neither [2:the players did] blame one another. Instead, both teams began practicing together on Saturday mornings, [3:which] helped them build confidence. Only in the final weeks of the season [4:did] their hard work pay off. Hanging in the school hallway [5:is] a photo of both teams celebrating together.",
      answer: 2,
      fix: "did the players",
      why: [
        "앞 절의 had lost는 과거완료예요. 완료의 had는 그대로 받으니 so + had + 주어가 맞아요.",
        "neither가 앞에 오면 대동사 + 주어 순서로 도치해야 해요. the players did를 did the players로 고쳐야 해요.",
        "앞 절 전체(함께 연습하기 시작한 일)를 받아 설명을 덧붙이는 관계대명사 which예요. 쉼표 뒤라 that은 쓸 수 없어요.",
        "Only + 부사구(in the final weeks of the season)가 앞에 와서 도치됐어요. 일반동사 pay off의 과거라 did + 주어 + 원형 pay가 맞아요.",
        "원래 문장 A photo of both teams celebrating together is hanging in the school hallway.에서 분사구 Hanging ~ hallway가 앞으로 나온 도치예요. 진짜 주어는 동사 뒤의 a photo(단수)라 is가 맞아요.",
      ],
      ko: "시즌 중반까지 우리 학교 축구부는 다섯 경기를 연달아 졌고, 농구부도 마찬가지였다. 코치들은 선수들을 탓하지 않았고, 선수들도 서로를 탓하지 않았다. 그 대신 두 팀은 토요일 아침마다 함께 연습하기 시작했고, 그것이 자신감을 기르는 데 도움이 되었다. 시즌 마지막 몇 주가 되어서야 비로소 그들의 노력이 결실을 보았다. 지금 학교 복도에는 두 팀이 함께 기뻐하는 사진이 걸려 있다.",
    },
    {
      id: "iv-6",
      kind: "box",
      passage:
        "At the top of the hill [A:stands|stand] an old lighthouse that has guided ships for more than a century. Seldom [B:does|do] visitors leave without climbing its narrow stairs. So wide [C:are|is] the view from the top that on clear days you can see three islands. Inside the lighthouse, a small museum shows how the keepers once lived. Many visitors say the view is worth every step.",
      answer: [0, 1, 1],
      why: [
        "장소 부사구 At the top of the hill이 앞으로 나온 도치 문장이에요. 진짜 주어 an old lighthouse가 단수라 stands가 맞아요.",
        "부정어 Seldom이 앞에 와서 조동사가 주어 앞으로 나갔어요. 주어 visitors가 복수이고 뒤에 원형 leave가 오니 do가 맞아요.",
        "보어 So wide가 앞으로 나와 도치됐어요. 진짜 주어는 the view(단수)라 is가 맞아요. from the top은 view를 꾸미는 말이에요.",
      ],
      ko: "언덕 꼭대기에는 백 년 넘게 배들을 이끌어 온 오래된 등대가 서 있다. 방문객들은 좁은 계단을 올라가 보지 않고는 좀처럼 떠나지 않는다. 꼭대기에서 보는 경치가 아주 넓어서 맑은 날에는 섬 세 개가 보인다. 등대 안의 작은 박물관은 등대지기들이 예전에 어떻게 살았는지 보여 준다. 많은 방문객은 그 경치가 계단 하나하나를 오를 만한 가치가 있다고 말한다.",
    },
    {
      id: "iv-7",
      kind: "box",
      passage:
        "Hardly [A:had the concert|the concert had] begun when the lights suddenly went out. Instead of stopping, the band kept playing in complete darkness. Not until the lights came back on [B:the audience realized|did the audience realize] how well the musicians knew their songs. Among the people who stayed until the very end [C:was|were] my younger brother, who still talks about that night. Nobody who was there will ever forget it.",
      answer: [0, 1, 0],
      why: [
        "부정어 Hardly가 앞에 오면 조동사 had가 주어 앞으로 나가요. Hardly + had + 주어 + p.p. ~ when은 '~하자마자'라는 뜻이라 had the concert가 맞아요.",
        "Not until + 부사절이 앞에 오면 주절이 도치돼요. 일반동사 realize의 과거라 did + 주어 + 원형 realize가 맞아요.",
        "부사구 Among ~ end가 앞으로 나온 도치 문장이에요. people은 among 뒤의 명사일 뿐이고, 진짜 주어 my younger brother가 단수라 was가 맞아요.",
      ],
      ko: "공연이 시작되자마자 갑자기 불이 나갔다. 밴드는 멈추지 않고 완전한 어둠 속에서 계속 연주했다. 불이 다시 들어오고 나서야 관객들은 연주자들이 자기 곡을 얼마나 잘 아는지 깨달았다. 끝까지 남은 사람들 가운데에는 내 남동생도 있었는데, 동생은 아직도 그날 밤 이야기를 한다. 그 자리에 있었던 사람은 누구도 그 밤을 잊지 못할 것이다.",
    },
    {
      id: "iv-8",
      kind: "box",
      passage:
        "Only when bees began to disappear from their fields [A:farmers did realize|did farmers realize] how much they depended on them. Bees carry pollen from one flower to another as they feed. Without bees, apple trees cannot produce much fruit, and neither [B:can't|can] almond trees. Today, some farmers rent beehives during the flowering season, and beside many orchards [C:sit|sits] rows of wooden boxes full of bees.",
      answer: [1, 1, 0],
      why: [
        "Only + 부사절(when ~ fields)이 앞에 와서 주절이 도치돼요. 조동사 did가 주어 앞으로 나간 did farmers realize가 맞아요.",
        "neither에 이미 부정의 뜻이 있어서 뒤의 대동사에 not을 붙이지 않아요. 앞 절의 조동사 can을 받아 neither can almond trees가 맞아요.",
        "장소 부사구 beside many orchards가 앞으로 나온 도치 문장이에요. 진짜 주어 rows of wooden boxes의 핵심 명사 rows가 복수라 sit이 맞아요.",
      ],
      ko: "벌이 밭에서 사라지기 시작하고 나서야 농부들은 자신들이 벌에게 얼마나 기대고 있었는지 깨달았다. 벌은 먹이를 먹으면서 꽃가루를 이 꽃에서 저 꽃으로 옮긴다. 벌이 없으면 사과나무는 열매를 많이 맺지 못하고, 아몬드나무도 마찬가지이다. 오늘날 몇몇 농부는 꽃이 피는 철에 벌통을 빌리고, 많은 과수원 옆에는 벌이 가득한 나무 상자가 줄지어 놓여 있다.",
    },
  ],
};

export default topic;
