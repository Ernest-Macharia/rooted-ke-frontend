"use client";

import { useState } from "react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { C } from "@/lib/constants";

const EVENT_TABS = ["This Weekend", "Concerts & Festivals", "Nightlife & Parties", "Cultural & Pop-Ups", "Sports & Outdoor"];

export default function EventsSection() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section style={{ padding: "80px 32px", maxWidth: 1280, margin: "0 auto" }}>
      <AnimatedSection style={{ textAlign: "center", marginBottom: 48 }}>
        <p style={{ color: C.teal, fontSize: 11, fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 12 }}>What&apos;s On</p>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 4.5vw, 52px)", color: C.green, lineHeight: 1.1, marginBottom: 12 }}>Events in Kenya</h2>
        <p style={{ color: "#888", fontSize: 15 }}>Concerts, festivals, nightlife, cultural pop-ups</p>
      </AnimatedSection>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center", marginBottom: 48 }}>
        {EVENT_TABS.map((tab, index) => (
          <button
            key={tab}
            onClick={() => setActiveTab(index)}
            style={{
              padding: "10px 22px",
              borderRadius: 50,
              fontSize: 13,
              fontWeight: 500,
              cursor: "pointer",
              border: "none",
              letterSpacing: "0.03em",
              transition: "all 0.25s",
              background: activeTab === index ? C.teal : C.sandLight,
              color: activeTab === index ? C.white : C.green,
              boxShadow: activeTab === index ? "0 4px 16px rgba(31,111,107,0.35)" : "none",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
        {[1, 2, 3].map((item) => (
          <div key={item} style={{ background: C.sandLight, borderRadius: 16, padding: "28px", display: "flex", alignItems: "center", justifyContent: "center", height: 180 }}>
            <p style={{ color: C.teal, fontFamily: "'Cormorant Garamond', serif", fontSize: 20, opacity: 0.5 }}>Events loading...</p>
          </div>
        ))}
      </div>
    </section>
  );
}
