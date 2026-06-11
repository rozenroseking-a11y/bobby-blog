import { ArticleStatBadges } from "@/app/_components/article-stat-badges";
import Avatar from "@/app/_components/avatar";
import { BobbyOfficeWidgets } from "@/app/_components/bobby-office-widgets";
import CoverImage from "@/app/_components/cover-image";
import { type Author } from "@/interfaces/author";
import Link from "next/link";
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

export function HeroPost({
  title,
  coverImage,
  category,
  date,
  excerpt,
  author,
  slug,
}: Props) {
  return (
    <section>
      <div className="mb-6 md:mb-8">
        <CoverImage
          title={title}
          src={coverImage}
          slug={slug}
          className="md:h-[min(36vw,460px)] md:object-cover"
        />
      </div>
      <BobbyOfficeWidgets latestPostTitle={title} latestPostSlug={slug} />
      <div className="mb-14 rounded-2xl border border-orange-100 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900 md:grid md:grid-cols-[0.9fr_1.1fr] md:gap-x-8 md:p-6">
        <div>
          <div className="mb-3 inline-flex rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-orange-700 ring-1 ring-orange-100 dark:bg-orange-300/10 dark:text-orange-200 dark:ring-orange-300/20">
            最新档案记录{category ? ` · ${category}` : ""}
          </div>
          <h3 className="mb-4 text-3xl font-bold leading-tight tracking-tight text-slate-900 dark:text-slate-100 lg:text-4xl">
            <Link
              href={`/posts/${slug}`}
              className="hover:text-orange-700 dark:hover:text-orange-200"
            >
              {title}
            </Link>
          </h3>
          <div className="mb-4 md:mb-0 text-lg">
            <DateFormatter dateString={date} />
          </div>
        </div>
        <div>
          <p className="text-base leading-relaxed mb-4 text-slate-700 dark:text-slate-300 md:text-lg">
            {excerpt}
          </p>
          <ArticleStatBadges postSlug={slug} />
          <Avatar name={author.name} />
        </div>
      </div>
    </section>
  );
}
