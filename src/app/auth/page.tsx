import Container from "@/app/_components/container";
import { AuthForm } from "./auth-form";

export default function AuthPage() {
  return (
    <main>
      <Container>
        <section className="mt-16 mb-12 text-center md:text-left">
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight">
            波比事务所通行证
          </h1>
          <p className="text-lg mt-5 text-slate-600 dark:text-slate-300">
            使用邮箱注册或登录，验证后即可给猫老板投递小纸条。
          </p>
        </section>
        <section className="mx-auto mb-20 max-w-xl">
          <AuthForm />
        </section>
      </Container>
    </main>
  );
}
