"use client";

import { ChevronRight } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { C } from "@/lib/constants";

const RESTAURANTS = [
  { title: "By Location", sub: "Nairobi, Diani, Naivasha and beyond — clearly sorted by area", icon: "📍" },
  { title: "By Budget", sub: "From budget eats to luxury dining", icon: "💰" },
  { title: "By Cuisine", sub: "Italian, seafood, nyama choma, Asian, and more", icon: "🍽️" },
];

export default function RestaurantsSection() {
  return (
    <section style={{ background: C.green, padding: "80px 32px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <AnimatedSection style={{ textAlign: "center", marginBottom: 52 }}>
          <p style={{ color: C.sand, fontSize: 11, fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 12 }}>Where to Eat</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(34px, 5vw, 56px)", color: C.white, lineHeight: 1.1, marginBottom: 16 }}>Where to Eat in Kenya</h2>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 15 }}>Find the best restaurants by location, budget, or cuisine</p>
        </AnimatedSection>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="grid-rest">
          {RESTAURANTS.map((restaurant, index) => (
            <AnimatedSection key={restaurant.title} delay={index * 0.1}>
              <div
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: "40px 36px", cursor: "pointer", transition: "all 0.3s" }}
                onMouseEnter={(event) => {
                  event.currentTarget.style.background = "rgba(255,255,255,0.1)";
                  event.currentTarget.style.borderColor = `${C.sand}60`;
                  event.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.background = "rgba(255,255,255,0.06)";
                  event.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                  event.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div style={{ fontSize: 36, marginBottom: 20 }}>{restaurant.icon}</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 600, color: C.white, marginBottom: 12 }}>{restaurant.title}</h3>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.7 }}>{restaurant.sub}</p>
                <div style={{ marginTop: 24, display: "inline-flex", alignItems: "center", gap: 8, color: C.sand, fontSize: 12, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                  Browse <ChevronRight size={14} />
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
      <style>{`@media (max-width: 800px) { .grid-rest { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}
