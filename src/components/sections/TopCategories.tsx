"use client";

import { ArrowRight } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { C } from "@/lib/constants";

const CATEGORIES_ROW1 = [
  { title: "Weekend Plans", sub: "Short escapes across Kenya — clear itineraries, costs, and what to book for your next 2–3 day trip.", img: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80" },
  { title: "Eat & Drink", sub: "The best restaurants in Kenya — sorted by city, cuisine, and budget.", img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80" },
  { title: "Ready-to-Book Bundles", sub: "Curated Kenya experiences with clear inclusions and transparent pricing.", img: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80" },
];

const CATEGORIES_ROW2 = [
  { title: "Events", sub: "What's happening this weekend", img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80" },
  { title: "Stays", sub: "Sorted by price, location, experience", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80" },
  { title: "Itineraries", sub: "24h, 3-day, 7-day plans", img: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=600&q=80" },
  { title: "Safari", sub: "Parks, nature, wildlife", img: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&q=80" },
  { title: "First Time", sub: "Everything you need to know", img: "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=600&q=80" },
];

export default function TopCategories() {
  return (
    <section style={{ padding: "80px 32px", maxWidth: 1280, margin: "0 auto" }}>
      <AnimatedSection style={{ textAlign: "center", marginBottom: 52 }}>
        <p style={{ color: C.teal, fontSize: 11, fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 12 }}>Browse by Category</p>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 5vw, 56px)", color: C.green, lineHeight: 1.1 }}>How Would You Like to Explore?</h2>
      </AnimatedSection>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 20 }} className="grid-3">
        {CATEGORIES_ROW1.map((cat, index) => (
          <AnimatedSection key={cat.title} delay={index * 0.1}>
            <div className="hover-zoom-frame" style={{ position: "relative", borderRadius: 20, overflow: "hidden", height: 340, cursor: "pointer" }}>
              <img
                src={cat.img}
                alt={cat.title}
                className="hover-zoom-img"
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,61,51,0.95) 0%, rgba(15,61,51,0.4) 60%, transparent 100%)" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "28px 28px" }}>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 600, color: C.white, marginBottom: 8, lineHeight: 1.2 }}>{cat.title}</h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>{cat.sub}</p>
                <div style={{ marginTop: 16, display: "inline-flex", alignItems: "center", gap: 6, color: C.sand, fontSize: 12, fontWeight: 600, letterSpacing: "0.05em" }}>
                  Explore <ArrowRight size={14} />
                </div>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16 }} className="grid-5">
        {CATEGORIES_ROW2.map((cat, index) => (
          <AnimatedSection key={cat.title} delay={index * 0.07}>
            <div className="hover-zoom-frame" style={{ position: "relative", borderRadius: 16, overflow: "hidden", height: 200, cursor: "pointer" }}>
              <img
                src={cat.img}
                alt={cat.title}
                className="hover-zoom-img"
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,61,51,0.92) 0%, rgba(15,61,51,0.2) 70%)" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "16px 18px" }}>
                <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, color: C.white, marginBottom: 4 }}>{cat.title}</h4>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.7)" }}>{cat.sub}</p>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>

      <style>{`
        @media (max-width: 900px) { .grid-3 { grid-template-columns: 1fr !important; }  .grid-5 { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 600px) { .grid-5 { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
