// Grammarang 전화번호 계정 — 중복 확인 · 가입 · 로그인 · 비밀번호 찾기(메일로 6자리 인증번호)
// 배포: Supabase 프로젝트 sukkoon에 Edge Function 이름 gm-phone, verify_jwt 끔(공개 키로 부름).
import { createClient } from "npm:@supabase/supabase-js@2";

const SB_URL = Deno.env.get("SUPABASE_URL")!;
const ANON = Deno.env.get("SUPABASE_ANON_KEY")!;
const admin = createClient(SB_URL, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const DUP_PHONE = "이미 가입된 전화번호예요. 이 번호로 가입한 적이 있다면 로그인하거나 비밀번호 찾기를 해 주세요.";
const DUP_MAIL = "이미 가입에 쓰인 메일 주소예요. 다른 메일 주소를 적거나, 그 메일로 가입한 계정으로 로그인해 주세요.";
// 비밀번호 찾기 메일의 돌아올 주소로 허용하는 곳
const BACK_OK = /^https:\/\/[a-z0-9-]+\.vercel\.app\/|^http:\/\/(127\.0\.0\.1|localhost):3000\//;

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS, "Content-Type": "application/json; charset=utf-8" },
  });
}
function fail(code: string, message: string, status = 400) {
  return json({ ok: false, code, message }, status);
}

function normPhone(p: unknown): string | null {
  let d = String(p ?? "").replace(/[^0-9]/g, "");
  if (d.startsWith("82")) d = "0" + d.slice(2);
  return /^01[016789][0-9]{7,8}$/.test(d) ? d : null;
}
function normMail(m: unknown): string | null {
  const s = String(m ?? "").trim().toLowerCase();
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s) && s.length <= 254 ? s : null;
}
function maskMail(m: string): string {
  const [u, d] = m.split("@");
  return (u.length <= 2 ? u[0] + "*" : u.slice(0, 2) + "*".repeat(Math.min(6, u.length - 2))) + "@" + d;
}
const okPassword = (pw: unknown) => typeof pw === "string" && pw.length >= 8 && pw.length <= 72;
const hex = (buf: ArrayBuffer) => [...new Uint8Array(buf)].map((x) => x.toString(16).padStart(2, "0")).join("");

let SECRET: string | null = null;
async function signPhone(phone: string): Promise<string> {
  if (!SECRET) {
    const { data, error } = await admin.from("gm_secret").select("v").eq("k", "signup").single();
    if (error) throw error;
    SECRET = data.v as string;
  }
  const enc = new TextEncoder();
  const k = await crypto.subtle.importKey("raw", enc.encode(SECRET), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return hex(await crypto.subtle.sign("HMAC", k, enc.encode(phone)));
}

async function findByPhone(phone: string): Promise<{ id: string } | null> {
  const { data, error } = await admin.from("gm_profiles").select("id").eq("phone", phone).maybeSingle();
  if (error) throw error;
  return data;
}
async function mailOf(uid: string): Promise<string | null> {
  const { data, error } = await admin.auth.admin.getUserById(uid);
  if (error) throw error;
  return data?.user?.email || null;
}

async function auth(path: string, body: unknown, token?: string, method = "POST") {
  const r = await fetch(SB_URL + "/auth/v1" + path, {
    method,
    headers: { apikey: ANON, "Content-Type": "application/json", ...(token ? { Authorization: "Bearer " + token } : {}) },
    body: JSON.stringify(body),
  });
  const t = await r.text();
  let d: Record<string, unknown> = {};
  try {
    d = t ? JSON.parse(t) : {};
  } catch {
    d = { msg: t };
  }
  return { ok: r.ok, status: r.status, data: d, code: String(d.error_code || d.code || "") };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  if (req.method !== "POST") return fail("method", "POST 요청만 받아요", 405);
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return fail("body", "요청 형식이 올바르지 않아요");
  }
  const action = body?.action;
  try {
    const phone = normPhone(body.phone);
    if (!phone) return fail("phone", "아이디(전화번호)를 숫자만 입력해 주세요 (예: 01012345678)");

    if (action === "check") return json({ ok: true, exists: !!(await findByPhone(phone)) });

    if (action === "signup") {
      const mail = normMail(body.email);
      if (!mail) return fail("email", "비밀번호를 잊었을 때 쓸 메일 주소를 정확히 적어 주세요");
      if (!okPassword(body.password)) return fail("password", "비밀번호는 8자 이상으로 정해 주세요");
      const name = String(body.name ?? "").trim().slice(0, 20);
      if (await findByPhone(phone)) return fail("dup", DUP_PHONE, 409);
      const since = new Date(Date.now() - 3600e3).toISOString();
      const { count } = await admin.from("gm_profiles").select("id", { count: "exact", head: true }).gte("created_at", since);
      if ((count ?? 0) > 60) return fail("busy", "지금은 가입이 몰려 있어요. 잠시 뒤 다시 해 주세요", 429);
      const { data, error } = await admin.auth.admin.createUser({
        email: mail,
        password: body.password as string,
        email_confirm: true,
        user_metadata: { display_name: name, gm_phone: phone, gm_sig: await signPhone(phone) },
      });
      if (error || !data?.user) {
        if (await findByPhone(phone)) return fail("dup", DUP_PHONE, 409);
        if (error && /already|registered|exists/i.test(error.message)) return fail("dupmail", DUP_MAIL, 409);
        throw error ?? new Error("createUser failed");
      }
      return json({ ok: true });
    }

    if (action === "login") {
      const WRONG = "아이디(전화번호)나 비밀번호가 맞지 않아요";
      if (typeof body.password !== "string" || !body.password) return fail("password", "비밀번호를 입력해 주세요");
      const prof = await findByPhone(phone);
      if (!prof) return fail("invalid_credentials", WRONG, 400);
      const mail = await mailOf(prof.id);
      if (!mail) return fail("invalid_credentials", WRONG, 400);
      const r = await auth("/token?grant_type=password", { email: mail, password: body.password });
      if (r.ok) return json({ ok: true, session: r.data });
      if (r.code === "user_banned") return fail("user_banned", "이용이 정지된 계정이에요. 관리자에게 물어봐 주세요", 400);
      if (r.status === 429) return fail("busy", "로그인 시도가 너무 많아요. 잠시 뒤 다시 해 주세요", 429);
      return fail("invalid_credentials", WRONG, 400);
    }

    if (action === "sendreset") {
      const prof = await findByPhone(phone);
      if (!prof) return fail("none", "가입되지 않은 전화번호예요. 번호를 확인하거나 회원가입을 해 주세요", 404);
      const mail = await mailOf(prof.id);
      if (!mail) return fail("none", "이 계정에는 메일 주소가 없어요. 관리자에게 임시 비밀번호를 부탁해 주세요", 404);
      const now = Date.now();
      const { data: row } = await admin.from("gm_reset_sends").select("*").eq("user_id", prof.id).maybeSingle();
      if (row && now - new Date(row.last_sent).getTime() < 60e3) {
        return fail("wait", "인증번호 메일은 1분에 한 번 보낼 수 있어요. 잠시 뒤 다시 눌러 주세요", 429);
      }
      const inWindow = row && now - new Date(row.window_start).getTime() < 3600e3;
      if (inWindow && row.window_count >= 5) {
        return fail("limit", "인증번호 메일은 한 시간에 5번까지 보낼 수 있어요. 조금 뒤 다시 해 주세요", 429);
      }
      const back = String(body.redirect_to || "");
      const q = BACK_OK.test(back) ? "?redirect_to=" + encodeURIComponent(back) : "";
      const r = await auth("/recover" + q, { email: mail });
      if (!r.ok) {
        console.error("recover", r.status, JSON.stringify(r.data).slice(0, 300));
        if (r.status === 429) return fail("limit", "메일을 너무 자주 보냈어요. 조금 뒤 다시 해 주세요", 429);
        return fail("mail_off", "지금은 메일을 보낼 수 없어요. 관리자에게 임시 비밀번호를 부탁해 주세요", 503);
      }
      await admin.from("gm_reset_sends").upsert({
        user_id: prof.id,
        last_sent: new Date(now).toISOString(),
        window_start: inWindow ? row.window_start : new Date(now).toISOString(),
        window_count: inWindow ? row.window_count + 1 : 1,
      });
      return json({ ok: true, to: maskMail(mail) });
    }

    if (action === "verifyreset") {
      if (!okPassword(body.password)) return fail("password", "새 비밀번호는 8자 이상으로 정해 주세요");
      const code = String(body.code ?? "").replace(/[^0-9]/g, "");
      if (code.length !== 6) return fail("code", "메일로 받은 6자리 인증번호를 입력해 주세요");
      const prof = await findByPhone(phone);
      if (!prof) return fail("none", "가입되지 않은 전화번호예요", 404);
      const mail = await mailOf(prof.id);
      if (!mail) return fail("none", "이 계정에는 메일 주소가 없어요", 404);
      const v = await auth("/verify", { type: "recovery", email: mail, token: code });
      if (!v.ok || !v.data.access_token) {
        return fail("wrong", "인증번호가 맞지 않거나 시간이 지났어요. 메일의 6자리를 다시 확인하거나 새로 받아 주세요", 401);
      }
      const u = await auth("/user", { password: body.password }, String(v.data.access_token), "PUT");
      if (!u.ok) {
        if (u.code === "same_password") return fail("same", "지금 쓰는 비밀번호와 다르게 정해 주세요", 400);
        throw new Error("password update " + u.status);
      }
      await admin.from("gm_reset_sends").delete().eq("user_id", prof.id);
      return json({ ok: true });
    }

    return fail("action", "알 수 없는 요청이에요");
  } catch (e) {
    console.error(e);
    return fail("server", "잠시 문제가 생겼어요. 조금 뒤 다시 해 주세요", 500);
  }
});
