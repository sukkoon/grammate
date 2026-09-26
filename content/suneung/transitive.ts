import type { SuneungTopic } from "./types";

const topic: SuneungTopic = {
  id: "transitive",
  title: "자동사 vs 타동사",
  items: [
    {
      id: "tr-1",
      kind: "underline",
      passage:
        "Every year, our hiking club climbs the highest mountain in our area to watch the sun [1:rise] over the sea. This year, we [2:reached] the top about twenty minutes before dawn. Tired from the long climb, some members [3:lay] down on the flat rocks to rest. As the sky grew brighter, all of us [4:raised] to our feet and cheered together. The amazing view made the difficult climb completely [5:worthwhile].",
      answer: 4,
      fix: "rose",
      why: [
        "지각동사 watch + 목적어 + 동사원형 구조예요. 해가 스스로 떠오르는 것이라 목적어가 필요 없는 자동사 rise가 맞아요.",
        "reach는 타동사라 전치사 없이 목적어 the top을 바로 받아요. reached at이라고 쓰지 않아요.",
        "뒤에 목적어가 없으니 자동사 lie(눕다)예요. 과거의 일이라 lie의 과거형 lay가 맞아요.",
        "뒤에 목적어가 없고 '일어서다'라는 뜻이라 자동사 rise를 써야 해요. raise는 목적어가 필요한 타동사이니 과거형 rose로 고쳐요.",
        "make + 목적어 + 형용사 보어 구조예요. 산행이 보람 있는 상태라 형용사 worthwhile이 맞아요.",
      ],
      ko: "해마다 우리 등산 동아리는 바다 위로 해가 떠오르는 것을 보려고 우리 지역에서 가장 높은 산에 오른다. 올해 우리는 동트기 20분쯤 전에 정상에 도착했다. 긴 산행에 지친 몇몇 회원은 평평한 바위 위에 누워 쉬었다. 하늘이 밝아지자 우리는 모두 자리에서 일어나 함께 환호했다. 멋진 경치 덕분에 힘든 산행이 완전히 보람 있는 일이 되었다.",
    },
    {
      id: "tr-2",
      kind: "underline",
      passage:
        "Last week, our class held a meeting to decide how to spend the money [1:raised] at the school festival. We [2:discussed about] several ideas, such as buying books for the library and planting trees in the schoolyard. Many students wanted the money [3:to go] to the library, while others believed that trees [4:would make] the school more pleasant. In the end, we agreed to divide the money equally, [5:which] made everyone happy.",
      answer: 2,
      fix: "discussed",
      why: [
        "돈은 축제에서 모인(모금된) 쪽이라 타동사 raise의 과거분사 raised가 the money를 꾸며요. 자동사 rise는 수동의 뜻으로 쓸 수 없어요.",
        "discuss는 '~에 대해 의논하다'라는 뜻의 타동사라 전치사 없이 목적어를 바로 받아요. about을 빼고 discussed로 고쳐요.",
        "want + 목적어 + to부정사 구조예요. 돈이 도서관으로 가는 쪽이라 to go가 맞아요.",
        "that절의 주어 trees 뒤 진짜 동사 자리예요. 과거(believed)에서 본 미래라 would make가 맞고, make는 목적어 the school과 형용사 보어 more pleasant를 받아요.",
        "앞 절 전체(돈을 똑같이 나누기로 한 것)를 받는 계속적 용법의 which예요. 뒤에 주어가 빠진 절이 와서 which가 맞아요.",
      ],
      ko: "지난주 우리 반은 학교 축제에서 모은 돈을 어떻게 쓸지 정하려고 회의를 열었다. 우리는 도서관에 책을 사 주는 것이나 운동장에 나무를 심는 것 같은 여러 아이디어를 의논했다. 많은 학생은 그 돈이 도서관에 쓰이기를 바랐고, 다른 학생들은 나무가 학교를 더 쾌적하게 만들 것이라고 생각했다. 결국 우리는 돈을 똑같이 나누기로 했고, 그 결정에 모두가 만족했다.",
    },
    {
      id: "tr-3",
      kind: "underline",
      passage:
        "Archaeologists recently discovered an ancient village [1:buried] under a thick layer of ash. They believe that a volcano near the village [2:erupted] suddenly about two thousand years ago. Because the ash covered everything so quickly, many objects [3:remain] almost perfectly preserved today. The researchers even found loaves of bread [4:left] on kitchen tables. However, nobody knows exactly what [5:was happened] to the people who lived there.",
      answer: 5,
      fix: "happened",
      why: [
        "마을은 화산재 아래에 묻힌 쪽이라 과거분사 buried가 village를 꾸며요. 이 문장의 진짜 동사는 discovered예요.",
        "that절의 주어는 a volcano(단수)이고 near the village는 꾸미는 말이에요. erupt는 목적어가 필요 없는 자동사라 능동 과거형 erupted가 맞아요.",
        "주어는 many objects(복수)이고, 오늘날(today)의 상태라 현재형 remain이 맞아요. remain은 수동태로 쓰지 않는 자동사이고, 뒤의 preserved는 보어예요.",
        "빵은 식탁 위에 남겨진 쪽이라 과거분사 left가 맞아요. found + 목적어 + p.p. 구조예요.",
        "happen은 목적어가 없는 자동사라 수동태로 쓸 수 없어요. was happened를 happened로 고쳐요.",
      ],
      ko: "고고학자들은 최근 두꺼운 화산재 층 아래에 묻힌 고대 마을을 발견했다. 그들은 약 2천 년 전 마을 근처의 화산이 갑자기 분화했다고 믿는다. 화산재가 모든 것을 매우 빠르게 덮었기 때문에, 많은 물건이 오늘날까지 거의 완벽하게 보존된 채로 남아 있다. 연구자들은 식탁 위에 남겨진 빵 덩어리까지 발견했다. 하지만 그곳에 살던 사람들에게 무슨 일이 일어났는지는 아무도 정확히 알지 못한다.",
    },
    {
      id: "tr-4",
      kind: "underline",
      passage:
        "Many people are surprised when a child [1:resembles to] a grandparent more than either parent. Scientists explain that some traits [2:passed] down from grandparents can stay hidden for a generation. For example, a boy might have blue eyes even though both of his parents [3:have] brown eyes. This can happen because each parent may carry a hidden gene [4:that] does not show up in his or her own appearance. Such cases help researchers [5:understand] how traits are inherited.",
      answer: 1,
      fix: "resembles",
      why: [
        "resemble은 '~을 닮다'라는 뜻의 타동사라 전치사 없이 목적어를 바로 받아요. to를 빼고 resembles로 고쳐요.",
        "특징은 조부모에게서 물려 내려지는 쪽이라 과거분사 passed가 traits를 꾸며요. that절의 진짜 동사는 can stay예요.",
        "though절의 주어는 both of his parents(복수)라 복수 동사 have가 맞아요.",
        "선행사 a hidden gene을 꾸미는 관계대명사예요. 뒤에 주어가 빠진 절(___ does not show up)이 와서 that이 맞아요.",
        "help + 목적어 + (to) 동사원형 구조예요. 연구자들이 이해하는 쪽이라 understand가 맞아요.",
      ],
      ko: "아이가 부모 어느 쪽보다 조부모를 더 닮으면 많은 사람이 놀란다. 과학자들은 조부모에게서 물려받은 어떤 특징이 한 세대 동안 숨어 있을 수 있다고 설명한다. 예를 들어, 부모 두 사람 모두 눈동자가 갈색이어도 아들은 파란 눈을 가질 수 있다. 이런 일은 부모가 각자 자기 겉모습에는 드러나지 않는 숨은 유전자를 지니고 있을 수 있기 때문에 일어난다. 이런 사례는 연구자들이 특징이 어떻게 유전되는지 이해하는 데 도움을 준다.",
    },
    {
      id: "tr-5",
      kind: "underline",
      passage:
        "When our train finally [1:arrived at] the small station, it was already midnight. The streets were quiet, and a cold wind made the walk to our guesthouse [2:feel] much longer than it really was. As we [3:approached to] the building, we noticed that all the lights were off. Luckily, the owner, [4:who] had been waiting for us, opened the door before we even knocked. She had also left a cup of warm tea [5:ready] in each room.",
      answer: 3,
      fix: "approached",
      why: [
        "arrive는 자동사라 장소 앞에 전치사가 필요해요. 역처럼 한 지점에는 at을 써서 arrived at이 맞아요.",
        "사역동사 make + 목적어 + 동사원형 구조예요. 걷는 길이 길게 느껴지는 것이라 feel이 맞아요.",
        "approach는 '~에 다가가다'라는 뜻의 타동사라 전치사 없이 목적어를 바로 받아요. to를 빼고 approached로 고쳐요.",
        "사람 선행사 the owner를 받는 계속적 용법의 관계대명사예요. 뒤에 주어가 빠진 절(___ had been waiting)이 와서 who가 맞아요.",
        "leave + 목적어 + 형용사 보어 구조예요. 차가 준비된 상태라 형용사 ready가 맞아요.",
      ],
      ko: "기차가 마침내 작은 역에 도착했을 때는 벌써 자정이었다. 거리는 조용했고, 차가운 바람 때문에 숙소까지 걷는 길이 실제보다 훨씬 길게 느껴졌다. 건물에 다가갔을 때 우리는 불이 모두 꺼져 있는 것을 알아차렸다. 다행히 우리를 기다리고 있던 주인이 우리가 문을 두드리기도 전에 문을 열어 주었다. 주인은 방마다 따뜻한 차 한 잔도 준비해 두었다.",
    },
    {
      id: "tr-6",
      kind: "box",
      passage:
        "In many old paintings, a sleeping dog [A:lies|lays] at its owner's feet as a symbol of loyalty. Art historians say that painters often [B:rose|raised] the status of the people in the picture by adding such faithful animals. Today, when visitors [C:sit|seat] in front of these works for a while, they can still feel the warm bond between the owners and their pets.",
      answer: [0, 1, 0],
      why: [
        "뒤에 목적어가 없고 '누워 있다'라는 뜻이라 자동사 lie예요. 주어 a sleeping dog이 단수라 lies가 맞아요. lays는 '놓다'라는 타동사예요.",
        "뒤에 목적어 the status가 있으니 타동사 raise(올리다)의 과거형 raised가 맞아요. rose는 목적어를 갖지 않는 자동사 rise의 과거형이에요.",
        "뒤에 목적어가 없고 '앉다'라는 뜻이라 자동사 sit이 맞아요. seat은 '앉히다'라는 타동사라 목적어가 필요해요.",
      ],
      ko: "옛 그림 중에는 잠든 개가 충성의 상징으로 주인의 발치에 누워 있는 것이 많다. 미술사학자들은 화가들이 이런 충직한 동물을 그려 넣어 그림 속 인물의 지위를 높이곤 했다고 말한다. 오늘날에도 관람객이 이 작품들 앞에 잠시 앉아 있으면 주인과 반려동물 사이의 따뜻한 유대를 여전히 느낄 수 있다.",
    },
    {
      id: "tr-7",
      kind: "box",
      passage:
        "Problems often [A:arouse|arise] when friends make plans without asking everyone's opinion. A good way to avoid such conflict is to [B:discuss|discuss about] each option openly before making a final decision. Even a small complaint, if it is ignored, can [C:arise|arouse] strong feelings of anger later. Listening carefully to each other, even when we disagree, is the first step toward lasting friendships.",
      answer: [1, 0, 1],
      why: [
        "뒤에 목적어가 없고 '(문제가) 생기다'라는 뜻이라 자동사 arise가 맞아요. arouse는 목적어가 필요한 타동사예요.",
        "discuss는 타동사라 전치사 없이 목적어 each option을 바로 받아요. discuss about은 틀린 표현이에요.",
        "뒤에 목적어 strong feelings가 있고 '(감정을) 불러일으키다'라는 뜻이라 타동사 arouse가 맞아요.",
      ],
      ko: "친구들이 모두의 의견을 묻지 않고 계획을 세우면 문제가 생기는 일이 많다. 이런 갈등을 피하는 좋은 방법은 최종 결정을 내리기 전에 선택지 하나하나를 터놓고 의논하는 것이다. 작은 불만이라도 무시당하면 나중에 강한 분노를 불러일으킬 수 있다. 의견이 다를 때조차 서로의 말에 귀 기울이는 것이 오래가는 우정을 향한 첫걸음이다.",
    },
    {
      id: "tr-8",
      kind: "box",
      passage:
        "Every summer, a small island village holds a festival that [A:consists of|is consisted of] three days of music, dancing, and traditional games. Because there is no bridge to the island, most visitors [B:arrive|reach] the village by boat. Last year, a power outage [C:was occurred|occurred] on the second night, but the villagers quickly lit hundreds of lanterns and continued the concert. Thanks to their quick thinking, not a single performance was canceled.",
      answer: [0, 1, 1],
      why: [
        "consist of는 '~로 이루어지다'라는 뜻의 자동사 표현이라 수동태로 쓰지 않아요. 관계대명사 that의 선행사 a festival이 단수라 consists of가 맞아요.",
        "뒤에 전치사 없이 목적어 the village가 바로 와요. 그래서 타동사 reach가 맞고, 자동사 arrive를 쓰려면 arrive at이나 arrive in이 필요해요.",
        "occur(일어나다)는 목적어가 없는 자동사라 수동태로 쓸 수 없어요. was occurred는 틀리고, 능동 과거형 occurred가 맞아요.",
      ],
      ko: "해마다 여름이면 한 작은 섬마을에서 음악과 춤, 전통 놀이로 이루어진 사흘짜리 축제가 열린다. 섬으로 이어진 다리가 없어서 대부분의 방문객은 배를 타고 마을에 도착한다. 작년에는 둘째 날 밤에 정전이 일어났지만, 마을 사람들은 재빨리 등불 수백 개를 밝히고 음악회를 이어 갔다. 그들의 재빠른 판단 덕분에 공연은 하나도 취소되지 않았다.",
    },
  ],
};

export default topic;
