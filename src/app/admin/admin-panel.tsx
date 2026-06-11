"use client";

import { FormEvent, useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { UserAvatar } from "@/app/_components/user-avatar";
import { isSupabaseConfigured, supabase } from "@/lib/supabase/client";
import type {
  AdminFeedbackMessage,
  AdminGuestbookMessage,
  FeedbackStatus,
  FeedbackType,
} from "@/lib/supabase/types";

const ADMIN_EMAILS = ["h981411799@126.com", "gg981411799@126.com"];
type Filter = "all" | "pending" | "approved" | "hidden";
type AdminTab = "guestbook" | "feedback";

const feedbackTypeLabels: Record<FeedbackType, string> = {
  suggestion: "建议",
  bug: "问题",
  praise: "夸夸",
  other: "其他",
};

const feedbackStatusLabels: Record<FeedbackStatus, string> = {
  pending: "待猫老板拆信",
  replied: "猫老板已回信",
  resolved: "已归档",
};

function formatMessageTime(value: string | null) {
  if (!value) {
    return "时间待查";
  }

  return new Intl.DateTimeFormat("zh-CN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function getReviewStatus(message: AdminGuestbookMessage): Exclude<Filter, "all"> {
  if (message.review_status === "approved" || message.approved) {
    return "approved";
  }

  if (message.review_status === "hidden") {
    return "hidden";
  }

  return "pending";
}

export function AdminPanel() {
  const [user, setUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<AdminGuestbookMessage[]>([]);
  const [feedback, setFeedback] = useState<AdminFeedbackMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMutatingId, setIsMutatingId] = useState<number | null>(null);
  const [filter, setFilter] = useState<Filter>("all");
  const [tab, setTab] = useState<AdminTab>("guestbook");
  const [replyDrafts, setReplyDrafts] = useState<Record<number, string>>({});
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const isAdmin = Boolean(user?.email && ADMIN_EMAILS.includes(user.email));
  const stats = {
    all: messages.length,
    pending: messages.filter((message) => getReviewStatus(message) === "pending")
      .length,
    approved: messages.filter(
      (message) => getReviewStatus(message) === "approved",
    ).length,
    hidden: messages.filter((message) => getReviewStatus(message) === "hidden")
      .length,
  };
  const feedbackStats = {
    all: feedback.length,
    pending: feedback.filter((item) => item.status === "pending").length,
    replied: feedback.filter((item) => item.status === "replied").length,
    resolved: feedback.filter((item) => item.status === "resolved").length,
  };
  const filteredMessages =
    filter === "all"
      ? messages
      : messages.filter((message) => getReviewStatus(message) === filter);

  async function loadMessages() {
    setError("");
    const { data, error: rpcError } = await supabase.rpc(
      "admin_guestbook_messages",
    );

    if (rpcError) {
      setError(rpcError.message);
      return;
    }

    setMessages(data ?? []);
  }

  async function loadFeedback() {
    setError("");
    const { data, error: rpcError } = await supabase.rpc(
      "admin_feedback_messages",
    );

    if (rpcError) {
      setError(rpcError.message);
      return;
    }

    setFeedback(data ?? []);
    setReplyDrafts(
      Object.fromEntries(
        (data ?? []).map((item) => [item.id, item.admin_reply ?? ""]),
      ),
    );
  }

  useEffect(() => {
    async function loadAdmin() {
      if (!isSupabaseConfigured) {
        setError("Supabase 环境变量还没有配置好。");
        setIsLoading(false);
        return;
      }

      const {
        data: { user: currentUser },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        setError(userError.message);
        setIsLoading(false);
        return;
      }

      setUser(currentUser);

      if (currentUser?.email && ADMIN_EMAILS.includes(currentUser.email)) {
        await Promise.all([loadMessages(), loadFeedback()]);
      }

      setIsLoading(false);
    }

    loadAdmin();
  }, []);

  async function setApproved(messageId: number, approved: boolean) {
    setNotice("");
    setError("");
    setIsMutatingId(messageId);

    const { error: rpcError } = await supabase.rpc(
      "admin_set_guestbook_approved",
      {
        message_id: messageId,
        next_approved: approved,
      },
    );

    setIsMutatingId(null);

    if (rpcError) {
      setError(rpcError.message);
      return;
    }

    setNotice(
      approved ? "小纸条已准许公开。" : "小纸条已藏进猫窝。",
    );
    await loadMessages();
  }

  async function deleteMessage(messageId: number) {
    setNotice("");
    setError("");
    const confirmed = window.confirm("确认撕掉这张小纸条吗？");

    if (!confirmed) {
      return;
    }

    setIsMutatingId(messageId);
    const { error: rpcError } = await supabase.rpc(
      "admin_delete_guestbook_message",
      {
        message_id: messageId,
      },
    );
    setIsMutatingId(null);

    if (rpcError) {
      setError(rpcError.message);
      return;
    }

    setNotice("小纸条已撕掉。");
    await loadMessages();
  }

  async function replyFeedback(feedbackId: number, event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice("");
    setError("");
    setIsMutatingId(feedbackId);

    const { error: rpcError } = await supabase.rpc("admin_reply_feedback", {
      feedback_id: feedbackId,
      reply_text: replyDrafts[feedbackId] ?? "",
    });

    setIsMutatingId(null);

    if (rpcError) {
      setError(rpcError.message);
      return;
    }

    setNotice("回信已写好，猫老板的批注已归档。");
    await loadFeedback();
  }

  async function setFeedbackStatus(feedbackId: number, status: FeedbackStatus) {
    setNotice("");
    setError("");
    setIsMutatingId(feedbackId);

    const { error: rpcError } = await supabase.rpc("admin_set_feedback_status", {
      feedback_id: feedbackId,
      next_status: status,
    });

    setIsMutatingId(null);

    if (rpcError) {
      setError(rpcError.message);
      return;
    }

    setNotice("信箱档案状态已更新。");
    await loadFeedback();
  }

  async function deleteFeedback(feedbackId: number) {
    setNotice("");
    setError("");
    const confirmed = window.confirm("确认撕掉这张信箱小纸条吗？");

    if (!confirmed) {
      return;
    }

    setIsMutatingId(feedbackId);
    const { error: rpcError } = await supabase.rpc("admin_delete_feedback", {
      feedback_id: feedbackId,
    });
    setIsMutatingId(null);

    if (rpcError) {
      setError(rpcError.message);
      return;
    }

    setNotice("信箱小纸条已撕掉。");
    await loadFeedback();
  }

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        正在检查猫老板的门禁名单...
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="rounded-2xl border border-rose-100 bg-rose-50/70 p-8 text-center shadow-sm dark:border-rose-300/20 dark:bg-rose-300/10">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          猫老板不允许进入这里
        </h2>
        <p className="mt-4 text-slate-700 dark:text-slate-300">
          这里是波比事务所后台，只有指定管理员可以查阅待审小纸条。
        </p>
      </div>
    );
  }

  return (
    <section className="mb-16">
      {(error || notice) && (
        <div className="mb-6 space-y-3">
          {error && (
            <p className="rounded-2xl bg-rose-50 p-4 text-sm text-rose-700 dark:bg-rose-300/10 dark:text-rose-200">
              {error}
            </p>
          )}
          {notice && (
            <p className="rounded-2xl bg-orange-50 p-4 text-sm text-orange-700 dark:bg-orange-300/10 dark:text-orange-200">
              {notice}
            </p>
          )}
        </div>
      )}

      <div className="mb-5 flex flex-wrap gap-2 rounded-2xl border border-orange-100 bg-white p-2 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        {[
          ["guestbook", "来访小纸条"],
          ["feedback", "猫老板信箱"],
        ].map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => setTab(value as AdminTab)}
            className={
              tab === value
                ? "rounded-full bg-orange-100 px-4 py-2 text-sm font-bold text-orange-800 shadow-sm dark:bg-orange-300/20 dark:text-orange-100"
                : "rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100"
            }
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "guestbook" ? (
        <>
          <div className="mb-5 grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              ["待猫老板审阅", stats.pending, "🐾"],
              ["已准许公开", stats.approved, "✨"],
              ["已藏进猫窝", stats.hidden, "🌙"],
              ["全部小纸条", stats.all, "📮"],
            ].map(([label, value, icon]) => (
              <div
                key={label}
                className="min-h-24 rounded-2xl border border-orange-100 bg-orange-50/70 p-4 shadow-sm dark:border-orange-300/20 dark:bg-orange-300/10"
              >
                <p className="text-sm font-bold text-orange-700 dark:text-orange-200">
                  {icon} {label}
                </p>
                <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {value}
                </p>
              </div>
            ))}
          </div>

          <div className="mb-5 flex flex-wrap gap-2 rounded-2xl border border-orange-100 bg-white p-2 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            {[
              ["all", "全部"],
              ["pending", "待猫老板审阅"],
              ["approved", "已准许公开"],
              ["hidden", "已藏进猫窝"],
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setFilter(value as Filter)}
                className={
                  filter === value
                    ? "rounded-full bg-orange-100 px-4 py-2 text-sm font-bold text-orange-800 shadow-sm dark:bg-orange-300/20 dark:text-orange-100"
                    : "rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100"
                }
              >
                {label}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {filteredMessages.map((message) => {
              const status = getReviewStatus(message);

              return (
                <article
                  key={message.id}
                  className="rounded-2xl border border-orange-100 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900"
                >
                  <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                    <div className="flex gap-3">
                      <UserAvatar
                        avatarUrl={message.avatar_url}
                        nickname={message.nickname ?? message.name}
                      />
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                            {message.nickname || message.name || "匿名猫友"}
                          </h2>
                          <span
                            className={
                              status === "approved"
                                ? "rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-700 dark:bg-orange-300/20 dark:text-orange-200"
                                : status === "hidden"
                                  ? "rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-200"
                                  : "rounded-full bg-rose-100 px-3 py-1 text-xs font-bold text-rose-700 dark:bg-rose-300/20 dark:text-rose-200"
                            }
                          >
                            {status === "approved"
                              ? "已准许公开"
                              : status === "hidden"
                                ? "已藏进猫窝"
                                : "待猫老板审阅"}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                          {message.email || "邮箱未知"} ·{" "}
                          {formatMessageTime(message.created_at)}
                        </p>
                        <p className="mt-4 text-base leading-relaxed text-slate-700 dark:text-slate-300">
                          「{message.message || "空白小纸条"}」
                        </p>
                      </div>
                    </div>

                    <div className="flex shrink-0 flex-wrap gap-2">
                      <button type="button" disabled={isMutatingId === message.id} onClick={() => setApproved(message.id, true)} className="rounded-full bg-orange-100 px-3 py-2 text-xs font-bold text-orange-800 shadow-sm transition hover:bg-orange-200 disabled:opacity-60 dark:bg-orange-300/20 dark:text-orange-100">准许公开</button>
                      <button type="button" disabled={isMutatingId === message.id} onClick={() => setApproved(message.id, false)} className="rounded-full bg-slate-100 px-3 py-2 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-200 disabled:opacity-60 dark:bg-slate-800 dark:text-slate-200">藏进猫窝</button>
                      <button type="button" disabled={isMutatingId === message.id} onClick={() => deleteMessage(message.id)} className="rounded-full bg-rose-100 px-3 py-2 text-xs font-bold text-rose-700 shadow-sm transition hover:bg-rose-200 disabled:opacity-60 dark:bg-rose-300/20 dark:text-rose-200">撕掉纸条</button>
                    </div>
                  </div>
                </article>
              );
            })}

            {filteredMessages.length === 0 && (
              <div className="rounded-2xl border border-orange-100 bg-white p-8 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900">
                当前筛选下没有小纸条需要猫老板审阅。
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="mb-5 grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              ["待拆信数量", feedbackStats.pending, "📬"],
              ["已回信数量", feedbackStats.replied, "✉️"],
              ["已归档数量", feedbackStats.resolved, "✅"],
              ["全部信件数量", feedbackStats.all, "🗂️"],
            ].map(([label, value, icon]) => (
              <div key={label} className="min-h-24 rounded-2xl border border-orange-100 bg-orange-50/70 p-4 shadow-sm dark:border-orange-300/20 dark:bg-orange-300/10">
                <p className="text-sm font-bold text-orange-700 dark:text-orange-200">{icon} {label}</p>
                <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">{value}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            {feedback.map((item) => (
              <article key={item.id} className="rounded-2xl border border-orange-100 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex gap-4">
                    <UserAvatar avatarUrl={item.avatar_url} nickname={item.nickname} />
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">{item.title}</h2>
                        <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-orange-700 dark:bg-orange-300/10 dark:text-orange-200">{feedbackTypeLabels[item.type]}</span>
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-200">{feedbackStatusLabels[item.status]}</span>
                      </div>
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{item.nickname || "匿名猫友"} · {item.email || "邮箱未知"} · {formatMessageTime(item.created_at)}</p>
                      <p className="mt-4 text-base leading-relaxed text-slate-700 dark:text-slate-300">{item.message}</p>
                      {item.admin_reply && <p className="mt-3 rounded-2xl bg-orange-50 p-3 text-sm leading-relaxed text-orange-800 dark:bg-orange-300/10 dark:text-orange-100">猫老板回信：{item.admin_reply}</p>}
                    </div>
                  </div>

                  <form onSubmit={(event) => replyFeedback(item.id, event)} className="w-full shrink-0 lg:w-80">
                    <textarea value={replyDrafts[item.id] ?? ""} onChange={(event) => setReplyDrafts((drafts) => ({ ...drafts, [item.id]: event.target.value }))} rows={4} placeholder="给这张小纸条写猫老板回信……" className="w-full resize-none rounded-2xl border border-orange-100 bg-orange-50/60 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-300 focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100" />
                    <div className="mt-3 flex flex-wrap gap-2">
                      <button type="submit" disabled={isMutatingId === item.id} className="rounded-full bg-orange-100 px-3 py-2 text-xs font-bold text-orange-800 shadow-sm transition hover:bg-orange-200 disabled:opacity-60 dark:bg-orange-300/20 dark:text-orange-100">写回信</button>
                      <button type="button" disabled={isMutatingId === item.id} onClick={() => setFeedbackStatus(item.id, "resolved")} className="rounded-full bg-slate-100 px-3 py-2 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-200 disabled:opacity-60 dark:bg-slate-800 dark:text-slate-200">已归档</button>
                      <button type="button" disabled={isMutatingId === item.id} onClick={() => deleteFeedback(item.id)} className="rounded-full bg-rose-100 px-3 py-2 text-xs font-bold text-rose-700 shadow-sm transition hover:bg-rose-200 disabled:opacity-60 dark:bg-rose-300/20 dark:text-rose-200">撕掉纸条</button>
                    </div>
                  </form>
                </div>
              </article>
            ))}

            {feedback.length === 0 && (
              <div className="rounded-2xl border border-orange-100 bg-white p-8 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900">猫老板信箱目前空空如也。</div>
            )}
          </div>
        </>
      )}
    </section>
  );
}
