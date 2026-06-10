"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { isSupabaseConfigured, supabase } from "@/lib/supabase/client";

type Mode = "login" | "signup";

export function AuthForm() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setError("");

    if (!isSupabaseConfigured) {
      setError("Supabase 环境变量还没有配置好。");
      return;
    }

    if (mode === "signup" && !nickname.trim()) {
      setError("注册时请先给猫老板留一个昵称。");
      return;
    }

    setIsSubmitting(true);

    const result =
      mode === "login"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({
            email,
            password,
            options: {
              emailRedirectTo: `${window.location.origin}/account`,
              data: { nickname: nickname.trim() },
            },
          });

    setIsSubmitting(false);

    if (result.error) {
      setError(result.error.message);
      return;
    }

    if (mode === "signup") {
      setMessage("注册申请已投递，请先去邮箱完成验证，再回来登录。");
      return;
    }

    router.push("/account");
    router.refresh();
  }

  return (
    <div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900 md:p-8">
      <div className="mb-6 flex rounded-full bg-orange-50 p-1 dark:bg-orange-300/10">
        {(["login", "signup"] as Mode[]).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => {
              setMode(item);
              setError("");
              setMessage("");
            }}
            className={
              mode === item
                ? "flex-1 rounded-full bg-white px-4 py-2 text-sm font-bold text-orange-700 shadow-sm dark:bg-slate-900 dark:text-orange-200"
                : "flex-1 rounded-full px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300"
            }
          >
            {item === "login" ? "邮箱登录" : "邮箱注册"}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        {mode === "signup" && (
          <label className="block">
            <span className="text-sm font-semibold text-orange-700 dark:text-orange-200">
              昵称
            </span>
            <input
              value={nickname}
              onChange={(event) => setNickname(event.target.value)}
              placeholder="例如：冻干赞助商"
              className="mt-2 w-full rounded-2xl border border-orange-100 bg-orange-50/60 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-orange-300 focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </label>
        )}

        <label className="mt-5 block">
          <span className="text-sm font-semibold text-orange-700 dark:text-orange-200">
            邮箱
          </span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            required
            className="mt-2 w-full rounded-2xl border border-orange-100 bg-orange-50/60 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-orange-300 focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          />
        </label>

        <label className="mt-5 block">
          <span className="text-sm font-semibold text-orange-700 dark:text-orange-200">
            密码
          </span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            minLength={6}
            className="mt-2 w-full rounded-2xl border border-orange-100 bg-orange-50/60 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-orange-300 focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          />
        </label>

        {error && (
          <p className="mt-4 rounded-2xl bg-rose-50 p-3 text-sm text-rose-700 dark:bg-rose-300/10 dark:text-rose-200">
            {error}
          </p>
        )}
        {message && (
          <p className="mt-4 rounded-2xl bg-orange-50 p-3 text-sm text-orange-700 dark:bg-orange-300/10 dark:text-orange-200">
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-6 rounded-full bg-orange-100 px-5 py-3 text-sm font-bold text-orange-800 shadow-sm transition hover:bg-orange-200 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-orange-300/20 dark:text-orange-100 dark:hover:bg-orange-300/30"
        >
          {isSubmitting
            ? "猫爪处理中..."
            : mode === "login"
              ? "登录波比事务所"
              : "注册并等待邮箱验证"}
        </button>
      </form>

      <p className="mt-5 text-sm text-slate-500 dark:text-slate-400">
        登录后可前往 <Link href="/account" className="underline">个人中心</Link>{" "}
        设置昵称和头像。
      </p>
    </div>
  );
}
