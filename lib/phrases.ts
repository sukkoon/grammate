/**
 * 한글 문장을 '의미 단위'(구·절)로 나눈다.
 * 화면 폭이 좁아 줄이 바뀔 때 어절 중간이나 어색한 자리가 아니라 의미 덩어리 사이에서 바뀌도록,
 * 나눈 덩어리를 inline-block으로 감싸서 쓴다(components/text/Phrases.tsx).
 *
 * 끊는 자리(우선순위 순):
 * 1. 문장 부호(. , ! ? … :) 뒤 — 항상
 * 2. 연결 어미(-고, -면, -서, -니까, -지만, -는데…)로 끝난 어절 뒤 — 덩어리가 아주 짧지 않으면
 * 3. 조사(은/는/이/가/을/를/에/로/와/과/도/의…)로 끝난 어절 뒤 — 덩어리가 어느 정도 길면
 * 4. 그래도 너무 길면 어절 사이 아무 데서나
 */
const PUNCT = /[.,!?…:;]["')\]」』”’]*$/;
const CONNECTIVE = /(고|며|면|서|니까|지만|는데|은데|다가|려고|도록|라서|라면|이면|되면|더니|든지|거나|다면)["')\]」』”’]*$/;
const PARTICLE =
  /(은|는|이|가|을|를|에|에서|에게|께|로|으로|와|과|도|의|만|까지|부터|처럼|보다|이나|마다|라도|밖에|조차|마저|에는|에서는|으로는|로는|께서|한테)["')\]」』”’]*$/;

const MIN_CONNECTIVE = 4; // 이보다 짧은 덩어리는 연결 어미 뒤라도 붙인다
const MIN_PARTICLE = 7; // 이보다 짧은 덩어리는 조사 뒤라도 붙인다
const MAX = 16; // 이보다 길면 어절 사이에서 끊는다
const TINY = 3; // 마지막 덩어리가 이보다 짧으면 앞 덩어리에 붙인다

export function splitPhrases(text: string): string[] {
  const words = text.trim().split(/\s+/).filter(Boolean);
  const out: string[] = [];
  let cur: string[] = [];
  let len = 0;
  const flush = () => {
    if (cur.length) out.push(cur.join(" "));
    cur = [];
    len = 0;
  };
  for (let i = 0; i < words.length; i++) {
    const w = words[i];
    const next = words[i + 1];
    if (len > 0 && len + 1 + w.length > MAX) flush();
    cur.push(w);
    len += (len ? 1 : 0) + w.length;
    if (!next) break;
    if (PUNCT.test(w)) flush();
    else if (len >= MIN_CONNECTIVE && CONNECTIVE.test(w)) flush();
    else if (len >= MIN_PARTICLE && PARTICLE.test(w)) flush();
  }
  flush();
  // 끝에 남은 짧은 꼬리('돼요.' 같은)는 앞에 붙인다
  if (out.length > 1 && out[out.length - 1].length <= TINY) {
    const tail = out.pop()!;
    out[out.length - 1] += ` ${tail}`;
  }
  return out;
}
