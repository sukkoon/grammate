import type { Metadata, Viewport } from "next";
import { brand } from "@/lib/brand";
import { changa, nanumSquare } from "./fonts";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WordTooltipLayer } from "@/components/lesson/WordTooltipLayer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: `${brand.nameKo} · ${brand.tagline}`,
    template: `%s · ${brand.nameKo}`,
  },
  description: brand.description,
  applicationName: brand.nameKo,
  openGraph: {
    title: `${brand.nameKo} (${brand.name})`,
    description: brand.description,
    locale: "ko_KR",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbf8f3" },
    { media: "(prefers-color-scheme: dark)", color: "#121828" },
  ],
};

// 저장된 테마를 첫 화면이 그려지기 전에 적용해 깜빡임을 막는다.
const themeScript = `try{var t=localStorage.getItem('gm-theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${changa.variable} ${nanumSquare.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-card focus:px-4 focus:py-2"
        >
          본문으로 바로가기
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <WordTooltipLayer />
      </body>
    </html>
  );
}
