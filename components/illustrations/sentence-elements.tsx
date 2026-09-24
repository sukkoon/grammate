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
      <span className="text-[14px] font-extrabold leading-none text-ink-2">{label ?? r.name}</span>
    </span>
  );
}

function SeRoleChip({ role, withAsk = false }: { role: SeRole; withAsk?: boolean }) {
  const r = SE_ROLE[role];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[14px] font-extrabold ${r.tone}`}>
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
            <p className="mt-2.5 text-center text-[14px] text-ink-2">{row.ko}</p>
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
            <span className="rounded-lg bg-chip px-2.5 py-1 text-[14px] font-extrabold text-ink">{r.pos}</span>
            <ArrowRight size={18} className="text-ink-3" />
            {r.roles.map((role) => (
              <SeRoleChip key={role} role={role} />
            ))}
          </span>
          <span className="min-w-0 sm:ml-auto sm:text-right">
            <span className="text-[1.05em] font-medium">
              <En en={r.en} />
            </span>
            <span className="ml-2 text-[14px] text-ink-2">{r.note}</span>
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
            <span className={`rounded-lg px-2.5 py-1 text-[15px] font-extrabold ${SE_ROLE[s.role].tone}`}>{s.title}</span>
            <span className="text-[14px] text-ink-2">{s.sub}</span>
          </p>
          <ul className="mt-3 space-y-2">
            {s.items.map((it) => (
              <li key={it.form} className="flex flex-col gap-0.5">
                <span className="text-[14px] font-extrabold text-ink-3">{it.form}</span>
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
