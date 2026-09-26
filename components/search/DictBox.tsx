"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
// 사전 파일(lib/lexicon)은 서버에만 둔다: 여기서는 타입만 가져온다
import type { Gloss, WordHit } from "@/lib/lexicon";
import { onStoreChange, rawSnapshot, toggleWord, type SavedWord } from "@/lib/local-store";
import { speak } from "@/lib/speech";

/**
 * 머리글의 '사전 검색' 네모 단추 + 사전 창.
 * - 그래머랑 사전(단어 뜻 풍선과 같은 사전)에서 바로 찾아 뜻·품사·다른 뜻을 보여 주고, 발음 듣기와 단어장 담기를 할 수 있다.
 * - 우리말로 적으면 그 뜻의 영어 단어를 찾아 준다(사과 → apple).
 * - 더 자세한 뜻이나 그래머랑 사전에 없는 단어는 네이버 영한사전으로 바로 이어 준다.
 *   (네이버는 다른 사이트에 붙일 수 있는 무료 사전 API가 없어서, 검색 결과 화면으로 연결만 한다.)
 */

interface Result {
  q: string;
  exact: Gloss | null;
  more: WordHit[];
}

const cache = new Map<string, Result>();
const naverUrl = (q: string) => `https://en.dict.naver.com/#/search?query=${encodeURIComponent(q)}`;
const snapWords = rawSnapshot("words");
const noWords = () => "";

function BookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 19.5V5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2Z" />
      <path d="M8 7h7M8 11h5" />
    </svg>
  );
}

function NaverLink({ q, big = false }: { q: string; big?: boolean }) {
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
      네이버 영한사전에서 {big ? `‘${q}’ 찾아보기` : "더 자세히 보기"}
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden>
        <path d="M7 17 17 7M9 7h8v8" />
      </svg>
    </a>
  );
}

function WordCard({ g }: { g: Gloss }) {
  const raw = useSyncExternalStore(onStoreChange, snapWords, noWords);
  const saved = useMemo(() => {
    try {
      return raw ? (JSON.parse(raw) as SavedWord[]).some((w) => w.lemma === g.lemma) : false;
    } catch {
      return false;
    }
  }, [raw, g.lemma]);
  return (
    <div className="rounded-2xl border border-line px-4 py-4">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p lang="en" className="text-[1.45rem] font-bold leading-tight">
            {g.lemma}
          </p>
          <span className="mt-1.5 inline-block rounded-lg bg-chip px-2 py-0.5 text-[12.5px] font-bold text-ink-2">{g.pos}</span>
        </div>
        <button
          type="button"
          onClick={() => speak(g.lemma)}
          aria-label={`${g.lemma} 발음 듣기`}
          className="-mr-1 grid size-11 shrink-0 place-items-center rounded-full text-ink-2 hover:bg-chip hover:text-ink"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M11 5 6 9H3v6h3l5 4V5Z" />
            <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />
          </svg>
        </button>
      </div>
      <p className="mt-2.5 text-[1.15rem] font-extrabold leading-snug">{g.meaning}</p>
      {g.note && <p className="mt-1 text-[14px] text-ink-2">{g.surface !== g.lemma ? `${g.surface}: ${g.note}` : g.note}</p>}
      {g.alts && g.alts.length > 0 && (
        <div className="mt-2.5 border-t border-line pt-2.5 text-[14px] text-ink-2">
          <span className="font-bold">다른 뜻</span>
          <ul className="mt-0.5">
            {g.alts.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="mt-3.5 flex flex-wrap items-center gap-x-4 gap-y-2">
        <button
          type="button"
          onClick={() => toggleWord({ word: g.surface, lemma: g.lemma, pos: g.pos, meaning: g.meaning, from: location.pathname })}
          aria-pressed={saved}
          className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-[14px] font-bold ring-1 ${
            saved ? "bg-coral-soft text-coral-ink ring-coral/40" : "text-ink ring-line hover:bg-chip"
          }`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden>
            <path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z" />
          </svg>
          {saved ? "내 단어장에 담았어요" : "내 단어장에 담기"}
        </button>
        <NaverLink q={g.lemma} />
      </div>
    </div>
  );
}

export function DictBox() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [res, setRes] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const text = q.trim();

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  // 글자를 칠 때마다 잠깐 기다렸다가 찾는다 (한 번 찾은 말은 기억해 두고 바로 보여 준다)
  useEffect(() => {
    if (!text || cache.has(text.toLowerCase())) return;
    const ctrl = new AbortController();
    const timer = window.setTimeout(() => {
      setLoading(true);
      fetch(`/api/dict?q=${encodeURIComponent(text)}`, { signal: ctrl.signal })
        .then((r) => r.json() as Promise<Result>)
        .then((d) => {
          cache.set(text.toLowerCase(), d);
          setRes(d);
          setLoading(false);
        })
        .catch(() => {
          if (!ctrl.signal.aborted) setLoading(false);
        });
    }, 150);
    return () => {
      ctrl.abort();
      window.clearTimeout(timer);
    };
  }, [text]);

  const shown = text ? (cache.get(text.toLowerCase()) ?? (res && res.q === text ? res : null)) : null;
  const nothing = shown && !shown.exact && shown.more.length === 0;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="사전 검색: 모르는 단어 찾아보기"
        className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-lg border border-line bg-card px-2 text-[13.5px] font-extrabold text-ink transition-colors hover:border-ink-3 sm:px-2.5"
      >
        <BookIcon size={17} />
        <span className="sm:hidden">사전</span>
        <span className="hidden sm:inline">사전 검색</span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="사전 검색"
          className="fixed inset-0 z-50 flex items-start justify-center bg-ink/50 p-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:pt-16"
          onClick={() => setOpen(false)}
        >
          <div className="flex max-h-[85dvh] w-full max-w-xl flex-col overflow-hidden rounded-2xl border border-line bg-card shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-2 border-b border-line px-3 py-2.5">
              <span className="shrink-0 text-ink-3">
                <BookIcon />
              </span>
              <input
                ref={inputRef}
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key !== "Enter") return;
                  // 그래머랑 사전에 딱 맞는 단어가 없으면 가장 가까운 단어를 보여 준다
                  if (shown && !shown.exact && shown.more[0]) setQ(shown.more[0].lemma);
                  else (e.target as HTMLInputElement).blur();
                }}
                placeholder="모르는 단어를 적어 보세요. 예: went, look after, 사과"
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                enterKeyHint="search"
                className="h-11 min-w-0 flex-1 bg-transparent text-[16px] text-ink outline-none placeholder:text-ink-3"
              />
              <button type="button" onClick={() => setOpen(false)} className="shrink-0 rounded-lg px-2 py-1 text-[13px] font-bold text-ink-3 hover:bg-chip hover:text-ink">
                닫기
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto p-3">
              {!text && (
                <div className="px-2 py-5 text-center text-[14px] text-ink-2">
                  <p className="font-extrabold text-ink">모르는 단어 찾아보기</p>
                  <p className="mt-1">영어 단어를 적으면 뜻을, 우리말을 적으면 그 뜻의 영어 단어를 찾아 줘요.</p>
                  <p className="mt-1 text-ink-3">went처럼 모양이 바뀐 단어도 원래 단어(go)로 찾아요.</p>
                </div>
              )}
              {text && !shown && loading && <p className="px-3 py-6 text-center text-[14px] text-ink-3">찾는 중…</p>}

              {shown?.exact && <WordCard g={shown.exact} />}

              {shown && shown.more.length > 0 && (
                <div className={shown.exact ? "mt-4" : ""}>
                  <p className="px-1 text-[13px] font-extrabold text-ink-3">{shown.exact ? "비슷한 단어" : "이 단어를 찾나요?"}</p>
                  <ul className="mt-1.5 divide-y divide-line rounded-2xl border border-line">
                    {shown.more.map((h) => (
                      <li key={h.lemma}>
                        <button type="button" onClick={() => setQ(h.lemma)} className="flex w-full items-baseline gap-2 px-4 py-2.5 text-left hover:bg-chip">
                          <span lang="en" className="shrink-0 font-bold">
                            {h.lemma}
                          </span>
                          <span className="shrink-0 rounded-md bg-chip px-1.5 py-0.5 text-[11.5px] font-bold text-ink-2">{h.pos}</span>
                          <span className="min-w-0 truncate text-[14px] text-ink-2">{h.meaning}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {nothing && (
                <div className="px-2 py-5 text-center">
                  <p className="text-[14.5px] text-ink-2">‘{text}’은(는) 그래머랑 사전에 아직 없어요.</p>
                  <div className="mt-3">
                    <NaverLink q={text} big />
                  </div>
                </div>
              )}
            </div>

            {shown && !shown.exact && !nothing && (
              <div className="border-t border-line px-4 py-2.5">
                <NaverLink q={text} />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
