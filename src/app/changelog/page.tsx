import Container from "@/app/_components/container";
import { PageHeader } from "@/app/_components/page-header";

const updates = [
  {
    date: "2026-06-11",
    title: "上线猫老板互动功能",
    tag: "功能",
    items: ["档案批注进入待审流程", "来访登记簿接入用户头像与昵称", "猫老板办公室新增信箱档案"],
  },
  {
    date: "2026-06-10",
    title: "档案记录与影像档案归档",
    tag: "优化",
    items: ["新增档案记录入口", "相册升级为影像档案", "文章详情页改成猫猫档案风格"],
  },
  {
    date: "2026-06-09",
    title: "朋友来访备案",
    tag: "上线",
    items: ["胖虎和纳豆加入影像档案", "新增来访猫友页面", "导航栏补齐事务所入口"],
  },
];

export default function ChangelogPage() {
  return (
    <main>
      <Container>
        <PageHeader
          eyebrow="📝 营业公告"
          title="事务所公告栏"
          description="这里记录波比事务所每次装修、加班和猫爪盖章通过的网站更新。"
        />

        <section className="mb-16 space-y-5">
          {updates.map((update) => (
            <article
              key={`${update.date}-${update.title}`}
              className="rounded-2xl border border-orange-100 bg-orange-50/70 p-5 shadow-sm dark:border-orange-300/20 dark:bg-orange-300/10"
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="flex flex-wrap gap-2">
                    <time className="rounded-full bg-white px-4 py-2 text-sm font-bold text-orange-700 ring-1 ring-orange-100 dark:bg-slate-900 dark:text-orange-200 dark:ring-orange-300/20">
                      {update.date}
                    </time>
                    <span className="rounded-full bg-rose-50 px-4 py-2 text-sm font-bold text-rose-700 ring-1 ring-rose-100 dark:bg-rose-300/10 dark:text-rose-200 dark:ring-rose-300/20">
                      {update.tag}
                    </span>
                  </div>
                  <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                    📌 {update.title}
                  </h2>
                </div>
              </div>
              <ul className="mt-5 space-y-3 text-base leading-relaxed text-slate-700 dark:text-slate-300">
                {update.items.map((item) => (
                  <li key={item}>✦ {item}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>
      </Container>
    </main>
  );
}
