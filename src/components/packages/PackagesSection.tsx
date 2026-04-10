"use client";

import AnimatedSection from "@/components/ui/AnimatedSection";
import { C, PACKAGES } from "@/lib/constants";

export default function PackagesSection() {
  return (
    <section style={{ background: C.sandLight, padding: "80px 32px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <AnimatedSection style={{ textAlign: "center", marginBottom: 52 }}>
          <p style={{ color: C.teal, fontSize: 11, fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 12 }}>Ready to Book</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 4.5vw, 52px)", color: C.green, lineHeight: 1.1, marginBottom: 12 }}>
            Kenya Travel Packages
            <br />
            <em style={{ fontWeight: 400 }}>& Curated Experiences</em>
          </h2>
          <p style={{ color: "#777", fontSize: 15 }}>Ready-to-book bundles with transparent pricing and clear inclusions</p>
        </AnimatedSection>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16 }} className="grid-pkg">
          {PACKAGES.map((pkg, index) => (
            <AnimatedSection key={pkg.title} delay={index * 0.08}>
              <div className="hover-zoom-frame" style={{ position: "relative", borderRadius: 16, overflow: "hidden", height: 280, cursor: "pointer" }}>
                <img
                  src={pkg.img}
                  alt={pkg.title}
                  className="hover-zoom-img"
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,40,33,0.92) 0%, transparent 60%)" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px 18px" }}>
                  <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, color: C.white, marginBottom: 4, lineHeight: 1.2 }}>{pkg.title}</h4>
                  <p style={{ fontSize: 11, color: "rgba(255,255,255,0.65)" }}>{pkg.sub}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
      <style>{`@media (max-width: 1000px) { .grid-pkg { grid-template-columns: repeat(3, 1fr) !important; } } @media (max-width: 700px) { .grid-pkg { grid-template-columns: repeat(2, 1fr) !important; } } @media (max-width: 480px) { .grid-pkg { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}
