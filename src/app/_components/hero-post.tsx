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
      <div className="mb-8 md:mb-16">
        <CoverImage
          title={title}
          src={coverImage}
          slug={slug}
          className="md:h-[min(42vw,520px)] md:object-cover"
        />
      </div>
      <BobbyOfficeWidgets />
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div>
          <div className="mb-3 inline-flex rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-orange-700 ring-1 ring-orange-100 dark:bg-orange-300/10 dark:text-orange-200 dark:ring-orange-300/20">
            今日主档案{category ? ` · ${category}` : ""}
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
          <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
          <Avatar name={author.name} />
        </div>
      </div>
    </section>
  );
}
