/** 옆으로 밀어 메뉴 옮기기: 메뉴 순서대로, 끝에 닿으면 반대쪽 끝으로 이어진다 */
import { describe, expect, it } from "vitest";
import { menuNeighbors, navItems } from "@/lib/nav";

describe("메뉴 옆으로 밀기", () => {
  it("가운데 메뉴는 앞뒤 메뉴로 간다", () => {
    const m = menuNeighbors("/terms");
    expect(m?.prev.href).toBe("/learn");
    expect(m?.next.href).toBe("/start");
  });

  it("마지막 메뉴 다음은 처음 메뉴, 처음 메뉴 이전은 마지막 메뉴", () => {
    expect(menuNeighbors(navItems[navItems.length - 1].href)?.next.href).toBe(navItems[0].href);
    expect(menuNeighbors(navItems[0].href)?.prev.href).toBe(navItems[navItems.length - 1].href);
  });

  it("같은 쪽으로 계속 밀면 모든 메뉴를 돌아 제자리로 온다", () => {
    let at = navItems[0].href;
    const seen = [at];
    for (let i = 0; i < navItems.length; i++) {
      at = menuNeighbors(at)!.next.href;
      seen.push(at);
    }
    expect(seen.slice(0, -1).sort()).toEqual(navItems.map((n) => n.href).sort());
    expect(at).toBe(navItems[0].href);
  });

  it("메뉴가 아닌 화면(단원 등)은 메뉴 순서를 쓰지 않는다", () => {
    expect(menuNeighbors("/learn/articles/a-an")).toBeNull();
  });
});
