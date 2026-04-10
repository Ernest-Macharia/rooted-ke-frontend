"use client";

import { ChevronRight, DollarSign, LucideIcon, MapPin, UtensilsCrossed } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/ui/PageHero";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { BUDGETS, C, CUISINES, LOCATIONS } from "@/lib/constants";

interface FilterPillProps {
  label: string;
}

interface CategoryCardProps {
  icon: LucideIcon;
  title: string;
  sub: string;
  items: string[];
  ctaLabel: string;
  ctaHref: string;
  delay: number;
}

function FilterPill({ label }: FilterPillProps) {
  return (
    <div
      style={{
        background: C.sandLight,
        borderRadius: 10,
        padding: "11px 18px",
        fontSize: 14,
        color: C.green,
        fontWeight: 500,
        cursor: "pointer",
        transition: "all 0.2s",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      onMouseEnter={(event) => {
        event.currentTarget.style.background = C.sandDark;
      }}
      onMouseLeave={(event) => {
        event.currentTarget.style.background = C.sandLight;
      }}
    >
      {label}
      <ChevronRight size={14} style={{ color: C.teal, opacity: 0.7 }} />
    </div>
  );
}

function CategoryCard({
  icon: Icon,
  title,
  sub,
  items,
  ctaLabel,
  ctaHref,
  delay,
}: CategoryCardProps) {
  return (
    <AnimatedSection delay={delay}>
      <div
        style={{
          borderRadius: 20,
          overflow: "hidden",
          height: "100%",
          boxShadow: "0 4px 24px rgba(15,61,51,0.07)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            background: C.sandLight,
            padding: "36px 32px 28px",
            textAlign: "center",
            borderBottom: `1px solid ${C.sandDark}40`,
          }}
        >
          <div style={{ marginBottom: 16, color: C.teal }}>
            <Icon size={36} strokeWidth={1.5} />
          </div>
          <h3
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: 28,
              fontWeight: 600,
              color: C.green,
              marginBottom: 10,
            }}
          >
            {title}
          </h3>
          <p style={{ fontSize: 13, color: "#777", lineHeight: 1.65 }}>{sub}</p>
        </div>

        <div style={{ background: C.white, padding: "20px", flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
          {items.map((item) => (
            <FilterPill key={item} label={item} />
          ))}
        </div>

        <div style={{ background: C.white, padding: "0 20px 24px" }}>
          <a
            href={ctaHref}
            style={{
              display: "block",
              background: C.teal,
              color: C.white,
              padding: "14px",
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
            {ctaLabel}
          </a>
        </div>
      </div>
    </AnimatedSection>
  );
}

export default function RestaurantsPageContent() {
  const trendingRestaurants = [
    {
      name: "Nairobi Brunch & Date Night",
      sub: "Most saved brunch and date-night spots",
      img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&q=80",
    },
    {
      name: "Best Nyama Choma Spots",
      sub: "Authentic grilled meat across Nairobi",
      img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=700&q=80",
    },
    {
      name: "Diani Beach Restaurants",
      sub: "Seafood and ocean views on the coast",
      img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=700&q=80",
    },
  ];

  return (
    <main style={{ fontFamily: "'Inter',system-ui,sans-serif", overflowX: "hidden", background: "#fcfaf6", color: C.green }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0} a{text-decoration:none}
        .rest-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;align-items:start}
        @media(max-width:880px){.rest-grid{grid-template-columns:1fr!important}}
        @media(max-width:860px){.trending-rest{grid-template-columns:1fr!important}}
      `}</style>

      <Navbar />
      <PageHero
        label="Eat & Drink"
        title="Where to Eat in Kenya"
        subtitle="The best restaurants in Kenya — sorted by city, cuisine, and budget"
      />

      <section style={{ padding: "64px 32px 80px", maxWidth: 1280, margin: "0 auto" }}>
        <div className="rest-grid">
          <CategoryCard
            icon={MapPin}
            title="By Location"
            sub="Nairobi, Diani, Naivasha and beyond — clearly sorted by area"
            items={LOCATIONS}
            ctaLabel="Explore By Location"
            ctaHref="/restaurants/location"
            delay={0}
          />
          <CategoryCard
            icon={DollarSign}
            title="By Budget"
            sub="From budget eats to luxury dining"
            items={BUDGETS}
            ctaLabel="Explore By Budget"
            ctaHref="/restaurants/budget"
            delay={0.1}
          />
          <CategoryCard
            icon={UtensilsCrossed}
            title="By Cuisine"
            sub="Italian, seafood, nyama choma, Asian, and more"
            items={CUISINES}
            ctaLabel="Explore By Cuisine"
            ctaHref="/restaurants/cuisine"
            delay={0.2}
          />
        </div>
      </section>

      <section style={{ background: C.sand, padding: "64px 32px 72px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <AnimatedSection style={{ marginBottom: 40 }}>
            <p
              style={{
                color: C.teal,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              Most Popular
            </p>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(30px,4vw,46px)", color: C.green }}>
              Trending Restaurants
            </h2>
          </AnimatedSection>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }} className="trending-rest">
            {trendingRestaurants.map((restaurant, index) => (
              <AnimatedSection key={restaurant.name} delay={index * 0.1}>
                <div className="hover-zoom-frame" style={{ borderRadius: 16, overflow: "hidden", position: "relative", height: 240, cursor: "pointer" }}>
                  <img
                    src={restaurant.img}
                    alt={restaurant.name}
                    className="hover-zoom-img"
                  />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(15,61,51,0.9) 0%,transparent 60%)" }} />
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px 22px" }}>
                    <h4
                      style={{
                        fontFamily: "'Cormorant Garamond',serif",
                        fontSize: 22,
                        fontWeight: 600,
                        color: C.white,
                        marginBottom: 4,
                      }}
                    >
                      {restaurant.name}
                    </h4>
                    <p style={{ fontSize: 12, color: "rgba(255,255,255,0.7)" }}>{restaurant.sub}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
