import api, { getBlogPost, getBlogPosts } from "@/lib/api";
import { extractItem, extractList } from "@/services/http";

export type BlogPostItem = {
  id?: number;
  slug: string;
  title: string;
  excerpt?: string;
  img?: string;
  date?: string;
  readTime?: string;
  category?: string;
  category_detail?: { name: string };
  tags_list?: string[];
  tags?: string[] | string;
  body?: Array<{ type: string; text: string }>;
  relatedSlugs?: string[];
  authorObj?: { name: string; avatar?: string };
  author?: string;
  approved_comments?: Array<{ id?: number; author: string; content: string; created_at?: string }>;
  comments_count?: number;
};

export type BlogCommentInput = {
  author: string;
  email: string;
  content: string;
};

export async function fetchBlogPosts(params: Record<string, unknown> = {}): Promise<BlogPostItem[]> {
  const response = await getBlogPosts(params as never);
  return extractList<BlogPostItem>(response.data);
}

export async function fetchBlogPost(slug: string): Promise<BlogPostItem | null> {
  const response = await getBlogPost(slug);
  return extractItem<BlogPostItem>(response.data);
}

export async function fetchBlogCategoryLabels(): Promise<string[]> {
  const response = await api.get("/api/blog/category-labels/");
  return Array.isArray(response.data) ? (response.data as string[]) : ["All"];
}

export async function submitBlogComment(slug: string, payload: BlogCommentInput): Promise<boolean> {
  await api.post(`/api/blog/${slug}/add_comment/`, payload);
  return true;
}
