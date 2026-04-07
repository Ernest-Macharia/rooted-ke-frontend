"use client";

import Link from "next/link";
import { Calendar, LucideIcon, Mountain, Music, PartyPopper, Users } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/ui/PageHero";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { C } from "@/lib/constants";

interface EventCategory {
  title: string;
  desc: string;
  Icon: LucideIcon;
  bg: string;
  href: string;
}

interface EventCategoryCardProps extends EventCategory {
  delay: number;
}

const CATEGORIES: EventCategory[] = [
  { title: "This Weekend", desc: "What's happening this weekend across Kenya", Icon: Calendar, bg: C.teal, href: "/events/this-weekend" },
  { title: "Concerts & Festivals", desc: "Live music, festivals, and cultural celebrations", Icon: Music, bg: C.green, href: "/events/concerts" },
  { title: "Nightlife & Parties", desc: "Club nights, themed parties, and social events", Icon: PartyPopper, bg: C.teal, href: "/events/nightlife" },
  { title: "Cultural & Pop-Ups", desc: "Art shows, markets, and community gatherings", Icon: Users, bg: C.green, href: "/events/cultural" },
  { title: "Sports & Outdoor", desc: "Marathons, hikes, and active outdoor events", Icon: Mountain, bg: C.teal, href: "/events/sports" },
];

function EventCategoryCard({ title, desc, Icon, bg, href, delay }: EventCategoryCardProps) {
  return (
    <AnimatedSection delay={delay}>
      <Link href={href} style={{ textDecoration: "none", display: "block", height: "100%" }}>
        <div
          style={{
            background: bg,
            borderRadius: 16,
            padding: "36px 32px",
            cursor: "pointer",
            height: "100%",
            transition: "transform 0.25s, box-shadow 0.25s",
          }}
          onMouseEnter={(event) => {
            event.currentTarget.style.transform = "translateY(-4px)";
            event.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.2)";
          }}
          onMouseLeave={(event) => {
            event.currentTarget.style.transform = "translateY(0)";
            event.currentTarget.style.boxShadow = "none";
          }}
        >
          <div style={{ marginBottom: 20, color: "rgba(255,255,255,0.85)" }}>
            <Icon size={36} strokeWidth={1.5} />
          </div>
          <h3
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: 26,
              fontWeight: 600,
              color: C.white,
              marginBottom: 10,
            }}
          >
            {title}
          </h3>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.68)", lineHeight: 1.65 }}>{desc}</p>
        </div>
      </Link>
    </AnimatedSection>
  );
}

export default function EventsPageContent() {
  const howItWorks = [
    {
      icon: "📋",
      title: "Curated Listings",
      desc: "Only events worth attending — properly organised, clear on ticket sources and what to expect.",
    },
    {
      icon: "🍽️",
      title: "Event + Dinner Bundles",
      desc: "Pair your event with a restaurant booking. Concert + dinner, nightlife + transport — all in one plan.",
    },
    {
      icon: "📅",
      title: "Weekly Updates",
      desc: "Event listings updated every week to reflect what's trending and what's worth your time.",
    },
  ];

  return (
    <main style={{ fontFamily: "'Inter',system-ui,sans-serif", overflowX: "hidden", background: "#fcfaf6", color: C.green }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0} a{text-decoration:none}
        .events-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:20px}
        .events-grid-wide{display:grid;grid-template-columns:1fr;gap:20px;margin-top:20px}
        .how-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
        @media(max-width:800px){.how-grid{grid-template-columns:1fr!important}}
        @media(max-width:700px){.events-grid{grid-template-columns:1fr!important}}
      `}</style>

      <Navbar />
      <PageHero
        label="What's On"
        title="Events in Kenya"
        subtitle="Concerts, festivals, nightlife, cultural pop-ups — this weekend and beyond"
      />

      <section style={{ padding: "64px 32px", maxWidth: 1280, margin: "0 auto" }}>
        <div className="events-grid">
          {CATEGORIES.slice(0, 4).map((category, index) => (
            <EventCategoryCard key={category.title} {...category} delay={index * 0.08} />
          ))}
        </div>
        <div className="events-grid-wide">
          <EventCategoryCard {...CATEGORIES[4]} delay={0.32} />
        </div>
      </section>

      <section style={{ padding: "0 32px 80px", maxWidth: 1280, margin: "0 auto" }}>
        <AnimatedSection>
          <div
            style={{
              background: C.sandLight,
              borderRadius: 20,
              padding: "56px 32px",
              textAlign: "center",
              border: `1px solid ${C.sandDark}60`,
            }}
          >
            <div style={{ color: C.teal, marginBottom: 20 }}>
              <Calendar size={48} strokeWidth={1.5} />
            </div>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: "clamp(28px,4vw,40px)",
                fontWeight: 600,
                color: C.green,
                marginBottom: 16,
              }}
            >
              Event Calendar Coming Soon
            </h2>
            <p style={{ fontSize: 15, color: "#777", maxWidth: 580, margin: "0 auto 32px", lineHeight: 1.75 }}>
              Weekly updated events with dates, venues, ticket info, and bundled experiences with a polished Rooted Kenya feel.
            </p>
            <div style={{ display: "flex", maxWidth: 460, margin: "0 auto", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
              <input
                type="email"
                placeholder="Get notified when we launch"
                style={{
                  flex: 1,
                  minWidth: 240,
                  padding: "13px 20px",
                  borderRadius: 50,
                  border: `1.5px solid ${C.sandDark}`,
                  fontSize: 14,
                  outline: "none",
                  background: C.white,
                  color: C.green,
                }}
                onFocus={(event) => {
                  event.currentTarget.style.borderColor = C.teal;
                }}
                onBlur={(event) => {
                  event.currentTarget.style.borderColor = C.sandDark;
                }}
              />
              <button
                style={{
                  background: C.teal,
                  color: C.white,
                  padding: "13px 28px",
                  borderRadius: 50,
                  fontSize: 14,
                  fontWeight: 600,
                  border: "none",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                Notify Me
              </button>
            </div>
          </div>
        </AnimatedSection>
      </section>

      <section style={{ background: C.green, padding: "72px 32px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <AnimatedSection style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(30px,4vw,48px)", color: C.white, marginBottom: 14 }}>
              How Events Will Work
            </h2>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 15 }}>Everything bundled so you don&apos;t have to think</p>
          </AnimatedSection>

          <div className="how-grid">
            {howItWorks.map((item, index) => (
              <AnimatedSection key={item.title} delay={index * 0.1}>
                <div
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 18,
                    padding: "36px 28px",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: 40, marginBottom: 18 }}>{item.icon}</div>
                  <h3
                    style={{
                      fontFamily: "'Cormorant Garamond',serif",
                      fontSize: 24,
                      fontWeight: 600,
                      color: C.white,
                      marginBottom: 12,
                    }}
                  >
                    {item.title}
                  </h3>
                  <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>{item.desc}</p>
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
