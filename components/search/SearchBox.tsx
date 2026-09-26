"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { norm } from "@/lib/slug";
import { NaverLink, WordCard, WordList, dictApplies, isEnglish, useDict } from "./DictResult";

interface Item {
  t: "unit" | "section" | "term" | "faq";
  title: string;
  sub: string;
  href: string;
  tag: string;
  keys?: string;
}

const KIND: Record<Item["t"], { label: string; tone: string }> = {
  unit: { label: "단원", tone: "bg-coral-soft text-coral-ink" },
  section: { label: "소제목", tone: "bg-sky-soft text-sky-ink" },
  term: { label: "용어", tone: "bg-mint-soft text-mint-ink" },
  faq: { label: "질문", tone: "bg-amber-soft text-amber-ink" },
};
const ORDER: Record<Item["t"], number> = { unit: 0, term: 1, section: 2, faq: 3 };

/** 조사 하나 정도는 떼고도 찾는다: '관계대명사는' → '관계대명사' */
function stems(token: string): string[] {
  const out = [token];
  const m = token.match(/^(.+?)(은|는|이|가|을|를|의|에|로|와|과|도|만)$/);
  if (m && m[1].length >= 2) out.push(m[1]);
  return out;
}

function score(it: Item, tokens: string[][]): number {
  const title = norm(it.title);
  const sub = norm(it.sub);
  const keys = norm(it.keys ?? "");
  let total = 0;
  for (const alts of tokens) {
    let best = 0;
    for (const tk of alts) {
      let s = 0;
      if (title === tk) s = 12;
      else if (title.startsWith(tk)) s = 9;
      else if (title.includes(tk)) s = 7;
      else if (keys.includes(tk)) s = 4;
      else if (sub.includes(tk)) s = 2;
      best = Math.max(best, s);
    }
    if (!best) return 0; // 모든 낱말이 어딘가에는 있어야 한다
    total += best;
  }
  return total;
}

/** 찾은 글자를 형광으로 */
function Mark({ text, q }: { text: string; q: string }) {
  const t = q.trim();
  if (!t) return <>{text}</>;
  const i = text.toLowerCase().indexOf(t.toLowerCase());
  if (i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <mark className="rounded-sm bg-marker px-0.5 text-inherit">{text.slice(i, i + t.length)}</mark>
      {text.slice(i + t.length)}
    </>
  );
}

let indexCache: Item[] | null = null;

/**
 * 머리글의 검색 단추 + 검색 창. 글자를 치면 단원·소제목·용어·질문이 바로 걸러진다.
 * 사전도 겸한다: 영어 단어를 치면 그래머랑 사전의 뜻이 맨 위에, 우리말을 치면 그 뜻의 영어 단어가 아래에 나온다.
 * 사이트에 없는 말은 네이버 영한사전으로 이어 준다.
 */
export function SearchBox() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [items, setItems] = useState<Item[] | null>(indexCache);
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    if (!indexCache) {
      fetch("/api/search")
        .then((r) => r.json())
        .then((d: { items: Item[] }) => {
          indexCache = d.items;
          setItems(d.items);
        })
        .catch(() => setItems([]));
    }
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

  // 어디서든 / 키로 검색 열기
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (e.key === "/" && tag !== "INPUT" && tag !== "TEXTAREA" && !(e.target as HTMLElement)?.isContentEditable) {
        e.preventDefault();
        setOpen(true);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const results = useMemo(() => {
    const text = q.trim();
    if (!items || text.length < 1) return [];
    const tokens = text.split(/\s+/).map((tk) => stems(norm(tk))).filter((a) => a[0]);
    if (!tokens.length) return [];
    return items
      .map((it) => ({ it, s: score(it, tokens) }))
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s || ORDER[a.it.t] - ORDER[b.it.t])
      .slice(0, 40)
      .map((x) => x.it);
  }, [items, q]);

  useEffect(() => setActive(0), [q]);

  const text = q.trim();
  const dict = useDict(open ? text : "");
  const english = isEnglish(text);
  const dictWaiting = dictApplies(text) && dict === null;
  const dictFound = !!dict && (!!dict.exact || dict.more.length > 0);
  // 우리말이 어떤 단어의 뜻과 딱 맞으면(사과 → apple) 영어 단어를 맨 위에, 아니면 사이트 결과 아래에 둔다
  const koExact =
    !english && !!dict?.more.some((h) => h.meaning.replace(/\([^)]*\)/g, "").split(/[,;·/]\s*/).map((m) => m.trim()).includes(text));

  function go(it: Item) {
    setOpen(false);
    setQ("");
    router.push(it.href);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="검색: 단원·문법 용어·모르는 영어 단어"
        className="grid size-8 shrink-0 place-items-center rounded-lg border border-line bg-card text-ink transition-colors hover:border-ink-3 sm:size-9"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden>
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="검색"
          className="fixed inset-0 z-50 flex items-start justify-center bg-ink/50 p-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:pt-16"
          onClick={() => setOpen(false)}
        >
          <div className="flex max-h-[85dvh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-line bg-card shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-2 border-b border-line px-3 py-2.5">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden className="shrink-0 text-ink-3">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
              <input
                ref={inputRef}
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setActive((a) => Math.min(a + 1, results.length - 1));
                  } else if (e.key === "ArrowUp") {
                    e.preventDefault();
                    setActive((a) => Math.max(a - 1, 0));
                  } else if (e.key === "Enter" && results[active]) {
                    go(results[active]);
                  }
                }}
                placeholder="무엇을 찾을까요? 예: 관계대명사, a와 an, went"
                autoComplete="off"
                enterKeyHint="search"
                className="h-11 min-w-0 flex-1 bg-transparent text-[16px] text-ink outline-none placeholder:text-ink-3"
              />
              <button type="button" onClick={() => setOpen(false)} className="shrink-0 rounded-lg px-2 py-1 text-[13px] font-bold text-ink-3 hover:bg-chip hover:text-ink">
                닫기
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto p-2">
              {!text && (
                <p className="px-3 py-6 text-center text-[14px] text-ink-3">
                  단원 이름, 소제목, 문법 용어, 궁금한 질문을 적어 보세요.
                  <br />
                  모르는 영어 단어를 적으면 뜻도 찾아 줘요.
                </p>
              )}
              {english && dict?.exact && (
                <div className="mb-2">
                  <WordCard g={dict.exact} />
                </div>
              )}
              {english && dict && !dict.exact && dict.more.length > 0 && (
                <div className="mb-2">
                  <WordList title="이 단어를 찾나요?" hits={dict.more.slice(0, 5)} onPick={setQ} />
                </div>
              )}
              {koExact && dict && (
                <div className="mb-2">
                  <WordList title="영어 단어" hits={dict.more.slice(0, 5)} onPick={setQ} />
                </div>
              )}
              {text && items === null && <p className="px-3 py-6 text-center text-[14px] text-ink-3">찾는 중…</p>}
              {text && items !== null && results.length === 0 && !dictFound && !dictWaiting && (
                <div className="px-3 py-6 text-center text-[14px] text-ink-3">
                  <p>그래머랑에서 ‘{text}’에 맞는 내용을 찾지 못했어요.</p>
                  {dictApplies(text) && (
                    <div className="mt-3">
                      <NaverLink q={text} big />
                    </div>
                  )}
                  <p className="mt-2">다른 말로 적어 볼 수도 있어요.</p>
                </div>
              )}
              {results.length > 0 && (
                <ul role="listbox">
                  {results.map((it, i) => (
                    <li key={`${it.href}-${i}`} role="option" aria-selected={i === active}>
                      <button
                        type="button"
                        onClick={() => go(it)}
                        onMouseEnter={() => setActive(i)}
                        className={`flex w-full flex-col items-start gap-0.5 rounded-xl px-3 py-2.5 text-left transition-colors ${i === active ? "bg-chip" : "hover:bg-chip"}`}
                      >
                        <span className="flex w-full items-center gap-2">
                          <span className={`shrink-0 rounded-md px-1.5 py-0.5 text-[11.5px] font-extrabold ${KIND[it.t].tone}`}>{KIND[it.t].label}</span>
                          <span className="min-w-0 flex-1 truncate text-[15px] font-extrabold text-ink">
                            <Mark text={it.title} q={q} />
                          </span>
                        </span>
                        {it.sub && (
                          <span className="line-clamp-2 text-[13px] text-ink-2">
                            <Mark text={it.sub} q={q} />
                          </span>
                        )}
                        <span className="text-[12px] font-bold text-ink-3">{it.tag}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              {!english && !koExact && dict && dict.more.length > 0 && (
                <div className="mt-2">
                  <WordList title="영어 단어" hits={dict.more.slice(0, 5)} onPick={setQ} />
                </div>
              )}
              {english && dict && !dict.exact && (results.length > 0 || dict.more.length > 0) && (
                <div className="mt-2 border-t border-line px-3 pt-2.5">
                  <NaverLink q={text} />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
