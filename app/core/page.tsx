import { redirect } from "next/navigation";

/** 예전 '핵심 문법' 주소. 내용이 전체 목차와 겹쳐서 전체 목차의 장 지도로 합쳤다. */
export default function CorePage() {
  redirect("/learn#map");
}
