import type { Band } from "@/lib/level";

/**
 * 불규칙 동사표 (부록).
 * group: 세 모양이 닮은 방식
 *   AAA 셋 다 같음 · ABB 과거형 = 과거분사 · ABC 셋 다 다름 · ABA 원형 = 과거분사
 * band: 처음 꼭 익힐 수준
 */
export type VerbGroup = "AAA" | "ABB" | "ABC" | "ABA";

export interface IrregularVerb {
  base: string;
  past: string;
  pp: string;
  ko: string;
  group: VerbGroup;
  band: Band;
  note?: string;
}

export const groupInfo: Record<VerbGroup, { label: string; desc: string; example: string }> = {
  AAA: { label: "A-A-A", desc: "세 모양이 모두 같아요", example: "cut – cut – cut" },
  ABB: { label: "A-B-B", desc: "과거형과 과거분사가 같아요", example: "buy – bought – bought" },
  ABC: { label: "A-B-C", desc: "세 모양이 모두 달라요", example: "go – went – gone" },
  ABA: { label: "A-B-A", desc: "원형과 과거분사가 같아요", example: "come – came – come" },
};

const v = (base: string, past: string, pp: string, ko: string, group: VerbGroup, band: Band, note?: string): IrregularVerb => ({
  base,
  past,
  pp,
  ko,
  group,
  band,
  note,
});

export const irregularVerbs: IrregularVerb[] = [
  // A-A-A
  v("cut", "cut", "cut", "자르다", "AAA", "elem"),
  v("put", "put", "put", "놓다, 두다", "AAA", "elem"),
  v("hit", "hit", "hit", "치다, 때리다", "AAA", "elem"),
  v("read", "read", "read", "읽다", "AAA", "elem", "모양은 같지만 과거형·과거분사는 [red]로 읽어요."),
  v("let", "let", "let", "~하게 하다", "AAA", "middle"),
  v("set", "set", "set", "놓다, 정하다", "AAA", "middle"),
  v("shut", "shut", "shut", "닫다", "AAA", "middle"),
  v("hurt", "hurt", "hurt", "다치게 하다, 아프다", "AAA", "middle"),
  v("cost", "cost", "cost", "(비용이) 들다", "AAA", "middle"),
  v("quit", "quit", "quit", "그만두다", "AAA", "middle"),
  v("fit", "fit", "fit", "(크기가) 맞다", "AAA", "middle", "fitted로 쓰기도 해요."),
  v("spread", "spread", "spread", "펼치다, 퍼지다", "AAA", "high"),
  v("burst", "burst", "burst", "터지다", "AAA", "high"),
  v("bet", "bet", "bet", "(돈을) 걸다, 장담하다", "AAA", "high"),
  v("cast", "cast", "cast", "던지다, 배역을 맡기다", "AAA", "high"),
  v("broadcast", "broadcast", "broadcast", "방송하다", "AAA", "high"),
  v("upset", "upset", "upset", "속상하게 하다", "AAA", "high"),

  // A-B-B
  v("have", "had", "had", "가지다, 먹다", "ABB", "elem"),
  v("make", "made", "made", "만들다", "ABB", "elem"),
  v("say", "said", "said", "말하다", "ABB", "elem", "said는 [sed]로 읽어요."),
  v("tell", "told", "told", "말하다, 알려 주다", "ABB", "elem"),
  v("buy", "bought", "bought", "사다", "ABB", "elem"),
  v("bring", "brought", "brought", "가져오다", "ABB", "elem"),
  v("think", "thought", "thought", "생각하다", "ABB", "elem"),
  v("teach", "taught", "taught", "가르치다", "ABB", "elem"),
  v("catch", "caught", "caught", "잡다", "ABB", "elem"),
  v("sell", "sold", "sold", "팔다", "ABB", "elem"),
  v("hear", "heard", "heard", "듣다", "ABB", "elem"),
  v("find", "found", "found", "찾다, 발견하다", "ABB", "elem"),
  v("feel", "felt", "felt", "느끼다", "ABB", "elem"),
  v("sleep", "slept", "slept", "자다", "ABB", "elem"),
  v("meet", "met", "met", "만나다", "ABB", "elem"),
  v("send", "sent", "sent", "보내다", "ABB", "elem"),
  v("sit", "sat", "sat", "앉다", "ABB", "elem"),
  v("stand", "stood", "stood", "서다", "ABB", "elem"),
  v("win", "won", "won", "이기다, 따다", "ABB", "elem"),
  v("get", "got", "got", "얻다, ~하게 되다", "ABB", "elem", "미국에서는 과거분사로 gotten도 많이 써요."),
  v("keep", "kept", "kept", "유지하다, 계속 ~하다", "ABB", "middle"),
  v("leave", "left", "left", "떠나다, 남기다", "ABB", "middle"),
  v("spend", "spent", "spent", "(돈·시간을) 쓰다", "ABB", "middle"),
  v("lend", "lent", "lent", "빌려주다", "ABB", "middle"),
  v("build", "built", "built", "짓다", "ABB", "middle"),
  v("lose", "lost", "lost", "잃어버리다, 지다", "ABB", "middle"),
  v("understand", "understood", "understood", "이해하다", "ABB", "middle"),
  v("pay", "paid", "paid", "(돈을) 내다", "ABB", "middle"),
  v("mean", "meant", "meant", "의미하다", "ABB", "middle", "meant는 [ment]로 읽어요."),
  v("hold", "held", "held", "잡다, (행사를) 열다", "ABB", "middle"),
  v("lead", "led", "led", "이끌다", "ABB", "middle"),
  v("feed", "fed", "fed", "먹이를 주다", "ABB", "middle"),
  v("fight", "fought", "fought", "싸우다", "ABB", "middle"),
  v("shoot", "shot", "shot", "쏘다, 촬영하다", "ABB", "middle"),
  v("hang", "hung", "hung", "걸다, 매달다", "ABB", "middle", "'교수형에 처하다'라는 뜻일 때는 hanged예요."),
  v("seek", "sought", "sought", "찾다, 구하다", "ABB", "high"),
  v("lay", "laid", "laid", "놓다, (알을) 낳다", "ABB", "high"),
  v("dig", "dug", "dug", "파다", "ABB", "high"),
  v("stick", "stuck", "stuck", "붙이다, 찌르다", "ABB", "high"),
  v("swing", "swung", "swung", "흔들다", "ABB", "high"),
  v("light", "lit", "lit", "불을 붙이다", "ABB", "high", "lighted로 쓰기도 해요."),
  v("bend", "bent", "bent", "구부리다", "ABB", "high"),
  v("bleed", "bled", "bled", "피를 흘리다", "ABB", "high"),
  v("deal", "dealt", "dealt", "다루다, 처리하다", "ABB", "high"),
  v("flee", "fled", "fled", "달아나다", "ABB", "high"),
  v("slide", "slid", "slid", "미끄러지다", "ABB", "high"),
  v("spin", "spun", "spun", "돌다, 돌리다", "ABB", "high"),
  v("strike", "struck", "struck", "치다, 떠오르다", "ABB", "high"),
  v("sweep", "swept", "swept", "쓸다", "ABB", "high"),
  v("weep", "wept", "wept", "울다, 눈물을 흘리다", "ABB", "high"),

  // A-B-C
  v("be", "was / were", "been", "~이다, 있다", "ABC", "elem", "주어가 I, he, she, it이면 was, you, we, they면 were예요."),
  v("do", "did", "done", "하다", "ABC", "elem"),
  v("go", "went", "gone", "가다", "ABC", "elem"),
  v("see", "saw", "seen", "보다", "ABC", "elem"),
  v("eat", "ate", "eaten", "먹다", "ABC", "elem"),
  v("give", "gave", "given", "주다", "ABC", "elem"),
  v("take", "took", "taken", "가지고 가다, 타다", "ABC", "elem"),
  v("write", "wrote", "written", "쓰다", "ABC", "elem"),
  v("ride", "rode", "ridden", "타다", "ABC", "elem"),
  v("speak", "spoke", "spoken", "말하다", "ABC", "elem"),
  v("know", "knew", "known", "알다", "ABC", "elem"),
  v("draw", "drew", "drawn", "그리다, 끌다", "ABC", "elem"),
  v("begin", "began", "begun", "시작하다", "ABC", "elem"),
  v("swim", "swam", "swum", "수영하다", "ABC", "elem"),
  v("sing", "sang", "sung", "노래하다", "ABC", "elem"),
  v("drink", "drank", "drunk", "마시다", "ABC", "elem"),
  v("drive", "drove", "driven", "운전하다", "ABC", "middle"),
  v("rise", "rose", "risen", "오르다, (해가) 뜨다", "ABC", "middle"),
  v("break", "broke", "broken", "깨다, 부수다", "ABC", "middle"),
  v("choose", "chose", "chosen", "고르다", "ABC", "middle"),
  v("forget", "forgot", "forgotten", "잊다", "ABC", "middle"),
  v("grow", "grew", "grown", "자라다, 기르다", "ABC", "middle"),
  v("throw", "threw", "thrown", "던지다", "ABC", "middle"),
  v("blow", "blew", "blown", "(바람이) 불다", "ABC", "middle"),
  v("fly", "flew", "flown", "날다", "ABC", "middle"),
  v("show", "showed", "shown", "보여 주다", "ABC", "middle", "과거분사로 showed도 써요."),
  v("wear", "wore", "worn", "입다, 쓰다", "ABC", "middle"),
  v("steal", "stole", "stolen", "훔치다", "ABC", "middle"),
  v("hide", "hid", "hidden", "숨다, 숨기다", "ABC", "middle"),
  v("bite", "bit", "bitten", "물다", "ABC", "middle"),
  v("fall", "fell", "fallen", "떨어지다, 넘어지다", "ABC", "middle"),
  v("shake", "shook", "shaken", "흔들다", "ABC", "middle"),
  v("wake", "woke", "woken", "깨다, 깨우다", "ABC", "middle"),
  v("ring", "rang", "rung", "(벨이) 울리다", "ABC", "middle"),
  v("tear", "tore", "torn", "찢다", "ABC", "high"),
  v("sink", "sank", "sunk", "가라앉다", "ABC", "high"),
  v("freeze", "froze", "frozen", "얼다", "ABC", "high"),
  v("forgive", "forgave", "forgiven", "용서하다", "ABC", "high"),
  v("mistake", "mistook", "mistaken", "잘못 알다, 착각하다", "ABC", "high"),
  v("lie", "lay", "lain", "눕다, 놓여 있다", "ABC", "high", "'거짓말하다'의 lie는 규칙 동사예요: lie – lied – lied"),
  v("beat", "beat", "beaten", "이기다, 때리다", "ABC", "high", "과거형은 원형과 같아요 (A-A-B)."),

  // A-B-A
  v("come", "came", "come", "오다", "ABA", "elem"),
  v("run", "ran", "run", "달리다", "ABA", "elem"),
  v("become", "became", "become", "~이 되다", "ABA", "middle"),
  v("overcome", "overcame", "overcome", "극복하다", "ABA", "high"),
];

/** 모양이 닮아서 헷갈리는 동사 (고등 어법 단골) */
export const confusingVerbs: { rows: { base: string; forms: string; ko: string }[]; tip: string }[] = [
  {
    rows: [
      { base: "lie", forms: "lie – lay – lain", ko: "눕다, 놓여 있다 (목적어 없음)" },
      { base: "lay", forms: "lay – laid – laid", ko: "놓다, 눕히다 (목적어 있음)" },
      { base: "lie", forms: "lie – lied – lied", ko: "거짓말하다" },
    ],
    tip: "lay는 lie(눕다)의 과거형이기도 하고 '놓다'의 원형이기도 해요. 뒤에 목적어가 있으면 '놓다'예요.",
  },
  {
    rows: [
      { base: "rise", forms: "rise – rose – risen", ko: "오르다 (목적어 없음)" },
      { base: "raise", forms: "raise – raised – raised", ko: "올리다, 기르다 (목적어 있음)" },
    ],
    tip: "스스로 오르면 rise, 무언가를 올리면 raise예요.",
  },
  {
    rows: [
      { base: "find", forms: "find – found – found", ko: "찾다, 발견하다" },
      { base: "found", forms: "found – founded – founded", ko: "설립하다, 세우다" },
    ],
    tip: "found가 원형으로 쓰이면 '설립하다'라는 규칙 동사예요.",
  },
  {
    rows: [
      { base: "fall", forms: "fall – fell – fallen", ko: "떨어지다, 넘어지다" },
      { base: "fell", forms: "fell – felled – felled", ko: "(나무를) 베어 넘어뜨리다" },
    ],
    tip: "fell은 fall의 과거형이면서, 따로 '베어 넘어뜨리다'라는 규칙 동사이기도 해요.",
  },
  {
    rows: [
      { base: "wind", forms: "wind – wound – wound", ko: "감다, 구불구불 이어지다" },
      { base: "wound", forms: "wound – wounded – wounded", ko: "상처를 입히다" },
    ],
    tip: "wound는 wind의 과거형이면서 '상처 입히다'라는 규칙 동사예요. 발음도 달라요.",
  },
];
