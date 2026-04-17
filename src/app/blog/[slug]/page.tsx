import BlogPostPage from "@/components/blog/BlogPostPage";

export default async function BlogPostRoute({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  const resolvedParams = await params;
  return <BlogPostPage slug={resolvedParams.slug} />;
}
