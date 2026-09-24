import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LevelBadges } from "@/components/lesson/blocks";
import { ReadButton, ReadMark } from "@/components/lesson/ReadMark";
import { findUnit, neighbors, readyUnits, unitHref, type UnitRef } from "@/content/curriculum";

export const dynamicParams = false;

export function generateStaticParams() {
  return readyUnits().map((r) => ({ chapter: r.chapter.slug, unit: r.unit.slug }));
}

export async function generateMetadata({ params }: PageProps<"/learn/[chapter]/[unit]">): Promise<Metadata> {
  const { chapter, unit } = await params;
  const ref = findUnit(chapter, unit);
  if (!ref) return {};
  return {
    title: `${ref.unit.title} · ${ref.chapter.title}`,
    description: ref.unit.summary,
  };
}

function ChapterNav({ at: r }: { at: UnitRef }) {
  return (
    <nav aria-label={`${r.chapter.title} 단원`} className="text-[15px]">
      <p className="text-[13px] font-extrabold text-coral-ink">{r.part.label}</p>
      <p className="font-extrabold">{r.chapter.title}</p>
      <ol className="mt-3 space-y-1 border-l-2 border-line">
        {r.chapter.units.map((u, i) => {
          const current = u.slug === r.unit.slug;
          const label = `${i + 1}. ${u.title}`;
          return (
            <li key={u.slug} className="-ml-0.5">
              {u.ready ? (
                <Link
                  href={unitHref(r.chapter.slug, u.slug)}
                  aria-current={current ? "page" : undefined}
                  className={`flex items-start justify-between gap-2 border-l-2 py-1.5 pl-3 ${
                    current ? "border-coral font-extrabold text-ink" : "border-transparent text-ink-2 hover:text-ink"
                  }`}
                >
                  <span>{label}</span>
                  <ReadMark unit={`${r.chapter.slug}/${u.slug}`} />
                </Link>
              ) : (
                <span className="block border-l-2 border-transparent py-1.5 pl-3 text-ink-3">{label} · 준비 중</span>
              )}
            </li>
          );
        })}
      </ol>
      <Link href="/learn" className="mt-4 inline-block text-[14px] font-bold text-ink-3 hover:text-ink">
        ← 전체 목차
      </Link>
    </nav>
  );
}

export default async function UnitPage({ params }: PageProps<"/learn/[chapter]/[unit]">) {
  const { chapter, unit } = await params;
  const ref = findUnit(chapter, unit);
  if (!ref || !ref.unit.ready) notFound();
  const { default: Content } = await import(`@/content/lessons/${chapter}/${unit}.mdx`);
  const { prev, next } = neighbors(chapter, unit);

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-10 pt-6 sm:px-6 lg:grid-cols-[230px_minmax(0,1fr)] lg:pt-10">
      <aside className="hidden lg:block">
        <div className="sticky top-24">
          <ChapterNav at={ref} />
        </div>
      </aside>

      <div className="min-w-0 max-w-[720px]">
        <details className="mb-6 rounded-2xl border border-line bg-card lg:hidden">
          <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 font-bold [&::-webkit-details-marker]:hidden">
            <span>
              {ref.chapter.title} · 단원 목록
            </span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
              <path d="m6 9 6 6 6-6" />
            </svg>
          </summary>
          <div className="border-t border-line px-4 py-4">
            <ChapterNav at={ref} />
          </div>
        </details>

        <header>
          <p className="text-[14px] font-bold text-ink-3">
            {ref.part.label} {ref.part.title} · {ref.chapter.title}
          </p>
          <h1 className="mt-2 text-[1.85rem] font-extrabold leading-snug tracking-[-0.02em] sm:text-[2.2rem]">{ref.unit.title}</h1>
          <p className="mt-2 text-[1.05rem] text-ink-2">{ref.unit.summary}</p>
          <div className="mt-3">
            <LevelBadges levels={ref.unit.levels} />
          </div>
        </header>

        <article className="lesson mt-6">
          <Content />
        </article>

        <div className="mt-12 flex justify-center">
          <ReadButton unit={`${chapter}/${unit}`} />
        </div>

        <nav aria-label="이전·다음 단원" className="mt-8 grid gap-3 sm:grid-cols-2">
          {prev ? (
            <Link href={unitHref(prev.chapter.slug, prev.unit.slug)} className="rounded-2xl border border-line bg-card px-4 py-3 hover:border-ink-3">
              <span className="text-[13px] font-bold text-ink-3">← 이전 단원</span>
              <span className="block font-extrabold">{prev.unit.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link
              href={unitHref(next.chapter.slug, next.unit.slug)}
              className="rounded-2xl bg-ink px-4 py-3 text-right text-on-ink hover:opacity-95 sm:col-start-2"
            >
              <span className="text-[13px] font-bold opacity-80">다음 단원 →</span>
              <span className="block font-extrabold">{next.unit.title}</span>
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
}
