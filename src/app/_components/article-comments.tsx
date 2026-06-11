"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { User } from "@supabase/supabase-js";
import { UserAvatar } from "./user-avatar";
import { isSupabaseConfigured, supabase } from "@/lib/supabase/client";
import { ensureProfile } from "@/lib/supabase/profile";
import type { ArticleComment, Profile } from "@/lib/supabase/types";

const ADMIN_EMAILS = ["h981411799@126.com", "gg981411799@126.com"];
const PAGE_SIZE = 5;

type Props = {
  postSlug: string;
};

function formatCommentTime(value: string | null) {
  if (!value) {
    return "刚刚";
  }

  return new Intl.DateTimeFormat("zh-CN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export function ArticleComments({ postSlug }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [comments, setComments] = useState<ArticleComment[]>([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [message, setMessage] = useState("");
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mutatingId, setMutatingId] = useState<number | null>(null);

  const isAdmin = Boolean(user?.email && ADMIN_EMAILS.includes(user.email));
  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(totalCount / PAGE_SIZE)),
    [totalCount],
  );

  async function loadComments(nextPage = page) {
    if (!isSupabaseConfigured) {
      setIsLoading(false);
      setError("Supabase 环境变量还没有配置好。");
      return;
    }

    const { data, error: rpcError } = await supabase.rpc("article_comments", {
      target_post_slug: postSlug,
      page_number: nextPage,
      page_size: PAGE_SIZE,
    });

    if (rpcError) {
      setError(rpcError.message);
      setIsLoading(false);
      return;
    }

    setComments(data ?? []);
    setTotalCount(data?.[0]?.total_count ?? 0);
    setIsLoading(false);
  }

  useEffect(() => {
    async function loadUserAndComments() {
      if (!isSupabaseConfigured) {
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
      }

      await loadComments(1);
    }

    loadUserAndComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postSlug]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setNotice("");

    if (!user) {
      setError("请先登录，再给这份档案留下评论。");
      return;
    }

    if (!user.email_confirmed_at) {
      setError("请先完成邮箱验证，猫老板才会接收评论。");
      return;
    }

    if (!profile?.nickname?.trim()) {
      setError("首次评论前，请先去个人中心设置昵称。");
      return;
    }

    if (!message.trim()) {
      setError("评论不能为空。");
      return;
    }

    setIsSubmitting(true);
    const { error: insertError } = await supabase.from("comments").insert({
      post_slug: postSlug,
      message: message.trim(),
    });
    setIsSubmitting(false);

    if (insertError) {
      setError(insertError.message);
      return;
    }

    setMessage("");
    setNotice("评论已盖上猫爪印。");
    setPage(1);
    await loadComments(1);
  }

  async function setApproved(commentId: number, approved: boolean) {
    setError("");
    setNotice("");
    setMutatingId(commentId);
    const { error: rpcError } = await supabase.rpc(
      "set_article_comment_approved",
      {
        comment_id: commentId,
        next_approved: approved,
      },
    );
    setMutatingId(null);

    if (rpcError) {
      setError(rpcError.message);
      return;
    }

    setNotice(approved ? "评论已公开。" : "评论已隐藏。");
    await loadComments(page);
  }

  async function deleteComment(commentId: number) {
    setError("");
    setNotice("");
    const confirmed = window.confirm("确认删除这条评论吗？");

    if (!confirmed) {
      return;
    }

    setMutatingId(commentId);
    const { error: rpcError } = await supabase.rpc("delete_article_comment", {
      comment_id: commentId,
    });
    setMutatingId(null);

    if (rpcError) {
      setError(rpcError.message);
      return;
    }

    setNotice("评论已删除。");
    await loadComments(page);
  }

  async function changePage(nextPage: number) {
    setPage(nextPage);
    setIsLoading(true);
    await loadComments(nextPage);
  }

  return (
    <section className="mx-auto mt-8 max-w-3xl rounded-2xl border border-orange-100 bg-orange-50/60 p-6 shadow-sm dark:border-orange-300/20 dark:bg-orange-300/10 md:p-8">
      <div className="mb-6">
        <span className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-bold text-orange-700 shadow-sm ring-1 ring-orange-100 dark:bg-slate-900 dark:text-orange-200 dark:ring-orange-300/20">
          💬 档案评论区
        </span>
        <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 md:text-3xl">
          给这份波比档案留爪印
        </h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900"
      >
        {user ? (
          <div className="mb-4 flex items-center gap-3">
            <UserAvatar
              avatarUrl={profile?.avatar_url}
              nickname={profile?.nickname}
            />
            <div>
              <p className="text-sm font-semibold text-orange-700 dark:text-orange-200">
                当前评论身份
              </p>
              <p className="font-bold text-slate-900 dark:text-slate-100">
                {profile?.nickname || "还没有设置昵称"}
              </p>
            </div>
          </div>
        ) : (
          <p className="mb-4 rounded-2xl bg-orange-50 p-4 text-sm leading-relaxed text-slate-700 dark:bg-orange-300/10 dark:text-slate-300">
            未登录访客可以浏览评论。{" "}
            <Link
              href="/auth"
              className="font-bold text-orange-700 underline dark:text-orange-200"
            >
              登录后发表评论
            </Link>
          </p>
        )}

        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          rows={4}
          placeholder="写下想留给波比老板和读者的小爪印……"
          className="w-full resize-none rounded-2xl border border-orange-100 bg-orange-50/60 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-orange-300 focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
        />

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
          className="mt-5 rounded-full bg-orange-100 px-5 py-3 text-sm font-bold text-orange-800 shadow-sm transition hover:bg-orange-200 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-orange-300/20 dark:text-orange-100"
        >
          {isSubmitting ? "猫爪盖章中..." : "发表评论"}
        </button>
      </form>

      <div className="mt-6 space-y-4">
        {isLoading && (
          <p className="rounded-2xl bg-white p-4 text-slate-600 shadow-sm dark:bg-slate-900 dark:text-slate-300">
            正在翻阅评论小纸条...
          </p>
        )}

        {!isLoading &&
          comments.map((comment) => {
            const canDelete = isAdmin || comment.user_id === user?.id;

            return (
              <article
                key={comment.id}
                className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="flex gap-3">
                    <UserAvatar
                      avatarUrl={comment.avatar_url}
                      nickname={comment.nickname}
                    />
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-bold text-slate-900 dark:text-slate-100">
                          {comment.nickname || "匿名猫友"}
                        </p>
                        {comment.review_status === "hidden" && (
                          <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                            已隐藏
                          </span>
                        )}
                      </div>
                      <time className="text-xs text-slate-500 dark:text-slate-400">
                        {formatCommentTime(comment.created_at)}
                      </time>
                      <p className="mt-3 leading-relaxed text-slate-700 dark:text-slate-300">
                        {comment.message}
                      </p>
                    </div>
                  </div>

                  <div className="flex shrink-0 flex-wrap gap-2">
                    {isAdmin && (
                      <>
                        <button
                          type="button"
                          disabled={mutatingId === comment.id}
                          onClick={() => setApproved(comment.id, true)}
                          className="rounded-full bg-orange-100 px-3 py-2 text-xs font-bold text-orange-800 shadow-sm transition hover:bg-orange-200 disabled:opacity-60 dark:bg-orange-300/20 dark:text-orange-100"
                        >
                          公开
                        </button>
                        <button
                          type="button"
                          disabled={mutatingId === comment.id}
                          onClick={() => setApproved(comment.id, false)}
                          className="rounded-full bg-slate-100 px-3 py-2 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-200 disabled:opacity-60 dark:bg-slate-800 dark:text-slate-200"
                        >
                          隐藏
                        </button>
                      </>
                    )}
                    {canDelete && (
                      <button
                        type="button"
                        disabled={mutatingId === comment.id}
                        onClick={() => deleteComment(comment.id)}
                        className="rounded-full bg-rose-100 px-3 py-2 text-xs font-bold text-rose-700 shadow-sm transition hover:bg-rose-200 disabled:opacity-60 dark:bg-rose-300/20 dark:text-rose-200"
                      >
                        删除
                      </button>
                    )}
                  </div>
                </div>
              </article>
            );
          })}

        {!isLoading && comments.length === 0 && (
          <p className="rounded-2xl bg-white p-4 text-slate-600 shadow-sm dark:bg-slate-900 dark:text-slate-300">
            还没有评论，欢迎留下第一枚猫爪印。
          </p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => changePage(page - 1)}
            className="rounded-full bg-white px-4 py-2 text-sm font-bold text-orange-700 shadow-sm ring-1 ring-orange-100 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-900 dark:text-orange-200 dark:ring-orange-300/20"
          >
            上一页
          </button>
          <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
            第 {page} / {totalPages} 页
          </span>
          <button
            type="button"
            disabled={page >= totalPages}
            onClick={() => changePage(page + 1)}
            className="rounded-full bg-white px-4 py-2 text-sm font-bold text-orange-700 shadow-sm ring-1 ring-orange-100 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-900 dark:text-orange-200 dark:ring-orange-300/20"
          >
            下一页
          </button>
        </div>
      )}
    </section>
  );
}
