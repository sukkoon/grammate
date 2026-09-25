import { En } from "@/components/lesson/En";
import { ArrowRight, CatIcon, HatIcon, PersonIcon } from "./icons";

/* 관사 장 그림: a/an 쓰기 전 두 질문, 처음엔 a 다음엔 the, 모자를 벗는 자리, 모자를 쓸까 벗을까 */

/** 모자에 사선: 관사를 쓰지 않아요 */
function ArHatOff({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <g opacity="0.55">
        <path d="M6.5 16.5 C6.5 9 8.5 6 12 6 C15.5 6 17.5 9 17.5 16.5 Z" style={{ fill: "var(--ink-3)" }} />
        <rect x="2.5" y="16" width="19" height="3" rx="1.5" style={{ fill: "var(--ink-3)" }} />
      </g>
      <path d="M4 3.5 L20 20.5" strokeWidth="2.6" strokeLinecap="round" style={{ stroke: "var(--coral)" }} />
    </svg>
  );
}

function ArMark({ ok }: { ok: boolean }) {
  return (
    <span
      aria-label={ok ? "써요" : "쓰지 않아요"}
      className={`grid size-7 shrink-0 place-items-center rounded-full text-[15px] font-extrabold ${
        ok ? "bg-mint-soft text-mint-ink" : "bg-coral-soft text-coral-ink"
      }`}
    >
      {ok ? "✓" : "✕"}
    </span>
  );
}

/* ───────── 1. a/an을 쓰기 전에 묻는 두 질문 ───────── */

const AR_CHECKS: { q: string; noTitle: string; no: { en: string }; hint: string; hintEn?: { en: string } }[] = [
  {
    q: "① 셀 수 있어요?",
    noTitle: "a/an ✕ · 모양 그대로 써요",
    no: { en: "water, milk, money" },
    hint: "꼭 세고 싶으면 그릇으로:",
    hintEn: { en: "{a glass of} water" },
  },
  {
    q: "② 딱 하나예요?",
    noTitle: "a/an ✕ · 끝에 -s를 붙여요",
    no: { en: "two books, three cats" },
    hint: "둘 이상이면 a를 떼고 복수형으로 써요.",
  },
];

const AR_OK = { en: "a book, an apple, an idea" };

/** a/an은 두 관문을 모두 통과한 명사(셀 수 있고, 딱 하나)에만 씌운다 */
export function ArCountCheck() {
  return (
    <div role="list" className="grid gap-2">
      {AR_CHECKS.map((c) => (
        <div role="listitem" key={c.q} className="grid gap-2">
          <div className="rounded-2xl border border-line">
            <p className="rounded-t-2xl bg-sky-soft px-4 py-2.5 text-[16px] font-extrabold text-sky-ink">{c.q}</p>
            <div className="px-4 py-3">
              <p className="flex flex-wrap items-center gap-2 text-[15px] font-extrabold">
                <ArMark ok={false} />
                <span className="text-coral-ink">아니요라면</span>
                <span>{c.noTitle}</span>
              </p>
              <p className="mt-1.5 text-[1.05em] font-medium">
                <En en={c.no.en} />
              </p>
              <p className="mt-1 text-[14px] text-ink-2">
                {c.hint} {c.hintEn && <En en={c.hintEn.en} className="font-bold text-ink" />}
              </p>
            </div>
          </div>
          <p className="flex items-center gap-1 pl-4 text-[14px] font-extrabold text-mint-ink">
            <ArrowRight size={18} className="rotate-90" />
            예라면 다음으로
          </p>
        </div>
      ))}
      <div role="listitem" className="rounded-2xl border-2 border-mint-ink/40 bg-mint-soft px-4 py-3 text-mint-ink">
        <p className="flex items-center gap-2 text-[16px] font-extrabold">
          <HatIcon className="text-mint-ink" />a/an + 명사 한 개
        </p>
        <p className="mt-1.5 text-[1.05em] font-medium text-ink">
          <En en={AR_OK.en} />
        </p>
      </div>
    </div>
  );
}

/* ───────── 2. 처음엔 a, 다시 나오면 the ───────── */

const AR_STORY: { en: string; ko: string; icons: ("girl" | "cat")[]; tags: { t: string; first: boolean }[] }[] = [
  {
    en: "{Once|부사:옛날에, 한때} there was [[a]] girl.",
    ko: "옛날에 한 소녀가 살았어요.",
    icons: ["girl"],
    tags: [{ t: "girl: 처음 등장 → a", first: true }],
  },
  {
    en: "[[The]] girl had [[a]] cat.",
    ko: "그 소녀에게는 고양이가 한 마리 있었어요.",
    icons: ["girl", "cat"],
    tags: [
      { t: "girl: 다시 등장 → the", first: false },
      { t: "cat: 처음 등장 → a", first: true },
    ],
  },
  {
    en: "[[The]] cat was black.",
    ko: "그 고양이는 까만색이었어요.",
    icons: ["cat"],
    tags: [{ t: "cat: 다시 등장 → the", first: false }],
  },
];

/** 이야기에 처음 나오는 것은 a, 이미 나와서 둘 다 아는 것은 the */
export function ArStory() {
  return (
    <div>
      <div role="list" className="grid gap-2 sm:grid-cols-3">
        {AR_STORY.map((s, i) => (
          <div role="listitem" key={i} className="flex flex-col rounded-2xl border border-line px-4 py-3">
            <p className="flex items-center gap-2 text-ink-2">
              <span className="grid size-7 place-items-center rounded-full bg-ink text-[14px] font-extrabold text-bg">{i + 1}</span>
              {s.icons.map((ic) =>
                ic === "girl" ? <PersonIcon key={ic} size={28} className="text-sky-ink" /> : <CatIcon key={ic} size={28} className="text-coral" />,
              )}
            </p>
            <p className="mt-2 text-[1.08em] font-medium">
              <En en={s.en} />
            </p>
            <p className="text-[14px] text-ink-2">{s.ko}</p>
            <div role="list" className="mt-2 flex flex-wrap gap-1.5">
              {s.tags.map((t) => (
                <div role="listitem"
                  key={t.t}
                  className={`rounded-lg px-2 py-0.5 text-[14px] font-bold ${t.first ? "bg-mint-soft text-mint-ink" : "bg-coral-soft text-coral-ink"}`}
                >
                  {t.t}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 flex flex-wrap items-center justify-center gap-2 text-[14px] font-extrabold">
        <span className="rounded-lg bg-mint-soft px-2.5 py-1 text-mint-ink">처음 나오면 a</span>
        <ArrowRight size={18} className="text-ink-3" />
        <span className="rounded-lg bg-coral-soft px-2.5 py-1 text-coral-ink">다시 나오면 the</span>
      </p>
    </div>
  );
}

/* ───────── 3. 모자를 벗는 자리 ───────── */

const AR_NO_HAT: { title: string; why: string; en: string }[] = [
  { title: "이름", why: "이미 정해진, 세상에 하나뿐인 이름", en: "Minsu, Seoul, Korea, Monday" },
  { title: "운동 · 식사 · 과목 · 언어", why: "'하는 일' 그 자체", en: "soccer, lunch, math, English" },
  { title: "by + 탈것", why: "무엇을 타고 가는지", en: "by bus, by train" },
  { title: "원래 목적으로 가는 장소", why: "공부하러, 자러, 쉬러", en: "go to school, go to bed, at home" },
  { title: "통틀어 말할 때", why: "그 종류 전체, 일반적인 것", en: "I like music." },
];

/** 이름 그 자체, '하는 일' 그 자체에는 모자(관사)를 씌우지 않는다 */
export function ArNoHat() {
  return (
    <div role="list" className="grid gap-2 sm:grid-cols-2">
      {AR_NO_HAT.map((c) => (
        <div role="listitem" key={c.title} className="flex items-start gap-3 rounded-2xl border border-line px-4 py-3">
          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-chip">
            <ArHatOff />
          </span>
          <span className="min-w-0">
            <span className="block text-[16px] font-extrabold">{c.title}</span>
            <span className="block text-[14px] text-ink-2">{c.why}</span>
            <span className="mt-1 block text-[1.05em] font-medium">
              <En en={c.en} />
            </span>
          </span>
        </div>
      ))}
    </div>
  );
}

/* ───────── 4. 모자를 쓸까, 벗을까 ───────── */

const AR_PAIRS: { hat: { en: string; why: string }; bare: { en: string; why: string } }[] = [
  { hat: { en: "play [[the]] piano", why: "악기" }, bare: { en: "play soccer", why: "운동" } },
  { hat: { en: "{get on} [[the]] bus", why: "바로 그 버스" }, bare: { en: "go by bus", why: "타고 가는 방법" } },
  { hat: { en: "go to [[the]] school", why: "그 건물에 볼일이 있어서" }, bare: { en: "go to school", why: "공부하러 (원래 목적)" } },
  { hat: { en: "[[the]] music in this movie", why: "콕 집은 그 음악" }, bare: { en: "I like music.", why: "음악이라는 것 전체" } },
];

/** 같은 명사도 '바로 그것'이면 the, 활동·방법·원래 목적·전체면 관사 없이 */
export function ArHatPairs() {
  return (
    <div className="rounded-2xl border border-line">
      <div className="grid grid-cols-2 rounded-t-2xl text-[15px] font-extrabold">
        <p className="flex items-center gap-2 rounded-tl-2xl bg-coral-soft px-3 py-2.5 text-coral-ink">
          <HatIcon className="text-coral" />
          the를 써요
        </p>
        <p className="flex items-center gap-2 rounded-tr-2xl bg-sky-soft px-3 py-2.5 text-sky-ink">
          <ArHatOff size={24} />
          관사 없이
        </p>
      </div>
      <div role="list">
        {AR_PAIRS.map((p) => (
          <div role="listitem" key={p.hat.en} className="grid grid-cols-2 border-t border-line">
            <p className="px-3 py-2.5">
              <span className="block text-[1.03em] font-medium">
                <En en={p.hat.en} />
              </span>
              <span className="block text-[14px] text-ink-2">{p.hat.why}</span>
            </p>
            <p className="border-l border-line px-3 py-2.5">
              <span className="block text-[1.03em] font-medium">
                <En en={p.bare.en} />
              </span>
              <span className="block text-[14px] text-ink-2">{p.bare.why}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
