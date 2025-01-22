"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { formatDistanceToNow } from "date-fns";

interface BlogPostDetailPageProps {
    params: {
        id: string;
    };
}

export default function BlogPostDetailPage({ params }: BlogPostDetailPageProps) {
    const router = useRouter();
    const [post, setPost] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<"preview" | "analytics" | "history">("preview");

    useEffect(() => {
        fetchPost();
    }, [params.id]);

    const fetchPost = async () => {
        try {
            const response = await fetch(`/api/blog/${params.id}`);
            const data = await response.json();
            setPost(data);
        } catch (error) {
            console.error('Failed to fetch post:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!post) {
        return <div>Post not found</div>;
    }

    return (
        <div className="p-8">
            <Button
                variant="ghost"
                onClick={() => router.back()}
                className="mb-6"
            >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
            </Button>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Post Info Card */}
                <Card className="p-6 bg-black/20 border-white/10">
                    <div className="flex flex-col">
                        <div className="flex items-center gap-3 mb-4">
                            <Avatar className="h-10 w-10">
                                <AvatarImage src={post.author.avatar} />
                                <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                                <h3 className="font-semibold">{post.author.name}</h3>
                                <p className="text-sm text-muted-foreground">
                                    Posted {formatDistanceToNow(new Date(post.createdAt))} ago
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4 mb-6">
                            <div>
                                <p className="text-sm text-muted-foreground mb-1">Status</p>
                                <Badge
                                    variant="outline"
                                    className={post.status === "published" ? "bg-green-500/20 text-green-500" : "bg-yellow-500/20 text-yellow-500"}
                                >
                                    {post.status}
                                </Badge>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground mb-1">Category</p>
                                <Badge variant="outline" className="bg-primary/10 border-primary/20">
                                    {post.category}
                                </Badge>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground mb-1">Tags</p>
                                <div className="flex flex-wrap gap-2">
                                    {post.tags.map(tag => (
                                        <Badge key={tag} variant="outline">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Button
                                className="w-full"
                                onClick={() => router.push(`/admin/blog/${post.id}/edit`)}
                            >
                                <Pencil className="h-4 w-4 mr-2" />
                                Edit Post
                            </Button>
                        </div>
                    </div>
                </Card>

                {/* Post Content & Analytics */}
                <div className="md:col-span-2">
                    <Card className="bg-black/20 border-white/10">
                        <div className="p-6">
                            <h2 className="text-2xl font-bold mb-6">{post.title}</h2>

                            <Tabs value={activeTab} onValueChange={(v: any) => setActiveTab(v)}>
                                <TabsList className="mb-4">
                                    <TabsTrigger value="preview">Preview</TabsTrigger>
                                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                                    <TabsTrigger value="history">History</TabsTrigger>
                                </TabsList>

                                <TabsContent value="preview">
                                    <div className="prose prose-invert max-w-none">
                                        <ReactMarkdown>{post.content}</ReactMarkdown>
                                    </div>
                                </TabsContent>

                                <TabsContent value="analytics">
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <Card className="p-4">
                                                <p className="text-sm text-muted-foreground">Total Views</p>
                                                <p className="text-2xl font-bold">{post.views}</p>
                                            </Card>
                                            {/* Diğer analitik kartları */}
                                        </div>
                                    </div>
                                </TabsContent>

                                <TabsContent value="history">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-4 text-sm">
                                            <Badge variant="outline">Created</Badge>
                                            <span>{new Date(post.createdAt).toLocaleString()}</span>
                                        </div>
                                        <div className="flex items-center gap-4 text-sm">
                                            <Badge variant="outline">Last Updated</Badge>
                                            <span>{new Date(post.updatedAt).toLocaleString()}</span>
                                        </div>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
} 