import type { SuneungTopic } from "./types";

const topic: SuneungTopic = {
  id: "verb-verbal",
  title: "동사 vs 준동사",
  items: [
    {
      id: "vv-1",
      kind: "underline",
      passage:
        "Many students put off their homework until the last minute, even when they know it [1:causes] stress. Psychologists who [2:study] this habit say it is not simply a matter of laziness. Instead, people tend to delay tasks that [3:seem] boring or difficult. Starting with just five minutes of work [4:making] a big task feel much less frightening. Once you have started, continuing usually feels much [5:easier] than you expected.",
      answer: 4,
      fix: "makes",
      why: [
        "know 뒤에 접속사 that이 생략된 명사절이 와요. 그 절의 주어 it(마지막까지 미루는 것)에게 진짜 동사가 필요하고, 단수 주어라 causes가 맞아요.",
        "who는 관계대명사이고 선행사는 Psychologists(복수)예요. 관계절에도 진짜 동사가 필요하니 study가 맞고, 문장의 진짜 동사는 say예요.",
        "that은 tasks를 꾸미는 관계대명사라 관계절에 진짜 동사가 필요해요. 선행사 tasks가 복수라 seem이 맞고, seem 뒤에는 형용사 보어 boring or difficult가 와요.",
        "이 문장에는 접속사가 없으니 진짜 동사가 하나 있어야 하는데, 하나도 없어요. 주어 Starting with just five minutes of work는 동명사구라 단수로 받으니 making을 makes로 고쳐야 해요.",
        "feel은 형용사를 보어로 갖는 감각동사예요. 그래서 비교급 형용사 easier가 맞고, much는 비교급을 강조해요.",
      ],
      ko: "많은 학생이 숙제를 마지막 순간까지 미루는데, 그러면 스트레스를 받는다는 것을 알 때조차 그렇다. 이 습관을 연구하는 심리학자들은 그것이 단순히 게으름의 문제가 아니라고 말한다. 오히려 사람들은 지루하거나 어려워 보이는 일을 미루는 경향이 있다. 딱 5분만 공부하는 것으로 시작하면 큰 과제가 훨씬 덜 무섭게 느껴진다. 일단 시작하고 나면 계속하는 것은 대개 생각했던 것보다 훨씬 쉽게 느껴진다.",
    },
    {
      id: "vv-2",
      kind: "underline",
      passage:
        "About five thousand years ago, the ancient Egyptians [1:learned] to make a kind of paper from a tall plant [2:grew] along the Nile River. Workers cut the stems into thin strips and [3:laid] them side by side. The strips were then pressed together and [4:left] to dry in the sun. This paper, called papyrus, lasts so long in dry places that some ancient sheets [5:have survived] to this day.",
      answer: 2,
      fix: "growing",
      why: [
        "문장의 주어 the ancient Egyptians에게 진짜 동사가 필요해요. learn은 to부정사를 목적어로 써서 learned to make가 맞아요.",
        "이 문장에는 접속사나 관계사가 없어서 진짜 동사는 learned 하나뿐이에요. grew는 진짜 동사를 하나 더 만든 것이라, a tall plant를 꾸미는 현재분사 growing으로 고쳐야 해요.",
        "and가 cut과 laid를 이어 주는 병렬 구조예요. '~을 놓다'는 타동사 lay(laid-laid)이고 뒤에 목적어 them이 있으니 laid가 맞아요.",
        "and가 were 뒤의 pressed와 left를 이어 줘요. 조각들은 말리도록 '놓아두어지는' 쪽이라 과거분사 left가 맞아요.",
        "to this day(오늘날까지)는 과거부터 지금까지 이어진 일을 나타내니 현재완료가 알맞아요. that절의 주어 some ancient sheets가 복수라 have survived가 맞아요.",
      ],
      ko: "약 5천 년 전 고대 이집트인들은 나일강을 따라 자라는 키 큰 식물로 일종의 종이를 만드는 법을 익혔다. 일꾼들은 줄기를 얇은 조각으로 잘라 나란히 놓았다. 그런 다음 조각들을 눌러 붙이고 햇볕에 말리도록 두었다. 파피루스라고 불리는 이 종이는 건조한 곳에서 아주 오래가서 고대의 종이 몇 장은 오늘날까지 남아 있다.",
    },
    {
      id: "vv-3",
      kind: "underline",
      passage:
        "Learning to play a musical instrument [1:takes] patience. When beginners practice, they often feel [2:frustrated] because their fingers will not move as quickly as they would like. Teachers suggest [3:breaking] a difficult piece into small parts. A student who [4:masters] one short part each day can soon play the whole piece. Over time, the brain [5:forming] new connections that make movements smoother and faster.",
      answer: 5,
      fix: "forms",
      why: [
        "주어는 동명사구 Learning to play a musical instrument예요. 동명사 주어는 단수로 받으니 takes가 맞아요.",
        "feel은 형용사를 보어로 갖는 동사예요. 초보자들이 좌절감을 '느끼게 되는' 쪽이라 과거분사 frustrated가 맞아요.",
        "suggest는 동명사를 목적어로 써요. 그래서 breaking이 맞아요.",
        "who는 A student를 꾸미는 관계대명사라 관계절에 진짜 동사가 필요해요. 선행사가 단수라 masters가 맞고, 문장 전체의 진짜 동사는 can play예요.",
        "관계사 that이 하나 있으니 진짜 동사는 두 개여야 해요. make는 관계절의 동사이고 주어 the brain의 동사가 없으니, forming을 forms로 고쳐야 해요.",
      ],
      ko: "악기 연주를 배우려면 인내심이 필요하다. 초보자들은 연습할 때 손가락이 바라는 만큼 빨리 움직이지 않아서 자주 좌절감을 느낀다. 선생님들은 어려운 곡을 작은 부분으로 나누어 보라고 권한다. 날마다 짧은 부분 하나를 익히는 학생은 곧 곡 전체를 연주할 수 있다. 시간이 지나면서 뇌는 동작을 더 부드럽고 빠르게 만드는 새로운 연결을 만든다.",
    },
    {
      id: "vv-4",
      kind: "underline",
      passage:
        "The belief that lightning never strikes the same place twice [1:being] widely held, but it is simply wrong. Tall buildings are hit again and again because lightning tends [2:to travel] along the easiest path to the ground. The Empire State Building in New York, for example, [3:is struck] about twenty times a year. For this reason, most tall buildings have metal rods that [4:carry] electricity safely into the earth. Knowing this, people caught outside in a storm should avoid [5:standing] near tall trees.",
      answer: 1,
      fix: "is",
      why: [
        "that은 The belief의 내용을 설명하는 동격절의 접속사이고 but도 접속사라, 진짜 동사는 strikes, is, is 세 개여야 해요. 주어 The belief의 동사가 없으니 being을 is로 고쳐야 해요.",
        "tend는 to부정사와 함께 '~하는 경향이 있다'라는 뜻이 돼요. 그래서 to travel이 맞아요.",
        "빌딩은 번개에 '맞는' 쪽이라 수동태 is struck가 맞아요. 주어 The Empire State Building이 단수라 is를 써요.",
        "that은 metal rods를 꾸미는 관계대명사예요. 선행사가 복수이고 막대가 전기를 '흘려보내는' 쪽이라 능동 carry가 맞아요.",
        "avoid는 동명사를 목적어로 써요. 그래서 standing이 맞아요.",
      ],
      ko: "번개가 같은 곳에 두 번 치지 않는다는 믿음은 널리 퍼져 있지만, 그것은 그냥 틀린 말이다. 번개는 땅으로 가는 가장 쉬운 길을 따라 흐르는 경향이 있어서 높은 건물은 거듭해서 번개를 맞는다. 예를 들어 뉴욕의 엠파이어스테이트 빌딩은 1년에 약 20번 번개를 맞는다. 이런 까닭에 대부분의 높은 건물에는 전기를 안전하게 땅속으로 흘려보내는 금속 막대가 있다. 이 사실을 안다면 폭풍우 속에 밖에 있게 된 사람은 키 큰 나무 근처에 서 있지 말아야 한다.",
    },
    {
      id: "vv-5",
      kind: "underline",
      passage:
        "In many cities around the world, more and more people [1:choose] bicycles over cars for short trips. Cycling to work not only saves money but also [2:keeps] riders healthy. A survey [3:conducts] last year found that people who cycle to work [4:feel] less stressed than those who drive. For these reasons, many cities are now building lanes where cyclists can ride [5:safely].",
      answer: 3,
      fix: "conducted",
      why: [
        "주어는 more and more people(복수)이고 이 문장의 진짜 동사 자리예요. 그래서 choose가 맞아요.",
        "not only A but also B가 saves와 keeps를 이어 주는 병렬 구조예요. 주어 Cycling to work는 동명사구라 단수로 받으니 keeps가 맞고, keep 뒤에는 목적어와 형용사 보어 healthy가 와요.",
        "접속사·관계사가 that, who, who 세 개라 진짜 동사는 found, cycle, feel, drive 네 개면 충분해요. conducts는 남는 동사라, A survey를 꾸미는 과거분사 conducted(실시된)로 고쳐야 해요.",
        "that절의 주어는 people(복수)이고 who cycle to work는 관계절이에요. 그래서 feel이 맞고, 사람들이 스트레스를 '받는' 쪽이라 보어는 stressed예요.",
        "동사 ride를 꾸미는 자리라 부사 safely가 맞아요.",
      ],
      ko: "세계의 많은 도시에서 점점 더 많은 사람이 짧은 거리를 갈 때 자동차 대신 자전거를 고른다. 자전거로 출근하면 돈을 아낄 뿐만 아니라 타는 사람을 건강하게 해 준다. 작년에 실시된 한 조사에서는 자전거로 출근하는 사람들이 차로 출근하는 사람들보다 스트레스를 덜 느낀다는 것이 밝혀졌다. 이런 이유로 지금 많은 도시가 자전거 타는 사람이 안전하게 달릴 수 있는 길을 만들고 있다.",
    },
    {
      id: "vv-6",
      kind: "box",
      passage:
        "Every Saturday, several students from our school [A:walk|walking] the dogs at a small animal shelter nearby. The shelter, which [B:takes|taking] care of more than fifty animals, cannot run without such help. Many of the dogs were found on the streets, so they need time to trust people again. Anyone [C:wants|wanting] to join the volunteers can sign up at the school office.",
      answer: [0, 0, 1],
      why: [
        "이 문장에는 접속사가 없어서 진짜 동사가 하나 필요한데, 다른 동사가 없어요. 주어 several students의 진짜 동사로 walk(산책시키다)를 써야 해요.",
        "which는 관계대명사라 관계절 안에 진짜 동사가 있어야 해요. 선행사 The shelter가 단수라 takes가 맞고, 문장의 진짜 동사는 cannot run이에요.",
        "접속사가 없으니 진짜 동사는 can sign up 하나뿐이에요. 그래서 Anyone을 꾸미는 현재분사 wanting이 맞아요.",
      ],
      ko: "매주 토요일 우리 학교 학생 몇 명이 근처의 작은 동물 보호소에서 개들을 산책시킨다. 50마리가 넘는 동물을 돌보는 그 보호소는 이런 도움 없이는 운영될 수 없다. 개들 중 다수는 길에서 발견되어서 사람을 다시 믿기까지 시간이 필요하다. 자원봉사자들과 함께하고 싶은 사람은 누구나 학교 교무실에서 신청할 수 있다.",
    },
    {
      id: "vv-7",
      kind: "box",
      passage:
        "Octopuses are famous for their ability [A:change|to change] the color of their skin in less than a second. Special cells just under the skin [B:containing|contain] tiny sacs of colored material. When an octopus [C:senses|sensing] danger, it expands or shrinks these sacs to match the rocks and plants around it. Scientists are still trying to understand how an animal that cannot see colors well manages such a trick.",
      answer: [1, 1, 0],
      why: [
        "앞에 이미 진짜 동사 are가 있고 접속사가 없어서 진짜 동사를 또 쓸 수 없어요. 명사 ability를 뒤에서 꾸미는 to부정사 to change가 맞아요.",
        "이 문장에는 접속사가 없는데 진짜 동사도 없어요. under the skin은 꾸미는 말이니, 주어 Special cells(복수)의 진짜 동사로 contain을 써야 해요.",
        "When은 접속사라 When절에도 진짜 동사가 필요해요. 주어 an octopus가 단수라 senses가 맞고, 주절의 진짜 동사는 expands or shrinks예요.",
      ],
      ko: "문어는 1초도 안 되는 사이에 피부색을 바꾸는 능력으로 유명하다. 피부 바로 밑에 있는 특별한 세포에는 색을 띤 물질이 든 작은 주머니가 들어 있다. 문어는 위험을 느끼면 이 주머니를 늘리거나 줄여서 주위의 바위나 식물과 색을 맞춘다. 과학자들은 색을 잘 보지 못하는 동물이 어떻게 이런 재주를 부리는지 아직도 알아내려 애쓰고 있다.",
    },
    {
      id: "vv-8",
      kind: "box",
      passage:
        "Our school newspaper, [A:first published|was first published] in 1985, is written entirely by students. The editors meet every Monday afternoon [B:decide|to decide] which stories will appear in the next issue. Writing for the paper [C:teaches|teaching] students how to check facts and express ideas clearly. Many former editors say that those Monday meetings were the best part of their school years, even though the deadlines were stressful.",
      answer: [0, 1, 0],
      why: [
        "이 문장의 진짜 동사는 is written이고 접속사가 없어요. 그래서 쉼표 사이의 말은 Our school newspaper를 꾸미는 과거분사구 first published가 되어야 해요.",
        "의문사 which가 이끄는 절까지 있으니 진짜 동사는 meet와 will appear 두 개면 충분해요. '정하려고'라는 목적을 나타내는 to부정사 to decide가 맞아요.",
        "주어는 동명사구 Writing for the paper이고, 이 문장에는 다른 진짜 동사가 없어요. 동명사 주어는 단수로 받으니 teaches가 맞아요.",
      ],
      ko: "1985년에 처음 발행된 우리 학교 신문은 전부 학생들이 쓴다. 편집부원들은 다음 호에 어떤 기사가 실릴지 정하려고 매주 월요일 오후에 모인다. 신문에 글을 쓰면서 학생들은 사실을 꼼꼼히 확인하고 생각을 분명하게 표현하는 법을 배운다. 많은 전 편집부원이 마감은 스트레스였어도 그 월요일 모임이 학창 시절의 가장 좋은 부분이었다고 말한다.",
    },
  ],
};

export default topic;
