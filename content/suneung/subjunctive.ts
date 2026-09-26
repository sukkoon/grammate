import type { SuneungTopic } from "./types";

const topic: SuneungTopic = {
  id: "subjunctive",
  title: "가정법",
  items: [
    {
      id: "sj-1",
      kind: "underline",
      passage:
        "Our history teacher once asked us to imagine a trip through time. 'If you [1:could] visit any period in history, where would you go?' she asked. Most of my classmates said that if they [2:have] a time machine, they would visit the age of dinosaurs. I, however, wished I [3:could meet] King Sejong and watch him [4:create] Hangeul. Without the Korean alphabet, reading [5:would be] much harder for all of us today.",
      answer: 2,
      fix: "had",
      why: [
        "지금 사실과 반대되는 상상을 묻는 가정법 과거예요. if절의 과거형 could와 주절의 would go가 짝을 이뤄요.",
        "주절이 would visit인 가정법 과거라서 if절도 과거형이어야 해요. 타임머신은 실제로 없으니 have를 had로 고쳐야 해요.",
        "wished(과거)와 같은 때의 이룰 수 없는 바람이라 가정법 과거 could meet이 맞아요. wish 뒤에서는 시제를 한 칸 물려요.",
        "지각동사 watch + 목적어(him) + 동사원형이라 create가 맞아요. 그분이 한글을 만드는 쪽(능동)이에요. watch는 could 뒤의 meet과 병렬이에요.",
        "without(~이 없다면) + would + 동사원형은 지금 사실의 반대예요. today가 지금 이야기라는 단서라 would be가 맞아요.",
      ],
      ko: "우리 역사 선생님은 한번은 우리에게 시간 여행을 상상해 보라고 하셨다. '역사 속 어느 시대든 가 볼 수 있다면 어디로 가겠니?' 선생님이 물으셨다. 반 친구들 대부분은 타임머신이 있다면 공룡 시대에 가 보겠다고 했다. 하지만 나는 세종대왕을 만나 그분이 한글을 만드는 모습을 볼 수 있기를 바랐다. 한글이 없다면 오늘날 우리 모두에게 읽기는 훨씬 더 어려울 것이다.",
    },
    {
      id: "sj-2",
      kind: "underline",
      passage:
        "Many great discoveries [1:were made] by accident. In 1928, Alexander Fleming returned from a vacation and noticed [2:that] mold had stopped bacteria from growing in one of his dishes. If he had cleaned his laboratory before he left, he might never [3:have noticed] this strange result. And if he had thrown the dish away, the world [4:would wait] many more years for penicillin, the life-saving medicine that came from this mold. In this case, an untidy lab, [5:which] most scientists would try to avoid, turned out to be a gift to medicine.",
      answer: 4,
      fix: "would have waited",
      why: [
        "발견은 이루어지는 쪽이고 주어 discoveries가 복수라 과거 수동 were made가 맞아요.",
        "noticed의 목적어가 되는 명사절을 이끄는 접속사 that이에요. 뒤에 mold had stopped ~라는 완전한 절이 와요.",
        "if절이 had cleaned(가정법 과거완료)라서 과거 사실의 반대예요. 주절은 조동사 과거형 + have p.p.인 might have noticed가 맞아요.",
        "if절이 had thrown으로 1928년의 과거 사실과 반대되는 가정이고, 기다림도 과거의 일이에요. 주절은 would have waited로 고쳐야 해요.",
        "선행사 an untidy lab을 받는 계속적 용법의 관계대명사예요. 뒤의 avoid에 목적어가 비어 있어서 which가 맞아요.",
      ],
      ko: "많은 위대한 발견은 우연히 이루어졌다. 1928년, 알렉산더 플레밍은 휴가에서 돌아와 접시 하나에서 곰팡이가 세균이 자라지 못하게 막은 것을 알아차렸다. 떠나기 전에 실험실을 청소했더라면 그는 이 이상한 결과를 결코 알아차리지 못했을지도 모른다. 그리고 그 접시를 버렸더라면, 세상은 이 곰팡이에서 나온 생명을 구하는 약, 페니실린을 몇 년 더 기다려야 했을 것이다. 이 경우에는 대부분의 과학자가 피하려고 할 지저분한 실험실이 의학에 선물이 된 셈이다.",
    },
    {
      id: "sj-3",
      kind: "box",
      passage:
        "Our school has a great library, but I wish it [A:has|had] a separate room for group study. Two months ago, a graduate of our school visited our class and talked about studying abroad in Canada. He described the long, snowy winters so vividly that it felt as if we [B:were|are] there with him. Without his advice, I [C:would not apply|would not have applied] for the exchange program last month.",
      answer: [1, 0, 1],
      why: [
        "I wish 뒤에서 지금 이루어지지 않은 바람을 말하니 가정법 과거 had가 맞아요. 실제로는 그런 방이 없어요.",
        "as if 뒤에서 느낀 때(felt)와 같은 때의, 사실과 반대되는 일이라 가정법 과거 were가 맞아요. 현재형 are는 과거 이야기에도, 사실이 아닌 상상에도 맞지 않아요.",
        "without이 이끄는 조건이 last month라는 과거의 일에 걸려 있어요. 과거 사실의 반대라 would not have applied가 맞아요.",
      ],
      ko: "우리 학교에는 훌륭한 도서관이 있지만, 모둠 공부를 할 수 있는 방이 따로 있으면 좋겠다. 두 달 전 우리 학교 졸업생 한 분이 우리 반에 와서 캐나다 유학 이야기를 해 주었다. 그가 길고 눈 많은 겨울을 아주 생생하게 묘사해서 마치 우리가 그와 함께 그곳에 있는 것 같았다. 그의 조언이 없었다면 나는 지난달 교환 학생 프로그램에 지원하지 않았을 것이다.",
    },
    {
      id: "sj-4",
      kind: "underline",
      passage:
        "Last year, our school soccer team lost the final by a single goal. Our goalkeeper, [1:who] had hurt his wrist the day before, could not play. If he [2:had been] healthy, we would probably have won the trophy. Since then, the team [3:has practiced] harder than ever, and this year we [4:are] in the final again. Looking back, our coach says, '[5:Have] I known how important one player could be, I would have trained a backup goalkeeper.'",
      answer: 5,
      fix: "Had",
      why: [
        "선행사 Our goalkeeper가 사람이고 뒤에 had hurt의 주어가 비어 있어서 주격 관계대명사 who가 맞아요. 다친 일이 결승전보다 먼저라 관계절은 과거완료예요.",
        "작년 결승전 때의 사실(다쳐서 못 뛰었음)과 반대되는 가정이라 가정법 과거완료 had been이 맞고, 주절도 would have won으로 짝이 맞아요.",
        "Since then(그 이후로 지금까지)이 있어서 현재완료 has practiced가 맞아요.",
        "this year는 지금을 포함하는 표현이고 주어가 we라서 현재형 are가 맞아요.",
        "if를 빼고 도치한 가정법 과거완료예요. If I had known → Had I known이 되므로 Have를 Had로 고쳐야 해요. 주절 would have trained와도 짝이 맞아요.",
      ],
      ko: "작년에 우리 학교 축구부는 결승전에서 한 골 차로 졌다. 전날 손목을 다친 우리 골키퍼가 경기에 나설 수 없었다. 그가 건강했더라면 우리는 아마 우승컵을 차지했을 것이다. 그 이후로 팀은 그 어느 때보다 열심히 연습해 왔고, 올해 우리는 다시 결승에 올랐다. 돌아보며 우리 코치는 말한다. '선수 한 명이 얼마나 중요할 수 있는지 알았더라면, 후보 골키퍼를 길러 두었을 텐데.'",
    },
    {
      id: "sj-5",
      kind: "underline",
      passage:
        "If humans [1:can] see ultraviolet light, many flowers would look completely different to us. Bees, however, do have this ability. Patterns [2:invisible] to our eyes guide them straight to the nectar. Without these hidden signals, bees [3:would waste] much more energy searching for food. Some scientists even wish they [4:could borrow] a bee's eyes for a day. Until special cameras [5:were used] to photograph flowers, few people knew these patterns existed.",
      answer: 1,
      fix: "could",
      why: [
        "사람은 실제로 자외선을 볼 수 없어요. 지금 사실과 반대되는 가정이고 주절이 would look이라 if절은 과거형 could로 고쳐야 해요.",
        "Patterns를 뒤에서 꾸미는 형용사구(invisible to our eyes)예요. 문장의 진짜 동사는 guide라서 형용사 invisible이 맞아요.",
        "without(~이 없다면)이 지금 사실과 반대되는 조건을 나타내니 주절은 would + 동사원형인 would waste가 맞아요.",
        "wish 뒤에서 지금 이룰 수 없는 바람을 말하니 가정법 과거 could borrow가 맞아요.",
        "until절은 과거에 있었던 일을 말하니 과거형이 맞고, 카메라는 쓰이는 쪽이며 주어 cameras가 복수라 수동 were used예요. 뒤의 to photograph는 '찍기 위해'라는 목적의 to부정사예요.",
      ],
      ko: "사람이 자외선을 볼 수 있다면 많은 꽃이 우리 눈에 완전히 다르게 보일 것이다. 하지만 벌에게는 정말로 이 능력이 있다. 우리 눈에는 보이지 않는 무늬가 벌을 곧장 꿀로 이끈다. 이 숨은 신호가 없다면 벌은 먹이를 찾느라 훨씬 더 많은 힘을 낭비할 것이다. 어떤 과학자들은 하루만이라도 벌의 눈을 빌릴 수 있으면 좋겠다고 바라기까지 한다. 특수 카메라로 꽃을 찍어 보기 전까지는 이런 무늬가 있다는 것을 아는 사람이 거의 없었다.",
    },
    {
      id: "sj-6",
      kind: "box",
      passage:
        "I stayed up until three in the morning playing a new game, and now I can barely keep my eyes open in class. If I had gone to bed earlier last night, I [A:would have felt|would feel] much more awake now. To be honest, I wish I [B:did not buy|had not bought] that game last week. [C:Had|Did] I known how addictive it was, I would have saved my money for something else.",
      answer: [1, 1, 0],
      why: [
        "if절은 last night의 과거 사실과 반대(had gone)지만, 주절에는 now가 있어 지금 사실과 반대예요. 혼합가정법이라 주절은 would + 동사원형인 would feel이 맞아요.",
        "last week에 이미 산 일을 아쉬워하는 바람이라 I wish + 가정법 과거완료 had not bought가 맞아요.",
        "주절이 would have saved인 가정법 과거완료에서 if를 빼면 Had + 주어 + p.p. 순서가 돼요. If I had known → Had I known이에요.",
      ],
      ko: "나는 새 게임을 하느라 새벽 세 시까지 깨어 있었고, 지금은 수업 시간에 눈을 거의 뜨고 있을 수가 없다. 어젯밤에 더 일찍 잤더라면 지금 훨씬 더 정신이 맑을 텐데. 솔직히 지난주에 그 게임을 사지 않았더라면 좋았을 텐데. 그 게임이 얼마나 중독성이 강한지 알았더라면 나는 그 돈을 다른 데 쓰려고 모아 두었을 것이다.",
    },
    {
      id: "sj-7",
      kind: "underline",
      passage:
        "The ozone layer, a thin shield of gas high above the Earth, [1:protects] us from harmful sunlight. In the 1980s, scientists confirmed that chemicals used in refrigerators and spray cans [2:were destroying] it. If it [3:is] not for this layer, life on land would be almost impossible. Fortunately, nearly all countries agreed to stop using those chemicals, and the damage is slowly [4:being repaired]. Had the world ignored the scientists' warnings, the situation [5:would have become] far worse.",
      answer: 3,
      fix: "were",
      why: [
        "주어는 The ozone layer(단수)이고, 쉼표 사이의 a thin shield ~는 주어를 풀어 주는 동격이에요. 늘 그런 사실이라 현재형 protects가 맞아요.",
        "that절의 주어는 chemicals(복수)이고, used ~ spray cans는 꾸미는 과거분사구예요. 발견한 그때 진행 중이던 일이라 과거진행 were destroying이 맞아요.",
        "If it were not for(~이 없다면)는 지금 사실과 반대되는 가정법 과거라 주절 would be와 짝이 맞아야 해요. is를 were로 고쳐야 해요.",
        "손상은 회복되는 쪽이라 수동이고, 지금 진행 중이라 진행 수동 is being repaired가 맞아요.",
        "Had the world ignored ~는 If the world had ignored ~에서 if를 뺀 도치예요. 과거 사실의 반대라 주절은 would have become이 맞아요.",
      ],
      ko: "지구 높은 곳에 있는 얇은 기체 방패인 오존층은 해로운 햇빛으로부터 우리를 보호한다. 1980년대에 과학자들은 냉장고와 스프레이 캔에 쓰이던 화학 물질이 오존층을 파괴하고 있다는 것을 확인했다. 이 층이 없다면 육지의 생명은 거의 불가능할 것이다. 다행히 거의 모든 나라가 그 화학 물질을 쓰지 않기로 합의했고, 손상은 천천히 회복되고 있다. 세계가 과학자들의 경고를 무시했더라면 상황은 훨씬 더 나빠졌을 것이다.",
    },
    {
      id: "sj-8",
      kind: "box",
      passage:
        "My friend Minho talks about last month's concert as if he [A:had been|is] there in person, but he actually watched it on his phone at home. The tickets sold out in minutes, and he still regrets being too slow. When he asked for my advice, I told him, 'If I [B:am|were] you, I would start saving for next year's show now.' He agreed, but he believes that the show [C:would be|would have been] even better without the heavy rain that night.",
      answer: [0, 1, 1],
      why: [
        "talks(지금)보다 앞선 지난달의 일과 반대되는 상상이라 as if + 가정법 과거완료 had been이 맞아요. 실제로 그는 그곳에 없었어요.",
        "내가 네가 될 수는 없으니 지금 사실과 반대되는 가정법 과거예요. 주절 would start와 짝을 이루는 were가 맞아요.",
        "without the heavy rain that night는 그날 밤이라는 과거의 조건이에요. 과거 사실의 반대라 주절은 would have been이 맞아요.",
      ],
      ko: "내 친구 민호는 지난달 콘서트에 대해 마치 직접 그곳에 있었던 것처럼 말하지만, 사실은 집에서 휴대폰으로 보았다. 표는 몇 분 만에 다 팔렸고, 민호는 너무 느렸던 것을 아직도 후회한다. 민호가 내 조언을 구했을 때 나는 '내가 너라면 내년 공연을 위해 지금부터 돈을 모으기 시작하겠어.'라고 말했다. 민호는 동의했지만, 그날 밤 폭우가 없었다면 공연이 훨씬 더 좋았을 거라고 믿는다.",
    },
  ],
};

export default topic;
