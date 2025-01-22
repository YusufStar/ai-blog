import { ForumScreen } from "@/components/screens/ForumScreen";

const questions = [
  {
    id: "1",
    title: "How to implement GPT-4 streaming in Next.js?",
    content: "I'm trying to implement streaming responses from GPT-4 in my Next.js application...",
    tags: ["next.js", "openai", "gpt-4", "streaming"],
    author: {
      name: "John Doe",
      avatar: "https://avatar.vercel.sh/1.png",
    },
    votes: 42,
    answers: 5,
    views: 1204,
    createdAt: "2024-04-15T10:00:00Z",
    solved: true,
  },
  {
    id: "2",
    title: "Best practices for fine-tuning LLMs",
    content: "What are the current best practices for fine-tuning large language models...",
    tags: ["machine-learning", "llm", "fine-tuning", "ai"],
    author: {
      name: "Jane Smith",
      avatar: "https://avatar.vercel.sh/2.png",
    },
    votes: 38,
    answers: 3,
    views: 892,
    createdAt: "2024-04-14T15:30:00Z",
    solved: false,
  },
  // Daha fazla mock soru eklenebilir
];

export default function ForumPage() {
  return <ForumScreen questions={questions} />;
} 