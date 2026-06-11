"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export type SearchEntry = {
  title: string;
  href: string;
  excerpt: string;
  type: string;
  category?: string;
};

type Props = {
  entries: SearchEntry[];
};

export function SearchClient({ entries }: Props) {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (!normalizedQuery) {
      return entries;
    }

    return entries.filter((entry) =>
      [entry.title, entry.excerpt, entry.type, entry.category]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [entries, normalizedQuery]);

  return (
    <section className="mb-16">
      <div className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <label
          htmlFor="site-search"
          className="text-sm font-bold text-orange-700 dark:text-orange-200"
        >
          🔎 搜索事务所档案
        </label>
        <input
          id="site-search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="试试搜索：冻干、午睡、留言、胖虎、纳豆……"
          className="mt-3 w-full rounded-2xl border border-orange-100 bg-orange-50/70 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-orange-300 focus:ring-4 focus:ring-orange-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:ring-orange-300/20"
        />
        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
          共找到 {results.length} 份猫爪档案。
        </p>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        {results.map((entry) => (
          <Link
            key={entry.href}
            href={entry.href}
            className="group rounded-2xl border border-orange-100 bg-orange-50/60 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-orange-300/20 dark:bg-orange-300/10"
          >
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-orange-700 ring-1 ring-orange-100 dark:bg-slate-900 dark:text-orange-200 dark:ring-orange-300/20">
                {entry.type}
              </span>
              {entry.category && (
                <span className="rounded-full bg-rose-50 px-3 py-1 text-xs font-bold text-rose-700 ring-1 ring-rose-100 dark:bg-rose-300/10 dark:text-rose-200 dark:ring-rose-300/20">
                  {entry.category}
                </span>
              )}
            </div>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 group-hover:text-orange-700 dark:text-slate-100 dark:group-hover:text-orange-200">
              {entry.title}
            </h2>
            <p className="mt-3 line-clamp-3 text-base leading-relaxed text-slate-700 dark:text-slate-300">
              {entry.excerpt}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
