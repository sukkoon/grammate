import { En } from "@/components/lesson/En";
import { ArrowRight, CalendarIcon, CrownIcon, HatIcon, MaskIcon, MoonIcon, RoadIcon, SunIcon } from "./icons";

/**
 * 초등 목소리(<Voice level="elem">)에서 쓰는 쉬운 그림들.
 * 글자는 크게, 칸은 적게, 비유 하나만 보여 준다. 휴대폰에서도 한 줄에 다 보이도록 격자로 짠다.
 */

/** 용어를 레고 조각처럼: [조각, 뜻] 여러 개 → 결과 */
export function EzTermLego({ parts, result }: { parts: [string, string][]; result: string }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {parts.map(([c, m], i) => (
          <span key={c} className="flex items-center gap-2">
            {i > 0 && <span className="text-[1.3rem] font-extrabold text-ink-3">+</span>}
            <span className={`flex flex-col items-center rounded-xl px-4 py-2.5 ${i === 0 ? "bg-coral-soft text-coral-ink" : "bg-sky-soft text-sky-ink"}`}>
              <span className="text-[1.5rem] font-extrabold leading-none">{c}</span>
              <span className="mt-1.5 text-[13.5px] font-bold">{m}</span>
            </span>
          </span>
        ))}
      </div>
      <span className="text-[1.3rem] font-extrabold text-ink-3">=</span>
      <span className="rounded-xl bg-ink px-4 py-2 text-[15px] font-extrabold text-on-ink">{result}</span>
    </div>
  );
}

type KingWord = { w: string; role?: "king" | "mask" };

/** 문장 속 왕(진짜 동사)과 변장한 동사 */
export function EzOneKing({ words, ko }: { words: KingWord[]; ko: string }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex flex-wrap items-end justify-center gap-2">
        {words.map((x, i) => (
          <span key={i} className="flex flex-col items-center gap-1">
            <span className={`h-6 ${x.role === "king" ? "text-amber-ink" : x.role === "mask" ? "text-sky-ink" : "text-transparent"}`}>
              {x.role === "king" ? <CrownIcon size={24} /> : x.role === "mask" ? <MaskIcon size={24} /> : null}
            </span>
            <span
              className={`rounded-xl px-3 py-2 text-[1.15rem] font-extrabold ${
                x.role === "king" ? "bg-amber-soft text-amber-ink" : x.role === "mask" ? "bg-sky-soft text-sky-ink" : "bg-chip text-ink"
              }`}
            >
              <En en={x.w} />
            </span>
          </span>
        ))}
      </div>
      <p className="text-[14.5px] text-ink-2">{ko}</p>
      <div className="grid gap-2 text-[13.5px] sm:grid-cols-2">
        <p className="flex items-center gap-2 rounded-xl bg-amber-soft px-3 py-2 text-amber-ink">
          <CrownIcon size={18} /> <b>왕관</b>: 진짜 동사예요. 문장에 딱 하나!
        </p>
        <p className="flex items-center gap-2 rounded-xl bg-sky-soft px-3 py-2 text-sky-ink">
          <MaskIcon size={18} /> <b>가면</b>: 변장한 동사예요. 모양이 안 바뀌어요.
        </p>
      </div>
    </div>
  );
}

const FOUR_JOBS = [
  { name: "명사", job: "이름표", icon: "tag", en: "dog", ko: "강아지", tone: "bg-sky-soft text-sky-ink" },
  { name: "동사", job: "움직임", icon: "road", en: "run", ko: "달리다", tone: "bg-coral-soft text-coral-ink" },
  { name: "형용사", job: "명사의 모자", icon: "hat", en: "cute", ko: "귀여운", tone: "bg-mint-soft text-mint-ink" },
  { name: "부사", job: "나머지 도우미", icon: "arrow", en: "fast", ko: "빠르게", tone: "bg-amber-soft text-amber-ink" },
] as const;

function JobIcon({ icon }: { icon: (typeof FOUR_JOBS)[number]["icon"] }) {
  if (icon === "road") return <RoadIcon size={30} />;
  if (icon === "hat") return <HatIcon size={30} />;
  if (icon === "arrow") return <ArrowRight size={30} />;
  return (
    <svg width={30} height={30} viewBox="0 0 24 24" aria-hidden>
      <path d="M3 5.5A1.5 1.5 0 0 1 4.5 4h8.3a1.5 1.5 0 0 1 1.06.44l6.7 6.7a1.5 1.5 0 0 1 0 2.12l-6.2 6.2a1.5 1.5 0 0 1-2.12 0l-6.7-6.7A1.5 1.5 0 0 1 3 11.7Z" fill="currentColor" />
      <circle cx="8" cy="9" r="1.7" style={{ fill: "var(--card)" }} />
    </svg>
  );
}

/** 문장을 만드는 네 가지 직업 */
export function EzFourJobs() {
  return (
    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
      {FOUR_JOBS.map((j) => (
        <div key={j.name} className={`flex flex-col items-center rounded-2xl px-3 py-4 text-center ${j.tone}`}>
          <JobIcon icon={j.icon} />
          <span className="mt-2 text-[1.15rem] font-extrabold">{j.name}</span>
          <span className="text-[13.5px] font-bold">{j.job}</span>
          <span className="mt-2 rounded-lg bg-card px-2.5 py-1 text-[15px] font-extrabold text-ink">
            <En en={j.en} />
          </span>
          <span className="mt-1 text-[13.5px]">{j.ko}</span>
        </div>
      ))}
    </div>
  );
}

const THREE_TIMES = [
  { when: "어제", icon: "moon", en: "I played.", ko: "나는 놀았어.", tone: "bg-sky-soft text-sky-ink", tag: "과거" },
  { when: "늘 · 오늘", icon: "sun", en: "I play.", ko: "나는 놀아.", tone: "bg-mint-soft text-mint-ink", tag: "현재" },
  { when: "내일", icon: "calendar", en: "I will play.", ko: "나는 놀 거야.", tone: "bg-amber-soft text-amber-ink", tag: "미래" },
] as const;

/** 어제 · 오늘 · 내일, 동사 모양 세 가지 */
export function EzThreeTimes() {
  return (
    <div className="grid gap-2.5 sm:grid-cols-3">
      {THREE_TIMES.map((t) => (
        <div key={t.when} className={`flex flex-col items-center rounded-2xl px-3 py-4 text-center ${t.tone}`}>
          {t.icon === "moon" ? <MoonIcon size={30} /> : t.icon === "sun" ? <SunIcon size={30} /> : <CalendarIcon size={30} />}
          <span className="mt-2 text-[1.1rem] font-extrabold">{t.when}</span>
          <span className="text-[12.5px] font-bold">{t.tag}</span>
          <span className="mt-2 rounded-lg bg-card px-3 py-1.5 text-[1.05rem] font-extrabold text-ink">
            <En en={t.en} />
          </span>
          <span className="mt-1 text-[13.5px]">{t.ko}</span>
        </div>
      ))}
    </div>
  );
}
