import Link from "next/link";
import { Fragment } from "react";
import { Mate } from "@/components/brand/Mate";
import { Lv } from "@/components/level/Lv";
import voices from "@/content/term-voices.json";
import { termById, type Term } from "@/content/terms";
import { En } from "./En";

/** 수준별 말투: 초등은 쉬운 풀이, 고등은 선생님의 한마디 (docs/TERM_VOICE_GUIDE.md) */
type Voice = { elem: string; high: string };
const VOICES = voices as Record<string, Voice>;

/** 중등 기준 정의(=)와 흔한 오해 */
function Definition({ t }: { t: Term }) {
  return (
    <>
      <p className="mt-3 flex items-start gap-2">
        <span aria-hidden className="mt-1.5 text-lg font-bold leading-none text-ink-3">
          =
        </span>
        <span className="rounded-xl bg-ink px-3.5 py-2 font-extrabold leading-snug text-on-ink">{t.result}</span>
      </p>
      {t.myth && <p className="mt-3 text-[0.95em] font-bold text-coral-ink">{t.myth}</p>}
    </>
  );
}

/**
 * 용어 카드. 학생이 고른 수준에 따라
 * - 초등: 쉬운 풀이 + '중학생 설명까지 더 보기'
 * - 중등: 정의 + 흔한 오해 + '고등학생 설명까지 더 보기'
 * - 고등: 정의 + 흔한 오해 + 선생님의 한마디
 */
export function TermCard({ t, compact = false }: { t: Term; compact?: boolean }) {
  const v = VOICES[t.id];
  return (
    <div>
      <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
        {t.parts.map((p, i) => (
          <Fragment key={p.c}>
            {i > 0 && (
              <span aria-hidden className="text-lg font-bold text-ink-3">
                +
              </span>
            )}
            <span className="rounded-xl bg-chip px-3 py-2 text-center leading-tight">
              <span className="block text-[1.2rem] font-extrabold">{p.c}</span>
              <span className="mt-0.5 block text-[12.5px] text-ink-2">{p.m}</span>
            </span>
          </Fragment>
        ))}
      </div>
      {v ? (
        <>
          <p data-lv-max="elem" className="mt-3 flex items-start gap-2">
            <span aria-hidden className="mt-1.5 text-lg font-bold leading-none text-ink-3">
              =
            </span>
            <span className="rounded-xl bg-mint-soft px-3.5 py-2.5 font-bold leading-relaxed text-ink">{v.elem}</span>
          </p>
          <Lv min="middle" compact label="중학생 설명까지 더 보기">
            <Definition t={t} />
            <Lv min="high" compact label="고등학생 설명까지 더 보기">
              <div className="mt-3 flex gap-2.5 rounded-xl bg-amber-soft px-3.5 py-3">
                <Mate mood="happy" size={28} className="mt-0.5 shrink-0 text-ink" />
                <div className="min-w-0">
                  <p className="text-[13.5px] font-extrabold text-amber-ink">선생님의 한마디</p>
                  <p className="mt-0.5 text-[0.95em] leading-relaxed">{v.high}</p>
                </div>
              </div>
            </Lv>
          </Lv>
        </>
      ) : (
        <Definition t={t} />
      )}
      <p className="mt-2 text-[0.92em] text-ink-2">
        영어로는{" "}
        <b lang="en" className="text-ink">
          {t.english}
        </b>
        {t.englishNote && <> · {t.englishNote}</>}
      </p>
      {!compact && t.example && (
        <p className="mt-3 border-t border-line pt-3 text-[1.05em] font-medium">
          <En en={t.example} />
        </p>
      )}
    </div>
  );
}

/** 단원 첫머리의 '용어 뜻풀이' 카드 */
export function TermAnatomy({ id }: { id: string }) {
  const t = termById(id);
  if (!t) throw new Error(`용어 '${id}'가 content/terms.ts에 없어요`);
  return (
    <section aria-label={`${t.term} 뜻풀이`} className="my-7 rounded-2xl border border-line bg-card px-4 py-5 sm:px-6">
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="rounded-lg bg-coral-soft px-2.5 py-0.5 text-[12.5px] font-extrabold text-coral-ink">용어 뜻풀이</span>
        <Link href={`/terms#${t.id}`} className="text-[13px] font-bold text-ink-3 hover:text-ink">
          용어 사전 ›
        </Link>
      </div>
      <p className="mb-3 text-[1.7rem] font-extrabold leading-tight tracking-[-0.01em]">{t.term}</p>
      <TermCard t={t} />
    </section>
  );
}
