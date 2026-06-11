import Container from "@/app/_components/container";
import { PageHeader } from "@/app/_components/page-header";
import { FeedbackClient } from "./feedback-client";

export default function FeedbackPage() {
  return (
    <main>
      <Container>
        <PageHeader
          eyebrow="📬 猫老板信箱"
          title="猫老板信箱"
          description="有建议、问题、夸夸或吐槽，都可以投递给猫老板。"
        />
        <FeedbackClient />
      </Container>
    </main>
  );
}
