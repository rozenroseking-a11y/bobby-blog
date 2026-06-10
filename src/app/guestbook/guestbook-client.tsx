"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import type { User } from "@supabase/supabase-js";
import { UserAvatar } from "@/app/_components/user-avatar";
import { isSupabaseConfigured, supabase } from "@/lib/supabase/client";
import { ensureProfile } from "@/lib/supabase/profile";
import type {
  Profile,
  PublicGuestbookMessage,
} from "@/lib/supabase/types";

const sampleMessages = [
  "波比老板今天也认真营业了吗？",
  "申请报销一包冻干作为精神损耗费。",
  "胖虎和纳豆下次来访请提前公告！",
];

function formatMessageTime(value: string) {
  return new Intl.DateTimeFormat("zh-CN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export function GuestbookClient() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [messages, setMessages] = useState<PublicGuestbookMessage[]>([]);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadGuestbook() {
      if (!isSupabaseConfigured) {
        setNotice("Supabase 环境变量还没有配置好，暂时显示样例留言。");
        setIsLoading(false);
        return;
      }

      const [{ data: approvedMessages }, authResult] = await Promise.all([
        supabase
          .from("public_guestbook_messages")
          .select("*")
          .order("created_at", { ascending: false }),
        supabase.auth.getUser(),
      ]);

      setMessages(approvedMessages ?? []);

      const currentUser = authResult.data.user;
      setUser(currentUser);

      if (currentUser) {
        const currentProfile = await ensureProfile(currentUser);
        setProfile(currentProfile);
      }

      setIsLoading(false);
    }

    loadGuestbook();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setNotice("");

    if (!user) {
      setError("请先登录，再把小纸条投递给猫老板。");
      return;
    }

    if (!user.email_confirmed_at) {
      setError("请先完成邮箱验证，猫老板才会接收小纸条。");
      return;
    }

    if (!profile?.nickname?.trim()) {
      setError("首次留言前，请先去个人中心设置昵称。");
      return;
    }

    if (!content.trim()) {
      setError("小纸条不能为空。");
      return;
    }

    setIsSubmitting(true);
    const { error: insertError } = await supabase
      .from("guestbook_messages")
      .insert({
        name: profile.nickname.trim(),
        message: content.trim(),
      });

    setIsSubmitting(false);

    if (insertError) {
      setError(insertError.message);
      return;
    }

    setContent("");
    setNotice("小纸条已投递，等待猫老板审核后公开展示。");
  }

  return (
    <section className="grid grid-cols-1 gap-8 mb-20 md:grid-cols-[minmax(0,1fr)_minmax(280px,420px)]">
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900 md:p-8"
      >
        <h2 className="mb-5 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          📮 投递小纸条
        </h2>

        <div className="mb-5 rounded-2xl bg-orange-50/70 p-4 dark:bg-orange-300/10">
          {user ? (
            <div className="flex items-center gap-3">
              <UserAvatar
                avatarUrl={profile?.avatar_url}
                nickname={profile?.nickname}
              />
              <div>
                <p className="text-sm font-semibold text-orange-700 dark:text-orange-200">
                  当前投递身份
                </p>
                <p className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  {profile?.nickname || "还没有设置昵称"}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              未登录访客可以浏览留言，但不能投递。{" "}
              <Link href="/auth" className="font-bold text-orange-700 underline dark:text-orange-200">
                去登录
              </Link>
            </p>
          )}
        </div>

        <label className="block">
          <span className="text-sm font-semibold text-orange-700 dark:text-orange-200">
            留言
          </span>
          <textarea
            name="message"
            rows={6}
            value={content}
            onChange={(event) => setContent(event.target.value)}
            onFocus={() => {
              if (!user) {
                setError("请先登录，再把小纸条投递给猫老板。");
              }
            }}
            placeholder="写下想交给波比老板的小纸条……"
            className="mt-2 w-full resize-none rounded-2xl border border-orange-100 bg-orange-50/60 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-orange-300 focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-orange-300"
          />
        </label>

        {error && (
          <p className="mt-4 rounded-2xl bg-rose-50 p-3 text-sm text-rose-700 dark:bg-rose-300/10 dark:text-rose-200">
            {error}
          </p>
        )}
        {notice && (
          <p className="mt-4 rounded-2xl bg-orange-50 p-3 text-sm text-orange-700 dark:bg-orange-300/10 dark:text-orange-200">
            {notice}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-6 rounded-full bg-orange-100 px-5 py-3 text-sm font-bold text-orange-800 shadow-sm transition hover:bg-orange-200 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-orange-300/20 dark:text-orange-100 dark:hover:bg-orange-300/30"
        >
          {isSubmitting ? "猫爪投递中..." : "投递给猫老板"}
        </button>
        <p className="mt-4 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
          注：猫老板可能会先睡一觉，再慢慢查阅大家的小纸条。
        </p>
      </form>

      <aside className="rounded-2xl border border-rose-100 bg-rose-50/70 p-5 shadow-sm dark:border-rose-300/20 dark:bg-rose-300/10 md:p-8">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          🐱 猫老板已读留言
        </h2>
        <div className="mt-5 space-y-4">
          {isLoading && (
            <p className="rounded-2xl bg-white/80 p-4 text-base leading-relaxed text-slate-700 shadow-sm ring-1 ring-rose-100 dark:bg-slate-900/80 dark:text-slate-300 dark:ring-rose-300/20">
              正在翻阅待公开的小纸条...
            </p>
          )}

          {!isLoading &&
            messages.map((message) => (
              <article
                key={message.id}
                className="rounded-2xl bg-white/80 p-4 text-base leading-relaxed text-slate-700 shadow-sm ring-1 ring-rose-100 dark:bg-slate-900/80 dark:text-slate-300 dark:ring-rose-300/20"
              >
                <div className="mb-3 flex items-center gap-3">
                  <UserAvatar
                    avatarUrl={message.avatar_url}
                    nickname={message.nickname}
                    size="sm"
                  />
                  <div>
                    <p className="font-bold text-slate-900 dark:text-slate-100">
                      {message.nickname || "匿名猫友"}
                    </p>
                    <time className="text-xs text-slate-500 dark:text-slate-400">
                      {message.created_at
                        ? formatMessageTime(message.created_at)
                        : "刚刚"}
                    </time>
                  </div>
                </div>
                <p>「{message.message}」</p>
              </article>
            ))}

          {!isLoading &&
            messages.length === 0 &&
            sampleMessages.map((message) => (
              <p
                key={message}
                className="rounded-2xl bg-white/80 p-4 text-base leading-relaxed text-slate-700 shadow-sm ring-1 ring-rose-100 dark:bg-slate-900/80 dark:text-slate-300 dark:ring-rose-300/20"
              >
                「{message}」
              </p>
            ))}
        </div>
      </aside>
    </section>
  );
}
