"use client";

import { useEffect, useState } from "react";
import { brand } from "@/lib/brand";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

let deferred: BeforeInstallPromptEvent | null = null;
let registered = false;

/**
 * 앱 설치 단추. 크롬·엣지·삼성 브라우저는 바로 설치 창이 뜨고,
 * 아이폰 사파리는 '공유 → 홈 화면에 추가' 안내를 보여 준다. 이미 설치해서 앱으로 열었으면 숨긴다.
 */
export function InstallButton({ className = "", iconOnlyOnMobile = false }: { className?: string; iconOnlyOnMobile?: boolean }) {
  const [ready, setReady] = useState(false);
  const [standalone, setStandalone] = useState(false);
  const [ios, setIos] = useState(false);
  const [inApp, setInApp] = useState<"kakao" | "other" | null>(null);
  const [guide, setGuide] = useState(false);

  useEffect(() => {
    if (!registered && "serviceWorker" in navigator) {
      registered = true;
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
    const media = window.matchMedia("(display-mode: standalone)");
    const nav = navigator as Navigator & { standalone?: boolean };
    const ua = navigator.userAgent;
    setStandalone(media.matches || nav.standalone === true);
    setIos(/iphone|ipad|ipod/i.test(ua) && !/crios|fxios/i.test(ua));
    // 카카오톡·네이버·인스타그램 같은 앱 속 브라우저에서는 설치가 안 된다 → 진짜 브라우저로 열도록 안내
    setInApp(/kakaotalk/i.test(ua) ? "kakao" : /naver\(inapp|instagram|fban|fbav|line\//i.test(ua) ? "other" : null);
    setReady(deferred !== null);
    const onPrompt = (e: Event) => {
      e.preventDefault();
      deferred = e as BeforeInstallPromptEvent;
      setReady(true);
    };
    const onInstalled = () => {
      deferred = null;
      setReady(false);
      setStandalone(true);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (standalone) return null;

  /** 앱 속 브라우저에서 빠져나와 기본 브라우저로 이 주소를 연다 */
  function openInBrowser() {
    const url = location.href;
    if (inApp === "kakao") {
      location.href = `kakaotalk://web/openExternal?url=${encodeURIComponent(url)}`;
      return;
    }
    if (/android/i.test(navigator.userAgent)) {
      location.href = `intent://${location.host}${location.pathname}${location.search}#Intent;scheme=https;package=com.android.chrome;end`;
      return;
    }
    setGuide(true);
  }

  async function install() {
    if (inApp) {
      setGuide(true);
      return;
    }
    if (deferred) {
      await deferred.prompt();
      const { outcome } = await deferred.userChoice;
      if (outcome === "accepted") {
        deferred = null;
        setReady(false);
      }
      return;
    }
    setGuide(true);
  }

  return (
    <>
      <button
        type="button"
        onClick={install}
        aria-label={`${brand.appName} 앱 설치`}
        className={`inline-flex h-8 shrink-0 items-center gap-1.5 rounded-lg bg-coral sm:h-9 text-[13.5px] font-extrabold text-white transition-colors hover:bg-coral-ink ${iconOnlyOnMobile ? "w-8 justify-center px-0 sm:w-auto sm:px-3" : "px-3"} ${className}`}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M12 3v12M6 9l6 6 6-6M4 21h16" />
        </svg>
        <span className={iconOnlyOnMobile ? "hidden sm:inline" : ""}>앱 설치</span>
      </button>
      {guide && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="앱 설치 방법"
          className="fixed inset-0 z-50 grid place-items-center bg-ink/50 px-4"
          onClick={() => setGuide(false)}
        >
          <div className="w-full max-w-sm rounded-2xl bg-card p-5 text-ink shadow-xl" onClick={(e) => e.stopPropagation()}>
            <p className="text-[1.1rem] font-extrabold">{brand.appName} 앱으로 설치하기</p>
            {inApp ? (
              <>
                <p className="mt-3 text-[14.5px] text-ink-2">
                  {inApp === "kakao" ? "카카오톡 안의 브라우저" : "앱 안의 브라우저"}에서는 앱을 설치할 수 없어요. 아래 단추로 {ios ? "Safari" : "크롬"}에서 연 다음, 거기서 다시 ‘앱 설치’를 눌러 주세요.
                </p>
                <button type="button" onClick={openInBrowser} className="mt-3 h-11 w-full rounded-lg bg-coral text-[15px] font-extrabold text-white">
                  {ios ? "Safari로 열기" : "크롬으로 열기"}
                </button>
                <p className="mt-2 text-[12.5px] text-ink-3">
                  단추가 안 되면 화면 {ios ? "오른쪽 아래" : "오른쪽 위"} 메뉴(⋮ 또는 ⋯)에서 ‘다른 브라우저로 열기’를 골라 주세요.
                </p>
              </>
            ) : ios ? (
              <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-[14.5px] text-ink-2">
                <li>
                  아래 가운데의 <b className="text-ink">공유</b> 단추(네모에서 화살표가 나가는 모양)를 눌러요.
                </li>
                <li>
                  목록에서 <b className="text-ink">홈 화면에 추가</b>를 골라요.
                </li>
                <li>
                  오른쪽 위 <b className="text-ink">추가</b>를 누르면 홈 화면에 {brand.appName}이 생겨요.
                </li>
              </ol>
            ) : (
              <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-[14.5px] text-ink-2">
                <li>브라우저 메뉴(⋮ 또는 ⋯)를 열어요.</li>
                <li>
                  <b className="text-ink">앱 설치</b> 또는 <b className="text-ink">홈 화면에 추가</b>를 골라요.
                </li>
                <li>{ready ? "설치 창이 뜨면 ‘설치’를 눌러요." : "이 브라우저에서 설치를 지원하지 않으면 크롬이나 엣지로 열어 주세요."}</li>
              </ol>
            )}
            <button type="button" onClick={() => setGuide(false)} className="mt-4 h-10 w-full rounded-lg bg-ink font-bold text-on-ink">
              알겠어요
            </button>
          </div>
        </div>
      )}
    </>
  );
}
