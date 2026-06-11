import Container from "@/app/_components/container";
import { PageHeader } from "@/app/_components/page-header";
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

const workNotes = [
  {
    title: "上午巡场",
    text: "先检查门口、饭盆和人类精神状态，必要时用眼神安排今日重点工作。",
  },
  {
    title: "午间审批",
    text: "所有文件可放到爪边，若被压住，代表进入猫老板深度审核流程。",
  },
  {
    title: "傍晚总结",
    text: "巡视窗边、评估冻干库存，并决定明天是否继续认真营业。",
  },
];

const officeSections = [
  {
    title: "波比是谁",
    text: "波比是波比事务所的创始猫、最高负责人和档案馆馆长。主要职责是坐镇、巡视、卖萌，并在关键时刻用眼神完成审批。",
  },
  {
    title: "人类铲屎官负责什么",
    text: "人类负责整理照片、记录日常、补充冻干、维护网站，以及在猫老板睡觉时保持安静。",
  },
  {
    title: "为什么建立波比事务所",
    text: "因为很多温暖的小瞬间如果不归档，很容易被日常悄悄带走。这里用档案袋和小纸条，把波比的生活认真收好。",
  },
  {
    title: "网站现在有哪些区域",
    text: "这里有档案记录、影像档案、来访猫友、来访登记簿、猫老板信箱、档案检索处和事务所公告栏。",
  },
];

const officeRules = [
  "进入档案室前，请先准备一句夸夸。",
  "发现猫老板睡觉时，不得擅自打扰审批流程。",
  "冻干预算属于重要办公事项，请严肃对待。",
  "所有来访小纸条都需要等待猫老板慢慢审阅。",
];

export default function AboutPage() {
  return (
    <main>
      <Container>
        <PageHeader
          eyebrow="🐱 波比档案"
          title="波比档案"
          description="波比事务所最高负责人，主要工作是可爱、监督和批准冻干预算。"
        />

        <section className="mb-8 overflow-hidden rounded-2xl border border-orange-100 bg-orange-50/70 shadow-sm dark:border-orange-300/20 dark:bg-orange-300/10">
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
              <div className="mt-6 flex flex-wrap gap-3">
                {["创始猫", "冻干预算审批人", "午睡制度守护者"].map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-white px-4 py-2 text-sm font-bold text-orange-700 shadow-sm ring-1 ring-orange-100 dark:bg-slate-900 dark:text-orange-200 dark:ring-orange-300/20"
                  >
                    🐾 {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-5 mb-8 md:grid-cols-2 lg:grid-cols-3">
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

        <section className="mb-8 rounded-2xl border border-orange-100 bg-orange-50/70 p-5 shadow-sm dark:border-orange-300/20 dark:bg-orange-300/10 md:p-6">
          <div className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-bold text-orange-700 shadow-sm ring-1 ring-orange-100 dark:bg-slate-900 dark:text-orange-200 dark:ring-orange-300/20">
            ✨ 老板今日工作流
          </div>
          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
            {workNotes.map((note) => (
              <article
                key={note.title}
                className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-orange-100 dark:bg-slate-900 dark:ring-orange-300/20"
              >
                <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                  {note.title}
                </h2>
                <p className="mt-3 text-base leading-relaxed text-slate-700 dark:text-slate-300">
                  {note.text}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-2">
          {officeSections.map((section) => (
            <article
              key={section.title}
              className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900"
            >
              <div className="inline-flex rounded-full bg-orange-50 px-4 py-2 text-sm font-bold text-orange-700 ring-1 ring-orange-100 dark:bg-orange-300/10 dark:text-orange-200 dark:ring-orange-300/20">
                📁 档案条目
              </div>
              <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                {section.title}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-700 dark:text-slate-300">
                {section.text}
              </p>
            </article>
          ))}
        </section>

        <section className="mb-8 rounded-2xl border border-orange-100 bg-orange-50/70 p-5 shadow-sm dark:border-orange-300/20 dark:bg-orange-300/10 md:p-6">
          <div className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-bold text-rose-700 shadow-sm ring-1 ring-rose-100 dark:bg-slate-900 dark:text-rose-200 dark:ring-rose-300/20">
            🐾 事务所守则
          </div>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {officeRules.map((rule) => (
              <p
                key={rule}
                className="rounded-2xl bg-white p-4 text-base font-medium leading-relaxed text-slate-700 shadow-sm ring-1 ring-rose-100 dark:bg-slate-900 dark:text-slate-300 dark:ring-rose-300/20"
              >
                {rule}
              </p>
            ))}
          </div>
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
