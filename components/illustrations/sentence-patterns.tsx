import { En } from "@/components/lesson/En";
import { ArrowRight, CrownIcon, MaskIcon } from "./icons";

/* 문장 성분별 색: 주어(하늘) / 동사(산호) / 목적어(민트) / 보어(호박) / 수식어(점선) */
type Role = "S" | "V" | "O" | "IO" | "DO" | "C" | "OC" | "M";

const ROLE_STYLE: Record<Role, string> = {
  S: "bg-sky-soft text-sky-ink",
  V: "bg-coral text-white",
  O: "bg-mint-soft text-mint-ink",
  IO: "bg-mint-soft text-mint-ink ring-2 ring-inset ring-mint-ink/40",
  DO: "bg-mint-soft text-mint-ink",
  C: "bg-amber-soft text-amber-ink",
  OC: "bg-amber-soft text-amber-ink",
  M: "border-2 border-dashed border-ink-3/60 text-ink-2",
};

const ROLE_KO: Record<Role, string> = {
  S: "주어",
  V: "동사",
  O: "목적어",
  IO: "~에게",
  DO: "~을",
  C: "보어",
  OC: "목적격보어",
  M: "수식어",
};

interface Piece {
  role: Role;
  en: string;
  label?: string;
}

/** 성분 블록 하나: 위에는 영어, 아래에는 역할 이름 */
function Block({ role, en, label }: Piece) {
  return (
    <span className="inline-flex flex-col items-center gap-1">
      <span className={`rounded-xl px-2.5 py-1.5 text-[1.08em] font-medium leading-snug ${ROLE_STYLE[role]}`}>
        <En en={en} />
      </span>
      <span className="whitespace-nowrap text-[14px] font-extrabold text-ink-2">{label ?? `${role} · ${ROLE_KO[role]}`}</span>
    </span>
  );
}

function Blocks({ pieces }: { pieces: Piece[] }) {
  return (
    <span className="flex flex-wrap items-start gap-x-2 gap-y-3">
      {pieces.map((b, i) => (
        <Block key={i} {...b} />
      ))}
    </span>
  );
}

function Legend() {
  const items: { role: Role; text: string }[] = [
    { role: "S", text: "S 주어" },
    { role: "V", text: "V 진짜 동사" },
    { role: "O", text: "O 목적어 (IO·DO)" },
    { role: "C", text: "C 보어 (OC)" },
    { role: "M", text: "M 수식어: 형식에 안 넣어요" },
  ];
  return (
    <ul className="mt-4 flex flex-wrap gap-2">
      {items.map((it) => (
        <li key={it.role} className={`rounded-full px-2.5 py-1 text-[14px] font-bold ${ROLE_STYLE[it.role]}`}>
          {it.text}
        </li>
      ))}
    </ul>
  );
}

const PATTERNS: { n: string; formula: string; hint: string; pieces: Piece[]; ko: string }[] = [
  {
    n: "1형식",
    formula: "S + V",
    hint: "동사 뒤에 꼭 필요한 말이 없어요",
    pieces: [
      { role: "S", en: "The baby" },
      { role: "V", en: "sleeps" },
      { role: "M", en: "on the sofa" },
    ],
    ko: "아기가 소파에서 자요.",
  },
  {
    n: "2형식",
    formula: "S + V + C",
    hint: "주어 = 보어",
    pieces: [
      { role: "S", en: "My dog" },
      { role: "V", en: "looks" },
      { role: "C", en: "happy" },
    ],
    ko: "우리 개는 행복해 보여요.",
  },
  {
    n: "3형식",
    formula: "S + V + O",
    hint: "누구를·무엇을 하나",
    pieces: [
      { role: "S", en: "I" },
      { role: "V", en: "play" },
      { role: "O", en: "soccer" },
      { role: "M", en: "after school" },
    ],
    ko: "나는 방과 후에 축구를 해요.",
  },
  {
    n: "4형식",
    formula: "S + V + IO + DO",
    hint: "누구에게 + 무엇을",
    pieces: [
      { role: "S", en: "Mom" },
      { role: "V", en: "gave" },
      { role: "IO", en: "me" },
      { role: "DO", en: "a gift" },
    ],
    ko: "엄마가 나에게 선물을 주셨어요.",
  },
  {
    n: "5형식",
    formula: "S + V + O + OC",
    hint: "목적어 = 목적격보어",
    pieces: [
      { role: "S", en: "The song" },
      { role: "V", en: "makes" },
      { role: "O", en: "me" },
      { role: "OC", en: "happy" },
    ],
    ko: "그 노래는 나를 행복하게 해요.",
  },
];

/** 다섯 가지 문장 설계도: 성분별 색 블록 */
export function SpFivePatterns() {
  return (
    <div>
      <ol className="space-y-2.5">
        {PATTERNS.map((p) => (
          <li key={p.n} className="rounded-2xl border border-line px-3 py-3 sm:px-4">
            <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="rounded-lg bg-ink px-2 py-0.5 text-[14px] font-extrabold text-on-ink">{p.n}</span>
              <span lang="en" className="font-extrabold">
                {p.formula}
              </span>
              <span className="text-[14px] text-ink-2">{p.hint}</span>
            </p>
            <div className="mt-3">
              <Blocks pieces={p.pieces} />
            </div>
            <p className="mt-2 text-[14px] text-ink-2">{p.ko}</p>
          </li>
        ))}
      </ol>
      <Legend />
    </div>
  );
}

const BRANCHES: { left: string; results: { r: string; when: string; en: string }[] }[] = [
  { left: "0개", results: [{ r: "1형식", when: "남은 게 없어요", en: "Birds [[fly]]." }] },
  {
    left: "1개",
    results: [
      { r: "2형식", when: "주어 = 그 말 (보어)", en: "She is [[a nurse]]." },
      { r: "3형식", when: "주어 ≠ 그 말 (목적어)", en: "She met [[a nurse]]." },
    ],
  },
  {
    left: "2개",
    results: [
      { r: "4형식", when: "~에게 + ~을 (앞 ≠ 뒤)", en: "He gave [[me]] [[a pen]]." },
      { r: "5형식", when: "앞 = 뒤 (목적어 = 목적격보어)", en: "He made [[me]] [[happy]]." },
    ],
  },
];

/** 형식을 찾는 세 걸음 */
export function SpPatternSteps() {
  return (
    <div>
      <ol className="grid gap-2.5 sm:grid-cols-3">
        <li className="rounded-2xl bg-coral-soft px-4 py-3">
          <p className="flex items-center gap-2 font-extrabold">
            <CrownIcon size={22} className="shrink-0 text-coral" />
            1. 진짜 동사 찾기
          </p>
          <p className="mt-1 text-[14px] text-ink-2">왕관을 쓴 동사 하나. 형식은 이 동사가 정해요.</p>
        </li>
        <li className="rounded-2xl border-2 border-dashed border-ink-3/60 px-4 py-3">
          <p className="font-extrabold">2. 수식어에 괄호 치기</p>
          <p className="mt-1 text-[14px] text-ink-2">부사, &lsquo;전치사 + 명사&rsquo; 덩어리는 빼도 문장이 무너지지 않아요.</p>
        </li>
        <li className="rounded-2xl bg-chip px-4 py-3">
          <p className="font-extrabold">3. 동사 뒤 덩어리 세기</p>
          <p className="mt-1 text-[14px] text-ink-2">괄호 밖에 몇 개 남았는지, 서로 어떤 사이인지 봐요.</p>
        </li>
      </ol>
      <div className="my-3 flex justify-center">
        <ArrowRight className="rotate-90 text-ink-3" />
      </div>
      <ul className="grid gap-2.5 sm:grid-cols-3">
        {BRANCHES.map((b) => (
          <li key={b.left} className="rounded-2xl border border-line px-4 py-3">
            <p className="text-[14px] font-extrabold text-ink-3">남은 덩어리 {b.left}</p>
            <ul className="mt-2 space-y-2.5">
              {b.results.map((r) => (
                <li key={r.r}>
                  <p className="flex flex-wrap items-center gap-x-2">
                    <span className="rounded-lg bg-ink px-2 py-0.5 text-[14px] font-extrabold text-on-ink">{r.r}</span>
                    <span className="text-[14px] text-ink-2">{r.when}</span>
                  </p>
                  <p className="mt-1 font-medium">
                    <En en={r.en} />
                  </p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

const SENSES: { sense: string; verb: string; mean: string; en: string; ko: string }[] = [
  { sense: "눈", verb: "look", mean: "~해 보이다", en: "You look [[tired]].", ko: "너 피곤해 보여." },
  { sense: "귀", verb: "sound", mean: "~하게 들리다", en: "That sounds [[great]].", ko: "그거 좋은데(좋게 들려)." },
  { sense: "코", verb: "smell", mean: "~한 냄새가 나다", en: "The bread smells [[good]].", ko: "빵에서 좋은 냄새가 나." },
  { sense: "입", verb: "taste", mean: "~한 맛이 나다", en: "This soup tastes [[salty]].", ko: "이 수프는 짠맛이 나." },
  { sense: "손", verb: "feel", mean: "~한 느낌이 나다", en: "The blanket {feels|동사:~한 느낌이 나다} [[soft]].", ko: "이 담요는 부드러워." },
];

/** 다섯 감각동사 + 형용사 보어 */
export function SpSenseVerbs() {
  return (
    <ul className="grid gap-2.5 sm:grid-cols-2">
      {SENSES.map((s) => (
        <li key={s.verb} className="flex items-start gap-3 rounded-2xl border border-line px-3 py-3">
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-coral text-[1.05em] font-extrabold text-white">
            {s.sense}
          </span>
          <span className="min-w-0">
            <span className="flex flex-wrap items-baseline gap-x-2">
              <span lang="en" className="text-[1.15em] font-extrabold">
                {s.verb}
              </span>
              <span className="text-[14px] text-ink-2">{s.mean}</span>
            </span>
            <span className="mt-1 block font-medium">
              <En en={s.en} />
            </span>
            <span className="block text-[14px] text-ink-2">{s.ko}</span>
          </span>
        </li>
      ))}
      <li className="rounded-2xl bg-amber-soft px-4 py-3 text-amber-ink">
        <p className="font-extrabold">뒤에 오는 말</p>
        <p className="mt-1 text-[14px]">
          형용사 → 감각동사 + <b>형용사</b>
        </p>
        <p className="font-medium">
          <En en="You look [[happy]]." />
        </p>
        <p className="mt-1 text-[14px]">
          명사 → 감각동사 + <b>like</b> + 명사
        </p>
        <p className="font-medium">
          <En en="You [[{look like}]] your mom." />
        </p>
      </li>
    </ul>
  );
}

const GIVE_4: Piece[] = [
  { role: "S", en: "I" },
  { role: "V", en: "gave" },
  { role: "IO", en: "Jisu", label: "IO · ~에게 (사람)" },
  { role: "DO", en: "a book", label: "DO · ~을 (물건)" },
];

const GIVE_3: Piece[] = [
  { role: "S", en: "I" },
  { role: "V", en: "gave" },
  { role: "O", en: "a book", label: "O · ~을 (물건)" },
  { role: "M", en: "to Jisu", label: "전치사 + 사람" },
];

const PREPS: { p: string; hint: string; verbs: string; en: string; ko: string }[] = [
  {
    p: "to",
    hint: "받는 사람에게 건너가야 끝나는 동작",
    verbs: "give, send, show, tell, teach, lend, bring, write, pass",
    en: "I sent a card [[to]] my grandma.",
    ko: "나는 할머니께 카드를 보냈어.",
  },
  {
    p: "for",
    hint: "상대를 위해 해 주는 동작 (혼자서도 할 수 있어요)",
    verbs: "buy, make, cook, get, find, build",
    en: "Dad cooked dinner [[for]] us.",
    ko: "아빠가 우리에게 저녁을 해 주셨어.",
  },
  {
    p: "of",
    hint: "묻고 부탁하는 동작",
    verbs: "ask",
    en: "May I ask a favor [[of]] you?",
    ko: "부탁 하나 해도 될까?",
  },
];

/** 4형식 → 3형식: 두 목적어 자리 바꾸기와 전치사 to / for / of */
export function SpGiveArrows() {
  return (
    <div>
      <div className="rounded-2xl border border-line px-3 py-3 sm:px-4">
        <p className="flex flex-wrap items-center gap-2">
          <span className="rounded-lg bg-ink px-2 py-0.5 text-[14px] font-extrabold text-on-ink">4형식</span>
          <span className="text-[14px] text-ink-2">사람 먼저, 물건 나중</span>
        </p>
        <div className="mt-3">
          <Blocks pieces={GIVE_4} />
        </div>
      </div>
      <p className="my-2.5 flex items-center justify-center gap-2 text-center text-[14px] font-bold text-coral-ink">
        <ArrowRight size={20} className="shrink-0 rotate-90" />
        물건을 앞으로, 사람 앞에는 전치사
      </p>
      <div className="rounded-2xl border border-line px-3 py-3 sm:px-4">
        <p className="flex flex-wrap items-center gap-2">
          <span className="rounded-lg bg-ink px-2 py-0.5 text-[14px] font-extrabold text-on-ink">3형식</span>
          <span className="text-[14px] text-ink-2">&lsquo;전치사 + 사람&rsquo;은 수식어가 돼요</span>
        </p>
        <div className="mt-3">
          <Blocks pieces={GIVE_3} />
        </div>
      </div>
      <ul className="mt-4 grid gap-2.5 sm:grid-cols-3">
        {PREPS.map((pr) => (
          <li key={pr.p} className="rounded-2xl bg-chip px-4 py-3">
            <p lang="en" className="text-[1.5em] font-extrabold leading-none text-coral-ink">
              {pr.p}
            </p>
            <p className="mt-1.5 text-[14px] font-bold">{pr.hint}</p>
            <p lang="en" className="mt-1.5 text-[14px] text-ink-2">
              {pr.verbs}
            </p>
            <p className="mt-2 font-medium">
              <En en={pr.en} />
            </p>
            <p className="text-[14px] text-ink-2">{pr.ko}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

const OC_ROWS: { pieces: Piece[]; hidden: { en: string; ko: string } }[] = [
  {
    pieces: [
      { role: "S", en: "The news" },
      { role: "V", en: "made" },
      { role: "O", en: "me" },
      { role: "OC", en: "happy" },
    ],
    hidden: { en: "I am happy.", ko: "내가 행복하다" },
  },
  {
    pieces: [
      { role: "S", en: "We" },
      { role: "V", en: "call" },
      { role: "O", en: "our cat" },
      { role: "OC", en: "Coco" },
    ],
    hidden: { en: "Our cat is Coco.", ko: "우리 고양이는 코코다" },
  },
  {
    pieces: [
      { role: "S", en: "Mom" },
      { role: "V", en: "wants" },
      { role: "O", en: "me" },
      { role: "OC", en: "to eat vegetables" },
    ],
    hidden: { en: "I eat vegetables.", ko: "내가 채소를 먹는다" },
  },
  {
    pieces: [
      { role: "S", en: "I" },
      { role: "V", en: "saw" },
      { role: "O", en: "Minsu" },
      { role: "OC", en: "dance" },
    ],
    hidden: { en: "Minsu dances.", ko: "민수가 춤춘다" },
  },
];

/** 목적어 + 목적격보어 속에 숨은 작은 문장 */
export function SpOCBox() {
  return (
    <ul className="space-y-2.5">
      {OC_ROWS.map((row, i) => (
        <li key={i} className="rounded-2xl border border-line px-3 py-3 sm:px-4">
          <div className="flex flex-wrap items-start gap-x-2 gap-y-3">
            <Blocks pieces={row.pieces.slice(0, 2)} />
            <span className="rounded-2xl border-2 border-dashed border-amber-ink/60 px-2 pb-1.5 pt-2">
              <Blocks pieces={row.pieces.slice(2)} />
            </span>
          </div>
          <p className="mt-2 flex flex-wrap items-baseline gap-x-2 text-[14px] text-amber-ink">
            <span className="font-extrabold">숨은 문장</span>
            <span className="text-[1.1em] font-medium text-ink">
              <En en={row.hidden.en} />
            </span>
            <span className="text-ink-2">({row.hidden.ko})</span>
          </p>
        </li>
      ))}
    </ul>
  );
}

const OC_FORMS: { verbs: string; kind?: string; form: string; disguise: boolean; en: string; ko: string }[] = [
  {
    verbs: "make, call, name, elect, keep, find, leave",
    form: "명사 · 형용사",
    disguise: false,
    en: "Keep your room [[{clean|형용사:깨끗한}]].",
    ko: "방을 깨끗하게 유지해.",
  },
  {
    verbs: "want, ask, tell, allow, expect, get",
    form: "to부정사",
    disguise: true,
    en: "Mom told me [[to wait]].",
    ko: "엄마가 나에게 기다리라고 하셨어.",
  },
  {
    verbs: "make, have, let",
    kind: "사역동사",
    form: "동사원형",
    disguise: true,
    en: "Dad let me [[use]] his phone.",
    ko: "아빠가 휴대폰을 쓰게 해 주셨어.",
  },
  {
    verbs: "see, watch, hear, feel",
    kind: "지각동사",
    form: "동사원형 · -ing",
    disguise: true,
    en: "I heard Mia [[sing]].",
    ko: "나는 미아가 노래하는 걸 들었어.",
  },
  {
    verbs: "help",
    form: "동사원형 · to부정사",
    disguise: true,
    en: "She helped me [[carry]] the box.",
    ko: "그녀는 내가 상자 나르는 걸 도와줬어.",
  },
  {
    verbs: "have, get",
    kind: "목적어가 당할 때",
    form: "과거분사",
    disguise: true,
    en: "I {had|동사:~하게 했다} my hair [[{cut|과거분사:잘린}]].",
    ko: "나는 (미용실에서) 머리를 잘랐어.",
  },
];

/** 동사에 따라 달라지는 목적격보어의 모양 */
export function SpOCForms() {
  return (
    <ul className="grid gap-2.5 sm:grid-cols-2">
      {OC_FORMS.map((f) => (
        <li key={f.form + f.verbs} className="rounded-2xl border border-line px-4 py-3">
          <p lang="en" className="font-extrabold">
            {f.verbs}
            {f.kind && (
              <span lang="ko" className="ml-2 text-[14px] font-bold text-ink-3">
                {f.kind}
              </span>
            )}
          </p>
          <p className="mt-1.5 flex flex-wrap items-center gap-2">
            <span className="text-[14px] text-ink-2">목적격보어</span>
            <span
              className={`inline-flex items-center gap-1.5 rounded-lg px-2 py-0.5 text-[14px] font-extrabold ${
                f.disguise ? "bg-amber-soft text-amber-ink" : "bg-chip text-ink"
              }`}
            >
              {f.disguise && <MaskIcon size={18} className="shrink-0" />}
              {f.form}
            </span>
          </p>
          <p className="mt-2 font-medium">
            <En en={f.en} />
          </p>
          <p className="text-[14px] text-ink-2">{f.ko}</p>
        </li>
      ))}
    </ul>
  );
}
