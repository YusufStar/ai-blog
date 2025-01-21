"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Command, Blocks, Sparkles } from "lucide-react";
import { Particles } from "@/components/ui/particles";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { MorphingText } from "@/components/ui/morphing-text";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { ShimmerButton } from "@/components/ui/shimmer-button";

export default function Home() {
  const words = ["AI Blog", "Forum", "Podcast", "Community"];

  return (
    <div className="bg-background overflow-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-border/40 backdrop-blur-xl">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Command className="h-6 w-6 text-primary" />
            <span className="font-bold">AI Hub</span>
          </div>
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
          <ShimmerButton>Get Started</ShimmerButton>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[calc(100vh-64px)] pt-16 flex items-center">
        {/* Animated Background */}
        <AnimatedGridPattern />
        <Particles className="absolute inset-0" quantity={50} />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative p-8 rounded-2xl bg-black/20 backdrop-blur-sm border border-white/5 shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent rounded-2xl" />
              <div className="relative">
                <MorphingText texts={words} className="text-sm text-muted-foreground text-center" />
                <div className="bg-primary/10 shrink-0 w-fit text-primary px-3 py-1 rounded-full text-sm font-medium">
                  Welcome to
                </div>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  Discover the Power of{" "}
                  <span className="bg-clip-text text-transparent bg-[linear-gradient(to_right,var(--color-1),var(--color-2),var(--color-3),var(--color-4),var(--color-5))] animate-rainbow">
                    Artificial Intelligence
                  </span>
                </h1>
                <p className="text-muted-foreground text-lg md:text-xl mb-4 max-w-lg">
                  Join our community of AI enthusiasts and explore the future of technology
                  through expert insights, discussions, and cutting-edge research.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <RainbowButton>
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </RainbowButton>
                  <Button size="lg" variant="outline" className="group">
                    Watch Demo
                    <motion.span
                      className="ml-2"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      ⚡
                    </motion.span>
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Feature Cards */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative p-6 rounded-2xl bg-black/10 backdrop-blur-sm border border-white/5"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-primary/10 to-transparent rounded-2xl" />
              <div className="grid grid-cols-2 gap-4 relative">
                <FeatureCard
                  icon={<Blocks className="h-6 w-6" />}
                  title="AI Models"
                  description="Access state-of-the-art AI models and APIs"
                  delay={0.3}
                />
                <FeatureCard
                  icon={<Sparkles className="h-6 w-6" />}
                  title="Smart Tools"
                  description="Powerful tools for AI development and research"
                  delay={0.4}
                />
                <FeatureCard
                  icon={<Command className="h-6 w-6" />}
                  title="Workflows"
                  description="Automate your AI workflows effortlessly"
                  delay={0.5}
                />
                <FeatureCard
                  icon={<ArrowRight className="h-6 w-6" />}
                  title="Integration"
                  description="Seamless integration with popular platforms"
                  delay={0.6}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Floating Elements */}
      <div className="fixed top-1/4 left-4 w-1 h-20 bg-gradient-to-b from-primary/50 to-transparent" />
      <div className="fixed top-1/3 right-4 w-1 h-32 bg-gradient-to-b from-primary/50 to-transparent" />
    </div>
  );
}

// Feature Card Component
function FeatureCard({ icon, title, description, delay = 0 }: { icon: React.ReactNode; title: string; description: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.05 }}
      className="group relative bg-black/30 backdrop-blur-sm hover:bg-black/40 p-6 rounded-xl border border-white/10 transition-all shadow-lg"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative">
        <div className="bg-primary/20 rounded-full w-10 h-10 flex items-center justify-center mb-4 text-primary">
          {icon}
        </div>
        <h3 className="font-semibold mb-2 text-white/90">{title}</h3>
        <p className="text-sm text-white/70">{description}</p>
      </div>
    </motion.div>
  );
}
