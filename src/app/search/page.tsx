import Container from "@/app/_components/container";
import { PageHeader } from "@/app/_components/page-header";
import { getAllPosts } from "@/lib/api";
import { SearchClient, type SearchEntry } from "./search-client";

const sitePages: SearchEntry[] = [
  {
    title: "影像档案",
    href: "/gallery",
    type: "页面",
    excerpt: "猫老板的营业记录、下班瞬间与朋友来访证据。",
  },
  {
    title: "来访猫友",
    href: "/friends",
    type: "页面",
    excerpt: "胖虎和纳豆作为波比事务所来访嘉宾的朋友档案。",
  },
  {
    title: "波比档案",
    href: "/about",
    type: "页面",
    excerpt: "波比事务所最高负责人，负责可爱、监督和批准冻干预算。",
  },
  {
    title: "来访登记簿",
    href: "/guestbook",
    type: "页面",
    excerpt: "来访的朋友可以留下小纸条，猫老板审核后公开展示。",
  },
  {
    title: "猫老板信箱",
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
          title="档案检索处"
          description="输入关键词，快速找到波比老板的日记、相册、朋友档案和留言入口。"
        />
        <SearchClient entries={[...postEntries, ...sitePages]} />
      </Container>
    </main>
  );
}
