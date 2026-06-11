import Container from "@/app/_components/container";
import { PageHeader } from "@/app/_components/page-header";
import { getAllPosts } from "@/lib/api";
import { SearchClient, type SearchEntry } from "./search-client";

const sitePages: SearchEntry[] = [
  {
    title: "波比相册",
    href: "/gallery",
    type: "页面",
    excerpt: "猫老板的营业记录、下班瞬间与朋友来访证据。",
  },
  {
    title: "猫猫朋友",
    href: "/friends",
    type: "页面",
    excerpt: "胖虎和纳豆作为波比事务所来访嘉宾的朋友档案。",
  },
  {
    title: "关于波比老板",
    href: "/about",
    type: "页面",
    excerpt: "波比事务所最高负责人，负责可爱、监督和批准冻干预算。",
  },
  {
    title: "给波比老板投递小纸条",
    href: "/guestbook",
    type: "页面",
    excerpt: "访客可以给猫老板留言，审核通过后公开展示。",
  },
  {
    title: "意见反馈",
    href: "/feedback",
    type: "页面",
    excerpt: "给猫老板信箱递交建议、问题、夸夸和其他小纸条。",
  },
];

export default function SearchPage() {
  const postEntries = getAllPosts().map((post) => ({
    title: post.title,
    href: `/posts/${post.slug}`,
    type: "文章",
    category: post.category,
    excerpt: post.excerpt,
  }));

  return (
    <main>
      <Container>
        <PageHeader
          eyebrow="🔎 档案检索"
          title="事务所搜索台"
          description="输入关键词，快速找到波比老板的日记、相册、朋友档案和留言入口。"
        />
        <SearchClient entries={[...postEntries, ...sitePages]} />
      </Container>
    </main>
  );
}
