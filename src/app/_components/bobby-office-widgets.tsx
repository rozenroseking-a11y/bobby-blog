const moods = ["😾 不想上班", "😸 正在营业", "😴 已经下班"];

export function BobbyOfficeWidgets() {
  return (
    <section className="grid grid-cols-1 gap-5 mb-12 md:grid-cols-3 md:mb-16">
      <div className="rounded-lg border border-orange-100 bg-orange-50/80 p-6 shadow-sm dark:border-orange-300/20 dark:bg-orange-300/10">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
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
                    ? "rounded-full bg-white px-4 py-2 text-sm font-semibold text-orange-700 shadow-sm ring-1 ring-orange-200 dark:bg-slate-900 dark:text-orange-200 dark:ring-orange-300/30"
                    : "rounded-full bg-white/70 px-4 py-2 text-sm font-medium text-slate-600 ring-1 ring-orange-100 dark:bg-slate-800/70 dark:text-slate-300 dark:ring-slate-700"
                }
              >
                {mood}
              </span>
            );
          })}
        </div>
      </div>

      <div className="rounded-lg border border-rose-100 bg-rose-50/80 p-6 shadow-sm dark:border-rose-300/20 dark:bg-rose-300/10">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          本月冻干消耗量
        </h2>
        <p className="mt-5 text-xl font-semibold text-rose-700 dark:text-rose-200">
          本月冻干消耗量：12 包
        </p>
        <p className="mt-3 text-base leading-relaxed text-slate-700 dark:text-slate-300">
          财务部表示非常震惊，猫老板表示这是正常办公支出。
        </p>
      </div>

      <div className="rounded-lg border border-sky-100 bg-sky-50/80 p-6 shadow-sm dark:border-sky-300/20 dark:bg-sky-300/10">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          今日访客
        </h2>
        <p className="mt-5 text-xl font-semibold text-sky-700 dark:text-sky-200">
          胖虎 & 纳豆
        </p>
        <p className="mt-3 text-base leading-relaxed text-slate-700 dark:text-slate-300">
          两位朋友正在观察波比老板今日营业状态。
        </p>
      </div>
    </section>
  );
}
