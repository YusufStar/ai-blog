import { AdminStats, User, AdminQuestion, AdminBlogPost } from "@/types/admin";

export const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "admin",
    avatar: "https://avatar.vercel.sh/1.png",
    createdAt: "2024-01-15T10:00:00Z",
    status: "active",
    lastLogin: "2024-04-15T08:30:00Z",
  },
  // ... daha fazla kullanıcı
];

export const mockStats: AdminStats = {
  totalUsers: 1250,
  totalQuestions: 856,
  totalAnswers: 2341,
  totalPosts: 124,
  activeUsers: 450,
  questionsToday: 23,
  answersToday: 67,
  postsToday: 4,
};

export const mockQuestions: AdminQuestion[] = [
  {
    id: "1",
    title: "How to implement GPT-4 streaming in Next.js?",
    content: "I'm trying to implement streaming responses...",
    tags: ["next.js", "openai", "gpt-4"],
    author: {
      name: "John Doe",
      avatar: "https://avatar.vercel.sh/1.png",
    },
    votes: 42,
    answers: 5,
    views: 1204,
    createdAt: "2024-04-15T10:00:00Z",
    solved: true,
    status: "active",
  },
  // ... daha fazla soru
];

export const mockBlogPosts: AdminBlogPost[] = [
  {
    id: "1",
    title: "The Future of Large Language Models",
    slug: "the-future-of-large-language-models",
    excerpt: "Exploring the latest developments in LLMs and their impact on AI research",
    content: `
# The Future of Large Language Models

Large Language Models (LLMs) have revolutionized the field of artificial intelligence...

## Current State of LLMs

Recent developments in transformer architectures...

## Future Directions

1. Multimodal Learning
2. Efficient Training
3. Ethical Considerations

## Conclusion

The future of LLMs looks promising...
    `,
    author: {
      id: "1",
      name: "John Doe",
      avatar: "https://avatar.vercel.sh/1.png",
    },
    category: "AI Research",
    tags: ["ai", "llm", "machine-learning", "research"],
    status: "published",
    publishedAt: "2024-04-15T10:00:00Z",
    createdAt: "2024-04-14T15:30:00Z",
    updatedAt: "2024-04-15T10:00:00Z",
    views: 1204,
  },
  {
    id: "2",
    title: "Building Modern Web Applications with Next.js",
    slug: "building-modern-web-applications-with-nextjs",
    excerpt: "A comprehensive guide to building scalable applications using Next.js 14",
    content: `
# Building Modern Web Applications with Next.js

Next.js has become the go-to framework for React applications...

## Key Features

1. Server Components
2. App Router
3. Server Actions

## Best Practices

When building with Next.js...
    `,
    author: {
      id: "2",
      name: "Jane Smith",
      avatar: "https://avatar.vercel.sh/2.png",
    },
    category: "Web Development",
    tags: ["nextjs", "react", "javascript", "web-dev"],
    status: "draft",
    publishedAt: null,
    createdAt: "2024-04-16T09:00:00Z",
    updatedAt: "2024-04-16T09:00:00Z",
    views: 0,
  },
  {
    id: "3",
    title: "Understanding TypeScript's Type System",
    slug: "understanding-typescript-type-system",
    excerpt: "Deep dive into TypeScript's advanced type system features",
    content: `
# Understanding TypeScript's Type System

TypeScript provides one of the most powerful type systems...

## Advanced Types

### Conditional Types
...

### Mapped Types
...
    `,
    author: {
      id: "1",
      name: "John Doe",
      avatar: "https://avatar.vercel.sh/1.png",
    },
    category: "Programming",
    tags: ["typescript", "javascript", "programming"],
    status: "published",
    publishedAt: "2024-04-10T14:00:00Z",
    createdAt: "2024-04-09T11:00:00Z",
    updatedAt: "2024-04-10T14:00:00Z",
    views: 856,
  }
];

// ... diğer mock veriler 