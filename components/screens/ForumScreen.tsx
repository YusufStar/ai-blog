"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MessageSquare, Eye, ArrowUp, Check, Plus } from "lucide-react";
import { Particles } from "@/components/ui/particles";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";

interface ForumQuestion {
    id: string;
    title: string;
    content: string;
    tags: string[];
    author: {
        name: string;
        avatar: string;
    };
    votes: number;
    answers: number;
    views: number;
    createdAt: string;
    solved: boolean;
}

interface ForumScreenProps {
    questions: ForumQuestion[];
}

export function ForumScreen({ questions }: ForumScreenProps) {
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    const allTags = Array.from(new Set(questions.flatMap(q => q.tags)));

    return (
        <div>
            <Particles className="absolute inset-0" quantity={30} />

            {/* Hero Section */}
            <section className="relative py-12 w-full flex items-center">
                <div className="container mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-2xl mx-auto text-center"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            AI Developer{" "}
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                                Community
                            </span>
                        </h1>

                        {/* Search and Ask Question */}
                        <div className="flex gap-4 max-w-xl mx-auto items-center">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                                <Input
                                    placeholder="Search questions..."
                                    className="pl-10 bg-black/20 border-white/10"
                                />
                            </div>
                            <Button className="bg-primary hover:bg-primary/90">
                                <Plus className="mr-2 h-4 w-4" /> Ask Question
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <Card className="p-4 bg-black/30 border-white/10">
                                <h3 className="font-semibold mb-3">Popular Tags</h3>
                                <div className="flex flex-wrap gap-2">
                                    {allTags.map((tag) => (
                                        <Badge
                                            key={tag}
                                            variant={selectedTag === tag ? "default" : "outline"}
                                            className="cursor-pointer"
                                            onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                                        >
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </Card>
                        </div>

                        {/* Questions List */}
                        <div className="lg:col-span-3">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="space-y-4"
                                >
                                    {questions
                                        .filter(q => !selectedTag || q.tags.includes(selectedTag))
                                        .map((question) => (
                                            <QuestionCard key={question.id} question={question} />
                                        ))}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

function QuestionCard({ question }: { question: ForumQuestion }) {
    const router = useRouter();

    return (
        <Card
            className="p-6 bg-black/30 border-white/10 hover:bg-black/40 transition-colors cursor-pointer"
            onClick={() => router.push(`/forum/${question.id}`)}
        >
            <div className="flex gap-6">
                {/* Stats */}
                <div className="flex flex-col items-center gap-4 text-sm">
                    <div className="flex flex-col items-center">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <ArrowUp className="h-4 w-4" />
                        </Button>
                        <span className="font-semibold">{question.votes}</span>
                    </div>
                    <div className="flex flex-col items-center text-muted-foreground">
                        <MessageSquare className="h-4 w-4 mb-1" />
                        <span>{question.answers}</span>
                    </div>

                </div>

                {/* Content */}
                <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-lg group-hover:text-primary/90">
                            {question.title}
                        </h3>
                        <div className="flex items-center gap-2">
                            {question.solved && (
                                <>
                                <Badge variant="default" className="bg-green-500/20 text-green-500 border-green-500/20">
                                    <Check className="h-3 w-3 mr-1" /> Solved
                                </Badge>

                                <div className="h-1 w-1 bg-muted-foreground rounded-full" />
                                </>
                            )}
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Eye className="h-4 w-4" />
                                <span>{question.views}</span>
                            </div>
                        </div>
                    </div>
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                        {question.content}
                    </p>

                    <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                            {question.tags.map((tag) => (
                                <Badge key={tag} variant="outline" className="bg-primary/10 border-primary/20">
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
                            <span>{formatDistanceToNow(new Date(question.createdAt))} ago</span>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
} 