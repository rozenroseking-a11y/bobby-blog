import Container from "@/app/_components/container";
import { PageHeader } from "@/app/_components/page-header";

const updates = [
  {
    date: "2026-06-11",
    title: "上线猫老板互动功能",
    items: ["文章评论进入待审流程", "留言区接入用户头像与昵称", "后台新增反馈箱"],
  },
  {
    date: "2026-06-10",
    title: "波比日记与相册归档",
    items: ["新增波比日记入口", "相册升级为影像档案", "文章详情页改成猫猫档案风格"],
  },
  {
    date: "2026-06-09",
    title: "朋友来访备案",
    items: ["胖虎和纳豆加入相册", "新增猫猫朋友页面", "导航栏补齐事务所入口"],
  },
];

export default function ChangelogPage() {
  return (
    <main>
      <Container>
        <PageHeader
          eyebrow="📝 营业公告"
          title="网站更新日志"
          description="这里记录波比事务所每次装修、加班和猫爪盖章通过的网站更新。"
        />

        <section className="mb-24 space-y-6">
          {updates.map((update) => (
            <article
              key={`${update.date}-${update.title}`}
              className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900"
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                  🐾 {update.title}
                </h2>
                <time className="rounded-full bg-orange-50 px-4 py-2 text-sm font-bold text-orange-700 ring-1 ring-orange-100 dark:bg-orange-300/10 dark:text-orange-200 dark:ring-orange-300/20">
                  {update.date}
                </time>
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
