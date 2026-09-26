import type { SuneungTopic } from "./types";

const topic: SuneungTopic = {
  id: "voice",
  title: "능동 vs 수동",
  items: [
    {
      id: "vo-1",
      kind: "underline",
      passage:
        "Most earthquakes [1:are caused] by the sudden movement of large plates under the Earth's surface. These plates move very slowly, usually only a few centimeters a year. When the pressure [2:building] up between two plates becomes too great, the rock suddenly breaks. Many small earthquakes [3:occur] every day, but people rarely notice them. Instruments [4:called] seismographs record even the weakest shaking. In 2011, one of the strongest earthquakes ever recorded [5:was happened] off the coast of Japan.",
      answer: 5,
      fix: "happened",
      why: [
        "지진은 판의 움직임에 의해 '일으켜지는' 쪽이에요. 뒤에 by ~가 이어지고 주어가 복수라 수동태 are caused가 맞아요.",
        "When절의 진짜 동사는 becomes예요. building은 the pressure를 꾸미는 분사이고, 압력이 스스로 '쌓이는' 것이라 현재분사가 맞아요.",
        "occur(일어나다)는 목적어를 갖지 않는 자동사라 수동태로 쓰지 않아요. 주어 Many small earthquakes가 복수라 occur가 맞아요.",
        "기구는 지진계라고 '불리는' 쪽이라 과거분사 called가 Instruments를 꾸며요. 이 문장의 진짜 동사는 record예요.",
        "happen(일어나다)은 자동사라 수동태가 될 수 없어요. was happened를 happened로 고쳐야 해요.",
      ],
      ko: "대부분의 지진은 지표 아래 거대한 판이 갑자기 움직여서 일어난다. 이 판들은 아주 천천히, 보통 1년에 몇 센티미터밖에 움직이지 않는다. 두 판 사이에 쌓이는 압력이 너무 커지면 암석이 갑자기 부서진다. 날마다 작은 지진이 많이 일어나지만 사람들은 거의 알아차리지 못한다. 지진계라고 불리는 기구는 아주 약한 흔들림까지 기록한다. 2011년에는 기록상 가장 강한 지진 가운데 하나가 일본 앞바다에서 일어났다.",
    },
    {
      id: "vo-2",
      kind: "underline",
      passage:
        "Last year, a painting that [1:had hung] in a small church for centuries was sent to a museum for repair. Experts [2:examining] it discovered another picture beneath the surface. The hidden image, [3:painting] by the same artist, showed a boy feeding a bird. No one knows why the artist decided [4:to cover] it. Visitors now line up to see both images, which [5:are displayed] side by side on a large screen.",
      answer: 3,
      fix: "painted",
      why: [
        "hang이 '걸려 있다'라는 뜻의 자동사로 쓰였어요. 그림이 교회에 걸려 있던 일은 박물관으로 보내진 때보다 먼저라 과거완료 had hung이 맞아요.",
        "전문가들이 그림을 '살펴보는' 쪽이고 뒤에 목적어 it이 있으니 현재분사 examining이 맞아요. 이 문장의 진짜 동사는 discovered예요.",
        "숨겨진 그림은 화가에 의해 '그려진' 쪽이에요. 뒤에 by the same artist도 있으니 painting을 과거분사 painted로 고쳐야 해요.",
        "decide는 to부정사를 목적어로 써요. 그래서 to cover가 맞아요.",
        "which의 선행사 both images는 화면에 '전시되는' 쪽이라 수동태 are displayed가 맞아요.",
      ],
      ko: "작년에 수백 년 동안 작은 교회에 걸려 있던 그림 한 점이 수리를 위해 박물관으로 보내졌다. 그림을 살펴보던 전문가들은 표면 아래에서 또 다른 그림을 발견했다. 같은 화가가 그린 이 숨겨진 그림에는 새에게 먹이를 주는 소년이 담겨 있었다. 화가가 왜 그것을 덮기로 했는지는 아무도 모른다. 이제 관람객들은 큰 화면에 나란히 전시된 두 그림을 보려고 줄을 선다.",
    },
    {
      id: "vo-3",
      kind: "underline",
      passage:
        "The first modern Olympic Games [1:held] in Athens in 1896. Only about 240 athletes from fourteen countries [2:took] part, and all of them were men. Since then, the Games [3:have grown] into the largest sports event in the world. Today, more than ten thousand athletes [4:representing] over two hundred nations compete in the Summer Games. For many of them, simply [5:being chosen] to take part feels like a dream.",
      answer: 1,
      fix: "were held",
      why: [
        "올림픽은 누군가에 의해 '열리는' 쪽이고 타동사 hold 뒤에 목적어도 없어요. 주어 The first modern Olympic Games가 복수라 held를 수동태 were held로 고쳐야 해요.",
        "take part(참가하다)는 선수들이 직접 하는 일이라 능동이에요. 1896년의 일이라 과거형 took가 맞아요.",
        "Since then(그 뒤로)은 과거부터 지금까지 이어진 일이라 현재완료가 알맞아요. grow into는 '자라서 ~이 되다'라는 자동사라 능동 have grown이 맞아요.",
        "선수들이 나라를 '대표하는' 쪽이고 뒤에 목적어 over two hundred nations가 있으니 현재분사 representing이 맞아요. 이 문장의 진짜 동사는 compete예요.",
        "선수는 참가자로 '뽑히는' 쪽이라 동명사의 수동형 being chosen이 맞아요. 이 동명사구가 문장의 주어이고 진짜 동사는 feels예요.",
      ],
      ko: "최초의 근대 올림픽은 1896년 아테네에서 열렸다. 14개 나라에서 온 약 240명의 선수만 참가했는데, 모두 남자였다. 그 뒤로 올림픽은 세계에서 가장 큰 스포츠 행사로 성장했다. 오늘날에는 200개가 넘는 나라를 대표하는 1만 명 이상의 선수가 하계 올림픽에서 경쟁한다. 그들 중 많은 이에게는 참가 선수로 뽑히는 것만으로도 꿈만 같다.",
    },
    {
      id: "vo-4",
      kind: "underline",
      passage:
        "Our class visited an aquarium [1:located] near the harbor last week. The building itself [2:consists] of three floors, each with a different theme. On the first floor, we watched a diver [3:feed] sharks by hand. However, some students felt [4:boring] on the second floor, where most of the exhibits were just photos and signs on the walls. By contrast, the third floor, which [5:was filled] with touch pools and hands-on activities, kept everyone busy until closing time.",
      answer: 4,
      fix: "bored",
      why: [
        "수족관은 항구 근처에 '위치해 있는' 쪽이라 과거분사 located가 an aquarium을 꾸며요. 이 문장의 진짜 동사는 visited예요.",
        "consist of(~으로 이루어져 있다)는 자동사라 수동태로 쓰지 않아요. 주어 The building이 단수라 consists가 맞아요.",
        "watch 같은 지각동사는 목적어 뒤에 동사원형이나 -ing를 목적격보어로 써요. 잠수부가 상어에게 먹이를 '주는' 능동 관계라 동사원형 feed가 맞아요.",
        "학생들은 지루함을 '느끼게 되는' 쪽이라 과거분사를 써야 해요. boring은 무엇이 남을 지루하게 할 때 쓰니 bored로 고쳐야 해요.",
        "which의 선행사 the third floor는 수조와 활동으로 '채워진' 쪽이라 수동태 was filled가 맞아요. be filled with는 '~으로 가득 차 있다'예요.",
      ],
      ko: "우리 반은 지난주에 항구 근처에 있는 수족관을 방문했다. 건물은 3개 층으로 이루어져 있고, 층마다 주제가 다르다. 1층에서 우리는 잠수부가 상어에게 손으로 먹이를 주는 것을 지켜보았다. 하지만 2층에서는 몇몇 학생이 지루해했는데, 그곳의 전시물은 대부분 벽에 붙은 사진과 안내판일 뿐이었다. 반대로 바다 생물을 직접 만져 보는 수조와 체험 활동으로 가득 찬 3층은 문 닫을 때까지 모두를 바쁘게 했다.",
    },
    {
      id: "vo-5",
      kind: "underline",
      passage:
        "About 66 million years ago, a huge rock from space [1:struck] the Earth near what is now Mexico. Soon afterward, most dinosaurs [2:were disappeared]. The impact threw so much dust into the air that sunlight [3:was blocked] for months. Without enough sunlight, many plants died, and the animals that [4:fed] on them could not find food. Among the few survivors were some small feathered dinosaurs, whose descendants [5:are called] birds today.",
      answer: 2,
      fix: "disappeared",
      why: [
        "암석이 지구를 '친' 쪽이고 뒤에 목적어 the Earth가 있으니 능동이 맞아요. strike의 과거형은 struck예요.",
        "disappear(사라지다)는 목적어를 갖지 않는 자동사라 수동태가 될 수 없어요. were disappeared를 disappeared로 고쳐야 해요.",
        "햇빛은 먼지에 '가려진' 쪽이라 수동태 was blocked가 맞아요. sunlight는 셀 수 없는 명사라 was를 써요.",
        "that은 the animals를 꾸미는 관계대명사예요. 동물들이 식물을 '먹고 산' 쪽이라 능동이고, feed on은 '~을 먹고 살다'라서 과거형 fed가 맞아요.",
        "whose descendants(그 후손)는 새라고 '불리는' 쪽이라 수동태 are called가 맞아요. call A B를 수동태로 바꾸면 A is called B가 돼요.",
      ],
      ko: "약 6,600만 년 전, 우주에서 온 거대한 암석이 지금의 멕시코 근처에서 지구와 부딪쳤다. 그 뒤 얼마 지나지 않아 대부분의 공룡이 사라졌다. 충돌로 엄청난 먼지가 공중으로 날아올라 몇 달 동안 햇빛이 가려졌다. 햇빛이 모자라자 많은 식물이 죽었고, 그 식물을 먹고 살던 동물들은 먹이를 찾을 수 없었다. 얼마 안 되는 생존자 가운데에는 깃털 달린 작은 공룡 몇 종이 있었는데, 그 후손을 오늘날 우리는 새라고 부른다.",
    },
    {
      id: "vo-6",
      kind: "box",
      passage:
        "A fire drill [A:held|was held] at our school yesterday morning. When the alarm rang, all the students left their classrooms and walked quietly to the playground. Teachers checked their class lists to make sure that no one was missing. Nothing unusual [B:happened|was happened] during the drill, and no one was hurt. Still, the principal was [C:disappointing|disappointed] that it took us almost six minutes to leave the building.",
      answer: [1, 0, 1],
      why: [
        "소방 훈련은 학교가 '실시하는' 대상이고, 타동사 hold 뒤에 목적어가 없어요. 그래서 수동태 was held가 맞아요.",
        "happen(일어나다)은 자동사라 수동태로 쓸 수 없어요. 그래서 happened가 맞아요.",
        "교장 선생님은 실망감을 '느끼게 된' 쪽이라 과거분사 disappointed가 맞아요. disappointing은 무엇이 남을 실망시킬 때 써요.",
      ],
      ko: "어제 아침 우리 학교에서 소방 훈련이 실시되었다. 경보가 울리자 모든 학생이 교실을 나와 조용히 운동장으로 걸어갔다. 선생님들은 빠진 사람이 없는지 확인하려고 반 명단을 살폈다. 훈련 중에 별다른 일은 일어나지 않았고 다친 사람도 없었다. 그래도 교장 선생님은 우리가 건물을 빠져나오는 데 거의 6분이나 걸렸다는 데 실망하셨다.",
    },
    {
      id: "vo-7",
      kind: "box",
      passage:
        "Last month, workers [A:repairing|repaired] the old school library found a metal box under the floor. Inside were dozens of letters [B:writing|written] by students in 1975. The box also held a few photographs of the school in those days. Surprisingly, most of the letters [C:were remained|remained] in good condition after half a century. The school plans to invite the writers, now in their sixties, to read their letters aloud.",
      answer: [0, 1, 1],
      why: [
        "일꾼들이 도서관을 '고치는' 쪽이고 뒤에 목적어 the old school library가 있으니 현재분사 repairing이 맞아요. 이 문장의 진짜 동사는 found라서 repaired를 또 쓸 수 없어요.",
        "편지는 학생들에 의해 '쓰인' 쪽이라 과거분사 written이 letters를 꾸며요. 뒤의 by students도 수동임을 알려 줘요.",
        "remain(남아 있다)은 자동사라 수동태로 쓰지 않아요. 그래서 remained가 맞고, 뒤의 in good condition이 상태를 나타내요.",
      ],
      ko: "지난달 오래된 학교 도서관을 고치던 일꾼들이 바닥 밑에서 금속 상자 하나를 발견했다. 상자 안에는 1975년에 학생들이 쓴 편지 수십 통이 들어 있었다. 상자에는 그 시절 학교의 모습을 담은 사진도 몇 장 있었다. 놀랍게도 편지 대부분은 반세기가 지났는데도 좋은 상태로 남아 있었다. 학교는 이제 60대가 된 편지 주인들을 초대해 편지를 소리 내어 읽게 할 계획이다.",
    },
    {
      id: "vo-8",
      kind: "box",
      passage:
        "Last night, about a hundred children [A:invited|inviting] by our town library enjoyed a free magic show. The most memorable moment came at the end, when the magician's assistant vanished from a locked box. Seconds later, she [B:appeared|was appeared] at the back of the hall, waving to the audience. The children were so [C:exciting|excited] that they talked about the trick all the way home.",
      answer: [0, 0, 1],
      why: [
        "아이들은 도서관에 '초대받은' 쪽이라 과거분사 invited가 children을 꾸며요. 뒤의 by our town library도 수동임을 보여 주고, 문장의 진짜 동사는 enjoyed예요.",
        "appear(나타나다)는 자동사라 수동태로 쓸 수 없어요. 그래서 appeared가 맞아요.",
        "아이들은 마술 때문에 신이 '나게 된' 쪽이라 과거분사 excited가 맞아요. exciting은 무엇이 남을 신나게 할 때 써요.",
      ],
      ko: "어젯밤 우리 동네 도서관의 초대를 받은 어린이 100여 명이 무료 마술 공연을 즐겼다. 가장 기억에 남는 순간은 마지막에 찾아왔는데, 마술사의 조수가 잠긴 상자에서 사라진 것이다. 몇 초 뒤 조수는 관객에게 손을 흔들며 공연장 뒤쪽에 나타났다. 아이들은 너무 신이 나서 집에 가는 내내 그 마술 이야기를 했다.",
    },
  ],
};

export default topic;
