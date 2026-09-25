"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { adoptSession, normPhone, phoneAuth, useMe, validPhone } from "@/lib/auth";
import { authEnabled } from "@/lib/supabase";

type Mode = "login" | "signup" | "reset";
const REMEMBER_KEY = "gm-login-id";

const field =
  "h-12 w-full rounded-lg border border-line bg-bg px-3.5 text-[15px] text-ink outline-none placeholder:text-ink-3 focus:border-ink-3";
const label = "mb-1 block text-[13.5px] font-bold text-ink-2";

/** 로그인 카드: 아이디(전화번호) + 비밀번호. 회원가입과 비밀번호 찾기도 같은 카드 안에서 한다. */
export function LoginCard() {
  const router = useRouter();
  const me = useMe();
  const [mode, setMode] = useState<Mode>("login");
  const [phone, setPhone] = useState("");
  const [pw, setPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [sentTo, setSentTo] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ kind: "error" | "ok"; text: string } | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(REMEMBER_KEY);
      if (saved) {
        setPhone(saved);
        setRemember(true);
      }
    } catch {}
  }, []);

  useEffect(() => {
    if (me) router.replace("/me");
  }, [me, router]);

  const enabled = authEnabled();

  function switchMode(m: Mode) {
    setMode(m);
    setMsg(null);
    setSentTo(null);
    setCode("");
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (busy) return;
    const p = normPhone(phone);
    if (!validPhone(p)) {
      setMsg({ kind: "error", text: "아이디(전화번호)를 숫자만 입력해 주세요. 예: 01012345678" });
      return;
    }
    setBusy(true);
    setMsg(null);
    try {
      if (mode === "login") {
        const r = await phoneAuth("login", { phone: p, password: pw });
        if (!r.ok || !r.session) {
          setMsg({ kind: "error", text: r.message ?? "로그인하지 못했어요." });
          return;
        }
        try {
          if (remember) localStorage.setItem(REMEMBER_KEY, p);
          else localStorage.removeItem(REMEMBER_KEY);
        } catch {}
        await adoptSession(r.session);
        router.replace("/me");
        return;
      }
      if (mode === "signup") {
        if (pw.length < 8) {
          setMsg({ kind: "error", text: "비밀번호는 8자 이상으로 정해 주세요." });
          return;
        }
        const r = await phoneAuth("signup", { phone: p, password: pw, email, name });
        if (!r.ok) {
          setMsg({ kind: "error", text: r.message ?? "가입하지 못했어요." });
          return;
        }
        const l = await phoneAuth("login", { phone: p, password: pw });
        if (l.ok && l.session) {
          await adoptSession(l.session);
          router.replace("/me");
          return;
        }
        setMsg({ kind: "ok", text: "가입했어요. 이제 로그인해 주세요." });
        switchMode("login");
        return;
      }
      if (mode === "reset") {
        if (!sentTo) {
          const r = await phoneAuth("sendreset", { phone: p, redirect_to: `${location.origin}/login` });
          if (!r.ok) {
            setMsg({ kind: "error", text: r.message ?? "메일을 보내지 못했어요." });
            return;
          }
          setSentTo(r.to ?? "가입할 때 적은 메일");
          setMsg({ kind: "ok", text: `${r.to ?? "가입할 때 적은 메일"}로 6자리 인증번호를 보냈어요.` });
          return;
        }
        if (pw.length < 8) {
          setMsg({ kind: "error", text: "새 비밀번호는 8자 이상으로 정해 주세요." });
          return;
        }
        const r = await phoneAuth("verifyreset", { phone: p, code, password: pw });
        if (!r.ok) {
          setMsg({ kind: "error", text: r.message ?? "비밀번호를 바꾸지 못했어요." });
          return;
        }
        setMsg({ kind: "ok", text: "비밀번호를 바꿨어요. 새 비밀번호로 로그인해 주세요." });
        setPw("");
        switchMode("login");
      }
    } finally {
      setBusy(false);
    }
  }

  const title = mode === "login" ? "로그인" : mode === "signup" ? "회원가입" : "비밀번호 찾기";

  return (
    <div className="rounded-2xl border border-line bg-card p-5 shadow-[0_18px_40px_-24px_rgba(31,42,68,0.45)] sm:p-6">
      <h2 className="text-[1.25rem] font-extrabold">{title}</h2>
      {!enabled && (
        <p className="mt-2 rounded-lg bg-amber-soft px-3 py-2 text-[13.5px] text-amber-ink">아직 로그인 기능이 준비되지 않았어요. 로그인 없이도 모든 단원을 볼 수 있어요.</p>
      )}
      <form onSubmit={onSubmit} className="mt-4 space-y-4">
        <div>
          <label htmlFor="login-phone" className={label}>
            아이디 (전화번호)
          </label>
          <input
            id="login-phone"
            type="tel"
            inputMode="numeric"
            autoComplete="username"
            placeholder="01012345678"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={field}
          />
          <p className="mt-1 text-[12.5px] text-ink-3">숫자만 입력하세요.</p>
        </div>

        {mode === "signup" && (
          <>
            <div>
              <label htmlFor="login-name" className={label}>
                이름 (별명도 좋아요)
              </label>
              <input id="login-name" type="text" autoComplete="nickname" maxLength={20} value={name} onChange={(e) => setName(e.target.value)} className={field} />
            </div>
            <div>
              <label htmlFor="login-email" className={label}>
                메일 주소 (비밀번호를 잊었을 때 써요)
              </label>
              <input id="login-email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={field} />
            </div>
          </>
        )}

        {mode === "reset" && sentTo && (
          <div>
            <label htmlFor="login-code" className={label}>
              메일로 받은 6자리 인증번호
            </label>
            <input id="login-code" type="text" inputMode="numeric" maxLength={6} value={code} onChange={(e) => setCode(e.target.value)} className={field} />
          </div>
        )}

        {(mode !== "reset" || sentTo) && (
          <div>
            <label htmlFor="login-pw" className={label}>
              {mode === "reset" ? "새 비밀번호" : "비밀번호"}
            </label>
            <div className="relative">
              <input
                id="login-pw"
                type={showPw ? "text" : "password"}
                autoComplete={mode === "login" ? "current-password" : "new-password"}
                placeholder={mode === "login" ? "비밀번호" : "8자 이상"}
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                className={`${field} pr-12`}
              />
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                aria-label={showPw ? "비밀번호 숨기기" : "비밀번호 보기"}
                className="absolute right-1 top-1 grid size-10 place-items-center rounded-lg text-ink-3 hover:bg-chip hover:text-ink"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
                  <circle cx="12" cy="12" r="3" />
                  {showPw && <path d="M4 4l16 16" />}
                </svg>
              </button>
            </div>
          </div>
        )}

        {mode === "login" && (
          <label className="flex items-center gap-2 text-[13.5px] text-ink-2">
            <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="size-4 accent-[var(--coral)]" />
            아이디 기억하기
          </label>
        )}

        {msg && (
          <p role="status" className={`rounded-lg px-3 py-2 text-[13.5px] ${msg.kind === "error" ? "bg-coral-soft text-coral-ink" : "bg-mint-soft text-mint-ink"}`}>
            {msg.text}
          </p>
        )}

        <button type="submit" disabled={busy} className="h-12 w-full rounded-lg bg-coral text-[15px] font-extrabold text-white transition-colors hover:bg-coral-ink disabled:opacity-60">
          {busy ? "잠시만요…" : mode === "login" ? "로그인" : mode === "signup" ? "가입하기" : sentTo ? "비밀번호 바꾸기" : "인증번호 받기"}
        </button>
      </form>

      <div className="mt-3 grid grid-cols-2 gap-2">
        {mode !== "signup" ? (
          <button type="button" onClick={() => switchMode("signup")} className="h-11 rounded-lg border border-line bg-card text-[14px] font-bold hover:bg-chip">
            회원가입
          </button>
        ) : (
          <button type="button" onClick={() => switchMode("login")} className="h-11 rounded-lg border border-line bg-card text-[14px] font-bold hover:bg-chip">
            로그인으로
          </button>
        )}
        {mode !== "reset" ? (
          <button type="button" onClick={() => switchMode("reset")} className="h-11 rounded-lg border border-line bg-card text-[14px] font-bold hover:bg-chip">
            비밀번호 찾기
          </button>
        ) : (
          <button type="button" onClick={() => switchMode("login")} className="h-11 rounded-lg border border-line bg-card text-[14px] font-bold hover:bg-chip">
            로그인으로
          </button>
        )}
      </div>
      <p className="mt-4 text-center text-[13px] text-ink-3">
        로그인 없이도 공부할 수 있어요.{" "}
        <Link href="/start" className="font-bold text-ink-2 underline hover:text-ink">
          바로 시작하기
        </Link>
      </p>
    </div>
  );
}
