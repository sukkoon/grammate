import type { SuneungTopic } from "./types";

const topic: SuneungTopic = {
  id: "modal",
  title: "조동사 have p.p.·당위의 should",
  items: [
    {
      id: "md-1",
      kind: "underline",
      passage:
        "Last month, our school [1:started] a campaign to reduce plastic waste. The student council, [2:which] organized the campaign, asked every class to count its plastic bottles for five school days. The results were shocking: we [3:had thrown] away more than two thousand bottles in that short time. For the last week of the campaign, the principal required that every student [4:brings] a reusable bottle to school. Since then, many students [5:have kept] using their bottles even though the rule has ended.",
      answer: 4,
      fix: "bring",
      why: [
        "Last month라는 명백한 과거 표현이 있어서 과거형 started가 맞아요.",
        "선행사 The student council을 받는 계속적 용법의 관계대명사예요. 뒤에 organized의 주어가 비어 있어서 which가 맞아요.",
        "병을 버린 일이 결과가 나온 때(were, 과거)보다 먼저라 과거완료 had thrown이 맞아요.",
        "require(요구하다) 뒤의 that절이 '~해야 한다'는 내용이라 (should) 동사원형을 써요. 주어가 every student여도, 주절이 과거여도 brings가 아니라 bring으로 고쳐야 해요.",
        "Since then(그때부터 지금까지)이 있어서 현재완료이고, 주어 many students가 복수라 have kept가 맞아요. keep + -ing는 '계속 ~하다'예요.",
      ],
      ko: "지난달 우리 학교는 플라스틱 쓰레기를 줄이는 캠페인을 시작했다. 캠페인을 준비한 학생회는 반마다 수업일 닷새 동안 플라스틱병을 세어 보라고 했다. 결과는 충격적이었다. 우리가 그 짧은 기간에 이천 개가 넘는 병을 버렸던 것이다. 캠페인 마지막 주에 교장 선생님은 모든 학생이 다회용 물병을 학교에 가져와야 한다고 요구하셨다. 그때부터 많은 학생이 규칙이 끝났는데도 계속 자기 물병을 쓰고 있다.",
    },
    {
      id: "md-2",
      kind: "underline",
      passage:
        "Although a security camera had recorded him at a shop that evening, the man insisted that he [1:be] at home the whole time. Was he lying? Psychologists say he [2:may have believed] his own story. Our memories are not recordings; they [3:are rebuilt] each time we recall them. As a result, people can feel completely sure about events that never happened. Experts therefore suggest that police officers [4:be] careful not to give witnesses hints [5:that] could change their memories.",
      answer: 1,
      fix: "had been",
      why: [
        "여기서 insisted는 '~해야 한다'는 요구가 아니라 '내내 집에 있었다'는 과거 사실을 주장하는 뜻이에요. 그래서 동사원형 be가 아니라 시제에 맞춘 had been(또는 was)으로 고쳐야 해요.",
        "과거의 일(자기 이야기를 믿은 것)에 대한 약한 추측이라 may have p.p.인 may have believed가 맞아요.",
        "기억은 다시 만들어지는 쪽이라 수동이고, 주어 they(memories)가 복수라 are rebuilt가 맞아요.",
        "suggest가 '제안하다'로 쓰여 that절이 '~해야 한다'는 내용이에요. 그래서 (should) 동사원형 be가 맞아요.",
        "선행사 hints를 꾸미는 주격 관계대명사 that이에요. 뒤에 could change의 주어가 비어 있어요.",
      ],
      ko: "그날 저녁 보안 카메라에 가게에 있는 모습이 찍혔는데도, 그 남자는 내내 집에 있었다고 주장했다. 그는 거짓말을 하고 있었을까? 심리학자들은 그가 자기 이야기를 스스로 믿었을지도 모른다고 말한다. 우리의 기억은 녹화 영상이 아니다. 기억은 떠올릴 때마다 다시 만들어진다. 그 결과 사람들은 일어나지도 않은 일을 완전히 확신할 수 있다. 그래서 전문가들은 경찰관이 목격자의 기억을 바꿀 수 있는 힌트를 주지 않도록 조심해야 한다고 제안한다.",
    },
    {
      id: "md-3",
      kind: "box",
      passage:
        "Yesterday our soccer practice was held in heavy rain, and I could not find my umbrella. I [A:should have|must have] checked the forecast and packed a raincoat before leaving home; I really regret not doing it. At first I thought my sister had borrowed my umbrella, but she [B:can't have|must have] taken it, because she has been away on a school trip all week. On top of that, the coach demanded that each player [C:arrives|arrive] thirty minutes early, so I had no time to search for it.",
      answer: [0, 0, 1],
      why: [
        "하지 않은 과거의 일을 후회하는 문장이라(I really regret not doing it) should have p.p.가 맞아요. must have p.p.는 '~했음에 틀림없다'는 추측이라 뜻이 맞지 않아요.",
        "동생은 일주일 내내 집에 없었다는 근거가 있으니 '가져갔을 리가 없다'는 강한 부정 추측 can't have p.p.가 맞아요.",
        "demand(요구하다) 뒤의 that절이 '~해야 한다'는 내용이라 (should) 동사원형 arrive를 써요. 주어가 each player여도 -s를 붙이지 않아요.",
      ],
      ko: "어제 우리 축구 연습은 폭우 속에서 열렸는데, 나는 우산을 찾을 수 없었다. 집을 나서기 전에 일기 예보를 확인하고 비옷을 챙겼어야 했는데, 그러지 않은 게 정말 후회된다. 처음에는 동생이 내 우산을 빌려 갔다고 생각했지만, 동생은 일주일 내내 수학여행을 가 있었으니 우산을 가져갔을 리가 없다. 게다가 코치가 모든 선수에게 30분 일찍 와야 한다고 요구해서, 나는 우산을 찾을 시간이 없었다.",
    },
    {
      id: "md-4",
      kind: "underline",
      passage:
        "For the science fair, Yuna and her partner [1:tested] whether music helps plants grow. They placed one group of bean plants near a speaker and [2:kept] another group in a quiet room. After four weeks, the results suggested that music [3:have] no real effect on growth; both groups were almost the same height. Their teacher recommended that they [4:repeat] the experiment with more plants. She also said the students [5:should have measured] the plants every day instead of once a week.",
      answer: 3,
      fix: "had",
      why: [
        "과학 전람회를 준비하며 한 과거의 일이라 과거형 tested가 맞아요. whether절은 tested의 목적어예요.",
        "and 앞의 placed와 이어진 진짜 동사의 병렬이라 같은 과거형 kept가 맞아요.",
        "여기서 suggested는 '제안하다'가 아니라 결과가 '보여 주다, 암시하다'라는 뜻이에요. 사실을 전하는 that절이라 동사원형이 아니라 시제에 맞춘 had로 고쳐야 해요. 늘 그런 사실로 보고 has로 써도 돼요.",
        "recommend(권하다) 뒤의 that절이 '~해야 한다'는 내용이라 (should) 동사원형 repeat이 맞아요.",
        "매일 재지 않은 과거의 일을 아쉬워하는 말이라 should have p.p.인 should have measured가 맞아요.",
      ],
      ko: "과학 전람회를 위해 유나와 짝은 음악이 식물의 성장을 돕는지 실험했다. 그들은 콩 식물 한 무리는 스피커 가까이에 두고, 다른 무리는 조용한 방에 두었다. 4주 뒤, 결과는 음악이 성장에 실제로 아무 영향도 없었다는 것을 보여 주었다. 두 무리의 키가 거의 같았던 것이다. 선생님은 그들에게 더 많은 식물로 실험을 다시 해 보라고 권하셨다. 선생님은 또 학생들이 일주일에 한 번이 아니라 매일 식물을 쟀어야 했다고 말씀하셨다.",
    },
    {
      id: "md-5",
      kind: "underline",
      passage:
        "When our art class visited the national museum, we noticed that the oldest paintings [1:were kept] in dim light. Strong light can fade colors, so the museum requests that visitors [2:did not use] flash cameras. One painting looked strangely dark, and my friend said it [3:must have been] damaged over the years. The guide smiled and explained that the artist [4:had painted] it that way on purpose. We realized we [5:should have read] the information card before guessing.",
      answer: 2,
      fix: "not use",
      why: [
        "그림들은 보관되는 쪽이라 수동이고, 박물관을 방문한 과거의 일이라 were kept가 맞아요. 주어 the oldest paintings가 복수라 were예요.",
        "request(요청하다) 뒤의 that절이 '~해야 한다'는 내용이라 (should) 동사원형을 써요. 부정은 not + 동사원형이라 did not use를 not use로 고쳐야 해요.",
        "과거의 일(손상된 것)에 대한 강한 추측이라 must have p.p.예요. 그림은 손상되는 쪽이라 must have been damaged가 맞아요.",
        "화가가 그린 일이 안내원이 설명한 때(explained)보다 먼저라 과거완료 had painted가 맞아요.",
        "읽지 않은 과거의 일을 뉘우치는 말이라 should have p.p.인 should have read가 맞아요.",
      ],
      ko: "우리 미술반이 국립 박물관을 방문했을 때, 우리는 가장 오래된 그림들이 어두운 조명 아래 보관되어 있다는 것을 알아차렸다. 강한 빛은 색을 바래게 할 수 있어서 박물관은 관람객에게 카메라 플래시를 쓰지 말라고 요청한다. 한 그림이 이상하게 어두워 보였고, 내 친구는 그 그림이 세월이 흐르면서 손상된 게 틀림없다고 말했다. 안내원은 웃으며 화가가 일부러 그렇게 그렸다고 설명했다. 우리는 추측하기 전에 설명 카드를 읽었어야 했다는 것을 깨달았다.",
    },
    {
      id: "md-6",
      kind: "box",
      passage:
        "My grandfather's doctor has long recommended that he [A:walk|walked] for thirty minutes every day. For years, however, my grandfather insisted that he [B:be|was] already healthy enough and ignored the advice. Last winter, he had trouble climbing the stairs to his apartment. Now he walks every morning with my grandmother, and he admits that he [C:should have listened|must have listened] to the doctor much earlier.",
      answer: [0, 1, 0],
      why: [
        "recommend(권하다) 뒤의 that절이 '~해야 한다'는 내용이라 (should) 동사원형을 써요. 주어가 he여도 walk가 맞고, 과거형 walked는 쓸 수 없어요.",
        "여기서 insisted는 '이미 충분히 건강하다'는 사실을 주장하는 뜻이에요. 당위가 아니니 동사원형 be가 아니라 시제에 맞춘 was가 맞아요.",
        "의사 말을 듣지 않은 과거의 일을 후회하는 내용이라 should have p.p.가 맞아요. must have listened는 '들었음에 틀림없다'는 추측이라 뜻이 맞지 않아요.",
      ],
      ko: "할아버지의 담당 의사는 오래전부터 할아버지께 매일 30분씩 걸으시라고 권해 왔다. 하지만 할아버지는 여러 해 동안 이미 충분히 건강하다고 주장하시며 그 조언을 무시하셨다. 지난겨울 할아버지는 아파트 계단을 오르는 데 어려움을 겪으셨다. 지금 할아버지는 매일 아침 할머니와 함께 걸으시고, 의사의 말을 훨씬 더 일찍 들었어야 했다고 인정하신다.",
    },
    {
      id: "md-7",
      kind: "underline",
      passage:
        "Archaeologists [1:working] in caves in southern Europe have found tiny handprints on the walls. Tests show that some of the prints [2:were made] more than 20,000 years ago. Because the hands are so small, the researchers believe they [3:must have belonged] to children. Some experts think the children [4:may have been] helping adults decorate the walls. In any case, such young children [5:can't be] alone deep inside the dark caves when they made the prints; adults must have been nearby.",
      answer: 5,
      fix: "can't have been",
      why: [
        "문장의 진짜 동사는 have found이고, 고고학자들이 일하는 쪽(능동)이라 현재분사 working이 Archaeologists를 꾸며요.",
        "more than 20,000 years ago라는 명백한 과거 표현이 있고, 손자국은 만들어지는 쪽이라 과거 수동 were made가 맞아요. some of the prints는 of 뒤의 prints(복수)에 수를 맞춰요.",
        "지금의 증거(손이 작음)로 과거의 일을 강하게 추측하니 must have p.p.예요. belong은 수동태로 쓰지 않는 동사라 must have belonged가 맞아요.",
        "과거에 진행 중이던 일에 대한 약한 추측이라 may have been + -ing가 맞아요. help + 목적어 + 동사원형(decorate)도 알맞아요.",
        "when they made the prints라는 과거의 일에 대한 부정 추측이라 can't have p.p.가 필요해요. can't be를 can't have been으로 고쳐야 해요. 뒤의 must have been과도 짝이 맞아요.",
      ],
      ko: "유럽 남부의 동굴들에서 일하는 고고학자들이 벽에서 작은 손자국들을 발견했다. 검사 결과 그중 몇몇은 2만 년도 더 전에 만들어졌다. 손이 아주 작아서, 연구자들은 그것이 아이들의 것이었음에 틀림없다고 믿는다. 몇몇 전문가는 아이들이 어른들이 벽을 꾸미는 것을 돕고 있었을지도 모른다고 생각한다. 어쨌든 그렇게 어린 아이들이 손자국을 남길 때 어두운 동굴 깊은 곳에 혼자 있었을 리는 없다. 어른들이 가까이 있었음에 틀림없다.",
    },
    {
      id: "md-8",
      kind: "box",
      passage:
        "Our class went on a field trip to a wetland park last Friday. Because rain was forecast, our teacher said it was essential that every student [A:brings|bring] a raincoat. When we arrived, a guide explained that the park's birds were unusually quiet, and she suggested that a storm [B:be|was] coming. She was right; within an hour, heavy rain began to fall. Looking back, I think the birds [C:must have sensed|must sense] the change in air pressure before we did.",
      answer: [1, 1, 0],
      why: [
        "essential(꼭 필요한)은 '~해야 한다'는 판단의 형용사라 that절에 (should) 동사원형을 써요. 주어가 every student여도 bring이 맞아요.",
        "여기서 suggested는 '(그럴 것 같다고) 넌지시 말하다'라는 뜻이라 사실을 전하는 절이에요. 동사원형 be가 아니라 시제에 맞춘 was가 맞아요.",
        "지난 금요일에 새들이 느낀 일을 지금 강하게 추측하니 must have p.p.인 must have sensed가 맞아요. must sense는 지금이나 앞으로의 일을 말해서 before we did와 맞지 않아요.",
      ],
      ko: "우리 반은 지난 금요일에 습지 공원으로 현장 학습을 갔다. 비 예보가 있어서 선생님은 모든 학생이 비옷을 꼭 가져와야 한다고 말씀하셨다. 우리가 도착했을 때 안내원은 공원의 새들이 평소와 달리 조용하다고 설명하며, 폭풍이 다가오고 있는 것 같다고 넌지시 말했다. 그녀의 말이 맞았다. 한 시간도 안 되어 폭우가 쏟아지기 시작했다. 돌이켜 보면, 새들은 우리보다 먼저 기압의 변화를 느꼈음에 틀림없다.",
    },
  ],
};

export default topic;
