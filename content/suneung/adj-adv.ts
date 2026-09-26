import type { SuneungTopic } from "./types";

const topic: SuneungTopic = {
  id: "adj-adv",
  title: "형용사 vs 부사",
  items: [
    {
      id: "aa-1",
      kind: "underline",
      passage:
        "Have you ever noticed that your voice sounds [1:strangely] in a recording? This happens because you usually hear yourself in two ways. Part of the sound [2:travels] through the air to your ears, while the rest moves through the bones of your head. These bones make your voice [3:seem] deeper than it really is. A recording captures only the sound in the air, [4:which] is why your voice seems unfamiliar. It is no wonder that most people feel [5:embarrassed] when they first hear it.",
      answer: 1,
      fix: "strange",
      why: [
        "sound는 '~하게 들리다'라는 2형식 동사라 주어의 상태를 나타내는 형용사 보어가 와야 해요. 부사 strangely를 형용사 strange로 고쳐야 해요.",
        "part of + 명사는 of 뒤의 명사에 수를 맞춰요. the sound가 단수라 travels가 맞아요.",
        "사역동사 make는 목적어 뒤에 동사원형을 써요. 그래서 seem이 맞고, seem 뒤에도 형용사 보어 deeper가 왔어요.",
        "쉼표 뒤의 which가 앞 절 전체(녹음기가 공기 중의 소리만 담는다는 것)를 받아요. 뒤에 is의 주어가 비어 있으니 관계대명사 which가 맞아요.",
        "사람들이 쑥스러움을 느끼는 쪽이라 과거분사 embarrassed가 맞아요. 쑥스럽게 만드는 대상을 말할 때라면 embarrassing을 써요.",
      ],
      ko: "녹음된 자기 목소리가 이상하게 들린다는 것을 알아챈 적이 있는가? 이런 일이 생기는 까닭은 우리가 평소 자기 목소리를 두 가지 길로 듣기 때문이다. 소리의 일부는 공기를 거쳐 귀로 가고, 나머지는 머리뼈를 거쳐 전해진다. 이 뼈들 때문에 목소리가 실제보다 더 낮게 들린다. 녹음기는 공기 중의 소리만 담는데, 그래서 녹음된 목소리가 낯설게 느껴진다. 대부분의 사람이 자기 목소리를 처음 들을 때 쑥스러워하는 것도 당연하다.",
    },
    {
      id: "aa-2",
      kind: "underline",
      passage:
        "Houseplants do more than decorate a room. Studies suggest that caring for plants can make people [1:feel] calmer. However, many beginners find it difficult to keep their plants [2:healthily]. The most common mistake is giving them too much water, [3:which] can cause the roots to rot. Experts recommend [4:checking] the soil with a finger first. If it still feels damp, the plant does not need [5:to be watered] yet.",
      answer: 2,
      fix: "healthy",
      why: [
        "사역동사 make는 목적어 뒤에 동사원형을 써서 '~가 …하게 하다'라는 뜻을 만들어요. 그래서 feel이 맞아요.",
        "keep + 목적어 + 목적격보어 구조에서 보어는 목적어의 상태를 말하므로 형용사를 써요. healthily를 healthy로 고쳐야 해요.",
        "쉼표 뒤 which가 앞의 giving them too much water를 받고, 뒤에 can cause의 주어가 비어 있어요. 그래서 계속적 용법의 관계대명사 which가 맞아요.",
        "recommend는 목적어로 동명사를 쓰는 동사라 checking이 맞아요.",
        "식물은 물을 주는 쪽이 아니라 받는 쪽이라 수동형 to부정사 to be watered가 맞아요.",
      ],
      ko: "실내 식물은 방을 꾸미는 것 이상의 일을 한다. 연구에 따르면 식물을 돌보면 사람들이 더 차분해질 수 있다. 하지만 많은 초보자는 식물을 건강하게 기르기 어려워한다. 가장 흔한 실수는 물을 너무 많이 주는 것인데, 이는 뿌리를 썩게 할 수 있다. 전문가들은 먼저 손가락으로 흙을 확인해 보라고 권한다. 흙이 아직 축축하다면 식물에 아직 물을 줄 필요가 없다.",
    },
    {
      id: "aa-3",
      kind: "underline",
      passage:
        "When Minji joined the school orchestra, she could [1:barely] read music. The other members, most of [2:whom] had played for years, seemed far ahead of her. Instead of giving up, she worked [3:hardly] to catch up with them. She practiced for an hour every morning before school. By the end of the year, her playing [4:had improved] so much that the conductor asked her [5:to perform] a short solo.",
      answer: 3,
      fix: "hard",
      why: [
        "barely는 '거의 ~ 못 하다'라는 뜻의 부사로 동사 read를 꾸며요. 처음에는 악보를 거의 못 읽었다는 뜻이라 흐름에도 맞아요.",
        "전치사 of 뒤라 목적격 whom을 써요. 쉼표 뒤에서 The other members를 받고, most of whom이 had played의 주어 역할을 해요.",
        "포기하지 않고 '열심히' 노력했다는 뜻이어야 하므로 부사 hard가 맞아요. hardly는 '거의 ~ 않다'라는 뜻이라 뜻이 정반대가 돼요. hard로 고쳐야 해요.",
        "그해 말이라는 과거 시점까지 실력이 늘어 온 것이라 과거완료 had improved가 맞아요.",
        "ask + 목적어 + to부정사는 '~에게 …해 달라고 부탁하다'라는 뜻이에요. 그래서 to perform이 맞아요.",
      ],
      ko: "민지가 학교 오케스트라에 들어갔을 때 그녀는 악보를 거의 읽지 못했다. 다른 단원들은 대부분 여러 해 동안 연주해 왔기에 그녀보다 훨씬 앞서 있는 것 같았다. 민지는 포기하는 대신 그들을 따라잡으려고 열심히 노력했다. 그녀는 매일 아침 등교 전에 한 시간씩 연습했다. 그해 말이 되자 그녀의 연주 실력이 무척 늘어서 지휘자가 그녀에게 짧은 독주를 부탁했다.",
    },
    {
      id: "aa-4",
      kind: "underline",
      passage:
        "Dolphins are [1:known] for their intelligence. They live in groups and [2:use] a variety of sounds to communicate. Each dolphin even has its own whistle [3:that] works like a name. Scientists consider them [4:high] social animals that form strong bonds. When a member of the group is hurt, the others stay [5:close] and help it reach the surface to breathe.",
      answer: 4,
      fix: "highly",
      why: [
        "'~로 알려져 있다'는 be known for예요. 돌고래가 알려지는 쪽이라 수동의 과거분사 known이 맞아요.",
        "주어 They에 이어 live와 and로 나란히 연결된 동사라 use가 맞아요.",
        "선행사 its own whistle(단수)이 있고 뒤에 works의 주어가 비어 있어서 주격 관계대명사 that이 맞아요. 선행사가 단수라 동사도 works예요.",
        "뒤의 형용사 social을 꾸며 정도를 나타내는 자리라 '매우'라는 뜻의 부사가 필요해요. high는 '높은, 높이'라는 뜻이라 highly로 고쳐야 해요.",
        "stay 뒤에서 '가까이 있는' 상태를 말하는 close가 맞아요. closely는 '면밀히, 주의 깊게'라는 뜻이라 여기에 맞지 않아요.",
      ],
      ko: "돌고래는 지능이 높기로 알려져 있다. 돌고래는 무리를 지어 살며 다양한 소리로 의사소통한다. 돌고래마다 이름처럼 쓰이는 저마다의 휘파람 소리가 있기도 하다. 과학자들은 돌고래를 강한 유대를 맺는 매우 사회적인 동물로 여긴다. 무리 가운데 하나가 다치면 다른 돌고래들이 곁에 머물며 그 돌고래가 숨을 쉬러 수면으로 올라가도록 돕는다.",
    },
    {
      id: "aa-5",
      kind: "underline",
      passage:
        "Teenagers are often called lazy [1:because] they sleep late on weekends. In fact, their body clocks [2:shift] during adolescence, making it hard for them to fall asleep early. This is [3:why] many experts support starting school later in the morning. Schools that [4:have made] this change report that students are more alert in class. Without such a change, students who go to bed [5:lately] but must get up early often struggle to focus during the day.",
      answer: 5,
      fix: "late",
      why: [
        "뒤에 they sleep late라는 주어 + 동사가 이어지므로 접속사 because가 맞아요. because of 뒤에는 명사(구)가 와요.",
        "주어는 their body clocks(복수)라 복수 동사 shift가 맞아요. 뒤의 making ~은 분사구문이에요.",
        "This is why 뒤에는 '그래서 ~하다'라는 결과가 와요. 선행사 the reason이 생략된 관계부사 why이고, 뒤의 절이 완전해서 맞아요.",
        "주격 관계대명사 that의 선행사는 Schools(복수)라 have made가 맞아요. 이 문장의 진짜 동사는 report예요.",
        "'늦게' 잠자리에 든다는 뜻이므로 부사 late를 써야 해요. lately는 '최근에'라는 뜻이라 여기에 맞지 않아요. late로 고쳐야 해요.",
      ],
      ko: "십 대는 주말에 늦잠을 잔다는 이유로 게으르다는 말을 자주 듣는다. 사실 사춘기에는 생체 시계가 바뀌어서 일찍 잠들기가 어려워진다. 그래서 많은 전문가가 학교 수업을 아침에 더 늦게 시작하자고 주장한다. 이렇게 바꾼 학교들은 학생들이 수업 시간에 더 또렷하다고 보고한다. 그런 변화가 없으면, 늦게 잠자리에 들면서도 일찍 일어나야 하는 학생들은 낮 동안 집중하는 데 어려움을 겪는 경우가 많다.",
    },
    {
      id: "aa-6",
      kind: "box",
      passage:
        "Our city's new library opened last spring. It looks [A:modern|modernly] from the outside, with walls made almost entirely of glass. Inside, the lights are [B:careful|carefully] arranged so that readers do not strain their eyes. Most visitors find the reading rooms on the top floor [C:comfortably|comfortable], and many stay there for hours. The building also has a rooftop garden that is open to everyone.",
      answer: [0, 1, 1],
      why: [
        "look은 '~하게 보이다'라는 2형식 동사라 주어의 상태를 말하는 형용사 보어가 와야 해요. 그래서 modern이 맞아요.",
        "are arranged라는 수동태 동사를 꾸미는 자리예요. 동사를 꾸미는 말은 부사라서 carefully가 맞아요.",
        "find + 목적어 + 목적격보어 구조예요. 목적어 the reading rooms가 편안하다는 상태를 말하므로 형용사 comfortable이 맞아요.",
      ],
      ko: "우리 시의 새 도서관이 지난봄에 문을 열었다. 벽이 거의 다 유리로 되어 있어 겉에서 보면 현대적으로 보인다. 안에서는 읽는 사람의 눈이 피로하지 않도록 조명이 세심하게 배치되어 있다. 대부분의 방문객은 꼭대기 층 열람실이 편안하다고 느끼고, 많은 사람이 그곳에서 몇 시간씩 머문다. 건물에는 누구나 이용할 수 있는 옥상 정원도 있다.",
    },
    {
      id: "aa-7",
      kind: "box",
      passage:
        "At [A:highly|high] altitudes, the air contains much less oxygen than at sea level. Climbers who go up too quickly may start to feel [B:dizzy|dizzily] and short of breath. For this reason, [C:near|nearly] all experienced climbers spend several days at a lower camp so that their bodies can adjust to the thin air. Taking time is not a sign of weakness but a smart safety habit.",
      answer: [1, 0, 1],
      why: [
        "뒤의 명사 altitudes를 꾸미는 자리라 형용사 high가 맞아요. highly는 '매우'라는 뜻의 부사라서 명사를 꾸밀 수 없어요.",
        "feel은 2형식 감각동사라 주어의 상태를 나타내는 형용사 보어 dizzy가 와요. and로 이어진 short of breath도 형용사구 보어예요.",
        "all을 꾸며 '거의 모든'이라는 뜻을 만드는 자리라 부사 nearly가 맞아요. near는 '가까운, 가까이'라는 뜻이라 여기에 맞지 않아요.",
      ],
      ko: "높은 고도에서는 공기에 든 산소가 해수면보다 훨씬 적다. 너무 빨리 올라가는 등산가는 어지럽고 숨이 가빠지기 시작할 수 있다. 이런 까닭에 경험 많은 등산가는 거의 모두 더 낮은 캠프에서 며칠을 보내며 몸이 희박한 공기에 적응하게 한다. 시간을 들이는 것은 약하다는 표시가 아니라 현명한 안전 습관이다.",
    },
    {
      id: "aa-8",
      kind: "box",
      passage:
        "[A:Unfortunate|Unfortunately], many households throw away food that is still safe to eat. A few simple habits can reduce this waste. For example, storing bread in the freezer keeps it [B:fresh|freshly] for weeks. Also, fruit with small brown spots may look less attractive, but it usually remains [C:nutritious|nutritiously] and tasty. Using such fruit in smoothies or baking is an easy way to save money.",
      answer: [1, 0, 0],
      why: [
        "쉼표 뒤 문장 전체를 꾸미는 자리예요. 문장 전체를 꾸미는 말은 부사라서 Unfortunately가 맞아요. 형용사 Unfortunate는 명사를 꾸미거나 보어로 써요.",
        "keep + 목적어 + 목적격보어 구조예요. 목적어 it(빵)이 신선한 상태로 있다는 뜻이라 형용사 fresh가 맞아요.",
        "remain은 '여전히 ~한 상태이다'라는 2형식 동사라 형용사 보어가 와야 해요. 그래서 nutritious가 맞고, and로 이어진 tasty도 형용사예요.",
      ],
      ko: "안타깝게도 많은 가정이 아직 먹어도 안전한 음식을 버린다. 몇 가지 간단한 습관으로 이런 낭비를 줄일 수 있다. 예를 들어 빵을 냉동실에 보관하면 몇 주 동안 신선하게 유지된다. 또 작은 갈색 반점이 있는 과일은 덜 먹음직스러워 보일 수 있지만 대개 여전히 영양가 있고 맛있다. 그런 과일을 스무디나 빵 굽기에 쓰면 쉽게 돈을 아낄 수 있다.",
    },
  ],
};

export default topic;
