import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/api";
import { CMS_NAME } from "@/lib/constants";
import markdownToHtml from "@/lib/markdownToHtml";
import Alert from "@/app/_components/alert";
import { ArticleComments } from "@/app/_components/article-comments";
import { ArticleMetrics } from "@/app/_components/article-metrics";
import Container from "@/app/_components/container";
import { PostBody } from "@/app/_components/post-body";
import { PostHeader } from "@/app/_components/post-header";
import Link from "next/link";

export default async function Post(props: Params) {
  const params = await props.params;
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const content = await markdownToHtml(post.content || "");

  return (
    <main>
      <Alert preview={post.preview} />
      <Container>
        <article className="mb-32">
          <PostHeader
            title={post.title}
            coverImage={post.coverImage}
            category={post.category}
            date={post.date}
            author={post.author}
          />
          <ArticleMetrics postSlug={post.slug} />
          <section className="max-w-3xl mx-auto mb-8 rounded-2xl border border-rose-100 bg-rose-50/70 p-6 shadow-sm dark:border-rose-300/20 dark:bg-rose-300/10">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              🐾 档案摘要
            </h2>
            <p className="mt-3 text-lg leading-relaxed text-slate-700 dark:text-slate-300">
              {post.excerpt ||
                "这是一份来自波比事务所的正式营业记录。"}
            </p>
          </section>
          <PostBody content={content} />
          <section className="max-w-3xl mx-auto mt-8 rounded-2xl border border-orange-100 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              🐱 猫老板批注
            </h2>
            <p className="mt-3 text-lg leading-relaxed text-slate-700 dark:text-slate-300">
              本篇记录已阅。若有异议，请先提交一包冻干作为申诉材料。
            </p>
          </section>
          <ArticleComments postSlug={post.slug} />
          <div className="max-w-3xl mx-auto mt-8">
            <Link
              href="/posts"
              className="inline-flex rounded-full bg-orange-100 px-5 py-3 text-sm font-bold text-orange-800 shadow-sm transition hover:bg-orange-200 dark:bg-orange-300/20 dark:text-orange-100 dark:hover:bg-orange-300/30"
            >
              ← 返回波比日记
            </Link>
          </div>
        </article>
      </Container>
    </main>
  );
}

type Params = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata(props: Params): Promise<Metadata> {
  const params = await props.params;
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const title = `${post.title} | Next.js Blog Example with ${CMS_NAME}`;

  return {
    title,
    openGraph: {
      title,
      images: [post.ogImage.url],
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
