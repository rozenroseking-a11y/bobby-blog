import Container from "@/app/_components/container";

export function Footer() {
  return (
    <footer className="border-t border-orange-100 bg-orange-50/70 dark:border-slate-700 dark:bg-slate-800">
      <Container>
        <div className="py-10 text-center">
          <p className="text-lg font-bold text-slate-900 dark:text-slate-100">
            🐾 波比事务所 © 2026
          </p>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            猫老板今日巡视完毕，访客请自觉留下夸夸。
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            冻干预算由波比亲自审批，午睡制度由猫猫委员会监督执行。
          </p>
          <p className="mt-4 text-xs font-medium text-orange-700 dark:text-orange-200">
            本网站由猫爪、午睡和小零食共同驱动。
          </p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
