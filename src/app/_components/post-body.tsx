import markdownStyles from "./markdown-styles.module.css";

type Props = {
  content: string;
};

export function PostBody({ content }: Props) {
  return (
    <div className="max-w-3xl mx-auto rounded-2xl border border-orange-100 bg-orange-50/50 p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900 md:p-8">
      <div
        className={markdownStyles["markdown"]}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
