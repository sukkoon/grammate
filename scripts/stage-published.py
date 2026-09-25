"""커밋 준비: 바뀐 파일을 모두 올리되, 아직 공개하지 않은 장(작성 중인 초안)의 파일은 뺀다.

  python scripts/stage-published.py
"""
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
cur = (ROOT / "content/curriculum.ts").read_text(encoding="utf-8")

# 장(slug) 단위로 나눠, 공개된 단원(..., true))이 하나라도 있으면 공개된 장이다.
published, drafts = set(), set()
for block in re.split(r'\n\s+slug: "', cur)[1:]:
    slug = block.split('"', 1)[0]
    (published if re.search(r",\s*true\)", block) else drafts).add(slug)


def chapter_of(path: str) -> str | None:
    p = path.replace("\\", "/")
    for pat in (
        r"^content/lessons/([^/]+)/",
        r"^components/illustrations/([^/.]+)\.tsx$",
        r"^content/faq/([^/.]+)\.json$",
        r"^content/lexicon/patches/([^/.]+)(?:\.forms)?\.json$",
        r"^content/terms-patches/([^/.]+)\.json$",
    ):
        m = re.match(pat, p)
        if m:
            return m.group(1)
    return None


def git(*args: str) -> str:
    return subprocess.run(["git", *args], cwd=ROOT, check=True, capture_output=True, text=True, encoding="utf-8").stdout


git("add", "-A")
staged = [l for l in git("diff", "--cached", "--name-only").splitlines() if l]
# 작성 중인 장의 파일과 에이전트의 임시 검사 파일(tests/zz-*)은 올리지 않는다
held = [f for f in staged if chapter_of(f) in drafts or f.replace("\\", "/").startswith("tests/zz-")]
if held:
    git("reset", "-q", "--", *held)
print(f"올린 파일 {len(staged) - len(held)}개, 초안이라 뺀 파일 {len(held)}개")
for f in held:
    print("  제외:", f)
sys.exit(0)
