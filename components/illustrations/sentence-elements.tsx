import { En } from "@/components/lesson/En";
import { ArrowRight } from "./icons";

/* 문장 성분별 색: 주어 / 서술어(진짜 동사) / 목적어 / 보어 / 수식어(빼도 되는 장식은 점선) */
type SeRole = "s" | "v" | "o" | "c" | "m";

const SE_ROLE: Record<SeRole, { name: string; ask: string; tone: string }> = {
  s: { name: "주어", ask: "누가? 무엇이?", tone: "bg-sky-soft text-sky-ink" },
  v: { name: "서술어", ask: "한다? 이다?", tone: "bg-coral text-white" },
  o: { name: "목적어", ask: "무엇을? 누구를?", tone: "bg-mint-soft text-mint-ink" },
  c: { name: "보어", ask: "누구? 어떤 상태?", tone: "bg-amber-soft text-amber-ink" },
  m: { name: "수식어", ask: "꾸밈 · 빼도 돼요", tone: "border-2 border-dashed border-ink-3 text-ink-2" },
};

const SE_ROLE_ORDER: SeRole[] = ["s", "v", "o", "c", "m"];

function SeChunk({ en, role, label }: { en: string; role: SeRole; label?: string }) {
  const r = SE_ROLE[role];
  return (
    <span className="inline-flex flex-col items-center gap-1.5">
      <span className={`rounded-xl px-2.5 py-1.5 text-[1.12em] font-medium leading-snug ${r.tone}`}>
        <En en={en} />
      </span>
      <span className="text-[13.5px] font-extrabold leading-none text-ink-2">{label ?? r.name}</span>
    </span>
  );
}

function SeRoleChip({ role, withAsk = false }: { role: SeRole; withAsk?: boolean }) {
  const r = SE_ROLE[role];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[13.5px] font-extrabold ${r.tone}`}>
      {r.name}
      {withAsk && <span className="font-medium opacity-90">{r.ask}</span>}
    </span>
  );
}

/** 문장을 역할별로 색칠하기: 주어·서술어·목적어·보어·수식어 */
export function SeRoleColors() {
  const rows: { chunks: { en: string; role: SeRole; label?: string }[]; ko: string }[] = [
    {
      chunks: [
        { en: "My brother", role: "s" },
        { en: "kicked", role: "v" },
        { en: "the ball", role: "o" },
        { en: "in the park.", role: "m" },
      ],
      ko: "우리 형은 공원에서 공을 찼어.",
    },
    {
      chunks: [
        { en: "This soup", role: "s" },
        { en: "smells", role: "v" },
        { en: "really", role: "m" },
        { en: "good.", role: "c", label: "주격보어" },
      ],
      ko: "이 수프는 정말 좋은 냄새가 나.",
    },
    {
      chunks: [
        { en: "The movie", role: "s" },
        { en: "made", role: "v" },
        { en: "me", role: "o" },
        { en: "sad.", role: "c", label: "목적격보어" },
      ],
      ko: "그 영화는 나를 슬프게 했어.",
    },
  ];
  return (
    <div>
      <ol className="space-y-3">
        {rows.map((row, i) => (
          <li key={i} className="rounded-2xl border border-line px-3 py-3.5">
            <p lang="en" className="flex flex-wrap items-start justify-center gap-x-2 gap-y-3">
              {row.chunks.map((c) => (
                <SeChunk key={c.en} en={c.en} role={c.role} label={c.label} />
              ))}
            </p>
            <p className="mt-2.5 text-center text-[13.5px] text-ink-2">{row.ko}</p>
          </li>
        ))}
      </ol>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {SE_ROLE_ORDER.map((r) => (
          <li key={r}>
            <SeRoleChip role={r} withAsk />
          </li>
        ))}
      </ul>
    </div>
  );
}

/** 품사(직업) → 문장 성분(역할): 직업마다 맡을 수 있는 역할이 정해져 있다 */
export function SeJobToRole() {
  const rows: { pos: string; roles: SeRole[]; en: string; note: string }[] = [
    { pos: "명사·대명사", roles: ["s", "o", "c"], en: "I love [[music]].", note: "music: 목적어" },
    { pos: "동사", roles: ["v"], en: "Birds [[fly]].", note: "fly: 서술어" },
    { pos: "형용사", roles: ["c", "m"], en: "The water is [[cold]].", note: "cold: 보어" },
    { pos: "부사", roles: ["m"], en: "He runs [[fast]].", note: "fast: 수식어" },
    { pos: "전치사 + 명사", roles: ["m"], en: "I read [[at night]].", note: "at night: 수식어" },
  ];
  return (
    <ul className="space-y-2.5">
      {rows.map((r) => (
        <li key={r.pos} className="flex flex-col gap-2 rounded-2xl border border-line px-3 py-3 sm:flex-row sm:items-center sm:gap-4">
          <span className="flex flex-wrap items-center gap-2">
            <span className="rounded-lg bg-chip px-2.5 py-1 text-[13.5px] font-extrabold text-ink">{r.pos}</span>
            <ArrowRight size={18} className="text-ink-3" />
            {r.roles.map((role) => (
              <SeRoleChip key={role} role={role} />
            ))}
          </span>
          <span className="min-w-0 sm:ml-auto sm:text-right">
            <span className="text-[1.05em] font-medium">
              <En en={r.en} />
            </span>
            <span className="ml-2 text-[13.5px] text-ink-2">{r.note}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}

/** 자리마다 설 수 있는 모양: 주어·목적어·보어(명사 자리)와 수식어(꾸미는 자리) */
export function SeSlotMenu() {
  const slots: { role: SeRole; title: string; sub: string; items: { form: string; en: string }[] }[] = [
    {
      role: "s",
      title: "주어 자리",
      sub: "명사처럼 일하는 것",
      items: [
        { form: "명사", en: "[[My dog]] is smart." },
        { form: "to부정사", en: "[[To win]] is not everything." },
        { form: "동명사", en: "[[Swimming]] is fun." },
        { form: "명사절", en: "[[{What|관계대명사:~하는 것} he said]] is true." },
      ],
    },
    {
      role: "o",
      title: "목적어 자리",
      sub: "명사처럼 일하는 것",
      items: [
        { form: "명사", en: "I like [[pizza]]." },
        { form: "to부정사", en: "I want [[to rest]]." },
        { form: "동명사", en: "I enjoy [[dancing]]." },
        { form: "명사절", en: "I know [[{that|접속사:~라는 것} you are busy]]." },
      ],
    },
    {
      role: "c",
      title: "보어 자리",
      sub: "명사·형용사처럼 일하는 것",
      items: [
        { form: "명사", en: "She is [[a singer]]." },
        { form: "형용사", en: "I feel [[sleepy]]." },
        { form: "to부정사·동명사", en: "My hobby is [[drawing]]." },
        { form: "분사", en: "The game was [[exciting]]." },
        { form: "명사절", en: "The problem is [[{that|접속사:~라는 것} I am late]]." },
      ],
    },
    {
      role: "m",
      title: "수식어 자리",
      sub: "꾸미는 것 · 빼도 돼요",
      items: [
        { form: "형용사구", en: "the cat [[on the sofa]]" },
        { form: "부사구", en: "I run [[in the morning]]." },
        { form: "형용사절", en: "the cake [[{that|관계대명사:~하는 (앞의 명사를 꾸며요)} Mom made]]" },
        { form: "부사절", en: "[[{When|접속사:~할 때} I {woke up}]], {it|대명사:(날씨·명암을 말할 때 자리를 채우는 말)} was dark." },
      ],
    },
  ];
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {slots.map((s) => (
        <div key={s.title} className="rounded-2xl border border-line px-4 py-4">
          <p className="flex flex-wrap items-center gap-2">
            <span className={`rounded-lg px-2.5 py-1 text-[14.5px] font-extrabold ${SE_ROLE[s.role].tone}`}>{s.title}</span>
            <span className="text-[13.5px] text-ink-2">{s.sub}</span>
          </p>
          <ul className="mt-3 space-y-2">
            {s.items.map((it) => (
              <li key={it.form} className="flex flex-col gap-0.5">
                <span className="text-[13.5px] font-extrabold text-ink-3">{it.form}</span>
                <span className="text-[1.05em] font-medium">
                  <En en={it.en} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/* ───────── 서술어는 지도의 '현재 위치' ───────── */

function SePin({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className="shrink-0" aria-hidden>
      <path d="M12 22.5 C12 22.5 4.5 14.5 4.5 9.2 A7.5 7.5 0 0 1 19.5 9.2 C19.5 14.5 12 22.5 12 22.5 Z" fill="currentColor" />
      <circle cx="12" cy="9.2" r="2.8" style={{ fill: "var(--card)" }} />
    </svg>
  );
}

type SeChunkData = { en: string; role: SeRole; label?: string };

const SE_PIN_ROWS: { chunks: SeChunkData[]; ko: string; note?: string }[] = [
  {
    chunks: [
      { en: "My sister", role: "s" },
      { en: "became", role: "v" },
      { en: "a teacher.", role: "c" },
    ],
    ko: "우리 언니는 선생님이 되었어.",
  },
  {
    chunks: [
      { en: "Jisu", role: "s" },
      { en: "ate", role: "v" },
      { en: "two sandwiches.", role: "o" },
    ],
    ko: "지수는 샌드위치 두 개를 먹었어.",
  },
  {
    chunks: [
      { en: "I", role: "s" },
      { en: "want", role: "v" },
      { en: "to eat pizza.", role: "o" },
    ],
    ko: "나는 피자를 먹고 싶어.",
    note: "to eat은 변장한 동사라서 서술어가 못 돼요. 서술어는 want 하나예요.",
  },
];

/** 서술어(진짜 동사)를 먼저 찾으면 앞은 주어, 뒤는 목적어·보어 */
export function SeVerbPin() {
  return (
    <div>
      <div className="grid grid-cols-[1fr_auto_1fr] items-stretch gap-1.5 text-center text-[13.5px] font-extrabold">
        <span className="grid place-items-center rounded-lg bg-sky-soft px-2 py-1.5 text-sky-ink">앞: 누가? 무엇이?</span>
        <span className="flex items-center gap-1 rounded-lg bg-coral px-2 py-1.5 text-white">
          <SePin size={18} />
          서술어
        </span>
        <span className="grid place-items-center rounded-lg bg-chip px-2 py-1.5 text-ink">뒤: 무엇을? 어떤 상태?</span>
      </div>
      <ol className="mt-3 space-y-2.5">
        {SE_PIN_ROWS.map((row) => (
          <li key={row.ko} className="rounded-2xl border border-line px-3 py-3">
            <p lang="en" className="flex flex-wrap items-end justify-center gap-x-2 gap-y-3">
              {row.chunks.map((c) =>
                c.role === "v" ? (
                  <span key={c.en} className="inline-flex flex-col items-center gap-0.5">
                    <span className="text-coral">
                      <SePin />
                    </span>
                    <SeChunk en={c.en} role={c.role} label="서술어 · 현재 위치" />
                  </span>
                ) : (
                  <SeChunk key={c.en} en={c.en} role={c.role} label={c.label} />
                ),
              )}
            </p>
            <p className="mt-2 text-center text-[13.5px] text-ink-2">{row.ko}</p>
            {row.note && <p className="mt-1 text-center text-[13.5px] font-bold text-coral-ink">{row.note}</p>}
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ───────── 보어: 모자란 뜻을 채우는 빈칸 ───────── */

const SE_FILLED: { chunks: SeChunkData[]; eq: string; kind: string }[] = [
  {
    chunks: [
      { en: "My dad", role: "s" },
      { en: "is", role: "v" },
      { en: "a nurse.", role: "c", label: "주격보어" },
    ],
    eq: "아빠 = 간호사",
    kind: "명사 보어",
  },
  {
    chunks: [
      { en: "You", role: "s" },
      { en: "look", role: "v" },
      { en: "tired.", role: "c", label: "주격보어" },
    ],
    eq: "너 = 피곤한 상태",
    kind: "형용사 보어",
  },
];

/** be·become·look 뒤의 빈칸: 채우지 않으면 뜻이 모자란다 */
export function SeFillGap() {
  return (
    <div className="mx-auto max-w-xl">
      <div className="rounded-2xl border border-line px-3 py-3">
        <p className="text-[13.5px] font-extrabold text-ink-3">여기서 끝나면?</p>
        <p lang="en" className="mt-2 flex flex-wrap items-end justify-center gap-x-2 gap-y-3">
          <SeChunk en="My dad" role="s" />
          <SeChunk en="is" role="v" />
          <span className="inline-flex flex-col items-center gap-1.5">
            <span className="rounded-xl border-2 border-dashed border-amber-ink px-6 py-1.5 text-[1.12em] font-extrabold leading-snug text-amber-ink">
              ?
            </span>
            <span className="text-[13.5px] font-extrabold leading-none text-ink-2">빈자리</span>
          </span>
        </p>
        <p className="mt-2.5 text-center text-[13.5px] font-bold text-coral-ink">&ldquo;아빠가 뭐?&rdquo; 뜻이 모자라요</p>
      </div>
      <p className="my-2.5 flex items-center justify-center gap-2 text-[13.5px] font-bold text-ink-2">
        <ArrowRight size={18} className="rotate-90 text-amber-ink" />
        빈자리를 채우는 말 = 보어
      </p>
      <ul className="grid gap-2.5 sm:grid-cols-2">
        {SE_FILLED.map((row) => (
          <li key={row.eq} className="rounded-2xl border-2 border-amber-soft px-3 py-3">
            <p lang="en" className="flex flex-wrap items-end justify-center gap-x-2 gap-y-3">
              {row.chunks.map((c) => (
                <SeChunk key={c.en} en={c.en} role={c.role} label={c.label} />
              ))}
            </p>
            <p className="mt-2.5 flex flex-wrap items-center justify-center gap-2 text-[13.5px]">
              <span className="rounded-md bg-amber-soft px-2 py-0.5 font-extrabold text-amber-ink">{row.kind}</span>
              <span className="font-bold text-ink-2">{row.eq}</span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ───────── 자리는 그대로, 모양만 바뀐다 ───────── */

const SE_SAME_SLOT: { form: string; chunks: SeChunkData[] }[] = [
  {
    form: "명사구",
    chunks: [
      { en: "My {older|형용사:나이가 더 많은} brother", role: "s" },
      { en: "plays", role: "v" },
      { en: "the drums.", role: "o" },
    ],
  },
  {
    form: "동명사구",
    chunks: [
      { en: "{Walking|동명사:산책시키기} the dog", role: "s" },
      { en: "is", role: "v" },
      { en: "my job.", role: "c" },
    ],
  },
  {
    form: "to부정사구",
    chunks: [
      { en: "To learn a new language", role: "s" },
      { en: "{takes|동사:(시간이) 걸리다}", role: "v" },
      { en: "time.", role: "o" },
    ],
  },
  {
    form: "명사절",
    chunks: [
      { en: "{That|접속사:~라는 것} Minsu won the race", role: "s" },
      { en: "surprised", role: "v" },
      { en: "everyone.", role: "o" },
    ],
  },
];

/** 주어 자리 하나에 명사구·동명사구·to부정사구·명사절이 번갈아 들어간다 */
export function SeSameSlot() {
  return (
    <div>
      <ol className="space-y-2.5">
        {SE_SAME_SLOT.map((row) => (
          <li key={row.form} className="rounded-2xl border border-line px-3 py-3">
            <p lang="en" className="flex flex-wrap items-end gap-x-2 gap-y-3">
              {row.chunks.map((c) => (
                <SeChunk key={c.en} en={c.en} role={c.role} label={c.role === "s" ? `주어 · ${row.form}` : undefined} />
              ))}
            </p>
          </li>
        ))}
      </ol>
      <p className="mt-3 flex flex-wrap items-center justify-center gap-2 text-[13.5px] font-bold text-ink-2">
        <SeRoleChip role="s" />
        <span>자리는 그대로</span>
        <ArrowRight size={16} className="text-ink-3" />
        <span>들어가는 모양만 점점 길어져요</span>
      </p>
    </div>
  );
}

/* ───────── 가주어 it: 긴 주어는 뒤로 ───────── */

const SE_REAL_SUBJECTS = ["to부정사", "that절", "whether절"];

/** 머리가 무거운 문장 → it을 먼저 세우고 진짜 주어는 뒤로 */
export function SeDummyIt() {
  return (
    <div className="mx-auto grid max-w-xl gap-3">
      <div className="rounded-2xl border border-line px-3 py-3">
        <p className="text-[13.5px] font-extrabold text-ink-3">머리가 무거운 문장</p>
        <p lang="en" className="mt-2 flex flex-wrap items-end gap-x-2 gap-y-3">
          <SeChunk en="To {wake up} early on Mondays" role="s" label="주어 (길어요)" />
          <SeChunk en="is" role="v" />
          <SeChunk en="not" role="m" />
          <SeChunk en="easy." role="c" />
        </p>
        <p className="mt-2 text-[13.5px] text-ink-2">주어가 길어서 서술어 is가 한참 뒤에 나와요.</p>
      </div>
      <p className="flex items-center justify-center gap-2 text-[13.5px] font-bold text-ink-2">
        <ArrowRight size={18} className="rotate-90 text-sky-ink" />
        긴 주어는 뒤로, 빈자리에는 it
      </p>
      <div className="rounded-2xl border-2 border-sky-ink/50 px-3 py-3">
        <p className="text-[13.5px] font-extrabold text-sky-ink">가볍게 시작하는 문장</p>
        <p lang="en" className="mt-2 flex flex-wrap items-end gap-x-2 gap-y-3">
          <span className="inline-flex flex-col items-center gap-1.5">
            <span className="rounded-xl border-2 border-dashed border-sky-ink px-2.5 py-1 text-[1.12em] font-medium leading-snug text-sky-ink">
              <En en="{It|대명사:가주어 (뜻 없이 자리만 채워요)}" />
            </span>
            <span className="text-[13.5px] font-extrabold leading-none text-ink-2">가주어</span>
          </span>
          <SeChunk en="is" role="v" />
          <SeChunk en="not" role="m" />
          <SeChunk en="easy" role="c" />
          <SeChunk en="to {wake up} early on Mondays." role="s" label="진주어" />
        </p>
        <p className="mt-2 text-[13.5px] text-ink-2">
          <b>It</b>은 &lsquo;그것&rsquo;이라고 해석하지 않아요. 뒤로 간 진주어를 주어로 해석해요.
        </p>
      </div>
      <p className="flex flex-wrap items-center justify-center gap-2 text-[13.5px] font-bold">
        <span className="text-ink-2">진주어가 될 수 있는 것</span>
        {SE_REAL_SUBJECTS.map((s) => (
          <span key={s} className="rounded-lg bg-sky-soft px-2.5 py-1 text-sky-ink">
            {s}
          </span>
        ))}
      </p>
    </div>
  );
}

/* ───────── 긴 문장 읽기: 수식어에 괄호 치기 ───────── */

const SE_BRACKET_ROWS: { chunks: SeChunkData[]; bone: { en: string }; ko: string }[] = [
  {
    chunks: [
      { en: "The boy", role: "s" },
      { en: "playing the guitar", role: "m", label: "(형용사구)" },
      { en: "is", role: "v" },
      { en: "Minsu.", role: "c" },
    ],
    bone: { en: "The boy is Minsu." },
    ko: "기타를 치고 있는 소년이 민수야.",
  },
  {
    chunks: [
      { en: "The cake", role: "s" },
      { en: "{that|관계대명사:~하는 (앞의 명사를 꾸며요)} my mom made", role: "m", label: "(형용사절)" },
      { en: "was", role: "v" },
      { en: "delicious.", role: "c" },
    ],
    bone: { en: "The cake was delicious." },
    ko: "엄마가 만드신 케이크는 맛있었어.",
  },
  {
    chunks: [
      { en: "{When|접속사:~할 때} I {got home},", role: "m", label: "(부사절)" },
      { en: "my dog", role: "s" },
      { en: "was waiting", role: "v" },
      { en: "for me.", role: "m", label: "(부사구)" },
    ],
    bone: { en: "My dog was waiting." },
    ko: "내가 집에 왔을 때, 우리 개가 나를 기다리고 있었어.",
  },
];

/** 수식어(점선)에 괄호를 치면 S·V·O·C 뼈대만 남는다 */
export function SeBracketSkeleton() {
  return (
    <ol className="space-y-2.5">
      {SE_BRACKET_ROWS.map((row) => (
        <li key={row.bone.en} className="rounded-2xl border border-line px-3 py-3">
          <p lang="en" className="flex flex-wrap items-end gap-x-2 gap-y-3">
            {row.chunks.map((c) => (
              <SeChunk key={c.en} en={c.en} role={c.role} label={c.label} />
            ))}
          </p>
          <p className="mt-1.5 text-[13.5px] text-ink-2">{row.ko}</p>
          <p className="mt-2 flex flex-wrap items-center gap-2 border-t border-line pt-2">
            <span className="rounded-md bg-chip px-2 py-0.5 text-[13.5px] font-extrabold">괄호 밖 뼈대</span>
            <ArrowRight size={16} className="text-ink-3" />
            <span className="text-[1.05em] font-medium">
              <En en={row.bone.en} />
            </span>
          </p>
        </li>
      ))}
    </ol>
  );
}
