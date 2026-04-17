"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { C } from "@/lib/constants";
import { RESTAURANT_DATA } from "@/lib/data";
import { fetchRestaurant, type RestaurantItem } from "@/services/restaurantsService";

export default function RestaurantDetailPage({ slug }: { slug: string }) {
  const [restaurant, setRestaurant] = useState<RestaurantItem | null>(null);

  useEffect(() => {
    let active = true;
    fetchRestaurant(slug)
      .then((data) => {
        if (active) {
          setRestaurant(data);
        }
      })
      .catch(() => {
        if (active) {
          const fallback = RESTAURANT_DATA[slug as keyof typeof RESTAURANT_DATA];
          if (!fallback) {
            setRestaurant(null);
            return;
          }

          const normalizedFallback: RestaurantItem = {
            slug: fallback.slug,
            name: fallback.name,
            area: fallback.area,
            description: fallback.description,
            cuisine: fallback.cuisine ? [{ name: fallback.cuisine }] : [],
            budget: fallback.budget,
            priceRange: fallback.priceRange,
            img: fallback.img,
            openingHours: fallback.openingHours,
            bestFor: fallback.bestFor || [],
            mustOrder: fallback.mustOrder || [],
            bookingRequired: fallback.bookingRequired,
            phone: fallback.phone,
            website: "website" in fallback && typeof fallback.website === "string" ? fallback.website : undefined,
            location: fallback.location,
            tags: fallback.tags || [],
            gallery: fallback.gallery || [],
          };

          setRestaurant(normalizedFallback);
        }
      });
    return () => {
      active = false;
    };
  }, [slug]);

  if (!restaurant) {
    return null;
  }

  const cuisineText =
    Array.isArray(restaurant.cuisine) && restaurant.cuisine.length > 0
      ? restaurant.cuisine.map((item) => item.name).join(", ")
      : "";
  const websiteUrl = restaurant.website?.trim();

  return (
    <main style={{ fontFamily: "'Inter',system-ui,sans-serif", background: "#fcfaf6", color: C.green }}>
      <Navbar />

      <section className="restaurant-detail-hero" style={{ position: "relative", height: 320, marginTop: 72, overflow: "hidden" }}>
        <img src={restaurant.img} alt={restaurant.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,35,28,0.2), rgba(10,35,28,0.86))" }} />
        <div className="restaurant-detail-hero-copy" style={{ position: "absolute", insetInline: 0, bottom: 0, padding: "24px 36px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <Link href="/restaurants" style={{ color: "rgba(255,255,255,0.85)", fontSize: 13 }}>← Back to Restaurants</Link>
            <h1 style={{ marginTop: 10, fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(32px,5vw,56px)", color: C.white }}>{restaurant.name}</h1>
            <p style={{ color: "rgba(255,255,255,0.82)", fontSize: 14 }}>
              {restaurant.area} {cuisineText ? `· ${cuisineText}` : ""} {restaurant.priceRange ? `· ${restaurant.priceRange}` : ""}
            </p>
          </div>
        </div>
      </section>

      <section className="restaurant-detail-shell" style={{ maxWidth: 1100, margin: "0 auto", padding: "44px 32px 70px" }}>
        <p style={{ fontSize: 15, lineHeight: 1.8, color: "#5f5a52", marginBottom: 24 }}>{restaurant.description}</p>

        <div className="restaurant-detail-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: 18 }}>
          <div style={{ background: C.white, borderRadius: 16, border: `1px solid ${C.sandLight}`, padding: 18 }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, marginBottom: 10 }}>Details</h2>
            <p style={{ fontSize: 14, color: "#59544d", marginBottom: 6 }}>Opening hours: {restaurant.openingHours}</p>
            <p style={{ fontSize: 14, color: "#59544d", marginBottom: 6 }}>Phone: {restaurant.phone}</p>
            <p style={{ fontSize: 14, color: "#59544d" }}>Location: {restaurant.location}</p>
            {websiteUrl ? (
              <a
                href={websiteUrl}
                target="_blank"
                rel="nofollow sponsored noreferrer noopener"
                style={{
                  display: "inline-flex",
                  marginTop: 14,
                  background: C.teal,
                  color: C.white,
                  fontSize: 13,
                  fontWeight: 700,
                  padding: "10px 16px",
                  borderRadius: 10,
                }}
              >
                Book Table
              </a>
            ) : null}
          </div>

          <div style={{ background: C.white, borderRadius: 16, border: `1px solid ${C.sandLight}`, padding: 18 }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, marginBottom: 10 }}>Must Order</h2>
            {(restaurant.mustOrder || []).map((item: string) => (
              <p key={item} style={{ fontSize: 14, color: "#59544d", marginBottom: 8 }}>• {item}</p>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 860px) {
          .restaurant-detail-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 700px) {
          .restaurant-detail-hero { height: 290px !important; }
          .restaurant-detail-hero-copy { padding: 20px !important; }
          .restaurant-detail-shell { padding: 34px 20px 56px !important; }
        }
      `}</style>
      <Footer />
    </main>
  );
}
