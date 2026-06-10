import Container from "@/app/_components/container";
import { PostPreview } from "@/app/_components/post-preview";
import { getAllPosts } from "@/lib/api";

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <main>
      <Container>
        <section className="mt-16 mb-12 text-center md:text-left">
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight">
            波比日记
          </h1>
          <p className="text-lg mt-5 text-slate-600 dark:text-slate-300">
            记录猫老板的日常、吃饭、搞笑瞬间和成长记录。
          </p>
        </section>

        <section className="grid grid-cols-1 gap-y-20 mb-32 md:grid-cols-2 md:gap-x-16 md:gap-y-24 lg:gap-x-32">
          {posts.map((post) => (
            <PostPreview
              key={post.slug}
              title={post.title}
              coverImage={post.coverImage}
              date={post.date}
              author={post.author}
              slug={post.slug}
              excerpt={post.excerpt}
            />
          ))}
        </section>
      </Container>
    </main>
  );
}
