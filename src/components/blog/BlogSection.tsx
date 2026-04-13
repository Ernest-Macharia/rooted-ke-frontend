"use client";

import { MouseEvent, useEffect, useState } from "react";
import Link from "next/link";
import { Calendar, Tag } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { BLOG_POSTS, C } from "@/lib/constants";
import { fetchBlogPosts, type BlogPostItem } from "@/services/blogService";

type BlogCard = {
  slug: string;
  title: string;
  excerpt: string;
  img: string;
  date: string;
  category: string;
};

function liftCard(event: MouseEvent<HTMLDivElement>, transform: string, boxShadow: string) {
  event.currentTarget.style.transform = transform;
  event.currentTarget.style.boxShadow = boxShadow;
}

function tintButton(event: MouseEvent<HTMLAnchorElement>, transform: string, boxShadow: string) {
  event.currentTarget.style.transform = transform;
  event.currentTarget.style.boxShadow = boxShadow;
}

function normalizeBlog(item: BlogPostItem): BlogCard {
  return {
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt || "Read the full story.",
    img: item.img || "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=800&q=80",
    date: item.date || "",
    category: item.category_detail?.name || item.category || "General",
  };
}

type BlogCms = {
  blog_eyebrow?: string;
  blog_title?: string;
  blog_subtitle?: string;
  blog_cta_label?: string;
};

export default function BlogSection({ cms }: { cms?: BlogCms }) {
  const [items, setItems] = useState<BlogCard[]>(BLOG_POSTS);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const data = await fetchBlogPosts();
        if (!mounted || data.length === 0) return;
        setItems(data.map(normalizeBlog).slice(0, 3));
      } catch {
        // Keep static fallback.
      }
    };

    void load();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section style={{ padding: "80px 32px", maxWidth: 1280, margin: "0 auto" }}>
      <AnimatedSection style={{ textAlign: "center", marginBottom: 52 }}>
        <p style={{ color: C.teal, fontSize: 11, fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 12 }}>{cms?.blog_eyebrow || "Stories & Guides"}</p>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 4.5vw, 52px)", color: C.green, lineHeight: 1.1, marginBottom: 12 }}>{cms?.blog_title || "Stories & Guides"}</h2>
        <p style={{ color: "#888", fontSize: 15 }}>{cms?.blog_subtitle || "Expert insights, travel tips, and destination guides"}</p>
      </AnimatedSection>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28 }} className="grid-blog">
        {items.slice(0, 3).map((post, index) => (
          <AnimatedSection key={post.slug} delay={index * 0.1}>
            <Link href={`/blog/${post.slug}`} style={{ textDecoration: "none", display: "block" }}>
              <div
                style={{ borderRadius: 20, overflow: "hidden", background: C.white, boxShadow: "0 4px 20px rgba(15,61,51,0.07)", cursor: "pointer", transition: "all 0.3s" }}
                onMouseEnter={(event) => liftCard(event, "translateY(-4px)", "0 16px 40px rgba(15,61,51,0.13)")}
                onMouseLeave={(event) => liftCard(event, "translateY(0)", "0 4px 20px rgba(15,61,51,0.07)")}
              >
                <div className="hover-zoom-frame" style={{ height: 220, overflow: "hidden" }}>
                  <img src={post.img} alt={post.title} className="hover-zoom-img" />
                </div>
                <div style={{ padding: "22px 24px 28px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 14 }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 6, color: "#888", fontSize: 12 }}>
                      <Calendar size={12} /> {post.date}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: 5, color: C.teal, fontSize: 12, fontWeight: 600 }}>
                      <Tag size={11} /> {post.category}
                    </span>
                  </div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 600, color: C.green, marginBottom: 10, lineHeight: 1.3 }}>{post.title}</h3>
                  <p style={{ fontSize: 14, color: "#666", lineHeight: 1.7 }}>{post.excerpt}</p>
                </div>
              </div>
            </Link>
          </AnimatedSection>
        ))}
      </div>

      <AnimatedSection style={{ textAlign: "center", marginTop: 48 }}>
        <Link
          href="/blog"
          style={{ background: C.teal, color: C.white, padding: "14px 40px", borderRadius: 50, fontSize: 14, fontWeight: 600, border: "none", cursor: "pointer", letterSpacing: "0.04em", boxShadow: "0 6px 24px rgba(31,111,107,0.35)", transition: "all 0.3s", textDecoration: "none", display: "inline-block" }}
          onMouseEnter={(event) => tintButton(event, "translateY(-2px)", "0 10px 32px rgba(31,111,107,0.45)")}
          onMouseLeave={(event) => tintButton(event, "translateY(0)", "0 6px 24px rgba(31,111,107,0.35)")}
        >
          {cms?.blog_cta_label || "Read All Articles"}
        </Link>
      </AnimatedSection>
      <style>{`@media (max-width: 900px) { .grid-blog { grid-template-columns: 1fr 1fr !important; } } @media (max-width: 600px) { .grid-blog { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}
