const moods = ["😾 不想上班", "😸 正在营业", "😴 已经下班"];

type Props = {
  latestPostTitle: string;
  latestPostSlug: string;
};

const quickLinks = [
  { href: "/posts", label: "查看档案记录", icon: "📂" },
  { href: "/guestbook", label: "进入来访登记簿", icon: "📮" },
  { href: "/feedback", label: "投递猫老板信箱", icon: "✉️" },
  { href: "/changelog", label: "查看事务所公告栏", icon: "📌" },
];

export function BobbyOfficeWidgets({ latestPostTitle, latestPostSlug }: Props) {
  return (
    <section className="mb-8 space-y-4 md:mb-10">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <article className="rounded-2xl border border-orange-100 bg-orange-50/80 p-5 shadow-sm dark:border-orange-300/20 dark:bg-orange-300/10">
          <div className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-bold text-orange-700 shadow-sm ring-1 ring-orange-100 dark:bg-slate-900 dark:text-orange-200 dark:ring-orange-300/20">
            📌 今日档案
          </div>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              ["最新日记", latestPostTitle, `/posts/${latestPostSlug}`],
              ["最新留言", "来访小纸条等待猫老板审阅", "/guestbook"],
              ["最新批注", "档案批注区持续收件中", `/posts/${latestPostSlug}`],
              ["最新更新", "事务所公告栏已贴上新便签", "/changelog"],
            ].map(([label, text, href]) => (
              <a
                key={label}
                href={href}
                className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-orange-100 transition hover:-translate-y-1 hover:shadow-md dark:bg-slate-900 dark:ring-orange-300/20"
              >
                <p className="text-xs font-bold text-orange-700 dark:text-orange-200">
                  {label}
                </p>
                <p className="mt-2 text-base font-bold leading-relaxed text-slate-900 dark:text-slate-100">
                  {text}
                </p>
              </a>
            ))}
          </div>
        </article>

        <article className="self-start rounded-2xl border border-orange-100 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <div className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-bold text-rose-700 shadow-sm ring-1 ring-rose-100 dark:bg-slate-900 dark:text-rose-200 dark:ring-rose-300/20">
            🗃️ 波比事务所简介卡
          </div>
          <dl className="mt-4 space-y-3 text-sm leading-relaxed md:text-base">
            <div>
              <dt className="font-bold text-slate-900 dark:text-slate-100">
                档案管理员
              </dt>
              <dd className="text-slate-700 dark:text-slate-300">波比</dd>
            </div>
            <div>
              <dt className="font-bold text-slate-900 dark:text-slate-100">
                协助整理
              </dt>
              <dd className="text-slate-700 dark:text-slate-300">
                人类铲屎官
              </dd>
            </div>
            <div>
              <dt className="font-bold text-slate-900 dark:text-slate-100">
                主要业务
              </dt>
              <dd className="text-slate-700 dark:text-slate-300">
                记录生活、吃饭、睡觉、搞笑瞬间、建站折腾
              </dd>
            </div>
          </dl>
        </article>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <article className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            今日心情
          </h2>
          <div className="mt-5 flex flex-wrap gap-3">
            {moods.map((mood) => {
              const isActive = mood === "😸 正在营业";

              return (
                <span
                  key={mood}
                  className={
                    isActive
                      ? "rounded-full bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700 shadow-sm ring-1 ring-orange-200 dark:bg-orange-300/10 dark:text-orange-200 dark:ring-orange-300/30"
                      : "rounded-full bg-slate-50 px-4 py-2 text-sm font-medium text-slate-600 ring-1 ring-orange-100 dark:bg-slate-800/70 dark:text-slate-300 dark:ring-slate-700"
                  }
                >
                  {mood}
                </span>
              );
            })}
          </div>
        </article>

        <article className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            本月冻干消耗量
          </h2>
          <p className="mt-5 text-xl font-semibold text-rose-700 dark:text-rose-200">
            12 包
          </p>
          <p className="mt-3 text-base leading-relaxed text-slate-700 dark:text-slate-300">
            财务部表示震惊，猫老板表示这是正常办公支出。
          </p>
        </article>

        <article className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            今日访客
          </h2>
          <p className="mt-5 text-xl font-semibold text-sky-700 dark:text-sky-200">
            胖虎 & 纳豆
          </p>
          <p className="mt-3 text-base leading-relaxed text-slate-700 dark:text-slate-300">
            两位朋友正在观察波比老板今日营业状态。
          </p>
        </article>
      </div>

      <div className="rounded-2xl border border-orange-100 bg-orange-50/80 p-5 shadow-sm dark:border-orange-300/20 dark:bg-orange-300/10">
        <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          ⚡ 快速入口
        </h2>
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {quickLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-2xl bg-white px-4 py-3 text-sm font-bold text-orange-800 shadow-sm ring-1 ring-orange-100 transition hover:-translate-y-1 hover:shadow-md dark:bg-slate-900 dark:text-orange-100 dark:ring-orange-300/20"
            >
              {link.icon} {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
