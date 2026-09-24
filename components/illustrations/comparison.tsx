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
