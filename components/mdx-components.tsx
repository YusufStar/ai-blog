import type { MDXComponents } from 'mdx/types'
import { cn } from "@/lib/utils";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    h1: ({ className, ...props }) => (
      <h1 className={cn("mt-12 mb-6 text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-white/70", className)} {...props} />
    ),
    h2: ({ className, ...props }) => (
      <h2 className={cn("mt-10 mb-4 text-3xl font-bold text-white/90", className)} {...props} />
    ),
    h3: ({ className, ...props }) => (
      <h3 className={cn("mt-8 mb-4 text-2xl font-bold text-white/80", className)} {...props} />
    ),
    p: ({ className, ...props }) => (
      <p className={cn("my-6 leading-7 text-white/70", className)} {...props} />
    ),
    ul: ({ className, ...props }) => (
      <ul className={cn("my-6 ml-6 list-disc [&>li]:mt-2 marker:text-primary/50", className)} {...props} />
    ),
    ol: ({ className, ...props }) => (
      <ol className={cn("my-6 ml-6 list-decimal [&>li]:mt-2 marker:text-primary/50", className)} {...props} />
    ),
    code: ({ className, ...props }) => (
      <code
        className={cn(
          "relative rounded bg-primary/10 px-[0.4rem] py-[0.2rem] font-mono text-sm text-primary border border-primary/10",
          className
        )}
        {...props}
      />
    ),
    pre: ({ className, ...props }) => (
      <pre
        className={cn(
          "my-8 overflow-x-auto rounded-lg border border-white/10 bg-black/30 p-4 backdrop-blur-sm",
          className
        )}
        {...props}
      />
    ),
    blockquote: ({ className, ...props }) => (
      <blockquote
        className={cn(
          "mt-6 border-l-2 border-primary pl-6 italic text-white/60",
          className
        )}
        {...props}
      />
    ),
    a: ({ className, ...props }) => (
      <a
        className={cn(
          "text-primary underline-offset-4 decoration-primary/30 hover:decoration-primary",
          className
        )}
        {...props}
      />
    ),
    img: ({ className, alt, ...props }) => (
      <div className="my-8 overflow-hidden rounded-lg border border-white/10 bg-black/30 backdrop-blur-sm">
        <img
          className={cn("w-full object-cover", className)}
          alt={alt}
          {...props}
        />
      </div>
    ),
  }
}