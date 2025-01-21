"use client";

import Link from "next/link";
import { Command } from "lucide-react";
import { ShimmerButton } from "@/components/ui/shimmer-button";

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-border/40 backdrop-blur-xl">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Command className="h-6 w-6 text-primary" />
          <span className="font-bold">AI Hub</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
            Blog
          </Link>
          <Link href="/forum" className="text-muted-foreground hover:text-foreground transition-colors">
            Forum
          </Link>
          <Link href="/podcast" className="text-muted-foreground hover:text-foreground transition-colors">
            Podcast
          </Link>
        </div>
        <ShimmerButton className="py-2 px-4 text-sm">Get Started</ShimmerButton>
      </div>
    </nav>
  );
} 