import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import * as fs from "fs";
import * as path from "path";
import { compileMDX } from 'next-mdx-remote/rsc';
import { useMDXComponents } from "@/components/mdx-components";

import "highlight.js/styles/atom-one-dark.css";
import "katex/dist/katex.min.css";

console.log(process.cwd());

const postsDirectory = path.join(process.cwd(), "content/blog");

export interface Post {
  slug: string;
  title: string;
  date: string;
  content: string;
  excerpt: string;
  readTime: string;
  category: string;
  imageUrl: string;
  trending?: boolean;
  Content: React.ComponentType | React.ReactNode | undefined;
}

interface MDXFrontmatter {
  title: string;
  date: string;
  excerpt: string;
  readTime: string;
  category: string;
  imageUrl: string;
  trending?: boolean;
}

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

export async function getPost(slug: string): Promise<Post | null> {
  try {
    const filePath = path.join(postsDirectory, `${slug}.mdx`);
    const source = fs.readFileSync(filePath, "utf8");
    const post = posts.find((post) => post.slug === slug);

    const { content, frontmatter } = await compileMDX<MDXFrontmatter>({
      source,
      components: useMDXComponents,
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          remarkPlugins: [
            remarkGfm, // Adds GitHub-flavored Markdown support
            remarkMath, // Adds math support
          ],
          rehypePlugins: [
            rehypeSlug, // Adds IDs to headings
            [rehypeAutolinkHeadings, { behavior: "wrap" }], // Links for headings
            rehypeHighlight, // Syntax highlighting fallback
            rehypeKatex, // Render math equations
          ],
        },
      },
    });

    return {
      slug,
      content: source,
      Content: content,
      ...(frontmatter as MDXFrontmatter),
      ...post,
    };
  } catch (error) {
    console.error(`Error loading post ${slug}:`, error);
    return null;
  }
}

export async function getAllPosts(): Promise<Post[]> {
    const files = fs.readdirSync(postsDirectory);
    const posts = [];
  
    for (const file of files) {
      const slug = file.replace(/\.mdx$/, "");
      const post = await getPost(slug);
      if (post) posts.push(post);
    }
  
    return posts.sort((a, b) => (new Date(b.date).getTime()) - (new Date(a.date).getTime()));
  }
  
  export const allPosts = await getAllPosts(); 