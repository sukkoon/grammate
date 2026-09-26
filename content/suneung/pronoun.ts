import type { SuneungTopic } from "./types";

const topic: SuneungTopic = {
  id: "pronoun",
  title: "대명사 일치",
  items: [
    {
      id: "pr-1",
      kind: "underline",
      passage:
        "Emperor penguins survive the Antarctic winter by doing something [1:surprising]: they stand close together in huge groups called huddles. Birds on the cold outer edge slowly [2:work] their way toward the warm center, while others move out to take their place. The fathers suffer the most, because [3:its] job is to keep the eggs warm. Each father holds an egg on his feet under a fold of skin so that it [4:stays] off the frozen ground. For about two months, he waits without [5:eating] until the mother returns from the sea.",
      answer: 3,
      fix: "their",
      why: [
        "-thing으로 끝나는 말은 형용사가 뒤에서 꾸며요. 그 일이 사람을 '놀라게 하는' 것이라 현재분사 surprising이 맞아요.",
        "주어는 Birds(복수)예요. on the cold outer edge는 꾸미는 전치사구라 괄호를 치면 Birds work가 돼요. work one's way는 '조금씩 나아가다'라는 뜻이에요.",
        "알을 품는 일을 맡은 것은 앞의 The fathers(복수)예요. 복수 명사를 가리키니 its를 their로 고쳐야 해요.",
        "so that은 '~하도록'이라는 접속사예요. so that절의 주어 it은 앞의 an egg(단수)를 가리키니 stays가 맞아요.",
        "전치사 without 뒤에는 명사나 동명사가 와요. 그래서 동명사 eating이 맞아요. 앞의 he는 Each father를 받는 단수 대명사예요.",
      ],
      ko: "황제펭귄은 놀라운 방법으로 남극의 겨울을 견딘다. 허들이라고 불리는 거대한 무리를 지어 서로 바짝 붙어 서는 것이다. 차가운 바깥 가장자리에 있는 펭귄들은 천천히 따뜻한 가운데로 파고들고, 그동안 다른 펭귄들이 바깥으로 나와 그 자리를 채운다. 가장 고생하는 것은 아빠 펭귄들인데, 알을 따뜻하게 지키는 것이 그들의 일이기 때문이다. 아빠 펭귄은 저마다 알을 발 위에 올리고 배의 살갗 주름으로 덮어 알이 얼어붙은 땅에 닿지 않게 한다. 약 두 달 동안 아빠 펭귄은 아무것도 먹지 않고 엄마 펭귄이 바다에서 돌아오기를 기다린다.",
    },
    {
      id: "pr-2",
      kind: "underline",
      passage:
        "The eyes of an owl are much larger than [1:that] of most other birds of the same size. Because they are so large, the eyes cannot move [2:freely] inside the head. To make up for this, an owl can turn its head farther than most animals [3:can]. Some owls can rotate their heads as much as 270 degrees without [4:hurting] themselves. This ability allows them [5:to watch] for danger in almost every direction.",
      answer: 1,
      fix: "those",
      why: [
        "비교하는 대상은 앞의 The eyes(복수)예요. 올빼미의 눈과 다른 새들의 눈을 비교하니 복수를 받는 those로 고쳐야 해요.",
        "동사 move를 꾸미는 자리라 부사 freely가 맞아요.",
        "can은 앞에 나온 can turn을 대신하는 말이에요. 앞 동사가 조동사 can과 함께 쓰였으니 대동사도 can으로 받아요.",
        "전치사 without 뒤에는 명사나 동명사가 와서 hurting이 맞아요. 다치게 하는 대상이 주어 Some owls 자신이라 목적어는 재귀대명사 themselves예요.",
        "allow는 목적어 뒤에 to부정사를 목적격보어로 써요. 그래서 allows them to watch가 맞아요.",
      ],
      ko: "올빼미의 눈은 같은 크기의 다른 새 대부분의 눈보다 훨씬 크다. 눈이 너무 커서 머릿속에서 자유롭게 움직이지 못한다. 이를 보완하려고 올빼미는 대부분의 동물보다 머리를 더 멀리 돌릴 수 있다. 어떤 올빼미는 다치지 않고 머리를 270도까지 돌릴 수 있다. 이 능력 덕분에 올빼미는 거의 모든 방향에서 위험을 살필 수 있다.",
    },
    {
      id: "pr-3",
      kind: "underline",
      passage:
        "Last spring, our science club went on a hiking trip to a nearby mountain. The trail we chose [1:was] steeper than we had expected, so we stopped often [2:to rest]. Our teacher, who had studied plants for years, showed us some rare flowers [3:growing] between the rocks. When we finally reached the top, the view was so [4:amazing] that nobody said a word. The afternoon sun was strong on the way down, so we had to protect [5:us] with more sunscreen.",
      answer: 5,
      fix: "ourselves",
      why: [
        "주어는 The trail(단수)이에요. we chose는 관계대명사가 생략된 관계절이라 괄호를 치면 The trail was가 돼요.",
        "stop to부정사는 '~하려고 멈추다'라는 뜻이에요. 쉬려고 멈춘 것이니 to rest가 맞아요.",
        "growing은 some rare flowers를 뒤에서 꾸미는 현재분사예요. 꽃이 바위 틈에서 스스로 '자라는' 능동 관계라 -ing가 맞아요. 이 문장의 진짜 동사는 showed예요.",
        "경치가 사람을 '놀라게 하는' 것이라 현재분사 amazing이 맞아요. 우리가 놀란 것을 말할 때는 amazed를 써요.",
        "protect의 주어는 we이고, 보호하는 대상도 우리 자신이에요. 주어와 목적어가 같으니 us를 재귀대명사 ourselves로 고쳐야 해요.",
      ],
      ko: "지난봄 우리 과학 동아리는 근처 산으로 등산을 갔다. 우리가 고른 길은 예상보다 가팔라서 쉬려고 자주 멈췄다. 여러 해 동안 식물을 공부해 오신 선생님은 바위 틈에서 자라는 희귀한 꽃들을 보여 주셨다. 마침내 정상에 올랐을 때 경치가 너무 멋져서 아무도 말을 하지 않았다. 내려오는 길에는 오후 햇볕이 강해서 선크림을 더 발라 우리 자신을 보호해야 했다.",
    },
    {
      id: "pr-4",
      kind: "underline",
      passage:
        "Psychologists often [1:divide] motivation into two types. One comes from inside a person, and [2:another] comes from outside sources, such as prizes or grades. Students [3:driven] by inner interest tend to keep learning even after a test is over. In contrast, those who study only for rewards often lose interest once the rewards [4:disappear]. That is why many teachers try to make lessons [5:interesting] rather than simply offering prizes.",
      answer: 2,
      fix: "the other",
      why: [
        "주어는 Psychologists(복수)라 divide가 맞아요. divide A into B는 'A를 B로 나누다'예요.",
        "종류가 두 개로 정해져 있을 때 하나는 one, 나머지 하나는 the other로 가리켜요. another는 셋 이상 가운데 '또 다른 하나'라서 the other로 고쳐야 해요.",
        "학생들은 흥미에 '이끌리는' 쪽이라 과거분사 driven이 Students를 꾸며요. 이 문장의 진짜 동사는 tend예요.",
        "once는 '일단 ~하면'이라는 접속사라 뒤에 주어 the rewards와 진짜 동사가 와요. disappear는 자동사라 수동태로 쓰지 않고, 주어가 복수라 disappear가 맞아요.",
        "make + 목적어 + 형용사 보어 구조예요. 수업이 학생에게 흥미를 '주는' 것이라 interesting이 맞아요.",
      ],
      ko: "심리학자들은 흔히 동기를 두 종류로 나눈다. 하나는 사람의 안에서 나오고, 다른 하나는 상이나 성적 같은 바깥의 원천에서 온다. 내면의 흥미에 이끌린 학생들은 시험이 끝난 뒤에도 계속 배우는 경향이 있다. 반면에 보상만을 위해 공부하는 사람들은 보상이 사라지면 흥미를 잃는 경우가 많다. 그래서 많은 교사가 그저 상을 주기보다 수업을 흥미롭게 만들려고 애쓴다.",
    },
    {
      id: "pr-5",
      kind: "underline",
      passage:
        "Long before satellites existed, sailors [1:relied] on the stars to find their way at sea. They used a tool called an astrolabe, which [2:measured] the height of a star above the horizon. Although the tool looked simple, using it correctly [3:required] years of practice. Many young sailors found the stars confusing at first, but after a few voyages they could name [4:it] without thinking. Knowledge like this was so valuable that experienced navigators were [5:highly] respected.",
      answer: 4,
      fix: "them",
      why: [
        "rely on은 '~에 의지하다'예요. Long before절에는 existed가 있고, 주절의 주어 sailors에게도 진짜 동사가 필요하니 relied가 맞아요.",
        "which는 관계대명사이고 선행사는 an astrolabe예요. 관계절에 진짜 동사가 필요하고, 도구가 높이를 '재는' 쪽이라 능동 measured가 맞아요.",
        "Although가 접속사라 진짜 동사는 looked와 required 두 개예요. 주절의 주어는 동명사구 using it correctly이고, 그 진짜 동사로 required가 맞아요.",
        "가리키는 것은 앞의 the stars(복수)예요. 복수 명사를 받으니 it을 them으로 고쳐야 해요.",
        "과거분사 respected를 꾸미는 자리라 부사가 와요. highly는 '매우, 크게'라는 뜻이라 highly respected가 맞아요.",
      ],
      ko: "인공위성이 생기기 훨씬 전에 선원들은 바다에서 길을 찾으려고 별에 의지했다. 그들은 아스트롤라베라는 도구를 썼는데, 이 도구는 수평선 위로 별이 얼마나 높이 떠 있는지를 쟀다. 도구는 단순해 보였지만 제대로 쓰려면 여러 해의 연습이 필요했다. 많은 젊은 선원이 처음에는 별들을 헷갈려했지만, 몇 번 항해하고 나면 생각하지 않고도 별들의 이름을 댈 수 있었다. 이런 지식은 매우 귀중해서 경험 많은 항해사는 크게 존경받았다.",
    },
    {
      id: "pr-6",
      kind: "box",
      passage:
        "Venice, a city built on more than a hundred small islands, is famous for [A:its|their] canals and old bridges. Instead of cars, boats carry people and goods through the city. Most of the streets there are much narrower than [B:that|those] of modern cities, so getting lost is easy. Visitors who forget to bring a map, however, can buy [C:it|one] at almost any shop near the train station.",
      answer: [0, 1, 1],
      why: [
        "가리키는 것은 문장의 주어 Venice(단수)예요. a city built on more than a hundred small islands는 Venice를 설명하는 삽입구라 islands에 속지 말고 its를 골라요.",
        "비교 대상은 앞의 the streets(복수)예요. 베네치아의 거리와 현대 도시의 거리를 비교하니 복수형 those가 맞아요.",
        "잊고 안 가져온 바로 그 지도를 사는 게 아니라 같은 종류의 지도 하나를 사는 것이에요. 정해지지 않은 같은 종류의 물건은 one으로 받아요.",
      ],
      ko: "100개가 넘는 작은 섬 위에 세워진 도시 베네치아는 운하와 오래된 다리로 유명하다. 이 도시에서는 자동차 대신 배가 사람과 물건을 실어 나른다. 그곳 거리 대부분은 현대 도시의 거리보다 훨씬 좁아서 길을 잃기 쉽다. 하지만 지도를 챙겨 오는 것을 잊은 방문객도 기차역 근처 거의 어느 가게에서나 지도를 살 수 있다.",
    },
    {
      id: "pr-7",
      kind: "box",
      passage:
        "Before a big game, some athletes talk to [A:them|themselves] quietly to calm their nerves. Our soccer team has two goalkeepers, and their habits could not be more different. One listens to loud music until the last minute, while [B:another|the other] sits alone in complete silence. Our coach always tells [C:us|ourselves] that there is no single right way to prepare for a game.",
      answer: [1, 1, 0],
      why: [
        "talk의 주어 some athletes와 to 뒤의 대상이 같은 사람들이에요. 주어가 자기 자신에게 하는 행동이니 재귀대명사 themselves가 맞아요.",
        "골키퍼는 두 명으로 정해져 있어요. 둘 가운데 하나는 One, 나머지 하나는 the other로 가리키니 the other가 맞아요.",
        "tells의 주어는 Our coach이고, 말을 듣는 사람은 우리예요. 주어와 목적어가 다른 사람이라 재귀대명사가 아닌 목적격 us가 맞아요.",
      ],
      ko: "큰 경기를 앞두고 어떤 선수들은 긴장을 풀려고 조용히 혼잣말을 한다. 우리 축구팀에는 골키퍼가 두 명 있는데, 둘의 습관은 더할 나위 없이 다르다. 한 명은 마지막 순간까지 시끄러운 음악을 듣고, 다른 한 명은 완전한 침묵 속에 혼자 앉아 있다. 우리 코치님은 경기를 준비하는 데 정답은 하나가 아니라고 늘 우리에게 말씀하신다.",
    },
    {
      id: "pr-8",
      kind: "box",
      passage:
        "City trees do much more than make streets look green. On hot summer days, the air under a large tree can be several degrees cooler than [A:those|that] in an open parking lot. Trees also clean the air, because [B:their|its] leaves catch dust and absorb harmful gases. Planting a young tree costs little, yet the benefits [C:it|they] brings last for decades.",
      answer: [1, 0, 0],
      why: [
        "비교 대상은 앞의 the air예요. air는 셀 수 없는 명사라 단수로 받으니 that이 맞아요. those는 복수 명사를 받을 때 써요.",
        "잎을 가진 것은 이 문장의 주어 Trees(복수)예요. 복수 명사를 가리키니 their가 맞아요.",
        "the benefits 뒤에 관계대명사가 생략된 관계절이 이어져요. 이로움을 가져다주는 것은 a young tree(단수)이고 관계절 동사도 brings라서 it이 맞아요.",
      ],
      ko: "도시의 나무는 거리를 푸르게 보이게 하는 것보다 훨씬 많은 일을 한다. 더운 여름날 큰 나무 아래의 공기는 탁 트인 주차장의 공기보다 몇 도나 더 시원할 수 있다. 나무는 또 공기를 깨끗하게 하는데, 잎이 먼지를 붙잡고 해로운 기체를 빨아들이기 때문이다. 어린나무 한 그루를 심는 데는 돈이 적게 들지만, 그 나무가 가져다주는 이로움은 수십 년 동안 이어진다.",
    },
  ],
};

export default topic;
