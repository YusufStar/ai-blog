import { notFound } from "next/navigation";
import { allPosts } from "@/lib/mdx";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, TrendingUp } from "lucide-react";

interface BlogPostPageProps {
    params: {
        slug: string;
    };
}

export async function generateStaticParams() {
    return allPosts.map((post) => ({
        slug: post.slug,
    }));
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
    const post = allPosts.find((post) => post.slug === params.slug);

    if (!post) {
        notFound();
    }

    const Content = post.Content;

    if (!Content) {
        return <div>No content found</div>;
    }

    console.log(post);

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative pt-20 border-b border-border/10 max-w-4xl mx-auto px-4">
                <div className="absolute inset-0 bg-gradient-to-b from-background/5 via-background to-background" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
                <div className="container relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="flex items-center justify-center gap-2 mb-6">
                            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                                {post.category}
                            </Badge>
                            {post.trending && (
                                <Badge variant="outline" className="bg-orange-500/10 text-orange-500 border-orange-500/20">
                                    <TrendingUp className="h-3 w-3 mr-1" /> Trending
                                </Badge>
                            )}
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
                            {post.title}
                        </h1>
                        <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full">
                                <Calendar className="h-4 w-4" />
                                <time dateTime={post.date}>{post.date}</time>
                            </div>
                            <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full">
                                <Clock className="h-4 w-4" />
                                <span>{post.readTime}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <article className="py-12">
                <div className="container max-w-4xl mx-auto px-4">
                    <div className="relative">
                        <div className="absolute -inset-x-4 -inset-y-6 bg-gradient-to-b from-background-800 to-background/20 rounded-xl blur-2xl" />
                        <div className="relative bg-black/30 border border-white/5 rounded-xl p-8 backdrop-blur-sm">
                            <div className="prose prose-invert max-w-none prose-headings:font-bold prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-h4:text-xl prose-p:text-base prose-p:leading-7 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-white prose-code:text-primary prose-pre:bg-black/50 prose-pre:border prose-pre:border-border/10 prose-pre:rounded-lg prose-img:rounded-lg">
                                {Content}
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    );
} 