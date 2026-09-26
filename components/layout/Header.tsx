import Link from "next/link";
import { Logo } from "@/components/brand/Mate";
import { brand } from "@/lib/brand";
import { ThemeToggle } from "./ThemeToggle";
import { NavMenu } from "./NavMenu";
import { InstallButton } from "@/components/pwa/InstallButton";
import { AuthStatus } from "@/components/auth/AuthStatus";
import { SearchBox } from "@/components/search/SearchBox";
import { navItems } from "@/lib/nav";


/** 로고는 왼쪽, 오른쪽에 드롭다운 목차와 화면 밝기 단추. */
export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-bg/90 backdrop-blur supports-[backdrop-filter]:bg-bg/75">
      {/* 휴대폰(640px 미만)에서는 머리글 단추를 32px로, 사이 간격을 좁혀 글자 로고와 단추들이 360px 화면에도 한 줄에 들어가게 한다 (로그인 전후 같은 크기) */}
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-1.5 px-3 sm:gap-4 sm:px-6 lg:h-16">
        <Link href="/" aria-label="그래머랑 홈" className="shrink-0 rounded-lg">
          <Logo tagline={brand.tagline} />
        </Link>
        <div className="flex min-w-0 shrink-0 items-center gap-[3px] sm:gap-2">
          <SearchBox />
          <NavMenu items={navItems} />
          <AuthStatus />
          <ThemeToggle />
          <InstallButton iconOnlyOnMobile />
        </div>
      </div>
    </header>
  );
}
