import Link from "next/link";
import { Mate, Wordmark } from "@/components/brand/Mate";
import { brand } from "@/lib/brand";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 pb-24 pt-10 text-[15px] text-ink-2 sm:flex-row sm:items-start sm:justify-between sm:px-6">
        <div className="flex items-start gap-3">
          <Mate size={36} className="text-ink" mood="happy" />
          <div>
            <Wordmark className="text-xl text-ink" />
            <p className="mt-1">{brand.promise}</p>
          </div>
        </div>
        <nav aria-label="바닥글" className="flex flex-wrap gap-x-5 gap-y-2">
          <Link href="/policy/privacy" className="font-bold hover:text-ink">개인정보처리방침</Link>
          <Link href="/policy/tos" className="hover:text-ink">이용약관</Link>
        </nav>
      </div>
    </footer>
  );
}
