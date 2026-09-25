import Link from "next/link";
import { Logo } from "@/components/brand/Mate";
import { brand } from "@/lib/brand";
import { ThemeToggle } from "./ThemeToggle";
import { NavTabs } from "./NavTabs";

export const navItems = [
  { href: "/", label: "첫 페이지" },
  { href: "/learn/intro/reading-terms", label: "처음부터 배우기" },
  { href: "/learn", label: "전체 목차" },
  { href: "/terms", label: "용어 사전" },
  { href: "/roadmap", label: "필수 문법" },
  { href: "/me", label: "내 공부" },
];

/** 넓은 화면: 로고 오른쪽에 탭. 좁은 화면: 로고 아래 줄에 탭(옆으로 밀어서 보기). */
export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-bg/90 backdrop-blur supports-[backdrop-filter]:bg-bg/75">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-16">
        <Link href="/" aria-label="그래머랑 홈" className="shrink-0 rounded-lg">
          <Logo size={36} tagline={brand.tagline} />
        </Link>
        <div className="flex min-w-0 items-center gap-2">
          <NavTabs items={navItems} className="hidden lg:block" />
          <ThemeToggle />
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl px-4 pb-2.5 sm:px-6 lg:hidden">
        <NavTabs items={navItems} className="min-w-0" />
      </div>
    </header>
  );
}
