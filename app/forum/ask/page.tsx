"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReactMarkdown from "react-markdown";
import { Plus, X, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// MDEditor'ü client-side'da dynamic import ile yüklüyoruz
const MDEditor = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  { ssr: false }
);

export default function AskQuestionPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [preview, setPreview] = useState(false);

  const handleAddTag = () => {
    if (tag && tags.length < 5 && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleSubmit = () => {
    // Form validation ve submission logic
    console.log({ title, content, tags });
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div>
            <h1 className="text-3xl font-bold mb-2">Ask a Question</h1>
            <p className="text-muted-foreground">
              Be specific and imagine you're asking a question to another developer
            </p>
          </div>

          <Card className="p-6 bg-black/30 border-white/10">
            <div className="space-y-6">
              {/* Title */}
              <div>
                <h2 className="text-lg font-semibold mb-2">Title</h2>
                <p className="text-sm text-muted-foreground mb-2">
                  Be specific and descriptive about your question
                </p>
                <Input
                  placeholder="e.g. How to implement real-time chat with Next.js and Socket.io?"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-black/20 border-white/10"
                />
              </div>

              {/* Content */}
              <div>
                <h2 className="text-lg font-semibold mb-2">Details</h2>
                <p className="text-sm text-muted-foreground mb-2">
                  Include all the information someone would need to answer your question
                </p>
                <Tabs defaultValue="write">
                  <TabsList className="mb-2">
                    <TabsTrigger value="write">Write</TabsTrigger>
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                  </TabsList>
                  <TabsContent value="write">
                    <div data-color-mode="dark">
                      <MDEditor
                        value={content}
                        onChange={(val) => setContent(val || "")}
                        preview="edit"
                        height={400}
                      />
                    </div>
                  </TabsContent>
                  <TabsContent value="preview">
                    <Card className="p-4 min-h-[400px] prose prose-invert max-w-none">
                      <ReactMarkdown>{content}</ReactMarkdown>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Tags */}
              <div>
                <h2 className="text-lg font-semibold mb-2">Tags</h2>
                <p className="text-sm text-muted-foreground mb-2">
                  Add up to 5 tags to describe what your question is about
                </p>
                <div className="flex gap-2 mb-2">
                  {tags.map((t) => (
                    <Badge key={t} variant="outline" className="bg-primary/10 border-primary/20">
                      {t}
                      <button
                        onClick={() => handleRemoveTag(t)}
                        className="ml-2 hover:text-primary"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="e.g. nextjs"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
                    className="bg-black/20 border-white/10"
                  />
                  <Button onClick={handleAddTag} disabled={tags.length >= 5}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Guidelines */}
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Writing a good question</AlertTitle>
                <AlertDescription>
                  <ul className="list-disc list-inside text-sm mt-2 space-y-1">
                    <li>Summarize your problem in a one-line title</li>
                    <li>Describe your problem in more detail</li>
                    <li>Describe what you've tried</li>
                    <li>Show some code</li>
                    <li>Add relevant tags</li>
                  </ul>
                </AlertDescription>
              </Alert>

              {/* Submit */}
              <div className="flex justify-end gap-4">
                <Button variant="outline">Cancel</Button>
                <Button 
                  onClick={handleSubmit}
                  disabled={!title || !content || tags.length === 0}
                >
                  Post Your Question
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
} 