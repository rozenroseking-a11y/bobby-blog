"use client";

import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { UserAvatar } from "@/app/_components/user-avatar";
import { isSupabaseConfigured, supabase } from "@/lib/supabase/client";
import type { AdminGuestbookMessage } from "@/lib/supabase/types";

const ADMIN_EMAILS = ["h981411799@126.com", "gg981411799@126.com"];

function formatMessageTime(value: string | null) {
  if (!value) {
    return "时间待查";
  }

  return new Intl.DateTimeFormat("zh-CN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export function AdminPanel() {
  const [user, setUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<AdminGuestbookMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMutatingId, setIsMutatingId] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const isAdmin = Boolean(user?.email && ADMIN_EMAILS.includes(user.email));

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
        await loadMessages();
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

    setNotice(approved ? "留言已通过，猫老板准许公开。" : "留言已隐藏。");
    await loadMessages();
  }

  async function deleteMessage(messageId: number) {
    setNotice("");
    setError("");
    const confirmed = window.confirm("确认删除这张小纸条吗？");

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

    setNotice("留言已删除。");
    await loadMessages();
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
    <section className="mb-20">
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

      <div className="space-y-5">
        {messages.map((message) => (
          <article
            key={message.id}
            className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900"
          >
            <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
              <div className="flex gap-4">
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
                        message.approved
                          ? "rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-700 dark:bg-orange-300/20 dark:text-orange-200"
                          : "rounded-full bg-rose-100 px-3 py-1 text-xs font-bold text-rose-700 dark:bg-rose-300/20 dark:text-rose-200"
                      }
                    >
                      {message.approved ? "已公开" : "待审核"}
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
                <button
                  type="button"
                  disabled={isMutatingId === message.id}
                  onClick={() => setApproved(message.id, true)}
                  className="rounded-full bg-orange-100 px-4 py-2 text-sm font-bold text-orange-800 shadow-sm transition hover:bg-orange-200 disabled:opacity-60 dark:bg-orange-300/20 dark:text-orange-100"
                >
                  通过
                </button>
                <button
                  type="button"
                  disabled={isMutatingId === message.id}
                  onClick={() => setApproved(message.id, false)}
                  className="rounded-full bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-200 disabled:opacity-60 dark:bg-slate-800 dark:text-slate-200"
                >
                  隐藏
                </button>
                <button
                  type="button"
                  disabled={isMutatingId === message.id}
                  onClick={() => deleteMessage(message.id)}
                  className="rounded-full bg-rose-100 px-4 py-2 text-sm font-bold text-rose-700 shadow-sm transition hover:bg-rose-200 disabled:opacity-60 dark:bg-rose-300/20 dark:text-rose-200"
                >
                  删除
                </button>
              </div>
            </div>
          </article>
        ))}

        {messages.length === 0 && (
          <div className="rounded-2xl border border-orange-100 bg-white p-8 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900">
            目前没有小纸条需要猫老板审批。
          </div>
        )}
      </div>
    </section>
  );
}
