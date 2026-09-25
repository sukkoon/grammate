import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

/**
 * 자연스러운 음성(신경망 TTS). 브라우저 내장 음성 대신, 따뜻하고 차분한 과외 선생님 목소리로 읽어 준다.
 *
 * 환경 변수(Vercel에 넣는다):
 * - OPENAI_API_KEY            → OpenAI gpt-4o-mini-tts (말투 지시 가능). TTS_VOICE로 목소리 이름(기본 sage)
 * - AZURE_SPEECH_KEY + AZURE_SPEECH_REGION → Microsoft 신경망 음성 (한국어 SunHi, 영어 Jenny)
 * 둘 다 없으면 404를 돌려주고, 화면은 브라우저 내장 음성으로 되돌아간다.
 *
 * 로그인한 사람만 쓸 수 있다(요청에 Supabase 접근 토큰). 남이 마구 부르지 못하게 하기 위해서다.
 */
export const runtime = "nodejs";

const MAX_CHARS = 600;

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://nsfwfnwpioyypccgdxab.supabase.co";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "sb_publishable_MEdm2sQb8Tq2H9BgXYukGw_yzcwkZxg";

/** 과외 선생님 말투 지시 (OpenAI) */
const STYLE: Record<"ko-KR" | "en-US", string> = {
  "ko-KR":
    "당신은 학생 옆에 앉아 설명해 주는 친절한 여자 과외 선생님입니다. 따뜻하고 차분하게, 너무 빠르지 않게, 문장 사이에 자연스럽게 쉬어 가며 읽어 주세요. 기계처럼 딱딱하지 않게, 다정한 말투로.",
  "en-US":
    "You are a warm, gentle female tutor sitting next to a Korean student. Read the English sentence clearly and a little slowly, with natural pauses, in a kind and calm voice.",
};

async function verifyUser(req: Request): Promise<boolean> {
  if (process.env.TTS_PUBLIC === "1") return true;
  const token = (req.headers.get("authorization") ?? "").replace(/^Bearer\s+/i, "");
  if (!token) return false;
  const sb = createClient(SUPABASE_URL, SUPABASE_KEY, { auth: { persistSession: false, autoRefreshToken: false } });
  const { data, error } = await sb.auth.getUser(token);
  return !error && !!data.user;
}

async function openai(text: string, lang: "ko-KR" | "en-US", key: string): Promise<Response> {
  const r = await fetch("https://api.openai.com/v1/audio/speech", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: process.env.TTS_MODEL || "gpt-4o-mini-tts",
      voice: process.env.TTS_VOICE || "sage",
      input: text,
      instructions: STYLE[lang],
      response_format: "mp3",
      speed: lang === "en-US" ? 0.95 : 1,
    }),
  });
  if (!r.ok) throw new Error(`openai ${r.status} ${(await r.text()).slice(0, 200)}`);
  return new Response(r.body, { headers: { "Content-Type": "audio/mpeg", "Cache-Control": "private, max-age=86400" } });
}

async function azure(text: string, lang: "ko-KR" | "en-US", key: string, region: string): Promise<Response> {
  const voice = lang === "ko-KR" ? process.env.AZURE_VOICE_KO || "ko-KR-SunHiNeural" : process.env.AZURE_VOICE_EN || "en-US-JennyNeural";
  const esc = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const inner =
    lang === "en-US"
      ? `<mstts:express-as style="friendly"><prosody rate="-8%" pitch="+2%">${esc}</prosody></mstts:express-as>`
      : `<prosody rate="-4%" pitch="+2%">${esc}</prosody>`;
  const ssml = `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="https://www.w3.org/2001/mstts" xml:lang="${lang}"><voice name="${voice}">${inner}</voice></speak>`;
  const r = await fetch(`https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`, {
    method: "POST",
    headers: {
      "Ocp-Apim-Subscription-Key": key,
      "Content-Type": "application/ssml+xml",
      "X-Microsoft-OutputFormat": "audio-24khz-48kbitrate-mono-mp3",
      "User-Agent": "grammarang",
    },
    body: ssml,
  });
  if (!r.ok) throw new Error(`azure ${r.status} ${(await r.text()).slice(0, 200)}`);
  return new Response(r.body, { headers: { "Content-Type": "audio/mpeg", "Cache-Control": "private, max-age=86400" } });
}

export async function POST(req: Request) {
  const openaiKey = process.env.OPENAI_API_KEY;
  const azureKey = process.env.AZURE_SPEECH_KEY;
  const azureRegion = process.env.AZURE_SPEECH_REGION;
  if (!openaiKey && !(azureKey && azureRegion)) return NextResponse.json({ off: true }, { status: 404 });

  let body: { text?: unknown; lang?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }
  const text = String(body.text ?? "").trim().slice(0, MAX_CHARS);
  const lang: "ko-KR" | "en-US" = body.lang === "en-US" ? "en-US" : "ko-KR";
  if (!text) return NextResponse.json({ error: "empty" }, { status: 400 });
  if (!(await verifyUser(req))) return NextResponse.json({ error: "login required" }, { status: 401 });

  try {
    const prefer = process.env.TTS_PROVIDER;
    if ((prefer === "azure" || !openaiKey) && azureKey && azureRegion) return await azure(text, lang, azureKey, azureRegion);
    if (openaiKey) return await openai(text, lang, openaiKey);
    return await azure(text, lang, azureKey!, azureRegion!);
  } catch (e) {
    console.error("tts", e);
    return NextResponse.json({ error: "tts failed" }, { status: 502 });
  }
}
