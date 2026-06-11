import { Post } from "@/interfaces/post";
import { PostPreview } from "./post-preview";

type Props = {
  posts: Post[];
};

export function MoreStories({ posts }: Props) {
  return (
    <section>
      <div className="mb-8 inline-flex rounded-2xl border border-orange-100 bg-orange-50/70 px-5 py-4 shadow-sm dark:border-orange-300/20 dark:bg-orange-300/10">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 md:text-4xl">
          🗂️ 更多营业记录
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            category={post.category}
            date={post.date}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
          />
        ))}
      </div>
    </section>
  );
}
