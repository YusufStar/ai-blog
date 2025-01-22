import { Card } from "@/components/ui/card";
import { mockStats } from "@/lib/mock-admin-data";
import {
  Users,
  MessageSquare,
  FileText,
  TrendingUp,
} from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your platform.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={mockStats.totalUsers}
          change="+12%"
          icon={Users}
        />
        <StatCard
          title="Total Questions"
          value={mockStats.totalQuestions}
          change="+8%"
          icon={MessageSquare}
        />
        <StatCard
          title="Total Answers"
          value={mockStats.totalAnswers}
          change="+15%"
          icon={MessageSquare}
        />
        <StatCard
          title="Total Posts"
          value={mockStats.totalPosts}
          change="+5%"
          icon={FileText}
        />
      </div>

      {/* Activity Charts ve Recent Activity buraya eklenecek */}
    </div>
  );
}

function StatCard({ title, value, change, icon: Icon }) {
  return (
    <Card className="p-6 bg-black/20 border-white/10">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <div className="flex items-center gap-1 text-sm">
          <TrendingUp className="h-4 w-4 text-green-500" />
          <span className="text-green-500">{change}</span>
        </div>
      </div>
      <p className="text-muted-foreground mb-1">{title}</p>
      <p className="text-2xl font-bold">{value.toLocaleString()}</p>
    </Card>
  );
} 