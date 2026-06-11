import Container from "@/app/_components/container";
import { PageHeader } from "@/app/_components/page-header";
import { GuestbookClient } from "./guestbook-client";

export default function GuestbookPage() {
  return (
    <main>
      <Container>
        <PageHeader
          eyebrow="📮 来访登记簿"
          title="给波比老板递交小纸条"
          description="来访的朋友可以留下小纸条，猫老板审核后公开展示。"
        />

        <GuestbookClient />
      </Container>
    </main>
  );
}
