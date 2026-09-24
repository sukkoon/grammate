"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Mate } from "@/components/brand/Mate";
import { Speak } from "@/components/lesson/Speak";
import { brand } from "@/lib/brand";
import { bandLabel, bandRank, type Band } from "@/lib/level";
import { canSpeak, speak, stopSpeaking } from "@/lib/speech";
import { buildIndex, isConfident, search, type Hit, type Index } from "@/lib/tutor/match";
import type { FaqPayload } from "@/lib/tutor/types";
import { useBand } from "@/lib/use-level";
import { RichText, SegText } from "./SegText";
import { useSpeechRecognition } from "./useSpeechRecognition";

interface Turn {
  key: number;
  query: string;
  answer: FaqPayload | null;
  others: FaqPayload[];
  showOthers: boolean;
}

const plainAnswer = (f: FaqPayload) => `${f.a.replace(/\*\*/g, "")} ${f.check ?? ""}`;

/** 질문 하나에 대한 답 차례를 만든다. 내 수준보다 높은 답은 조금 뒤로 미룬다. */
function makeTurn(q: string, index: Index<FaqPayload>, unit: string | undefined, band: Band | null): Turn {
  const hits: Hit<FaqPayload>[] = search(index, q, { unit, limit: 5 })
    .map((h) => ({
      ...h,
      score: band && h.item.level && bandRank(h.item.level) > bandRank(band) ? h.score * 0.85 : h.score,
    }))
    .sort((a, b) => b.score - a.score);
  const good = isConfident(q, hits[0]);
  return {
    key: Date.now() + Math.random(),
    query: q,
    answer: good ? hits[0].item : null,
    others: (good ? hits.slice(1, 4) : hits.slice(0, 3)).map((h) => h.item),
    showOthers: !good,
  };
}

function useCurrentUnit() {
  const path = usePathname();
  const m = path.match(/^\/learn\/([^/]+)\/([^/]+)/);
  return m ? `${m[1]}/${m[2]}` : undefined;
}

function AnswerCard({ item, speaking, onSpeak }: { item: FaqPayload; speaking: boolean; onSpeak: () => void }) {
  return (
    <div className="rounded-2xl border border-line bg-card px-4 py-3.5">
      <div className="flex items-start justify-between gap-2">
        <p className="text-[13px] font-bold text-coral-ink">
          {item.q}
          {item.level && item.level !== "elem" && (
            <span className="ml-1.5 rounded-full bg-sky-soft px-1.5 py-0.5 align-middle text-[11px] font-extrabold text-sky-ink">
              {bandLabel[item.level]}
            </span>
          )}
        </p>
        {canSpeak() && (
          <button
            type="button"
            onClick={onSpeak}
            aria-label={speaking ? "읽기 멈추기" : "답 읽어 주기"}
            className={`-mr-1 -mt-1 grid size-9 shrink-0 place-items-center rounded-full ${speaking ? "bg-coral text-white" : "text-ink-3 hover:bg-chip hover:text-ink"}`}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M11 5 6 9H3v6h3l5 4V5Z" />
              <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />
            </svg>
          </button>
        )}
      </div>
      <div className="text-[15px] leading-relaxed">
        <RichText text={item.a} />
      </div>
      {item.ex && item.ex.length > 0 && (
        <ul className="mt-2 space-y-1.5 rounded-xl bg-chip px-3 py-2">
          {item.ex.map((e, i) => (
            <li key={i} className="flex items-start gap-1">
              <span className="min-w-0 flex-1">
                <span className="block font-medium">
                  <SegText segs={e.segs} />
                </span>
                <span className="block text-[13px] text-ink-2">{e.ko}</span>
              </span>
              <Speak text={e.plain} />
            </li>
          ))}
        </ul>
      )}
      {item.check && (
        <p className="mt-2.5 flex items-start gap-2 text-[14px]">
          <Mate mood="thinking" size={22} className="mt-0.5 shrink-0 text-ink" />
          <span>
            <b>확인해 볼까요?</b> {item.check}
          </span>
        </p>
      )}
    </div>
  );
}

/** 모든 페이지 오른쪽 아래의 '모르는 것이 있으면 이야기 해봐요' */
export function Helper() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<FaqPayload[] | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [text, setText] = useState("");
  const [speakingKey, setSpeakingKey] = useState<number | null>(null);
  const pending = useRef<string | null>(null);
  const [waiting, setWaiting] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const unit = useCurrentUnit();
  const band = useBand();

  const index = useMemo(() => (items ? buildIndex(items) : null), [items]);

  // 처음 열 때만 질문 은행을 내려받는다.
  useEffect(() => {
    if (!open || items) return;
    let alive = true;
    fetch("/api/faq")
      .then((r) => r.json())
      .then((d: { items: FaqPayload[] }) => {
        if (!alive) return;
        setItems(d.items);
        // 질문 은행이 오기 전에 받은 질문이 있으면 이어서 답한다.
        const q = pending.current;
        if (q) {
          pending.current = null;
          setWaiting(false);
          setTurns((t) => [...t, makeTurn(q, buildIndex(d.items), unit, band)]);
        }
      })
      .catch(() => alive && setLoadError(true));
    return () => {
      alive = false;
    };
  }, [open, items, unit, band]);

  const ask = useCallback(
    (query: string) => {
      const q = query.trim();
      if (!q) return;
      setText("");
      if (!index) {
        pending.current = q;
        setWaiting(true);
        return;
      }
      setTurns((t) => [...t, makeTurn(q, index, unit, band)]);
    },
    [index, unit, band],
  );

  const speech = useSpeechRecognition(ask);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [turns]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const choose = (item: FaqPayload) =>
    setTurns((t) => [...t, { key: Date.now() + Math.random(), query: item.q, answer: item, others: [], showOthers: false }]);

  const toggleSpeak = (key: number, item: FaqPayload) => {
    if (speakingKey === key) {
      stopSpeaking();
      setSpeakingKey(null);
      return;
    }
    setSpeakingKey(key);
    speak(plainAnswer(item), "ko-KR", () => setSpeakingKey(null));
  };

  const suggestions = useMemo(() => {
    if (!items) return [];
    const here = items.filter((f) => f.unit === unit);
    return (here.length ? here : items.filter((f) => f.unit === "general")).slice(0, 4);
  }, [items, unit]);

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => {
          setOpen(true);
          setTimeout(() => inputRef.current?.focus(), 50);
        }}
        className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-4 z-40 inline-flex items-center gap-2 rounded-full bg-ink py-2 pl-2 pr-4 text-on-ink shadow-[0_14px_30px_-12px_rgba(31,42,68,0.6)] transition-transform hover:-translate-y-0.5 sm:right-6"
      >
        <span className="grid size-9 place-items-center rounded-full bg-on-ink/10">
          <Mate mood="listening" size={26} className="text-on-ink" />
        </span>
        <span className="text-[14.5px] font-extrabold">
          <span className="sm:hidden">물어보기</span>
          <span className="hidden sm:inline">{brand.helperLabel}</span>
        </span>
      </button>
    );
  }

  const micLabel = speech.listening ? "듣는 중이에요… 다 말하면 멈춰요" : "눌러서 말하기";

  return (
    <section
      role="dialog"
      aria-label="질문 도우미"
      className="fade-in fixed inset-x-0 bottom-0 z-40 flex max-h-[85dvh] flex-col rounded-t-3xl border border-line bg-bg shadow-[0_-20px_50px_-20px_rgba(31,42,68,0.5)] sm:inset-x-auto sm:bottom-6 sm:right-6 sm:max-h-[min(680px,82vh)] sm:w-[410px] sm:rounded-3xl"
    >
      <header className="flex items-center gap-2.5 border-b border-line px-4 py-3">
        <Mate mood={speech.listening ? "listening" : "wink"} size={32} className="shrink-0 text-ink" />
        <div className="min-w-0 flex-1">
          <p className="font-extrabold">무엇이 궁금해요?</p>
          <p className="truncate text-[12.5px] text-ink-3">두서없이 말해도 괜찮아요. 짝꿍이 알아들을게요.</p>
        </div>
        <button
          type="button"
          onClick={() => {
            speech.stop();
            stopSpeaking();
            setOpen(false);
          }}
          aria-label="질문 도우미 닫기"
          className="grid size-10 place-items-center rounded-full text-ink-2 hover:bg-chip"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </header>

      <div ref={listRef} className="min-h-40 flex-1 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite">
        {turns.length === 0 && (
          <div>
            <p className="text-[14.5px] text-ink-2">
              마이크를 누르고 말하거나, 아래에 적어 주세요. 예를 들면 &ldquo;a랑 an은 왜 달라요?&rdquo;처럼요.
            </p>
            {loadError && <p className="mt-2 text-[14px] text-coral-ink">질문 은행을 불러오지 못했어요. 인터넷 연결을 확인해 주세요.</p>}
            {suggestions.length > 0 && (
              <div className="mt-3">
                <p className="text-[12.5px] font-bold text-ink-3">{unit ? "이 단원에서 많이 묻는 질문" : "많이 묻는 질문"}</p>
                <ul className="mt-1.5 flex flex-wrap gap-1.5">
                  {suggestions.map((s) => (
                    <li key={s.id}>
                      <button
                        type="button"
                        onClick={() => ask(s.q)}
                        className="rounded-full bg-card px-3 py-1.5 text-left text-[13.5px] font-bold ring-1 ring-line hover:bg-chip"
                      >
                        {s.q}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {turns.map((t) => (
          <div key={t.key} className="space-y-2">
            <p className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-ink px-3.5 py-2 text-[14.5px] text-on-ink">{t.query}</p>
            {t.answer ? (
              <AnswerCard item={t.answer} speaking={speakingKey === t.key} onSpeak={() => toggleSpeak(t.key, t.answer!)} />
            ) : (
              <div className="flex gap-2.5 rounded-2xl bg-coral-soft px-4 py-3">
                <Mate mood="oops" size={28} className="mt-0.5 shrink-0 text-ink" />
                <div className="text-[14.5px]">
                  <p className="font-extrabold text-coral-ink">아직 그 질문에 딱 맞는 답을 준비하지 못했어요.</p>
                  <p className="mt-0.5">
                    조금 다르게 물어보거나, <Link href="/learn" className="font-bold underline">전체 목차</Link>와{" "}
                    <Link href="/terms" className="font-bold underline">용어 사전</Link>에서 찾아볼 수 있어요.
                  </p>
                </div>
              </div>
            )}
            {t.others.length > 0 &&
              (t.showOthers ? (
                <div>
                  <p className="text-[12.5px] font-bold text-ink-3">혹시 이게 궁금했나요?</p>
                  <ul className="mt-1 flex flex-wrap gap-1.5">
                    {t.others.map((o) => (
                      <li key={o.id}>
                        <button
                          type="button"
                          onClick={() => choose(o)}
                          className="rounded-full bg-card px-3 py-1.5 text-left text-[13.5px] font-bold ring-1 ring-line hover:bg-chip"
                        >
                          {o.q}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setTurns((all) => all.map((x) => (x.key === t.key ? { ...x, showOthers: true } : x)))}
                  className="text-[13px] font-bold text-ink-3 underline-offset-2 hover:text-ink hover:underline"
                >
                  원하는 답이 아니에요
                </button>
              ))}
          </div>
        ))}
        {waiting && <p className="text-[14px] text-ink-3">질문 은행을 여는 중이에요…</p>}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          ask(text);
        }}
        className="border-t border-line px-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3"
      >
        {speech.listening && (
          <p className="mb-2 rounded-xl bg-chip px-3 py-2 text-[14.5px]" aria-live="polite">
            {speech.interim || <span className="text-ink-3">말해 보세요…</span>}
          </p>
        )}
        {speech.error && (
          <p className="mb-2 text-[13px] text-coral-ink">
            {speech.error === "not-allowed"
              ? "마이크 사용을 허락해 주세요. 주소창 옆 자물쇠 아이콘에서 바꿀 수 있어요."
              : speech.error === "no-speech"
                ? "잘 안 들렸어요. 다시 말해 볼래요?"
                : "음성 인식이 잠깐 안 돼요. 글로 적어 주세요."}
          </p>
        )}
        <div className="flex items-center gap-2">
          {speech.supported && (
            <button
              type="button"
              onClick={() => (speech.listening ? speech.stop() : speech.start())}
              aria-label={micLabel}
              aria-pressed={speech.listening}
              className={`grid size-12 shrink-0 place-items-center rounded-full transition-colors ${
                speech.listening ? "animate-pulse bg-coral text-white" : "bg-ink text-on-ink hover:opacity-90"
              }`}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <rect x="9" y="3" width="6" height="11" rx="3" />
                <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
              </svg>
            </button>
          )}
          <input
            ref={inputRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={speech.supported ? "말하거나 적어 주세요" : "궁금한 것을 적어 주세요"}
            aria-label="질문"
            className="h-12 min-w-0 flex-1 rounded-full border border-line bg-card px-4 text-[15.5px] outline-none focus:border-ink-3"
          />
          <button
            type="submit"
            disabled={!text.trim()}
            className="h-12 shrink-0 rounded-full bg-coral px-4 font-extrabold text-white disabled:opacity-40"
          >
            묻기
          </button>
        </div>
        {!speech.supported && (
          <p className="mt-2 text-[12.5px] text-ink-3">이 브라우저에서는 음성 인식이 안 돼요. 크롬이나 사파리에서는 말로도 물어볼 수 있어요.</p>
        )}
      </form>
    </section>
  );
}
