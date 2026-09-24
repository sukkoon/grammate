import Link from "next/link";
import { Logo } from "@/components/brand/Mate";
import { ThemeToggle } from "./ThemeToggle";
import { MobileMenu } from "./MobileMenu";
import { LevelSwitch } from "@/components/level/LevelSwitch";

export const navItems = [
  { href: "/learn", label: "전체 목차" },
  { href: "/terms", label: "용어 사전" },
  { href: "/me", label: "내 공부" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-bg/90 backdrop-blur supports-[backdrop-filter]:bg-bg/75">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" aria-label="그래메이트 홈" className="rounded-lg">
          <Logo size={32} />
        </Link>
        <nav aria-label="주요 메뉴" className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-[15px] font-bold text-ink-2 transition-colors hover:bg-chip hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
          <span className="ml-1">
            <LevelSwitch />
          </span>
          <ThemeToggle />
        </nav>
        <div className="flex items-center gap-1 md:hidden">
          <LevelSwitch />
          <ThemeToggle />
          <MobileMenu items={navItems} />
        </div>
      </div>
    </header>
  );
}
