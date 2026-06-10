"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { UserAvatar } from "@/app/_components/user-avatar";
import { isSupabaseConfigured, supabase } from "@/lib/supabase/client";
import { ensureProfile } from "@/lib/supabase/profile";
import type { Profile } from "@/lib/supabase/types";

export function AccountPanel() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [nickname, setNickname] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadAccount() {
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

      if (!currentUser) {
        setIsLoading(false);
        return;
      }

      try {
        const currentProfile = await ensureProfile(currentUser);
        setUser(currentUser);
        setProfile(currentProfile);
        setNickname(currentProfile?.nickname ?? "");
      } catch (profileError) {
        setError(
          profileError instanceof Error
            ? profileError.message
            : "读取猫猫档案失败。",
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadAccount();
  }, []);

  async function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setError("");

    if (!user) {
      setError("请先登录。");
      return;
    }

    if (!nickname.trim()) {
      setError("昵称不能为空，猫老板需要知道怎么称呼你。");
      return;
    }

    setIsSaving(true);
    const { data, error: updateError } = await supabase
      .from("profiles")
      .update({
        nickname: nickname.trim(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id)
      .select("*")
      .single();

    setIsSaving(false);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    setProfile(data);
    setMessage("猫猫档案已更新。");
    router.refresh();
  }

  async function handleAvatarChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    setMessage("");
    setError("");

    if (!file || !user) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("请上传图片文件。");
      return;
    }

    const extension = file.name.split(".").pop() || "jpg";
    const filePath = `${user.id}/avatar-${Date.now()}.${extension}`;

    setIsSaving(true);
    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (uploadError) {
      setIsSaving(false);
      setError(uploadError.message);
      return;
    }

    const { data: publicUrlData } = supabase.storage
      .from("avatars")
      .getPublicUrl(filePath);

    const { data, error: updateError } = await supabase
      .from("profiles")
      .update({
        avatar_url: publicUrlData.publicUrl,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id)
      .select("*")
      .single();

    setIsSaving(false);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    setProfile(data);
    setMessage("头像已更换，猫老板已盖爪确认。");
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/auth");
    router.refresh();
  }

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-orange-100 bg-white p-6 text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
        正在翻找你的猫猫档案...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <p className="text-lg text-slate-700 dark:text-slate-300">
          你还没有登录，暂时不能查看个人中心。
        </p>
        <Link
          href="/auth"
          className="mt-5 inline-flex rounded-full bg-orange-100 px-5 py-3 text-sm font-bold text-orange-800 shadow-sm transition hover:bg-orange-200 dark:bg-orange-300/20 dark:text-orange-100"
        >
          去登录
        </Link>
      </div>
    );
  }

  const isVerified = Boolean(user.email_confirmed_at);

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-[280px_minmax(0,1fr)]">
      <aside className="rounded-2xl border border-orange-100 bg-orange-50/70 p-6 text-center shadow-sm dark:border-orange-300/20 dark:bg-orange-300/10">
        <div className="flex justify-center">
          <UserAvatar
            avatarUrl={profile?.avatar_url}
            nickname={profile?.nickname}
            size="lg"
          />
        </div>
        <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          {profile?.nickname || "待命名访客"}
        </h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          {user.email}
        </p>
        <p className="mt-4 rounded-full bg-white px-3 py-2 text-sm font-bold text-orange-700 shadow-sm dark:bg-slate-900 dark:text-orange-200">
          {isVerified ? "邮箱已验证" : "等待邮箱验证"}
        </p>
      </aside>

      <section className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900 md:p-8">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          🐾 个人资料
        </h2>
        {!isVerified && (
          <p className="mt-4 rounded-2xl bg-rose-50 p-4 text-sm leading-relaxed text-rose-700 dark:bg-rose-300/10 dark:text-rose-200">
            请先完成邮箱验证。验证前可以整理资料，但暂时不能给猫老板投递留言。
          </p>
        )}

        <form onSubmit={handleSave} className="mt-6">
          <label className="block">
            <span className="text-sm font-semibold text-orange-700 dark:text-orange-200">
              昵称
            </span>
            <input
              value={nickname}
              onChange={(event) => setNickname(event.target.value)}
              placeholder="给自己起一个猫猫事务所代号"
              className="mt-2 w-full rounded-2xl border border-orange-100 bg-orange-50/60 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-orange-300 focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </label>

          <label className="mt-5 block">
            <span className="text-sm font-semibold text-orange-700 dark:text-orange-200">
              头像
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="mt-2 block w-full text-sm text-slate-600 file:mr-4 file:rounded-full file:border-0 file:bg-orange-100 file:px-4 file:py-2 file:text-sm file:font-bold file:text-orange-800 hover:file:bg-orange-200 dark:text-slate-300 dark:file:bg-orange-300/20 dark:file:text-orange-100"
            />
            <span className="mt-2 block text-sm text-slate-500 dark:text-slate-400">
              不上传也没关系，系统会自动生成猫爪风默认头像。
            </span>
          </label>

          {error && (
            <p className="mt-4 rounded-2xl bg-rose-50 p-3 text-sm text-rose-700 dark:bg-rose-300/10 dark:text-rose-200">
              {error}
            </p>
          )}
          {message && (
            <p className="mt-4 rounded-2xl bg-orange-50 p-3 text-sm text-orange-700 dark:bg-orange-300/10 dark:text-orange-200">
              {message}
            </p>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={isSaving}
              className="rounded-full bg-orange-100 px-5 py-3 text-sm font-bold text-orange-800 shadow-sm transition hover:bg-orange-200 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-orange-300/20 dark:text-orange-100"
            >
              保存猫猫档案
            </button>
            <button
              type="button"
              onClick={handleSignOut}
              className="rounded-full bg-slate-100 px-5 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200"
            >
              退出登录
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
