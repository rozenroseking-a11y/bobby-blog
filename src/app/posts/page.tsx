import Container from "@/app/_components/container";
import { PageHeader } from "@/app/_components/page-header";
import { PostPreview } from "@/app/_components/post-preview";
import { getAllPosts } from "@/lib/api";

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <main>
      <Container>
        <PageHeader
          eyebrow="📒 档案记录"
          title="波比事务所档案记录"
          description="记录猫老板的日常、吃饭、搞笑瞬间和成长记录。每一份都已放入档案袋。"
        />

        <section className="grid grid-cols-1 gap-6 mb-16 md:grid-cols-2 lg:gap-8">
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
        </section>
      </Container>
    </main>
  );
}
