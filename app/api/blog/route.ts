import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const posts = await prisma.blogPost.findMany({
      include: {
        author: {
          select: {
            name: true,
            avatar: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    if (!request.body) {
      return NextResponse.json(
        { error: "Request body is empty" },
        { status: 400 }
      );
    }

    const json = await request.json();
    
    // Zorunlu alanları kontrol et
    if (!json.title || !json.content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    // Kullanıcı kontrolü
    const token = (await cookies()).get('token')?.value;
    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const decoded = await verifyAuth(token);
    if (!decoded || !decoded.id) {
      return NextResponse.json(
        { error: "Invalid token" },
        { status: 401 }
      );
    }

    const post = await prisma.blogPost.create({
      data: {
        title: json.title,
        slug: json.slug,
        excerpt: json.excerpt || '',
        content: json.content,
        category: json.category || 'Uncategorized',
        tags: Array.isArray(json.tags) ? json.tags : [],
        status: json.status || 'draft',
        views: 0,
        publishedAt: json.status === 'published' ? new Date() : null,
        authorId: decoded.id as string,
      },
      include: {
        author: {
          select: {
            name: true,
            avatar: true,
          },
        },
      },
    });

    return NextResponse.json(post);
  } catch (error: any) {
    console.error('Create post error:', error);
    
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: "A post with this slug already exists" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: error.message || "Failed to create blog post" },
      { status: 500 }
    );
  }
} 