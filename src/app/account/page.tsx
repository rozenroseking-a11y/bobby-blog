import Container from "@/app/_components/container";
import { AccountPanel } from "./account-panel";

export default function AccountPage() {
  return (
    <main>
      <Container>
        <section className="mt-16 mb-12 text-center md:text-left">
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight">
            个人中心
          </h1>
          <p className="text-lg mt-5 text-slate-600 dark:text-slate-300">
            整理你的猫猫事务所档案，昵称和头像都会用于留言展示。
          </p>
        </section>
        <section className="mb-20">
          <AccountPanel />
        </section>
      </Container>
    </main>
  );
}
