import { En } from "@/components/lesson/En";
import { ArrowRight, CrownIcon, PersonIcon } from "./icons";

/* 비교 장 그림: 세 계단(원급·비교급·최상급), 규칙 카드, 시소(as ~ as), 몇 배, ~할수록, 최상급의 다섯 모양 */

/* ───────── 1. 세 계단: tall → taller → tallest ───────── */

const STEPS = [
  { en: "tall", grade: "원급", ko: "키가 큰", step: "h-10 bg-chip text-ink", icon: 34, person: "text-ink-3" },
  { en: "taller", grade: "비교급", ko: "더 큰", step: "h-16 bg-sky-soft text-sky-ink", icon: 42, person: "text-sky-ink" },
  { en: "tallest", grade: "최상급", ko: "가장 큰", step: "h-24 bg-coral-soft text-coral-ink", icon: 50, person: "text-coral" },
];

const STAIR_LINES = [
  { en: "Minsu is [[tall]].", ko: "민수는 키가 커." },
  { en: "Jisu is [[taller]] than Minsu.", ko: "지수는 민수보다 키가 커." },
  { en: "Tom is [[the tallest]] of the three.", ko: "톰이 셋 중에서 키가 가장 커." },
];

/** 원급 → 비교급 → 최상급: 한 칸씩 올라가는 계단 */
export function CpStairs() {
  return (
    <div>
      <div className="grid grid-cols-3 items-end gap-2" role="img" aria-label="tall, taller, tallest 세 계단">
        {STEPS.map((s) => (
          <div key={s.en} className="flex flex-col items-center">
            <PersonIcon size={s.icon} className={s.person} />
            <div className={`mt-1 flex w-full items-center justify-center rounded-t-xl ${s.step}`}>
              <span className="text-[1.15em] font-bold">
                <En en={s.en} />
              </span>
            </div>
            <p className="mt-2 text-[14px] font-extrabold">{s.grade}</p>
            <p className="text-[14px] text-ink-2">{s.ko}</p>
          </div>
        ))}
      </div>
      <ul className="mt-4 space-y-1.5 border-t border-line pt-3">
        {STAIR_LINES.map((l) => (
          <li key={l.en} className="flex flex-wrap items-baseline gap-x-2">
            <span className="text-[1.05em] font-medium">
              <En en={l.en} />
            </span>
            <span className="text-[14px] text-ink-2">{l.ko}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ───────── 2. 비교급·최상급 만드는 규칙 카드 ───────── */

function FormCard({ rule, how, rows, tone }: { rule: string; how: string; rows: { en: string }[]; tone: string }) {
  return (
    <div className="rounded-2xl border border-line px-4 py-3">
      <p className="font-extrabold">{rule}</p>
      <p className="text-[14px] text-ink-2">{how}</p>
      <ul className="mt-2 space-y-1">
        {rows.map((r) => (
          <li key={r.en} className={`w-fit rounded-md px-1.5 text-[15px] font-medium ${tone}`}>
            <En en={r.en} />
          </li>
        ))}
      </ul>
    </div>
  );
}

/** -er/-est, more/most, 불규칙 한눈에 */
export function CpFormRules() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <FormCard rule="대부분" how="끝에 -er, -est" tone="bg-chip" rows={[{ en: "tall → taller → tallest" }, { en: "fast → faster → fastest" }]} />
      <FormCard rule="e로 끝나면" how="-r, -st만 붙여요" tone="bg-chip" rows={[{ en: "nice → nicer → nicest" }, { en: "large → larger → largest" }]} />
      <FormCard rule="자음 + y로 끝나면" how="y를 i로 바꾸고 -er, -est" tone="bg-chip" rows={[{ en: "happy → happier → happiest" }, { en: "easy → easier → easiest" }]} />
      <FormCard rule="짧은 모음 하나 + 자음 하나로 끝나면" how="끝 자음을 한 번 더 쓰고 -er, -est" tone="bg-chip" rows={[{ en: "big → bigger → biggest" }, { en: "hot → hotter → hottest" }]} />
      <FormCard rule="긴 말 (2음절 이상 대부분)" how="앞에 more, most" tone="bg-sky-soft text-sky-ink" rows={[{ en: "famous → more famous → most famous" }, { en: "useful → more useful → most useful" }]} />
      <FormCard
        rule="모양이 확 바뀌는 것"
        how="외워 두기"
        tone="bg-amber-soft text-amber-ink"
        rows={[{ en: "good → better → best" }, { en: "bad → worse → worst" }, { en: "many → {more|형용사:더 많은} → {most|형용사:가장 많은}" }]}
      />
    </div>
  );
}

/* ───────── 3. 시소: as ~ as (균형) / not as ~ as (기울어짐) ───────── */

function SeesawCat() {
  return (
    <g transform="translate(36 49) scale(1.4)">
      <path d="M8 16 L10 4 L17.5 11 H22.5 L30 4 L32 16 A12.5 11.5 0 1 1 8 16 Z" style={{ fill: "var(--coral)" }} />
      <circle cx="15" cy="21.5" r="1.9" style={{ fill: "var(--card)" }} />
      <circle cx="25" cy="21.5" r="1.9" style={{ fill: "var(--card)" }} />
    </g>
  );
}

function SeesawDog() {
  return (
    <g transform="translate(176 44) scale(1.4)">
      <ellipse cx="8" cy="16" rx="5" ry="9" style={{ fill: "var(--amber-ink)" }} />
      <ellipse cx="32" cy="16" rx="5" ry="9" style={{ fill: "var(--amber-ink)" }} />
      <circle cx="20" cy="19" r="12" style={{ fill: "var(--amber-soft)", stroke: "var(--amber-ink)", strokeWidth: 2 }} />
      <circle cx="15.5" cy="17" r="1.9" style={{ fill: "var(--ink)" }} />
      <circle cx="24.5" cy="17" r="1.9" style={{ fill: "var(--ink)" }} />
      <ellipse cx="20" cy="23" rx="3" ry="2.2" style={{ fill: "var(--ink)" }} />
    </g>
  );
}

function Seesaw({ tilt, label }: { tilt: number; label: string }) {
  return (
    <svg viewBox="0 0 260 140" className="mx-auto w-full max-w-[300px]" role="img" aria-label={label}>
      <path d="M20 132 H240" strokeWidth="3" strokeLinecap="round" style={{ stroke: "var(--line)" }} />
      <path d="M110 132 L130 96 L150 132 Z" style={{ fill: "var(--ink-3)" }} />
      <g transform={`rotate(${tilt} 130 94)`}>
        <rect x="18" y="88" width="224" height="9" rx="4.5" style={{ fill: "var(--ink-2)" }} />
        <SeesawCat />
        <SeesawDog />
      </g>
    </svg>
  );
}

/** 저울이 수평이면 as ~ as, 기울면 not as ~ as */
export function CpSeesaw() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="rounded-2xl border border-line px-3 py-3">
        <p className="text-[14px] font-extrabold text-mint-ink">수평: 무게가 똑같아요</p>
        <Seesaw tilt={0} label="고양이와 개가 시소에서 수평을 이룬 그림" />
        <p className="mt-2 text-[1.05em] font-medium">
          <En en="My cat is [[{as|부사:그만큼} heavy {as|접속사:…만큼}]] your dog." />
        </p>
        <p className="text-[14px] text-ink-2">우리 고양이는 너희 개만큼 무거워.</p>
      </div>
      <div className="rounded-2xl border border-line px-3 py-3">
        <p className="text-[14px] font-extrabold text-coral-ink">기울었어요: 개 쪽이 더 무거워요</p>
        <Seesaw tilt={12} label="개 쪽으로 시소가 기운 그림" />
        <p className="mt-2 text-[1.05em] font-medium">
          <En en="My cat is [[not {as|부사:그만큼} heavy {as|접속사:…만큼}]] your dog." />
        </p>
        <p className="text-[14px] text-ink-2">우리 고양이는 너희 개만큼 무겁지 않아.</p>
        <p className="mt-1 text-[15px] font-medium">
          = <En en="Your dog is [[heavier than]] my cat." />
        </p>
      </div>
    </div>
  );
}

/* ───────── 4. 몇 배: twice, three times ───────── */

const TIMES_BARS = [
  { ko: "저 줄 (기준)", tag: "1배", width: "w-1/3", tone: "bg-chip", tagTone: "text-ink-2" },
  { ko: "두 배", tag: "twice", width: "w-2/3", tone: "bg-sky-soft", tagTone: "text-sky-ink" },
  { ko: "세 배", tag: "three times", width: "w-full", tone: "bg-coral-soft", tagTone: "text-coral-ink" },
];

const TIMES_LINES = [
  { en: "This rope is [[{twice|부사:두 배} {as|부사:그만큼} long {as|접속사:…만큼}]] that one.", ko: "이 줄은 저 줄보다 두 배 길어." },
  { en: "This rope is [[three {times|명사:…배} {as|부사:그만큼} long {as|접속사:…만큼}]] that one.", ko: "이 줄은 저 줄보다 세 배 길어." },
  { en: "This rope is [[three {times|명사:…배} longer than]] that one.", ko: "(같은 뜻) 배수사 + 비교급 + than" },
];

/** 배수사: 기준의 몇 배인지 */
export function CpTimes() {
  return (
    <div>
      <ul className="space-y-2.5" aria-label="1배, 두 배, 세 배 길이의 줄">
        {TIMES_BARS.map((b) => (
          <li key={b.tag}>
            <p className="flex items-baseline justify-between gap-2 text-[14px]">
              <span className="font-bold">{b.ko}</span>
              <span lang="en" className={`font-extrabold ${b.tagTone}`}>
                {b.tag}
              </span>
            </p>
            <div className={`mt-1 h-4 rounded-full ${b.width} ${b.tone} border border-line`} />
          </li>
        ))}
      </ul>
      <ul className="mt-4 space-y-2 border-t border-line pt-3">
        {TIMES_LINES.map((l) => (
          <li key={l.en}>
            <span className="text-[1.05em] font-medium">
              <En en={l.en} />
            </span>
            <span className="block text-[14px] text-ink-2">{l.ko}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ───────── 5. the 비교급 ~, the 비교급 … ───────── */

function RisingBars({ title, tone }: { title: string; tone: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex h-16 items-end gap-1.5" aria-hidden>
        <span className={`w-5 rounded-t-md ${tone} h-5`} />
        <span className={`w-5 rounded-t-md ${tone} h-10`} />
        <span className={`w-5 rounded-t-md ${tone} h-16`} />
      </div>
      <p className="mt-2 text-center text-[14px] font-extrabold">{title}</p>
    </div>
  );
}

/** 한쪽이 올라가면 다른 쪽도 같이 올라가요: ~할수록 더 … */
export function CpTheMoreThe() {
  return (
    <div>
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
        <RisingBars title="연습을 많이 할수록" tone="bg-sky-ink" />
        <ArrowRight size={26} className="text-ink-3" />
        <RisingBars title="더 잘하게 돼요" tone="bg-coral" />
      </div>
      <p className="mt-4 text-center text-[1.1em] font-medium">
        <En en="[[The {more|부사:더 많이}]] you practice, [[the {better|부사:더 잘}]] you play." />
      </p>
      <p className="mt-2 flex flex-wrap items-center justify-center gap-1.5 text-[14px] font-bold">
        <span className="rounded-lg bg-sky-soft px-2 py-1 text-sky-ink">the + 비교급 + 주어 + 동사</span>
        <span className="text-ink-3">,</span>
        <span className="rounded-lg bg-coral-soft px-2 py-1 text-coral-ink">the + 비교급 + 주어 + 동사</span>
      </p>
    </div>
  );
}

/* ───────── 6. 최상급 뜻을 내는 다섯 가지 모양 ───────── */

const FIVE_WAYS = [
  { pat: "the + 최상급", en: "Summer is [[the hottest]] season in Korea." },
  { pat: "No other + 단수 명사 + as 원급 as", en: "[[No other]] season in Korea is [[{as|부사:그만큼} hot {as|접속사:…만큼}]] summer." },
  { pat: "No other + 단수 명사 + 비교급 than", en: "[[No other]] season in Korea is [[hotter than]] summer." },
  { pat: "비교급 + than any other + 단수 명사", en: "Summer is [[hotter than {any|형용사:어떤 …라도} other season]] in Korea." },
  { pat: "비교급 + than all the other + 복수 명사", en: "Summer is [[hotter than all the other seasons]] in Korea." },
];

/** 모양은 다섯 가지, 뜻은 하나: 여름이 가장 더워요 */
export function CpFiveWays() {
  return (
    <div>
      <p className="flex items-center justify-center gap-2 text-center font-extrabold">
        <CrownIcon size={24} className="text-coral" />
        뜻은 모두 같아요: 한국에서 여름이 가장 더워요
      </p>
      <ol className="mt-3 space-y-2">
        {FIVE_WAYS.map((w, i) => (
          <li key={w.pat} className="rounded-2xl border border-line px-3 py-2.5">
            <p className="w-fit rounded-lg bg-chip px-2 py-0.5 text-[14px] font-extrabold">
              {i + 1}. {w.pat}
            </p>
            <p className="mt-1.5 text-[1.05em] font-medium">
              <En en={w.en} />
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ───────── 공통: 맞음·틀림 표시 ───────── */

function CpMark({ ok }: { ok: boolean }) {
  return (
    <span
      aria-label={ok ? "맞는 문장" : "틀린 문장"}
      className={`grid size-7 shrink-0 place-items-center rounded-full text-[15px] font-extrabold ${
        ok ? "bg-mint-soft text-mint-ink" : "bg-coral-soft text-coral-ink"
      }`}
    >
      {ok ? "✓" : "✕"}
    </span>
  );
}

/* ───────── 7. the + 최상급 + in / of ───────── */

const CLASS_HEIGHTS = [28, 34, 44, 30, 36];
const BROTHER_HEIGHTS = [44, 36, 28];

/** in + 무리·장소(울타리 하나) / of + 여럿(하나씩 셀 수 있는 사람들) */
export function CpInOf() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <div className="rounded-2xl border border-line px-3 py-3">
        <p className="flex flex-wrap items-center gap-2">
          <span className="rounded-lg bg-sky-soft px-2.5 py-1 text-[15px] font-extrabold text-sky-ink">in + 장소·무리</span>
          <span className="text-[14px] text-ink-2">울타리 하나 안에서</span>
        </p>
        <div className="mt-3 rounded-2xl border-2 border-sky-ink/50 px-2 pb-1 pt-2" role="img" aria-label="한 반 울타리 안의 다섯 명 가운데 가장 큰 사람에게 왕관">
          <p lang="en" className="text-[14px] font-extrabold text-sky-ink">
            our class
          </p>
          <div className="flex items-end justify-center gap-1.5">
            {CLASS_HEIGHTS.map((h) => (
              <span key={h} className="flex flex-col items-center">
                {h === 44 && <CrownIcon size={18} className="text-coral" />}
                <PersonIcon size={h} className={h === 44 ? "text-coral" : "text-ink-3"} />
              </span>
            ))}
          </div>
        </div>
        <p className="mt-2.5 text-[1.03em] font-medium">
          <En en="He is [[the tallest]] boy [[in]] our class." />
        </p>
        <p lang="en" className="text-[14px] text-ink-2">in my family, in Korea, in the world</p>
      </div>
      <div className="rounded-2xl border border-line px-3 py-3">
        <p className="flex flex-wrap items-center gap-2">
          <span className="rounded-lg bg-amber-soft px-2.5 py-1 text-[15px] font-extrabold text-amber-ink">of + 여럿</span>
          <span className="text-[14px] text-ink-2">하나씩 세는 사람들 가운데</span>
        </p>
        <div className="mt-3 flex items-end justify-center gap-3 pb-1 pt-2" role="img" aria-label="삼 형제 가운데 가장 어린 막내에게 왕관">
          {BROTHER_HEIGHTS.map((h, i) => (
            <span key={h} className="flex flex-col items-center">
              {h === 28 && <CrownIcon size={18} className="text-coral" />}
              <PersonIcon size={h} className={h === 28 ? "text-coral" : "text-ink-3"} />
              <span className="mt-1 grid size-6 place-items-center rounded-full bg-amber-soft text-[14px] font-extrabold text-amber-ink">{i + 1}</span>
            </span>
          ))}
        </div>
        <p className="mt-2.5 text-[1.03em] font-medium">
          <En en="Minsu is [[the youngest]] [[of]] the three brothers." />
        </p>
        <p lang="en" className="text-[14px] text-ink-2">of the three, of all, of my friends</p>
      </div>
    </div>
  );
}

/* ───────── 8. 음절로 재요: -er일까, more일까 ───────── */

const SYLLABLE_ROWS: { parts: string[]; en: string; how: string; tone: string }[] = [
  { parts: ["tall"], en: "tall → [[taller]]", how: "1음절: -er", tone: "bg-chip text-ink" },
  { parts: ["fa", "mous"], en: "famous → [[more famous]]", how: "2음절: more", tone: "bg-sky-soft text-sky-ink" },
  { parts: ["beau", "ti", "ful"], en: "beautiful → [[more beautiful]]", how: "3음절: more", tone: "bg-sky-soft text-sky-ink" },
  { parts: ["hap", "py"], en: "happy → [[happier]]", how: "2음절이지만 -y로 끝나서 -er", tone: "bg-amber-soft text-amber-ink" },
];

/** 모음 소리 덩어리(음절)를 세어 -er/-est와 more/most를 고른다 */
export function CpSyllables() {
  return (
    <ul className="space-y-2">
      {SYLLABLE_ROWS.map((r) => (
        <li key={r.en} className="flex flex-col gap-2 rounded-2xl border border-line px-3 py-2.5 sm:flex-row sm:items-center sm:gap-4">
          <span className="flex items-center gap-2 sm:w-44 sm:shrink-0">
            <span lang="en" className="flex items-center gap-0.5 text-[1.08em] font-bold">
              {r.parts.map((p, i) => (
                <span key={p} className="flex items-center gap-0.5">
                  {i > 0 && <span className="text-ink-3">·</span>}
                  <span className="rounded-md bg-chip px-1.5">{p}</span>
                </span>
              ))}
            </span>
            <span className="flex gap-1" aria-label={`${r.parts.length}음절`}>
              {r.parts.map((p) => (
                <span key={p} className="size-2.5 rounded-full bg-coral" />
              ))}
            </span>
          </span>
          <span className="flex flex-wrap items-center gap-2">
            <span className="text-[1.05em] font-medium">
              <En en={r.en} />
            </span>
            <span className={`rounded-md px-2 py-0.5 text-[14px] font-extrabold ${r.tone}`}>{r.how}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}

/* ───────── 9. as 두 개를 지워 보면 형용사·부사가 보여요 ───────── */

type ErasePiece = { en: string; hl?: boolean } | { off: string };

const ERASE_ROWS: { pieces: ErasePiece[]; left: { en: string }; verdict: string; tone: string }[] = [
  {
    pieces: [{ en: "She looks" }, { off: "as" }, { en: "happy", hl: true }, { off: "as" }, { en: "a child." }],
    left: { en: "She looks [[happy]]." },
    verdict: "look 뒤 보어 자리 → 형용사",
    tone: "bg-mint-soft text-mint-ink",
  },
  {
    pieces: [{ en: "He runs" }, { off: "as" }, { en: "quickly", hl: true }, { off: "as" }, { en: "a rabbit." }],
    left: { en: "He runs [[quickly]]." },
    verdict: "동사 runs를 꾸며요 → 부사",
    tone: "bg-amber-soft text-amber-ink",
  },
];

/** as ~ as 사이가 헷갈리면 as 두 개를 지우고 남은 문장을 읽는다 */
export function CpEraseAs() {
  return (
    <ul className="space-y-2.5">
      {ERASE_ROWS.map((r) => (
        <li key={r.left.en} className="rounded-2xl border border-line px-3 py-3">
          <p lang="en" className="flex flex-wrap items-center gap-1.5 text-[1.08em] font-medium">
            {r.pieces.map((p, i) =>
              "off" in p ? (
                <span key={i} className="relative rounded-md border-2 border-dashed border-coral/60 px-1.5 text-ink-3" aria-label="지운 as">
                  {p.off}
                  <span className="absolute -right-1.5 -top-2 grid size-5 place-items-center rounded-full bg-coral text-[14px] font-extrabold leading-none text-white" aria-hidden>
                    ✕
                  </span>
                </span>
              ) : (
                <span key={i} className={p.hl ? "rounded-md bg-sky-soft px-1.5 font-bold text-sky-ink" : ""}>
                  <En en={p.en} />
                </span>
              ),
            )}
          </p>
          <p className="mt-2 flex flex-wrap items-center gap-2 border-t border-line pt-2">
            <span className="text-[14px] font-extrabold text-ink-3">지우고 읽기</span>
            <ArrowRight size={16} className="text-ink-3" />
            <span className="font-medium">
              <En en={r.left.en} />
            </span>
            <span className={`rounded-md px-2 py-0.5 text-[14px] font-extrabold ${r.tone}`}>{r.verdict}</span>
          </p>
        </li>
      ))}
    </ul>
  );
}

/* ───────── 10. 훨씬 더: much + 비교급 ───────── */

const GAP_ROWS: { title: string; sub: string; mine: number; yours: number; en: string }[] = [
  { title: "비교급", sub: "조금이라도 더", mine: 58, yours: 68, en: "Your bike is [[faster]] than mine." },
  { title: "much + 비교급", sub: "차이가 훨씬 커요", mine: 30, yours: 96, en: "Your bike is [[{much|부사:훨씬} faster]] than mine." },
];

const MUCH_WORDS = ["much", "even", "far", "a lot", "still"];

/** 두 막대의 차이: 비교급은 조금이라도 더, much + 비교급은 훨씬 더 */
export function CpMuchGap() {
  return (
    <div>
      <ul className="grid gap-3 sm:grid-cols-2">
        {GAP_ROWS.map((r) => (
          <li key={r.title} className="rounded-2xl border border-line px-3 py-3">
            <p className="flex flex-wrap items-baseline gap-2">
              <span className="font-extrabold">{r.title}</span>
              <span className="text-[14px] text-ink-2">{r.sub}</span>
            </p>
            <div className="mt-2 grid grid-cols-[4.5rem_1fr] items-center gap-x-2 gap-y-1.5 text-[14px] font-bold" aria-hidden>
              <span className="text-ink-2">내 자전거</span>
              <span className="h-3.5 rounded-full bg-ink-3/50" style={{ width: `${r.mine}%` }} />
              <span className="text-coral-ink">네 자전거</span>
              <span className="h-3.5 rounded-full bg-coral" style={{ width: `${r.yours}%` }} />
            </div>
            <p className="mt-2.5 font-medium">
              <En en={r.en} />
            </p>
          </li>
        ))}
      </ul>
      <p className="mt-3 flex flex-wrap items-center justify-center gap-1.5 text-[14px] font-bold">
        <span className="text-ink-2">&lsquo;훨씬&rsquo; 자리에 오는 말</span>
        {MUCH_WORDS.map((w) => (
          <span key={w} lang="en" className="rounded-lg bg-coral-soft px-2 py-0.5 text-coral-ink">
            {w}
          </span>
        ))}
        <span lang="en" className="rounded-lg border-2 border-dashed border-ink-3 px-2 py-0.5 text-ink-3">
          very ✕
        </span>
      </p>
    </div>
  );
}

/* ───────── 11. 왜 other를 넣을까: 자기 자신은 빼고 견줘요 ───────── */

const SEASONS = ["봄", "여름", "가을", "겨울"];

function SeasonChip({ name }: { name: string }) {
  const summer = name === "여름";
  return (
    <span className={`rounded-lg px-2.5 py-1 text-[15px] font-extrabold ${summer ? "bg-coral text-white" : "bg-chip text-ink"}`}>{name}</span>
  );
}

/** any season에는 여름 자신도 들어 있다. any other season은 여름을 뺀 나머지 */
export function CpOtherGroup() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <div className="rounded-2xl border border-line px-3 py-3">
        <p className="flex items-center gap-2">
          <CpMark ok={false} />
          <span className="font-medium">
            <En en="Summer is hotter than [[{any|형용사:어떤 …라도} season]]." />
          </span>
        </p>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5 rounded-2xl border-2 border-dashed border-coral/60 px-2 py-2.5">
          {SEASONS.map((s) => (
            <SeasonChip key={s} name={s} />
          ))}
        </div>
        <p className="mt-2 text-[14px] text-ink-2">견주는 무리 안에 여름도 들어 있어요. 여름이 여름보다 더워야 하니 말이 안 돼요.</p>
      </div>
      <div className="rounded-2xl border-2 border-mint-ink/50 px-3 py-3">
        <p className="flex items-center gap-2">
          <CpMark ok />
          <span className="font-medium">
            <En en="Summer is hotter than [[{any|형용사:어떤 …라도} other season]]." />
          </span>
        </p>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
          <SeasonChip name="여름" />
          <span className="text-[14px] font-extrabold text-ink-3">vs</span>
          <span className="flex flex-wrap gap-1.5 rounded-2xl border-2 border-dashed border-mint-ink/60 px-2 py-2">
            {SEASONS.filter((s) => s !== "여름").map((s) => (
              <SeasonChip key={s} name={s} />
            ))}
          </span>
        </div>
        <p className="mt-2 text-[14px] text-ink-2">
          <b lang="en">other</b>가 여름을 무리 밖으로 빼 줘요. 남은 계절 하나하나와 견줘요.
        </p>
      </div>
    </div>
  );
}

/* ───────── 12. have ever p.p.: 지금까지 겪은 것 중 최고 ───────── */

function Pizza({ best = false }: { best?: boolean }) {
  return (
    <svg width={best ? 34 : 26} height={best ? 34 : 26} viewBox="0 0 24 24" aria-hidden>
      <circle cx="12" cy="12" r="10.5" style={{ fill: "var(--amber-soft)", stroke: "var(--amber-ink)", strokeWidth: 1.8 }} />
      <circle cx="8.5" cy="9" r="1.9" style={{ fill: "var(--coral)" }} />
      <circle cx="15" cy="8.5" r="1.9" style={{ fill: "var(--coral)" }} />
      <circle cx="12" cy="15" r="1.9" style={{ fill: "var(--coral)" }} />
    </svg>
  );
}

const PIZZA_DOTS = [false, false, true, false];

/** 처음부터 지금까지 먹어 본 피자들 가운데 최고 하나 */
export function CpEverTimeline() {
  return (
    <div className="mx-auto max-w-xl">
      <div className="px-1 pt-7" role="img" aria-label="과거부터 지금까지 먹어 본 피자 네 판 가운데 하나에 왕관">
        <div className="relative flex items-center justify-between">
          <span className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-ink-3/40" aria-hidden />
          <span className="relative rounded-lg bg-chip px-2 py-0.5 text-[14px] font-extrabold text-ink-2">처음</span>
          {PIZZA_DOTS.map((best, i) => (
            <span key={i} className="relative flex flex-col items-center">
              {best && (
                <span className="absolute -top-6">
                  <CrownIcon size={20} className="text-coral" />
                </span>
              )}
              <Pizza best={best} />
            </span>
          ))}
          <span className="relative flex items-center gap-1 rounded-lg bg-coral px-2 py-0.5 text-[14px] font-extrabold text-white">
            지금
            <ArrowRight size={14} />
          </span>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2 px-1">
        <span className="h-2.5 flex-1 rounded-b-lg border-x-2 border-b-2 border-sky-ink" aria-hidden />
      </div>
      <p className="mt-1 text-center text-[14px] font-bold text-sky-ink">
        <span lang="en">have ever eaten</span> = 지금까지 먹어 본 (현재완료)
      </p>
      <p className="mt-3 text-center text-[1.05em] font-medium">
        <En en="This is [[the most delicious]] pizza I [[{have|조동사:완료형을 만드는 말} ever eaten]]." />
      </p>
      <p className="text-center text-[14px] text-ink-2">이건 내가 지금까지 먹어 본 피자 중 가장 맛있어.</p>
    </div>
  );
}
