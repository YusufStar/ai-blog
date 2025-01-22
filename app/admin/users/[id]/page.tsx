"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockUsers } from "@/lib/mock-admin-data";
import { Ban, ArrowLeft, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";

interface UserDetailsPageProps {
  params: {
    id: string;
  };
}

export default function UserDetailsPage({ params }: UserDetailsPageProps) {
  const router = useRouter();
  const user = mockUsers.find(u => u.id === params.id);

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="p-8">
      <Button 
        variant="ghost" 
        onClick={() => router.back()}
        className="mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Users
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* User Profile Card */}
        <Card className="p-6 bg-black/20 border-white/10">
          <div className="flex flex-col items-center text-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src={user.avatar} />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
            <h2 className="text-2xl font-bold mb-1">{user.name}</h2>
            <p className="text-muted-foreground mb-4">{user.email}</p>
            <div className="flex gap-2 mb-6">
              <Badge variant="outline" className="bg-primary/10 border-primary/20">
                {user.role}
              </Badge>
              <Badge variant="outline" className="bg-green-500/20 text-green-500 border-green-500/20">
                {user.status}
              </Badge>
            </div>
            <div className="flex gap-2">
              <Button>
                <Pencil className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
              <Button variant="destructive">
                <Ban className="h-4 w-4 mr-2" />
                Ban User
              </Button>
            </div>
          </div>
        </Card>

        {/* User Details & Activity */}
        <div className="md:col-span-2">
          <Card className="bg-black/20 border-white/10">
            <Tabs defaultValue="activity" className="w-full">
              <TabsList className="w-full bg-black/20">
                <TabsTrigger value="activity" className="flex-1">Activity</TabsTrigger>
                <TabsTrigger value="questions" className="flex-1">Questions</TabsTrigger>
                <TabsTrigger value="answers" className="flex-1">Answers</TabsTrigger>
                <TabsTrigger value="settings" className="flex-1">Settings</TabsTrigger>
              </TabsList>
              <div className="p-6">
                <TabsContent value="activity">
                  <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                  {/* Activity list buraya gelecek */}
                </TabsContent>
                <TabsContent value="questions">
                  <h3 className="text-lg font-semibold mb-4">Questions</h3>
                  {/* Questions list buraya gelecek */}
                </TabsContent>
                <TabsContent value="answers">
                  <h3 className="text-lg font-semibold mb-4">Answers</h3>
                  {/* Answers list buraya gelecek */}
                </TabsContent>
                <TabsContent value="settings">
                  <h3 className="text-lg font-semibold mb-4">User Settings</h3>
                  {/* Settings form buraya gelecek */}
                </TabsContent>
              </div>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
} 