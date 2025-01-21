"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, LayoutGrid, List, TrendingUp, Clock, ArrowRight, BookmarkPlus } from "lucide-react";
import { Particles } from "@/components/ui/particles";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface BlogPost {
    slug: string;
    id: string;
    title: string;
    excerpt: string;
    category: string;
    readTime: string;
    date: string;
    imageUrl: string;
    trending?: boolean;
}

interface BlogScreenProps {
    posts: BlogPost[];
}

export function BlogScreen({ posts }: BlogScreenProps) {
    const [layout, setLayout] = useState<"grid" | "list">("grid");

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
                            AI Technology{" "}
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                                Blog
                            </span>
                        </h1>

                        {/* Search and Layout Controls */}
                        <div className="flex gap-4 max-w-xl mx-auto items-center">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                                <Input
                                    placeholder="Search articles..."
                                    className="pl-10 bg-black/20 border-white/10"
                                />
                            </div>
                            <div className="flex gap-2 bg-black/20 p-1 rounded-lg border border-white/10">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setLayout("grid")}
                                    className={cn(
                                        "p-2",
                                        layout === "grid" && "bg-primary/20 text-primary"
                                    )}
                                >
                                    <LayoutGrid className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setLayout("list")}
                                    className={cn(
                                        "p-2",
                                        layout === "list" && "bg-primary/20 text-primary"
                                    )}
                                >
                                    <List className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Blog Posts */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={layout}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className={cn(
                                "grid gap-6",
                                layout === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
                            )}
                        >
                            {posts.map((post, index) => (
                                <BlogCard
                                    key={post.id}
                                    post={post}
                                    layout={layout}
                                    delay={index * 0.1}
                                />
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </section>
        </div>
    );
}

function BlogCard({ post, layout, delay }: { post: BlogPost; layout: "grid" | "list"; delay: number }) {
    const router = useRouter();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            className="group relative"
        >
            <Card className={cn(
                "overflow-hidden border-white/10 bg-black/30 backdrop-blur-sm transition-all duration-300",
                "hover:border-primary/20 hover:bg-black/40 hover:shadow-lg hover:shadow-primary/5",
                layout === "list" ? "flex gap-6" : "flex flex-col"
            )}>
                <div className={cn(
                    "relative overflow-hidden",
                    layout === "grid" ? "aspect-[16/9]" : "w-1/3"
                )}>
                    <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="object-cover w-full h-full transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                    {post.trending && (
                        <Badge className="absolute top-3 right-3 bg-primary/90 backdrop-blur-sm">
                            <TrendingUp className="h-3 w-3 mr-1" /> Trending
                        </Badge>
                    )}
                    <Badge 
                        variant="outline" 
                        className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm border-white/20 transition-colors duration-300 group-hover:border-primary/30"
                    >
                        {post.category}
                    </Badge>
                </div>
                <div className={cn(
                    "flex flex-col flex-1 relative",
                    "after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-transparent after:via-primary/30 after:to-transparent after:scale-x-0 after:group-hover:scale-x-100 after:transition-transform after:duration-500",
                    layout === "grid" ? "p-6" : "p-6"
                )}>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {post.readTime}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                        <span>{post.date}</span>
                    </div>
                    
                    <h3 className={cn(
                        "font-semibold transition-colors duration-300 line-clamp-2",
                        "group-hover:text-primary/90",
                        layout === "grid" ? "text-lg mb-2" : "text-xl mb-3"
                    )}>
                        {post.title}
                    </h3>
                    
                    <p className={cn(
                        "text-muted-foreground line-clamp-2 text-sm transition-colors duration-300 group-hover:text-muted-foreground/90",
                        layout === "grid" ? "mb-3" : "mb-4"
                    )}>
                        {post.excerpt}
                    </p>

                    <div className="mt-auto flex items-center gap-2">
                        <Button 
                            onClick={() => router.push(`/blog/${post.slug}`)}
                            variant="ghost" 
                            size="sm" 
                            className="text-primary/80 hover:text-primary hover:bg-primary/10 -ml-3 transition-colors duration-300"
                        >
                            Read More
                            <ArrowRight className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                        </Button>
                        <div className="flex-1" />
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-white transition-colors duration-300"
                        >
                            <BookmarkPlus className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </Card>
        </motion.div>
    );
} 