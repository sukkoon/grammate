"""나눠서 쓴 콘텐츠 조각을 한곳에 합친다.

  python scripts/merge-drafts.py

- content/lexicon/patches/*.json        → words.json
- content/lexicon/patches/*.forms.json  → forms.json
- content/terms-patches/*.json          → content/terms.ts (같은 id가 있으면 건너뜀)
- components/illustrations/<장>.tsx      → index.tsx에 export * 추가
- content/lessons/<장>/<단원>.mdx가 있으면 curriculum.ts에서 그 단원을 공개(ready)로
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


def archive(p: Path) -> None:
    dest = p.parent / "merged"
    dest.mkdir(exist_ok=True)
    shutil.move(str(p), str(dest / p.name))


def merge_lexicon() -> None:
    words = json.loads((LEX / "words.json").read_text(encoding="utf-8"))
    forms = json.loads((LEX / "forms.json").read_text(encoding="utf-8"))
    if not PATCHES.exists():
        return
    for p in sorted(PATCHES.glob("*.json")):
        data = json.loads(p.read_text(encoding="utf-8"))
        target = forms if p.name.endswith(".forms.json") else words
        added = [k for k in data if k not in target]
        target.update(data)
        print(f"  {p.name}: {len(data)}개 (새 항목 {len(added)}개)")
        archive(p)
    (LEX / "words.json").write_text(json.dumps(words, ensure_ascii=False), encoding="utf-8")
    (LEX / "forms.json").write_text(json.dumps(forms, ensure_ascii=False), encoding="utf-8")
    # 정렬·중복 정리
    subprocess.run([sys.executable, str(ROOT / "scripts" / "lexicon.py"), "fmt"], check=True)


def ts_literal(obj) -> str:
    return json.dumps(obj, ensure_ascii=False, indent=2).replace("\n", "\n  ")


def merge_terms() -> None:
    if not TERMS_PATCHES.exists():
        return
    src = TERMS.read_text(encoding="utf-8")
    have = set(re.findall(r'id: "([^"]+)"', src))
    marker = "\n];\n\nexport const termById"
    assert marker in src, "terms.ts 끝 표시를 찾지 못했어요"
    chunks = []
    for p in sorted(TERMS_PATCHES.glob("*.json")):
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
        if p.name in ("index.tsx", "icons.tsx"):
            continue
        line = f'export * from "./{p.stem}";'
        if line not in src:
            src = src.rstrip() + "\n" + line + "\n"
            print(f"  그림 연결: {p.name}")
    index.write_text(src, encoding="utf-8")


def publish_units() -> None:
    src = CURR.read_text(encoding="utf-8")
    count = 0
    # 장 slug 안에 있는 단원들을 찾아, MDX가 있으면 ready로
    for chap in re.finditer(r'slug: "([^"]+)",\s*title: "[^"]*",\s*hook: "[^"]*",\s*units: \[(.*?)\n\s*\],', src, re.S):
        slug = chap.group(1)
        block = chap.group(2)
        new_block = block
        for m in re.finditer(r'u\("([^"]+)",([^\n]*?)\)(,?)\n', block):
            unit, args, comma = m.group(1), m.group(2), m.group(3)
            exists = (LESSONS / slug / f"{unit}.mdx").exists()
            ready = args.rstrip().endswith(", true")
            if exists and not ready:
                new_block = new_block.replace(m.group(0), f'u("{unit}",{args}, true){comma}\n', 1)
                count += 1
        src = src.replace(block, new_block, 1)
    CURR.write_text(src, encoding="utf-8")
    print(f"  새로 공개한 단원: {count}개")


if __name__ == "__main__":
    print("사전 합치기")
    merge_lexicon()
    print("용어 합치기")
    merge_terms()
    print("그림 연결")
    link_illustrations()
    print("단원 공개")
    publish_units()
