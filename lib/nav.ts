/** 머리글 메뉴. 이름은 모두 짧은 명사형(2어절 이내)으로 맞춘다. 휴대폰·태블릿에서는 이 순서대로 옆으로 밀어 옮겨 다닌다. */
export const navItems = [
  { href: "/", label: "그래머랑 소개" },
  { href: "/learn", label: "전체 목차" },
  { href: "/terms", label: "용어 사전" },
  { href: "/start", label: "각 단원별 학습" },
  { href: "/roadmap", label: "필수 문법" },
  { href: "/me", label: "내 공부" },
];

/** 메뉴 화면에서 옆으로 밀 때 갈 곳. 끝에 닿으면 반대쪽 끝으로 이어진다. 메뉴 화면이 아니면 null */
export function menuNeighbors(path: string) {
  const i = navItems.findIndex((it) => it.href === path);
  if (i < 0) return null;
  const n = navItems.length;
  return { prev: navItems[(i - 1 + n) % n], next: navItems[(i + 1) % n] };
}
