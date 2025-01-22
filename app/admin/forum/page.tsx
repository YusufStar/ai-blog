"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Search, MoreVertical, Filter, Eye, MessageSquare, Check, X, AlertTriangle } from "lucide-react";
import { mockQuestions } from "@/lib/mock-admin-data";
import { AdminQuestion } from "@/types/admin";
import { useRouter } from "next/navigation";

const statusColors = {
  active: "bg-green-500/20 text-green-500 border-green-500/20",
  pending: "bg-yellow-500/20 text-yellow-500 border-yellow-500/20",
  archived: "bg-gray-500/20 text-gray-500 border-gray-500/20",
  flagged: "bg-red-500/20 text-red-500 border-red-500/20",
};

export default function ForumPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<"questions" | "answers">("questions");
  const router = useRouter();

  const filteredQuestions = mockQuestions.filter(question => {
    const matchesSearch = question.title.toLowerCase().includes(search.toLowerCase()) ||
                         question.content.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || question.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Forum Management</h1>
          <p className="text-muted-foreground">
            Manage questions and answers from the community
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={(v: "questions" | "answers") => setActiveTab(v)}>
        <TabsList className="mb-4">
          <TabsTrigger value="questions">Questions</TabsTrigger>
          <TabsTrigger value="answers">Answers</TabsTrigger>
        </TabsList>

        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search questions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-black/20 border-white/10"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>

        <TabsContent value="questions">
          <Card className="bg-black/20 border-white/10">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Question</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Stats</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredQuestions.map((question) => (
                  <TableRow key={question.id}>
                    <TableCell onClick={() => router.push(`/forum/${question.id}`)} className="cursor-pointer">
                      <div>
                        <div className="font-medium">{question.title}</div>
                        <div className="text-sm text-muted-foreground line-clamp-1">
                          {question.content}
                        </div>
                        <div className="flex gap-2 mt-2">
                          {question.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="bg-primary/10 border-primary/20">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={question.author.avatar} />
                          <AvatarFallback>{question.author.name[0]}</AvatarFallback>
                        </Avatar>
                        <span>{question.author.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={statusColors[question.status]}>
                        {question.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-4 text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          <span>{question.views}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4" />
                          <span>{question.answers}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(question.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => router.push(`/admin/forum/${question.id}`)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Check className="h-4 w-4 mr-2" />
                            Approve
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-yellow-500">
                            <AlertTriangle className="h-4 w-4 mr-2" />
                            Flag Content
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-500">
                            <X className="h-4 w-4 mr-2" />
                            Archive
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="answers">
          {/* Answers tablosu benzer şekilde implement edilecek */}
          <Card className="p-4 text-center text-muted-foreground">
            Answers management coming soon...
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 