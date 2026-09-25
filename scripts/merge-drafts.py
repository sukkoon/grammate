"""나눠서 쓴 콘텐츠 조각을 한곳에 합친다.

  python scripts/merge-drafts.py                 # 모든 장
  python scripts/merge-drafts.py nouns comparison # 이 장들만

- content/lexicon/patches/<장>.json        → words.json
- content/lexicon/patches/<장>.forms.json  → forms.json
- content/terms-patches/<장>.json          → content/terms.ts (같은 id가 있으면 건너뜀)
- components/illustrations/<장>.tsx         → index.tsx에 export * 추가
- content/lessons/<장>/<단원>.mdx가 있으면 curriculum.ts에서 그 단원을 공개(ready)로
- 공개된 단원이 있는 장의 content/faq/<장>.json을 content/faq/index.ts에 연결
합친 패치 파일은 patches/merged/ 로 옮겨 둔다.
"""

import json
import re
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
LEX = ROOT / "content" / "lexicon"
PATCHES = LEX / "patches"
TERMS_PATCHES = ROOT / "content" / "terms-patches"
ILLU = ROOT / "components" / "illustrations"
LESSONS = ROOT / "content" / "lessons"
CURR = ROOT / "content" / "curriculum.ts"
TERMS = ROOT / "content" / "terms.ts"
FAQ = ROOT / "content" / "faq"

ONLY: set[str] = set(sys.argv[1:])

# curriculum.ts의 장 하나: slug, title, hook, units: [ ... ],
CHAPTER_RE = re.compile(r'slug: "([^"]+)",\s*title: "[^"]*",\s*hook: "[^"]*",\s*units: \[(.*?)\n\s*\],', re.S)
# 장의 마지막 단원은 줄바꿈 없이 블록이 끝나므로 뒤를 내다보기로 확인한다
# u("slug", "제목", "요약", ["학년"], true): 한 줄에 여러 개가 있어도 하나씩 잡는다
UNIT_RE = re.compile(r'u\("([^"]+)",((?:\s*"[^"]*",){2}\s*\[[^\]]*\](?:,\s*true)?)\)')


def wanted(stem: str) -> bool:
    """장 이름으로 걸러낸다. nouns.forms.json의 장은 nouns."""
    return not ONLY or stem.split(".")[0] in ONLY


def archive(p: Path) -> None:
    dest = p.parent / "merged"
    dest.mkdir(exist_ok=True)
    shutil.move(str(p), str(dest / p.name))


def merge_lexicon() -> None:
    if not PATCHES.exists():
        return
    words = json.loads((LEX / "words.json").read_text(encoding="utf-8"))
    forms = json.loads((LEX / "forms.json").read_text(encoding="utf-8"))
    changed = False
    for p in sorted(PATCHES.glob("*.json")):
        if not wanted(p.stem):
            continue
        data = json.loads(p.read_text(encoding="utf-8"))
        target = forms if p.name.endswith(".forms.json") else words
        added = [k for k in data if k not in target]
        target.update(data)
        changed = True
        print(f"  {p.name}: {len(data)}개 (새 항목 {len(added)}개)")
        archive(p)
    if changed:
        (LEX / "words.json").write_text(json.dumps(words, ensure_ascii=False), encoding="utf-8")
        (LEX / "forms.json").write_text(json.dumps(forms, ensure_ascii=False), encoding="utf-8")
        subprocess.run([sys.executable, str(ROOT / "scripts" / "lexicon.py"), "fmt"], check=True)


def ts_literal(obj) -> str:
    return json.dumps(obj, ensure_ascii=False, indent=2).replace("\n", "\n  ")


def merge_terms() -> None:
    if not TERMS_PATCHES.exists():
        return
    src = TERMS.read_text(encoding="utf-8")
    have = set(re.findall(r'id: "([^"]+)"', src)) | set(re.findall(r'"id": "([^"]+)"', src))
    marker = "\n];\n\nexport const termById"
    assert marker in src, "terms.ts 끝 표시를 찾지 못했어요"
    chunks = []
    for p in sorted(TERMS_PATCHES.glob("*.json")):
        if not wanted(p.stem):
            continue
        items = json.loads(p.read_text(encoding="utf-8"))
        new = [t for t in items if t["id"] not in have]
        for t in new:
            have.add(t["id"])
            chunks.append("  " + ts_literal(t) + ",")
        print(f"  {p.name}: 용어 {len(items)}개 (새 용어 {len(new)}개)")
        archive(p)
    if chunks:
        src = src.replace(marker, "\n\n  // 추가된 용어\n" + "\n".join(chunks) + marker)
        TERMS.write_text(src, encoding="utf-8")


def link_illustrations() -> None:
    index = ILLU / "index.tsx"
    src = index.read_text(encoding="utf-8")
    for p in sorted(ILLU.glob("*.tsx")):
        if p.name in ("index.tsx", "icons.tsx") or not wanted(p.stem):
            continue
        line = f'export * from "./{p.stem}";'
        if line not in src:
            src = src.rstrip() + "\n" + line + "\n"
            print(f"  그림 연결: {p.name}")
    index.write_text(src, encoding="utf-8")


def publish_units() -> None:
    src = CURR.read_text(encoding="utf-8")
    count = 0
    for chap in CHAPTER_RE.finditer(src):
        slug, block = chap.group(1), chap.group(2)
        if not wanted(slug):
            continue
        new_block = block
        for m in UNIT_RE.finditer(block):
            unit, args = m.group(1), m.group(2)
            exists = (LESSONS / slug / f"{unit}.mdx").exists()
            ready = args.rstrip().endswith(", true")
            if exists and not ready:
                new_block = new_block.replace(m.group(0), f'u("{unit}",{args}, true)', 1)
                count += 1
        src = src.replace(block, new_block, 1)
    CURR.write_text(src, encoding="utf-8")
    print(f"  새로 공개한 단원: {count}개")


def link_faq() -> None:
    """공개된 단원이 하나라도 있는 장의 질문 은행만 index.ts에 넣는다 (쓰는 중인 장은 빼기)."""
    curr = CURR.read_text(encoding="utf-8")
    live = {c.group(1) for c in CHAPTER_RE.finditer(curr) if ", true)" in c.group(2)}
    files = [p for p in FAQ.glob("*.json") if p.stem in live]
    order = ["intro", "parts-of-speech"]  # 앞에 둘 장 (intro에 일반 질문이 들어 있다)
    files.sort(key=lambda p: (order.index(p.stem) if p.stem in order else len(order), p.stem))
    names = [re.sub(r"[^a-zA-Z0-9]", "_", p.stem) for p in files]
    lines = ['import type { FaqItem } from "@/lib/tutor/types";']
    lines += [f'import {n} from "./{p.name}";' for n, p in zip(names, files)]
    lines += [
        "",
        "/** 질문 도우미의 질문 은행. scripts/merge-drafts.py가 공개된 장의 content/faq/*.json을 모아 만든다. */",
        f"export const faq: FaqItem[] = [{', '.join('...' + n for n in names)}] as FaqItem[];",
    ]
    (FAQ / "index.ts").write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"  질문 은행 파일 {len(files)}개")


if __name__ == "__main__":
    print("사전 합치기")
    merge_lexicon()
    print("용어 합치기")
    merge_terms()
    print("그림 연결")
    link_illustrations()
    print("단원 공개")
    publish_units()
    print("질문 은행 연결")
    link_faq()
