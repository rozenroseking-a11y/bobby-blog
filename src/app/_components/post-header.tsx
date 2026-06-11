import Avatar from "./avatar";
import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";
import { PostTitle } from "@/app/_components/post-title";
import { type Author } from "@/interfaces/author";

type Props = {
  title: string;
  coverImage: string;
  category?: string;
  date: string;
  author: Author;
};

export function PostHeader({ title, coverImage, category, date, author }: Props) {
  return (
    <header className="max-w-4xl mx-auto pt-10 md:pt-14">
      <div className="mb-4">
        <span className="inline-flex rounded-full bg-orange-50 px-4 py-2 text-sm font-bold text-orange-700 ring-1 ring-orange-100 dark:bg-orange-300/10 dark:text-orange-200 dark:ring-orange-300/20">
          📄 波比事务所档案
          {category ? ` · ${category}` : ""}
        </span>
      </div>
      <PostTitle>{title}</PostTitle>
      <div className="mb-8 flex flex-col gap-4 text-lg md:flex-row md:items-center md:justify-between">
        <div className="text-slate-600 dark:text-slate-300">
          <DateFormatter dateString={date} />
        </div>
        <Avatar name={author.name} />
      </div>
      <div className="mb-10 rounded-2xl border border-orange-100 bg-orange-50/70 p-3 shadow-sm dark:border-orange-300/20 dark:bg-orange-300/10 md:p-4">
        <CoverImage
          title={title}
          src={coverImage}
          className="md:h-[460px] md:object-cover"
        />
        <p className="mt-3 text-center text-sm font-medium text-orange-700 dark:text-orange-200">
          本档案已由波比事务所猫爪盖章确认。
        </p>
      </div>
    </header>
  );
}
