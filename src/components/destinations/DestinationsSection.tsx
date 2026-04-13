"use client";

import { MouseEvent, useEffect, useState } from "react";
import Link from "next/link";
import { MapPin } from "lucide-react";
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

type DestinationsCms = {
  destinations_eyebrow?: string;
  destinations_title?: string;
  destinations_subtitle?: string;
  destinations_fallback_card_image_src?: string;
  destinations_fallback_card_image_url?: string;
};

function tintButton(event: MouseEvent<HTMLAnchorElement>, background: string, color: string) {
  event.currentTarget.style.background = background;
  event.currentTarget.style.color = color;
}

function normalizeDestination(item: DestinationItem, fallbackCardImageUrl?: string): DestinationCard {
  return {
    name: item.name,
    slug: item.slug,
    short: item.short || item.description || "Discover this destination",
    img: item.img || item.heroImg || fallbackCardImageUrl || "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=700&q=80",
    tags: item.display_tags || item.highlights || [],
  };
}

export default function DestinationsSection({ cms }: { cms?: DestinationsCms }) {
  const [items, setItems] = useState<DestinationCard[]>(
    DESTINATIONS.map((item) => ({ ...item, tags: item.tags || [] })),
  );

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const data = await fetchDestinations();
        if (!mounted || data.length === 0) return;
        setItems(
          data
            .map((item) =>
              normalizeDestination(
                item,
                cms?.destinations_fallback_card_image_src || cms?.destinations_fallback_card_image_url,
              ),
            )
            .slice(0, 6),
        );
      } catch {
        // Keep fallback content.
      }
    };

    void load();

    return () => {
      mounted = false;
    };
  }, [cms?.destinations_fallback_card_image_src, cms?.destinations_fallback_card_image_url]);

  return (
    <section style={{ padding: "80px 32px", maxWidth: 1280, margin: "0 auto" }}>
      <AnimatedSection style={{ textAlign: "center", marginBottom: 52 }}>
        <p style={{ color: C.teal, fontSize: 11, fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 12 }}>
          {cms?.destinations_eyebrow || "Go Somewhere New"}
        </p>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(34px, 5vw, 56px)", color: C.green, lineHeight: 1.1, marginBottom: 16 }}>{cms?.destinations_title || "Explore Kenya by Destination"}</h2>
        <p style={{ color: "#888", fontSize: 15 }}>{cms?.destinations_subtitle || "From bustling cities to serene beaches and wildlife-rich savannas"}</p>
      </AnimatedSection>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }} className="grid-dest">
        {items.slice(0, 6).map((dest, index) => (
          <AnimatedSection key={dest.slug} delay={index * 0.08}>
            <Link href={`/destinations/${dest.slug}`} style={{ textDecoration: "none", display: "block" }}>
              <div
                style={{ borderRadius: 20, overflow: "hidden", background: C.white, boxShadow: "0 4px 24px rgba(15,61,51,0.07)", cursor: "pointer", transition: "transform 0.3s, box-shadow 0.3s" }}
                onMouseEnter={(event) => {
                  event.currentTarget.style.transform = "translateY(-4px)";
                  event.currentTarget.style.boxShadow = "0 16px 40px rgba(15,61,51,0.14)";
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.transform = "translateY(0)";
                  event.currentTarget.style.boxShadow = "0 4px 24px rgba(15,61,51,0.07)";
                }}
              >
                <div className="hover-zoom-frame" style={{ position: "relative", height: 220, overflow: "hidden" }}>
                  <img src={dest.img} alt={dest.name} className="hover-zoom-img" />
                  <div style={{ position: "absolute", top: 14, left: 14 }}>
                    <span style={{ background: C.teal, color: C.white, padding: "6px 14px", borderRadius: 50, fontSize: 11, fontWeight: 600, display: "flex", alignItems: "center", gap: 5 }}>
                      <MapPin size={11} /> {dest.name}
                    </span>
                  </div>
                </div>
                <div style={{ padding: "20px 22px 24px" }}>
                  <p style={{ fontSize: 14, color: "#555", marginBottom: 14, lineHeight: 1.6 }}>{dest.short}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {dest.tags.map((tag) => (
                      <span key={tag} style={{ background: C.sandLight, color: C.green, padding: "4px 12px", borderRadius: 50, fontSize: 11, fontWeight: 500 }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          </AnimatedSection>
        ))}
      </div>

      <AnimatedSection style={{ textAlign: "center", marginTop: 48 }}>
        <Link
          href="/destinations"
          style={{ background: "transparent", color: C.green, padding: "14px 36px", borderRadius: 50, fontSize: 14, fontWeight: 600, border: `2px solid ${C.green}`, cursor: "pointer", letterSpacing: "0.04em", transition: "all 0.3s", textDecoration: "none", display: "inline-block" }}
          onMouseEnter={(event) => tintButton(event, C.green, C.white)}
          onMouseLeave={(event) => tintButton(event, "transparent", C.green)}
        >
          View All Destinations
        </Link>
      </AnimatedSection>
      <style>{`@media (max-width: 900px) { .grid-dest { grid-template-columns: 1fr 1fr !important; } } @media (max-width: 600px) { .grid-dest { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}
