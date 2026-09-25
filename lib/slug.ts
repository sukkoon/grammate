/** 소제목 글을 주소의 # 뒤에 붙일 수 있는 id로 바꾼다. 한글은 그대로 두고, 기호와 공백은 -로. */
export function headingId(text: string): string {
  return text
    .normalize("NFC")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

/** 검색 비교용: 소문자, 공백 제거 */
export const norm = (s: string) => s.toLowerCase().replace(/\s+/g, "");
