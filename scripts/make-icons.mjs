// 앱 설치(홈 화면에 추가)용 PNG 아이콘을 로고 SVG에서 만든다.
//   node scripts/make-icons.mjs
import sharp from "sharp";
import { readFileSync } from "node:fs";

const G = `<path d="M48.5 16.5 A21 21 0 1 0 53 34 H42" stroke="#FBF8F3" stroke-width="7.5"/><circle cx="24" cy="25" r="3.5" fill="#FBF8F3"/><path d="M30 25.5 Q33.5 21.5 37 25.5" stroke="#F0735F" stroke-width="4"/>`;
const rounded = readFileSync("app/icon.svg");
// 마스크 아이콘은 안드로이드가 원·물방울 등으로 잘라 내므로 배경을 꽉 채우고 G를 가운데 작게 둔다.
const maskable = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="#1F2A44"/><g transform="translate(14 14) scale(0.5625)" fill="none" stroke-linecap="round">${G}</g></svg>`,
);
// 애플 터치 아이콘은 iOS가 모서리를 둥글게 깎으므로 사각 배경으로.
const square = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="#1F2A44"/><g transform="translate(9 9) scale(0.72)" fill="none" stroke-linecap="round">${G}</g></svg>`,
);

const out = [
  [rounded, 192, "public/icons/icon-192.png"],
  [rounded, 512, "public/icons/icon-512.png"],
  [maskable, 512, "public/icons/maskable-512.png"],
  [square, 180, "app/apple-icon.png"],
];
for (const [src, size, file] of out) {
  await sharp(src, { density: 1200 }).resize(size, size).png().toFile(file);
  console.log(file);
}
