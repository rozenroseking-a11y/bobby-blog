import Container from "@/app/_components/container";
import { AdminPanel } from "./admin-panel";

export default function AdminPage() {
  return (
    <main>
      <Container>
        <section className="mt-16 mb-12 text-center md:text-left">
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight">
            猫老板后台
          </h1>
          <p className="text-lg mt-5 text-slate-600 dark:text-slate-300">
            审核留言小纸条，决定哪些夸夸可以公开展示。
          </p>
        </section>
        <AdminPanel />
      </Container>
    </main>
  );
}
