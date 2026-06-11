import Container from "@/app/_components/container";
import { PageHeader } from "@/app/_components/page-header";
import { AuthForm } from "./auth-form";

export default function AuthPage() {
  return (
    <main>
      <Container>
        <PageHeader
          eyebrow="🎟️ 访客通行证"
          title="访客通行证"
          description="使用邮箱注册或登录，验证后即可给猫老板投递小纸条。"
        />
        <section className="mx-auto mb-20 max-w-xl">
          <AuthForm />
        </section>
      </Container>
    </main>
  );
}
