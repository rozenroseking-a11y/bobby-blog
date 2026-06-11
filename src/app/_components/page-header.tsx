type Props = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageHeader({ eyebrow, title, description }: Props) {
  return (
    <section className="relative mt-8 mb-8 overflow-hidden rounded-3xl border border-orange-100 bg-orange-50/80 p-5 shadow-sm dark:border-orange-300/20 dark:bg-orange-300/10 md:mt-10 md:p-7">
      <div className="absolute right-6 top-6 hidden rotate-3 rounded-2xl border border-rose-100 bg-white/80 px-3 py-2 text-xs font-bold text-rose-600 shadow-sm dark:border-rose-300/20 dark:bg-slate-900/80 dark:text-rose-200 md:block">
        PAW APPROVED
      </div>
      <div className="inline-flex rounded-full bg-white px-4 py-2 text-xs font-bold text-orange-700 shadow-sm ring-1 ring-orange-100 dark:bg-slate-900 dark:text-orange-200 dark:ring-orange-300/20 md:text-sm">
        🏷️ {eyebrow}
      </div>
      <h1 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 md:text-4xl">
        {title}
      </h1>
      <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-700 dark:text-slate-300">
        {description}
      </p>
    </section>
  );
}
