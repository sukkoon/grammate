import Link from "next/link";
import { Mate, Wordmark } from "@/components/brand/Mate";
import { brand } from "@/lib/brand";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 text-[15px] text-ink-2 sm:flex-row sm:items-start sm:justify-between sm:px-6">
        <div className="flex items-start gap-3">
          <Mate size={36} className="text-ink" mood="happy" />
          <div>
            <Wordmark className="text-xl text-ink" />
            <p className="mt-1">{brand.promise}</p>
          </div>
        </div>
        <nav aria-label="바닥글" className="flex flex-wrap gap-x-5 gap-y-2">
          <Link href="/learn" className="hover:text-ink">전체 목차</Link>
          <Link href="/terms" className="hover:text-ink">용어 사전</Link>
          <Link href="/policy/privacy" className="font-bold hover:text-ink">개인정보처리방침</Link>
          <Link href="/policy/tos" className="hover:text-ink">이용약관</Link>
        </nav>
      </div>
      <p className="mx-auto max-w-6xl px-4 pb-8 text-[13px] text-ink-3 sm:px-6">
        예문의 단어 뜻은 문맥에 맞게 직접 정리했어요. 더 많은 뜻은 네이버 영어사전에서 확인할 수 있어요.
      </p>
    </footer>
  );
}
