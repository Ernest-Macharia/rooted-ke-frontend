import { notFound } from "next/navigation";
import BlogPostPage from "@/components/blog/BlogPostPage";
import { BLOG_DATA } from "@/lib/data";

export function generateStaticParams() {
  return Object.keys(BLOG_DATA).map((slug) => ({ slug }));
}

export default function BlogPostRoute({ params }: { params: { slug: string } }) {
  if (!BLOG_DATA[params.slug as keyof typeof BLOG_DATA]) {
    notFound();
  }

  return <BlogPostPage slug={params.slug} />;
}
