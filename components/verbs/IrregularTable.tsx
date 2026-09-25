"use client";

import { type ReactNode, useMemo, useState } from "react";
import { groupInfo, irregularVerbs, type IrregularVerb, type VerbGroup } from "@/content/irregular-verbs";
import type { Band } from "@/lib/level";
import { canSpeak, speak } from "@/lib/speech";

type Hide = "none" | "forms" | "meaning";

const BAND_ORDER: Band[] = ["elem", "middle", "high"];
const BAND_CHIPS: { band: Band; label: string }[] = [
  { band: "elem", label: "초등 필수" },
  { band: "middle", label: "중등까지" },
  { band: "high", label: "고등까지" },
];
const GROUPS: (VerbGroup | "all")[] = ["all", "AAA", "ABB", "ABC", "ABA"];
const HIDES: { hide: Hide; label: string }[] = [
  { hide: "none", label: "모두 보기" },
  { hide: "forms", label: "과거형·과거분사 가리기" },
  { hide: "meaning", label: "뜻 가리기" },
];

const keyOf = (v: IrregularVerb) => `${v.base}-${v.group}`;

function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={`rounded-full px-3.5 py-1.5 text-[13.5px] font-bold ring-1 transition-colors ${
        on ? "bg-ink text-bg ring-ink" : "bg-card text-ink-2 ring-line hover:bg-chip"
      }`}
    >
      {children}
    </button>
  );
}

function Cover({ hidden, onReveal, children, label }: { hidden: boolean; onReveal: () => void; children: ReactNode; label: string }) {
  if (!hidden) return <>{children}</>;
  return (
    <button
      type="button"
      onClick={onReveal}
      aria-label={`${label} 보기`}
      className="h-7 w-full max-w-24 rounded-lg bg-chip text-[13.5px] font-bold text-ink-3 ring-1 ring-line hover:bg-line"
    >
      ?
    </button>
  );
}

/** 불규칙 동사표: 찾기, 모양별·수준별 거르기, 가리고 외우기, 발음 듣기 */
export function IrregularTable() {
  const [q, setQ] = useState("");
  const [group, setGroup] = useState<VerbGroup | "all">("all");
  const [upTo, setUpTo] = useState<Band>("high");
  const [hide, setHide] = useState<Hide>("none");
  const [shown, setShown] = useState<Set<string>>(() => new Set());

  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    const max = BAND_ORDER.indexOf(upTo);
    return irregularVerbs.filter(
      (v) =>
        (group === "all" || v.group === group) &&
        BAND_ORDER.indexOf(v.band) <= max &&
        (!s || [v.base, v.past, v.pp].some((x) => x.toLowerCase().includes(s)) || v.ko.includes(s)),
    );
  }, [q, group, upTo]);

  const reveal = (k: string) => setShown((prev) => new Set(prev).add(k));
  const changeHide = (h: Hide) => {
    setHide(h);
    setShown(new Set());
  };

  return (
    <div>
      <div className="rounded-2xl border border-line bg-card p-4">
        <label className="block">
          <span className="text-[13.5px] font-extrabold text-ink-2">찾기</span>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="예: went, 가다"
            className="mt-1.5 h-11 w-full rounded-xl bg-bg px-3.5 text-[15px] ring-1 ring-line outline-none focus:ring-2 focus:ring-coral"
          />
        </label>
        <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="모양으로 거르기">
          {GROUPS.map((g) => (
            <Chip key={g} on={group === g} onClick={() => setGroup(g)}>
              {g === "all" ? "모든 모양" : groupInfo[g].label}
            </Chip>
          ))}
        </div>
        <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label="수준으로 거르기">
          {BAND_CHIPS.map((b) => (
            <Chip key={b.band} on={upTo === b.band} onClick={() => setUpTo(b.band)}>
              {b.label}
            </Chip>
          ))}
        </div>
        <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label="가리고 외우기">
          {HIDES.map((h) => (
            <Chip key={h.hide} on={hide === h.hide} onClick={() => changeHide(h.hide)}>
              {h.label}
            </Chip>
          ))}
        </div>
        {hide !== "none" && <p className="mt-2 text-[13.5px] text-ink-2">가려진 칸을 누르면 그 줄이 열려요. 소리 내어 말해 보고 확인해 봐요.</p>}
      </div>

      <p className="mt-4 text-[13.5px] font-bold text-ink-3" aria-live="polite">
        {list.length}개
      </p>
      <div className="mt-2 grid grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)_minmax(0,1fr)_2.25rem] gap-2 px-3 text-[13.5px] font-extrabold text-ink-3">
        <span>원형</span>
        <span>과거형</span>
        <span>과거분사</span>
        <span className="sr-only">듣기</span>
      </div>
      <ul className="mt-1.5 grid gap-1.5">
        {list.map((v) => {
          const k = keyOf(v);
          const open = hide === "none" || shown.has(k);
          return (
            <li key={k} className="rounded-xl border border-line bg-card px-3 py-2.5">
              <div className="grid grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)_minmax(0,1fr)_2.25rem] items-center gap-2">
                <div className="min-w-0">
                  <p lang="en" className="break-words text-[1.05em] font-extrabold">
                    {v.base}
                  </p>
                  <div className="mt-0.5 text-[13.5px] text-ink-2">
                    <Cover hidden={hide === "meaning" && !open} onReveal={() => reveal(k)} label={`${v.base}의 뜻`}>
                      {v.ko}
                    </Cover>
                  </div>
                </div>
                <div lang="en" className="min-w-0 break-words text-[1.02em] font-bold text-coral-ink">
                  <Cover hidden={hide === "forms" && !open} onReveal={() => reveal(k)} label={`${v.base}의 과거형`}>
                    {v.past}
                  </Cover>
                </div>
                <div lang="en" className="min-w-0 break-words text-[1.02em] font-bold text-sky-ink">
                  <Cover hidden={hide === "forms" && !open} onReveal={() => reveal(k)} label={`${v.base}의 과거분사`}>
                    {v.pp}
                  </Cover>
                </div>
                <button
                  type="button"
                  onClick={() => canSpeak() && speak(`${v.base}, ${v.past.replace(" / ", ", ")}, ${v.pp}`)}
                  aria-label={`${v.base} 발음 듣기`}
                  className="grid size-9 place-items-center rounded-full text-ink-2 hover:bg-chip"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M11 5 6 9H3v6h3l5 4V5Z" />
                    <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />
                  </svg>
                </button>
              </div>
              {v.note && open && <p className="mt-1.5 text-[13.5px] text-ink-3">{v.note}</p>}
            </li>
          );
        })}
      </ul>
      {list.length === 0 && <p className="mt-4 rounded-xl bg-chip px-4 py-3 text-[14.5px] text-ink-2">찾는 동사가 없어요. 규칙 동사라면 과거형과 과거분사 모두 -ed를 붙여요.</p>}
    </div>
  );
}
