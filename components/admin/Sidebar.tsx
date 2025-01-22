"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Users,
  MessageSquare,
  FileText,
  LayoutDashboard,
  Settings,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin",
  },
  {
    title: "Users",
    icon: Users,
    href: "/admin/users",
  },
  {
    title: "Forum",
    icon: MessageSquare,
    href: "/admin/forum",
  },
  {
    title: "Blog",
    icon: FileText,
    href: "/admin/blog",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/admin/settings",
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 border-r border-border/40 bg-black/20 backdrop-blur-xl">
      <div className="flex h-16 items-center border-b border-border/40 px-6">
        <h1 className="text-xl font-bold">Admin Panel</h1>
      </div>
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors",
              pathname === item.href && "bg-primary/10 text-primary"
            )}
          >
            <item.icon className="h-5 w-5" />
            {item.title}
          </Link>
        ))}
      </nav>
    </div>
  );
} 