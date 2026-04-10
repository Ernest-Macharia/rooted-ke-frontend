"use client";

import Link from "next/link";
import { Check, Info } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/ui/PageHero";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { C, PACKAGES } from "@/lib/constants";

type PackageItem = (typeof PACKAGES)[number];

interface PackageRowProps {
  pkg: PackageItem;
  index: number;
}

function PackageRow({ pkg, index }: PackageRowProps) {
  const isEven = index % 2 === 0;

  return (
    <AnimatedSection delay={0.05}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 0,
          borderRadius: 20,
          overflow: "hidden",
          background: C.white,
          boxShadow: "0 4px 32px rgba(15,61,51,0.08)",
          marginBottom: 32,
        }}
        className="pkg-row"
      >
        <div className="hover-zoom-frame" style={{ order: isEven ? 0 : 1, position: "relative", minHeight: 360, overflow: "hidden" }}>
          <img
            src={pkg.img}
            alt={pkg.title}
            className="hover-zoom-img"
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: isEven
                ? "linear-gradient(to right, transparent 70%, rgba(255,255,255,0.08))"
                : "linear-gradient(to left, transparent 70%, rgba(255,255,255,0.08))",
            }}
          />
        </div>

        <div style={{ order: isEven ? 1 : 0, padding: "44px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div
            style={{
              background: C.teal,
              borderRadius: 14,
              width: 52,
              height: 52,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
              marginBottom: 20,
            }}
          >
            {pkg.icon}
          </div>

          <h3
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: "clamp(26px,3vw,36px)",
              fontWeight: 600,
              color: C.green,
              marginBottom: 6,
              lineHeight: 1.15,
            }}
          >
            {pkg.title}
          </h3>
          <p style={{ fontSize: 14, color: "#777", marginBottom: 28, lineHeight: 1.6 }}>{pkg.sub}</p>

          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
            {pkg.inclusions.map((item) => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    background: C.sandLight,
                    borderRadius: "50%",
                    width: 22,
                    height: 22,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Check size={12} color={C.teal} strokeWidth={2.5} />
                </div>
                <span style={{ fontSize: 14, color: "#555", lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
          </div>

          <div>
            <Link
              href={`/packages/${pkg.key}`}
              style={{
                display: "block",
                background: C.teal,
                color: C.white,
                padding: "14px 24px",
                borderRadius: 10,
                fontSize: 14,
                fontWeight: 600,
                textAlign: "center",
                textDecoration: "none",
                transition: "all 0.3s",
                letterSpacing: "0.03em",
              }}
              onMouseEnter={(event) => {
                event.currentTarget.style.background = C.tealLight;
                event.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.background = C.teal;
                event.currentTarget.style.transform = "translateY(0)";
              }}
            >
              View Packages
            </Link>
            <p style={{ textAlign: "center", fontSize: 12, color: "#aaa", marginTop: 10 }}>Or find stays for this package</p>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

export default function PackagesPageContent() {
  const packageHighlights = [
    { label: "Clear Inclusions", body: "Exactly what's covered in your package" },
    { label: "Tiered Pricing", body: "Budget, Mid, and Premium options" },
    { label: "Payment Terms", body: "Flexible payment and booking options" },
  ];

  return (
    <main style={{ fontFamily: "'Inter',system-ui,sans-serif", overflowX: "hidden", background: "#fcfaf6", color: C.green }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0} a{text-decoration:none}
        .pkg-row{grid-template-columns:1fr 1fr}
        .incl-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
        @media(max-width:860px){.pkg-row{grid-template-columns:1fr!important}}
        @media(max-width:860px){.pkg-row > div:first-child{order:0!important} .pkg-row > div:last-child{order:1!important}}
        @media(max-width:700px){.incl-grid{grid-template-columns:1fr!important}}
      `}</style>

      <Navbar />
      <PageHero
        label="Ready to Book"
        title="Kenya Travel Packages"
        subtitle="Ready-to-book bundles with transparent pricing and clear inclusions — no guesswork"
      />

      <section style={{ padding: "48px 32px 0", maxWidth: 1280, margin: "0 auto" }}>
        <AnimatedSection>
          <div
            style={{
              background: "#f6efe4",
              border: `1px solid ${C.sandDark}`,
              borderRadius: 14,
              padding: "18px 24px",
              display: "flex",
              gap: 14,
              alignItems: "flex-start",
              marginBottom: 40,
            }}
          >
            <Info size={18} color={C.clay} style={{ marginTop: 2, flexShrink: 0 }} />
            <p style={{ fontSize: 14, color: C.green, lineHeight: 1.7 }}>
              <strong>Transparency Note:</strong> We earn a small commission when you book through our links. This helps us maintain our curated recommendations. We only suggest accommodations and experiences we genuinely recommend.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div style={{ background: C.sandLight, borderRadius: 20, padding: "44px 40px", marginBottom: 48, textAlign: "center" }}>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: "clamp(26px,3.5vw,38px)",
                fontWeight: 600,
                color: C.green,
                marginBottom: 32,
              }}
            >
              What&apos;s Included in Our Packages
            </h2>
            <div className="incl-grid">
              {packageHighlights.map((item) => (
                <div key={item.label}>
                  <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, fontWeight: 600, color: C.teal, marginBottom: 8 }}>
                    {item.label}
                  </p>
                  <p style={{ fontSize: 14, color: "#666", lineHeight: 1.6 }}>{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </section>

      <section style={{ padding: "0 32px 80px", maxWidth: 1280, margin: "0 auto" }}>
        {PACKAGES.map((pkg, index) => (
          <PackageRow key={pkg.key} pkg={pkg} index={index} />
        ))}
      </section>

      <section style={{ background: C.green, padding: "72px 32px", textAlign: "center" }}>
        <AnimatedSection>
          <p
            style={{
              color: C.sand,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            Bespoke Planning
          </p>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: "clamp(30px,4.5vw,52px)",
              color: C.white,
              marginBottom: 16,
              lineHeight: 1.1,
            }}
          >
            Don&apos;t See What You Need?
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", maxWidth: 480, margin: "0 auto 36px", lineHeight: 1.75 }}>
            Tell us your vision and we&apos;ll build a bespoke Kenya experience just for you.
          </p>
          <Link
            href="/contact"
            style={{
              background: C.teal,
              color: C.white,
              padding: "15px 40px",
              borderRadius: 50,
              fontSize: 14,
              fontWeight: 600,
              display: "inline-block",
              letterSpacing: "0.04em",
              boxShadow: "0 6px 24px rgba(31,111,107,0.4)",
              transition: "all 0.3s",
              textDecoration: "none",
            }}
            onMouseEnter={(event) => {
              event.currentTarget.style.transform = "translateY(-2px)";
              event.currentTarget.style.boxShadow = "0 10px 32px rgba(31,111,107,0.5)";
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.transform = "translateY(0)";
              event.currentTarget.style.boxShadow = "0 6px 24px rgba(31,111,107,0.4)";
            }}
          >
            Get in Touch
          </Link>
        </AnimatedSection>
      </section>

      <Footer />
    </main>
  );
}
