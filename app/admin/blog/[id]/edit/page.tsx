"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const MDEditor = dynamic(
    () => import("@uiw/react-md-editor").then((mod) => mod.default),
    { ssr: false, loading: () => <div>Loading...</div> }
);

interface BlogPostEditPageProps {
    params: {
        id: string;
    };
}

export default function BlogPostEditPage({ params }: BlogPostEditPageProps) {
    const router = useRouter();
    const [post, setPost] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        title: "",
        excerpt: "",
        content: "",
        category: "",
        status: "draft",
        tags: "",
    });

    useEffect(() => {
        fetchPost();
    }, [params.id]);

    const fetchPost = async () => {
        try {
            const response = await fetch(`/api/blog/${params.id}`);
            const data = await response.json();
            setPost(data);
            setFormData({
                title: data.title,
                excerpt: data.excerpt || "",
                content: data.content,
                category: data.category || "Uncategorized",
                status: data.status,
                tags: Array.isArray(data.tags) ? data.tags.join(", ") : "",
            });
        } catch (error) {
            console.error('Failed to fetch post:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        try {
            const response = await fetch(`/api/blog/${params.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
                }),
                credentials: 'include',
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Failed to update post');
            }

            router.push(`/admin/blog/${params.id}`);
        } catch (error: any) {
            console.error('Error updating post:', error);
            alert(error.message);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <Button variant="ghost" onClick={() => router.back()}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                </Button>
                <Button onClick={handleSave}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <Card className="p-6 bg-black/20 border-white/10">
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium mb-2 block">Title</label>
                                <Input
                                    value={formData.title}
                                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                                    className="bg-black/20 border-white/10"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium mb-2 block">Excerpt</label>
                                <Input
                                    value={formData.excerpt}
                                    onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                                    className="bg-black/20 border-white/10"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium mb-2 block">Content</label>
                                <MDEditor
                                    value={formData.content}
                                    onChange={(value) => setFormData(prev => ({ ...prev, content: value || "" }))}
                                    preview="edit"
                                    className="bg-black/20 border-white/10"
                                />
                            </div>
                        </div>
                    </Card>
                </div>

                <Card className="p-6 bg-black/20 border-white/10 h-fit">
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium mb-2 block">Status</label>
                            <Select
                                value={formData.status}
                                onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="draft">Draft</SelectItem>
                                    <SelectItem value="published">Published</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <label className="text-sm font-medium mb-2 block">Category</label>
                            <Input
                                value={formData.category}
                                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                                className="bg-black/20 border-white/10"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium mb-2 block">Tags</label>
                            <Input
                                value={formData.tags}
                                onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                                placeholder="Separate tags with commas"
                                className="bg-black/20 border-white/10"
                            />
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
} 