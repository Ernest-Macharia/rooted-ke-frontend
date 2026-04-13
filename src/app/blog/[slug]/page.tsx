import BlogPostPage from "@/components/blog/BlogPostPage";

export default function BlogPostRoute({ params }: { params: { slug: string } }) {
  return <BlogPostPage slug={params.slug} />;
}
