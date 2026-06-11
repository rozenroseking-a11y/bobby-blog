import Container from "@/app/_components/container";
import { PageHeader } from "@/app/_components/page-header";
import Image from "next/image";

const galleryItems = [
  {
    src: "/bobby/hero.jpg",
    tag: "今日营业",
    title: "波比老板今日营业",
    alt: "波比的事务所门面照",
    caption: "猫老板今日准时开门，表情非常有编制。",
  },
  {
    src: "/bobby/bobby-cute.jpg",
    tag: "认真卖萌",
    title: "波比认真卖萌",
    alt: "可爱的波比",
    caption: "营业中途忽然卖萌，疑似提高事务所口碑。",
  },
  {
    src: "/bobby/bobby-food.jpg",
    tag: "冻干会议",
    title: "波比午餐会议",
    alt: "波比和食物",
    caption: "午餐会议重点：这口必须归波比。",
  },
  {
    src: "/bobby/bobby-off-duty.jpg",
    tag: "下班模式",
    title: "波比下班瞬间",
    alt: "下班后的波比",
    caption: "下班铃一响，猫老板立刻切换省电模式。",
  },
  {
    src: "/bobby/bobby-office.jpg",
    tag: "事务所巡视",
    title: "波比坐镇事务所",
    alt: "在办公室的波比",
    caption: "严肃办公现场，人类请勿打扰猫事决策。",
  },
  {
    src: "/bobby/bobby-dayoff.jpg",
    tag: "事务所巡视",
    title: "波比休假巡视",
    alt: "休假日的波比",
    caption: "休假也要巡视领地，这就是老板的责任感。",
  },
  {
    src: "/bobby/panghu-guest.jpg",
    tag: "朋友来访",
    title: "胖虎来事务所巡查",
    alt: "胖虎来事务所巡查",
    caption: "特邀监督员胖虎上线，用认真眼神检查办公环境。",
  },
  {
    src: "/bobby/nadou-peeking.jpg",
    tag: "暗中观察",
    title: "纳豆暗中观察",
    alt: "纳豆暗中观察",
    caption: "窗帘后的神秘视线，正在偷偷围观波比老板营业。",
  },
];

export default function GalleryPage() {
  return (
    <main>
      <Container>
        <PageHeader
          eyebrow="📸 影像档案"
          title="波比相册"
          description="猫老板的营业记录、下班瞬间与朋友来访证据。"
        />

        <section className="mb-10 rounded-2xl border border-orange-100 bg-orange-50/70 p-6 shadow-sm dark:border-orange-300/20 dark:bg-orange-300/10 md:p-8">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            📸 波比营业影像档案
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-700 dark:text-slate-300">
            这里收录猫老板的上班照、下班照、冻干会议记录，以及胖虎和纳豆的来访证据。所有照片均已通过波比事务所内部审核。
          </p>
        </section>

        <section className="grid grid-cols-1 gap-8 md:grid-cols-3 mb-10">
          {galleryItems.map((item) => (
            <figure
              key={item.src}
              className="rounded-2xl border border-orange-100 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md dark:border-slate-700 dark:bg-slate-900"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-md">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="mt-4">
                <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-orange-700 ring-1 ring-orange-100 dark:bg-orange-300/10 dark:text-orange-200 dark:ring-orange-300/20">
                  {item.tag}
                </span>
                <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                  {item.title}
                </h2>
                <figcaption className="mt-3 text-base leading-relaxed text-slate-700 dark:text-slate-300">
                  {item.caption}
                </figcaption>
              </div>
            </figure>
          ))}
        </section>

        <p className="mb-20 rounded-2xl bg-rose-50/70 p-5 text-center text-base font-medium text-slate-700 shadow-sm ring-1 ring-rose-100 dark:bg-rose-300/10 dark:text-slate-300 dark:ring-rose-300/20">
          温馨提示：查看照片前，请先获得猫老板眼神许可。
        </p>
      </Container>
    </main>
  );
}
