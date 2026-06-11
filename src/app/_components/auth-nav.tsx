"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { UserAvatar } from "./user-avatar";
import { isSupabaseConfigured, supabase } from "@/lib/supabase/client";
import { ensureProfile } from "@/lib/supabase/profile";
import type { Profile } from "@/lib/supabase/types";

const ADMIN_EMAILS = ["h981411799@126.com", "gg981411799@126.com"];

type Props = {
  compact?: boolean;
  menu?: boolean;
  onNavigate?: () => void;
};

export function AuthNav({ compact = false, menu = false, onNavigate }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      return;
    }

    async function loadUser() {
      const {
        data: { user: currentUser },
      } = await supabase.auth.getUser();

      setUser(currentUser);

      if (currentUser) {
        const currentProfile = await ensureProfile(currentUser);
        setProfile(currentProfile);
      } else {
        setProfile(null);
      }
    }

    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);

      if (currentUser) {
        ensureProfile(currentUser).then(setProfile).catch(() => setProfile(null));
      } else {
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleSignOut() {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  }

  if (!user) {
    return (
      <Link
        href="/auth"
        onClick={onNavigate}
        className="rounded-full bg-orange-50 px-4 py-2 text-sm font-bold text-orange-700 shadow-sm ring-1 ring-orange-100 transition hover:bg-orange-100 dark:bg-orange-300/10 dark:text-orange-200 dark:ring-orange-300/20"
      >
        登录
      </Link>
    );
  }

  if (menu) {
    return (
      <div className="rounded-2xl bg-white p-3 shadow-sm ring-1 ring-orange-100 dark:bg-slate-900 dark:ring-orange-300/20">
        <div className="mb-2 flex items-center gap-3 px-2 py-1">
          <UserAvatar
            avatarUrl={profile?.avatar_url}
            nickname={profile?.nickname}
            size="sm"
          />
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-slate-900 dark:text-slate-100">
              {profile?.nickname || "个人档案"}
            </p>
            <p className="truncate text-xs text-slate-500 dark:text-slate-400">
              {user.email}
            </p>
          </div>
        </div>
        <Link
          href="/account"
          onClick={onNavigate}
          className="block rounded-xl px-3 py-2 text-sm font-bold text-slate-700 hover:bg-orange-50 dark:text-slate-200 dark:hover:bg-orange-300/10"
        >
          个人中心
        </Link>
        {user.email && ADMIN_EMAILS.includes(user.email) && (
          <Link
            href="/admin"
            onClick={onNavigate}
            className="block rounded-xl px-3 py-2 text-sm font-bold text-slate-700 hover:bg-orange-50 dark:text-slate-200 dark:hover:bg-orange-300/10"
          >
            猫老板办公室
          </Link>
        )}
        <button
          type="button"
          onClick={() => {
            onNavigate?.();
            handleSignOut();
          }}
          className="block w-full rounded-xl px-3 py-2 text-left text-sm font-bold text-rose-700 hover:bg-rose-50 dark:text-rose-200 dark:hover:bg-rose-300/10"
        >
          退出登录
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="flex items-center gap-2 rounded-full bg-orange-50 px-2 py-1 pr-3 text-sm font-bold text-orange-700 shadow-sm ring-1 ring-orange-100 transition hover:bg-orange-100 dark:bg-orange-300/10 dark:text-orange-200 dark:ring-orange-300/20"
        aria-expanded={isOpen}
      >
        <UserAvatar
          avatarUrl={profile?.avatar_url}
          nickname={profile?.nickname}
          size="sm"
        />
        <span className={compact ? "sr-only" : "max-w-24 truncate"}>
          {profile?.nickname || "个人档案"}
        </span>
        {!compact && <span className="text-xs">▾</span>}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 w-56 rounded-2xl border border-orange-100 bg-white p-2 shadow-lg dark:border-slate-700 dark:bg-slate-900">
          <div className="px-3 py-2 text-sm">
            <p className="font-bold text-slate-900 dark:text-slate-100">
              {profile?.nickname || "个人档案"}
            </p>
            <p className="truncate text-xs text-slate-500 dark:text-slate-400">
              {user.email}
            </p>
          </div>
          <Link
            href="/account"
            onClick={() => setIsOpen(false)}
            className="block rounded-xl px-3 py-2 text-sm font-bold text-slate-700 hover:bg-orange-50 dark:text-slate-200 dark:hover:bg-orange-300/10"
          >
            个人中心
          </Link>
          {user.email && ADMIN_EMAILS.includes(user.email) && (
            <Link
              href="/admin"
              onClick={() => setIsOpen(false)}
              className="block rounded-xl px-3 py-2 text-sm font-bold text-slate-700 hover:bg-orange-50 dark:text-slate-200 dark:hover:bg-orange-300/10"
            >
              猫老板办公室
            </Link>
          )}
          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              handleSignOut();
            }}
            className="block w-full rounded-xl px-3 py-2 text-left text-sm font-bold text-rose-700 hover:bg-rose-50 dark:text-rose-200 dark:hover:bg-rose-300/10"
          >
            退出登录
          </button>
        </div>
      )}
    </div>
  );
}
