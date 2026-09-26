import type { SuneungTopic } from "./types";

const topic: SuneungTopic = {
  id: "prep-conj",
  title: "전치사 vs 접속사",
  items: [
    {
      id: "pc-1",
      kind: "underline",
      passage:
        "Camels [1:are] well known for surviving in the desert for days without water. Many people believe this is [2:because of] their humps are full of water, but the humps actually store fat. When food is scarce, a camel's body turns this fat into energy. Camels also lose water very slowly, and when they finally find water, they can drink [3:as much as] 100 liters in about ten minutes. Their fur blocks the sun's heat, [4:helping] them stay cool. Such features make camels [5:perfect] for desert life.",
      answer: 2,
      fix: "because",
      why: [
        "주어는 Camels(복수)라 are가 맞아요. be well known for는 '~으로 잘 알려져 있다'이고, 전치사 for 뒤라 동명사 surviving이 와요.",
        "뒤에 their humps are full of water라는 주어 + 동사가 있는 절이 와요. 절 앞에는 접속사가 필요하니 because로 고쳐야 해요. because of 뒤에는 명사(구)만 와요.",
        "as much as + 양은 '~만큼이나'라는 뜻이에요. 마시는 물의 양을 말하니 much가 맞아요.",
        "앞 절 뒤에 이어지는 분사구문이에요. 털이 낙타를 시원하게 지내도록 '돕는' 능동 관계라 현재분사 helping이 맞고, help + 목적어 + 동사원형으로 them stay가 이어져요.",
        "make + 목적어 + 목적격보어 구조예요. 목적어 camels의 상태를 말하는 자리라 형용사 perfect가 맞아요. 부사 perfectly는 보어가 될 수 없어요.",
      ],
      ko: "낙타는 물 없이 사막에서 며칠 동안 살아남는 것으로 잘 알려져 있다. 많은 사람은 그것이 혹에 물이 가득 차 있기 때문이라고 믿지만, 혹에는 사실 지방이 저장되어 있다. 먹이가 부족하면 낙타의 몸은 이 지방을 에너지로 바꾼다. 낙타는 또 물을 아주 천천히 잃고, 마침내 물을 찾으면 10분쯤 만에 100리터나 마실 수 있다. 털은 햇볕의 열을 막아 낙타가 시원하게 지내도록 돕는다. 이런 특징들 덕분에 낙타는 사막 생활에 꼭 알맞다.",
    },
    {
      id: "pc-2",
      kind: "underline",
      passage:
        "The first public libraries in many towns were small and [1:poorly] equipped. Many had only a few hundred books, and at some of them, visitors [2:were not allowed] to take the books home. Still, the number of visitors [3:was] surprisingly large. [4:Despite] many of them worked long hours in factories, they came to the library in the evenings. For these readers, the library was a place [5:where] they could learn for free.",
      answer: 4,
      fix: "Although",
      why: [
        "과거분사 equipped를 꾸미는 자리라 부사 poorly가 맞아요. poorly equipped가 and 앞의 small과 함께 were의 보어 역할을 해요.",
        "방문객은 책을 가져가도록 허락받지 못한 쪽이라 수동태 were not allowed가 맞아요. allow + 목적어 + to부정사가 수동태가 되어 뒤에 to take가 이어져요.",
        "the number of + 복수 명사는 '~의 수'라서 주어의 핵심은 number(단수)예요. 그래서 was가 맞아요.",
        "뒤에 many of them worked라는 주어 + 동사가 있는 절이 와요. 전치사 Despite는 명사(구) 앞에만 쓰므로 접속사 Although(또는 Though)로 고쳐야 해요.",
        "선행사 a place 뒤에 they could learn for free라는 완전한 절이 와요. 그래서 관계부사 where가 맞아요.",
      ],
      ko: "여러 도시의 초기 공공 도서관은 작고 시설도 변변치 않았다. 책이 몇백 권뿐인 곳이 많았고, 어떤 곳에서는 방문객이 책을 집에 가져갈 수 없었다. 그런데도 방문객 수는 놀랄 만큼 많았다. 그들 가운데 많은 사람이 공장에서 오랜 시간 일했지만 저녁이면 도서관에 왔다. 이 독자들에게 도서관은 무료로 배울 수 있는 곳이었다.",
    },
    {
      id: "pc-3",
      kind: "underline",
      passage:
        "[1:During] Percy Spencer was testing radar equipment in 1945, he noticed that a chocolate bar in his pocket had melted. Curious, he placed some corn kernels near the machine, and they soon [2:popped] into popcorn. This discovery led to the first microwave oven, which was [3:so] big that it stood about as tall as an adult. [4:Because of] its high price, it was used mainly in restaurants and on ships. Today, however, many families use a microwave oven for [5:heating] food in minutes.",
      answer: 1,
      fix: "While",
      why: [
        "뒤에 Percy Spencer was testing이라는 주어 + 동사가 있는 절이 와요. During은 전치사라 뒤에 명사(구)만 오니 접속사 While로 고쳐야 해요.",
        "and 뒤 절의 주어는 they(옥수수 알갱이들)예요. pop은 '펑 하고 터지다'라는 뜻의 자동사로 쓰였고, 과거의 일이라 popped가 맞아요.",
        "so + 형용사 + that ~은 '너무 ~해서 …하다'라는 뜻이에요. 뒤에 that절이 이어지므로 so가 맞아요.",
        "뒤에 its high price라는 명사구만 오고 동사가 없어요. 명사(구) 앞이라 전치사 Because of가 맞아요.",
        "전치사 for 뒤에는 명사나 동명사가 와요. 뒤에 목적어 food가 있으니 동명사 heating이 맞아요.",
      ],
      ko: "1945년 퍼시 스펜서는 레이더 장비를 시험하던 중 주머니 속 초코바가 녹은 것을 알아차렸다. 궁금해진 그는 옥수수 알갱이 몇 개를 기계 근처에 두었고, 알갱이들은 곧 펑 터져 팝콘이 되었다. 이 발견은 최초의 전자레인지로 이어졌는데, 그것은 너무 커서 높이가 어른 키만 했다. 값이 비쌌기 때문에 그것은 주로 식당과 배에서 쓰였다. 하지만 오늘날에는 많은 가정이 몇 분 만에 음식을 데우는 데 전자레인지를 쓴다.",
    },
    {
      id: "pc-4",
      kind: "underline",
      passage:
        "Saving energy at home does not have to be difficult. [1:Although] many people think they need expensive equipment, small changes can make a big difference. For example, a computer left on standby still [2:uses] some electricity. Unplugging devices that are not [3:being used] is one easy step. Families can also lower their bills [4:simply] by [5:turn] down the heating a little.",
      answer: 5,
      fix: "turning",
      why: [
        "뒤에 many people think라는 주어 + 동사가 오므로 접속사 Although가 맞아요. 뜻이 비슷한 Despite였다면 뒤에 명사(구)가 와야 해요.",
        "주어는 a computer(단수)예요. left on standby는 computer를 꾸미는 과거분사구라 괄호를 치면 a computer uses가 돼요.",
        "기기는 사용되는 쪽이라 수동이고, 지금 쓰이고 있지 않다는 진행의 뜻이라 수동 진행형 being used가 맞아요.",
        "뒤의 by ~ 전체를 꾸며 '단지 ~만으로'라는 뜻을 더하는 자리라 부사 simply가 맞아요.",
        "by는 전치사라 뒤에 동사원형이 올 수 없어요. 동명사 turning으로 고쳐 by + 동명사(~함으로써)로 써야 해요.",
      ],
      ko: "집에서 에너지를 아끼는 일이 어려울 필요는 없다. 많은 사람이 비싼 장비가 필요하다고 생각하지만, 작은 변화도 큰 차이를 만들 수 있다. 예를 들어 대기 상태로 둔 컴퓨터도 여전히 전기를 조금 쓴다. 쓰지 않는 기기의 플러그를 뽑는 것이 한 가지 쉬운 방법이다. 가정에서는 난방 온도를 조금만 낮춰도 요금을 줄일 수 있다.",
    },
    {
      id: "pc-5",
      kind: "underline",
      passage:
        "Crows are among the cleverest birds in the world. In some cities, they drop nuts onto roads so that passing cars will crack the shells, [1:which] saves the birds a lot of work. Other crows have been seen [2:using] sticks to pull insects out of holes in trees. Researchers are especially interested in crows [3:because] their remarkable memory. A crow that [4:has been harmed] by a person can recognize that person's face years later. Such behavior shows that a small brain can be [5:surprisingly] powerful.",
      answer: 3,
      fix: "because of",
      why: [
        "쉼표 뒤 which가 앞 절 전체(차가 껍데기를 깨도록 도로에 견과를 떨어뜨리는 것)를 받고, 뒤에 saves의 주어가 비어 있어요. 앞 내용 전체를 받는 계속적 용법이라 that이 아니라 which를 써요.",
        "지각동사 see의 수동태 뒤에는 현재분사나 to부정사가 와요. 까마귀가 나뭇가지를 '쓰는' 능동의 동작이고 뒤에 목적어 sticks가 있으니 using이 맞아요.",
        "뒤에 their remarkable memory라는 명사구만 있고 동사가 없어요. 명사구 앞에는 전치사가 필요하니 because of로 고쳐야 해요.",
        "that은 A crow를 꾸미는 주격 관계대명사예요. 까마귀는 사람에게 '해를 입은' 쪽이라 수동태 has been harmed가 맞고, 뒤의 by a person도 수동임을 알려 줘요. 문장의 진짜 동사는 can recognize예요.",
        "be동사 뒤의 형용사 보어 powerful을 꾸미는 자리라 부사 surprisingly가 맞아요. '놀라울 만큼'이라는 정도를 더해 줘요.",
      ],
      ko: "까마귀는 세상에서 가장 영리한 새에 속한다. 몇몇 도시에서 까마귀는 지나가는 차가 껍데기를 깨도록 도로에 견과를 떨어뜨리는데, 이 덕분에 수고를 크게 던다. 나뭇가지로 나무 구멍 속 벌레를 끄집어내는 모습이 관찰된 까마귀들도 있다. 연구자들은 특히 까마귀의 놀라운 기억력 때문에 까마귀에 관심을 가진다. 사람에게 해를 입은 까마귀는 몇 년이 지나도 그 사람의 얼굴을 알아볼 수 있다. 이런 행동은 작은 뇌도 놀라울 만큼 뛰어날 수 있음을 보여 준다.",
    },
    {
      id: "pc-6",
      kind: "box",
      passage:
        "Our school held its annual festival last weekend. [A:During|While] the festival, students ran food stalls and performed on stage. [B:Although|Despite] the heavy rain on the first day, more than a thousand visitors came. The festival committee was especially pleased [C:because|because of] the students had prepared everything by themselves. Next year, the festival will last three days instead of two, and more clubs plan to take part.",
      answer: [0, 1, 0],
      why: [
        "뒤에 the festival이라는 명사구만 오고 동사가 없어요. 명사(구) 앞이라 전치사 During이 맞아요. While 뒤에는 주어 + 동사가 와요.",
        "뒤에 the heavy rain on the first day라는 명사구가 오므로 전치사 Despite가 맞아요. Although는 접속사라 뒤에 절이 와야 해요.",
        "뒤에 the students had prepared라는 주어 + 동사가 있는 절이 와요. 그래서 접속사 because가 맞아요.",
      ],
      ko: "우리 학교는 지난 주말에 해마다 여는 축제를 열었다. 축제 기간에 학생들은 음식 부스를 운영하고 무대에서 공연을 했다. 첫날 폭우가 쏟아졌는데도 천 명이 넘는 방문객이 왔다. 축제 위원회는 학생들이 모든 것을 스스로 준비했다는 점에 특히 기뻐했다. 내년에는 축제가 이틀이 아니라 사흘 동안 열리고, 더 많은 동아리가 참여할 계획이다.",
    },
    {
      id: "pc-7",
      kind: "box",
      passage:
        "Many sea turtles now struggle to survive [A:because|due to] plastic pollution. Plastic in the ocean breaks into smaller pieces, but it never fully disappears. [B:While|During] turtles are searching for food, they often mistake floating plastic bags for jellyfish. Volunteers in some coastal towns help by [C:collecting|collect] trash from beaches every weekend. Others ask local shops to stop handing out plastic bags. Even small actions like these can help protect these ancient animals.",
      answer: [1, 0, 0],
      why: [
        "뒤에 plastic pollution이라는 명사구만 오므로 전치사 due to가 맞아요. because는 접속사라 뒤에 주어 + 동사가 와야 해요.",
        "뒤에 turtles are searching이라는 주어 + 동사가 있는 절이 와요. 그래서 접속사 While이 맞아요. During은 전치사라 뒤에 명사(구)가 와요.",
        "by는 전치사라 뒤에 동사원형 collect를 쓸 수 없어요. 동명사 collecting이 맞아요.",
      ],
      ko: "오늘날 많은 바다거북이 플라스틱 오염 때문에 살아남기 힘들어한다. 바다에 들어간 플라스틱은 더 작은 조각으로 부서질 뿐 완전히 사라지지 않는다. 거북은 먹이를 찾는 동안 물에 떠다니는 비닐봉지를 해파리로 착각하곤 한다. 몇몇 해안 마을의 자원봉사자들은 주말마다 해변의 쓰레기를 주워 도움을 준다. 동네 가게에 비닐봉지를 나눠 주지 말아 달라고 부탁하는 사람들도 있다. 이런 작은 행동도 이 오래된 동물을 지키는 데 도움이 될 수 있다.",
    },
    {
      id: "pc-8",
      kind: "box",
      passage:
        "[A:Although|In spite of] Sora had never run farther than five kilometers, she signed up for a marathon last spring. At first she felt nervous [B:because of|because] the race was only four months away. However, she improved steadily by [C:follow|following] a training plan that increased her distance little by little. On race day, she crossed the finish line with a big smile, and her family cheered loudly.",
      answer: [0, 1, 1],
      why: [
        "뒤에 Sora had never run ~이라는 주어 + 동사가 있는 절이 와요. 절 앞에는 접속사 Although를 쓰고, In spite of 뒤에는 명사(구)가 와야 해요.",
        "뒤에 the race was only four months away라는 주어 + 동사가 이어져요. 그래서 접속사 because가 맞아요. because of 뒤에는 명사(구)가 와요.",
        "by는 전치사라 뒤에 동사를 쓰려면 동명사로 바꿔야 해요. 그래서 following이 맞아요. by + 동명사는 '~함으로써'라는 뜻이에요.",
      ],
      ko: "소라는 5킬로미터보다 멀리 달려 본 적이 한 번도 없었지만 지난봄 마라톤에 참가 신청을 했다. 처음에는 대회가 넉 달밖에 남지 않아서 긴장했다. 하지만 달리는 거리를 조금씩 늘려 가는 훈련 계획을 따르면서 꾸준히 실력이 늘었다. 대회 날, 그녀는 활짝 웃으며 결승선을 통과했고, 가족들은 큰 소리로 환호했다.",
    },
  ],
};

export default topic;
