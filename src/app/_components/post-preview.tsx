import { type Author } from "@/interfaces/author";
import Link from "next/link";
import { ArticleStatBadges } from "./article-stat-badges";
import Avatar from "./avatar";
import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";

type Props = {
  title: string;
  coverImage: string;
  category?: string;
  date: string;
  excerpt: string;
  author: Author;
  slug: string;
};

export function PostPreview({
  title,
  coverImage,
  category,
  date,
  excerpt,
  author,
  slug,
}: Props) {
  return (
    <article className="rounded-2xl border border-orange-100 bg-orange-50/40 p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-orange-300/20 dark:bg-orange-300/10">
      <div className="mb-4">
        <CoverImage slug={slug} title={title} src={coverImage} />
      </div>
      {category && (
        <div className="mb-3 inline-flex rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-orange-700 ring-1 ring-orange-100 dark:bg-orange-300/10 dark:text-orange-200 dark:ring-orange-300/20">
          🗃️ {category}
        </div>
      )}
      <h3 className="text-2xl mb-3 leading-snug font-bold tracking-tight">
        <Link href={`/posts/${slug}`} className="hover:underline">
          {title}
        </Link>
      </h3>
      <div className="text-base mb-3 text-slate-600 dark:text-slate-300">
        <DateFormatter dateString={date} />
      </div>
      <p className="text-base leading-relaxed mb-3 text-slate-700 dark:text-slate-300">{excerpt}</p>
      <ArticleStatBadges postSlug={slug} />
      <Avatar name={author.name} />
    </article>
  );
}
