import type { MetadataRoute } from "next";
import { brand } from "@/lib/brand";

/** 앱 설치(홈 화면에 추가) 정보: 이름은 Grammate로 보인다. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: brand.appName,
    short_name: brand.appName,
    description: brand.description,
    lang: "ko",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#fbf8f3",
    theme_color: "#1f2a44",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icons/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
