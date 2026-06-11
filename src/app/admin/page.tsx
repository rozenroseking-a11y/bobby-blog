import Container from "@/app/_components/container";
import { PageHeader } from "@/app/_components/page-header";
import { AdminPanel } from "./admin-panel";

export default function AdminPage() {
  return (
    <main>
      <Container>
        <PageHeader
          eyebrow="🔐 内部审批台"
          title="猫老板办公室"
          description="审核来访小纸条、档案批注和猫老板信箱，决定哪些内容可以盖章归档。"
        />
        <AdminPanel />
      </Container>
    </main>
  );
}
