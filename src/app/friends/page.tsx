import Container from "@/app/_components/container";
import Image from "next/image";

const friends = [
  {
    name: "胖虎",
    title: "特邀监督员",
    duty: "认真巡查、观察办公环境、保持严肃气场。",
    image: "/bobby/panghu-guest.jpg",
    alt: "特邀监督员胖虎",
  },
  {
    name: "纳豆",
    title: "神秘来访员",
    duty: "暗中观察、悄悄围观、增加事务所神秘感。",
    image: "/bobby/nadou-peeking.jpg",
    alt: "神秘来访员纳豆",
  },
];

export default function FriendsPage() {
  return (
    <main>
      <Container>
        <section className="mt-16 mb-12 text-center md:text-left">
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight">
            猫猫朋友
          </h1>
          <p className="text-lg mt-5 text-slate-600 dark:text-slate-300">
            波比事务所的来访嘉宾名单，主角仍然是猫老板波比。
          </p>
        </section>

        <section className="grid grid-cols-1 gap-8 md:grid-cols-2 mb-20">
          {friends.map((friend) => (
            <article
              key={friend.name}
              className="rounded-lg border border-orange-100 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-md">
                <Image
                  src={friend.image}
                  alt={friend.alt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="mt-5">
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                  {friend.name}
                </h2>
                <p className="mt-2 text-lg font-semibold text-orange-700 dark:text-orange-200">
                  职位：{friend.title}
                </p>
                <p className="mt-3 text-base leading-relaxed text-slate-700 dark:text-slate-300">
                  职责：{friend.duty}
                </p>
              </div>
            </article>
          ))}
        </section>
      </Container>
    </main>
  );
}
