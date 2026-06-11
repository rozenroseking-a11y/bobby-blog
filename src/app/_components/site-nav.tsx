"use client";

import cn from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AuthNav } from "./auth-nav";
import { ThemeSwitcher } from "./theme-switcher";

const primaryNavItems = [
  { href: "/", label: "首页" },
  { href: "/posts", label: "档案记录" },
  { href: "/gallery", label: "影像档案" },
  { href: "/guestbook", label: "来访登记簿" },
];

const moreNavItems = [
  { href: "/search", label: "搜索" },
  { href: "/categories", label: "档案分类" },
  { href: "/friends", label: "来访猫友" },
  { href: "/about", label: "波比档案" },
  { href: "/feedback", label: "猫老板信箱" },
  { href: "/changelog", label: "事务所公告栏" },
];

export function SiteNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  function renderLink(
    item: {
      href: string;
      label: string;
    },
    variant: "pill" | "menu" = "pill",
  ) {
      const isActive =
        item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

      return (
        <Link
          href={item.href}
          onClick={() => {
            setIsOpen(false);
            setIsMoreOpen(false);
          }}
          className={cn(
            variant === "pill"
              ? "whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium transition-colors"
              : "block rounded-xl px-3 py-2 text-sm font-bold transition-colors",
            isActive
              ? variant === "pill"
                ? "bg-orange-100 text-orange-700 shadow-sm dark:bg-orange-300/20 dark:text-orange-200"
                : "bg-orange-50 text-orange-700 dark:bg-orange-300/10 dark:text-orange-200"
              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100",
          )}
        >
          {item.label}
        </Link>
      );
  }

  const isMoreActive = moreNavItems.some((item) =>
    pathname.startsWith(item.href),
  );

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur dark:border-slate-700/70 dark:bg-slate-900/90">
      <div className="mx-auto flex w-full max-w-[1180px] flex-col px-4 py-2.5 md:px-6">
        <div className="flex items-center justify-between gap-3">
          <Link
            href="/"
            className="shrink-0 text-lg font-bold tracking-tight text-slate-900 hover:text-orange-600 dark:text-slate-100 dark:hover:text-orange-300"
          >
            波比事务所
          </Link>
          <nav
            aria-label="主导航"
            className="hidden min-w-0 flex-1 items-center justify-center gap-1 lg:flex"
          >
            {primaryNavItems.map((item) => (
              <span key={item.href}>{renderLink(item)}</span>
            ))}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsMoreOpen((open) => !open)}
                className={cn(
                  "whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium transition-colors",
                  isMoreActive
                    ? "bg-orange-100 text-orange-700 shadow-sm dark:bg-orange-300/20 dark:text-orange-200"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100",
                )}
                aria-expanded={isMoreOpen}
              >
                更多 ▾
              </button>
              {isMoreOpen && (
                <div className="absolute right-0 top-full z-50 mt-2 w-56 rounded-2xl border border-orange-100 bg-white p-2 shadow-lg dark:border-slate-700 dark:bg-slate-900">
                  {moreNavItems.map((item) => (
                    <div key={item.href}>{renderLink(item, "menu")}</div>
                  ))}
                  <div className="mt-2 flex items-center justify-between border-t border-orange-100 px-3 py-2 text-sm font-bold text-slate-700 dark:border-slate-700 dark:text-slate-200">
                    <span>主题切换</span>
                    <ThemeSwitcher />
                  </div>
                </div>
              )}
            </div>
          </nav>
          <div className="hidden items-center justify-end lg:flex">
            <AuthNav />
          </div>
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => setIsOpen((open) => !open)}
              className="rounded-full bg-orange-50 px-4 py-2 text-sm font-bold text-orange-700 shadow-sm ring-1 ring-orange-100 dark:bg-orange-300/10 dark:text-orange-200 dark:ring-orange-300/20"
              aria-expanded={isOpen}
            >
              {isOpen ? "收起" : "菜单"}
            </button>
          </div>
        </div>

        {isOpen && (
          <nav
            aria-label="移动端主导航"
            className="relative z-50 mt-3 rounded-2xl border border-orange-100 bg-orange-50/95 p-3 shadow-lg dark:border-orange-300/20 dark:bg-slate-900/95 lg:hidden"
          >
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {[...primaryNavItems, ...moreNavItems].map((item) => (
                <span key={item.href}>{renderLink(item)}</span>
              ))}
            </div>
            <div className="mt-3 flex items-center justify-between rounded-2xl bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm ring-1 ring-orange-100 dark:bg-slate-900 dark:text-slate-200 dark:ring-orange-300/20">
              <span>主题切换</span>
              <ThemeSwitcher />
            </div>
            <div className="mt-3">
              <AuthNav menu onNavigate={() => setIsOpen(false)} />
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
