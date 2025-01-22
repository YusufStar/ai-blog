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
  { ssr: false }
);

export default function NewBlogPost() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "Uncategorized",
    status: "draft",
    tags: "",
  });

  useEffect(() => {
    if (formData.title && !formData.slug) {
      setFormData(prev => ({
        ...prev,
        slug: generateSlug(formData.title)
      }));
    }
  }, [formData.title]);

  const handleSave = async () => {
    setLoading(true);
    try {
      if (!formData.title || !formData.content) {
        throw new Error("Title and content are required");
      }

      const slug = formData.slug || generateSlug(formData.title);
      
      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          slug,
          tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
          status: formData.status || 'draft',
        }),
        credentials: 'include', // Cookie'leri göndermek için önemli
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create post');
      }

      const post = await response.json();
      router.push(`/admin/blog/${post.id}`);
    } catch (error: any) {
      console.error('Error creating post:', error);
      // TODO: Kullanıcıya hata mesajı göster
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <Button onClick={handleSave} disabled={loading}>
          <Save className="h-4 w-4 mr-2" />
          {loading ? 'Saving...' : 'Save Post'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <Card className="lg:col-span-2 p-6 bg-black/20 border-white/10">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Title</label>
              <Input
                value={formData.title}
                onChange={(e) => {
                  const title = e.target.value;
                  setFormData(prev => ({
                    ...prev,
                    title,
                    slug: generateSlug(title),
                  }));
                }}
                className="bg-black/20 border-white/10"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Slug</label>
              <Input
                value={formData.slug}
                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
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
                onChange={(value) => setFormData(prev => ({ ...prev, content: value || '' }))}
                preview="edit"
              />
            </div>
          </div>
        </Card>

        {/* Sidebar */}
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