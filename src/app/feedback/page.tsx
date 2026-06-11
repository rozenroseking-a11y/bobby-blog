import Container from "@/app/_components/container";
import { PageHeader } from "@/app/_components/page-header";
import { FeedbackClient } from "./feedback-client";

export default function FeedbackPage() {
  return (
    <main>
      <Container>
        <PageHeader
          eyebrow="📬 猫老板信箱"
          title="意见反馈中心"
          description="把建议、问题、夸夸或其他小纸条投递给波比事务所，猫老板会认真巡视。"
        />
        <FeedbackClient />
      </Container>
    </main>
  );
}
