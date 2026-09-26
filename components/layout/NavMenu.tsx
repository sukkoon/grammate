"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

/**
 * 머리글 오른쪽의 드롭다운 목차.
 * - 단추에는 지금 보고 있는 페이지 이름이 보인다. 누르면 아래로 메뉴가 펼쳐진다.
 * - 여러 메뉴의 주소가 겹치면(주소가 겹치는 경우) 가장 길게 맞는 것 하나만 지금 페이지로 본다.
 * - 바깥을 누르거나 Esc를 누르거나 다른 페이지로 가면 닫힌다.
 */
export function NavMenu({ items, className = "" }: { items: { href: string; label: string }[]; className?: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const matches = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const current = items.filter((i) => matches(i.href)).sort((a, b) => b.href.length - a.href.length)[0];

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
        aria-label={`메뉴: ${current?.label ?? "전체"}`}
        className={`inline-flex h-9 max-w-[52vw] items-center gap-1.5 rounded-lg border px-2.5 text-[14px] font-bold transition-colors sm:max-w-none sm:px-3.5 ${
          open ? "border-ink bg-ink text-on-ink" : "border-line bg-card text-ink hover:border-ink-3"
        }`}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden className="shrink-0">
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
        <span className="hidden truncate sm:inline">{current?.label ?? "메뉴"}</span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
          className={`hidden shrink-0 transition-transform sm:block ${open ? "rotate-180" : ""}`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      <ul
        id={menuId}
        role="menu"
        aria-label="주요 메뉴"
        hidden={!open}
        className="absolute right-0 top-full z-40 mt-2 w-56 overflow-hidden rounded-xl border border-line bg-card p-1.5 shadow-[0_12px_32px_-12px_rgba(31,42,68,0.35)]"
      >
        {items.map((item) => {
          const on = current?.href === item.href;
          return (
            <li key={item.href} role="none">
              <Link
                href={item.href}
                role="menuitem"
                aria-current={on ? "page" : undefined}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-[14px] font-bold transition-colors ${
                  on ? "bg-chip text-ink" : "text-ink-2 hover:bg-chip hover:text-ink"
                }`}
              >
                <span aria-hidden className={`size-1.5 shrink-0 rounded-full ${on ? "bg-coral" : "bg-transparent"}`} />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
