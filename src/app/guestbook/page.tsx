import Container from "@/app/_components/container";

const messages = [
  "波比老板今天也认真营业了吗？",
  "申请报销一包冻干作为精神损耗费。",
  "胖虎和纳豆下次来访请提前公告！",
];

export default function GuestbookPage() {
  return (
    <main>
      <Container>
        <section className="mt-16 mb-12 text-center md:text-left">
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight">
            给波比老板投递小纸条 🐾
          </h1>
          <p className="text-lg mt-5 text-slate-600 dark:text-slate-300">
            留言会先投递到猫老板的待审纸箱，审核通过后再公开展示。
          </p>
        </section>

        <section className="grid grid-cols-1 gap-8 mb-20 md:grid-cols-[minmax(0,1fr)_minmax(280px,420px)]">
          <form className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900 md:p-8">
            <h2 className="mb-5 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              📮 投递小纸条
            </h2>
            <label className="block">
              <span className="text-sm font-semibold text-orange-700 dark:text-orange-200">
                名字
              </span>
              <input
                type="text"
                name="name"
                placeholder="例如：冻干赞助商 / 路过的小猫 / 胖虎观察员"
                className="mt-2 w-full rounded-2xl border border-orange-100 bg-orange-50/60 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-orange-300 focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-orange-300"
              />
            </label>

            <label className="mt-5 block">
              <span className="text-sm font-semibold text-orange-700 dark:text-orange-200">
                留言
              </span>
              <textarea
                name="message"
                rows={6}
                placeholder="写下想交给波比老板的小纸条……"
                className="mt-2 w-full resize-none rounded-2xl border border-orange-100 bg-orange-50/60 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-orange-300 focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-orange-300"
              />
            </label>

            <button
              type="button"
              className="mt-6 rounded-full bg-orange-100 px-5 py-3 text-sm font-bold text-orange-800 shadow-sm transition hover:bg-orange-200 dark:bg-orange-300/20 dark:text-orange-100 dark:hover:bg-orange-300/30"
            >
              投递给猫老板
            </button>
            <p className="mt-4 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              注：猫老板可能会先睡一觉，再慢慢查阅大家的小纸条。
            </p>
          </form>

          <aside className="rounded-2xl border border-rose-100 bg-rose-50/70 p-5 shadow-sm dark:border-rose-300/20 dark:bg-rose-300/10 md:p-8">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              🐱 猫老板已读样例
            </h2>
            <div className="mt-5 space-y-4">
              {messages.map((message) => (
                <p
                  key={message}
                  className="rounded-2xl bg-white/80 p-4 text-base leading-relaxed text-slate-700 shadow-sm ring-1 ring-rose-100 dark:bg-slate-900/80 dark:text-slate-300 dark:ring-rose-300/20"
                >
                  「{message}」
                </p>
              ))}
            </div>
          </aside>
        </section>
      </Container>
    </main>
  );
}
