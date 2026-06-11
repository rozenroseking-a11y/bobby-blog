"use client";

import { useEffect, useState } from "react";
import { isSupabaseConfigured, supabase } from "@/lib/supabase/client";
import type { ArticleMetrics } from "@/lib/supabase/types";

type Props = {
  postSlug: string;
};

export function ArticleStatBadges({ postSlug }: Props) {
  const [metrics, setMetrics] = useState<ArticleMetrics>({
    view_count: 0,
    like_count: 0,
    liked_by_me: false,
  });

  useEffect(() => {
    async function loadMetrics() {
      if (!isSupabaseConfigured) {
        return;
      }

      const { data } = await supabase.rpc("article_metrics", {
        target_post_slug: postSlug,
      });

      setMetrics({
        view_count: data?.[0]?.view_count ?? 0,
        like_count: data?.[0]?.like_count ?? 0,
        liked_by_me: data?.[0]?.liked_by_me ?? false,
      });
    }

    loadMetrics();
  }, [postSlug]);

  return (
    <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold">
      <span className="rounded-full bg-orange-50 px-3 py-1 text-orange-700 ring-1 ring-orange-100 dark:bg-orange-300/10 dark:text-orange-200 dark:ring-orange-300/20">
        👀 {metrics.view_count} 次查阅
      </span>
      <span className="rounded-full bg-rose-50 px-3 py-1 text-rose-700 ring-1 ring-rose-100 dark:bg-rose-300/10 dark:text-rose-200 dark:ring-rose-300/20">
        🐾 {metrics.like_count} 个爪印
      </span>
    </div>
  );
}
