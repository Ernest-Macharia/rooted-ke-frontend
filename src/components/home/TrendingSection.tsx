"use client";

import AnimatedSection from "@/components/ui/AnimatedSection";
import { C } from "@/lib/constants";

const TRENDING = [
  { title: "Diani Weekend Escapes", sub: "Beachfront stays, water activities, and 3D/2N Diani plans", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80" },
  { title: "Naivasha Staycations", sub: "Lake views, cabins, Hell's Gate plans", img: "https://images.unsplash.com/photo-1540202403-b7abd6747a18?w=800&q=80" },
  { title: "Nairobi Brunch & Date Night", sub: "Most saved brunch spots and date-night restaurants", img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80" },
  { title: "Maasai Mara Safari", sub: "3D/2N safari packages trending this season", img: "https://images.unsplash.com/photo-1534177616072-ef7dc120449d?w=800&q=80" },
  { title: "Nanyuki Cabin Resets", sub: "Cozy cabins, Mount Kenya views, curated escapes", img: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&q=80" },
  { title: "Events This Weekend", sub: "Concerts, festivals, and nightlife", img: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80" },
];

export default function TrendingSection() {
  return (
    <section style={{ background: C.sandLight, padding: "80px 32px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <AnimatedSection style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48, flexWrap: "wrap", gap: 16 }}>
          <div>
            <p style={{ color: C.teal, fontSize: 11, fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 12 }}>Popular Right Now</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 4.5vw, 52px)", color: C.green, lineHeight: 1.1 }}>
              Trending in Kenya
              <br />
              <em style={{ fontWeight: 400 }}>Right Now</em>
            </h2>
          </div>
          <p style={{ color: "#888", fontSize: 13, maxWidth: 300, lineHeight: 1.7 }}>The most popular experiences and destinations this season</p>
        </AnimatedSection>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="grid-trending">
          {TRENDING.map((item, index) => (
            <AnimatedSection key={item.title} delay={index * 0.08}>
              <div className="hover-zoom-frame trending-card" style={{ position: "relative", borderRadius: 18, overflow: "hidden", height: index < 3 ? 300 : 260, cursor: "pointer", transition: "transform 0.35s ease, box-shadow 0.35s ease" }}>
                <img
                  src={item.img}
                  alt={item.title}
                  className="hover-zoom-img"
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,40,33,0.95) 0%, rgba(10,40,33,0.3) 60%, transparent 100%)" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "24px 24px" }}>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 600, color: C.white, marginBottom: 6, lineHeight: 1.2 }}>{item.title}</h3>
                  <p style={{ fontSize: 12, color: "rgba(255,255,255,0.72)" }}>{item.sub}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
      <style>{`
        .trending-card:hover { transform: translateY(-6px); box-shadow: 0 16px 38px rgba(15,61,51,0.16); }
        @media (max-width: 900px) { .grid-trending { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
