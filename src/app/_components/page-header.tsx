type Props = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageHeader({ eyebrow, title, description }: Props) {
  return (
    <section className="mt-12 mb-10 rounded-2xl border border-orange-100 bg-orange-50/70 p-6 shadow-sm dark:border-orange-300/20 dark:bg-orange-300/10 md:p-8">
      <div className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-bold text-orange-700 shadow-sm ring-1 ring-orange-100 dark:bg-slate-900 dark:text-orange-200 dark:ring-orange-300/20">
        {eyebrow}
      </div>
      <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 md:text-5xl">
        {title}
      </h1>
      <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-700 dark:text-slate-300 md:text-lg">
        {description}
      </p>
    </section>
  );
}
