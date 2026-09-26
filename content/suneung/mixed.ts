import type { SuneungTopic } from "./types";

/**
 * 실전 29번형: 한 지문(120~170단어)에 제7부의 여러 포인트가 섞여 나온다.
 * 밑줄형은 다섯 밑줄이 모두 다른 포인트를 묻고, 네모형은 세 네모가 서로 다른 포인트를 묻는다.
 * 모든 지문은 그래머랑이 새로 쓴 것이다(기출·모의고사·EBS 지문을 옮기거나 고쳐 쓰지 않았다).
 */
const topic: SuneungTopic = {
  id: "mixed",
  title: "실전 29번형",
  items: [
    {
      id: "mx-1",
      kind: "underline",
      passage:
        "Have you ever felt that everyone was staring at a small stain on your shirt? Psychologists call this feeling the spotlight effect. In a typical study, volunteers [1:were asked] to walk into a room full of strangers while wearing an unusual T-shirt. Afterward, they guessed how many people in the room had noticed the shirt. Their guesses were nearly twice as high as the actual number, [2:which] shows how much we overestimate the attention of others. The main reason for this error [3:lie] in the way we experience the world. We all live inside our own heads, so our appearance and actions seem [4:obvious] to us. Other people, however, are busy worrying about themselves. Understanding this can make social situations much less stressful. The next time you trip on the stairs or mispronounce a word in class, remember that most people are too focused on [5:their] own concerns to notice.",
      answer: 3,
      fix: "lies",
      why: [
        "자원자들은 방에 들어가 달라는 '요청을 받는' 쪽이라 수동태 were asked가 맞아요. ask + 목적어 + to부정사가 수동태가 되면 be asked to walk 모양이 돼요.",
        "쉼표 뒤에서 앞 절 전체(추측이 실제의 두 배쯤이었다는 것)를 받는 계속적 용법의 관계대명사예요. 뒤에 주어가 빠진 절(shows ~)이 오고, 쉼표 뒤에는 that을 쓸 수 없으니 which가 맞아요.",
        "주어는 The main reason(단수)이에요. for this error는 꾸미는 말이라 괄호를 치면 The main reason lie가 남으니, 단수 동사 lies로 고쳐야 해요.",
        "seem은 형용사 보어를 받는 2형식 동사예요. 외모와 행동이 '뻔히 보인다'는 상태를 말하니 형용사 obvious가 맞아요.",
        "가리키는 말은 most people(복수)이에요. 그래서 복수 소유격 their가 맞아요.",
      ],
      ko: "다들 내 셔츠에 묻은 작은 얼룩만 쳐다보고 있다고 느낀 적이 있는가? 심리학자들은 이런 느낌을 스포트라이트 효과라고 부른다. 전형적인 연구에서 자원자들은 특이한 티셔츠를 입은 채 낯선 사람들로 가득한 방에 걸어 들어가 달라는 요청을 받았다. 나중에 그들은 방 안의 몇 명이 그 셔츠를 알아챘을지 추측했다. 그들의 추측은 실제 숫자의 거의 두 배였는데, 이는 우리가 다른 사람의 관심을 얼마나 부풀려 생각하는지 보여 준다. 이런 착각의 주된 이유는 우리가 세상을 경험하는 방식에 있다. 우리는 모두 자기 머릿속에서 살기 때문에, 자신의 외모와 행동이 스스로에게는 뻔히 드러나 보인다. 하지만 다른 사람들은 자기 걱정을 하느라 바쁘다. 이것을 이해하면 사람들과 어울리는 자리가 훨씬 덜 부담스러워질 수 있다. 다음에 계단에서 발을 헛디디거나 수업 시간에 단어를 잘못 발음하더라도, 대부분의 사람은 자기 걱정에 너무 몰두해 있어서 알아채지 못한다는 것을 기억하라.",
    },
    {
      id: "mx-2",
      kind: "underline",
      passage:
        "[1:Keep] food fresh was a serious challenge before electric refrigerators appeared. In the early 1800s, a few businesses in cold regions began cutting huge blocks of ice from frozen lakes and [2:shipping] them to warmer places. Many people laughed at the idea, sure that the ice would melt long before it arrived. To everyone's surprise, the blocks, [3:packed] tightly in sawdust, lasted for weeks at sea. Soon ice was being delivered to cities where summer temperatures [4:rose] to dangerous levels. Families kept it in wooden boxes lined with metal, and doctors used it to cool patients with high fevers. The trade grew so large that thousands of workers depended on it for their income. However, once machines [5:that] could make ice anywhere became common, the natural ice business disappeared within a few decades.",
      answer: 1,
      fix: "Keeping",
      why: [
        "이 문장에는 접속사 before가 하나 있으니 진짜 동사는 두 개(was, appeared)예요. 주절의 진짜 동사는 was라서 주어 자리의 Keep은 진짜 동사가 될 수 없어요. 동명사 Keeping으로 바꿔서 '음식을 신선하게 보관하는 것'이라는 주어를 만들어야 해요.",
        "began의 목적어인 동명사 cutting과 and로 이어진 병렬이에요. '잘라서 실어 보내기 시작했다'라서 같은 동명사 shipping이 맞아요.",
        "얼음덩어리는 톱밥 속에 '채워 넣어지는' 쪽이라 수동의 과거분사 packed가 맞아요. 쉼표 사이에서 주어 the blocks를 꾸미고, 진짜 동사는 lasted예요.",
        "rise(오르다)는 목적어를 갖지 않는 자동사예요. 기온이 스스로 오른 것이고 뒤에 목적어가 없으니 rose가 맞아요. raise(올리다)였다면 목적어가 있어야 해요.",
        "선행사 machines 뒤에 주어가 빠진 절(could make ice anywhere)이 이어지니 주격 관계대명사 that이 맞아요. once와 that이 있어서 진짜 동사도 could make, became, disappeared 세 개예요.",
      ],
      ko: "전기냉장고가 나오기 전에는 음식을 신선하게 보관하는 것이 큰 과제였다. 1800년대 초, 추운 지역의 몇몇 사업체가 얼어붙은 호수에서 거대한 얼음덩어리를 잘라 내어 더 따뜻한 곳으로 실어 보내기 시작했다. 많은 사람은 얼음이 도착하기 한참 전에 녹아 버릴 것이라 확신하며 그 생각을 비웃었다. 모두가 놀랍게도, 톱밥 속에 단단히 채워 넣은 얼음덩어리는 바다 위에서 몇 주를 버텼다. 곧 여름 기온이 위험한 수준까지 오르는 도시들로 얼음이 배달되었다. 가정에서는 안쪽에 금속을 댄 나무 상자에 얼음을 보관했고, 의사들은 고열 환자의 열을 식히는 데 얼음을 썼다. 이 무역은 규모가 매우 커져서 수천 명의 노동자가 그것으로 생계를 꾸렸다. 그러나 어디서든 얼음을 만들 수 있는 기계가 흔해지자, 천연 얼음 사업은 몇십 년 만에 사라졌다.",
    },
    {
      id: "mx-3",
      kind: "underline",
      passage:
        "Paintings change over time, even when they [1:are kept] in museums. Light, heat, and moisture slowly break down the materials that artists used, causing colors to fade and surfaces to crack. For this reason, many museums employ specialists called conservators. Their job is to protect artworks and, when necessary, [2:repair] the damage. Before touching a painting, a conservator examines it [3:carefully] with microscopes and special lights. These tools can reveal layers of paint hidden beneath the surface. Sometimes they even show that the artist changed the design several times before finishing it. Such discoveries [4:help] historians understand how a masterpiece developed. Conservators also follow one important rule: every change they make should be reversible, so that future experts can remove anything added today. In the end, [5:that] matters most to a conservator is not making a painting look new but keeping it true to the artist's original vision.",
      answer: 5,
      fix: "what",
      why: [
        "그림은 박물관에 '보관되는' 쪽이라 수동태 are kept가 맞아요. 주어 they는 Paintings(복수)를 가리켜서 are예요.",
        "is 뒤의 보어 to protect artworks와 and로 이어진 병렬이에요. 병렬에서 두 번째 to는 생략할 수 있어서 동사원형 repair가 맞아요. when necessary는 사이에 끼어든 말이에요.",
        "동사 examines를 꾸미는 자리라 부사 carefully가 맞아요. examine은 목적어(it)만 있으면 되는 동사라 형용사 보어가 들어갈 자리가 없어요.",
        "주어는 Such discoveries(복수)라 help가 맞아요. help + 목적어 + 동사원형(understand)도 바른 모양이에요.",
        "앞에 선행사가 없고, 뒤의 절에 주어가 빠져 있어요(___ matters most). 이럴 때는 that이 아니라 관계대명사 what을 써서 '가장 중요한 것'이라는 명사절 주어를 만들어야 해요.",
      ],
      ko: "그림은 박물관에 보관되어 있을 때조차 시간이 지나면서 변한다. 빛, 열, 습기가 화가들이 쓴 재료를 서서히 분해해서 색이 바래고 표면이 갈라지게 만든다. 이런 이유로 많은 박물관이 보존 전문가라고 불리는 전문 인력을 둔다. 그들의 일은 작품을 보호하고, 필요할 때는 손상을 복원하는 것이다. 보존 전문가는 그림에 손을 대기 전에 현미경과 특수 조명으로 그림을 꼼꼼히 살핀다. 이런 도구는 표면 아래에 숨어 있는 물감층을 드러낼 수 있다. 때로는 화가가 작품을 완성하기 전에 구도를 여러 번 바꿨다는 사실까지 보여 준다. 이런 발견은 역사가들이 걸작이 어떻게 발전해 왔는지 이해하도록 돕는다. 보존 전문가는 또한 한 가지 중요한 원칙을 지킨다. 자신이 하는 모든 변경은 되돌릴 수 있어야 해서, 미래의 전문가가 오늘 더해진 것을 무엇이든 없앨 수 있어야 한다는 것이다. 결국 보존 전문가에게 가장 중요한 것은 그림을 새것처럼 보이게 하는 것이 아니라 화가가 처음 품었던 뜻에 충실한 모습으로 지켜 내는 것이다.",
    },
    {
      id: "mx-4",
      kind: "underline",
      passage:
        "Coral reefs cover less than one percent of the ocean floor, yet about a quarter of all known ocean species [1:depend] on them for food and shelter. A reef may look like a pile of colorful stones, but in fact it [2:creates] by millions of tiny animals called polyps. Each polyp produces a hard skeleton, and over thousands of years, countless skeletons pile up to form a reef. The polyps also allow tiny algae to live inside their bodies. The algae make food from sunlight, [3:giving] the coral most of the energy it needs. Unfortunately, this partnership is fragile. When the water becomes [4:unusually warm], the coral pushes the algae out and turns white. Scientists call this process bleaching. A bleached reef is not dead yet, but it cannot survive for long without [5:its] partners. As ocean temperatures continue to rise, protecting reefs has become more urgent than ever.",
      answer: 2,
      fix: "is created",
      why: [
        "a quarter of처럼 부분을 나타내는 말은 of 뒤의 명사에 수를 맞춰요. species는 단수와 복수의 모양이 같은데, all이 붙은 all known ocean species는 복수라 depend가 맞아요.",
        "산호초는 폴립에 의해 '만들어지는' 쪽이에요. create는 목적어가 꼭 필요한 동사인데 뒤에 목적어가 없고 by + 행위자가 있으니 수동태 is created로 고쳐야 해요.",
        "이 문장의 주절 동사는 make예요(it needs는 앞의 energy를 꾸미는, 관계사가 생략된 절이에요). give를 make와 이어 줄 접속사가 없으니 give는 분사구문으로 변장해요. 조류가 산호에게 에너지를 '주는' 쪽이라 능동의 giving이 맞아요.",
        "become은 형용사 보어를 받는 동사라 warm이 맞고, 형용사 warm을 꾸미는 말은 부사 unusually가 맞아요.",
        "가리키는 말은 A bleached reef(단수, 사물)라 its가 맞아요.",
      ],
      ko: "산호초는 바다 밑바닥의 1퍼센트도 덮지 않지만, 알려진 바다 생물 종의 약 4분의 1이 먹이와 은신처를 산호초에 의지한다. 산호초는 알록달록한 돌무더기처럼 보일지 모르지만, 사실은 폴립이라는 수백만 마리의 작은 동물이 만든 것이다. 폴립은 저마다 단단한 뼈대를 만들고, 수천 년에 걸쳐 셀 수 없이 많은 뼈대가 쌓여 산호초를 이룬다. 폴립은 또한 작은 조류가 자기 몸속에서 살게 해 준다. 조류는 햇빛으로 양분을 만들어 산호에게 필요한 에너지의 대부분을 준다. 안타깝게도 이 동반자 관계는 깨지기 쉽다. 물이 평소와 달리 따뜻해지면 산호는 조류를 밀어내고 하얗게 변한다. 과학자들은 이 과정을 백화 현상이라고 부른다. 하얗게 변한 산호초가 아직 죽은 것은 아니지만, 동반자 없이는 오래 살아남지 못한다. 바다의 수온이 계속 오르면서 산호초를 지키는 일은 그 어느 때보다 시급해졌다.",
    },
    {
      id: "mx-5",
      kind: "underline",
      passage:
        "Sports fans have long believed that teams play better at home, and the records kept by professional leagues [1:support] this belief. In almost every major sport, home teams win more often than visiting teams [2:do]. For years, many people assumed that travel was the main reason. Visiting players often arrive tired after long trips, [3:which] makes it harder for them to perform well. Other studies, however, point to another factor: the crowd. In one experiment, two groups of referees watched the same recorded soccer match. One group heard the noise of the crowd, while the other watched it in silence. The referees who heard the noise called fewer fouls against the home team. Referees may not notice this effect, since each call seems [4:reasonably] at the moment it is made. In other words, crowd noise can affect officials even when they are not aware of [5:being influenced].",
      answer: 4,
      fix: "reasonable",
      why: [
        "and 뒤 절의 주어는 the records(복수)예요. kept by professional leagues는 records를 꾸미는 과거분사구라 괄호를 치면 the records support가 남으니, 복수 동사 support가 맞아요.",
        "앞의 일반동사 win을 대신하는 대동사예요. 주어 visiting teams가 복수이고 현재 시제라 do가 맞아요.",
        "쉼표 뒤에서 앞 절의 내용(지친 채 도착한다는 것)을 받는 계속적 용법의 관계대명사예요. 뒤에 주어가 빠진 절(makes it harder ~)이 이어지니 which가 맞아요.",
        "seem은 형용사 보어를 받는 2형식 동사예요. 판정 하나하나가 '합리적으로 보인다'는 상태를 말하니 부사 reasonably를 형용사 reasonable로 고쳐야 해요.",
        "전치사 of 뒤라 동명사를 써요. 심판은 영향을 '받는' 쪽이라 동명사의 수동형 being influenced가 맞아요.",
      ],
      ko: "스포츠 팬들은 오래전부터 팀이 홈에서 경기를 더 잘한다고 믿어 왔고, 프로 리그가 보관해 온 기록도 이 믿음을 뒷받침한다. 거의 모든 주요 종목에서 홈 팀은 원정 팀보다 더 자주 이긴다. 오랫동안 많은 사람은 이동이 주된 이유라고 여겼다. 원정 선수들은 긴 이동 끝에 지친 채 도착하는 경우가 많은데, 이 때문에 제 실력을 내기가 더 어려워진다. 그러나 다른 연구들은 또 다른 요인, 즉 관중을 지목한다. 한 실험에서 두 무리의 심판이 녹화된 같은 축구 경기를 보았다. 한 무리는 관중의 함성을 들었고, 다른 무리는 소리 없이 경기를 보았다. 함성을 들은 심판들은 홈 팀에게 반칙을 더 적게 선언했다. 판정 하나하나는 내리는 순간에는 합리적으로 보이기 때문에, 심판들은 이 효과를 알아차리지 못할 수 있다. 다시 말해, 관중의 소음은 심판이 자신이 영향을 받고 있다는 것을 모를 때조차 그들에게 영향을 줄 수 있다.",
    },
    {
      id: "mx-6",
      kind: "underline",
      passage:
        "Why does a bottle of water cost so much more at an airport than at a supermarket? The answer lies in a basic principle of economics: sellers can charge more when buyers have fewer choices. Once travelers [1:have passed] through security, they cannot easily leave to shop somewhere else. Airport stores know this, so they can set prices [2:that] would drive customers away in an ordinary neighborhood. In fact, the prices of snacks and drinks at many airports are far higher than [3:that] at regular stores. Rent is another factor. Space inside an airport is limited and costly, and shop owners must earn enough [4:to cover] this expense. Some airports now limit how much stores can charge, hoping to make travelers feel [5:less frustrated]. Still, as long as customers have few other options, sellers will keep the upper hand.",
      answer: 3,
      fix: "those",
      why: [
        "Once(일단 ~하면)가 이끄는 시간의 부사절이에요. 보안 검색을 '통과하고 나면'이라는 완료의 뜻이라 현재완료 have passed가 맞고, 주어 travelers가 복수라 have예요.",
        "선행사 prices 뒤에 주어가 빠진 절(would drive customers away)이 이어지니 주격 관계대명사 that이 맞아요.",
        "비교하는 대상은 앞의 the prices(복수)예요. 같은 명사의 반복을 피하는 대명사도 복수에 맞춰 those로 고쳐야 해요.",
        "enough + to부정사는 '~할 만큼 충분히'라는 뜻이에요. 이미 진짜 동사 must earn이 있으니 cover는 to부정사 to cover로 변장하는 게 맞아요.",
        "make + 목적어 + 동사원형(feel)이고, feel 뒤에는 형용사 보어가 와요. 여행객이 좌절감을 '느끼는' 쪽이라 과거분사형 형용사 frustrated가 맞아요.",
      ],
      ko: "생수 한 병이 슈퍼마켓보다 공항에서 왜 그렇게 훨씬 더 비쌀까? 답은 경제학의 기본 원리, 즉 사는 사람에게 선택지가 적을수록 파는 사람이 값을 더 받을 수 있다는 데 있다. 여행객은 일단 보안 검색을 통과하고 나면 다른 곳에 물건을 사러 쉽게 나갈 수 없다. 공항 상점들은 이를 알기 때문에, 평범한 동네라면 손님을 쫓아낼 만한 가격을 매길 수 있다. 실제로 많은 공항의 과자와 음료 가격은 일반 상점의 가격보다 훨씬 높다. 임대료도 또 다른 요인이다. 공항 안의 공간은 한정되어 있고 비싸서, 가게 주인은 이 비용을 감당할 만큼 충분히 벌어야 한다. 일부 공항은 여행객이 덜 불만스럽게 느끼도록 상점이 받을 수 있는 가격을 제한하기도 한다. 그래도 손님에게 다른 선택지가 거의 없는 한, 파는 쪽이 계속 유리한 위치에 설 것이다.",
    },
    {
      id: "mx-7",
      kind: "underline",
      passage:
        "Many students stay up late before an exam, believing that extra study time will improve their results. Research on sleep, however, [1:suggests] the opposite. While we sleep, the brain replays the information [2:learned] during the day and moves it into long-term memory. This process is so important that skipping sleep can cancel out much of the benefit of studying. In one study, participants who slept after a learning session remembered more than [3:those] who stayed awake all night. Sleep also affects our mood and attention. Without enough rest, students often find it difficult [4:to concentrate] in class and get upset more easily. For these reasons, experts recommend going to bed at a regular time, avoiding bright screens late at night, and [5:to keep] the bedroom cool and dark.",
      answer: 5,
      fix: "keeping",
      why: [
        "주어는 Research(셀 수 없는 명사, 단수)예요. on sleep은 꾸미는 말이고 however는 끼어든 말이라, 단수 동사 suggests가 맞아요.",
        "정보는 낮 동안 '학습되는' 쪽이라 수동의 과거분사 learned가 the information을 꾸며요. 이 절의 진짜 동사는 replays와 moves예요.",
        "앞의 participants(복수)를 대신하는 대명사라 복수형 those가 맞아요. those who ~는 '~한 사람들'이라는 뜻으로, 여기서는 밤새 깨어 있던 참가자들이에요.",
        "find it difficult to ~에서 it은 가목적어이고, 진짜 목적어는 뒤의 to부정사예요. 그래서 to concentrate가 맞아요.",
        "recommend의 목적어 going, avoiding과 and로 이어진 병렬이에요. 앞의 둘이 동명사이니 to keep을 동명사 keeping으로 고쳐야 해요. recommend는 목적어로 to부정사가 아니라 동명사를 받는 동사이기도 해요.",
      ],
      ko: "많은 학생이 공부 시간을 늘리면 성적이 오를 거라 믿으며 시험 전에 늦게까지 깨어 있다. 하지만 수면에 관한 연구는 정반대를 말한다. 우리가 자는 동안 뇌는 낮에 배운 정보를 다시 돌려 보며 장기 기억으로 옮긴다. 이 과정은 매우 중요해서, 잠을 거르면 공부한 효과가 상당 부분 사라질 수 있다. 한 연구에서 학습 후에 잠을 잔 참가자들은 밤새 깨어 있던 참가자들보다 더 많은 것을 기억했다. 잠은 기분과 주의력에도 영향을 준다. 충분히 쉬지 못하면 학생들은 수업에 집중하기 어렵다고 느끼고 더 쉽게 짜증을 낸다. 이런 이유로 전문가들은 일정한 시간에 잠자리에 들고, 밤늦게 밝은 화면을 피하고, 침실을 시원하고 어둡게 유지하라고 권한다.",
    },
    {
      id: "mx-8",
      kind: "underline",
      passage:
        "Seldom [1:we notice] how bright our cities have become at night. Streetlights, advertising signs, and office towers [2:produce] so much light that most city residents can no longer see the Milky Way. This problem, [3:known] as light pollution, affects more than just stargazers. Many animals rely on natural darkness to hunt, travel, and rest. Baby sea turtles, for example, find their way to the ocean soon after [4:hatching] by crawling toward the brightest part of the horizon, which is usually over the sea. Bright lights along the beach can confuse them and lead them toward busy roads instead. Fortunately, light pollution is easier to reduce than most other forms of pollution. Cities can install lamps that point downward and switch them off when [5:they] are not needed. Unlike smoke or plastic waste, unnecessary light disappears the moment someone turns it off.",
      answer: 1,
      fix: "do we notice",
      why: [
        "부정의 뜻을 가진 Seldom(좀처럼 ~않다)이 문장 맨 앞에 나오면 주어와 동사의 자리가 바뀌어요. 일반동사 notice가 있으니 do를 주어 앞으로 보내 do we notice로 고쳐야 해요.",
        "주어는 Streetlights, advertising signs, and office towers처럼 and로 묶인 세 가지라 복수예요. 그래서 produce가 맞아요.",
        "이 문제는 빛 공해라고 '알려진' 쪽이라 수동의 과거분사 known이 맞아요. 쉼표 사이에서 주어 This problem을 꾸미고, 진짜 동사는 affects예요.",
        "after가 전치사로 쓰였고 뒤에 주어 + 동사가 없으니 동명사 hatching이 맞아요. 알에서 깨어나는 것은 문장의 주어인 바다거북 새끼들이에요.",
        "필요 없는 것은 도시가 아니라 등(lamps)이에요. lamps가 복수라 they가 맞아요.",
      ],
      ko: "우리는 밤에 도시가 얼마나 밝아졌는지 좀처럼 알아차리지 못한다. 가로등, 광고판, 사무용 고층 건물이 너무 많은 빛을 내서 대부분의 도시 주민은 더 이상 은하수를 볼 수 없다. 빛 공해라고 알려진 이 문제는 별을 보는 사람들에게만 영향을 주는 것이 아니다. 많은 동물이 사냥하고 이동하고 쉬기 위해 자연의 어둠에 의지한다. 예를 들어 바다거북 새끼는 알에서 깬 직후 수평선에서 가장 밝은 쪽을 향해 기어가 바다를 찾아가는데, 그쪽은 보통 바다 위다. 해변을 따라 켜진 밝은 불빛은 새끼 거북을 헷갈리게 해서 대신 붐비는 도로 쪽으로 이끌 수 있다. 다행히 빛 공해는 다른 대부분의 오염보다 줄이기 쉽다. 도시는 아래쪽을 비추는 등을 설치하고, 필요하지 않을 때는 꺼 둘 수 있다. 연기나 플라스틱 쓰레기와 달리, 불필요한 빛은 누군가 끄는 순간 사라진다.",
    },
    {
      id: "mx-9",
      kind: "underline",
      passage:
        "For centuries, most painters worked indoors. [1:Preparing] paint was a slow process: artists often had to grind colored minerals into powder and mix it with oil by hand. [2:Because of] the paint dried out quickly once it was exposed to air, it could not easily be carried outdoors. This changed in the 1840s, when an inventor created a small metal tube [3:that] kept paint fresh for weeks. Suddenly, painters could take dozens of colors wherever they went. A group of young French artists, later known as the Impressionists, took full advantage of this freedom. They set up their easels in fields and on riverbanks and [4:painted] quickly to capture the changing light. Their bright, [5:loosely] painted scenes shocked many critics at first. Today, however, they rank among the most beloved works of art in the world.",
      answer: 2,
      fix: "Because",
      why: [
        "콜론 앞 절의 진짜 동사는 was예요. 주어 자리에는 동사원형이 올 수 없으니 동명사 Preparing이 '물감을 준비하는 것'이라는 주어가 돼요. 동명사 주어라 단수 동사 was와도 맞아요.",
        "뒤에 주어 the paint와 동사 dried가 있는 절이 이어져요. because of는 전치사라 뒤에 명사(구)만 올 수 있으니 접속사 Because로 고쳐야 해요.",
        "선행사 a small metal tube 뒤에 주어가 빠진 절(kept paint fresh for weeks)이 이어지니 주격 관계대명사 that이 맞아요.",
        "주어 They의 진짜 동사 set up과 and로 이어진 병렬이에요. 지난 일을 말하는 글이라 set up도 과거형이고, 짝이 되는 painted도 과거형이라 맞아요.",
        "과거분사 painted를 꾸미는 자리라 부사 loosely가 맞아요. '자유로운 붓질로 그려진 장면'이라는 뜻이에요.",
      ],
      ko: "수 세기 동안 대부분의 화가는 실내에서 작업했다. 물감을 준비하는 것은 느린 과정이었다. 화가들은 색깔 있는 광물을 가루로 갈아 손으로 기름과 섞어야 할 때가 많았다. 물감은 공기에 닿으면 금방 말라 버렸기 때문에 밖으로 쉽게 가지고 나갈 수 없었다. 이 상황은 1840년대에 바뀌었는데, 그때 한 발명가가 물감을 몇 주 동안 신선하게 유지해 주는 작은 금속 튜브를 만들었다. 갑자기 화가들은 어디를 가든 수십 가지 색을 가지고 다닐 수 있게 되었다. 훗날 인상주의 화가로 알려진 젊은 프랑스 화가들은 이 자유를 한껏 누렸다. 그들은 들판과 강둑에 이젤을 세우고, 변하는 빛을 담아내려고 빠르게 그림을 그렸다. 밝은 색과 자유로운 붓질로 그린 그들의 장면은 처음에 많은 비평가에게 충격을 주었다. 그러나 오늘날 그 작품들은 세계에서 가장 사랑받는 예술 작품에 속한다.",
    },
    {
      id: "mx-10",
      kind: "box",
      passage:
        "Most people believe that building new habits [A:require|requires] a great deal of willpower. However, some researchers who study daily behavior estimate that nearly half of our actions happen without much conscious thought. In their view, [B:what|that] matters most is not how motivated we feel but how our surroundings are arranged. After all, motivation comes and goes, but our environment is always there. People who want to eat more fruit, for example, may do better by placing a bowl of apples on the kitchen table than by relying on self-control alone. The same principle also works in reverse. If you leave your phone in another room while studying, you will find it much [C:easier|more easily] to focus. In short, instead of simply trying harder, we can make good choices convenient and bad choices inconvenient.",
      answer: [1, 0, 0],
      why: [
        "that절의 주어는 동명사구 building new habits예요. 바로 앞의 habits(복수)에 속지 마세요. 동명사 주어는 단수로 받으니 requires가 맞아요.",
        "앞에 선행사가 없고, 뒤의 절에 주어가 빠져 있어요(___ matters most). 그래서 '가장 중요한 것'이라는 뜻의 관계대명사 what이 맞아요. 접속사 that 뒤에는 완전한 절이 와야 해요.",
        "find + 가목적어 it + 목적격보어 + to부정사 구조예요. 목적격보어 자리에는 형용사가 오니 easier가 맞아요.",
      ],
      ko: "대부분의 사람은 새로운 습관을 들이려면 의지력이 많이 필요하다고 믿는다. 그러나 일상 행동을 연구하는 일부 연구자들은 우리 행동의 거의 절반이 별다른 의식 없이 일어난다고 추정한다. 그들이 보기에 가장 중요한 것은 우리가 얼마나 의욕을 느끼느냐가 아니라 주변 환경이 어떻게 놓여 있느냐다. 어쨌든 의욕은 생겼다 사라지지만 환경은 늘 그 자리에 있다. 예를 들어 과일을 더 먹고 싶은 사람은 자제력에만 기대기보다 식탁 위에 사과 한 그릇을 놓아두는 편이 더 효과적일 수 있다. 같은 원리는 반대로도 작동한다. 공부하는 동안 휴대폰을 다른 방에 두면 집중하기가 훨씬 쉬워질 것이다. 요컨대 그저 더 애쓰는 대신, 좋은 선택은 편하게, 나쁜 선택은 불편하게 만들면 된다.",
    },
    {
      id: "mx-11",
      kind: "box",
      passage:
        "Young sunflowers do something remarkable. In the morning, their heads face east, toward the [A:rising|raising] sun. As the day goes on, they slowly turn west, following the sun across the sky, and at night they swing back to the east. This daily movement is guided by an internal clock, [B:where|which] works much like the one inside the human body. To learn why the plants move this way, scientists tied some young sunflowers in place so that they could not turn. The plants that were free to follow the sun grew larger than [C:that|those] that were held still. Once sunflowers are fully grown, they stop moving and face east all day. This habit seems useful, too: east-facing flowers warm up quickly in the morning, and warm flowers attract more bees than cool ones.",
      answer: [0, 1, 1],
      why: [
        "해는 스스로 '떠오르는' 것이고 뒤에 목적어가 없어요. 목적어가 필요 없는 자동사 rise의 -ing형 rising이 sun을 꾸며요. raise(올리다)는 목적어가 있어야 해요.",
        "선행사 an internal clock 뒤의 절에 주어가 빠져 있어요(___ works much like ~). 불완전한 절 앞에는 관계대명사가 오니 which가 맞아요. 관계부사 where 뒤에는 완전한 절이 와요.",
        "비교하는 대상은 앞의 The plants(복수)예요. 같은 명사의 반복을 피하는 대명사도 복수여야 하니 those가 맞아요.",
      ],
      ko: "어린 해바라기는 놀라운 일을 한다. 아침이면 머리 부분이 떠오르는 해를 향해 동쪽을 바라본다. 낮 동안에는 하늘을 가로지르는 해를 따라 천천히 서쪽으로 돌고, 밤이 되면 다시 동쪽으로 돌아온다. 이 매일의 움직임은 체내 시계에 이끌려 일어나는데, 이 시계는 사람 몸속의 시계와 무척 비슷하게 작동한다. 식물이 왜 이렇게 움직이는지 알아보려고 과학자들은 어린 해바라기 일부를 돌지 못하도록 제자리에 묶어 두었다. 해를 자유롭게 따라갈 수 있었던 해바라기는 움직이지 못하게 고정된 해바라기보다 더 크게 자랐다. 해바라기는 다 자라면 움직임을 멈추고 하루 종일 동쪽을 향한다. 이 습관 역시 쓸모가 있어 보인다. 동쪽을 향한 꽃은 아침에 빨리 따뜻해지고, 따뜻한 꽃은 차가운 꽃보다 벌을 더 많이 끌어들이기 때문이다.",
    },
    {
      id: "mx-12",
      kind: "box",
      passage:
        "Imagine a village without money, where people must trade goods directly with one another. A farmer [A:wanting|wanted] new shoes, for example, has to find a shoemaker who happens to need grain. Such trades are often difficult, because each side has to want exactly what the other offers. Money solves this problem. Early societies used shells, salt, and metal as money, and later, rulers began to produce standard coins. Coins made trade far simpler because they allowed people [B:buying|to buy] goods without offering other goods in return. Paper money came much later, and at first, many people doubted it. After all, a piece of paper has almost no value in itself. Only after banks and governments promised to exchange the notes for gold or silver [C:did most people accept|most people accepted] them. Today, most money exists only as numbers in computers, yet it still works because everyone agrees to believe in it.",
      answer: [0, 1, 0],
      why: [
        "이 문장에는 관계사 who가 하나 있으니 진짜 동사는 두 개예요. 주절의 has와 who 뒤의 happens가 이미 자리를 차지했으니, want는 분사로 변장해 A farmer를 꾸며야 해요. 농부가 신발을 '원하는' 쪽이고 뒤에 목적어 new shoes가 있으니 능동의 wanting이 맞아요.",
        "allow는 목적어 뒤에 to부정사를 목적격보어로 받는 동사예요. 그래서 allowed people to buy가 맞아요.",
        "Only after ~처럼 only가 붙은 부사절이 문장 맨 앞에 나오면 주절의 주어와 동사가 도치돼요. 일반동사 accept가 있으니 did + 주어 + 동사원형 순서의 did most people accept가 맞아요.",
      ],
      ko: "사람들이 서로 물건을 직접 맞바꿔야 하는, 돈이 없는 마을을 상상해 보자. 예를 들어 새 신발을 원하는 농부는 마침 곡물이 필요한 신발 장인을 찾아야 한다. 양쪽이 서로 상대가 내놓는 바로 그것을 원해야 하기 때문에 이런 거래는 어려울 때가 많다. 돈이 이 문제를 해결해 준다. 초기 사회는 조개껍데기, 소금, 금속을 돈으로 썼고, 나중에는 통치자들이 규격화된 동전을 만들기 시작했다. 동전은 사람들이 대가로 다른 물건을 내주지 않고도 물건을 살 수 있게 해 주어서 거래를 훨씬 간단하게 만들었다. 지폐는 훨씬 나중에 등장했고, 처음에는 많은 사람이 지폐를 의심했다. 어쨌든 종이 한 장은 그 자체로는 거의 가치가 없기 때문이다. 은행과 정부가 지폐를 금이나 은으로 바꿔 주겠다고 약속하고 나서야 대부분의 사람이 지폐를 받아들였다. 오늘날 대부분의 돈은 컴퓨터 속 숫자로만 존재하지만, 모두가 그것을 믿기로 동의하기 때문에 여전히 제 역할을 한다.",
    },
  ],
};

export default topic;
