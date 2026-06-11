import Container from "@/app/_components/container";
import { PageHeader } from "@/app/_components/page-header";
import { AccountPanel } from "./account-panel";

export default function AccountPage() {
  return (
    <main>
      <Container>
        <PageHeader
          eyebrow="🗂️ 访客档案"
          title="个人中心"
          description="整理你的猫猫事务所档案，昵称和头像都会用于留言展示。"
        />
        <section className="mb-20">
          <AccountPanel />
        </section>
      </Container>
    </main>
  );
}
