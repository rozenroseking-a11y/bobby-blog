import Container from "@/app/_components/container";
import { PageHeader } from "@/app/_components/page-header";
import { AdminPanel } from "./admin-panel";

export default function AdminPage() {
  return (
    <main>
      <Container>
        <PageHeader
          eyebrow="🔐 内部审批台"
          title="猫老板后台"
          description="审核留言小纸条，决定哪些夸夸可以公开展示。"
        />
        <AdminPanel />
      </Container>
    </main>
  );
}
