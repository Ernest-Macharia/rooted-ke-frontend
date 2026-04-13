"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { C } from "@/lib/constants";
import { PACKAGE_DATA } from "@/lib/data";
import { fetchPackage, type PackageItem } from "@/services/packagesService";

export default function PackageDetailPage({ slug }: { slug: string }) {
  const [pkg, setPkg] = useState<PackageItem | null>(null);

  useEffect(() => {
    let active = true;
    fetchPackage(slug)
      .then((data) => {
        if (active) {
          setPkg(data);
        }
      })
      .catch(() => {
        if (active) {
          const fallback = PACKAGE_DATA[slug as keyof typeof PACKAGE_DATA];
          setPkg(fallback || null);
        }
      });
    return () => {
      active = false;
    };
  }, [slug]);

  if (!pkg) {
    return null;
  }

  return (
    <main style={{ fontFamily: "'Inter',system-ui,sans-serif", background: "#fcfaf6", color: C.green, overflowX: "hidden" }}>
      <Navbar />

      <section className="pkg-detail-hero" style={{ position: "relative", height: 340, marginTop: 72, overflow: "hidden" }}>
        <img src={pkg.heroImg || pkg.img} alt={pkg.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,35,28,0.2), rgba(10,35,28,0.82))" }} />
        <div className="pkg-detail-hero-copy" style={{ position: "absolute", insetInline: 0, bottom: 0, padding: "28px 40px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <Link href="/packages" style={{ color: "rgba(255,255,255,0.85)", fontSize: 13 }}>← Back to Packages</Link>
            <h1 style={{ marginTop: 10, fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(34px,5vw,58px)", color: C.white }}>{pkg.title}</h1>
            <p style={{ color: "rgba(255,255,255,0.82)", fontSize: 14, maxWidth: 680 }}>{pkg.tagline}</p>
          </div>
        </div>
      </section>

      <section className="pkg-detail-shell" style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 32px 70px" }}>
        <p style={{ fontSize: 15, color: "#5f5a52", lineHeight: 1.8, marginBottom: 22 }}>{pkg.overview}</p>

        <div className="pkg-tier-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: 16, marginBottom: 26 }}>
          {(pkg.tiers || []).map((tier: { name: string; price: string; note?: string }) => (
            <div key={tier.name} style={{ background: C.white, borderRadius: 14, border: `1px solid ${C.sandLight}`, padding: 16 }}>
              <p style={{ fontWeight: 700, color: C.teal, fontSize: 13 }}>{tier.name}</p>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, color: C.green, margin: "6px 0" }}>{tier.price}</p>
              <p style={{ fontSize: 13, color: "#716b63", lineHeight: 1.6 }}>{tier.note}</p>
            </div>
          ))}
        </div>

        <div style={{ background: C.white, borderRadius: 16, border: `1px solid ${C.sandLight}`, padding: 20 }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 30, color: C.green, marginBottom: 12 }}>Inclusions</h2>
          <div style={{ display: "grid", gap: 10 }}>
            {(pkg.inclusions || []).map((item: string) => (
              <div key={item} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <CheckCircle2 size={16} color={C.teal} />
                <span style={{ fontSize: 14, color: "#4f4a43" }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .pkg-tier-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 700px) {
          .pkg-detail-hero { height: 300px !important; }
          .pkg-detail-hero-copy { padding: 20px !important; }
          .pkg-detail-shell { padding: 34px 20px 56px !important; }
        }
      `}</style>
      <Footer />
    </main>
  );
}
