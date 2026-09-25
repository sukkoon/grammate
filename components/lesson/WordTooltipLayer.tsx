"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { speak, canSpeak } from "@/lib/speech";
import { hasWord, toggleWord, onStoreChange } from "@/lib/local-store";

interface Info {
  word: string;
  lemma: string;
  pos: string;
  meaning: string;
  note?: string;
  alts: string[];
  missing: boolean;
}

const naver = (q: string) => `https://en.dict.naver.com/#/search?query=${encodeURIComponent(q)}`;
const noSubscribe = () => () => {};

function readInfo(el: HTMLElement): Info {
  const d = el.dataset;
  return {
    word: d.w ?? el.textContent ?? "",
    lemma: d.l ?? (d.w ?? "").toLowerCase(),
    pos: d.p ?? "",
    meaning: d.m ?? "",
    note: d.n || undefined,
    alts: d.a ? d.a.split("|") : [],
    missing: d.missing === "1",
  };
}

/** 페이지 전체에 하나만 두는 단어 뜻 풍선. 예문 속 .w 버튼을 누르면 그 위에 뜬다. */
export function WordTooltipLayer() {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const [info, setInfo] = useState<Info | null>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);
  const anchorRef = useRef<HTMLElement | null>(null);
  const speakable = useSyncExternalStore(noSubscribe, canSpeak, () => false);
  const saved = useSyncExternalStore(
    onStoreChange,
    () => (info ? hasWord(info.lemma) : false),
    () => false,
  );

  const close = useCallback((returnFocus = false) => {
    const a = anchorRef.current;
    if (a) {
      a.setAttribute("aria-expanded", "false");
      if (returnFocus) a.focus();
    }
    anchorRef.current = null;
    setAnchor(null);
    setInfo(null);
  }, []);

  const open = useCallback(
    (btn: HTMLElement) => {
      if (anchorRef.current === btn) {
        close();
        return;
      }
      anchorRef.current?.setAttribute("aria-expanded", "false");
      btn.setAttribute("aria-expanded", "true");
      anchorRef.current = btn;
      setAnchor(btn);
      setInfo(readInfo(btn));
    },
    [close],
  );

  // 단어 버튼 클릭을 문서 전체에서 한 번에 받는다.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const t = e.target as Element | null;
      const btn = t?.closest?.("button.w") as HTMLElement | null;
      if (btn) {
        e.preventDefault();
        open(btn);
        return;
      }
      if (boxRef.current && t && boxRef.current.contains(t)) return;
      close();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close(true);
    };
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [close, open]);

  // 풍선 크기를 잰 뒤 단어 위(공간이 없으면 아래)에 놓는다. 위치는 DOM 스타일로 바로 옮긴다.
  const place = useCallback(() => {
    const box = boxRef.current;
    const arrow = arrowRef.current;
    const a = anchorRef.current;
    if (!box || !arrow || !a) return;
    const r = a.getBoundingClientRect();
    if (r.bottom < 0 || r.top > window.innerHeight) {
      close();
      return;
    }
    const vw = document.documentElement.clientWidth;
    const w = box.offsetWidth;
    const h = box.offsetHeight;
    const gap = 10;
    const below = r.top < h + gap + 64; // 위쪽 헤더(64px)에 가리면 아래로
    const center = r.left + r.width / 2;
    const left = Math.max(8, Math.min(center - w / 2, vw - w - 8));
    box.style.left = `${left}px`;
    box.style.top = `${below ? r.bottom + gap : r.top - h - gap}px`;
    box.style.visibility = "visible";
    box.dataset.below = below ? "1" : "0";
    arrow.style.left = `${Math.max(14, Math.min(center - left, w - 14)) - 6}px`;
  }, [close]);

  useLayoutEffect(() => {
    if (anchor && info) place();
  }, [anchor, info, place]);

  useEffect(() => {
    if (!anchor) return;
    let raf = 0;
    const onMove = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(place);
    };
    // capture: 질문 도우미 패널처럼 안쪽에서 스크롤해도 따라간다
    window.addEventListener("scroll", onMove, { passive: true, capture: true });
    window.addEventListener("resize", onMove);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onMove, { capture: true });
      window.removeEventListener("resize", onMove);
    };
  }, [anchor, place]);

  if (!anchor || !info) return null;

  return createPortal(
    <div
      ref={boxRef}
      role="dialog"
      aria-label={`${info.word} 뜻`}
      data-below="0"
      className="group/tip fade-in fixed z-50 w-[min(300px,calc(100vw-16px))] rounded-2xl border border-line bg-card p-4 text-ink shadow-[0_18px_40px_-18px_rgba(31,42,68,0.45)]"
      style={{ left: -9999, top: -9999, visibility: "hidden" }}
    >
      <span
        ref={arrowRef}
        aria-hidden
        className="absolute size-3 rotate-45 border-line bg-card group-data-[below=0]/tip:-bottom-[6.5px] group-data-[below=0]/tip:border-b group-data-[below=0]/tip:border-r group-data-[below=1]/tip:-top-[6.5px] group-data-[below=1]/tip:border-l group-data-[below=1]/tip:border-t"
      />
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p lang="en" className="text-[1.15rem] font-bold leading-tight">
            {info.word}
          </p>
          {info.pos && (
            <span className="mt-1 inline-block rounded-full bg-chip px-2 py-0.5 text-[12px] font-bold text-ink-2">
              {info.pos}
            </span>
          )}
        </div>
        <div className="-mr-1 -mt-1 flex shrink-0">
          {speakable && (
            <button
              type="button"
              onClick={() => speak(info.word)}
              aria-label={`${info.word} 발음 듣기`}
              className="grid size-10 place-items-center rounded-full text-ink-2 hover:bg-chip hover:text-ink"
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M11 5 6 9H3v6h3l5 4V5Z" />
                <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />
              </svg>
            </button>
          )}
          {!info.missing && (
            <button
              type="button"
              onClick={() =>
                toggleWord({ word: info.word, lemma: info.lemma, pos: info.pos, meaning: info.meaning, from: location.pathname })
              }
              aria-pressed={saved}
              aria-label={saved ? "단어장에서 빼기" : "단어장에 담기"}
              className={`grid size-10 place-items-center rounded-full hover:bg-chip ${saved ? "text-coral" : "text-ink-2 hover:text-ink"}`}
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden>
                <path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z" />
              </svg>
            </button>
          )}
        </div>
      </div>
      {info.missing ? (
        <p className="mt-2 text-[14.5px] text-ink-2">이 단어의 뜻은 곧 채워 넣을게요.</p>
      ) : (
        <>
          <p className="mt-2 text-[1.05rem] font-extrabold leading-snug">{info.meaning}</p>
          {info.note && <p className="mt-1 text-[13.5px] text-ink-2">{info.note}</p>}
          {info.alts.length > 0 && (
            <div className="mt-2 border-t border-line pt-2 text-[13.5px] text-ink-2">
              <span className="font-bold">다른 뜻</span>
              <ul className="mt-0.5">
                {info.alts.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
      <a
        href={naver(info.lemma)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex items-center gap-1 text-[13.5px] font-bold text-coral-ink hover:underline"
      >
        네이버 사전에서 더 보기
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden>
          <path d="M7 17 17 7M9 7h8v8" />
        </svg>
      </a>
    </div>,
    document.body,
  );
}
