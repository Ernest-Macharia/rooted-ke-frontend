"use client";

import { C } from "@/lib/constants";

interface PageHeroProps {
  label?: string;
  title: string;
  subtitle?: string;
}

export default function PageHero({ label, title, subtitle }: PageHeroProps) {
  return (
    <section
      style={{
        background: `linear-gradient(135deg, ${C.green} 0%, ${C.greenLight} 58%, #0d3329 100%)`,
        padding: "128px 32px 82px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.05,
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.95) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(197,154,61,0.08), transparent 35%)",
        }}
      />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 760, margin: "0 auto" }}>
        {label ? (
          <p
            style={{
              color: C.sand,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              marginBottom: 20,
            }}
          >
            {label}
          </p>
        ) : null}
        <h1
          style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: "clamp(42px,6vw,74px)",
            fontWeight: 600,
            color: C.white,
            lineHeight: 1.02,
            letterSpacing: "-0.01em",
            textShadow: "0 2px 28px rgba(0,0,0,0.18)",
            marginBottom: 18,
          }}
        >
          {title}
        </h1>
        {subtitle ? (
          <p
            style={{
              fontSize: "clamp(15px,1.8vw,18px)",
              color: "rgba(255,255,255,0.72)",
              lineHeight: 1.8,
              maxWidth: 620,
              margin: "0 auto",
            }}
          >
            {subtitle}
          </p>
        ) : null}
      </div>
    </section>
  );
}
