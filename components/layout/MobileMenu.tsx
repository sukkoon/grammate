"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function MobileMenu({ items }: { items: { href: string; label: string }[] }) {
  const pathname = usePathname();
  // 메뉴를 연 페이지를 기억한다. 다른 페이지로 옮기면 저절로 닫힌다.
  const [openedAt, setOpenedAt] = useState<string | null>(null);
  const open = openedAt === pathname;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenedAt(null);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
        aria-expanded={open}
        onClick={() => setOpenedAt(open ? null : pathname)}
        className="grid size-11 place-items-center rounded-full text-ink-2 hover:bg-chip"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
          {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>
      {open && (
        <div className="fade-in fixed inset-x-0 top-16 z-40 border-b border-line bg-bg px-4 pb-5 pt-2 shadow-[0_12px_24px_-16px_rgba(31,42,68,0.35)]">
          <nav aria-label="모바일 메뉴" className="flex flex-col">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpenedAt(null)}
                className="rounded-xl px-3 py-3.5 text-lg font-bold hover:bg-chip"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
