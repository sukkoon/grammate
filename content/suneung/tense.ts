import type { SuneungTopic } from "./types";

const topic: SuneungTopic = {
  id: "tense",
  title: "시제",
  items: [
    {
      id: "te-1",
      kind: "underline",
      passage:
        "Our school garden [1:has grown] steadily since a group of students planted the first tomatoes in 2019. Every spring, volunteers [2:who] live nearby help us prepare the soil. This year, we plan to sell the vegetables at the school festival. As soon as the first tomatoes [3:will turn] red, we will pick them and [4:store] them in a cool place. Nobody knows yet whether the harvest [5:will be] large enough for the whole festival.",
      answer: 3,
      fix: "turn",
      why: [
        "since절 안의 in 2019는 출발점이고, 텃밭이 그때부터 지금까지 커 온 일이라 주절은 현재완료 has grown이 맞아요. since절의 동사는 과거 planted예요.",
        "선행사 volunteers가 사람이고 뒤에 live의 주어가 비어 있어서 주격 관계대명사 who가 맞아요. 관계절을 괄호로 묶으면 진짜 동사는 help예요.",
        "as soon as(~하자마자)가 이끄는 시간 부사절이에요. 주절의 will pick이 이미 미래를 나타내니, 부사절은 미래 대신 현재형 turn으로 고쳐야 해요.",
        "will 뒤의 pick과 and로 이어진 병렬이라 동사원형 store가 맞아요. will pick ... and (will) store로 읽어요.",
        "whether절은 knows의 목적어인 명사절(~인지)이에요. 명사절은 미래 일이면 will을 그대로 쓰니 will be가 맞아요.",
      ],
      ko: "우리 학교 텃밭은 2019년에 학생 몇 명이 처음 토마토를 심은 이후로 꾸준히 커 왔다. 봄마다 근처에 사는 자원봉사자들이 우리가 흙을 고르는 것을 도와준다. 올해 우리는 학교 축제에서 채소를 팔 계획이다. 첫 토마토가 빨갛게 익자마자 우리는 그것을 따서 서늘한 곳에 보관할 것이다. 수확이 축제 전체에 쓸 만큼 넉넉할지는 아직 아무도 모른다.",
    },
    {
      id: "te-2",
      kind: "underline",
      passage:
        "Since the smartphone arrived, the cost of taking a picture [1:has dropped] dramatically, and most of us now carry a camera everywhere. But photography [2:was] once a slow and expensive process. Before cameras, only wealthy families could afford [3:to have] their portraits painted. The first photographs required people to sit still for several minutes, [4:which] made it hard to hold a smile. In fact, one of the earliest known photographs to show a person [5:has been taken] on a Paris street in 1838.",
      answer: 5,
      fix: "was taken",
      why: [
        "Since + 과거(the smartphone arrived)부터 지금까지 이어진 변화라 현재완료가 맞아요. 주어는 the cost(단수)라 has dropped예요.",
        "once가 '한때'라는 과거의 뜻이라 과거형 was가 맞아요. 주어 photography는 셀 수 없는 명사라 단수예요.",
        "afford는 to부정사를 목적어로 받아서 to have가 맞아요. have + 목적어 + p.p.(초상화가 그려지는 쪽)도 알맞아요.",
        "앞 절 전체(몇 분 동안 가만히 앉아 있어야 했던 것)를 받는 계속적 용법의 관계대명사 which예요. 뒤에 made의 주어가 비어 있어요.",
        "in 1838은 이미 끝난 과거의 한 시점이라 현재완료와 함께 쓸 수 없어요. 주어 one(단수)에 맞춘 과거 수동 was taken으로 고쳐야 해요.",
      ],
      ko: "스마트폰이 등장한 이후로 사진을 찍는 비용은 크게 떨어졌고, 이제 우리 대부분은 어디서나 카메라를 가지고 다닌다. 하지만 사진은 한때 느리고 비싼 작업이었다. 카메라가 생기기 전에는 부유한 가족만 초상화를 그리게 할 여유가 있었다. 초기 사진은 사람들에게 몇 분 동안 가만히 앉아 있기를 요구했고, 그래서 미소를 계속 짓고 있기가 어려웠다. 실제로 사람이 담긴 가장 오래된 사진 가운데 하나는 1838년 파리의 한 거리에서 찍혔다.",
    },
    {
      id: "te-3",
      kind: "box",
      passage:
        "Our astronomy club meets every Friday on the school roof. If the weather [A:is|will be] clear tomorrow night, we will set up the telescopes and look for Jupiter. Last month, we [B:have observed|observed] the rings of Saturn for the first time, and everyone cheered. Since the club [C:started|has started] in 2021, its members have spent more than a hundred nights watching the sky together.",
      answer: [0, 1, 0],
      why: [
        "if가 '만약 ~라면'인 조건 부사절이에요. 주절의 will set up이 미래를 나타내니 부사절은 현재형 is를 써요.",
        "Last month는 끝난 과거의 한 시점이라 현재완료와 함께 쓸 수 없어요. 과거형 observed가 맞아요.",
        "since절 안에는 과거의 출발점이 와요. in 2021이라는 명백한 과거 표현이 있으니 과거형 started가 맞고, 지금까지 이어진 주절은 현재완료 have spent예요.",
      ],
      ko: "우리 천문 동아리는 금요일마다 학교 옥상에서 모인다. 내일 밤 날씨가 맑으면 우리는 망원경을 설치하고 목성을 찾아볼 것이다. 지난달 우리는 처음으로 토성의 고리를 관찰했고, 모두가 환호했다. 2021년에 동아리가 생긴 이후로 회원들은 백 번이 넘는 밤을 함께 하늘을 보며 보냈다.",
    },
    {
      id: "te-4",
      kind: "underline",
      passage:
        "Since 2015, the number of wild bees in our region [1:decreased] sharply. Scientists [2:studying] the problem point to pesticides and the loss of wildflowers. Last spring, our town [3:planted] flowers along every major road to give the bees more food. The results are promising, but experts say it is too early to know if the bee population [4:will recover] fully. They will continue to count the bees until the project [5:ends] in 2030.",
      answer: 1,
      fix: "has decreased",
      why: [
        "Since 2015는 과거의 출발점부터 지금까지 이어진 기간이라 현재완료가 필요해요. 주어가 the number(단수)이므로 has decreased로 고쳐야 해요.",
        "문장의 진짜 동사는 point이고, 과학자들이 문제를 연구하는 쪽(능동)이라 현재분사 studying이 Scientists를 꾸며요.",
        "Last spring은 명백한 과거 표현이라 과거형 planted가 맞아요.",
        "if절은 know의 목적어인 명사절(~인지)이에요. 명사절에서는 미래 일이면 will을 그대로 쓰니 will recover가 맞아요.",
        "until(~할 때까지)이 이끄는 시간 부사절이라 2030년의 미래 일이어도 현재형을 써요. 주어 the project가 단수라 ends예요.",
      ],
      ko: "2015년 이후로 우리 지역의 야생 벌의 수가 급격히 줄었다. 이 문제를 연구하는 과학자들은 농약과 야생화의 감소를 원인으로 꼽는다. 지난봄 우리 마을은 벌에게 먹이를 더 주려고 큰길마다 꽃을 심었다. 결과는 희망적이지만, 전문가들은 벌의 개체 수가 완전히 회복될지 알기에는 아직 이르다고 말한다. 그들은 2030년에 이 사업이 끝날 때까지 벌의 수를 계속 셀 것이다.",
    },
    {
      id: "te-5",
      kind: "underline",
      passage:
        "Last Saturday, our class visited the city history museum. Our guide, [1:who] had worked there for twenty years, showed us a map of the town drawn in 1850. It was surprising [2:to see] how small the town once was. When we reached the famous train exhibit, however, we learned that it [3:had been closed] the week before for repairs. By the time we got back to the entrance, the museum shop [4:has already closed] too, so we could not buy any souvenirs. Still, most of us [5:agreed] that the trip was worth it.",
      answer: 4,
      fix: "had already closed",
      why: [
        "선행사 Our guide가 사람이고 뒤에 had worked의 주어가 비어 있어서 주격 관계대명사 who가 맞아요. 쉼표 뒤 계속적 용법이라 that은 쓸 수 없어요.",
        "가주어 It이 진짜 주어 to see ~를 대신하는 문장이라 to부정사 to see가 맞아요.",
        "전시관이 문을 닫은 일(그 전 주)이 우리가 알게 된 때(learned)보다 먼저라 과거완료가 맞고, 전시관은 닫히는 쪽이라 수동 had been closed예요.",
        "By the time we got back이라는 과거의 기준 시점보다 먼저 끝난 일이라 과거완료 had already closed로 고쳐야 해요. 현재완료는 지금과 이어진 일에만 써요.",
        "지난 토요일의 일을 말하는 과거 이야기라 과거형 agreed가 맞아요. 뒤의 that절은 agreed의 목적어예요.",
      ],
      ko: "지난 토요일 우리 반은 시립 역사박물관을 방문했다. 그곳에서 20년 동안 일해 온 안내원은 1850년에 그려진 마을 지도를 보여 주었다. 마을이 한때 얼마나 작았는지 보니 놀라웠다. 그런데 유명한 기차 전시관에 갔을 때, 우리는 그곳이 수리 때문에 그 전 주에 문을 닫았다는 것을 알게 되었다. 우리가 입구로 돌아왔을 무렵에는 박물관 기념품 가게도 이미 문을 닫아서 기념품을 하나도 살 수 없었다. 그래도 우리 대부분은 가 볼 만한 견학이었다는 데 동의했다.",
    },
    {
      id: "te-6",
      kind: "box",
      passage:
        "Our town's jazz festival [A:was held|has been held] every autumn since 1998. It has been canceled only once: two years ago, a typhoon [B:forced|has forced] the organizers to close the stage for safety. This year, the festival will feature musicians from five countries, including a student band from our own school. Once the full program [C:is|will be] posted online next month, tickets are expected to sell out within hours.",
      answer: [1, 0, 0],
      why: [
        "since 1998은 과거부터 지금까지 이어진 기간이라 현재완료가 필요해요. 축제는 열리는 쪽이라 현재완료 수동 has been held가 맞아요.",
        "two years ago는 명백한 과거 표현이라 현재완료를 쓸 수 없어요. 과거형 forced가 맞아요.",
        "once(일단 ~하면)가 이끄는 시간·조건 부사절이라 next month의 미래 일이어도 현재형을 써요. 프로그램은 올려지는 쪽이라 is posted가 맞아요.",
      ],
      ko: "우리 마을의 재즈 축제는 1998년부터 해마다 가을에 열려 왔다. 축제가 취소된 것은 딱 한 번뿐인데, 2년 전 태풍 때문에 주최 측이 안전을 위해 무대를 닫아야 했다. 올해 축제에는 우리 학교 학생 밴드를 비롯해 다섯 나라의 음악가들이 나온다. 다음 달에 전체 프로그램이 온라인에 올라오면, 표는 몇 시간 만에 다 팔릴 것으로 예상된다.",
    },
    {
      id: "te-7",
      kind: "underline",
      passage:
        "Many students [1:believe] that staying up late before an exam helps them remember more. However, if you [2:will sleep] less than six hours the night before a test, your brain will have trouble storing what you studied. Researchers [3:have found] that memories are strengthened during deep sleep. They are now testing whether a short nap after class [4:will improve] students' memory as well. The first results [5:are expected] next year.",
      answer: 2,
      fix: "sleep",
      why: [
        "주어 Many students가 복수라 believe가 맞아요. that절 안의 주어는 동명사구 staying up late ~라서 단수 helps예요.",
        "if가 '만약 ~라면'인 조건 부사절이에요. 주절에 will have가 있으니 부사절은 미래 대신 현재형 sleep으로 고쳐야 해요.",
        "과거의 특정 시점 없이 지금까지 알아낸 결과를 말하니 현재완료가 맞고, 주어 Researchers가 복수라 have found예요.",
        "whether절은 testing의 목적어인 명사절(~인지)이라 미래 일이면 will을 그대로 써요. 앞 문장의 if 부사절과 비교해 보세요.",
        "결과는 예상되는 쪽이라 수동이고, 주어 The first results가 복수라 are expected가 맞아요.",
      ],
      ko: "많은 학생들은 시험 전에 늦게까지 깨어 있으면 더 많이 기억하는 데 도움이 된다고 믿는다. 하지만 시험 전날 밤에 여섯 시간보다 적게 자면, 뇌는 공부한 것을 저장하는 데 어려움을 겪을 것이다. 연구자들은 기억이 깊은 잠을 자는 동안 강화된다는 것을 알아냈다. 그들은 지금 수업 뒤의 짧은 낮잠이 학생들의 기억력도 높여 줄지 시험하고 있다. 첫 결과는 내년에 나올 것으로 예상된다.",
    },
    {
      id: "te-8",
      kind: "box",
      passage:
        "Jiwon, a member of our school track team, [A:has trained|trained] six days a week since January. Last Sunday, she arrived at the stadium for a race and realized that she [B:has forgotten|had forgotten] her running shoes at home. Her coach lent her an old pair, and she still finished the race with her best time ever. Now she says she will keep training until she [C:will break|breaks] the school record.",
      answer: [0, 1, 1],
      why: [
        "since January는 1월부터 지금까지 이어진 기간이라 현재완료 has trained가 맞아요. 과거형 trained는 지금과의 연결을 나타내지 못해요.",
        "운동화를 두고 온 일이 깨달은 때(realized, 과거)보다 먼저 일어났으니 과거완료 had forgotten이 맞아요.",
        "until(~할 때까지)이 이끄는 시간 부사절이라 미래 일이어도 현재형 breaks를 써요. 미래라는 표시는 will keep 하나로 충분해요.",
      ],
      ko: "우리 학교 육상부원인 지원이는 1월부터 일주일에 엿새씩 훈련해 왔다. 지난 일요일, 지원이는 경기를 하러 경기장에 도착해서야 운동화를 집에 두고 왔다는 것을 깨달았다. 코치가 낡은 운동화 한 켤레를 빌려주었고, 그래도 지원이는 자기 최고 기록으로 경기를 마쳤다. 이제 지원이는 학교 기록을 깰 때까지 훈련을 계속하겠다고 말한다.",
    },
  ],
};

export default topic;
