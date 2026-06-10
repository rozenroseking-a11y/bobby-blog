"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { UserAvatar } from "./user-avatar";
import { isSupabaseConfigured, supabase } from "@/lib/supabase/client";
import { ensureProfile } from "@/lib/supabase/profile";
import type { Profile } from "@/lib/supabase/types";

const ADMIN_EMAILS = ["h981411799@126.com", "gg981411799@126.com"];

export function AuthNav() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

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
        className="rounded-full bg-orange-50 px-4 py-2 text-sm font-bold text-orange-700 shadow-sm ring-1 ring-orange-100 transition hover:bg-orange-100 dark:bg-orange-300/10 dark:text-orange-200 dark:ring-orange-300/20"
      >
        登录
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {user.email && ADMIN_EMAILS.includes(user.email) && (
        <Link
          href="/admin"
          className="rounded-full bg-rose-50 px-4 py-2 text-sm font-bold text-rose-700 shadow-sm ring-1 ring-rose-100 transition hover:bg-rose-100 dark:bg-rose-300/10 dark:text-rose-200 dark:ring-rose-300/20"
        >
          猫老板后台
        </Link>
      )}
      <Link
        href="/account"
        className="flex items-center gap-2 rounded-full bg-orange-50 px-2 py-1 pr-3 text-sm font-bold text-orange-700 shadow-sm ring-1 ring-orange-100 transition hover:bg-orange-100 dark:bg-orange-300/10 dark:text-orange-200 dark:ring-orange-300/20"
      >
        <UserAvatar
          avatarUrl={profile?.avatar_url}
          nickname={profile?.nickname}
          size="sm"
        />
        <span className="max-w-24 truncate">
          {profile?.nickname || "个人中心"}
        </span>
      </Link>
      <button
        type="button"
        onClick={handleSignOut}
        className="rounded-full px-3 py-2 text-sm font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100"
      >
        退出
      </button>
    </div>
  );
}
