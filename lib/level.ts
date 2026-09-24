import type { Level } from "@/content/curriculum";

/** 학생이 고르는 수준: 초등 / 중등 / 고등 */
export type Band = "elem" | "middle" | "high";

export const BANDS: Band[] = ["elem", "middle", "high"];

export const bandLabel: Record<Band, string> = { elem: "초등", middle: "중등", high: "고등" };

export const bandDesc: Record<Band, string> = {
  elem: "핵심만 쉬운 말로. 어려운 내용은 접어 둬요.",
  middle: "내신 포인트와 중학 심화까지.",
  high: "수능 어법까지 전부 펼쳐요.",
};

export const bandRank = (b: Band) => BANDS.indexOf(b);

export function bandOf(level: Level): Band {
  if (level === "초등") return "elem";
  if (level.startsWith("중")) return "middle";
  return "high";
}

/** 단원 학년 목록 중 가장 낮은 수준 */
export const minBand = (levels: Level[]): Band =>
  levels.map(bandOf).sort((a, b) => bandRank(a) - bandRank(b))[0] ?? "elem";

export const LEVEL_KEY = "gm-level";
export const LEVEL_EVENT = "gm-level";
export const DEFAULT_BAND: Band = "middle";

/** 첫 화면이 그려지기 전에 저장된 수준을 <html data-level>에 적용하는 스크립트 */
export const levelScript = `try{var l=localStorage.getItem('${LEVEL_KEY}');var d=document.documentElement;if(l==='elem'||l==='middle'||l==='high'){d.dataset.level=l;d.dataset.levelSet='1'}else{d.dataset.level='${DEFAULT_BAND}'}}catch(e){document.documentElement.dataset.level='${DEFAULT_BAND}'}`;
