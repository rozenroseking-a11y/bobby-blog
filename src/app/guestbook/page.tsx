import Container from "@/app/_components/container";
import { PageHeader } from "@/app/_components/page-header";
import { GuestbookClient } from "./guestbook-client";

export default function GuestbookPage() {
  return (
    <main>
      <Container>
        <PageHeader
          eyebrow="📮 小纸条投递处"
          title="给波比老板投递小纸条"
          description="留言会先投递到猫老板的待审纸箱，审核通过后再公开展示。"
        />

        <GuestbookClient />
      </Container>
    </main>
  );
}
