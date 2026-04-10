"use client";

import { MouseEvent } from "react";
import { C } from "@/lib/constants";

function buttonHover(
  event: MouseEvent<HTMLButtonElement>,
  transform: string,
  boxShadow?: string,
  background?: string,
  borderColor?: string
) {
  if (transform) {
    event.currentTarget.style.transform = transform;
  }
  if (boxShadow !== undefined) {
    event.currentTarget.style.boxShadow = boxShadow;
  }
  if (background !== undefined) {
    event.currentTarget.style.background = background;
  }
  if (borderColor !== undefined) {
    event.currentTarget.style.borderColor = borderColor;
  }
}

export default function Hero() {
  return (
    <section className="home-hero" style={{ position: "relative", height: "100vh", minHeight: 640, overflow: "hidden" }}>
      <img
        src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1600&q=85"
        alt="Kenyan savannah at sunset"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", animation: "heroKenBurns 24s ease-in-out infinite alternate" }}
      />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(15,61,51,0.25) 0%, rgba(15,61,51,0.65) 70%, rgba(15,61,51,0.85) 100%)", animation: "heroGlow 9s ease-in-out infinite" }} />

      <div
        style={{
          position: "absolute",
          top: "18%",
          left: "12%",
          width: 220,
          height: 220,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.02) 70%)",
          filter: "blur(2px)",
          animation: "ambientFloat 8s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "20%",
          right: "10%",
          width: 180,
          height: 180,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(31,111,107,0.32) 0%, rgba(31,111,107,0.03) 72%)",
          filter: "blur(2px)",
          animation: "ambientFloat 10s ease-in-out infinite reverse",
        }}
      />

      <div className="home-hero-inner" style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", textAlign: "center", padding: "0 24px" }}>
        <div style={{ opacity: 0, animation: "fadeUp 0.8s ease 0.3s forwards" }}>
          <p style={{ color: C.sand, fontSize: 11, fontWeight: 600, letterSpacing: "0.35em", textTransform: "uppercase", marginBottom: 20 }}>
            Curated travel, dining & experiences
          </p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(52px, 9vw, 110px)", fontWeight: 600, color: C.white, lineHeight: 1.0, textShadow: "0 2px 40px rgba(0,0,0,0.3)", marginBottom: 20 }}>
            Rooted Kenya
          </h1>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(22px, 3.5vw, 36px)", color: "rgba(255,255,255,0.9)", fontWeight: 400, fontStyle: "italic", marginBottom: 12, textShadow: "0 1px 20px rgba(0,0,0,0.3)" }}>
            Experience Kenya Properly
          </p>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.75)", maxWidth: 480, margin: "0 auto 40px", lineHeight: 1.7 }}>
            Curated travel, dining, and experiences across the country
          </p>
          <div className="hero-cta-row" style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button
              style={{
                background: C.teal,
                color: C.white,
                padding: "15px 34px",
                borderRadius: 50,
                fontSize: 14,
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
                letterSpacing: "0.04em",
                boxShadow: "0 8px 30px rgba(31,111,107,0.5)",
                transition: "all 0.3s",
              }}
              onMouseEnter={(event) => buttonHover(event, "translateY(-2px)", "0 12px 40px rgba(31,111,107,0.6)")}
              onMouseLeave={(event) => buttonHover(event, "translateY(0)", "0 8px 30px rgba(31,111,107,0.5)")}
            >
              Plan Your Trip
            </button>
            <button
              style={{
                background: "rgba(255,255,255,0.1)",
                color: C.white,
                padding: "15px 34px",
                borderRadius: 50,
                fontSize: 14,
                fontWeight: 600,
                border: "1.5px solid rgba(255,255,255,0.5)",
                cursor: "pointer",
                letterSpacing: "0.04em",
                backdropFilter: "blur(8px)",
                transition: "all 0.3s",
              }}
              onMouseEnter={(event) => buttonHover(event, "", undefined, "rgba(255,255,255,0.2)", "rgba(255,255,255,0.8)")}
              onMouseLeave={(event) => buttonHover(event, "", undefined, "rgba(255,255,255,0.1)", "rgba(255,255,255,0.5)")}
            >
              Explore Kenya
            </button>
          </div>
        </div>
      </div>

      <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, opacity: 0.6, animation: "scrollCue 2.2s ease-in-out infinite" }}>
        <p style={{ color: C.white, fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase" }}>Scroll</p>
        <div style={{ width: 1, height: 48, background: `linear-gradient(to bottom, ${C.white}, transparent)` }} />
      </div>

      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes heroKenBurns { from { transform: scale(1); } to { transform: scale(1.08); } }
        @keyframes heroGlow { 0%,100% { opacity: 1; } 50% { opacity: 0.86; } }
        @keyframes ambientFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        @keyframes scrollCue { 0%,100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(6px); } }
        @media (max-width: 700px) {
          .home-hero { min-height: 560px !important; }
          .home-hero-inner { padding: 0 20px !important; }
          .hero-cta-row { width: 100%; }
          .hero-cta-row > button { width: 100%; max-width: 320px; }
        }
      `}</style>
    </section>
  );
}
