"""단어 사전(content/lexicon/*.json) 정리 도구.

사용법:
  python scripts/lexicon.py fmt                 # 정렬하고 한 줄에 한 항목으로 다시 쓰기
  python scripts/lexicon.py add patch.json      # patch.json의 항목을 words.json에 합치기 (같은 키는 덮어씀)
  python scripts/lexicon.py add-forms patch.json
"""

import json
import sys
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent / "content" / "lexicon"
WORDS = ROOT / "words.json"
FORMS = ROOT / "forms.json"


def load(path: Path) -> dict:
    pairs = json.loads(path.read_text(encoding="utf-8"), object_pairs_hook=lambda kv: kv)
    seen = {}
    for k, v in pairs:
        if k in seen:
            print(f"  중복 키 정리: {k}")
        seen[k] = v
    return seen


def write(path: Path, data: dict) -> None:
    keys = sorted(data, key=lambda k: (k.lower(), k))
    lines = [f"  {json.dumps(k, ensure_ascii=False)}: {json.dumps(data[k], ensure_ascii=False)}" for k in keys]
    text = "{\n" + ",\n".join(lines) + "\n}\n"
    # 검사 도구 같은 다른 프로그램이 잠깐 파일을 쥐고 있으면 실패할 수 있어서 몇 번 다시 시도한다.
    for attempt in range(5):
        try:
            path.write_text(text, encoding="utf-8")
            break
        except OSError:
            if attempt == 4:
                raise
            time.sleep(1)
    print(f"{path.name}: {len(keys)}개 항목")


def main() -> None:
    cmd = sys.argv[1] if len(sys.argv) > 1 else "fmt"
    words, forms = load(WORDS), load(FORMS)
    if cmd == "add":
        words.update(load(Path(sys.argv[2])))
    elif cmd == "add-forms":
        forms.update(load(Path(sys.argv[2])))
    shadowed = [k for k in forms if k in words]
    for k in shadowed:
        print(f"  forms.json의 '{k}'는 words.json 항목에 가려져 쓰이지 않아요")
    dangling = [k for k, v in forms.items() if v[0] not in words]
    for k in dangling:
        print(f"  forms.json의 '{k}' → 원형 '{forms[k][0]}'가 words.json에 없어요")
    write(WORDS, words)
    write(FORMS, forms)


if __name__ == "__main__":
    main()
