"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockQuestions } from "@/lib/mock-admin-data";
import { ArrowLeft, Eye, MessageSquare, Check, Archive, Flag } from "lucide-react";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { formatDistanceToNow } from "date-fns";

interface QuestionDetailPageProps {
  params: {
    id: string;
  };
}

export default function QuestionDetailPage({ params }: QuestionDetailPageProps) {
  const router = useRouter();
  const question = mockQuestions.find(q => q.id === params.id);
  const [activeTab, setActiveTab] = useState<"content" | "answers" | "history">("content");

  if (!question) {
    return <div>Question not found</div>;
  }

  const handleStatusChange = (newStatus: string) => {
    // API call yapılacak
    console.log(`Changing status to ${newStatus}`);
  };

  return (
    <div className="p-8">
      <Button 
        variant="ghost" 
        onClick={() => router.back()}
        className="mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Forum
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Question Info Card */}
        <Card className="p-6 bg-black/20 border-white/10">
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={question.author.avatar} />
                <AvatarFallback>{question.author.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{question.author.name}</h3>
                <p className="text-sm text-muted-foreground">
                  Posted {formatDistanceToNow(new Date(question.createdAt))} ago
                </p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Status</p>
                <Badge variant="outline" className="bg-primary/10 border-primary/20">
                  {question.status}
                </Badge>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground mb-1">Stats</p>
                <div className="flex gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    <span>{question.views} views</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" />
                    <span>{question.answers} answers</span>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-1">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {question.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="bg-primary/10 border-primary/20">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Button className="w-full" onClick={() => handleStatusChange("approved")}>
                <Check className="h-4 w-4 mr-2" />
                Approve Question
              </Button>
              <Button variant="outline" className="w-full" onClick={() => handleStatusChange("flagged")}>
                <Flag className="h-4 w-4 mr-2" />
                Flag Content
              </Button>
              <Button variant="destructive" className="w-full" onClick={() => handleStatusChange("archived")}>
                <Archive className="h-4 w-4 mr-2" />
                Archive Question
              </Button>
            </div>
          </div>
        </Card>

        {/* Question Content & Answers */}
        <div className="md:col-span-2">
          <Card className="bg-black/20 border-white/10">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6">{question.title}</h2>
              
              <Tabs value={activeTab} onValueChange={(v: any) => setActiveTab(v)}>
                <TabsList className="mb-4">
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="answers">Answers</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>

                <TabsContent value="content">
                  <div className="prose prose-invert max-w-none">
                    <ReactMarkdown>{question.content}</ReactMarkdown>
                  </div>
                </TabsContent>

                <TabsContent value="answers">
                  <div className="space-y-4">
                    {question.answers > 0 ? (
                      <p>Answers will be listed here</p>
                    ) : (
                      <p className="text-muted-foreground text-center py-8">
                        No answers yet
                      </p>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="history">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-sm">
                      <Badge variant="outline">Created</Badge>
                      <span>{new Date(question.createdAt).toLocaleString()}</span>
                    </div>
                    {/* Diğer history itemları buraya gelecek */}
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