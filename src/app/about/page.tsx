import Container from "@/app/_components/container";
import Image from "next/image";

const profileCards = [
  {
    icon: "🐾",
    label: "职位",
    value: "波比事务所老板",
  },
  {
    icon: "🍗",
    label: "喜欢",
    value: "冻干、午睡、被夸可爱、巡视事务所",
  },
  {
    icon: "😾",
    label: "不喜欢",
    value: "加班、被打扰睡觉、冻干库存不足",
  },
  {
    icon: "📋",
    label: "业务范围",
    value: "监督人类、冻干审计、午睡管理、卖萌营业",
  },
  {
    icon: "⏰",
    label: "工作时间",
    value: "看心情，但通常很忙",
  },
  {
    icon: "💬",
    label: "座右铭",
    value: "人类负责铲屎，波比负责可爱",
  },
];

export default function AboutPage() {
  return (
    <main>
      <Container>
        <section className="mt-16 mb-12 text-center md:text-left">
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight">
            关于波比老板 🐱
          </h1>
          <p className="text-lg mt-5 text-slate-600 dark:text-slate-300">
            波比事务所最高负责人，主要工作是可爱、监督和批准冻干预算。
          </p>
        </section>

        <section className="mb-10 overflow-hidden rounded-2xl border border-orange-100 bg-orange-50/70 shadow-sm dark:border-orange-300/20 dark:bg-orange-300/10">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="relative aspect-[4/3] min-h-[260px] md:aspect-auto">
              <Image
                src="/bobby/hero.jpg"
                alt="波比老板"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col justify-center p-6 md:p-10">
              <p className="text-sm font-bold text-orange-700 dark:text-orange-200">
                ✨ 创始猫档案
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                波比老板正在坐镇事务所
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                波比是一只认真营业的小猫，也是波比事务所的创始猫。
                他负责巡视办公室、监督人类工作、审核冻干库存，并在必要时用可爱解决所有问题。
              </p>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-5 mb-10 md:grid-cols-2 lg:grid-cols-3">
          {profileCards.map((item) => (
            <article
              key={item.label}
              className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-rose-50 text-2xl ring-1 ring-rose-100 dark:bg-rose-300/10 dark:ring-rose-300/20">
                  {item.icon}
                </div>
                <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                  {item.label}
                </h2>
              </div>
              <p className="mt-4 text-base leading-relaxed text-slate-700 dark:text-slate-300">
                {item.value}
              </p>
            </article>
          ))}
        </section>

        <section className="mb-20 rounded-2xl border border-rose-100 bg-rose-50/70 p-6 text-center shadow-sm dark:border-rose-300/20 dark:bg-rose-300/10 md:p-8">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            🐟 事务所公告
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-700 dark:text-slate-300">
            本事务所由波比老板亲自坐镇，胖虎和纳豆偶尔来访监督。
            所有访客进入前，请先准备夸奖和小零食。
          </p>
        </section>
      </Container>
    </main>
  );
}
