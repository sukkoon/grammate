"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/**
 * 머리글의 메뉴 탭. 어떤 메뉴가 있는지 한눈에 보이도록 모두 펼쳐 둔다.
 * 좁은 화면에서는 옆으로 밀어서 보고, 가려진 탭이 있는 쪽은 흐리게 덮고 화살표를 보인다.
 * 지금 보고 있는 탭은 화면 안에 들어오게 맞춘다.
 */
export function NavTabs({ items, className = "" }: { items: { href: string; label: string }[]; className?: string }) {
  const pathname = usePathname();
  const listRef = useRef<HTMLUListElement>(null);
  const [more, setMore] = useState({ left: false, right: false });
  const isOn = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const update = () =>
      setMore({ left: list.scrollLeft > 4, right: list.scrollLeft + list.clientWidth < list.scrollWidth - 4 });
    // 처음 한 번, 그리고 줄이나 탭 크기가 바뀔 때마다(글꼴이 늦게 도착해 글자 폭이 달라질 때 포함) 불린다
    const ro = new ResizeObserver(update);
    ro.observe(list);
    for (const li of list.children) ro.observe(li);
    list.addEventListener("scroll", update, { passive: true });
    return () => {
      ro.disconnect();
      list.removeEventListener("scroll", update);
    };
  }, []);

  useEffect(() => {
    const list = listRef.current;
    const on = list?.querySelector<HTMLElement>('[aria-current="page"]');
    if (!list || !on) return;
    const right = on.offsetLeft + on.offsetWidth;
    if (on.offsetLeft < list.scrollLeft || right > list.scrollLeft + list.clientWidth) list.scrollLeft = right - list.clientWidth + 8;
  }, [pathname]);

  const fade = "pointer-events-none absolute inset-y-0 flex w-12 items-center transition-opacity";
  return (
    <nav aria-label="주요 메뉴" className={`relative ${className}`}>
      <ul
        ref={listRef}
        className="relative flex max-w-full gap-1 overflow-x-auto rounded-full bg-chip p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => {
          const on = isOn(item.href);
          return (
            <li key={item.href} className="shrink-0">
              <Link
                href={item.href}
                aria-current={on ? "page" : undefined}
                className={`inline-flex h-8 items-center whitespace-nowrap rounded-full px-3.5 text-[14.5px] font-bold transition-colors ${
                  on ? "bg-ink text-on-ink shadow-sm" : "text-ink-2 hover:bg-card hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
      <span aria-hidden className={`${fade} left-0 justify-start rounded-l-full bg-linear-to-r from-chip from-40% to-transparent pl-2 ${more.left ? "opacity-100" : "opacity-0"}`}>
        <Chevron flip />
      </span>
      <span aria-hidden className={`${fade} right-0 justify-end rounded-r-full bg-linear-to-l from-chip from-40% to-transparent pr-2 ${more.right ? "opacity-100" : "opacity-0"}`}>
        <Chevron />
      </span>
    </nav>
  );
}

function Chevron({ flip = false }: { flip?: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" className={`text-ink-3 ${flip ? "rotate-180" : ""}`}>
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}
