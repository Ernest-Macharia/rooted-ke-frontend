"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, Tag } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/ui/PageHero";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { BLOG_CATEGORIES, BLOG_POSTS, C } from "@/lib/constants";

type BlogPost = (typeof BLOG_POSTS)[number];

interface BlogCardProps {
  post: BlogPost;
  delay: number;
}

function BlogCard({ post, delay }: BlogCardProps) {
  return (
    <AnimatedSection delay={delay}>
      <Link href={`/blog/${post.slug}`} style={{ textDecoration: "none", display: "block", height: "100%" }}>
        <div
          style={{
            borderRadius: 20,
            overflow: "hidden",
            background: C.white,
            boxShadow: "0 4px 20px rgba(15,61,51,0.07)",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            transition: "transform 0.3s, box-shadow 0.3s",
            cursor: "pointer",
          }}
          onMouseEnter={(event) => {
            event.currentTarget.style.transform = "translateY(-5px)";
            event.currentTarget.style.boxShadow = "0 18px 44px rgba(15,61,51,0.13)";
          }}
          onMouseLeave={(event) => {
            event.currentTarget.style.transform = "translateY(0)";
            event.currentTarget.style.boxShadow = "0 4px 20px rgba(15,61,51,0.07)";
          }}
        >
          <div className="hover-zoom-frame" style={{ height: 220, overflow: "hidden", flexShrink: 0 }}>
            <img
              src={post.img}
              alt={post.title}
              className="hover-zoom-img"
            />
          </div>

          <div style={{ padding: "22px 24px 28px", flex: 1, display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 14, flexWrap: "wrap" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 6, color: "#999", fontSize: 12 }}>
                <Calendar size={12} /> {post.date}
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 5, color: C.teal, fontSize: 12, fontWeight: 600 }}>
                <Tag size={11} /> {post.category}
              </span>
            </div>

            <h3
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: 22,
                fontWeight: 600,
                color: C.green,
                marginBottom: 10,
                lineHeight: 1.3,
                flex: 1,
              }}
            >
              {post.title}
            </h3>
            <p style={{ fontSize: 14, color: "#666", lineHeight: 1.7 }}>{post.excerpt}</p>
          </div>
        </div>
      </Link>
    </AnimatedSection>
  );
}

export default function BlogPageContent() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts =
    activeCategory === "All"
      ? BLOG_POSTS
      : BLOG_POSTS.filter((post) => post.category === activeCategory);

  return (
    <main style={{ fontFamily: "'Inter',system-ui,sans-serif", overflowX: "hidden", background: "#fcfaf6", color: C.green }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0} a{text-decoration:none}
        .blog-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:28px;align-items:start}
        @media(max-width:960px){.blog-grid{grid-template-columns:repeat(2,1fr)!important}}
        @media(max-width:600px){.blog-grid{grid-template-columns:1fr!important}}
      `}</style>

      <Navbar />
      <PageHero
        label="Stories & Guides"
        title="Stories & Guides"
        subtitle="Expert insights, travel tips, and destination guides from Kenya"
      />

      <section style={{ padding: "44px 32px 0", maxWidth: 1280, margin: "0 auto" }}>
        <AnimatedSection style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
          {BLOG_CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              style={{
                padding: "9px 24px",
                borderRadius: 50,
                fontSize: 13,
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 0.25s",
                letterSpacing: "0.03em",
                background: "transparent",
                color: activeCategory === category ? C.teal : C.green,
                border: activeCategory === category ? `2px solid ${C.teal}` : `1.5px solid ${C.sandDark}80`,
                boxShadow: activeCategory === category ? "0 2px 10px rgba(31,111,107,0.18)" : "none",
              }}
            >
              {category}
            </button>
          ))}
        </AnimatedSection>
      </section>

      <section style={{ padding: "44px 32px 80px", maxWidth: 1280, margin: "0 auto" }}>
        {filteredPosts.length > 0 ? (
          <div className="blog-grid">
            {filteredPosts.map((post, index) => (
              <BlogCard key={post.slug} post={post} delay={index * 0.07} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "80px 0", color: "#aaa" }}>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 24 }}>No articles in this category yet.</p>
          </div>
        )}
      </section>

      <section style={{ background: C.sand, padding: "64px 32px", textAlign: "center" }}>
        <AnimatedSection>
          <p
            style={{
              color: C.teal,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              marginBottom: 14,
            }}
          >
            Stay Informed
          </p>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(28px,4vw,44px)", color: C.green, marginBottom: 12 }}>
            Get Stories in Your Inbox
          </h2>
          <p style={{ fontSize: 15, color: "#777", maxWidth: 460, margin: "0 auto 32px", lineHeight: 1.7 }}>
            Weekly travel guides, restaurant discoveries, and insider Kenya tips.
          </p>
          <div style={{ display: "flex", maxWidth: 460, margin: "0 auto", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
            <input
              type="email"
              placeholder="Enter your email"
              style={{
                flex: 1,
                minWidth: 240,
                padding: "13px 20px",
                borderRadius: 50,
                border: `1.5px solid ${C.sandDark}`,
                fontSize: 14,
                outline: "none",
                background: C.white,
                color: C.green,
              }}
              onFocus={(event) => {
                event.currentTarget.style.borderColor = C.teal;
              }}
              onBlur={(event) => {
                event.currentTarget.style.borderColor = C.sandDark;
              }}
            />
            <button
              style={{
                background: C.green,
                color: C.white,
                padding: "13px 28px",
                borderRadius: 50,
                fontSize: 14,
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              Subscribe
            </button>
          </div>
          <p style={{ marginTop: 14, fontSize: 12, color: "rgba(15,61,51,0.45)" }}>No spam. Just the good stuff.</p>
        </AnimatedSection>
      </section>

      <Footer />
    </main>
  );
}
