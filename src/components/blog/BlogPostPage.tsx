"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Lightbulb } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { C, BLOG_POSTS } from "@/lib/constants";
import { BLOG_DATA } from "@/lib/data";

type BodyBlockItem = {
  type: string;
  text: string;
};

function BodyBlock({ block }: { block: BodyBlockItem }) {
  switch (block.type) {
    case "intro":
      return (
        <p
          style={{
            fontSize: 18,
            color: "#444",
            lineHeight: 1.9,
            marginBottom: 28,
            fontWeight: 400,
            borderLeft: `4px solid ${C.teal}`,
            paddingLeft: 20,
          }}
        >
          {block.text}
        </p>
      );
    case "h2":
      return (
        <h2
          style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: "clamp(22px,3vw,30px)",
            fontWeight: 600,
            color: C.green,
            marginTop: 40,
            marginBottom: 14,
          }}
        >
          {block.text}
        </h2>
      );
    case "p":
      return <p style={{ fontSize: 16, color: "#555", lineHeight: 1.85, marginBottom: 20 }}>{block.text}</p>;
    case "tip":
      return (
        <div
          style={{
            background: C.sandLight,
            border: `1.5px solid ${C.sandDark}`,
            borderRadius: 14,
            padding: "18px 22px",
            marginTop: 28,
            marginBottom: 28,
            display: "flex",
            gap: 14,
            alignItems: "flex-start",
          }}
        >
          <Lightbulb size={18} color={C.gold} style={{ marginTop: 2, flexShrink: 0 }} />
          <p style={{ fontSize: 15, color: "#555", lineHeight: 1.7, margin: 0 }}>
            <strong style={{ color: C.green }}>Insider tip: </strong>
            {block.text}
          </p>
        </div>
      );
    default:
      return null;
  }
}

export default function BlogPostPage({ slug }: { slug: string }) {
  const post = BLOG_DATA[slug as keyof typeof BLOG_DATA];

  if (!post) {
    return (
      <main
        style={{
          fontFamily: "'Inter',sans-serif",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 20,
        }}
      >
        <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 40, color: C.green }}>Post not found</h1>
        <Link href="/blog" style={{ color: C.teal }}>
          ← Back to Blog
        </Link>
      </main>
    );
  }

  const related = BLOG_POSTS.filter((relatedPost) => post.relatedSlugs?.includes(relatedPost.slug));

  return (
    <main style={{ fontFamily: "'Inter',system-ui,sans-serif", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0} a{text-decoration:none}
        .related-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px}
        @media(max-width:800px){.related-grid{grid-template-columns:1fr!important}}
      `}</style>

      <Navbar />

      <section style={{ position: "relative", height: "60vh", minHeight: 400, marginTop: 72, overflow: "hidden" }}>
        <img src={post.img} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,35,28,0.1) 0%, rgba(10,35,28,0.78) 100%)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "40px 48px" }}>
          <Link href="/blog" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: C.sand, fontSize: 12, marginBottom: 16, opacity: 0.85 }}>
            <ArrowLeft size={13} /> Back to Blog
          </Link>
          <div style={{ marginBottom: 12 }}>
            <span style={{ background: C.teal, color: C.white, padding: "5px 14px", borderRadius: 50, fontSize: 11, fontWeight: 700, letterSpacing: "0.06em" }}>{post.category}</span>
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(30px,5vw,60px)", fontWeight: 700, color: C.white, lineHeight: 1.1, maxWidth: 760, textShadow: "0 2px 20px rgba(0,0,0,0.3)" }}>
            {post.title}
          </h1>
        </div>
      </section>

      <section style={{ maxWidth: 800, margin: "0 auto", padding: "52px 32px 80px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 36, flexWrap: "wrap", paddingBottom: 24, borderBottom: `1px solid ${C.sandLight}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img src={post.author.avatar} alt={post.author.name} style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover" }} />
            <span style={{ fontSize: 14, fontWeight: 600, color: C.green }}>{post.author.name}</span>
          </div>
          <span style={{ display: "flex", alignItems: "center", gap: 6, color: "#999", fontSize: 13 }}>
            <Calendar size={13} /> {post.date}
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 6, color: "#999", fontSize: 13 }}>
            <Clock size={13} /> {post.readTime}
          </span>
        </div>

        <AnimatedSection>
          {post.body.map((block, index: number) => (
            <BodyBlock key={index} block={block} />
          ))}
        </AnimatedSection>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 48, paddingTop: 24, borderTop: `1px solid ${C.sandLight}` }}>
          {post.tags.map((tag: string) => (
            <span key={tag} style={{ background: C.sandLight, color: C.green, padding: "6px 16px", borderRadius: 50, fontSize: 12, fontWeight: 500 }}>
              {tag}
            </span>
          ))}
        </div>
      </section>

      {related.length > 0 ? (
        <section style={{ background: C.sandLight, padding: "60px 48px" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(26px,3.5vw,38px)", color: C.green, marginBottom: 32 }}>More to Read</h2>
            <div className="related-grid">
              {related.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  style={{ display: "block", textDecoration: "none", borderRadius: 16, overflow: "hidden", background: C.white, boxShadow: "0 4px 18px rgba(15,61,51,0.07)", transition: "all 0.3s" }}
                  onMouseEnter={(event) => {
                    event.currentTarget.style.transform = "translateY(-4px)";
                    event.currentTarget.style.boxShadow = "0 12px 32px rgba(15,61,51,0.13)";
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.transform = "translateY(0)";
                    event.currentTarget.style.boxShadow = "0 4px 18px rgba(15,61,51,0.07)";
                  }}
                >
                  <img src={relatedPost.img} alt={relatedPost.title} style={{ width: "100%", height: 160, objectFit: "cover" }} />
                  <div style={{ padding: "16px 18px 20px" }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: C.teal, letterSpacing: "0.06em" }}>{relatedPost.category}</span>
                    <h4 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 19, fontWeight: 600, color: C.green, margin: "8px 0 6px", lineHeight: 1.3 }}>{relatedPost.title}</h4>
                    <p style={{ fontSize: 13, color: "#888" }}>{relatedPost.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <Footer />
    </main>
  );
}
