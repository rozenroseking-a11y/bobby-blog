import Container from "@/app/_components/container";
import { PageHeader } from "@/app/_components/page-header";
import { PostPreview } from "@/app/_components/post-preview";
import { getAllPosts } from "@/lib/api";

export default function CategoriesPage() {
  const posts = getAllPosts();
  const categories = Array.from(
    new Set(posts.map((post) => post.category || "未归档")),
  );

  return (
    <main>
      <Container>
        <PageHeader
          eyebrow="🗂️ 猫爪分类柜"
          title="文章分类"
          description="波比事务所把日记、冻干审计和午睡制度分开放好，方便访客按爪印查阅。"
        />

        <div className="mb-24 space-y-12">
          {categories.map((category) => {
            const categoryPosts = posts.filter(
              (post) => (post.category || "未归档") === category,
            );

            return (
              <section key={category}>
                <div className="mb-6 inline-flex rounded-2xl border border-orange-100 bg-orange-50/70 px-5 py-4 shadow-sm dark:border-orange-300/20 dark:bg-orange-300/10">
                  <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                    🐾 {category}
                  </h2>
                </div>
                <div className="grid grid-cols-1 gap-y-16 md:grid-cols-2 md:gap-x-16 lg:gap-x-24">
                  {categoryPosts.map((post) => (
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
          })}
        </div>
      </Container>
    </main>
  );
}
