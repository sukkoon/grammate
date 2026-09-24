import { En } from "@/components/lesson/En";
import { ArrowRight } from "./icons";

/* 구·절이 하는 일별 색: 명사처럼(주어·목적어·보어) / 형용사처럼(명사 꾸밈) / 부사처럼(동사·문장 꾸밈) */
type PcJob = "noun" | "adj" | "adv";

const PC_JOB: Record<PcJob, { tone: string; like: string }> = {
  noun: { tone: "bg-sky-soft text-sky-ink", like: "명사처럼" },
  adj: { tone: "bg-mint-soft text-mint-ink", like: "형용사처럼" },
  adv: { tone: "bg-amber-soft text-amber-ink", like: "부사처럼" },
};

/** 명사구·형용사구·부사구: 이름은 모양이 아니라 하는 일이 정한다 */
export function PcPhraseJobs() {
  const cards: { job: PcJob; name: string; does: string; en: string; ko: string; ask: string }[] = [
    {
      job: "noun",
      name: "명사구",
      does: "주어·목적어·보어 자리에 서요",
      en: "[[Playing the piano]] is fun.",
      ko: "피아노를 치는 것은 재미있어.",
      ask: "무엇이 재미있어? → 주어",
    },
    {
      job: "adj",
      name: "형용사구",
      does: "앞의 명사를 꾸며요",
      en: "The cat [[on the sofa]] is Coco.",
      ko: "소파 위의 고양이는 코코야.",
      ask: "어떤 고양이? → cat을 꾸밈",
    },
    {
      job: "adv",
      name: "부사구",
      does: "동사나 문장을 꾸며요",
      en: "The cat is sleeping [[on the sofa]].",
      ko: "고양이가 소파 위에서 자고 있어.",
      ask: "어디서 자? → is sleeping을 꾸밈",
    },
  ];
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {cards.map((c) => (
        <div key={c.name} className="rounded-2xl border border-line px-4 py-4">
          <p className="flex flex-wrap items-center gap-2">
            <span className={`rounded-lg px-2.5 py-1 text-[15px] font-extrabold ${PC_JOB[c.job].tone}`}>{c.name}</span>
            <span className="text-[14px] font-bold text-ink-3">{PC_JOB[c.job].like}</span>
          </p>
          <p className="mt-2 text-[14px] text-ink-2">{c.does}</p>
          <p className="mt-2.5 text-[1.08em] font-medium">
            <En en={c.en} />
          </p>
          <p className="text-[14px] text-ink-2">{c.ko}</p>
          <p className="mt-2 w-fit rounded-lg bg-chip px-2 py-1 text-[14px] font-bold text-ink">{c.ask}</p>
        </div>
      ))}
    </div>
  );
}

type PcPart = { en: string; verb?: boolean };

function PcClauseBox({ parts, tag, dashed = false }: { parts: PcPart[]; tag: string; dashed?: boolean }) {
  return (
    <span
      className={`inline-flex flex-col gap-1.5 rounded-2xl px-3 py-2.5 ${
        dashed ? "border-2 border-dashed border-sky-ink" : "border-2 border-ink-3"
      }`}
    >
      <span className="text-[14px] font-extrabold text-ink-3">{tag}</span>
      <span lang="en" className="flex flex-wrap items-center gap-1.5 text-[1.08em] font-medium">
        {parts.map((p) =>
          p.verb ? (
            <span key={p.en} className="rounded-md bg-coral px-1.5 text-white">
              <En en={p.en} />
            </span>
          ) : (
            <span key={p.en}>
              <En en={p.en} />
            </span>
          ),
        )}
      </span>
    </span>
  );
}

function PcLink({ word }: { word: string }) {
  return (
    <span className="self-center rounded-full bg-sky-soft px-3 py-1 text-[15px] font-extrabold text-sky-ink">
      <En en={word} />
    </span>
  );
}

/** 절 잇기: 등위접속사는 대등하게, 종속접속사는 딸려 붙인다 */
export function PcClauseTrain() {
  return (
    <div className="space-y-3">
      <div className="rounded-2xl bg-chip px-3 py-3.5">
        <p className="text-[15px] font-extrabold">등위접속사: 나란히 잇기</p>
        <div className="mt-2.5 flex flex-wrap items-stretch gap-2">
          <PcClauseBox tag="절 1" parts={[{ en: "I" }, { en: "like", verb: true }, { en: "cats," }]} />
          <PcLink word="but" />
          <PcClauseBox tag="절 2" parts={[{ en: "my sister" }, { en: "likes", verb: true }, { en: "dogs." }]} />
        </div>
        <p className="mt-2.5 text-[14px] text-ink-2">두 절을 떼어 놓아도 둘 다 혼자 문장이 돼요.</p>
      </div>
      <div className="rounded-2xl bg-chip px-3 py-3.5">
        <p className="text-[15px] font-extrabold">종속접속사: 딸려 붙이기</p>
        <div className="mt-2.5 flex flex-wrap items-stretch gap-2">
          <PcClauseBox tag="주절 · 혼자 설 수 있어요" parts={[{ en: "I" }, { en: "was", verb: true }, { en: "late" }]} />
          <PcClauseBox
            tag="종속절 · 혼자 못 서요"
            dashed
            parts={[{ en: "because" }, { en: "I" }, { en: "missed", verb: true }, { en: "the bus." }]}
          />
        </div>
        <p className="mt-2.5 text-[14px] text-ink-2">because가 붙은 절은 주절에 기대야 뜻이 끝나요.</p>
      </div>
      <p className="text-center text-[14px] text-ink-2">
        <span className="rounded-md bg-coral px-1.5 font-bold text-white">진짜 동사</span> 2개 = 접속사 1개 + 1
      </p>
    </div>
  );
}

/** 명사절·형용사절·부사절: 절도 품사처럼 일한다 */
export function PcClauseJobs() {
  const rows: { job: PcJob; name: string; en: string; ko: string; does: string }[] = [
    {
      job: "noun",
      name: "명사절",
      en: "I believe [[{that|접속사:~라는 것} you can do it]].",
      ko: "나는 네가 할 수 있다고 믿어.",
      does: "believe의 목적어 자리에 섰어요",
    },
    {
      job: "adj",
      name: "형용사절",
      en: "This is the cake [[{that|관계대명사:~하는 (앞의 명사를 꾸며요)} my dad made]].",
      ko: "이게 우리 아빠가 만드신 케이크야.",
      does: "앞의 명사 the cake를 꾸며요",
    },
    {
      job: "adv",
      name: "부사절",
      en: "[[{When|접속사:~할 때} I {got home}]], my dog was sleeping.",
      ko: "내가 집에 왔을 때, 우리 개는 자고 있었어.",
      does: "문장 전체에 '언제'를 더해요",
    },
  ];
  return (
    <ul className="space-y-2.5">
      {rows.map((r) => (
        <li key={r.name} className="rounded-2xl border border-line px-3 py-3">
          <p className="flex flex-wrap items-center gap-2">
            <span className={`rounded-lg px-2.5 py-1 text-[15px] font-extrabold ${PC_JOB[r.job].tone}`}>{r.name}</span>
            <span className="text-[14px] font-bold text-ink-3">{PC_JOB[r.job].like} 일해요</span>
          </p>
          <p className="mt-2 text-[1.08em] font-medium">
            <En en={r.en} />
          </p>
          <p className="text-[14px] text-ink-2">{r.ko}</p>
          <p className="mt-1.5 flex items-center gap-1.5 text-[14px] font-bold text-ink">
            <ArrowRight size={16} className="shrink-0 text-ink-3" />
            {r.does}
          </p>
        </li>
      ))}
    </ul>
  );
}

function PcStep({ n, q }: { n: number; q: string }) {
  return (
    <p className="flex items-start gap-2 font-extrabold">
      <span className="grid size-7 shrink-0 place-items-center rounded-full bg-ink text-[14px] text-on-ink">{n}</span>
      <span className="pt-0.5">{q}</span>
    </p>
  );
}

function PcAnswer({ job, name, when }: { job: PcJob; name: string; when: string }) {
  return (
    <div className="rounded-xl border border-line px-3 py-2.5">
      <p className="text-[14px] text-ink-2">{when}</p>
      <p className={`mt-1 w-fit rounded-lg px-2.5 py-1 text-[15px] font-extrabold ${PC_JOB[job].tone}`}>{name}</p>
    </div>
  );
}

/** 세 가지 절 가려내기: 빼 보기 → 선행사 확인 */
export function PcClauseCheck() {
  return (
    <div className="space-y-3">
      <div className="rounded-2xl bg-chip px-3 py-3.5">
        <PcStep n={1} q="절을 빼 보세요. 문장이 무너지나요?" />
        <div className="mt-2.5 grid gap-2 sm:grid-cols-2">
          <PcAnswer job="noun" name="명사절" when="무너져요: 주어·목적어·보어가 사라졌어요" />
          <div className="rounded-xl border border-dashed border-ink-3 px-3 py-2.5 text-[14px] text-ink-2">
            멀쩡해요: 꾸미는 절이에요 → 2번으로
          </div>
        </div>
      </div>
      <div className="rounded-2xl bg-chip px-3 py-3.5">
        <PcStep n={2} q="절 바로 앞에 꾸밈 받는 명사(선행사)가 있나요?" />
        <div className="mt-2.5 grid gap-2 sm:grid-cols-2">
          <PcAnswer job="adj" name="형용사절" when="있어요: 그 명사를 꾸며요" />
          <PcAnswer job="adv" name="부사절" when="없어요: 동사나 문장 전체를 꾸며요" />
        </div>
      </div>
    </div>
  );
}
