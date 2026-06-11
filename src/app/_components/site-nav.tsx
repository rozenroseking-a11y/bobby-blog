"use client";

import cn from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AuthNav } from "./auth-nav";
import { ThemeSwitcher } from "./theme-switcher";

const navItems = [
  { href: "/", label: "首页" },
  { href: "/posts", label: "波比日记" },
  { href: "/search", label: "搜索" },
  { href: "/categories", label: "分类" },
  { href: "/gallery", label: "波比相册" },
  { href: "/friends", label: "猫猫朋友" },
  { href: "/about", label: "关于波比" },
  { href: "/guestbook", label: "留言区" },
  { href: "/feedback", label: "意见反馈" },
  { href: "/changelog", label: "更新日志" },
];

export function SiteNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-10 border-b border-slate-200/70 bg-white/90 backdrop-blur dark:border-slate-700/70 dark:bg-slate-900/90">
      <div className="container mx-auto flex flex-col gap-3 px-5 py-4 md:flex-row md:items-center md:justify-between">
        <Link
          href="/"
          className="text-lg font-bold tracking-tight text-slate-900 hover:text-orange-600 dark:text-slate-100 dark:hover:text-orange-300"
        >
          波比事务所
        </Link>
        <nav
          aria-label="主导航"
          className="flex flex-wrap items-center gap-2 md:justify-end"
        >
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-orange-100 text-orange-700 shadow-sm dark:bg-orange-300/20 dark:text-orange-200"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100",
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <AuthNav />
          <ThemeSwitcher />
        </nav>
      </div>
    </header>
  );
}
