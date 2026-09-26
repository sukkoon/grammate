import type { SuneungTopic } from "./types";

const topic: SuneungTopic = {
  id: "subject-verb",
  title: "수일치",
  items: [
    {
      id: "sv-1",
      kind: "underline",
      passage:
        "Many students believe that the secret to good grades [1:lies] in studying for long hours. However, research on memory [2:suggests] otherwise. The amount of time you spend at your desk [3:matter] less than how you use it. Students who test themselves regularly [4:remember] more than those who simply reread their notes. Short breaks, [5:taken] between study sessions, also help the brain store new information.",
      answer: 3,
      fix: "matters",
      why: [
        "주어는 the secret(단수)이에요. to good grades는 꾸미는 말이라 괄호를 치면 The secret lies가 돼요.",
        "주어는 research예요. on memory는 꾸미는 전치사구이고, research는 셀 수 없는 명사라 단수 동사 suggests가 맞아요.",
        "주어는 The amount(단수)예요. of time you spend at your desk는 꾸미는 말이에요. 단수 주어에는 matters를 써야 해요.",
        "주어는 Students(복수)예요. who test themselves regularly는 관계절이라 괄호를 치면 Students remember가 돼요.",
        "휴식은 '갖는(취해지는)' 것이라 수동의 과거분사 taken이 breaks를 꾸며요. 이 문장의 진짜 동사는 help이고, 주어 breaks가 복수라 help가 맞아요.",
      ],
      ko: "많은 학생은 좋은 성적의 비결이 오랜 시간 공부하는 데 있다고 믿는다. 하지만 기억에 관한 연구는 다르게 말한다. 책상에 앉아 있는 시간의 양은 그 시간을 어떻게 쓰는지보다 덜 중요하다. 스스로를 꾸준히 시험해 보는 학생은 필기를 그냥 다시 읽는 학생보다 더 많이 기억한다. 공부 사이사이에 갖는 짧은 휴식도 뇌가 새 정보를 저장하도록 돕는다.",
    },
    {
      id: "sv-2",
      kind: "box",
      passage:
        "The number of teenagers who use smartphones before bed [A:has|have] grown quickly in recent years. Doctors warn that screens used late at night [B:keeps|keep] the brain alert, which makes it harder to fall asleep. In our class survey, each of the students [C:was|were] asked how many hours of sleep they get on school nights. More than half of them answered that they usually sleep less than seven hours.",
      answer: [0, 1, 0],
      why: [
        "the number of + 복수 명사는 '~의 수'라서 주어의 핵심은 number(단수)예요. 그래서 has가 맞아요. a number of(많은)였다면 복수 동사를 썼을 거예요.",
        "that절의 주어는 screens(복수)예요. used late at night는 screens를 꾸미는 과거분사구라 괄호를 치면 screens keep이 돼요.",
        "each of the + 복수 명사는 '~ 각각'이라 단수로 받아요. 그래서 was가 맞아요.",
      ],
      ko: "잠들기 전에 스마트폰을 쓰는 십 대의 수가 최근 몇 년 동안 빠르게 늘었다. 의사들은 밤늦게 쓰는 화면이 뇌를 깨어 있게 해서 잠들기 더 어렵게 만든다고 경고한다. 우리 반 설문에서 학생 한 명 한 명이 학교 가는 날 밤에 몇 시간 자는지 질문을 받았다. 절반이 넘는 학생이 보통 일곱 시간도 못 잔다고 답했다.",
    },
    {
      id: "sv-3",
      kind: "underline",
      passage:
        "Growing vegetables in a school garden [1:teach] students more than just farming skills. Children who [2:plant] their own seeds learn to be patient, because nothing happens overnight. They also discover that a single tomato plant [3:needs] water, sunlight, and care every day. Teachers report that students [4:involved] in garden projects eat more vegetables at lunch. Perhaps food that you have grown yourself simply [5:tastes] better.",
      answer: 1,
      fix: "teaches",
      why: [
        "주어는 동명사구 Growing vegetables in a school garden이에요. vegetables는 Growing의 목적어일 뿐이고, 동명사 주어는 단수로 받으니 teach를 teaches로 고쳐야 해요.",
        "who는 관계대명사이고 선행사는 Children(복수)이에요. 관계절 동사는 선행사에 맞추니 plant가 맞고, 이 문장의 진짜 동사는 learn이에요.",
        "that절의 주어는 a single tomato plant(단수)예요. 뒤의 water, sunlight, and care는 목적어라서 단수 동사 needs가 맞아요.",
        "involved in은 '~에 참여한'이라는 뜻의 과거분사구로 students를 뒤에서 꾸며요. that절의 진짜 동사는 eat이에요.",
        "주어는 food(단수)예요. that you have grown yourself는 관계절이라 괄호를 치면 food tastes가 되고, taste 뒤에는 형용사 보어 better가 와요.",
      ],
      ko: "학교 텃밭에서 채소를 기르는 일은 학생들에게 농사 기술 이상의 것을 가르쳐 준다. 자기 씨앗을 직접 심는 아이들은 인내심을 배우는데, 하룻밤 사이에 이루어지는 일은 없기 때문이다. 아이들은 또 토마토 한 그루에도 날마다 물과 햇빛과 보살핌이 필요하다는 것을 알게 된다. 교사들은 텃밭 활동에 참여한 학생들이 점심시간에 채소를 더 많이 먹는다고 말한다. 어쩌면 자기가 직접 기른 음식이 그냥 더 맛있는 것일지도 모른다.",
    },
    {
      id: "sv-4",
      kind: "underline",
      passage:
        "Honeybees live in large groups called colonies, and each colony [1:depends] on thousands of worker bees. When a worker finds flowers that [2:produces] a lot of nectar, it flies back to the hive and performs a special dance. The direction of the dance [3:tells] the other bees which way to fly. How long the bee shakes its body [4:shows] how far away the flowers are. Scientists [5:studying] this behavior were amazed that such small insects could share such exact information.",
      answer: 2,
      fix: "produce",
      why: [
        "each + 단수 명사(each colony)는 '각각의 군집'이라 단수로 받아요. 그래서 depends가 맞아요.",
        "that은 관계대명사이고 선행사는 flowers(복수)예요. 관계절 동사는 선행사에 맞추니 produces를 produce로 고쳐야 해요. 앞의 a worker는 When절의 주어라 관계절과 상관없어요.",
        "주어는 The direction(단수)이에요. of the dance는 꾸미는 전치사구라 괄호를 치면 The direction tells가 돼요.",
        "How long the bee shakes its body는 의문사가 이끄는 명사절 주어예요. 명사절 주어는 단수로 받으니 shows가 맞아요.",
        "과학자들이 행동을 '연구하는' 쪽이고 뒤에 목적어 this behavior가 있으니 현재분사 studying이 Scientists를 꾸며요. 이 문장의 진짜 동사는 were amazed예요.",
      ],
      ko: "꿀벌은 군집이라 불리는 큰 무리를 이루어 살고, 각 군집은 수천 마리의 일벌에게 의지한다. 일벌은 꽃꿀을 많이 내는 꽃을 찾으면 벌집으로 날아 돌아와 특별한 춤을 춘다. 춤의 방향은 다른 벌들에게 어느 쪽으로 날아가야 하는지 알려 준다. 벌이 몸을 얼마나 오래 흔드는지는 꽃이 얼마나 멀리 있는지를 보여 준다. 이 행동을 연구하는 과학자들은 그렇게 작은 곤충이 그토록 정확한 정보를 나눌 수 있다는 데 놀랐다.",
    },
    {
      id: "sv-5",
      kind: "underline",
      passage:
        "The city museum [1:has] recently opened a new hall for ancient pottery. Among the items on display [2:are] several bowls that were found near the river. Visitors are often surprised at how well the colors [3:have survived] for thousands of years. One of the most popular pieces [4:are] a small jar decorated with pictures of birds. Experts believe that the artist who [5:made] it lived about three thousand years ago.",
      answer: 4,
      fix: "is",
      why: [
        "주어는 The city museum(단수)이에요. 그래서 현재완료 has opened가 맞아요.",
        "전치사구 Among the items on display가 문장 앞으로 나가서 주어와 동사가 뒤바뀌었어요. 동사 뒤의 진짜 주어 several bowls가 복수라 are가 맞아요.",
        "how절의 주어는 the colors(복수)예요. 수천 년 동안 이어져 온 일이라 현재완료 have survived가 알맞아요.",
        "주어는 One이에요. one of the + 복수 명사는 '~ 중 하나'라 단수로 받으니 are를 is로 고쳐야 해요. of the most popular pieces는 꾸미는 말이에요.",
        "who는 관계대명사라 뒤에 관계절의 진짜 동사가 필요해요. 선행사 the artist가 항아리를 '만든' 쪽이라 made가 맞고, 접속사 that과 관계사 who가 있으니 진짜 동사는 believe, made, lived 세 개예요.",
      ],
      ko: "시립 박물관이 최근 고대 도자기를 위한 새 전시실을 열었다. 전시된 물건들 가운데에는 강 근처에서 발견된 그릇 몇 점이 있다. 관람객들은 그 색깔이 수천 년 동안 얼마나 잘 남아 있었는지에 자주 놀란다. 가장 인기 있는 작품 중 하나는 새 그림으로 장식된 작은 항아리이다. 전문가들은 그것을 만든 예술가가 약 3천 년 전에 살았다고 믿는다.",
    },
    {
      id: "sv-6",
      kind: "underline",
      passage:
        "Most of the athletes on our school's track team [1:train] six days a week. Their coach, who has run marathons herself, believes that rest is just as [2:important] as practice. She often reminds the runners that pushing too hard without breaks [3:leads] to injuries. For this reason, every runner on the team [4:takes] one full day off each week. Not only the runners but also the coach [5:enjoy] this quiet day away from the track.",
      answer: 5,
      fix: "enjoys",
      why: [
        "most of + 명사는 of 뒤 명사에 수를 맞춰요. the athletes가 복수라 train이 맞아요. on our school's track team은 꾸미는 말이에요.",
        "that절의 is 뒤는 주어 rest를 설명하는 보어 자리예요. 보어에는 형용사가 오니 as important as가 맞고, 부사 importantly는 쓸 수 없어요.",
        "that절의 주어는 동명사구 pushing too hard without breaks예요. 동명사 주어는 단수로 받으니 leads가 맞아요. 복수형 breaks에 속지 마세요.",
        "every + 단수 명사는 단수로 받아요. 주어가 every runner라 takes가 맞아요.",
        "not only A but also B가 주어면 동사는 가까운 B에 맞춰요. B인 the coach가 단수라 enjoy를 enjoys로 고쳐야 해요.",
      ],
      ko: "우리 학교 육상부 선수들 대부분은 일주일에 6일 훈련한다. 직접 마라톤을 뛰어 본 코치는 휴식이 연습만큼 중요하다고 믿는다. 코치는 쉬지 않고 너무 무리하면 부상으로 이어진다고 선수들에게 자주 일깨워 준다. 이런 이유로 팀의 모든 선수는 매주 하루를 온전히 쉰다. 선수들뿐만 아니라 코치도 트랙에서 벗어난 이 조용한 하루를 즐긴다.",
    },
    {
      id: "sv-7",
      kind: "box",
      passage:
        "A number of volunteers [A:has|have] signed up to clean the beach near our school this weekend. According to the organizers, there [B:is|are] still a lot of plastic waste hidden among the rocks. Much of it comes from bottles and bags that people leave behind. Whether the beach stays clean after the event [C:depends|depend] on the choices visitors make every day.",
      answer: [1, 0, 0],
      why: [
        "a number of + 복수 명사는 '많은 ~'이라는 뜻이라 복수로 받아요. 주어의 핵심이 volunteers라서 have가 맞아요.",
        "there + be 뒤의 명사가 진짜 주어예요. plastic waste는 셀 수 없는 명사라 a lot of가 붙어도 단수로 받으니 is가 맞아요.",
        "Whether the beach stays clean after the event는 '해변이 깨끗하게 유지될지'라는 명사절 주어예요. 명사절 주어는 단수로 받으니 depends가 맞아요.",
      ],
      ko: "많은 자원봉사자가 이번 주말 우리 학교 근처 해변을 청소하겠다고 신청했다. 주최 측에 따르면 바위 사이에는 아직도 많은 플라스틱 쓰레기가 숨어 있다. 그중 상당수는 사람들이 두고 간 병과 봉지에서 나온 것이다. 행사가 끝난 뒤에도 해변이 깨끗하게 유지될지는 방문객들이 날마다 하는 선택에 달려 있다.",
    },
    {
      id: "sv-8",
      kind: "box",
      passage:
        "Our class held a bake sale last Friday to raise money for a local animal shelter. Half of the money we earned [A:was|were] spent on dog food and warm blankets. The cookies that my classmates baked at home [B:was|were] sold out within an hour. Either our class president or two other volunteers [C:is|are] going to deliver the donations next week.",
      answer: [0, 1, 1],
      why: [
        "half of + 명사는 of 뒤 명사에 수를 맞춰요. the money는 셀 수 없는 명사라 단수로 받으니 was가 맞아요. we earned는 money를 꾸미는 관계절이에요.",
        "주어는 The cookies(복수)예요. that my classmates baked at home은 관계절이라 괄호를 치면 The cookies were sold out이 돼요.",
        "either A or B가 주어면 동사는 가까운 B에 맞춰요. B인 two other volunteers가 복수라 are가 맞아요.",
      ],
      ko: "우리 반은 지난 금요일에 지역 동물 보호소에 보낼 돈을 모으려고 빵 바자회를 열었다. 번 돈의 절반은 개 사료와 따뜻한 담요를 사는 데 쓰였다. 반 친구들이 집에서 구운 쿠키는 한 시간 만에 다 팔렸다. 우리 반 반장이나 다른 자원봉사자 두 명이 다음 주에 기부 물품을 전달할 것이다.",
    },
  ],
};

export default topic;
