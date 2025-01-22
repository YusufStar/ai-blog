"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowUp, ArrowDown, MessageSquare, Check } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { formatDistanceToNow } from "date-fns";
import dynamic from "next/dynamic";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

const MDEditor = dynamic(
    () => import("@uiw/react-md-editor").then((mod) => mod.default),
    { ssr: false }
);

// Mock data - gerçek uygulamada API'den gelecek
const question = {
    id: "1",
    title: "How to implement GPT-4 streaming in Next.js?",
    content: `
# Problem
I'm trying to implement streaming responses from GPT-4 in my Next.js application...

## What I've tried
\`\`\`typescript
const response = await fetch('/api/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ message }),
});

const reader = response.body?.getReader();
\`\`\`

## Expected Behavior
The response should stream token by token...
  `,
    tags: ["next.js", "openai", "gpt-4", "streaming"],
    author: {
        name: "John Doe",
        avatar: "https://avatar.vercel.sh/1.png",
    },
    votes: 42,
    answers: [
        {
            id: "a1",
            content: "You need to use the `OpenAIStream` helper...",
            author: {
                name: "Jane Smith",
                avatar: "https://avatar.vercel.sh/2.png",
            },
            votes: 15,
            createdAt: "2024-04-14T15:30:00Z",
            accepted: true,
        },
        // Daha fazla cevap...
    ],
    createdAt: "2024-04-15T10:00:00Z",
    solved: true,
};

export default function QuestionDetailPage() {
    const [newAnswer, setNewAnswer] = useState("");

    return (
        <div className="min-h-screen py-12">
            <div className="container max-w-4xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                >
                    {/* Question */}
                    <Card className="p-6 bg-black/30 border-white/10">
                        <div className="flex gap-6">
                            {/* Voting */}
                            <div className="flex flex-col items-center gap-2">
                                <Button variant="ghost" size="icon">
                                    <ArrowUp className="h-4 w-4" />
                                </Button>
                                <span className="font-semibold">{question.votes}</span>
                                <Button variant="ghost" size="icon">
                                    <ArrowDown className="h-4 w-4" />
                                </Button>
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                                <h1 className="text-2xl font-bold mb-4">{question.title}</h1>
                                <div className="prose prose-invert max-w-none mb-6">
                                    <ReactMarkdown
                                        remarkPlugins={[
                                            remarkGfm, // Adds GitHub-flavored Markdown support
                                            remarkMath, // Adds math support
                                        ]}
                                        rehypePlugins={[
                                            rehypeSlug, // Adds IDs to headings
                                            [rehypeAutolinkHeadings, { behavior: "wrap" }], // Links for headings
                                            rehypeHighlight, // Syntax highlighting fallback
                                            rehypeKatex, // Render math equations
                                        ]}>{question.content}</ReactMarkdown>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex gap-2">
                                        {question.tags.map((tag) => (
                                            <Badge
                                                key={tag}
                                                variant="outline"
                                                className="bg-primary/10 border-primary/20"
                                            >
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Avatar className="h-6 w-6">
                                            <AvatarImage src={question.author.avatar} />
                                            <AvatarFallback>{question.author.name[0]}</AvatarFallback>
                                        </Avatar>
                                        <span>{question.author.name}</span>
                                        <span>•</span>
                                        <span>asked {formatDistanceToNow(new Date(question.createdAt))} ago</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Answers */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between border-b border-border/40 pb-4">
                            <div className="space-y-1">
                                <h2 className="text-xl font-semibold">
                                    {question.answers.length} Answers
                                </h2>
                                <p className="text-sm text-muted-foreground">
                                    Sorted by highest votes
                                </p>
                            </div>
                            <Button
                                variant="outline"
                                onClick={() => document.getElementById('answer-editor')?.scrollIntoView({ behavior: 'smooth' })}
                            >
                                <MessageSquare className="h-4 w-4 mr-2" />
                                Answer This Question
                            </Button>
                        </div>

                        {question.answers.map((answer) => (
                            <Card
                                key={answer.id}
                                className="bg-black/30 border-white/10"
                            >
                                <div className="flex items-start gap-4 p-4">
                                    {/* Sol taraf - Voting */}
                                    <div className="flex flex-col items-center gap-1 min-w-[64px] pt-2">
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <ArrowUp className="h-4 w-4" />
                                        </Button>
                                        <span className="font-semibold text-sm">{answer.votes}</span>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <ArrowDown className="h-4 w-4" />
                                        </Button>
                                    </div>

                                    {/* Sağ taraf - Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="prose prose-invert max-w-none prose-p:leading-relaxed prose-pre:my-0">
                                            <ReactMarkdown>{answer.content}</ReactMarkdown>
                                        </div>

                                        <div className="flex items-center justify-between gap-2 mt-4 pt-4 border-t border-white/10">
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <Avatar className="h-6 w-6">
                                                    <AvatarImage src={answer.author.avatar} />
                                                    <AvatarFallback>{answer.author.name[0]}</AvatarFallback>
                                                </Avatar>
                                                <span className="font-medium text-foreground/80">
                                                    {answer.author.name}
                                                </span>
                                                <span>•</span>
                                                <span>
                                                    answered {formatDistanceToNow(new Date(answer.createdAt))} ago
                                                </span>
                                            </div>

                                            {answer.accepted && (
                                                <Badge title="Accepted Answer" className="mt-2 bg-green-500/20 text-green-500 border-green-500/20">
                                                    <Check className="h-3 w-3" />
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>

                    {/* Your Answer */}
                    <Card id="answer-editor" className="p-6 bg-black/30 border-white/10">
                        <h2 className="text-xl font-semibold mb-4">Your Answer</h2>
                        <div data-color-mode="dark">
                            <MDEditor
                                value={newAnswer}
                                onChange={(val) => setNewAnswer(val || "")}
                                preview="edit"
                                height={300}
                            />
                        </div>
                        <div className="flex justify-end mt-4">
                            <Button disabled={!newAnswer}>Post Your Answer</Button>
                        </div>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
} 