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
    <section style={{ position: "relative", height: "100vh", minHeight: 640, overflow: "hidden" }}>
      <img
        src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1600&q=85"
        alt="Kenyan savannah at sunset"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
      />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(15,61,51,0.25) 0%, rgba(15,61,51,0.65) 70%, rgba(15,61,51,0.85) 100%)" }} />

      <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", textAlign: "center", padding: "0 24px" }}>
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
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
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

      <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, opacity: 0.6 }}>
        <p style={{ color: C.white, fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase" }}>Scroll</p>
        <div style={{ width: 1, height: 48, background: `linear-gradient(to bottom, ${C.white}, transparent)` }} />
      </div>

      <style>{`@keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </section>
  );
}
