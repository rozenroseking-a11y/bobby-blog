"use client";

import cn from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AuthNav } from "./auth-nav";
import { ThemeSwitcher } from "./theme-switcher";

const navItems = [
  { href: "/", label: "首页" },
  { href: "/posts", label: "档案记录" },
  { href: "/search", label: "搜索" },
  { href: "/categories", label: "分类" },
  { href: "/gallery", label: "影像档案" },
  { href: "/friends", label: "来访猫友" },
  { href: "/about", label: "波比档案" },
  { href: "/guestbook", label: "来访登记簿" },
  { href: "/feedback", label: "猫老板信箱" },
  { href: "/changelog", label: "公告栏" },
];

export function SiteNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  function renderNavLinks() {
    return navItems.map((item) => {
      const isActive =
        item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

      return (
        <Link
          key={item.href}
          href={item.href}
          onClick={() => setIsOpen(false)}
          className={cn(
            "rounded-full px-3 py-2 text-sm font-medium transition-colors lg:px-3",
            isActive
              ? "bg-orange-100 text-orange-700 shadow-sm dark:bg-orange-300/20 dark:text-orange-200"
              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100",
          )}
        >
          {item.label}
        </Link>
      );
    });
  }

  return (
    <header className="sticky top-0 z-10 border-b border-slate-200/70 bg-white/90 backdrop-blur dark:border-slate-700/70 dark:bg-slate-900/90">
      <div className="mx-auto flex w-full max-w-[1180px] flex-col px-4 py-3 md:px-6">
        <div className="flex items-center justify-between gap-3">
          <Link
            href="/"
            className="shrink-0 text-lg font-bold tracking-tight text-slate-900 hover:text-orange-600 dark:text-slate-100 dark:hover:text-orange-300"
          >
            波比事务所
          </Link>
          <nav
            aria-label="主导航"
            className="hidden min-w-0 flex-1 items-center justify-end gap-1 lg:flex"
          >
            {renderNavLinks()}
            <AuthNav />
            <ThemeSwitcher />
          </nav>
          <div className="flex items-center gap-2 lg:hidden">
            <AuthNav compact />
            <ThemeSwitcher />
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
            className="mt-3 grid grid-cols-2 gap-2 rounded-2xl border border-orange-100 bg-orange-50/80 p-3 shadow-sm dark:border-orange-300/20 dark:bg-orange-300/10 sm:grid-cols-3 lg:hidden"
          >
            {renderNavLinks()}
          </nav>
        )}
      </div>
    </header>
  );
}
