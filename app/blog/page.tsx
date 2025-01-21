import { BlogScreen } from "@/components/screens/BlogScreen";

// Normalde bu veriler API'den gelecek
const posts = [
  {
    id: "1",
    title: "The Future of Large Language Models",
    excerpt: "Exploring the latest developments in LLMs and their impact on AI research",
    category: "AI Research",
    readTime: "5 min read",
    date: "Apr 15, 2024",
    imageUrl: "https://cdn.prod.website-files.com/60ef088dd8fef99352abb434/64502c47934b682e375a0876_AnyConv.com__Artificial%20Intelligence%20Blog%20Writing%20Using%20AI%20in%2060%20Minutes.webp",
    trending: true,
    slug: "the-future-of-large-language-models",
  },
];

export default function BlogPage() {
  return <BlogScreen posts={posts} />;
} 