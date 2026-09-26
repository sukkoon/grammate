import type { SuneungTopic } from "./types";

const topic: SuneungTopic = {
  id: "parallel",
  title: "병렬",
  items: [
    {
      id: "pa-1",
      kind: "underline",
      passage:
        "Last spring, our science club turned an empty corner of the schoolyard into a vegetable garden. Every morning before class, members checked the soil, pulled weeds, and [1:recorded] how much each plant had grown. The tomatoes, [2:planted] in the sunniest spot, grew faster than the others. By June, we had enough vegetables to share with the cafeteria and [3:donating] the rest to a local food bank. The project taught us that food does not simply [4:appear] in stores. Growing even a single basket of tomatoes [5:takes] months of patient work.",
      answer: 3,
      fix: "donate",
      why: [
        "and로 이어진 checked, pulled, recorded가 모두 주어 members의 진짜 동사예요. 앞의 짝이 과거형이라 recorded가 맞아요.",
        "토마토는 '심어진' 쪽이라 수동의 과거분사 planted가 tomatoes를 꾸며요. 이 문장의 진짜 동사는 grew예요.",
        "and 앞에서 같은 자리의 짝을 찾으면 enough vegetables 뒤의 to share예요. to부정사끼리 이어야 하니 donating을 (to) donate로 고쳐야 해요. 진짜 동사 had와 짝이라고 봐도 donated여야 하니 -ing는 어느 쪽으로도 맞지 않아요.",
        "does not 뒤에는 동사원형이 와요. appear는 목적어가 필요 없는 동사라 능동 원형 appear가 맞아요.",
        "주어는 동명사구 Growing even a single basket of tomatoes예요. 동명사 주어는 단수라 takes가 맞아요.",
      ],
      ko: "지난봄 우리 과학 동아리는 학교 운동장의 빈 구석을 채소밭으로 바꾸었다. 매일 아침 수업 전에 부원들은 흙을 살피고, 잡초를 뽑고, 식물마다 얼마나 자랐는지 기록했다. 가장 볕이 잘 드는 곳에 심은 토마토는 다른 채소보다 빨리 자랐다. 6월이 되자 우리는 급식실과 나누고 남은 것은 지역 푸드뱅크에 기부할 만큼 채소가 넉넉했다. 이 활동은 음식이 가게에 그냥 나타나는 것이 아니라는 것을 가르쳐 주었다. 토마토 한 바구니를 키우는 데에도 몇 달 동안의 끈기 있는 노력이 든다.",
    },
    {
      id: "pa-2",
      kind: "underline",
      passage:
        "Regular exercise benefits not only the body but also the mind. When we run or swim, the brain [1:releases] chemicals that improve our mood. Studies show that students who exercise before class [2:pay] attention longer and remember lessons better. Exercise does not have to be [3:intense] to be effective; a brisk twenty-minute walk is often enough. What matters most is choosing an activity you enjoy and [4:sticking] with it. Dancing with friends, for example, raises your heart rate and [5:lifting] your mood at the same time.",
      answer: 5,
      fix: "lifts",
      why: [
        "when절 다음 주절의 주어는 the brain(단수)이라 releases가 맞아요. that improve our mood는 chemicals를 꾸미는 관계절이에요.",
        "that절의 주어는 students(복수)예요. who exercise before class는 students를 꾸미는 관계절이라 괄호를 치면 students pay가 되고, and 뒤의 remember와도 모양이 같아요.",
        "be동사 뒤의 보어 자리라 형용사 intense가 맞아요. 부사 intensely는 보어가 될 수 없어요.",
        "is 뒤의 보어가 동명사 choosing이고, and로 이어진 짝이라 동명사 sticking이 맞아요.",
        "and 앞의 짝은 주어 Dancing with friends의 진짜 동사 raises예요. -ing는 진짜 동사 자리에 올 수 없고, 동명사 주어는 단수이니 lifting을 lifts로 고쳐야 해요.",
      ],
      ko: "규칙적인 운동은 몸뿐 아니라 마음에도 이롭다. 달리거나 수영을 하면 뇌는 기분을 좋게 하는 화학 물질을 내보낸다. 연구에 따르면 수업 전에 운동하는 학생은 더 오래 집중하고 수업 내용을 더 잘 기억한다. 운동이 효과가 있으려고 꼭 격렬할 필요는 없다. 20분 동안 빠르게 걷는 것으로도 대개 충분하다. 가장 중요한 것은 즐길 수 있는 활동을 골라 꾸준히 하는 것이다. 예를 들어 친구들과 춤을 추면 심장 박동이 빨라지는 동시에 기분도 좋아진다.",
    },
    {
      id: "pa-3",
      kind: "underline",
      passage:
        "Ancient Roman roads were built to be both [1:strongly] and practical. Engineers dug deep trenches, [2:filled] them with layers of stone and gravel, and covered the surface with flat paving stones. Because the roads were slightly higher in the middle, rainwater ran off to the sides instead of [3:collecting] on top. Some of these roads [4:are] still in use today, more than two thousand years later. Their design shows how careful planning can make a structure [5:last] for centuries.",
      answer: 1,
      fix: "strong",
      why: [
        "both A and B의 A와 B는 같은 모양이어야 해요. 짝인 practical이 형용사이고 be의 보어 자리이니 부사 strongly를 형용사 strong으로 고쳐야 해요.",
        "and로 이어진 dug, filled, covered가 모두 주어 Engineers의 진짜 동사예요. 뒤에 목적어 them이 있으니 능동의 과거형 filled가 맞아요.",
        "instead of는 전치사라서 뒤에 동명사가 와요. 그래서 collecting이 맞아요.",
        "some of + 명사는 of 뒤의 명사에 수를 맞춰요. roads가 복수라 are가 맞아요.",
        "사역동사 make는 목적어 뒤에 동사원형을 써요. 구조물이 오래 견디는 것이라 원형 last가 맞아요.",
      ],
      ko: "고대 로마의 도로는 튼튼하면서도 쓸모 있게 만들어졌다. 기술자들은 깊은 도랑을 파고, 돌과 자갈을 여러 층으로 채운 다음, 표면을 평평한 포장용 돌로 덮었다. 도로의 가운데가 약간 높았기 때문에 빗물은 위에 고이지 않고 양옆으로 흘러내렸다. 이 도로 가운데 일부는 이천 년이 넘게 지난 오늘날에도 여전히 쓰이고 있다. 그 설계는 세심한 계획이 어떻게 구조물을 수백 년 동안 견디게 할 수 있는지 보여 준다.",
    },
    {
      id: "pa-4",
      kind: "underline",
      passage:
        "Every year, a huge amount of plastic [1:thrown] away on land ends up in the ocean. Some of it is swallowed by sea animals that mistake it for food, while much of the rest breaks down into tiny pieces [2:that] are almost impossible to remove. Scientists say the best solutions are to use less plastic in the first place and [3:to design] products that can be reused. Governments can either ban single-use items or [4:giving] companies reasons to switch to safer materials. Even small changes can make a [5:surprisingly] large difference when millions of people take part.",
      answer: 4,
      fix: "give",
      why: [
        "플라스틱은 '버려지는' 쪽이라 수동의 과거분사 thrown이 plastic을 꾸며요. 주어의 핵심은 a huge amount(단수)이고, 이 문장의 진짜 동사는 ends예요.",
        "tiny pieces를 꾸미는 관계절에서 are의 주어가 비어 있어요. 그래서 주격 관계대명사 that이 맞아요.",
        "are 뒤의 보어가 to use이고 and로 이어진 짝이라 to부정사 to design이 맞아요.",
        "either A or B의 A는 조동사 can 뒤의 동사원형 ban이에요. B도 같은 모양이어야 하니 giving을 give로 고쳐야 해요.",
        "형용사 large를 꾸미는 자리라 부사 surprisingly가 맞아요.",
      ],
      ko: "해마다 육지에서 버려진 엄청난 양의 플라스틱이 결국 바다로 간다. 그중 일부는 그것을 먹이로 착각한 바다 동물이 삼키고, 나머지 가운데 상당수는 거의 없앨 수 없는 아주 작은 조각으로 부서진다. 과학자들은 가장 좋은 해결책은 애초에 플라스틱을 덜 쓰고, 다시 쓸 수 있는 제품을 설계하는 것이라고 말한다. 정부는 일회용품을 금지하거나 기업이 더 안전한 재료로 바꿀 이유를 줄 수 있다. 수백만 명이 함께하면 작은 변화도 놀라울 만큼 큰 차이를 만들 수 있다.",
    },
    {
      id: "pa-5",
      kind: "underline",
      passage:
        "Learning a musical instrument is a workout for the brain. Musicians must read notes, [1:move] their fingers precisely, and listen to their own sound, all at the same time. Studies suggest that regular practice helps children both [2:concentrating] better and remember more of what they learn. Interestingly, these benefits [3:seem] to last even after people stop playing. Adults who [4:played] an instrument as children often have sharper hearing later in life than [5:those] who never did.",
      answer: 2,
      fix: "concentrate",
      why: [
        "조동사 must 뒤에 read, move, listen이 and로 이어졌어요. 모두 동사원형이어야 하니 move가 맞아요.",
        "both A and B의 짝인 remember가 동사원형이에요. help + 목적어 + (to) 동사원형 자리이기도 해서 concentrating을 concentrate로 고쳐야 해요.",
        "주어는 these benefits(복수)라서 seem이 맞아요. seem 뒤에는 to부정사 to last가 와요.",
        "as children(어렸을 때)이라는 지나간 때를 말하니 과거형 played가 맞아요. 관계절의 진짜 동사이고, 문장 전체의 진짜 동사는 have예요.",
        "비교하는 대상은 adults(복수)예요. 복수 명사를 되풀이하지 않고 받는 말은 those예요. 뒤의 did는 played an instrument를 대신하는 대동사예요.",
      ],
      ko: "악기를 배우는 것은 뇌를 위한 운동이다. 연주자는 악보를 읽고, 손가락을 정확하게 움직이고, 자기 소리를 듣는 일을 모두 한꺼번에 해야 한다. 연구에 따르면 꾸준한 연습은 아이들이 더 잘 집중하고 배운 것을 더 많이 기억하도록 돕는다. 흥미롭게도 이런 효과는 연주를 그만둔 뒤에도 이어지는 것 같다. 어릴 때 악기를 연주한 어른은 한 번도 연주하지 않은 사람보다 나이가 들어서도 청력이 좋은 경우가 많다.",
    },
    {
      id: "pa-6",
      kind: "box",
      passage:
        "Last month, our class spent three days in the mountains learning about wild plants. Each day we hiked to a new area and [A:collected|collecting] fallen leaves. Our guide told us to look closely at the shape of each leaf and [B:compare|comparing] it with the pictures in our field guide. By the end of the trip, most of us found drawing the plants more relaxing than [C:to photograph|photographing] them.",
      answer: [0, 0, 1],
      why: [
        "and 앞의 짝은 주어 we의 진짜 동사 hiked예요. 뒤도 진짜 동사 과거형 collected여야 하고, collecting은 and 뒤에서 진짜 동사 역할을 할 수 없어요.",
        "told us to look ~ and ___에서 짝은 to look이에요. to부정사끼리 이을 때 뒤의 to는 생략할 수 있어서 compare가 맞아요.",
        "than 뒤는 비교 대상이라 find의 목적어인 동명사 drawing과 같은 모양인 photographing이 맞아요. find + 목적어 + 보어에서 목적어 자리에 to부정사를 바로 쓸 수 없으니 to photograph는 틀려요.",
      ],
      ko: "지난달 우리 반은 산에서 사흘을 보내며 야생 식물에 대해 배웠다. 날마다 우리는 새로운 곳으로 걸어가 떨어진 나뭇잎을 모았다. 안내인은 우리에게 잎마다 모양을 자세히 보고 도감의 그림과 비교해 보라고 했다. 여행이 끝날 무렵, 우리 대부분은 식물을 사진으로 찍는 것보다 그리는 것이 마음이 더 편안하다는 것을 알게 되었다.",
    },
    {
      id: "pa-7",
      kind: "box",
      passage:
        "Many people believe that great writers are simply born with talent. In fact, most skilled writers got better through years of reading widely and [A:writing|to write] every day. Talent certainly helps, but it is neither [B:necessarily|necessary] nor sufficient for success. Good writers not only read a lot but also [C:revising|revise] their work again and again. For them, writing is less a gift than a daily habit.",
      answer: [0, 1, 1],
      why: [
        "전치사 of 뒤의 동명사 reading과 and로 이어진 짝이에요. 전치사의 목적어 자리라 to부정사는 올 수 없고 동명사 writing이 맞아요.",
        "neither A nor B의 짝인 sufficient가 형용사이고, is 뒤의 보어 자리예요. 부사 necessarily가 아니라 형용사 necessary가 맞아요.",
        "not only A but also B에서 A는 주어 Good writers의 진짜 동사 read예요. B도 진짜 동사여야 하니 revise가 맞아요.",
      ],
      ko: "많은 사람은 훌륭한 작가가 그저 재능을 타고난다고 믿는다. 사실 대부분의 뛰어난 작가는 여러 해 동안 폭넓게 읽고 날마다 쓰면서 실력이 늘었다. 재능은 분명 도움이 되지만, 성공에 꼭 필요한 것도 아니고 그것만으로 충분한 것도 아니다. 좋은 작가는 많이 읽을 뿐 아니라 자기 글을 몇 번이고 고쳐 쓴다. 그들에게 글쓰기는 타고난 재주라기보다 날마다 하는 습관이다.",
    },
    {
      id: "pa-8",
      kind: "box",
      passage:
        "Volunteering at the animal shelter last summer taught me both patience and [A:responsible|responsibility]. On weekends, I either walked the dogs or [B:cleaning|cleaned] their cages. At first, I thought the job was mostly about playing with cute animals. However, the staff explained that caring for animals is more about showing up every day than [C:feeling|to feel] sorry for them. Now I understand what they meant.",
      answer: [1, 1, 0],
      why: [
        "both A and B의 짝 patience가 명사이고 taught me 뒤의 목적어 자리예요. 형용사 responsible이 아니라 명사 responsibility가 맞아요.",
        "either A or B의 짝 walked가 주어 I의 진짜 동사(과거)예요. B도 진짜 동사여야 하니 cleaned가 맞아요.",
        "more about ~ than 뒤는 비교 대상이에요. 전치사 about 뒤의 동명사 showing과 같은 모양인 feeling이 맞아요.",
      ],
      ko: "지난여름 동물 보호소에서 봉사한 일은 나에게 인내심과 책임감을 둘 다 가르쳐 주었다. 주말마다 나는 개를 산책시키거나 우리를 청소했다. 처음에는 그 일이 주로 귀여운 동물과 노는 것이라고 생각했다. 하지만 직원들은 동물을 돌보는 일은 동물을 불쌍히 여기는 것보다 날마다 빠짐없이 나오는 것에 더 가깝다고 설명해 주었다. 이제 나는 그 말이 무슨 뜻이었는지 안다.",
    },
  ],
};

export default topic;
