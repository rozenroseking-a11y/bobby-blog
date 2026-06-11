"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import type { User } from "@supabase/supabase-js";
import { UserAvatar } from "@/app/_components/user-avatar";
import { isSupabaseConfigured, supabase } from "@/lib/supabase/client";
import { ensureProfile } from "@/lib/supabase/profile";
import type {
  FeedbackMessage,
  FeedbackStatus,
  FeedbackType,
  Profile,
} from "@/lib/supabase/types";

const typeLabels: Record<FeedbackType, string> = {
  suggestion: "建议",
  bug: "问题",
  praise: "夸夸",
  other: "其他",
};

const statusLabels: Record<FeedbackStatus, string> = {
  pending: "待查看",
  replied: "已回复",
  resolved: "已处理",
};

function formatTime(value: string | null) {
  if (!value) {
    return "刚刚";
  }

  return new Intl.DateTimeFormat("zh-CN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export function FeedbackClient() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [items, setItems] = useState<FeedbackMessage[]>([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState<FeedbackType>("suggestion");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  async function loadMyFeedback(currentUserId: string) {
    const { data, error: selectError } = await supabase
      .from("feedback_messages")
      .select("*")
      .eq("user_id", currentUserId)
      .order("created_at", { ascending: false });

    if (selectError) {
      setError(selectError.message);
      return;
    }

    setItems(data ?? []);
  }

  useEffect(() => {
    async function load() {
      if (!isSupabaseConfigured) {
        setError("Supabase 环境变量还没有配置好。");
        setIsLoading(false);
        return;
      }

      const {
        data: { user: currentUser },
      } = await supabase.auth.getUser();

      setUser(currentUser);

      if (currentUser) {
        const currentProfile = await ensureProfile(currentUser);
        setProfile(currentProfile);
        await loadMyFeedback(currentUser.id);
      }

      setIsLoading(false);
    }

    load();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setNotice("");

    if (!user) {
      setError("登录后给猫老板递小纸条。");
      return;
    }

    if (!title.trim() || !message.trim()) {
      setError("标题和内容都要写，猫老板才看得懂。");
      return;
    }

    setIsSubmitting(true);
    const { error: insertError } = await supabase
      .from("feedback_messages")
      .insert({
        type,
        title: title.trim(),
        message: message.trim(),
      });
    setIsSubmitting(false);

    if (insertError) {
      setError(insertError.message);
      return;
    }

    setTitle("");
    setMessage("");
    setType("suggestion");
    setNotice("猫老板已收到你的小纸条");
    await loadMyFeedback(user.id);
  }

  if (isLoading) {
    return (
      <div className="mb-20 rounded-2xl border border-orange-100 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        正在打开猫老板信箱...
      </div>
    );
  }

  if (!user) {
    return (
      <section className="mb-20 rounded-2xl border border-orange-100 bg-orange-50/70 p-8 text-center shadow-sm dark:border-orange-300/20 dark:bg-orange-300/10">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          登录后给猫老板递小纸条
        </h2>
        <p className="mt-4 text-slate-700 dark:text-slate-300">
          意见反馈会放进猫老板信箱，登录后才能投递和查看自己的记录。
        </p>
        <Link
          href="/auth"
          className="mt-6 inline-flex rounded-full bg-orange-100 px-5 py-3 text-sm font-bold text-orange-800 shadow-sm transition hover:bg-orange-200 dark:bg-orange-300/20 dark:text-orange-100"
        >
          去登录
        </Link>
      </section>
    );
  }

  return (
    <section className="mb-20 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,480px)]">
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900 md:p-8"
      >
        <div className="mb-6 flex items-center gap-3">
          <UserAvatar
            avatarUrl={profile?.avatar_url}
            nickname={profile?.nickname}
          />
          <div>
            <p className="text-sm font-bold text-orange-700 dark:text-orange-200">
              🐾 当前投递身份
            </p>
            <p className="font-bold text-slate-900 dark:text-slate-100">
              {profile?.nickname || "待命名访客"}
            </p>
          </div>
        </div>

        <label className="block">
          <span className="text-sm font-semibold text-orange-700 dark:text-orange-200">
            类型
          </span>
          <select
            value={type}
            onChange={(event) => setType(event.target.value as FeedbackType)}
            className="mt-2 w-full rounded-2xl border border-orange-100 bg-orange-50/60 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-orange-300 focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          >
            <option value="suggestion">建议</option>
            <option value="bug">问题</option>
            <option value="praise">夸夸</option>
            <option value="other">其他</option>
          </select>
        </label>

        <label className="mt-5 block">
          <span className="text-sm font-semibold text-orange-700 dark:text-orange-200">
            标题
          </span>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="例如：申请增加冻干预算说明栏"
            className="mt-2 w-full rounded-2xl border border-orange-100 bg-orange-50/60 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-orange-300 focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          />
        </label>

        <label className="mt-5 block">
          <span className="text-sm font-semibold text-orange-700 dark:text-orange-200">
            内容
          </span>
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            rows={7}
            placeholder="把想交给猫老板的小纸条写在这里……"
            className="mt-2 w-full resize-none rounded-2xl border border-orange-100 bg-orange-50/60 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-orange-300 focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
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
          className="mt-6 rounded-full bg-orange-100 px-5 py-3 text-sm font-bold text-orange-800 shadow-sm transition hover:bg-orange-200 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-orange-300/20 dark:text-orange-100"
        >
          {isSubmitting ? "投递中..." : "投递给猫老板"}
        </button>
      </form>

      <aside className="rounded-2xl border border-rose-100 bg-rose-50/70 p-6 shadow-sm dark:border-rose-300/20 dark:bg-rose-300/10 md:p-8">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          📬 我的反馈档案
        </h2>
        <div className="mt-5 space-y-4">
          {items.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl bg-white/90 p-4 shadow-sm ring-1 ring-rose-100 dark:bg-slate-900/80 dark:ring-rose-300/20"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-orange-700 dark:bg-orange-300/10 dark:text-orange-200">
                  {typeLabels[item.type]}
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                  {statusLabels[item.status]}
                </span>
              </div>
              <h3 className="mt-3 text-lg font-bold text-slate-900 dark:text-slate-100">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                {item.message}
              </p>
              {item.admin_reply && (
                <p className="mt-3 rounded-2xl bg-orange-50 p-3 text-sm leading-relaxed text-orange-800 dark:bg-orange-300/10 dark:text-orange-100">
                  猫老板回复：{item.admin_reply}
                </p>
              )}
              <time className="mt-3 block text-xs text-slate-500 dark:text-slate-400">
                {formatTime(item.created_at)}
              </time>
            </article>
          ))}
          {items.length === 0 && (
            <p className="rounded-2xl bg-white/90 p-4 text-slate-600 shadow-sm ring-1 ring-rose-100 dark:bg-slate-900/80 dark:text-slate-300 dark:ring-rose-300/20">
              还没有投递过反馈，小纸条箱正在安静等待。
            </p>
          )}
        </div>
      </aside>
    </section>
  );
}
