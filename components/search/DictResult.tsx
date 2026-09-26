"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
// 사전 파일(lib/lexicon)은 서버에만 둔다: 여기서는 타입만 가져온다
import type { Gloss, WordHit } from "@/lib/lexicon";
import { onStoreChange, rawSnapshot, toggleWord, type SavedWord } from "@/lib/local-store";
import { speak } from "@/lib/speech";

/**
 * 검색 창 속 사전: 그래머랑 사전(단어 뜻 풍선과 같은 사전)에서 찾은 뜻을 보여 주고,
 * 사이트에 없는 단어는 네이버 영한사전으로 이어 준다 (네이버는 무료 공개 사전 API가 없어 검색 결과로 연결만 한다).
 */

export interface DictResult {
  q: string;
  exact: Gloss | null;
  more: WordHit[];
}

const cache = new Map<string, DictResult>();
const snapWords = rawSnapshot("words");
const noWords = () => "";

export const naverUrl = (q: string) => `https://en.dict.naver.com/#/search?query=${encodeURIComponent(q)}`;
/** 사전에서 찾아볼 만한 말: 영어 단어·구 또는 짧은 우리말 */
export const isEnglish = (q: string) => /^[A-Za-z][A-Za-z'’ -]*$/.test(q);
const worthLooking = (q: string) => q.length <= 40 && q.split(/\s+/).length <= 4 && (isEnglish(q) || /^[가-힣\s]+$/.test(q));

/** 글자를 칠 때마다 잠깐 기다렸다가 사전에서 찾는다. 한 번 찾은 말은 기억해 둔다. null이면 찾는 중이거나 찾을 말이 아님 */
export function useDict(text: string): DictResult | null {
  const key = text.toLowerCase();
  const [last, setLast] = useState<DictResult | null>(null);
  useEffect(() => {
    if (!text || !worthLooking(text) || cache.has(key)) return;
    const ctrl = new AbortController();
    const timer = window.setTimeout(() => {
      fetch(`/api/dict?q=${encodeURIComponent(text)}`, { signal: ctrl.signal })
        .then((r) => r.json() as Promise<DictResult>)
        .then((d) => {
          cache.set(key, d);
          setLast(d);
        })
        .catch(() => {});
    }, 150);
    return () => {
      ctrl.abort();
      window.clearTimeout(timer);
    };
  }, [text, key]);
  if (!text || !worthLooking(text)) return null;
  return cache.get(key) ?? (last && last.q.toLowerCase() === key ? last : null);
}
/** 이 말이 사전에서 찾을 대상인지 (찾을 대상이 아니면 결과를 기다리지 않는다) */
export const dictApplies = (text: string) => !!text && worthLooking(text);

export function NaverLink({ q, big = false }: { q: string; big?: boolean }) {
  return (
    <a
      href={naverUrl(q)}
      target="_blank"
      rel="noopener noreferrer"
      className={
        big
          ? "inline-flex items-center gap-1.5 rounded-lg bg-ink px-4 py-2.5 text-[14.5px] font-bold text-on-ink hover:bg-ink/85"
          : "inline-flex items-center gap-1 text-[13.5px] font-bold text-coral-ink hover:underline"
      }
    >
      {big ? `네이버 영한사전에서 ‘${q}’ 찾아보기` : `네이버 영한사전에서 ‘${q}’ 더 자세히 보기`}
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden>
        <path d="M7 17 17 7M9 7h8v8" />
      </svg>
    </a>
  );
}

/** 사전에서 찾은 단어 하나: 뜻·품사·다른 뜻, 발음 듣기, 내 단어장에 담기, 네이버로 더 보기 */
export function WordCard({ g }: { g: Gloss }) {
  const raw = useSyncExternalStore(onStoreChange, snapWords, noWords);
  const saved = useMemo(() => {
    try {
      return raw ? (JSON.parse(raw) as SavedWord[]).some((w) => w.lemma === g.lemma) : false;
    } catch {
      return false;
    }
  }, [raw, g.lemma]);
  return (
    <div className="rounded-2xl border border-line px-4 py-3.5">
      <div className="flex items-start justify-between gap-2">
        <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
          <span className="rounded-md bg-mint-soft px-1.5 py-0.5 text-[11.5px] font-extrabold text-mint-ink">사전</span>
          <span lang="en" className="text-[1.3rem] font-bold leading-tight">
            {g.lemma}
          </span>
          <span className="rounded-lg bg-chip px-2 py-0.5 text-[12px] font-bold text-ink-2">{g.pos}</span>
        </div>
        <button
          type="button"
          onClick={() => speak(g.lemma)}
          aria-label={`${g.lemma} 발음 듣기`}
          className="-mr-1 -mt-1 grid size-10 shrink-0 place-items-center rounded-full text-ink-2 hover:bg-chip hover:text-ink"
        >
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M11 5 6 9H3v6h3l5 4V5Z" />
            <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />
          </svg>
        </button>
      </div>
      <p className="mt-1.5 text-[1.1rem] font-extrabold leading-snug">{g.meaning}</p>
      {g.note && <p className="mt-0.5 text-[13.5px] text-ink-2">{g.surface !== g.lemma ? `${g.surface}: ${g.note}` : g.note}</p>}
      {g.alts && g.alts.length > 0 && (
        <p className="mt-1.5 text-[13.5px] text-ink-2">
          <span className="font-bold">다른 뜻</span> {g.alts.join(" / ")}
        </p>
      )}
      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
        <button
          type="button"
          onClick={() => toggleWord({ word: g.surface, lemma: g.lemma, pos: g.pos, meaning: g.meaning, from: location.pathname })}
          aria-pressed={saved}
          className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[13.5px] font-bold ring-1 ${
            saved ? "bg-coral-soft text-coral-ink ring-coral/40" : "text-ink ring-line hover:bg-chip"
          }`}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden>
            <path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z" />
          </svg>
          {saved ? "내 단어장에 담았어요" : "내 단어장에 담기"}
        </button>
        <NaverLink q={g.lemma} />
      </div>
    </div>
  );
}

/** 사전 표제어 목록 (눌러서 그 단어로 다시 찾기) */
export function WordList({ title, hits, onPick }: { title: string; hits: WordHit[]; onPick: (lemma: string) => void }) {
  return (
    <div>
      <p className="px-3 pb-1 text-[12.5px] font-extrabold text-ink-3">{title}</p>
      <ul>
        {hits.map((h) => (
          <li key={h.lemma}>
            <button type="button" onClick={() => onPick(h.lemma)} className="flex w-full items-baseline gap-2 rounded-xl px-3 py-2 text-left hover:bg-chip">
              <span className="shrink-0 rounded-md bg-mint-soft px-1.5 py-0.5 text-[11.5px] font-extrabold text-mint-ink">사전</span>
              <span lang="en" className="shrink-0 font-bold">
                {h.lemma}
              </span>
              <span className="min-w-0 truncate text-[14px] text-ink-2">
                {h.pos} · {h.meaning}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
