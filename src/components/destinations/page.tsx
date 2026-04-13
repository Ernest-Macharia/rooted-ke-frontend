"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { MapPin } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/ui/PageHero";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { C, DESTINATIONS } from "@/lib/constants";
import { fetchDestinations, type DestinationItem } from "@/services/destinationsService";

type DestinationCard = {
  name: string;
  slug: string;
  short: string;
  img: string;
  tags: string[];
};

const DEFAULT_FILTERS = ["All", "Beach", "Safari", "City", "Nature", "Coast"];

function normalizeDestination(item: DestinationItem): DestinationCard {
  const tags = item.display_tags || item.highlights || [];
  return {
    name: item.name,
    slug: item.slug,
    short: item.short || item.description || "Discover this Kenyan destination.",
    img: item.img || item.heroImg || "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=700&q=80",
    tags,
  };
}

export default function DestinationsPageContent() {
  const [active, setActive] = useState("All");
  const [items, setItems] = useState<DestinationCard[]>(
    DESTINATIONS.map((item) => ({ ...item, tags: item.tags || [] })),
  );

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const data = await fetchDestinations();
        if (!mounted || data.length === 0) return;
        setItems(data.map(normalizeDestination));
      } catch {
        // Keep static fallback when API is unavailable.
      }
    };

    void load();

    return () => {
      mounted = false;
    };
  }, []);

  const filters = useMemo(() => {
    const dynamic = new Set<string>();
    items.forEach((item) => item.tags.forEach((tag) => dynamic.add(tag)));
    return dynamic.size > 0 ? ["All", ...Array.from(dynamic)] : DEFAULT_FILTERS;
  }, [items]);

  const visibleItems = useMemo(() => {
    if (active === "All") return items;
    return items.filter((item) => item.tags.some((tag) => tag.toLowerCase() === active.toLowerCase()));
  }, [active, items]);

  return (
    <main style={{ fontFamily: "'Inter',system-ui,sans-serif", overflowX: "hidden", background: "#fcfaf6", color: C.green }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0} a{text-decoration:none}
        .dest-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:28px}
        @media(max-width:960px){.dest-grid{grid-template-columns:repeat(2,1fr)!important}}
        @media(max-width:600px){.dest-grid{grid-template-columns:1fr!important}}
      `}</style>

      <Navbar />
      <PageHero
        label="Go Somewhere"
        title="Explore Kenya by Destination"
        subtitle="From bustling cities to serene beaches and wildlife-rich savannas, discover the diverse beauty of Kenya"
      />

      <section style={{ padding: "40px 32px 0", maxWidth: 1280, margin: "0 auto" }}>
        <AnimatedSection style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActive(filter)}
              style={{
                padding: "9px 22px",
                borderRadius: 50,
                fontSize: 13,
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 0.25s",
                border: "none",
                letterSpacing: "0.03em",
                background: active === filter ? C.teal : C.sandLight,
                color: active === filter ? C.white : C.green,
                boxShadow: active === filter ? "0 4px 16px rgba(31,111,107,0.35)" : "none",
              }}
            >
              {filter}
            </button>
          ))}
        </AnimatedSection>
      </section>

      <section style={{ padding: "48px 32px 80px", maxWidth: 1280, margin: "0 auto" }}>
        <div className="dest-grid">
          {visibleItems.map((dest, index) => (
            <AnimatedSection key={dest.slug} delay={index * 0.07}>
              <Link href={`/destinations/${dest.slug}`} style={{ textDecoration: "none", display: "block" }}>
                <div
                  style={{
                    borderRadius: 20,
                    overflow: "hidden",
                    background: C.white,
                    boxShadow: "0 4px 24px rgba(15,61,51,0.07)",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(event) => {
                    event.currentTarget.style.transform = "translateY(-5px)";
                    event.currentTarget.style.boxShadow = "0 18px 44px rgba(15,61,51,0.14)";
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.transform = "translateY(0)";
                    event.currentTarget.style.boxShadow = "0 4px 24px rgba(15,61,51,0.07)";
                  }}
                >
                  <div className="hover-zoom-frame" style={{ position: "relative", height: 240, overflow: "hidden" }}>
                    <img src={dest.img} alt={dest.name} className="hover-zoom-img" />
                    <div style={{ position: "absolute", top: 14, left: 14 }}>
                      <span
                        style={{
                          background: C.teal,
                          color: C.white,
                          padding: "6px 14px",
                          borderRadius: 50,
                          fontSize: 11,
                          fontWeight: 700,
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 5,
                          boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
                        }}
                      >
                        <MapPin size={11} /> {dest.name}
                      </span>
                    </div>
                  </div>

                  <div style={{ padding: "20px 22px 26px" }}>
                    <p style={{ fontSize: 14, color: "#555", marginBottom: 14, lineHeight: 1.65 }}>{dest.short}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {dest.tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            background: C.sandLight,
                            color: C.green,
                            padding: "5px 13px",
                            borderRadius: 50,
                            fontSize: 11,
                            fontWeight: 500,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </section>

      <section style={{ background: C.sand, padding: "72px 32px", textAlign: "center" }}>
        <AnimatedSection>
          <p
            style={{
              color: C.teal,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            Need Help Deciding?
          </p>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: "clamp(32px,5vw,52px)",
              color: C.green,
              marginBottom: 16,
              lineHeight: 1.1,
            }}
          >
            Not Sure Where to Go?
          </h2>
          <p style={{ fontSize: 15, color: "#666", maxWidth: 520, margin: "0 auto 36px", lineHeight: 1.75 }}>
            Tell us your interests and we&apos;ll match you with the perfect Kenya destination.
          </p>
          <Link
            href="/packages"
            style={{
              background: C.teal,
              color: C.white,
              padding: "15px 40px",
              borderRadius: 50,
              fontSize: 14,
              fontWeight: 600,
              display: "inline-block",
              letterSpacing: "0.04em",
              boxShadow: "0 6px 24px rgba(31,111,107,0.35)",
              transition: "all 0.3s",
            }}
            onMouseEnter={(event) => {
              event.currentTarget.style.transform = "translateY(-2px)";
              event.currentTarget.style.boxShadow = "0 10px 32px rgba(31,111,107,0.45)";
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.transform = "translateY(0)";
              event.currentTarget.style.boxShadow = "0 6px 24px rgba(31,111,107,0.35)";
            }}
          >
            Plan Your Trip
          </Link>
        </AnimatedSection>
      </section>

      <Footer />
    </main>
  );
}
