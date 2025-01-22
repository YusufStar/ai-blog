import { BlogScreen } from "@/components/screens/BlogScreen";
import { prisma } from "@/lib/prisma";

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: {
      status: "published",
    },
    include: {
      author: {
        select: {
          name: true,
          avatar: true,
        },
      },
    },
    orderBy: {
      publishedAt: 'desc',
    },
  });

  return <BlogScreen posts={posts} />;
} 