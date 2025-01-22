export interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin" | "moderator";
  avatar: string;
  createdAt: string;
  status: "active" | "banned" | "pending";
  lastLogin: string;
}

export interface AdminStats {
  totalUsers: number;
  totalQuestions: number;
  totalAnswers: number;
  totalPosts: number;
  activeUsers: number;
  questionsToday: number;
  answersToday: number;
  postsToday: number;
}

export interface AdminQuestion extends ForumQuestion {
  status: "active" | "deleted" | "reported";
  reports?: {
    reason: string;
    reportedBy: string;
    createdAt: string;
  }[];
}

export interface AdminAnswer {
  id: string;
  questionId: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  votes: number;
  createdAt: string;
  status: "active" | "deleted" | "reported";
  accepted: boolean;
}

export interface AdminBlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  category: string;
  tags: string[];
  status: "draft" | "published" | "archived";
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  views: number;
} 