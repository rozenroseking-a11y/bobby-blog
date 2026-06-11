"use client";

import { useEffect, useState } from "react";
import { isSupabaseConfigured, supabase } from "@/lib/supabase/client";
import type { ArticleMetrics as ArticleMetricsType } from "@/lib/supabase/types";

type Props = {
  postSlug: string;
};

const VISITOR_ID_KEY = "bobby-office-visitor-id";

function getVisitorId() {
  const existing = localStorage.getItem(VISITOR_ID_KEY);

  if (existing) {
    return existing;
  }

  const next =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

  localStorage.setItem(VISITOR_ID_KEY, next);
  return next;
}

function normalizeMetrics(
  data?: ArticleMetricsType[] | null,
): ArticleMetricsType {
  return {
    view_count: data?.[0]?.view_count ?? 0,
    like_count: data?.[0]?.like_count ?? 0,
    liked_by_me: data?.[0]?.liked_by_me ?? false,
  };
}

export function ArticleMetrics({ postSlug }: Props) {
  const [metrics, setMetrics] = useState<ArticleMetricsType>({
    view_count: 0,
    like_count: 0,
    liked_by_me: false,
  });
  const [error, setError] = useState("");
  const [isLiking, setIsLiking] = useState(false);

  useEffect(() => {
    async function loadMetrics() {
      if (!isSupabaseConfigured) {
        return;
      }

      const visitorId = getVisitorId();
      const { data, error: viewError } = await supabase.rpc(
        "increment_article_view",
        {
          target_post_slug: postSlug,
          visitor_id: visitorId,
        },
      );

      if (viewError) {
        setError(viewError.message);
        return;
      }

      const { data: metricsData } = await supabase.rpc("article_metrics", {
        target_post_slug: postSlug,
      });

      setMetrics({
        ...normalizeMetrics(metricsData),
        view_count: data ?? normalizeMetrics(metricsData).view_count,
      });
    }

    loadMetrics();
  }, [postSlug]);

  async function handleLike() {
    setError("");
    setIsLiking(true);
    const { data, error: likeError } = await supabase.rpc(
      "toggle_article_like",
      {
        target_post_slug: postSlug,
      },
    );
    setIsLiking(false);

    if (likeError) {
      setError("请先登录，再给波比档案点赞。");
      return;
    }

    setMetrics(normalizeMetrics(data));
  }

  return (
    <section className="max-w-3xl mx-auto mb-8 rounded-2xl border border-orange-100 bg-orange-50/70 p-4 shadow-sm dark:border-orange-300/20 dark:bg-orange-300/10">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-3">
          <div className="rounded-full bg-white px-4 py-2 text-sm font-bold text-orange-700 shadow-sm ring-1 ring-orange-100 dark:bg-slate-900 dark:text-orange-200 dark:ring-orange-300/20">
            👀 阅读 {metrics.view_count}
          </div>
          <div className="rounded-full bg-white px-4 py-2 text-sm font-bold text-rose-700 shadow-sm ring-1 ring-rose-100 dark:bg-slate-900 dark:text-rose-200 dark:ring-rose-300/20">
            🐾 点赞 {metrics.like_count}
          </div>
        </div>
        <button
          type="button"
          onClick={handleLike}
          disabled={isLiking}
          className={
            metrics.liked_by_me
              ? "rounded-full bg-rose-100 px-5 py-3 text-sm font-bold text-rose-700 shadow-sm transition hover:bg-rose-200 disabled:opacity-60 dark:bg-rose-300/20 dark:text-rose-200"
              : "rounded-full bg-white px-5 py-3 text-sm font-bold text-orange-800 shadow-sm ring-1 ring-orange-100 transition hover:bg-orange-100 disabled:opacity-60 dark:bg-slate-900 dark:text-orange-100 dark:ring-orange-300/20"
          }
        >
          {metrics.liked_by_me ? "已留下猫爪" : "给档案点赞"}
        </button>
      </div>
      {error && (
        <p className="mt-3 text-sm text-rose-700 dark:text-rose-200">
          {error}
        </p>
      )}
    </section>
  );
}
