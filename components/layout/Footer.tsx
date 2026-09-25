import Link from "next/link";

/** 바닥글: 오른쪽 아래에 작은 글씨로 정책 링크만 둔다 */
export function Footer() {
  return (
    <footer className="mt-20 border-t border-line">
      <div className="mx-auto flex max-w-6xl justify-end px-4 pb-24 pt-5 sm:px-6">
        <nav aria-label="바닥글" className="flex flex-wrap gap-x-4 gap-y-1 text-[12.5px] text-ink-3">
          <Link href="/policy/privacy" className="font-bold hover:text-ink">
            개인정보처리방침
          </Link>
          <Link href="/policy/tos" className="hover:text-ink">
            이용약관
          </Link>
        </nav>
      </div>
    </footer>
  );
}
